/* SLVNZ — sürüm seçim menüsü
   ============================================================================
   Kelime markasındaki "4.0" bir düğme: tıklayınca sürüm listesi açılır.
   Aşamalı iyileştirme: JS yokken düğme sessizce durur, menü açılmaz ama sayfa
   tam çalışır (menü işaretlemesi `hidden` ile başlar).

   Klavye — WAI-ARIA menü düzeni
   -----------------------------
   Enter / Boşluk / ↓   açar ve ilk öğeye odaklanır
   ↑                     açar ve son öğeye odaklanır
   ↑ ↓                   öğeler arasında döngüsel gezinir
   Home / End            ilk / son öğe
   Esc                   kapatır, odağı düğmeye geri verir
   Tab                   kapatır (odak doğal akışa döner)

   Arşiv sürümleri `aria-disabled` — odaklanılabilir kalır (varlığı duyulsun)
   ama etkinleştirilemez. Sayfası yazıldığında `<span>` `<a href>` olur ve
   `aria-disabled` kalkar; başka değişiklik gerekmez.
   ========================================================================== */
(function () {
  var btn = document.querySelector('[data-version-trigger]');
  var menu = document.querySelector('[data-version-menu]');
  if (!btn || !menu) return;

  var items = Array.prototype.slice.call(menu.querySelectorAll('[role="menuitem"]'));
  if (!items.length) return;
  items.forEach(function (el) { el.setAttribute('tabindex', '-1'); });

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var open = false;
  var closeTimer = null;

  function focusItem(i) {
    var n = items.length;
    items[((i % n) + n) % n].focus();
  }
  function activeIndex() { return items.indexOf(document.activeElement); }

  function setOpen(next, focusWhich) {
    if (next === open) return;
    open = next;
    btn.setAttribute('aria-expanded', String(open));
    clearTimeout(closeTimer);

    if (open) {
      menu.hidden = false;
      /* bir kare bekle ki `hidden` kalkışı ile sınıf geçişi ayrı karelerde
         olsun — yoksa tarayıcı geçişi atlar */
      requestAnimationFrame(function () { menu.classList.add('is-open'); });
      if (focusWhich === 'last') focusItem(items.length - 1);
      else if (focusWhich === 'first') focusItem(0);
    } else {
      menu.classList.remove('is-open');
      var wait = reduce.matches ? 0 : 200;
      closeTimer = setTimeout(function () { menu.hidden = true; }, wait);
    }
  }

  /* ---- düğme --------------------------------------------------------------- */
  btn.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();                 /* index'teki çıkış geçişini tetikleme */
    setOpen(!open, open ? null : 'first');
  });

  btn.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true, 'first'); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setOpen(true, 'last'); }
    else if (e.key === 'Escape' && open) { e.preventDefault(); setOpen(false); }
  });

  /* ---- menü ---------------------------------------------------------------- */
  menu.addEventListener('keydown', function (e) {
    var i = activeIndex();
    if (e.key === 'ArrowDown') { e.preventDefault(); focusItem(i + 1); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); focusItem(i - 1); }
    else if (e.key === 'Home') { e.preventDefault(); focusItem(0); }
    else if (e.key === 'End') { e.preventDefault(); focusItem(items.length - 1); }
    else if (e.key === 'Escape') { e.preventDefault(); setOpen(false); btn.focus(); }
    else if (e.key === 'Tab') { setOpen(false); }
  });

  /* Arşiv öğeleri tıklamayı yutar. Şimdiki sürüm zaten açık olan sayfaya
     bakar — oraya gitmek sayfayı boşuna yeniden yükler, o yüzden yalnız
     menüyü kapatır. (Bağlantı olarak kalır: 5.0 geldiğinde 4.0 arşiv
     bağlantısına döner, yapı hazır.) */
  items.forEach(function (el) {
    el.addEventListener('click', function (e) {
      if (el.getAttribute('aria-disabled') === 'true' ||
          el.getAttribute('aria-current')) { e.preventDefault(); }
      setOpen(false);
      btn.focus();
    });
  });

  /* ---- dışarı tıklama / odak kaybı ----------------------------------------- */
  document.addEventListener('click', function (e) {
    if (open && !menu.contains(e.target) && !btn.contains(e.target)) setOpen(false);
  });
  document.addEventListener('focusin', function (e) {
    if (open && !menu.contains(e.target) && !btn.contains(e.target)) setOpen(false);
  });
})();
