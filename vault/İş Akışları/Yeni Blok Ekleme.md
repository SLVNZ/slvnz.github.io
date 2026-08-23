---
tags: [akış, geliştirme]
---

# Yeni Blok Ekleme

Geliştirici işi. Örnek: `quote` (kaynak belirtilen alıntı) bloğu.

Dört dosyaya dokunulur:

## 1. Kayıt — `admin/lib/store.php`

```php
const BLOCK_TYPES = [
  …
  'quote' => 'Alıntı',
];
```

Bu, panelin **Blok ekle** çubuğunda düğmeyi doğurur ve kaydederken doğrulamadan geçmesini sağlar.

## 2. Çıktı — `admin/lib/render.php`

```php
function render_quote(array $b): string {
  return '<figure class="pull-quote">'
       . '<blockquote>' . clean_html($b['html'] ?? '') . '</blockquote>'
       . (!empty($b['source']) ? '<figcaption>' . e($b['source']) . '</figcaption>' : '')
       . '</figure>';
}
```

> [!warning] İki kural
> Fonksiyon adı **`render_` + tip adı** olmalı — `render_blocks()` onu böyle bulur.
> Düz metin `e()` ile, zengin metin `clean_html()` ile geçirilir. İkisini de atlarsan panele yapıştırılan HTML siteye sızar.

## 3. Düzenleyici — `admin/assets/admin.js`

`editors` nesnesine ekle:

```js
quote: (b) => [
  input(b, 'source', 'Kaynak'),
  richText(b.html, (h) => { b.html = h; }, 'Alıntı metni…'),
],
```

Ve yeni blok eklenince oluşacak varsayılan nesneyi `[data-add-block]` işleyicisindeki `fresh` haritasına yaz:

```js
quote: { source: '', html: '' }
```

Yardımcılar: `input(b, anahtar, etiket)`, `select(b, anahtar, etiket, seçenekler)`, `richText(değer, geriÇağrı, yerTutucu)`.

## 4. Görünüm — `docs/assets/css/rulebook.css`

```css
.pull-quote { margin: 2rem 0; padding-left: 1.2rem; border-left: 2px solid var(--accent); }
.pull-quote blockquote { margin: 0; font-size: 1.15rem; }
.pull-quote figcaption { margin-top: .5rem; font-family: var(--font-grotesk);
  font-size: .74rem; letter-spacing: .12em; color: var(--muted); }
```

Ham renk yazma — daima token kullan ([[Tasarım Sistemi]]).

## 5. Doğrula

```bash
php -l admin/lib/render.php && php build.php
```

Sonra panelde bloğu ekleyip kaydet, `localhost:8080`'de bak.

## İlgili
[[Bloklar]] · [[Yönetim Paneli]] · [[Tasarım Sistemi]]
