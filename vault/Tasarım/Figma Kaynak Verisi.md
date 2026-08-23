---
tags: [tasarım, referans, figma]
---

# Figma Kaynak Verisi

Bu değerler `ui.fig` dosyasından **çözümlenerek** çıkarıldı (tahmin değil). Tasarımda bir şey değişirse karşılaştırma referansı budur.

> [!info] Nasıl okundu
> `.fig` bir zip. İçindeki `canvas.fig` "fig-kiwi" biçiminde: 8 baytlık başlık, ardından bloklar. İlk blok zlib ile sıkıştırılmış **Kiwi şeması**, ikinci blok **zstd** ile sıkıştırılmış veri. Şema çözülüp veri ona göre ayrıştırıldı; düğüm ağacı böyle okundu.

## Çerçeve

**Desktop - 1** — 1440 × 1024, dolgu `rgb(255,255,255)`.

## Düğümler

| Düğüm | Tip | Konum | Boyut | Ayrıntı |
|---|---|---|---|---|
| image 1 | ROUNDED_RECTANGLE | (291, 20) | 1002 × 560.9 | Görsel dolgu, kırpma yok |
| SLVNZ | VECTOR | (591, 434) | 258.60 × 127.82 | Dolgu `#1E1E1E` |
| 4.0 | TEXT | kutu (864, 429) | 50 × 70 | No Serenity 52.0921 |
| FANTAZYA | TEXT | kutu (594.5, 570.85) | 253 × 24 | Archivo ExtraLight 21.8435, aralık %94 |
| MASAÜSTÜ ROL YAPMA SİSTEMİ | TEXT | kutu (482, 15) | 477 × 10 sabit | Archivo Regular 9.1015, aralık %94, ortalı |
| OYUN KURALLARI | TEXT | (417, 726) | 145 × 23 | Space Grotesk 18.134 |
| YETENEKLER | TEXT | (666, 726) | 108 × 23 | Space Grotesk 18.134 |
| EVREN REHBERİ | TEXT | (866, 726) | 132 × 23 | Space Grotesk 18.134 |
| © 2026 SLVNZ | TEXT | kutu (482, 1000) | 477 × 10 sabit | Archivo Regular 9.1015 |

Metin renkleri: nav `rgb(0,0,0)`; diğer tüm metinler `rgb(254,75,38)` = `#FE4B26`.

## Türetilmiş değerler

Çizimin mürekkep sınırı, kaynak PNG'nin (2944 × 1648) mürekkep kutusu `(42, 279, 2395, 1622)` artboard'a taşınarak bulundu:

```
ölçek = 1002 / 2944 = 0.340353
mürekkep: x 305.29 → 1106.15   y 114.96 → 572.05
genişlik 800.86 · merkez 705.72 (çerçeve merkezi 720 → −14.28)
```

## Doğrulama

Üretilen sayfa 1440 × 1024'te ölçüldü; tüm öğeler hedefin **1 px içinde**:

| Öğe | Hedef | Ölçülen |
|---|---|---|
| Eyebrow cap | 16.64 | 15.9 |
| Çizim sol / üst | 305.29 / 114.96 | 305.3 / 114.9 |
| SLVNZ cap | 434 | 434.0 |
| FANTAZYA cap | 574.78 | 574.5 |
| Nav cap | 731.15 | 731.1 |
| Nav sol kenarlar | 417 / 666 / 866 | 417 / 667 / 866 |
| Alt bilgi cap | 1001.64 | 1000.9 |

## İlgili
[[Başlık Sayfası Geometrisi]] · [[Tipografi]] · [[Tasarım Sistemi]]
