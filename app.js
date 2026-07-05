/* ============================================================================
   SLVNZ 4.0 — UYGULAMA MANTIĞI
   ----------------------------------------------------------------------------
   - İçeriği yükler (content.js varsayılanları + tarayıcıya kaydedilmiş değişiklikler)
   - Basit hash router (#/  |  #/bolum  |  #/bolum/oge)
   - Landing ve bölüm görünümlerini çizer
   - Tema (light/dark) anahtarını yönetir
   Build adımı yok, framework yok. Düz JavaScript — dilediğin gibi düzenle.
   ========================================================================== */

(function () {
  "use strict";

  /* --- Sabitler ----------------------------------------------------------- */
  var STORE_CONTENT  = "slvnz_content";   // editörün kaydettiği içerik (legacy)
  var STORE_VERSIONS = "slvnz_versions";  // versiyon arşivi
  var STORE_VIEWING  = "slvnz_viewing_ver"; // sessionStorage — önizleme versiyonu
  var STORE_THEME    = "slvnz_theme";     // seçili tema

  /* --- Versiyon arşivi ---------------------------------------------------- */
  function vStoreLoad() {
    var defaults = window.SLVNZ_CONTENT;
    var freshSeed = defaults && defaults.meta && defaults.meta.contentSeed;
    try {
      var raw = localStorage.getItem(STORE_VERSIONS);
      if (raw) {
        var s = JSON.parse(raw);
        if (s && Array.isArray(s.versions) && s.versions.length) {
          // contentSeed farklıysa localStorage eskidir — temizle
          var dv = s.versions.find(function (v) { return v.id === s.defaultId; }) || s.versions[0];
          var storedSeed = dv && dv.content && dv.content.meta && dv.content.meta.contentSeed;
          if (!freshSeed || storedSeed === freshSeed) return s;
          localStorage.removeItem(STORE_VERSIONS);
          localStorage.removeItem(STORE_CONTENT);
        }
      }
    } catch (e) {}
    // content.js'e gömülü versiyon arşivini oku (yeni cihaz / temiz tarayıcı)
    if (window.SLVNZ_VERSIONS && Array.isArray(window.SLVNZ_VERSIONS.versions) && window.SLVNZ_VERSIONS.versions.length) {
      try { localStorage.setItem(STORE_VERSIONS, JSON.stringify(window.SLVNZ_VERSIONS)); } catch (e4) {}
      return window.SLVNZ_VERSIONS;
    }
    // İlk çalıştırma: mevcut içerikten tek versiyon oluştur
    var base = defaults;
    try {
      var ex = localStorage.getItem(STORE_CONTENT);
      if (ex) {
        var p = JSON.parse(ex);
        if (p && p.sections) {
          var sd = defaults.meta && defaults.meta.contentSeed;
          if (!sd || (p.meta && p.meta.contentSeed === sd)) base = p;
        }
      }
    } catch (e2) {}
    var vid = "ver_" + Date.now().toString(36);
    var store = {
      versions: [{ id: vid, label: (base.meta && base.meta.version) || "v4.0", createdAt: new Date().toISOString().slice(0, 10), content: JSON.parse(JSON.stringify(base)) }],
      defaultId: vid
    };
    try { localStorage.setItem(STORE_VERSIONS, JSON.stringify(store)); } catch (e3) {}
    return store;
  }
  function vActiveId(store) {
    var sv = sessionStorage.getItem(STORE_VIEWING);
    if (sv && store.versions.find(function (v) { return v.id === sv; })) return sv;
    return store.defaultId;
  }
  function vActiveContent() {
    var store = vStoreLoad();
    var v = store.versions.find(function (x) { return x.id === vActiveId(store); }) || store.versions[0];
    return v ? v.content : window.SLVNZ_CONTENT;
  }
  function renderVerSelector() {
    var store = vStoreLoad();
    var activeId = vActiveId(store);
    var isDefault = activeId === store.defaultId;
    var v = store.versions.find(function (x) { return x.id === activeId; }) || store.versions[0];
    if (!v) return '<span class="brand__ver">' + esc(CONTENT.meta.version || "v4.0") + '</span>';
    var items = store.versions.map(function (sv) {
      var isCurr = sv.id === activeId;
      var isDef  = sv.id === store.defaultId;
      return '<button class="ver-item' + (isCurr ? " ver-item--curr" : "") + '" data-ver-switch="' + esc(sv.id) + '">' +
        '<span class="ver-dot' + (isDef ? " ver-dot--def" : "") + '"></span>' +
        '<span class="ver-name">' + esc(sv.label) + '</span>' +
        (isDef ? '<span class="label ver-def-tag">VARSAYILAN</span>' : '') +
      '</button>';
    }).join("");
    return '<div class="ver-wrap" id="verWrap">' +
      '<button class="brand__ver ver-trigger' + (!isDefault ? " ver-trigger--preview" : "") + '" id="verTrigger">' +
        esc(v.label) +
        (!isDefault ? '<span class="ver-preview-dot"></span>' : '') +
        '<span class="ver-caret">▾</span>' +
      '</button>' +
      '<div class="ver-panel" id="verPanel">' + items + '</div>' +
    '</div>';
  }

  /* Bölüm sırası — meta.sectionOrder varsa onu, yoksa nesne anahtarlarını kullan.
     Böylece editörden yeni üst bölüm eklenebilir / sıralanabilir. */
  function getSectionOrder() {
    var keys = Object.keys(CONTENT.sections || {});
    var ord = (CONTENT.meta && Array.isArray(CONTENT.meta.sectionOrder)) ? CONTENT.meta.sectionOrder : null;
    if (!ord) return keys;
    var out = ord.filter(function (k) { return CONTENT.sections[k]; });
    keys.forEach(function (k) { if (out.indexOf(k) === -1) out.push(k); });
    return out;
  }

  /* Dekoratif kanji/etiketler (japon motifi) — istersen değiştir. */
  var SECTION_DECOR = {
    "oyun-kurallari": { kanji: "規則", vlabel: "RULES OF PLAY" },
    "yetenekler":     { kanji: "能力", vlabel: "ABILITIES" },
    "evren-rehberi":  { kanji: "世界", vlabel: "THE UNIVERSE" },
  };

  /* --- İçerik yükleme ----------------------------------------------------- */
  // localStorage'ta kayıt varsa onu kullan; yoksa content.js varsayılanları.
  // İçerik tohumu (contentSeed) değişmişse, eski kayıt yeni varsayılanla güncellenir.
  function loadContent() {
    var defaults = window.SLVNZ_CONTENT;
    var seed = defaults.meta && defaults.meta.contentSeed;
    try {
      var raw = localStorage.getItem(STORE_CONTENT);
      if (raw) {
        var parsed = JSON.parse(raw);
        if (parsed && parsed.sections) {
          var savedSeed = parsed.meta && parsed.meta.contentSeed;
          if (seed && savedSeed !== seed) {
            // Yeni içerik yayınlandı -> varsayılanı kullan ve kaydı güncelle
            try { localStorage.setItem(STORE_CONTENT, JSON.stringify(defaults)); } catch (e2) {}
            return defaults;
          }
          return parsed;
        }
      }
    } catch (e) { /* bozuk kayıt -> varsayılana düş */ }
    return defaults;
  }

  var CONTENT = vActiveContent();

  // Versiyon arşivi veya legacy içerik başka sekmede değiştiğinde yenile
  window.addEventListener("storage", function (e) {
    if (e.key === STORE_VERSIONS || e.key === STORE_CONTENT) { CONTENT = vActiveContent(); render(); }
  });

  /* --- Tema --------------------------------------------------------------- */
  function getTheme() {
    var saved = localStorage.getItem(STORE_THEME);
    if (saved === "light" || saved === "dark") return saved;
    return "dark"; // varsayılan
  }
  function setTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem(STORE_THEME, t);
    updateThemeToggle(t);
  }
  function toggleTheme() {
    setTheme(getTheme() === "dark" ? "light" : "dark");
  }
  function updateThemeToggle(t) {
    var btns = document.querySelectorAll("[data-theme-toggle]");
    btns.forEach(function (b) {
      var lbl = b.querySelector(".theme-toggle__label");
      var ic = b.querySelector(".theme-toggle__icon");
      if (lbl) lbl.textContent = t === "dark" ? "DARK" : "LIGHT";
      if (ic) ic.innerHTML = t === "dark" ? ICON.moon : ICON.sun;
    });
  }

  /* --- İkonlar (satır içi SVG) -------------------------------------------- */
  var ICON = {
    arrow: '<svg class="icon gateway__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 19L19 5M19 5H9M19 5V15"/></svg>',
    arrowSmall: '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    back: '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
    moon: '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/></svg>',
    sun: '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19"/></svg>',
  };

  /* --- Yardımcılar -------------------------------------------------------- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function pad(n) { return String(n).padStart(2, "0"); }
  // Gövde metnini paragraflara böl (boş satıra göre)
  function toParagraphs(body) {
    return String(body || "")
      .split(/\n\s*\n/)
      .map(function (p) { return "<p>" + esc(p.trim()).replace(/\n/g, "<br>") + "</p>"; })
      .join("");
  }

  /* --- Hash router -------------------------------------------------------- */
  // #/                            -> landing
  // #/oyun-kurallari              -> bölüm, ilk öğe
  // #/oyun-kurallari/zarlar       -> bölüm, belirli öğe
  // HUB bölümleri (3 seviye):
  // #/evren-rehberi               -> hub ana menü (sayfa kartları)
  // #/evren-rehberi/diyarlar      -> sayfa + yan menü (ilk bölüm)
  // #/evren-rehberi/diyarlar/giris-> belirli bölüm
  function parseHash() {
    var h = (location.hash || "").replace(/^#\/?/, "");
    var parts = h.split("/").filter(Boolean);
    return { section: parts[0] || null, item: parts[1] || null, sub: parts[2] || null };
  }

  /* Marka işareti: logo doluysa onu, değilse ad + vurgu yazısını üretir. */
  function renderBrandMark() {
    var m = CONTENT.meta;
    var logo = (m.brandLogo || "").trim();
    if (logo) {
      var inner;
      if (/^\s*<svg[\s>]/i.test(logo)) inner = logo; // doğrudan SVG kodu
      else inner = '<img src="' + esc(logo) + '" alt="' + esc(m.brandName || m.title || "Logo") + '">';
      return '<span class="brand__mark brand__mark--logo">' + inner + '</span>';
    }
    // Geriye dönük uyum: alanlar boşsa eski title'dan türet
    var name = (m.brandName != null) ? m.brandName : (m.title || "").replace("4.0", "").trim();
    var accent = (m.brandAccent != null) ? m.brandAccent : "4.0";
    return '<span class="brand__mark">' +
      (name ? '<span class="brand__name">' + esc(name) + '</span>' : '') +
      (accent ? '<span class="dot">' + esc(accent) + '</span>' : '') +
    '</span>';
  }

  /* --- Render: TOPBAR ----------------------------------------------------- */
  function renderTopbar(active) {
    var links = getSectionOrder().map(function (key) {
      var sec = CONTENT.sections[key];
      var cls = active === key ? "topbar__link is-active" : "topbar__link";
      return '<a class="' + cls + '" href="#/' + key + '">' + esc(sec.label) + "</a>";
    }).join("");

    return '' +
      '<header class="topbar">' +
        '<a class="brand" href="#/">' +
          renderBrandMark() +
          renderVerSelector() +
        '</a>' +
        '<nav class="topbar__nav">' + links + '</nav>' +
        '<div class="topbar__right">' +
          '<button class="theme-toggle" data-theme-toggle>' +
            '<span class="theme-toggle__icon"></span>' +
            '<span class="theme-toggle__label">DARK</span>' +
          '</button>' +
        '</div>' +
      '</header>';
  }

  /* --- Render: LANDING ---------------------------------------------------- */
  function renderLanding() {
    var m = CONTENT.meta;
    var order = getSectionOrder();
    var cards = order.map(function (key, i) {
      var sec = CONTENT.sections[key];
      return '' +
        '<a class="gateway" href="#/' + key + '">' +
          '<div class="gateway__top">' +
            '<span class="index">' + pad(i + 1) + ' / ' + pad(order.length) + '</span>' +
            ICON.arrow +
          '</div>' +
          '<h3 class="gateway__name">' + esc(sec.label) + '</h3>' +
          '<p class="gateway__blurb">' + esc(sec.blurb || "") + '</p>' +
        '</a>';
    }).join("");

    return '' +
      renderTopbar(null) +
      '<span class="vlabel vlabel--left">' + esc(m.tagline || "") + '</span>' +
      '<span class="vlabel vlabel--right">SLVNZ — ' + esc(m.version || "v4.0") + '</span>' +
      '<main class="landing">' +
        '<div class="landing__big-index">01</div>' +
        '<div class="landing__hero">' +
          '<div class="landing__eyebrow">' +
            '<span class="bar"></span>' +
            '<span class="label">' + esc(m.tagline || "") + '</span>' +
          '</div>' +
          (function () {
            var l1 = (m.heroLine1 != null) ? m.heroLine1 : "SLVNZ";
            var l2 = (m.heroLine2 != null) ? m.heroLine2 : "4.0";
            if (!l1 && !l2) return "";
            return '<h1 class="landing__title">' + esc(l1) + '<span class="dot">.</span>' +
              (l2 ? '<br>' + esc(l2) : '') + '</h1>';
          })() +
          '<div class="landing__desc">' +
            '<p class="lead">' + esc(m.description || "") + '</p>' +
          '</div>' +
        '</div>' +
        '<section class="gateways">' + cards + '</section>' +
      '</main>';
  }

  /* --- Render: BÖLÜM ------------------------------------------------------ */
  // Bir içerik öğesinin gövdesini (metin/zengin/tablo) üretir.
  function contentBodyHTML(current) {
    if (current.mode === "table") return renderTableBlock(current);
    if (current.mode === "rich") return renderBlocks(current.blocks);
    if (current.mode === "creature-list") return renderCreatureListBlock(current);
    if (current.mode === "wiki") return renderWikiBody(current);
    return '<div class="content__body">' + toParagraphs(current.body) + '</div>';
  }
  // Tablo modundaki bir öğe için tablo durumunu sıfırla + ilk satırı seç.
  function resetTableStateFor(current) {
    if (current && current.mode === "table") {
      tableState = { sortKey: null, sortDir: 1, filter: "", selRow: null };
      if (current.table && current.table.rows.length) tableState.selRow = current.table.rows[0]._id;
    }
  }

  function renderSection(sectionKey, itemId) {
    var sec = CONTENT.sections[sectionKey];
    if (!sec) { location.hash = "#/"; return ""; }

    var items = sec.items;
    var idx = 0;
    if (itemId) {
      var found = items.findIndex(function (it) { return it.id === itemId; });
      if (found >= 0) idx = found;
    }
    var current = items[idx];
    var decor = SECTION_DECOR[sectionKey] || { kanji: "", vlabel: sec.label };

    // Tablo modu: durum sıfırla, ilk kaydı otomatik seç (snapshot dolu açılsın)
    if (current.mode === "table") {
      tableState = { sortKey: null, sortDir: 1, filter: "", selRow: null };
      if (current.table && current.table.rows.length) tableState.selRow = current.table.rows[0]._id;
    }

    // Yan menü
    var nav = items.map(function (it, i) {
      var cls = i === idx ? "navitem is-active" : "navitem";
      return '' +
        '<li class="' + cls + '">' +
          '<a href="#/' + sectionKey + '/' + it.id + '">' +
            '<span class="navitem__idx">' + pad(i + 1) + '</span>' +
            '<span class="navitem__name">' + esc(it.title) + '</span>' +
            '<span class="navitem__dot"></span>' +
          '</a>' +
        '</li>';
    }).join("");

    // Prev / next
    var prev = idx > 0 ? items[idx - 1] : null;
    var next = idx < items.length - 1 ? items[idx + 1] : null;
    function pagerBtn(it, dir, dirLabel) {
      if (!it) return '<span class="pager-btn ' + dir + '" aria-disabled="true"><span class="pager-dir">' + dirLabel + '</span><span class="pager-name">—</span></span>';
      return '<a class="pager-btn ' + dir + '" href="#/' + sectionKey + '/' + it.id + '">' +
        '<span class="pager-dir">' + dirLabel + '</span>' +
        '<span class="pager-name">' + esc(it.title) + '</span></a>';
    }

    return '' +
      renderTopbar(sectionKey) +
      '<span class="vlabel vlabel--right">' + esc(sec.label) + ' — ' + pad(idx + 1) + '/' + pad(items.length) + '</span>' +
      '<div class="section-view">' +
        '<aside class="sidebar" id="sidebar">' +
          '<button class="mobile-nav-toggle" id="navToggle"><span>' + esc(current.title) + '</span><span>MENÜ</span></button>' +
          '<div class="sidebar__head">' +
            '<a class="sidebar__crumb" href="#/">' + ICON.back + ' ANA SAYFA</a>' +
            '<h2 class="sidebar__title">' + esc(sec.label) + '</h2>' +
            '<div class="sidebar__count label">' + pad(items.length) + ' BÖLÜM</div>' +
          '</div>' +
          '<ul class="navlist">' + nav + '</ul>' +
        '</aside>' +
        '<main class="content' + (current.mode === "table" ? " content--table" : current.mode === "creature-list" ? " content--creature" : current.mode === "wiki" ? " content--wiki" : "") + '">' +
          '<div class="content__eyebrow">' +
            '<span class="bar"></span>' +
            '<span class="label label--accent">' + esc(sec.label) + '</span>' +
            '<span class="index">/ ' + pad(idx + 1) + '</span>' +
          '</div>' +
          '<h1 class="content__title">' + esc(current.title) + '</h1>' +
          (current.mode === "table"
            ? renderTableBlock(current)
            : current.mode === "rich"
              ? renderBlocks(current.blocks)
              : current.mode === "wiki"
                ? renderWikiBody(current)
                : '<div class="content__body">' + toParagraphs(current.body) + '</div>') +
          '<nav class="content__pager">' +
            pagerBtn(prev, "prev", "← ÖNCEKİ") +
            pagerBtn(next, "next", "SONRAKİ →") +
          '</nav>' +
        '</main>' +
      '</div>';
  }

  /* --- Render: HUB ANA MENÜ (sayfa kartları) ------------------------------ */
  function renderHubLanding(sectionKey) {
    var sec = CONTENT.sections[sectionKey];
    var pages = sec.items || [];
    var cards = pages.map(function (pg, i) {
      var count = (pg.pages || []).length;
      return '' +
        '<a class="gateway" href="#/' + sectionKey + '/' + pg.id + '">' +
          '<div class="gateway__top">' +
            '<span class="index">' + pad(i + 1) + ' / ' + pad(pages.length) + '</span>' +
            ICON.arrow +
          '</div>' +
          '<h3 class="gateway__name">' + esc(pg.title) + '</h3>' +
          '<p class="gateway__blurb">' + esc(pg.blurb || "") + '</p>' +
          '<span class="gateway__count label">' + pad(count) + ' BÖLÜM</span>' +
        '</a>';
    }).join("");

    return '' +
      renderTopbar(sectionKey) +
      '<span class="vlabel vlabel--right">' + esc(sec.label) + '</span>' +
      '<main class="hub">' +
        '<div class="hub__head">' +
          '<a class="sidebar__crumb" href="#/">' + ICON.back + ' ANA SAYFA</a>' +
          '<div class="hub__eyebrow"><span class="bar"></span><span class="label label--accent">' + esc(sec.label) + '</span></div>' +
          '<h1 class="hub__title">' + esc(sec.label) + '</h1>' +
          '<p class="hub__desc">' + esc(sec.blurb || "") + '</p>' +
        '</div>' +
        '<section class="gateways hub__gateways">' + cards + '</section>' +
      '</main>';
  }

  /* --- Render: HUB SAYFA (yan menü + içerik) ------------------------------ */
  function renderHubPage(sectionKey, pageId, subId) {
    var sec = CONTENT.sections[sectionKey];
    var page = sec.items.find(function (p) { return p.id === pageId; });
    if (!page) { location.hash = "#/" + sectionKey; return ""; }
    var items = page.pages || [];

    // Geri / üst gezinme bağlantısı (hub ana menüsüne)
    var crumb = '<a class="sidebar__crumb" href="#/' + sectionKey + '">' + ICON.back + ' ' + esc(sec.label) + '</a>';

    // İçeriği olmayan sayfa: boş durum
    if (!items.length) {
      return '' +
        renderTopbar(sectionKey) +
        '<span class="vlabel vlabel--right">' + esc(sec.label) + ' — ' + esc(page.title) + '</span>' +
        '<div class="section-view">' +
          '<aside class="sidebar" id="sidebar">' +
            '<button class="mobile-nav-toggle" id="navToggle"><span>' + esc(page.title) + '</span><span>MENÜ</span></button>' +
            '<div class="sidebar__head">' + crumb +
              '<h2 class="sidebar__title">' + esc(page.title) + '</h2>' +
              '<div class="sidebar__count label">00 BÖLÜM</div>' +
            '</div>' +
            '<ul class="navlist"></ul>' +
          '</aside>' +
          '<main class="content">' +
            '<div class="content__eyebrow"><span class="bar"></span><span class="label label--accent">' + esc(page.title) + '</span></div>' +
            '<h1 class="content__title">' + esc(page.title) + '</h1>' +
            '<div class="content__body"><p>Bu sayfaya henüz içerik eklenmemiş. Editörden bu sayfaya bölüm (içerik) ekleyebilirsiniz.</p></div>' +
          '</main>' +
        '</div>';
    }

    var idx = 0;
    if (subId) { var f = items.findIndex(function (it) { return it.id === subId; }); if (f >= 0) idx = f; }
    var current = items[idx];
    resetTableStateFor(current);

    var base = "#/" + sectionKey + "/" + pageId + "/";
    var nav = items.map(function (it, i) {
      var cls = i === idx ? "navitem is-active" : "navitem";
      return '<li class="' + cls + '"><a href="' + base + it.id + '">' +
        '<span class="navitem__idx">' + pad(i + 1) + '</span>' +
        '<span class="navitem__name">' + esc(it.title) + '</span>' +
        '<span class="navitem__dot"></span></a></li>';
    }).join("");

    var prev = idx > 0 ? items[idx - 1] : null;
    var next = idx < items.length - 1 ? items[idx + 1] : null;
    function pagerBtn(it, dir, dirLabel) {
      if (!it) return '<span class="pager-btn ' + dir + '" aria-disabled="true"><span class="pager-dir">' + dirLabel + '</span><span class="pager-name">—</span></span>';
      return '<a class="pager-btn ' + dir + '" href="' + base + it.id + '"><span class="pager-dir">' + dirLabel + '</span><span class="pager-name">' + esc(it.title) + '</span></a>';
    }

    return '' +
      renderTopbar(sectionKey) +
      '<span class="vlabel vlabel--right">' + esc(page.title) + ' — ' + pad(idx + 1) + '/' + pad(items.length) + '</span>' +
      '<div class="section-view">' +
        '<aside class="sidebar" id="sidebar">' +
          '<button class="mobile-nav-toggle" id="navToggle"><span>' + esc(current.title) + '</span><span>MENÜ</span></button>' +
          '<div class="sidebar__head">' + crumb +
            '<h2 class="sidebar__title">' + esc(page.title) + '</h2>' +
            '<div class="sidebar__count label">' + pad(items.length) + ' BÖLÜM</div>' +
          '</div>' +
          '<ul class="navlist">' + nav + '</ul>' +
        '</aside>' +
        '<main class="content' + (current.mode === "table" ? " content--table" : current.mode === "creature-list" ? " content--creature" : current.mode === "wiki" ? " content--wiki" : "") + '">' +
          '<div class="content__eyebrow">' +
            '<span class="bar"></span>' +
            '<span class="label label--accent">' + esc(page.title) + '</span>' +
            '<span class="index">/ ' + pad(idx + 1) + '</span>' +
          '</div>' +
          '<h1 class="content__title">' + esc(current.title) + '</h1>' +
          contentBodyHTML(current) +
          '<nav class="content__pager">' +
            pagerBtn(prev, "prev", "← ÖNCEKİ") +
            pagerBtn(next, "next", "SONRAKİ →") +
          '</nav>' +
        '</main>' +
      '</div>';
  }

  /* --- TABLO MOTORU (mode:"table" öğeler için) ---------------------------
     - Filtre: tüm alanlarda arama
     - Sıralama: başlığa tıkla (sayı sütunları sayısal, metin alfabetik)
     - Satıra tıkla: sağdaki snapshot kartı o kaydın tüm alanlarını gösterir
       (tabloda gizli alanlar dahil)
     ---------------------------------------------------------------------- */
  var tableState = { sortKey: null, sortDir: 1, filter: "", selRow: null };
  var creatureState = { selId: null, filter: "" };

  function visibleCols(t) { return t.columns.filter(function (c) { return c.showInTable; }); }
  function cellVal(row, col) {
    var v = row[col.id];
    return (v === undefined || v === null) ? "" : v;
  }
  function computeRows(t) {
    var rows = t.rows.slice();
    var f = tableState.filter.trim().toLowerCase();
    if (f) {
      rows = rows.filter(function (r) {
        return t.columns.some(function (c) {
          return String(cellVal(r, c)).toLowerCase().indexOf(f) !== -1;
        });
      });
    }
    if (tableState.sortKey) {
      var col = t.columns.find(function (c) { return c.id === tableState.sortKey; });
      rows.sort(function (a, b) {
        var av = cellVal(a, col), bv = cellVal(b, col);
        if (col && col.type === "number") {
          av = parseFloat(av); bv = parseFloat(bv);
          if (isNaN(av)) av = -Infinity;
          if (isNaN(bv)) bv = -Infinity;
          return (av - bv) * tableState.sortDir;
        }
        return String(av).localeCompare(String(bv), "tr") * tableState.sortDir;
      });
    }
    return rows;
  }

  function tableInner(item) {
    var t = item.table;
    var cols = visibleCols(t);
    if (!cols.length) {
      return '<tbody><tr><td class="abtable__empty">Tabloda gösterilecek sütun yok. Editörden bir sütunun “Tabloda göster” seçeneğini açın.</td></tr></tbody>';
    }
    var rows = computeRows(t);
    var head = cols.map(function (c) {
      var arrow = tableState.sortKey === c.id ? (tableState.sortDir === 1 ? "↑" : "↓") : "";
      var cls = "abth" + (c.type === "number" ? " num" : "") + (tableState.sortKey === c.id ? " sorted" : "");
      return '<th class="' + cls + '" data-sort="' + esc(c.id) + '">' + esc(c.label) +
        '<span class="abth__ar">' + arrow + '</span></th>';
    }).join("");
    var body;
    if (!rows.length) {
      body = '<tr><td class="abtable__empty" colspan="' + cols.length + '">Kayıt bulunamadı.</td></tr>';
    } else {
      body = rows.map(function (r) {
        var sel = tableState.selRow === r._id ? " is-sel" : "";
        var tds = cols.map(function (c) {
          return '<td class="' + (c.type === "number" ? "num" : "") + '">' + esc(cellVal(r, c)) + "</td>";
        }).join("");
        return '<tr class="abrow' + sel + '" data-row="' + esc(r._id) + '">' + tds + "</tr>";
      }).join("");
    }
    return '<thead><tr>' + head + '</tr></thead><tbody>' + body + "</tbody>";
  }

  function renderSnapshot(item) {
    var t = item.table;
    var r = t.rows.find(function (x) { return x._id === tableState.selRow; });
    if (!r) {
      return '<div class="snapshot__empty"><span class="label">SNAPSHOT</span>' +
        '<p>Detayını görmek için tablodan bir kayıt seç.</p></div>';
    }
    var titleCol = t.columns[0];
    var titleVal = titleCol ? cellVal(r, titleCol) : "";

    // Üst zone: snapZone="top" — başlığın altında küçük meta satırı
    var topCols = t.columns.filter(function (c, i) { return i > 0 && (c.snapZone === "top"); });
    var topHTML = topCols.map(function (c) {
      var v = cellVal(r, c);
      return '<span class="snap-top__item">' +
        '<span class="snap-top__label">' + esc(c.label) + '</span>' +
        '<span class="snap-top__val' + (c.type === "number" ? " num" : "") + '">' + (v === "" ? "—" : esc(v)) + '</span>' +
      '</span>';
    }).join('<span class="snap-top__sep">·</span>');

    // Alt zone: snapZone="bottom" — çizgi sonrası alan/değer çiftleri
    var botCols = t.columns.filter(function (c, i) { return i > 0 && (c.snapZone === "bottom" || (!c.snapZone && !topCols.includes(c))); });
    var botHTML = botCols.map(function (c) {
      var v = cellVal(r, c);
      return '<div class="snapfield">' +
        '<span class="label">' + esc(c.label) + "</span>" +
        '<div class="snapfield__val' + (c.type === "number" ? " num" : "") + '">' +
        (v === "" ? "—" : esc(v)) + "</div></div>";
    }).join("");

    return '' +
      '<div class="snapshot__head">' +
        '<span class="label label--accent">' + esc(item.title) + "</span>" +
        '<h3 class="snapshot__title">' + (titleVal === "" ? "—" : esc(titleVal)) + "</h3>" +
        (topHTML ? '<div class="snap-top">' + topHTML + '</div>' : '') +
      "</div>" +
      (botHTML ? '<div class="snapshot__fields">' + botHTML + "</div>" : '');
  }

  function renderTableBlock(item) {
    return '' +
      '<div class="abtable" id="abTable">' +
        '<div class="abtable__bar">' +
          '<input class="abtable__filter" id="abFilter" type="text" placeholder="Filtrele…" autocomplete="off">' +
          '<span class="abtable__count" id="abCount"></span>' +
        "</div>" +
        '<div class="abtable__grid">' +
          '<div class="abtable__scroll"><table class="abtbl" id="abTbl">' + tableInner(item) + "</table></div>" +
          '<aside class="snapshot" id="snapshot">' + renderSnapshot(item) + "</aside>" +
        "</div>" +
      "</div>";
  }

  function wireTable(item) {
    var tbl = document.getElementById("abTbl");
    var filter = document.getElementById("abFilter");
    var count = document.getElementById("abCount");
    if (!tbl) return;
    function updateCount() {
      count.textContent = computeRows(item.table).length + " / " + item.table.rows.length + " KAYIT";
    }
    function rebuild() { tbl.innerHTML = tableInner(item); updateCount(); }
    updateCount();
    if (filter) {
      filter.value = tableState.filter;
      filter.addEventListener("input", function () { tableState.filter = filter.value; rebuild(); });
    }
    tbl.addEventListener("click", function (e) {
      var th = e.target.closest("th[data-sort]");
      if (th) {
        var key = th.getAttribute("data-sort");
        if (tableState.sortKey === key) tableState.sortDir *= -1;
        else { tableState.sortKey = key; tableState.sortDir = 1; }
        rebuild();
        return;
      }
      var tr = e.target.closest("tr[data-row]");
      if (tr) {
        tableState.selRow = tr.getAttribute("data-row");
        document.getElementById("snapshot").innerHTML = renderSnapshot(item);
        tbl.querySelectorAll(".abrow").forEach(function (x) {
          x.classList.toggle("is-sel", x.getAttribute("data-row") === tableState.selRow);
        });
      }
    });
  }

  /* --- ZENGİN İÇERİK (mode:"rich" — blok listesi) ------------------------
     Blok tipleri: heading | paragraph | list | table | image | figuretext | example | tabs
     Satır içi biçim: **kalın**  *italik*
     ---------------------------------------------------------------------- */
  var tabSeq = 0;
  var accSeq = 0;
  function inlineFmt(s) {
    s = esc(s);
    // Bağlantı: [metin](url)
    s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (_, t, u) {
      var ext = /^https?:/i.test(u);
      return '<a class="rb-link" href="' + u + '"' + (ext ? ' target="_blank" rel="noopener"' : '') + '>' + t + '</a>';
    });
    // Renk: {#e11|metin} veya {crimson|metin}
    s = s.replace(/\{([#\w][\w#().,%\s-]*)\|([^{}]*)\}/g, function (_, c, t) {
      return '<span style="color:' + c.trim() + '">' + t + '</span>';
    });
    s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    s = s.replace(/\*([^*]+)\*/g, "<em>$1</em>");
    s = s.replace(/__([^_]+)__/g, "<u>$1</u>");
    s = s.replace(/~~([^~]+)~~/g, "<s>$1</s>");
    s = s.replace(/==([^=]+)==/g, "<mark class='rb-mark'>$1</mark>");
    s = s.replace(/`([^`]+)`/g, "<code class='rb-code-inline'>$1</code>");
    return s.replace(/\n/g, "<br>");
  }
  /* Blok başına stil sarmalayıcı — hizalama, arka plan, boşluk, kenarlık, özel CSS. */
  function blockStyleAttr(b) {
    var s = b && b.style; if (!s) return { style: "", cls: "" };
    var css = [];
    if (s.align) css.push("text-align:" + s.align);
    if (s.bg) css.push("background:" + s.bg);
    if (s.color) css.push("color:" + s.color);
    if (s.pad) css.push("padding:" + s.pad);
    if (s.margin) css.push("margin:" + s.margin);
    if (s.border) css.push("border:" + s.border);
    if (s.radius) css.push("border-radius:" + s.radius);
    if (s.maxw) css.push("max-width:" + s.maxw + ";margin-inline:auto");
    if (s.css) css.push(s.css);
    return {
      style: css.length ? ' style="' + css.join(";").replace(/"/g, "&quot;") + '"' : "",
      cls: s.cls ? " " + esc(s.cls) : ""
    };
  }
  function renderBlock(b) {
    if (!b || !b.type) return "";
    var inner = renderBlockInner(b);
    var w = blockStyleAttr(b);
    if (!w.style && !w.cls) return inner;
    return '<div class="rb-block' + w.cls + '"' + w.style + '>' + inner + '</div>';
  }
  function renderStaticTable(b) {
    var head = (b.header || []).map(function (h) { return "<th>" + esc(h) + "</th>"; }).join("");
    var rows = (b.rows || []).map(function (r) {
      return "<tr>" + (r || []).map(function (c) { return "<td>" + inlineFmt(String(c == null ? "" : c)) + "</td>"; }).join("") + "</tr>";
    }).join("");
    return "<div class='rb-table-wrap'><table class='rb-table'>" +
      (head ? "<thead><tr>" + head + "</tr></thead>" : "") + "<tbody>" + rows + "</tbody></table></div>";
  }
  function videoEmbed(src) {
    src = String(src || "").trim();
    if (!src) return "";
    var yt = src.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
    if (yt) return "<div class='rb-embed'><iframe src='https://www.youtube.com/embed/" + yt[1] + "' title='video' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen loading='lazy'></iframe></div>";
    var vm = src.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (vm) return "<div class='rb-embed'><iframe src='https://player.vimeo.com/video/" + vm[1] + "' title='video' frameborder='0' allow='autoplay; fullscreen; picture-in-picture' allowfullscreen loading='lazy'></iframe></div>";
    if (/\.(mp4|webm|ogg)(\?|$)/i.test(src) || /^data:video/i.test(src))
      return "<div class='rb-embed rb-embed--file'><video src='" + esc(src) + "' controls preload='metadata'></video></div>";
    // Ham iframe/embed kodu
    if (/^\s*<(iframe|video|embed)/i.test(src)) return "<div class='rb-embed'>" + src + "</div>";
    return "<div class='rb-embed'><iframe src='" + esc(src) + "' frameborder='0' loading='lazy' allowfullscreen></iframe></div>";
  }
  function renderBlockInner(b) {
    if (!b || !b.type) return "";
    switch (b.type) {
      case "heading":
        var lv = b.level === 3 ? 3 : 2;
        var hid = b._tocId ? " id='" + esc(b._tocId) + "'" : "";
        return "<h" + lv + hid + " class='rb-h rb-h" + lv + "'>" + esc(b.text || "") + "</h" + lv + ">";
      case "paragraph":
        return "<p class='rb-p'>" + inlineFmt(b.text || "") + "</p>";
      case "list":
        var tag = b.ordered ? "ol" : "ul";
        return "<" + tag + " class='rb-list'>" + (b.items || []).map(function (i) {
          return "<li>" + inlineFmt(i || "") + "</li>";
        }).join("") + "</" + tag + ">";
      case "table":
        return renderStaticTable(b);
      case "image":
        var w = parseInt(b.width, 10);
        var imgStyle = (w && w > 0) ? " style='max-width:" + w + "px'" : "";
        var showCap = b.caption && b.showCaption !== false;
        return "<figure class='rb-fig'><img src='" + esc(b.src || "") + "' alt='" + esc(b.alt || "") + "' loading='lazy'" + imgStyle + ">" +
          (showCap ? "<figcaption>" + esc(b.caption) + "</figcaption>" : "") + "</figure>";
      case "figuretext":
        var pos = b.position || "left";
        var fw = parseInt(b.width, 10);
        var fImgStyle = (fw && fw > 0) ? " style='max-width:" + fw + "px'" : "";
        var fShowCap = b.caption && b.showCaption !== false;
        var fFig = "<figure class='rb-ft__fig'><img src='" + esc(b.src || "") + "' alt='" + esc(b.alt || "") + "' loading='lazy'" + fImgStyle + ">" +
          (fShowCap ? "<figcaption>" + esc(b.caption) + "</figcaption>" : "") + "</figure>";
        var fParas = String(b.text || "").split(/\n\s*\n/).map(function (t) {
          return t.trim() ? "<p class='rb-p'>" + inlineFmt(t.trim()) + "</p>" : "";
        }).join("");
        var fHead = b.heading ? "<h3 class='rb-h rb-h3'>" + esc(b.heading) + "</h3>" : "";
        var fTxt = "<div class='rb-ft__text'>" + fHead + fParas + "</div>";
        return "<div class='rb-ft rb-ft--" + pos + "'>" + fFig + fTxt + "</div>";
      case "example":
        return "<aside class='rb-example'><span class='rb-example__tag'>ÖRNEK</span><div>" + inlineFmt(b.text || "") + "</div></aside>";
      case "tabs":
        var tabs = b.tabs || [];
        if (!tabs.length) return "";
        var gid = "rbt" + (tabSeq++);
        var bar = tabs.map(function (tb, i) {
          return "<button class='rb-tab" + (i === 0 ? " active" : "") + "' data-rbtab='" + gid + "-" + i + "'>" +
            esc(tb.label || ("Sekme " + (i + 1))) + "</button>";
        }).join("");
        var panels = tabs.map(function (tb, i) {
          return "<div class='rb-tabpanel" + (i === 0 ? " active" : "") + "' data-rbpanel='" + gid + "-" + i + "'>" +
            (tb.blocks || []).map(renderBlock).join("") + "</div>";
        }).join("");
        return "<div class='rb-tabs' data-rbtabs='" + gid + "'><div class='rb-tabbar'>" + bar + "</div>" +
          "<div class='rb-tabpanels'>" + panels + "</div></div>";
      case "quote":
        return "<blockquote class='rb-quote'><div class='rb-quote__text'>" + inlineFmt(b.text || "") + "</div>" +
          (b.cite ? "<cite class='rb-quote__cite'>" + esc(b.cite) + "</cite>" : "") + "</blockquote>";
      case "callout": {
        var vr = b.variant || "info";
        var icons = { info: "ℹ", note: "✎", success: "✓", warning: "⚠", danger: "✕", tip: "★" };
        return "<aside class='rb-callout rb-callout--" + vr + "'>" +
          "<span class='rb-callout__icon'>" + (icons[vr] || "•") + "</span>" +
          "<div class='rb-callout__body'>" +
            (b.title ? "<div class='rb-callout__title'>" + esc(b.title) + "</div>" : "") +
            "<div class='rb-callout__text'>" + inlineFmt(b.text || "") + "</div>" +
          "</div></aside>";
      }
      case "divider":
        return "<hr class='rb-divider rb-divider--" + (b.dstyle || "solid") + "'>";
      case "spacer":
        return "<div class='rb-spacer' style='height:" + (parseInt(b.height, 10) || 40) + "px'></div>";
      case "button": {
        var align = b.align || "left";
        var variant = b.variant || "solid";
        var ext = /^https?:/i.test(b.href || "");
        return "<div class='rb-btnwrap' style='text-align:" + align + "'>" +
          "<a class='rb-btn rb-btn--" + variant + "' href='" + esc(b.href || "#") + "'" +
          (ext ? " target='_blank' rel='noopener'" : "") + ">" + esc(b.label || "Buton") + "</a></div>";
      }
      case "video":
        return "<figure class='rb-fig rb-fig--video'>" + videoEmbed(b.src) +
          (b.caption && b.showCaption !== false ? "<figcaption>" + esc(b.caption) + "</figcaption>" : "") + "</figure>";
      case "code":
        return "<div class='rb-codeblock'>" + (b.lang ? "<span class='rb-codeblock__lang'>" + esc(b.lang) + "</span>" : "") +
          "<pre><code>" + esc(b.code || "") + "</code></pre></div>";
      case "html":
        return "<div class='rb-html'>" + (b.html || "") + "</div>";
      case "gallery": {
        var imgs = (b.images || []).filter(function (im) { return im && im.src; });
        if (!imgs.length) return "";
        var gcols = parseInt(b.columns, 10) || 3;
        return "<div class='rb-gallery' style='--rb-gal-cols:" + gcols + "'>" +
          imgs.map(function (im) {
            return "<figure class='rb-gallery__item'><img src='" + esc(im.src) + "' alt='" + esc(im.alt || "") + "' loading='lazy'>" +
              (im.caption ? "<figcaption>" + esc(im.caption) + "</figcaption>" : "") + "</figure>";
          }).join("") + "</div>";
      }
      case "columns": {
        var cols = b.cols || [];
        if (!cols.length) return "";
        var ratio = b.ratio || cols.map(function () { return "1fr"; }).join(" ");
        return "<div class='rb-columns' style='grid-template-columns:" + ratio + "'>" +
          cols.map(function (col) {
            return "<div class='rb-column'>" + (col.blocks || []).map(renderBlock).join("") + "</div>";
          }).join("") + "</div>";
      }
      case "accordion": {
        var items = b.items || [];
        if (!items.length) return "";
        var aid = "rba" + (accSeq++);
        return "<div class='rb-accordion' data-rbacc='" + aid + "'>" +
          items.map(function (ac, i) {
            return "<div class='rb-acc-item" + (ac.open ? " open" : "") + "' data-rbacc-item>" +
              "<button class='rb-acc-head' data-rbacc-toggle><span>" + esc(ac.title || ("Bölüm " + (i + 1))) + "</span><span class='rb-acc-chev'>▾</span></button>" +
              "<div class='rb-acc-panel'><div class='rb-acc-panel__inner'>" +
                (ac.blocks || []).map(renderBlock).join("") +
              "</div></div></div>";
          }).join("") + "</div>";
      }
      default:
        return "";
    }
  }
  function renderBlocks(blocks) {
    return "<div class='content__body rich'>" + (blocks || []).map(renderBlock).join("") + "</div>";
  }

  /* --- WIKI SAYFASI (mode:"wiki") -----------------------------------------
     Bilgi kutusu (infobox) + etiketler + otomatik içindekiler (TOC) +
     zengin gövde (mode:"rich" ile aynı blok motoru) + ilgili sayfalar. ------ */
  function slugifyToc(s) {
    var map = { "ç":"c","ğ":"g","ı":"i","ö":"o","ş":"s","ü":"u","İ":"i" };
    return String(s || "").toLowerCase()
      .replace(/[çğıöşüİ]/g, function (c) { return map[c] || c; })
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "bolum";
  }
  function resolveWikiTarget(rel) {
    var sec = CONTENT.sections[rel.section];
    if (!sec) return null;
    if (sec.type === "hub") {
      var cat = (sec.items || []).find(function (c) { return c.id === rel.item; });
      if (!cat) return null;
      var pg = (cat.pages || []).find(function (p) { return p.id === rel.page; });
      if (!pg) return null;
      return { title: pg.title, href: "#/" + rel.section + "/" + rel.item + "/" + rel.page };
    }
    var leaf = (sec.items || []).find(function (i) { return i.id === rel.item; });
    if (!leaf) return null;
    return { title: leaf.title, href: "#/" + rel.section + "/" + rel.item };
  }
  function renderWikiBody(item) {
    var blocks = item.blocks || [];
    var used = {};
    var tocItems = [];
    blocks.forEach(function (b) {
      if (b && b.type === "heading") {
        var lvl = b.level === 3 ? 3 : 2;
        var base = slugifyToc(b.text), id = base, n = 2;
        while (used[id]) { id = base + "-" + (n++); }
        used[id] = true;
        b._tocId = id;
        tocItems.push({ id: id, text: b.text || "", level: lvl });
      }
    });

    var infobox = item.infobox || {};
    var facts = (infobox.entries || []).filter(function (e) { return e && (e.label || e.value); });
    var hasInfobox = !!(infobox.image || facts.length);
    var tags = item.tags || [];
    var related = (item.related || []).map(function (r) {
      var t = resolveWikiTarget(r);
      return t ? { href: t.href, label: (r.label && r.label.trim()) ? r.label : t.title } : null;
    }).filter(Boolean);

    var infoboxHtml = !hasInfobox ? "" : (
      '<aside class="wiki-infobox">' +
        (infobox.image ? '<div class="wiki-infobox__img"><img src="' + esc(infobox.image) + '" alt="' + esc(item.title) + '" loading="lazy"></div>' : '') +
        (facts.length ? '<dl class="wiki-infobox__facts">' + facts.map(function (e) {
          return '<div class="wiki-infobox__row"><dt>' + esc(e.label) + '</dt><dd>' + esc(e.value) + '</dd></div>';
        }).join("") + '</dl>' : '') +
      '</aside>'
    );

    var tocHtml = !tocItems.length ? "" : (
      '<nav class="wiki-toc"><span class="wiki-toc__label label label--accent">İÇİNDEKİLER</span><ul>' +
        tocItems.map(function (t) {
          return '<li class="wiki-toc__item wiki-toc__item--h' + t.level + '"><a href="#' + t.id + '">' + esc(t.text) + '</a></li>';
        }).join("") +
      '</ul></nav>'
    );

    var tagsHtml = !tags.length ? "" : (
      '<div class="wiki-tags">' + tags.map(function (t) { return '<span class="wiki-tag">' + esc(t) + '</span>'; }).join("") + '</div>'
    );

    var relatedHtml = !related.length ? "" : (
      '<section class="wiki-related">' +
        '<span class="label label--accent">İLGİLİ SAYFALAR</span>' +
        '<ul class="wiki-related__list">' +
          related.map(function (r) { return '<li><a href="' + r.href + '">' + esc(r.label) + '</a></li>'; }).join("") +
        '</ul>' +
      '</section>'
    );

    return '' +
      '<div class="wiki-layout">' +
        '<div class="wiki-main">' +
          tagsHtml +
          tocHtml +
          renderBlocks(blocks) +
          relatedHtml +
        '</div>' +
        infoboxHtml +
      '</div>';
  }

  /* --- YARATIK BESTİYERİ (mode:"creature-list") --------------------------- */
  function renderCreatureListBlock(item) {
    var creatures = item.creatures || [];
    if (!creatures.length) {
      return '<div class="creature-empty">' +
        '<span class="label label--accent">BESTİYER</span>' +
        '<p>Henüz yaratık eklenmemiş. Editörden bu bölüme yaratık ekleyebilirsin.</p>' +
      '</div>';
    }
    if (!creatureState.selId || !creatures.find(function (c) { return c._id === creatureState.selId; })) {
      creatureState.selId = creatures[0]._id;
    }
    var selC = creatures.find(function (c) { return c._id === creatureState.selId; }) || creatures[0];

    function listItemsHtml(list, selId) {
      return list.map(function (c, i) {
        var active = c._id === selId ? " is-sel" : "";
        return '<div class="cr-list-item' + active + '" data-crid="' + esc(c._id) + '">' +
          '<div class="cr-list-item__img' + (c.resim ? "" : " cr-list-item__img--empty") + '">' +
            (c.resim ? '<img src="' + esc(c.resim) + '" alt="">' : "") +
          '</div>' +
          '<div class="cr-list-item__info">' +
            '<span class="cr-list-item__idx">' + pad(i + 1) + '</span>' +
            '<span class="cr-list-item__name">' + esc(c.isim || "—") + '</span>' +
          '</div>' +
        '</div>';
      }).join("");
    }

    var filtered = filterCreatures(creatures, creatureState.filter);
    var listHtml = filtered.length
      ? listItemsHtml(filtered, selC._id)
      : '<div class="cr-list-empty">Sonuç yok.</div>';

    return '<div class="creature-browser" id="creatureBrowser">' +
      '<div class="creature-browser__list">' +
        '<div class="cr-filter-bar">' +
          '<input class="cr-filter-input" id="crFilter" type="text" value="' + esc(creatureState.filter) + '" placeholder="Ara…" autocomplete="off">' +
          '<span class="cr-filter-count" id="crFilterCount">' + filtered.length + ' / ' + creatures.length + '</span>' +
        '</div>' +
        '<div class="cr-list-scroll" id="crListScroll">' + listHtml + '</div>' +
      '</div>' +
      '<div class="creature-browser__detail" id="creatureDetail">' + renderCreatureStatBlock(selC) + '</div>' +
    '</div>';
  }

  function filterCreatures(creatures, q) {
    if (!q || !q.trim()) return creatures;
    var lq = q.trim().toLowerCase();
    return creatures.filter(function (c) {
      return (c.isim || "").toLowerCase().indexOf(lq) !== -1 ||
             (c.doga || "").toLowerCase().indexOf(lq) !== -1 ||
             (c.nitelikler || []).some(function (n) { return (n.isim || "").toLowerCase().indexOf(lq) !== -1; }) ||
             (c.beceriler || []).some(function (n) { return (n.isim || "").toLowerCase().indexOf(lq) !== -1; }) ||
             (c.yetenekler || []).some(function (y) { return (y.isim || "").toLowerCase().indexOf(lq) !== -1; }) ||
             (c.bagisikliklar || []).some(function (b) { return String(b).toLowerCase().indexOf(lq) !== -1; });
    });
  }

  function renderCreatureStatBlock(c) {
    var parts = [];
    // Nitelikler + Beceriler
    var nitelHtml = "", beceriHtml = "";
    if (c.nitelikler && c.nitelikler.length) {
      nitelHtml = '<div class="cr-col">' +
        '<div class="cr-section__title label">NİTELİKLER</div>' +
        '<div class="cr-stat-grid">' +
          c.nitelikler.map(function (n) {
            return '<span class="cr-stat-name">' + esc(n.isim) + '</span>' +
                   '<span class="cr-stat-val">' + esc(n.deger) + '</span>';
          }).join("") +
        '</div></div>';
    }
    if (c.beceriler && c.beceriler.length) {
      beceriHtml = '<div class="cr-col">' +
        '<div class="cr-section__title label">BECERİLER</div>' +
        '<div class="cr-stat-grid">' +
          c.beceriler.map(function (n) {
            return '<span class="cr-stat-name">' + esc(n.isim) + '</span>' +
                   '<span class="cr-stat-val">' + esc(n.deger) + '</span>';
          }).join("") +
        '</div></div>';
    }
    if (nitelHtml || beceriHtml) {
      parts.push('<div class="cr-cols-row">' + nitelHtml + beceriHtml + '</div>');
    }
    // Dayanıklılıklar
    if (c.dayanikliliklar && c.dayanikliliklar.length) {
      parts.push('<div class="cr-section">' +
        '<div class="cr-section__title label">DAYANIKLILIKLAR</div>' +
        '<div class="cr-resist-list">' +
          c.dayanikliliklar.map(function (d) {
            var ok = d.durum !== "kirilgan";
            return '<div class="cr-resist-row">' +
              '<span class="cr-resist-icon cr-resist-icon--' + (ok ? "yes" : "no") + '">' + (ok ? "✓" : "✕") + '</span>' +
              '<span class="cr-resist-name">' + esc(d.isim) + '</span>' +
              '<span class="label">' + (ok ? "DAYANIKLI" : "KIRILGAN") + '</span>' +
            '</div>';
          }).join("") +
        '</div></div>');
    }
    // Bağışıklıklar
    var bagFilt = (c.bagisikliklar || []).filter(Boolean);
    if (bagFilt.length) {
      parts.push('<div class="cr-section">' +
        '<div class="cr-section__title label">BAĞIŞIKLIKLAR</div>' +
        '<div class="cr-badges">' +
          bagFilt.map(function (b) { return '<span class="cr-badge">' + esc(b) + '</span>'; }).join("") +
        '</div></div>');
    }
    // Yetenekler
    if (c.yetenekler && c.yetenekler.length) {
      parts.push('<div class="cr-section">' +
        '<div class="cr-section__title label">YETENEKLER</div>' +
        '<div class="cr-abilities">' +
          c.yetenekler.map(function (y) {
            return '<div class="cr-ability">' +
              '<div class="cr-ability__head">' +
                '<span class="cr-ability__name">' + esc(y.isim) + '</span>' +
                (y.kullanim ? '<span class="cr-ability__freq label">' + esc(y.kullanim) + '</span>' : '') +
              '</div>' +
              (y.aciklama ? '<div class="cr-ability__desc">' + esc(y.aciklama) + '</div>' : '') +
            '</div>';
          }).join("") +
        '</div></div>');
    }
    // Değerli Kısımlar
    if (c.degerliKisimlar && c.degerliKisimlar.length) {
      parts.push('<div class="cr-section">' +
        '<div class="cr-section__title label">DEĞERLİ KISIMLAR</div>' +
        '<div class="cr-loot-list">' +
          c.degerliKisimlar.map(function (d) {
            return '<div class="cr-loot">' +
              '<span class="cr-loot__name">' + esc(d.isim) + '</span>' +
              (d.aciklama ? '<span class="cr-loot__desc">' + esc(d.aciklama) + '</span>' : '') +
            '</div>';
          }).join("") +
        '</div></div>');
    }
    // Doğa
    if (c.doga) {
      parts.push('<div class="cr-section">' +
        '<div class="cr-section__title label">DOĞA</div>' +
        '<p class="cr-doga">' + esc(c.doga) + '</p>' +
      '</div>');
    }
    return '<div class="cr-statblock">' +
      '<div class="cr-statblock__head">' +
        (c.resim ? '<div class="cr-portrait"><img src="' + esc(c.resim) + '" alt="' + esc(c.isim) + '"></div>' : '') +
        '<h2 class="cr-statblock__name">' + esc(c.isim || "—") + '</h2>' +
      '</div>' +
      (parts.length ? '<div class="cr-statblock__body">' + parts.join('<div class="cr-divider"></div>') + '</div>' : '') +
    '</div>';
  }

  function wireCreatureBrowser(item) {
    var browser = document.getElementById("creatureBrowser");
    if (!browser) return;

    var filterInp = document.getElementById("crFilter");
    var countEl   = document.getElementById("crFilterCount");
    var scrollEl  = document.getElementById("crListScroll");
    var detailEl  = document.getElementById("creatureDetail");

    function rebuildList() {
      var creatures = item.creatures || [];
      var filtered = filterCreatures(creatures, creatureState.filter);
      if (countEl) countEl.textContent = filtered.length + " / " + creatures.length;
      if (!scrollEl) return;
      if (!filtered.length) {
        scrollEl.innerHTML = '<div class="cr-list-empty">Sonuç yok.</div>';
        return;
      }
      scrollEl.innerHTML = filtered.map(function (c, i) {
        var active = c._id === creatureState.selId ? " is-sel" : "";
        return '<div class="cr-list-item' + active + '" data-crid="' + esc(c._id) + '">' +
          '<div class="cr-list-item__img' + (c.resim ? "" : " cr-list-item__img--empty") + '">' +
            (c.resim ? '<img src="' + esc(c.resim) + '" alt="">' : "") +
          '</div>' +
          '<div class="cr-list-item__info">' +
            '<span class="cr-list-item__idx">' + pad(i + 1) + '</span>' +
            '<span class="cr-list-item__name">' + esc(c.isim || "—") + '</span>' +
          '</div>' +
        '</div>';
      }).join("");
      wireItems();
    }

    function wireItems() {
      if (!scrollEl) return;
      scrollEl.querySelectorAll(".cr-list-item[data-crid]").forEach(function (el) {
        el.addEventListener("click", function () {
          creatureState.selId = el.getAttribute("data-crid");
          var c = (item.creatures || []).find(function (x) { return x._id === creatureState.selId; });
          if (detailEl) detailEl.innerHTML = c ? renderCreatureStatBlock(c) : "";
          scrollEl.querySelectorAll(".cr-list-item").forEach(function (x) {
            x.classList.toggle("is-sel", x.getAttribute("data-crid") === creatureState.selId);
          });
        });
      });
    }

    if (filterInp) {
      filterInp.value = creatureState.filter;
      filterInp.addEventListener("input", function () {
        creatureState.filter = filterInp.value;
        rebuildList();
      });
    }

    wireItems();
  }

  /* --- Render dispatcher -------------------------------------------------- */
  function render() {
    var route = parseHash();
    var root = document.getElementById("app");
    var html;
    if (route.section && CONTENT.sections[route.section]) {
      var rsec = CONTENT.sections[route.section];
      if (rsec.type === "hub") {
        html = route.item ? renderHubPage(route.section, route.item, route.sub)
                          : renderHubLanding(route.section);
      } else {
        html = renderSection(route.section, route.item);
      }
    } else {
      html = renderLanding();
    }
    root.innerHTML = html;

    // Versiyon seçici
    if (!document._verDocWired) {
      document._verDocWired = true;
      document.addEventListener("click", function (e) {
        var vw = document.getElementById("verWrap");
        if (vw && !vw.contains(e.target)) {
          var vp = document.getElementById("verPanel");
          if (vp) vp.classList.remove("open");
        }
      });
    }
    var verTrigger = document.getElementById("verTrigger");
    var verPanel   = document.getElementById("verPanel");
    if (verTrigger && verPanel) {
      verTrigger.addEventListener("click", function (e) {
        e.preventDefault(); e.stopPropagation();
        verPanel.classList.toggle("open");
      });
      verPanel.querySelectorAll("[data-ver-switch]").forEach(function (btn) {
        btn.addEventListener("click", function (e) {
          e.stopPropagation();
          sessionStorage.setItem(STORE_VIEWING, btn.getAttribute("data-ver-switch"));
          CONTENT = vActiveContent();
          verPanel.classList.remove("open");
          render();
        });
      });
    }
    // Tema toggle olayları
    updateThemeToggle(getTheme());
    document.querySelectorAll("[data-theme-toggle]").forEach(function (b) {
      b.addEventListener("click", toggleTheme);
    });
    // Mobil menü
    var navToggle = document.getElementById("navToggle");
    if (navToggle) {
      var sb = document.getElementById("sidebar");
      navToggle.addEventListener("click", function () { sb.classList.toggle("collapsed"); });
    }
    // Tablo modu wiring
    var abt = document.getElementById("abTbl");
    if (abt && route.section && CONTENT.sections[route.section]) {
      var wsec = CONTENT.sections[route.section];
      var wit = null;
      if (wsec.type === "hub") {
        var wpage = wsec.items.find(function (x) { return x.id === route.item; });
        if (wpage && wpage.pages && wpage.pages.length) {
          wit = wpage.pages.find(function (x) { return x.id === route.sub; }) || wpage.pages[0];
        }
      } else {
        wit = wsec.items.find(function (x) { return x.id === route.item; }) || wsec.items[0];
      }
      if (wit && wit.mode === "table") wireTable(wit);
    }
    // Yaratık modu wiring
    var crb = document.getElementById("creatureBrowser");
    if (crb && route.section && CONTENT.sections[route.section]) {
      var crsec = CONTENT.sections[route.section];
      var crit = null;
      if (crsec.type === "hub") {
        var crpage = crsec.items.find(function (x) { return x.id === route.item; });
        if (crpage && crpage.pages && crpage.pages.length) {
          crit = crpage.pages.find(function (x) { return x.id === route.sub; }) || crpage.pages[0];
        }
      } else {
        crit = crsec.items.find(function (x) { return x.id === route.item; }) || crsec.items[0];
      }
      if (crit && crit.mode === "creature-list") wireCreatureBrowser(crit);
    }
    // Zengin içerik: sayfa içi sekme geçişleri
    document.querySelectorAll(".rb-tabs").forEach(function (wrap) {
      wrap.querySelectorAll(".rb-tab").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var key = btn.getAttribute("data-rbtab");
          wrap.querySelectorAll(".rb-tab").forEach(function (b) { b.classList.toggle("active", b === btn); });
          wrap.querySelectorAll(".rb-tabpanel").forEach(function (pnl) {
            pnl.classList.toggle("active", pnl.getAttribute("data-rbpanel") === key);
          });
        });
      });
    });
    // Zengin içerik: akordeon aç/kapat
    document.querySelectorAll(".rb-accordion").forEach(function (wrap) {
      wrap.querySelectorAll("[data-rbacc-toggle]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          var item = btn.closest("[data-rbacc-item]");
          if (item) item.classList.toggle("open");
        });
      });
    });
    // Sayfa başına dön (bölüm değişiminde)
    window.scrollTo(0, 0);
  }

  /* --- Başlat ------------------------------------------------------------- */
  setTheme(getTheme());
  window.addEventListener("hashchange", render);
  document.addEventListener("DOMContentLoaded", render);
  if (document.readyState !== "loading") render();
})();
