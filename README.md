# SLVNZ — kural kitabı sitesi

Statik site + yerel PHP yönetim paneli. Sunucu gerekmez: GitHub Pages yalnızca `docs/` klasörünü yayınlar.

## Klasörler

```
docs/        YAYINLANAN site — hepsi üretilir (index.html, 4.0/..., assets/, images/)
content/     tek gerçek kaynak: site.json · versions/*.json · pages/<sürüm>/<bölüm>/<slug>.json
templates/   PHP şablonlar (title page, sürüm, bölüm, sayfa, 404)
admin/       yönetim paneli (yalnızca yerelde çalışır, yayınlanmaz)
vault/       Obsidian dokümantasyonu — mimari, tasarım, iş akışları
build.php    content/ → docs/ üretimi (panel kaydedince otomatik; elle de çalışır)
```

## Çalıştırma

```bash
php -S 127.0.0.1:8000 -t admin    # panel  → http://localhost:8000
php -S 127.0.0.1:8080 -t docs     # site   → http://localhost:8080
```

## Akış

1. Panelde düzenle → **Kaydet**: `content/` güncellenir, `docs/` anında yeniden üretilir.
2. `localhost:8080`'de sonucu gör.
3. `git add -A && git commit -m "..." && git push` → GitHub Pages yayınlar.

## GitHub Pages ayarı (bir kez)

Repo → Settings → Pages → Source: **Deploy from a branch** → Branch: `main`, Folder: **/docs**.
Site `kullanici.github.io/repo-adi` altında yayınlanacaksa panelde **Site ayarları → URL tabanı** = `/repo-adi`.

## Sürümler

- Her sürüm `content/versions/<no>.json`; durumu `current` / `archived` / `draft` (draft yayınlanmaz).
- Panelde **Sürümler → Yeni sürüme kopyala…** bir sürümün tüm sayfalarını yeni numaraya kopyalar.
- Aynı slug başka sürümde de varsa sayfada "Diğer sürümlerde" bağlantısı otomatik çıkar.

## Bloklar

Metin (zengin) · Not kutusu · Yetenek kartı · Tablo · Yaratık/NPC · İki sütun · Görsel.
Yeni blok eklemek: `admin/lib/render.php` (HTML), `admin/assets/admin.js` (editör), `docs/assets/css/rulebook.css` (stil), `admin/lib/store.php` → `BLOCK_TYPES`.

## Dokümantasyon

Ayrıntılı kılavuz `vault/` klasöründe bir Obsidian vault olarak duruyor:
mimari, tasarım sistemi, blok referansı ve iş akışları.

Obsidian'da **Open folder as vault** ile `vault/` klasörünü aç — giriş notu **SLVNZ**.
Düz Markdown olduğu için Obsidian olmadan da okunabilir.
