---
tags: [akış]
---

# Yeni Sürüm Çıkarma

Örnek: 4.0 yayında, 5.0 hazırlanacak.

## 1. Sürümü oluştur

**Sürümler** → **+ Yeni sürüm**
- Sürüm no: `5.0`
- Alt başlık: `Fantazya`
- Durum: **Taslak** — üzerinde çalışırken kimse görmesin

## 2. Sayfaları kopyala

4.0 kartını aç → **Yeni sürüme kopyala…** → hedef olarak `5.0` yaz.

Tüm sayfalar `content/pages/5.0/` altına klonlanır.

> [!note] Üzerine yazmaz
> Kopyalama yalnızca hedefte **olmayan** sayfaları oluşturur. İkinci kez çalıştırırsan üzerine yazmaz — 5.0'da yaptığın düzenlemeler korunur.

## 3. Düzenle

**Sayfalar** listesinde sürüm süzgecini `5.0` yap ve içeriği güncelle. Bu sırada site hâlâ 4.0'ı gösterir.

## 4. Yayına al

5.0 kartında **Durum → Güncel** yap ve kaydet.

Olanlar:
- 4.0 otomatik **Arşiv** olur (aynı anda tek `current` olabilir)
- Başlık sayfasındaki marka `5.0` gösterir, nav 5.0 sayfalarına gider
- 4.0 sayfaları erişilebilir kalır ama üstlerinde arşiv uyarı şeridi çıkar
- Sürüm menüsünde ikisi de listelenir

## 5. Commit

```bash
git add -A && git commit -m "5.0 yayında" && git push
```

## Sürüm silme

Sürüm kartındaki **Sil** düğmesi sürüm tanımını **ve tüm sayfalarını** siler. Onay ister.

> [!warning] Geri alınamaz
> Silme dosyaları kaldırır. Commit edilmiş bir haldeyse git'ten geri alabilirsin; commit edilmemişse kayıp.

## İlgili
[[İçerik Modeli]] · [[Yönetim Paneli]] · [[Yayınlama]]
