---
tags: [blok]
aliases: [columns]
---

# Blok — İki Sütun (`columns`)

Yan yana iki zengin metin alanı.

## Alanlar

| Alan | Tip | Not |
|---|---|---|
| `ratio` | enum | `1-1` · `2-1` · `1-2` |
| `left` | string | Sol sütun HTML |
| `right` | string | Sağ sütun HTML |

## Duyarlılık

620 px altında sütunlar alt alta iner (`grid-template-columns: 1fr`).

> [!note] İlk öğe düzeltmesi
> `.column > :first-child` üst marj ve üst çizgiyi sıfırlar — sütun içinde `h2` ile başlarsan tepede kaçak boşluk ve ayraç oluşmaz.

## İlgili
[[Bloklar]] · [[Blok - Metin]]
