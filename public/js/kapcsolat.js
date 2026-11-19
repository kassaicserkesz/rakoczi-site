{
{const f=document.getElementById('cform');
if(f){const st=document.getElementById('cf-status');const btn=f.querySelector('button[type=submit]');
f.addEventListener('submit',async e=>{e.preventDefault();
const key=(f.querySelector('[name=access_key]')||{}).value||'';
if(!key||key.indexOf('IDE-JON')===0){st.textContent=f.dataset.nokey;st.className='cf-status cf-err';return;}
btn.disabled=true;st.textContent=f.dataset.sending;st.className='cf-status';
try{const r=await fetch('https://api.web3forms.com/submit',{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(f)))});
const d=await r.json();
if(!d.success)throw 0;
st.textContent=f.dataset.ok;st.className='cf-status cf-ok';f.reset();}
catch(_){st.textContent=f.dataset.err;st.className='cf-status cf-err';}
btn.disabled=false;});}}
}