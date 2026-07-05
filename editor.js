/* ============================================================================
   SLVNZ 4.0 — EDİTÖR (ADMIN PANEL) MANTIĞI
   ----------------------------------------------------------------------------
   Tamamen offline çalışır. Sunucu / build adımı YOK.

   Nasıl çalışır?
   - "Kaydet" -> değişiklikleri tarayıcıya (localStorage) yazar. Site bunu
     otomatik kullanır. Tarayıcıyı kapatsan bile kalır.
   - "JSON dışa aktar" -> yedek .json dosyası indirir.
   - "JSON içe aktar" -> daha önce aldığın yedeği geri yükler.
   - "content.js olarak kopyala" -> kaynak dosyaya yapıştırabileceğin tam
     content.js metnini üretir (kalıcı/repo güncellemesi için).
   - "Varsayılana sıfırla" -> kaydı siler, content.js varsayılanlarına döner.
   ========================================================================== */

(function () {
  "use strict";

  var STORE_CONTENT   = "slvnz_content";
  var STORE_VERSIONS  = "slvnz_versions";
  var STORE_EDITOR_VER = "slvnz_editor_ver"; // editörde hangi versiyon aktif
  var STORE_THEME     = "slvnz_theme";

  /* --- Versiyon arşivi (editör) ------------------------------------------- */
  function vEdStoreLoad() {
    var freshSeed = window.SLVNZ_CONTENT && window.SLVNZ_CONTENT.meta && window.SLVNZ_CONTENT.meta.contentSeed;
    try {
      var raw = localStorage.getItem(STORE_VERSIONS);
      if (raw) {
        var s = JSON.parse(raw);
        if (s && Array.isArray(s.versions) && s.versions.length) {
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
      try { localStorage.setItem(STORE_VERSIONS, JSON.stringify(window.SLVNZ_VERSIONS)); } catch (e2) {}
      return window.SLVNZ_VERSIONS;
    }
    return null;
  }
  function vEdStoreSave(store) {
    try { localStorage.setItem(STORE_VERSIONS, JSON.stringify(store)); } catch (e) {}
    // Legacy uyum: varsayılan versiyonun içeriğini slvnz_content'e de yaz
    var dv = store.versions.find(function (v) { return v.id === store.defaultId; });
    if (dv) { try { localStorage.setItem(STORE_CONTENT, JSON.stringify(dv.content)); } catch (e2) {} }
  }
  function vEdUID() { return "ver_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 4); }
  function vEdActiveId() {
    var store = vEdStoreLoad(); if (!store) return null;
    var saved = localStorage.getItem(STORE_EDITOR_VER);
    if (saved && store.versions.find(function (v) { return v.id === saved; })) return saved;
    return store.defaultId || (store.versions[0] && store.versions[0].id);
  }
  function vEdActiveLabel() {
    var store = vEdStoreLoad(); if (!store) return "—";
    var id = vEdActiveId();
    var v = store.versions.find(function (x) { return x.id === id; }) || store.versions[0];
    return v ? v.label : "—";
  }
  function vEdIsDefault() {
    var store = vEdStoreLoad(); if (!store) return true;
    return vEdActiveId() === store.defaultId;
  }
  /* Bölüm sırası artık dinamik: draft.meta.sectionOrder (yoksa nesne anahtarları). */
  function getSectionOrder() {
    var keys = Object.keys(draft.sections || {});
    var ord = (draft.meta && Array.isArray(draft.meta.sectionOrder)) ? draft.meta.sectionOrder.slice() : null;
    if (!ord) return keys;
    var out = ord.filter(function (k) { return draft.sections[k]; });
    keys.forEach(function (k) { if (out.indexOf(k) === -1) out.push(k); });
    return out;
  }
  function setSectionOrder(order) { draft.meta = draft.meta || {}; draft.meta.sectionOrder = order; }

  function addSection() {
    var label = prompt("Yeni bölümün adı:", "Yeni Bölüm");
    if (label === null) return;
    label = label.trim() || "Yeni Bölüm";
    var order = getSectionOrder();
    var base = slugify(label) || "bolum", key = base, k = 2;
    while (draft.sections[key]) { key = base + "-" + (k++); }
    draft.sections[key] = { label: label, blurb: "", items: [] };
    order.push(key);
    setSectionOrder(order);
    sel = { type: "section", section: key };
    markDirty(); renderAll();
  }
  function deleteSection(key) {
    var sec = draft.sections[key];
    if (!sec) return;
    edConfirm('"' + sec.label + '" bölümü ve İÇİNDEKİ TÜM ÖĞELER silinecek. Emin misin?', { okLabel: "SİL" }).then(function (ok) {
      if (!ok) return;
      delete draft.sections[key];
      setSectionOrder(getSectionOrder().filter(function (k) { return k !== key; }));
      sel = { type: "meta" };
      markDirty(); renderAll();
    });
  }
  function moveSection(key, dir) {
    var order = getSectionOrder();
    var idx = order.indexOf(key);
    var to = idx + dir;
    if (idx < 0 || to < 0 || to >= order.length) return;
    var tmp = order[idx]; order[idx] = order[to]; order[to] = tmp;
    setSectionOrder(order);
    markDirty(); renderAll();
  }
  function toggleSectionHub(key) {
    var sec = draft.sections[key];
    if (!sec) return;
    if (isHub(sec)) {
      edConfirm("HUB modundan çıkmak, sayfa yapısını düzleştirir (her sayfanın içeriği tek listeye iner). Devam edilsin mi?").then(function (ok) {
        if (!ok) return;
        delete sec.type;
        var flat = [];
        (sec.items || []).forEach(function (pg) { (pg.pages || []).forEach(function (it) { flat.push(it); }); });
        sec.items = flat;
        markDirty(); renderAll();
      });
    } else {
      edConfirm("Bu bölüm HUB'a çevrilecek: mevcut öğeler ilk sayfanın altına taşınacak. Devam edilsin mi?").then(function (ok) {
        if (!ok) return;
        var oldItems = sec.items || [];
        sec.type = "hub";
        sec.items = [{ id: "sayfa-1", title: "Sayfa 1", blurb: "", pages: oldItems }];
        markDirty(); renderAll();
      });
    }
  }

  /* --- Yardımcılar -------------------------------------------------------- */
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function pad(n) { return String(n).padStart(2, "0"); }
  function slugify(s) {
    var map = { "ç":"c","ğ":"g","ı":"i","ö":"o","ş":"s","ü":"u","İ":"i" };
    return String(s).toLowerCase()
      .replace(/[çğıöşüİ]/g, function (m) { return map[m] || m; })
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "oge";
  }

  /* --- Durum (state) ------------------------------------------------------ */
  function loadDraft() {
    var store = vEdStoreLoad();
    if (store) {
      var id = vEdActiveId();
      var v = id && store.versions.find(function (x) { return x.id === id; });
      if (!v) v = store.versions[0];
      if (v) return clone(v.content);
    }
    // Versiyon arşivi yoksa: legacy slvnz_content veya defaults
    var defaults = window.SLVNZ_CONTENT;
    var seed = defaults.meta && defaults.meta.contentSeed;
    try {
      var raw = localStorage.getItem(STORE_CONTENT);
      if (raw) {
        var p = JSON.parse(raw);
        if (p && p.sections) {
          if (seed && p.meta && p.meta.contentSeed !== seed) return clone(defaults);
          return p;
        }
      }
    } catch (e) {}
    return clone(defaults);
  }

  var draft = loadDraft();
  var dirty = false;                                  // kaydedilmemiş değişiklik var mı
  var sel = { type: "meta" };                         // seçili düzenleme hedefi

  /* --- Geri al / yinele (undo/redo) ---------------------------------------
     Hızlı ardışık düzenlemeler (yazma gibi) tek bir geri-alma adımında
     birleştirilir: burst kapandığında (700ms sessizlik) yeni bir kontrol
     noktası (checkpoint) belirlenir. --------------------------------------- */
  var STORE_AUTOSAVE = "slvnz_editor_autosave";
  var undoStack = [];
  var redoStack = [];
  var lastCheckpoint = clone(draft);
  var historyBurst = false;
  var historyBurstTimer = null;
  var autosaveTimer = null;

  function markDirty() {
    dirty = true;
    if (!historyBurst) {
      undoStack.push(lastCheckpoint);
      if (undoStack.length > 60) undoStack.shift();
      redoStack = [];
      historyBurst = true;
    }
    clearTimeout(historyBurstTimer);
    historyBurstTimer = setTimeout(function () { lastCheckpoint = clone(draft); historyBurst = false; }, 700);
    clearTimeout(autosaveTimer);
    autosaveTimer = setTimeout(autosaveNow, 900);
    renderStatus();
    updateHistoryButtons();
  }
  function autosaveNow() {
    try { localStorage.setItem(STORE_AUTOSAVE, JSON.stringify({ verId: vEdActiveId(), content: draft, ts: Date.now() })); } catch (e) {}
  }
  function clearAutosave() { try { localStorage.removeItem(STORE_AUTOSAVE); } catch (e) {} }
  function checkAutosaveRecovery() {
    try {
      var raw = localStorage.getItem(STORE_AUTOSAVE);
      if (!raw) return;
      var a = JSON.parse(raw);
      if (!a || !a.content) return;
      if (a.verId !== vEdActiveId()) return;
      if (JSON.stringify(a.content) === JSON.stringify(draft)) { clearAutosave(); return; }
      edConfirm("Kaydedilmemiş bir otomatik taslak bulundu. Onu geri yüklemek ister misin?", { okLabel: "TASLAĞI YÜKLE", cancelLabel: "MEVCUTLA DEVAM ET" }).then(function (ok) {
        if (ok) {
          draft = a.content; lastCheckpoint = clone(draft); dirty = true;
        } else {
          clearAutosave();
        }
        renderAll();
      });
    } catch (e) {}
  }
  // sel bir öğeye işaret ediyor ama artık yoksa güvenli bir üst seviyeye düşür
  function sanitizeSel() {
    try {
      if (sel.type === "section") {
        if (!draft.sections[sel.section]) sel = { type: "meta" };
      } else if (sel.type === "page") {
        var sec = draft.sections[sel.section];
        var pg = sec && (sec.items || []).find(function (p) { return p.id === sel.pageId; });
        sel = pg ? sel : (sec ? { type: "section", section: sel.section } : { type: "meta" });
      } else if (sel.type === "item") {
        var items = itemListFor(sel);
        var it = items && items.find(function (x) { return x.id === sel.itemId; });
        if (!it) sel = { type: "meta" };
      }
    } catch (e) { sel = { type: "meta" }; }
  }
  function undo() {
    if (!undoStack.length) return;
    redoStack.push(clone(draft));
    draft = undoStack.pop();
    lastCheckpoint = clone(draft);
    historyBurst = false;
    dirty = true;
    sanitizeSel();
    renderAll();
    toast("GERİ ALINDI");
  }
  function redo() {
    if (!redoStack.length) return;
    undoStack.push(clone(draft));
    draft = redoStack.pop();
    lastCheckpoint = clone(draft);
    historyBurst = false;
    dirty = true;
    sanitizeSel();
    renderAll();
    toast("YİNELENDİ");
  }
  function updateHistoryButtons() {
    var u = document.getElementById("edUndo"), r = document.getElementById("edRedo");
    if (u) u.disabled = !undoStack.length;
    if (r) r.disabled = !redoStack.length;
  }

  /* --- Tema --------------------------------------------------------------- */
  function getTheme() {
    var s = localStorage.getItem(STORE_THEME);
    return (s === "light" || s === "dark") ? s : "dark";
  }
  function setTheme(t) { document.documentElement.setAttribute("data-theme", t); localStorage.setItem(STORE_THEME, t); }
  function toggleTheme() { setTheme(getTheme() === "dark" ? "light" : "dark"); var b = document.getElementById("edThemeLbl"); if (b) b.textContent = getTheme().toUpperCase(); }

  /* --- İkonlar ------------------------------------------------------------ */
  var I = {
    moon: '<svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/></svg>',
  };

  /* --- Kaydet / dışa-içe aktar -------------------------------------------- */
  function save() {
    var store = vEdStoreLoad();
    if (!store) {
      // Henüz arşiv yok: ilk versiyonu oluştur
      var nid = vEdUID();
      store = { versions: [{ id: nid, label: (draft.meta && draft.meta.version) || "v4.0", createdAt: new Date().toISOString().slice(0, 10), content: clone(draft) }], defaultId: nid };
      localStorage.setItem(STORE_EDITOR_VER, nid);
    } else {
      var activeId = vEdActiveId();
      var v = activeId && store.versions.find(function (x) { return x.id === activeId; });
      if (v) { v.content = clone(draft); }
      else {
        var bid = vEdUID();
        store.versions.push({ id: bid, label: (draft.meta && draft.meta.version) || "v4.0", createdAt: new Date().toISOString().slice(0, 10), content: clone(draft) });
        if (!store.defaultId) store.defaultId = bid;
        localStorage.setItem(STORE_EDITOR_VER, bid);
      }
    }
    vEdStoreSave(store);
    dirty = false; renderStatus();
    clearAutosave();
    toast("KAYDEDİLDİ");
  }
  function resetDefaults() {
    edConfirm("Bu versiyonun içeriği content.js varsayılanlarına sıfırlanacak. Emin misin?", { okLabel: "SIFIRLA" }).then(function (ok) {
      if (!ok) return;
      draft = clone(window.SLVNZ_CONTENT);
      dirty = true; sel = { type: "meta" };
      renderAll(); toast("VARSAYILANA SIFIRLANDI — KAYDETMEYİ UNUTMA");
    });
  }
  function exportJSON() {
    var content = JSON.stringify(draft, null, 2);
    var filename = "slvnz-content-" + new Date().toISOString().slice(0, 10) + ".json";
    if (typeof window.showSaveFilePicker === "function") {
      window.showSaveFilePicker({
        suggestedName: filename,
        types: [{ description: "JSON Dosyası", accept: { "application/json": [".json"] } }]
      }).then(function (handle) {
        return handle.createWritable().then(function (w) {
          return w.write(content).then(function () { return w.close(); });
        });
      }).then(function () { toast("JSON KAYDEDİLDİ"); })
        .catch(function (e) { if (e.name !== "AbortError") { exportJSONFallback(content, filename); } });
      return;
    }
    exportJSONFallback(content, filename);
  }
  function exportJSONFallback(content, filename) {
    var blob = new Blob([content], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click(); URL.revokeObjectURL(a.href);
    toast("JSON İNDİRİLDİ");
  }
  function importJSON() {
    var inp = document.createElement("input");
    inp.type = "file"; inp.accept = "application/json,.json";
    inp.onchange = function () {
      var f = inp.files[0]; if (!f) return;
      var rd = new FileReader();
      rd.onload = function () {
        try {
          var data = JSON.parse(rd.result);
          if (!data.sections) throw new Error("Geçersiz yapı");
          draft = data; markDirty(); sel = { type: "meta" }; renderAll();
          toast("İÇE AKTARILDI — KAYDETMEYİ UNUTMA");
        } catch (e) { edAlert("Dosya okunamadı: " + e.message); }
      };
      rd.readAsText(f);
    };
    inp.click();
  }
  function genContentJS() {
    var header =
      "/* ============================================================\n" +
      "   SLVNZ 4.0 — content.js  (editörden üretildi: " + new Date().toLocaleString("tr-TR") + ")\n" +
      "   Bu metni content.js dosyasının TAMAMIYLA değiştir.\n" +
      "   ============================================================ */\n\n";
    var ph = JSON.stringify(window.SLVNZ_PLACEHOLDER_BODY || "");
    var normalize =
      "\n\n/* Normalizasyon: metin öğelerine body, tablo satırlarına _id garanti et. */\n" +
      "(function normalize(c){var rid=0;Object.values(c.sections).forEach(function(sec){sec.items.forEach(function(it){" +
      "if(it.mode===\"table\"){if(!it.table)it.table={columns:[],rows:[]};" +
      "if(!Array.isArray(it.table.columns))it.table.columns=[];if(!Array.isArray(it.table.rows))it.table.rows=[];" +
      "it.table.rows.forEach(function(r){if(!r._id)r._id=\"r\"+(++rid)+\"_\"+Date.now().toString(36);});}" +
      "else if(!it.body){it.body=window.SLVNZ_PLACEHOLDER_BODY;}});});})(window.SLVNZ_CONTENT);\n";

    // Her export'ta yeni bir contentSeed üret → tarayıcı cache'ini geçersiz kılar
    var newSeed = new Date().toISOString().slice(0, 10) + "-" + Date.now().toString(36);

    // Tüm versiyonları store'a dahil et (aktif versiyon draft ile güncellenir)
    var store = vEdStoreLoad();
    var versionsJS = "";
    var defaultContent = clone(draft);
    defaultContent.meta = defaultContent.meta || {};
    defaultContent.meta.contentSeed = newSeed;

    if (store) {
      var exportStore = clone(store);
      var activeId = vEdActiveId();
      var av = activeId && exportStore.versions.find(function (x) { return x.id === activeId; });
      if (av) { av.content = clone(draft); av.content.meta = av.content.meta || {}; av.content.meta.contentSeed = newSeed; }
      // Tüm versiyonların seed'ini güncelle — store tutarlı olsun
      exportStore.versions.forEach(function (v) {
        if (v.content && v.content.meta) v.content.meta.contentSeed = newSeed;
      });
      var defV = exportStore.versions.find(function (x) { return x.id === exportStore.defaultId; });
      if (defV) defaultContent = defV.content;
      versionsJS = "\nwindow.SLVNZ_VERSIONS = " + JSON.stringify(exportStore, null, 2) + ";\n";
    }

    return header +
      "window.SLVNZ_PLACEHOLDER_BODY = " + ph + ";\n\n" +
      "window.SLVNZ_CONTENT = " + JSON.stringify(defaultContent, null, 2) + ";\n" +
      versionsJS +
      normalize;
  }

  /* --- Render: ÜST BAR ---------------------------------------------------- */
  function renderStatus() {
    var el = document.getElementById("edStatus");
    if (!el) return;
    el.className = "ed-status " + (dirty ? "dirty" : "saved");
    el.querySelector(".txt").textContent = dirty ? "KAYDEDİLMEDİ" : "KAYDEDİLDİ";
  }

  /* --- HUB yardımcıları --------------------------------------------------- */
  // Bir bölüm hub mu? (items[] = sayfalar, içerik pages[] içinde)
  function isHub(sec) { return !!(sec && sec.type === "hub"); }
  // sel'e göre düzenlenen sayfa nesnesi (hub bölümlerde)
  function pageOf(s) {
    var sec = draft.sections[s.section];
    if (!sec || !s.pageId) return null;
    return sec.items.find(function (p) { return p.id === s.pageId; }) || null;
  }
  // sel'in işaret ettiği içerik öğesinin bulunduğu dizi (sec.items veya page.pages)
  function itemListFor(s) {
    var sec = draft.sections[s.section];
    if (!sec) return null;
    if (isHub(sec)) {
      var pg = pageOf(s);
      return pg ? (pg.pages || (pg.pages = [])) : null;
    }
    return sec.items;
  }

  /* --- Render: AĞAÇ ------------------------------------------------------- */
  function renderTree() {
    var html = "";
    // Genel/meta düğümü
    html += '<div class="ed-tree__meta' + (sel.type === "meta" ? " active" : "") + '" data-sel="meta">' +
              '⚙ GENEL & LANDING' +
            '</div>';
    // Versiyon arşivi düğümü
    html += '<div class="ed-tree__meta' + (sel.type === "versions" ? " active" : "") + '" data-sel="versions" style="margin-bottom:2px">' +
              '⊛ VERSİYONLAR' +
            '</div>';

    var __secOrder = getSectionOrder();
    __secOrder.forEach(function (key, secIdx) {
      var sec = draft.sections[key];
      if (!sec) return;
      html += '<div class="ed-tree__group" data-secgroup="' + key + '">';
      html += '<div class="ed-tree__seclabel">' +
                '<span class="label" data-sel="section" data-sec="' + key + '" style="cursor:pointer">' + esc(sec.label) + (isHub(sec) ? ' <span class="ed-hub-tag">HUB</span>' : '') + '</span>' +
                '<span class="ed-tree__secbtns">' +
                  '<button class="ed-mini" data-secmove="' + key + '::up"' + (secIdx === 0 ? " disabled" : "") + ' title="Yukari tasi">&uarr;</button>' +
                  '<button class="ed-mini" data-secmove="' + key + '::down"' + (secIdx === __secOrder.length - 1 ? " disabled" : "") + ' title="Asagi tasi">&darr;</button>' +
                '</span>' +
                '<span class="index">' + pad(sec.items.length) + '</span>' +
              '</div>';

      if (isHub(sec)) {
        // HUB: her item bir SAYFA; altında kendi içerik bölümleri (pages[])
        sec.items.forEach(function (pg, pi) {
          var pageActive = ((sel.type === "page" || sel.type === "item") && sel.section === key && sel.pageId === pg.id);
          html += '<div class="ed-tree__page">';
          html += '<div class="ed-tree__item ed-tree__pageitem' + (sel.type === "page" && pageActive ? " active" : "") + '" data-sel="page" data-sec="' + key + '" data-page="' + esc(pg.id) + '">' +
                    '<span class="idx">' + pad(pi + 1) + '</span>' +
                    '<span>' + esc(pg.title) + '</span>' +
                  '</div>';
          html += '<ul class="ed-tree__list ed-tree__sublist">';
          (pg.pages || []).forEach(function (it, i) {
            var active = (sel.type === "item" && sel.section === key && sel.pageId === pg.id && sel.itemId === it.id) ? " active" : "";
            html += '<li class="ed-tree__item ed-tree__subitem' + active + '" data-sel="item" data-sec="' + key + '" data-page="' + esc(pg.id) + '" data-id="' + esc(it.id) + '">' +
                      '<span class="idx">' + pad(i + 1) + '</span>' +
                      '<span>' + esc(it.title) + '</span>' +
                    '</li>';
          });
          html += '</ul>';
          html += '<button class="ed-addbtn ed-addbtn--sub" data-additem="' + key + '::' + esc(pg.id) + '">+ İÇERİK EKLE</button>';
          html += '</div>';
        });
        html += '<button class="ed-addbtn" data-addpage="' + key + '">+ SAYFA EKLE</button>';
      } else {
        html += '<ul class="ed-tree__list">';
        sec.items.forEach(function (it, i) {
          var active = (sel.type === "item" && sel.section === key && !sel.pageId && sel.itemId === it.id) ? " active" : "";
          html += '<li class="ed-tree__item' + active + '" data-sel="item" data-sec="' + key + '" data-id="' + esc(it.id) + '">' +
                    '<span class="idx">' + pad(i + 1) + '</span>' +
                    '<span>' + esc(it.title) + '</span>' +
                  '</li>';
        });
        html += '</ul>';
        html += '<button class="ed-addbtn" data-add="' + key + '">+ ÖĞE EKLE</button>';
      }
      html += '</div>';
    });
    html += '<button class="ed-addbtn ed-addbtn--section" data-addsection="1">+ YENI BOLUM EKLE</button>';
    return html;
  }

  /* --- Render: FORM ------------------------------------------------------- */
  function field(label, hint, inputHtml) {
    return '<div class="ed-field"><label>' + label +
      (hint ? '<span class="hint">' + hint + '</span>' : '') + '</label>' + inputHtml + '</div>';
  }

  function renderForm() {
    if (sel.type === "meta") return renderMetaForm();
    if (sel.type === "versions") return renderVersionsForm();
    if (sel.type === "section") return renderSectionForm();
    if (sel.type === "page") return renderPageForm();
    if (sel.type === "item") return renderItemForm();
    return '<div class="ed-empty"><h3>SEÇİM YOK</h3><p>Soldan bir öğe seç.</p></div>';
  }

  function renderMetaForm() {
    var m = draft.meta;
    var bn = (m.brandName != null) ? m.brandName : (m.title || "").replace("4.0", "").trim();
    var ba = (m.brandAccent != null) ? m.brandAccent : "4.0";
    return '' +
      '<div class="ed-form__head"><div>' +
        '<div class="ed-form__kicker label label--accent">GENEL AYARLAR</div>' +
        '<h1 class="ed-form__title">LANDING & MARKA</h1>' +
      '</div></div>' +
      // Üst baştaki marka işareti — iki parça ayrı
      '<div class="ed-field"><label>ÜST MARKA YAZISI <span class="hint">soldaki “SLVNZ 4.0”</span></label>' +
        '<div class="ed-brandgrid">' +
          '<div><div class="ed-sublabel">METİN (beyaz)</div><input class="ed-input" data-meta="brandName" value="' + esc(bn) + '" placeholder="SLVNZ"></div>' +
          '<div><div class="ed-sublabel">VURGU (renkli)</div><input class="ed-input ed-input--accent" data-meta="brandAccent" value="' + esc(ba) + '" placeholder="4.0"></div>' +
        '</div>' +
        '<div class="ed-brandpreview" id="brandPrev"></div>' +
      '</div>' +
      field("MARKA LOGOSU (opsiyonel)", "doluysa yazı yerine kullanılır — görsel URL'si ya da &lt;svg&gt;…&lt;/svg&gt; kodu", '<textarea class="ed-textarea" data-meta="brandLogo" placeholder="https://…/logo.svg  veya  <svg>…</svg>" style="min-height:90px">' + esc(m.brandLogo || "") + '</textarea>') +
      // Landing büyük başlık — iki satır
      '<div class="ed-field"><label>LANDING BÜYÜK BAŞLIK <span class="hint">ana giriş ekranındaki dev yazı — 1. satır sonunda kırmızı nokta</span></label>' +
        '<div class="ed-brandgrid">' +
          '<div><div class="ed-sublabel">1. SATIR</div><input class="ed-input" data-meta="heroLine1" value="' + esc((m.heroLine1 != null) ? m.heroLine1 : "") + '" placeholder="SLVNZ"></div>' +
          '<div><div class="ed-sublabel">2. SATIR</div><input class="ed-input" data-meta="heroLine2" value="' + esc((m.heroLine2 != null) ? m.heroLine2 : "") + '" placeholder="4.0"></div>' +
        '</div>' +
      '</div>' +
      field("SAYFA BAŞLIĞI (browser sekmesi)", "tarayıcı sekmesinde görünen ad", '<input class="ed-input" data-meta="title" value="' + esc(m.title) + '">') +
      field("SÜRÜM ETİKETİ", "marka yanındaki küçük rozet", '<input class="ed-input" data-meta="version" value="' + esc(m.version || "") + '">') +
      field("SLOGAN (TAGLINE)", "üstte küçük etiket", '<input class="ed-input" data-meta="tagline" value="' + esc(m.tagline || "") + '">') +
      field("LANDING AÇIKLAMASI", "ana giriş metni", '<textarea class="ed-textarea" data-meta="description">' + esc(m.description || "") + '</textarea>');
  }

  // Marka önizlemesini güncelle (editörde canlı)
  function updateBrandPreview() {
    var el = document.getElementById("brandPrev");
    if (!el) return;
    var m = draft.meta;
    var logo = (m.brandLogo || "").trim();
    if (logo) {
      el.innerHTML = /^\s*<svg[\s>]/i.test(logo)
        ? '<span class="ed-bp__mark">' + logo + '</span>'
        : '<span class="ed-bp__mark"><img src="' + esc(logo) + '" alt=""></span>';
    } else {
      var bn = (m.brandName != null) ? m.brandName : "";
      var ba = (m.brandAccent != null) ? m.brandAccent : "";
      el.innerHTML = '<span class="ed-bp__mark">' +
        '<span class="ed-bp__name">' + esc(bn) + '</span>' +
        (ba ? '<span class="ed-bp__accent">' + esc(ba) + '</span>' : '') +
      '</span>';
    }
  }

  function renderSectionForm() {
    var sec = draft.sections[sel.section];
    if (!sec) { sel = { type: "meta" }; return renderForm(); }
    var hub = isHub(sec);
    var order = getSectionOrder();
    var idx = order.indexOf(sel.section);
    return '' +
      '<div class="ed-form__head"><div>' +
        '<div class="ed-form__kicker label label--accent">SEKME AYARLARI' + (hub ? ' · HUB' : '') + '</div>' +
        '<h1 class="ed-form__title">' + esc(sec.label) + '</h1>' +
      '</div></div>' +
      field("SEKME ADI", "", '<input class="ed-input" data-sec-field="label" value="' + esc(sec.label) + '">') +
      field("KISA AÇIKLAMA", "landing kartında görünür", '<textarea class="ed-textarea" data-sec-field="blurb" style="min-height:120px">' + esc(sec.blurb || "") + '</textarea>') +
      (hub
        ? '<div class="ed-field"><label>SAYFALAR <span class="hint">bu bölüm bir HUB — her sayfa kendi yan menüsüne sahiptir</span></label>' +
            '<div class="ed-rowbtns"><button class="btn btn--sm" data-addpage="' + sel.section + '">+ SAYFA EKLE</button></div></div>'
        : '<div class="ed-field"><label>ÖĞELER</label><div class="ed-rowbtns">' +
            '<button class="btn btn--sm" data-add="' + sel.section + '">+ ÖĞE EKLE</button>' +
          '</div></div>') +
      '<div class="ed-field"><label>BÖLÜM YÖNETİMİ <span class="hint">sırala, HUB\'a çevir veya sil</span></label>' +
        '<div class="ed-rowbtns">' +
          '<button class="btn btn--sm" data-secmoveform="up"' + (idx <= 0 ? " disabled" : "") + '>↑ SOLA / YUKARI TAŞI</button>' +
          '<button class="btn btn--sm" data-secmoveform="down"' + (idx < 0 || idx >= order.length - 1 ? " disabled" : "") + '>↓ SAĞA / AŞAĞI TAŞI</button>' +
          '<button class="btn btn--sm" data-sechubtoggle="1">' + (hub ? "HUB MODUNU KAPAT" : "HUB'A ÇEVİR") + '</button>' +
          '<button class="btn btn--sm btn--danger" data-secdelete="1">✕ BÖLÜMÜ SİL</button>' +
        '</div>' +
      '</div>';
  }

  // HUB sayfası düzenleme: başlık + kart açıklaması + içerik (sub-page) listesi
  function renderPageForm() {
    var sec = draft.sections[sel.section];
    var page = pageOf(sel);
    if (!page) { sel = { type: "section", section: sel.section }; return renderForm(); }
    var idx = sec.items.findIndex(function (p) { return p.id === page.id; });
    return '' +
      '<div class="ed-form__head"><div>' +
        '<div class="ed-form__kicker label label--accent">' + esc(sec.label) + ' / SAYFA ' + pad(idx + 1) + '</div>' +
        '<h1 class="ed-form__title">' + esc(page.title) + '</h1>' +
      '</div></div>' +
      field("SAYFA BAŞLIĞI", "", '<input class="ed-input" data-page-field="title" value="' + esc(page.title) + '">') +
      field("KİMLİK (URL)", "boşluksuz, küçük harf", '<input class="ed-input" data-page-field="id" value="' + esc(page.id) + '">') +
      field("KART AÇIKLAMASI", "hub ana menüsündeki kartta görünür", '<textarea class="ed-textarea" data-page-field="blurb" style="min-height:100px">' + esc(page.blurb || "") + '</textarea>') +
      '<div class="ed-field"><label>İÇERİK BÖLÜMLERİ <span class="hint">bu sayfanın yan menüsünde görünür</span></label>' +
        '<div class="ed-rowbtns"><button class="btn btn--sm" data-additem="' + sel.section + '::' + esc(page.id) + '">+ İÇERİK EKLE</button></div>' +
      '</div>' +
      '<div class="ed-rowbtns">' +
        '<button class="btn btn--sm" data-pagemove="up"' + (idx === 0 ? " disabled" : "") + '>↑ YUKARI TAŞI</button>' +
        '<button class="btn btn--sm" data-pagemove="down"' + (idx === sec.items.length - 1 ? " disabled" : "") + '>↓ AŞAĞI TAŞI</button>' +
        '<button class="btn btn--sm btn--danger" data-pagedelete="1">✕ SAYFAYI SİL</button>' +
      '</div>';
  }

  function renderItemForm() {
    var sec = draft.sections[sel.section];
    var items = itemListFor(sel);
    if (!items) { sel = { type: "section", section: sel.section }; return renderForm(); }
    var idx = items.findIndex(function (it) { return it.id === sel.itemId; });
    if (idx < 0) { sel = sel.pageId ? { type: "page", section: sel.section, pageId: sel.pageId } : { type: "section", section: sel.section }; return renderForm(); }
    var it = items[idx];
    var kicker = sel.pageId ? ((pageOf(sel) ? esc(pageOf(sel).title) : esc(sec.label)) + ' / ' + pad(idx + 1)) : (esc(sec.label) + ' / ' + pad(idx + 1));
    var mode = it.mode === "table" ? "table" : it.mode === "rich" ? "rich" : it.mode === "creature-list" ? "creature" : it.mode === "wiki" ? "wiki" : "text";
    var modeBody;
    if (mode === "table") modeBody = renderTableEditor(it);
    else if (mode === "rich") modeBody = renderRichEditor(it);
    else if (mode === "creature") modeBody = renderCreatureEditor(it);
    else if (mode === "wiki") modeBody = renderWikiEditor(it);
    else modeBody = field("AÇIKLAMA METNİ", "paragrafları boş satırla ayır", '<textarea class="ed-textarea tall" data-item="body">' + esc(it.body || "") + '</textarea>');
    return '' +
      '<div class="ed-form__head">' +
        '<div>' +
          '<div class="ed-form__kicker label label--accent">' + kicker + '</div>' +
          '<h1 class="ed-form__title">' + esc(it.title) + '</h1>' +
        '</div>' +
      '</div>' +
      field("BAŞLIK", "", '<input class="ed-input" data-item="title" value="' + esc(it.title) + '">') +
      field("KİMLİK (URL)", "boşluksuz, küçük harf — değiştirmek bağlantıyı değiştirir", '<input class="ed-input" data-item="id" value="' + esc(it.id) + '">') +
      // İçerik tipi: METİN / ZENGİN / TABLO
      '<div class="ed-field"><label>İÇERİK TİPİ</label>' +
        '<div class="ed-seg">' +
          '<button class="ed-seg__btn' + (mode === "text" ? " active" : "") + '" data-mode="text">METİN</button>' +
          '<button class="ed-seg__btn' + (mode === "rich" ? " active" : "") + '" data-mode="rich">ZENGİN</button>' +
          '<button class="ed-seg__btn' + (mode === "table" ? " active" : "") + '" data-mode="table">TABLO</button>' +
          '<button class="ed-seg__btn' + (mode === "creature" ? " active" : "") + '" data-mode="creature">YARATIK</button>' +
          '<button class="ed-seg__btn' + (mode === "wiki" ? " active" : "") + '" data-mode="wiki">WİKİ</button>' +
        '</div>' +
      '</div>' +
      modeBody +
      '<div class="ed-rowbtns">' +
        '<button class="btn btn--sm" data-move="up"' + (idx === 0 ? " disabled" : "") + '>↑ YUKARI TAŞI</button>' +
        '<button class="btn btn--sm" data-move="down"' + (idx === items.length - 1 ? " disabled" : "") + '>↓ AŞAĞI TAŞI</button>' +
        '<button class="btn btn--sm btn--danger" data-delete="1">✕ ÖĞEYİ SİL</button>' +
      '</div>';
  }

  /* --- TABLO EDİTÖRÜ ------------------------------------------------------ */
  function defaultTable() {
    return { columns: [{ id: "isim", label: "İSİM", type: "text", showInTable: true }], rows: [] };
  }
  function uid() { return "r" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
  function colId(label, cols) {
    var base = slugify(label) || "alan", id = base, k = 2;
    while (cols.some(function (c) { return c.id === id; })) id = base + "-" + (k++);
    return id;
  }

  /* WeakMap: table nesnesi -> o an düzenlenen satır _id */
  var tableEditRow = new WeakMap();

  function rowDisplayTitle(t, r) {
    var fc = t.columns[0];
    var v = fc ? (r[fc.id] != null ? String(r[fc.id]) : "") : "";
    return v || "(boş kayıt)";
  }

  function renderRowList(t) {
    var selId = tableEditRow.get(t) || null;
    if (!t.rows.length) {
      return '<div class="ed-rl-empty">Henüz kayıt yok.</div>';
    }
    return t.rows.map(function (r, i) {
      var active = r._id === selId ? " active" : "";
      return '' +
        '<div class="ed-rl-item' + active + '" data-rowsel="' + esc(r._id) + '">' +
          '<span class="ed-rl-item__idx">' + pad(i + 1) + '</span>' +
          '<span class="ed-rl-item__title">' + esc(rowDisplayTitle(t, r)) + '</span>' +
          '<div class="ed-rl-item__btns">' +
            '<button class="ed-mini" data-rl-up="' + esc(r._id) + '"' + (i === 0 ? " disabled" : "") + ' title="Yukarı">↑</button>' +
            '<button class="ed-mini" data-rl-down="' + esc(r._id) + '"' + (i === t.rows.length - 1 ? " disabled" : "") + ' title="Aşağı">↓</button>' +
            '<button class="ed-mini ed-mini--danger" data-rl-del="' + esc(r._id) + '" title="Sil">✕</button>' +
          '</div>' +
        '</div>';
    }).join("");
  }

  function renderRowForm(t) {
    var selId = tableEditRow.get(t) || null;
    var r = t.rows.find(function (x) { return x._id === selId; });
    if (!r) {
      return '' +
        '<div class="ed-rf-empty">' +
          '<span class="label">KAYIT FORMU</span>' +
          '<p>Soldan bir kayıt seç veya yeni bir kayıt ekle.</p>' +
        '</div>';
    }
    var fields = t.columns.map(function (c) {
      var v = (r[c.id] === undefined || r[c.id] === null) ? "" : r[c.id];
      var inp;
      if (c.type === "textarea") {
        inp = '<textarea class="ed-textarea ed-rf-textarea" data-rf-field="' + esc(c.id) + '">' + esc(v) + '</textarea>';
      } else if (c.type === "number") {
        inp = '<input class="ed-input" type="number" inputmode="decimal" data-rf-field="' + esc(c.id) + '" value="' + esc(v) + '">';
      } else {
        inp = '<input class="ed-input" type="text" data-rf-field="' + esc(c.id) + '" value="' + esc(v) + '">';
      }
      var snapHint = c.snapZone === "top" ? " · kart üst" : c.snapZone === "none" ? " · gizli" : " · kart alt";
      var longCls = c.type === "textarea" ? " ed-rf-field--long" : "";
      return '<div class="ed-field ed-rf-field' + longCls + '">' +
        '<label>' + esc(c.label) + '<span class="hint">' + (c.showInTable ? "tabloda" : "tabloda gizli") + snapHint + '</span></label>' +
        inp + '</div>';
    }).join("");
    return '' +
      '<div class="ed-rf-head">' +
        '<span class="label label--accent">KAYIT ' + pad(t.rows.indexOf(r) + 1) + '</span>' +
        '<h4 class="ed-rf-title">' + esc(rowDisplayTitle(t, r)) + '</h4>' +
      '</div>' +
      '<div class="ed-rf-fields">' + fields + '</div>' +
      '<div class="ed-rf-foot">' +
        '<button class="btn btn--primary btn--sm" data-rf-save>KAYDET</button>' +
        '<span class="ed-rf-saved" id="rfSaved"></span>' +
      '</div>';
  }

  function renderTableEditor(it) {
    var t = it.table;

    var colRows = t.columns.map(function (c, i) {
      var zone = c.snapZone || "bottom";
      return '' +
        '<div class="ed-col" data-col="' + esc(c.id) + '">' +
          '<input class="ed-input ed-col__label" data-col-label value="' + esc(c.label) + '" placeholder="Alan adı">' +
          '<select class="ed-input ed-col__type" data-col-type>' +
            '<option value="text"'     + (c.type === "text"     ? " selected" : "") + '>Kısa Metin</option>' +
            '<option value="textarea"' + (c.type === "textarea" ? " selected" : "") + '>Uzun Metin</option>' +
            '<option value="number"'   + (c.type === "number"   ? " selected" : "") + '>Sayı</option>' +
          '</select>' +
          '<label class="ed-col__vis"><input type="checkbox" data-col-vis' + (c.showInTable ? " checked" : "") + '> Tabloda</label>' +
          '<select class="ed-input ed-col__snap" data-col-snap title="Snapshot kartında konumu">' +
            '<option value="top"'    + (zone === "top"    ? " selected" : "") + '>Kart Üst</option>' +
            '<option value="bottom"' + (zone === "bottom" ? " selected" : "") + '>Kart Alt</option>' +
            '<option value="none"'   + (zone === "none"   ? " selected" : "") + '>Gizli</option>' +
          '</select>' +
          '<div class="ed-col__btns">' +
            '<button class="ed-mini" data-col-up' + (i === 0 ? " disabled" : "") + ' title="Yukarı">↑</button>' +
            '<button class="ed-mini" data-col-down' + (i === t.columns.length - 1 ? " disabled" : "") + ' title="Aşağı">↓</button>' +
            '<button class="ed-mini ed-mini--danger" data-col-del title="Sil">✕</button>' +
          '</div>' +
        '</div>';
    }).join("");

    return '' +
      '<div class="ed-field">' +
        '<label>SÜTUNLAR (ALANLAR) <span class="hint">tür: kısa/uzun metin, sayı · Tabloda: tabloda görünsün mü · Kart Üst/Alt/Gizli: snapshot konumu</span></label>' +
        '<div class="ed-cols">' + colRows + '</div>' +
        '<button class="ed-addbtn-inline" data-col-add>+ ALAN EKLE</button>' +
      '</div>' +
      '<div class="ed-field">' +
        '<label>KAYITLAR <span class="hint">' + t.rows.length + ' kayıt — soldan seç veya ekle</span></label>' +
        '<div class="ed-md">' +
          '<div class="ed-md__list">' +
            '<div class="ed-rl" id="edRowList">' + renderRowList(t) + '</div>' +
            '<button class="ed-addbtn" data-row-add style="width:100%;margin:6px 0 0">+ KAYIT EKLE</button>' +
          '</div>' +
          '<div class="ed-md__form" id="edRowForm">' + renderRowForm(t) + '</div>' +
        '</div>' +
      '</div>';
  }

  /* --- ZENGİN (BLOK) EDİTÖRÜ ---------------------------------------------
     Blok tipleri: heading | paragraph | list | table | image | example
     Her blok yukarı/aşağı taşınabilir ve silinebilir. **kalın** *italik* yazılır.
     ---------------------------------------------------------------------- */
  var BLOCK_TYPES = [
    { t: "heading",    name: "Başlık",        group: "Metin" },
    { t: "paragraph",  name: "Paragraf",      group: "Metin" },
    { t: "list",       name: "Liste",         group: "Metin" },
    { t: "quote",      name: "Alıntı",        group: "Metin" },
    { t: "callout",    name: "Bilgi Kutusu",  group: "Metin" },
    { t: "example",    name: "Örnek Kutusu",  group: "Metin" },
    { t: "code",       name: "Kod",           group: "Metin" },
    { t: "image",      name: "Görsel",        group: "Medya" },
    { t: "figuretext", name: "Görsel + Metin", group: "Medya" },
    { t: "gallery",    name: "Galeri",        group: "Medya" },
    { t: "video",      name: "Video / Embed", group: "Medya" },
    { t: "table",      name: "Tablo",         group: "Veri" },
    { t: "columns",    name: "Sütunlar",      group: "Düzen" },
    { t: "accordion",  name: "Akordeon",      group: "Düzen" },
    { t: "tabs",       name: "Sekmeler",      group: "Düzen" },
    { t: "divider",    name: "Ayraç",         group: "Düzen" },
    { t: "spacer",     name: "Boşluk",        group: "Düzen" },
    { t: "button",     name: "Buton / CTA",   group: "Gelişmiş" },
    { t: "html",       name: "Ham HTML",      group: "Gelişmiş" },
  ];
  var BLOCK_GROUP_ORDER = ["Metin", "Medya", "Veri", "Düzen", "Gelişmiş"];
  // Yerleştirme açılır menüsü — türleri gruplayarak <optgroup> üretir.
  function blockTypeOptions(allowNested) {
    return BLOCK_GROUP_ORDER.map(function (g) {
      var opts = BLOCK_TYPES.filter(function (b) {
        if (b.group !== g) return false;
        if (!allowNested && (b.t === "tabs" || b.t === "columns" || b.t === "accordion")) return false;
        return true;
      }).map(function (b) { return '<option value="' + b.t + '">' + b.name + '</option>'; }).join("");
      return opts ? '<optgroup label="' + g + '">' + opts + '</optgroup>' : "";
    }).join("");
  }
  function newBlock(type) {
    switch (type) {
      case "heading":   return { type: "heading", level: 2, text: "Yeni Başlık" };
      case "paragraph": return { type: "paragraph", text: "" };
      case "list":      return { type: "list", ordered: false, items: [""] };
      case "quote":     return { type: "quote", text: "", cite: "" };
      case "callout":   return { type: "callout", variant: "info", title: "", text: "" };
      case "example":   return { type: "example", text: "" };
      case "code":      return { type: "code", lang: "", code: "" };
      case "table":     return { type: "table", header: ["Sütun 1", "Sütun 2"], rows: [["", ""]] };
      case "image":     return { type: "image", src: "", alt: "", caption: "", showCaption: true, width: "" };
      case "figuretext": return { type: "figuretext", position: "left", src: "", alt: "", caption: "", showCaption: false, width: 240, heading: "", text: "" };
      case "gallery":   return { type: "gallery", columns: 3, images: [] };
      case "video":     return { type: "video", src: "", caption: "", showCaption: false };
      case "columns":   return { type: "columns", ratio: "1fr 1fr", cols: [{ blocks: [] }, { blocks: [] }] };
      case "accordion": return { type: "accordion", items: [{ title: "Başlık 1", open: false, blocks: [] }] };
      case "tabs":      return { type: "tabs", tabs: [{ label: "Sekme 1", blocks: [] }] };
      case "divider":   return { type: "divider", dstyle: "solid" };
      case "spacer":    return { type: "spacer", height: 40 };
      case "button":    return { type: "button", label: "Buton", href: "", variant: "solid", align: "left" };
      case "html":      return { type: "html", html: "" };
      default:          return { type: "paragraph", text: "" };
    }
  }
  function blockTypeName(t) {
    var f = BLOCK_TYPES.find(function (x) { return x.t === t; });
    return f ? f.name : t;
  }

  function migrateBlock(old, newType) {
    var nb = newBlock(newType);
    var textLike = { heading: 1, paragraph: 1, example: 1, quote: 1, callout: 1 };
    if (textLike[old.type] && textLike[newType]) {
      nb.text = old.text || "";
    } else if (old.type === "list" && textLike[newType]) {
      nb.text = (old.items || []).join("\n");
    } else if (textLike[old.type] && newType === "list") {
      nb.items = (old.text || "").split("\n");
      if (!nb.items.length) nb.items = [""];
    } else if (old.type === "figuretext" && textLike[newType]) {
      nb.text = old.text || "";
    } else if (textLike[old.type] && newType === "figuretext") {
      nb.text = old.text || "";
    } else if (old.type === "code" && textLike[newType]) {
      nb.text = old.code || "";
    } else if (textLike[old.type] && newType === "code") {
      nb.code = old.text || "";
    }
    if (old.style) nb.style = old.style; // blok stilini koru
    return nb;
  }

  var tabUI = new WeakMap(); // tabs/columns/accordion bloğu -> editörde aktif sekme/sütun indeksi

  /* Gruplu tür açılır menüsü (seçili işaretli). */
  function blockTypeSelectOptions(current, allowNested) {
    return BLOCK_GROUP_ORDER.map(function (g) {
      var opts = BLOCK_TYPES.filter(function (b) {
        if (b.group !== g) return false;
        if (!allowNested && (b.t === "tabs" || b.t === "columns" || b.t === "accordion")) return false;
        return true;
      }).map(function (b) { return '<option value="' + b.t + '"' + (b.t === current ? ' selected' : '') + '>' + b.name + '</option>'; }).join("");
      return opts ? '<optgroup label="' + g + '">' + opts + '</optgroup>' : "";
    }).join("");
  }

  /* Satır içi biçimlendirme araç çubuğu (metin alanlarının üstünde). */
  function fmtBarHtml() {
    var b = [
      ['**', 'B', 'Kalın', 'ed-ft--b'],
      ['*', 'I', 'İtalik', 'ed-ft--i'],
      ['__', 'U', 'Altçizgi', 'ed-ft--u'],
      ['~~', 'S', 'Üstüçizili', 'ed-ft--s'],
      ['==', 'H', 'Vurgu', 'ed-ft--h'],
      ['\`', '</>', 'Satır içi kod', '']
    ].map(function (x) {
      return '<button type="button" class="ed-ft-btn ' + x[3] + '" data-fmt-wrap="' + x[0] + '" title="' + x[2] + '">' + x[1] + '</button>';
    }).join("");
    b += '<button type="button" class="ed-ft-btn" data-fmt-link title="Bağlantı ekle">LINK</button>';
    b += '<button type="button" class="ed-ft-btn" data-fmt-color title="Renk uygula">RENK</button>';
    return '<div class="ed-fmtbar" data-fmtbar>' + b + '</div>';
  }
  // Biçimlendirilebilir metin alanı (araç çubuğu + textarea)
  function fmtField(fieldName, value, placeholder, minH) {
    return '<div class="ed-fmtfield">' + fmtBarHtml() +
      '<textarea class="ed-textarea" data-rb-field="' + fieldName + '" placeholder="' + placeholder + '"' +
      (minH ? ' style="min-height:' + minH + 'px"' : '') + '>' + esc(value || "") + '</textarea></div>';
  }
  // Görsel alanı (önizleme + URL + dosyadan yükle)
  function imgField(b, fieldName) {
    var f = fieldName || "src";
    var src = b[f] || "";
    return '<div class="ed-imgfield" data-imgfield="' + f + '">' +
      '<div class="ed-imgfield__prev' + (src ? "" : " empty") + '" data-img-prev>' +
        (src ? '<img src="' + esc(src) + '" alt="">' : '<span>GÖRSEL</span>') + '</div>' +
      '<div class="ed-imgfield__ctrl">' +
        '<input class="ed-input" data-rb-field="' + f + '" value="' + esc(src) + '" placeholder="Görsel URL (https://…) veya dosyadan yükle">' +
        '<div class="ed-imgfield__btns"><button type="button" class="btn btn--sm" data-img-upload>DOSYADAN YÜKLE</button>' +
        '<input type="file" accept="image/*" data-img-file style="display:none"></div>' +
      '</div></div>';
  }
  function hasStyle(s) { return s && Object.keys(s).some(function (k) { return s[k]; }); }
  // Blok başına stil & gelişmiş panel
  function stylePanelHtml(b) {
    var s = b.style || {};
    var al = s.align || "";
    var alignSeg = [["", "—"], ["left", "SOL"], ["center", "ORTA"], ["right", "SAĞ"], ["justify", "YASLA"]].map(function (a) {
      return '<button type="button" class="ed-seg__btn' + (al === a[0] ? " active" : "") + '" data-style-align="' + a[0] + '">' + a[1] + '</button>';
    }).join("");
    function fld(k, ph, val) { return '<input class="ed-input" data-style="' + k + '" value="' + esc(val || "") + '" placeholder="' + ph + '">'; }
    return '<details class="ed-stylepanel"' + (hasStyle(s) ? " open" : "") + '>' +
      '<summary>STİL & GELİŞMİŞ</summary>' +
      '<div class="ed-sp-grid">' +
        '<div class="ed-sp-full"><span class="ed-sp-lbl">Hizalama</span><div class="ed-seg ed-seg--sm">' + alignSeg + '</div></div>' +
        '<div><span class="ed-sp-lbl">Arka plan</span>' + fld("bg", "#111 / gradient", s.bg) + '</div>' +
        '<div><span class="ed-sp-lbl">Metin rengi</span>' + fld("color", "#eee", s.color) + '</div>' +
        '<div><span class="ed-sp-lbl">İç boşluk</span>' + fld("pad", "16px 20px", s.pad) + '</div>' +
        '<div><span class="ed-sp-lbl">Dış boşluk</span>' + fld("margin", "24px 0", s.margin) + '</div>' +
        '<div><span class="ed-sp-lbl">Kenarlık</span>' + fld("border", "1px solid #333", s.border) + '</div>' +
        '<div><span class="ed-sp-lbl">Köşe yarıçapı</span>' + fld("radius", "4px", s.radius) + '</div>' +
        '<div><span class="ed-sp-lbl">Maks. genişlik</span>' + fld("maxw", "640px", s.maxw) + '</div>' +
        '<div><span class="ed-sp-lbl">CSS sınıfı</span>' + fld("cls", "özel-sinif", s.cls) + '</div>' +
        '<div class="ed-sp-full"><span class="ed-sp-lbl">Özel CSS</span>' +
          '<textarea class="ed-textarea ed-code-ta" data-style="css" placeholder="box-shadow: 0 4px 20px rgba(0,0,0,.4);" style="min-height:60px">' + esc(s.css || "") + '</textarea></div>' +
      '</div></details>';
  }

  function renderBlockInsert(idx, allowNested) {
    return '<div class="ed-rb-between" data-rb-before="' + idx + '">' +
      '<div class="ed-rb-between__line"></div>' +
      '<div class="ed-rb-between__ctrl">' +
        '<select class="ed-input ed-rb-between__sel">' + blockTypeOptions(allowNested) + '</select>' +
        '<button class="btn btn--sm ed-rb-between__btn">↑ BURAYA EKLE</button>' +
      '</div>' +
      '<div class="ed-rb-between__line"></div>' +
    '</div>';
  }

  function renderBlockList(blocks, allowNested) {
    var list;
    if (blocks.length) {
      list = blocks.map(function (b, i) {
        return renderBlockInsert(i, allowNested) + renderBlockCard(b, i, blocks.length, allowNested);
      }).join("");
    } else {
      list = '<div class="ed-rb-empty">Henüz blok yok. Aşağıdan blok ekleyerek başla.</div>';
    }
    return '<div class="ed-rb-listwrap">' +
      '<div class="ed-rb-list">' + list + '</div>' +
      '<div class="ed-rb-add">' +
        '<select class="ed-input ed-rb-add__sel" data-rb-newtype>' + blockTypeOptions(allowNested) + '</select>' +
        '<button class="btn btn--sm" data-rb-add>+ SONA EKLE</button>' +
      '</div>' +
    '</div>';
  }

  function renderRichEditor(it) {
    var blocks = it.blocks || [];
    return '' +
      '<div class="ed-field">' +
        '<label>İÇERİK BLOKLARI <span class="hint">' + blocks.length + ' blok · sürükle-bırak ile sırala · **kalın** *italik* __altçizgi__ ~~üstüçizili~~ ==vurgu== [metin](url) {#e11|renkli}</span></label>' +
        renderBlockList(blocks, true) +
      '</div>';
  }

  function renderBlockCard(b, i, total, allowNested) {
    var inner = "";
    if (b.type === "heading") {
      inner =
        '<div class="ed-rb-row">' +
          '<select class="ed-input ed-rb-lvl" data-rb-field="level">' +
            '<option value="2"' + (b.level !== 3 ? " selected" : "") + '>H2 — Ana başlık</option>' +
            '<option value="3"' + (b.level === 3 ? " selected" : "") + '>H3 — Alt başlık</option>' +
          '</select>' +
          '<input class="ed-input" data-rb-field="text" value="' + esc(b.text || "") + '" placeholder="Başlık metni">' +
        '</div>';
    } else if (b.type === "paragraph") {
      inner = fmtField("text", b.text, "Paragraf metni…", 90);
    } else if (b.type === "example") {
      inner = fmtField("text", b.text, "Örnek / anlatı metni…", 90);
    } else if (b.type === "quote") {
      inner = fmtField("text", b.text, "Alıntı metni…", 80) +
        '<input class="ed-input" data-rb-field="cite" value="' + esc(b.cite || "") + '" placeholder="Kaynak / kişi (opsiyonel)">';
    } else if (b.type === "callout") {
      var vr = b.variant || "info";
      var variants = [["info", "BİLGİ"], ["note", "NOT"], ["success", "BAŞARI"], ["warning", "UYARI"], ["danger", "TEHLİKE"], ["tip", "İPUCU"]];
      inner =
        '<div class="ed-rb-poswrap"><span class="ed-rb-poslabel">TÜR</span><div class="ed-seg ed-seg--sm">' +
          variants.map(function (v) { return '<button type="button" class="ed-seg__btn' + (vr === v[0] ? " active" : "") + '" data-callout-var="' + v[0] + '">' + v[1] + '</button>'; }).join("") +
        '</div></div>' +
        '<input class="ed-input" data-rb-field="title" value="' + esc(b.title || "") + '" placeholder="Başlık (opsiyonel)">' +
        fmtField("text", b.text, "Kutu metni…", 70);
    } else if (b.type === "code") {
      inner =
        '<input class="ed-input" data-rb-field="lang" value="' + esc(b.lang || "") + '" placeholder="Dil etiketi (opsiyonel, örn. JS)">' +
        '<textarea class="ed-textarea ed-code-ta" data-rb-field="code" spellcheck="false" placeholder="Kod…" style="min-height:130px">' + esc(b.code || "") + '</textarea>';
    } else if (b.type === "list") {
      var lines = (b.items || []).join("\n");
      inner =
        '<label class="ed-rb-check"><input type="checkbox" data-rb-field="ordered"' + (b.ordered ? " checked" : "") + '> Numaralı liste</label>' +
        '<textarea class="ed-textarea" data-rb-field="items" placeholder="Her satır bir madde">' + esc(lines) + '</textarea>';
    } else if (b.type === "image") {
      inner =
        imgField(b, "src") +
        '<label class="ed-rb-check"><input type="checkbox" data-rb-field="showCaption"' + (b.showCaption !== false ? " checked" : "") + '> Açıklamayı göster</label>' +
        '<input class="ed-input" data-rb-field="caption" value="' + esc(b.caption || "") + '" placeholder="Açıklama metni">' +
        '<input class="ed-input" data-rb-field="alt" value="' + esc(b.alt || "") + '" placeholder="Alternatif metin (erişilebilirlik)">' +
        '<div class="ed-rb-row2"><input class="ed-input" data-rb-field="width" type="number" min="0" value="' + esc(b.width || "") + '" placeholder="Genişlik (px) — boş = otomatik"></div>';
    } else if (b.type === "video") {
      inner =
        '<input class="ed-input" data-rb-field="src" value="' + esc(b.src || "") + '" placeholder="YouTube / Vimeo / MP4 URL veya embed kodu">' +
        '<div class="ed-imgfield__btns"><button type="button" class="btn btn--sm" data-vid-upload>DOSYADAN YÜKLE (MP4)</button>' +
        '<input type="file" accept="video/*" data-vid-file style="display:none"></div>' +
        '<label class="ed-rb-check"><input type="checkbox" data-rb-field="showCaption"' + (b.showCaption ? " checked" : "") + '> Açıklamayı göster</label>' +
        '<input class="ed-input" data-rb-field="caption" value="' + esc(b.caption || "") + '" placeholder="Açıklama (opsiyonel)">';
    } else if (b.type === "table") {
      inner = renderBlockTableEditor(b);
    } else if (b.type === "divider") {
      var ds = b.dstyle || "solid";
      inner = '<div class="ed-rb-poswrap"><span class="ed-rb-poslabel">ÇİZGİ</span><div class="ed-seg ed-seg--sm">' +
        [["solid", "DÜZ"], ["dashed", "KESİK"], ["dotted", "NOKTALI"], ["thick", "KALIN"]].map(function (v) {
          return '<button type="button" class="ed-seg__btn' + (ds === v[0] ? " active" : "") + '" data-div-style="' + v[0] + '">' + v[1] + '</button>';
        }).join("") + '</div></div>';
    } else if (b.type === "spacer") {
      inner = '<div class="ed-rb-row2"><label class="ed-inline-lbl">Yükseklik (px)</label>' +
        '<input class="ed-input" type="number" min="0" data-rb-field="height" value="' + esc(b.height || 40) + '" style="max-width:120px"></div>';
    } else if (b.type === "button") {
      var al = b.align || "left", bvr = b.variant || "solid";
      inner =
        '<div class="ed-rb-row2">' +
          '<input class="ed-input" data-rb-field="label" value="' + esc(b.label || "") + '" placeholder="Buton yazısı">' +
          '<input class="ed-input" data-rb-field="href" value="' + esc(b.href || "") + '" placeholder="Bağlantı (https://… veya #/bolum)">' +
        '</div>' +
        '<div class="ed-rb-poswrap"><span class="ed-rb-poslabel">STİL</span><div class="ed-seg ed-seg--sm">' +
          [["solid", "DOLU"], ["outline", "ÇERÇEVE"], ["ghost", "SADE"]].map(function (v) { return '<button type="button" class="ed-seg__btn' + (bvr === v[0] ? " active" : "") + '" data-btn-var="' + v[0] + '">' + v[1] + '</button>'; }).join("") +
        '</div></div>' +
        '<div class="ed-rb-poswrap"><span class="ed-rb-poslabel">HİZALAMA</span><div class="ed-seg ed-seg--sm">' +
          [["left", "SOL"], ["center", "ORTA"], ["right", "SAĞ"]].map(function (v) { return '<button type="button" class="ed-seg__btn' + (al === v[0] ? " active" : "") + '" data-btn-align="' + v[0] + '">' + v[1] + '</button>'; }).join("") +
        '</div></div>';
    } else if (b.type === "html") {
      inner =
        '<textarea class="ed-textarea ed-code-ta" data-rb-field="html" spellcheck="false" placeholder="&lt;div&gt;Ham HTML…&lt;/div&gt;" style="min-height:130px">' + esc(b.html || "") + '</textarea>' +
        '<div class="ed-rb-hint">⚠ Ham HTML doğrudan siteye eklenir — yalnızca güvendiğin kodu yapıştır.</div>';
    } else if (b.type === "gallery") {
      var imgs = b.images || (b.images = []);
      inner =
        '<div class="ed-rb-row2"><label class="ed-inline-lbl">Sütun sayısı</label>' +
          '<input class="ed-input" type="number" min="1" max="6" data-rb-field="columns" value="' + esc(b.columns || 3) + '" style="max-width:90px"></div>' +
        '<div class="ed-gal-items">' + imgs.map(function (im, gi) { return galItemHtml(im, gi, imgs.length); }).join("") + '</div>' +
        '<button class="ed-addbtn-inline" data-gal-add>+ GÖRSEL EKLE</button>';
    } else if (b.type === "figuretext") {
      var pos = b.position || "left";
      inner =
        '<div class="ed-rb-poswrap"><span class="ed-rb-poslabel">GÖRSEL KONUMU</span>' +
          '<div class="ed-seg ed-seg--sm">' +
            '<button type="button" class="ed-seg__btn' + (pos === "left" ? " active" : "") + '" data-ft-pos="left">SOL</button>' +
            '<button type="button" class="ed-seg__btn' + (pos === "top" ? " active" : "") + '" data-ft-pos="top">ÜST</button>' +
            '<button type="button" class="ed-seg__btn' + (pos === "bottom" ? " active" : "") + '" data-ft-pos="bottom">ALT</button>' +
            '<button type="button" class="ed-seg__btn' + (pos === "right" ? " active" : "") + '" data-ft-pos="right">SAĞ</button>' +
          '</div>' +
        '</div>' +
        imgField(b, "src") +
        '<div class="ed-rb-row2">' +
          '<input class="ed-input" data-rb-field="width" type="number" min="0" value="' + esc(b.width || "") + '" placeholder="Görsel genişliği (px)">' +
          '<label class="ed-rb-check"><input type="checkbox" data-rb-field="showCaption"' + (b.showCaption ? " checked" : "") + '> Açıklamayı göster</label>' +
        '</div>' +
        '<input class="ed-input" data-rb-field="caption" value="' + esc(b.caption || "") + '" placeholder="Görsel açıklaması (opsiyonel)">' +
        '<input class="ed-input" data-rb-field="heading" value="' + esc(b.heading || "") + '" placeholder="Metin başlığı (opsiyonel)">' +
        fmtField("text", b.text, "Gövde metni…", 90);
    } else if (b.type === "tabs") {
      if (!b.tabs) b.tabs = [];
      var act = tabUI.get(b) || 0;
      if (act >= b.tabs.length) act = 0;
      var chips = b.tabs.map(function (tb, ti) {
        return '<button class="ed-tabchip' + (ti === act ? " active" : "") + '" data-tabsel="' + ti + '">' +
          esc(tb.label || ("Sekme " + (ti + 1))) + '</button>';
      }).join("");
      inner = '<div class="ed-tabstrip">' + chips + '<button class="ed-tabchip ed-tabchip--add" data-tabadd>+ SEKME</button></div>';
      if (b.tabs.length) {
        var tb = b.tabs[act];
        if (!tb.blocks) tb.blocks = [];
        inner +=
          '<div class="ed-tabedit">' +
            '<div class="ed-rb-row2">' +
              '<input class="ed-input" data-tablabel value="' + esc(tb.label || "") + '" placeholder="Sekme adı">' +
              '<div class="ed-col__btns">' +
                '<button class="ed-mini" data-tableft' + (act === 0 ? " disabled" : "") + ' title="Sola">←</button>' +
                '<button class="ed-mini" data-tabright' + (act === b.tabs.length - 1 ? " disabled" : "") + ' title="Sağa">→</button>' +
                '<button class="ed-mini ed-mini--danger" data-tabdel title="Sekmeyi sil">✕</button>' +
              '</div>' +
            '</div>' +
            '<div class="ed-tabbody">' + renderBlockList(tb.blocks, false) + '</div>' +
          '</div>';
      }
    } else if (b.type === "columns") {
      if (!b.cols) b.cols = [];
      var cact = tabUI.get(b) || 0;
      if (cact >= b.cols.length) cact = 0;
      var cchips = b.cols.map(function (c, ci) {
        return '<button class="ed-tabchip' + (ci === cact ? " active" : "") + '" data-colsel="' + ci + '">Sütun ' + (ci + 1) + '</button>';
      }).join("");
      inner =
        '<div class="ed-rb-row2"><label class="ed-inline-lbl">Oran</label>' +
          '<input class="ed-input" data-col-ratio value="' + esc(b.ratio || "") + '" placeholder="örn. 1fr 1fr  ·  2fr 1fr"></div>' +
        '<div class="ed-tabstrip">' + cchips + '<button class="ed-tabchip ed-tabchip--add" data-coladd>+ SÜTUN</button></div>';
      if (b.cols.length) {
        var col = b.cols[cact];
        if (!col.blocks) col.blocks = [];
        inner +=
          '<div class="ed-tabedit">' +
            '<div class="ed-rb-row2"><span class="ed-rb-poslabel">SÜTUN ' + (cact + 1) + '</span>' +
              '<div class="ed-col__btns">' +
                '<button class="ed-mini" data-colleft' + (cact === 0 ? " disabled" : "") + '>←</button>' +
                '<button class="ed-mini" data-colright' + (cact === b.cols.length - 1 ? " disabled" : "") + '>→</button>' +
                '<button class="ed-mini ed-mini--danger" data-coldel>✕</button>' +
              '</div>' +
            '</div>' +
            '<div class="ed-tabbody">' + renderBlockList(col.blocks, false) + '</div>' +
          '</div>';
      }
    } else if (b.type === "accordion") {
      if (!b.items) b.items = [];
      var aact = tabUI.get(b) || 0;
      if (aact >= b.items.length) aact = 0;
      var achips = b.items.map(function (a, ai) {
        return '<button class="ed-tabchip' + (ai === aact ? " active" : "") + '" data-accsel="' + ai + '">' + esc(a.title || ("Bölüm " + (ai + 1))) + '</button>';
      }).join("");
      inner = '<div class="ed-tabstrip">' + achips + '<button class="ed-tabchip ed-tabchip--add" data-accadd>+ BÖLÜM</button></div>';
      if (b.items.length) {
        var ait = b.items[aact];
        if (!ait.blocks) ait.blocks = [];
        inner +=
          '<div class="ed-tabedit">' +
            '<div class="ed-rb-row2">' +
              '<input class="ed-input" data-acclabel value="' + esc(ait.title || "") + '" placeholder="Bölüm başlığı">' +
              '<div class="ed-col__btns">' +
                '<label class="ed-rb-check" title="Sitede açık başlasın"><input type="checkbox" data-accopen' + (ait.open ? " checked" : "") + '> Açık</label>' +
                '<button class="ed-mini" data-accleft' + (aact === 0 ? " disabled" : "") + '>↑</button>' +
                '<button class="ed-mini" data-accright' + (aact === b.items.length - 1 ? " disabled" : "") + '>↓</button>' +
                '<button class="ed-mini ed-mini--danger" data-accdel>✕</button>' +
              '</div>' +
            '</div>' +
            '<div class="ed-tabbody">' + renderBlockList(ait.blocks, false) + '</div>' +
          '</div>';
      }
    }
    var typeOpts = blockTypeSelectOptions(b.type, true);
    return '' +
      '<div class="ed-rb-card" data-rb-i="' + i + '" data-rb-type="' + b.type + '">' +
        '<div class="ed-rb-head">' +
          '<span class="ed-rb-drag" data-rb-drag title="Sürükleyerek taşı">⠿</span>' +
          '<select class="ed-rb-typesel" data-rb-typesel>' + typeOpts + '</select>' +
          '<div class="ed-rb-actions">' +
            '<button class="ed-mini" data-rb-dup title="Çoğalt">⧉</button>' +
            '<button class="ed-mini" data-rb-up' + (i === 0 ? " disabled" : "") + ' title="Yukarı">↑</button>' +
            '<button class="ed-mini" data-rb-down' + (i === total - 1 ? " disabled" : "") + ' title="Aşağı">↓</button>' +
            '<button class="ed-mini ed-mini--danger" data-rb-del title="Sil">✕</button>' +
          '</div>' +
        '</div>' +
        '<div class="ed-rb-body">' + inner + stylePanelHtml(b) + '</div>' +
      '</div>';
  }

  function galItemHtml(im, gi, total) {
    return '<div class="ed-gal-item" data-gal-i="' + gi + '">' +
      '<div class="ed-imgfield__prev' + (im.src ? "" : " empty") + '" data-gal-prev>' +
        (im.src ? '<img src="' + esc(im.src) + '" alt="">' : '<span>+</span>') + '</div>' +
      '<div class="ed-gal-item__fields">' +
        '<input class="ed-input" data-gal-src value="' + esc(im.src || "") + '" placeholder="Görsel URL">' +
        '<input class="ed-input" data-gal-cap value="' + esc(im.caption || "") + '" placeholder="Açıklama (opsiyonel)">' +
      '</div>' +
      '<div class="ed-gal-item__btns">' +
        '<button type="button" class="btn btn--sm" data-gal-upload>YÜKLE</button>' +
        '<input type="file" accept="image/*" data-gal-file style="display:none">' +
        '<button class="ed-mini" data-gal-up' + (gi === 0 ? " disabled" : "") + '>↑</button>' +
        '<button class="ed-mini" data-gal-down' + (gi === total - 1 ? " disabled" : "") + '>↓</button>' +
        '<button class="ed-mini ed-mini--danger" data-gal-del>✕</button>' +
      '</div>' +
    '</div>';
  }

  function renderBlockTableEditor(b) {
    var head = (b.header || []).map(function (h, ci) {
      return '<th><input class="ed-cell" data-bt-head="' + ci + '" value="' + esc(h) + '" placeholder="Başlık"></th>';
    }).join("");
    var rows = (b.rows || []).map(function (r, ri) {
      var cells = (b.header || []).map(function (h, ci) {
        return '<td><input class="ed-cell" data-bt-cell data-bt-r="' + ri + '" data-bt-c="' + ci + '" value="' + esc((r && r[ci] != null) ? r[ci] : "") + '"></td>';
      }).join("");
      return '<tr>' + cells + '<td class="ed-rowtbl__act"><button class="ed-mini ed-mini--danger" data-bt-rowdel="' + ri + '">✕</button></td></tr>';
    }).join("");
    return '' +
      '<div class="ed-rows-scroll"><table class="ed-rowtbl"><thead><tr>' + head + '<th></th></tr></thead><tbody>' + rows + '</tbody></table></div>' +
      '<div class="ed-rowbtns">' +
        '<button class="btn btn--sm" data-bt-addcol>+ SÜTUN</button>' +
        '<button class="btn btn--sm" data-bt-addrow>+ SATIR</button>' +
        '<button class="btn btn--sm ed-mini--danger" data-bt-delcol>− SON SÜTUN</button>' +
      '</div>';
  }

  function wireRichEditor(form) {
    var it = curItem();
    if (!it || it.mode !== "rich") return;
    var rootWrap = form.querySelector(".ed-rb-listwrap");
    if (rootWrap) wireBlockList(rootWrap, it.blocks || (it.blocks = []));
  }

  // Metin alanına biçim işareti uygula
  function applyWrap(ta, before, after) {
    var s = ta.selectionStart, e = ta.selectionEnd, v = ta.value;
    var sel = v.slice(s, e);
    var body = sel || "metin";
    var aft = (after == null) ? before : after;
    ta.value = v.slice(0, s) + before + body + aft + v.slice(e);
    ta.focus();
    var caret = s + before.length;
    ta.setSelectionRange(caret, caret + body.length);
    ta.dispatchEvent(new Event("input", { bubbles: true }));
  }
  function wireFmtBar(bar) {
    var field = bar.closest(".ed-fmtfield");
    var ta = field && field.querySelector("textarea");
    if (!ta) return;
    bar.querySelectorAll("[data-fmt-wrap]").forEach(function (btn) {
      btn.onclick = function () { applyWrap(ta, btn.getAttribute("data-fmt-wrap")); };
    });
    var lk = bar.querySelector("[data-fmt-link]");
    if (lk) lk.onclick = function () {
      var url = prompt("Bağlantı adresi (URL):", "https://");
      if (url === null || url === "") return;
      var s = ta.selectionStart, e = ta.selectionEnd, v = ta.value;
      var sel = v.slice(s, e) || "bağlantı";
      ta.value = v.slice(0, s) + "[" + sel + "](" + url + ")" + v.slice(e);
      ta.dispatchEvent(new Event("input", { bubbles: true }));
    };
    var cl = bar.querySelector("[data-fmt-color]");
    if (cl) cl.onclick = function () {
      var col = prompt("Renk (örn. #e11 veya crimson):", "#FF4B26");
      if (col === null || col === "") return;
      var s = ta.selectionStart, e = ta.selectionEnd, v = ta.value;
      var sel = v.slice(s, e) || "metin";
      ta.value = v.slice(0, s) + "{" + col + "|" + sel + "}" + v.slice(e);
      ta.dispatchEvent(new Event("input", { bubbles: true }));
    };
  }
  function wireImgFields(card) {
    card.querySelectorAll("[data-imgfield]").forEach(function (wrap) {
      var input = wrap.querySelector('input.ed-input[data-rb-field]');
      var prev = wrap.querySelector("[data-img-prev]");
      var upBtn = wrap.querySelector("[data-img-upload]");
      var file = wrap.querySelector("[data-img-file]");
      function setPrev(src) {
        if (!prev) return;
        if (src) { prev.classList.remove("empty"); prev.innerHTML = '<img src="' + src.replace(/"/g, "&quot;") + '" alt="">'; }
        else { prev.classList.add("empty"); prev.innerHTML = "<span>GÖRSEL</span>"; }
      }
      if (input) input.addEventListener("input", function () { setPrev(input.value); });
      if (upBtn && file) {
        upBtn.onclick = function () { file.click(); };
        if (prev) prev.onclick = function () { file.click(); };
        file.onchange = function () {
          var fl = file.files[0]; if (!fl) return;
          var rd = new FileReader();
          rd.onload = function () { if (input) { input.value = rd.result; input.dispatchEvent(new Event("input", { bubbles: true })); } setPrev(rd.result); };
          rd.readAsDataURL(fl);
        };
      }
    });
  }
  function wireStylePanel(card, b) {
    var sp = card.querySelector(":scope > .ed-rb-body > .ed-stylepanel");
    if (!sp) return;
    sp.querySelectorAll("[data-style-align]").forEach(function (el) {
      el.onclick = function () {
        b.style = b.style || {}; b.style.align = el.getAttribute("data-style-align");
        sp.querySelectorAll("[data-style-align]").forEach(function (x) { x.classList.toggle("active", x === el); });
        markDirty();
      };
    });
    sp.querySelectorAll("[data-style]").forEach(function (el) {
      el.oninput = function () { b.style = b.style || {}; b.style[el.getAttribute("data-style")] = el.value; markDirty(); };
    });
  }
  function wireGallery(card, b) {
    b.images = b.images || [];
    var addBtn = card.querySelector("[data-gal-add]");
    if (addBtn) addBtn.onclick = function () { b.images.push({ src: "", alt: "", caption: "" }); markDirty(); refresh(); };
    card.querySelectorAll(".ed-gal-item").forEach(function (item) {
      var gi = parseInt(item.getAttribute("data-gal-i"), 10);
      var im = b.images[gi]; if (!im) return;
      var prev = item.querySelector("[data-gal-prev]");
      function setPrev(src) {
        if (!prev) return;
        if (src) { prev.classList.remove("empty"); prev.innerHTML = '<img src="' + src.replace(/"/g, "&quot;") + '" alt="">'; }
        else { prev.classList.add("empty"); prev.innerHTML = "<span>+</span>"; }
      }
      var srcI = item.querySelector("[data-gal-src]");
      if (srcI) srcI.oninput = function () { im.src = srcI.value; setPrev(srcI.value); markDirty(); };
      var capI = item.querySelector("[data-gal-cap]");
      if (capI) capI.oninput = function () { im.caption = capI.value; markDirty(); };
      var upB = item.querySelector("[data-gal-upload]"), fileI = item.querySelector("[data-gal-file]");
      if (upB && fileI) {
        upB.onclick = function () { fileI.click(); };
        if (prev) prev.onclick = function () { fileI.click(); };
        fileI.onchange = function () {
          var fl = fileI.files[0]; if (!fl) return;
          var rd = new FileReader();
          rd.onload = function () { im.src = rd.result; if (srcI) srcI.value = rd.result; setPrev(rd.result); markDirty(); };
          rd.readAsDataURL(fl);
        };
      }
      var up = item.querySelector("[data-gal-up]");
      if (up) up.onclick = function () { if (gi > 0) { var t = b.images[gi - 1]; b.images[gi - 1] = b.images[gi]; b.images[gi] = t; markDirty(); refresh(); } };
      var dn = item.querySelector("[data-gal-down]");
      if (dn) dn.onclick = function () { if (gi < b.images.length - 1) { var t = b.images[gi + 1]; b.images[gi + 1] = b.images[gi]; b.images[gi] = t; markDirty(); refresh(); } };
      var del = item.querySelector("[data-gal-del]");
      if (del) del.onclick = function () { b.images.splice(gi, 1); markDirty(); refresh(); };
    });
  }
  function enableDnD(listEl, blocks) {
    var from = null;
    listEl.querySelectorAll(":scope > .ed-rb-card").forEach(function (card) {
      var handle = card.querySelector(":scope > .ed-rb-head [data-rb-drag]");
      if (!handle) return;
      handle.addEventListener("mousedown", function () { card.setAttribute("draggable", "true"); });
      card.addEventListener("dragstart", function (e) {
        from = parseInt(card.getAttribute("data-rb-i"), 10);
        card.classList.add("ed-dragging");
        e.dataTransfer.effectAllowed = "move";
        try { e.dataTransfer.setData("text/plain", String(from)); } catch (_) {}
      });
      card.addEventListener("dragend", function () {
        card.classList.remove("ed-dragging"); card.removeAttribute("draggable");
        listEl.querySelectorAll(".ed-drop-before,.ed-drop-after").forEach(function (x) { x.classList.remove("ed-drop-before", "ed-drop-after"); });
      });
      card.addEventListener("dragover", function (e) {
        if (from === null) return;
        e.preventDefault();
        var r = card.getBoundingClientRect();
        var after = (e.clientY - r.top) > r.height / 2;
        card.classList.toggle("ed-drop-after", after);
        card.classList.toggle("ed-drop-before", !after);
      });
      card.addEventListener("dragleave", function () { card.classList.remove("ed-drop-before", "ed-drop-after"); });
      card.addEventListener("drop", function (e) {
        if (from === null) return;
        e.preventDefault();
        var to = parseInt(card.getAttribute("data-rb-i"), 10);
        var r = card.getBoundingClientRect();
        var after = (e.clientY - r.top) > r.height / 2;
        var target = after ? to + 1 : to;
        var moved = blocks.splice(from, 1)[0];
        if (from < target) target--;
        blocks.splice(target, 0, moved);
        from = null; markDirty(); refresh();
      });
    });
  }

  // Bir blok listesi sarmalayıcısını (.ed-rb-listwrap) ve içindeki kartları bağlar.
  // Yerleşim blokları (tabs/columns/accordion) için aktif alt listeye özyinelemeli iner.
  function wireBlockList(wrap, blocks) {
    var listEl = wrap.querySelector(":scope > .ed-rb-list");
    var addArea = wrap.querySelector(":scope > .ed-rb-add");
    if (addArea) {
      var addBtn = addArea.querySelector("[data-rb-add]");
      var sel2 = addArea.querySelector("[data-rb-newtype]");
      if (addBtn) addBtn.onclick = function () {
        blocks.push(newBlock(sel2 ? sel2.value : "paragraph"));
        markDirty(); refresh();
      };
    }
    if (!listEl) return;

    // Araya ekleme bölgeleri
    listEl.querySelectorAll(":scope > .ed-rb-between").forEach(function (zone) {
      var insertIdx = parseInt(zone.getAttribute("data-rb-before"), 10);
      var zsel = zone.querySelector(".ed-rb-between__sel");
      var zbtn = zone.querySelector(".ed-rb-between__btn");
      if (zbtn) zbtn.onclick = function () {
        blocks.splice(insertIdx, 0, newBlock(zsel ? zsel.value : "paragraph"));
        markDirty(); refresh();
      };
    });

    listEl.querySelectorAll(":scope > .ed-rb-card").forEach(function (card) {
      var i = parseInt(card.getAttribute("data-rb-i"), 10);
      var b = blocks[i];
      if (!b) return;

      var head = card.querySelector(":scope > .ed-rb-head");
      var up = head.querySelector("[data-rb-up]");
      var down = head.querySelector("[data-rb-down]");
      var del = head.querySelector("[data-rb-del]");
      var dup = head.querySelector("[data-rb-dup]");
      if (up) up.onclick = function () { if (i > 0) { var t = blocks[i - 1]; blocks[i - 1] = blocks[i]; blocks[i] = t; markDirty(); refresh(); } };
      if (down) down.onclick = function () { if (i < blocks.length - 1) { var t = blocks[i + 1]; blocks[i + 1] = blocks[i]; blocks[i] = t; markDirty(); refresh(); } };
      if (del) del.onclick = function () { edConfirm("Bu blok silinsin mi?", { okLabel: "SİL" }).then(function (ok) { if (ok) { blocks.splice(i, 1); markDirty(); refresh(); } }); };
      if (dup) dup.onclick = function () { blocks.splice(i + 1, 0, clone(b)); markDirty(); refresh(); };

      var typesel = head.querySelector("[data-rb-typesel]");
      if (typesel) typesel.onchange = (function (bi) {
        return function () {
          var newType = typesel.value;
          if (newType === blocks[bi].type) return;
          blocks[bi] = migrateBlock(blocks[bi], newType);
          markDirty(); refresh();
        };
      })(i);

      // Her blok için stil paneli (kendi paneline kapsamlı)
      wireStylePanel(card, b);

      // Yerleşim blokları: özyinele ve dur
      if (b.type === "tabs") { wireTabsCard(card, b); return; }
      if (b.type === "columns") { wireColumnsCard(card, b); return; }
      if (b.type === "accordion") { wireAccordionCard(card, b); return; }

      // --- Yaprak blok tipleri ---
      card.querySelectorAll("[data-rb-field]").forEach(function (el) {
        var f = el.getAttribute("data-rb-field");
        var ev = (el.type === "checkbox" || el.tagName === "SELECT") ? "onchange" : "oninput";
        el[ev] = function () {
          if (f === "level") b.level = parseInt(el.value, 10);
          else if (f === "ordered") b.ordered = el.checked;
          else if (f === "showCaption") b.showCaption = el.checked;
          else if (f === "items") b.items = el.value.split("\n");
          else b[f] = el.value;
          markDirty();
          if (f === "level") refresh();
        };
      });
      // Biçim çubukları + görsel alanları
      card.querySelectorAll("[data-fmtbar]").forEach(function (bar) { wireFmtBar(bar); });
      wireImgFields(card);
      if (b.type === "gallery") wireGallery(card, b);
      // Video: dosyadan yükle
      var vidUp = card.querySelector("[data-vid-upload]"), vidFile = card.querySelector("[data-vid-file]");
      if (vidUp && vidFile) {
        vidUp.onclick = function () { vidFile.click(); };
        vidFile.onchange = function () {
          var fl = vidFile.files[0]; if (!fl) return;
          var rd = new FileReader();
          rd.onload = function () { b.src = rd.result; var si2 = card.querySelector('[data-rb-field="src"]'); if (si2) si2.value = rd.result; markDirty(); };
          rd.readAsDataURL(fl);
        };
      }
      // Tablo bloğu kontrolleri
      card.querySelectorAll("[data-bt-head]").forEach(function (el) {
        el.oninput = function () { b.header[parseInt(el.getAttribute("data-bt-head"), 10)] = el.value; markDirty(); };
      });
      card.querySelectorAll("[data-bt-cell]").forEach(function (el) {
        el.oninput = function () {
          var r = parseInt(el.getAttribute("data-bt-r"), 10), c = parseInt(el.getAttribute("data-bt-c"), 10);
          if (!b.rows[r]) b.rows[r] = [];
          b.rows[r][c] = el.value; markDirty();
        };
      });
      var addCol = card.querySelector("[data-bt-addcol]");
      if (addCol) addCol.onclick = function () { b.header.push("Sütun " + (b.header.length + 1)); b.rows.forEach(function (r) { r.push(""); }); markDirty(); refresh(); };
      var delCol2 = card.querySelector("[data-bt-delcol]");
      if (delCol2) delCol2.onclick = function () { if (b.header.length <= 1) return; b.header.pop(); b.rows.forEach(function (r) { r.pop(); }); markDirty(); refresh(); };
      var addRow = card.querySelector("[data-bt-addrow]");
      if (addRow) addRow.onclick = function () { b.rows.push(b.header.map(function () { return ""; })); markDirty(); refresh(); };
      card.querySelectorAll("[data-bt-rowdel]").forEach(function (el) {
        el.onclick = function () { b.rows.splice(parseInt(el.getAttribute("data-bt-rowdel"), 10), 1); markDirty(); refresh(); };
      });
      // Segment kontrolleri
      card.querySelectorAll("[data-ft-pos]").forEach(function (el) {
        el.onclick = function () { b.position = el.getAttribute("data-ft-pos"); markDirty(); refresh(); };
      });
      card.querySelectorAll("[data-callout-var]").forEach(function (el) {
        el.onclick = function () { b.variant = el.getAttribute("data-callout-var"); markDirty(); refresh(); };
      });
      card.querySelectorAll("[data-btn-var]").forEach(function (el) {
        el.onclick = function () { b.variant = el.getAttribute("data-btn-var"); markDirty(); refresh(); };
      });
      card.querySelectorAll("[data-btn-align]").forEach(function (el) {
        el.onclick = function () { b.align = el.getAttribute("data-btn-align"); markDirty(); refresh(); };
      });
      card.querySelectorAll("[data-div-style]").forEach(function (el) {
        el.onclick = function () { b.dstyle = el.getAttribute("data-div-style"); markDirty(); refresh(); };
      });
    });

    // Sürükle-bırak sıralama
    enableDnD(listEl, blocks);
  }

  function wireTabsCard(card, b) {
    var act = tabUI.get(b) || 0;
    if (act >= b.tabs.length) act = 0;
    card.querySelectorAll("[data-tabsel]").forEach(function (el) {
      el.onclick = function () { tabUI.set(b, parseInt(el.getAttribute("data-tabsel"), 10)); refresh(); };
    });
    var tabAdd = card.querySelector("[data-tabadd]");
    if (tabAdd) tabAdd.onclick = function () {
      b.tabs.push({ label: "Sekme " + (b.tabs.length + 1), blocks: [] });
      tabUI.set(b, b.tabs.length - 1); markDirty(); refresh();
    };
    if (!b.tabs.length) return;
    var labelInp = card.querySelector("[data-tablabel]");
    if (labelInp) labelInp.oninput = function () {
      b.tabs[act].label = labelInp.value;
      var chip = card.querySelector('[data-tabsel="' + act + '"]');
      if (chip) chip.textContent = labelInp.value || ("Sekme " + (act + 1));
      markDirty();
    };
    var left = card.querySelector("[data-tableft]");
    var right = card.querySelector("[data-tabright]");
    var tdel = card.querySelector("[data-tabdel]");
    if (left) left.onclick = function () { if (act > 0) { var t = b.tabs[act - 1]; b.tabs[act - 1] = b.tabs[act]; b.tabs[act] = t; tabUI.set(b, act - 1); markDirty(); refresh(); } };
    if (right) right.onclick = function () { if (act < b.tabs.length - 1) { var t = b.tabs[act + 1]; b.tabs[act + 1] = b.tabs[act]; b.tabs[act] = t; tabUI.set(b, act + 1); markDirty(); refresh(); } };
    if (tdel) tdel.onclick = function () {
      edConfirm('"' + (b.tabs[act].label || "Sekme") + '" sekmesi silinsin mi?', { okLabel: "SİL" }).then(function (ok) {
        if (!ok) return;
        b.tabs.splice(act, 1);
        tabUI.set(b, Math.max(0, act - 1)); markDirty(); refresh();
      });
    };
    var nestedWrap = card.querySelector(":scope > .ed-rb-body > .ed-tabedit > .ed-tabbody > .ed-rb-listwrap");
    if (nestedWrap) wireBlockList(nestedWrap, b.tabs[act].blocks || (b.tabs[act].blocks = []));
  }

  function wireColumnsCard(card, b) {
    b.cols = b.cols || [];
    var act = tabUI.get(b) || 0;
    if (act >= b.cols.length) act = 0;
    var ratioI = card.querySelector("[data-col-ratio]");
    if (ratioI) ratioI.oninput = function () { b.ratio = ratioI.value; markDirty(); };
    card.querySelectorAll("[data-colsel]").forEach(function (el) {
      el.onclick = function () { tabUI.set(b, parseInt(el.getAttribute("data-colsel"), 10)); refresh(); };
    });
    var add = card.querySelector("[data-coladd]");
    if (add) add.onclick = function () {
      b.cols.push({ blocks: [] });
      b.ratio = b.cols.map(function () { return "1fr"; }).join(" ");
      tabUI.set(b, b.cols.length - 1); markDirty(); refresh();
    };
    if (!b.cols.length) return;
    var left = card.querySelector("[data-colleft]"), right = card.querySelector("[data-colright]"), del = card.querySelector("[data-coldel]");
    if (left) left.onclick = function () { if (act > 0) { var t = b.cols[act - 1]; b.cols[act - 1] = b.cols[act]; b.cols[act] = t; tabUI.set(b, act - 1); markDirty(); refresh(); } };
    if (right) right.onclick = function () { if (act < b.cols.length - 1) { var t = b.cols[act + 1]; b.cols[act + 1] = b.cols[act]; b.cols[act] = t; tabUI.set(b, act + 1); markDirty(); refresh(); } };
    if (del) del.onclick = function () {
      if (b.cols.length <= 1) { edAlert("En az bir sütun kalmalı."); return; }
      edConfirm("Bu sütun ve içeriği silinsin mi?", { okLabel: "SİL" }).then(function (ok) {
        if (!ok) return;
        b.cols.splice(act, 1);
        b.ratio = b.cols.map(function () { return "1fr"; }).join(" ");
        tabUI.set(b, Math.max(0, act - 1)); markDirty(); refresh();
      });
    };
    var nested = card.querySelector(":scope > .ed-rb-body > .ed-tabedit > .ed-tabbody > .ed-rb-listwrap");
    if (nested) wireBlockList(nested, b.cols[act].blocks || (b.cols[act].blocks = []));
  }

  function wireAccordionCard(card, b) {
    b.items = b.items || [];
    var act = tabUI.get(b) || 0;
    if (act >= b.items.length) act = 0;
    card.querySelectorAll("[data-accsel]").forEach(function (el) {
      el.onclick = function () { tabUI.set(b, parseInt(el.getAttribute("data-accsel"), 10)); refresh(); };
    });
    var add = card.querySelector("[data-accadd]");
    if (add) add.onclick = function () {
      b.items.push({ title: "Başlık " + (b.items.length + 1), open: false, blocks: [] });
      tabUI.set(b, b.items.length - 1); markDirty(); refresh();
    };
    if (!b.items.length) return;
    var it = b.items[act];
    var lbl = card.querySelector("[data-acclabel]");
    if (lbl) lbl.oninput = function () {
      it.title = lbl.value;
      var chip = card.querySelector('[data-accsel="' + act + '"]');
      if (chip) chip.textContent = lbl.value || ("Bölüm " + (act + 1));
      markDirty();
    };
    var openC = card.querySelector("[data-accopen]");
    if (openC) openC.onchange = function () { it.open = openC.checked; markDirty(); };
    var left = card.querySelector("[data-accleft]"), right = card.querySelector("[data-accright]"), del = card.querySelector("[data-accdel]");
    if (left) left.onclick = function () { if (act > 0) { var t = b.items[act - 1]; b.items[act - 1] = b.items[act]; b.items[act] = t; tabUI.set(b, act - 1); markDirty(); refresh(); } };
    if (right) right.onclick = function () { if (act < b.items.length - 1) { var t = b.items[act + 1]; b.items[act + 1] = b.items[act]; b.items[act] = t; tabUI.set(b, act + 1); markDirty(); refresh(); } };
    if (del) del.onclick = function () {
      edConfirm("Bu bölüm silinsin mi?", { okLabel: "SİL" }).then(function (ok) {
        if (!ok) return;
        b.items.splice(act, 1);
        tabUI.set(b, Math.max(0, act - 1)); markDirty(); refresh();
      });
    };
    var nested = card.querySelector(":scope > .ed-rb-body > .ed-tabedit > .ed-tabbody > .ed-rb-listwrap");
    if (nested) wireBlockList(nested, it.blocks || (it.blocks = []));
  }

  /* --- YARATIK EDITORU ---------------------------------------------------- */
  var creatureEdSel = new WeakMap();
  function creatureUID() { return "c" + Date.now().toString(36) + Math.random().toString(36).slice(2, 5); }

  function renderCreatureEditor(it) {
    if (!Array.isArray(it.creatures)) it.creatures = [];
    var selId = creatureEdSel.get(it);
    if (!selId || !it.creatures.find(function (c) { return c._id === selId; })) {
      selId = it.creatures.length ? it.creatures[0]._id : null;
      if (selId) creatureEdSel.set(it, selId);
    }
    var selC = selId ? it.creatures.find(function (c) { return c._id === selId; }) : null;
    var listItems = it.creatures.map(function (c, i) {
      var active = c._id === selId ? " active" : "";
      return '<div class="cr-ed-item' + active + '" data-cred-sel="' + esc(c._id) + '">' +
        '<span class="cr-ed-item__idx">' + pad(i + 1) + '</span>' +
        '<span class="cr-ed-item__name">' + esc(c.isim || "(isimsiz)") + '</span>' +
        '<div class="cr-ed-item__btns">' +
          '<button class="ed-mini ed-mini--danger" data-cred-del="' + esc(c._id) + '" title="Sil">✕</button>' +
        '</div>' +
      '</div>';
    }).join("") || '<div class="cr-ed-form__empty"><p>Henüz yaratık yok.</p></div>';
    var formHtml = selC
      ? renderCreatureFormHtml(selC)
      : '<div class="cr-ed-form__empty"><span class="label">YARATIK FORMU</span><p>Soldan bir yaratık seç veya yeni ekle.</p></div>';
    return '<div class="ed-field">' +
      '<label>YARATIKLAR <span class="hint">' + it.creatures.length + ' kayıt · resimler tarayıcıya kaydedilir</span></label>' +
      '<div class="cr-ed-wrap" id="crEdWrap">' +
        '<div class="cr-ed-list">' +
          '<div class="cr-ed-list__scroll" id="crEdList">' + listItems + '</div>' +
          '<div class="cr-ed-list__add">' +
            '<button class="ed-addbtn" data-cred-add style="width:100%;margin:0">+ YARATIK EKLE</button>' +
          '</div>' +
        '</div>' +
        '<div class="cr-ed-form" id="crEdForm">' + formHtml + '</div>' +
      '</div>' +
    '</div>';
  }

  function renderCreatureFormHtml(c) {
    function statRow(prefix, n, i) {
      return '<div class="cr-f-row">' +
        '<input class="ed-input" data-crfr-' + prefix + '-name="' + i + '" value="' + esc(n.isim) + '" placeholder="' + (prefix === "nitel" ? "Nitelik adı" : "Beceri adı") + '">' +
        '<input class="ed-input" type="number" inputmode="numeric" data-crfr-' + prefix + '-val="' + i + '" value="' + esc(n.deger) + '" placeholder="0">' +
        '<button class="ed-mini ed-mini--danger" data-crfr-' + prefix + '-del="' + i + '">✕</button>' +
      '</div>';
    }
    var nitelRows = (c.nitelikler || []).map(function (n, i) { return statRow("nitel", n, i); }).join("");
    var beceriRows = (c.beceriler || []).map(function (n, i) { return statRow("bec", n, i); }).join("");
    var dayanRows = (c.dayanikliliklar || []).map(function (d, i) {
      var ok = d.durum !== "kirilgan";
      return '<div class="cr-f-row cr-f-row--resist">' +
        '<input class="ed-input" data-crfr-dayan-name="' + i + '" value="' + esc(d.isim) + '" placeholder="Dayanıklılık adı">' +
        '<div class="cr-resist-toggle">' +
          '<button class="' + (ok ? "active-yes" : "") + '" data-crfr-dayan-yes="' + i + '">✓ DAYAN.</button>' +
          '<button class="' + (!ok ? "active-no" : "") + '" data-crfr-dayan-no="' + i + '">✕ KIRILGAN</button>' +
        '</div>' +
        '<button class="ed-mini ed-mini--danger" data-crfr-dayan-del="' + i + '">✕</button>' +
      '</div>';
    }).join("");
    var bagRows = (c.bagisikliklar || []).map(function (b, i) {
      return '<div class="cr-f-row cr-f-row--bag">' +
        '<input class="ed-input" data-crfr-bag-val="' + i + '" value="' + esc(b) + '" placeholder="Bağışıklık (örn. Ateş)">' +
        '<button class="ed-mini ed-mini--danger" data-crfr-bag-del="' + i + '">✕</button>' +
      '</div>';
    }).join("");
    var yetRows = (c.yetenekler || []).map(function (y, i) {
      return '<div class="cr-f-ability">' +
        '<div class="cr-f-ability__top">' +
          '<input class="ed-input" data-crfr-yet-name="' + i + '" value="' + esc(y.isim) + '" placeholder="Yetenek adı">' +
          '<input class="ed-input" data-crfr-yet-kul="' + i + '" value="' + esc(y.kullanim) + '" placeholder="Kullanım sıklığı">' +
          '<button class="ed-mini ed-mini--danger" data-crfr-yet-del="' + i + '">✕</button>' +
        '</div>' +
        '<textarea class="ed-textarea" data-crfr-yet-acik="' + i + '" placeholder="Yetenek açıklaması…" style="min-height:70px;margin-top:6px">' + esc(y.aciklama) + '</textarea>' +
      '</div>';
    }).join("");
    var dkRows = (c.degerliKisimlar || []).map(function (d, i) {
      return '<div class="cr-f-ability">' +
        '<div class="cr-f-ability__top cr-f-ability__top--dk">' +
          '<input class="ed-input" data-crfr-dk-name="' + i + '" value="' + esc(d.isim) + '" placeholder="Değerli kısım adı">' +
          '<input class="ed-input" data-crfr-dk-acik="' + i + '" value="' + esc(d.aciklama) + '" placeholder="Neden değerli?">' +
          '<button class="ed-mini ed-mini--danger" data-crfr-dk-del="' + i + '">✕</button>' +
        '</div>' +
      '</div>';
    }).join("");

    return '<div id="crForm" data-crid="' + esc(c._id) + '">' +
      '<div class="cr-f-section">' +
        '<span class="cr-f-section__title">TEMEL BİLGİLER</span>' +
        '<div class="cr-img-upload">' +
          '<div class="cr-img-preview" id="crImgPreview">' +
            (c.resim ? '<img src="' + esc(c.resim) + '" alt="">' : '<div class="cr-img-preview__placeholder">RESİM<br>EKLE</div>') +
          '</div>' +
          '<div class="cr-img-actions">' +
            '<button class="btn btn--sm" id="crImgBtn">DOSYADAN YÜKLE</button>' +
            (c.resim ? '<button class="btn btn--sm btn--danger" id="crImgClear">KALDIR</button>' : '') +
            '<input type="file" id="crImgFile" accept="image/*" style="display:none">' +
          '</div>' +
        '</div>' +
        '<input class="ed-input" id="crName" style="margin-top:10px" value="' + esc(c.isim) + '" placeholder="Yaratığın adı">' +
      '</div>' +
      '<div class="cr-f-section">' +
        '<span class="cr-f-section__title">NİTELİKLER <span class="hint">ad + sayısal değer</span></span>' +
        '<div class="cr-f-rows" id="crNitelRows">' + nitelRows + '</div>' +
        '<button class="cr-f-add" data-crfr-add="nitel">+ NİTELİK EKLE</button>' +
      '</div>' +
      '<div class="cr-f-section">' +
        '<span class="cr-f-section__title">BECERİLER <span class="hint">ad + sayısal değer</span></span>' +
        '<div class="cr-f-rows" id="crBecRows">' + beceriRows + '</div>' +
        '<button class="cr-f-add" data-crfr-add="bec">+ BECERİ EKLE</button>' +
      '</div>' +
      '<div class="cr-f-section">' +
        '<span class="cr-f-section__title">DAYANIKLILIKLAR <span class="hint">✓ yarım hasar / ✕ iki kat hasar</span></span>' +
        '<div class="cr-f-rows" id="crDayanRows">' + dayanRows + '</div>' +
        '<button class="cr-f-add" data-crfr-add="dayan">+ DAYANIKLILIK EKLE</button>' +
      '</div>' +
      '<div class="cr-f-section">' +
        '<span class="cr-f-section__title">BAĞIŞIKLIKLAR</span>' +
        '<div class="cr-f-rows" id="crBagRows">' + bagRows + '</div>' +
        '<button class="cr-f-add" data-crfr-add="bag">+ BAĞIŞIKLIK EKLE</button>' +
      '</div>' +
      '<div class="cr-f-section">' +
        '<span class="cr-f-section__title">YETENEKLER <span class="hint">ad · kullanım sıklığı · açıklama</span></span>' +
        '<div class="cr-f-rows" id="crYetRows">' + yetRows + '</div>' +
        '<button class="cr-f-add" data-crfr-add="yet">+ YETENEK EKLE</button>' +
      '</div>' +
      '<div class="cr-f-section">' +
        '<span class="cr-f-section__title">DEĞERLİ KISIMLAR <span class="hint">kısım adı · neden değerli</span></span>' +
        '<div class="cr-f-rows" id="crDkRows">' + dkRows + '</div>' +
        '<button class="cr-f-add" data-crfr-add="dk">+ KISIM EKLE</button>' +
      '</div>' +
      '<div class="cr-f-section">' +
        '<span class="cr-f-section__title">DOĞA <span class="hint">yaşam tarzı, habitat, davranış</span></span>' +
        '<textarea class="ed-textarea" id="crDoga" style="min-height:100px" placeholder="Yaratığın doğasıyla ilgili bilgi…">' + esc(c.doga || "") + '</textarea>' +
      '</div>' +
    '</div>';
  }

  function wireCreatureEditor(form, it) {
    if (!it || it.mode !== "creature-list") return;
    if (!Array.isArray(it.creatures)) it.creatures = [];

    var listEl = form.querySelector("#crEdList");
    var formEl = form.querySelector("#crEdForm");

    function refreshList() {
      if (!listEl) return;
      var curId = creatureEdSel.get(it);
      listEl.innerHTML = it.creatures.map(function (c, i) {
        var active = c._id === curId ? " active" : "";
        return '<div class="cr-ed-item' + active + '" data-cred-sel="' + esc(c._id) + '">' +
          '<span class="cr-ed-item__idx">' + pad(i + 1) + '</span>' +
          '<span class="cr-ed-item__name">' + esc(c.isim || "(isimsiz)") + '</span>' +
          '<div class="cr-ed-item__btns">' +
            '<button class="ed-mini ed-mini--danger" data-cred-del="' + esc(c._id) + '" title="Sil">✕</button>' +
          '</div>' +
        '</div>';
      }).join("") || '<div class="cr-ed-form__empty"><p>Henüz yaratık yok.</p></div>';
      wireListItems();
    }

    function showForm(c) {
      if (!formEl) return;
      formEl.innerHTML = c
        ? renderCreatureFormHtml(c)
        : '<div class="cr-ed-form__empty"><span class="label">YARATIK FORMU</span><p>Soldan bir yaratık seç veya yeni ekle.</p></div>';
      if (c) wireCreatureFormEl(form, c, it);
    }

    function wireListItems() {
      if (!listEl) return;
      listEl.querySelectorAll("[data-cred-sel]").forEach(function (el) {
        el.onclick = function (e) {
          if (e.target.closest("[data-cred-del]")) return;
          var id = el.getAttribute("data-cred-sel");
          creatureEdSel.set(it, id);
          listEl.querySelectorAll(".cr-ed-item").forEach(function (x) {
            x.classList.toggle("active", x.getAttribute("data-cred-sel") === id);
          });
          showForm(it.creatures.find(function (x) { return x._id === id; }) || null);
        };
      });
      listEl.querySelectorAll("[data-cred-del]").forEach(function (el) {
        el.onclick = function (e) {
          e.stopPropagation();
          var id = el.getAttribute("data-cred-del");
          edConfirm("Bu yaratık silinsin mi?", { okLabel: "SİL" }).then(function (ok) {
            if (!ok) return;
            it.creatures = it.creatures.filter(function (c) { return c._id !== id; });
            if (creatureEdSel.get(it) === id) {
              var next = it.creatures.length ? it.creatures[0]._id : null;
              if (next) creatureEdSel.set(it, next); else creatureEdSel.delete(it);
              showForm(next ? it.creatures.find(function (c) { return c._id === next; }) : null);
            }
            markDirty(); refreshList();
          });
        };
      });
    }

    var addBtn = form.querySelector("[data-cred-add]");
    if (addBtn) addBtn.onclick = function () {
      var c = { _id: creatureUID(), isim: "", resim: "", nitelikler: [], beceriler: [],
                 dayanikliliklar: [], bagisikliklar: [], yetenekler: [], degerliKisimlar: [], doga: "" };
      it.creatures.push(c);
      creatureEdSel.set(it, c._id);
      markDirty(); refreshList(); showForm(c);
    };

    wireListItems();
    var selC = creatureEdSel.get(it)
      ? it.creatures.find(function (c) { return c._id === creatureEdSel.get(it); })
      : null;
    if (selC) wireCreatureFormEl(form, selC, it);
  }

  function wireCreatureFormEl(formWrap, c, it) {
    var formEl = formWrap.querySelector("#crEdForm");
    if (!formEl) return;

    /* Ad */
    var nameInp = formEl.querySelector("#crName");
    if (nameInp) nameInp.oninput = function () {
      c.isim = nameInp.value; markDirty();
      var listEl = formWrap.querySelector("#crEdList");
      if (listEl) {
        var nm = listEl.querySelector('[data-cred-sel="' + c._id + '"] .cr-ed-item__name');
        if (nm) nm.textContent = c.isim || "(isimsiz)";
      }
    };

    /* Resim */
    var imgBtn = formEl.querySelector("#crImgBtn");
    var imgFile = formEl.querySelector("#crImgFile");
    var imgPrev = formEl.querySelector("#crImgPreview");
    if (imgBtn && imgFile) {
      imgBtn.onclick = function () { imgFile.click(); };
      if (imgPrev) imgPrev.onclick = function () { imgFile.click(); };
      imgFile.onchange = function () {
        var f = imgFile.files[0]; if (!f) return;
        var rd = new FileReader();
        rd.onload = function () {
          c.resim = rd.result; markDirty();
          if (imgPrev) imgPrev.innerHTML = '<img src="' + c.resim.replace(/"/g, "&quot;") + '" alt="">';
          var actDiv = imgPrev && imgPrev.parentNode;
          if (actDiv && !actDiv.querySelector("#crImgClear")) {
            var clrBtn = document.createElement("button");
            clrBtn.className = "btn btn--sm btn--danger"; clrBtn.id = "crImgClear"; clrBtn.textContent = "KALDIR";
            clrBtn.onclick = function () {
              c.resim = ""; markDirty();
              if (imgPrev) imgPrev.innerHTML = '<div class="cr-img-preview__placeholder">RESİM<br>EKLE</div>';
              clrBtn.remove();
            };
            actDiv.appendChild(clrBtn);
          }
        };
        rd.readAsDataURL(f);
      };
    }
    var imgClear = formEl.querySelector("#crImgClear");
    if (imgClear) imgClear.onclick = function () {
      c.resim = ""; markDirty();
      if (imgPrev) imgPrev.innerHTML = '<div class="cr-img-preview__placeholder">RESİM<br>EKLE</div>';
      imgClear.remove();
    };

    /* Doğa */
    var dogaEl = formEl.querySelector("#crDoga");
    if (dogaEl) dogaEl.oninput = function () { c.doga = dogaEl.value; markDirty(); };

    /* Genel satır listesi (nitelikler / beceriler) */
    function makeStatList(arr, prefix, cont) {
      if (!cont) return;
      function rowHtml(a) {
        return a.map(function (n, i) {
          return '<div class="cr-f-row">' +
            '<input class="ed-input" data-crfr-' + prefix + '-name="' + i + '" value="' + esc(n.isim) + '" placeholder="' + (prefix === "nitel" ? "Nitelik adı" : "Beceri adı") + '">' +
            '<input class="ed-input" type="number" inputmode="numeric" data-crfr-' + prefix + '-val="' + i + '" value="' + esc(n.deger) + '" placeholder="0">' +
            '<button class="ed-mini ed-mini--danger" data-crfr-' + prefix + '-del="' + i + '">✕</button>' +
          '</div>';
        }).join("");
      }
      function wire() {
        cont.querySelectorAll("[data-crfr-" + prefix + "-name]").forEach(function (el) {
          var i = +el.getAttribute("data-crfr-" + prefix + "-name");
          el.oninput = function () { if (arr[i]) { arr[i].isim = el.value; markDirty(); } };
        });
        cont.querySelectorAll("[data-crfr-" + prefix + "-val]").forEach(function (el) {
          var i = +el.getAttribute("data-crfr-" + prefix + "-val");
          el.oninput = function () { if (arr[i] !== undefined) { arr[i].deger = el.value === "" ? "" : (isNaN(+el.value) ? el.value : +el.value); markDirty(); } };
        });
        cont.querySelectorAll("[data-crfr-" + prefix + "-del]").forEach(function (el) {
          var i = +el.getAttribute("data-crfr-" + prefix + "-del");
          el.onclick = function () { arr.splice(i, 1); markDirty(); cont.innerHTML = rowHtml(arr); wire(); };
        });
      }
      var addBtn2 = formEl.querySelector('[data-crfr-add="' + prefix + '"]');
      if (addBtn2) addBtn2.onclick = function () { arr.push({ isim: "", deger: 0 }); markDirty(); cont.innerHTML = rowHtml(arr); wire(); };
      wire();
    }
    if (!c.nitelikler) c.nitelikler = [];
    if (!c.beceriler) c.beceriler = [];
    makeStatList(c.nitelikler, "nitel", formEl.querySelector("#crNitelRows"));
    makeStatList(c.beceriler, "bec", formEl.querySelector("#crBecRows"));

    /* Dayanıklılıklar */
    if (!c.dayanikliliklar) c.dayanikliliklar = [];
    var dayanArr = c.dayanikliliklar;
    var dayanCont = formEl.querySelector("#crDayanRows");
    function dayanHtml(a) {
      return a.map(function (d, i) {
        var ok = d.durum !== "kirilgan";
        return '<div class="cr-f-row cr-f-row--resist">' +
          '<input class="ed-input" data-crfr-dayan-name="' + i + '" value="' + esc(d.isim) + '" placeholder="Dayanıklılık adı">' +
          '<div class="cr-resist-toggle">' +
            '<button class="' + (ok ? "active-yes" : "") + '" data-crfr-dayan-yes="' + i + '">✓ DAYAN.</button>' +
            '<button class="' + (!ok ? "active-no" : "") + '" data-crfr-dayan-no="' + i + '">✕ KIRILGAN</button>' +
          '</div>' +
          '<button class="ed-mini ed-mini--danger" data-crfr-dayan-del="' + i + '">✕</button>' +
        '</div>';
      }).join("");
    }
    function wireDayan() {
      if (!dayanCont) return;
      dayanCont.querySelectorAll("[data-crfr-dayan-name]").forEach(function (el) {
        var i = +el.getAttribute("data-crfr-dayan-name");
        el.oninput = function () { if (dayanArr[i]) { dayanArr[i].isim = el.value; markDirty(); } };
      });
      dayanCont.querySelectorAll("[data-crfr-dayan-yes]").forEach(function (el) {
        var i = +el.getAttribute("data-crfr-dayan-yes");
        el.onclick = function () { if (dayanArr[i]) { dayanArr[i].durum = "dayanikli"; markDirty(); dayanCont.innerHTML = dayanHtml(dayanArr); wireDayan(); } };
      });
      dayanCont.querySelectorAll("[data-crfr-dayan-no]").forEach(function (el) {
        var i = +el.getAttribute("data-crfr-dayan-no");
        el.onclick = function () { if (dayanArr[i]) { dayanArr[i].durum = "kirilgan"; markDirty(); dayanCont.innerHTML = dayanHtml(dayanArr); wireDayan(); } };
      });
      dayanCont.querySelectorAll("[data-crfr-dayan-del]").forEach(function (el) {
        var i = +el.getAttribute("data-crfr-dayan-del");
        el.onclick = function () { dayanArr.splice(i, 1); markDirty(); dayanCont.innerHTML = dayanHtml(dayanArr); wireDayan(); };
      });
    }
    var dayanAdd = formEl.querySelector('[data-crfr-add="dayan"]');
    if (dayanAdd) dayanAdd.onclick = function () { dayanArr.push({ isim: "", durum: "dayanikli" }); markDirty(); dayanCont.innerHTML = dayanHtml(dayanArr); wireDayan(); };
    wireDayan();

    /* Bağışıklıklar */
    if (!c.bagisikliklar) c.bagisikliklar = [];
    var bagArr = c.bagisikliklar;
    var bagCont = formEl.querySelector("#crBagRows");
    function bagHtml(a) {
      return a.map(function (b, i) {
        return '<div class="cr-f-row cr-f-row--bag">' +
          '<input class="ed-input" data-crfr-bag-val="' + i + '" value="' + esc(b) + '" placeholder="Bağışıklık (örn. Ateş)">' +
          '<button class="ed-mini ed-mini--danger" data-crfr-bag-del="' + i + '">✕</button>' +
        '</div>';
      }).join("");
    }
    function wireBag() {
      if (!bagCont) return;
      bagCont.querySelectorAll("[data-crfr-bag-val]").forEach(function (el) {
        var i = +el.getAttribute("data-crfr-bag-val");
        el.oninput = function () { bagArr[i] = el.value; markDirty(); };
      });
      bagCont.querySelectorAll("[data-crfr-bag-del]").forEach(function (el) {
        var i = +el.getAttribute("data-crfr-bag-del");
        el.onclick = function () { bagArr.splice(i, 1); markDirty(); bagCont.innerHTML = bagHtml(bagArr); wireBag(); };
      });
    }
    var bagAdd = formEl.querySelector('[data-crfr-add="bag"]');
    if (bagAdd) bagAdd.onclick = function () { bagArr.push(""); markDirty(); bagCont.innerHTML = bagHtml(bagArr); wireBag(); };
    wireBag();

    /* Yetenekler */
    if (!c.yetenekler) c.yetenekler = [];
    var yetArr = c.yetenekler;
    var yetCont = formEl.querySelector("#crYetRows");
    function yetHtml(a) {
      return a.map(function (y, i) {
        return '<div class="cr-f-ability">' +
          '<div class="cr-f-ability__top">' +
            '<input class="ed-input" data-crfr-yet-name="' + i + '" value="' + esc(y.isim) + '" placeholder="Yetenek adı">' +
            '<input class="ed-input" data-crfr-yet-kul="' + i + '" value="' + esc(y.kullanim) + '" placeholder="Kullanım sıklığı">' +
            '<button class="ed-mini ed-mini--danger" data-crfr-yet-del="' + i + '">✕</button>' +
          '</div>' +
          '<textarea class="ed-textarea" data-crfr-yet-acik="' + i + '" placeholder="Yetenek açıklaması…" style="min-height:70px;margin-top:6px">' + esc(y.aciklama) + '</textarea>' +
        '</div>';
      }).join("");
    }
    function wireYet() {
      if (!yetCont) return;
      yetCont.querySelectorAll("[data-crfr-yet-name]").forEach(function (el) {
        var i = +el.getAttribute("data-crfr-yet-name");
        el.oninput = function () { if (yetArr[i]) { yetArr[i].isim = el.value; markDirty(); } };
      });
      yetCont.querySelectorAll("[data-crfr-yet-kul]").forEach(function (el) {
        var i = +el.getAttribute("data-crfr-yet-kul");
        el.oninput = function () { if (yetArr[i]) { yetArr[i].kullanim = el.value; markDirty(); } };
      });
      yetCont.querySelectorAll("[data-crfr-yet-acik]").forEach(function (el) {
        var i = +el.getAttribute("data-crfr-yet-acik");
        el.oninput = function () { if (yetArr[i]) { yetArr[i].aciklama = el.value; markDirty(); } };
      });
      yetCont.querySelectorAll("[data-crfr-yet-del]").forEach(function (el) {
        var i = +el.getAttribute("data-crfr-yet-del");
        el.onclick = function () { yetArr.splice(i, 1); markDirty(); yetCont.innerHTML = yetHtml(yetArr); wireYet(); };
      });
    }
    var yetAdd = formEl.querySelector('[data-crfr-add="yet"]');
    if (yetAdd) yetAdd.onclick = function () { yetArr.push({ isim: "", kullanim: "", aciklama: "" }); markDirty(); yetCont.innerHTML = yetHtml(yetArr); wireYet(); };
    wireYet();

    /* Değerli Kısımlar */
    if (!c.degerliKisimlar) c.degerliKisimlar = [];
    var dkArr = c.degerliKisimlar;
    var dkCont = formEl.querySelector("#crDkRows");
    function dkHtml(a) {
      return a.map(function (d, i) {
        return '<div class="cr-f-ability">' +
          '<div class="cr-f-ability__top cr-f-ability__top--dk">' +
            '<input class="ed-input" data-crfr-dk-name="' + i + '" value="' + esc(d.isim) + '" placeholder="Değerli kısım adı">' +
            '<input class="ed-input" data-crfr-dk-acik="' + i + '" value="' + esc(d.aciklama) + '" placeholder="Neden değerli?">' +
            '<button class="ed-mini ed-mini--danger" data-crfr-dk-del="' + i + '">✕</button>' +
          '</div>' +
        '</div>';
      }).join("");
    }
    function wireDk() {
      if (!dkCont) return;
      dkCont.querySelectorAll("[data-crfr-dk-name]").forEach(function (el) {
        var i = +el.getAttribute("data-crfr-dk-name");
        el.oninput = function () { if (dkArr[i]) { dkArr[i].isim = el.value; markDirty(); } };
      });
      dkCont.querySelectorAll("[data-crfr-dk-acik]").forEach(function (el) {
        var i = +el.getAttribute("data-crfr-dk-acik");
        el.oninput = function () { if (dkArr[i]) { dkArr[i].aciklama = el.value; markDirty(); } };
      });
      dkCont.querySelectorAll("[data-crfr-dk-del]").forEach(function (el) {
        var i = +el.getAttribute("data-crfr-dk-del");
        el.onclick = function () { dkArr.splice(i, 1); markDirty(); dkCont.innerHTML = dkHtml(dkArr); wireDk(); };
      });
    }
    var dkAdd = formEl.querySelector('[data-crfr-add="dk"]');
    if (dkAdd) dkAdd.onclick = function () { dkArr.push({ isim: "", aciklama: "" }); markDirty(); dkCont.innerHTML = dkHtml(dkArr); wireDk(); };
    wireDk();
  }

  /* --- WIKI EDİTÖRÜ ---------------------------------------------------------
     Bilgi kutusu (infobox) + etiketler + ilgili sayfalar + zengin gövde.
     Gövde, ZENGİN modla aynı blok motorunu kullanır (it.blocks). ------------ */
  function wikiAllTargets(excludeItemId) {
    var out = [];
    getSectionOrder().forEach(function (key) {
      var sec = draft.sections[key];
      if (!sec) return;
      if (isHub(sec)) {
        (sec.items || []).forEach(function (cat) {
          (cat.pages || []).forEach(function (pg) {
            out.push({ section: key, item: cat.id, page: pg.id, title: pg.title, group: sec.label + " / " + cat.title });
          });
        });
      } else {
        (sec.items || []).forEach(function (leaf) {
          if (leaf.id === excludeItemId) return;
          out.push({ section: key, item: leaf.id, page: "", title: leaf.title, group: sec.label });
        });
      }
    });
    return out;
  }

  function renderWikiFacts(it) {
    var entries = it.infobox.entries;
    if (!entries.length) return '<div class="ed-rl-empty">Henüz alan yok.</div>';
    return entries.map(function (e, i) {
      return '' +
        '<div class="ed-wiki-fact-row" data-fact-i="' + i + '">' +
          '<input class="ed-input" data-fact-field="label" value="' + esc(e.label || "") + '" placeholder="Alan adı (örn. TÜR)">' +
          '<input class="ed-input" data-fact-field="value" value="' + esc(e.value || "") + '" placeholder="Değer (örn. İnsansı)">' +
          '<button type="button" class="ed-mini ed-mini--danger" data-fact-del title="Sil">✕</button>' +
        '</div>';
    }).join("");
  }

  function renderWikiRelated(it) {
    var rel = it.related;
    if (!rel.length) return '<div class="ed-rl-empty">Henüz bağlı sayfa yok.</div>';
    var targets = wikiAllTargets(it.id);
    return rel.map(function (r, i) {
      var cur = r.section + "::" + r.item + "::" + (r.page || "");
      var opts = targets.map(function (t) {
        var val = t.section + "::" + t.item + "::" + t.page;
        return '<option value="' + esc(val) + '"' + (val === cur ? " selected" : "") + '>' + esc(t.group) + ' — ' + esc(t.title) + '</option>';
      }).join("");
      return '' +
        '<div class="ed-wiki-rel-row" data-rel-i="' + i + '">' +
          '<select class="ed-input" data-rel-field="target">' + opts + '</select>' +
          '<input class="ed-input" data-rel-field="label" value="' + esc(r.label || "") + '" placeholder="Özel etiket (opsiyonel — boşsa sayfa adı kullanılır)">' +
          '<button type="button" class="ed-mini ed-mini--danger" data-rel-del title="Sil">✕</button>' +
        '</div>';
    }).join("");
  }

  function renderWikiEditor(it) {
    if (!it.infobox) it.infobox = { image: "", entries: [] };
    if (!Array.isArray(it.infobox.entries)) it.infobox.entries = [];
    if (!Array.isArray(it.tags)) it.tags = [];
    if (!Array.isArray(it.related)) it.related = [];
    if (!Array.isArray(it.blocks)) it.blocks = [];
    return '' +
      '<div class="ed-field"><label>BİLGİ KUTUSU <span class="hint">sayfanın yanında görünen özet kart — kimlik, tür, bölge gibi kısa alan/değer çiftleri</span></label>' +
        '<div class="ed-wiki-infobox">' +
          imgField(it.infobox, "image") +
          '<div class="ed-wiki-facts" id="wikiFacts">' + renderWikiFacts(it) + '</div>' +
          '<button type="button" class="btn btn--sm" data-wiki-fact-add>+ ALAN EKLE</button>' +
        '</div>' +
      '</div>' +
      '<div class="ed-field"><label>ETİKETLER <span class="hint">virgülle ayır — kategorilendirme için (örn. Diyar, Kuzey, Buzul)</span></label>' +
        '<input class="ed-input" data-wiki-tags value="' + esc(it.tags.join(", ")) + '" placeholder="Etiket bir, Etiket iki, …">' +
      '</div>' +
      '<div class="ed-field"><label>İLGİLİ SAYFALAR <span class="hint">gövdenin altında "İlgili Sayfalar" olarak görünür</span></label>' +
        '<div class="ed-wiki-related" id="wikiRelated">' + renderWikiRelated(it) + '</div>' +
        '<div class="ed-rowbtns"><button type="button" class="btn btn--sm" data-wiki-rel-add>+ SAYFA BAĞLA</button></div>' +
      '</div>' +
      '<div class="ed-field"><label>GÖVDE İÇERİĞİ <span class="hint">' + it.blocks.length + ' blok · H2/H3 başlıklar sayfa içi içindekiler listesine otomatik eklenir</span></label>' +
        renderBlockList(it.blocks, true) +
      '</div>';
  }

  function wireWikiEditor(form, it) {
    if (!it || it.mode !== "wiki") return;
    if (!it.infobox) it.infobox = { image: "", entries: [] };
    if (!Array.isArray(it.related)) it.related = [];

    var box = form.querySelector(".ed-wiki-infobox");
    if (box) {
      wireImgFields(box);
      var imgInput = box.querySelector('[data-imgfield="image"] input[data-rb-field]');
      if (imgInput) imgInput.addEventListener("input", function () { it.infobox.image = imgInput.value; markDirty(); });
    }

    var factsWrap = form.querySelector("#wikiFacts");
    if (factsWrap) {
      factsWrap.querySelectorAll(".ed-wiki-fact-row").forEach(function (row) {
        var i = parseInt(row.getAttribute("data-fact-i"), 10);
        row.querySelectorAll("[data-fact-field]").forEach(function (inp) {
          inp.oninput = function () { it.infobox.entries[i][inp.getAttribute("data-fact-field")] = inp.value; markDirty(); };
        });
        var del = row.querySelector("[data-fact-del]");
        if (del) del.onclick = function () { it.infobox.entries.splice(i, 1); markDirty(); refresh(); };
      });
    }
    var factAdd = form.querySelector("[data-wiki-fact-add]");
    if (factAdd) factAdd.onclick = function () { it.infobox.entries.push({ label: "", value: "" }); markDirty(); refresh(); };

    var tagsInput = form.querySelector("[data-wiki-tags]");
    if (tagsInput) tagsInput.oninput = function () {
      it.tags = tagsInput.value.split(",").map(function (s) { return s.trim(); }).filter(Boolean);
      markDirty();
    };

    var relWrap = form.querySelector("#wikiRelated");
    if (relWrap) {
      relWrap.querySelectorAll(".ed-wiki-rel-row").forEach(function (row) {
        var i = parseInt(row.getAttribute("data-rel-i"), 10);
        var targetSel = row.querySelector('[data-rel-field="target"]');
        if (targetSel) targetSel.onchange = function () {
          var parts = targetSel.value.split("::");
          it.related[i].section = parts[0]; it.related[i].item = parts[1]; it.related[i].page = parts[2] || "";
          markDirty();
        };
        var lblInput = row.querySelector('[data-rel-field="label"]');
        if (lblInput) lblInput.oninput = function () { it.related[i].label = lblInput.value; markDirty(); };
        var relDel = row.querySelector("[data-rel-del]");
        if (relDel) relDel.onclick = function () { it.related.splice(i, 1); markDirty(); refresh(); };
      });
    }
    var relAdd = form.querySelector("[data-wiki-rel-add]");
    if (relAdd) relAdd.onclick = function () {
      var targets = wikiAllTargets(it.id);
      var t = targets[0] || { section: "", item: "", page: "" };
      it.related.push({ section: t.section, item: t.item, page: t.page, label: "" });
      markDirty(); refresh();
    };

    // Gövde: zengin blok motoru
    var rootWrap = form.querySelector(".ed-rb-listwrap");
    if (rootWrap) wireBlockList(rootWrap, it.blocks || (it.blocks = []));
  }

  /* --- VERSİYON YÖNETİMİ -------------------------------------------------- */
  function renderVersionsForm() {
    var store = vEdStoreLoad();
    var activeId = vEdActiveId();
    if (!store) {
      return '<div class="ed-form__head"><div>' +
        '<div class="ed-form__kicker label label--accent">VERSİYON ARŞİVİ</div>' +
        '<h1 class="ed-form__title">VERSİYONLAR</h1></div></div>' +
        '<p style="font-family:var(--font-mono);font-size:12px;color:var(--text-dim)">Henüz versiyon yok. İlk kayıt yapınca otomatik oluşturulur.</p>';
    }
    var list = store.versions.map(function (v) {
      var isActive = v.id === activeId;
      var isDef    = v.id === store.defaultId;
      return '<div class="ed-ver-item' + (isActive ? " ed-ver-item--active" : "") + (isDef ? " ed-ver-item--default" : "") + '" data-ver-id="' + esc(v.id) + '">' +
        '<div class="ed-ver-item__left">' +
          '<input class="ed-input ed-ver-item__label" data-ver-rename="' + esc(v.id) + '" value="' + esc(v.label) + '" placeholder="Versiyon etiketi">' +
          '<div class="ed-ver-item__meta">' +
            '<span class="label">' + esc(v.createdAt) + '</span>' +
            (isDef    ? '<span class="label label--accent">★ VARSAYILAN</span>' : '') +
            (isActive ? '<span class="label">● DÜZENLENİYOR</span>' : '') +
          '</div>' +
        '</div>' +
        '<div class="ed-ver-item__btns">' +
          (!isActive ? '<button class="btn btn--sm" data-ver-edit="' + esc(v.id) + '">DÜZENLE</button>' : '') +
          (!isDef    ? '<button class="btn btn--sm" data-ver-setdefault="' + esc(v.id) + '">VARSAYILAN YAP</button>' : '') +
          '<button class="btn btn--sm" data-ver-duplicate="' + esc(v.id) + '">KOPYALA</button>' +
          (store.versions.length > 1 && !isDef ? '<button class="btn btn--sm btn--danger" data-ver-delete="' + esc(v.id) + '">SİL</button>' : '') +
        '</div>' +
      '</div>';
    }).join("");
    return '<div class="ed-form__head"><div>' +
      '<div class="ed-form__kicker label label--accent">VERSİYON ARŞİVİ</div>' +
      '<h1 class="ed-form__title">VERSİYONLAR</h1></div></div>' +
      '<p class="ed-ver-intro">Her versiyon bağımsız bir içerik kümesidir. <strong>Varsayılan</strong> olarak işaretlenen versiyon ziyaretçilere gösterilir. ' +
      'Düzenlemek istediğin versiyona geçip değişikliklerini kaydet.</p>' +
      '<div class="ed-ver-list">' + list + '</div>' +
      '<div class="ed-rowbtns" style="margin-top:20px">' +
        '<button class="btn btn--primary btn--sm" data-ver-new>+ YENİ VERSİYON</button>' +
      '</div>';
  }

  function wireVersions() {
    var form = document.getElementById("edForm");
    if (!form || sel.type !== "versions") return;

    // Yeniden adlandır
    form.querySelectorAll("[data-ver-rename]").forEach(function (el) {
      el.oninput = function () {
        var store = vEdStoreLoad(); if (!store) return;
        var v = store.versions.find(function (x) { return x.id === el.getAttribute("data-ver-rename"); });
        if (v) { v.label = el.value; vEdStoreSave(store); renderStatus(); }
      };
    });

    // Versiyona geç (düzenle)
    form.querySelectorAll("[data-ver-edit]").forEach(function (btn) {
      btn.onclick = function () {
        function go() {
          localStorage.setItem(STORE_EDITOR_VER, btn.getAttribute("data-ver-edit"));
          draft = loadDraft(); dirty = false; sel = { type: "meta" };
          renderAll(); toast("VERSİYON DEĞİŞTİRİLDİ");
        }
        if (!dirty) { go(); return; }
        edConfirm("Kaydedilmemiş değişiklikler var. Geçmeden önce kaydetmek ister misin? Devam et = kaydetmeden geç.", { okLabel: "DEVAM ET", cancelLabel: "VAZGEÇ" }).then(function (ok) {
          if (ok) go();
        });
      };
    });

    // Varsayılan yap
    form.querySelectorAll("[data-ver-setdefault]").forEach(function (btn) {
      btn.onclick = function () {
        var store = vEdStoreLoad(); if (!store) return;
        store.defaultId = btn.getAttribute("data-ver-setdefault");
        vEdStoreSave(store);
        toast("VARSAYILAN GÜNCELLENDI"); refresh();
      };
    });

    // Kopyala
    form.querySelectorAll("[data-ver-duplicate]").forEach(function (btn) {
      btn.onclick = function () {
        var store = vEdStoreLoad(); if (!store) return;
        var src = store.versions.find(function (x) { return x.id === btn.getAttribute("data-ver-duplicate"); });
        if (!src) return;
        var nid = vEdUID();
        store.versions.push({ id: nid, label: src.label + " (kopya)", createdAt: new Date().toISOString().slice(0, 10), content: clone(src.content) });
        vEdStoreSave(store);
        localStorage.setItem(STORE_EDITOR_VER, nid);
        draft = clone(src.content); dirty = false; sel = { type: "meta" };
        renderAll(); toast("VERSİYON KOPYALANDI");
      };
    });

    // Sil
    form.querySelectorAll("[data-ver-delete]").forEach(function (btn) {
      btn.onclick = function () {
        var store = vEdStoreLoad(); if (!store) return;
        var vid = btn.getAttribute("data-ver-delete");
        var v = store.versions.find(function (x) { return x.id === vid; });
        if (!v) return;
        edConfirm('"' + v.label + '" versiyonu kalıcı olarak silinecek. Emin misin?', { okLabel: "SİL" }).then(function (ok) {
          if (!ok) return;
          store.versions = store.versions.filter(function (x) { return x.id !== vid; });
          if (store.defaultId === vid) store.defaultId = store.versions[0] && store.versions[0].id;
          vEdStoreSave(store);
          if (vEdActiveId() === vid || !store.versions.find(function (x) { return x.id === localStorage.getItem(STORE_EDITOR_VER); })) {
            localStorage.setItem(STORE_EDITOR_VER, store.defaultId || "");
            draft = loadDraft(); dirty = false;
          }
          toast("VERSİYON SİLİNDİ"); refresh();
        });
      };
    });

    // Yeni versiyon
    var newBtn = form.querySelector("[data-ver-new]");
    if (newBtn) newBtn.onclick = function () {
      var store = vEdStoreLoad();
      var nid = vEdUID();
      var base = clone(draft);
      if (!store) {
        store = { versions: [], defaultId: nid };
      }
      var n = store.versions.length + 1;
      store.versions.push({ id: nid, label: "v" + n + ".0", createdAt: new Date().toISOString().slice(0, 10), content: base });
      if (!store.defaultId) store.defaultId = nid;
      vEdStoreSave(store);
      localStorage.setItem(STORE_EDITOR_VER, nid);
      draft = base; dirty = false; sel = { type: "meta" };
      renderAll(); toast("YENİ VERSİYON OLUŞTURULDU");
    };
  }

  /* --- Tüm sayfayı kur ---------------------------------------------------- */
  function renderAll() {
    var root = document.getElementById("edRoot");
    root.innerHTML = '' +
      '<header class="ed-top">' +
        '<div class="ed-top__left">' +
          '<a class="brand" href="index.html"><span class="brand__mark">SLVNZ<span class="dot">4.0</span></span></a>' +
          '<span class="ed-badge">EDİTÖR</span>' +
        '</div>' +
        '<div class="ed-top__right">' +
          '<span class="ed-status saved" id="edStatus"><span class="dot"></span><span class="txt">KAYDEDİLDİ</span></span>' +
          '<span class="ed-ver-indicator' + (!vEdIsDefault() ? " ed-ver-indicator--preview" : "") + '">' + esc(vEdActiveLabel()) + (!vEdIsDefault() ? ' <span class="ed-ver-preview-tag">ÖNİZLEME</span>' : "") + '</span>' +
          '<div class="ed-undoredo">' +
            '<button class="ed-mini ed-mini--lg" id="edUndo" title="Geri al (Ctrl+Z)"' + (undoStack.length ? "" : " disabled") + '>&#8630;</button>' +
            '<button class="ed-mini ed-mini--lg" id="edRedo" title="Yinele (Ctrl+Shift+Z)"' + (redoStack.length ? "" : " disabled") + '>&#8631;</button>' +
          '</div>' +
          '<a class="btn btn--ghost btn--sm" href="index.html" target="_blank">SİTEYİ AÇ ↗</a>' +
          '<button class="btn btn--sm" id="edTheme">' + I.moon + ' <span id="edThemeLbl">' + getTheme().toUpperCase() + '</span></button>' +
          '<button class="btn btn--ghost btn--sm" id="edSaveFileTop" title="content.js dosyası olarak indir" style="white-space:nowrap">DOSYAYA KAYDET</button>' +
          '<button class="btn btn--primary" id="edSave" title="Kaydet (Ctrl+S)">KAYDET</button>' +
        '</div>' +
      '</header>' +
      '<div class="ed-main">' +
        '<aside class="ed-tree" id="edTree">' + renderTree() + '</aside>' +
        '<section class="ed-form" id="edForm">' + renderForm() + '</section>' +
      '</div>' +
      '<footer class="ed-foot">' +
        '<div class="ed-foot__group">' +
          '<button class="btn btn--sm" id="edExport">JSON DIŞA AKTAR</button>' +
          '<button class="btn btn--sm" id="edImport">JSON İÇE AKTAR</button>' +
          '<button class="btn btn--sm" id="edCopy">CONTENT.JS OLARAK KOPYALA</button>' +
        '</div>' +
        '<div class="ed-foot__group">' +
          '<span class="ed-foot__hint">Değişiklikler tarayıcına kaydedilir — sunucu gerekmez.</span>' +
          '<button class="btn btn--sm btn--danger" id="edReset">VARSAYILANA SIFIRLA</button>' +
        '</div>' +
      '</footer>' +
      modalHTML() +
      '<div class="ed-toast" id="edToast"></div>';

    wireTop();
    wireTree();
    wireForm();
    renderStatus();
  }

  function modalHTML() {
    return '' +
      '<div class="ed-modal" id="edModal">' +
        '<div class="ed-modal__panel">' +
          '<div class="ed-modal__head">' +
            '<h3 class="ed-modal__title">CONTENT.JS</h3>' +
            '<button class="btn btn--sm" data-modal-close>KAPAT ✕</button>' +
          '</div>' +
          '<div class="ed-modal__body">' +
            '<p class="ed-modal__intro">Aşağıdaki metnin tamamını kopyala ve proje klasöründeki <b>content.js</b> dosyasının içeriğiyle değiştir. Böylece değişiklikler kalıcı olur (yeni cihaz / temiz tarayıcıda da görünür).</p>' +
            '<textarea class="ed-codearea" id="edCode" readonly></textarea>' +
          '</div>' +
          '<div class="ed-modal__foot">' +
            '<button class="btn btn--sm" data-modal-close>KAPAT</button>' +
            '<button class="btn btn--sm" id="edSaveFile">DOSYAYA KAYDET</button>' +
            '<button class="btn btn--primary btn--sm" id="edCopyClip">PANOYA KOPYALA</button>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  /* --- Olay bağlama ------------------------------------------------------- */
  function wireTop() {
    document.getElementById("edSave").onclick = save;
    document.getElementById("edSaveFileTop").onclick = saveContentJSFile;
    document.getElementById("edTheme").onclick = toggleTheme;
    var uB = document.getElementById("edUndo"), rB = document.getElementById("edRedo");
    if (uB) uB.onclick = undo;
    if (rB) rB.onclick = redo;
    document.getElementById("edExport").onclick = exportJSON;
    document.getElementById("edImport").onclick = importJSON;
    document.getElementById("edReset").onclick = resetDefaults;
    document.getElementById("edCopy").onclick = openCodeModal;
    // Modal
    var modal = document.getElementById("edModal");
    modal.querySelectorAll("[data-modal-close]").forEach(function (b) {
      b.onclick = function () { modal.classList.remove("open"); };
    });
    modal.addEventListener("click", function (e) { if (e.target === modal) modal.classList.remove("open"); });
    document.getElementById("edCopyClip").onclick = function () {
      var ta = document.getElementById("edCode");
      ta.select();
      navigator.clipboard.writeText(ta.value).then(function () { toast("PANOYA KOPYALANDI"); })
        .catch(function () { document.execCommand("copy"); toast("PANOYA KOPYALANDI"); });
    };
    document.getElementById("edSaveFile").onclick = saveContentJSFile;
  }

  function saveContentJSFile() {
    var content = document.getElementById("edCode") ? document.getElementById("edCode").value : genContentJS();
    if (typeof window.showSaveFilePicker === "function") {
      window.showSaveFilePicker({
        suggestedName: "content.js",
        types: [{ description: "JavaScript Dosyası", accept: { "text/javascript": [".js"] } }]
      }).then(function (handle) {
        return handle.createWritable().then(function (w) {
          return w.write(content).then(function () { return w.close(); });
        });
      }).then(function () {
        toast("CONTENT.JS KAYDEDİLDİ");
        document.getElementById("edModal").classList.remove("open");
      }).catch(function (e) {
        if (e.name !== "AbortError") {
          navigator.clipboard.writeText(content).then(function () { toast("PANOYA KOPYALANDI (dosyaya yazılamadı)"); })
            .catch(function () { toast("Tarayıcı dosya kaydetmeyi desteklemiyor."); });
        }
      });
    } else {
      navigator.clipboard.writeText(content).then(function () { toast("PANOYA KOPYALANDI"); })
        .catch(function () { document.execCommand("copy"); toast("PANOYA KOPYALANDI"); });
    }
  }

  function openCodeModal() {
    document.getElementById("edCode").value = genContentJS();
    document.getElementById("edModal").classList.add("open");
  }

  function wireTree() {
    var tree = document.getElementById("edTree");
    tree.querySelectorAll("[data-sel]").forEach(function (el) {
      el.onclick = function () {
        var type = el.getAttribute("data-sel");
        if (type === "meta") sel = { type: "meta" };
        else if (type === "section") sel = { type: "section", section: el.getAttribute("data-sec") };
        else if (type === "page") sel = { type: "page", section: el.getAttribute("data-sec"), pageId: el.getAttribute("data-page") };
        else if (type === "versions") { sel = { type: "versions" }; }
        else if (type === "item") {
          var pg = el.getAttribute("data-page");
          sel = pg
            ? { type: "item", section: el.getAttribute("data-sec"), pageId: pg, itemId: el.getAttribute("data-id") }
            : { type: "item", section: el.getAttribute("data-sec"), itemId: el.getAttribute("data-id") };
        }
        refresh();
      };
    });
    tree.querySelectorAll("[data-add]").forEach(function (b) {
      b.onclick = function (e) { e.stopPropagation(); addItem(b.getAttribute("data-add")); };
    });
    tree.querySelectorAll("[data-addpage]").forEach(function (b) {
      b.onclick = function (e) { e.stopPropagation(); addPage(b.getAttribute("data-addpage")); };
    });
    tree.querySelectorAll("[data-additem]").forEach(function (b) {
      b.onclick = function (e) {
        e.stopPropagation();
        var parts = b.getAttribute("data-additem").split("::");
        addItem(parts[0], parts[1]);
      };
    });
    var addSecBtn = tree.querySelector("[data-addsection]");
    if (addSecBtn) addSecBtn.onclick = function (e) { e.stopPropagation(); addSection(); };
    tree.querySelectorAll("[data-secmove]").forEach(function (b) {
      b.onclick = function (e) {
        e.stopPropagation();
        var parts = b.getAttribute("data-secmove").split("::");
        moveSection(parts[0], parts[1] === "up" ? -1 : 1);
      };
    });
  }

  function wireForm() {
    var form = document.getElementById("edForm");

    // Meta alanları
    form.querySelectorAll("[data-meta]").forEach(function (el) {
      el.oninput = function () {
        draft.meta[el.getAttribute("data-meta")] = el.value;
        markDirty();
        var k = el.getAttribute("data-meta");
        if (k === "brandName" || k === "brandAccent" || k === "brandLogo") updateBrandPreview();
      };
    });
    if (sel.type === "meta") updateBrandPreview();
    // Sekme alanları
    form.querySelectorAll("[data-sec-field]").forEach(function (el) {
      el.oninput = function () {
        var f = el.getAttribute("data-sec-field");
        draft.sections[sel.section][f] = el.value;
        markDirty();
        if (f === "label") { renderTreeOnly(); }
      };
    });
    // Sayfa alanları (hub)
    form.querySelectorAll("[data-page-field]").forEach(function (el) {
      el.oninput = function () {
        var page = pageOf(sel);
        if (!page) return;
        var f = el.getAttribute("data-page-field");
        if (f === "id") { var nid = slugify(el.value); page.id = nid; sel.pageId = nid; }
        else page[f] = el.value;
        markDirty();
        if (f === "title" || f === "id") renderTreeOnly();
      };
    });
    // Öğe alanları
    form.querySelectorAll("[data-item]").forEach(function (el) {
      el.oninput = function () {
        var items = itemListFor(sel);
        var it = items && items.find(function (x) { return x.id === sel.itemId; });
        if (!it) return;
        var f = el.getAttribute("data-item");
        if (f === "id") {
          var newId = slugify(el.value);
          it.id = newId; sel.itemId = newId;
        } else {
          it[f] = el.value;
        }
        markDirty();
        if (f === "title" || f === "id") renderTreeOnly();
      };
    });
    // Taşı / sil (öğe)
    var moveUp = form.querySelector('[data-move="up"]');
    var moveDown = form.querySelector('[data-move="down"]');
    var del = form.querySelector('[data-delete]');
    if (moveUp) moveUp.onclick = function () { moveItem(-1); };
    if (moveDown) moveDown.onclick = function () { moveItem(1); };
    if (del) del.onclick = deleteItem;
    // Taşı / sil (sayfa)
    var pmUp = form.querySelector('[data-pagemove="up"]');
    var pmDown = form.querySelector('[data-pagemove="down"]');
    var pDel = form.querySelector('[data-pagedelete]');
    if (pmUp) pmUp.onclick = function () { movePage(-1); };
    if (pmDown) pmDown.onclick = function () { movePage(1); };
    if (pDel) pDel.onclick = deletePage;
    // Taşı / HUB / sil (bölüm)
    var smUp = form.querySelector('[data-secmoveform="up"]');
    var smDown = form.querySelector('[data-secmoveform="down"]');
    var shTog = form.querySelector('[data-sechubtoggle]');
    var sDel = form.querySelector('[data-secdelete]');
    if (smUp) smUp.onclick = function () { moveSection(sel.section, -1); };
    if (smDown) smDown.onclick = function () { moveSection(sel.section, 1); };
    if (shTog) shTog.onclick = function () { toggleSectionHub(sel.section); };
    if (sDel) sDel.onclick = function () { deleteSection(sel.section); };

    // Tablo editörü
    wireTableEditor(form);
    // Zengin (blok) editörü
    wireRichEditor(form);
    // Yaratık editörü
    wireCreatureEditor(form, curItem());
    // Wiki editörü
    wireWikiEditor(form, curItem());
    // Versiyon yönetimi
    wireVersions();
  }

  /* --- Tablo editörü olay bağlama ----------------------------------------- */
  function curItem() {
    var items = itemListFor(sel);
    return items ? items.find(function (x) { return x.id === sel.itemId; }) : null;
  }
  function moveCol(t, id, dir) {
    var i = t.columns.findIndex(function (x) { return x.id === id; });
    var to = i + dir;
    if (to < 0 || to >= t.columns.length) return;
    var tmp = t.columns[i]; t.columns[i] = t.columns[to]; t.columns[to] = tmp;
    markDirty(); refresh();
  }
  function delCol(t, id) {
    if (t.columns.length <= 1) { edAlert("En az bir sütun kalmalı."); return; }
    var c = t.columns.find(function (x) { return x.id === id; });
    edConfirm('"' + (c ? c.label : id) + '" sütunu ve tüm satırlardaki verisi silinecek. Emin misin?', { okLabel: "SİL" }).then(function (ok) {
      if (!ok) return;
      t.columns = t.columns.filter(function (x) { return x.id !== id; });
      t.rows.forEach(function (r) { delete r[id]; });
      markDirty(); refresh();
    });
  }
  function wireTableEditor(form) {
    // Mod değiştir (METİN / TABLO)
    form.querySelectorAll("[data-mode]").forEach(function (b) {
      b.onclick = function () {
        var it = curItem(); if (!it) return;
        var mode = b.getAttribute("data-mode");
        if (mode === "table") { it.mode = "table"; if (!it.table) it.table = defaultTable(); }
        else if (mode === "rich") { it.mode = "rich"; if (!it.blocks) it.blocks = []; }
        else if (mode === "creature") { it.mode = "creature-list"; if (!Array.isArray(it.creatures)) it.creatures = []; }
        else if (mode === "wiki") {
          it.mode = "wiki";
          if (!it.blocks) it.blocks = [];
          if (!it.infobox) it.infobox = { image: "", entries: [] };
          if (!Array.isArray(it.tags)) it.tags = [];
          if (!Array.isArray(it.related)) it.related = [];
        }
        else { it.mode = "text"; if (!it.body) it.body = window.SLVNZ_PLACEHOLDER_BODY || ""; }
        markDirty(); refresh();
      };
    });

    var it = curItem();
    if (!it || it.mode !== "table") return;
    var t = it.table;

    // --- Sütunlar ---
    form.querySelectorAll("[data-col-label]").forEach(function (el) {
      el.oninput = function () { // focus korunur, re-render yok
        var c = t.columns.find(function (x) { return x.id === el.closest(".ed-col").getAttribute("data-col"); });
        if (c) { c.label = el.value; markDirty(); }
      };
    });
    form.querySelectorAll("[data-col-type]").forEach(function (el) {
      el.onchange = function () {
        var c = t.columns.find(function (x) { return x.id === el.closest(".ed-col").getAttribute("data-col"); });
        if (c) { c.type = el.value; markDirty(); refresh(); }
      };
    });
    form.querySelectorAll("[data-col-vis]").forEach(function (el) {
      el.onchange = function () {
        var c = t.columns.find(function (x) { return x.id === el.closest(".ed-col").getAttribute("data-col"); });
        if (c) { c.showInTable = el.checked; markDirty(); refresh(); }
      };
    });
    form.querySelectorAll("[data-col-snap]").forEach(function (el) {
      el.onchange = function () {
        var c = t.columns.find(function (x) { return x.id === el.closest(".ed-col").getAttribute("data-col"); });
        if (c) { c.snapZone = el.value; markDirty(); }
      };
    });
    form.querySelectorAll("[data-col-up]").forEach(function (el) {
      el.onclick = function () { moveCol(t, el.closest(".ed-col").getAttribute("data-col"), -1); };
    });
    form.querySelectorAll("[data-col-down]").forEach(function (el) {
      el.onclick = function () { moveCol(t, el.closest(".ed-col").getAttribute("data-col"), 1); };
    });
    form.querySelectorAll("[data-col-del]").forEach(function (el) {
      el.onclick = function () { delCol(t, el.closest(".ed-col").getAttribute("data-col")); };
    });
    var colAdd = form.querySelector("[data-col-add]");
    if (colAdd) colAdd.onclick = function () {
      t.columns.push({ id: colId("Yeni Alan", t.columns), label: "YENİ ALAN", type: "text", showInTable: true });
      markDirty(); refresh();
    };

    // --- Kayıtlar: master-detail ---
    function refreshRowPanel() {
      var listEl = form.querySelector('#edRowList');
      var formEl = form.querySelector('#edRowForm');
      if (listEl) listEl.innerHTML = renderRowList(t);
      if (formEl) formEl.innerHTML = renderRowForm(t);
      wireRowPanel();
    }

    function wireRowPanel() {
      var listEl = form.querySelector('#edRowList');
      var formEl = form.querySelector('#edRowForm');
      if (listEl) {
        listEl.querySelectorAll('[data-rowsel]').forEach(function (el) {
          el.onclick = function () { tableEditRow.set(t, el.getAttribute('data-rowsel')); refreshRowPanel(); };
        });
        listEl.querySelectorAll('[data-rl-up]').forEach(function (el) {
          el.onclick = function (e) {
            e.stopPropagation();
            var rid = el.getAttribute('data-rl-up');
            var i = t.rows.findIndex(function (x) { return x._id === rid; });
            if (i > 0) { var tmp = t.rows[i - 1]; t.rows[i - 1] = t.rows[i]; t.rows[i] = tmp; markDirty(); refreshRowPanel(); }
          };
        });
        listEl.querySelectorAll('[data-rl-down]').forEach(function (el) {
          el.onclick = function (e) {
            e.stopPropagation();
            var rid = el.getAttribute('data-rl-down');
            var i = t.rows.findIndex(function (x) { return x._id === rid; });
            if (i < t.rows.length - 1) { var tmp = t.rows[i + 1]; t.rows[i + 1] = t.rows[i]; t.rows[i] = tmp; markDirty(); refreshRowPanel(); }
          };
        });
        listEl.querySelectorAll('[data-rl-del]').forEach(function (el) {
          el.onclick = function (e) {
            e.stopPropagation();
            var rid = el.getAttribute('data-rl-del');
            edConfirm('Bu kayıt silinsin mi?', { okLabel: "SİL" }).then(function (ok) {
              if (!ok) return;
              t.rows = t.rows.filter(function (x) { return x._id !== rid; });
              if (tableEditRow.get(t) === rid) tableEditRow.set(t, t.rows.length ? t.rows[0]._id : null);
              markDirty(); refreshRowPanel();
            });
          };
        });
      }
      var rowAdd = form.querySelector('[data-row-add]');
      if (rowAdd) rowAdd.onclick = function () {
        var nr = { _id: uid() };
        t.rows.push(nr);
        tableEditRow.set(t, nr._id);
        markDirty(); refreshRowPanel();
      };
      if (formEl) {
        var saveBtn = formEl.querySelector('[data-rf-save]');
        if (saveBtn) saveBtn.onclick = function () {
          var selId = tableEditRow.get(t);
          var r = t.rows.find(function (x) { return x._id === selId; });
          if (!r) return;
          formEl.querySelectorAll('[data-rf-field]').forEach(function (el) {
            var cid = el.getAttribute('data-rf-field');
            var c = t.columns.find(function (x) { return x.id === cid; });
            if (!c) return;
            if (c.type === 'number') {
              r[cid] = el.value === '' ? '' : (isNaN(parseFloat(el.value)) ? el.value : parseFloat(el.value));
            } else { r[cid] = el.value; }
          });
          markDirty();
          // Liste başlığını güncelle (focus kaybetme, sadece listede yenile)
          var listEl2 = form.querySelector('#edRowList');
          if (listEl2) listEl2.innerHTML = renderRowList(t);
          wireRowPanel();
          // Kısa "KAYDEDILDI" göstergesi
          var saved = document.getElementById('rfSaved');
          if (saved) { saved.textContent = '✓ Kaydedildi'; clearTimeout(saved._t); saved._t = setTimeout(function () { saved.textContent = ''; }, 1800); }
        };
      }
    }
    wireRowPanel();
  }

  /* --- Öğe işlemleri ------------------------------------------------------ */
  // addItem(sectionKey)           -> normal bölüme öğe ekler
  // addItem(sectionKey, pageId)   -> hub sayfasına içerik bölümü ekler
  function addItem(sectionKey, pageId) {
    var sec = draft.sections[sectionKey];
    var list, ctx;
    if (pageId) {
      var pg = sec.items.find(function (p) { return p.id === pageId; });
      if (!pg) return;
      list = pg.pages || (pg.pages = []);
      ctx = { type: "item", section: sectionKey, pageId: pageId };
    } else {
      list = sec.items;
      ctx = { type: "item", section: sectionKey };
    }
    var n = list.length + 1;
    var base = "yeni-bolum";
    var id = base, k = n;
    while (list.some(function (x) { return x.id === id; })) { id = base + "-" + k; k++; }
    list.push({ id: id, title: "YENİ BÖLÜM " + n, body: window.SLVNZ_PLACEHOLDER_BODY || "" });
    ctx.itemId = id; sel = ctx;
    markDirty(); renderAll();
  }
  function deleteItem() {
    var items = itemListFor(sel);
    if (!items) return;
    var idx = items.findIndex(function (x) { return x.id === sel.itemId; });
    if (idx < 0) return;
    edConfirm('"' + items[idx].title + '" öğesi silinecek. Emin misin?', { okLabel: "SİL" }).then(function (ok) {
      if (!ok) return;
      items.splice(idx, 1);
      if (items.length) sel = { type: "item", section: sel.section, pageId: sel.pageId, itemId: items[Math.max(0, idx - 1)].id };
      else sel = sel.pageId ? { type: "page", section: sel.section, pageId: sel.pageId } : { type: "section", section: sel.section };
      markDirty(); renderAll();
    });
  }
  function moveItem(dir) {
    var items = itemListFor(sel);
    if (!items) return;
    var idx = items.findIndex(function (x) { return x.id === sel.itemId; });
    var to = idx + dir;
    if (to < 0 || to >= items.length) return;
    var tmp = items[idx]; items[idx] = items[to]; items[to] = tmp;
    markDirty(); renderAll();
  }

  /* --- Sayfa işlemleri (hub bölümleri) ------------------------------------ */
  function addPage(sectionKey) {
    var sec = draft.sections[sectionKey];
    var n = sec.items.length + 1;
    var base = "yeni-sayfa", id = base, k = n;
    while (sec.items.some(function (x) { return x.id === id; })) { id = base + "-" + k; k++; }
    sec.items.push({ id: id, title: "YENİ SAYFA " + n, blurb: "", pages: [] });
    sel = { type: "page", section: sectionKey, pageId: id };
    markDirty(); renderAll();
  }
  function deletePage() {
    var sec = draft.sections[sel.section];
    var idx = sec.items.findIndex(function (p) { return p.id === sel.pageId; });
    if (idx < 0) return;
    edConfirm('"' + sec.items[idx].title + '" sayfası ve içindeki tüm bölümler silinecek. Emin misin?', { okLabel: "SİL" }).then(function (ok) {
      if (!ok) return;
      sec.items.splice(idx, 1);
      sel = sec.items.length ? { type: "page", section: sel.section, pageId: sec.items[Math.max(0, idx - 1)].id }
                             : { type: "section", section: sel.section };
      markDirty(); renderAll();
    });
  }
  function movePage(dir) {
    var sec = draft.sections[sel.section];
    var idx = sec.items.findIndex(function (p) { return p.id === sel.pageId; });
    var to = idx + dir;
    if (to < 0 || to >= sec.items.length) return;
    var tmp = sec.items[idx]; sec.items[idx] = sec.items[to]; sec.items[to] = tmp;
    markDirty(); renderAll();
  }

  /* --- Kısmi yeniden çizimler --------------------------------------------- */
  function refresh() {
    document.getElementById("edForm").innerHTML = renderForm();
    renderTreeOnly();
    wireForm();
  }
  function renderTreeOnly() {
    var tree = document.getElementById("edTree");
    tree.innerHTML = renderTree();
    wireTree();
  }

  /* --- Toast -------------------------------------------------------------- */
  var toastTimer = null;
  function edDialog(opts) {
    return new Promise(function (resolve) {
      var isAlert = opts.cancelLabel === null;
      var ov = document.createElement("div");
      ov.className = "ed-confirm-overlay";
      ov.innerHTML =
        '<div class="ed-confirm" role="alertdialog" aria-modal="true">' +
          (opts.title ? '<p class="ed-confirm__title">' + esc(opts.title) + '</p>' : '') +
          '<p class="ed-confirm__msg">' + esc(opts.message) + '</p>' +
          '<div class="ed-confirm__foot">' +
            (isAlert ? '' : '<button type="button" class="btn btn--sm btn--ghost" data-cc="cancel">' + esc(opts.cancelLabel || "İPTAL") + '</button>') +
            '<button type="button" class="btn btn--sm btn--primary" data-cc="ok">' + esc(opts.okLabel || "TAMAM") + '</button>' +
          '</div>' +
        '</div>';
      document.body.appendChild(ov);
      var okBtn = ov.querySelector('[data-cc="ok"]');
      var cancelBtn = ov.querySelector('[data-cc="cancel"]');
      function close(result) {
        document.removeEventListener("keydown", onKey);
        ov.classList.remove("open");
        setTimeout(function () { ov.remove(); }, 160);
        resolve(result);
      }
      function onKey(e) {
        if (e.key === "Escape") { e.preventDefault(); close(false); }
        else if (e.key === "Enter") { e.preventDefault(); close(true); }
      }
      ov.addEventListener("click", function (e) { if (e.target === ov) close(false); });
      if (okBtn) okBtn.onclick = function () { close(true); };
      if (cancelBtn) cancelBtn.onclick = function () { close(false); };
      document.addEventListener("keydown", onKey);
      void ov.offsetWidth; // force reflow so the opacity/transform transition runs
      ov.classList.add("open");
      (okBtn || cancelBtn).focus();
    });
  }
  function edConfirm(message, opts) {
    opts = opts || {};
    return edDialog({ message: message, title: opts.title, okLabel: opts.okLabel, cancelLabel: opts.cancelLabel });
  }
  function edAlert(message, opts) {
    opts = opts || {};
    return edDialog({ message: message, title: opts.title, okLabel: opts.okLabel || "TAMAM", cancelLabel: null });
  }

  function toast(msg) {
    var t = document.getElementById("edToast");
    if (!t) return;
    t.textContent = msg; t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, 1900);
  }

  /* --- Kaydedilmemiş değişiklik uyarısı ----------------------------------- */
  window.addEventListener("beforeunload", function (e) {
    if (dirty) { e.preventDefault(); e.returnValue = ""; }
  });

  /* --- Başlat ------------------------------------------------------------- */
  /* --- Klavye kısayolları: Ctrl/Cmd+S kaydet, Ctrl/Cmd+Z geri al, Ctrl/Cmd+Shift+Z veya Ctrl+Y yinele --- */
  window.addEventListener("keydown", function (e) {
    var mod = e.ctrlKey || e.metaKey;
    if (!mod) return;
    var key = e.key.toLowerCase();
    if (key === "s") { e.preventDefault(); save(); return; }
    var ae = document.activeElement;
    var inField = ae && (ae.tagName === "INPUT" || ae.tagName === "TEXTAREA" || ae.isContentEditable);
    if (inField) return;
    if (key === "z" && !e.shiftKey) { e.preventDefault(); undo(); }
    else if (key === "y" || (key === "z" && e.shiftKey)) { e.preventDefault(); redo(); }
  });

  setTheme(getTheme());
  checkAutosaveRecovery();
  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", renderAll);
  else renderAll();
})();
