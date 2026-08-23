---
tags: [akış, referans]
---

# Komutlar

Tek gereksinim **PHP** (bu makinede 8.4). Başka kurulum yok.

## Günlük çalışma

Panel:

```bash
php -S 127.0.0.1:8000 -t admin
```

Site önizleme (ikinci terminal):

```bash
php -S 127.0.0.1:8080 -t docs
```

| Adres | Ne |
|---|---|
| `http://localhost:8000` | Yönetim paneli |
| `http://localhost:8080` | Üretilmiş site |

## Elle yeniden üretim

```bash
php build.php
```

`content/` veya `templates/` dosyalarını dışarıdan düzenlediysen bunu çalıştır. Panelden kaydettiğinde zaten otomatik çalışır.

## Yayınlama

```bash
git add -A && git commit -m "İçerik güncellemesi" && git push
```

Detay: [[Yayınlama]]

## Söz dizimi kontrolü

```bash
php -l admin/lib/render.php
```

## İlgili
[[Build Süreci]] · [[Yayınlama]] · [[Yönetim Paneli]]
