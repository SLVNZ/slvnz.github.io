<header class="head">
  <h1>Pano</h1>
  <a class="btn" href="?r=page">+ Yeni sayfa</a>
</header>

<div class="stats">
  <div class="stat"><span class="stat__n"><?= $counts['pages'] ?></span><span class="stat__l">sayfa</span></div>
  <div class="stat"><span class="stat__n"><?= $counts['drafts'] ?></span><span class="stat__l">taslak</span></div>
  <div class="stat"><span class="stat__n"><?= $counts['versions'] ?></span><span class="stat__l">sürüm</span></div>
  <div class="stat"><span class="stat__n stat__n--sm"><?= $built ? e($built) : '—' ?></span><span class="stat__l">son üretim</span></div>
</div>

<section class="card">
  <h2>Son sayfalar</h2>
  <table class="tbl">
    <thead><tr><th>Başlık</th><th>Sürüm</th><th>Bölüm</th><th>Durum</th></tr></thead>
    <tbody>
    <?php foreach ($recent as $p): ?>
      <tr>
        <td><a href="?r=page&id=<?= rawurlencode(page_id($p)) ?>"><?= e($p['title']) ?></a></td>
        <td><?= e($p['version']) ?></td>
        <td><?= e(SECTIONS[$p['section']] ?? $p['section']) ?></td>
        <td><?= !empty($p['draft']) ? '<span class="tag tag--draft">taslak</span>' : '<span class="tag">yayında</span>' ?></td>
      </tr>
    <?php endforeach; ?>
    </tbody>
  </table>
</section>

<section class="card card--muted">
  <h2>Yayın akışı</h2>
  <ol class="steps">
    <li>Burada düzenle → <strong>Kaydet</strong> (içerik <code>content/</code>'a, site <code>docs/</code>'a yazılır)</li>
    <li>Sonucu gör: <a href="http://localhost:8080/" target="_blank" rel="noopener">localhost:8080</a> (<code>php -S localhost:8080 -t docs</code>)</li>
    <li><code>git add -A &amp;&amp; git commit -m "…" &amp;&amp; git push</code> → GitHub Pages yayınlar</li>
  </ol>
</section>
