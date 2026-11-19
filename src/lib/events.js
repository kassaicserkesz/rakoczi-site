// Események egyetlen forrásból: a Szerkesztőség (CMS) eseményei + opcionálisan
// egy nyilvános Google Naptár feed (src/data/naptar.json → google_ics_url).
// Ugyanezt használja a kezdőlap, az Események oldal és az .ics-generálás.
import { getCollection } from 'astro:content';
import naptar from '../data/naptar.json';

const slugify = (s) => s.toLowerCase()
  .replace(/[áàâä]/g,'a').replace(/[éèêë]/g,'e').replace(/[íìîï]/g,'i')
  .replace(/[óòôöő]/g,'o').replace(/[úùûüű]/g,'u').replace(/ý/g,'y')
  .replace(/č/g,'c').replace(/š/g,'s').replace(/ž/g,'z').replace(/ť/g,'t')
  .replace(/ď/g,'d').replace(/ň/g,'n').replace(/[ľĺ]/g,'l').replace(/[ŕř]/g,'r')
  .replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'') || 'esemeny';

const unesc = (s) => String(s||'').replace(/\\n/g,' ').replace(/\\([,;\\])/g,'$1').trim();

function icsDate(v) {
  const m = String(v).match(/(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2}))?/);
  if (!m) return null;
  return { date: `${m[1]}-${m[2]}-${m[3]}`, time: m[4] ? `${m[4]}:${m[5]}` : null };
}
const shiftDay = (iso, n) => { const d = new Date(iso+'T00:00:00Z'); d.setUTCDate(d.getUTCDate()+n); return d.toISOString().slice(0,10); };

export function parseIcs(text) {
  const unfolded = text.replace(/\r?\n[ \t]/g, '');
  const out = [];
  for (const block of unfolded.split('BEGIN:VEVENT').slice(1)) {
    const ev = block.split('END:VEVENT')[0];
    const get = (name) => { const m = ev.match(new RegExp('^'+name+'(?:;[^:\\r\\n]*)?:(.*)$','mi')); return m ? m[1].trim() : ''; };
    const title = unesc(get('SUMMARY')); if (!title) continue;
    const ds = icsDate(get('DTSTART')); if (!ds) continue;
    let end = null;
    const deRaw = get('DTEND');
    if (deRaw) {
      const de = icsDate(deRaw);
      if (de) {
        end = de.time ? de.date : shiftDay(de.date, -1);  // egész napos DTEND kizáró
        if (end <= ds.date) end = null;
      }
    }
    out.push({ title, start: ds.date, end, time: ds.time, place: unesc(get('LOCATION')), desc: unesc(get('DESCRIPTION')) });
  }
  return out;
}

export async function getAllEvents() {
  const cms = (await getCollection('esemenyek')).map((e) => ({
    id: e.id,
    data: { ...e.data, ics: e.data.ics || `/esemenyek/${e.id}.ics` },
    body: (e.body || '').trim(),
  }));
  const url = (naptar.google_ics_url || '').trim();
  if (url) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const ext = parseIcs(await res.text());
      const seen = new Set(cms.map((e) => e.data.title.toLowerCase() + '|' + e.data.start));
      let added = 0;
      for (const ev of ext) {
        const key = ev.title.toLowerCase() + '|' + ev.start;
        if (seen.has(key)) continue;
        seen.add(key);
        const id = `${slugify(ev.title)}-${ev.start}`;
        if (cms.some((e) => e.id === id)) continue;
        cms.push({ id, data: { title: ev.title, start: ev.start, end: ev.end || undefined,
                               time: ev.time || undefined, place: ev.place || undefined,
                               ics: `/esemenyek/${id}.ics` }, body: ev.desc });
        added++;
      }
      console.log(`[naptár] Google Naptár szinkron: ${ext.length} esemény a feedben, ${added} új átvéve`);
    } catch (err) {
      console.warn('[naptár] A Google Naptár feed most nem érhető el — csak a Szerkesztőség eseményei jelennek meg. Ok:', err.message);
    }
  }
  return cms.sort((a, b) => a.data.start.localeCompare(b.data.start));
}

const escIcs = (s) => String(s||'').replace(/\\/g,'\\\\').replace(/;/g,'\\;').replace(/,/g,'\\,').replace(/\r?\n/g,'\\n');
const dt = (iso) => iso.replace(/-/g, '');

export function eventVevent(e) {
  const d = e.data;
  let when;
  if (d.time) {
    when = `DTSTART:${dt(d.start)}T${d.time.replace(':','')}00\r\n`;
  } else {
    when = `DTSTART;VALUE=DATE:${dt(d.start)}\r\nDTEND;VALUE=DATE:${dt(shiftDay(d.end || d.start, 1))}\r\n`;
  }
  return 'BEGIN:VEVENT\r\n'
    + `UID:${e.id}@kassaicserkesz.sk\r\n`
    + `DTSTAMP:${dt(d.start)}T000000Z\r\n`
    + when
    + `SUMMARY:${escIcs(d.title)}\r\n`
    + (d.place ? `LOCATION:${escIcs(d.place)}\r\n` : '')
    + (e.body ? `DESCRIPTION:${escIcs(e.body)}\r\n` : '')
    + 'END:VEVENT\r\n';
}
export function eventIcs(e) {
  return 'BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//kassaicserkesz.sk//esemenyek//HU\r\n' + eventVevent(e) + 'END:VCALENDAR\r\n';
}
export function feedIcs(events) {
  return 'BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//kassaicserkesz.sk//naptar//HU\r\nX-WR-CALNAME:Kassai cserkészek\r\n'
    + events.map(eventVevent).join('') + 'END:VCALENDAR\r\n';
}
