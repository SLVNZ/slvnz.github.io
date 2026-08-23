<header class="head">
  <h1>Sayfalar</h1>
  <div class="head__actions">
    <form method="get" class="inline">
      <input type="hidden" name="r" value="pages">
      <select name="v" onchange="this.form.submit()">
        <option value="">Tüm sürümler</option>
        <?php foreach ($allVersions as $v): ?>
        <option value="<?= e($v['id']) ?>"<?= $filterV === $v['id'] ? ' selected' : '' ?>><?= e($v['id']) ?></option>
        <?php endforeach; ?>
      </select>
    </form>
    <a class="btn" href="?r=page<?= $filterV ? '&v=' . rawurlencode($filterV) : '' ?>">+ Yeni sayfa</a>
  </div>
</header>

<?php $lastV = null; $lastS = null; foreach ($list as $p): ?>
  <?php if ($p['version'] !== $lastV): $lastV = $p['version']; $lastS = null; ?>
    <h2 class="group"><?= e($p['version']) ?></h2>
  <?php endif; ?>
  <?php if ($p['section'] !== $lastS): $lastS = $p['section']; ?>
    <h3 class="group group--sub"><?= e(SECTIONS[$p['section']] ?? $p['section']) ?></h3>
  <?php endif; ?>
  <a class="row" href="?r=page&id=<?= rawurlencode(page_id($p)) ?>">
    <span class="row__order"><?= (int) ($p['order'] ?? 0) ?></span>
    <span class="row__title"><?= e($p['title']) ?><?php if (!empty($p['summary'])): ?><small><?= e($p['summary']) ?></small><?php endif; ?></span>
    <span class="row__meta"><?= count($p['blocks'] ?? []) ?> blok</span>
    <?= !empty($p['draft']) ? '<span class="tag tag--draft">taslak</span>' : '' ?>
  </a>
<?php endforeach; ?>
<?php if (!$list): ?><p class="empty">Henüz sayfa yok.</p><?php endif; ?>
