<?php
/* Content page: /4.0/kurallar/temel-kurallar/
   Vars: $site, $versions, $v, $section, $label, $page, $pages, $others */
$vid = $v['id'];
$currentSlug = $page['slug'];
ob_start(); ?>
<article class="prose">
  <p class="kicker"><?= e($label) ?> · <?= e($vid) ?></p>
  <h1><?= e($page['title']) ?></h1>
  <?php if (!empty($page['summary'])): ?><p class="lede"><?= e($page['summary']) ?></p><?php endif; ?>
  <?php if ($others): ?>
  <p class="alt-versions">Diğer sürümlerde:
    <?php foreach ($others as $o): ?><a href="<?= e(url("/{$o['version']}/{$o['section']}/{$o['slug']}/")) ?>"><?= e($o['version']) ?></a><?php endforeach; ?>
  </p>
  <?php endif; ?>
  <?= render_blocks($page['blocks'] ?? []) ?>
</article>
<?php $body = ob_get_clean();
$title = $page['title'];
$description = $page['summary'] ?? '';
include TPL_DIR . '/_shell.php';
