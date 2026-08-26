# SLVNZ — slvnz.github.io

Statik site: **SLVNZ 4.0 Fantazya** başlık sayfası, oyun kuralları ve yetenek
dizini. Derleme adımı, bağımlılık ve sunucu yok — depodaki dosyalar olduğu gibi
yayınlanır. (Yetenekler yerelde bir veritabanında yazılır, siteye statik HTML
olarak üretilir — bkz. *Yetenekler ve veritabanı*.)

## Yapı

```
index.html               başlık sayfası
kurallar.html            Oyun Kuralları — bölüm panelleri, sol ray + sağ bölüm menüsü
yetenekler.html          Yetenekler — enerjisel / fiziksel / karma tablo + yetenek kartı
404.html                 bulunamadı sayfası (her derinlikten çalışsın diye yollar kök-mutlak)
content/site.json        içerik kaynağı — sürümler + bölümler (yönetim paneli yazar)
content/yetenekler.json  yetenek kaydı — veritabanının git'e giren dışa aktarımı
admin/                   yerel yönetim paneli (python admin/server.py → 127.0.0.1:8090)
  server.py              HTTP sunucusu, API uçları, üretim, mürekkep motoru
  admin.js · canvas.js   panel ve tuval editörü
  yetenekler.js          Yetenekler görünümü (form + listeler)
  db.py · schema.sql     yetenek veritabanı katmanı (MySQL, yoksa SQLite) + şema göçleri
                         (kategori profilleri: yetenek.py PROFILLER)
  yetenek.py             yetenek CRUD, doğrulama, sayfa üretimi
  gerekli.py             gereksinim denetimi (panel.bat açılışta çağırır)
assets/
  css/style.css          token'lar ve başlık sayfası stilleri
  css/kurallar.css       belge çerçevesi — ray, TOC, panel, zengin metin
  css/yetenekler.css     yetenek tablosu, süzgeç çubuğu ve yetenek kartı
  js/theme.js            aydınlık / karanlık tema anahtarı
  js/nav.js              menüde harf harf hover, sayfa çıkış geçişi
  js/kurallar.js         bölüm panelleri, okuma ilerlemesi, paralaks
  js/yetenekler.js       arama, süzgeç, sıralama, kart seçimi
  js/version-menu.js     "4.0" sürüm seçim menüsü (klavye destekli)
  js/ink-shader.js       duman — imleçle tepkileşen WebGL shader (dekoratif)
  fonts/                 No Serenity — SLVNZ logosunu çizen yazı tipi
  images/                başlık ve kurallar sayfası görselleri
vault/                   Obsidian tasarım notları — sitede bağlantısı yok
.nojekyll                GitHub Pages Jekyll'ı atlasın diye
```

## Yerelde açma

`index.html` dosyasına çift tıklamak yeter. 404 sayfasının kök-mutlak yollarını
da denemek istersen küçük bir sunucu:

```bash
python -m http.server 8080
```

## Yayınlama

```bash
git add -A && git commit -m "..." && git push
```

GitHub Pages ayarı (bir kez): **Settings → Pages → Source: Deploy from a branch →
Branch: `main`, Folder: `/ (root)`.** Önceden `/docs` seçiliydi; site kök dizine
taşındığı için değiştirilmesi gerekiyor.

## Yönetim paneli

```bash
python admin/server.py
```

http://127.0.0.1:8090/ — açılışta **Tasarım** görünümü: gerçek site bir
tuvalde açılır ve yerinde düzenlenir (tıkla-seç, metni sayfa üzerinde yaz,
bölümleri sağ menüde sürükleyip sırala, görsele tıklayıp değiştir; sağda
özellik paneli, üstte kırılım önizlemesi ve geri al/yinele). **＋ Ekle**
paleti bölüm şablonları ve içerik blokları sunar (paragraf, tablo, zar
tablosu, kural kartı, sekmeler, içerik içi görsel…) — kartı tıkla ya da tuvale
sürükle. **Sekmeler** bloğu bölüm içinde sekmeli bir alan açar: şeritte tıkla →
sekme değişir, çift tıkla → adı yerinde değişir, ＋ → yeni sekme; her sekme
panele eklenebilen bütün blokları taşıyabilir (içerik açık sekmeye eklenir).
Yayınlanan sayfada şeridi `kurallar.js` üretir; JS kapalıysa sekmeler başlıklı
düz akışa döner.
Seçili öğe serbestçe dönüştürülür: sürükle-taşı, köşeden ölçekle, kenardan
genişlet, üst saptan döndür, katmanı öne/arkaya al — üstteki Masaüstü/Tablet/
Mobil önizlemesi düzenleme hedefini de seçer, her kırılım için ayrı değer
verilebilir (devralma: mobil ← tablet ← masaüstü). Kırılım düğmelerinin
yanındaki px kutusuna kendi ekran genişliğini yazarak (ör. 1920) siteyi
birebir o genişlikte önizleyebilirsin — site tipografisi vw tabanlı olduğu
için dar önizleme geniş monitörle aynı kırılmaz. Seçili blok ve bölüm
başlığında **Yazı boyutu (px)** alanı vardır; tabloda sütun sınırları
sürüklenerek ya da özellik panelindeki % girişleriyle boyutlandırılır
(genişlik verilen tablo sabit düzene geçer — uzun metin komşu sütunu
sıkıştırmaz). Dönüşümler satır içi stil olarak üretilir, yayınlanan site
bunları JS'siz gösterir. Sürümler,
form tabanlı bölüm editörü ve **Yetenekler** ayrı görünümlerde durur. **Kaydet** site
dosyalarını doğrudan yazar (`content/site.json` + `index.html` ve
`kurallar.html`'deki `yonetim:*` işaretli bölgeler). Sonrasında
`git add -A && git commit && git push` ile yayımla. Panel yalnız yerelde
çalışır; ayrıntı `vault/Tasarım/Yönetim Paneli.md`.

### Mürekkep motoru — beyaz zemini kaldırma

Sitenin çizim geleneği: RGB'si saf siyah, saydamlığı mürekkebin koyuluğu olan
PNG. Aydınlık temada siyah mürekkep kâğıtsız durur, karanlık temada
`kurallar.css` `filter: invert(var(--art-invert))` uygular ve aynı dosya beyaz
mürekkebe döner — zemin saydam olduğu için iki temada da çerçeve görünmez.

Bu dönüşüm `admin/server.py` içindeki `beyazi_alfaya()` motorudur ve **çizim
yüklendiğinde kendiliğinden** çalışır. Görsel seçicide zemini hâlâ opak olan
çizimler kırmızı **zemin opak** rozetiyle işaretlenir; kartındaki **Arka planı
temizle** düğmesi (ya da altta **Tümünü işle**) motoru o dosyaya uygular.
Küçük resimlerin damalı zemini saydamlığı gözle gösterir.

Motor kâğıt tonunu histogramın parlak ucundaki tepeden, mürekkep koyuluğunu alt
yüzdelikten okuyup arasına doğrusal rampa kurar. Naif `255 − L` yetmiyordu:
tarayıcı kâğıdı 255 değil 248 olduğunda geriye alfası 2–10 olan soluk bir kutu
kalıyordu. Zemin açık değilse (koyu arka plan, fotoğraf) motor dosyaya
**dokunmaz**, sebebini söyler. Ham `.png` her zaman korunur, üretim
`<ad>-alpha.png` + `<ad>.webp` olarak yazılır — eşik değiştirilip yeniden
işlenebilsin diye. Motor Pillow ister (`pip install Pillow`).

## Menü

OYUN KURALLARI `kurallar.html`, YETENEKLER `yetenekler.html` sayfasına gidiyor.
EVREN REHBERİ hâlâ pasif — gideceği sayfa yok, o yüzden bağlantı değil düz
metin. Sayfa eklediğinde (`index.html`, `kurallar.html` ve `yetenekler.html`
içinde)

```html
<span class="mainnav__link">Evren Rehberi</span>
```

satırını

```html
<a class="mainnav__link" href="evren.html">Evren Rehberi</a>
```

ile değiştir — hover efekti ve çıkış geçişi kendiliğinden çalışır.

## Yetenekler ve veritabanı

Yetenekler, sitenin geri kalanından farklı olarak bir **ilişkisel veritabanında**
durur. Şema `admin/schema.sql` içinde ve MySQL lehçesinde yazılıdır:

```
kategori · eylem_turu · element · enerji_turu · kaynak_turu
uzaklik_birimi · alan_tipi          ← seçim listeleri (sözlük tabloları)
yetenek                             ← kayıtlar, hepsine yabancı anahtarla bağlı
yetenek_materyal                    ← "harcanacak materyaller" listesi (çocuk tablo)
```

Element, enerji türü, kaynak türü, birim ve alan tipi listeleri veritabanında
durduğu için formdaki açılır menüler onlardan doğar; listeleri de panelin
**Listeler…** bölümünden düzenlersin. Tohum satırları Oyun Kuralları'nın
*Enerjiler ve Enerji Kaynakları* bölümünden alınmıştır (Ateş/Su/Toprak/Hava/
Yıldırım/Işık · Yıkım…Çürüme, İnanç/Pakt/Kaos, Kan/Aydınlık/Karanlık/Ruh/Yaşam ·
Mana/Ki/Ruh/Yaşam/Soluk).

### Yazım tarafı ve okuma tarafı

Yayındaki site GitHub Pages'te statik durur; **bir veritabanına bağlanamaz.**
Bu yüzden veritabanı yalnız YAZIM tarafındadır:

```
panel → veritabanı → yetenekler.html + content/yetenekler.json → git push
```

Her kayıt/silme sonrasında sunucu ikisini de yeniden üretir. `yetenekler.html`
içinde hem tablo satırları hem yetenek kartlarının **tamamı** HTML olarak
bulunur: JS kapalıyken tablo bir dizin, kartlar altında akan tam metindir
(satırdaki ad gerçek bir çapa bağlantısı). JS açıkken `assets/js/yetenekler.js`
kartları teke indirip sağdaki panele taşır, aramayı, süzgeci ve sıralamayı
bağlar. Ağ isteği yoktur — sayfa `file://` ile de çalışır.

### MySQL'e geçiş

`admin/db.py` sürücüyü kendi seçer: MySQL sürücüsü kurulu ve sunucuya
ulaşılabiliyorsa MySQL, değilse **SQLite** (standart kütüphanede, kurulum
istemez). Aynı `schema.sql`, üç satırlık bir lehçe çevirisiyle iki tarafta da
kurulur. Hangisine yazıldığı panelin Yetenekler başlığının altında yazar.

**Neyin eksik olduğunu panel.bat söyler.** Açılışta `admin/gerekli.py`
çalışır; Python sürümünü, pip'i, MySQL sürücüsünü ve MySQL sunucusunun
dinleyip dinlemediğini ayrı ayrı raporlar, sürücü eksikse kurmayı önerir:

```
  [ok] Python                 3.13.7
  [ok] pip                    pip 25.2
  [--] MySQL sürücüsü         kurulu değil — panel SQLite kullanır
  [--] MySQL sunucusu         127.0.0.1:3306 yanıt vermiyor
```

| Komut | Ne yapar |
|---|---|
| `panel.bat` | denetler, eksik sürücüyü sorarak kurar, paneli açar |
| `panel.bat /kur` | sormadan kurar (gözetimsiz) |
| `panel.bat /atla` | denetimi geçer |
| `panel.bat /denetle` | yalnız rapor; paneli açmaz |

> Sürücü ile sunucu **ayrı** iki gerekliliktir. Yalnız `pip install PyMySQL`
> demek MySQL'e geçirmez: sunucu ayakta değilse `db.py` yine SQLite'a düşer,
> yalnızca mesajı değişir. Denetim bu yüzden ikisini birden gösterir.

`admin/db.config.json` içindeki `"surucu"` üç değer alır:

| Değer | Davranış |
|---|---|
| `"otomatik"` | MySQL'i dener, olmazsa SQLite'a düşer (varsayılan) |
| `"mysql"` | yalnız MySQL; bağlanamazsa **sessizce düşmez, hata verir** |
| `"sqlite"` | MySQL hiç denenmez |

`"sqlite"` seçilirse denetim de MySQL satırlarını atlar — kurulu olmayan bir
sürücüyü "eksik" diye göstermek bilinçli bir tercihi arıza gibi okutur:

```
  [..] MySQL                  db.config.json "sqlite" diyor — denetlenmedi
```

> `db.config.json` git dışıdır (parola taşıyabilir), yani bu seçim **makineye
> özeldir**. Taze bir klonda dosya yoksa `db.py` varsayılana, yani
> `"otomatik"`e döner.

MySQL'e geçmek için:

```bash
pip install PyMySQL
mysql -u root -p -e "CREATE DATABASE slvnz CHARACTER SET utf8mb4 COLLATE utf8mb4_turkish_ci;"
```

Sunucu kurulumu kendiliğinden yapılmaz: servisi ayağa kaldırmayı, root
parolası belirlemeyi ve veritabanını açmayı da gerektirdiği için başlatıcı
zincirin yalnız ilk halkasını yapabilir — yarısında bırakmak "kuruldu" sanıp
sonraki hatayı gizlerdi. Denetim bunun yerine komutları yazdırır.

Sonra `admin/db.config.json` içine kullanıcı/parolayı yaz (`"surucu": "mysql"`
dersen SQLite'a sessizce düşmez, hata verir). Şema ve tohum ilk açılışta
kurulur; veritabanı boşsa sunucu `content/yetenekler.json`'daki yetenekleri
ada göre eşleştirerek geri yükler — taşıma yolu budur.

`admin/data/*.db` ve `admin/db.config.json` git dışıdır (biri her yazımda
değişen ikili dosya, öteki parola taşıyabilir). Kalıcı ve diff'lenebilir kayıt
`content/yetenekler.json`'dır.

### Bir yetenekte ne var

Tabloda görünenler: **seviye · ad · eylem türü · element · enerji türü ·
kaynak (tür + tüketim) · menzil**. Kalanların hepsi tıklanınca açılan kartta:
etki alanı (biçim + ölçü + gereken yerde yükseklik), söz-hareket-materyal
üçlüsü (her biri anahtarla açılır, açık olanın kendi alanı vardır), açıklama ve
dipnot. Kart okuma hiyerarşisine göre dizilidir: kimlik → mekanik → bedel →
anlatı → kenar notu.

Doğrulama sunucudadır (`admin/yetenek.py`): seviye ve kaynak tüketimi 0'ın
altına inemez, menzil ve alan ölçüsü en az 1'dir, silindir/koni/prizma
biçimlerinde yükseklik zorunludur, açık bir anahtarın alanı boş bırakılamaz,
enerjisel yetenekte element/enerji/kaynak seçilmelidir ve aynı alanda aynı ad
iki kez kullanılamaz.


## Tasarım notları

`vault/` klasörü bir Obsidian vault: renk ve ölçek token'ları, tipografi,
başlık sayfasının Figma'ya birebir hizalanma yöntemi, tema mantığı,
etkileşimler. Obsidian'da **Open folder as vault** ile aç — giriş notu
**SLVNZ**. Düz Markdown olduğu için Obsidian olmadan da okunur.
