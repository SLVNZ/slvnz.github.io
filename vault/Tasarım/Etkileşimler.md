---
tags: [tasarım, etkileşim]
---

# Etkileşimler

Üç JS dosyası, hiçbiri bağımlılık kullanmıyor. Hepsi aşamalı iyileştirme: JS kapalıyken sayfa tam çalışır.

## Nav — mürekkep emme (`nav.js`)

`nav.js` her bağlantının metnini harflere böler (`<span class="spell__l">`), her harfe `--i` (sıra) ve `--n` (toplam) verir. CSS bu değişkenlerle gecikmeli renk geçişi kurar.

| Yön | Davranış |
|---|---|
| Üstüne gelince | Renk soldan sağa vurgu rengine döner (`--i × .028s`) |
| Ayrılınca | Sağdan sola geri süzülür (`(--n − 1 − --i) × .028s`) |
| Altında | 1 px saç çizgisi soldan çizilir, ayrılınca sağdan çekilir |

> [!note] Erişilebilirlik
> Harflere bölünen metin `aria-hidden`; bağlantıya `aria-label` olarak tam kelime verilir. Ekran okuyucu "O-Y-U-N" değil "Oyun Kuralları" okur.

## Sayfa çıkışı (`nav.js`)

Bir nav bağlantısına tıklanınca (620 ms): başlık bloğu yukarı süzülüp solar, diğer bağlantılar kaybolur, seçilen kelime %6 büyüyüp vurgu rengine döner — sonra yönlendirme.

Dokunulmayan durumlar: `Ctrl/⌘/Shift/Alt` + tık, orta tık, `target="_blank"`, `#` ile başlayan bağlantılar. `pageshow` olayında (geri tuşu / bfcache) durum sıfırlanır.

## Sürüm parlaması (`style.css`)

"4.0" bir düğme. İki katmanlı "shader", ikisi de yalnızca `background-position` ve `opacity` animasyonu — GPU'da çalışır, WebGL yok:

1. **Işık bandı** — turuncu → sıcak beyaz → turuncu diyagonal gradyan, `background-clip: text` ile harflerin içine boyanır; üstüne gelince 0.9 s'de içinden geçer.
2. **Köz parıltısı** — glifin `blur(.14em)`'lenmiş kopyası arkada, `--glow` ile %85'e açılır.

Boşta her 7 saniyede bir hafif "nefes" parıltısı geçer ki düğme canlı okunsun; `prefers-reduced-motion` altında kapalı.

> [!tip] Kırpma payı
> `background-clip: text` yalnızca elemanın kutusunu boyar. No Serenity'nin uçları kutunun dışına taştığı için `.version__glyph` dolgu alır ve eşit negatif marjla geri çekilir — yoksa harflerin tepesi kesik görünür.

## Sürüm menüsü (`version.js`)

`role="listbox"` + `aria-expanded`. Klavye: `↓ ↑` gezinme, `Home/End`, `Esc` kapatıp düğmeye odak döndürür, `Tab` kapatır. Dışarı tıklayınca kapanır.

## Giriş animasyonu

Başlık sayfası öğeleri yukarıdan aşağı kademeli belirir (0.7 s, `--ease`). Çizim yalnızca solarak gelir — çünkü `translate` özelliğini kendi ortalanması için kullanıyor.

> [!warning] Hareket azaltma
> `prefers-reduced-motion: reduce` altında: harf dalgası, çıkış geçişi ve parıltı kapanır; son durum anında gösterilir.

## İlgili
[[Tema Sistemi]] · [[Tasarım Sistemi]] · [[Başlık Sayfası Geometrisi]]
