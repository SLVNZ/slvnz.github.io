---
tags: [tasarım, etkileşim]
---

# Etkileşimler

İki JS dosyası, hiçbiri bağımlılık kullanmıyor. İkisi de aşamalı iyileştirme: JS kapalıyken sayfa tam çalışır.

## Nav — mürekkep emme (`nav.js`)

`nav.js` her menü öğesinin metnini harflere böler (`<span class="spell__l">`), her harfe `--i` (sıra) ve `--n` (toplam) verir. CSS bu değişkenlerle gecikmeli renk geçişi kurar.

| Yön | Davranış |
|---|---|
| Üstüne gelince | Renk soldan sağa vurgu rengine döner (`--i × .028s`) |
| Ayrılınca | Sağdan sola geri süzülür (`(--n − 1 − --i) × .028s`) |
| Altında | 1 px saç çizgisi soldan çizilir, ayrılınca sağdan çekilir |

> [!note] Erişilebilirlik
> Harflere bölünen metin `aria-hidden`; tam kelime `.visually-hidden` bir kopyada durur. Ekran okuyucu "O-Y-U-N" değil "Oyun Kuralları" okur. `aria-label` yerine kopya, çünkü menü öğeleri hedef sayfaları yazılana kadar düz `<span>` — `aria-label` orada yok sayılır.

## Menünün pasif hâli

Sitede şimdilik yalnızca başlık sayfası var, o yüzden menü öğeleri `<a>` değil `<span>`. Üstüne gelince efekt çalışır, tıklama bir şey yapmaz.

Bir sayfa yazıldığında `index.html` içinde

```html
<span class="mainnav__link">Oyun Kuralları</span>
<a class="mainnav__link" href="/kurallar/">Oyun Kuralları</a>
```

ilk satır ikinciyle değişir. Aşağıdaki çıkış geçişi o an kendiliğinden devreye girer, CSS de imleci yalnız `a.mainnav__link` için `pointer` yapar.

## Sayfa çıkışı (`nav.js`)

Href'i olan bir menü öğesine tıklanınca (620 ms): başlık bloğu yukarı süzülüp solar, diğer öğeler kaybolur, seçilen kelime %6 büyüyüp vurgu rengine döner — sonra yönlendirme.

Dokunulmayan durumlar: `Ctrl/⌘/Shift/Alt` + tık, orta tık, `target="_blank"`, `#` ile başlayan bağlantılar ve href'i olmayan öğeler. `pageshow` olayında (geri tuşu / bfcache) durum sıfırlanır.

## Giriş animasyonu

Başlık sayfası öğeleri yukarıdan aşağı kademeli belirir (0.7 s, `--ease`). Çizim yalnızca solarak gelir — çünkü `translate` özelliğini kendi ortalanması için kullanıyor.

> [!warning] Hareket azaltma
> `prefers-reduced-motion: reduce` altında harf dalgası ve çıkış geçişi kapanır; son durum anında gösterilir.

## İlgili
[[Tema Sistemi]] · [[Tasarım Sistemi]] · [[Başlık Sayfası Geometrisi]]
