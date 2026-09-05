const CONFIG = window.MICASAA_CONFIG || {};

const competitions = [
  {id:'shlok', name:'Ganesh Shlok / Poem / Short Speech', date:'14 Sept', time:'7 PM'},
  {id:'pakKala', name:'Pak Kala Competition', date:'15 Sept', time:'6–7 PM'},
  {id:'foodStall', name:'Food Stall', date:'17 Sept', time:'8 PM onwards'},
  {id:'talentSenior', name:'MiCasaa Got Talent — Seniors (11 onwards)', date:'18 Sept', time:'8 PM onwards'},
  {id:'drawing', name:'Drawing Competition', date:'19 Sept', time:'1 PM onwards'},
  {id:'talentJunior', name:'MiCasaa Got Talent — Juniors (Age 3 to 10)', date:'19 Sept', time:'8 PM onwards'},
  {id:'cricket', name:'Sports Day — Cricket', date:'20 Sept', time:'10 AM onwards'},
  {id:'football', name:'Sports Day — Football', date:'20 Sept', time:'10 AM onwards'},
  {id:'sackRace', name:'Sports Day — Sack Race', date:'20 Sept', time:'10 AM onwards'},
  {id:'lemonSpoon', name:'Sports Day — Lemon Spoon Race', date:'20 Sept', time:'10 AM onwards'},
  {id:'rangoli', name:'Rangoli Competition', date:'21 Sept', time:'4 PM onwards'},
  {id:'musicalChairs', name:'Musical Chairs', date:'23 Sept', time:'8 PM onwards'}
];

const eventDetailConfig = {
  shlok: [
    {key:'speechType', label:'Presentation'},
    {key:'speechDuration', label:'Duration'}
  ],
  foodStall: [
    {key:'foodStallName', label:'Stall / Display Name'},
    {key:'foodCategory', label:'Food Category'},
    {key:'foodItems', label:'Items to Sell / Serve'}
  ],
  talentJunior: [
    {key:'talentCategory', label:'Performance Category'},
    {key:'participationType', label:'Participation Type'},
    {key:'performanceName', label:'Performance / Act'},
    {key:'performanceDuration', label:'Duration'},
    {key:'groupMembers', label:'Group Members'},
    {key:'specialRequirement', label:'Special Requirement'}
  ],
  talentSenior: [
    {key:'talentCategory', label:'Performance Category'},
    {key:'participationType', label:'Participation Type'},
    {key:'performanceName', label:'Performance / Act'},
    {key:'performanceDuration', label:'Duration'},
    {key:'groupMembers', label:'Group Members'},
    {key:'specialRequirement', label:'Special Requirement'}
  ],
  cricket: [{key:'sportsTeamDetails', label:'Team / Partner Details'}],
  football: [{key:'sportsTeamDetails', label:'Team / Partner Details'}],
  sackRace: [{key:'sportsTeamDetails', label:'Team / Partner Details'}],
  lemonSpoon: [{key:'sportsTeamDetails', label:'Team / Partner Details'}]
};

const $ = id => document.getElementById(id);
let session = null;
let allRows = [];
let filteredRows = [];

function configured(){
  return CONFIG.supabaseUrl && CONFIG.supabaseAnonKey && !CONFIG.supabaseUrl.includes('PASTE_') && !CONFIG.supabaseAnonKey.includes('PASTE_');
}
function api(path){ return CONFIG.supabaseUrl.replace(/\/$/,'') + path; }
function escapeHtml(v=''){ return String(v).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
function fmtDate(v){ if(!v) return ''; const d=new Date(v); return d.toLocaleString('en-IN',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}); }
function ageGroupForAge(age){ const n=Number(age); if(!Number.isFinite(n))return ''; if(n>=3&&n<=6)return 'Junior Kids'; if(n>=7&&n<=12)return 'Senior Kids'; if(n>=13&&n<=19)return 'Teens'; if(n>=20&&n<=59)return 'Adults'; if(n>=60)return 'Senior Citizens'; return ''; }
function syncAdminAgeGroup(){ const f=$('editForm'); if(!f)return ''; const age=f.elements.age, group=f.elements.ageGroup; if(!age||!group)return ''; const value=ageGroupForAge(age.value); group.value=value; group.disabled=true; group.setAttribute('aria-disabled','true'); group.tabIndex=-1; return value; }
function saveSession(s){ session=s; if(s) localStorage.setItem('micasaaAdminSession',JSON.stringify(s)); else localStorage.removeItem('micasaaAdminSession'); }
function getSavedSession(){ try{return JSON.parse(localStorage.getItem('micasaaAdminSession')||'null')}catch(_){return null} }

async function authFetch(path, options={}){
  const headers={apikey:CONFIG.supabaseAnonKey,'Content-Type':'application/json',...(options.headers||{})};
  if(session?.access_token) headers.Authorization=`Bearer ${session.access_token}`;
  let res=await fetch(api(path),{...options,headers});
  if(res.status===401 && session?.refresh_token){
    const rr=await fetch(api('/auth/v1/token?grant_type=refresh_token'),{method:'POST',headers:{apikey:CONFIG.supabaseAnonKey,'Content-Type':'application/json'},body:JSON.stringify({refresh_token:session.refresh_token})});
    if(rr.ok){ saveSession(await rr.json()); headers.Authorization=`Bearer ${session.access_token}`; res=await fetch(api(path),{...options,headers}); }
  }
  const text=await res.text(); let data=null; try{data=text?JSON.parse(text):null}catch(_){data=text}
  if(!res.ok) throw new Error((data && (data.message||data.error_description||data.error||data.hint)) || `Request failed (${res.status})`);
  return data;
}

async function rpc(name, body={}){ return authFetch(`/rest/v1/rpc/${name}`,{method:'POST',body:JSON.stringify(body)}); }

function showLogin(message=''){
  $('loginView').hidden=false; $('dashboardView').hidden=true; $('logoutBtn').hidden=true;
  if(message){$('loginError').textContent=message;$('loginError').hidden=false}
}
function showDashboard(){ $('loginView').hidden=true; $('dashboardView').hidden=false; $('logoutBtn').hidden=false; }

$('loginForm').addEventListener('submit',async e=>{
  e.preventDefault();
  if(!configured()){ $('loginError').textContent='Supabase is not configured in config.js.'; $('loginError').hidden=false; return; }
  $('loginError').hidden=true; $('loginSpinner').hidden=false;
  try{
    const data=await authFetch('/auth/v1/token?grant_type=password',{method:'POST',body:JSON.stringify({email:$('email').value.trim(),password:$('password').value})});
    saveSession(data);
    const allowed=await rpc('is_micasaa_admin');
    if(allowed!==true){ saveSession(null); throw new Error('This account is not listed as a MiCasaa admin.'); }
    showDashboard(); await loadRegistrations();
  }catch(err){ $('loginError').textContent=err.message; $('loginError').hidden=false; }
  finally{$('loginSpinner').hidden=true}
});

$('logoutBtn').addEventListener('click',async()=>{ try{if(session) await authFetch('/auth/v1/logout',{method:'POST'})}catch(_){} saveSession(null); allRows=[]; showLogin(); });
$('refreshBtn').addEventListener('click',loadRegistrations);

async function loadRegistrations(){
  $('dashboardMessage').hidden=true;
  try{
    const out=await rpc('admin_list_registrations');
    allRows=Array.isArray(out)?out:[];
    $('lastUpdated').textContent=`Last refreshed ${new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit'})}`;
    populateEventFilter(); applyFilters(); renderSummary();
  }catch(err){
    if(/authorized|JWT|token/i.test(err.message)){ saveSession(null); showLogin('Your admin session expired or this account is not authorized.'); return; }
    $('dashboardMessage').textContent=`Could not load registrations: ${err.message}`; $('dashboardMessage').className='message error'; $('dashboardMessage').hidden=false;
  }
}

function populateEventFilter(){
  const current=$('eventFilter').value;
  $('eventFilter').innerHTML='<option value="">All events</option>'+competitions.map(c=>`<option value="${c.id}">${escapeHtml(c.name)}</option>`).join('');
  $('eventFilter').value=current;
  if($('reportEvent') && $('reportEvent').options.length<=1){
    $('reportEvent').innerHTML='<option value="">Select an event</option>'+competitions.map(c=>`<option value="${c.id}">${escapeHtml(c.name)} — ${c.date} · ${c.time}</option>`).join('');
  }
}

function applyFilters(){
  const q=$('searchInput').value.trim().toLowerCase(); const wing=$('wingFilter').value; const ev=$('eventFilter').value; const age=$('ageFilter').value;
  filteredRows=allRows.filter(r=>{
    const hay=[r.registration_code,r.participant_name,r.flat_number,r.wing,r.mobile,r.guardian_name,...(r.events||[])].join(' ').toLowerCase();
    return (!q||hay.includes(q)) && (!wing||r.wing===wing) && (!ev||(r.event_ids||[]).includes(ev)) && (!age||r.age_group===age);
  });
  renderRows();
}
['searchInput','wingFilter','eventFilter','ageFilter'].forEach(id=>$(id).addEventListener(id==='searchInput'?'input':'change',applyFilters));
$('clearFilters').addEventListener('click',()=>{ $('searchInput').value='';$('wingFilter').value='';$('eventFilter').value='';$('ageFilter').value='';applyFilters(); });

function renderSummary(){
  $('kpiParticipants').textContent=allRows.length.toLocaleString('en-IN');
  $('kpiEntries').textContent=allRows.reduce((n,r)=>n+(r.event_ids||[]).length,0).toLocaleString('en-IN');
  $('kpiFlats').textContent=new Set(allRows.map(r=>`${r.wing}-${r.flat_number}`)).size.toLocaleString('en-IN');
  const now=new Date(); const today=allRows.filter(r=>{const d=new Date(r.updated_at);return d.toDateString()===now.toDateString()}).length;
  $('kpiToday').textContent=today.toLocaleString('en-IN');
  const counts=Object.fromEntries(competitions.map(c=>[c.id,0]));
  allRows.forEach(r=>(r.event_ids||[]).forEach(id=>{if(id in counts) counts[id]++}));
  $('eventSummary').innerHTML=competitions.map(c=>`<div class="event-stat"><span>${escapeHtml(c.name)} · ${c.date} · ${c.time}</span><strong>${counts[c.id]||0}</strong></div>`).join('');
}

function renderRows(){
  $('resultCount').textContent=`Showing ${filteredRows.length} of ${allRows.length}`;
  $('emptyState').hidden=filteredRows.length!==0;
  $('registrationRows').innerHTML=filteredRows.map(r=>`<tr>
    <td><div class="reg-code">${escapeHtml(r.registration_code)}</div><div class="muted">${fmtDate(r.created_at)}</div></td>
    <td class="participant"><strong>${escapeHtml(r.participant_name)}</strong><span class="muted">${escapeHtml(r.guardian_name||'')}</span></td>
    <td><strong>${escapeHtml(r.wing)}-${escapeHtml(r.flat_number)}</strong></td>
    <td>${escapeHtml(r.mobile)}</td>
    <td>${escapeHtml(r.age)}<div class="muted">${escapeHtml(r.age_group)}</div></td>
    <td><div class="event-tags">${(r.events||[]).map(e=>`<span class="event-tag">${escapeHtml(e)}</span>`).join('')}</div></td>
    <td>${fmtDate(r.updated_at)}</td>
    <td><button class="edit-btn" data-id="${r.id}">Edit</button></td>
  </tr>`).join('');
  document.querySelectorAll('.edit-btn').forEach(b=>b.addEventListener('click',()=>openEdit(b.dataset.id)));
}

const ADMIN_DETAIL_FIELD_NAMES=['speechType','speechDuration','talentCategory','participationType','performanceName','performanceDuration','groupMembers','specialRequirement','sportsTeamDetails','foodStallName','foodCategory','foodItems','notes'];
const ADMIN_MULTI_DETAIL_FIELDS=new Set(['speechType','talentCategory','participationType','foodCategory']);
function splitAdminMultiValue(value){
  if(Array.isArray(value)) return value.map(v=>String(v).trim()).filter(Boolean);
  return String(value||'').split(',').map(v=>v.trim()).filter(Boolean);
}
function readAdminDetailField(f,name){
  const nodes=[...f.querySelectorAll(`[name="${name}"]`)];
  if(!nodes.length) return '';
  if(ADMIN_MULTI_DETAIL_FIELDS.has(name)) return nodes.filter(n=>n.checked).map(n=>n.value).join(', ');
  const el=f.elements[name]; return String(el?.value||'').trim();
}
function writeAdminDetailField(f,name,value){
  const nodes=[...f.querySelectorAll(`[name="${name}"]`)];
  if(!nodes.length) return;
  if(ADMIN_MULTI_DETAIL_FIELDS.has(name)){
    const selected=new Set(splitAdminMultiValue(value));
    nodes.forEach(n=>{n.checked=selected.has(n.value);});
  }else if(f.elements[name]) f.elements[name].value=value ?? '';
}
function adminCheckboxChoices(name,options){
  return `<div class="admin-option-grid">${options.map(v=>`<label class="admin-option-check"><input type="checkbox" name="${name}" value="${escapeHtml(v)}"><span>${escapeHtml(v)}</span></label>`).join('')}</div>`;
}

function renderEditDynamicQuestions(details={}){
  const f=$('editForm');
  const ids=[...f.querySelectorAll('input[name="editEvent"]:checked')].map(x=>x.value);
  const blocks=[];
  if(ids.includes('shlok')) blocks.push(`<div class="admin-detail-block"><h4>📖 Ganesh Shlok / Poem / Short Speech</h4><div class="form-grid"><div class="admin-choice-field full"><span class="admin-choice-label">What will be presented?</span><small>Select all that apply.</small>${adminCheckboxChoices('speechType',['Ganesh Shlok','Poem','Short Speech'])}</div><label>Approx. duration<input name="speechDuration" placeholder="e.g. 2 minutes" /></label></div></div>`);
  if(ids.includes('talentJunior') || ids.includes('talentSenior')) blocks.push(`<div class="admin-detail-block"><h4>🎭 MiCasaa Got Talent</h4><div class="form-grid"><div class="admin-choice-field full"><span class="admin-choice-label">Performance category</span><small>Select one or more performance types.</small>${adminCheckboxChoices('talentCategory',['Dance','Singing','Drama','Skit','Instrumental Music','Other'])}</div><div class="admin-choice-field full"><span class="admin-choice-label">Participation type</span><small>Select all that apply across the performances.</small>${adminCheckboxChoices('participationType',['Solo','Duo','Group'])}</div><label>Performance / act name(s)<input name="performanceName" /></label><label>Approx. duration(s)<input name="performanceDuration" placeholder="e.g. Dance - 4 min, Singing - 3 min" /></label><label class="full">Group member names<textarea name="groupMembers"></textarea></label><label class="full">Special requirement<textarea name="specialRequirement"></textarea></label></div></div>`);
  if(ids.some(id=>['cricket','football','sackRace','lemonSpoon'].includes(id))) blocks.push(`<div class="admin-detail-block"><h4>🏅 Sports Day</h4><label>Team / partner details<textarea name="sportsTeamDetails"></textarea></label></div>`);
  if(ids.includes('foodStall')) blocks.push(`<div class="admin-detail-block"><h4>🍽️ Food Stall</h4><div class="form-grid"><label>Stall / Display Name<input name="foodStallName" /></label><div class="admin-choice-field full"><span class="admin-choice-label">Food Category</span><small>Select all categories that apply.</small>${adminCheckboxChoices('foodCategory',['Snacks','Chaat','Main Course','Dessert / Sweets','Beverages','Healthy / Homemade','Other'])}</div><label class="full">Items to sell / serve<textarea name="foodItems"></textarea></label></div><div class="admin-note"><strong>Note:</strong> Participants arrange their own table and power/electrical requirements.</div></div>`);
  blocks.push(`<div class="admin-detail-block"><h4>📝 Committee Notes</h4><label>Notes<textarea name="notes"></textarea></label></div>`);
  $('editDynamicQuestions').innerHTML=blocks.join('');
  for(const [key,value] of Object.entries(details||{})) writeAdminDetailField(f,key,value);
}

function collectAdminDetails(){
  const d={}; const f=$('editForm');
  ADMIN_DETAIL_FIELD_NAMES.forEach(name=>{const value=readAdminDetailField(f,name); if(value) d[name]=value;});
  return d;
}

function openEdit(id){
  const r=allRows.find(x=>x.id===id); if(!r)return;
  const f=$('editForm'); f.elements.id.value=r.id; f.elements.participantName.value=r.participant_name; f.elements.flatNumber.value=r.flat_number; f.elements.wing.value=r.wing; f.elements.mobile.value=r.mobile; f.elements.age.value=r.age; f.elements.ageGroup.value=r.age_group; syncAdminAgeGroup(); f.elements.guardianName.value=r.guardian_name||''; f.elements.photoConsent.checked=!!r.photo_consent;
  $('editRegistrationCode').textContent=`${r.registration_code} · Last updated ${fmtDate(r.updated_at)}`;
  $('editEvents').innerHTML=competitions.map(c=>`<label class="event-check"><input type="checkbox" name="editEvent" value="${c.id}" ${(r.event_ids||[]).includes(c.id)?'checked':''}><span><strong>${escapeHtml(c.name)}</strong><br><small>${c.date} · ${c.time}</small></span></label>`).join('');
  $('editEvents').querySelectorAll('input[name="editEvent"]').forEach(el=>el.addEventListener('change',()=>renderEditDynamicQuestions(collectAdminDetails())));
  renderEditDynamicQuestions(r.details||{});
  $('editError').hidden=true; $('editModal').hidden=false;
}
function closeEdit(){ $('editModal').hidden=true; }
$('closeEdit').addEventListener('click',closeEdit); $('cancelEdit').addEventListener('click',closeEdit); $('editModal').addEventListener('click',e=>{if(e.target.id==='editModal')closeEdit()});
const adminAgeInput=$('editForm')?.elements.age; if(adminAgeInput){ adminAgeInput.addEventListener('input',syncAdminAgeGroup); adminAgeInput.addEventListener('change',syncAdminAgeGroup); }

$('editForm').addEventListener('submit',async e=>{
  e.preventDefault(); const f=e.currentTarget; syncAdminAgeGroup(); const ids=[...f.querySelectorAll('input[name="editEvent"]:checked')].map(x=>x.value);
  if(!ids.length){$('editError').textContent='Select at least one competition.';$('editError').hidden=false;return}
  const current=allRows.find(r=>r.id===f.elements.id.value);
  const payload={participantName:f.elements.participantName.value.trim(),flatNumber:f.elements.flatNumber.value.trim(),wing:f.elements.wing.value,age:Number(f.elements.age.value),ageGroup:f.elements.ageGroup.value,guardianName:f.elements.guardianName.value.trim(),mobile:f.elements.mobile.value.trim(),eventIds:ids,events:ids.map(id=>competitions.find(c=>c.id===id)?.name||id),details:collectAdminDetails(),photoConsent:f.elements.photoConsent.checked};
  try{ await rpc('admin_update_registration',{p_id:f.elements.id.value,p_payload:payload}); closeEdit(); await loadRegistrations(); }
  catch(err){$('editError').textContent=`Could not save changes: ${err.message}`;$('editError').hidden=false}
});


function eventRows(eventId){
  return allRows.filter(r=>(r.event_ids||[]).includes(eventId)).sort((a,b)=>{
    const wing=String(a.wing||'').localeCompare(String(b.wing||'')); if(wing) return wing;
    const na=parseInt(a.flat_number,10), nb=parseInt(b.flat_number,10);
    if(!Number.isNaN(na)&&!Number.isNaN(nb)&&na!==nb) return na-nb;
    const flat=String(a.flat_number||'').localeCompare(String(b.flat_number||''),undefined,{numeric:true}); if(flat) return flat;
    return String(a.participant_name||'').localeCompare(String(b.participant_name||''));
  });
}

function reportColumns(eventId){
  const cols=[
    {label:'Sr.', get:(r,i)=>i+1, cls:'narrow'},
    {label:'Participant', get:r=>`${r.participant_name||''}${r.registration_code?`\nID: ${r.registration_code}`:''}${r.guardian_name?`\nGuardian: ${r.guardian_name}`:''}`},
    {label:'Flat', get:r=>`${r.wing||''}-${r.flat_number||''}`, cls:'compact'},
    {label:'Age', get:r=>`${r.age||''}${r.age_group?`\n${r.age_group}`:''}`, cls:'compact'},
    {label:'Mobile', get:r=>r.mobile||'', cls:'compact'}
  ];
  (eventDetailConfig[eventId]||[]).forEach(c=>cols.push({label:c.label,get:r=>(r.details||{})[c.key]||''}));
  cols.push({label:'Notes', get:r=>(r.details||{}).notes||''});
  return cols;
}

function generatePrintableReport(){
  const eventId=$('reportEvent').value;
  if(!eventId){ alert('Please select an event first.'); return; }
  const event=competitions.find(c=>c.id===eventId); if(!event)return;
  const rows=eventRows(eventId); const cols=reportColumns(eventId);
  $('reportModalHeading').textContent=`${event.name} — Printable Report`;
  $('printEventName').textContent=event.name;
  $('printEventDate').textContent=`${event.date} 2026 · ${event.time} (Tentative)`;
  $('printGeneratedAt').textContent=`Generated ${new Date().toLocaleString('en-IN',{day:'2-digit',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'})}`;
  $('printTotal').textContent=`Total Registrations: ${rows.length}`;
  $('printReportTable').querySelector('thead').innerHTML=`<tr>${cols.map(c=>`<th class="${c.cls||''}">${escapeHtml(c.label)}</th>`).join('')}</tr>`;
  $('printReportTable').querySelector('tbody').innerHTML=rows.map((r,i)=>`<tr>${cols.map(c=>`<td class="${c.cls||''}">${escapeHtml(c.get(r,i)).replace(/\n/g,'<br>')}</td>`).join('')}</tr>`).join('');
  $('printEmpty').hidden=rows.length!==0;
  $('printReportTable').hidden=rows.length===0;
  $('reportModal').dataset.eventId=eventId;
  $('reportModal').hidden=false;
}

function closeReport(){ $('reportModal').hidden=true; }
$('generateReportBtn').addEventListener('click',generatePrintableReport);
$('closeReport').addEventListener('click',closeReport);
$('reportModal').addEventListener('click',e=>{if(e.target.id==='reportModal')closeReport()});
$('printReportBtn').addEventListener('click',()=>window.print());

$('exportEventCsvBtn').addEventListener('click',()=>{
  const eventId=$('reportModal').dataset.eventId; const event=competitions.find(c=>c.id===eventId); if(!event)return;
  const rows=eventRows(eventId), cols=reportColumns(eventId);
  const csv=[[...cols.map(c=>c.label)],...rows.map((r,i)=>cols.map(c=>c.get(r,i)))]
    .map(row=>row.map(v=>`"${String(v??'').replace(/"/g,'""')}"`).join(',')).join('\r\n');
  const blob=new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=`MiCasaa-${event.name.replace(/[^a-z0-9]+/gi,'-')}-${new Date().toISOString().slice(0,10)}.csv`; document.body.appendChild(a); a.click(); const url=a.href; a.remove(); URL.revokeObjectURL(url);
});

$('exportBtn').addEventListener('click',()=>{
  const rows=filteredRows.length?filteredRows:allRows;
  const header=['Registration ID','Participant Name','Wing','Flat Number','Age','Age Group','Guardian Name','Mobile','Events','Created At','Updated At'];
  const csv=[header,...rows.map(r=>[r.registration_code,r.participant_name,r.wing,r.flat_number,r.age,r.age_group,r.guardian_name||'',r.mobile,(r.events||[]).join(' | '),r.created_at,r.updated_at])]
    .map(row=>row.map(v=>`"${String(v??'').replace(/"/g,'""')}"`).join(',')).join('\r\n');
  const blob=new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=`MiCasaa-Ganesh-Utsav-Registrations-${new Date().toISOString().slice(0,10)}.csv`; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(a.href);
});

(async function init(){
  if(!configured()){ showLogin('Supabase is not configured in config.js.'); return; }
  session=getSavedSession();
  if(session){
    try{const ok=await rpc('is_micasaa_admin'); if(ok===true){showDashboard();await loadRegistrations();return}}catch(_){}
    saveSession(null);
  }
  showLogin();
})();
