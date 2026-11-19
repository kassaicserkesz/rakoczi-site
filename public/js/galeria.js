{
const yearSel=document.getElementById('gal-year'),cards=[...document.querySelectorAll('.gal-card')],more=document.getElementById('gal-more');
let mode='all',expanded=false;
function apply(){
  cards.forEach(c=>{
    const y=c.dataset.year,old='older' in c.dataset;
    c.hidden = mode==='all' ? (old&&!expanded) : y!==mode;
  });
  if(more) more.hidden = mode!=='all' || expanded;
}
if(yearSel) yearSel.addEventListener('change',()=>{mode=yearSel.value;apply();});
if(more) more.addEventListener('click',()=>{expanded=true;apply();more.blur()});
apply();
}
