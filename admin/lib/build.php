<?php
/* =========================================================================
   SLVNZ — static builder
   Renders every template into docs/. Called by the admin after each save
   and by build.php from the CLI. docs/ is what GitHub Pages publishes.
   ========================================================================= */
declare(strict_types=1);

require_once __DIR__ . '/store.php';
require_once __DIR__ . '/render.php';

/** Render a template file with variables, return HTML. */
function tpl(string $name, array $vars = []): string {
  extract($vars, EXTR_SKIP);
  ob_start();
  include TPL_DIR . "/$name.php";
  return (string) ob_get_clean();
}

function emit(string $relPath, string $html): void {
  $path = DOCS_DIR . '/' . ltrim($relPath, '/');
  if (!is_dir(dirname($path))) mkdir(dirname($path), 0777, true);
  file_put_contents($path, $html, LOCK_EX);
}

/** @return array{pages:int, files:string[]} */
function build_all(): array {
  $site     = site();
  $versions = published_versions();
  $current  = current_version();
  $files    = [];

  // wipe generated edition folders (never assets/ or images/)
  foreach (glob(DOCS_DIR . '/*', GLOB_ONLYDIR) ?: [] as $d) {
    if (version_key(basename($d))) rrmdir($d);
  }

  // title page
  emit('index.html', tpl('index', compact('site', 'versions', 'current')));
  $files[] = 'index.html';

  // 404 (GitHub Pages serves /404.html)
  emit('404.html', tpl('404', compact('site', 'current')));
  $files[] = '404.html';

  $count = 0;
  foreach ($versions as $v) {
    $vid   = $v['id'];
    $pages = pages($vid, null, false);

    emit("$vid/index.html", tpl('version', ['site' => $site, 'versions' => $versions, 'v' => $v, 'pages' => $pages]));
    $files[] = "$vid/index.html";

    foreach (SECTIONS as $sec => $label) {
      $list = array_values(array_filter($pages, fn($p) => $p['section'] === $sec));
      emit("$vid/$sec/index.html", tpl('section', [
        'site' => $site, 'versions' => $versions, 'v' => $v, 'section' => $sec, 'label' => $label, 'list' => $list, 'pages' => $pages,
      ]));
      $files[] = "$vid/$sec/index.html";

      foreach ($list as $p) {
        emit("$vid/$sec/{$p['slug']}/index.html", tpl('page', [
          'site' => $site, 'versions' => $versions, 'v' => $v, 'section' => $sec, 'label' => $label,
          'page' => $p, 'pages' => $pages, 'others' => siblings($p),
        ]));
        $files[] = "$vid/$sec/{$p['slug']}/index.html";
        $count++;
      }
    }
  }

  // keep Pages from running Jekyll on the output
  if (!is_file(DOCS_DIR . '/.nojekyll')) file_put_contents(DOCS_DIR . '/.nojekyll', '');

  return ['pages' => $count, 'files' => $files];
}
