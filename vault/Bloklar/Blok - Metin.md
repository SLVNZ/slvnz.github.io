---
tags: [blok]
aliases: [text]
---

# Blok — Metin (`text`)

Zengin metin. Sayfaların çoğu bunlardan oluşur.

## Alanlar

| Alan | Tip | Not |
|---|---|---|
| `html` | string | Süzülmüş HTML |

## Araç çubuğu

Kalın · İtalik · H2 · H3 · Paragraf · Madde listesi · Numaralı liste · Alıntı · Bağlantı · **Zar** · Biçim temizle

Zar düğmesi seçili metni `<code class="dice">` içine alır — No Serenity ile vurgu renginde görünür.

## Güvenlik süzgeci

`clean_html()` (`admin/lib/render.php`) yalnızca yapısal etiketleri geçirir:

```
p br strong em b i u s ul ol li h2 h3 h4 a blockquote code hr span
```

> [!warning] Öznitelikler silinir
> Tüm öznitelikler atılır; sadece ikisi geri verilir: `<a href>` (yalnızca `http(s)`, `/`, `.`, `#`, `mailto:` ile başlıyorsa; dış bağlantılara `rel="noopener"` eklenir) ve `class="dice"`. Yani panele yapıştırılan stil, script veya `onclick` siteye geçemez.

Yapıştırma da düz metne çevrilir; boş paragraflar temizlenir.

## Örnek

```json
{
  "type": "text",
  "html": "<p>Her eylem <code class=\"dice\">2d6</code> ile çözülür.</p><h2>Zorluk</h2>"
}
```

## İlgili
[[Bloklar]] · [[Şablonlar]]
