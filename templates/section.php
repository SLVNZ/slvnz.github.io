<?php
/* Section index: /4.0/kurallar/
   Vars: $site, $versions, $v, $section, $label, $list, $pages */
$vid = $v['id'];
ob_start(); ?>
<article class="prose">
  <p class="kicker">Sürüm <?= e($vid) ?></p>
  <h1><?= e($label) ?></h1>
  <?php if (!$list): ?>
  <p class="lede">Bu bölümde henüz sayfa yok.</p>
  <?php else: ?>
  <ol class="page-list">
    <?php foreach ($list as $p): ?>
    <li>
      <a href="<?= e(url("/$vid/$section/{$p['slug']}/")) ?>">
        <strong><?= e($p['title']) ?></strong>
        <?php if (!empty($p['summary'])): ?><span><?= e($p['summary']) ?></span><?php endif; ?>
      </a>
    </li>
    <?php endforeach; ?>
  </ol>
  <?php endif; ?>
</article>
<?php $body = ob_get_clean();
$title = $label;
$description = "{$site['name']} $vid — $label";
include TPL_DIR . '/_shell.php';
