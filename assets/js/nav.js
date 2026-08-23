/* SLVNZ nav interactions — ink-soak hover, page exit.
   Progressive enhancement: without JS the menu is plain, working markup.

   1. Splits each item's text into letters so CSS can stagger the colour
      change per letter (ink soaking through the word).
   2. On click, runs a short exit sequence before following the link.
      Modifier-clicks / middle-clicks / new-tab targets are left alone.
      Items without an href (the menu is inert until its pages exist) fall
      straight through this step, so no wiring changes when one gains one. */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var links = document.querySelectorAll('.mainnav__link');
  if (!links.length) return;

  /* ---- 1. split letters ------------------------------------------------ */
  links.forEach(function (link) {
    var text = link.textContent.trim();
    link.textContent = '';

    // the letters below are decorative; the whole word is kept here for
    // assistive tech. A hidden copy, not aria-label: that would be dropped
    // on the plain <span> an item is while it has no page to point at.
    var label = document.createElement('span');
    label.className = 'visually-hidden';
    label.textContent = text;
    link.appendChild(label);

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
