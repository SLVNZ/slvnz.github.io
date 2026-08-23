---
tags: [mimari]
---

# Mimari Genel Bakış

Üç katman var ve aralarındaki akış tek yönlü: **içerik → üretim → yayın**.

| Katman | Klasör | Sorumluluk | Yayınlanır mı |
|---|---|---|---|
| İçerik | `content/` | Tek gerçek kaynak (JSON) | Hayır |
| Şablon | `templates/` | HTML üretimi (PHP) | Hayır |
| Üretim | `build.php` + `admin/lib/` | JSON + şablon → statik HTML | Hayır |
| Çıktı | `docs/` | Yayınlanan site | **Evet** |
| Panel | `admin/` | İçerik düzenleme arayüzü | Hayır |

## Temel kural

> [!warning] Üretilen dosyaya dokunma
> `docs/` içindeki hiçbir `.html` elle düzenlenmez — hepsi üretilir, bir sonraki kayıtta üzerine yazılır. Değişiklik daima `content/` (içerik) veya `templates/` (yapı) üzerinden yapılır.

İstisna: `docs/assets/` ve `docs/images/` üretilmez, elle yönetilir. [[Build Süreci]] yalnızca sürüm klasörlerini ve kök HTML dosyalarını yeniden yazar.

## Çalışma zamanı bağımlılığı yok

Yayınlanan site saf HTML + CSS + JS. PHP yalnızca **senin makinende**, üretim anında çalışır. Bu yüzden GitHub Pages gibi statik barındırma yeterli — bkz. [[Yayınlama]].

## Neden bu yol seçildi

- Veritabanı yok → yedek = git geçmişi
- Derleme aracı, `node_modules`, paket güncellemesi yok
- İçerik ve tasarım ayrı: panelden içerik bozulsa bile tasarım sistemi sağlam kalır ([[Tasarım Sistemi]])
- Sürüm arşivi doğal: her sürüm ayrı klasör, eski sürümler donmuş halde durur

## İlgili
[[İçerik Modeli]] · [[Şablonlar]] · [[Build Süreci]] · [[Yönetim Paneli]] · [[Dosya Haritası]]
