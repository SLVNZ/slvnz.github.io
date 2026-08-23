---
tags: [blok]
aliases: [statblock]
---

# Blok — Yaratık / NPC (`statblock`)

Çerçeveli künye bloğu.

## Alanlar

| Alan | Tip | Not |
|---|---|---|
| `name` | string | Yaratık adı |
| `level` | string | Seviye / tehlike derecesi |
| `stats` | array | `{key, value}` çiftleri |
| `html` | string | Özel yetenekler (zengin metin) |

## Görünüm

Tam çerçeve (`--ink`), üstte ad + tehlike, altında nitelikler duyarlı ızgarada (`auto-fit, minmax(7rem, 1fr)`), en altta ayraçla ayrılmış özel yetenekler.

Değerler No Serenity ile çizilir, etiketler küçük aralıklı Space Grotesk.

> [!tip] Boş yetenek alanı
> `html` boşsa `.statblock__abilities:empty` kuralıyla o bölüm ve ayraç gizlenir — boş çizgi kalmaz.

## Örnek

```json
{
  "type": "statblock",
  "name": "Bataklık Kurdu",
  "level": "Tehlike 2",
  "stats": [{"key": "Can", "value": "14"}, {"key": "Zırh", "value": "9"}],
  "html": "<p><strong>Sürü içgüdüsü.</strong> Yanında kurt varsa +2.</p>"
}
```

## İlgili
[[Bloklar]] · [[Blok - Yetenek Kartı]]
