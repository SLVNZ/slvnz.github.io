<?php /* Admin shell. Vars: $site, $view, $route, $flash + view vars */ ?>
<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title><?= e($site['name']) ?> · Yönetim</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500&family=Space+Grotesk:wght@400;500&display=swap">
<link rel="stylesheet" href="assets/admin.css">
</head>
<body>
<div class="app">
  <aside class="side">
    <a class="brand" href="?r=dashboard"><span class="brand__name"><?= e($site['name']) ?></span><span class="brand__tag">yönetim</span></a>
    <nav class="menu">
      <a href="?r=dashboard"<?= $view === 'dashboard' ? ' aria-current="page"' : '' ?>>Pano</a>
      <a href="?r=pages"<?= in_array($view, ['pages', 'page']) ? ' aria-current="page"' : '' ?>>Sayfalar</a>
      <a href="?r=versions"<?= $view === 'versions' ? ' aria-current="page"' : '' ?>>Sürümler</a>
      <a href="?r=site"<?= $view === 'site' ? ' aria-current="page"' : '' ?>>Site ayarları</a>
    </nav>
    <form method="post" action="?r=build" class="side__build">
      <button class="btn btn--ghost" type="submit">docs/ yeniden üret</button>
    </form>
    <p class="side__hint">Kaydettiğin her şey <code>content/</code> ve <code>docs/</code>'a yazılır. Yayınlamak için <code>git commit</code> + <code>push</code>.</p>
  </aside>

  <main class="main">
    <?php if ($flash): ?><p class="flash" role="status"><?= e($flash) ?></p><?php endif; ?>
    <?php include __DIR__ . "/$view.php"; ?>
  </main>
</div>
<script src="assets/admin.js"></script>
</body>
</html>
