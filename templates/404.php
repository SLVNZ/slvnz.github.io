<?php
/* GitHub Pages serves /404.html for unknown paths. Vars: $site, $current */
$title = "Sayfa bulunamadı — {$site['name']}";
$description = '';
$extraCss = ['/assets/css/rulebook.css'];
include TPL_DIR . '/_head.php'; ?>
<body class="is-rulebook">
<div class="reader" id="icerik" style="min-height:70vh;align-content:center">
  <main class="reader__main"><article class="prose">
    <p class="kicker">404</p>
    <h1>Bu sayfa yok</h1>
    <p class="lede">Aradığın sayfa taşınmış ya da hiç yazılmamış olabilir.</p>
    <p><a href="<?= e(url('/')) ?>">Başa dön</a><?php if ($current): ?> · <a href="<?= e(url("/{$current['id']}/")) ?>"><?= e($current['id']) ?> sürümü</a><?php endif; ?></p>
  </article></main>
</div>
<script src="<?= e(url('/assets/js/theme.js')) ?>" defer></script>
</body>
</html>
