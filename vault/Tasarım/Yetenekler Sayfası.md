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

Bölünme eşiği de ölçüden çıktı: tablonun doğal alt sınırı (34rem) + 1.5rem
boşluk + kartın alt sınırı (15rem) ancak **1440px**'ten sonra sığıyor. Altında
kart tablonun *üstüne* iner — dar ekranda tıklamanın karşılığı hemen görünsün.

> [!warning] Izgarada tablo sütununun alt sınırı yazılı olmalı
> `minmax(0, 1fr) minmax(15rem, 21rem)` yazıldığında ızgara boş alanı önce
> karta veriyor, kart 21rem'e şişiyor ve tablo kendi `min-width`'inin altında
> kalıp yatay kaydırmaya düşüyordu. Doğrusu `minmax(34rem, 1fr)`.

Tablo başlıkları `nowrap` DEĞİL: sabitlendiğinde tablonun min-content genişliği
632px'e çıkıyor ve 1440px'te yatay kaydırma gerekiyordu. Dar sütunda başlık iki
satıra iner.

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
| Kimlik | seviye · kategori → ad → eylem/element/enerji etiketleri |
| Mekanik | kaynak (tür + tüketim) · menzil · alan |
| Bedel | S·H·M rozeti, sonra açık olanların kendi alanları |
| Anlatı | açıklama |
| Kenar not | dipnot — ayrı kutuda, daha sessiz |

Tabloda görünen alanlar kartta tekrar eder: kart tek başına okunabilir olmalı.

Yasak enerjiler (Kan, Aydınlık, Karanlık, Ruh, Yaşam) etiketlerinde çift
çerçeve, özel enerjiler (İnanç, Pakt, Kaos) kesik çerçeve taşır — kural
kitabının kendi işareti, renge yaslanmadan.

## Tablo neyi gösterir

Kullanıcının seçtiği yedi sütun: **seviye · ad · eylem türü · element · enerji
türü · kaynak (tür + tüketim) · menzil**. Kalan her şey karttadır — tabloyu
künyeye çevirmemek, tabloyu tablo olarak tutmak için.

Menzil sütunu birimin **kısaltmasıyla** yazılır (18 m), kart tam adı kullanır
(18 Metre). Sıralama görünen metni değil `data-menzil` ham sayısını okur;
"Kendin" −1'dir, yani artan sıralamada başa gelir.

> [!note] Çapa kimliği addan türer, veritabanı kimliğinden değil
> `y-<kategori>-<ad-slug>`. Veritabanı yeniden kurulduğunda (taze klon, MySQL'e
> geçiş) birincil anahtarlar yeniden atanır; kimlik id'ye bağlı olsaydı
> paylaşılmış her kart bağlantısı sessizce bozulurdu. Ad kategori içinde zaten
> tekil. Bedeli: yeteneği yeniden adlandırmak eski bağlantıyı kırar — ama bu
> bilinçli ve görünür bir işlem.
