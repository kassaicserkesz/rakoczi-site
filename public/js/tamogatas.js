{
const segs=[...document.querySelectorAll('.seg button')],amts=[...document.querySelectorAll('.amt')],pers=[...document.querySelectorAll('.amt .per')],donBtn=document.getElementById('don-btn');
let mode='egyszeri';
segs.forEach(s=>s.addEventListener('click',()=>{mode=s.dataset.mode;
segs.forEach(o=>o.setAttribute('aria-pressed',String(o===s)));
pers.forEach(p=>p.hidden=(mode==='egyszeri'));
donBtn.querySelector('.don-label').textContent=(mode==='egyszeri'?donBtn.dataset.lblOnce:donBtn.dataset.lblMonthly);}));
amts.forEach(a=>a.addEventListener('click',()=>amts.forEach(o=>o.setAttribute('aria-pressed',String(o===a)))));
pers.forEach(p=>p.hidden=true);


const ic=document.getElementById('iban-copy');
if(ic)ic.addEventListener('click',()=>{const t=document.querySelector('.iban').textContent.trim();
if(navigator.clipboard)navigator.clipboard.writeText(t);
const o=ic.innerHTML;ic.innerHTML='Kimásolva ✓';setTimeout(()=>ic.innerHTML=o,1600);});
}