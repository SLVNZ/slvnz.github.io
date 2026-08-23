---
tags: [mimari, panel]
---

# Yönetim Paneli

`admin/` klasörü. Tek giriş noktası `admin/index.php`; `?r=` parametresiyle yönlendirir.

> [!warning] Yalnızca yerel
> `index.php` başında `REMOTE_ADDR` kontrolü var: `127.0.0.1` ve `::1` dışındaki isteklere 403 döner. Panelde kimlik doğrulama yok — bu yüzden dışarı açılmamalı. Yayınlanan sitede zaten bulunmaz.

## Dosya düzeni

```
admin/
  index.php          rotalar + POST işleyicileri
  lib/store.php      JSON okuma-yazma, sabitler (SECTIONS, BLOCK_TYPES)
  lib/render.php     blok → HTML, clean_html(), url()
  lib/build.php      build_all(), tpl(), emit()
  views/_layout.php  panel kabuğu (kenar menü)
  views/dashboard.php · pages.php · page.php · versions.php · site.php
  assets/admin.css · admin.js
```

## Rotalar

| `?r=` | Yöntem | İş |
|---|---|---|
| `dashboard` | GET | Sayaçlar, son sayfalar, akış hatırlatıcısı |
| `pages` | GET | Sayfa listesi (sürüme göre süzülür) |
| `page` | GET | Sayfa düzenleyici (id yoksa yeni sayfa) |
| `page` | POST | Sayfayı kaydet + yeniden üret |
| `page-delete` | POST | Sayfayı sil + yeniden üret |
| `versions` | GET | Sürüm listesi |
| `version` | POST | Sürüm oluştur/güncelle, yeniden adlandır |
| `version-delete` | POST | Sürümü ve tüm sayfalarını sil |
| `version-copy` | POST | Bir sürümün sayfalarını başka sürüme klonla |
| `site` | GET/POST | Site ayarları |
| `upload` | POST | Görsel yükleme (JSON yanıt) |
| `build` | POST | Elle yeniden üretim |

Her POST işleyici `rebuild()` çağırır ve `redirect()` ile PRG desenini uygular — sayfa yenilemede tekrar gönderim olmaz.

## Blok düzenleyici

`admin/assets/admin.js` bağımlılıksız. Sayfa yüklenirken `#page-data` içindeki JSON'dan blok dizisini alır, her blok için tipe özel düzenleyici üretir, kaydederken `#blocks-json` gizli alanına serileştirir.

Özellikler:
- Sürükle-bırak sıralama, yukarı/aşağı düğmeleri, çoğaltma, silme
- Zengin metin araç çubuğu: kalın, italik, H2/H3, listeler, alıntı, bağlantı, zar, biçim temizle
- Yapıştırma düz metne çevrilir, paragraflar korunur
- `Ctrl/Cmd + S` kaydeder
- Başlıktan slug önerisi (elle yazınca durur)

## Görsel yükleme

`?r=upload` rotası dosyayı `docs/images/content/` altına, adına içerik özeti ekleyerek yazar (`ad-a1b2c3.png`). İzinli uzantılar: `png jpg jpeg webp gif svg`.

## İlgili
[[Bloklar]] · [[İçerik Modeli]] · [[Build Süreci]] · [[Yeni Sayfa Ekleme]]
