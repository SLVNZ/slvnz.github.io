---
tags: [blok]
aliases: [skill]
---

# Blok — Yetenek Kartı (`skill`)

Adı, bağlı niteliği, bedeli ve etiketleri olan yetenek.

## Alanlar

| Alan | Tip | Not |
|---|---|---|
| `name` | string | Yetenek adı — No Serenity ile büyük çizilir |
| `attribute` | string | Bağlı nitelik (Güç, Çeviklik…) |
| `cost` | string | Bedel / seviye |
| `tags` | array | Etiket rozetleri |
| `html` | string | Açıklama (zengin metin) |

Panelde etiketler tek satıra virgülle yazılır, diziye çevrilir.

## Görünüm

Üstte saç çizgisi ayraç, solda ad, sağda nitelik + bedel (küçük, aralıklı, vurgu renginde), altta açıklama, en altta yuvarlak etiket rozetleri.

## Örnek

```json
{
  "type": "skill",
  "name": "Kalkan Duvarı",
  "attribute": "Güç",
  "cost": "2 puan",
  "tags": ["savunma", "tepki"],
  "html": "<p>Yanındaki müttefik saldırıya uğradığında araya girersin.</p>"
}
```

## İlgili
[[Bloklar]] · [[Blok - Yaratık NPC]]
