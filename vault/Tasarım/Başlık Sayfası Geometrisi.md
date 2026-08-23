---
tags: [tasarım, geometri]
---

# Başlık Sayfası Geometrisi

Başlık sayfası, Figma çerçevesi **Desktop - 1 (1440 × 1024)** ile 1 px hassasiyetinde eşleşir. Yöntem iki fikre dayanır.

## 1. Tek ölçek birimi

```css
--s: min(0.0694444vw, 0.09765625dvh, 1.3px);
```

`--s` bir artboard pikseli. Tüm ölçüler bunun katı olarak yazılır, böylece kompozisyon tek parça gibi ölçeklenir ve hiçbir ekranda taşmaz.

## 2. Cap-line ile konumlandırma

Figma metin **kutusunun** üstünü verir; tarayıcı **satır kutusunu** yerleştirir. Aradaki fark yazı tipine göre değişir. Çözüm: her öğeyi büyük harflerinin tepesi (cap line) ile konumlandır, sonra o yazı tipinin kendi kutu-üstü → cap-üstü farkını geri çıkar.

```css
.titleblock {
  padding-top: calc((var(--mark-cap) * var(--s) - var(--eyebrow-bottom))
                    - var(--cap-serenity) * var(--mark));
}
```

## Artboard koordinatları

| Token | Değer | Anlam |
|---|---|---|
| `--eyebrow-cap` | 16.64 | Eyebrow cap line |
| `--art-top` | 114.96 | Çizimin mürekkep üstü |
| `--art-w` | 800.85 | Çizimin mürekkep genişliği |
| `--art-dx` | −14.28 | Çizim merkezi, çerçeve merkezinin solunda |
| `--mark-cap` | 434 | SLVNZ cap line |
| `--mark-base` | 561.82 | SLVNZ taban çizgisi |
| `--version-size` | 52.0921 | 4.0 punto |
| `--version-gap` | 7 | Z mürekkebi → 4 mürekkebi |
| `--genre-cap` | 574.78 | FANTAZYA cap line |
| `--nav-cap` | 731.15 | Nav cap line |
| `--nav-dx` | −12.5 | Nav grubu merkez kayması |
| `--nav-gap-1` | 104 | Oyun Kuralları → Yetenekler |
| `--nav-gap-2` | 92 | Yetenekler → Evren Rehberi |
| `--foot-cap` | 1001.64 | Alt bilgi cap line |
| `--frame-h` | 1024 | Çerçeve yüksekliği |

> [!note] Nav aralıkları neden eşit değil
> Tasarımcı üç bağlantıyı elle yerleştirmiş: 104 px ve 92 px. Aynen korundu; grup ise `--nav-dx` ile merkezden 12.5 px sola alındı — Figma'daki hali bu.

## SLVNZ neden vektör değil

Figma'da SLVNZ **outline'lanmış vektör** (mürekkep kutusu 258.60 × 127.82). Canlı yazı tipi kullanıldı: `258.60 ÷ 1.92em = 134.69 px`. Bu genişliği birebir verir ve harf formları bozulmaz.

> [!tip] Tam kopya isteniyorsa
> Figma'daki outline gerçek yazı tipinden ~%5 daha uzun çizilmiş. `--mark-stretch: 1.051` yaparsan o esneme de birebir kopyalanır. Varsayılan `1` — bozulmasız.

## Çizim varlığı

Kaynak `titlepage.png` (2944 × 1648) mürekkep sınırına kırpıldı, siyah + alfa kanalına çevrildi ve WebP + PNG olarak dışa alındı (250 KB → 103 KB). Alfa sayesinde tek bir `filter: invert()` ile karanlık moda dönüyor.

## Duyarlılık

| Eşik | Davranış |
|---|---|
| > 1000 px | Saf artboard ölçeği |
| ≤ 1000 px | `--s` görece büyür, nav aralıkları daralır |
| ≤ 620 px | Çizim genişler, nav dikey dizilir, 4.0 taşmasın diye marka sola kayar |

## İlgili
[[Tipografi]] · [[Tasarım Sistemi]] · [[Figma Kaynak Verisi]]
