<?php
/* Reading shell for edition pages: top bar, optional sidebar, article.
   Vars: $site, $versions, $v, $title, $description, $section (opt),
         $pages (all of this edition), $currentSlug (opt), $body (html) */
$vid = $v['id'];
$extraCss = ['/assets/css/rulebook.css'];
$pageTitle = "$title — {$site['name']} $vid";
$title = $pageTitle;
include TPL_DIR . '/_head.php';
$side = isset($section) ? array_values(array_filter($pages, fn($p) => $p['section'] === $section)) : [];
?>

<body class="is-rulebook">
<a class="skip-link" href="#icerik">İçeriğe geç</a>

<header class="topbar">
  <a class="topbar__brand" href="<?= e(url('/')) ?>" aria-label="Başa dön">
    <span class="topbar__name"><?= e($site['name']) ?></span><span class="topbar__ver"><?= e($vid) ?></span>
  </a>
  <nav class="topbar__nav" aria-label="Bölümler">
    <?php foreach ($site['nav'] as $n): ?>
    <a href="<?= e(url("/$vid/{$n['section']}/")) ?>"<?= (isset($section) && $n['section'] === $section) ? ' aria-current="page"' : '' ?>><?= e($n['label']) ?></a>
    <?php endforeach; ?>
  </nav>
  <select class="topbar__switch" data-version-switch data-base="<?= e(rtrim((string) ($site['base'] ?? ''), '/')) ?>" aria-label="Sürüm değiştir">
    <?php foreach ($versions as $x): ?>
    <option value="<?= e($x['id']) ?>"<?= $x['id'] === $vid ? ' selected' : '' ?>><?= e($x['id']) ?><?= ($x['status'] ?? '') === 'archived' ? ' · arşiv' : '' ?></option>
    <?php endforeach; ?>
  </select>
</header>

<?php if (($v['status'] ?? '') === 'archived'): ?>
<p class="notice" role="status">Bu sayfa arşivlenmiş <strong><?= e($vid) ?></strong> sürümüne ait. <a href="<?= e(url('/')) ?>">Güncel sürüme geç</a></p>
<?php endif; ?>

<div class="reader" id="icerik">
  <?php if (isset($section)): ?>
  <aside class="reader__side">
    <p class="reader__side-title"><?= e(SECTIONS[$section]) ?></p>
    <ol class="reader__toc">
      <?php foreach ($side as $p): ?>
      <li><a href="<?= e(url("/$vid/$section/{$p['slug']}/")) ?>"<?= (($currentSlug ?? null) === $p['slug']) ? ' aria-current="page"' : '' ?>><?= e($p['title']) ?></a></li>
      <?php endforeach; ?>
    </ol>
  </aside>
  <?php endif; ?>
  <main class="reader__main">
    <?= $body ?>
  </main>
</div>

<footer class="site-foot">
  <?php include TPL_DIR . '/_toggle.php'; ?>
  <p class="copyright"><span aria-hidden="true">©</span> <?= e(preg_replace('/^©\s*/u', '', $site['copyright'])) ?></p>
</footer>

<script src="<?= e(url('/assets/js/theme.js')) ?>" defer></script>
<script>
  // switch edition but stay on the same section/page path
  document.querySelectorAll('[data-version-switch]').forEach(function (sel) {
    sel.addEventListener('change', function () {
      var base = sel.getAttribute('data-base') || '';
      var path = location.pathname.slice(base.length);
      var parts = path.split('/').filter(Boolean);
      parts[0] = sel.value;
      location.href = base + '/' + parts.join('/') + '/';
    });
  });
</script>
</body>
</html>
