
{try{if(sessionStorage.getItem('rv1'))document.documentElement.classList.add('no-reveal');else sessionStorage.setItem('rv1','1');}catch(e){}
if(location.hash&&document.getElementById(location.hash.slice(1))){
 setTimeout(()=>{history.replaceState(null,'',location.pathname+location.search);},800);}
document.addEventListener('click',e=>{
 const a=e.target.closest('a[aria-current="page"],a[aria-current="true"]');
 if(!a)return;e.preventDefault();
 if(a.getAttribute('aria-current')==='page')window.scrollTo({top:0,behavior:'smooth'});});}
{const t=document.getElementById("mobile-menu"),s=document.getElementById("menu-panel"),m=document.getElementById("menu-overlay"),c=document.getElementById("menu-open"),i=document.getElementById("menu-close");if(t&&s&&m&&c&&i){let l=null;const f=()=>Array.from(s.querySelectorAll("a[href], button:not([disabled])")),a=e=>{if(e.key==="Escape"){e.preventDefault(),n();return}if(e.key!=="Tab")return;const o=f();if(o.length===0)return;const r=o[0],u=o[o.length-1],d=document.activeElement;e.shiftKey&&(d===r||!s.contains(d))?(e.preventDefault(),u.focus()):!e.shiftKey&&d===u&&(e.preventDefault(),r.focus())},y=()=>{l=document.activeElement,t.classList.remove("hidden"),requestAnimationFrame(()=>t.classList.add("menu-open")),c.setAttribute("aria-expanded","true"),document.body.style.overflow="hidden",document.addEventListener("keydown",a),i.focus()},n=()=>{t.classList.remove("menu-open"),c.setAttribute("aria-expanded","false"),document.body.style.overflow="",document.removeEventListener("keydown",a);const e=()=>t.classList.add("hidden");window.matchMedia("(prefers-reduced-motion: reduce)").matches?e():setTimeout(e,260),l?.focus()};c.addEventListener("click",y),i.addEventListener("click",n),m.addEventListener("click",n),s.addEventListener("click",e=>{e.target.closest("a")&&n()})}}
{const s=window.matchMedia("(prefers-reduced-motion: reduce)").matches,o=document.querySelectorAll("[data-reveal]");if(!s&&"IntersectionObserver"in window&&o.length){const r=new IntersectionObserver(e=>{for(const t of e)t.isIntersecting&&(t.target.classList.add("revealed"),r.unobserve(t.target))},{threshold:.15,rootMargin:"0px 0px -5% 0px"});for(const e of o)e.classList.add("will-reveal"),r.observe(e)}}
{document.querySelectorAll(".nav-drop").forEach(d=>{const b=d.querySelector(".nav-drop-toggle");if(!b)return;const s=o=>{d.classList.toggle("open",o);b.setAttribute("aria-expanded",String(o))};let t=null;b.addEventListener("click",()=>s(!d.classList.contains("open")));if(window.matchMedia("(hover:hover) and (pointer:fine)").matches){d.addEventListener("mouseenter",()=>{clearTimeout(t);s(!0)});d.addEventListener("mouseleave",()=>{t=setTimeout(()=>s(!1),140)})}d.addEventListener("focusout",e=>{d.contains(e.relatedTarget)||s(!1)});document.addEventListener("keydown",e=>{e.key==="Escape"&&d.classList.contains("open")&&(s(!1),b.focus())});document.addEventListener("click",e=>{d.contains(e.target)||s(!1)})});}
{(function(){var drops=document.querySelectorAll("[data-mdrop]");function collapse(){drops.forEach(function(d){var b=d.querySelector(".mdrop-toggle"),m=d.querySelector(".mdrop-menu");if(b)b.setAttribute("aria-expanded","false");if(m)m.hidden=true;});}drops.forEach(function(d){var b=d.querySelector(".mdrop-toggle"),m=d.querySelector(".mdrop-menu");if(!b||!m)return;b.addEventListener("click",function(e){e.preventDefault();var open=b.getAttribute("aria-expanded")==="true";b.setAttribute("aria-expanded",open?"false":"true");m.hidden=open;});});var opener=document.getElementById("menu-open");if(opener)opener.addEventListener("click",collapse);})();}
{const root=document.documentElement;
let manual=null;try{const s=localStorage.getItem('theme');if(s==='dark')manual=true;if(s==='light')manual=false;}catch(e){}
const mqDark=window.matchMedia?window.matchMedia('(prefers-color-scheme: dark)'):null;
const autoDark=()=>{if(mqDark&&mqDark.matches)return true;const h=new Date().getHours();return h>=21||h<6;};
if(mqDark&&mqDark.addEventListener)mqDark.addEventListener('change',()=>{if(manual===null)applyTheme();});
const applyTheme=()=>{const dark=manual===null?autoDark():manual;
root.dataset.theme=dark?'dark':'light';
document.querySelectorAll('.theme-toggle').forEach(b=>{b.setAttribute('aria-pressed',String(dark));b.title=dark?'Világos mód':'Sötét mód';});};
document.addEventListener('click',e=>{const t=e.target.closest('.theme-toggle');if(!t)return;manual=(root.dataset.theme!=='dark');
try{localStorage.setItem('theme',manual?'dark':'light');}catch(e){}applyTheme();});
applyTheme();setInterval(()=>{if(manual===null)applyTheme();},60000);}

{const p=location.pathname.replace(/\/+$/,'')||'/';
document.querySelectorAll('.ribnav[href]').forEach(a=>{const h=a.getAttribute('href');
if(h && h!=='/' && (p===h||p.startsWith(h+'/')))a.setAttribute('aria-current','page');});}
