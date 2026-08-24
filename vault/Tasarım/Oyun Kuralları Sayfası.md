---
tags: [tasarım, sayfa]
---

# Oyun Kuralları Sayfası

`kurallar.html` — sitenin ilk içerik sayfası (kökte tek dosya, klasör yok). Kaynağı `ui.fig` içindeki
**OYUN KURALLARI** çerçevesi (1440 × 1024, düğüm 7:2); değerler dosyadan
[[Figma Kaynak Verisi]]'ndeki yöntemle çözümlendi.

## Çerçeveden çıkan yerleşim

| Öğe | Konum | Ayrıntı |
|---|---|---|
| Logo kilidi | (69, 68) 183.7 × 93.4 | SLVNZ mürekkep 146.5 geniş · 4.0 No Serenity 29.5 · FANTAZYA Archivo ExtraLight 12.38 / %94 |
| Çizim (image 3) | (413, 42) 615 × 344 | Cadı çizimi, merkez 720 = sayfa ortası |
| OYUN KURALLARI | (71, 436) | Space Grotesk Bold 35.11 / %73, iki satır |
| 5 BÖLÜM | y 502 | Archivo ExtraLight Italic 16, turuncu |
| YETENEKLER / EVREN REHBERİ | (69, 535) / (70, 569) | Space Grotesk 16, `#818181` |
| Başlık "OYUN SİSTEMİ" | (475, 344) | Archivo Black 48 |
| Gövde | (475, 413) 490 geniş | Alt başlık Archivo Bold 24 turuncu, metin Archivo 14 |
| Sağ TOC (Group 8) | (1231, 409) 155 × 206 | Sağa yaslı etiket Archivo 12 + numara Archivo Light 10 turuncu, 45px ritim |

Başlık sayfası sabit bir kompozisyon olduğu için `--s` artboard birimiyle
kurulmuştu; bu sayfa **akan bir belge** — ölçüler `clamp()` ile akışkan,
renk/tip token'ları yine `style.css`'ten.

## Yerleşim modeli

Ana sayfadaki `.page` gibi **sabit yükseklik** (`100dvh`): üstte eyebrow,
altta tema anahtarı + telif hep görünür; belge kaymaz, içerik ortadaki
`.rules__scroll` konteynerinde akar (ince kaydırma çubuğu, üst/altta yumuşak
maske solması).

- **Sol ray** `position: fixed` — kilit üstte, bölüm bloğu dikeyde ortada.
- **İçerik** ortalanmış tek sütun, `--content-w: 33rem` (Figma 490px ≈ 70 karakter).
- **Sağ bölüm menüsü** `position: fixed`, dikeyde ortalı; açık bölüm işaretli.
- **≤1160px** ray ve TOC kaydırıcının DIŞINDA satıra döner (hep görünür),
  yalnız içerik kayar. **≤640px** TOC'ta yalnız etkin öğenin etiketi görünür,
  numaralar hep durur.

## Bölüm panelleri

Sayfa uzun bir kaydırma değil: **bir seferde tek bölüm** görünür, sağdaki
menüden geçilir.

```
<article class="panel" id="…" aria-labelledby="…" data-panel>
  <figure class="panel__art">   üstte görsel (sabit yükseklikli şerit)
  <header class="panel__head">  numara + başlık
  <div class="panel__rich">     zengin metin
```

`panel__rich` içinde şunlar önceden biçimlendirilmiş: `h3` `h4` `p` `ul` `ol`
`blockquote` `table` `hr` `code` `strong` `em` `a` ve `p.lede`. İleride
yönetim paneli **yalnız bu bloğun içini** değiştirecek — çevresindeki iskelete
dokunmaya gerek yok.

> [!note] Görsel şeridi neden `<img>`'de ölçülüyor
> Kutuyu `<figure>`'a verip resmi `max-height: 100%` ile sınırlamak,
> `<picture>` sarmalı yüzünden yüzdeyi `auto` yüksekliğe dayandırıyor ve sınırı
> düşürüyordu; dikey çizim (figure1, 1904×2544) şeridi taşıyordu. Ölçü doğrudan
> `<img>`'de: sabit yükseklik + `object-fit: contain`. Boy oranı ne olursa olsun
> şerit aynı — modülün taşınabilir olmasının şartı bu.

### Bölüm görselleri

| Bölüm | Çizim |
|---|---|
| 01 Oyun Sistemi | `oyunkurallari-header` |
| 02 Zarlar & Eylemler | `figure2` |
| 03 Nitelikler | `figure1` (dikey) |
| 04 Beceriler | `oyunkurallari` |
| 05 Enerjiler | `titlepage-art` — kendi çizimi yazılana kadar başlık sayfasının görseli |

Hepsinin beyaz zemini alfaya çevrildi (`*-alpha.png` + `.webp`), böylece
karanlık modda tek `invert` filtresi yetiyor.

## Etkileşimler

Hepsi aşamalı iyileştirme. **İşaretlemede hiçbir panel gizli değil** ve menü
öğeleri gerçek çapa bağlantıları: JS yoksa sayfa, bölümleri alt alta akıtan
bağlantılı bir belge olarak eksiksiz çalışır. Gizlemeyi yalnız `kurallar.js`
yapar (`html.js .panel[hidden]`).

| Ne | Nasıl |
|---|---|
| Bölüm geçişi | Eski panel yukarı süzülüp solar (220ms), yeni panel aşağıdan gelir (360ms) |
| Menü durumu | Açık bölümde `aria-current="true"` + saç çizgisi |
| Adres | `history.pushState` — bölüm paylaşılabilir, geri tuşu önceki bölüme döner |
| Odak | Kullanıcı bölüm seçince odak panele taşınır; açılışta taşınmaz (okumaya baştan başlayanı içeriğin ortasına atmamak için) |
| Gizleme | `hidden` niteliği — hem görsel hem erişilebilirlik ağacından çıkar |
| Okuma ilerlemesi | Açık bölüm kaydırılabildiğinde belirir, kısa bölümde kendini gizler |
| Paralaks | Açık panelin çizimi kaydırmanın %6'sı kadar geride kalır |
| Ray bağlantıları | nav.js'in harf harf mürekkep emmesi |
| Sayfa çıkışı | Logo kilidine tıklayınca belge solup ana sayfaya döner |

> [!note] Ölçüldü
> Açılış → yalnız `oyun-sistemi` görünür, menü `#oyun-sistemi`, hash yok.
> 04'e tıklanınca → yalnız `beceriler`, menü `#beceriler`, hash `#beceriler`,
> odak panele geçti. Geri tuşu → `oyun-sistemi`'ne döndü, menü ve hash izledi.

> [!warning] Hareket azaltma
> `prefers-reduced-motion: reduce` altında: panel geçişi anında, paralaks yok,
> duman tek kare.

## Duman (`ink-shader.js`)

Alana dağılmış, ağır ağır dönen prosedürel duman. Görünüşü dört karar belirler:

| Karar | Neden |
|---|---|
| **Quintic yumuşatma** (6t⁵−15t⁴+10t³) | Kübik `f*f*(3-2f)` ikinci türevinde süreksiz; yavaş ve geniş alanlarda kafes çizgileri boyunca "kırışıklık" olarak görünür. Quintic C² sürekli. |
| **Oktavlar arası dönme** `mat2(.8,.6,-.6,.8)` + lacunarity **2.02** | İkisi de eksen hizalı kafes desenini kırar; tam sayı lacunarity örgü tekrarını görünür kılar. |
| **İki katmanlı domain warp** (IQ): q=fbm(p), r=fbm(p+q), d=fbm(p+r) | Kütleleri kendi içinde katlar — tek fbm'in düz "leke" hâlinden çıkarır. |
| **Sert eşik yerine güç eğrisi** `pow(f*1.45-0.22, 1.7)` | `smoothstep` yoğunluğu keserek belli kenarlı baloncuk yapar; pow uzun bir kuyruk bırakır, duman seyreldiği yerde usulca yok olur. |

Ek olarak altın oran karması (`sin()` yok — mediump'ta kararlı), `highp`
tercihi ve 8 bit bandını kıran çok ince serpme.

### İmleç

Ham imleç konumu doğrudan shader'a gitmez: hedefe yaklaşan yumuşatılmış bir
konum ve ondan türeyip kendi de sönümlenen bir hız tutulur. Shader'da Gauss
ağırlık (`exp(-r²·7)`) — hiçbir yarıçapta kenar üretmez. Örnek noktası hızın
tersine kayar (duman imleçle sürüklenmiş görünür) ve `perp(d)` ile strokun
ardında usul bir girdap kalır.

> [!note] Ölçüldü
> Hız 0 ile 0.9 arasındaki kare farkı: merkezde 32/255, dışa doğru
> **tekdüze** azalıyor (32 → 30 → 16 → 16 → 8 → 5 → 2 → 0.6). Hiçbir
> yarıçapta sıçrama yok — yani görünür halka/mercek kenarı yok.

### Karanlığa geçiş dolumu

Aydınlık→karanlık geçişinde (ve karanlıkta açılışta) duman yoktan var olup
alanı **aşağıdan yukarı** doldurur, 1.8sn, smootherstep. Üç mekanizma birlikte:

| Terim | Etkisi |
|---|---|
| `mix(1.05, 0.22, bloom)` yoğunluk eşiği | Önce hiçbir yer eşiği geçmez; eşik inerken en yoğun çekirdekler belirip yayılır |
| `bloom = clamp(u_fill*1.35 − uv.y*0.35, 0, 1)` | uv.y payı alt kenarın önce dolmasını sağlar — duman yükselir. `u_fill=1`'de terim doyar, yani bitişte tam olarak normal görünüme oturur |
| `mix(1.22, 1.0, u_fill)` örnekleme ölçeği | Kütleler büyüyerek yayılır — duman kabarır |

Aydınlıkta dolum yok (orada duman zaten çok soluk, animasyon gürültü olurdu);
karanlık→karanlık değişim tetiklemez, karanlıktan çıkışta iptal olur. Hareket
azaltılmışsa dolum atlanır. Dolum sürerken kare hızı boşta moduna düşmez.

> [!note] Ölçüldü
> Ortalama alfa dolumla tekdüze artıyor: 0.15 → 0.63 → 4.55 → 14.99 → 32.77 →
> 40.84 (fill 0→1). Alt üçte bir üstten çok önce doluyor: fill 0.4'te
> **10.25**'e karşı **0.92**. `u_fill` eğrisi geçişte 0.00 → 0.33 → 0.82 → 1.00.
> Aydınlıkta ve aydınlığa dönüşte 1.00 (dolum yok). Satır profilinde sert kenar
> yok (satır başına en çok 1.69/255, ortalama 0.55).

### GPU bütçesi

`powerPreference: "low-power"` · kare hızı **30fps** tavanlı, imleç 2.5sn
kıpırdamazsa **20fps** (ölçüldü: 30.0 / 20.0) · iç çözünürlük uzun kenar
**≤ 640px** (1440×900'de canvas 640×365) · warp fbm'leri 3, ana fbm 4 oktav =
kare başına **16 gürültü örneği** · doku/FBO/çoklu geçiş yok, tek tam ekran
üçgen, harmanlama kapalı · sekme gizliyken tamamen durur · WebGL yoksa
sessizce hiç görünmez · hareket azaltılmışsa tek durağan kare.

> [!warning] Düzeltilen hata — premultiplied alpha
> Canvas varsayılan olarak premultiplied alfa bekler. Önceki sürüm düz renk +
> alfa yazıyordu (`rgb > a`, geçersiz piksel) ve `SRC_ALPHA` harmanlaması
> alfayı bir kez daha çarpıyordu: görünür opaklık `a²` — yani **16× yanlış**.
> Şimdi çıktı premultiplied (`rgb *= a`), harmanlama kapalı. Ölçüm: 0 ihlal,
> tepe alfa 98/255 (0.42 testinde beklenen ~107).

Renk `--mist-ink` / `--mist-alpha` token'larından (aydınlık .04, karanlık .06);
tema değişince tazelenir. Canvas `z-index: -1`.

> [!note] Çizimin alfa kanalı
> Kaynak PNG beyaz zeminliydi; `oyunkurallari-header-alpha.png` ve `.webp`
> beyazı alfaya çevirerek üretildi (siyah mürekkep + alfa). Böylece karanlık
> modda başlık sayfasındaki gibi tek `invert` filtresi yeter.

## İlgili
[[Figma Kaynak Verisi]] · [[Tasarım Sistemi]] · [[Etkileşimler]] · [[Tema Sistemi]]
