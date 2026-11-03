const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const storeKey = 'wildFernNZ2027';
const defaultState = {
  settings: { start: '2027-06-25', end: '2027-07-10', region: 'south', targetBudget: 250000 },
  days: [
    { id: 1, date: '2027-06-25', place: 'Christchurch 基督城', plan: '抵達基督城、領取露營車、採買食物並熟悉車輛與冬季設備。若航班抵達較晚或長途飛行後疲勞，建議在基督城附近過夜。', drive: 0 },
    { id: 2, date: '2027-06-26', place: 'Wanaka 瓦納卡（內陸移動日）', plan: '由基督城經 Canterbury 內陸前往瓦納卡，這天車程較長，建議白天出發、途中安排休息，依路況選擇合適路線並預留冬季緩衝；不前往 Franz Josef 西海岸。', drive: 5 },
    { id: 3, date: '2027-06-27', place: 'Wanaka 瓦納卡', plan: '瓦納卡停留日，可安排湖畔散步、鎮上休息或短程景點；冬季戶外行程依天氣、步道公告與道路狀況調整。', drive: 0.5 },
    { id: 4, date: '2027-06-28', place: 'Wanaka 瓦納卡（彈性日）', plan: '保留一個彈性日，讓全家休息或補足瓦納卡周邊行程；若前一天路況不佳，可用這天調整節奏。', drive: 0.5 }, 
    { id: 5, date: '2027-06-29', place: 'Queenstown 皇后鎮', plan: '由瓦納卡前往皇后鎮，依當日路況選擇 Crown Range 或較保守的替代路線；出發前確認租車公司對雪鏈與山路的規定。', drive: 1.5 }, 
    { id: 6, date: '2027-06-30', place: 'Queenstown 皇后鎮', plan: '皇后鎮停留日，安排市區、湖畔或室內活動；熱門活動需事先確認冬季營運時間。', drive: 0.5 }, 
    { id: 7, date: '2027-07-01', place: 'Queenstown 皇后鎮（彈性日）', plan: '保留作為天候備用或家庭休息日，依天氣安排活動，避免把所有戶外行程排得太緊。', drive: 0.5 }, 
    { id: 8, date: '2027-07-02', place: 'Te Anau 蒂阿瑙', plan: '從皇后鎮開往蒂阿瑙，抵達後補給並確認隔日前往 Milford Sound 的道路、天氣與遊船資訊。', drive: 2 },
    { id: 9, date: '2027-07-03', place: 'Milford Sound 米爾福德峽灣', plan: '由蒂阿瑙往返米爾福德峽灣，預留充足時間給山路、停靠觀景點及遊船。冬季道路可能因雪崩風險或天候封閉，出發前查詢官方即時路況；若不安全，改期或參加合適的當地行程。', drive: 4 },
    { id: 10, date: '2027-07-04', place: 'Te Anau → Mt Cook 蒂阿瑙前往庫克山', plan: '長距離移動日，經內陸前往 Aoraki / Mount Cook 區域。建議早出發、途中安排休息，並依天候及路況評估是否需要在途中增加住宿。', drive: 5 },
    { id: 11, date: '2027-07-05', place: 'Aoraki / Mt Cook 庫克山', plan: '視步道開放、風雪與能見度安排短程步道或觀景點；冬季不勉強進行高風險健行，並確認營地及住宿設施是否開放。', drive: 0.5 },
    { id: 12, date: '2027-07-06', place: 'Lake Tekapo 蒂卡波湖', plan: '由庫克山前往蒂卡波湖，路程較短。可安排湖畔景點與休息；觀星活動取決於雲量、風雪及當晚道路狀況。', drive: 1.5 },
    { id: 13, date: '2027-07-07', place: 'Lake Tekapo 蒂卡波湖（彈性緩衝日）', plan: '安排彈性休息日，或依天候補足庫克山／蒂卡波湖周邊行程。冬季道路及步道可能因雪、冰或強風調整，建議保留這一天作為天候備案。', drive: 0.5 },
    { id: 14, date: '2027-07-08', place: 'Oamaru 奧瑪魯', plan: '由蒂卡波前往奧瑪魯，沿途依天候安排休息。抵達後可探索歷史街區；野生動物觀賞請遵守現場指引並保持距離。', drive: 2.5 },
    { id: 15, date: '2027-07-09', place: 'Christchurch 基督城（還車前一晚）', plan: '由奧瑪魯返回基督城，預留加油、整理行李與露營車還車的緩衝時間。建議不要把長途移動排在國際航班當天。', drive: 3 },
    { id: 16, date: '2027-07-10', place: 'Christchurch 基督城（返程日）', plan: '確認露營車還車流程、航班報到時間與交通安排。若航班較早，請依租車公司規定提前安排還車及前往機場。', drive: 0 }
  ],
  budgets: [
    { id: 1, category: '機票', name: '四人來回機票', amount: 0, note: '待查價' },
    { id: 2, category: '露營車租賃', name: '四人露營車租賃', amount: 0, note: '含保險與冬季設備待確認' },
    { id: 3, category: '燃油與交通', name: '燃油、渡輪或其他交通', amount: 0, note: '依路線調整' },
    { id: 4, category: '營地與住宿', name: '營地與必要住宿', amount: 0, note: '冬季設施與營業狀況待確認' },
    { id: 5, category: '餐食與採買', name: '餐食與超市採買', amount: 0, note: '全家估算' },
    { id: 6, category: '活動門票', name: '活動與景點', amount: 0, note: '依興趣決定' }
  ],
  checklist: [
    { id: 1, group: '出發前規劃', title: '確認護照效期與入境要求', note: '依出發時適用規定再次核對', done: false },
    { id: 2, group: '出發前規劃', title: '確認航班日期與進出城市', note: '決定單程或往返城市', done: false },
    { id: 3, group: '交通與露營車', title: '比較四人露營車與冬季設備', note: '床位、安全帶、暖氣、保險與雪鏈', done: false },
    { id: 4, group: '交通與露營車', title: '確認駕照、翻譯文件及租車條件', note: '以租車公司與官方最新規定為準', done: false },
    { id: 5, group: '營地與活動', title: '研究營地冬季開放與設施', note: '確認供電、淋浴、暖氣與預約規則', done: false },
    { id: 6, group: '營地與活動', title: '安排天候備案與彈性日', note: '避免每天都必須長距離移動', done: false },
    { id: 7, group: '出發前規劃', title: '準備旅遊保險與緊急聯絡資訊', note: '確認自駕、冬季活動與醫療保障', done: false },
    { id: 8, group: '交通與露營車', title: '確認手機網路、導航與離線地圖', note: '偏遠地區可能沒有穩定訊號', done: false }
  ]
};
let state;
try { state = JSON.parse(localStorage.getItem(storeKey)) || structuredClone(defaultState); }
catch { state = structuredClone(defaultState); }

/* Upgrade only the untouched four-day sample itinerary to the user's full route. */
const samplePlaces = ['Christchurch 基督城', 'Lake Tekapo 蒂卡波湖', 'Aoraki / Mount Cook 庫克山', 'Queenstown 皇后鎮'];
const isUntouchedSample = Array.isArray(state.days) && state.days.length === 4 &&
  state.days.every((d, i) => d.id === i + 1 && d.place === samplePlaces[i]);
if (isUntouchedSample) {
  state.days = structuredClone(defaultState.days);
  state.settings.start = '2027-06-25';
  state.settings.end = '2027-07-10';
  try { localStorage.setItem(storeKey, JSON.stringify(state)); } catch {}
}

/* Update the previous untouched 14-day sample itinerary to the confirmed 16-day travel dates. */
const oldRoutePlaces = [
  'Christchurch 基督城',
  'Franz Josef Glacier 福克斯／法蘭士約瑟夫冰河區',
  'Franz Josef Glacier 法蘭士約瑟夫冰河',
  'Wanaka 瓦納卡',
  'Wanaka 瓦納卡',
  'Queenstown 皇后鎮',
  'Queenstown 皇后鎮',
  'Te Anau 蒂阿瑙',
  'Milford Sound 米爾福德峽灣',
  'Te Anau → Mt Cook 蒂阿瑙前往庫克山',
  'Aoraki / Mt Cook 庫克山',
  'Lake Tekapo 蒂卡波湖',
  'Oamaru 奧瑪魯',
  'Christchurch 基督城（返程）'
];
const isUntouchedOldRoute = Array.isArray(state.days) && state.days.length === 14 &&
  state.days.every((d, i) => d.id === i + 1 && d.place === oldRoutePlaces[i]);
if (isUntouchedOldRoute) {
  state.days = structuredClone(defaultState.days);
  state.settings.start = '2027-06-25';
  state.settings.end = '2027-07-10';
  try { localStorage.setItem(storeKey, JSON.stringify(state)); } catch {}
}

/* Migrate the previously untouched 16-day itinerary that included Franz Josef to the revised inland route. */
const previousFranzJosefRoute = [
  'Christchurch 基督城','Franz Josef Glacier 福克斯／法蘭士約瑟夫冰河區','Franz Josef Glacier 法蘭士約瑟夫冰河',
  'Wanaka 瓦納卡','Wanaka 瓦納卡','Queenstown 皇后鎮','Queenstown 皇后鎮','Te Anau 蒂阿瑙',
  'Milford Sound 米爾福德峽灣','Te Anau → Mt Cook 蒂阿瑙前往庫克山','Aoraki / Mt Cook 庫克山',
  'Lake Tekapo 蒂卡波湖','Lake Tekapo 蒂卡波湖（彈性緩衝日）','Oamaru 奧瑪魯',
  'Christchurch 基督城（還車前一晚）','Christchurch 基督城（返程日）'
];
const isUntouchedFranzJosefRoute = Array.isArray(state.days) && state.days.length === 16 &&
  state.days.every((d, i) => d.id === i + 1 && d.place === previousFranzJosefRoute[i]);
if (isUntouchedFranzJosefRoute) {
  state.days = structuredClone(defaultState.days);
  state.settings.start = '2027-06-25';
  state.settings.end = '2027-07-10';
  try { localStorage.setItem(storeKey, JSON.stringify(state)); } catch {}
}

function persist(){ localStorage.setItem(storeKey, JSON.stringify(state)); renderAll(); }
function money(n){ return 'NT$ ' + Number(n || 0).toLocaleString('zh-TW'); }
function dateObj(s){ return s ? new Date(s + 'T12:00:00') : null; }
function fmtDate(s){ const d=dateObj(s); return d ? `${d.getFullYear()}/${String(d.getMonth()+1).padStart(2,'0')}/${String(d.getDate()).padStart(2,'0')}` : '日期待定'; }
function duration(){ const a=dateObj(state.settings.start), b=dateObj(state.settings.end); return a&&b&&b>=a ? Math.round((b-a)/86400000)+1 : 0; }
function setPage(name){
  $$('.nav').forEach(n=>n.classList.toggle('active',n.dataset.page===name));
  $$('.content-section').forEach(s=>s.classList.add('hidden'));
  $(`#${name}-page`).classList.remove('hidden');
  const titles={overview:'旅行總覽',itinerary:'每日行程',budget:'預算規劃',checklist:'預訂清單',safety:'冬季安全中心'};
  $('#page-title').textContent=titles[name]||'旅行總覽';
}
$$('.nav').forEach(n=>n.addEventListener('click',()=>setPage(n.dataset.page)));
$$('[data-goto]').forEach(b=>b.addEventListener('click',()=>setPage(b.dataset.goto)));

function renderOverview(){
  $('#date-label').textContent = `${new Date(state.settings.start+'T12:00:00').getFullYear()} 年 ${new Date(state.settings.start+'T12:00:00').getMonth()+1} 月`;
  $('#duration-label').textContent = duration() ? `${duration()} 天` : '待確認';
  const total=state.budgets.reduce((s,b)=>s+Number(b.amount||0),0);
  $('#budget-total').textContent=money(total);
  $('#pending-count').textContent=`${state.checklist.filter(c=>!c.done).length} 項`;
  $('#itinerary-count').textContent = `${state.days.length} 天行程`;
  const itineraryNote = $('#itinerary-count')?.parentElement?.querySelector('small');
  if (itineraryNote) itineraryNote.textContent = `${fmtDate(state.settings.start)}–${fmtDate(state.settings.end)} · 南島環線草案`;
  const done=state.checklist.filter(c=>c.done).length;
  $('#booking-progress').style.width=`${state.checklist.length?done/state.checklist.length*100:0}%`;
  $('#overview-todos').innerHTML=state.checklist.filter(c=>!c.done).slice(0,3).map(c=>`<div class="todo-item"><input type="checkbox" data-check="${c.id}"><div><b>${esc(c.title)}</b><small>${esc(c.note)}</small></div></div>`).join('') || '<p class="footnote">太好了！目前清單已完成。</p>';
  $$('[data-check]').forEach(i=>i.addEventListener('change',()=>{const c=state.checklist.find(x=>x.id==i.dataset.check);if(c)c.done=i.checked;persist();}));
}
function renderDays(){
  $('#days-list').innerHTML=state.days.slice().sort((a,b)=>a.date.localeCompare(b.date)).map((d,i)=>`<article class="day-card"><div class="day-date"><small>DAY ${String(i+1).padStart(2,'0')}</small><b>${fmtDate(d.date).slice(5)}</b></div><div class="day-main"><h3>${esc(d.place)}</h3><p>${esc(d.plan||'尚未填寫計畫')}</p><div class="day-meta"><span>⌁ 預估駕駛 ${Number(d.drive||0)} 小時</span><span>◷ ${fmtDate(d.date)}</span></div></div><div class="day-actions"><button class="small-btn" data-edit-day="${d.id}">編輯</button><button class="small-btn" data-delete-day="${d.id}">刪除</button></div></article>`).join('');
  $$('[data-edit-day]').forEach(b=>b.addEventListener('click',()=>openDay(Number(b.dataset.editDay))));
  $$('[data-delete-day]').forEach(b=>b.addEventListener('click',()=>{if(confirm('確定刪除這一天？')){state.days=state.days.filter(d=>d.id!==Number(b.dataset.deleteDay));persist();}}));
}
function renderBudget(){
  const total=state.budgets.reduce((s,b)=>s+Number(b.amount||0),0);
  $('#budget-total-large').textContent=money(total);$('#budget-item-count').textContent=state.budgets.length;
  $('#budget-rows').innerHTML=state.budgets.map(b=>`<tr><td>${esc(b.category)}</td><td><input aria-label="項目名稱" data-budget-name="${b.id}" value="${attr(b.name)}"></td><td><input aria-label="金額" type="number" min="0" data-budget-amount="${b.id}" value="${Number(b.amount||0)}"></td><td><input aria-label="備註" data-budget-note="${b.id}" value="${attr(b.note||'')}"></td><td><button class="delete" data-delete-budget="${b.id}">刪除</button></td></tr>`).join('');
  $$('[data-budget-name]').forEach(i=>i.addEventListener('change',()=>{const b=state.budgets.find(x=>x.id==i.dataset.budgetName);b.name=i.value;persist();}));
  $$('[data-budget-amount]').forEach(i=>i.addEventListener('change',()=>{const b=state.budgets.find(x=>x.id==i.dataset.budgetAmount);b.amount=Math.max(0,Number(i.value||0));persist();}));
  $$('[data-budget-note]').forEach(i=>i.addEventListener('change',()=>{const b=state.budgets.find(x=>x.id==i.dataset.budgetNote);b.note=i.value;persist();}));
  $$('[data-delete-budget]').forEach(i=>i.addEventListener('click',()=>{state.budgets=state.budgets.filter(x=>x.id!=i.dataset.deleteBudget);persist();}));
}
function renderChecklist(){
  const groups=[...new Set(state.checklist.map(c=>c.group))];
  $('#checklist-groups').innerHTML=groups.map(g=>`<section class="check-group"><h3>${esc(g)}</h3>${state.checklist.filter(c=>c.group===g).map(c=>`<label class="check-row"><input type="checkbox" data-check-id="${c.id}" ${c.done?'checked':''}><span><b>${esc(c.title)}</b><small>${esc(c.note)}</small></span></label>`).join('')}</section>`).join('');
  $$('[data-check-id]').forEach(i=>i.addEventListener('change',()=>{const c=state.checklist.find(x=>x.id==i.dataset.checkId);c.done=i.checked;persist();}));
  const done=state.checklist.filter(c=>c.done).length;$('#checklist-progress').textContent=`${state.checklist.length?Math.round(done/state.checklist.length*100):0}% 完成`;
}
function renderAll(){renderOverview();renderDays();renderBudget();renderChecklist();}
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function attr(s){return esc(s).replace(/`/g,'&#96;');}

const tripDialog=$('#trip-dialog');
$('#edit-trip').addEventListener('click',()=>{
  $('#start-date').value=state.settings.start;$('#end-date').value=state.settings.end;$('#region').value=state.settings.region;$('#target-budget').value=state.settings.targetBudget;
  tripDialog.showModal();
});
$('#trip-form').addEventListener('submit',e=>{
  if(e.submitter?.value!=='save')return;
  e.preventDefault();
  const start=$('#start-date').value,end=$('#end-date').value;
  if(!start||!end||end<start){alert('請確認出發與結束日期。');return;}
  state.settings={start,end,region:$('#region').value,targetBudget:Number($('#target-budget').value||0)};
  tripDialog.close();persist();
});
const dayDialog=$('#day-dialog');
function openDay(id){
  const d=state.days.find(x=>x.id===id);
  $('#day-dialog-title').textContent=d?'編輯行程':'新增一天';
  $('#day-id').value=d?.id||'';$('#day-date').value=d?.date||state.settings.start;
  $('#day-place').value=d?.place||'';$('#day-plan').value=d?.plan||'';$('#day-drive').value=d?.drive??2;
  dayDialog.showModal();
}
$('#add-day').addEventListener('click',()=>openDay(null));
$('#day-form').addEventListener('submit',e=>{
  if(e.submitter?.value!=='save')return;e.preventDefault();
  const id=$('#day-id').value?Number($('#day-id').value):Date.now();
  const item={id,date:$('#day-date').value,place:$('#day-place').value.trim(),plan:$('#day-plan').value.trim(),drive:Number($('#day-drive').value||0)};
  if(!item.date||!item.place){alert('請填寫日期與目的地。');return;}
  const index=state.days.findIndex(x=>x.id===id);if(index>=0)state.days[index]=item;else state.days.push(item);
  dayDialog.close();persist();
});
const budgetDialog=$('#budget-dialog');
$('#add-budget').addEventListener('click',()=>budgetDialog.showModal());
$('#budget-form').addEventListener('submit',e=>{
  if(e.submitter?.value!=='save')return;e.preventDefault();
  state.budgets.push({id:Date.now(),category:$('#budget-category').value,name:$('#budget-name').value.trim(),amount:Number($('#budget-amount').value||0),note:$('#budget-note').value.trim()});
  budgetDialog.close();e.target.reset();persist();
});
function initRealRouteMap(){
  const el = $('#south-island-map');
  if (!el || !window.L) { const status=$('#map-status'); if(status) status.textContent='地圖載入失敗，請重新整理或確認網路連線。'; return; }
  const stops = [
    {name:'Christchurch 基督城',date:'6/25、7/9–10',lat:-43.5321,lon:172.6362,n:1},
    {name:'Wanaka 瓦納卡',date:'6/26–28',lat:-44.6950,lon:169.1360,n:2},
    {name:'Queenstown 皇后鎮',date:'6/29–7/1',lat:-45.0312,lon:168.6626,n:3},
    {name:'Te Anau 蒂阿瑙',date:'7/2',lat:-45.4145,lon:167.7181,n:4},
    {name:'Milford Sound 米爾福德峽灣',date:'7/3 往返支線',lat:-44.6719,lon:167.9250,n:'↔',spur:true},
    {name:'Aoraki / Mt Cook 庫克山',date:'7/4–5',lat:-43.7347,lon:170.0965,n:5},
    {name:'Lake Tekapo 蒂卡波湖',date:'7/6–7',lat:-44.0047,lon:170.4770,n:6},
    {name:'Oamaru 奧瑪魯',date:'7/8',lat:-45.0975,lon:170.9700,n:7}
  ];
  const map=L.map(el,{scrollWheelZoom:false}).setView([-44.3,169.6],6);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
    maxZoom:19, attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap contributors</a>'
  }).addTo(map);
  const iconFor=(label,milford=false)=>L.divIcon({className:'',html:'<div class="route-marker'+(milford?' milford':'')+'">'+label+'</div>',iconSize:[28,28],iconAnchor:[14,14]});
  stops.forEach(s=>L.marker([s.lat,s.lon],{icon:iconFor(s.n,s.spur)}).addTo(map).bindPopup('<b>'+esc(s.name)+'</b><br>'+esc(s.date)));
  const coords=[
    [stops[0].lon,stops[0].lat],[stops[1].lon,stops[1].lat],[stops[2].lon,stops[2].lat],
    [stops[3].lon,stops[3].lat],[stops[4].lon,stops[4].lat],[stops[3].lon,stops[3].lat],
    [stops[5].lon,stops[5].lat],[stops[6].lon,stops[6].lat],[stops[7].lon,stops[7].lat],
    [stops[0].lon,stops[0].lat]
  ];
  const bounds=L.latLngBounds(stops.map(s=>[s.lat,s.lon]));
  map.fitBounds(bounds.pad(0.12));
  const status=$('#map-status');
  (async()=>{
    let routed=0;
    for(let i=0;i<coords.length-1;i++){
      const a=coords[i],b=coords[i+1];
      const isSpur=(i===3||i===4);
      try{
        const url='https://router.project-osrm.org/route/v1/driving/'+a.join(',')+';'+b.join(',')+'?overview=full&geometries=geojson&steps=false';
        const res=await fetch(url);
        if(!res.ok) throw new Error('routing unavailable');
        const data=await res.json();
        if(data.code!=='Ok'||!data.routes?.[0]?.geometry?.coordinates) throw new Error('route unavailable');
        const latlngs=data.routes[0].geometry.coordinates.map(p=>[p[1],p[0]]);
        L.polyline(latlngs,{color:isSpur?'#718b64':'#dc8b56',weight:5,opacity:.9,dashArray:isSpur?'8 9':null,lineCap:'round'}).addTo(map);
        routed++;
      }catch(e){
        L.polyline([[a[1],a[0]],[b[1],b[0]]],{color:isSpur?'#718b64':'#dc8b56',weight:4,opacity:.65,dashArray:'6 8'}).addTo(map);
      }
    }
    if(status) status.textContent=routed===coords.length-1
      ? '道路路線由 OSRM 路由服務計算，底圖 © OpenStreetMap；實際行車仍請依導航與當日路況。'
      : '已顯示真實地圖與站點；部分道路路線服務未回應，虛線段為站點間連線，請勿當作導航。';
    map.invalidateSize();
  })();
}

renderAll();
initRealRouteMap();

