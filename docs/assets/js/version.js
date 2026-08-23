/* SLVNZ version selector — the "4.0" mark opens a small listbox. */
(function () {
  var btn  = document.querySelector('.version__btn');
  var menu = document.querySelector('.version__menu');
  if (!btn || !menu) return;
  var opts = menu.querySelectorAll('.version__opt');

  function open()  { menu.hidden = false; btn.setAttribute('aria-expanded', 'true'); }
  function close() { menu.hidden = true;  btn.setAttribute('aria-expanded', 'false'); }
  function isOpen() { return !menu.hidden; }

  btn.addEventListener('click', function () { isOpen() ? close() : (open(), opts[0] && opts[0].focus()); });

  document.addEventListener('click', function (e) {
    if (isOpen() && !menu.contains(e.target) && !btn.contains(e.target)) close();
  });

  document.addEventListener('keydown', function (e) {
    if (!isOpen()) {
      if ((e.key === 'ArrowDown' || e.key === 'ArrowUp') && document.activeElement === btn) { e.preventDefault(); open(); opts[0].focus(); }
      return;
    }
    var i = Array.prototype.indexOf.call(opts, document.activeElement);
    if (e.key === 'Escape') { close(); btn.focus(); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); opts[(i + 1) % opts.length].focus(); }
    else if (e.key === 'ArrowUp')   { e.preventDefault(); opts[(i - 1 + opts.length) % opts.length].focus(); }
    else if (e.key === 'Home') { e.preventDefault(); opts[0].focus(); }
    else if (e.key === 'End')  { e.preventDefault(); opts[opts.length - 1].focus(); }
    else if (e.key === 'Tab')  { close(); }
  });
})();
