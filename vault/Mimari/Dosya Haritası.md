---
tags: [mimari, referans]
---

# Dosya Haritası

```
slvnzgithub.com-new/
├── docs/                     ← YAYINLANAN SİTE (GitHub Pages bu klasörü sunar)
│   ├── index.html            başlık sayfası          [üretilir]
│   ├── 404.html                                      [üretilir]
│   ├── 4.0/ 3.0/             sürüm klasörleri        [üretilir]
│   ├── .nojekyll             Jekyll'i kapatır        [üretilir]
│   ├── assets/
│   │   ├── css/style.css     başlık sayfası + token'lar
│   │   ├── css/rulebook.css  okuma sayfaları
│   │   ├── js/theme.js       tema denetleyici
│   │   ├── js/nav.js         nav etkileşimleri
│   │   ├── js/version.js     sürüm menüsü
│   │   └── fonts/            No Serenity
│   └── images/               kapak görselleri + content/ (yüklenenler)
│
├── content/                  ← TEK GERÇEK KAYNAK
│   ├── site.json
│   ├── versions/*.json
│   └── pages/<sürüm>/<bölüm>/<slug>.json
│
├── templates/                ← HTML ÜRETİMİ
│   ├── index.php version.php section.php page.php 404.php
│   └── _head.php _shell.php _toggle.php
│
├── admin/                    ← YÖNETİM PANELİ (yalnızca yerel)
│   ├── index.php
│   ├── lib/store.php render.php build.php
│   ├── views/*.php
│   └── assets/admin.css admin.js
│
├── vault/                    ← BU DOKÜMANTASYON
├── build.php                 CLI üretici
├── README.md
└── .gitignore
```

## Hangi dosyayı ne zaman açarım

| İhtiyaç | Dosya |
|---|---|
| Metin, tablo, kart düzenlemek | Panel — dosyaya dokunma |
| Renk, ölçek, tipografi | `docs/assets/css/style.css` → [[Tasarım Sistemi]] |
| Okuma sayfası görünümü | `docs/assets/css/rulebook.css` |
| Sayfa iskeleti / meta etiketler | `templates/` → [[Şablonlar]] |
| Yeni blok tipi | 4 dosya → [[Yeni Blok Ekleme]] |
| Bölüm eklemek | `admin/lib/store.php` → `SECTIONS` |
| Nav / tema / sürüm menüsü davranışı | `docs/assets/js/` → [[Etkileşimler]] |

## Üretilen mi, elle mi

> [!warning] Ayrım
> `docs/` içinde **elle yönetilenler:** `assets/`, `images/`.
> **Üretilenler:** tüm `.html` dosyaları, sürüm klasörleri, `.nojekyll`.
> Detay: [[Build Süreci]]

## İlgili
[[Mimari Genel Bakış]] · [[Komutlar]]
