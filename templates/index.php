<?php
/* Title page — 1:1 port of the Figma frame "Desktop - 1".
   Vars: $site, $versions (published, newest first), $current */
$vid   = $current['id'] ?? '';
$genre = $current['title'] ?? '';
$title = trim("{$site['name']} $vid $genre — {$site['eyebrow']}");
$description = "{$site['name']} $vid $genre — " . mb_strtolower($site['eyebrow']) . '.';
include TPL_DIR . '/_head.php';
?>

<body>
<a class="skip-link" href="#icerik">İçeriğe geç</a>

<div class="page">

  <header class="page__head">
    <p class="eyebrow"><?= e($site['eyebrow']) ?></p>
  </header>

  <main class="page__body" id="icerik">

    <section class="titleblock" aria-labelledby="baslik">

      <picture class="titleblock__art">
        <source srcset="<?= e(url('/images/titlepage-art.webp')) ?>" type="image/webp">
        <img src="<?= e(url('/images/titlepage-art.png')) ?>" width="1900" height="1084" alt="" decoding="async" fetchpriority="high">
      </picture>

      <h1 class="wordmark" id="baslik" aria-label="<?= e("{$site['name']} $vid — $genre") ?>">
        <span class="wordmark__lockup">
          <span class="wordmark__name"><?= e($site['name']) ?></span><span class="wordmark__version version">
            <button class="version__btn" type="button" aria-haspopup="listbox" aria-expanded="false" aria-controls="surum-menu" aria-label="Sürüm seç: <?= e($vid) ?>">
              <span class="version__glyph" data-text="<?= e($vid) ?>"><?= e($vid) ?></span>
            </button>
            <ul class="version__menu" id="surum-menu" role="listbox" aria-label="Sürümler" hidden>
              <?php foreach ($versions as $v): ?>
              <li role="option" aria-selected="<?= $v['id'] === $vid ? 'true' : 'false' ?>">
                <a class="version__opt" href="<?= e(url("/{$v['id']}/")) ?>"><?= e($v['id']) ?><?= ($v['status'] ?? '') === 'current' ? ' <small>güncel</small>' : '' ?></a>
              </li>
              <?php endforeach; ?>
            </ul>
          </span>
        </span>
        <span class="wordmark__genre"><?= e($genre) ?></span>
      </h1>

    </section>

    <nav class="mainnav" aria-label="Ana menü">
      <ul class="mainnav__list">
        <?php foreach ($site['nav'] as $n): ?>
        <li><a class="mainnav__link" href="<?= e(url("/$vid/{$n['section']}/")) ?>"><?= e($n['label']) ?></a></li>
        <?php endforeach; ?>
      </ul>
    </nav>

  </main>

  <footer class="page__foot">
    <?php include TPL_DIR . '/_toggle.php'; ?>
    <p class="copyright"><span aria-hidden="true">©</span> <?= e(preg_replace('/^©\s*/u', '', $site['copyright'])) ?></p>
  </footer>

</div>
<script src="<?= e(url('/assets/js/theme.js')) ?>" defer></script>
<script src="<?= e(url('/assets/js/nav.js')) ?>" defer></script>
<script src="<?= e(url('/assets/js/version.js')) ?>" defer></script>
</body>
</html>
