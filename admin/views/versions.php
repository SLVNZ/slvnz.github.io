<header class="head">
  <h1>Sürümler</h1>
  <button class="btn" type="button" data-open="#new-version">+ Yeni sürüm</button>
</header>

<?php foreach ($allVersions as $v): $n = count(pages($v['id'])); $st = $v['status'] ?? 'draft'; ?>
<details class="card vcard"<?= $st === 'current' ? ' open' : '' ?>>
  <summary>
    <span class="vcard__id"><?= e($v['id']) ?></span>
    <span class="vcard__title"><?= e($v['title']) ?></span>
    <span class="tag tag--<?= e($st) ?>"><?= ['current' => 'güncel', 'archived' => 'arşiv', 'draft' => 'taslak'][$st] ?? $st ?></span>
    <span class="vcard__n"><?= $n ?> sayfa</span>
  </summary>
  <form method="post" action="?r=version" class="form">
    <input type="hidden" name="old_id" value="<?= e($v['id']) ?>">
    <div class="grid-2">
      <label>Sürüm no <input name="id" value="<?= e($v['id']) ?>" pattern="\d+(\.\d+)?" required></label>
      <label>Alt başlık <input name="title" value="<?= e($v['title']) ?>" placeholder="Fantazya"></label>
      <label>Durum
        <select name="status">
          <?php foreach (['current' => 'Güncel', 'archived' => 'Arşiv', 'draft' => 'Taslak (yayınlanmaz)'] as $k => $l): ?>
          <option value="<?= $k ?>"<?= $st === $k ? ' selected' : '' ?>><?= $l ?></option>
          <?php endforeach; ?>
        </select>
      </label>
      <label>Yayın tarihi <input name="released" type="date" value="<?= e($v['released'] ?? '') ?>"></label>
    </div>
    <label>Özet <textarea name="summary" rows="2"><?= e($v['summary'] ?? '') ?></textarea></label>
    <div class="form__actions">
      <button class="btn" type="submit">Kaydet</button>
      <a class="btn btn--ghost" href="?r=pages&v=<?= rawurlencode($v['id']) ?>">Sayfaları</a>
      <button class="btn btn--ghost" type="submit" form="copy-<?= e($v['id']) ?>">Yeni sürüme kopyala…</button>
      <button class="btn btn--danger" type="submit" form="del-<?= e($v['id']) ?>" data-confirm="<?= e($v['id']) ?> sürümü ve <?= $n ?> sayfası silinecek. Emin misin?">Sil</button>
    </div>
  </form>
  <form id="del-<?= e($v['id']) ?>" method="post" action="?r=version-delete"><input type="hidden" name="id" value="<?= e($v['id']) ?>"></form>
  <form id="copy-<?= e($v['id']) ?>" method="post" action="?r=version-copy" data-prompt-to="Hedef sürüm numarası (örn. 5.0):">
    <input type="hidden" name="from" value="<?= e($v['id']) ?>"><input type="hidden" name="to" value="">
  </form>
</details>
<?php endforeach; ?>

<dialog id="new-version" class="dialog">
  <form method="post" action="?r=version" class="form">
    <h2>Yeni sürüm</h2>
    <div class="grid-2">
      <label>Sürüm no <input name="id" placeholder="5.0" pattern="\d+(\.\d+)?" required autofocus></label>
      <label>Alt başlık <input name="title" placeholder="Fantazya"></label>
      <label>Durum <select name="status"><option value="draft">Taslak</option><option value="archived">Arşiv</option><option value="current">Güncel</option></select></label>
      <label>Yayın tarihi <input name="released" type="date"></label>
    </div>
    <label>Özet <textarea name="summary" rows="2"></textarea></label>
    <div class="form__actions"><button class="btn" type="submit">Oluştur</button><button class="btn btn--ghost" type="button" data-close>Vazgeç</button></div>
  </form>
</dialog>
