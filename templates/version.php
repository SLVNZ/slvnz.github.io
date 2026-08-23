<?php
/* Edition home: /4.0/ — overview of the three sections.
   Vars: $site, $versions, $v, $pages */
$vid = $v['id'];
ob_start(); ?>
<article class="prose">
  <p class="kicker">Sürüm <?= e($vid) ?><?= !empty($v['released']) ? ' · ' . e($v['released']) : '' ?></p>
  <h1><?= e($v['title'] ?: $site['name']) ?></h1>
  <?php if (!empty($v['summary'])): ?><p class="lede"><?= e($v['summary']) ?></p><?php endif; ?>
  <div class="section-grid">
    <?php foreach ($site['nav'] as $n):
      $list = array_values(array_filter($pages, fn($p) => $p['section'] === $n['section'])); ?>
    <section class="section-card">
      <h2><a href="<?= e(url("/$vid/{$n['section']}/")) ?>"><?= e($n['label']) ?></a></h2>
      <ol>
        <?php foreach (array_slice($list, 0, 6) as $p): ?>
        <li><a href="<?= e(url("/$vid/{$n['section']}/{$p['slug']}/")) ?>"><?= e($p['title']) ?></a></li>
        <?php endforeach; ?>
      </ol>
      <?php if (count($list) > 6): ?><a class="more" href="<?= e(url("/$vid/{$n['section']}/")) ?>">Tümü (<?= count($list) ?>)</a><?php endif; ?>
    </section>
    <?php endforeach; ?>
  </div>
</article>
<?php $body = ob_get_clean();
$title = "$vid {$v['title']}";
$description = $v['summary'] ?? '';
include TPL_DIR . '/_shell.php';
