---
tags: [tasarım, sayfa, veritabanı]
---

# Yetenekler Sayfası

`yetenekler.html` — enerjisel, fiziksel ve karma yeteneklerin dizini. Sitenin
geri kalanı elle yazılmış içerikken burası **veritabanından üretilir**.

> [!info] Bir cümlede
> Solda aranabilir/süzülebilir/sıralanabilir bir tablo, sağda tıklanan
> yeteneğin tam künyesini taşıyan bir kart.

## Neden veritabanı, ama yine de statik HTML

Yayındaki site GitHub Pages'te durur — bir MySQL sunucusuna bağlanamaz. Bu
yüzden veritabanı yalnız **yazım** tarafındadır, sayfa **okuma** tarafıdır:

```
panel → veritabanı → yetenekler.html + content/yetenekler.json → git push
```

Panelin `content/site.json` için yaptığının aynısı; tek fark kaynağın JSON
değil ilişkisel bir şema olması. Şema `admin/schema.sql`, MySQL lehçesinde.
Sürücü yoksa aynı dosya üç satırlık bir çeviriyle SQLite'a kurulur
(`admin/db.py`). Bkz. [[Yönetim Paneli]].

## Belge çerçevesi

Sayfa [[Oyun Kuralları Sayfası]]'nın iskeletini olduğu gibi kullanır:
`kurallar.css` (ray · TOC · panel · zengin metin) + `kurallar.js` (panel
geçişi, okuma ilerlemesi). Üç kategori, kurallar sayfasındaki bölümlerin
yerine geçer — sağ menüden geçilir, `[data-panel]` mekanizması aynıdır.

`yetenekler.css` yalnız dizinin kendisini kurar.

### Sütun genişliği — ölçüyle seçilmiş sayılar

Kurallar sayfası dar bir okuma sütunudur (`--content-w: 33rem`). Burada solda
tablo sağda kart duracağı için sütun genişletilmeli; ama ray ve TOC
`position: fixed` olduğundan sütun **ikisinin arasına** sığmak zorunda.
Tarayıcıda ölçülen değerler (1600px'te ray 69→276, TOC 1455→1546) her iki yana
300px'lik bir koridor bırakmayı gerektirdi:

```css
width: min(100vw - 37.5rem, 74rem);   /* ≥1161px */
```

Bölünme eşiği de ölçüden çıktı ve bir kez **yeniden** ölçüldü. Tablonun
sarmalı başlıklarla ölçülen min-content genişliği tablonun alt sınırını
belirler ve o sınır kısalamaz. 1440px'te sütun 840px olduğundan karta yalnız
262px kalıyor; kart o darlıkta 678px'e uzayıp panelin yükseklik payını aşıyor
ve kendi içinde kaymaya başlıyordu.

Ölçü **Süre sütunu eklenince yeniden yapıldı**: min-content 542 → **612px**,
yani tablonun alt sınırı 34 → **38.5rem** oldu ve eşik de onunla birlikte
kaydı. Kartın okunur alt sınırı 20rem:

```
616 (tablo) + 24 (boşluk) + 320 (kart) + 600 (ray/TOC payı) = 1560px
```

Sütunlar kategoriye göre değiştiği için **eşik de profile bağlı** oldu; aynı
formül üç kez çözülür (ölçülen min-content'ler: fiziksel 463, enerjisel 588,
karma 682):

```
fiziksel   472 + 944 = 1416  →  1420      (6 sütun)
enerjisel  592 + 944 = 1536  →  1560      (8 sütun)
karma      688 + 944 = 1632  →  1640      (9 sütun)
```

Bölünmüş yerleşimin TABANI artık üstüstedir; her profil kendi eşiğinde
ızgaraya geçer. Tersi (taban ızgara, altında geri alma) yazılsaydı her yeni
kategori bir `max-width` kuralı daha isterdi. Altında kart tablonun *üstüne* iner — dar ekranda
tıklamanın karşılığı hemen görünsün, üstelik orada tam genişlikte, yani kısa
(1440×790'da 388×840; yan yana durduğunda 678×262 idi).

> [!warning] Izgarada tablo sütununun alt sınırı yazılı olmalı
> `minmax(0, 1fr) minmax(15rem, 24rem)` yazıldığında ızgara boş alanı önce
> karta veriyor, kart 24rem'e şişiyor ve tablo kendi `min-width`'inin altında
> kalıp yatay kaydırmaya düşüyordu. Doğrusu `minmax(38.5rem, 1fr)`.

> [!warning] Sütun eklemek üç sayıyı birden oynatır
> `.ytablo { min-width }`, ızgaranın tablo sütunu ve bölünme eşiği aynı ölçüden
> türer. Süre sütunu eklendiğinde yalnız ilki güncellenseydi tablo 1600px'te
> bile yatay kaydırmaya düşerdi — nitekim ilk denemede düştü.

Kartın üst sınırı 21rem değil **24rem**: 1600px'ten sonra boş alan varken kartı
dar tutmak onu uzatıyordu. Eşiğin altını bozmuyor — orada tablo zaten kendi
38.5rem'ini alıyor, kart artakalanı.

Tablo başlıkları `nowrap` DEĞİL: sabitlendiğinde tablonun min-content genişliği
632px'e çıkıyor ve bölünme eşiğinde yatay kaydırma gerekiyordu. Dar sütunda
başlık iki satıra iner.

### Dikey bütçe — kart ekrana sığmalı

Yan yana yerleşimde kart, panelin `max-height`i içinde kendi kaydırma çubuğunu
çıkarıyordu: 1600×900'de en dolu kart (Alev Mızrağı) 779px, panel 708px.
Sorun yalnız kartta değildi — kartın üstündeki her şey 235px yiyordu.

| | önce | sonra | nasıl |
|---|---|---|---|
| panel başlığı | 75 | 59 | belge başlığı 48px→32px; burası dizin, künye değil |
| süzgeç çubuğu | 136 | 61 | denetimler 36→32px, süzgeç 8.5→7rem: tek satıra iniyor |
| kart | 779 | 565 | aşağıya bak |
| **kart alt kenarı** | **1074** | **822** | ekranın alt sınırı 827 |

Kartın kendi içindeki kazanç, alan silmeden — etiketleri kendi satırlarından
sütuna almakla:

| katman | önce | sonra |
|---|---|---|
| kimlik | 97 | 85 |
| künye (`__stats`) | 108 | 86 |
| bedel (`__ger`) | 259 | 163 |
| anlatı | 97 | 66 |
| kenar not | 107 | 76 |

`__ger` en büyük kalemdi: "Gereksinimler" başlığı ile S·H·M rozeti ayrı
satırlardaydı (rozet tek başına 27px), üç gereksinim bloğunun her biri de
etiketini (`Söz`, `Hareket`, `Materyal`) kendi satırında taşıyordu — blok başına
~17px. Başlık ile rozet artık aynı satırı paylaşıyor, etiketler ise
`.ykart__stat`'ın zaten kullandığı iki sütunlu deyime geçti:

```css
.ykart__gsat { display: grid; grid-template-columns: 4.4rem minmax(0, 1fr); }
.ykart__gsat > :not(.ykart__getiket) { grid-column: 2; }
```

Üstüste yerleşimde kart tablo genişliğindedir; orada künye üç sütuna, gereksinim
blokları ikişerli satıra geçer (1000–1499px bandı) — 486px'ten 388px'e iner ve
1440×790'da tümüyle ekrana girer.

## Aşamalı iyileştirme

Üretilen HTML'de **hiçbir şey gizli değildir**: üç panel de, beş kartın hepsi
de açıktır, tablodaki her ad gerçek bir çapa bağlantısıdır
(`#y-enerjisel-alev-mizragi`).
JS kapalıyken sayfa, tablosu dizin, kartları tam metin olan bir belgedir.
`yetenekler.js` yalnızca kartları teke indirir ve aramayı/süzgeci/sıralamayı
bağlar. Ağ isteği yoktur — sayfa `file://` ile de çalışır.

## Arama, süzgeç, sıralama

- **Arama** her satırın `data-ara` alanında geçer. Alan *katlanmıştır*: ı→i,
  ş→s, ğ→g, ü→u, ö→o, ç→c ve küçük harf. "ates" yazan "Ateş"i bulur.
  Katlama tablosu iki yerde birden durur — `yetenek.py: katla()` ve
  `yetenekler.js: katla()`. **İkisi ayrışırsa arama sessizce ıskalar.**
- **Süzgeçler** `data-eylem/element/enerji/kaynak/seviye` üzerinde tam
  eşleşmedir; seçenekler yalnız o kategoride gerçekten kullanılan değerlerden
  üretilir (boş süzgeç yok).
- **Sıralama** başlığa tıklandıkça artan → azalan → varsayılan diye döner.
  Metin sütunları `Intl.Collator('tr')` ile karşılaştırılır: onsuz "Çakmak" <
  "Cam" olur ve ı/i ayrımı kaybolur. Boş hücre ("—") yön ne olursa olsun sona
  düşer. İkincil sıra her zaman ada göre artan — sıralama kararlıdır.
- Süzgeç seçili satırı sakladığında kart kapanır; ekranda seçili olmayan bir
  şeyin kartı durmaz.

## Yetenek kartı

Sıra kasıtlı — okuma hiyerarşisi:

| Katman | İçerik |
|---|---|
| Kimlik | seviye · kategori → ad → eylem/element/enerji + nitelik etiketleri |
| Mekanik | kaynak (tür + tüketim) · süre · menzil · alan |
| Bedel | S·H·M rozeti, sonra açık olanların kendi alanları |
| Anlatı | açıklama |
| Kenar not | dipnot — ayrı kutuda, daha sessiz |

Tabloda görünen alanlar kartta tekrar eder: kart tek başına okunabilir olmalı.

Yasak enerjiler (Kan, Aydınlık, Karanlık, Ruh, Yaşam) etiketlerinde çift
çerçeve, özel enerjiler (İnanç, Pakt, Kaos) kesik çerçeve taşır — kural
kitabının kendi işareti, renge yaslanmadan.

## Kategoriler aynı tabloyu paylaşmaz

Üç alan aynı şemayı kullanır ama aynı ALANLARI kullanmaz. Fiziksel yetenekte
element, enerji türü, kaynak türü, süre, ritüel ve söz/hareket/materyal üçlüsü
yoktur; buna karşılık **yetkinlik** (silah türü) vardır ve kaynak hep Soluk
olduğu için sütun "Soluk" başlığıyla yalnız tüketimi taşır. Karma ikisinin
birleşimidir.

| | enerjisel | fiziksel | karma |
|---|---|---|---|
| element · enerji türü | ✓ | — | ✓ |
| kaynak türü seçimi | ✓ | — (sabit: Soluk) | ✓ |
| süre | ✓ | — | ✓ |
| söz · hareket · materyal | ✓ | — | ✓ |
| yetkinlik | — | ✓ | ✓ |
| nitelikler | R Ritüel · K Konsantrasyon | **O Odak** | R · K |

Tablo sütunları:

```
enerjisel  Sv · Yetenek · Eylem Türü · Element · Enerji Türü · Süre · Kaynak · Menzil
fiziksel   Sv · Yetenek · Eylem Türü · Yetkinlik · Soluk · Menzil
karma      Sv · Yetenek · Eylem Türü · Element · Enerji Türü · Süre · Yetkinlik · Kaynak · Menzil
```

> [!warning] Profil TEK yerde tanımlıdır — ama iki dosyada
> `yetenek.py: VARSAYILAN_PROFIL / PROFILLER` tablo sütunlarını, kart
> katmanlarını, süzgeçleri ve doğrulamayı birden besler.
> `admin/yetenekler.js` aynı tabloyu formu çizmek için **aynadan** taşır.
> Ayrışırlarsa panel var olmayan bir alanı sorar ya da olan bir alanı gizler;
> ikisi de sessizdir. Yeni kategori ya da alan eklerken ikisini birden güncelle.

> [!note] Profilde olmayan alan doğrulamada susturulur, reddedilmez
> `dogrula()` fiziksel bir kayda gelen element/enerji/süre/gereksinim değerini
> hata saymaz, sessizce düşürür. Zorunlu tutulsaydı formda o alan hiç
> olmadığı için kayıt asla kaydedilemezdi; saklansaydı kategori değiştiğinde
> eski alanlar geri gelirdi.

> [!note] Odak, konsantrasyonun kendisidir
> Aynı `konsantrasyon` sütunu fiziksel alanda **O / Odak** adıyla okunur.
> Ayrı bir sütun açmak, kategori değiştiğinde iki bayrağı senkron tutma
> yükünü getirirdi. Harf ve ad profilden gelir (`nitelikler`).

### Yetkinlik — çoklu bağ

Silah türleri `yetkinlik` sözlük tablosunda, yetenekle bağı
`yetenek_yetkinlik` çoklu tablosunda durur (materyal listesiyle aynı kalıp).
Bir yetenek birden çok yetkinlik taşıyabilir; tabloda orta noktayla ayrılır
(`Kılıç · Balta · Hançer`).

> [!warning] Yetkinlik süzgeci tam değil KAPSAYAN eşleşir
> Satır birden çok değer taşıdığı için `data-yetkinlik` bir liste. Süzgeç tam
> eşleşme arasaydı "Kılıç · Balta" satırı "Kılıç" seçimine takılmazdı. Süzgeç
> `data-ykapsar` niteliğiyle işaretlenir, `yetenekler.js` onu " · " ile bölüp
> içinde arar.

## Tablo neyi gösterir

Enerjisel alanın sekiz sütunu: **seviye · ad · eylem türü · element · enerji
türü · süre · kaynak (tür + tüketim) · menzil**. Öteki alanlar için yukarıdaki
profil tablosuna bak. Kalan her şey karttadır — tabloyu künyeye çevirmemek,
tabloyu tablo olarak tutmak için.

Kaynak, tür ile miktarı **tire** ile ayırır: `Mana - 12`. Miktar 0 ise tire de
düşer, yalnız tür yazılır (`Mana`) — bedeli olmayan yeteneğe sıfır yazmak
gürültü.

### Nitelikler — R ve K

Ritüel ile konsantrasyon, birbirinden ve her şeyden bağımsız iki bayrak.
Üç yerde birden görünürler ve **harf ile sözcük tek yerde eşleşir**
(`yetenek.py: NITELIKLER`):

| Yer | Görünüm |
|---|---|
| Tablo | adın yanında turuncu **R** / **K** rozeti |
| Kart | `Ritüel` / `Konsantrasyon` etiketi — sözcükle |
| Süzgeç | harf taşıyan onay kutusu |

Turuncu ayrı bir renk değil: `--accent` (#fe4b26) zaten sitenin vurgu rengi.
R ile K aynı rengi paylaşır, harf ayırır — kural kitabının kendi deyimi,
tıpkı yasak enerjilerin çift çerçevesi gibi renge yaslanmadan.

> [!note] Süzgeç kutusu yalnız HARF gösterir
> Sözcüklerle çubuk 1000px'de ikinci satıra taşıyor ve kartın ekrana sığması
> için kazanılan 56px geri gidiyordu. Harf kriptik kalmıyor: tablo hemen
> altında aynı rozeti adın yanında taşıyor, kartın S·H·M rozeti de aynı
> deyimi kullanıyor. Sözcük `title` ve `.visually-hidden` ile duruyor.

> [!warning] Onay kutusu açılır menü gibi okunamaz
> `<select>` süzgeçleri `s.value` ile okunur; onay kutusunun `value`si ise
> işaretli olup olmadığından BAĞIMSIZDIR. `yetenekler.js` bu yüzden kutuları
> ayrı bir döngüde gezer. İşaretli kutu "yalnız bu niteliği taşıyanlar"
> demektir; işaretsiz kutu hiçbir şeyi elemez. Birden çok kutu VE ile
> birleşir — ikisi de işaretliyse yalnız ikisini birden taşıyanlar kalır.

> [!note] İşaretli hâlin stili sınıftan değil kutunun kendisinden okunur
> `.ybkutu:has(input:checked)` — JS'in verdiği `.is-on` sınıfı yalnız
> `:has()` desteklemeyen tarayıcılar için yedek. Böylece JS yüklenmeden de
> doğru görünür ve `suz()` ile stil arasında kayma olmaz.

Öteki süzgeçlerdeki kural burada da geçerli: kutu yalnız o kategoride
gerçekten kullanılan bir nitelik varsa üretilir. Hiçbir yetenek ritüel
değilse "Ritüel" kutusu da yoktur.

### Süre — iki soru tek denetimde

Süre `anlik` ya da `sureli` + değer + birimdir; menzilin (`kendin` / `mesafe`)
kalıbının aynısı. Panelde ise menzilden ayrılır: iki adımlı bir seçim yerine
**tek açılır menü** vardır — boş seçenek "Anlık", geri kalanı birimler. Birim
seçilince sayı alanı belirir. "Anlık mı" sorusuyla "hangi birim" sorusu tek
denetimde birleşir.

> [!note] Sıralama ham değerle değil saniyeyle yapılır
> `sure_birimi.saniye` her birimin saniye karşılığını tutar; `data-sure`
> `deger × saniye` olarak yazılır. Ham değerle sıralamak "2 Saat"i "3 Tur"un
> önüne atardı. "Anlık" −1'dir, artan sıralamada başa gelir — menzildeki
> "Kendin" ile aynı deyim. Tur = savaş turu = 6 saniye; ay 30, yıl 365 gün
> kabul edilir (takvim doğruluğu değil tutarlı bir SIRA aranıyor).

Menzil sütunu birimin **kısaltmasıyla** yazılır (18 m), kart tam adı kullanır
(18 Metre). Sıralama görünen metni değil `data-menzil` ham sayısını okur;
"Kendin" −1'dir, yani artan sıralamada başa gelir.

> [!note] Çapa kimliği addan türer, veritabanı kimliğinden değil
> `y-<kategori>-<ad-slug>`. Veritabanı yeniden kurulduğunda (taze klon, MySQL'e
> geçiş) birincil anahtarlar yeniden atanır; kimlik id'ye bağlı olsaydı
> paylaşılmış her kart bağlantısı sessizce bozulurdu. Ad kategori içinde zaten
> tekil. Bedeli: yeteneği yeniden adlandırmak eski bağlantıyı kırar — ama bu
> bilinçli ve görünür bir işlem.
