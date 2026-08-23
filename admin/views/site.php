<header class="head"><h1>Site ayarları</h1></header>

<form method="post" action="?r=site" class="form card">
  <div class="grid-2">
    <label>Ad <input name="name" value="<?= e($site['name']) ?>" required></label>
    <label>Üst yazı (eyebrow) <input name="eyebrow" value="<?= e($site['eyebrow']) ?>"></label>
    <label>Telif satırı <input name="copyright" value="<?= e($site['copyright']) ?>"></label>
    <label>URL tabanı <input name="base" value="<?= e($site['base'] ?? '') ?>" placeholder="boş ya da /repo-adi">
      <small>Site <code>kullanici.github.io/repo-adi</code> altında yayınlanıyorsa <code>/repo-adi</code>; kendi alan adında ya da <code>kullanici.github.io</code>'da ise boş bırak.</small></label>
  </div>

  <h2>Ana menü</h2>
  <p class="hint">Başlık sayfasındaki üç bağlantı ve okuma sayfalarının üst çubuğu. Bölüm anahtarı, sayfaların hangi klasöre gideceğini belirler.</p>
  <div id="nav-rows">
    <?php foreach ($site['nav'] as $n): ?>
    <div class="nav-row">
      <input name="nav_label[]" value="<?= e($n['label']) ?>" placeholder="Etiket">
      <select name="nav_section[]">
        <?php foreach (SECTIONS as $k => $l): ?><option value="<?= $k ?>"<?= $n['section'] === $k ? ' selected' : '' ?>><?= $l ?> (<?= $k ?>)</option><?php endforeach; ?>
      </select>
      <button class="btn btn--icon" type="button" data-remove-row aria-label="Kaldır">×</button>
    </div>
    <?php endforeach; ?>
  </div>
  <template id="nav-row-tpl">
    <div class="nav-row">
      <input name="nav_label[]" placeholder="Etiket">
      <select name="nav_section[]">
        <?php foreach (SECTIONS as $k => $l): ?><option value="<?= $k ?>"><?= $l ?> (<?= $k ?>)</option><?php endforeach; ?>
      </select>
      <button class="btn btn--icon" type="button" data-remove-row aria-label="Kaldır">×</button>
    </div>
  </template>
  <button class="btn btn--ghost" type="button" data-add-nav>+ Menü öğesi</button>

  <div class="form__actions"><button class="btn" type="submit">Kaydet</button></div>
</form>
