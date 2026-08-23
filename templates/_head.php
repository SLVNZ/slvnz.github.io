<?php
/* Shared <head>. Vars: $site, $title, $description, $extraCss (array) */
$extraCss = $extraCss ?? [];
?>
<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title><?= e($title) ?></title>
<meta name="description" content="<?= e($description ?? '') ?>">
<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#121212" media="(prefers-color-scheme: dark)">

<meta property="og:type" content="website">
<meta property="og:locale" content="tr_TR">
<meta property="og:site_name" content="<?= e($site['name']) ?>">
<meta property="og:title" content="<?= e($title) ?>">
<meta property="og:description" content="<?= e($description ?? '') ?>">
<meta property="og:image" content="<?= e(url('/images/titlepage.png')) ?>">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="font" type="font/ttf" href="<?= e(url('/assets/fonts/NoSerenity-Regular-fn-2-fixed-under.ttf')) ?>" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@200;400;500&family=Space+Grotesk:wght@400;500&display=swap">
<link rel="stylesheet" href="<?= e(url('/assets/css/style.css')) ?>">
<?php foreach ($extraCss as $css): ?>
<link rel="stylesheet" href="<?= e(url($css)) ?>">
<?php endforeach; ?>
<script>
  /* runs before first paint: restore the saved theme so there is no flash */
  (function(){try{var t=localStorage.getItem("slvnz-theme");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t);}catch(e){}})();
</script>
</head>
