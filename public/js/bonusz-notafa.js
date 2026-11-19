{
  const LANG = document.documentElement.lang || 'hu';

  const I18N = {
    hu: {
      tag: {
        vidam: 'Vidám',
        kozep_vidam: 'Közép-vidám',
        kozep: 'Közép',
        kozep_szomoru: 'Közép-szomorú',
        szomoru: 'Szomorú',
        szeretetkor: 'Szeretetkör'
      },
      count: (songs, sc) => `${songs} nóta (${sc} jelenet mellett)`,
      addLbl: 'Dal hozzáadása:',
      addChipAllUsed: (tag) => `Minden ${tag.toLowerCase()} dal szerepel már a listában`,
      addChipAvail: (tag, n) => `Új ${tag.toLowerCase()} dal beszúrása (még ${n} elérhető)`,
      addInlineTitle: (tag, can) => can ? `Még egy ${tag.toLowerCase()} dal hozzáadása` : 'Minden dal szerepel már ebből a hangulatból',
      addInlineAria: (tag) => `Új ${tag} dal`,
      delTitle: 'Dal eltávolítása',
      delAria: (s) => `Eltávolítás: ${s}`,
      swapTitle: (can) => can ? 'Csere másik, még nem szereplő dalra' : 'Nincs több szabad dal ebben a hangulatban',
      swapAria: (s) => `Csere: ${s}`,
      sceneName: (n) => `${n}. jelenet`,
      sceneTag: 'Jelenet'
    },
    sk: {
      tag: {
        vidam: 'Veselá',
        kozep_vidam: 'Stredne veselá',
        kozep: 'Stredná',
        kozep_szomoru: 'Stredne smutná',
        szomoru: 'Smutná',
        szeretetkor: 'Kruh lásky'
      },
      count: (songs, sc) => `${songs} piesní (popri ${sc} scénkach)`,
      addLbl: 'Pridať pieseň:',
      addChipAllUsed: (tag) => `Všetky piesne z kategórie ${tag.toLowerCase()} sú už v zozname`,
      addChipAvail: (tag, n) => `Vložiť novú pieseň: ${tag.toLowerCase()} (ešte ${n} k dispozícii)`,
      addInlineTitle: (tag, can) => can ? `Pridať ďalšiu pieseň (${tag.toLowerCase()})` : 'Všetky piesne z tejto nálady sú už v zozname',
      addInlineAria: (tag) => `Nová pieseň: ${tag}`,
      delTitle: 'Odstrániť pieseň',
      delAria: (s) => `Odstrániť: ${s}`,
      swapTitle: (can) => can ? 'Vymeniť za inú, ešte nepoužitú pieseň' : 'V tejto nálade už nie sú ďalšie voľné piesne',
      swapAria: (s) => `Vymeniť: ${s}`,
      sceneName: (n) => `${n}. scénka`,
      sceneTag: 'Scénka'
    },
    en: {
      tag: {
        vidam: 'Upbeat',
        kozep_vidam: 'Medium-upbeat',
        kozep: 'Medium',
        kozep_szomoru: 'Medium-slow',
        szomoru: 'Slow',
        szeretetkor: 'Closing circle'
      },
      count: (songs, sc) => `${songs} songs (with ${sc} skits)`,
      addLbl: 'Add song:',
      addChipAllUsed: (tag) => `All ${tag.toLowerCase()} songs are already in the list`,
      addChipAvail: (tag, n) => `Insert new ${tag.toLowerCase()} song (${n} more available)`,
      addInlineTitle: (tag, can) => can ? `Add another ${tag.toLowerCase()} song` : 'All songs from this mood are already in the list',
      addInlineAria: (tag) => `New ${tag} song`,
      delTitle: 'Remove song',
      delAria: (s) => `Remove: ${s}`,
      swapTitle: (can) => can ? 'Swap with another unused song' : 'No more available songs in this mood',
      swapAria: (s) => `Swap: ${s}`,
      sceneName: (n) => `Skit ${n}`,
      sceneTag: 'Skit'
    }
  };

  const T = I18N[LANG] || I18N.hu;
  const TAG = T.tag;

  const OPENERS = [
    "Úgy tetszik, hogy jó helyen vagyunk itt",
    "Ég a város"
  ];

  const POOL = {
    vidam: [
      "Úgy tetszik, hogy jó helyen vagyunk itt",
      "Ég a város",
      "Töltsd teli pajtás",
      "BiPi azt mondta",
      "A Vargáék ablaka",
      "Debrecenbe kéne menni",
      "Édes kedves feleségem",
      "A kassai szőlőhegyen",
      "Télen-nyáron jó kedvem van",
      "Vékony deszka kerítés",
      "Félre bánat, félre bú",
      "Este vagyon, szürkül bé",
      "Virágéknál ég a világ",
      "Nem ettem én ma egyebet",
      "Nagytáborba indulnék",
      "Három szabólegényke",
      "Kilyukadt a cserkésznadrág",
      "Kicsi róka, kicsi nyúl, kicsi nyúl, kicsi nyál"
    ],
    kozep_vidam: [
      "Látod-e babám?",
      "Házasodik a tücsök",
      "Túlsó soron esik az eső",
      "Mikor Gergely legény volt",
      "Ha összefog karunk",
      "Fel, fel cserkészpajtás",
      "Megfogtam egy szúnyogot",
      "Érik a szőlő",
      "Elment a két lány virágot szedni",
      "Elmúltak a mézes hetek",
      "Az én zubbonyomra",
      "Szélről legeljetek",
      "A juhásznak jól van dolga",
      "Vörös dió levele",
      "Édesanyám, kedves anyám",
      "Árvalányhaj lengedez a hegytetőn",
      "Egy boszorka van",
      "Szagos a rozmaring",
      "A csikósok, a gulyások",
      "Sárga csikó, sárga csikó, selyem nyereg",
      "Sárga csikó, csengő rajta",
      "Sárgarépa, zöld uborka kum",
      "Száraz tónak nedves partján",
      "Megismerni a kanászt",
      "Kék a kökény, zöld a petrezselyem",
      "Egyszer egy királyfi",
      "Hopp Juliska, hopp Mariska",
      "Fel, fel vitézek a csatára",
      "Piros kancsó, piros bor",
      "Balatoni legények, Ica te, Sári te",
      "A feneketlen katlan fortyog",
      "Somvirág, somvirág",
      "Nem messze van ide Kalocsa",
      "Fehéret virágzik, fehéret virágzik az akácfa",
      "Sárga a liba bögye",
      "Kimentem én az erdőbe",
      "Farkas Ilka bő szoknyája",
      "Komáromi magas torony",
      "Márványkőből, márványkőből",
      "Nem vagyunk mi öregek, hanem cserkészek",
      "Nem vagyok én senkinek sem adósa",
      "A kapuba a szekér, itt a legény leányt kér",
      "Adott Isten szekeret",
      "Szőr szökött a szemembe",
      "Tardoskeddi templom körül",
      "A part alatt",
      "Bella Ciao",
      "Hej, két tyúkom tavalyi",
      "Kis kút, kerekes kút van az udvaromba",
      "Zúg az erdő",
      "Kis kece lányom fehérbe' vagyon",
      "Kicsiny a hordócska"
    ],
    kozep: [
      "Alma a fa alatt",
      "Az árgyélus kismadár",
      "Ez a világ olyan világ",
      "Azt gondoltad, mindig így lesz",
      "Már minálunk babám",
      "Gábor Áron rézágyúja",
      "A csizmám elkopott",
      "Által mennék",
      "Marosszéki kerek erdő",
      "Komáromi kisleány",
      "Hej, Dunáról fúj a szél",
      "Két szál pünkösdrózsa",
      "Jánoshidi vásártéren, Ica, te",
      "Tisza partján mandulafa",
      "Piros rózsa, fehér rózsa",
      "Hull a szilva",
      "Daltól hangos",
      "Százados úr",
      "Jól van dolga a mostani huszárnak",
      "Repülj madár, repülj",
      "A kartali bírónak",
      "Kispiricsi faluvégen",
      "Még azt mondják, nem merek",
      "A malomnak nincsen köve, mégis lisztet jár",
      "Nem loptam én életemben",
      "A karádi faluvégen sej haj lu-lu-lu-lu lárom",
      "Ettünk falombot",
      "Kolozsváros olyan város",
      "Esik az eső, még sincs sár",
      "Hármat tojott a fekete kánya",
      "Komáromi kaszárnya",
      "Kivicses, kavicsos",
      "Tegnap virradóra",
      "Vékony héja, de vékony héja",
      "Jaj, de szépen harangoznak",
      "Gólya, gólya, gilice",
      "A jó lovas katonának",
      "Én vagyok a, én vagyok a kunsági fi",
      "A fő utcán, a fő utcán végigmenni nem merek",
      "Ezért a kislányért sokat cselekedtem",
      "Kecskemét is kiállítja",
      "Hej, Vargáné káposztát főz",
      "Hol jártál az éjjel",
      "A menyasszony szép virág",
      "Zöld erdőben de magos",
      "Gúta maga egy város",
      "Gyere ki, szüvem",
      "Hej, rozmaring, rozmaring",
      "Este van már nyolc óra",
      "A gútai faluvégen",
      "Ablakomba, ablakomba",
      "Nem vagy legény, nem vagy, nem mersz megcsókulni",
      "Ezt a kislányt igazán csakugyan",
      "Csütörtökön virradóra (Diósad)",
      "Jön Kossuth"
    ],
    kozep_szomoru: [
      "Csínom Palkó, csínom Jankó",
      "Ha te tudnád, amit én",
      "Látod, babám, azt a tearózsát?",
      "Lement a vacsoracsillag",
      "Szél viszi messze a fellegeket",
      "Este van már nyolc óra (Zalavég)",
      "Széles a Duna",
      "Ősszel érik babám a fekete szőlő",
      "Én az éjjel nem aludtam egy órát",
      "Kossuth Lajos azt üzente",
      "Hozd fel Isten azt a napot",
      "Estefelé jár az idő",
      "Béres vagyok, béres",
      "Hidegen fújnak a szelek",
      "Házunk előtt áll egy terhes hajó",
      "Két út van előttem",
      "Van két lovam, mind a kettő fakó",
      "Udvaromon arany vályú, arany kút",
      "Akkor szép az erdő",
      "Volt nékem szeretőm",
      "Kiment a ház az ablakon",
      "Én Istenem, tégy egy csodát",
      "Eddig vendég jól mulattál",
      "Huszár gyerek, huszár gyerek",
      "Szegény legény vagyok én",
      "Ez a kislány úgy éli világát",
      "A pünkösdi rózsa nyárba virágozik",
      "Kis kacsa fürdik",
      "Megkötöm lovamat piros almafához",
      "Fölszállott a páva",
      "Isten áldja meg a magyart",
      "Székvárosi halastó",
      "Sok születésnapokat",
      "Serkenj fel, kegyes nép!",
      "Gyere ki, te gyöngyvirág",
      "Elmegyek, elmegyek",
      "Elmentem én a szőlőbe",
      "Azt hittem, hogy nem kellek katonának",
      "Körösfői kertek alatt",
      "Ne aludj el, két szememnek világa",
      "Búza, búza, búzavirág",
      "Ha felülök keselylábú lovamra",
      "Fiatalon nem jó szépet szeretni",
      "Felsütött a nap sugára",
      "Kis pej lovam a födeles rajcsúrba",
      "Ezt a legényt még akkor megszerettem",
      "Fecském, fecském, édes fecském",
      "Nem úgy van most, mint volt régen",
      "Rózsa, rózsa, labdarózsa levele",
      "Én víg nem vagyok, szomorú vagyok",
      "Teli kertem zsályával",
      "Lassan, kocsis",
      "Fonjunk, fonjunk, fondogáljunk",
      "Elmegyek, elmegyek, el is van vágyásom",
      "Házunk előtt jégverem",
      "Ha én rózsa volnék, nem csak egyszer nyílnék"
    ],
    szomoru: [
      "A csitári hegyek alatt",
      "Török bársony süvegem",
      "Piros az ostorom nyele",
      "Elmegyek, elmegyek, hosszú útra megyek",
      "Indulj egy úton",
      "Erdő, erdő, kerek erdő",
      "Krasznahorka büszke vára",
      "Tavaszi szél",
      "Rég megmondtam, kisangyalom, ne szeress",
      "Madárka, madárka",
      "Kimegyek a doberdói harctérre",
      "Ej, az igaz szerelem",
      "Magos a dézsi temető",
      "Hulljatok levelek",
      "Hótól fehér",
      "Túl a vízen egy kosár",
      "Erdő, erdő, de magos a teteje",
      "Kék ibolya, ha leszakítanálak",
      "Csütörtökön virradóra (Nyitra)",
      "Megrakják a tüzet",
      "Esik az eső, ázik a heveder",
      "Szeress, szeress, csak nézd meg, kit",
      "Fehér fuszulykavirág",
      "A temetőkapu",
      "Édesanyám rózsafája",
      "Esik eső, szép csendesen csepereg",
      "Holtig bánom, amit cselekedtem",
      "Haza is kéne már menni",
      "Nagymajtényi síkon",
      "Addig megyek, míg a világ világ lesz",
      "Én vagyok az, aki nem jó",
      "Elment a madárka, üres a kalicka",
      "Fúj, süvölt a Mátra szele"
    ],
    szeretetkor: [
      "Szellő zúg távol",
      "Erdő mellett estvéledtem",
      "Bóbita, bóbita",
      "Csillagok, csillagok",
      "Láb, mely hangtalanul lépked",
      "Őrs tűzéből szállnak"
    ]
  };

  const MAIN_PHASES = ['vidam', 'kozep_vidam', 'kozep', 'kozep_szomoru', 'szomoru'];
  const ALL_PHASES = [...MAIN_PHASES, 'szeretetkor'];

  const num = document.getElementById('nf-num'),
        gen = document.getElementById('nf-gen'),
        list = document.getElementById('nf-list'),
        curve = document.getElementById('nf-curve'),
        addBar = document.getElementById('nf-add-bar');

  let scenes = [];
  let activeSceneCount = 4;

  const getFreeSongs = (ph, used, isFirstOpener = false) => {
    if (isFirstOpener) {
      return OPENERS.filter(s => !used.has(s));
    }
    const basePool = ph === 'vidam' ? POOL.vidam.filter(s => !OPENERS.includes(s)) : POOL[ph];
    return basePool.filter(s => !used.has(s));
  };

  const pick = (ph, used, isFirstOpener = false) => {
    const free = getFreeSongs(ph, used, isFirstOpener);
    if (!free.length) return null;
    return free[Math.floor(Math.random() * free.length)];
  };

  function updateCountLabel() {
    document.getElementById('nf-count').textContent = T.count(scenes.length, activeSceneCount);
  }

  function getScenePositions(regularSongCount, sceneCount) {
    const map = new Map();
    if (sceneCount <= 0 || regularSongCount <= 0) return map;

    let prevPos = 0;
    for (let s = 1; s <= sceneCount; s++) {
      let pos = Math.round((s * regularSongCount) / (sceneCount + 1));
      if (regularSongCount >= sceneCount) {
        const maxAllowed = regularSongCount - (sceneCount - s);
        pos = Math.max(prevPos + 1, Math.min(pos, maxAllowed));
        prevPos = pos;
      } else {
        pos = Math.max(1, Math.min(regularSongCount, pos));
      }
      if (!map.has(pos)) map.set(pos, []);
      map.get(pos).push(s);
    }
    return map;
  }

  function addSongToPhase(ph) {
    const used = new Set(scenes.map(x => x.s));
    OPENERS.forEach(op => used.add(op));
    const newSong = pick(ph, used, false);
    if (!newSong) return;

    let insertIdx = -1;
    for (let i = scenes.length - 1; i >= 0; i--) {
      if (scenes[i].f === ph) {
        insertIdx = i + 1;
        break;
      }
    }
    if (insertIdx === -1) insertIdx = scenes.length;

    scenes.splice(insertIdx, 0, { f: ph, s: newSong, opener: false });
    updateCountLabel();
    render();
  }

  function renderAddBar() {
    if (!addBar) return;
    addBar.classList.add('on');
    
    const used = new Set(scenes.map(x => x.s));
    OPENERS.forEach(op => used.add(op));

    addBar.innerHTML =
      `<span class="nf-add-lbl">${T.addLbl}</span>` +
      ALL_PHASES.map(ph => {
        const freeCount = getFreeSongs(ph, used, false).length;
        const disabledAttr = freeCount === 0 ? 'disabled' : '';
        const titleText = freeCount === 0
          ? T.addChipAllUsed(TAG[ph])
          : T.addChipAvail(TAG[ph], freeCount);
        return `<button type="button" class="nf-add-chip nf-tag ${ph}" data-ph="${ph}" ${disabledAttr} title="${titleText}">+ ${TAG[ph]}</button>`;
      }).join('');

    addBar.querySelectorAll('.nf-add-chip:not([disabled])').forEach(btn => {
      btn.addEventListener('click', () => addSongToPhase(btn.dataset.ph));
    });
  }

  function plan(nScenes) {
    activeSceneCount = nScenes;
    const n = Math.max(6, nScenes + 2, 15 - nScenes);

    const rem = n - 1;
    const counts = [1, 1, 1, 1, 1];
    const priority = [1, 2, 3, 0, 4];
    const maxPerPhase = MAIN_PHASES.map(ph =>
      ph === 'vidam' ? 1 + POOL.vidam.filter(s => !OPENERS.includes(s)).length : POOL[ph].length
    );

    for (let i = 0; i < rem - 5; i++) {
      for (let step = 0; step < 5; step++) {
        const pIdx = priority[(i + step) % 5];
        if (counts[pIdx] < maxPerPhase[pIdx]) {
          counts[pIdx]++;
          break;
        }
      }
    }

    const ph = [];
    MAIN_PHASES.forEach((phaseName, idx) => {
      for (let k = 0; k < counts[idx]; k++) ph.push(phaseName);
    });
    ph.push('szeretetkor');

    const used = new Set();
    scenes = [];
    ph.forEach((f, idx) => {
      const isOpener = idx === 0;
      const s = pick(f, used, isOpener);
      if (s) {
        used.add(s);
        if (isOpener) OPENERS.forEach(op => used.add(op));
        scenes.push({ f, s, opener: isOpener });
      }
    });

    updateCountLabel();
    render();
  }

  function render() {
    renderAddBar();
    list.innerHTML = '';

    const used = new Set(scenes.map(x => x.s));
    OPENERS.forEach(op => used.add(op));

    const regularSongs = scenes.filter(sc => sc.f !== 'szeretetkor');
    const sceneMap = getScenePositions(regularSongs.length, activeSceneCount);
    let regularIndex = 0;

    scenes.forEach((sc, i) => {
      const songNumber = i + 1;
      const isOpener = Boolean(sc.opener);
      const isClosing = sc.f === 'szeretetkor';

      const freeForAdding = getFreeSongs(sc.f, used, false).length;
      const canAddMore = freeForAdding > 0;

      const freeForSwapping = isOpener
        ? OPENERS.filter(op => op !== sc.s && !scenes.some((x, idx) => idx !== i && x.s === op)).length
        : freeForAdding;
      const canSwap = freeForSwapping > 0;

      const r = document.createElement('div');
      r.className = 'nf-row';
      r.innerHTML =
        `<span class="nf-n">${songNumber}</span>` +
        `<span class="nf-t">${sc.s}</span>` +
        `<span class="nf-tag ${sc.f}">${TAG[sc.f]}</span>` +
        `<button type="button" class="nf-add-inline" ${canAddMore ? '' : 'disabled'} title="${T.addInlineTitle(TAG[sc.f], canAddMore)}" aria-label="${T.addInlineAria(TAG[sc.f])}">+</button>` +
        `<button type="button" class="nf-del-inline" title="${T.delTitle}" aria-label="${T.delAria(sc.s)}">−</button>` +
        `<button type="button" class="nf-swap" ${canSwap ? '' : 'disabled'} title="${T.swapTitle(canSwap)}" aria-label="${T.swapAria(sc.s)}">` +
          `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 5v5h-5"></path><path d="M4 19v-5h5"></path><path d="M19.5 10a8 8 0 0 0-14-3.5M4.5 14a8 8 0 0 0 14 3.5"></path></svg>` +
        `</button>`;

      const swapBtn = r.querySelector('.nf-swap');
      if (swapBtn && canSwap) {
        swapBtn.addEventListener('click', () => {
          if (isOpener) {
            const altOpener = OPENERS.find(op => op !== sc.s && !scenes.some((x, idx) => idx !== i && x.s === op));
            if (altOpener) sc.s = altOpener;
          } else {
            const currentUsed = new Set(scenes.map(x => x.s));
            OPENERS.forEach(op => currentUsed.add(op));
            const newSong = pick(sc.f, currentUsed, false);
            if (newSong) sc.s = newSong;
          }
          render();
        });
      }

      const addBtn = r.querySelector('.nf-add-inline');
      if (addBtn && canAddMore) {
        addBtn.addEventListener('click', () => {
          const currentUsed = new Set(scenes.map(x => x.s));
          OPENERS.forEach(op => currentUsed.add(op));
          const newSong = pick(sc.f, currentUsed, false);
          if (!newSong) return;
          scenes.splice(i + 1, 0, { f: sc.f, s: newSong, opener: false });
          updateCountLabel();
          render();
        });
      }

      const delBtn = r.querySelector('.nf-del-inline');
      if (delBtn) {
        delBtn.addEventListener('click', () => {
          scenes.splice(i, 1);
          updateCountLabel();
          render();
        });
      }

      list.appendChild(r);

      if (!isClosing) {
        regularIndex++;
        if (sceneMap.has(regularIndex)) {
          sceneMap.get(regularIndex).forEach(sceneNum => {
            const sr = document.createElement('div');
            sr.className = 'nf-row nf-scene-row';
            sr.innerHTML =
              `<span class="nf-n nf-scene-n" aria-hidden="true">🎭</span>` +
              `<span class="nf-t nf-scene-t">${T.sceneName(sceneNum)}</span>` +
              `<span class="nf-tag nf-scene-tag">${T.sceneTag}</span>`;
            list.appendChild(sr);
          });
        }
      }
    });

    drawCurve();
  }

  function drawCurve() {
    if (!scenes.length) {
      curve.classList.remove('on');
      return;
    }
    curve.classList.add('on');
    const n = scenes.length, W = 600, H = 64, pad = 22;
    const Y_RANGE = {
      vidam: [16, 12],
      kozep_vidam: [18, 23],
      kozep: [27, 33],
      kozep_szomoru: [37, 43],
      szomoru: [47, 52],
      szeretetkor: [56, 56]
    };

    const pts = scenes.map((sc, i) => {
      const x = n === 1 ? W / 2 : pad + (W - 2 * pad) * i / (n - 1);
      const same = scenes.filter(s => s.f === sc.f);
      const k = same.indexOf(sc);
      const ratio = same.length > 1 ? k / (same.length - 1) : 0.5;
      const [yStart, yEnd] = Y_RANGE[sc.f] || [32, 32];
      const y = yStart + (yEnd - yStart) * ratio;
      return [x, y];
    });

    const path = pts.map((p, i) => (i ? 'L' : 'M') + p[0] + ' ' + p[1]).join(' ');
    curve.querySelector('svg').innerHTML =
      `<path d="${path}" fill="none" stroke="var(--color-pine)" stroke-opacity=".45" stroke-width="2" stroke-dasharray="1 7" stroke-linecap="round"/>` +
      pts.map((p, i) => {
        const isUpbeat = scenes[i].f === 'vidam' || scenes[i].f === 'kozep_vidam';
        const isClosing = scenes[i].f === 'szeretetkor';
        const fill = isUpbeat ? 'var(--color-ember)' : (isClosing ? 'var(--color-ink)' : 'var(--color-pine)');
        return `<circle cx="${p[0]}" cy="${p[1]}" r="4" fill="${fill}"/>`;
      }).join('');
  }

  gen.addEventListener('click', () => {
    let val = parseInt(num.value, 10);
    if (isNaN(val)) val = 4;
    const n = Math.min(9, Math.max(0, val));
    num.value = n;
    plan(n);
  });
}