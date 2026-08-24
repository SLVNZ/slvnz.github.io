# SLVNZ — slvnz.github.io

Statik site: **SLVNZ 4.0 Fantazya** başlık sayfası ve oyun kuralları. Derleme
adımı, bağımlılık ve sunucu yok — depodaki dosyalar olduğu gibi yayınlanır.

## Yapı

```
index.html           başlık sayfası
kurallar.html        Oyun Kuralları — 5 bölüm panel, sol ray + sağ bölüm menüsü
404.html             bulunamadı sayfası (her derinlikten çalışsın diye yollar kök-mutlak)
content/site.json    içerik kaynağı — sürümler + bölümler (yönetim paneli yazar)
admin/               yerel yönetim paneli (python admin/server.py → 127.0.0.1:8090)
assets/
  css/style.css      token'lar ve başlık sayfası stilleri
  css/kurallar.css   Oyun Kuralları sayfasının stilleri
  js/theme.js        aydınlık / karanlık tema anahtarı
  js/nav.js          menüde harf harf hover, sayfa çıkış geçişi
  js/kurallar.js     bölüm panelleri, okuma ilerlemesi, paralaks
  js/version-menu.js "4.0" sürüm seçim menüsü (klavye destekli)
  js/ink-shader.js   duman — imleçle tepkileşen WebGL shader (dekoratif)
  fonts/             No Serenity — SLVNZ logosunu çizen yazı tipi
  images/            başlık ve kurallar sayfası görselleri
vault/               Obsidian tasarım notları — sitede bağlantısı yok
.nojekyll            GitHub Pages Jekyll'ı atlasın diye
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

http://127.0.0.1:8090/ — sürümleri ve Oyun Kuralları bölümlerini panelden
düzenle; **Kaydet** site dosyalarını doğrudan yazar (`content/site.json` +
`index.html` ve `kurallar.html`'deki `yonetim:*` işaretli bölgeler). Sonrasında
`git add -A && git commit && git push` ile yayımla. Panel yalnız yerelde
çalışır; ayrıntı `vault/Tasarım/Yönetim Paneli.md`.

## Menü

OYUN KURALLARI artık `kurallar.html` sayfasına gidiyor. YETENEKLER ve
EVREN REHBERİ hâlâ pasif — gidecekleri sayfa yok, o yüzden bağlantı değil düz
metinler. Sayfa eklediğinde (hem `index.html` hem `kurallar.html` içinde)

```html
<span class="mainnav__link">Yetenekler</span>
```

satırını

```html
<a class="mainnav__link" href="yetenekler.html">Yetenekler</a>
```

ile değiştir — hover efekti ve çıkış geçişi kendiliğinden çalışır.

## Tasarım notları

`vault/` klasörü bir Obsidian vault: renk ve ölçek token'ları, tipografi,
başlık sayfasının Figma'ya birebir hizalanma yöntemi, tema mantığı,
etkileşimler. Obsidian'da **Open folder as vault** ile aç — giriş notu
**SLVNZ**. Düz Markdown olduğu için Obsidian olmadan da okunur.
