{
const months=[...document.querySelectorAll('.cal-month')],
prev=document.getElementById('cal-prev'),next=document.getElementById('cal-next'),
selY=document.getElementById('cal-year'),selM=document.getElementById('cal-month-sel');
let i=months.findIndex(m=>!m.hidden);
function go(n){i=Math.max(0,Math.min(months.length-1,n));months.forEach((m,k)=>m.hidden=k!==i);
const [y,mo]=months[i].id.slice(2).split('-');selY.value=y;selM.value=String(+mo);
prev.disabled=i===0;next.disabled=i===months.length-1;}
prev.addEventListener('click',()=>go(i-1));next.addEventListener('click',()=>go(i+1));
function fromSel(){const id=`m-${selY.value}-${String(selM.value).padStart(2,'0')}`;go(months.findIndex(m=>m.id===id));}
selY.addEventListener('change',fromSel);selM.addEventListener('change',fromSel);
go(i);
// subscribe dropdown
const sd=document.getElementById('sub-drop'),sb=document.getElementById('sub-btn');
if(sd&&sb){const s=o=>{sd.classList.toggle('open',o);sb.setAttribute('aria-expanded',String(o))};
sb.addEventListener('click',()=>s(!sd.classList.contains('open')));
document.addEventListener('click',e=>{sd.contains(e.target)||s(!1)});
sd.addEventListener('focusout',e=>{sd.contains(e.relatedTarget)||s(!1)});
document.addEventListener('keydown',e=>{e.key==='Escape'&&sd.classList.contains('open')&&(s(!1),sb.focus())});}
}