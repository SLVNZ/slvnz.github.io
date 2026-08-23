#!/usr/bin/env php
<?php
/* CLI: php build.php  →  regenerates docs/ from content/ */
require __DIR__ . '/admin/lib/build.php';
$r = build_all();
printf("docs/ yeniden üretildi: %d içerik sayfası, %d dosya.\n", $r['pages'], count($r['files']));
