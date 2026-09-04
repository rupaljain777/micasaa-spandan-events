-- MiCasaa Ganesh Utsav 2026 registration backend
-- Run this entire file once in Supabase Dashboard -> SQL Editor.

create extension if not exists pgcrypto with schema extensions;

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  registration_code text not null unique default ('MIC-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8))),
  participant_key text not null unique,
  participant_name text not null,
  flat_number text not null,
  wing text not null,
  age integer not null,
  age_group text not null,
  guardian_name text,
  mobile text not null,
  event_ids text[] not null default '{}',
  events text[] not null default '{}',
  details jsonb not null default '{}'::jsonb,
  photo_consent boolean not null default false,
  source text not null default 'MiCasaa Ganesh Utsav Website',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.registrations enable row level security;

-- Direct table access is intentionally blocked. The website can only use the
-- two narrowly scoped RPC functions below.
revoke all on table public.registrations from anon, authenticated;

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

create or replace function public.find_registration(
  p_participant_name text,
  p_flat_number text,
  p_wing text,
  p_mobile text
) returns jsonb
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_key text;
  v_row public.registrations%rowtype;
begin
  if coalesce(trim(p_participant_name),'') = ''
     or coalesce(trim(p_flat_number),'') = ''
     or coalesce(trim(p_wing),'') = ''
     or length(regexp_replace(coalesce(p_mobile,''), '[^0-9]', '', 'g')) < 10 then
    return jsonb_build_object('found', false);
  end if;

  v_key := public.micasaa_participant_key(p_participant_name, p_flat_number, p_wing, p_mobile);

  select * into v_row
  from public.registrations
  where participant_key = v_key
  limit 1;

  if not found then
    return jsonb_build_object('found', false);
  end if;

  return jsonb_build_object(
    'found', true,
    'registration', jsonb_build_object(
      'registrationCode', v_row.registration_code,
      'participantName', v_row.participant_name,
      'flatNumber', v_row.flat_number,
      'wing', v_row.wing,
      'age', v_row.age,
      'ageGroup', v_row.age_group,
      'guardianName', coalesce(v_row.guardian_name, ''),
      'mobile', v_row.mobile,
      'eventIds', to_jsonb(v_row.event_ids),
      'events', to_jsonb(v_row.events),
      'details', v_row.details,
      'photoConsent', v_row.photo_consent,
      'updatedAt', v_row.updated_at
    )
  );
end;
$$;

create or replace function public.upsert_registration(p_payload jsonb)
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
  v_id uuid;
  v_code text;
  v_action text := 'created';
  v_event_ids text[];
  v_events text[];
begin
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

  if coalesce(trim(p_payload->>'ageGroup'),'') = '' then
    raise exception 'Age group is required';
  end if;

  select coalesce(array_agg(value), '{}') into v_event_ids
  from jsonb_array_elements_text(coalesce(p_payload->'eventIds', '[]'::jsonb));

  select coalesce(array_agg(value), '{}') into v_events
  from jsonb_array_elements_text(coalesce(p_payload->'events', '[]'::jsonb));

  if cardinality(v_event_ids) = 0 then
    raise exception 'Please select at least one competition';
  end if;

  v_key := public.micasaa_participant_key(v_name, v_flat, v_wing, v_mobile);

  select id, registration_code into v_id, v_code
  from public.registrations
  where participant_key = v_key
  for update;

  if found then
    v_action := 'updated';
    update public.registrations
    set participant_name = v_name,
        flat_number = v_flat,
        wing = v_wing,
        age = v_age,
        age_group = p_payload->>'ageGroup',
        guardian_name = nullif(trim(coalesce(p_payload->>'guardianName','')), ''),
        mobile = v_mobile,
        event_ids = v_event_ids,
        events = v_events,
        details = coalesce(p_payload->'details', '{}'::jsonb),
        photo_consent = coalesce((p_payload->>'photoConsent')::boolean, false),
        source = coalesce(nullif(p_payload->>'source',''), 'MiCasaa Ganesh Utsav Website'),
        updated_at = now()
    where id = v_id
    returning registration_code into v_code;
  else
    begin
      insert into public.registrations (
        participant_key, participant_name, flat_number, wing, age, age_group,
        guardian_name, mobile, event_ids, events, details, photo_consent, source
      ) values (
        v_key, v_name, v_flat, v_wing, v_age, p_payload->>'ageGroup',
        nullif(trim(coalesce(p_payload->>'guardianName','')), ''), v_mobile,
        v_event_ids, v_events, coalesce(p_payload->'details', '{}'::jsonb),
        coalesce((p_payload->>'photoConsent')::boolean, false),
        coalesce(nullif(p_payload->>'source',''), 'MiCasaa Ganesh Utsav Website')
      ) returning id, registration_code into v_id, v_code;
    exception when unique_violation then
      v_action := 'updated';
      update public.registrations
      set participant_name = v_name,
          flat_number = v_flat,
          wing = v_wing,
          age = v_age,
          age_group = p_payload->>'ageGroup',
          guardian_name = nullif(trim(coalesce(p_payload->>'guardianName','')), ''),
          mobile = v_mobile,
          event_ids = v_event_ids,
          events = v_events,
          details = coalesce(p_payload->'details', '{}'::jsonb),
          photo_consent = coalesce((p_payload->>'photoConsent')::boolean, false),
          source = coalesce(nullif(p_payload->>'source',''), 'MiCasaa Ganesh Utsav Website'),
          updated_at = now()
      where participant_key = v_key
      returning id, registration_code into v_id, v_code;
    end;
  end if;

  return jsonb_build_object(
    'ok', true,
    'action', v_action,
    'registrationCode', v_code
  );
end;
$$;

revoke all on function public.find_registration(text,text,text,text) from public;
revoke all on function public.upsert_registration(jsonb) from public;
grant execute on function public.find_registration(text,text,text,text) to anon, authenticated;
grant execute on function public.upsert_registration(jsonb) to anon, authenticated;
