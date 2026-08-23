---
tags: [blok]
aliases: [callout]
---

# Blok — Not Kutusu (`callout`)

Kural açıklaması, uyarı veya oyun yöneticisi notu.

## Alanlar

| Alan | Tip | Not |
|---|---|---|
| `tone` | enum | `info` · `warn` · `gm` |
| `title` | string | Boşsa tona göre varsayılan başlık |
| `html` | string | Zengin metin |

## Tonlar

| Ton | Varsayılan başlık | Sol çizgi |
|---|---|---|
| `info` | Not | `--accent` |
| `warn` | Dikkat | `#d83a1a` |
| `gm` | Oyun Yöneticisi | `--ink` |

## Çıktı

```html
<aside class="callout callout--gm" role="note">
  <p class="callout__label">Oyun Yöneticisi</p>
  <div class="callout__body">…</div>
</aside>
```

`role="note"` ekran okuyucuya bunun yardımcı bir kenar bilgisi olduğunu söyler.

## İlgili
[[Bloklar]] · [[Blok - Metin]]
