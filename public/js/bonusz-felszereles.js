{
document.querySelectorAll('.pk-panel').forEach(p=>{
 const boxes=[...p.querySelectorAll('input[type=checkbox]')],count=p.querySelector('.pk-count'),fill=p.querySelector('.pk-fill'),total=+count.dataset.total;
 function upd(){const n=boxes.filter(b=>b.checked).length;count.textContent=n+' / '+total;fill.style.width=(100*n/total)+'%';}
 boxes.forEach(b=>b.addEventListener('change',upd));
 p.querySelector('.pk-reset').addEventListener('click',()=>{boxes.forEach(b=>b.checked=false);upd();});
 p.querySelector('.pk-print').addEventListener('click',()=>{
  document.body.classList.add('print-one');p.classList.add('print-me');p.open=true;window.print();});
 upd();
});
let _pkOpen=null,_pkTheme=null;
window.addEventListener('beforeprint',()=>{
 _pkTheme=document.documentElement.dataset.theme;document.documentElement.dataset.theme='light';
 if(!document.body.classList.contains('print-one')){
  _pkOpen=[...document.querySelectorAll('.pk-panel')].map(p=>p.open);
  document.querySelectorAll('.pk-panel').forEach(p=>p.open=true);}});
window.addEventListener('afterprint',()=>{
 if(_pkTheme)document.documentElement.dataset.theme=_pkTheme;_pkTheme=null;
 document.body.classList.remove('print-one');
 document.querySelectorAll('.print-me').forEach(e=>e.classList.remove('print-me'));
 if(_pkOpen){document.querySelectorAll('.pk-panel').forEach((p,i)=>p.open=_pkOpen[i]);_pkOpen=null;}});
}