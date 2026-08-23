<?php
/* =========================================================================
   SLVNZ — block renderers (content JSON → HTML fragments)
   Used by the static builder. Every block type in BLOCK_TYPES has a
   render_<type>() here; the admin's block editor mirrors the same fields.
   ========================================================================= */
declare(strict_types=1);

/* ---------- rich text sanitiser ----------------------------------------- */
/* The admin's contenteditable produces HTML. Keep only structural tags the
   reading stylesheet knows; drop attributes except href/class on a few. */
function clean_html(string $html): string {
  $allowed = '<p><br><strong><em><b><i><u><s><ul><ol><li><h2><h3><h4><a><blockquote><code><hr><span>';
  $html = strip_tags($html, $allowed);
  // strip every attribute, then re-allow href (http/https/relative) and class="dice"
  $html = preg_replace_callback('/<(a|code|span)\b([^>]*)>/i', function ($m) {
    $tag = strtolower($m[1]); $attrs = $m[2]; $keep = '';
    if ($tag === 'a' && preg_match('/href\s*=\s*"([^"]*)"/i', $attrs, $h)) {
      $href = $h[1];
      if (preg_match('#^(https?://|/|\.|\#|mailto:)#i', $href)) $keep .= ' href="' . e($href) . '"';
      if (preg_match('#^https?://#i', $href)) $keep .= ' rel="noopener"';
    }
    if (preg_match('/class\s*=\s*"([^"]*)"/i', $attrs, $c) && preg_match('/\bdice\b/', $c[1])) $keep .= ' class="dice"';
    return "<$tag$keep>";
  }, $html) ?? '';
  $html = preg_replace('/<(?!\/?(a|code|span)\b)(\w+)\b[^>]*>/i', '<$2>', $html) ?? '';
  $html = preg_replace('/<(\w+)>\s*<\/\1>/', '', $html) ?? '';       // empty elements
  return trim($html);
}

/* ---------- blocks -------------------------------------------------------- */
function render_blocks(array $blocks): string {
  $out = '';
  foreach ($blocks as $b) {
    $fn = 'render_' . ($b['type'] ?? '');
    if (function_exists($fn)) $out .= $fn($b) . "\n";
  }
  return $out;
}

function render_text(array $b): string {
  return clean_html($b['html'] ?? '');
}

function render_callout(array $b): string {
  $tone = in_array($b['tone'] ?? '', ['info', 'warn', 'gm'], true) ? $b['tone'] : 'info';
  $labels = ['info' => 'Not', 'warn' => 'Dikkat', 'gm' => 'Oyun Yöneticisi'];
  $title = trim((string) ($b['title'] ?? '')) ?: $labels[$tone];
  return '<aside class="callout callout--' . $tone . '" role="note">'
       . '<p class="callout__label">' . e($title) . '</p>'
       . '<div class="callout__body">' . clean_html($b['html'] ?? '') . '</div>'
       . '</aside>';
}

function render_skill(array $b): string {
  $meta = '';
  if (!empty($b['attribute']) || !empty($b['cost'])) {
    $meta = '<p class="skill__meta">'
          . (!empty($b['attribute']) ? '<span>' . e($b['attribute']) . '</span>' : '')
          . (!empty($b['cost']) ? '<span>' . e($b['cost']) . '</span>' : '')
          . '</p>';
  }
  $tags = array_filter(array_map('trim', (array) ($b['tags'] ?? [])));
  $tagHtml = $tags ? '<ul class="skill__tags">' . implode('', array_map(fn($t) => '<li>' . e($t) . '</li>', $tags)) . '</ul>' : '';
  return '<article class="skill">'
       . '<header class="skill__head"><h3 class="skill__name">' . e($b['name'] ?? '') . '</h3>' . $meta . '</header>'
       . '<div class="skill__body">' . clean_html($b['html'] ?? '') . '</div>'
       . $tagHtml
       . '</article>';
}

function render_table(array $b): string {
  $dice = !empty($b['dice']);
  $cols = array_values((array) ($b['columns'] ?? []));
  $rows = (array) ($b['rows'] ?? []);
  $h = '<div class="table-wrap"><table class="data-table' . ($dice ? ' data-table--dice' : '') . '">';
  if (!empty($b['caption'])) $h .= '<caption>' . e($b['caption']) . '</caption>';
  if ($cols) $h .= '<thead><tr>' . implode('', array_map(fn($c) => '<th scope="col">' . e($c) . '</th>', $cols)) . '</tr></thead>';
  $h .= '<tbody>';
  foreach ($rows as $r) {
    $h .= '<tr>';
    foreach (array_values((array) $r) as $i => $cell) {
      $h .= ($i === 0 && $dice) ? '<th scope="row">' . e($cell) . '</th>' : '<td>' . e($cell) . '</td>';
    }
    $h .= '</tr>';
  }
  return $h . '</tbody></table></div>';
}

function render_statblock(array $b): string {
  $stats = array_filter((array) ($b['stats'] ?? []), fn($s) => trim((string) ($s['key'] ?? '')) !== '');
  $dl = $stats ? '<dl class="statblock__stats">' . implode('', array_map(fn($s) =>
          '<div><dt>' . e($s['key']) . '</dt><dd>' . e($s['value'] ?? '') . '</dd></div>', $stats)) . '</dl>' : '';
  return '<article class="statblock">'
       . '<header class="statblock__head"><h3 class="statblock__name">' . e($b['name'] ?? '') . '</h3>'
       . (!empty($b['level']) ? '<p class="statblock__level">' . e($b['level']) . '</p>' : '') . '</header>'
       . $dl
       . '<div class="statblock__abilities">' . clean_html($b['html'] ?? '') . '</div>'
       . '</article>';
}

function render_columns(array $b): string {
  $ratio = in_array($b['ratio'] ?? '', ['1-1', '2-1', '1-2'], true) ? $b['ratio'] : '1-1';
  return '<div class="columns columns--' . $ratio . '">'
       . '<div class="column">' . clean_html($b['left'] ?? '') . '</div>'
       . '<div class="column">' . clean_html($b['right'] ?? '') . '</div>'
       . '</div>';
}

function render_figure(array $b): string {
  $width = in_array($b['width'] ?? '', ['text', 'wide', 'full'], true) ? $b['width'] : 'text';
  $src = url((string) ($b['image'] ?? ''));
  if ($src === '') return '';
  return '<figure class="figure figure--' . $width . '">'
       . '<img src="' . e($src) . '" alt="' . e($b['alt'] ?? '') . '" loading="lazy" decoding="async">'
       . (!empty($b['caption']) ? '<figcaption>' . e($b['caption']) . '</figcaption>' : '')
       . '</figure>';
}

/* ---------- URL helper ---------------------------------------------------- */
/* Every site URL goes through here so a repo-path deployment
   (https://user.github.io/repo/) works by setting "base": "/repo". */
function url(string $path): string {
  if ($path === '' || preg_match('#^(https?:)?//#', $path)) return $path;
  $base = rtrim((string) (site()['base'] ?? ''), '/');
  return $base . '/' . ltrim($path, '/');
}
