{
const LANG = document.documentElement.lang || 'hu';
const I18N = {
  hu: {
    emptyRovas: 'Ide kerül a rovásírás…',
    emptyMorze: 'Ide kerül a morzekód…',
    abcRovas: 'A rovás-ábécé',
    abcMorze: 'A morze-ábécé',
    copied: ' Kimásolva!',
    play: 'Lejátszás',
    stop: 'Leállítás'
  },
  sk: {
    emptyRovas: 'Sem sa prepíše rováš…',
    emptyMorze: 'Sem sa prepíše morzeovka…',
    abcRovas: 'Abeceda rovášu',
    abcMorze: 'Morzeova abeceda',
    copied: ' Skopírované!',
    play: 'Prehrať',
    stop: 'Zastaviť'
  },
  en: {
    emptyRovas: 'Runic script will appear here…',
    emptyMorze: 'Morse code will appear here…',
    abcRovas: 'Runic alphabet',
    abcMorze: 'Morse alphabet',
    copied: ' Copied!',
    play: 'Play',
    stop: 'Stop'
  }
};
const T = I18N[LANG] || I18N.hu;

// ── Átíró-állomás: rovás + morze, egy kapcsolóval ──
const RMAP={"a": "𐳀", "á": "𐳁", "b": "𐳂", "c": "𐳄", "cs": "𐳆", "d": "𐳇", "dz": "𐳇𐳯", "dzs": "𐳇𐳰", "e": "𐳉", "é": "𐳋", "f": "𐳌", "g": "𐳍", "gy": "𐳎", "h": "𐳏", "i": "𐳐", "í": "𐳑", "j": "𐳒", "k": "𐳓", "l": "𐳖", "ly": "𐳗", "m": "𐳘", "n": "𐳙", "ny": "𐳚", "o": "𐳛", "ó": "𐳜", "ö": "𐳝", "ő": "𐳟", "p": "𐳠", "r": "𐳢", "s": "𐳤", "sz": "𐳥", "t": "𐳦", "ty": "𐳨", "u": "𐳪", "ú": "𐳫", "ü": "𐳬", "ű": "𐳭", "v": "𐳮", "z": "𐳯", "zs": "𐳰", "ch": "𐳩", "q": "𐳓𐳮", "w": "𐳮", "x": "𐳓𐳥", "y": "𐳐", "ccs": "𐳆𐳆", "ggy": "𐳎𐳎", "lly": "𐳗𐳗", "nny": "𐳚𐳚", "ssz": "𐳥𐳥", "tty": "𐳨𐳨", "zzs": "𐳰𐳰"};
const RKEYS=Object.keys(RMAP).sort((a,b)=>b.length-a.length);
const RNUM=[[1000,'\u{10CFF}'],[100,'\u{10CFE}'],[50,'\u{10CFD}'],[10,'\u{10CFC}'],[5,'\u{10CFB}'],[1,'\u{10CFA}']];
const REXC=[['község','köz|ség'],['egészség','egész|ség'],['igazság','igaz|ság'],['gazság','gaz|ság'],['vízszint','víz|szint'],['házsor','ház|sor'],['pénzsóvár','pénz|sóvár']];
function rovasNum(str){let n=parseInt(str,10);if(!isFinite(n)||n<=0||n>9999)return null;let o='';for(const[v,c]of RNUM){while(n>=v){o+=c;n-=v;}}return o;}
function toRovas(t){
 let s=t.toLowerCase();
 for(const[a,b]of REXC)s=s.split(a).join(b);
 let o='',i=0;
 while(i<s.length){
  if(s[i]==='|'){i++;continue;}
  const m=s.slice(i).match(/^\d+/);
  if(m){const rn=rovasNum(m[0]);o+=rn??m[0];i+=m[0].length;continue;}
  let hit=null;
  for(const k of RKEYS){if(s.startsWith(k,i)){hit=k;break;}}
  if(hit){o+=RMAP[hit];i+=hit.length;}else{o+=s[i];i+=1;}
 }
 return o;
}
const MMAP={"a": ".-", "á": ".--.-", "b": "-...", "c": "-.-.", "d": "-..", "e": ".", "é": "..-..", "f": "..-.", "g": "--.", "h": "....", "i": "..", "í": "..", "j": ".---", "k": "-.-", "l": ".-..", "m": "--", "n": "-.", "o": "---", "ó": "---", "ö": "---.", "ő": "---.", "p": ".--.", "q": "--.-", "r": ".-.", "s": "...", "t": "-", "u": "..-", "ú": "..-", "ü": "..--", "ű": "..--", "v": "...-", "w": ".--", "x": "-..-", "y": "-.--", "z": "--..", "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.", ".": ".-.-.-", ",": "--..--", "?": "..--..", "!": "-.-.--", "-": "-....-", "/": "-..-.", "(": "-.--.", ")": "-.--.-", "=": "-...-", "+": ".-.-.", "@": ".--.-.", "'": ".----.", "\"": ".-..-.", ":": "---..."};
function toMorse(t){
 return t.toLowerCase().split(/\s+/).filter(Boolean)
  .map(w=>[...w].map(c=>MMAP[c]||'').filter(Boolean).join(' ')).join('  /  ');
}
// ── állapot + váltó ──
const inp=document.getElementById('tk-in'),out=document.getElementById('tk-out');
const segBtns=[...document.querySelectorAll('.tk-seg button')];
let mode='rovas';
function render(){out.textContent=mode==='rovas'?toRovas(inp.value.trim()):toMorse(inp.value.trim());}
function setMode(m){
 if(player)stopMorse();
 mode=m;
 segBtns.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===m)));
 out.classList.toggle('tk-out-rovas',m==='rovas');
 out.classList.toggle('tk-out-morse',m==='morze');
 out.dataset.empty=m==='rovas'?T.emptyRovas:T.emptyMorze;
 document.getElementById('tk-morse-ctl').hidden=m!=='morze';
 document.getElementById('hint-rovas').hidden=m!=='rovas';
 document.getElementById('hint-morze').hidden=m!=='morze';
 document.getElementById('abc-rovas').hidden=m!=='rovas';
 document.getElementById('abc-morze').hidden=m!=='rovas'&&m!=='morze'?true:m!=='morze';
 document.getElementById('tk-abc-t').textContent=m==='rovas'?T.abcRovas:T.abcMorze;
 render();
}
segBtns.forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.mode)));
inp.addEventListener('input',render);
document.getElementById('tk-copy').addEventListener('click',async e=>{
 const b=e.currentTarget;try{await navigator.clipboard.writeText(out.textContent);const t=b.lastChild.textContent;b.lastChild.textContent=T.copied;setTimeout(()=>b.lastChild.textContent=t,1400);}catch(_){}
});
// ── Felolvasás (magyar) ──
const ttsBtn=document.getElementById('tk-speak'),ttsNote=document.getElementById('tts-note');
let voices=[];
function loadVoices(){voices=window.speechSynthesis?speechSynthesis.getVoices():[];}
if('speechSynthesis'in window){loadVoices();speechSynthesis.addEventListener('voiceschanged',loadVoices);}
ttsBtn.addEventListener('click',()=>{
 if(!('speechSynthesis'in window)){ttsNote.classList.add('on');return;}
 if(speechSynthesis.speaking){speechSynthesis.cancel();return;}
 const text=inp.value.trim();if(!text)return;
 loadVoices();
 const hu=voices.find(v=>v.lang&&v.lang.toLowerCase().startsWith('hu'));
 if(voices.length&&!hu){ttsNote.classList.add('on');return;}
 const u=new SpeechSynthesisUtterance(text);
 u.lang='hu-HU';if(hu)u.voice=hu;u.rate=.95;
 speechSynthesis.cancel();speechSynthesis.speak(u);
});
// ── Morze-lejátszó ──
const moPlay=document.getElementById('tk-play'),moLamp=document.getElementById('tk-lamp');
const wpmIn=document.getElementById('tk-wpm'),wpmVal=document.getElementById('tk-wpm-val');
const volIn=document.getElementById('tk-vol'),volVal=document.getElementById('tk-vol-val');
wpmIn.addEventListener('input',()=>{wpmVal.textContent=wpmIn.value;});
const getVol=()=>Math.max(0,Math.min(1,(+(volIn?volIn.value:70))/100))*0.8;
if(volIn){
 volIn.addEventListener('input',()=>{
  if(volVal)volVal.textContent=volIn.value;
  if(player&&player.volGain&&actx){
   player.volGain.gain.setTargetAtTime(getVol(),actx.currentTime,.01);
  }
 });
}
let actx=null,player=null;
function stopMorse(){
 if(!player)return;
 try{player.gain.gain.cancelScheduledValues(actx.currentTime);player.gain.gain.setTargetAtTime(0,actx.currentTime,.004);player.osc.stop(actx.currentTime+.06);}catch(_){}
 cancelAnimationFrame(player.raf);moLamp.classList.remove('on');
 moPlay.classList.remove('playing');moPlay.querySelector('.tk-play-t').textContent=T.play;
 player=null;
}
moPlay.addEventListener('click',()=>{
 if(player){stopMorse();return;}
 const code=toMorse(inp.value.trim());if(!code)return;
 actx=actx||new (window.AudioContext||window.webkitAudioContext)();
 if(actx.state==='suspended')actx.resume();
 const unit=1.2/(+wpmIn.value||12);
 const ons=[];let t=0;
 for(const word of code.split('  /  ')){
  for(const letter of word.split(' ')){
   for(const sym of letter){const d=sym==='-'?3*unit:unit;ons.push([t,d]);t+=d+unit;}
   t+=2*unit;
  }
  t+=4*unit;
 }
 const osc=actx.createOscillator(),gain=actx.createGain(),volGain=actx.createGain();
 osc.type='sine';osc.frequency.value=650;gain.gain.value=0;volGain.gain.value=getVol();
 osc.connect(gain).connect(volGain).connect(actx.destination);
 const base=actx.currentTime+.12;
 for(const[s,d]of ons){
  gain.gain.setTargetAtTime(1,base+s,.004);
  gain.gain.setTargetAtTime(0,base+s+d,.004);
 }
 osc.start(base);const endT=base+t+.2;osc.stop(endT);
 moPlay.classList.add('playing');moPlay.querySelector('.tk-play-t').textContent=T.stop;
 function tick(){
  if(!player)return;
  const now=actx.currentTime-base;
  const on=ons.some(([s,d])=>now>=s&&now<=s+d);
  moLamp.classList.toggle('on',on);
  if(actx.currentTime>endT){stopMorse();return;}
  player.raf=requestAnimationFrame(tick);
 }
 player={osc,gain,volGain,raf:0};
 player.raf=requestAnimationFrame(tick);
});
}