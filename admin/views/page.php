<?php /* Page editor. Vars: $p (page array), $id ('' for new), $allVersions */
$isNew = $id === '';
$previewUrl = $isNew ? null : "http://localhost:8080/{$p['version']}/{$p['section']}/{$p['slug']}/";
?>
<form method="post" action="?r=page" class="editor" id="page-form">
  <input type="hidden" name="old_id" value="<?= e($id) ?>">
  <input type="hidden" name="blocks" id="blocks-json">

  <header class="head head--sticky">
    <div>
      <a class="crumb" href="?r=pages">Sayfalar</a>
      <h1><?= $isNew ? 'Yeni sayfa' : e($p['title']) ?></h1>
    </div>
    <div class="head__actions">
      <?php if ($previewUrl): ?><a class="btn btn--ghost" href="<?= e($previewUrl) ?>" target="_blank" rel="noopener">Sitede gör ↗</a><?php endif; ?>
      <?php if (!$isNew): ?><button class="btn btn--danger" type="submit" form="del-page" data-confirm="Bu sayfa silinecek. Emin misin?">Sil</button><?php endif; ?>
      <button class="btn" type="submit">Kaydet</button>
    </div>
  </header>

  <div class="editor__grid">

    <!-- ---------- blocks ---------- -->
    <section class="blocks" id="blocks" aria-label="İçerik blokları"></section>

    <div class="add-block">
      <span class="add-block__label">Blok ekle</span>
      <?php foreach (BLOCK_TYPES as $k => $l): ?>
      <button type="button" class="chip" data-add-block="<?= $k ?>"><?= $l ?></button>
      <?php endforeach; ?>
    </div>

    <!-- ---------- meta sidebar ---------- -->
    <aside class="meta">
      <label>Başlık <input name="title" value="<?= e($p['title']) ?>" required data-slug-source></label>
      <label>Slug <input name="slug" value="<?= e($p['slug']) ?>" placeholder="otomatik" data-slug-target pattern="[a-z0-9-]*">
        <small>URL'nin son parçası. Boş bırakırsan başlıktan üretilir.</small></label>
      <label>Sürüm
        <select name="version">
          <?php foreach ($allVersions as $v): ?>
          <option value="<?= e($v['id']) ?>"<?= $p['version'] === $v['id'] ? ' selected' : '' ?>><?= e($v['id']) ?> <?= e($v['title']) ?><?= ($v['status'] ?? '') === 'current' ? ' · güncel' : '' ?></option>
          <?php endforeach; ?>
        </select>
      </label>
      <label>Bölüm
        <select name="section">
          <?php foreach (SECTIONS as $k => $l): ?><option value="<?= $k ?>"<?= $p['section'] === $k ? ' selected' : '' ?>><?= $l ?></option><?php endforeach; ?>
        </select>
      </label>
      <label>Sıra <input name="order" type="number" value="<?= (int) $p['order'] ?>" min="0" step="1"></label>
      <label>Kısa özet <textarea name="summary" rows="3"><?= e($p['summary']) ?></textarea></label>
      <label class="check"><input type="checkbox" name="draft"<?= !empty($p['draft']) ? ' checked' : '' ?>> Taslak — yayınlama</label>
    </aside>

  </div>
</form>
<?php if (!$isNew): ?>
<form id="del-page" method="post" action="?r=page-delete"><input type="hidden" name="id" value="<?= e($id) ?>"></form>
<?php endif; ?>

<!-- initial data + block type labels for admin.js -->
<script id="page-data" type="application/json"><?= json_encode(['blocks' => $p['blocks'] ?? [], 'types' => BLOCK_TYPES], JSON_UNESCAPED_UNICODE | JSON_HEX_TAG | JSON_HEX_AMP) ?></script>
