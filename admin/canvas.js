/* SLVNZ — tuval editörü (Tasarım görünümü)
   ============================================================================
   Gerçek site bir iframe'de, ?edit=1 ile açılır (server site script'lerini
   çıkarır; theme.js kalır). Bu dosya iframe'in İÇİNE yalnız düzenleme
   "krom"unu ekler: seçim/vurgu çerçeveleri, yerinde metin editörü, bölüm
   sürükle-sırala, "+ Bölüm" düğmesi. Sayfanın kendi işaretlemesine kalıcı
   hiçbir şey yazılmaz — tek gerçek kaynak admin.js'teki site modeli.

   Akış
   ----
   tıkla        → öğeyi seç (çerçeve + sağda özellik paneli)
   tekrar tıkla → metni yerinde düzenle (başlık düz metin; zengin metin
                  üstteki biçim çubuğuyla — admin.js süzgeciyle aynı söz
                  dağarcığına indirgenir)
   sağ menü     → bölüme git; sürükleyerek sırala
   Ctrl+Z / Y   → yapısal geri al / yinele (metin içindeyken tarayıcının
                  kendi geri alması çalışır)
   Kaydet       → admin.js'in kayıt yolu: model → sunucu → işaretli bölgeler

   Modelden çizim: paneller/toc/kimlik iframe'e her zaman MODELDEN üretilir
   (server.py'deki gen_* fonksiyonlarının DOM aynası). Diskteki HTML yalnız
   iskeleti sağlar; kaydedilmemiş değişiklikler de böylece tuvalde görünür.
   ========================================================================== */
(function () {
  'use strict';

  var A = window.__adm;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------------------------------------------------------------- durum */
  var frame = $('[data-cv-frame]');
  var framewrap = $('[data-cv-framewrap]');
  var stage = $('[data-cv-stage]');
  var insp = $('[data-cv-insp]');
  var textbar = $('[data-cv-textbar]');
  var zoomEl = $('[data-cv-zoom]');

  var page = 'kurallar';        // 'kurallar' | 'index'
  var bpW = 1280;               // kırılım genişliği
  var fdoc = null, fwin = null; // iframe belgesi / penceresi
  var ready = false;            // site modeli yüklendi mi
  var active = false;           // Tasarım görünümü açık mı
  var booted = false;
  var shownId = null;           // açık bölüm (panel) id'si
  var sel = null;               // {type, el, id?, label}
  var hover = null;
  var editing = null;           // {type:'title'|'genre'|'rich', el, id?}
  var hoverBox = null, selectBox = null;
  var undoStack = [], redoStack = [];
  var rafId = 0;
  var drag = null, justDragged = false;
  var lockedToastAt = 0;
  var savedRange = null;
  var blockSel = null, linkrow = null, tablebarEl = null;
  var histU = null, histR = null;
  var dropline = null;          // iframe içi bırakma çizgisi
  var pd = null;                // palet sürüklemesi {blk, x0, y0, moved, ghost, target}
  var tbox = null;              // dönüşüm kutusu (tutamaçlar)
  var gesture = null;           // aktif dönüşüm jesti {kind, el, info, startT, ...}
  var activeTabs = {};          // sekme bloklarının açık sekmesi — "chId:bi" → panel sırası
  var renaming = null;          // şeritte ad düzenlenen sekme {btn, chId, bi, ti, orig}
  var colbar = null;            // sütun boyutlandırma tutamaçları (seçili tablo)
  var colGesture = null;        // aktif sütun sürüklemesi {table, k, x0, tw, start, selInfo}

  /* ---------------------------------------------------------------- bloklar
     Ekle paletinin sözlüğü. `html` süzgecin söz dağarcığında kalır — kayıtta
     zaten A.serializeForSave'den geçer. `bolum: true` olanlar yeni bölüm açar;
     `pick: true` önce görsel seçtirir. */
  var BLOCKS = [
    { id: 'sb-metin', cat: 'Bölüm Şablonları', bolum: true, ad: 'Metin bölümü',
      html: '<h3>Başlık</h3>\n<p class="lede">Bölümün giriş paragrafı — kuralın özünü bir iki cümleyle anlat.</p>\n<p>Ayrıntılar buraya.</p>' },
    { id: 'sb-tablo', cat: 'Bölüm Şablonları', bolum: true, ad: 'Tablolu bölüm',
      html: '<h3>Başlık</h3>\n<p>Kuralın açıklaması.</p>\n<h4>Zar Tablosu</h4>\n<table><thead><tr><th>Zar</th><th>Sonuç</th></tr></thead><tbody><tr><td>1–9</td><td>Başarısız</td></tr><tr><td>10–19</td><td>Başarılı</td></tr><tr><td>20</td><td>Kritik başarı</td></tr></tbody></table>' },
    { id: 'sb-liste', cat: 'Bölüm Şablonları', bolum: true, ad: 'Listeli bölüm',
      html: '<h3>Başlık</h3>\n<p>Kuralın açıklaması.</p>\n<ul><li>Birinci madde</li><li>İkinci madde</li><li>Üçüncü madde</li></ul>' },
    { id: 'sb-bos', cat: 'Bölüm Şablonları', bolum: true, ad: 'Boş bölüm',
      html: '<p class="panel__soon">Bu bölümün kuralları yazım aşamasında.</p>' },

    { id: 'p',     cat: 'Metin', ad: 'Paragraf',        html: '<p>Metin…</p>' },
    { id: 'lede',  cat: 'Metin', ad: 'Giriş paragrafı', html: '<p class="lede">Giriş paragrafı…</p>' },
    { id: 'h3',    cat: 'Metin', ad: 'Başlık',          html: '<h3>Başlık</h3>' },
    { id: 'h4',    cat: 'Metin', ad: 'Alt başlık',      html: '<h4>Alt başlık</h4>' },
    { id: 'quote', cat: 'Metin', ad: 'Alıntı',          html: '<blockquote><p>Alıntı metni…</p></blockquote>' },
    { id: 'quote-src', cat: 'Metin', ad: 'Alıntı + kaynak',
      html: '<blockquote><p>Alıntı metni…</p><p><em>— Kaynak</em></p></blockquote>' },
    { id: 'vurgu', cat: 'Metin', ad: 'Vurgulu not',
      html: '<p><mark>Önemli:</mark> dikkat çekilmesi gereken not…</p>' },
    { id: 'qa', cat: 'Metin', ad: 'Soru & Cevap',
      html: '<h4>Soru başlığı?</h4>\n<p>Cevap metni…</p>' },

    { id: 'ul',    cat: 'Yapı', ad: 'Madde listesi', html: '<ul><li>Birinci madde</li><li>İkinci madde</li></ul>' },
    { id: 'ol',    cat: 'Yapı', ad: 'Sıralı liste',  html: '<ol><li>Birinci adım</li><li>İkinci adım</li></ol>' },
    { id: 'adim',  cat: 'Yapı', ad: 'Adım adım',
      html: '<h4>Nasıl yapılır</h4>\n<ol><li>Birinci adım</li><li>İkinci adım</li><li>Üçüncü adım</li></ol>' },
    { id: 'table', cat: 'Yapı', ad: 'Tablo',
      html: '<table><thead><tr><th>Başlık</th><th>Başlık</th></tr></thead><tbody><tr><td>Hücre</td><td>Hücre</td></tr><tr><td>Hücre</td><td>Hücre</td></tr></tbody></table>' },
    { id: 'dice',  cat: 'Yapı', ad: 'Zar tablosu',
      html: '<h4>Zar Tablosu</h4>\n<table><thead><tr><th>Zar</th><th>Sonuç</th></tr></thead><tbody><tr><td>1–9</td><td>Başarısız</td></tr><tr><td>10–19</td><td>Başarılı</td></tr><tr><td>20</td><td>Kritik başarı</td></tr></tbody></table>' },
    { id: 'nitelik', cat: 'Yapı', ad: 'Nitelik tablosu',
      html: '<table><thead><tr><th>Nitelik</th><th>Kısaltma</th><th>Açıklama</th></tr></thead><tbody><tr><td>Kuvvet</td><td>KUV</td><td>Fiziksel güç</td></tr><tr><td>Çeviklik</td><td>ÇEV</td><td>Hız ve denge</td></tr><tr><td>Zekâ</td><td>ZEK</td><td>Akıl yürütme</td></tr></tbody></table>' },
    { id: 'kunye', cat: 'Yapı', ad: 'Künye tablosu',
      html: '<h4>Künye</h4>\n<table><thead><tr><th>Özellik</th><th>Değer</th></tr></thead><tbody><tr><td>Menzil</td><td>30 m</td></tr><tr><td>Süre</td><td>1 tur</td></tr><tr><td>Bedel</td><td>2 enerji</td></tr></tbody></table>' },
    { id: 'card',  cat: 'Yapı', ad: 'Kural kartı',
      html: '<h4>Kural adı</h4>\n<p>Kuralın açıklaması.</p>\n<ul><li>Koşul ya da etki</li><li>Koşul ya da etki</li></ul>' },
    { id: 'tabs',  cat: 'Yapı', ad: 'Sekmeler',
      html: '<section class="tabs"><h4 class="tabs__title">Sekme 1</h4><div class="tabs__panel"><p>İlk sekmenin içeriği…</p></div><h4 class="tabs__title">Sekme 2</h4><div class="tabs__panel"><p>İkinci sekmenin içeriği…</p></div></section>',
      prev: '<span class="cvp__tabsprev"><span class="cvp__tabsbar"><b>Sekme 1</b><span>Sekme 2</span></span><span class="cvp__tabsbody"></span></span>' },
    { id: 'hr',    cat: 'Yapı', ad: 'Ayraç', html: '<hr>' },

    { id: 'img', cat: 'Görsel', ad: 'Görsel', pick: true,
      prev: '<span class="cvp__imgph"><svg viewBox="0 0 24 24"><rect x="3.5" y="4.5" width="17" height="15"/><circle cx="9" cy="10" r="1.6"/><path d="m5 17 4.5-4.5 3 3L16 12l4 4.5"/></svg></span>' },
    { id: 'img-cap', cat: 'Görsel', ad: 'Görsel + altyazı', pick: true, cap: true,
      prev: '<span class="cvp__imgph"><svg viewBox="0 0 24 24"><rect x="3.5" y="3.5" width="17" height="12.5"/><circle cx="9" cy="8" r="1.4"/><path d="m5 14 4-4 3 3 3.5-3.5L20 14"/><path d="M7 20h10"/></svg></span>' }
  ];
  var BLOCK_ADLAR = {
    P: 'Paragraf', H3: 'Başlık', H4: 'Alt başlık', UL: 'Madde listesi',
    OL: 'Sıralı liste', BLOCKQUOTE: 'Alıntı', TABLE: 'Tablo', HR: 'Ayraç', FIGURE: 'Görsel',
    SECTION: 'Sekmeler'
  };

  /* ---------------------------------------------------------------- yardımcı */
  function site() { return A.getSite(); }
  function cur() {
    var s = site();
    return s.surumler.filter(function (v) { return v.durum === 'simdiki'; })[0] || s.surumler[0];
  }
  function bolumler() {
    var s = site(), no = cur().no;
    if (!s.kurallar[no]) s.kurallar[no] = { bolumler: [] };
    return s.kurallar[no].bolumler;
  }
  function chById(id) {
    return bolumler().filter(function (c) { return c.id === id; })[0] || null;
  }
  function indexById(id) {
    var list = bolumler();
    for (var i = 0; i < list.length; i++) if (list[i].id === id) return i;
    return -1;
  }
  function nn(i) { return String(i + 1).padStart(2, '0'); }
  function elementChildren(el) {
    return Array.prototype.filter.call(el.childNodes, function (n) { return n.nodeType === 1; });
  }
  function richOf(chId) {
    var p = fdoc && fdoc.getElementById(chId);
    return p && p.querySelector('.panel__rich');
  }
  function blockLabel(el) {
    if (el.tagName === 'DIV' && el.classList.contains('table-wrap')) return 'Tablo';
    if (el.tagName === 'P' && el.classList.contains('lede')) return 'Giriş paragrafı';
    return BLOCK_ADLAR[el.tagName] || 'Blok';
  }

  /* -- sekmeler ------------------------------------------------------------
     Kök bloklardan biri <section class="tabs"> olabilir: h4.tabs__title +
     div.tabs__panel çiftleri (söz dağarcığı admin.js süzgecinde). Tuvalde
     sitedeki şeridin aynısı krom olarak üretilir (decorateTabs) — kayda hiç
     girmez, süzgeç düğmeleri zaten düşürür. Panel içi bloklar sel.sub ile
     adreslenir: {si: panel sırası, ci: panel içi blok sırası}. */
  function isTabsSection(el) {
    return el && el.nodeType === 1 && el.tagName === 'SECTION' && el.classList.contains('tabs');
  }
  function tabParts(sec) {
    var titles = [], panels = [];
    elementChildren(sec).forEach(function (el) {
      if (el.tagName === 'H4' && el.classList.contains('tabs__title')) titles.push(el);
      else if (el.tagName === 'DIV' && el.classList.contains('tabs__panel')) panels.push(el);
    });
    return { titles: titles, panels: panels };
  }
  function tabsKey(chId, bi) { return chId + ':' + bi; }
  function decorateTabs(chId) {
    var rich = richOf(chId);
    if (!rich) return;
    elementChildren(rich).forEach(function (secEl, bi) {
      if (!isTabsSection(secEl)) return;
      var old = secEl.querySelector('.cv-tabstrip');
      if (old) old.remove();
      var p = tabParts(secEl);
      if (!p.panels.length) return;
      var key = tabsKey(chId, bi);
      var ai = Math.max(0, Math.min(activeTabs[key] || 0, p.panels.length - 1));
      activeTabs[key] = ai;
      var strip = mk('div', 'tabs__list cv-tabstrip');
      strip.setAttribute('contenteditable', 'false');
      p.panels.forEach(function (pan, i) {
        var b = mk('button', 'tabs__tab' + (i === ai ? ' is-active' : ''),
                   p.titles[i] ? p.titles[i].textContent : 'Sekme ' + (i + 1));
        b.type = 'button';
        b.setAttribute('data-cvt', i);
        b.title = 'Tıkla: sekmeyi aç · çift tıkla: adını değiştir';
        strip.appendChild(b);
        pan.hidden = i !== ai;
      });
      var add = mk('button', 'cv-tabadd', '+');
      add.type = 'button';
      add.title = 'Sekme ekle';
      strip.appendChild(add);
      secEl.insertBefore(strip, secEl.firstChild);
    });
  }
  function decorateAllTabs() {
    if (page !== 'kurallar' || !fdoc) return;
    bolumler().forEach(function (ch) { decorateTabs(ch.id); });
  }
  function switchTab(chId, bi, ti) {
    activeTabs[tabsKey(chId, bi)] = ti;
    decorateTabs(chId);
    if (!editing) {
      var rich = richOf(chId);
      var secEl = rich && elementChildren(rich)[bi];
      if (secEl && isTabsSection(secEl)) {
        select({ type: 'blok', el: secEl, id: chId, bi: bi, label: 'Sekmeler' });
        return;
      }
    }
    renderInspector();
  }

  /* -- tablo sütunları -----------------------------------------------------
     Seçili tablo bloğunda sütun sınırlarına dikey tutamaçlar çizilir
     (updateColbar, tick döngüsünde). Sürükleme ilk kımıldamada TÜM sütunlara
     ölçülen %'leri yazar — böylece kurallar.css'in :has(…[style*="width"])
     kuralı tabloyu sabit düzene (table-layout:fixed) geçirir ve uzun içerik
     komşu sütunu artık sıkıştıramaz. Genişlikler ilk satırın hücrelerinde
     width:% olarak durur; süzgeç (th/td style → tEmit) yalnız bunu geçirir. */
  function selTableEl() {
    if (!sel || sel.type !== 'blok' || !sel.el || !sel.el.isConnected) return null;
    if (sel.el.tagName === 'TABLE') return sel.el;
    return sel.el.matches && sel.el.matches('div.table-wrap') ? sel.el.querySelector('table') : null;
  }
  function tableCols(table) {
    return table.rows.length ? Array.prototype.slice.call(table.rows[0].cells) : [];
  }
  function colWidthsPct(table) {
    var tw = table.getBoundingClientRect().width || 1;
    return tableCols(table).map(function (c) { return c.getBoundingClientRect().width / tw * 100; });
  }
  function applyColWidths(table, ws) {
    tableCols(table).forEach(function (c, i) {
      if (ws[i] != null) c.style.width = (Math.round(ws[i] * 10) / 10) + '%';
    });
  }
  function clearColWidths(table) {
    $$('th, td', table).forEach(function (c) {
      c.style.width = '';
      if (!c.getAttribute('style')) c.removeAttribute('style');
    });
  }
  function commitCols() {
    if (!sel) return;
    var id = sel.id, bi = sel.bi, sub = sel.sub || null;
    commitRichFromDom(id);
    selectBlock(id, bi, sub);
  }
  function updateColbar() {
    if (!colbar) return;
    var table = colGesture ? colGesture.table
      : (!editing && !pd && !gesture ? selTableEl() : null);
    if (!table || !table.isConnected || table.closest('[hidden]')) { colbar.style.display = 'none'; return; }
    var cells = tableCols(table);
    var need = cells.length - 1;
    if (need < 1) { colbar.style.display = 'none'; return; }
    while (colbar.children.length > need) colbar.removeChild(colbar.lastChild);
    while (colbar.children.length < need) {
      var hnd = mk('i');
      hnd.addEventListener('pointerdown', colDown);
      hnd.addEventListener('pointermove', colMove);
      hnd.addEventListener('pointerup', colUp);
      hnd.addEventListener('pointercancel', colUp);
      colbar.appendChild(hnd);
    }
    var tr = table.getBoundingClientRect();
    colbar.style.display = 'block';
    for (var i = 0; i < need; i++) {
      var hh = colbar.children[i];
      hh.setAttribute('data-k', i);
      hh.style.left = cells[i].getBoundingClientRect().right + 'px';
      hh.style.top = tr.top + 'px';
      hh.style.height = tr.height + 'px';
    }
  }
  function colDown(e) {
    if (e.button !== 0) return;
    var table = selTableEl();
    if (!table) return;
    e.preventDefault(); e.stopPropagation();
    colGesture = {
      table: table,
      k: +e.currentTarget.getAttribute('data-k'),
      x0: e.clientX,
      tw: table.getBoundingClientRect().width || 1,
      start: colWidthsPct(table),
      selInfo: { id: sel.id, bi: sel.bi, sub: sel.sub || null },
      moved: false
    };
    e.currentTarget.classList.add('is-on');
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch (err) {}
  }
  function colMove(e) {
    var cg = colGesture;
    if (!cg) return;
    var d = (e.clientX - cg.x0) / cg.tw * 100;
    if (!cg.moved && Math.abs(d) < 0.3) return;
    if (!cg.moved) {
      cg.moved = true;
      snapshot();
      applyColWidths(cg.table, cg.start);    // hepsi açık yazılır → sabit düzen
    }
    var ws = cg.start.slice();
    var l = cg.start[cg.k] + d, r = cg.start[cg.k + 1] - d;
    if (l < 5) { r -= 5 - l; l = 5; }
    if (r < 5) { l -= 5 - r; r = 5; }
    ws[cg.k] = l;
    ws[cg.k + 1] = r;
    applyColWidths(cg.table, ws);
  }
  function colUp(e) {
    var cg = colGesture;
    if (!cg) return;
    colGesture = null;
    e.currentTarget.classList.remove('is-on');
    if (!cg.moved) return;
    justDragged = true;
    setTimeout(function () { justDragged = false; }, 0);
    commitRichFromDom(cg.selInfo.id);
    selectBlock(cg.selInfo.id, cg.selInfo.bi, cg.selInfo.sub);
  }
  function escT(s) { var d = document.createElement('div'); d.textContent = String(s == null ? '' : s); return d.innerHTML; }
  function escA(s) { return escT(s).replace(/"/g, '&quot;'); }
  function mk(tag, cls, text) {
    var e = fdoc.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  /* ================================================================ geri al
     Yapısal işlemler (sırala/ekle/sil/görsel/başlık/metin onayı) öncesi model
     fotoğraflanır. Metnin harf harf geri alması tarayıcıya bırakılır. */
  function snapState() { return JSON.stringify({ b: bolumler(), tur: cur().tur }); }
  function snapshot() {
    undoStack.push(snapState());
    if (undoStack.length > 60) undoStack.shift();
    redoStack.length = 0;
    syncHist();
  }
  function applySnap(s) {
    var d = JSON.parse(s);
    var v = cur();
    v.tur = d.tur;
    site().kurallar[v.no].bolumler = d.b;
    A.markDirty('canvas');
    A.renderVersions(); A.renderKverSelect();
    renderRegions();
    syncHist();
  }
  function undo() {
    if (!undoStack.length) return;
    commitEditing();
    redoStack.push(snapState());
    applySnap(undoStack.pop());
  }
  function redo() {
    if (!redoStack.length) return;
    commitEditing();
    undoStack.push(snapState());
    applySnap(redoStack.pop());
  }
  function syncHist() {
    if (histU) histU.disabled = !undoStack.length;
    if (histR) histR.disabled = !redoStack.length;
  }

  /* ================================================================ üretim
     server.py gen_* aynası — sınıf iskeleti birebir; girinti/yorum DOM'da
     anlamsız olduğundan üretilmez. Kaydet yine sunucuda üretir. */
  function buildPanel(ch, i) {
    var no = nn(i);
    var art = mk('article', 'panel');
    art.id = ch.id;
    art.setAttribute('aria-labelledby', 'b' + no);
    art.tabIndex = -1;
    art.setAttribute('data-panel', '');
    var g = ch.gorsel;
    if (g) {
      var fig = mk('figure', 'panel__art');
      fig.setAttribute('aria-hidden', 'true');
      if (g.t) {
        var gst = A.tEmit(tFromRecord(g.t));
        if (gst) fig.setAttribute('style', gst);
      }
      var img = mk('img');
      img.setAttribute('src', g.img);
      img.setAttribute('width', g.w); img.setAttribute('height', g.h);
      img.setAttribute('alt', ''); img.setAttribute('decoding', 'async');
      img.setAttribute('data-parallax', '');
      if (g.webp) {
        var pic = mk('picture'), srcEl = mk('source');
        srcEl.setAttribute('srcset', g.webp); srcEl.setAttribute('type', 'image/webp');
        pic.appendChild(srcEl); pic.appendChild(img); fig.appendChild(pic);
      } else fig.appendChild(img);
      art.appendChild(fig);
    }
    var head = mk('header', 'panel__head');
    var pno = mk('p', 'panel__no', no);
    pno.setAttribute('aria-hidden', 'true');
    var h2 = mk('h2', 'panel__title', ch.baslik);
    h2.id = 'b' + no;
    if (ch.baslik_t) {
      var tst = A.tEmit(tFromRecord(ch.baslik_t));
      if (tst) h2.setAttribute('style', tst);
    }
    head.appendChild(pno); head.appendChild(h2);
    art.appendChild(head);
    var rich = mk('div', 'panel__rich');
    rich.innerHTML = ch.html || '';
    art.appendChild(rich);
    return art;
  }

  function renderKurallar() {
    var v = cur(), list = bolumler();
    var home = fdoc.querySelector('.rail__home');
    if (home) home.setAttribute('aria-label', 'SLVNZ ' + v.no + ' ' + v.tur + ' — başlık sayfası');
    var ver = fdoc.querySelector('.rail__ver'); if (ver) ver.textContent = v.no;
    var gen = fdoc.querySelector('.rail__genre'); if (gen) gen.textContent = v.tur;
    var cnt = fdoc.querySelector('.rail__count'); if (cnt) cnt.textContent = list.length + ' Bölüm';

    var ol = fdoc.querySelector('.toc__list');
    if (ol) {
      ol.innerHTML = '';
      list.forEach(function (ch, i) {
        var li = mk('li');
        var a = mk('a', 'toc__link');
        a.setAttribute('href', '#' + ch.id);
        var lab = mk('span', 'toc__label', ch.baslik);
        var no = mk('span', 'toc__no', nn(i));
        no.setAttribute('aria-hidden', 'true');
        a.appendChild(lab); a.appendChild(no);
        li.appendChild(a); ol.appendChild(li);
      });
    }

    var main = fdoc.querySelector('.rules__body');
    if (main) {
      $$('article.panel', main).forEach(function (p) { p.remove(); });
      list.forEach(function (ch, i) { main.appendChild(buildPanel(ch, i)); });
      decorateAllTabs();
    }
    ensureTocChrome();
    var keep = (shownId && list.some(function (c) { return c.id === shownId; }))
      ? shownId : (list[0] && list[0].id);
    showPanel(keep || null);
  }

  function renderIndex() {
    var s = site(), v = cur();
    var wm = fdoc.querySelector('.wordmark');
    if (wm) wm.setAttribute('aria-label', 'SLVNZ ' + v.no + ' — ' + v.tur);
    var lab = fdoc.querySelector('.wordmark__version-label');
    if (lab) { lab.textContent = v.no; lab.setAttribute('data-text', v.no); }
    var chip = fdoc.querySelector('.wordmark__version');
    if (chip) chip.setAttribute('aria-label', 'Sürüm ' + v.no + ' — sürüm seç');
    var gen = fdoc.querySelector('.wordmark__genre');
    if (gen) gen.textContent = v.tur;

    var menu = fdoc.querySelector('[data-version-menu]');
    if (menu) {
      menu.innerHTML = '';
      s.surumler.forEach(function (o) {
        var isCur = o.durum === 'simdiki', node;
        if (isCur) {
          node = mk('a', 'vmenu__item is-current');
          node.setAttribute('href', './'); node.setAttribute('aria-current', 'true');
        } else if (o.sayfa) {
          node = mk('a', 'vmenu__item'); node.setAttribute('href', o.sayfa);
        } else {
          node = mk('span', 'vmenu__item'); node.setAttribute('aria-disabled', 'true');
        }
        node.setAttribute('role', 'menuitem');
        node.appendChild(mk('span', 'vmenu__no', o.no));
        node.appendChild(mk('span', 'vmenu__name', o.tur));
        node.appendChild(mk('span', 'vmenu__tag', isCur ? 'şimdiki' : 'arşiv'));
        menu.appendChild(node);
      });
    }
  }

  function renderRegions() {
    if (!fdoc) return;
    if (page === 'kurallar') renderKurallar(); else renderIndex();
    reacquireSelection();
    renderInspector();
  }

  function showPanel(id) {
    shownId = id;
    $$('article.panel', fdoc).forEach(function (p) { p.hidden = p.id !== id; });
    $$('.toc__link', fdoc).forEach(function (a) {
      var on = a.getAttribute('href') === '#' + id;
      a.classList.toggle('is-active', on);
      if (on) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
    var sc = fdoc.querySelector('.rules__scroll');
    if (sc) sc.scrollTop = 0;
  }

  /* ================================================================ krom */
  var CHROME_CSS = [
    '.mist,.progress{display:none!important}',
    '[data-cv-box]{position:fixed;z-index:2147483000;pointer-events:none;box-sizing:border-box;display:none}',
    '[data-cv-box] .tag{position:absolute;top:-21px;left:-2px;font:600 10px/1.7 "Space Grotesk",system-ui,sans-serif;letter-spacing:.12em;text-transform:uppercase;padding:0 7px;white-space:nowrap}',
    '[data-cv-hover]{outline:1px dashed var(--accent);outline-offset:2px}',
    '[data-cv-hover] .tag{background:var(--accent);color:#fff;opacity:.85}',
    '[data-cv-hover].is-locked{outline-color:color-mix(in srgb,var(--ink) 40%,transparent)}',
    '[data-cv-hover].is-locked .tag{background:color-mix(in srgb,var(--ink) 60%,transparent)}',
    '[data-cv-sel]{outline:2px solid var(--accent);outline-offset:2px}',
    '[data-cv-sel] .tag{background:var(--accent);color:#fff}',
    '[contenteditable]{outline:none;caret-color:var(--accent);cursor:text}',
    '.cv-addch{display:block;width:100%;margin-top:14px;padding:9px 0;border:1px dashed color-mix(in srgb,var(--ink) 30%,transparent);background:none;color:var(--ink);font:500 11px/1 "Space Grotesk",system-ui,sans-serif;letter-spacing:.14em;text-transform:uppercase;cursor:pointer}',
    '.cv-addch:hover{border-color:var(--accent);color:var(--accent)}',
    '.toc__list li{cursor:grab}',
    '.toc__list li.cv-dragging{opacity:.35;cursor:grabbing}',
    '.toc__list li.cv-drop-before{box-shadow:0 -2px 0 var(--accent)}',
    '.toc__list li.cv-drop-after{box-shadow:0 2px 0 var(--accent)}',
    '.panel__rich:empty::before{content:"Ekle panelinden blok sürükle ya da çift tıklayıp yaz…";color:color-mix(in srgb,var(--ink) 45%,transparent);font-style:italic}',
    /* sekme şeridi tuval kromudur: kayda girmez, süzgeç düğmeleri düşürür */
    '.cv-tabstrip{cursor:default;-webkit-user-select:none;user-select:none}',
    '.cv-tabstrip .tabs__tab{cursor:pointer}',
    '.cv-tabstrip .tabs__tab[contenteditable]{cursor:text;outline:1px dashed var(--accent);outline-offset:2px}',
    '.cv-tabadd{appearance:none;background:none;border:1px dashed color-mix(in srgb,var(--ink) 30%,transparent);color:var(--ink);width:20px;height:20px;padding:0;margin:auto 0 5px 8px;line-height:1;font:600 13px/1 "Space Grotesk",system-ui,sans-serif;cursor:pointer}',
    '.cv-tabadd:hover{border-color:var(--accent);color:var(--accent)}',
    '.tabs__panel:not([hidden]):empty{min-height:2.2em}',
    '.tabs__panel:not([hidden]):empty::before{content:"Bu sekme boş — Ekle panelinden blok sürükle ya da çift tıklayıp yaz…";display:block;padding:.35em 0;color:color-mix(in srgb,var(--ink) 45%,transparent);font-style:italic}',
    '.cv-dropline{position:fixed;height:2px;background:var(--accent);z-index:2147483001;pointer-events:none;display:none}',
    /* tablo sütun sınırı tutamaçları: dikey çizgi, sürükle → genişlik */
    '.cv-colbar{display:none}',
    '.cv-colbar i{position:fixed;z-index:2147483001;width:9px;margin-left:-4.5px;cursor:col-resize;pointer-events:auto}',
    '.cv-colbar i::before{content:"";position:absolute;left:4px;top:0;bottom:0;width:1px;background:var(--accent);opacity:.25;transition:opacity .12s}',
    '.cv-colbar i:hover::before,.cv-colbar i.is-on::before{opacity:1;width:2px;left:3.5px}',
    '.cv-dropline::before{content:"";position:absolute;left:-3px;top:-3px;width:8px;height:8px;border-radius:50%;background:var(--accent)}',
    /* sitede şerit görseli tıklamaz (pointer-events:none) — tuvalde seçilebilsin */
    '.panel__art{pointer-events:auto!important}',
    /* dönüşüm kutusu: köşeler ölçek, kenarlar genişlik (blok), üst sap döndürme */
    '.cv-tbox{position:fixed;z-index:2147483002;pointer-events:none;display:none}',
    '.cv-tbox i{position:absolute;width:9px;height:9px;box-sizing:border-box;background:var(--paper);border:1.5px solid var(--accent);pointer-events:auto}',
    '.cv-tbox [data-h="nw"]{left:-5px;top:-5px;cursor:nwse-resize}',
    '.cv-tbox [data-h="ne"]{right:-5px;top:-5px;cursor:nesw-resize}',
    '.cv-tbox [data-h="se"]{right:-5px;bottom:-5px;cursor:nwse-resize}',
    '.cv-tbox [data-h="sw"]{left:-5px;bottom:-5px;cursor:nesw-resize}',
    '.cv-tbox [data-h="e"]{right:-5px;top:50%;margin-top:-5px;cursor:ew-resize}',
    '.cv-tbox [data-h="w"]{left:-5px;top:50%;margin-top:-5px;cursor:ew-resize}',
    '.cv-tbox [data-h="rot"]{left:50%;top:-30px;margin-left:-6px;width:12px;height:12px;border-radius:50%;cursor:grab}',
    '.cv-tbox::before{content:"";position:absolute;left:50%;top:-18px;width:1px;height:18px;background:var(--accent)}',
    '.cv-tbox.no-sides [data-h="e"],.cv-tbox.no-sides [data-h="w"]{display:none}',
    '.cv-moving,.cv-moving *{cursor:move!important}'
  ].join('\n');

  function makeBoxes() {
    hoverBox = mk('div'); hoverBox.setAttribute('data-cv-box', ''); hoverBox.setAttribute('data-cv-hover', '');
    hoverBox.innerHTML = '<span class="tag"></span>';
    selectBox = mk('div'); selectBox.setAttribute('data-cv-box', ''); selectBox.setAttribute('data-cv-sel', '');
    selectBox.innerHTML = '<span class="tag"></span>';
    dropline = mk('div', 'cv-dropline');
    colbar = mk('div', 'cv-colbar');
    tbox = mk('div', 'cv-tbox');
    tbox.innerHTML = ['nw', 'ne', 'se', 'sw', 'e', 'w', 'rot'].map(function (h) {
      return '<i data-h="' + h + '"></i>';
    }).join('');
    $$('i', tbox).forEach(function (h) {
      h.addEventListener('pointerdown', onHandleDown);
      h.addEventListener('pointermove', onHandleMove);
      h.addEventListener('pointerup', onHandleUp);
      h.addEventListener('pointercancel', onHandleUp);
    });
    fdoc.body.appendChild(hoverBox); fdoc.body.appendChild(selectBox);
    fdoc.body.appendChild(dropline); fdoc.body.appendChild(colbar);
    fdoc.body.appendChild(tbox);
  }
  function place(box, elx, label, locked) {
    if (!elx || !elx.isConnected || elx.closest('[hidden]')) { box.style.display = 'none'; return; }
    var r = elx.getBoundingClientRect();
    box.style.display = 'block';
    box.style.left = r.left + 'px'; box.style.top = r.top + 'px';
    box.style.width = r.width + 'px'; box.style.height = r.height + 'px';
    box.classList.toggle('is-locked', !!locked);
    box.querySelector('.tag').textContent = label || '';
  }
  function tick() {
    if (!active) return;
    if (fdoc && selectBox) {
      if (sel) place(selectBox, sel.el, sel.label);
      else selectBox.style.display = 'none';
      if (hover && (!sel || hover.el !== sel.el)) place(hoverBox, hover.el, hover.label, hover.type === 'locked');
      else hoverBox.style.display = 'none';
      if (tbox) {
        var on = sel && transformable(sel) && !editing &&
                 sel.el.isConnected && !sel.el.closest('[hidden]');
        if (on) {
          var r = sel.el.getBoundingClientRect();
          tbox.style.display = 'block';
          tbox.style.left = r.left + 'px';
          tbox.style.top = r.top + 'px';
          tbox.style.width = r.width + 'px';
          tbox.style.height = r.height + 'px';
          tbox.classList.toggle('no-sides', sel.type !== 'blok');
        } else tbox.style.display = 'none';
      }
      updateColbar();
    }
    rafId = requestAnimationFrame(tick);
  }
  function startLoop() { cancelAnimationFrame(rafId); rafId = requestAnimationFrame(tick); }

  function ensureTocChrome() {
    var nav = fdoc.querySelector('.toc');
    if (!nav || nav.querySelector('.cv-addch')) return;
    var b = mk('button', 'cv-addch', '+ Bölüm');
    b.type = 'button';
    nav.appendChild(b);
  }

  /* ================================================================ hedefler */
  function targetInfo(node) {
    if (node && node.nodeType !== 1) node = node.parentElement;
    if (!node || node.closest('[data-cv-box],.cv-addch,.cv-colbar')) return null;
    function q(s) { return node.closest(s); }
    var m;
    if (page === 'kurallar') {
      if ((m = q('.panel__title'))) return { type: 'title', el: m, id: m.closest('.panel').id, label: 'Bölüm başlığı' };
      if ((m = q('.panel__rich'))) {
        var pid = m.closest('.panel').id;
        // sekme şeridi (tuval kromu): düğmeler seçim değil sekme işlemidir
        var strip = node.closest('.cv-tabstrip');
        if (strip && m.contains(strip)) {
          var sec0 = strip.closest('section.tabs');
          var bi0 = elementChildren(m).indexOf(sec0);
          var abtn = node.closest('.cv-tabadd');
          if (abtn) return { type: 'tabadd', el: abtn, id: pid, bi: bi0, label: 'Sekme ekle' };
          var tbtn = node.closest('.tabs__tab');
          if (tbtn) return { type: 'tabbtn', el: tbtn, id: pid, bi: bi0, ti: +tbtn.getAttribute('data-cvt'), label: 'Sekme' };
          return { type: 'blok', el: sec0, id: pid, bi: bi0, label: 'Sekmeler' };
        }
        // sekme paneli içindeki blok: sel.sub {si, ci} ile adreslenir
        var pan = node.closest('.tabs__panel');
        if (pan && m.contains(pan)) {
          var secN = pan.closest('section.tabs');
          var biN = secN ? elementChildren(m).indexOf(secN) : -1;
          if (biN > -1) {
            var siN = tabParts(secN).panels.indexOf(pan);
            var blkN = node;
            while (blkN && blkN !== pan && blkN.parentElement !== pan) blkN = blkN.parentElement;
            if (siN > -1 && blkN && blkN !== pan && blkN.nodeType === 1) {
              var ciN = elementChildren(pan).indexOf(blkN);
              if (ciN > -1) return { type: 'blok', el: blkN, id: pid, bi: biN, sub: { si: siN, ci: ciN }, label: blockLabel(blkN) };
            }
            return { type: 'blok', el: secN, id: pid, bi: biN, label: 'Sekmeler' };
          }
        }
        var blk = node;
        while (blk && blk !== m && blk.parentElement !== m) blk = blk.parentElement;
        if (blk && blk !== m && blk.nodeType === 1) {
          var bi = elementChildren(m).indexOf(blk);
          if (bi > -1) return { type: 'blok', el: blk, id: pid, bi: bi, label: blockLabel(blk) };
        }
        return { type: 'rich', el: m, id: pid, label: 'Metin' };
      }
      if ((m = q('.panel__art'))) return { type: 'art', el: m, id: m.closest('.panel').id, label: 'Görsel' };
      if ((m = q('.toc__link'))) return { type: 'toc', el: m, id: (m.getAttribute('href') || '').slice(1), label: 'Bölüm' };
      if ((m = q('.rail__genre'))) return { type: 'genre', el: m, label: 'Tür' };
      if ((m = q('.rail__home'))) return { type: 'kimlik', el: m, label: 'Kimlik' };
      if ((m = q('.rail__count'))) return { type: 'locked', el: m, label: 'Otomatik' };
      if ((m = q('.eyebrow,.rail__title,.rail__list,.theme-toggle,.copyright,.rules__foot'))) return { type: 'locked', el: m, label: 'Kilitli' };
    } else {
      if ((m = q('.wordmark__genre'))) return { type: 'genre', el: m, label: 'Tür' };
      if ((m = q('.wordmark__slot'))) return { type: 'kimlik', el: m, label: 'Sürüm' };
      if ((m = q('.titleblock__art'))) return { type: 'locked', el: m, label: 'Kilitli' };
      if ((m = q('.mainnav,.wordmark__name,.eyebrow,.theme-toggle,.copyright'))) return { type: 'locked', el: m, label: 'Kilitli' };
    }
    return null;
  }
  function flashLocked() {
    var now = Date.now();
    if (now - lockedToastAt > 4000) {
      lockedToastAt = now;
      A.toast('Bu öğe sayfa şablonunun parçası — tuvalden düzenlenmez');
    }
  }

  function reacquireSelection() {
    if (!sel) return;
    var t = sel.type, id = sel.id, elx = null;
    if (page === 'kurallar') {
      if (t === 'blok') {
        var rich = id && richOf(id);
        var kids = rich ? elementChildren(rich) : [];
        if (sel.sub) {                 // sekme paneli içindeki blok
          var secEl = kids[Math.min(sel.bi, kids.length - 1)];
          if (isTabsSection(secEl)) {
            var pans = tabParts(secEl).panels;
            var pan = pans[Math.min(sel.sub.si, pans.length - 1)];
            var pk = pan ? elementChildren(pan) : [];
            elx = pk[Math.min(sel.sub.ci, pk.length - 1)] || null;
            if (elx) {
              sel.bi = kids.indexOf(secEl);
              sel.sub = { si: pans.indexOf(pan), ci: pk.indexOf(elx) };
              sel.label = blockLabel(elx);
            } else if (secEl) {        // panel boşaldı → bölümün kendisi
              elx = secEl;
              sel.bi = kids.indexOf(secEl);
              sel.sub = null;
              sel.label = 'Sekmeler';
            }
          } else sel.sub = null;
        }
        if (!elx) {
          elx = kids[Math.min(sel.bi, kids.length - 1)] || null;
          if (elx) { sel.bi = kids.indexOf(elx); sel.sub = null; sel.label = blockLabel(elx); }
        }
      } else if (t === 'title' || t === 'rich' || t === 'art') {
        var p = id && fdoc.getElementById(id);
        if (p) elx = p.querySelector(t === 'title' ? '.panel__title' : t === 'rich' ? '.panel__rich' : '.panel__art');
      } else if (t === 'toc') elx = fdoc.querySelector('.toc__link[href="#' + id + '"]');
      else if (t === 'genre') elx = fdoc.querySelector('.rail__genre');
      else if (t === 'kimlik') elx = fdoc.querySelector('.rail__home');
    } else {
      if (t === 'genre') elx = fdoc.querySelector('.wordmark__genre');
      else if (t === 'kimlik') elx = fdoc.querySelector('.wordmark__slot');
    }
    if (elx) sel.el = elx; else sel = null;
  }

  function select(info) {
    sel = info || null;
    renderInspector();
  }

  /* ================================================================ olaylar */
  function onHover(e) {
    if (gesture || pd) { hover = null; return; }
    if (editing && editing.el.contains(e.target)) { hover = null; return; }
    hover = targetInfo(e.target);
  }
  function onMousedown(e) {
    if (e.button !== 0) return;
    if (e.target.closest && e.target.closest('.cv-colbar')) { e.preventDefault(); return; }
    if (renaming) {
      if (renaming.btn.contains(e.target)) return;          // ad içinde imleç serbest
      commitTabRename(false);
    }
    if (e.target.closest && e.target.closest('.cv-tabstrip')) return;  // tık onClick'te
    if (editing && editing.el.contains(e.target)) return;   // metin seçimi serbest
    var info = targetInfo(e.target);
    if (info && info.type === 'toc' && !editing) {
      var li = info.el.closest('li');
      var lis = $$('li', li.parentNode);
      drag = { from: lis.indexOf(li), li: li, startY: e.clientY, moved: false, to: null };
    }
    if (transformable(info) && !editing) startGesture('move', info, e);
    if (info) e.preventDefault();  // görsel sürükleme / odak çalınması olmasın
    togglePalette(false);          // tuvale dokununca Ekle paleti kapanır
  }
  function onMousemove(e) {
    if (gesture) { gestureMove(e); return; }
    if (!drag) return;
    if (!drag.moved) {
      if (Math.abs(e.clientY - drag.startY) < 5) return;
      drag.moved = true;
      drag.li.classList.add('cv-dragging');
    }
    var lis = $$('li', drag.li.parentNode);
    clearDropMarks(lis);
    var to = lis.length;
    for (var i = 0; i < lis.length; i++) {
      var r = lis[i].getBoundingClientRect();
      if (e.clientY < r.top + r.height / 2) { to = i; break; }
    }
    drag.to = to;
    if (to < lis.length) lis[to].classList.add('cv-drop-before');
    else if (lis.length) lis[lis.length - 1].classList.add('cv-drop-after');
  }
  function onMouseup() {
    if (gesture) { endGesture(false); return; }
    if (!drag) return;
    var d = drag; drag = null;
    d.li.classList.remove('cv-dragging');
    clearDropMarks($$('li', d.li.parentNode));
    if (!d.moved || d.to == null) return;
    justDragged = true;
    setTimeout(function () { justDragged = false; }, 0);
    var to = d.to;
    if (to > d.from) to--;
    if (to !== d.from) reorderChapter(d.from, to);
  }
  function clearDropMarks(lis) {
    lis.forEach(function (li) { li.classList.remove('cv-drop-before', 'cv-drop-after'); });
  }

  function onClick(e) {
    var t = e.target;
    if (t.closest && t.closest('.cv-addch')) {
      e.preventDefault(); e.stopPropagation();
      addChapter();
      return;
    }
    if (justDragged) { e.preventDefault(); e.stopPropagation(); return; }
    // sekme şeridi: metin düzenleme açıkken de çalışır (krom contenteditable değil)
    if (t.closest && t.closest('.cv-tabstrip')) {
      e.preventDefault(); e.stopPropagation();
      if (renaming && !renaming.btn.contains(t)) commitTabRename(false);
      if (renaming) return;                       // ad düzenlenirken tık serbest
      var tinfo = targetInfo(t);
      if (tinfo && tinfo.type === 'tabbtn') switchTab(tinfo.id, tinfo.bi, tinfo.ti);
      else if (tinfo && tinfo.type === 'tabadd') addTab(tinfo.id, tinfo.bi);
      else if (tinfo && tinfo.type === 'blok') select(tinfo);
      return;
    }
    if (editing && editing.el.contains(t)) {
      if (t.closest('a')) e.preventDefault();  // düzenlenen metindeki bağ gezinmesin
      return;
    }
    var info = targetInfo(t);
    if (editing) commitEditing();
    e.preventDefault(); e.stopPropagation();
    if (!info) { select(null); return; }
    if (info.type === 'locked') { select(null); flashLocked(); return; }
    if (info.type === 'toc') { showPanel(info.id); select(info); renderInspector(); return; }
    if (sel && sel.el === info.el && (info.type === 'title' || info.type === 'rich' || info.type === 'genre')) {
      startEditing(info, e);
      return;
    }
    if (sel && sel.el === info.el && info.type === 'blok') {
      // seçili bloğa ikinci tık: bütün zengin alanı düzenlemeye geç, imleç yerinde
      startEditing({ type: 'rich', el: info.el.closest('.panel__rich'), id: info.id, label: 'Metin' }, e);
      return;
    }
    select(info);
  }
  function onDblclick(e) {
    var info = targetInfo(e.target);
    if (!info || (editing && editing.el === info.el)) return;
    if (info.type === 'tabbtn') {
      e.preventDefault(); e.stopPropagation();
      if (renaming && renaming.btn === info.el) return;
      if (editing) {
        commitEditing();                 // rich yeniden kurulur — düğmeyi tazele
        var secR = secAt(info.id, info.bi);
        var btnR = secR && secR.querySelector('.cv-tabstrip .tabs__tab[data-cvt="' + info.ti + '"]');
        if (!btnR) return;
        info = { type: 'tabbtn', el: btnR, id: info.id, bi: info.bi, ti: info.ti, label: 'Sekme' };
      }
      startTabRename(info);
      return;
    }
    if (info.type === 'tabadd') { e.preventDefault(); e.stopPropagation(); return; }
    if (info.type === 'blok') {
      info = { type: 'rich', el: info.el.closest('.panel__rich'), id: info.id, label: 'Metin' };
    }
    if (info.type === 'title' || info.type === 'rich' || info.type === 'genre') {
      e.preventDefault(); e.stopPropagation();
      if (editing) commitEditing();
      select(info);
      startEditing(info, e);
    }
  }

  function onFrameKey(e) {
    var k = (e.key || '').toLowerCase();
    if (gesture && e.key === 'Escape') { e.preventDefault(); endGesture(true); return; }
    if (renaming) {                     // sekme adı yazılırken tuval kısayolları sussun
      if (e.key === 'Enter') { e.preventDefault(); commitTabRename(false); }
      else if (e.key === 'Escape') { e.preventDefault(); commitTabRename(true); }
      return;
    }
    if ((e.ctrlKey || e.metaKey) && k === 's') { e.preventDefault(); A.save(); return; }
    if (editing) {
      if (e.key === 'Escape') { e.preventDefault(); commitEditing(); return; }
      if ((editing.type === 'title' || editing.type === 'genre') && e.key === 'Enter') {
        e.preventDefault(); commitEditing(); return;
      }
      if (editing.type === 'rich') {
        if ((e.ctrlKey || e.metaKey) && k === 'k') { e.preventDefault(); openLink(); return; }
        if (e.key === 'Tab') tabInTable(e);
      }
      return;
    }
    if ((e.ctrlKey || e.metaKey) && k === 'z' && !e.shiftKey) { e.preventDefault(); undo(); return; }
    if ((e.ctrlKey || e.metaKey) && (k === 'y' || (k === 'z' && e.shiftKey))) { e.preventDefault(); redo(); return; }
    if (e.key === 'Delete' && sel) {
      if (sel.type === 'blok') { e.preventDefault(); blockOp('del'); return; }
      if (sel.id && chById(sel.id)) { e.preventDefault(); deleteChapter(sel.id); return; }
    }
    if (e.key === 'Escape' && sel) select(null);
  }

  function onPaste(e) {
    if (!editing || editing.type !== 'rich' || !editing.el.contains(e.target)) return;
    e.preventDefault();
    var dt = e.clipboardData;
    var html = dt.getData('text/html');
    if (!html) {
      html = dt.getData('text/plain').split(/\n{2,}/).map(function (p) {
        return '<p>' + p.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\n/g, '<br>') + '</p>';
      }).join('');
    }
    fdoc.execCommand('insertHTML', false, A.sanitizeHTML(html));
    A.markDirty('canvas');
  }

  function onInput(e) {
    if (!editing) return;
    A.markDirty('canvas');
    if (editing.type === 'title') {
      var lab = fdoc.querySelector('.toc__link[href="#' + editing.id + '"] .toc__label');
      if (lab) lab.textContent = editing.el.textContent;
    }
  }

  /* ================================================================ düzenleme */
  function placeCaret(e) {
    if (!e || e.clientX == null) return;
    var r = null;
    if (fdoc.caretRangeFromPoint) r = fdoc.caretRangeFromPoint(e.clientX, e.clientY);
    else if (fdoc.caretPositionFromPoint) {
      var pos = fdoc.caretPositionFromPoint(e.clientX, e.clientY);
      if (pos) { r = fdoc.createRange(); r.setStart(pos.offsetNode, pos.offset); }
    }
    if (r) {
      var s = fwin.getSelection();
      s.removeAllRanges(); s.addRange(r);
    }
  }

  function startEditing(info, e) {
    if (info.type === 'title' || info.type === 'genre') {
      info.el.setAttribute('contenteditable', 'plaintext-only');
      if (info.el.contentEditable !== 'plaintext-only') info.el.setAttribute('contenteditable', 'true');
      editing = { type: info.type, el: info.el, id: info.id };
      info.el.focus();
      placeCaret(e);
      if (!e || e.type !== 'click') {              // programatik açılış: tümünü seç
        var r = fdoc.createRange(); r.selectNodeContents(info.el);
        var s = fwin.getSelection(); s.removeAllRanges(); s.addRange(r);
      }
    } else if (info.type === 'rich') {
      info.el.setAttribute('contenteditable', 'true');
      try {
        fdoc.execCommand('defaultParagraphSeparator', false, 'p');
        fdoc.execCommand('styleWithCSS', false, false);
      } catch (err) {}
      editing = { type: 'rich', el: info.el, id: info.id };
      info.el.focus();
      placeCaret(e);
      textbar.hidden = false;
      syncBar();
    }
    sel = info;
    renderInspector();
  }

  function commitEditing() {
    if (!editing) return;
    var ed = editing; editing = null;
    ed.el.removeAttribute('contenteditable');
    textbar.hidden = true;
    linkrow && linkrow.classList.remove('is-on');

    if (ed.type === 'title') {
      var ch = chById(ed.id);
      var txt = ed.el.textContent.replace(/\s+/g, ' ').trim();
      if (!ch) return;
      if (!txt) { ed.el.textContent = ch.baslik; A.toast('Başlık boş olamaz', true); }
      else if (txt !== ch.baslik) {
        snapshot();
        ch.baslik = txt;
        ed.el.textContent = txt;
        var lab = fdoc.querySelector('.toc__link[href="#' + ed.id + '"] .toc__label');
        if (lab) lab.textContent = txt;
        A.markDirty('canvas');
      } else ed.el.textContent = ch.baslik;
    } else if (ed.type === 'genre') {
      var v = cur();
      var t2 = ed.el.textContent.replace(/\s+/g, ' ').trim();
      if (!t2) { ed.el.textContent = v.tur; A.toast('Tür boş olamaz', true); }
      else if (t2 !== v.tur) {
        snapshot();
        v.tur = t2;
        A.markDirty('canvas');
        A.renderVersions(); A.renderKverSelect();
        renderRegions();
      }
    } else if (ed.type === 'rich') {
      var ch2 = chById(ed.id);
      if (ch2) {
        var html = A.serializeForSave(ed.el.innerHTML);
        if (html !== ch2.html) {
          snapshot();
          ch2.html = html;
          A.markDirty('canvas');
        }
        ed.el.innerHTML = ch2.html;   // kayda gidecek normalize hâli göster
        decorateTabs(ed.id);
      }
    }
    renderInspector();
  }

  /* ================================================================ yapısal */
  function addChapter(html, atIndex) {
    commitEditing();
    snapshot();
    var list = bolumler();
    var baslik = 'Yeni Bölüm';
    var ch = {
      id: A.slugify(baslik, list), baslik: baslik, gorsel: null,
      html: html || '<p class="panel__soon">Bu bölümün kuralları yazım aşamasında.</p>'
    };
    if (atIndex == null || atIndex < 0 || atIndex > list.length) atIndex = list.length;
    list.splice(atIndex, 0, ch);
    A.markDirty('canvas');
    renderRegions();
    showPanel(ch.id);
    var p = fdoc.getElementById(ch.id);
    var t = p && p.querySelector('.panel__title');
    if (t) {
      var info = { type: 'title', el: t, id: ch.id, label: 'Bölüm başlığı' };
      select(info);
      startEditing(info, null);
    }
  }
  function deleteChapter(id) {
    var i = indexById(id);
    if (i < 0) return;
    A.confirmDialog('"' + bolumler()[i].baslik + '" bölümü silinsin mi?').then(function (ok) {
      if (!ok) return;
      var j = indexById(id);       // diyalog beklerken sıra değişmiş olabilir
      if (j < 0) return;
      commitEditing();
      snapshot();
      bolumler().splice(j, 1);
      if (shownId === id) shownId = null;
      sel = null;
      A.markDirty('canvas');
      renderRegions();
    });
  }
  function moveChapter(id, d) {
    var i = indexById(id);
    var list = bolumler();
    if (i < 0 || i + d < 0 || i + d >= list.length) return;
    commitEditing();
    snapshot();
    var t = list[i]; list[i] = list[i + d]; list[i + d] = t;
    A.markDirty('canvas');
    renderRegions();
  }
  function reorderChapter(from, to) {
    commitEditing();
    snapshot();
    var list = bolumler();
    var ch = list.splice(from, 1)[0];
    list.splice(to, 0, ch);
    A.markDirty('canvas');
    shownId = ch.id;
    renderRegions();
    var a = fdoc.querySelector('.toc__link[href="#' + ch.id + '"]');
    if (a) select({ type: 'toc', el: a, id: ch.id, label: 'Bölüm' });
  }
  function setArt(id, g) {
    commitEditing();
    snapshot();
    var ch = chById(id);
    if (!ch) return;
    ch.gorsel = g;
    A.markDirty('canvas');
    renderRegions();
  }

  /* -- sekme işlemleri: DOM'da yap, modele serileştir ---------------------- */
  function secAt(chId, bi) {
    var rich = richOf(chId);
    var el = rich && elementChildren(rich)[bi];
    return isTabsSection(el) ? el : null;
  }
  function selectTabsSection(chId, bi) {
    var secEl = secAt(chId, bi);
    if (secEl) select({ type: 'blok', el: secEl, id: chId, bi: bi, label: 'Sekmeler' });
    else select(null);
  }
  function addTab(chId, bi) {
    var secEl = secAt(chId, bi);
    if (!secEl) return;
    commitEditing();
    snapshot();
    var n = tabParts(secEl).panels.length + 1;
    var h = mk('h4', 'tabs__title', 'Sekme ' + n);
    var d = mk('div', 'tabs__panel');
    d.innerHTML = '<p>Sekme içeriği…</p>';
    secEl.appendChild(h);
    secEl.appendChild(d);
    activeTabs[tabsKey(chId, bi)] = n - 1;
    commitRichFromDom(chId);
    selectTabsSection(chId, bi);
  }
  function moveTab(chId, bi, i, d) {
    var secEl = secAt(chId, bi);
    if (!secEl) return;
    var p = tabParts(secEl);
    var j = i + d;
    if (i < 0 || i >= p.panels.length || j < 0 || j >= p.panels.length) return;
    commitEditing();
    snapshot();
    var title = p.titles[i], pan = p.panels[i];
    if (d < 0) {
      secEl.insertBefore(title, p.titles[j]);
      secEl.insertBefore(pan, p.titles[j]);
    } else {
      secEl.insertBefore(title, p.panels[j].nextSibling);
      secEl.insertBefore(pan, title.nextSibling);
    }
    var key = tabsKey(chId, bi), ai = activeTabs[key] || 0;
    if (ai === i) activeTabs[key] = j;
    else if (ai === j) activeTabs[key] = i;
    commitRichFromDom(chId);
    selectTabsSection(chId, bi);
  }
  function deleteTab(chId, bi, i) {
    var secEl = secAt(chId, bi);
    if (!secEl) return;
    var p = tabParts(secEl);
    var pan = p.panels[i];
    if (!pan) return;
    var adM = p.titles[i] ? p.titles[i].textContent : 'Sekme ' + (i + 1);
    var bos = !pan.textContent.trim() && !pan.querySelector('img, table');
    var uygula = function () {
      var secEl2 = secAt(chId, bi);        // diyalog beklerken değişmiş olabilir
      if (!secEl2) return;
      var p2 = tabParts(secEl2);
      if (!p2.panels[i]) return;
      commitEditing();
      snapshot();
      if (p2.titles[i]) p2.titles[i].remove();
      p2.panels[i].remove();
      var key = tabsKey(chId, bi);
      activeTabs[key] = Math.max(0, Math.min(activeTabs[key] || 0, p2.panels.length - 2));
      // son sekme de gittiyse süzgeç bölümü tümden düşürür
      commitRichFromDom(chId);
      if (secAt(chId, bi)) selectTabsSection(chId, bi);
      else select(null);
    };
    if (bos) uygula();
    else A.confirmDialog('"' + adM + '" sekmesi içeriğiyle birlikte silinsin mi?').then(function (ok) { if (ok) uygula(); });
  }
  function renameTab(chId, bi, i, ad) {
    var secEl = secAt(chId, bi);
    if (!secEl) return;
    var t = tabParts(secEl).titles[i];
    if (!t) return;
    t.textContent = ad;
    commitRichFromDom(chId);
    // yazma sürerken inspector yeniden çizilmesin — seçimi elle tazele
    if (sel && sel.type === 'blok' && sel.id === chId && !sel.sub && sel.bi === bi) {
      var secEl2 = secAt(chId, bi);
      if (secEl2) sel.el = secEl2;
    }
  }

  /* şeritte çift tıkla ad düzenleme */
  function startTabRename(info) {
    commitTabRename(false);
    var btn = info.el;
    renaming = { btn: btn, chId: info.id, bi: info.bi, ti: info.ti, orig: btn.textContent };
    btn.setAttribute('contenteditable', 'plaintext-only');
    if (btn.contentEditable !== 'plaintext-only') btn.setAttribute('contenteditable', 'true');
    btn.focus();
    var r = fdoc.createRange();
    r.selectNodeContents(btn);
    var s = fwin.getSelection();
    s.removeAllRanges(); s.addRange(r);
  }
  function commitTabRename(cancel) {
    if (!renaming) return;
    var rn = renaming; renaming = null;
    rn.btn.removeAttribute('contenteditable');
    var ad = rn.btn.textContent.replace(/\s+/g, ' ').trim();
    if (cancel || !ad || ad === rn.orig) {
      rn.btn.textContent = rn.orig;
      return;
    }
    snapshot();
    renameTab(rn.chId, rn.bi, rn.ti, ad);
    selectTabsSection(rn.chId, rn.bi);
  }

  /* ================================================================ bloklar
     Zengin metnin kök çocukları "blok"tur: tek tık seçer, çift tık metni
     düzenlemeye geçer; taşı/çoğalt/sil işlemleri DOM'da yapılıp modele
     serileştirilir — süzgeç her işlemde çalıştığı için içerik hep temiz kalır. */
  function commitRichFromDom(chId) {
    var ch = chById(chId), rich = richOf(chId);
    if (!ch || !rich) return;
    ch.html = A.serializeForSave(rich.innerHTML);
    rich.innerHTML = ch.html;      // kayda gidecek normalize hâli göster
    decorateTabs(chId);
    A.markDirty('canvas');
  }

  function selectBlock(chId, bi, sub) {
    var rich = richOf(chId);
    var kids = rich ? elementChildren(rich) : [];
    if (sub) {                        // sekme paneli içindeki blok
      var secEl = kids[Math.max(0, Math.min(bi, kids.length - 1))];
      if (isTabsSection(secEl)) {
        var pans = tabParts(secEl).panels;
        var si = Math.max(0, Math.min(sub.si, pans.length - 1));
        var pk = pans[si] ? elementChildren(pans[si]) : [];
        if (pk.length) {
          var ci = Math.max(0, Math.min(sub.ci, pk.length - 1));
          select({ type: 'blok', el: pk[ci], id: chId, bi: kids.indexOf(secEl),
                   sub: { si: si, ci: ci }, label: blockLabel(pk[ci]) });
          return;
        }
        select({ type: 'blok', el: secEl, id: chId, bi: kids.indexOf(secEl), label: 'Sekmeler' });
        return;
      }
    }
    var el = kids[Math.max(0, Math.min(bi, kids.length - 1))];
    if (!el) { select(null); return; }
    select({ type: 'blok', el: el, id: chId, bi: kids.indexOf(el), label: blockLabel(el) });
  }

  function insertBlock(chId, pos, html) {
    // pos: sayı (kök sıra) ya da {bi, si, index} (sekme paneli içine)
    commitEditing();
    var rich = richOf(chId);
    if (!rich) return;
    snapshot();
    var cont = rich, index = pos, sub = null;
    if (pos && typeof pos === 'object') {
      var secEl = elementChildren(rich)[pos.bi];
      var pan = isTabsSection(secEl) ? tabParts(secEl).panels[pos.si] : null;
      if (pan) { cont = pan; index = pos.index; sub = { si: pos.si, ci: pos.index }; }
      else index = elementChildren(rich).length;      // hedef düştü → sona
    }
    var kids = elementChildren(cont);
    // gerçek içerik gelince "yazım aşamasında" yer tutucusu düşer
    if (cont === rich && kids.length === 1 && kids[0].matches('p.panel__soon')) {
      kids[0].remove();
      index = 0;
      kids = [];
    }
    var ref = kids[index] || null;
    var tmp = fdoc.createElement('div');
    tmp.innerHTML = html;
    while (tmp.firstChild) cont.insertBefore(tmp.firstChild, ref);
    commitRichFromDom(chId);
    if (shownId !== chId) showPanel(chId);
    if (sub) selectBlock(chId, pos.bi, sub);
    else selectBlock(chId, index);
  }

  function blockOp(op) {
    if (!sel || sel.type !== 'blok') return;
    var chId = sel.id, bi = sel.bi, sub = sel.sub || null;
    var rich = richOf(chId);
    if (!rich) return;
    var cont = rich, idx = bi;         // işlem kabı: kök ya da sekme paneli
    if (sub) {
      var secEl = elementChildren(rich)[bi];
      cont = isTabsSection(secEl) ? tabParts(secEl).panels[sub.si] : null;
      idx = sub.ci;
    }
    var kids = cont ? elementChildren(cont) : [];
    var el = kids[idx];
    if (!el) return;
    if (op === 'up' && idx === 0) return;
    if (op === 'down' && idx === kids.length - 1) return;
    commitEditing();
    snapshot();
    var nbi = idx;
    if (op === 'up') { cont.insertBefore(el, kids[idx - 1]); nbi = idx - 1; }
    else if (op === 'down') { cont.insertBefore(kids[idx + 1], el); nbi = idx + 1; }
    else if (op === 'dup') { el.insertAdjacentElement('afterend', el.cloneNode(true)); nbi = idx + 1; }
    else if (op === 'del') { el.remove(); nbi = -1; }
    else if (op === 'lede') {
      el.classList.toggle('lede');
      if (!el.getAttribute('class')) el.removeAttribute('class');
    }
    commitRichFromDom(chId);
    if (nbi < 0) {
      if (sub && secAt(chId, bi)) selectTabsSection(chId, bi);   // sekme bloğuna dön
      else select(null);
    } else if (sub) selectBlock(chId, bi, { si: sub.si, ci: nbi });
    else selectBlock(chId, nbi);
  }

  function figureHTML(g, cap) {
    return '<figure><img src="' + g.img + '" alt="" width="' + g.w + '" height="' + g.h +
           '" loading="lazy" decoding="async">' +
           (cap ? '<figcaption>Altyazı…</figcaption>' : '') + '</figure>';
  }

  function changeFigure() {
    if (!sel || sel.type !== 'blok') return;
    var chId = sel.id, bi = sel.bi, sub = sel.sub || null;
    A.openPicker(function (g) {
      var rich = richOf(chId);
      var el;
      if (sub) {
        var secEl = rich && elementChildren(rich)[bi];
        var pan = isTabsSection(secEl) ? tabParts(secEl).panels[sub.si] : null;
        el = pan && elementChildren(pan)[sub.ci];
      } else el = rich && elementChildren(rich)[bi];
      var img = el && el.querySelector('img');
      if (!img) return;
      commitEditing();
      snapshot();
      img.setAttribute('src', g.img);
      img.setAttribute('width', g.w);
      img.setAttribute('height', g.h);
      commitRichFromDom(chId);
      selectBlock(chId, bi, sub);
    });
  }

  /* ================================================================ dönüşüm
     Wix'teki serbest düzenleme: seçili öğe sürüklenince taşınır (translate),
     köşe tutamaçları ölçekler, kenarlar (blokta) genişliği değiştirir, üst
     sap döndürür; katman (z) inspector'dan. Kaynak DOM'daki kanonik style'dır
     (A.tParse/tEmit); kalıcılık — blok: ch.html içindeki style niteliği,
     şerit görseli: gorsel.t, başlık: baslik_t (server.py style_t üretir).
     Yani yayınlanan site dönüşümleri JS'siz, birebir gösterir. */
  function transformable(info) {
    return info && (info.type === 'blok' || info.type === 'art' || info.type === 'title');
  }
  function readT(el) { return A.tParse(el.getAttribute('style') || ''); }
  function writeT(el, t) {
    var s = A.tEmit(t);
    if (s) el.setAttribute('style', s); else el.removeAttribute('style');
  }
  function tRecord(t) {
    // model kaydı: yalnız sapmalar; tümü varsayılansa null (stil üretilmez)
    var r = {};
    if (Math.round(t.x)) r.x = Math.round(t.x);
    if (Math.round(t.y)) r.y = Math.round(t.y);
    if (Math.round(t.s * 1000) !== 1000) r.s = Math.round(t.s * 1000) / 1000;
    if (Math.round(t.r * 10)) r.r = Math.round(t.r * 10) / 10;
    if (t.z != null && Math.round(t.z)) r.z = Math.round(t.z);
    if (t.fs != null && t.fs >= 8 && t.fs <= 72) r.fs = Math.round(t.fs);
    ['tab', 'mob'].forEach(function (bp) {
      var l = t[bp];
      if (!l) return;
      var o = { x: Math.round(l.x || 0), y: Math.round(l.y || 0),
                s: Math.round((l.s != null ? l.s : 1) * 1000) / 1000,
                r: Math.round((l.r || 0) * 10) / 10 };
      if (l.w != null) o.w = Math.round(l.w * 10) / 10;
      r[bp] = o;
    });
    return Object.keys(r).length ? r : null;
  }
  function tFromRecord(rec) {
    rec = rec || {};
    function lay(o) {
      return o ? { x: o.x || 0, y: o.y || 0, s: o.s != null ? o.s : 1,
                   r: o.r || 0, w: o.w != null ? o.w : null } : null;
    }
    return { x: rec.x || 0, y: rec.y || 0, s: rec.s != null ? rec.s : 1,
             r: rec.r || 0, w: null, z: rec.z != null ? rec.z : null, a: null,
             fs: rec.fs != null ? rec.fs : null,
             tab: lay(rec.tab), mob: lay(rec.mob) };
  }

  /* -- kırılım katmanları -------------------------------------------------
     Tuvalin kırılım önizlemesi düzenleme hedefini de seçer: masaüstünde
     temel değerler, tablet/mobilde o kırılımın geçersiz kılması yazılır.
     Devralma Wix mantığı: mobil ← tablet ← masaüstü. Miras ile aynı değere
     dönen katman kendiliğinden silinir — stil temiz kalır. */
  var BP_AD = { base: 'Masaüstü', tab: 'Tablet', mob: 'Mobil' };
  function activeBp() { return bpW <= 640 ? 'mob' : (bpW <= 1160 ? 'tab' : 'base'); }
  function effOf(t, bp) {
    var e = { x: t.x, y: t.y, s: t.s, r: t.r, w: t.w };
    function use(l) {
      if (!l) return;
      e = { x: l.x, y: l.y, s: l.s, r: l.r, w: l.w != null ? l.w : e.w };
    }
    if (bp === 'tab' || bp === 'mob') use(t.tab);
    if (bp === 'mob') use(t.mob);
    return e;
  }
  function layerEq(a, b) {
    return Math.round(a.x) === Math.round(b.x) && Math.round(a.y) === Math.round(b.y) &&
           Math.round(a.s * 1000) === Math.round(b.s * 1000) &&
           Math.round(a.r * 10) === Math.round(b.r * 10) &&
           (a.w == null) === (b.w == null) &&
           (a.w == null || Math.round(a.w * 10) === Math.round(b.w * 10));
  }
  function setLayer(t, bp, e) {
    if (bp === 'base') { t.x = e.x; t.y = e.y; t.s = e.s; t.r = e.r; t.w = e.w; return t; }
    var inh = effOf(t, bp === 'mob' ? 'tab' : 'base');
    var layer = layerEq(e, inh) ? null :
      { x: Math.round(e.x), y: Math.round(e.y), s: Math.round(e.s * 1000) / 1000,
        r: Math.round(e.r * 10) / 10, w: e.w != null ? Math.round(e.w * 10) / 10 : null };
    if (bp === 'tab') t.tab = layer; else t.mob = layer;
    return t;
  }
  function applyEff(info, e) {
    var t = readT(info.el);
    setLayer(t, activeBp(), e);
    writeT(info.el, t);
  }

  function commitTransform(info, t) {
    var ch = chById(info.id);
    if (!ch) return;
    if (info.type === 'blok') {
      commitRichFromDom(info.id);
      selectBlock(info.id, info.bi, info.sub || null);
    } else if (info.type === 'art') {
      if (ch.gorsel) {
        var r = tRecord(t);
        if (r) ch.gorsel.t = r; else delete ch.gorsel.t;
      }
      A.markDirty('canvas');
      renderInspector();
    } else if (info.type === 'title') {
      var r2 = tRecord(t);
      if (r2) ch.baslik_t = r2; else delete ch.baslik_t;
      A.markDirty('canvas');
      renderInspector();
    }
  }

  function applyT(info, t) {
    writeT(info.el, t);
  }

  function resetTransform() {
    if (!sel || !transformable(sel)) return;
    commitEditing();
    snapshot();
    var t = readT(sel.el);
    // hizalama ve yazı boyutu dönüşüm değil — kalır; katmanlar dahil her şey temizlenir
    var clean = { x: 0, y: 0, s: 1, r: 0, w: null, z: null, a: t.a, fs: t.fs, tab: null, mob: null };
    writeT(sel.el, clean);
    commitTransform(sel, clean);
  }

  /* -- jest motoru -------------------------------------------------------- */
  function startGesture(kind, info, e) {
    var rect = info.el.getBoundingClientRect();
    gesture = {
      kind: kind, info: info, el: info.el,
      bp: activeBp(),                                // jest boyunca sabit
      origStyle: info.el.getAttribute('style'),      // iptal için ham hâl
      startEff: effOf(readT(info.el), activeBp()),
      x0: e.clientX, y0: e.clientY,
      cx: rect.left + rect.width / 2, cy: rect.top + rect.height / 2,
      parentW: info.type === 'blok' ? info.el.parentElement.offsetWidth : 0,
      baseW: info.el.offsetWidth,
      moved: false
    };
  }
  function gestureMove(e) {
    if (!gesture) return;
    var gS = gesture, st = gS.startEff;
    var dx = e.clientX - gS.x0, dy = e.clientY - gS.y0;
    if (!gS.moved && Math.hypot(dx, dy) < 3) return;
    if (!gS.moved) {
      gS.moved = true;
      snapshot();                       // jest başına tek geri alma adımı
      if (sel !== gS.info) select(gS.info);
      fdoc.documentElement.classList.add('cv-moving');
    }
    var eff = { x: st.x, y: st.y, s: st.s, r: st.r, w: st.w };
    if (gS.kind === 'move') {
      if (e.shiftKey) { if (Math.abs(dx) > Math.abs(dy)) dy = 0; else dx = 0; }
      eff.x = Math.round(st.x + dx);
      eff.y = Math.round(st.y + dy);
    } else if (gS.kind === 'rot') {
      var a0 = Math.atan2(gS.y0 - gS.cy, gS.x0 - gS.cx);
      var a1 = Math.atan2(e.clientY - gS.cy, e.clientX - gS.cx);
      var deg = st.r + (a1 - a0) * 180 / Math.PI;
      if (e.shiftKey) deg = Math.round(deg / 15) * 15;
      deg = ((deg + 180) % 360 + 360) % 360 - 180;
      eff.r = Math.round(deg * 10) / 10;
    } else if (gS.kind === 'e' || gS.kind === 'w') {
      var dwp = (gS.kind === 'e' ? dx : -dx) / (gS.parentW || 1) * 100;
      var w0 = st.w != null ? st.w : (gS.baseW / (gS.parentW || 1) * 100);
      eff.w = Math.max(10, Math.min(100, Math.round((w0 + dwp) * 10) / 10));
      if (eff.w >= 100) eff.w = null;
    } else {                            // köşe: merkez etrafında ölçek
      var d0 = Math.hypot(gS.x0 - gS.cx, gS.y0 - gS.cy) || 1;
      var d1 = Math.hypot(e.clientX - gS.cx, e.clientY - gS.cy);
      eff.s = Math.max(0.05, Math.min(20, Math.round(st.s * (d1 / d0) * 1000) / 1000));
    }
    var t = readT(gS.el);
    setLayer(t, gS.bp, eff);
    writeT(gS.el, t);
  }
  function endGesture(cancel) {
    if (!gesture) return;
    var gS = gesture; gesture = null;
    fdoc.documentElement.classList.remove('cv-moving');
    if (!gS.moved) return;
    justDragged = true;
    setTimeout(function () { justDragged = false; }, 0);
    if (cancel) {
      if (gS.origStyle) gS.el.setAttribute('style', gS.origStyle);
      else gS.el.removeAttribute('style');
      undoStack.pop(); syncHist();      // jest fotoğrafı boşa gitti
      return;
    }
    commitTransform(gS.info, readT(gS.el));
  }

  function onHandleDown(e) {
    if (e.button !== 0 || !sel || !transformable(sel)) return;
    e.preventDefault(); e.stopPropagation();
    startGesture(e.target.getAttribute('data-h'), sel, e);
    try { e.target.setPointerCapture(e.pointerId); } catch (err) {}
  }
  function onHandleMove(e) { if (gesture) { e.preventDefault(); gestureMove(e); } }
  function onHandleUp() { endGesture(false); }

  /* ================================================================ inspector */
  function renderInspector() {
    if (!insp) return;
    if (!ready) { insp.innerHTML = ''; return; }
    var v = cur(), list = bolumler();
    var h = '';

    var chSel = sel && sel.id && chById(sel.id);
    if (sel && sel.type === 'blok') {
      var rch = richOf(sel.id);
      var selIdx = sel.sub ? sel.sub.ci : sel.bi;      // kap içindeki sıra
      var nkids = 0;
      if (sel.sub) {
        var selSec = rch && elementChildren(rch)[sel.bi];
        var selPan = isTabsSection(selSec) ? tabParts(selSec).panels[sel.sub.si] : null;
        nkids = selPan ? elementChildren(selPan).length : 0;
      } else nkids = rch ? elementChildren(rch).length : 0;
      h += '<p class="cvi__type">Blok — ' + escT(sel.label) + (sel.sub ? ' <small>(sekme içinde)</small>' : '') + '</p>';
      h += '<div class="field"><span class="field__label">İşlem</span><div class="cvi__row">' +
           '<button type="button" class="iconbtn" data-cb-up aria-label="Yukarı taşı"' + (selIdx === 0 ? ' disabled' : '') + '>' + A.ICON.up + '</button>' +
           '<button type="button" class="iconbtn" data-cb-down aria-label="Aşağı taşı"' + (selIdx === nkids - 1 ? ' disabled' : '') + '>' + A.ICON.down + '</button>' +
           '<button type="button" class="btn" data-cb-dup>Çoğalt</button>' +
           '<button type="button" class="iconbtn iconbtn--danger" data-cb-del aria-label="Bloğu sil">' + A.ICON.x + '</button>' +
           '</div></div>';
      if (sel.el.tagName === 'P' && !sel.el.classList.contains('panel__soon')) {
        h += '<button type="button" class="btn btn--ghost" data-cb-lede>' +
             (sel.el.classList.contains('lede') ? 'Normal paragraf yap' : 'Giriş paragrafı yap') + '</button>';
      }
      if (sel.el.tagName === 'FIGURE') {
        h += '<button type="button" class="btn" data-cb-fig>Görseli değiştir</button>';
      }
      var iTbl = selTableEl();
      if (iTbl && tableCols(iTbl).length > 1) {
        h += '<div class="field"><span class="field__label">Sütun genişlikleri (%)</span>' +
             '<div class="cvi__colgrid">' + tableCols(iTbl).map(function (c, i) {
               var w = parseFloat((c.style && c.style.width) || '');
               return '<input class="field__input" type="number" data-cvc-w="' + i + '" value="' +
                      (isFinite(w) ? Math.round(w * 10) / 10 : '') +
                      '" min="5" max="95" step="1" placeholder="oto" aria-label="Sütun ' + (i + 1) + ' genişliği %">';
             }).join('') + '</div>' +
             '<div class="cvi__row"><button type="button" class="btn" data-cvc-esit>Eşit dağıt</button>' +
             '<button type="button" class="btn btn--ghost" data-cvc-oto>Otomatik</button></div></div>';
        h += '<p class="cvi__note">Tablodaki sütun sınırlarını sürükleyerek de boyutlandırabilirsin. Genişlik verilen tablo sabit düzene geçer — uzun metin komşu sütunu sıkıştırmaz.</p>';
      }
      if (isTabsSection(sel.el)) {
        var tp = tabParts(sel.el);
        var akey = tabsKey(sel.id, sel.bi);
        var ai2 = Math.max(0, Math.min(activeTabs[akey] || 0, tp.panels.length - 1));
        h += '<div class="field"><span class="field__label">Sekmeler</span>';
        tp.panels.forEach(function (pan, i) {
          h += '<div class="cvi__row cvi__tabrow' + (i === ai2 ? ' is-active' : '') + '">' +
            '<input class="field__input" data-cvt-name="' + i + '" value="' +
            escA(tp.titles[i] ? tp.titles[i].textContent : 'Sekme ' + (i + 1)) + '">' +
            '<button type="button" class="iconbtn" data-cvt-left="' + i + '" aria-label="Öne taşı"' + (i === 0 ? ' disabled' : '') + '>' + A.ICON.up + '</button>' +
            '<button type="button" class="iconbtn" data-cvt-right="' + i + '" aria-label="Sona taşı"' + (i === tp.panels.length - 1 ? ' disabled' : '') + '>' + A.ICON.down + '</button>' +
            '<button type="button" class="iconbtn iconbtn--danger" data-cvt-del="' + i + '" aria-label="Sekmeyi sil">' + A.ICON.x + '</button>' +
            '</div>';
        });
        h += '<button type="button" class="btn btn--ghost" data-cvt-add>+ Sekme ekle</button></div>';
        h += '<p class="cvi__note">Şeritte tıkla → sekmeyi aç · çift tıkla → adını yerinde değiştir · içerik açık sekmeye eklenir.</p>';
      } else {
        h += '<p class="cvi__note">Çift tıkla → metni yerinde düzenle · Del → bloğu sil · yeni blok için üstten <strong>Ekle</strong>.</p>';
      }
    } else if (chSel) {
      var i = indexById(sel.id), ch = list[i];
      h += '<p class="cvi__type">Bölüm ' + nn(i) + '</p>';
      h += '<div class="field"><label class="field__label" for="ci-baslik">Başlık</label>' +
           '<input class="field__input" id="ci-baslik" data-ci-baslik value="' + escA(ch.baslik) + '"></div>';
      h += '<div class="field"><span class="field__label">Kimlik</span><p class="cvi__ro">#' + escT(ch.id) + '</p></div>';
      h += '<div class="field"><span class="field__label">Görsel</span>' +
           '<span class="artrow__thumb">' + (ch.gorsel ? '<img src="/' + escA(ch.gorsel.img) + '" alt="">' : 'görsel yok') + '</span>' +
           '<div class="cvi__row"><button type="button" class="btn" data-ci-art>' + (ch.gorsel ? 'Değiştir' : 'Görsel seç') + '</button>' +
           (ch.gorsel ? '<button type="button" class="btn btn--ghost" data-ci-artclear>Kaldır</button>' : '') + '</div></div>';
      h += '<div class="field"><span class="field__label">Sıra</span><div class="cvi__row">' +
           '<button type="button" class="iconbtn" data-ci-up aria-label="Yukarı taşı"' + (i === 0 ? ' disabled' : '') + '>' + A.ICON.up + '</button>' +
           '<button type="button" class="iconbtn" data-ci-down aria-label="Aşağı taşı"' + (i === list.length - 1 ? ' disabled' : '') + '>' + A.ICON.down + '</button>' +
           '<button type="button" class="iconbtn iconbtn--danger" data-ci-del aria-label="Bölümü sil">' + A.ICON.x + '</button>' +
           '</div></div>';
      if (sel.type === 'rich') h += '<p class="cvi__note">Metni sayfanın üzerinde düzenle — biçim araçları üst çubukta belirir.</p>';
    } else {
      h += '<p class="cvi__type">' + (sel && (sel.type === 'kimlik' || sel.type === 'genre')
        ? 'Kimlik' : (page === 'index' ? 'Başlık Sayfası' : 'Oyun Kuralları')) + '</p>';
      h += '<div class="field"><span class="field__label">Sürüm No</span><p class="cvi__ro">' + escT(v.no) + '</p></div>';
      h += '<div class="field"><label class="field__label" for="ci-tur">Tür</label>' +
           '<input class="field__input" id="ci-tur" data-ci-tur value="' + escA(v.tur) + '"></div>';
      h += '<button type="button" class="btn btn--ghost" data-ci-vers>Sürümleri yönet</button>';
      if (page === 'kurallar') {
        h += '<hr class="cvi__sep"><p class="cvi__type">Bölümler</p><ol class="cvi__list">' +
          list.map(function (ch, i) {
            return '<li class="cvi__chrow">' +
              '<button type="button" class="cvi__ch' + (shownId === ch.id ? ' is-active' : '') +
              '" data-ci-ch="' + i + '"><span class="no">' + nn(i) + '</span><span class="t">' + escT(ch.baslik) + '</span></button>' +
              '<span class="cvi__chops">' +
              '<button type="button" class="iconbtn" data-ci-qup="' + i + '" aria-label="Yukarı taşı"' + (i === 0 ? ' disabled' : '') + '>' + A.ICON.up + '</button>' +
              '<button type="button" class="iconbtn" data-ci-qdown="' + i + '" aria-label="Aşağı taşı"' + (i === list.length - 1 ? ' disabled' : '') + '>' + A.ICON.down + '</button>' +
              '<button type="button" class="iconbtn iconbtn--danger" data-ci-qdel="' + i + '" aria-label="Bölümü sil">' + A.ICON.x + '</button>' +
              '</span></li>';
          }).join('') + '</ol>';
        h += '<button type="button" class="btn btn--ghost" data-ci-add>+ Bölüm ekle</button>';
      }
      h += '<hr class="cvi__sep"><p class="cvi__note">Tıkla: seç · tekrar tıkla ya da çift tıkla: yerinde düzenle · sağ menüde sürükle: sırala · Ctrl+Z geri al · Ctrl+S kaydet.</p>';
    }
    if (sel && transformable(sel)) h += transformHTML();
    insp.innerHTML = h;
    wireInspector();
  }

  function transformHTML() {
    var t = readT(sel.el);
    var bp = activeBp();
    var eff = effOf(t, bp);
    var hasOverride = (bp === 'tab' && t.tab) || (bp === 'mob' && t.mob);
    function fld(lab, key, val, extra) {
      return '<div class="field"><label class="field__label">' + lab + '</label>' +
             '<input type="number" class="field__input" data-ct="' + key + '" value="' + val + '"' + (extra || '') + '></div>';
    }
    var h = '<hr class="cvi__sep"><p class="cvi__type">Dönüşüm — ' + BP_AD[bp] + '</p>';
    if (bp !== 'base') {
      h += '<p class="cvi__note">' + (hasOverride
        ? 'Bu kırılımın kendi ayarı var; öteki kırılımlar etkilenmez.'
        : (bp === 'mob' ? 'Tabletten devralıyor' : 'Masaüstünden devralıyor') +
          ' — değiştirirsen yalnız ' + BP_AD[bp].toLowerCase() + ' için ayrışır.') + '</p>';
    }
    h += '<div class="cvi__grid2">' +
      fld('X (px)', 'x', eff.x, ' step="1"') +
      fld('Y (px)', 'y', eff.y, ' step="1"') +
      fld('Ölçek', 's', eff.s, ' step="0.05" min="0.05" max="20"') +
      fld('Açı (°)', 'r', eff.r, ' step="1" min="-360" max="360"');
    if (sel.type === 'blok') h += fld('Genişlik %', 'w', eff.w != null ? eff.w : '', ' step="1" min="10" max="100" placeholder="100"');
    if (sel.type === 'blok' || sel.type === 'title') {
      h += fld('Yazı boyutu (px)', 'fs', t.fs != null ? t.fs : '', ' step="1" min="8" max="72" placeholder="site"');
    }
    h += fld('Katman (z)', 'z', t.z != null ? t.z : '', ' step="1" min="-99" max="999" placeholder="0"');
    h += '</div><div class="cvi__row">' +
         '<button type="button" class="btn" data-ct-front>Bir öne</button>' +
         '<button type="button" class="btn" data-ct-back>Bir arkaya</button>' +
         '</div>';
    if (hasOverride) h += '<button type="button" class="btn btn--ghost" data-ct-clearbp>' + BP_AD[bp] + ' ayarını kaldır</button>';
    h += '<button type="button" class="btn btn--ghost" data-ct-reset>Dönüşümü sıfırla (tümü)</button>' +
         '<p class="cvi__note">Tuvalde sürükle: taşı · köşe: ölçek · üst sap: döndür' +
         (sel.type === 'blok' ? ' · kenar: genişlik' : '') + ' · Shift: eksene/15°ye kilitle. Katman (z) ve yazı boyutu tüm kırılımlarda ortaktır.</p>';
    return h;
  }

  function wireTransform() {
    var inputs = $$('[data-ct]', insp);
    if (!inputs.length) return;
    var snapDone = false;
    function ensureSnap() { if (!snapDone) { snapshot(); snapDone = true; } }
    inputs.forEach(function (inp) {
      inp.addEventListener('focus', ensureSnap);
      inp.addEventListener('input', function () {
        if (!sel || !transformable(sel)) return;
        ensureSnap();
        var t = readT(sel.el);
        var k = inp.getAttribute('data-ct');
        var v = parseFloat(inp.value);
        if (k === 'z') {                       // katman kırılımdan bağımsız
          t.z = (isFinite(v) && Math.round(v)) ? Math.round(v) : null;
          writeT(sel.el, t);
          return;
        }
        if (k === 'fs') {                      // yazı boyutu da kırılımdan bağımsız
          t.fs = isFinite(v) ? Math.max(8, Math.min(72, Math.round(v))) : null;
          writeT(sel.el, t);
          return;
        }
        var eff = effOf(t, activeBp());
        if (k === 'w') eff.w = (isFinite(v) && v >= 10 && v < 100) ? v : null;
        else if (isFinite(v)) eff[k] = k === 's' ? Math.max(0.05, Math.min(20, v)) : v;
        setLayer(t, activeBp(), eff);
        writeT(sel.el, t);
      });
      inp.addEventListener('change', function () {
        if (sel && transformable(sel)) commitTransform(sel, readT(sel.el));
      });
    });
    function zShift(d) {
      if (!sel || !transformable(sel)) return;
      ensureSnap();
      var t = readT(sel.el);
      t.z = (t.z || 0) + d;
      if (!t.z) t.z = null;
      writeT(sel.el, t);
      commitTransform(sel, t);
      if (sel) renderInspector();
    }
    var b;
    if ((b = $('[data-ct-front]', insp))) b.addEventListener('click', function () { zShift(1); });
    if ((b = $('[data-ct-back]', insp))) b.addEventListener('click', function () { zShift(-1); });
    if ((b = $('[data-ct-clearbp]', insp))) b.addEventListener('click', function () {
      if (!sel || !transformable(sel)) return;
      commitEditing();
      snapshot();
      var t = readT(sel.el);
      if (activeBp() === 'tab') t.tab = null;
      if (activeBp() === 'mob') t.mob = null;
      writeT(sel.el, t);
      commitTransform(sel, t);
      renderInspector();
    });
    if ((b = $('[data-ct-reset]', insp))) b.addEventListener('click', resetTransform);
  }

  function wireInspector() {
    var bi = $('[data-ci-baslik]', insp);
    if (bi && sel && sel.id) {
      var chId = sel.id, prev = null;
      bi.addEventListener('focus', function () { prev = chById(chId) && chById(chId).baslik; snapshot(); });
      bi.addEventListener('input', function () {
        var ch = chById(chId);
        if (!ch) return;
        ch.baslik = bi.value;
        var p = fdoc.getElementById(chId);
        var t = p && p.querySelector('.panel__title');
        if (t) t.textContent = bi.value;
        var lab = fdoc.querySelector('.toc__link[href="#' + chId + '"] .toc__label');
        if (lab) lab.textContent = bi.value;
        A.markDirty('canvas');
      });
      bi.addEventListener('blur', function () {
        var ch = chById(chId);
        if (ch && !ch.baslik.trim()) {
          ch.baslik = prev || 'Bölüm';
          A.toast('Başlık boş olamaz', true);
          renderRegions();
        }
      });
    }
    var ti = $('[data-ci-tur]', insp);
    if (ti) {
      var prevTur = null;
      ti.addEventListener('focus', function () { prevTur = cur().tur; snapshot(); });
      ti.addEventListener('input', function () {
        cur().tur = ti.value;
        var g = fdoc && fdoc.querySelector(page === 'kurallar' ? '.rail__genre' : '.wordmark__genre');
        if (g) g.textContent = ti.value;
        A.markDirty('canvas');
      });
      ti.addEventListener('blur', function () {
        if (!cur().tur.trim()) {
          cur().tur = prevTur || 'Fantazya';
          A.toast('Tür boş olamaz', true);
        }
        A.renderVersions(); A.renderKverSelect();
        renderRegions();
      });
    }
    var b;
    if ((b = $('[data-cb-up]', insp))) b.addEventListener('click', function () { blockOp('up'); });
    if ((b = $('[data-cb-down]', insp))) b.addEventListener('click', function () { blockOp('down'); });
    if ((b = $('[data-cb-dup]', insp))) b.addEventListener('click', function () { blockOp('dup'); });
    if ((b = $('[data-cb-del]', insp))) b.addEventListener('click', function () { blockOp('del'); });
    if ((b = $('[data-cb-lede]', insp))) b.addEventListener('click', function () { blockOp('lede'); });
    if ((b = $('[data-cb-fig]', insp))) b.addEventListener('click', changeFigure);
    // tablo sütun genişlikleri (seçili blok tablo iken)
    if (sel && sel.type === 'blok' && selTableEl()) {
      if ((b = $('[data-cvc-esit]', insp))) b.addEventListener('click', function () {
        var tbl = selTableEl();
        if (!tbl) return;
        commitEditing();
        snapshot();
        var n = tableCols(tbl).length;
        applyColWidths(tbl, tableCols(tbl).map(function () { return 100 / n; }));
        commitCols();
      });
      if ((b = $('[data-cvc-oto]', insp))) b.addEventListener('click', function () {
        var tbl = selTableEl();
        if (!tbl) return;
        commitEditing();
        snapshot();
        clearColWidths(tbl);
        commitCols();
      });
      $$('[data-cvc-w]', insp).forEach(function (inp) {
        var i = +inp.getAttribute('data-cvc-w');
        inp.addEventListener('focus', function () { snapshot(); });
        inp.addEventListener('change', function () {
          var tbl = selTableEl();
          if (!tbl) return;
          var cell = tableCols(tbl)[i];
          if (!cell) return;
          var v = parseFloat(inp.value);
          if (isFinite(v)) cell.style.width = Math.max(5, Math.min(95, v)) + '%';
          else { cell.style.width = ''; if (!cell.getAttribute('style')) cell.removeAttribute('style'); }
          commitCols();
        });
        inp.addEventListener('keydown', function (e) {
          if (e.key === 'Enter') { e.preventDefault(); inp.blur(); }
        });
      });
    }
    // sekme yöneticisi (seçili blok section.tabs iken)
    if (sel && sel.type === 'blok' && sel.id && isTabsSection(sel.el)) {
      var tChId = sel.id, tBi = sel.bi;
      if ((b = $('[data-cvt-add]', insp))) b.addEventListener('click', function () { addTab(tChId, tBi); });
      $$('[data-cvt-name]', insp).forEach(function (inp) {
        var i = +inp.getAttribute('data-cvt-name'), prevAd = null;
        inp.addEventListener('focus', function () {
          prevAd = inp.value;
          snapshot();
          // yazarken o sekme görünür kalsın — inspector'ı yeniden çizmeden
          activeTabs[tabsKey(tChId, tBi)] = i;
          decorateTabs(tChId);
          $$('.cvi__tabrow', insp).forEach(function (row, j) {
            row.classList.toggle('is-active', j === i);
          });
        });
        inp.addEventListener('input', function () {
          if (inp.value.trim()) renameTab(tChId, tBi, i, inp.value.trim());
        });
        inp.addEventListener('blur', function () {
          if (!inp.value.trim()) {
            var geri = prevAd || 'Sekme ' + (i + 1);
            inp.value = geri;
            renameTab(tChId, tBi, i, geri);
            A.toast('Sekme adı boş olamaz', true);
          }
        });
        inp.addEventListener('keydown', function (e) {
          if (e.key === 'Enter') { e.preventDefault(); inp.blur(); }
        });
      });
      $$('[data-cvt-left]', insp).forEach(function (btn) {
        btn.addEventListener('click', function () { moveTab(tChId, tBi, +btn.getAttribute('data-cvt-left'), -1); });
      });
      $$('[data-cvt-right]', insp).forEach(function (btn) {
        btn.addEventListener('click', function () { moveTab(tChId, tBi, +btn.getAttribute('data-cvt-right'), 1); });
      });
      $$('[data-cvt-del]', insp).forEach(function (btn) {
        btn.addEventListener('click', function () { deleteTab(tChId, tBi, +btn.getAttribute('data-cvt-del')); });
      });
    }
    if ((b = $('[data-ci-vers]', insp))) b.addEventListener('click', function () { A.switchView('surumler'); });
    if ((b = $('[data-ci-add]', insp))) b.addEventListener('click', function () { addChapter(); });
    if ((b = $('[data-ci-art]', insp))) b.addEventListener('click', function () {
      var id = sel.id;
      A.openPicker(function (g) { setArt(id, g); });
    });
    if ((b = $('[data-ci-artclear]', insp))) b.addEventListener('click', function () { setArt(sel.id, null); });
    if ((b = $('[data-ci-up]', insp))) b.addEventListener('click', function () { moveChapter(sel.id, -1); });
    if ((b = $('[data-ci-down]', insp))) b.addEventListener('click', function () { moveChapter(sel.id, 1); });
    if ((b = $('[data-ci-del]', insp))) b.addEventListener('click', function () { deleteChapter(sel.id); });
    $$('[data-ci-ch]', insp).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var ch = bolumler()[+btn.getAttribute('data-ci-ch')];
        if (!ch) return;
        showPanel(ch.id);
        var a = fdoc.querySelector('.toc__link[href="#' + ch.id + '"]');
        select(a ? { type: 'toc', el: a, id: ch.id, label: 'Bölüm' } : null);
      });
    });
    // liste satırı hızlı işlemleri: seçmeden taşı / sil
    $$('[data-ci-qup]', insp).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var ch = bolumler()[+btn.getAttribute('data-ci-qup')];
        if (ch) moveChapter(ch.id, -1);
      });
    });
    $$('[data-ci-qdown]', insp).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var ch = bolumler()[+btn.getAttribute('data-ci-qdown')];
        if (ch) moveChapter(ch.id, 1);
      });
    });
    $$('[data-ci-qdel]', insp).forEach(function (btn) {
      btn.addEventListener('click', function () {
        var ch = bolumler()[+btn.getAttribute('data-ci-qdel')];
        if (ch) deleteChapter(ch.id);
      });
    });
    wireTransform();
  }

  /* ================================================================ zengin metin
     admin.js'teki form editörünün tuval uyarlaması: komutlar iframe belgesinde
     çalışır, söz dağarcığı aynı süzgeç (A.sanitizeHTML / A.serializeForSave). */
  function exec(cmd, val) {
    if (!editing || editing.type !== 'rich') return;
    editing.el.focus();
    fdoc.execCommand(cmd, false, val);
    A.markDirty('canvas');
    syncBar();
  }
  function selNode() {
    if (!editing) return null;
    var s = fwin.getSelection();
    return (s.rangeCount && editing.el.contains(s.anchorNode)) ? s.anchorNode : null;
  }
  function closestIn(node, selr) {
    while (node && node !== editing.el) {
      if (node.nodeType === 1 && node.matches(selr)) return node;
      node = node.parentNode;
    }
    return null;
  }
  function toggleWrap(tagName) {
    var s = fwin.getSelection();
    if (!s.rangeCount || !editing || !editing.el.contains(s.anchorNode)) return;
    var hit = closestIn(s.anchorNode, tagName);
    if (hit) {
      var p = hit.parentNode;
      while (hit.firstChild) p.insertBefore(hit.firstChild, hit);
      p.removeChild(hit); p.normalize();
    } else {
      var r = s.getRangeAt(0);
      if (r.collapsed) return;
      var el = fdoc.createElement(tagName);
      el.appendChild(r.extractContents());
      r.insertNode(el);
      s.removeAllRanges();
      var nr = fdoc.createRange(); nr.selectNodeContents(el); s.addRange(nr);
    }
    A.markDirty('canvas'); syncBar();
  }
  function openLink() {
    if (!editing || editing.type !== 'rich') return;
    var s = fwin.getSelection();
    if (!s.rangeCount || !editing.el.contains(s.anchorNode)) return;
    savedRange = s.getRangeAt(0).cloneRange();
    var a = closestIn(s.anchorNode, 'a');
    linkrow.querySelector('input').value = a ? a.getAttribute('href') : '';
    linkrow.classList.add('is-on');
    linkrow.querySelector('input').focus();
  }
  function restoreSel() {
    if (!savedRange || !editing) return;
    editing.el.focus();
    var s = fwin.getSelection();
    s.removeAllRanges(); s.addRange(savedRange);
  }
  function closeLink() {
    linkrow.classList.remove('is-on');
    if (editing) editing.el.focus();
  }
  function applyLink() {
    var url = A.safeHref(linkrow.querySelector('input').value);
    if (!url) { A.toast('Bağlantı adresi geçersiz — https://, #bolum ya da sayfa.html olmalı', true); return; }
    restoreSel();
    var a = closestIn(fwin.getSelection().anchorNode, 'a');
    if (a && fwin.getSelection().isCollapsed) a.setAttribute('href', url);
    else fdoc.execCommand('createLink', false, url);
    closeLink(); A.markDirty('canvas');
  }
  function insertTable() {
    exec('insertHTML',
      '<table><thead><tr><th>Başlık</th><th>Başlık</th><th>Başlık</th></tr></thead>' +
      '<tbody><tr><td><br></td><td><br></td><td><br></td></tr>' +
      '<tr><td><br></td><td><br></td><td><br></td></tr></tbody></table><p><br></p>');
  }
  function cellIndex(cell) { return Array.prototype.indexOf.call(cell.parentNode.children, cell); }
  function tableOp(op) {
    var cell = closestIn(selNode(), 'td, th');
    if (!cell) return;
    var table = closestIn(cell, 'table');
    var row = cell.parentNode;
    var ci = cellIndex(cell);
    if (op === 'row+') {
      var tr = fdoc.createElement('tr');
      for (var i = 0; i < row.children.length; i++) tr.insertAdjacentHTML('beforeend', '<td><br></td>');
      var tb = table.tBodies[0] || table;
      (row.parentNode.tagName === 'THEAD' ? tb : row).insertAdjacentElement(
        row.parentNode.tagName === 'THEAD' ? 'afterbegin' : 'afterend', tr);
    } else if (op === 'row-') {
      if (row.parentNode.tagName === 'THEAD') return;
      var rows = table.tBodies[0] ? table.tBodies[0].rows.length : 0;
      if (rows <= 1) table.remove(); else row.remove();
    } else if (op === 'col+') {
      $$('tr', table).forEach(function (r) {
        var c = fdoc.createElement(r.parentNode.tagName === 'THEAD' ? 'th' : 'td');
        c.innerHTML = r.parentNode.tagName === 'THEAD' ? 'Başlık' : '<br>';
        r.children[ci].insertAdjacentElement('afterend', c);
      });
    } else if (op === 'col-') {
      if (row.children.length <= 1) table.remove();
      else $$('tr', table).forEach(function (r) { if (r.children[ci]) r.children[ci].remove(); });
    } else if (op === 'tdel') {
      table.remove();
    }
    A.markDirty('canvas'); syncBar();
  }
  function tabInTable(e) {
    var cell = closestIn(selNode(), 'td, th');
    if (!cell) return;
    e.preventDefault();
    var table = closestIn(cell, 'table');
    var cells = $$('th, td', table);
    var i = cells.indexOf(cell) + (e.shiftKey ? -1 : 1);
    if (i >= cells.length) {
      tableOp('row+');
      cells = $$('th, td', table);
      i = cells.indexOf(cell) + 1;
    }
    var next = cells[Math.max(0, i)];
    if (next) {
      var r = fdoc.createRange(); r.selectNodeContents(next); r.collapse(true);
      var s = fwin.getSelection(); s.removeAllRanges(); s.addRange(r);
    }
  }
  function syncBar() {
    if (!editing || editing.type !== 'rich') return;
    var node = selNode();
    if (!node) return;
    try {
      $('[data-cmd="bold"]', textbar).setAttribute('aria-pressed', fdoc.queryCommandState('bold'));
      $('[data-cmd="italic"]', textbar).setAttribute('aria-pressed', fdoc.queryCommandState('italic'));
      $('[data-cmd="underline"]', textbar).setAttribute('aria-pressed', fdoc.queryCommandState('underline'));
      $('[data-cmd="strike"]', textbar).setAttribute('aria-pressed', fdoc.queryCommandState('strikeThrough'));
      $('[data-cmd="sup"]', textbar).setAttribute('aria-pressed', fdoc.queryCommandState('superscript'));
      $('[data-cmd="sub"]', textbar).setAttribute('aria-pressed', fdoc.queryCommandState('subscript'));
      $('[data-cmd="align-left"]', textbar).setAttribute('aria-pressed', fdoc.queryCommandState('justifyLeft'));
      $('[data-cmd="align-center"]', textbar).setAttribute('aria-pressed', fdoc.queryCommandState('justifyCenter'));
      $('[data-cmd="align-right"]', textbar).setAttribute('aria-pressed', fdoc.queryCommandState('justifyRight'));
      $('[data-cmd="align-justify"]', textbar).setAttribute('aria-pressed', fdoc.queryCommandState('justifyFull'));
    } catch (e) {}
    $('[data-cmd="codetag"]', textbar).setAttribute('aria-pressed', !!closestIn(node, 'code'));
    $('[data-cmd="marktag"]', textbar).setAttribute('aria-pressed', !!closestIn(node, 'mark'));
    $('[data-cmd="linktag"]', textbar).setAttribute('aria-pressed', !!closestIn(node, 'a'));
    var b = closestIn(node, 'p, h3, h4, blockquote, li');
    var v = 'p';
    if (b) {
      if (b.tagName === 'H3') v = 'h3';
      else if (b.tagName === 'H4') v = 'h4';
      else if (b.tagName === 'BLOCKQUOTE' || closestIn(b, 'blockquote')) v = 'blockquote';
      else if (b.classList && b.classList.contains('lede')) v = 'lede';
    }
    blockSel.value = v;
    tablebarEl.classList.toggle('is-on', !!closestIn(node, 'table'));
  }

  function buildTextbar() {
    textbar.innerHTML = A.rteToolbarHTML();
    blockSel = $('[data-block]', textbar);
    linkrow = $('[data-linkrow]', textbar);
    tablebarEl = $('[data-tablebar]', textbar);
    var bar = $('.rte__bar', textbar);
    bar.addEventListener('mousedown', function (e) {
      if (e.target.closest('button')) e.preventDefault();   // iframe seçimi bozulmasın
    });
    bar.addEventListener('click', function (e) {
      var b = e.target.closest('[data-cmd]');
      if (!b) return;
      var c = b.getAttribute('data-cmd');
      if (c === 'undo' || c === 'redo' || c === 'bold' || c === 'italic' || c === 'underline') exec(c);
      else if (c === 'strike') exec('strikeThrough');
      else if (c === 'sup') exec('superscript');
      else if (c === 'sub') exec('subscript');
      else if (c === 'align-left') exec('justifyLeft');
      else if (c === 'align-center') exec('justifyCenter');
      else if (c === 'align-right') exec('justifyRight');
      else if (c === 'align-justify') exec('justifyFull');
      else if (c === 'ul') exec('insertUnorderedList');
      else if (c === 'ol') exec('insertOrderedList');
      else if (c === 'hr') exec('insertHTML', '<hr><p><br></p>');
      else if (c === 'clear') { exec('removeFormat'); exec('unlink'); }
      else if (c === 'codetag') toggleWrap('code');
      else if (c === 'marktag') toggleWrap('mark');
      else if (c === 'linktag') openLink();
      else if (c === 'table') insertTable();
      else tableOp(c);
    });
    blockSel.addEventListener('change', function () {
      if (!editing || editing.type !== 'rich') return;
      var v = blockSel.value;
      editing.el.focus();
      if (v === 'lede') {
        fdoc.execCommand('formatBlock', false, 'p');
        var b2 = closestIn(selNode(), 'p');
        if (b2) b2.className = 'lede';
      } else {
        fdoc.execCommand('formatBlock', false, v);
        var p = closestIn(selNode(), 'p');
        if (p && v === 'p') p.removeAttribute('class');
      }
      A.markDirty('canvas'); syncBar();
    });
    $('[data-link-apply]', textbar).addEventListener('click', applyLink);
    $('[data-link-remove]', textbar).addEventListener('click', function () {
      restoreSel(); fdoc.execCommand('unlink'); closeLink(); A.markDirty('canvas');
    });
    $('[data-link-cancel]', textbar).addEventListener('click', closeLink);
    linkrow.querySelector('input').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); applyLink(); }
      if (e.key === 'Escape') closeLink();
    });
  }

  /* ================================================================ palet
     Kartlar tıklanınca mantıklı yere eklenir (seçili bloğun altı ya da bölümün
     sonu); sürüklenince pointer capture parent'ta kalır, koordinat iframe'in
     ölçeğine çevrilip bırakma yeri canlı çizilir. Bölüm şablonları sağ
     menünün (toc) üstüne, içerik blokları zengin metnin içine bırakılır. */
  function blkById(id) {
    return BLOCKS.filter(function (b) { return b.id === id; })[0] || null;
  }

  function buildPalette() {
    var pal = $('[data-cv-palette]');
    var cats = [], byCat = {};
    BLOCKS.forEach(function (b) {
      if (!byCat[b.cat]) { byCat[b.cat] = []; cats.push(b.cat); }
      byCat[b.cat].push(b);
    });
    pal.innerHTML = cats.map(function (c) {
      return '<p class="cvp__cat">' + escT(c) + '</p><div class="cvp__grid">' +
        byCat[c].map(function (b) {
          return '<button type="button" class="cvp__card' + (b.bolum ? ' cvp__card--wide' : '') +
            '" data-cvp="' + b.id + '" title="Tıkla: sona ekle · sürükle: yerine bırak">' +
            '<span class="cvp__prev"><span class="panel__rich">' + (b.prev || b.html) + '</span></span>' +
            '<span class="cvp__name">' + escT(b.ad) + '</span></button>';
        }).join('') + '</div>';
    }).join('');
    $$('.cvp__card', pal).forEach(function (card) {
      card.addEventListener('pointerdown', palDown);
      card.addEventListener('pointermove', palMove);
      card.addEventListener('pointerup', palUp);
      card.addEventListener('pointercancel', palCancel);
    });
  }

  function sizePalettePreviews() {
    // içerik 0.5 ölçekli; kutu ölçekli boyu TAM gösterir — kesilme olmaz.
    // Palet gizliyken ölçüler 0 döner, o yüzden her açılışta çağrılır.
    $$('.cvp__prev').forEach(function (pv) {
      var inner = pv.firstElementChild;
      if (inner && inner.offsetHeight) pv.style.height = (Math.ceil(inner.offsetHeight * 0.5) + 3) + 'px';
    });
  }

  function togglePalette(force) {
    var pal = $('[data-cv-palette]');
    var btn = $('[data-cv-addbtn]');
    if (!pal || !btn) return;
    var show = force != null ? force : pal.hidden;
    if (!pal.hidden === show) return;
    pal.hidden = !show;
    btn.classList.toggle('is-active', show);
    btn.setAttribute('aria-expanded', String(show));
    if (show) {
      sizePalettePreviews();
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(sizePalettePreviews);
    }
  }

  function palDown(e) {
    if (e.button !== 0) return;
    e.preventDefault();
    var card = e.currentTarget;
    pd = { blk: blkById(card.getAttribute('data-cvp')), x0: e.clientX, y0: e.clientY,
           moved: false, ghost: null, target: null };
    try { card.setPointerCapture(e.pointerId); } catch (err) {}
  }
  function palMove(e) {
    if (!pd) return;
    if (!pd.moved) {
      if (Math.hypot(e.clientX - pd.x0, e.clientY - pd.y0) < 6) return;
      pd.moved = true;
      pd.ghost = document.createElement('div');
      pd.ghost.className = 'cv-ghost';
      pd.ghost.textContent = pd.blk.ad;
      document.body.appendChild(pd.ghost);
    }
    pd.ghost.style.left = (e.clientX + 14) + 'px';
    pd.ghost.style.top = (e.clientY + 12) + 'px';
    pd.target = dropTargetAt(pd.blk, e.clientX, e.clientY);
    showDropHint(pd.target);
  }
  function palUp(e) {
    if (!pd) return;
    var p = pd; pd = null;
    if (p.ghost) p.ghost.remove();
    showDropHint(null);
    if (!p.moved) { paletteClick(p.blk); return; }
    if (p.target) dropInsert(p.blk, p.target);
  }
  function palCancel() {
    if (!pd) return;
    if (pd.ghost) pd.ghost.remove();
    pd = null;
    showDropHint(null);
  }

  function dropTargetAt(blk, px, py) {
    if (!fdoc || page !== 'kurallar') return null;
    var fr = frame.getBoundingClientRect();
    if (px < fr.left || px > fr.right || py < fr.top || py > fr.bottom) return null;
    var s = fr.width / frame.offsetWidth;      // tuval ölçeği
    var ix = (px - fr.left) / s, iy = (py - fr.top) / s;
    var el = fdoc.elementFromPoint(ix, iy);
    if (!el) return null;
    if (blk.bolum) {
      if (!el.closest('.toc')) return null;
      var lis = $$('.toc__list li', fdoc);
      var idx = lis.length;
      for (var i = 0; i < lis.length; i++) {
        var r = lis[i].getBoundingClientRect();
        if (iy < r.top + r.height / 2) { idx = i; break; }
      }
      return { kind: 'toc', index: idx };
    }
    var rich = el.closest('.panel__rich');
    if (!rich) {
      var panel = el.closest('article.panel');
      if (!panel) return null;
      rich = panel.querySelector('.panel__rich');
      return { kind: 'rich', chId: panel.id, cont: rich, pos: elementChildren(rich).length };
    }
    // açık sekme panelinin içine bırakma (sekme bloğunun kendisi hariç)
    var pan = el.closest('.tabs__panel');
    if (pan && rich.contains(pan) && blk.id !== 'tabs') {
      var secEl = pan.closest('section.tabs');
      var biT = elementChildren(rich).indexOf(secEl);
      var siT = secEl ? tabParts(secEl).panels.indexOf(pan) : -1;
      if (biT > -1 && siT > -1) {
        var pkids = elementChildren(pan);
        var idxT = pkids.length;
        for (var q2 = 0; q2 < pkids.length; q2++) {
          var rq = pkids[q2].getBoundingClientRect();
          if (iy < rq.top + rq.height / 2) { idxT = q2; break; }
        }
        return { kind: 'rich', chId: rich.closest('.panel').id, cont: pan,
                 pos: { bi: biT, si: siT, index: idxT } };
      }
    }
    var kids = elementChildren(rich);
    var idx2 = kids.length;
    for (var j = 0; j < kids.length; j++) {
      var rr = kids[j].getBoundingClientRect();
      if (iy < rr.top + rr.height / 2) { idx2 = j; break; }
    }
    return { kind: 'rich', chId: rich.closest('.panel').id, cont: rich, pos: idx2 };
  }

  function showDropHint(t) {
    if (!fdoc) return;
    $$('.toc__list li', fdoc).forEach(function (li) {
      li.classList.remove('cv-drop-before', 'cv-drop-after');
    });
    if (!t) { if (dropline) dropline.style.display = 'none'; return; }
    if (t.kind === 'toc') {
      dropline.style.display = 'none';
      var lis = $$('.toc__list li', fdoc);
      if (!lis.length) return;
      if (t.index < lis.length) lis[t.index].classList.add('cv-drop-before');
      else lis[lis.length - 1].classList.add('cv-drop-after');
      return;
    }
    var rr = t.cont.getBoundingClientRect();
    var kids = elementChildren(t.cont);
    var idx = typeof t.pos === 'object' ? t.pos.index : t.pos;
    var y;
    if (!kids.length) y = rr.top + 10;
    else if (idx < kids.length) y = kids[idx].getBoundingClientRect().top - 7;
    else y = kids[kids.length - 1].getBoundingClientRect().bottom + 7;
    dropline.style.display = 'block';
    dropline.style.left = rr.left + 'px';
    dropline.style.width = rr.width + 'px';
    dropline.style.top = y + 'px';
  }

  function insertPos(chId) {
    if (sel && sel.type === 'blok' && sel.id === chId) {
      if (sel.sub) return { bi: sel.bi, si: sel.sub.si, index: sel.sub.ci + 1 };
      if (isTabsSection(sel.el)) {                    // sekme bloğu seçili → açık sekmenin sonuna
        var pans = tabParts(sel.el).panels;
        var si = Math.max(0, Math.min(activeTabs[tabsKey(chId, sel.bi)] || 0, pans.length - 1));
        if (pans[si]) return { bi: sel.bi, si: si, index: elementChildren(pans[si]).length };
      }
      return sel.bi + 1;
    }
    var rich = richOf(chId);
    return rich ? elementChildren(rich).length : 0;
  }

  function paletteClick(blk) {
    if (page !== 'kurallar') {
      A.toast('Bloklar Oyun Kuralları tuvaline eklenir — üstten sayfayı değiştir', true);
      return;
    }
    if (blk.bolum) { addChapter(blk.html); return; }
    var chId = shownId;
    if (!chId) { A.toast('Önce bir bölüm aç — sağ menüden seç ya da bölüm şablonu ekle', true); return; }
    if (blk.pick) {
      A.openPicker(function (g) { insertBlock(chId, insertPos(chId), figureHTML(g, blk.cap)); });
      return;
    }
    var pos = insertPos(chId);
    if (blk.id === 'tabs' && pos && typeof pos === 'object') pos = pos.bi + 1;  // sekme sekmeye girmez
    insertBlock(chId, pos, blk.html);
  }

  function dropInsert(blk, t) {
    if (t.kind === 'toc') {
      addChapter(blk.html, t.index);
      return;
    }
    if (blk.pick) {
      A.openPicker(function (g) { insertBlock(t.chId, t.pos, figureHTML(g, blk.cap)); });
      return;
    }
    insertBlock(t.chId, t.pos, blk.html);
  }

  /* ================================================================ sahne */
  function fitStage() {
    if (!stage || !framewrap) return;
    var r = stage.getBoundingClientRect();
    var availW = Math.max(120, r.width - 28);
    var availH = Math.max(120, r.height - 28);
    var scale = Math.min(1, availW / bpW);
    framewrap.style.width = bpW + 'px';
    framewrap.style.height = (availH / scale) + 'px';
    framewrap.style.transform = 'scale(' + scale + ')';
    if (zoomEl) zoomEl.textContent = '%' + Math.round(scale * 100);
  }

  function setPage(pg) {
    if (pg === page && booted) return;
    commitEditing();
    sel = null; hover = null; shownId = null;
    page = pg;
    $$('[data-cv-page]').forEach(function (b) {
      b.classList.toggle('is-active', b.getAttribute('data-cv-page') === pg);
    });
    frame.src = '/' + (pg === 'index' ? 'index.html' : 'kurallar.html') + '?edit=1';
  }

  /* ================================================================ iframe */
  function instrument() {
    fdoc = frame.contentDocument;
    fwin = frame.contentWindow;
    if (!fdoc || !fdoc.querySelector('main')) return;   // about:blank vb.
    fdoc.documentElement.classList.add('js');
    var st = fdoc.createElement('style');
    st.textContent = CHROME_CSS;
    fdoc.head.appendChild(st);
    makeBoxes();
    fdoc.addEventListener('mouseover', onHover, true);
    fdoc.addEventListener('mousedown', onMousedown, true);
    fdoc.addEventListener('mousemove', onMousemove, true);
    fdoc.addEventListener('mouseup', onMouseup, true);
    fdoc.addEventListener('click', onClick, true);
    fdoc.addEventListener('dblclick', onDblclick, true);
    fdoc.addEventListener('keydown', onFrameKey, true);
    fdoc.addEventListener('paste', onPaste, true);
    fdoc.addEventListener('input', onInput, true);
    fdoc.addEventListener('selectionchange', function () {
      if (editing && editing.type === 'rich') syncBar();
    });
    fdoc.documentElement.addEventListener('mouseleave', function () { hover = null; });
    renderRegions();
    fitStage();
  }

  /* ================================================================ açılış */
  function boot() {
    if (booted) return;
    booted = true;
    buildTextbar();

    // üst çubuğa yapısal geri al / yinele
    var top = $('.cv__top');
    var hist = document.createElement('div');
    hist.className = 'cv__hist';
    hist.innerHTML =
      '<button type="button" class="iconbtn" data-cv-undo aria-label="Geri al" title="Ctrl+Z" disabled>' + A.ICON.undo + '</button>' +
      '<button type="button" class="iconbtn" data-cv-redo aria-label="Yinele" title="Ctrl+Y" disabled>' + A.ICON.redo + '</button>';
    top.insertBefore(hist, $('.cv__bps', top));
    histU = $('[data-cv-undo]', hist);
    histR = $('[data-cv-redo]', hist);
    histU.addEventListener('click', undo);
    histR.addEventListener('click', redo);

    buildPalette();
    $('[data-cv-addbtn]').addEventListener('click', function () { togglePalette(); });

    $$('[data-cv-page]').forEach(function (b) {
      b.addEventListener('click', function () { setPage(b.getAttribute('data-cv-page')); });
    });
    var bpwInp = $('[data-cv-bpw]');
    function setBpW(w) {
      bpW = Math.max(320, Math.min(3840, Math.round(w) || 1280));
      if (bpwInp) bpwInp.value = bpW;
      $$('[data-cv-bp]').forEach(function (x) {
        x.classList.toggle('is-active', +x.getAttribute('data-cv-bp') === bpW);
      });
      fitStage();
      renderInspector();               // dönüşüm alanları o kırılımın değerlerini gösterir
    }
    $$('[data-cv-bp]').forEach(function (b) {
      b.addEventListener('click', function () { setBpW(+b.getAttribute('data-cv-bp')); });
    });
    if (bpwInp) {
      // ilk açılışta kullanıcının gerçek ekran genişliğini öner — site tipografisi
      // vw tabanlı olduğundan dar önizleme geniş monitörle birebir örtüşmez
      bpwInp.placeholder = window.screen && screen.width ? String(screen.width) : '1280';
      bpwInp.title = 'Önizleme genişliği (px) — ekranın için ör. ' + (window.screen ? screen.width : 1920);
      bpwInp.addEventListener('change', function () { setBpW(+bpwInp.value); });
      bpwInp.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); setBpW(+bpwInp.value); bpwInp.blur(); }
      });
    }

    // Ekle paleti dışına tıklayınca kapanır (panel içindeyken açık kalır)
    document.addEventListener('pointerdown', function (e) {
      commitTabRename(false);        // panel arayüzüne geçildi — şerit adı kesinleşir
      var pal = $('[data-cv-palette]');
      if (!pal || pal.hidden) return;
      if (e.target.closest('[data-cv-palette],[data-cv-addbtn]')) return;
      togglePalette(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') togglePalette(false);
    });

    frame.addEventListener('load', instrument);
    if (window.ResizeObserver) new ResizeObserver(fitStage).observe(stage);
    window.addEventListener('resize', fitStage);

    frame.src = '/kurallar.html?edit=1';
    fitStage();
  }

  function isViewActive() {
    return !!document.querySelector('[data-view="tasarim"].is-active');
  }

  A.registerView('tasarim', {
    enter: function () {
      active = true;
      if (!ready) return;
      if (!booted) boot();
      else if (A.stale.canvas) { A.stale.canvas = false; renderRegions(); }
      fitStage();
      startLoop();
    },
    leave: function () {
      commitTabRename(false);
      commitEditing();
      active = false;
      cancelAnimationFrame(rafId);
    },
    flush: function () { commitTabRename(false); commitEditing(); }
  });

  window.addEventListener('adm:ready', function () {
    ready = true;
    if (isViewActive()) {
      active = true;
      if (!booted) boot();
      startLoop();
    }
  });
})();
