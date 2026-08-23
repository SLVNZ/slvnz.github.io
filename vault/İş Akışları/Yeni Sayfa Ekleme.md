---
tags: [akış]
---

# Yeni Sayfa Ekleme

## Adımlar

1. Paneli aç: `http://localhost:8000` → **Sayfalar** → **+ Yeni sayfa**
2. Sağ sütunu doldur:
   - **Başlık** — slug otomatik önerilir
   - **Sürüm** — hangi baskıya ait
   - **Bölüm** — Oyun Kuralları / Yetenekler / Evren Rehberi
   - **Sıra** — bölüm içi sıralama (küçük önce)
   - **Kısa özet** — listelerde ve arama sonuçlarında görünür
3. Sol tarafta **Blok ekle** ile içeriği kur ([[Bloklar]])
4. **Kaydet** (veya `Ctrl/Cmd + S`)

Kayıt anında `content/pages/<sürüm>/<bölüm>/<slug>.json` yazılır ve `docs/` yeniden üretilir.

5. `http://localhost:8080/<sürüm>/<bölüm>/<slug>/` adresinde kontrol et — düzenleyicideki **Sitede gör ↗** düğmesi doğrudan açar
6. Beğendiysen commit et → [[Yayınlama]]

## Taslak olarak tutma

Sağ sütunda **Taslak — yayınlama** kutusunu işaretle. Sayfa `content/` içinde kalır ama `docs/` içine hiç üretilmez. İşin bitince kutuyu kaldır.

## Slug değiştirmek

Slug'ı düzenleyip kaydedersen eski JSON silinir, yenisi yazılır ve `docs/` yeniden üretilir.

> [!warning] Bağlantı kırılması
> Slug değişince eski URL 404 verir. Sayfa yayınlandıysa ve dışarıdan bağlantı verilmişse slug'ı değiştirme; başlığı değiştirip slug'ı sabit bırakabilirsin.

## İlgili
[[İçerik Modeli]] · [[Bloklar]] · [[Yayınlama]]
