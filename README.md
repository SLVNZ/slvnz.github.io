# SLVNZ — slvnz.github.io

Tek sayfalık statik site: **SLVNZ 4.0 Fantazya** başlık sayfası. Derleme adımı,
bağımlılık ve sunucu yok — depodaki dosyalar olduğu gibi yayınlanır.

## Yapı

```
index.html       başlık sayfası
404.html         bulunamadı sayfası (her derinlikten çalışsın diye yollar kök-mutlak)
assets/
  css/style.css  tüm stiller ve tasarım token'ları
  js/theme.js    aydınlık / karanlık tema anahtarı
  js/nav.js      menüde harf harf hover, sayfa çıkış geçişi
  fonts/         No Serenity — SLVNZ logosunu çizen yazı tipi
  images/        başlık sayfası görselleri
vault/           Obsidian tasarım notları — sitede bağlantısı yok
.nojekyll        GitHub Pages Jekyll'ı atlasın diye
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

## Menü

OYUN KURALLARI · YETENEKLER · EVREN REHBERİ şimdilik pasif — gidecekleri sayfa
yok, o yüzden bağlantı değil düz metinler. Sayfa eklediğinde `index.html` içinde

```html
<span class="mainnav__link">Oyun Kuralları</span>
```

satırını

```html
<a class="mainnav__link" href="/kurallar/">Oyun Kuralları</a>
```

ile değiştir — hover efekti ve çıkış geçişi kendiliğinden çalışır.

## Tasarım notları

`vault/` klasörü bir Obsidian vault: renk ve ölçek token'ları, tipografi,
başlık sayfasının Figma'ya birebir hizalanma yöntemi, tema mantığı,
etkileşimler. Obsidian'da **Open folder as vault** ile aç — giriş notu
**SLVNZ**. Düz Markdown olduğu için Obsidian olmadan da okunur.
