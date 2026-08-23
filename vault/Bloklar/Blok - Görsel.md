---
tags: [blok]
aliases: [figure]
---

# Blok — Görsel (`figure`)

Alt yazılı görsel.

## Alanlar

| Alan | Tip | Not |
|---|---|---|
| `image` | string | Yol, örn. `/images/content/harita-a1b2c3.png` |
| `alt` | string | Alternatif metin — **zorunlu** |
| `caption` | string | Alt yazı |
| `width` | enum | `text` · `wide` · `full` |

## Yükleme

Panelde dosya seçilince `?r=upload` rotasına gider; dosya `docs/images/content/` altına adına içerik özeti eklenerek yazılır (`harita-a1b2c3.png`) ve yol alana otomatik dolar. İzinli uzantılar: `png jpg jpeg webp gif svg`.

> [!warning] Yüklenen görseller yayınlanır
> `docs/images/content/` üretim sırasında **silinmez**, ama commit edilmezse siteye çıkmaz. Görsel ekledikten sonra `git add -A` yapmayı unutma.

## Genişlikler

| Değer | Genişlik |
|---|---|
| `text` | Okuma kolonu (`--measure`) |
| `wide` | Kolon + 14rem |
| `full` | Kapsayıcının tamamı |

## Karanlık mod

`.figure img` üzerinde `filter: invert(var(--art-invert))` var. Siyah-beyaz çizimler karanlık modda otomatik ters döner. Renkli fotoğraflarda bu istenmezse o kural kaldırılmalı.

## İlgili
[[Bloklar]] · [[Tema Sistemi]]
