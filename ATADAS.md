# ÁTADÁSI ÚTMUTATÓ — kassaicserkesz.sk

Szia! Ez az útmutató neked szól, aki átveszed a csapat új weboldalát. Nem kell hozzá
programozónak lenned — lépésről lépésre végigvezet mindenen: hogyan kerül fel az oldal
az internetre, hogyan élesíted a Szerkesztőséget, és mit kell még kitölteni indulás előtt.
Tedd félre rá egy délutánt, és a végére élesben lesz az oldal.

---

## 1. Mit kaptál pontosan?

Ez a mappa (`rakoczi-site/`) a teljes weboldal forráskódja. [Astro](https://astro.build)
nevű eszközzel készült, ami a forrásból **sima statikus HTML-oldalakat** állít elő — nincs
adatbázis, nincs szerver-oldali program, ezért gyors, biztonságos és ingyen üzemeltethető.

Ami már kész és ellenőrzött:

- mind a 17 oldal (kezdőlap, Rólunk, Galéria + albumok, Események, Kapcsolat, Csatlakozás,
  Sajtó, Partnerek, Támogatás, Bónusz + 5 aloldal, 404),
- Titkosírások oldal a Bónusz alatt: rovásírás-átíró (hivatalos Unicode-jelekkel, saját
  betűtípussal, magyar felolvasással) és morze-állomás (hanggal, villogó lámpával,
  állítható tempóval) — mind a böngészőben fut, szerver nélkül,
- sötét téma (a világos pontos inverze; 21:00 után vagy sötét rendszerbeállításnál
  automatikus, kézzel is kapcsolható, a látogató választását megjegyzi),
- szlovák és angol változat a kulcsoldalakból (kezdőlap, Csatlakozás, Kapcsolat, továbbá
  szlovákul a Támogatás is — a 2% miatt) — a fejlécben lévő HU/SK/EN kapcsolóval,
- üzenetküldő űrlap a Kapcsolat oldalon (élesítése lentebb, 6. pont),
- adatvédelmi tájékoztató magyarul és szlovákul (`/adatvedelem`,
  `/sk/ochrana-osobnych-udajov`) — a láblécből minden oldalról elérhető,
- automatikus naptárfájlok: minden eseményhez magától készül letölthető .ics, és a
  teljes csapatnaptár egyetlen feliratkozható címen él (`/esemenyek/naptar.ics`) —
  az Események oldal „Naptár hozzáadása” gombja ezt használja, beállítás nélkül működik,
- Google Naptár szinkron: ha a Szerkesztőségben megadjátok a csapat nyilvános Google
  Naptárának címét, az oldal minden újraépítéskor magától átveszi belőle az eseményeket
  (élesítése lentebb, 7. pont),
- nyomtatóbarát felszerelési lista (a Bónusz oldalon — nyomtatásnál magától tiszta,
  fekete-fehér, pipálható A4-es lap lesz belőle),
- Szerkesztőség (`/admin/` — Sveltia CMS): a beszámolókat és az eseménynaptárat
  böngészőből lehet szerkeszteni, kód nélkül (élesítése lentebb),
- SEO-alapok: sitemap, robots.txt, közösségi megosztókép, strukturált adatok.

---

## 2. Kell-e git és GitHub? (rövid válasz: erősen ajánlott)

Bendi kérdezte, hogy kötelező-e a git repo, és mik az alternatívák. Íme a kép:

**Az ajánlott út: GitHub + Cloudflare Pages.** Mindkettő ingyenes erre a méretre, és így
működik a legkényelmesebben minden:

1. a weboldal forrása egy GitHub repóban él (ez egyben biztonsági mentés és
   változásnapló is — mindig vissza lehet állni egy korábbi állapotra),
2. a Cloudflare Pages figyeli a repót, és **minden módosítás után magától újraépíti és
   kirakja az oldalt** (1–2 perc),
3. a Szerkesztőség (Sveltia CMS) **csak így működik** — az a lényege, hogy a mentés
   egy git-módosítás, amiből automatikusan új oldal épül.

**Alternatívák git nélkül** (működnek, de a Szerkesztőség nem megy velük, és minden
frissítés kézi munka):

- *Cloudflare Pages „Direct Upload”*: a gépeden lefuttatod az `npm run build`-et, és a
  kész `dist/` mappát a böngészőben felhúzod a Cloudflare-re. Git nem kell hozzá.
- *Bármilyen statikus tárhely*: mivel a build kimenete sima HTML+CSS+JS, a `dist/` mappa
  feltölthető Netlify-ra, vagy akár hagyományos webtárhelyre FTP-vel is.

Ha csak évi néhány frissítés lesz és senki nem akar GitHubot, a Direct Upload is elég.
De ha azt akarjátok, hogy a vezetők maguk tölthessenek fel beszámolót tábor után a
telefonjukról/gépükről, kell a GitHub-os út. **Az útmutató innentől ezt írja le.**

---

## 3. GitHub repo létrehozása (git-tudás nélkül is megy)

1. Regisztrálj / lépj be a [github.com](https://github.com)-on (jó a csapat közös
   fiókja is, pl. `kassaicserkesz`).
2. Jobb felül **+ → New repository**. Név: `kassaicserkesz-sk`. Legyen **Private**.
   Semmilyen pipát ne tegyél be (README stb. ne legyen), majd **Create repository**.
3. Töltsd fel a `rakoczi-site` mappa **tartalmát** (nem magát a mappát).
   Jó hír: a mappában **már van kész git-történet** (egy első commit), így csak be kell
   kötni és feltölteni:
   - *Legegyszerűbb*: telepítsd a [GitHub Desktop](https://desktop.github.com) programot,
     **File → Add local repository** → válaszd ki a `rakoczi-site` mappát → **Publish
     repository** (a neve legyen `kassaicserkesz-sk`, maradjon Private).
   - *Vagy parancssorból*, ha van git a gépeden:
     ```bash
     cd rakoczi-site
     git remote add origin https://github.com/FIOKNEV/kassaicserkesz-sk.git
     git push -u origin main
     ```
4. **Fontos:** a `node_modules/` és a `dist/` mappákat NE töltsd fel — a mellékelt
   `.gitignore` ezt magától intézi, ha gittel dolgozol.

---

## 4. Cloudflare Pages — az oldal élesítése

1. Regisztrálj / lépj be a [dash.cloudflare.com](https://dash.cloudflare.com)-on.
2. Bal oldalt **Workers & Pages → Create → Pages → Connect to Git**, engedélyezd a
   GitHub-hozzáférést, és válaszd ki a `kassaicserkesz-sk` repót.
3. Beállítások (a Framework presetnél válaszd az **Astro**-t, ilyenkor ezt magától kitölti):
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Environment variables (ha kérdezné): `NODE_VERSION` = `20`
4. **Save and Deploy.** 1–2 perc múlva kapsz egy `valami.pages.dev` címet — ott már él
   az oldal, ezen mindent le tudsz ellenőrizni.
5. Innentől minden GitHub-módosítás (akár a Szerkesztőségből, akár kézzel) után a
   Cloudflare magától újraépíti az oldalt. A build állapotát a Pages felületén látod —
   ha valaha hibára fut, ott van a napló.

### Saját domain (kassaicserkesz.sk)

1. A Pages-projekten belül: **Custom domains → Set up a custom domain** →
   `kassaicserkesz.sk` (és érdemes a `www.kassaicserkesz.sk`-t is felvenni).
2. Ha a domain DNS-e már a Cloudflare-nél van, egy kattintással kész. Ha máshol van a
   regisztrátor (pl. Websupport), két lehetőség: átirányítod a névszervereket a
   Cloudflare-hez (ajánlott, a Cloudflare végigvezet rajta), vagy a regisztrátornál
   veszel fel egy CNAME rekordot a `valami.pages.dev` címre.
3. A HTTPS-tanúsítványt a Cloudflare magától intézi.

### Látogatottság (süti nélkül, ingyen)

Cloudflare dashboard → **Analytics & Logs → Web Analytics** → add hozzá az oldalt, és a
kapott `<script …beacon…>` sort illeszd be a `src/layouts/Base.astro` fájl `</head>`
sora elé. (E nélkül is működik minden, ez csak statisztika.)

---

## 5. A Szerkesztőség (/admin/) élesítése

A Szerkesztőség a [Sveltia CMS](https://github.com/sveltia/sveltia-cms) — böngészős
felület, amivel a Beszámolókat (galéria-albumokat) és a Közelgő eseményeket lehet
szerkeszteni. A mentés a háttérben GitHub-módosítás, amiből automatikusan újraépül az
oldal. Két dolgot kell egyszer beállítani:

**a) Írd át a repó nevét.** A `public/admin/config.yml` fájlban:

```yaml
repo: CSAPAT-GITHUB-NEV/kassaicserkesz-sk   # ← ide a saját repótok, pl. kassaicserkesz/kassaicserkesz-sk
```

**b) Állítsd be a GitHub-bejelentkezést** (kb. 10 perc, egyszeri):

1. Nyisd meg a [sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth) oldalt, és
   kattints a **Deploy to Cloudflare Workers** gombra — ez a saját Cloudflare-fiókodba
   telepít egy pici közvetítő programot. Jegyezd fel a címét
   (pl. `https://sveltia-cms-auth.valaki.workers.dev`).
2. GitHubon: **Settings → Developer settings → OAuth Apps → New OAuth App**:
   - Homepage URL: `https://kassaicserkesz.sk`
   - Authorization callback URL: `https://sveltia-cms-auth.valaki.workers.dev/callback`
   - Mentés után hozz létre egy *client secret*-et; a *Client ID*-t és a *secret*-et
     a Workerben add meg környezeti változóként (`GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`,
     valamint `ALLOWED_DOMAINS` = `kassaicserkesz.sk` — a sveltia-cms-auth leírása
     végigvezet ezen).
3. A `public/admin/config.yml`-ben töröld a kommentet és írd be a Worker címét:
   ```yaml
   base_url: https://sveltia-cms-auth.valaki.workers.dev
   ```

Ezután a `kassaicserkesz.sk/admin/` címen a **Sign in with GitHub** gombbal lehet belépni —
mindenki, akinek hozzáférése van a repóhoz. Új szerkesztőt úgy veszel fel, hogy meghívod
a GitHub repóba (Settings → Collaborators).

**Szerkesztőség nélkül is lehet tartalmat frissíteni:** a GitHub webes felületén nyisd meg
pl. a `src/content/esemenyek/` mappát, és a ceruza ikonnal szerkeszd a fájlokat — a mentés
(commit) után az oldal magától újraépül.

---

## 6. A Kapcsolat oldal üzenetküldő űrlapjának élesítése (5 perc)

Az űrlap a [Web3Forms](https://web3forms.com) ingyenes szolgáltatásával küldi az üzenetet
a csapat e-mail címére — nem kell hozzá szerver, se regisztráció:

1. A web3forms.com oldalon add meg a csapat e-mail címét → kapsz egy *Access Key*-t.
2. A projektben cseréld le az `IDE-JON-A-WEB3FORMS-KULCS` szöveget erre a kulcsra —
   **három fájlban** szerepel: `src/partials/kapcsolat.html`, `kapcsolat_sk.html`
   és `kapcsolat_en.html` (kereséssel egy perc alatt megvan).
3. Kész — a következő buildtől az űrlap élesben küld. Amíg a kulcs nincs beírva, az
   űrlap udvariasan jelzi a látogatónak, hogy írjon inkább e-mailt, tehát addig sem
   viselkedik hibásan.

---

## 7. Google Naptár szinkron (ha már Google-ben vezetitek a naptárat)

Az Események oldal magától is működik: amit a Szerkesztőségben felvesztek, megjelenik,
és minden eseményhez automatikusan készül naptárfájl. Ha viszont a csapat naptárát
amúgy is Google Naptárban vezetitek, nem kell kétszer dolgozni:

1. Google Naptárban: a csapatnaptár **Beállítások → Hozzáférési engedélyek →
   Nyilvánossá tétel**, majd a **Naptár integrálása** részből másold ki a
   **„Nyilvános cím iCal formátumban”** linket (…basic.ics végű).
2. A Szerkesztőségben (**Beállítások → Google Naptár szinkron**) illeszd be ezt a címet —
   vagy kézzel a `src/data/naptar.json` fájlba.
3. Ennyi. A következő újraépítéstől az oldal a Google Naptár eseményeit is beolvassa:
   megjelennek a kezdőlapon, az eseménynaptárban, és mindegyikhez letölthető .ics készül.
   (Ami a Szerkesztőségben és a Google Naptárban is szerepel, nem duplázódik.)

**Fontos:** az oldal *újraépítéskor* olvassa be a naptárat. Hogy magától frissüljön, a
csomagban van egy előkészített napi időzítés (`.github/workflows/napi-frissites.yml`),
csak be kell kötni:

1. Cloudflare Pages → a projekt **Settings → Builds & deployments → Deploy hooks →
   Add deploy hook** (név pl. „napi-naptar”) — kapsz egy webcímet.
2. GitHubon: a repó **Settings → Secrets and variables → Actions → New repository
   secret** — név: `CF_DEPLOY_HOOK`, érték: az előbbi webcím.
3. Kész — ezután az oldal minden hajnalban újraépül, és átveszi a Google Naptár friss
   állapotát. (A GitHub **Actions** fülön kézzel is elindítható a „Napi újraépítés”.)

---

## 8. Hogyan van felépítve? („egy helyen módosítasz → mindenhol frissül”)

```
src/layouts/Base.astro      minden oldal közös kerete (head, fejléc, lábléc, szkriptek)
src/partials/_header.html   a fejléc/menü — EGY példányban, minden oldal innen kapja
src/partials/_social.html   a „Kövess minket” sáv — EGY példányban
src/partials/_footer.html   lábléc   ·   _drawer.html  mobilmenü
src/partials/_*_sk.html / _*_en.html   ugyanezek szlovákul és angolul
src/partials/<oldal>.html   az egyes oldalak tartalma
src/pages/                  az útvonalak (új oldal = új fájl ide)
src/content/beszamolok/     galéria-albumok (ezt kezeli a Szerkesztőség)
src/content/esemenyek/      közelgő események (ezt is)
public/css/global.css       betűtípusok, színek, sötét téma
public/js/site.js           témaváltó, menü, közös viselkedés
public/images/, /fonts/     képek és betűk  ·  /esemenyek/*.ics  naptárfájlok
```

Ha tehát a menün vagy a „Kövess minket” szekción változtatsz, elég **egy** fájlt
módosítani, és a következő buildnél az összes oldalon átvezetődik. (A szlovák/angol
párját ilyenkor érdemes ugyanúgy átvezetni a `_*_sk.html` / `_*_en.html` fájlokban.)

### Helyi fejlesztés (nem kötelező, de hasznos)

Telepíts [Node.js](https://nodejs.org) LTS-t, majd a mappában:

```bash
npm install     # egyszer
npm run dev     # élő előnézet: http://localhost:4321
npm run build   # éles build a dist/ mappába
```

---

## 9. Élesítés előtti teendők (minta-adatok, amiket ki kell cserélni)

- [ ] **Csatlakozás**: a Google űrlap linkje (a „Űrlap kitöltése” gomb) és a letölthető
      jelentkezési lap PDF-je (`public/` alá téve, a gomb `href`-jét ráirányítva).
- [ ] **Támogatás**: valós IBAN, a 2%-os (Vyhlásenie) PDF és adatok, Stripe fizetési linkek.
- [ ] **Események**: a valós naptáradatok a `src/content/esemenyek/`-ben + a hozzájuk
      tartozó `.ics` fájlok a `public/esemenyek/`-ben.
- [ ] **Galéria**: további albumok feltöltése a Szerkesztőségből (most a 3 valós,
      dokumentált album van fenn).
- [ ] **Rólunk**: az `[IDE JÖN: …]` jelölésű helyek kitöltése (pár szám, évszám, név).
- [ ] **Kapcsolat-űrlap**: Web3Forms kulcs beírása (6. pont).
- [ ] **Adatvédelmi tájékoztató**: töltsd ki a `[IDE JÖN: …]` helyeket (szervezetnév,
      IČO, székhely, hatálybalépés dátuma) a `src/partials/adatvedelem.html` és
      `adatvedelem_sk.html` fájlokban — és **mutassátok meg egy jogásznak**: a szöveg
      gondos minta a GDPR és a 18/2018. sz. törvény alapján, de nem helyettesíti a
      jogi ellenőrzést.
- [ ] **Google Naptár szinkron**: ha meglesz a csapat nyilvános Google Naptára,
      állítsd be a 7. pont szerint (5 perc).
- [ ] **Szerkesztőség**: repo név + bejelentkezés beállítása (5. pont).
- [ ] **Admin belépő gomb**: a fejléc jobb szélén lévő ikon a `/admin/`-ra mutat — ha nem
      akarjátok nyilvánosan mutatni, a `src/partials/_header.html`-ből kivehető.

---

## 10. Ha elakadsz

- **Nem épül az oldal a Cloudflare-en** → a Pages felületén nyisd meg a hibás deploy
  naplóját; ugyanaz a hiba helyben is előjön az `npm run build`-del.
- **A Szerkesztőség nem enged be** → szinte mindig a `config.yml` repo-neve vagy az OAuth
  beállítás (5b pont) hibás.
- **Elrontottál valamit?** → GitHubon minden módosítás visszavonható: a repo **History**
  nézetében keresd meg az utolsó jó állapotot (vagy a Cloudflare Pages-ben egy korábbi
  deployt egy kattintással vissza tudsz állítani: *Rollback*).
- A `README.md`-ben rövidebb, technikusabb összefoglaló is van ugyanerről.

Sok sikert, jó munkát! 🍀 *(A csapat jelmondatával: Cum Deo pro Patria et Libertate!)*
