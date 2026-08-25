/* SLVNZ — Oyun Kuralları: bölüm panelleri
   ============================================================================
   Sağdaki menüden bir bölüme tıklanınca o bölüm görünür, öteki bölümler
   gizlenir. Sayfa sabit yükseklikte; kayan şey belge değil .rules__scroll
   konteyneri, o yüzden ilerleme ve paralaks hep onu okur.

   Aşamalı iyileştirme
   -------------------
   İşaretlemede hiçbir bölüm gizli değil ve menü öğeleri gerçek çapa
   bağlantıları. JS yoksa sayfa, bölümleri alt alta akıtan bağlantılı bir
   belge olarak eksiksiz çalışır. Gizleme işini yalnız bu dosya yapar.

   Erişilebilirlik
   ---------------
   - Gizleme `hidden` niteliğiyle: hem görsel hem erişilebilirlik ağacından çıkar
   - Açık bölümün menü öğesinde `aria-current="true"`
   - Geçişten sonra odak panele taşınır (ekran okuyucu yeni içeriği bulur)
   - Adres çubuğu bölümle birlikte güncellenir; geri tuşu önceki bölüme döner
   ========================================================================== */
(function () {
  var doc = document.documentElement;
  var scroller = document.querySelector('.rules__scroll');
  var panels = Array.prototype.slice.call(document.querySelectorAll('[data-panel]'));
  var links = Array.prototype.slice.call(document.querySelectorAll('.toc__link'));
  if (!scroller || !panels.length) return;

  doc.classList.add('js');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var byId = {};
  panels.forEach(function (p) { byId[p.id] = p; });

  var current = null;
  var swapTimer = null;

  /* ---- menü durumu ------------------------------------------------------- */
  function markLinks(id) {
    links.forEach(function (a) {
      var on = a.getAttribute('href') === '#' + id;
      a.classList.toggle('is-active', on);
      if (on) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  }

  /* ---- panel geçişi ------------------------------------------------------ */
  function show(id, opts) {
    opts = opts || {};
    var next = byId[id];
    if (!next || next === current) return;
    clearTimeout(swapTimer);

    var prev = current;
    current = next;
    markLinks(id);

    var swap = function () {
      panels.forEach(function (p) {
        if (p !== next) { p.hidden = true; p.classList.remove('is-leaving', 'is-entering'); }
      });
      next.hidden = false;
      scroller.scrollTop = 0;

      if (reduce.matches) { afterSwap(opts); return; }

      /* giriş: bir kare gizli-başlangıç durumunda dur, sonra bırak — yoksa
         tarayıcı geçişi atlar */
      next.classList.add('is-entering');
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          next.classList.remove('is-entering');
          afterSwap(opts);
        });
      });
    };

    if (prev && !reduce.matches) {
      prev.classList.add('is-leaving');
      swapTimer = setTimeout(swap, 220);
    } else {
      swap();
    }
  }

  function afterSwap(opts) {
    paint();
    /* Odağı yalnız kullanıcı bir bölüm seçtiğinde taşı; sayfa ilk açılışında
       taşımak, okumaya baştan başlayan birini içeriğin ortasına atardı. */
    if (opts.focus) current.focus({ preventScroll: true });
  }

  /* ---- menü tıklaması ---------------------------------------------------- */
  links.forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var id = (a.getAttribute('href') || '').slice(1);
      if (!byId[id]) return;
      e.preventDefault();
      if (id === (current && current.id)) return;
      if (window.history && history.pushState) history.pushState({ panel: id }, '', '#' + id);
      show(id, { focus: true });
    });
  });

  /* geri / ileri tuşu bölümler arasında gezinir */
  window.addEventListener('popstate', function () {
    var id = location.hash.slice(1);
    show(byId[id] ? id : panels[0].id, { focus: false });
  });

  /* ---- sekmeler ----------------------------------------------------------
     <section class="tabs"> içindeki h4.tabs__title + div.tabs__panel
     çiftlerinden role=tablist bir şerit üretilir; başlıkları CSS gizler
     (.js .tabs__title), tek panel görünür. Ok tuşları sekmeler arasında
     gezinir (roving tabindex). JS yoksa bu blok hiç çalışmaz ve içerik
     başlıklarıyla birlikte sıralı akar. */
  var tabSeq = 0;
  Array.prototype.forEach.call(document.querySelectorAll('.panel__rich .tabs'), function (sec) {
    var titles = [], tPanels = [];
    Array.prototype.forEach.call(sec.children, function (el) {
      if (el.classList.contains('tabs__title')) titles.push(el);
      else if (el.classList.contains('tabs__panel')) tPanels.push(el);
    });
    if (!tPanels.length) return;
    var name = 'sekme-' + (++tabSeq);
    var list = document.createElement('div');
    list.className = 'tabs__list';
    list.setAttribute('role', 'tablist');
    var btns = tPanels.map(function (p, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'tabs__tab';
      b.id = name + '-tab-' + (i + 1);
      b.setAttribute('role', 'tab');
      if (!p.id) p.id = name + '-panel-' + (i + 1);
      b.setAttribute('aria-controls', p.id);
      p.setAttribute('role', 'tabpanel');
      p.setAttribute('aria-labelledby', b.id);
      p.tabIndex = 0;
      b.textContent = titles[i] ? titles[i].textContent : 'Sekme ' + (i + 1);
      list.appendChild(b);
      return b;
    });
    sec.insertBefore(list, sec.firstChild);
    function activate(i, focus) {
      btns.forEach(function (b, j) {
        var on = j === i;
        b.classList.toggle('is-active', on);
        b.setAttribute('aria-selected', String(on));
        b.tabIndex = on ? 0 : -1;
        tPanels[j].hidden = !on;
      });
      if (focus) btns[i].focus();
    }
    list.addEventListener('click', function (e) {
      var b = e.target.closest('.tabs__tab');
      if (b) activate(btns.indexOf(b), false);
    });
    list.addEventListener('keydown', function (e) {
      var i = btns.indexOf(document.activeElement);
      if (i < 0) return;
      var n = null;
      if (e.key === 'ArrowRight') n = (i + 1) % btns.length;
      else if (e.key === 'ArrowLeft') n = (i - 1 + btns.length) % btns.length;
      else if (e.key === 'Home') n = 0;
      else if (e.key === 'End') n = btns.length - 1;
      if (n != null) { e.preventDefault(); activate(n, true); }
    });
    activate(0, false);
  });

  /* ---- okuma ilerlemesi + paralaks --------------------------------------- */
  /* Kısa bir bölümde kaydırma yoksa çubuk kendini gizler — hep sıfırda duran
     bir gösterge ölü arayüzdür. */
  var bar = document.querySelector('.progress__bar');
  var wrap = document.querySelector('.progress');
  var ticking = false;

  function paint() {
    ticking = false;
    var max = scroller.scrollHeight - scroller.clientHeight;
    var p = max > 4 ? Math.min(1, scroller.scrollTop / max) : 0;
    if (bar) bar.style.setProperty('--p', p.toFixed(4));
    if (wrap) wrap.style.opacity = max > 4 ? '1' : '0';

    if (!reduce.matches && current) {
      var art = current.querySelector('[data-parallax]');
      if (art) {
        var y = Math.min(scroller.scrollTop, scroller.clientHeight) * -0.06;
        art.style.transform = 'translateY(' + y.toFixed(1) + 'px)';
      }
    }
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(paint); } }

  scroller.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });

  /* ---- açılış ------------------------------------------------------------- */
  var startId = location.hash.slice(1);
  if (!byId[startId]) startId = panels[0].id;
  /* ilk paneli geçişsiz kur */
  panels.forEach(function (p) { p.hidden = (p.id !== startId); });
  current = byId[startId];
  markLinks(startId);
  if (!reduce.matches) current.classList.add('is-first-in');
  paint();

  /* ---- ray bağlantıları: sayfa çıkışı ------------------------------------ */
  var home = document.querySelector('.rail__home');
  if (home) {
    home.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      doc.classList.add('is-leaving');
      var href = home.getAttribute('href');
      setTimeout(function () { window.location.href = href; }, reduce.matches ? 60 : 420);
    });
  }
  window.addEventListener('pageshow', function () { doc.classList.remove('is-leaving'); });
})();
