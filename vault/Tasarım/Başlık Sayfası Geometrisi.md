---
tags: [tasarım, geometri]
---

# Başlık Sayfası Geometrisi

Başlık sayfası, Figma çerçevesi **Desktop - 1 (1440 × 1024)** ile 1 px hassasiyetinde eşleşir. Yöntem iki fikre dayanır.

## 1. Tek ölçek birimi

```css
--s: min(0.0694444vw, 0.09765625dvh, 1.3px);
```

`--s` bir artboard pikseli. Tüm ölçüler bunun katı olarak yazılır, böylece kompozisyon tek parça gibi ölçeklenir ve hiçbir ekranda taşmaz.

## 2. Cap-line ile konumlandırma

Figma metin **kutusunun** üstünü verir; tarayıcı **satır kutusunu** yerleştirir. Aradaki fark yazı tipine göre değişir. Çözüm: her öğeyi büyük harflerinin tepesi (cap line) ile konumlandır, sonra o yazı tipinin kendi kutu-üstü → cap-üstü farkını geri çıkar.

```css
.titleblock {
  padding-top: calc((var(--mark-cap) * var(--s) - var(--eyebrow-bottom))
                    - var(--cap-serenity) * var(--mark));
}
```

## Artboard koordinatları

| Token | Değer | Anlam |
|---|---|---|
| `--eyebrow-cap` | 16.64 | Eyebrow cap line |
| `--art-top` | 114.96 | Çizimin mürekkep üstü |
| `--art-w` | 800.85 | Çizimin mürekkep genişliği |
| `--art-dx` | −14.28 | Çizim merkezi, çerçeve merkezinin solunda |
| `--mark-cap` | 434 | SLVNZ cap line |
| `--mark-base` | 561.82 | SLVNZ taban çizgisi |
| `--version-size` | 52.0921 | 4.0 punto |
| `--version-gap` | 7 | Z mürekkebi → 4 mürekkebi |
| `--genre-cap` | 574.78 | FANTAZYA cap line |
| `--nav-cap` | 731.15 | Nav cap line |
| `--nav-dx` | −12.5 | Nav grubu merkez kayması |
| `--nav-gap-1` | 104 | Oyun Kuralları → Yetenekler |
| `--nav-gap-2` | 92 | Yetenekler → Evren Rehberi |
| `--foot-cap` | 1001.64 | Alt bilgi cap line |
| `--frame-h` | 1024 | Çerçeve yüksekliği |

> [!note] Nav aralıkları neden eşit değil
> Tasarımcı üç bağlantıyı elle yerleştirmiş: 104 px ve 92 px. Aynen korundu; grup ise `--nav-dx` ile merkezden 12.5 px sola alındı — Figma'daki hali bu.

## SLVNZ neden vektör değil

Figma'da SLVNZ **outline'lanmış vektör** (mürekkep kutusu 258.60 × 127.82). Canlı yazı tipi kullanıldı: `258.60 ÷ 1.92em = 134.69 px`. Bu genişliği birebir verir ve harf formları bozulmaz.

> [!tip] Tam kopya isteniyorsa
> Figma'daki outline gerçek yazı tipinden ~%5 daha uzun çizilmiş. `--mark-stretch: 1.051` yaparsan o esneme de birebir kopyalanır. Varsayılan `1` — bozulmasız.

## Çizim varlığı

Kaynak `titlepage.png` (2944 × 1648) mürekkep sınırına kırpıldı, siyah + alfa kanalına çevrildi ve WebP + PNG olarak dışa alındı (250 KB → 103 KB). Alfa sayesinde tek bir `filter: invert()` ile karanlık moda dönüyor.

## Ekosistem rayı

Solda duran **SLVNZ Ekosistemi** rayı (CODEX bağlantısı + "Yakında…" NEXUS) Figma çerçevesinde **yok** — tema anahtarı gibi, artboard'ın üstüne eklenen bir arayüz parçası. Yine de kompozisyonla aynı dili konuşsun diye artboard birimiyle kurulur, px tabanlarıyla okunur kalır.

| Bağlanma | Değer |
|---|---|
| Başlığın cap line'ı | `--mark-cap` (434) — SLVNZ ile aynı yatay çizgi |
| Sol kenar | `inset-inline-start: 0` — sayfanın kendi iç boşluk kenarı |
| Genişlik | `max(150px, calc(160 * var(--s)))` |

> [!important] Sol kenar artboard koordinatı DEĞİL
> Ray her boyda sayfanın iç boşluk kenarına dayalı durur — eyebrow ile alt bilginin içinde durduğu kenarın aynısı. O boşluk zaten akışkan (`clamp(1.25rem, 3vw, 3rem)`), yani ekran daraldıkça ray da içeri yürür ama hizasını hiç bırakmaz. Bir ara artboard'a bağlanıp (x 43) kompozisyonla birlikte içeri yürüyordu; geniş ekranda marka bloğunun peşine takılıp sol kenardan kopuyordu, o yüzden vazgeçildi. Ölçüldü: 2560'tan 320'ye kadar rayın sol kenarı `.page__body`'nin sol kenarıyla **tam olarak** aynı x'te.

### Küçük kilitler

Her ürün `SLVNZ` (No Serenity) + ürün adı (Archivo 700, aralık `.46em` — CODEX'in kendi markasındaki 4.14 ÷ 9) olarak dizilir: büyük `SLVNZ / FANTAZYA` kilidinin birkaç boy küçüğü. Kilidin kutusu **mürekkebine** kırpılır, böylece `align-items: center` iki satırı yazı tipi metriklerine değil logomarka göre hizalar.

Yazı tipi metrikleri tarayıcıda ölçüldü (canvas `TextMetrics`, `--cap-*` token'larıyla aynı yöntem):

| Yüz | Mürekkep üst | Mürekkep alt |
|---|---|---|
| No Serenity `SLVNZ` | .80 (cap) | **.10 taban çizgisinin ALTINDA** — Z'nin kuyruğu, L'nin mahmuzu |
| Archivo 700 `CODEX` | .70 (cap) | .02 |

> [!warning] Boşluk taban çizgisinden ölçülmez
> Ürün adının cap line'ı, `SLVNZ`'nin **mürekkep altından** `.145em` aşağıda durur — canlı sayfanın SLVNZ ile FANTAZYA arasında gerçekten gösterdiği aralık. Taban çizgisinden ölçülürse ad doğrudan Z'nin kuyruğuna girer.

### NEXUS yer tutucusu

NEXUS'un logomarkı yok: aynı ölçüde saç çizgili bir kare + soluk `✦`. Kırık görsel gibi değil, "henüz açılmadı" gibi okunur — üstündeki *Yakında…* etiketiyle aynı şeyi söyler. Adresi belli olduğunda `<span class="ecosystem__link">` → `<a href=… target="_blank">` yeter, nav'daki Evren Rehberi ile aynı kural.

### CODEX logomarkı

`slvnzcodex.com/assets/icon.png` (512 × 512) mürekkep kutusuna kırpıldı, 160 pxe indirildi, nötr gri + alfaya çevrildi ve WebP + PNG olarak yazıldı (453 KB → 14 KB / 18 KB).

> [!note] Bu görsel `invert()` edilmez
> Başlık çizimi düz siyah mürekkep; CODEX markası iki tonlu bir gravür (siyah çizgi + beyaz sayfa bloğu). Olduğu gibi bırakılınca koyu zeminde beyaz çizgi işi olarak okunur — CODEX'in kendi sitesinde göründüğü hâl. Ters çevrilseydi negatifi çıkardı.

## Duyarlılık

| Eşik | Davranış |
|---|---|
| > 1000 px | Saf artboard ölçeği; ekosistem solda ray |
| ≤ 1000 px | `--s` görece büyür, nav aralıkları daralır; çizim rayın sütununa taştığı için ekosistem nav'ın altında bir şeride döner — **yine sola dayalı** (`width: fit-content`, ortalanmıyor; DOM sırası zaten öyle, yalnız kutu değişir) |
| ≤ 620 px | Çizim genişler, nav dikey dizilir, 4.0 taşmasın diye marka sola kayar; şerit küçülür |

> [!note] Ölçüldü
> Ray modunda çizimin mürekkebine en dar mesafe 36 px (1024 × 768); çakışma yok. Şerit `fit-content` olduğu için başlığın saç çizgisi tam olarak iki ürünün kapladığı genişlikte durur, sayfa genişliğinde değil. Şerit modunda gerçek telefon boylarının hepsi (414×896 … 360×640) tek ekrana sığıyor. Yalnız alışılmadık kısa pencerelerde sayfa birkaç piksel kayıyor: 820×600 (+22), 620×900 (+25), 600×700 (+68), 320×568 (+17) — artboard o boylarda çerçeveyi zaten tam dolduruyor, fazladan satırın dürüst bedeli.

## İlgili
[[Tipografi]] · [[Tasarım Sistemi]] · [[Figma Kaynak Verisi]]
