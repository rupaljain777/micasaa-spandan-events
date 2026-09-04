-- MiCasaa Ganesh Utsav 2026 - Admin Dashboard setup
-- Run this in Supabase Dashboard -> SQL Editor AFTER the original registration setup.

-- Keep pgcrypto available in the schema Supabase uses for extensions.
create extension if not exists pgcrypto with schema extensions;

-- Patch the participant key function for pgcrypto schema resolution.
create or replace function public.micasaa_participant_key(
  p_participant_name text,
  p_flat_number text,
  p_wing text,
  p_mobile text
) returns text
language sql
immutable
set search_path = public, extensions
as $$
  select encode(
    extensions.digest(
      lower(regexp_replace(trim(coalesce(p_participant_name,'')), '\\s+', ' ', 'g')) || '|' ||
      regexp_replace(upper(trim(coalesce(p_wing,''))), '\\s+', '', 'g') || '|' ||
      regexp_replace(lower(trim(coalesce(p_flat_number,''))), '\\s+', '', 'g') || '|' ||
      regexp_replace(coalesce(p_mobile,''), '[^0-9]', '', 'g'),
      'sha256'
    ),
    'hex'
  );
$$;

alter function public.find_registration(text,text,text,text)
set search_path = public, extensions;

alter function public.upsert_registration(jsonb)
set search_path = public, extensions;

-- Admin allow-list. Add the email(s) that you create in Supabase Authentication.
create table if not exists public.micasaa_admins (
  email text primary key,
  display_name text,
  created_at timestamptz not null default now()
);

alter table public.micasaa_admins enable row level security;
revoke all on table public.micasaa_admins from anon, authenticated;

-- IMPORTANT: change this to your real admin email before running.
-- You can add more committee admins later with another INSERT.
insert into public.micasaa_admins(email, display_name)
values ('CHANGE_ME_TO_YOUR_ADMIN_EMAIL@example.com', 'MiCasaa Admin')
on conflict (email) do update set display_name = excluded.display_name;

create or replace function public.is_micasaa_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.micasaa_admins a
    where lower(a.email) = lower(coalesce(auth.jwt()->>'email',''))
  );
$$;

revoke all on function public.is_micasaa_admin() from public;
grant execute on function public.is_micasaa_admin() to authenticated;

-- List registrations. Filtering is also done in the browser for instant response,
-- while this RPC prevents the registrations table from being exposed directly.
create or replace function public.admin_list_registrations()
returns table (
  id uuid,
  registration_code text,
  participant_name text,
  flat_number text,
  wing text,
  age integer,
  age_group text,
  guardian_name text,
  mobile text,
  event_ids text[],
  events text[],
  details jsonb,
  photo_consent boolean,
  created_at timestamptz,
  updated_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_micasaa_admin() then
    raise exception 'Not authorized';
  end if;

  return query
  select r.id, r.registration_code, r.participant_name, r.flat_number, r.wing,
         r.age, r.age_group, r.guardian_name, r.mobile, r.event_ids, r.events,
         r.details, r.photo_consent, r.created_at, r.updated_at
  from public.registrations r
  order by r.created_at desc;
end;
$$;

revoke all on function public.admin_list_registrations() from public;
grant execute on function public.admin_list_registrations() to authenticated;

-- Admin update. Recalculates participant_key so duplicate protection remains intact.
create or replace function public.admin_update_registration(p_id uuid, p_payload jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_name text := trim(coalesce(p_payload->>'participantName',''));
  v_flat text := trim(coalesce(p_payload->>'flatNumber',''));
  v_wing text := upper(trim(coalesce(p_payload->>'wing','')));
  v_mobile text := trim(coalesce(p_payload->>'mobile',''));
  v_age integer;
  v_key text;
  v_event_ids text[];
  v_events text[];
begin
  if not public.is_micasaa_admin() then
    raise exception 'Not authorized';
  end if;

  if v_name = '' or v_flat = '' or v_wing = '' then
    raise exception 'Participant name, flat number and wing are required';
  end if;
  if length(regexp_replace(v_mobile, '[^0-9]', '', 'g')) < 10 then
    raise exception 'A valid mobile number is required';
  end if;

  begin
    v_age := (p_payload->>'age')::integer;
  exception when others then
    raise exception 'A valid age is required';
  end;

  if v_age < 3 or v_age > 100 then
    raise exception 'Age must be between 3 and 100';
  end if;

  select coalesce(array_agg(value), '{}') into v_event_ids
  from jsonb_array_elements_text(coalesce(p_payload->'eventIds', '[]'::jsonb));

  select coalesce(array_agg(value), '{}') into v_events
  from jsonb_array_elements_text(coalesce(p_payload->'events', '[]'::jsonb));

  if cardinality(v_event_ids) = 0 then
    raise exception 'Please select at least one competition';
  end if;

  v_key := public.micasaa_participant_key(v_name, v_flat, v_wing, v_mobile);

  update public.registrations
  set participant_key = v_key,
      participant_name = v_name,
      flat_number = v_flat,
      wing = v_wing,
      age = v_age,
      age_group = coalesce(nullif(p_payload->>'ageGroup',''), age_group),
      guardian_name = nullif(trim(coalesce(p_payload->>'guardianName','')), ''),
      mobile = v_mobile,
      event_ids = v_event_ids,
      events = v_events,
      details = coalesce(p_payload->'details', '{}'::jsonb),
      photo_consent = coalesce((p_payload->>'photoConsent')::boolean, false),
      updated_at = now()
  where id = p_id;

  if not found then
    raise exception 'Registration not found';
  end if;

  return jsonb_build_object('ok', true);
exception
  when unique_violation then
    raise exception 'Another registration already exists with the same participant name, wing, flat and mobile number';
end;
$$;

revoke all on function public.admin_update_registration(uuid,jsonb) from public;
grant execute on function public.admin_update_registration(uuid,jsonb) to authenticated;
