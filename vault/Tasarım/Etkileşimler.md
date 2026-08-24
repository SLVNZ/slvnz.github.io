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

## "4.0" parıltısı ve oyma hover

Sürüm numarası iki durumda yaşar; ikisi de **saf CSS** — sayfada bu iş için
WebGL bağlamı yok.

### Boşta: geçen parıltı bıçağı

`.wordmark__version-label::after` aynı metni ikinci bir katman olarak taşır
(`content: attr(data-text)`). Katmanın zemininde dar bir ışık bandı var,
`background-clip: text` ile metne kırpılıyor; `background-position` animasyonu
bandı soldan sağa geçiriyor.

| Karar | Neden |
|---|---|
| Ayrı `::after` katmanı | Taban rengi hover'da serbestçe geçiş yapabilsin diye. Tek katmanda `color: transparent` gerekir, o da hover geçişini bloklardı. |
| Kutu `inset: -0.22em -0.14em` + aynı kadar `padding` | **Bıçağın harfin tepesini kapatması için.** `background-clip: text` zemini metne kırpar ama zemin yalnız öğenin kutusuna boyanır; No Serenity'nin capları satır kutusunun ~0.084em ÜSTÜNE taştığı için `inset: 0` ile glyph'in tepesinde kırpılacak zemin kalmıyor ve bıçak orada kesiliyordu. Kutu taşırılıp padding ile içerik kutusu geri alınınca (`box-sizing: border-box`) metin yerinde kalır, zemin taşan kısmı da kaplar. |
| Bant %280 imgede 45–55 arası (kutunun ~%28'i) | Daha genişi "geçen bir bıçak" değil, topluca parlayan bir yazı olur. |
| `linear`, 6.5sn'de %20'lik pencere (~1.3sn) | Sayfanın ortak `--ease`'i güçlü bir yavaşlama eğrisi; onunla bıçak ilk 0.3sn'ye sıkışıp göz kırpması gibi kalıyordu. |
| Uzun bekleme | Sürekli kıpırdayan bir parıltı göz yorar; niyet ara sıra kendini hatırlatan bir ışık. |

`prefers-reduced-motion: reduce` altında animasyon hiç tanımlanmaz.

### Hover: içi kâğıt, konturu turuncu

Üstüne gelince (ya da klavyeyle odaklanınca, ya da menü açıkken) yazının içi
zemin rengine döner, konturu vurgu renginde kalır ve çevresine hafif bir ışık
düşer:

```css
color: var(--paper);
-webkit-text-stroke-color: var(--accent);
text-shadow: 0 0 5px …, 0 0 16px …;   /* glyph'i izler, kutuyu değil */
```

Kontur genişliği (`0.055em`) boşta da tanımlı, yalnız rengi saydam — böylece
geçiş yumuşak olur ve **düzen hiç kaymaz**. Bıçak hover'da susar, iki efekt
üst üste binmesin.

> [!note] Kontur ortadan değil dışarıdan
> `paint-order: stroke fill` önce konturu, sonra dolguyu boyar; dolgu konturun
> iç yarısını örter ve geriye temiz bir **dış** çerçeve kalır. Varsayılan
> (ortalanmış) kontur bu blackletter yüzün ince ayrıntılarını yiyip bulanık
> gösteriyordu. Saydam konturda `paint-order` görünümü değiştirmez — boştaki
> glyph birebir aynı kalır (vurgu piksel sayımıyla doğrulandı).

> [!warning] `text-stroke` desteklenmezse
> Oyma görünüm `@supports (-webkit-text-stroke: 1px red)` içinde. Dışarıda
> bırakılsaydı, kontur çizemeyen bir tarayıcıda metin kâğıt renginde ve
> konturSUZ kalır — yani görünmez olurdu.

> [!note] Ölçüldü
> Bıçağın parlak pikselleri glyph mürekkebinin **1px üstünden** başlıyor —
> tepede kesilme yok. Boştaki vurgu piksel sayısı `paint-order` öncesi ve
> sonrası aynı (karanlık 795, aydınlık 723), yani boş durum bozulmadı.

> [!note] Neden shader değil
> Önce mesafe alanlı (SDF) bir WebGL köz ışıltısı yazıldı: glyph rasterize
> edilip öklit mesafe dönüşümüyle ışık konturdan yayılıyordu. Hizalaması
> piksel-altı doğruydu ama görsel olarak **fazla ağırdı**. Sadeye dönüldü;
> `text-shadow` da kutuyu değil glyph'i izlediği için "kenarları belli kutu"
> sorunu burada zaten yok.

## Sürüm menüsü (`version-menu.js`)

"4.0"a tıklayınca sürüm listesi açılır (tetikleyiciden ölçek + yükselme ile).
WAI-ARIA menü düzeni: Enter/Boşluk/↓ açar, ↑↓ döngüsel gezinir, Home/End uçlar,
Esc kapatır ve odağı düğmeye verir, Tab kapatır. Arşiv sürümleri `aria-disabled`
— odaklanılabilir kalır (varlığı duyulsun) ama etkinleşmez. Şimdiki sürüm zaten
açık sayfaya baktığı için tıklanınca yalnız menüyü kapatır. Menü açıkken köz
yanık kalır. JS yokken menü `hidden` başlar, sayfa etkilenmez.

## İlgili
[[Tema Sistemi]] · [[Tasarım Sistemi]] · [[Başlık Sayfası Geometrisi]] · [[Oyun Kuralları Sayfası]]
