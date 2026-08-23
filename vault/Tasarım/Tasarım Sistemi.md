---
tags: [tasarım]
---

# Tasarım Sistemi

Tüm değişkenler `assets/css/style.css` içindeki `:root` bloğunda. Bileşenler asla ham renk kullanmaz, hep token okur — tema geçişi bu sayede tek yerden çalışır ([[Tema Sistemi]]).

## Renk token'ları

| Token | Aydınlık | Karanlık | Kullanım |
|---|---|---|---|
| `--paper` | `#ffffff` | `#121212` | Zemin |
| `--ink` | `#1e1e1e` | `#f2f2f2` | Kelime markası, gövde |
| `--nav-ink` | `#000000` | `#ffffff` | Nav bağlantıları |
| `--accent` | `#fe4b26` | `#ff5a36` | Eyebrow, 4.0, FANTAZYA, alt bilgi |
| `--accent-text` | `= --accent` | — | Küçük metin varyantı |
| `--art-invert` | `0` | `1` | Çizimi negatife çevirir |

> [!note] Karanlık modda vurgu neden farklı
> `#ff5a36`, `#fe4b26`'nın değeri ~%6 açılmış hali. Koyu zeminde aynı algısal ağırlığı korumak için; ton ve doygunluk aynı.

> [!warning] Kontrast notu
> Tasarımdaki 9 px turuncu metin (eyebrow ve alt bilgi) beyaz üzerinde 3.4:1 — WCAG AA eşiği 4.5:1'in altında. Figma'ya sadık kalındı. AA gerekirse `style.css` içinde `--accent-text: #d63a12` yap; aynı ton, değeri %16 düşük, 4.5:1.

## Ölçek birimi: `--s`

```css
--s: min(0.0694444vw, 0.09765625dvh, 1.3px);
```

1440 × 1024'lük Figma çerçevesinin **bir artboard pikseli**. `object-fit: contain` mantığı: genişlik ve yükseklikten hangisi darsa o belirler, 1.3px'te tavanlanır. Böylece kompozisyon her ekranda tam sığar, taşma olmaz.

Başlık sayfasındaki her ölçü bunun katı — detay [[Başlık Sayfası Geometrisi]].

## Diğer token'lar

| Token | Değer | Not |
|---|---|---|
| `--mark` | `134.69 × --s` | SLVNZ punto boyutu |
| `--ease` | `cubic-bezier(.22,.61,.36,1)` | Ortak yumuşatma |
| `--control-bg` / `--control-bd` | rgba | Tema anahtarı yüzeyleri |

## İlgili
[[Tipografi]] · [[Tema Sistemi]] · [[Başlık Sayfası Geometrisi]] · [[Etkileşimler]]
