<?php
/* =========================================================================
   SLVNZ — content store
   Everything is a JSON file under content/. This file is the only place
   that touches the filesystem for content; admin and build both use it.
   ========================================================================= */
declare(strict_types=1);

const ROOT        = __DIR__ . '/../..';
const CONTENT_DIR = ROOT . '/content';
const DOCS_DIR    = ROOT . '/docs';
const TPL_DIR     = ROOT . '/templates';

const SECTIONS = [
  'kurallar'   => 'Oyun Kuralları',
  'yetenekler' => 'Yetenekler',
  'evren'      => 'Evren Rehberi',
];

const BLOCK_TYPES = [
  'text'      => 'Metin',
  'callout'   => 'Not kutusu',
  'skill'     => 'Yetenek kartı',
  'table'     => 'Tablo',
  'statblock' => 'Yaratık / NPC',
  'columns'   => 'İki sütun',
  'figure'    => 'Görsel',
];

/* ---------- low level --------------------------------------------------- */
function read_json(string $path): ?array {
  if (!is_file($path)) return null;
  $d = json_decode((string) file_get_contents($path), true);
  return is_array($d) ? $d : null;
}

function write_json(string $path, array $data): void {
  if (!is_dir(dirname($path))) mkdir(dirname($path), 0777, true);
  $json = json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  file_put_contents($path, $json . "\n", LOCK_EX);
}

function slugify(string $s): string {
  $map = ['ç'=>'c','Ç'=>'c','ğ'=>'g','Ğ'=>'g','ı'=>'i','I'=>'i','İ'=>'i','ö'=>'o','Ö'=>'o','ş'=>'s','Ş'=>'s','ü'=>'u','Ü'=>'u'];
  $s = strtr($s, $map);
  $s = strtolower($s);
  $s = preg_replace('/[^a-z0-9]+/', '-', $s) ?? '';
  return trim($s, '-') ?: 'sayfa';
}

function version_key(string $v): bool { return (bool) preg_match('/^\d+(\.\d+)?$/', $v); }

/* ---------- site ---------------------------------------------------------- */
function site(): array {
  return read_json(CONTENT_DIR . '/site.json') ?? [
    'name' => 'SLVNZ', 'eyebrow' => '', 'copyright' => '', 'base' => '', 'nav' => [],
  ];
}
function save_site(array $s): void { write_json(CONTENT_DIR . '/site.json', $s); }

/* ---------- versions ------------------------------------------------------ */
/** @return array<string, array> keyed by id, newest first */
function versions(): array {
  $out = [];
  foreach (glob(CONTENT_DIR . '/versions/*.json') ?: [] as $f) {
    $v = read_json($f);
    if ($v && isset($v['id'])) $out[$v['id']] = $v;
  }
  uksort($out, fn($a, $b) => (float) $b <=> (float) $a);
  return $out;
}
function version(string $id): ?array { return read_json(CONTENT_DIR . "/versions/$id.json"); }
function save_version(array $v): void { write_json(CONTENT_DIR . "/versions/{$v['id']}.json", $v); }
function delete_version(string $id): void {
  @unlink(CONTENT_DIR . "/versions/$id.json");
  rrmdir(CONTENT_DIR . "/pages/$id");
}
function current_version(): ?array {
  foreach (versions() as $v) if (($v['status'] ?? '') === 'current') return $v;
  $all = versions();
  return $all ? reset($all) : null;
}
function published_versions(): array {
  return array_filter(versions(), fn($v) => ($v['status'] ?? 'draft') !== 'draft');
}

/* ---------- pages --------------------------------------------------------- */
function page_path(string $version, string $section, string $slug): string {
  return CONTENT_DIR . "/pages/$version/$section/$slug.json";
}
function page_id(array $p): string { return "{$p['version']}/{$p['section']}/{$p['slug']}"; }

/** @return array<int, array> sorted by version desc, section, order, title */
function pages(?string $version = null, ?string $section = null, bool $includeDrafts = true): array {
  $pattern = CONTENT_DIR . '/pages/' . ($version ?? '*') . '/' . ($section ?? '*') . '/*.json';
  $out = [];
  foreach (glob($pattern) ?: [] as $f) {
    $p = read_json($f);
    if (!$p) continue;
    if (!$includeDrafts && !empty($p['draft'])) continue;
    $out[] = $p;
  }
  usort($out, function ($a, $b) {
    return ((float) $b['version'] <=> (float) $a['version'])
        ?: strcmp($a['section'], $b['section'])
        ?: (($a['order'] ?? 0) <=> ($b['order'] ?? 0))
        ?: strcoll($a['title'], $b['title']);
  });
  return $out;
}
function page(string $version, string $section, string $slug): ?array {
  return read_json(page_path($version, $section, $slug));
}
function save_page(array $p, ?array $old = null): void {
  if ($old && page_id($old) !== page_id($p)) @unlink(page_path($old['version'], $old['section'], $old['slug']));
  write_json(page_path($p['version'], $p['section'], $p['slug']), $p);
}
function delete_page(string $version, string $section, string $slug): void {
  @unlink(page_path($version, $section, $slug));
}
/** pages with the same slug in other editions */
function siblings(array $p): array {
  return array_values(array_filter(pages(null, null, false), fn($q) =>
    $q['slug'] === $p['slug'] && $q['section'] === $p['section'] && $q['version'] !== $p['version']));
}

/* ---------- util ------------------------------------------------------------ */
function rrmdir(string $dir): void {
  if (!is_dir($dir)) return;
  foreach (scandir($dir) ?: [] as $f) {
    if ($f === '.' || $f === '..') continue;
    $p = "$dir/$f";
    is_dir($p) ? rrmdir($p) : unlink($p);
  }
  rmdir($dir);
}

function e(?string $s): string { return htmlspecialchars((string) $s, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }
