const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const storeKey = 'wildFernNZ2027';
const defaultState = {
  settings: { start: '2027-07-01', end: '2027-07-14', region: 'south', targetBudget: 250000 },
  days: [
    { id: 1, date: '2027-07-01', place: 'Christchurch 基督城', plan: '抵達、領取露營車、超市採買與熟悉車輛設備。若長途飛行後疲勞，建議先住市區或附近營地。', drive: 0 },
    { id: 2, date: '2027-07-02', place: 'Lake Tekapo 蒂卡波湖', plan: '白天移動，沿途留意天氣與路面狀況。視天候安排湖邊散步，夜間活動以天候為準。', drive: 3 },
    { id: 3, date: '2027-07-03', place: 'Aoraki / Mount Cook 庫克山', plan: '視步道開放狀況選擇短程步道；若有雪、冰或強風，改為觀景點或室內活動。', drive: 1.5 },
    { id: 4, date: '2027-07-04', place: 'Queenstown 皇后鎮', plan: '保留彈性移動日。不要只按地圖距離估算車程；遇到惡劣路況時可延住。', drive: 3.5 }
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
renderAll();
