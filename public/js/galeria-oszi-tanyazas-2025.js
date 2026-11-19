{
const tiles=[...document.querySelectorAll('.alb-tile')],lb=document.getElementById('lb'),im=document.getElementById('lb-img'),ct=document.getElementById('lb-count');
let idx=0,ret=null;
const show=i=>{idx=(i+tiles.length)%tiles.length;im.src=tiles[idx].dataset.full;im.alt=tiles[idx].dataset.alt;ct.textContent=(idx+1)+' / '+tiles.length};
const open=i=>{ret=document.activeElement;show(i);lb.hidden=false;document.body.style.overflow='hidden';document.getElementById('lb-close').focus()};
const close=()=>{lb.hidden=true;document.body.style.overflow='';ret?.focus()};
tiles.forEach((t,i)=>t.addEventListener('click',()=>open(i)));
document.getElementById('lb-close').addEventListener('click',close);
document.getElementById('lb-prev').addEventListener('click',()=>show(idx-1));
document.getElementById('lb-next').addEventListener('click',()=>show(idx+1));
lb.addEventListener('click',e=>{if(e.target===lb)close()});
document.addEventListener('keydown',e=>{if(lb.hidden)return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(idx-1);if(e.key==='ArrowRight')show(idx+1)});
}