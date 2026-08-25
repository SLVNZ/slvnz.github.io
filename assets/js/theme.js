/* SLVNZ theme controller
   ----------------------
   Three states: no attribute (follow the OS), data-theme="light",
   data-theme="dark". The choice persists in localStorage and is restored
   by the inline script in <head> before first paint, so there is no flash.

   Reusable on any page: include the token stylesheet, this file, and one
   or more <button data-theme-toggle> elements. Public API: window.SLVNZTheme
   .get() → 'light' | 'dark'   .set('dark')   .reset() → follow the OS again. */
(function () {
  var KEY  = 'slvnz-theme';
  var root = document.documentElement;
  var mq   = window.matchMedia('(prefers-color-scheme: dark)');

  function current() {
    var t = root.getAttribute('data-theme');
    return (t === 'light' || t === 'dark') ? t : (mq.matches ? 'dark' : 'light');
  }

  function syncMeta() {
    var meta = document.querySelector('meta[name="theme-color"]:not([media])');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'theme-color';
      document.head.appendChild(meta);
    }
    meta.content = getComputedStyle(root).getPropertyValue('--paper').trim();
  }

  function render() {
    var dark = current() === 'dark';
    var btns = document.querySelectorAll('[data-theme-toggle]');
    for (var i = 0; i < btns.length; i++) btns[i].setAttribute('aria-checked', String(dark));
    syncMeta();
  }

  /* Tema değişimi süresince bir işaret sınıfı: menü harflerinin renk akışı
     normalde sağdan sola boşalır (hover'dan çıkış hareketi), tema geçişinde
     ise soldan sağa dolsun. Süre en uzun menü sözcüğünü kapsar
     (harf başına .028s gecikme + .26s geçiş). */
  var swTimer = null;
  function markSwitch() {
    root.classList.add('theme-switching');
    clearTimeout(swTimer);
    swTimer = setTimeout(function () { root.classList.remove('theme-switching'); }, 800);
  }

  function apply(theme, persist) {
    markSwitch();
    root.setAttribute('data-theme', theme);
    if (persist) { try { localStorage.setItem(KEY, theme); } catch (e) {} }
    render();
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('[data-theme-toggle]');
    if (btn) apply(current() === 'dark' ? 'light' : 'dark', true);
  });

  // follow OS changes while the user has not chosen explicitly
  if (mq.addEventListener) {
    mq.addEventListener('change', function () {
      if (!root.hasAttribute('data-theme')) { markSwitch(); render(); }
    });
  }

  // keep multiple open tabs in sync
  window.addEventListener('storage', function (e) {
    if (e.key === KEY) {
      if (e.newValue === 'light' || e.newValue === 'dark') apply(e.newValue, false);
      else { root.removeAttribute('data-theme'); render(); }
    }
  });

  render();

  // enable colour transitions only after the first paint
  requestAnimationFrame(function () {
    requestAnimationFrame(function () { root.classList.add('theme-ready'); });
  });

  window.SLVNZTheme = {
    get:   current,
    set:   function (t) { apply(t, true); },
    reset: function () {
      root.removeAttribute('data-theme');
      try { localStorage.removeItem(KEY); } catch (e) {}
      render();
    }
  };
})();
