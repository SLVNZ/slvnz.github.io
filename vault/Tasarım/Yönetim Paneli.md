---
tags: [tasarım, araç, yönetim]
---

# Yönetim Paneli

Yerel içerik aracı: sürümleri ve Oyun Kuralları bölümlerini panelden düzenler,
kaydettiğinde site dosyaları **doğrudan** yazılır; yayımlamayı git ile sen yaparsın.

```
python admin/server.py     →  http://127.0.0.1:8090/
```

## Mimari

```
content/site.json    içerik kaynağı (sürümler + bölümler)
admin/server.py      tek dosyalık sunucu — yalnız standart kütüphane
admin/index|css|js   panel arayüzü — sitenin token'larıyla
```

Kaydetme akışı: panel → `PUT /api/site` → doğrulama → `site.json` yazılır →
`index.html` ve `kurallar.html`'deki **işaretli bölgeler** yeniden üretilir →
sen `git add -A && git commit && git push`.

## İşaretli bölgeler

Site elle yazılmış statik HTML olarak kalır; panel yalnız şu işaretlerin
İÇİNİ ezer (`<!-- yonetim:AD --> … <!-- /yonetim:AD -->`):

| Dosya | İşaret | Üretilen |
|---|---|---|
| index.html | `surum` | "4.0" düğmesi + sürüm menüsü |
| kurallar.html | `kimlik` | ray logosu (sürüm no + tür) |
| kurallar.html | `bolum-sayisi` | "5 Bölüm" |
| kurallar.html | `bolumler` | sağ bölüm menüsü |
| kurallar.html | `paneller` | bölüm makaleleri |

İşaret dışı her satır elle yazılmıştır, panel dokunmaz. İşaret silinirse
üretim durur ve kayıt **hata verir** — dosya sessizce bozulmaz.
(index'te `h1#baslik`'in aria-label'ı da sürümle güncellenir — tek regex istisnası.)

> [!note] Ölçüldü
> Tur turu kararlı: kaydedilen içerik değişmediyse üç dosya da **bayt bayt**
> aynı kalıyor. Sürüm geçişi (3.0 şimdiki → geri) menü/ray/panel bölgelerini
> doğru üretip geri dönüşte bayt bayt eski hâline oturuyor.

## Tasarım görünümü (tuval editörü)

Panelin varsayılan görünümü: **gerçek site** bir iframe tuvalinde açılır ve
Wix Studio mantığıyla yerinde düzenlenir. Dosyalar: `admin/canvas.js` (editör)
+ `server.py`'de `?edit=1` (tuval modu — site etkileşim script'leri çıkarılmış
sayfa; theme.js kalır, davranışı editör devralır).

- **Tıkla** → öğe seçilir (çerçeve + sağda özellik paneli) · **tekrar tıkla /
  çift tıkla** → metin yerinde düzenlenir (başlık düz metin; zengin metin üst
  çubuktaki biçim araçlarıyla — form editörüyle aynı süzgeç).
- **Sağ bölüm menüsü**: tıkla → bölüme git; **sürükle** → sırala; altta
  "+ Bölüm". Görsele tıkla → panelden değiştir/kaldır.
- **Kilitli** öğeler (eyebrow, ray başlığı, tema anahtarı, telif, menüler)
  şablonun parçasıdır; gri çerçeveyle işaretlenir, tuvalden düzenlenmez.
- Üst çubuk: sayfa seçici (Başlık / Kurallar), **yapısal geri al–yinele**
  (Ctrl+Z/Y; metin içindeyken tarayıcının kendi geri alması), kırılım
  önizlemesi (1280/768/375 — tuval sığacak şekilde ölçeklenir).

Tuval, işaretli bölgeleri her zaman **modelden** üretir (server.py `gen_*`
fonksiyonlarının DOM aynası) — kaydedilmemiş değişiklikler de tuvalde görünür;
kaydet yine sunucuda üretir. Form görünümleriyle tuval aynı modeli düzenler;
görünüm geçişlerinde `stale` bayrakları geride kalan yüzeyi modelden tazeler
(`admin.js` görünüm kancaları: enter/leave/flush).

> [!note] Ölçüldü
> Tuvalde düzenle → kaydet → tuvalde geri al → kaydet turu: `site.json` +
> `kurallar.html` **bayt bayt** eski hâline dönüyor (JS üretici ile Python
> üretici birebir aynı çıktıyı veriyor). Süzgeç tuvalde de çalışıyor:
> `<b>`→`<strong>`, stilli `div` çözülüp `p`'ye sarılıyor.

### Ekle paleti (bloklar)

Üst çubuktaki **＋ Ekle** paleti iki şey ekler; kartlar **tıklanınca** mantıklı
yere (seçili bloğun altı / bölümün sonu), **sürüklenince** bırakıldığı yere girer
(zengin metinde araya turuncu bırakma çizgisi; sürükleme pointer capture ile
parent'tan iframe'e ölçek eşlemeli taşınır):

- **Bölüm şablonları** — yeni bölüm açar (Metin / Tablolu / Listeli / Boş);
  sağ menünün (toc) üstüne sürüklenirse o sıraya girer.
- **İçerik blokları** — paragraf, giriş paragrafı, başlık, alt başlık, alıntı,
  listeler, tablo, zar tablosu, kural kartı, ayraç, **görsel** (önce seçici açılır).

Zengin metnin kök çocukları artık **blok**tur: tek tık blok seçer (taşı /
çoğalt / sil / `lede` dönüştür / görseli değiştir — sağ panelden; Del siler),
çift tık metin düzenlemeye geçer. Yer tutucu (`panel__soon`) ilk gerçek blok
gelince kendiliğinden düşer.

Söz dağarcığına **figure + img + figcaption** eklendi (`kurallar.css`'te
`.panel__rich figure` stilleri — çizim karanlık temada panel şeridi gibi
terslenir). Süzgeç img'yi yalnız `assets/images/` altındaki dosyalara izinle
tutar: dış URL, `data:` gömüsü ve `../` kaçışı atılır (ölçüldü); başıboş
img'ler figure'a sarılır, boş figure düşer.

### Serbest dönüşüm (transform katmanı)

Seçili öğe (zengin metin bloğu, bölüm şeridi görseli `panel__art`, bölüm
başlığı) Wix mantığıyla serbestçe düzenlenir: **sürükle** taşır, **köşe
tutamaçları** ölçekler, **kenar tutamaçları** (blokta) genişliği değiştirir,
**üst sap** döndürür; katman (z, öne/arkaya) ve sayısal X/Y/ölçek/açı sağ
panelden. Shift eksene/15°'ye kilitler, Esc jesti iptal eder, "Dönüşümü
sıfırla" temizler.

Kalıcılık — dönüşümler **satır içi stil** olarak üretime yazılır; yayınlanan
site JS'siz birebir gösterir:

- **blok** → `ch.html` içindeki `style` niteliği (süzgeç yalnız kanonik dili
  geçirir: `position:relative;z-index;width%;text-align;transform:translate
  scale rotate` — başka her stil atılır; tablo stili `.table-wrap` sarıcısına
  taşınır ki overflow kırpmasın)
- **şerit görseli** → `gorsel.t {x,y,s,r,z}`, **başlık** → `baslik_t` —
  `server.py style_t` üretir, doğrulama aralık denetler (x/y ±3000, s
  0.05–20, r ±360, z −99..999)

Zengin metin söz dağarcığı genişledi: `u del mark sup sub` + blok hizalama
(`text-align`). Araç çubuğu iki editörde de aynı (altı/üstü çizili, fosforlu
vurgu, alt/üst simge, sola/ortaya/sağa/iki yana).

**Kırılıma özel dönüşüm:** üstteki Masaüstü/Tablet/Mobil önizlemesi aynı
zamanda düzenleme hedefini seçer — masaüstünde temel değerler, tablet/mobilde
o kırılımın geçersiz kılması yazılır (devralma: mobil ← tablet ← masaüstü;
mirasla aynı değere dönen katman kendiliğinden silinir). Kalıcılık: stil
içinde `--t-t/--w-t` (tablet) ve `--t-m/--w-m` (mobil) özel değişkenleri;
kurallar.css bunları sitenin kendi eşiklerinde (1160/640) `!important`
medya kurallarıyla uygular — yayın yine JS'siz. Inspector hangi kırılımın
düzenlendiğini rozetle gösterir; "X ayarını kaldır" katmanı siler. Katman
(z) kırılımdan bağımsızdır.

> [!note] Ölçüldü
> Jest zinciri (taşı 40/80 · köşe ölçek 1.6 · döndür 45° · blok genişlik %70 ·
> z+1 · X=33 · mark + ortala) → kaydet → tam geri al → kaydet: `site.json` +
> `kurallar.html` bayt bayt eski hâline döndü. Süzgeç `color/font-size/
> position:absolute` gibi kanonik dışı stilleri atıyor.

## Sürüm sistemi

`site.json → surumler`: `no` (4.0), `tur` (Fantazya), `durum`
(`simdiki`/`arsiv`), `sayfa`. **Tam bir** sürüm şimdiki olabilir; onun
bölümleri `kurallar.html`'e üretilir ve ana sayfa menüsünde "şimdiki" olur.
Arşiv sürümlerin içeriği JSON'da saklanır; sayfaları ileride üretilecek
(`sayfa` alanı hazır — dolarsa menüde bağlantıya döner).

## Zengin metin editörü

contenteditable; yüzey `.panel__rich` sınıfını taşır — **yazdığın, sitede
duracağı tipografiyle görünür** (kurallar.css panele de yüklü; bunun için
kurallar.css'teki `html, body { overflow: hidden }` kuralı
`html.page-kurallar`'a kapsandı).

Word alışkanlıkları: Ctrl+B/I/K · biçim kutusu (Paragraf / Giriş / Başlık /
Alt başlık / Alıntı) · tabloda **Tab** sonraki hücre, son hücrede yeni satır ·
tablo içindeyken bağlamsal satır/sütun düğmeleri belirir.

Girdi ne olursa olsun içerik sitenin söz dağarcığına **indirgenir**:
`p(+lede) h3 h4 ul ol blockquote table hr strong em code a[href] br`.
Eşlemeler: b→strong, i→em, h1/h2→h3, h5/h6→h4, div/span→çözülür; stil,
sınıf, `javascript:` bağlantı, script/img atılır; Word'ün mso çöpü ve
koşullu yorumları temizlenir. Aynı süzgeç yapıştırmada VE kaydetmede çalışır
— dosyaya süzülmemiş HTML yazılmaz. Kaydederken tablolar `.table-wrap`'e
sarılır (sitede yatay taşma kendi içinde kalsın).

> [!warning] Tuzak — DocumentFragment'ta `:scope > *`
> Chromium'da `template.content.querySelectorAll(':scope > *')` boş dönüyor;
> serileştirme `.children` ile yapılır.

## Görsel hattı

`GET /api/images` — assets/images içinden alfa çifti olan (`x-alpha.png` +
`x.webp`) ya da kendisi alfalı png'leri listeler; düz RGB kaynaklar (sitede
kutu görünür) elenir. Yükleme (`PUT /api/upload?ad=x.png`): beyaz zeminli
çizim otomatik alfaya çevrilir + webp üretilir (Pillow varsa; ölçüldü:
beyaz→alfa 0, mürekkep→245). Ad çakışırsa `-2` eklenir; ad yalnız
`[a-z0-9-]` olabilir.

## Güvenlik

Sunucu yalnız `127.0.0.1` dinler; Host/Origin yerel değilse **403**
(DNS-rebinding'e karşı — ölçüldü). Kimlik doğrulama bilinçli olarak yok: tek
kullanıcılı yerel araç. `admin/` ve `content/` depoda durur ve GitHub
Pages'te yayımlanır — arayüz orada ölü kalır (API yok), içerik zaten sitenin
kendisi.

## İlgili
[[Oyun Kuralları Sayfası]] · [[Tasarım Sistemi]] · [[Figma Kaynak Verisi]]
