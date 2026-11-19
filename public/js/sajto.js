{
const b=document.getElementById('copy-boiler');
if(b&&navigator.clipboard){b.addEventListener('click',()=>{
navigator.clipboard.writeText(document.getElementById('boiler-text').textContent.trim()).then(()=>{
const t=b.querySelector('.copy-label');const o=t.textContent;t.textContent='Kimásolva ✓';setTimeout(()=>t.textContent=o,1800);});});}
}