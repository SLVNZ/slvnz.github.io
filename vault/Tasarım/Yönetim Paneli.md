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
