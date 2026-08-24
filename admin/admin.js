/* SLVNZ — yönetim paneli
   ============================================================================
   Durum modeli: sunucudan gelen content/site.json bellekte tutulur; her
   düzenleme onu değiştirir ve "kirli" sayılır. Kaydet (Ctrl+S) tüm durumu
   PUT /api/site ile gönderir — sunucu doğrular, JSON'u yazar ve site
   dosyalarındaki işaretli bölgeleri yeniden üretir.

   Zengin metin editörü
   --------------------
   contenteditable + document.execCommand. Yüzey .panel__rich sınıfını taşır:
   yazdığın, sitede duracağı tipografiyle görünür (kurallar.css yüklü).
   Girdi ne olursa olsun (Word yapıştırması dahil) içerik, sitenin söz
   dağarcığına İNDİRGENİR:

     p (+lede) · h3 · h4 · ul ol li · blockquote · table thead tbody tr th td
     hr · strong em code a[href] · br

   Bunun dışındaki her etiket ya eşlenir (b→strong, h1/h2→h3, div→çöz) ya da
   çözülür; stiller/sınıflar atılır. Aynı süzgeç hem yapıştırmada hem
   kaydetmede çalışır — dosyaya asla süzülmemiş HTML yazılmaz.

   Word alışkanlıkları: Ctrl+B/I/K · tabloda Tab sonraki hücre, son hücrede
   Tab yeni satır ekler · biçim menüsü Word'ün stil kutusu gibi davranır.
   ========================================================================== */
(function () {
  'use strict';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------------------------------------------------------------- durum */
  var site = null;          // content/site.json aynası
  var images = [];          // /api/images
  var editingVer = null;    // kurallar görünümünde açık sürüm
  var dirty = false;
  var pickerCb = null;      // görsel seçici geri çağrısı

  function markDirty() {
    if (!dirty) {
      dirty = true;
      $('[data-save]').disabled = false;
    }
  }
  function markClean() {
    dirty = false;
    $('[data-save]').disabled = true;
  }

  /* ---------------------------------------------------------------- api */
  function api(path, opts) {
    return fetch(path, opts).then(function (r) {
      return r.json().then(function (j) {
        if (!r.ok) throw new Error((j.hata || ['Sunucu hatası']).join(' · '));
        return j;
      });
    });
  }

  /* ---------------------------------------------------------------- toast */
  var toastTimer = null;
  function toast(msg, isErr) {
    var t = $('[data-toast]');
    t.innerHTML = msg;
    t.classList.toggle('is-err', !!isErr);
    t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.hidden = true; }, isErr ? 6500 : 3800);
  }

  /* ---------------------------------------------------------------- git */
  function renderGit(g) {
    var el = $('[data-git]');
    if (!g || g.hata) { el.textContent = 'git: ' + (g && g.hata || '?'); return; }
    var n = g.degisen.length;
    el.textContent = n ? (g.dal + ' · ' + n + ' bekleyen değişiklik') : (g.dal + ' · temiz');
    el.classList.toggle('is-dirty', n > 0);
    el.title = n ? g.degisen.map(function (d) { return d.durum + ' ' + d.yol; }).join('\n')
                 : 'Çalışma ağacı temiz';
  }
  function refreshGit() { api('/api/git').then(renderGit).catch(function () {}); }

  /* ================================================================ süzgeç
     Sitenin söz dağarcığına indirgeme — yapıştırma ve kaydetmede aynı yol. */
  var ALLOW = {
    P: ['class'], H3: [], H4: [], UL: [], OL: [], LI: [], BLOCKQUOTE: [],
    TABLE: [], THEAD: [], TBODY: [], TR: [], TH: [], TD: [], HR: [],
    STRONG: [], EM: [], A: ['href'], CODE: [], BR: []
  };
  var RENAME = { B: 'STRONG', I: 'EM', H1: 'H3', H2: 'H3', H5: 'H4', H6: 'H4' };
  var DROP = { SCRIPT: 1, STYLE: 1, META: 1, LINK: 1, TITLE: 1, IFRAME: 1, OBJECT: 1, EMBED: 1, FORM: 1, INPUT: 1, BUTTON: 1, SELECT: 1, TEXTAREA: 1, CANVAS: 1, SVG: 1, NOSCRIPT: 1, IMG: 1 };
  var PCLASS = { lede: 1, panel__soon: 1 };
  var INLINE = { STRONG: 1, EM: 1, A: 1, CODE: 1, BR: 1, '#text': 1 };

  function safeHref(h) {
    h = (h || '').trim();
    if (/^(https?:|mailto:|#|\/|\.)/i.test(h)) return h;
    if (/^[a-z0-9-]+\.(html|png|webp|pdf)/i.test(h)) return h;
    return null;
  }

  function cleanNode(node) {
    var child = node.firstChild;
    while (child) {
      var next = child.nextSibling;
      if (child.nodeType === 8) {                       // yorum
        node.removeChild(child);
      } else if (child.nodeType === 3) {                // metin: Word'ün nbsp çöpü
        child.nodeValue = child.nodeValue.replace(/ /g, ' ');
      } else if (child.nodeType === 1) {
        var tag = child.tagName;
        if (DROP[tag]) { node.removeChild(child); child = next; continue; }
        cleanNode(child);
        var want = RENAME[tag] || tag;
        if (!(want in ALLOW)) {                         // bilinmeyen → çöz
          while (child.firstChild) node.insertBefore(child.firstChild, child);
          node.removeChild(child);
        } else {
          var el = child;
          if (want !== tag) {                           // b→strong vb.
            el = document.createElement(want);
            while (child.firstChild) el.appendChild(child.firstChild);
            node.replaceChild(el, child);
          }
          // öznitelik süzgeci
          for (var i = el.attributes.length - 1; i >= 0; i--) {
            var at = el.attributes[i];
            if (ALLOW[want].indexOf(at.name) === -1) el.removeAttribute(at.name);
          }
          if (want === 'A') {
            var h = safeHref(el.getAttribute('href'));
            if (!h) {                                   // güvensiz bağ → çöz
              while (el.firstChild) node.insertBefore(el.firstChild, el);
              node.removeChild(el);
            } else el.setAttribute('href', h);
          }
          if (want === 'P') {
            var cls = (el.getAttribute('class') || '').split(/\s+/).filter(function (c) { return PCLASS[c]; });
            if (cls.length) el.setAttribute('class', cls.join(' '));
            else el.removeAttribute('class');
          }
        }
      }
      child = next;
    }
  }

  function wrapLoose(root) {
    // kök düzeyde başıboş metin/satıriçi düğümleri p'ye sar
    var child = root.firstChild, run = null;
    while (child) {
      var next = child.nextSibling;
      var loose = (child.nodeType === 3 && child.nodeValue.trim()) ||
                  (child.nodeType === 1 && INLINE[child.tagName]);
      if (loose) {
        if (!run) { run = document.createElement('p'); root.insertBefore(run, child); }
        run.appendChild(child);
      } else {
        run = null;
        if (child.nodeType === 3) root.removeChild(child);   // boşluk metni
      }
      child = next;
    }
  }

  function dropEmpties(root) {
    $$('p, h3, h4, li', root).forEach(function (el) {
      if (!el.textContent.trim() && !el.querySelector('br')) el.remove();
    });
    $$('p', root).forEach(function (el) {                    // yalnız <br> kalan p
      if (!el.textContent.trim() && el.children.length && !el.querySelector('table')) el.remove();
    });
    $$('ul, ol', root).forEach(function (el) { if (!el.children.length) el.remove(); });
  }

  function sanitizeHTML(html) {
    var tpl = document.createElement('template');
    tpl.innerHTML = html;
    cleanNode(tpl.content);
    wrapLoose(tpl.content);
    dropEmpties(tpl.content);
    // not: DocumentFragment'ta ':scope > *' boş döner — .children kullan
    return Array.prototype.map.call(tpl.content.children, function (el) { return el.outerHTML; }).join('\n');
  }

  function serializeForSave(html) {
    var tpl = document.createElement('template');
    tpl.innerHTML = sanitizeHTML(html);
    // geniş tablolar sitede kendi içinde kaysın
    $$('table', tpl.content).forEach(function (t) {
      var w = document.createElement('div');
      w.className = 'table-wrap';
      t.parentNode.replaceChild(w, t);
      w.appendChild(t);
    });
    // not: DocumentFragment'ta ':scope > *' boş döner — .children kullan
    return Array.prototype.map.call(tpl.content.children, function (el) { return el.outerHTML; }).join('\n');
  }

  /* ================================================================ editör */
  var ICON = {
    undo: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 14 4 9l5-5"/><path d="M4 9h9a6 6 0 1 1 0 12h-3"/></svg>',
    redo: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 14 5-5-5-5"/><path d="M20 9h-9a6 6 0 1 0 0 12h3"/></svg>',
    code: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 6 3 12l5 6M16 6l5 6-5 6"/></svg>',
    link: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9.5 14.5 5-5"/><path d="M8.5 11.5 6 14a3.5 3.5 0 1 0 5 5l2.5-2.5M15.5 12.5 18 10a3.5 3.5 0 1 0-5-5l-2.5 2.5"/></svg>',
    ul: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6h12M9 12h12M9 18h12"/><circle cx="4.5" cy="6" r="1.1" fill="currentColor" stroke="none"/><circle cx="4.5" cy="12" r="1.1" fill="currentColor" stroke="none"/><circle cx="4.5" cy="18" r="1.1" fill="currentColor" stroke="none"/></svg>',
    ol: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 6h11M10 12h11M10 18h11"/><path d="M3.6 5h1.5v3.4M3.4 11h2.2l-2.2 2.6h2.2M3.4 16.6h1.8a1 1 0 0 1 0 1.7 1 1 0 0 1 0 1.7H3.4" fill="none"/></svg>',
    table: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="4.5" width="17" height="15"/><path d="M3.5 10h17M10 4.5v15M16 4.5v15"/></svg>',
    hr: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12h18M7 6h10M7 18h10" opacity=".35"/><path d="M3 12h18"/></svg>',
    clear: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 15 8.5-8.5a2 2 0 0 1 2.8 0l1.2 1.2a2 2 0 0 1 0 2.8L9 19H5.8L5 18.2z"/><path d="M12 21h9"/></svg>',
    up: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
    down: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12l7 7 7-7"/></svg>',
    x: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    chev: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>'
  };

  function rteToolbarHTML() {
    return '' +
      '<div class="rte__bar" role="toolbar" aria-label="Biçimlendirme">' +
        '<button type="button" class="iconbtn" data-cmd="undo" aria-label="Geri al" title="Ctrl+Z">' + ICON.undo + '</button>' +
        '<button type="button" class="iconbtn" data-cmd="redo" aria-label="Yinele" title="Ctrl+Y">' + ICON.redo + '</button>' +
        '<span class="rte__sep"></span>' +
        '<label class="visually-hidden">Biçim</label>' +
        '<select data-block aria-label="Blok biçimi">' +
          '<option value="p">Paragraf</option>' +
          '<option value="lede">Giriş paragrafı</option>' +
          '<option value="h3">Başlık</option>' +
          '<option value="h4">Alt başlık</option>' +
          '<option value="blockquote">Alıntı</option>' +
        '</select>' +
        '<span class="rte__sep"></span>' +
        '<button type="button" class="iconbtn rte__b" data-cmd="bold" aria-label="Kalın" title="Ctrl+B">K</button>' +
        '<button type="button" class="iconbtn rte__i" data-cmd="italic" aria-label="İtalik" title="Ctrl+I">T</button>' +
        '<button type="button" class="iconbtn" data-cmd="codetag" aria-label="Kod" title="Satır içi kod">' + ICON.code + '</button>' +
        '<button type="button" class="iconbtn" data-cmd="linktag" aria-label="Bağlantı" title="Ctrl+K">' + ICON.link + '</button>' +
        '<span class="rte__sep"></span>' +
        '<button type="button" class="iconbtn" data-cmd="ul" aria-label="Madde listesi">' + ICON.ul + '</button>' +
        '<button type="button" class="iconbtn" data-cmd="ol" aria-label="Sıralı liste">' + ICON.ol + '</button>' +
        '<button type="button" class="iconbtn" data-cmd="table" aria-label="Tablo ekle">' + ICON.table + '</button>' +
        '<button type="button" class="iconbtn" data-cmd="hr" aria-label="Yatay çizgi">' + ICON.hr + '</button>' +
        '<span class="rte__sep"></span>' +
        '<button type="button" class="iconbtn" data-cmd="clear" aria-label="Biçimi temizle">' + ICON.clear + '</button>' +
        '<span class="rte__tablebar" data-tablebar>' +
          '<span class="rte__sep"></span>' +
          '<button type="button" class="iconbtn" data-cmd="row+" title="Altına satır ekle">+ satır</button>' +
          '<button type="button" class="iconbtn" data-cmd="row-" title="Satırı sil">− satır</button>' +
          '<button type="button" class="iconbtn" data-cmd="col+" title="Sağına sütun ekle">+ sütun</button>' +
          '<button type="button" class="iconbtn" data-cmd="col-" title="Sütunu sil">− sütun</button>' +
          '<button type="button" class="iconbtn iconbtn--danger" data-cmd="tdel" title="Tabloyu sil">tabloyu sil</button>' +
        '</span>' +
      '</div>' +
      '<div class="rte__linkrow" data-linkrow>' +
        '<input type="url" placeholder="https://… ya da #bolum-id" aria-label="Bağlantı adresi">' +
        '<button type="button" class="btn" data-link-apply>Uygula</button>' +
        '<button type="button" class="btn btn--ghost" data-link-remove>Kaldır</button>' +
        '<button type="button" class="btn btn--ghost" data-link-cancel>Vazgeç</button>' +
      '</div>';
  }

  function initRTE(host, initialHTML) {
    host.innerHTML = rteToolbarHTML() + '<div class="rte__surface panel__rich" contenteditable="true" data-rte-surface></div>';
    var surface = $('[data-rte-surface]', host);
    var linkrow = $('[data-linkrow]', host);
    var tablebar = $('[data-tablebar]', host);
    var blockSel = $('[data-block]', host);
    surface.innerHTML = sanitizeHTML(initialHTML || '');

    try {
      document.execCommand('defaultParagraphSeparator', false, 'p');
      document.execCommand('styleWithCSS', false, false);
    } catch (e) {}

    function inSurface(node) {
      while (node) { if (node === surface) return true; node = node.parentNode; }
      return false;
    }
    function selNode() {
      var s = getSelection();
      return (s.rangeCount && inSurface(s.anchorNode)) ? s.anchorNode : null;
    }
    function closest(node, sel) {
      while (node && node !== surface) {
        if (node.nodeType === 1 && node.matches(sel)) return node;
        node = node.parentNode;
      }
      return null;
    }
    function exec(cmd, val) {
      surface.focus();
      document.execCommand(cmd, false, val);
      markDirty();
      syncBar();
    }

    /* -- blok biçimi ------------------------------------------------------ */
    blockSel.addEventListener('change', function () {
      var v = blockSel.value;
      surface.focus();
      if (v === 'lede') {
        document.execCommand('formatBlock', false, 'p');
        var b = closest(selNode(), 'p');
        if (b) b.className = 'lede';
      } else {
        document.execCommand('formatBlock', false, v);
        var p = closest(selNode(), 'p');
        if (p && v === 'p') p.removeAttribute('class');
      }
      markDirty(); syncBar();
    });

    /* -- satır içi kod ---------------------------------------------------- */
    function toggleCode() {
      var s = getSelection();
      if (!s.rangeCount || !inSurface(s.anchorNode)) return;
      var code = closest(s.anchorNode, 'code');
      if (code) {
        var p = code.parentNode;
        while (code.firstChild) p.insertBefore(code.firstChild, code);
        p.removeChild(code); p.normalize();
      } else {
        var r = s.getRangeAt(0);
        if (r.collapsed) return;
        var el = document.createElement('code');
        el.appendChild(r.extractContents());
        r.insertNode(el);
        s.removeAllRanges();
        var nr = document.createRange(); nr.selectNodeContents(el); s.addRange(nr);
      }
      markDirty(); syncBar();
    }

    /* -- bağlantı --------------------------------------------------------- */
    var savedRange = null;
    function openLink() {
      var s = getSelection();
      if (!s.rangeCount || !inSurface(s.anchorNode)) return;
      savedRange = s.getRangeAt(0).cloneRange();
      var a = closest(s.anchorNode, 'a');
      linkrow.querySelector('input').value = a ? a.getAttribute('href') : '';
      linkrow.classList.add('is-on');
      linkrow.querySelector('input').focus();
    }
    function restoreSel() {
      if (!savedRange) return;
      var s = getSelection(); s.removeAllRanges(); s.addRange(savedRange);
    }
    function closeLink() { linkrow.classList.remove('is-on'); surface.focus(); }
    $('[data-link-apply]', host).addEventListener('click', function () {
      var url = safeHref(linkrow.querySelector('input').value);
      if (!url) { toast('Bağlantı adresi geçersiz — https://, #bolum ya da sayfa.html olmalı', true); return; }
      restoreSel();
      var a = closest(getSelection().anchorNode, 'a');
      if (a && getSelection().isCollapsed) a.setAttribute('href', url);
      else document.execCommand('createLink', false, url);
      closeLink(); markDirty();
    });
    $('[data-link-remove]', host).addEventListener('click', function () {
      restoreSel(); document.execCommand('unlink'); closeLink(); markDirty();
    });
    $('[data-link-cancel]', host).addEventListener('click', closeLink);
    linkrow.querySelector('input').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); $('[data-link-apply]', host).click(); }
      if (e.key === 'Escape') closeLink();
    });

    /* -- tablo ------------------------------------------------------------ */
    function insertTable() {
      var h = '<table><thead><tr><th>Başlık</th><th>Başlık</th><th>Başlık</th></tr></thead>' +
              '<tbody><tr><td><br></td><td><br></td><td><br></td></tr>' +
              '<tr><td><br></td><td><br></td><td><br></td></tr></tbody></table><p><br></p>';
      exec('insertHTML', h);
    }
    function cellIndex(cell) { return Array.prototype.indexOf.call(cell.parentNode.children, cell); }
    function tableOp(op) {
      var cell = closest(selNode(), 'td, th');
      if (!cell) return;
      var table = closest(cell, 'table');
      var row = cell.parentNode;
      var ci = cellIndex(cell);
      if (op === 'row+') {
        var tr = document.createElement('tr');
        for (var i = 0; i < row.children.length; i++) tr.insertAdjacentHTML('beforeend', '<td><br></td>');
        var tb = table.tBodies[0] || table;
        (row.parentNode.tagName === 'THEAD' ? tb : row).insertAdjacentElement(
          row.parentNode.tagName === 'THEAD' ? 'afterbegin' : 'afterend', tr);
      } else if (op === 'row-') {
        if (row.parentNode.tagName === 'THEAD') return;
        var rows = table.tBodies[0] ? table.tBodies[0].rows.length : 0;
        if (rows <= 1) { table.remove(); } else row.remove();
      } else if (op === 'col+') {
        $$('tr', table).forEach(function (r) {
          var c = document.createElement(r.parentNode.tagName === 'THEAD' ? 'th' : 'td');
          c.innerHTML = r.parentNode.tagName === 'THEAD' ? 'Başlık' : '<br>';
          r.children[ci].insertAdjacentElement('afterend', c);
        });
      } else if (op === 'col-') {
        if (row.children.length <= 1) { table.remove(); }
        else $$('tr', table).forEach(function (r) { if (r.children[ci]) r.children[ci].remove(); });
      } else if (op === 'tdel') {
        table.remove();
      }
      markDirty(); syncBar();
    }
    surface.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var cell = closest(selNode(), 'td, th');
      if (!cell) return;
      e.preventDefault();
      var table = closest(cell, 'table');
      var cells = $$('th, td', table);
      var i = cells.indexOf(cell) + (e.shiftKey ? -1 : 1);
      if (i >= cells.length) {
        // Word davranışı: son hücrede Tab yeni satır açar
        tableOp('row+');
        cells = $$('th, td', table);
        i = cells.indexOf(cell) + 1;
      }
      var next = cells[Math.max(0, i)];
      if (next) {
        var r = document.createRange(); r.selectNodeContents(next); r.collapse(true);
        var s = getSelection(); s.removeAllRanges(); s.addRange(r);
      }
    });

    /* -- araç çubuğu ------------------------------------------------------ */
    $('.rte__bar', host).addEventListener('mousedown', function (e) {
      if (e.target.closest('button')) e.preventDefault();   // seçimi koru
    });
    $('.rte__bar', host).addEventListener('click', function (e) {
      var b = e.target.closest('[data-cmd]');
      if (!b) return;
      var c = b.getAttribute('data-cmd');
      if (c === 'undo' || c === 'redo' || c === 'bold' || c === 'italic') exec(c);
      else if (c === 'ul') exec('insertUnorderedList');
      else if (c === 'ol') exec('insertOrderedList');
      else if (c === 'hr') exec('insertHTML', '<hr><p><br></p>');
      else if (c === 'clear') { exec('removeFormat'); exec('unlink'); }
      else if (c === 'codetag') toggleCode();
      else if (c === 'linktag') openLink();
      else if (c === 'table') insertTable();
      else tableOp(c);
    });

    /* -- kısayollar + yapıştırma ------------------------------------------ */
    surface.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openLink(); }
    });
    surface.addEventListener('paste', function (e) {
      e.preventDefault();
      var dt = e.clipboardData;
      var html = dt.getData('text/html');
      if (!html) {
        html = dt.getData('text/plain').split(/\n{2,}/).map(function (p) {
          return '<p>' + p.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\n/g, '<br>') + '</p>';
        }).join('');
      }
      document.execCommand('insertHTML', false, sanitizeHTML(html));
      markDirty();
    });
    surface.addEventListener('input', markDirty);

    /* -- durum yansıması --------------------------------------------------- */
    function syncBar() {
      var node = selNode();
      if (!node) return;
      try {
        $('[data-cmd="bold"]', host).setAttribute('aria-pressed', document.queryCommandState('bold'));
        $('[data-cmd="italic"]', host).setAttribute('aria-pressed', document.queryCommandState('italic'));
      } catch (e) {}
      $('[data-cmd="codetag"]', host).setAttribute('aria-pressed', !!closest(node, 'code'));
      $('[data-cmd="linktag"]', host).setAttribute('aria-pressed', !!closest(node, 'a'));
      var b = closest(node, 'p, h3, h4, blockquote, li');
      var v = 'p';
      if (b) {
        if (b.tagName === 'H3') v = 'h3';
        else if (b.tagName === 'H4') v = 'h4';
        else if (b.tagName === 'BLOCKQUOTE' || closest(b, 'blockquote')) v = 'blockquote';
        else if (b.classList && b.classList.contains('lede')) v = 'lede';
      }
      blockSel.value = v;
      tablebar.classList.toggle('is-on', !!closest(node, 'table'));
    }
    document.addEventListener('selectionchange', function () {
      if (inSurface(getSelection().anchorNode)) syncBar();
    });

    return { surface: surface };
  }

  /* ================================================================ sürümler */
  function renderVersions() {
    var ol = $('[data-vlist]');
    ol.innerHTML = '';
    site.surumler.forEach(function (v, i) {
      var li = document.createElement('li');
      li.className = 'vrow';
      li.innerHTML =
        '<label class="vrow__cur"><input type="radio" name="simdiki"' + (v.durum === 'simdiki' ? ' checked' : '') + '><span>şimdiki</span></label>' +
        '<span class="vrow__no">' + v.no + '</span>' +
        '<div class="field"><label class="visually-hidden">Tür</label><input class="field__input" value="' + v.tur.replace(/"/g, '&quot;') + '" data-vtur></div>' +
        '<div class="vrow__tools">' +
          '<button type="button" class="iconbtn" data-vup aria-label="Yukarı taşı"' + (i === 0 ? ' disabled' : '') + '>' + ICON.up + '</button>' +
          '<button type="button" class="iconbtn" data-vdown aria-label="Aşağı taşı"' + (i === site.surumler.length - 1 ? ' disabled' : '') + '>' + ICON.down + '</button>' +
          '<button type="button" class="iconbtn iconbtn--danger" data-vdel aria-label="Sürümü sil"' + (v.durum === 'simdiki' ? ' disabled title="Şimdiki sürüm silinemez"' : '') + '>' + ICON.x + '</button>' +
        '</div>';
      $('input[type=radio]', li).addEventListener('change', function () {
        site.surumler.forEach(function (o) { if (o.durum === 'simdiki') o.sayfa = ''; o.durum = 'arsiv'; });
        v.durum = 'simdiki';
        v.sayfa = './';
        if (!site.kurallar[v.no]) site.kurallar[v.no] = { bolumler: [] };
        markDirty(); renderVersions(); renderKverSelect();
        toast('Şimdiki sürüm: <strong>' + v.no + '</strong> — kaydettiğinde site bu sürümü gösterir');
      });
      $('[data-vtur]', li).addEventListener('input', function (e) { v.tur = e.target.value; markDirty(); });
      $('[data-vup]', li).addEventListener('click', function () { moveVer(i, -1); });
      $('[data-vdown]', li).addEventListener('click', function () { moveVer(i, 1); });
      $('[data-vdel]', li).addEventListener('click', function () {
        var nb = (site.kurallar[v.no] || {}).bolumler || [];
        if (!confirm('"' + v.no + '" sürümü silinsin mi?' + (nb.length ? '\nİçindeki ' + nb.length + ' bölüm de içerikten silinir.' : ''))) return;
        site.surumler.splice(i, 1);
        delete site.kurallar[v.no];
        if (editingVer === v.no) editingVer = null;
        markDirty(); renderVersions(); renderKverSelect();
      });
      ol.appendChild(li);
    });
  }
  function moveVer(i, d) {
    var a = site.surumler;
    var t = a[i]; a[i] = a[i + d]; a[i + d] = t;
    markDirty(); renderVersions(); renderKverSelect();
  }

  $('[data-vadd]').addEventListener('submit', function (e) {
    e.preventDefault();
    var no = $('#vno').value.trim(), tur = $('#vtur').value.trim();
    if (site.surumler.some(function (v) { return v.no === no; })) {
      toast('Bu sürüm zaten var: ' + no, true); return;
    }
    site.surumler.push({ no: no, tur: tur, durum: 'arsiv', sayfa: '' });
    site.kurallar[no] = { bolumler: [] };
    e.target.reset();
    markDirty(); renderVersions(); renderKverSelect();
    toast('Sürüm eklendi: <strong>' + no + ' ' + tur + '</strong> (arşiv)');
  });

  /* ================================================================ kurallar */
  var rtes = {};            // bölüm id → rte örneği

  function currentVerNo() {
    var c = site.surumler.filter(function (v) { return v.durum === 'simdiki'; })[0];
    return c ? c.no : site.surumler[0].no;
  }

  function renderKverSelect() {
    var sel = $('[data-kver]');
    sel.innerHTML = site.surumler.map(function (v) {
      return '<option value="' + v.no + '">' + v.no + ' — ' + v.tur + (v.durum === 'simdiki' ? ' (şimdiki)' : '') + '</option>';
    }).join('');
    if (!editingVer || !site.kurallar[editingVer]) editingVer = currentVerNo();
    sel.value = editingVer;
    updateKdesc();
  }
  function updateKdesc() {
    var cur = editingVer === currentVerNo();
    $('[data-kdesc]').textContent = cur
      ? 'Bu sürüm siteye yazılır: kaydettiğinde kurallar.html güncellenir.'
      : 'Arşiv sürümü — içerik saklanır, sayfası şimdilik üretilmez.';
  }
  $('[data-kver]').addEventListener('change', function (e) {
    captureChapters();
    editingVer = e.target.value;
    if (!site.kurallar[editingVer]) site.kurallar[editingVer] = { bolumler: [] };
    renderChapters(); updateKdesc();
  });

  function chapters() {
    if (!site.kurallar[editingVer]) site.kurallar[editingVer] = { bolumler: [] };
    return site.kurallar[editingVer].bolumler;
  }

  function captureChapters() {
    // DOM'daki düzenlemeleri duruma yaz (yeniden çizim / kaydetme öncesi)
    $$('[data-ch]').forEach(function (li) {
      var ver = li.getAttribute('data-ver');
      var id = li.getAttribute('data-ch');
      var list = ((site.kurallar[ver] || {}).bolumler) || [];
      var ch = list.filter(function (c) { return c.id === id; })[0];
      if (!ch) return;
      ch.baslik = $('[data-ch-title]', li).value;
      var rte = rtes[ver + '/' + id];
      if (rte) ch.html = serializeForSave(rte.surface.innerHTML);
    });
  }

  function slugify(t) {
    var map = { 'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u', 'â': 'a', 'î': 'i', 'û': 'u' };
    var s = t.toLowerCase().replace(/[çğıöşüâîû]/g, function (c) { return map[c] || c; })
      .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'bolum';
    var base = s, k = 2;
    while (chapters().some(function (c) { return c.id === s; })) s = base + '-' + k++;
    return s;
  }

  function artThumb(g) {
    return g ? '<img src="/' + g.img + '" alt="">' : 'görsel yok';
  }

  function renderChapters(openIds) {
    openIds = openIds || new Set($$('[data-ch]').filter(function (li) {
      return $('[data-ch-toggle]', li).getAttribute('aria-expanded') === 'true';
    }).map(function (li) { return li.getAttribute('data-ch'); }));
    rtes = {};
    var ol = $('[data-chlist]');
    ol.innerHTML = '';
    chapters().forEach(function (ch, i) {
      var no = String(i + 1).padStart(2, '0');
      var li = document.createElement('li');
      li.className = 'ch';
      li.setAttribute('data-ch', ch.id);
      li.setAttribute('data-ver', editingVer);
      li.innerHTML =
        '<div class="ch__row">' +
          '<button type="button" class="ch__toggle" data-ch-toggle aria-expanded="false">' +
            '<span class="ch__no">' + no + '</span>' +
            '<span class="ch__title" data-ch-label></span>' +
            '<span class="ch__chev" aria-hidden="true">' + ICON.chev + '</span>' +
          '</button>' +
          '<div class="ch__tools">' +
            '<button type="button" class="iconbtn" data-ch-up aria-label="Yukarı taşı"' + (i === 0 ? ' disabled' : '') + '>' + ICON.up + '</button>' +
            '<button type="button" class="iconbtn" data-ch-down aria-label="Aşağı taşı"' + (i === chapters().length - 1 ? ' disabled' : '') + '>' + ICON.down + '</button>' +
            '<button type="button" class="iconbtn iconbtn--danger" data-ch-del aria-label="Bölümü sil">' + ICON.x + '</button>' +
          '</div>' +
        '</div>' +
        '<div class="ch__body" hidden>' +
          '<div class="field"><label class="field__label" for="t-' + ch.id + '">Başlık</label>' +
            '<input class="field__input" id="t-' + ch.id + '" data-ch-title required></div>' +
          '<div class="field"><span class="field__label">Görsel</span>' +
            '<div class="artrow">' +
              '<span class="artrow__thumb" data-ch-thumb>' + artThumb(ch.gorsel) + '</span>' +
              '<button type="button" class="btn btn--ghost" data-ch-art>Görsel seç</button>' +
              '<button type="button" class="btn btn--ghost" data-ch-artclear' + (ch.gorsel ? '' : ' hidden') + '>Kaldır</button>' +
            '</div></div>' +
          '<div class="field"><span class="field__label">İçerik</span><div class="rte" data-rte></div></div>' +
        '</div>';

      $('[data-ch-label]', li).textContent = ch.baslik;
      var ti = $('[data-ch-title]', li);
      ti.value = ch.baslik;
      ti.addEventListener('input', function () {
        $('[data-ch-label]', li).textContent = ti.value || '—';
        markDirty();
      });

      var tog = $('[data-ch-toggle]', li);
      tog.addEventListener('click', function () {
        var open = tog.getAttribute('aria-expanded') === 'true';
        tog.setAttribute('aria-expanded', String(!open));
        $('.ch__body', li).hidden = open;
      });

      $('[data-ch-up]', li).addEventListener('click', function () { moveCh(i, -1); });
      $('[data-ch-down]', li).addEventListener('click', function () { moveCh(i, 1); });
      $('[data-ch-del]', li).addEventListener('click', function () {
        if (!confirm('"' + ch.baslik + '" bölümü silinsin mi?')) return;
        captureChapters();
        chapters().splice(i, 1);
        markDirty(); renderChapters();
      });

      $('[data-ch-art]', li).addEventListener('click', function () {
        openPicker(function (g) {
          ch.gorsel = g;
          $('[data-ch-thumb]', li).innerHTML = artThumb(g);
          $('[data-ch-artclear]', li).hidden = false;
          markDirty();
        });
      });
      $('[data-ch-artclear]', li).addEventListener('click', function () {
        ch.gorsel = null;
        $('[data-ch-thumb]', li).innerHTML = artThumb(null);
        $('[data-ch-artclear]', li).hidden = true;
        markDirty();
      });

      rtes[editingVer + '/' + ch.id] = initRTE($('[data-rte]', li), ch.html);

      if (openIds.has(ch.id)) {
        tog.setAttribute('aria-expanded', 'true');
        $('.ch__body', li).hidden = false;
      }
      ol.appendChild(li);
    });
  }
  function moveCh(i, d) {
    captureChapters();
    var a = chapters();
    var t = a[i]; a[i] = a[i + d]; a[i + d] = t;
    markDirty(); renderChapters();
  }

  $('[data-chadd]').addEventListener('click', function () {
    captureChapters();
    var baslik = 'Yeni Bölüm';
    chapters().push({ id: slugify(baslik), baslik: baslik, gorsel: null,
      html: '<p class="panel__soon">Bu bölümün kuralları yazım aşamasında.</p>' });
    markDirty();
    var open = new Set([chapters()[chapters().length - 1].id]);
    renderChapters(open);
    var last = $$('[data-ch]').pop();
    $('[data-ch-title]', last).focus();
    $('[data-ch-title]', last).select();
  });

  /* ================================================================ seçici */
  function openPicker(cb) {
    pickerCb = cb;
    var grid = $('[data-picker-grid]');
    grid.innerHTML = images.map(function (g, i) {
      return '<button type="button" class="picker__item" data-pick="' + i + '">' +
        '<img src="/' + g.img + '" alt="" loading="lazy"><span>' + g.ad + '</span></button>';
    }).join('') || '<p class="field__help">Henüz görsel yok — aşağıdan yükle.</p>';
    $('[data-picker]').showModal();
  }
  $('[data-picker-grid]').addEventListener('click', function (e) {
    var b = e.target.closest('[data-pick]');
    if (!b) return;
    var g = images[+b.getAttribute('data-pick')];
    $('[data-picker]').close();
    if (pickerCb) pickerCb({ img: g.img, webp: g.webp, w: g.w, h: g.h });
  });
  $('[data-picker-close]').addEventListener('click', function () { $('[data-picker]').close(); });
  $('[data-picker-upload]').addEventListener('change', function (e) {
    var f = e.target.files[0];
    if (!f) return;
    var ad = f.name.toLowerCase().replace(/[^a-z0-9.]+/g, '-').replace(/-+\.png$/, '.png');
    if (!/\.png$/.test(ad)) { toast('Yalnız .png yüklenebilir', true); return; }
    f.arrayBuffer().then(function (buf) {
      return api('/api/upload?ad=' + encodeURIComponent(ad), { method: 'PUT', body: buf });
    }).then(function (r) {
      images.push(r.gorsel);
      toast('Yüklendi: <strong>' + r.gorsel.ad + '</strong> — alfa + webp üretildi');
      $('[data-picker]').close();
      if (pickerCb) pickerCb({ img: r.gorsel.img, webp: r.gorsel.webp, w: r.gorsel.w, h: r.gorsel.h });
    }).catch(function (err) { toast(err.message, true); });
    e.target.value = '';
  });

  /* ================================================================ kaydet */
  function validateLocal() {
    var bad = $$('[data-ch-title]').filter(function (t) { return !t.value.trim(); });
    bad.forEach(function (t) { t.setAttribute('aria-invalid', 'true'); });
    $$('[data-ch-title]').forEach(function (t) { if (t.value.trim()) t.removeAttribute('aria-invalid'); });
    if (bad.length) {
      var li = bad[0].closest('[data-ch]');
      $('[data-ch-toggle]', li).setAttribute('aria-expanded', 'true');
      $('.ch__body', li).hidden = false;
      bad[0].focus();
      toast('Başlık boş olamaz — ilk hatalı alana götürüldün', true);
      return false;
    }
    return true;
  }

  function save() {
    if (!dirty) return;
    if (!validateLocal()) return;
    captureChapters();
    var btn = $('[data-save]');
    btn.disabled = true; btn.textContent = 'Yazılıyor…';
    api('/api/site', { method: 'PUT', body: JSON.stringify(site) })
      .then(function (r) {
        markClean();
        btn.textContent = 'Kaydet';
        renderGit(r.git);
        toast('Kaydedildi — yazılan: <code>' + r.yazilan.join('</code> <code>') + '</code>');
      })
      .catch(function (err) {
        btn.disabled = false; btn.textContent = 'Kaydet';
        toast('Kaydedilemedi: ' + err.message, true);
      });
  }
  $('[data-save]').addEventListener('click', save);
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') { e.preventDefault(); save(); }
  });
  window.addEventListener('beforeunload', function (e) {
    if (dirty) { e.preventDefault(); e.returnValue = ''; }
  });
  $('[data-git]').addEventListener('click', refreshGit);

  /* ================================================================ görünüm */
  $$('[data-view]').forEach(function (b) {
    b.addEventListener('click', function () {
      $$('[data-view]').forEach(function (x) {
        x.classList.toggle('is-active', x === b);
        if (x === b) x.setAttribute('aria-current', 'page');
        else x.removeAttribute('aria-current');
      });
      $$('[data-view-panel]').forEach(function (p) {
        p.hidden = p.getAttribute('data-view-panel') !== b.getAttribute('data-view');
      });
      $('#icerik').focus();
    });
  });

  /* ================================================================ açılış */
  Promise.all([api('/api/site'), api('/api/images'), api('/api/git')])
    .then(function (r) {
      site = r[0]; images = r[1];
      renderGit(r[2]);
      editingVer = currentVerNo();
      renderVersions();
      renderKverSelect();
      renderChapters();
    })
    .catch(function (err) {
      toast('Sunucuya ulaşılamadı: ' + err.message, true);
    });

  /* testler için */
  window.__adm = { sanitizeHTML: sanitizeHTML, serializeForSave: serializeForSave };
})();
