---
tags: [blok]
aliases: [table]
---

# Blok — Tablo (`table`)

Zar tablosu, modifiye tablosu veya düz liste.

## Alanlar

| Alan | Tip | Not |
|---|---|---|
| `caption` | string | Üstte küçük aralıklı başlık |
| `columns` | array | Sütun başlıkları |
| `rows` | array | Satır dizisi; her satır hücre dizisi |
| `dice` | bool | İlk sütun zar sonucu mu |

## Zar kipi

`dice: true` iken ilk sütun `<th scope="row">` olur ve No Serenity + vurgu rengi + tablo rakamlarıyla çizilir — zar sonuçları göz taramasında hemen ayrılır.

## Panel düzenleyici

Izgara doğrudan düzenlenir: `+` ile sütun ekle, `+ Satır`, `− Son sütun`, satır sonundaki `×` ile satır sil.

> [!note] Taşma
> Tablolar `.table-wrap` içinde `overflow-x: auto` ile sarılır; dar ekranda tablo kendi içinde kayar, sayfa yatay kaymaz.

## Örnek

```json
{
  "type": "table",
  "caption": "Zorluk sınıfları",
  "columns": ["Sınıf", "Hedef", "Örnek"],
  "rows": [["Kolay", "6", "Tanıdık bir yolu takip etmek"]],
  "dice": false
}
```

## İlgili
[[Bloklar]]
