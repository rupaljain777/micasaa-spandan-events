const EVENT_META = {
  shlok: { name: 'Ganesh Shlok / Poem / Short Speech', date: '14 Sept', time: '8 PM onwards' },
  pakKala: { name: 'Pak Kala Competition', date: '15 Sept', time: '6 to 7 PM' },
  musicalChairs: { name: 'Musical Chairs', date: '16 Sept', time: '8 PM onwards' },
  foodStall: { name: 'Food Stall', date: '17 Sept', time: '8 PM onwards' },
  talentSenior: { name: 'MiCasaa Got Talent - Senior Kids (Age 11 & above)', date: '18 Sept', time: '8 PM onwards' },
  sackRace: { name: 'Sack Race', date: '19 Sept', time: '9 to 11 AM' },
  lemonSpoon: { name: 'Lemon Spoon Race', date: '19 Sept', time: '9 to 11 AM' },
  drawing: { name: 'Drawing Competition', date: '19 Sept', time: '1 PM onwards' },
  talentJunior: { name: 'MiCasaa Got Talent - Junior Kids (Age below 11)', date: '19 Sept', time: '8 PM onwards' },
  cricket: { name: 'Sports Day - Cricket', date: '20 Sept', time: '8 to 11 AM' },
  football: { name: 'Sports Day - Football', date: '20 Sept', time: '8 to 11 AM' },
  rangoli: { name: 'Rangoli Competition', date: '21 Sept', time: '4 PM onwards' }
};

const DETAIL_LABELS = {
  speechType: 'Shlok / Poem / Short Speech selection',
  speechDuration: 'Speech / poem duration',
  talentCategory: 'Performance type(s)',
  participationType: 'Participation type(s)',
  performanceName: 'Performance / act name(s)',
  performanceDuration: 'Performance duration(s)',
  groupMembers: 'Group members',
  specialRequirement: 'Special requirement',
  sportsTeamDetails: 'Sports team / partner details',
  foodStallName: 'Food Stall - Stall / Display Name',
  foodCategory: 'Food Stall - Food Category',
  foodItems: 'Food Stall - Items to sell / serve',
  notes: 'Notes for committee'
};

function escapeHtml(value = '') {
  return String(value).replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[ch]));
}

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' }
  });
}

async function getRegistration(env, registrationCode) {
  const base = String(env.SUPABASE_URL || '').replace(/\/$/, '');
  const url = `${base}/rest/v1/registrations?registration_code=eq.${encodeURIComponent(registrationCode)}&select=*`;
  const response = await fetch(url, {
    headers: {
      apikey: env.SUPABASE_SERVICE_ROLE_KEY,
      Accept: 'application/json'
    }
  });
  if (!response.ok) throw new Error('registration_lookup_failed');
  const rows = await response.json();
  return Array.isArray(rows) && rows.length ? rows[0] : null;
}

function buildEmail(registration, action) {
  const eventIds = Array.isArray(registration.event_ids) ? registration.event_ids : [];
  const eventLines = eventIds.map(id => {
    const event = EVENT_META[id];
    if (!event) return String(id);
    return `${event.name} - ${event.date}, ${event.time}`;
  });

  const details = registration.details && typeof registration.details === 'object' ? registration.details : {};
  const detailRows = Object.entries(DETAIL_LABELS)
    .filter(([key]) => String(details[key] ?? '').trim())
    .map(([key, label]) => [label, String(details[key]).trim()]);

  const isUpdated = action === 'updated';
  const subject = `MiCasaa Ganesh Utsav - ${isUpdated ? 'Registration Updated' : 'New Registration'} - ${registration.registration_code}`;

  const text = [
    'MiCasaa Ganesh Utsav 2026',
    isUpdated ? 'Registration Updated' : 'New Registration',
    '',
    `Registration ID: ${registration.registration_code}`,
    `Participant: ${registration.participant_name}`,
    `Wing / Flat: ${registration.wing}-${registration.flat_number}`,
    `Age / Age Group: ${registration.age} / ${registration.age_group}`,
    `WhatsApp / Mobile: ${registration.mobile}`,
    registration.guardian_name ? `Parent / Guardian: ${registration.guardian_name}` : '',
    '',
    'Registered Events:',
    ...eventLines.map(v => `- ${v}`),
    ...(detailRows.length ? ['', 'Additional Details:', ...detailRows.map(([label, value]) => `- ${label}: ${value}`)] : []),
    '',
    'Venue: MiCasaa Club House',
    'Morning Aarti: 8:30 AM',
    'Evening Aarti (Monday-Thursday): 8 PM',
    'Evening Aarti (Friday-Saturday-Sunday): 7 PM',
    'Timings are tentative. Final updates may be shared 1 day before on the society WhatsApp group.',
    '',
    `Photo / Video consent: ${registration.photo_consent ? 'Yes' : 'No'}`,
    `Submitted: ${registration.created_at || ''}`,
    `Last updated: ${registration.updated_at || ''}`
  ].filter(Boolean).join('\n');

  const eventsHtml = eventLines.length
    ? `<ul>${eventLines.map(v => `<li>${escapeHtml(v)}</li>`).join('')}</ul>`
    : '<p>None</p>';
  const detailsHtml = detailRows.length
    ? `<h3 style="margin:20px 0 8px;color:#7d1538">Additional Details</h3><table style="border-collapse:collapse;width:100%">${detailRows.map(([label, value]) => `<tr><td style="padding:7px 8px;border-bottom:1px solid #eee;font-weight:700;vertical-align:top">${escapeHtml(label)}</td><td style="padding:7px 8px;border-bottom:1px solid #eee">${escapeHtml(value)}</td></tr>`).join('')}</table>`
    : '';

  const html = `<!doctype html><html><body style="font-family:Arial,sans-serif;color:#232323;background:#f8f3e8;padding:24px"><div style="max-width:720px;margin:auto;background:#fff;border:1px solid #ead8bf;border-radius:18px;overflow:hidden"><div style="padding:22px 26px;background:#7d1538;color:#fff"><h2 style="margin:0">MiCasaa Ganesh Utsav 2026</h2><p style="margin:6px 0 0">${isUpdated ? 'Registration Updated' : 'New Registration'}</p></div><div style="padding:24px 26px"><table style="border-collapse:collapse;width:100%"><tr><td style="padding:7px 8px;font-weight:700">Registration ID</td><td style="padding:7px 8px">${escapeHtml(registration.registration_code)}</td></tr><tr><td style="padding:7px 8px;font-weight:700">Participant</td><td style="padding:7px 8px">${escapeHtml(registration.participant_name)}</td></tr><tr><td style="padding:7px 8px;font-weight:700">Wing / Flat</td><td style="padding:7px 8px">${escapeHtml(registration.wing)}-${escapeHtml(registration.flat_number)}</td></tr><tr><td style="padding:7px 8px;font-weight:700">Age / Age Group</td><td style="padding:7px 8px">${escapeHtml(registration.age)} / ${escapeHtml(registration.age_group)}</td></tr><tr><td style="padding:7px 8px;font-weight:700">WhatsApp / Mobile</td><td style="padding:7px 8px">${escapeHtml(registration.mobile)}</td></tr>${registration.guardian_name ? `<tr><td style="padding:7px 8px;font-weight:700">Parent / Guardian</td><td style="padding:7px 8px">${escapeHtml(registration.guardian_name)}</td></tr>` : ''}</table><h3 style="margin:20px 0 8px;color:#7d1538">Registered Events</h3>${eventsHtml}${detailsHtml}<div style="margin-top:20px;padding:14px;background:#fff7df;border-radius:12px"><strong>Venue:</strong> MiCasaa Club House<br><strong>Morning Aarti:</strong> 8:30 AM<br><strong>Evening Aarti (Monday-Thursday):</strong> 8 PM<br><strong>Evening Aarti (Friday-Saturday-Sunday):</strong> 7 PM<br><span style="color:#6c6258">Timings are tentative. Final updates may be shared 1 day before on the society WhatsApp group.</span></div><p style="margin-top:20px;color:#6c6258;font-size:13px">Photo / Video consent: ${registration.photo_consent ? 'Yes' : 'No'}<br>Submitted: ${escapeHtml(registration.created_at || '')}<br>Last updated: ${escapeHtml(registration.updated_at || '')}</p></div></div></body></html>`;

  return { subject, text, html };
}

export async function onRequestPost(context) {
  const { request, env } = context;
  const required = [
    'SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY',
    'CLOUDFLARE_ACCOUNT_ID',
    'CLOUDFLARE_EMAIL_API_TOKEN',
    'EMAIL_FROM',
    'ADMIN_EMAIL'
  ];
  if (required.some(name => !env[name])) return json({ ok: false, code: 'email_not_configured' }, 503);

  let body;
  try { body = await request.json(); }
  catch (_) { return json({ ok: false, code: 'invalid_json' }, 400); }

  const registrationCode = String(body.registrationCode || '').trim().toUpperCase();
  if (!/^MIC-[A-F0-9]{8}$/.test(registrationCode)) return json({ ok: false, code: 'invalid_registration_code' }, 400);

  try {
    const registration = await getRegistration(env, registrationCode);
    if (!registration) return json({ ok: false, code: 'registration_not_found' }, 404);

    const content = buildEmail(registration, String(body.action || 'created'));
    const emailResponse = await fetch(`https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(env.CLOUDFLARE_ACCOUNT_ID)}/email/sending/send`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.CLOUDFLARE_EMAIL_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: env.ADMIN_EMAIL,
        from: env.EMAIL_FROM,
        subject: content.subject,
        html: content.html,
        text: content.text
      })
    });

    if (!emailResponse.ok) return json({ ok: false, code: 'email_send_failed' }, 502);
    const emailResult = await emailResponse.json();
    if (!emailResult.success) return json({ ok: false, code: 'email_send_failed' }, 502);
    return json({ ok: true });
  } catch (_) {
    return json({ ok: false, code: 'email_notification_failed' }, 500);
  }
}

export function onRequestGet() {
  return json({ ok: false, code: 'method_not_allowed' }, 405);
}
