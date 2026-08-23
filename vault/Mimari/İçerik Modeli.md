---
tags: [mimari, içerik]
---

# İçerik Modeli

Her şey `content/` altında JSON. Klasör yolu doğrudan URL'ye karşılık gelir.

```
content/
  site.json                                site geneli
  versions/4.0.json                        sürüm tanımı
  versions/3.0.json
  pages/<sürüm>/<bölüm>/<slug>.json        sayfa
```

> [!example] Yol = URL
> `content/pages/4.0/kurallar/savas.json` → `https://slvnz.github.io/4.0/kurallar/savas/`

## site.json

| Alan | Tip | Açıklama |
|---|---|---|
| `name` | string | Kelime markası — başlık sayfasındaki SLVNZ |
| `eyebrow` | string | En üstteki küçük yazı |
| `copyright` | string | Alt bilgi satırı |
| `base` | string | URL tabanı. Kök alan adında boş; alt klasörde `/repo-adi` |
| `nav` | array | `{label, section}` — ana menü sırası |

## versions/&lt;no&gt;.json

| Alan | Tip | Açıklama |
|---|---|---|
| `id` | string | `4.0` — dosya adıyla aynı |
| `title` | string | Alt başlık (Fantazya) |
| `status` | enum | `current` · `archived` · `draft` |
| `released` | string | `YYYY-AA-GG` |
| `summary` | string | Sürüm sayfasındaki özet |

> [!warning] Durum kuralları
> - Aynı anda yalnızca **bir** `current` olabilir; panel diğerini otomatik `archived` yapar.
> - `draft` sürümler hiç üretilmez, sürüm menüsünde de görünmez.
> - `archived` sürümler üretilir ama sayfalarının üstünde uyarı şeridi çıkar.

## pages/…/&lt;slug&gt;.json

| Alan | Tip | Açıklama |
|---|---|---|
| `title` | string | Sayfa başlığı |
| `version` | string | Bağlı olduğu sürüm id'si |
| `section` | enum | `kurallar` · `yetenekler` · `evren` |
| `slug` | string | URL parçası (küçük harf, tire) |
| `order` | int | Bölüm içi sıralama |
| `draft` | bool | `true` ise üretilmez |
| `summary` | string | Liste ve meta açıklaması |
| `blocks` | array | İçerik blokları — bkz. [[Bloklar]] |

## Bölümler

Kod içinde sabit — `admin/lib/store.php` → `SECTIONS`:

| Anahtar | Etiket |
|---|---|
| `kurallar` | Oyun Kuralları |
| `yetenekler` | Yetenekler |
| `evren` | Evren Rehberi |

> [!tip] Bölüm eklemek
> `SECTIONS` sabitine bir satır ekle, sonra panelden **Site ayarları → Ana menü**'ye karşılık gelen öğeyi ekle.

## Sürümler arası bağ

Aynı `slug` + aynı `section` başka bir sürümde de varsa, sayfada otomatik **Diğer sürümlerde** bağlantısı çıkar. Bunu üreten fonksiyon `siblings()` — `admin/lib/store.php`.

## İlgili
[[Yönetim Paneli]] · [[Build Süreci]] · [[Yeni Sayfa Ekleme]] · [[Yeni Sürüm Çıkarma]]
