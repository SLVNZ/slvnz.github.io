/* SLVNZ admin — block editor + small UI helpers. No dependencies. */
(function () {
  'use strict';

  /* ======================================================================
     Generic helpers
     ====================================================================== */
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const el = (tag, attrs = {}, ...kids) => {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === 'class') n.className = v;
      else if (k === 'html') n.innerHTML = v;
      else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
      else if (v !== false && v != null) n.setAttribute(k, v === true ? '' : v);
    }
    for (const k of kids.flat()) if (k != null) n.append(k.nodeType ? k : document.createTextNode(String(k)));
    return n;
  };
  const slugify = (s) => s
    .replace(/[çÇ]/g, 'c').replace(/[ğĞ]/g, 'g').replace(/[ıIİ]/g, 'i').replace(/[öÖ]/g, 'o').replace(/[şŞ]/g, 's').replace(/[üÜ]/g, 'u')
    .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

  /* confirm buttons, dialogs, prompt forms, nav rows ---------------------- */
  document.addEventListener('click', (e) => {
    const c = e.target.closest('[data-confirm]');
    if (c && !confirm(c.dataset.confirm)) e.preventDefault();
    const o = e.target.closest('[data-open]');
    if (o) $(o.dataset.open)?.showModal();
    if (e.target.closest('[data-close]')) e.target.closest('dialog')?.close();
    if (e.target.closest('[data-remove-row]')) e.target.closest('.nav-row')?.remove();
    if (e.target.closest('[data-add-nav]')) $('#nav-rows').append($('#nav-row-tpl').content.cloneNode(true));
  });
  $$('form[data-prompt-to]').forEach((f) => f.addEventListener('submit', (e) => {
    const t = prompt(f.dataset.promptTo);
    if (!t) { e.preventDefault(); return; }
    f.to.value = t.trim();
  }));

  // slug auto-fill until the user edits the slug by hand
  const slugSrc = $('[data-slug-source]'), slugTgt = $('[data-slug-target]');
  if (slugSrc && slugTgt) {
    let manual = slugTgt.value !== '';
    slugTgt.addEventListener('input', () => { manual = slugTgt.value !== ''; });
    slugSrc.addEventListener('input', () => { if (!manual) slugTgt.placeholder = slugify(slugSrc.value) || 'otomatik'; });
  }

  /* ======================================================================
     Block editor
     ====================================================================== */
  const host = $('#blocks');
  if (!host) return;

  const data  = JSON.parse($('#page-data').textContent);
  const TYPES = data.types;
  let blocks  = data.blocks.map((b) => ({ ...b }));

  /* ---- rich text field (contenteditable + tiny toolbar) ----------------- */
  function richText(value, onChange, placeholder = 'Yazmaya başla…') {
    const area = el('div', { class: 'rt__area', contenteditable: 'true', 'data-placeholder': placeholder, html: value || '' });
    const cmd = (c, arg) => () => { area.focus(); document.execCommand(c, false, arg); onChange(area.innerHTML); };
    const bar = el('div', { class: 'rt__bar' },
      el('button', { type: 'button', title: 'Kalın (Ctrl+B)', onclick: cmd('bold') }, el('b', {}, 'B')),
      el('button', { type: 'button', title: 'İtalik (Ctrl+I)', onclick: cmd('italic') }, el('i', {}, 'I')),
      el('span', { class: 'rt__sep' }),
      el('button', { type: 'button', title: 'Başlık 2', onclick: cmd('formatBlock', 'h2') }, 'H2'),
      el('button', { type: 'button', title: 'Başlık 3', onclick: cmd('formatBlock', 'h3') }, 'H3'),
      el('button', { type: 'button', title: 'Paragraf', onclick: cmd('formatBlock', 'p') }, '¶'),
      el('span', { class: 'rt__sep' }),
      el('button', { type: 'button', title: 'Madde listesi', onclick: cmd('insertUnorderedList') }, '•'),
      el('button', { type: 'button', title: 'Numaralı liste', onclick: cmd('insertOrderedList') }, '1.'),
      el('button', { type: 'button', title: 'Alıntı', onclick: cmd('formatBlock', 'blockquote') }, '“'),
      el('span', { class: 'rt__sep' }),
      el('button', { type: 'button', title: 'Bağlantı', onclick: () => {
        const u = prompt('Bağlantı adresi:', 'https://'); if (u) cmd('createLink', u)();
      } }, '⛓'),
      el('button', { type: 'button', title: 'Zar (2d6 gibi)', onclick: () => {
        area.focus();
        const sel = window.getSelection(); const txt = sel && sel.toString() ? sel.toString() : prompt('Zar:', '2d6');
        if (txt) { document.execCommand('insertHTML', false, '<code class="dice">' + txt.replace(/[<>&]/g, '') + '</code>&nbsp;'); onChange(area.innerHTML); }
      } }, 'd6'),
      el('button', { type: 'button', title: 'Biçimi temizle', onclick: cmd('removeFormat') }, '✕'),
    );
    area.addEventListener('input', () => onChange(area.innerHTML));
    area.addEventListener('paste', (e) => {               // paste as plain text, keep paragraphs
      e.preventDefault();
      const t = (e.clipboardData || window.clipboardData).getData('text/plain');
      document.execCommand('insertHTML', false, t.split(/\n{2,}/).map((p) => '<p>' + p.replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c])).replace(/\n/g, '<br>') + '</p>').join(''));
      onChange(area.innerHTML);
    });
    return el('div', { class: 'rt' }, bar, area);
  }

  const input = (b, key, label, attrs = {}) =>
    el('label', { class: 'f' }, label, el('input', { value: b[key] ?? '', ...attrs, oninput: (e) => { b[key] = e.target.value; } }));
  const select = (b, key, label, opts) =>
    el('label', { class: 'f' }, label, el('select', { onchange: (e) => { b[key] = e.target.value; } },
      ...Object.entries(opts).map(([v, l]) => el('option', { value: v, selected: (b[key] ?? Object.keys(opts)[0]) === v }, l))));

  /* ---- per-type editors ------------------------------------------------- */
  const editors = {
    text: (b) => [richText(b.html, (h) => { b.html = h; })],

    callout: (b) => [
      el('div', { class: 'f-row' },
        select(b, 'tone', 'Ton', { info: 'Bilgi', warn: 'Uyarı', gm: 'OY notu' }),
        input(b, 'title', 'Başlık (isteğe bağlı)', { placeholder: 'boşsa tona göre' })),
      richText(b.html, (h) => { b.html = h; }),
    ],

    skill: (b) => [
      el('div', { class: 'f-row' },
        input(b, 'name', 'Yetenek adı', { required: true }),
        input(b, 'attribute', 'Bağlı nitelik', { placeholder: 'Güç' }),
        input(b, 'cost', 'Bedel', { placeholder: '2 puan' })),
      el('label', { class: 'f' }, 'Etiketler (virgülle)',
        el('input', { value: (b.tags || []).join(', '), oninput: (e) => { b.tags = e.target.value.split(',').map((s) => s.trim()).filter(Boolean); } })),
      richText(b.html, (h) => { b.html = h; }, 'Açıklama…'),
    ],

    table: (b) => {
      b.columns = b.columns || ['', '']; b.rows = b.rows || [['', '']];
      const wrap = el('div');
      const draw = () => {
        wrap.replaceChildren(
          el('div', { class: 'f-row' },
            input(b, 'caption', 'Başlık'),
            el('label', { class: 'f f--check' }, el('input', { type: 'checkbox', checked: !!b.dice, onchange: (e) => { b.dice = e.target.checked; } }), ' İlk sütun zar sonucu')),
          el('div', { class: 'grid-edit' },
            el('table', {},
              el('thead', {}, el('tr', {},
                ...b.columns.map((c, i) => el('th', {}, el('input', { value: c, placeholder: 'Sütun', oninput: (e) => { b.columns[i] = e.target.value; } }))),
                el('th', { class: 'grid-edit__ctl' }, el('button', { type: 'button', class: 'mini', title: 'Sütun ekle', onclick: () => { b.columns.push(''); b.rows.forEach((r) => r.push('')); draw(); } }, '+')))),
              el('tbody', {},
                ...b.rows.map((r, ri) => el('tr', {},
                  ...r.map((c, ci) => el('td', {}, el('input', { value: c, oninput: (e) => { b.rows[ri][ci] = e.target.value; } }))),
                  el('td', { class: 'grid-edit__ctl' }, el('button', { type: 'button', class: 'mini', title: 'Satırı sil', onclick: () => { b.rows.splice(ri, 1); draw(); } }, '×'))))))),
          el('div', { class: 'f-row' },
            el('button', { type: 'button', class: 'btn btn--ghost btn--sm', onclick: () => { b.rows.push(b.columns.map(() => '')); draw(); } }, '+ Satır'),
            el('button', { type: 'button', class: 'btn btn--ghost btn--sm', onclick: () => { if (b.columns.length > 1) { b.columns.pop(); b.rows.forEach((r) => r.pop()); draw(); } } }, '− Son sütun')),
        );
      };
      draw();
      return [wrap];
    },

    statblock: (b) => {
      b.stats = b.stats || [{ key: 'Can', value: '' }, { key: 'Zırh', value: '' }];
      const list = el('div', { class: 'kv' });
      const draw = () => list.replaceChildren(...b.stats.map((s, i) => el('div', { class: 'kv__row' },
        el('input', { value: s.key, placeholder: 'Nitelik', oninput: (e) => { s.key = e.target.value; } }),
        el('input', { value: s.value, placeholder: 'Değer', oninput: (e) => { s.value = e.target.value; } }),
        el('button', { type: 'button', class: 'mini', onclick: () => { b.stats.splice(i, 1); draw(); } }, '×'))));
      draw();
      return [
        el('div', { class: 'f-row' }, input(b, 'name', 'Ad', { required: true }), input(b, 'level', 'Seviye / Tehlike')),
        el('div', { class: 'f' }, 'Nitelikler', list, el('button', { type: 'button', class: 'btn btn--ghost btn--sm', onclick: () => { b.stats.push({ key: '', value: '' }); draw(); } }, '+ Nitelik')),
        richText(b.html, (h) => { b.html = h; }, 'Özel yetenekler…'),
      ];
    },

    columns: (b) => [
      select(b, 'ratio', 'Oran', { '1-1': '1 : 1', '2-1': '2 : 1', '1-2': '1 : 2' }),
      el('div', { class: 'cols-edit' },
        richText(b.left, (h) => { b.left = h; }, 'Sol sütun…'),
        richText(b.right, (h) => { b.right = h; }, 'Sağ sütun…')),
    ],

    figure: (b) => {
      const preview = el('img', { class: 'fig-prev', src: b.image || '', alt: '' });
      const path = el('input', { value: b.image || '', placeholder: '/images/content/…', oninput: (e) => { b.image = e.target.value; preview.src = e.target.value; } });
      const file = el('input', { type: 'file', accept: 'image/*', onchange: async (e) => {
        const f = e.target.files[0]; if (!f) return;
        const fd = new FormData(); fd.append('file', f);
        const r = await fetch('?r=upload', { method: 'POST', body: fd }).then((x) => x.json());
        if (r.error) { alert(r.error); return; }
        b.image = r.path; path.value = r.path; preview.src = r.path;
      } });
      return [
        el('div', { class: 'fig-edit' }, preview,
          el('div', {},
            el('label', { class: 'f' }, 'Görsel yolu', path),
            el('label', { class: 'f' }, 'Yükle', file))),
        el('div', { class: 'f-row' },
          input(b, 'alt', 'Alternatif metin', { required: true }),
          input(b, 'caption', 'Alt yazı'),
          select(b, 'width', 'Genişlik', { text: 'Metin genişliği', wide: 'Geniş', full: 'Tam' })),
      ];
    },
  };

  /* ---- block list ------------------------------------------------------- */
  function render() {
    host.replaceChildren(...blocks.map((b, i) => {
      const body = el('div', { class: 'block__body' }, ...(editors[b.type] ? editors[b.type](b) : [el('p', {}, 'Bilinmeyen blok')]));
      return el('article', { class: 'block', draggable: 'true', 'data-i': i },
        el('header', { class: 'block__head' },
          el('span', { class: 'block__grip', title: 'Sürükle' }, '⋮⋮'),
          el('span', { class: 'block__type' }, TYPES[b.type] || b.type),
          el('span', { class: 'block__ctl' },
            el('button', { type: 'button', class: 'mini', title: 'Yukarı', disabled: i === 0, onclick: () => move(i, -1) }, '↑'),
            el('button', { type: 'button', class: 'mini', title: 'Aşağı', disabled: i === blocks.length - 1, onclick: () => move(i, 1) }, '↓'),
            el('button', { type: 'button', class: 'mini', title: 'Çoğalt', onclick: () => { blocks.splice(i + 1, 0, JSON.parse(JSON.stringify(b))); render(); } }, '⧉'),
            el('button', { type: 'button', class: 'mini mini--danger', title: 'Sil', onclick: () => { if (confirm('Blok silinsin mi?')) { blocks.splice(i, 1); render(); } } }, '×'))),
        body);
    }));
    if (!blocks.length) host.append(el('p', { class: 'empty' }, 'Henüz blok yok — aşağıdan ekle.'));
  }
  function move(i, d) { const j = i + d; if (j < 0 || j >= blocks.length) return; [blocks[i], blocks[j]] = [blocks[j], blocks[i]]; render(); }

  // drag & drop reorder
  let dragFrom = null;
  host.addEventListener('dragstart', (e) => { const a = e.target.closest('.block'); if (!a) return; dragFrom = +a.dataset.i; a.classList.add('is-dragging'); });
  host.addEventListener('dragover', (e) => { e.preventDefault(); const a = e.target.closest('.block'); $$('.block', host).forEach((x) => x.classList.toggle('is-over', x === a)); });
  host.addEventListener('drop', (e) => {
    e.preventDefault(); const a = e.target.closest('.block'); if (!a || dragFrom == null) return;
    const to = +a.dataset.i; const [m] = blocks.splice(dragFrom, 1); blocks.splice(to, 0, m); dragFrom = null; render();
  });
  host.addEventListener('dragend', () => $$('.block', host).forEach((x) => x.classList.remove('is-dragging', 'is-over')));

  // add
  $$('[data-add-block]').forEach((btn) => btn.addEventListener('click', () => {
    const t = btn.dataset.addBlock;
    const fresh = { text: { html: '' }, callout: { tone: 'info', title: '', html: '' }, skill: { name: '', attribute: '', cost: '', tags: [], html: '' },
      table: { caption: '', columns: ['', ''], rows: [['', '']], dice: true }, statblock: { name: '', level: '', stats: [{ key: 'Can', value: '' }, { key: 'Zırh', value: '' }], html: '' },
      columns: { ratio: '1-1', left: '', right: '' }, figure: { image: '', alt: '', caption: '', width: 'text' } }[t] || {};
    blocks.push({ type: t, ...fresh }); render();
    host.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }));

  // serialise on submit
  $('#page-form').addEventListener('submit', () => { $('#blocks-json').value = JSON.stringify(blocks); });

  // Ctrl+S saves
  document.addEventListener('keydown', (e) => { if ((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); $('#page-form').requestSubmit(); } });

  render();
})();
