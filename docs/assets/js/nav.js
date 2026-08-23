/* SLVNZ nav interactions — ink-soak hover, page exit.
   Progressive enhancement: without JS the links are plain, working links.

   1. Splits each link's text into letters so CSS can stagger the colour
      change per letter (ink soaking through the word).
   2. On click, runs a short exit sequence before following the link.
      Modifier-clicks / middle-clicks / new-tab targets are left alone.    */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var links = document.querySelectorAll('.mainnav__link');
  if (!links.length) return;

  /* ---- 1. split letters ------------------------------------------------ */
  links.forEach(function (link) {
    var text = link.textContent.trim();
    link.setAttribute('aria-label', text);          // SR reads the whole word
    link.textContent = '';
    var word = document.createElement('span');
    word.className = 'spell';
    word.setAttribute('aria-hidden', 'true');
    var chars = Array.from(text);                   // handles İ / ı correctly
    chars.forEach(function (ch, i) {
      var l = document.createElement('span');
      l.className = 'spell__l' + (ch === ' ' ? ' spell__l--space' : '');
      l.style.setProperty('--i', i);
      l.style.setProperty('--n', chars.length);
      l.textContent = ch;
      word.appendChild(l);
    });
    link.appendChild(word);
    link.classList.add('is-split');
  });

  /* ---- 2. exit --------------------------------------------------------- */
  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      // respect new-tab / download / modified clicks and external targets
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (link.target && link.target !== '_self') return;
      var href = link.getAttribute('href');
      if (!href || href.charAt(0) === '#') return;

      e.preventDefault();
      document.documentElement.classList.add('is-leaving');
      link.classList.add('is-chosen');

      var delay = reduce.matches ? 80 : 620;
      setTimeout(function () { window.location.href = href; }, delay);
    });
  });

  // coming back via bfcache: undo the exit state
  window.addEventListener('pageshow', function () {
    document.documentElement.classList.remove('is-leaving');
    links.forEach(function (l) { l.classList.remove('is-chosen'); });
  });
})();
