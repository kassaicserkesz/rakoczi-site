# kassaicserkesz.sk — a 17.sz. II. Rákóczi Ferenc cserkészcsapat weboldala

Astro-alapú statikus oldal. A jóváhagyott előnézetekből portolva — a build pixelre egyezően
adja vissza őket (ellenőrizve minden oldalon, világos + sötét, asztali + mobil).

**→ Élesítéshez és átvételhez az [ATADAS.md](ATADAS.md) a részletes, lépésről lépésre útmutató.**

## Parancsok

```bash
npm install        # egyszer, függőségek
npm run dev        # fejlesztői szerver: http://localhost:4321
npm run build      # éles build a dist/ mappába
npm run preview    # a dist/ helyi megtekintése
```

## Szerkezet — „egy helyen módosítasz, mindenhol frissül”

- `src/layouts/Base.astro` — minden oldal kerete (head, fejléc, „Kövess minket”, lábléc, mobilmenü, szkriptek, hreflang)
- `src/partials/_header.html` — **a fejléc/eszköztár, EGY példányban** (módosítás → minden oldal)
- `src/partials/_social.html` — **a „Kövess minket” sáv, EGY példányban**
- `src/partials/_footer.html`, `_drawer.html` — lábléc és mobilmenü
- `src/partials/_*_sk.html`, `_*_en.html` — ugyanezek szlovákul és angolul
- `src/partials/<oldal>.html` — az egyes oldalak tartalma
- `src/pages/*.astro` — az útvonalak (route-ok); új oldal = új fájl ide; `sk/`, `en/` a fordítások
- `src/content/beszamolok/`, `src/content/esemenyek/` — a Szerkesztőség által kezelt tartalom (markdown)
- `src/data/` — Szerkesztőségből állítható beállítások (adománymérő, Google Naptár szinkron)
- `public/admin/` — Szerkesztőség (Sveltia CMS); élesítése: ATADAS.md 5. pont
- `public/css/global.css` — betűk, design-tokenek, közös komponensek, **sötét téma**
- `public/css/<oldal>.css`, `public/js/<oldal>.js` — oldalspecifikus stílus/logika
- `public/js/site.js` — közös interakciók + témaváltó + aktív menüpont
- `public/images/`, `public/fonts/` — eszközök (a rovás-betűtípus a Titkosírások oldal CSS-ébe ágyazva)
- `src/lib/events.js` — az események közös forrása: CMS + (opcionálisan) Google Naptár feed;
  minden eseményhez automatikus `.ics`, plusz feliratkozható naptár (`/esemenyek/naptar.ics`)
- `src/data/naptar.json` — a Google Naptár szinkron beállítása (ATADAS.md 7. pont)
- `.github/workflows/napi-frissites.yml` — napi újraépítés a naptárszinkronhoz (ATADAS.md 7. pont)

## Sötét téma

A világos pontos inverze (zöld ⇄ papír csere). Automatikusan sötét 21:00 és 6:00 között a
látogató órája szerint, és akkor is, ha a látogató rendszere sötét módban van
(`prefers-color-scheme`); a fejléc hold/nap gombja kézzel váltja, a választást a böngésző
megjegyzi (`localStorage`). Csökkentett mozgás beállításnál az animációk kikapcsolnak.

## Nyelvek

A fejléc HU/SK/EN kapcsolója él. Szlovákul és angolul a kezdőlap (`/sk/`, `/en/`), a
Csatlakozás (`/sk/pridaj-sa`, `/en/join`), a Kapcsolat (`/sk/kontakt`, `/en/contact`) és —
a 2%-os adófelajánlás miatt — szlovákul a Támogatás (`/sk/podpora`) is érhető el; a többi
menüpont a magyar oldalakra visz. A `<head>`-ben hreflang-alternatívák
segítik a keresőket.

## SEO / indulócsomag

Sitemap (`/sitemap-index.xml`), `robots.txt`, közösségi megosztókép (og:image),
apple-touch-icon, JSON-LD szervezet-adatok a kezdőlapon, biztonsági fejlécek (`_headers`).

## Élesítés (röviden — részletesen: ATADAS.md)

1. Tölts fel mindent egy GitHub repóba (a `node_modules/` és `dist/` nélkül — `.gitignore` kész).
2. Cloudflare Pages → Create project → repo kiválasztása.
   Build command: `npm run build` · Output: `dist` — kész.
3. Custom domain: `kassaicserkesz.sk` · a 404-oldalt a Pages automatikusan használja.
4. Szerkesztőség: `public/admin/config.yml`-ben a repo átírása + OAuth (ATADAS.md 5. pont).
5. Analitika: Cloudflare Web Analytics bekapcsolása (süti nélküli).

## Ami még minta / élesítés előtti teendő

- Jelentkezési űrlap linkje + PDF (Csatlakozás), IBAN + 2% adatok és Vyhlásenie PDF
  (Támogatás), Stripe fizetési linkek, valós események (Szerkesztőségből vagy Google
  Naptár szinkronnal — a naptárfájlok magától készülnek), a Kapcsolat-űrlap Web3Forms
  kulcsa (ATADAS.md 6. pont), adatvédelmi oldal adatai.
- A Rólunk oldal `[IDE JÖN: …]` helyeinek kitöltése.
- Teljes lista: ATADAS.md 9. pont.
