const CONFIG = window.MICASAA_CONFIG || {};

const fullSchedule = [
  {date:'14 Sept', day:'Monday', events:[{icon:'🙏', name:'Ganpati Bappa Agaman'},{icon:'📖', name:'Ganesh Shlok, Poem, Short Speech', register:true}]},
  {date:'15 Sept', day:'Tuesday', events:[{icon:'👨‍🍳', name:'Pak Kala Competition', register:true},{icon:'🎵', name:'MiCasaa Bhajan Mandal'}]},
  {date:'16 Sept', day:'Wednesday', events:[{icon:'🍽️', name:'Food Stall', register:true}]},
  {date:'17 Sept', day:'Thursday', events:[{icon:'🎶', name:'Chandan Nagar Bhajan Mandal'}]},
  {date:'18 Sept', day:'Friday', events:[{icon:'🎭', name:'MiCasaa Got Talent — Juniors', details:'Dance, Drama, Skit, Singing, Music, Other', register:true}]},
  {date:'19 Sept', day:'Saturday', events:[{icon:'🎨', name:'Drawing Competition', register:true},{icon:'🎤', name:'MiCasaa Got Talent — Seniors', details:'Dance, Drama, Skit, Singing, Music, Other', register:true}]},
  {date:'20 Sept', day:'Sunday', events:[{icon:'🏏', name:'Sports Day', details:'Cricket, Football, Sack Race, Lemon Spoon Race', register:true},{icon:'🍲', name:'Mahaprasad'}]},
  {date:'21 Sept', day:'Monday', events:[{icon:'🌈', name:'Rangoli Competition', register:true}]},
  {date:'22 Sept', day:'Tuesday', events:[{icon:'🪔', name:'Satyanarayana Pooja'}]},
  {date:'23 Sept', day:'Wednesday', events:[{icon:'🪑', name:'Musical Chairs', register:true}]},
  {date:'24 Sept', day:'Thursday', events:[{icon:'🏆', name:'Prize Distribution'}]},
  {date:'25 Sept', day:'Friday', events:[{icon:'🌺', name:'Ganpati Bappa Visarjan'}]}
];

const competitions = [
  {id:'shlok', icon:'📖', name:'Ganesh Shlok / Poem / Short Speech', date:'14 Sept', type:'speech'},
  {id:'pakKala', icon:'👨‍🍳', name:'Pak Kala Competition', date:'15 Sept'},
  {id:'foodStall', icon:'🍽️', name:'Food Stall', date:'16 Sept', type:'foodstall'},
  {id:'talentJunior', icon:'🎭', name:'MiCasaa Got Talent — Juniors', date:'18 Sept', type:'talent'},
  {id:'drawing', icon:'🎨', name:'Drawing Competition', date:'19 Sept'},
  {id:'talentSenior', icon:'🎤', name:'MiCasaa Got Talent — Seniors', date:'19 Sept', type:'talent'},
  {id:'cricket', icon:'🏏', name:'Sports Day — Cricket', date:'20 Sept', type:'sport'},
  {id:'football', icon:'⚽', name:'Sports Day — Football', date:'20 Sept', type:'sport'},
  {id:'sackRace', icon:'🏃', name:'Sports Day — Sack Race', date:'20 Sept', type:'sport'},
  {id:'lemonSpoon', icon:'🥄', name:'Sports Day — Lemon Spoon Race', date:'20 Sept', type:'sport'},
  {id:'rangoli', icon:'🌈', name:'Rangoli Competition', date:'21 Sept'},
  {id:'musicalChairs', icon:'🪑', name:'Musical Chairs', date:'23 Sept'}
];

const timeline = document.getElementById('timeline');
timeline.innerHTML = fullSchedule.map(d => `<article class="day-card"><div class="day-head"><span class="date-chip">${d.date}</span><span class="weekday">${d.day}</span></div>${d.events.map(e => `<div class="event-line"><span class="event-icon">${e.icon}</span><div><strong>${e.name}</strong>${e.details?`<small>${e.details}</small>`:''}${e.register?'<span class="register-tag">Register</span>':''}</div></div>`).join('')}</article>`).join('');

const cards = document.getElementById('competitionCards');
cards.innerHTML = competitions.map(c => `<label class="competition-card" data-id="${c.id}"><input type="checkbox" name="events" value="${c.id}" /><strong>${c.icon} ${c.name}</strong><small><span class="event-date">${c.date}</span> · 2026</small></label>`).join('');

const form = document.getElementById('registrationForm');
const dynamicQuestions = document.getElementById('dynamicQuestions');
const detailsFieldset = document.getElementById('eventDetailsFieldset');
const eventError = document.getElementById('eventError');
const existingStatus = document.getElementById('existingStatus');
const checkExistingBtn = document.getElementById('checkExisting');
let loadedRegistrationCode = null;
let pendingDetails = null;

function selectedEvents(){ return [...document.querySelectorAll('input[name="events"]:checked')].map(i=>i.value); }

function renderDynamicQuestions(){
  const selected = selectedEvents();
  document.querySelectorAll('.competition-card').forEach(card=>card.classList.toggle('selected', card.querySelector('input').checked));
  eventError.hidden = selected.length > 0;
  if(!selected.length){ detailsFieldset.hidden = true; dynamicQuestions.innerHTML=''; return; }
  detailsFieldset.hidden = false;
  const selectedComps = competitions.filter(c=>selected.includes(c.id));
  const blocks = [];
  if(selectedComps.some(c=>c.type==='speech')) blocks.push(`<div class="dynamic-block"><h4>📖 Ganesh Shlok / Poem / Short Speech</h4><div class="dynamic-grid"><label>What will you present?<select name="speechType"><option value="">Select</option><option>Ganesh Shlok</option><option>Poem</option><option>Short Speech</option></select></label><label>Approx. duration<input name="speechDuration" placeholder="e.g. 2 minutes" /></label></div></div>`);
  if(selectedComps.some(c=>c.type==='talent')){
    const talentNames = selectedComps.filter(c=>c.type==='talent').map(c=>c.name).join(' / ');
    blocks.push(`<div class="dynamic-block"><h4>🎭 ${talentNames}</h4><div class="dynamic-grid"><label>Performance category<select name="talentCategory"><option value="">Select</option><option>Dance</option><option>Singing</option><option>Drama</option><option>Skit</option><option>Instrumental Music</option><option>Other</option></select></label><label>Participation type<select name="participationType"><option value="">Select</option><option>Solo</option><option>Duo</option><option>Group</option></select></label><label>Performance / act name<input name="performanceName" placeholder="Optional title" /></label><label>Approx. duration<input name="performanceDuration" placeholder="e.g. 4 minutes" /></label><label class="full">Group member names<textarea name="groupMembers" placeholder="If Duo / Group, list all participant names"></textarea></label><label class="full">Special requirement<textarea name="specialRequirement" placeholder="e.g. microphone, music playback, chairs"></textarea></label></div></div>`);
  }
  if(selectedComps.some(c=>c.type==='sport')) blocks.push(`<div class="dynamic-block"><h4>🏅 Sports Day</h4><p class="field-help">Your selected sports are already captured above. If registering a team event, add team information here.</p><div class="dynamic-grid"><label class="full">Team / partner details<textarea name="sportsTeamDetails" placeholder="Team name or other participants, if applicable"></textarea></label></div></div>`);
  if(selectedComps.some(c=>c.type==='foodstall')) blocks.push(`<div class="dynamic-block"><h4>🍽️ Food Stall</h4><div class="dynamic-grid"><label>Stall / Display Name<input name="foodStallName" placeholder="e.g. Jain Snacks Corner" /></label><label>Food Category<select name="foodCategory"><option value="">Select</option><option>Snacks</option><option>Chaat</option><option>Main Course</option><option>Dessert / Sweets</option><option>Beverages</option><option>Healthy / Homemade</option><option>Other</option></select></label><label class="full">Items you plan to sell / serve<textarea name="foodItems" placeholder="List your main food items"></textarea></label><div class="full food-stall-note"><strong>Note:</strong> Food Stall participants are requested to arrange their own table and any power/electrical requirements needed for their stall.</div></div></div>`);
  blocks.push(`<div class="dynamic-block"><h4>📝 Anything else?</h4><label>Notes for the organising committee<textarea name="notes" placeholder="Optional"></textarea></label></div>`);
  dynamicQuestions.innerHTML = blocks.join('');
  if(pendingDetails){
    for(const [key,value] of Object.entries(pendingDetails)){
      const el=form.elements[key]; if(el && value !== null && value !== undefined) el.value=value;
    }
    pendingDetails=null;
  }
}

cards.addEventListener('change', renderDynamicQuestions);

function backendConfigured(){
  return CONFIG.supabaseUrl && CONFIG.supabaseAnonKey && !CONFIG.supabaseUrl.includes('PASTE_') && !CONFIG.supabaseAnonKey.includes('PASTE_');
}

async function rpc(name, body){
  if(!backendConfigured()) throw new Error('Supabase is not configured. Open config.js and add your project URL and anon key.');
  const base=CONFIG.supabaseUrl.replace(/\/$/,'');
  const res=await fetch(`${base}/rest/v1/rpc/${name}`, {
    method:'POST',
    headers:{'Content-Type':'application/json','apikey':CONFIG.supabaseAnonKey,'Authorization':`Bearer ${CONFIG.supabaseAnonKey}`},
    body:JSON.stringify(body)
  });
  const text=await res.text();
  let out=null; try{ out=text?JSON.parse(text):null; }catch(_){ out=text; }
  if(!res.ok){
    const message=(out && (out.message||out.error||out.hint)) || `Request failed (${res.status})`;
    throw new Error(message);
  }
  return out;
}

function identityPayload(){
  return {
    p_participant_name: form.elements.participantName.value.trim(),
    p_flat_number: form.elements.flatNumber.value.trim(),
    p_wing: form.elements.wing.value.trim(),
    p_mobile: form.elements.mobile.value.trim()
  };
}

function identityReady(){
  const p=identityPayload();
  return p.p_participant_name && p.p_flat_number && p.p_wing && p.p_mobile.replace(/\D/g,'').length >= 10;
}

function setExistingStatus(message, kind='not-found'){
  existingStatus.hidden=false;
  existingStatus.className=`existing-status ${kind}`;
  existingStatus.innerHTML=message;
}

function clearExistingStatus(){
  existingStatus.hidden=true;
  existingStatus.className='existing-status';
  existingStatus.textContent='';
  loadedRegistrationCode=null;
  form.querySelector('.submit-label').textContent='Submit Registration';
}

function loadExistingRegistration(r){
  ['participantName','flatNumber','wing','age','ageGroup','mobile','guardianName'].forEach(k=>{ if(form.elements[k] && r[k] !== undefined && r[k] !== null) form.elements[k].value=r[k]; });
  document.querySelectorAll('input[name="events"]').forEach(el=>el.checked=(r.eventIds||[]).includes(el.value));
  pendingDetails=r.details||{};
  renderDynamicQuestions();
  if(form.elements.photoConsent) form.elements.photoConsent.checked=!!r.photoConsent;
  loadedRegistrationCode=r.registrationCode;
  form.querySelector('.submit-label').textContent='Update Registration';
  setExistingStatus(`✅ Existing registration <strong>${escapeHtml(r.registrationCode)}</strong> found. We loaded the saved details. Make any changes and press <strong>Update Registration</strong>. <span class="edit-chip">Edit mode</span>`, 'found');
}

async function checkExistingRegistration({silent=false}={}){
  if(!identityReady()){
    if(!silent) setExistingStatus('Enter participant name, wing, flat number and a valid mobile number first.', 'not-found');
    return false;
  }
  if(!backendConfigured()){
    if(!silent) setExistingStatus('Backend is not configured yet. Complete the Supabase setup in README.md.', 'error');
    return false;
  }
  checkExistingBtn.disabled=true;
  if(!silent) setExistingStatus('Checking for an existing registration…','not-found');
  try{
    const out=await rpc('find_registration', identityPayload());
    if(out && out.found && out.registration){ loadExistingRegistration(out.registration); return true; }
    clearExistingStatus();
    if(!silent) setExistingStatus('No existing registration found. You can continue with a new registration.', 'not-found');
    return false;
  }catch(err){
    if(!silent) setExistingStatus(`Could not check existing registration: ${escapeHtml(err.message)}`, 'error');
    return false;
  }finally{ checkExistingBtn.disabled=false; }
}

checkExistingBtn.addEventListener('click',()=>checkExistingRegistration());

// If identity changes after an existing record was loaded, exit edit mode so we never update the wrong participant.
['participantName','flatNumber','wing','mobile'].forEach(k=>form.elements[k].addEventListener('input',()=>{
  if(loadedRegistrationCode) clearExistingStatus();
}));

function collectDetails(){
  const names=['speechType','speechDuration','talentCategory','participationType','performanceName','performanceDuration','groupMembers','specialRequirement','sportsTeamDetails','foodStallName','foodCategory','foodItems','notes'];
  const d={};
  names.forEach(name=>{ const el=form.elements[name]; if(el && String(el.value||'').trim()!=='') d[name]=el.value.trim(); });
  return d;
}

function formToPayload(){
  const ids=selectedEvents();
  return {
    participantName: form.elements.participantName.value.trim(),
    flatNumber: form.elements.flatNumber.value.trim(),
    wing: form.elements.wing.value.trim(),
    age: Number(form.elements.age.value),
    ageGroup: form.elements.ageGroup.value,
    mobile: form.elements.mobile.value.trim(),
    guardianName: form.elements.guardianName.value.trim(),
    eventIds: ids,
    events: ids.map(id=>competitions.find(c=>c.id===id)?.name || id),
    details: collectDetails(),
    photoConsent: !!form.elements.photoConsent.checked,
    source: 'MiCasaa Ganesh Utsav Website'
  };
}

function setSubmitting(on){
  const btn=form.querySelector('.submit-btn');
  btn.disabled=on;
  btn.querySelector('.submit-label').textContent=on ? (loadedRegistrationCode?'Updating…':'Submitting…') : (loadedRegistrationCode?'Update Registration':'Submit Registration');
  btn.querySelector('.spinner').hidden=!on;
}

function showSuccess(data, result){
  const modal=document.getElementById('successModal');
  const updated=result.action==='updated';
  document.getElementById('successTitle').textContent=updated?'Registration updated!':'Registration received!';
  document.getElementById('successMessage').textContent=updated?'Your existing competition registration has been updated successfully.':'Thank you for participating in MiCasaa Ganesh Utsav 2026.';
  document.getElementById('registrationSummary').innerHTML=`<strong>${escapeHtml(data.participantName)}</strong> · Flat ${escapeHtml(data.flatNumber)}, Wing ${escapeHtml(data.wing)}<br><span>${data.events.map(escapeHtml).join(' · ')}</span><br><small>Registration ID: <strong>${escapeHtml(result.registrationCode||'')}</strong></small>`;
  modal.hidden=false;
}

function escapeHtml(value=''){ return String(value).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }

form.addEventListener('submit', async e=>{
  e.preventDefault();
  eventError.hidden=selectedEvents().length>0;
  if(!form.checkValidity() || !selectedEvents().length){
    form.reportValidity();
    if(!selectedEvents().length) document.getElementById('competitionCards').scrollIntoView({behavior:'smooth',block:'center'});
    return;
  }
  if(!backendConfigured()){
    setExistingStatus('Supabase is not configured yet. Follow README.md, then paste the Project URL and anon key into config.js.', 'error');
    return;
  }
  const data=formToPayload();
  setSubmitting(true);
  try{
    // Server-side upsert is the final duplicate guard. Even if two people submit at the same time,
    // the unique participant key ensures only one registration row exists.
    const result=await rpc('upsert_registration',{p_payload:data});
    if(!result || result.ok!==true) throw new Error('Registration could not be saved.');
    showSuccess(data,result);
    localStorage.removeItem('micasaaRegistrationDraft');
    form.reset();
    renderDynamicQuestions();
    clearExistingStatus();
  }catch(err){
    setExistingStatus(`Registration could not be saved: ${escapeHtml(err.message)}. Please try again.`, 'error');
    existingStatus.scrollIntoView({behavior:'smooth',block:'center'});
  }finally{ setSubmitting(false); }
});

document.getElementById('closeModal').addEventListener('click',()=>document.getElementById('successModal').hidden=true);
document.getElementById('successModal').addEventListener('click',e=>{if(e.target.id==='successModal') e.currentTarget.hidden=true;});

// Local draft protection. This is only on the resident's device and is not a registration.
form.addEventListener('input',()=>{
  const data=formToPayload();
  localStorage.setItem('micasaaRegistrationDraft',JSON.stringify(data));
});

try{
  const draft=JSON.parse(localStorage.getItem('micasaaRegistrationDraft')||'null');
  if(draft){
    ['participantName','flatNumber','wing','age','ageGroup','mobile','guardianName'].forEach(k=>{const el=form.elements[k]; if(el && draft[k]!==undefined) el.value=draft[k];});
    (draft.eventIds||[]).forEach(id=>{const el=document.querySelector(`input[name="events"][value="${id}"]`); if(el) el.checked=true;});
    pendingDetails=draft.details||{};
    renderDynamicQuestions();
    if(form.elements.photoConsent) form.elements.photoConsent.checked=!!draft.photoConsent;
  }
}catch(_){ }
