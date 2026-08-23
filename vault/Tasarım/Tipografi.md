---
tags: [tasarım, tipografi]
---

# Tipografi

Üç yazı tipi, her birinin net bir görevi var. Atamalar Figma dosyasından birebir çıkarıldı — bkz. [[Figma Kaynak Verisi]].

| Öğe | Yazı tipi | Boyut (artboard px) | Harf aralığı | Renk |
|---|---|---|---|---|
| Eyebrow (MASAÜSTÜ ROL…) | **Archivo** Regular | 9.10 | %94 | `--accent` |
| SLVNZ | **No Serenity** | 134.69 | — | `--ink` |
| 4.0 | **No Serenity** | 52.09 | 0 | `--accent` |
| FANTAZYA | **Archivo** ExtraLight (200) | 21.84 | %94 | `--accent` |
| Nav bağlantıları | **Space Grotesk** Regular | 18.13 | 0 | `--nav-ink` |
| Alt bilgi | **Archivo** Regular | 9.10 | 0 | `--accent` |

> [!warning] Sık yapılan hata
> Archivo ile Space Grotesk'in yerini karıştırmak. **Archivo** = eyebrow, FANTAZYA, alt bilgi. **Space Grotesk** = nav ve okuma sayfası etiketleri. Bu, Figma dosyasındaki gerçek atama.

## No Serenity

Yerel dosya: `assets/fonts/NoSerenity-Regular-fn-2-fixed-under.ttf` (60 KB).

Metrikleri (1000 upm): ascender 850, cap height **800**, descender 400, line gap 100.

```css
@font-face {
  font-family: "No Serenity";
  src: url("../fonts/NoSerenity-Regular-fn-2-fixed-under.ttf") format("truetype");
  font-display: block;
}
```

> [!note] Neden `font-display: block`
> Bu yazı tipi logoyu çiziyor. `swap` olsaydı bir an Arial ile "SLVNZ" görünürdü — bozuk marka gibi okunur. Dosya 60 KB ve head'de preload ediliyor, bloklama süresi pratikte görünmez.

Türkçe kapsamı tam: `Ü İ Ş Ğ Ç Ö` hepsi var.

## Archivo + Space Grotesk

Google Fonts'tan, `display=swap` ile. Yüklenen ağırlıklar: Archivo 200/400/500, Space Grotesk 400/500.

> [!tip] Kendi sunucundan servis etmek
> Gizlilik veya çevrimdışı çalışma istersen bu iki yazı tipini indirip `assets/fonts/` altına koy, `index.html` içindeki Google Fonts satırını `@font-face` tanımlarıyla değiştir.

## Cap-line hizalama

Figma metin kutusu konumlandırır, tarayıcı satır kutusu konumlandırır — ikisi yazı tipine göre farklı yerde durur. Bu yüzden her öğe **cap line** (büyük harflerin tepesi) referansıyla yerleştirildi. Yöntem: [[Başlık Sayfası Geometrisi]].

Ölçülen kutu-üstü → cap-üstü farkları (`line-height: 1` iken, em cinsinden):

| Yazı tipi | Değer | Not |
|---|---|---|
| No Serenity | `-0.075` | Negatif: büyük harfler satır kutusunun **üstüne** taşar |
| Archivo | `0.145` | |
| Space Grotesk | `0.145` | |

## İlgili
[[Tasarım Sistemi]] · [[Başlık Sayfası Geometrisi]] · [[Figma Kaynak Verisi]]
