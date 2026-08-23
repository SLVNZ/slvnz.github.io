<?php
/* =========================================================================
   SLVNZ — admin panel (local only)
   Run:  php -S localhost:8000 -t admin        →  http://localhost:8000
   Every save writes content/*.json AND rebuilds docs/. Then: git commit.
   ========================================================================= */
declare(strict_types=1);
mb_internal_encoding('UTF-8');
require __DIR__ . '/lib/build.php';

// local only — this panel has no auth, so refuse anything that isn't loopback
if (!in_array($_SERVER['REMOTE_ADDR'] ?? '', ['127.0.0.1', '::1'], true)) {
  http_response_code(403); exit('Bu panel yalnızca yerel makineden açılabilir.');
}

$route = $_GET['r'] ?? 'dashboard';
$flash = null;

function redirect(string $to, ?string $msg = null): never {
  if ($msg) $to .= (str_contains($to, '?') ? '&' : '?') . 'msg=' . rawurlencode($msg);
  header("Location: $to"); exit;
}
function rebuild(): string {
  $r = build_all();
  return "Kaydedildi · docs/ yeniden üretildi ({$r['pages']} sayfa)";
}
function post(string $k, string $default = ''): string { return trim((string) ($_POST[$k] ?? $default)); }

/* ---------- POST handlers ------------------------------------------------ */
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  switch ($route) {

    case 'site':
      $s = site();
      $s['name']      = post('name') ?: 'SLVNZ';
      $s['eyebrow']   = post('eyebrow');
      $s['copyright'] = post('copyright');
      $s['base']      = rtrim(post('base'), '/');
      $nav = [];
      foreach ((array) ($_POST['nav_label'] ?? []) as $i => $label) {
        $label = trim((string) $label); $sec = trim((string) ($_POST['nav_section'][$i] ?? ''));
        if ($label !== '' && isset(SECTIONS[$sec])) $nav[] = ['label' => $label, 'section' => $sec];
      }
      $s['nav'] = $nav;
      save_site($s);
      redirect('?r=site', rebuild());

    case 'version':
      $id = post('id');
      if (!version_key($id)) redirect('?r=versions', 'Sürüm numarası 4.0 biçiminde olmalı.');
      $old = post('old_id');
      $v = [
        'id' => $id, 'title' => post('title'), 'status' => in_array(post('status'), ['current', 'archived', 'draft'], true) ? post('status') : 'draft',
        'released' => post('released'), 'summary' => post('summary'),
      ];
      if ($v['status'] === 'current') {                       // only one current edition
        foreach (versions() as $o) if ($o['id'] !== $id && ($o['status'] ?? '') === 'current') { $o['status'] = 'archived'; save_version($o); }
      }
      if ($old && $old !== $id) {                             // renamed: move its pages too
        @unlink(CONTENT_DIR . "/versions/$old.json");
        if (is_dir(CONTENT_DIR . "/pages/$old")) rename(CONTENT_DIR . "/pages/$old", CONTENT_DIR . "/pages/$id");
        foreach (pages($id) as $p) { $p['version'] = $id; save_page($p); }
      }
      save_version($v);
      redirect('?r=versions', rebuild());

    case 'version-delete':
      delete_version(post('id'));
      redirect('?r=versions', rebuild());

    case 'version-copy':                                       // clone all pages of one edition into another
      $from = post('from'); $to = post('to');
      if (!version_key($to) || !version($from)) redirect('?r=versions', 'Geçersiz sürüm.');
      if (!version($to)) save_version(['id' => $to, 'title' => version($from)['title'] ?? '', 'status' => 'draft', 'released' => '', 'summary' => '']);
      $n = 0;
      foreach (pages($from) as $p) { $p['version'] = $to; if (!page($to, $p['section'], $p['slug'])) { save_page($p); $n++; } }
      redirect('?r=versions', "$n sayfa $from → $to kopyalandı · " . rebuild());

    case 'page':
      $old = null;
      if (post('old_id')) { [$ov, $os, $osl] = explode('/', post('old_id')) + [null, null, null]; $old = page((string) $ov, (string) $os, (string) $osl); }
      $blocks = json_decode((string) ($_POST['blocks'] ?? '[]'), true);
      if (!is_array($blocks)) $blocks = [];
      $blocks = array_values(array_filter($blocks, fn($b) => is_array($b) && isset(BLOCK_TYPES[$b['type'] ?? ''])));
      $p = [
        'title'   => post('title') ?: 'Adsız',
        'version' => post('version'),
        'section' => isset(SECTIONS[post('section')]) ? post('section') : 'kurallar',
        'slug'    => slugify(post('slug') ?: post('title')),
        'order'   => (int) post('order', '0'),
        'draft'   => isset($_POST['draft']),
        'summary' => post('summary'),
        'blocks'  => $blocks,
      ];
      if (!version($p['version'])) redirect('?r=pages', 'Sürüm bulunamadı.');
      save_page($p, $old);
      redirect('?r=page&id=' . rawurlencode(page_id($p)), rebuild());

    case 'page-delete':
      [$v, $s, $sl] = explode('/', post('id')) + [null, null, null];
      delete_page((string) $v, (string) $s, (string) $sl);
      redirect('?r=pages', rebuild());

    case 'upload':                                             // image upload for the figure block (JSON response)
      header('Content-Type: application/json');
      $f = $_FILES['file'] ?? null;
      if (!$f || $f['error'] !== UPLOAD_ERR_OK) { echo json_encode(['error' => 'Yükleme başarısız']); exit; }
      $ext = strtolower(pathinfo($f['name'], PATHINFO_EXTENSION));
      if (!in_array($ext, ['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'], true)) { echo json_encode(['error' => 'Desteklenmeyen dosya türü']); exit; }
      $name = slugify(pathinfo($f['name'], PATHINFO_FILENAME)) . '-' . substr(md5_file($f['tmp_name']), 0, 6) . ".$ext";
      $dir = DOCS_DIR . '/images/content';
      if (!is_dir($dir)) mkdir($dir, 0777, true);
      move_uploaded_file($f['tmp_name'], "$dir/$name");
      echo json_encode(['path' => "/images/content/$name"]); exit;

    case 'build':
      redirect('?r=dashboard', rebuild());
  }
  redirect('?r=dashboard');
}

/* ---------- GET views ----------------------------------------------------- */
$flash = $_GET['msg'] ?? null;
$site = site();
$allVersions = versions();

$view = match ($route) {
  'pages', 'page', 'versions', 'site' => $route,
  default => 'dashboard',
};

$vars = ['site' => $site, 'allVersions' => $allVersions, 'flash' => $flash, 'route' => $route];
if ($view === 'pages') {
  $vars['filterV'] = $_GET['v'] ?? '';
  $vars['list'] = pages($vars['filterV'] ?: null);
}
if ($view === 'page') {
  $id = (string) ($_GET['id'] ?? '');
  $p = null;
  if ($id !== '') { [$v, $s, $sl] = explode('/', $id) + [null, null, null]; $p = page((string) $v, (string) $s, (string) $sl); }
  if (!$p) {
    $cur = current_version();
    $p = ['title' => '', 'version' => $_GET['v'] ?? ($cur['id'] ?? ''), 'section' => $_GET['s'] ?? 'kurallar', 'slug' => '', 'order' => 0, 'draft' => false, 'summary' => '', 'blocks' => []];
    $id = '';
  }
  $vars['p'] = $p; $vars['id'] = $id;
}
if ($view === 'dashboard') {
  $vars['counts'] = ['pages' => count(pages()), 'drafts' => count(array_filter(pages(), fn($p) => !empty($p['draft']))), 'versions' => count($allVersions)];
  $vars['recent'] = array_slice(pages(), 0, 8);
  $vars['built'] = is_file(DOCS_DIR . '/index.html') ? date('d.m.Y H:i', (int) filemtime(DOCS_DIR . '/index.html')) : null;
}

extract($vars);
include __DIR__ . '/views/_layout.php';
