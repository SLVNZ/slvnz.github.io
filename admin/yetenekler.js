/* SLVNZ — yönetim paneli: Yetenekler görünümü
   ============================================================================
   Panelin öteki görünümlerinden ayrı bir durum modeli var: Sürümler ve Oyun
   Kuralları content/site.json'un bellekteki aynasını düzenler ve Kaydet ile
   topluca yazar. Yetenekler ise bir VERİTABANINDA durur — her form kaydı
   anında yazılır, sunucu da aynı istekte yetenekler.html ile
   content/yetenekler.json'u yeniden üretir. Bu yüzden burada "kaydedilmemiş
   değişiklik" kavramı yok; üstteki Kaydet düğmesi bu görünümü ilgilendirmez.

   Yapı
   ----
     Alan seçici        enerjisel · fiziksel · karma (üç ayrı tablo)
     Yetenek listesi    düz satırlar; satıra basınca form kendi penceresinde
                        açılır (bkz. popAc) — eskiden satırın altına inen
                        akordeon bloktu ve listeyi ekranın iki katına itiyordu
     Listeler           element / enerji / kaynak / eylem / birim / alan tipi
                        sözlüklerinin kendisi de panelden yönetilir

   Doğrulama sunucudadır (admin/yetenek.py). Buradaki `required`/`min`
   nitelikleri yalnız kullanıcıya erken geri bildirim verir; kabul kararını
   her zaman sunucu verir.
   ========================================================================== */
(function () {
  'use strict';

  var A = window.__adm;
  if (!A) return;

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var kok = $('[data-view-panel="yetenekler"]');
  if (!kok) return;

  /* ---------------------------------------------------------------- durum */
  var sozluk = null;        // seçim listeleri
  var yetenekler = [];      // bütün kayıtlar (üç alan birden)
  var kategori = 'enerjisel';
  var acikId = null;        // formu açık olan yetenek (null → kapalı, 0 → yeni)
  var yuklendi = false;

  /* ===================================================================== profil
     `yetenek.py: VARSAYILAN_PROFIL / PROFILLER` ile AYNI tabloyu tutar.
     Sunucu doğrulaması profilde olmayan alanı zaten susturur; buradaki kopya
     yalnız formu çizmek için — ayrışırlarsa panel var olmayan bir alanı sorar
     ya da olan bir alanı gizler, ikisi de sessizdir. Yeni bir kategori ya da
     alan eklerken İKİSİNİ birden güncelle. */
  var VARSAYILAN_PROFIL = {
    element: true, enerji: true, kaynak: true, sure: true,
    gereksinim: true, yetkinlik: false,
    nitelikler: [['ritual', 'Ritüel'], ['konsantrasyon', 'Konsantrasyon']],
    kaynakBasligi: 'Kaynak'
  };
  var PROFILLER = {
    fiziksel: {
      element: false, enerji: false, kaynak: false, sure: false,
      gereksinim: false, yetkinlik: true,
      nitelikler: [['konsantrasyon', 'Odak']],
      kaynakBasligi: 'Soluk'
    },
    karma: { yetkinlik: true }
  };
  function profil(kod) {
    var p = {}, k;
    for (k in VARSAYILAN_PROFIL) p[k] = VARSAYILAN_PROFIL[k];
    var ek = PROFILLER[kod];
    if (ek) for (k in ek) p[k] = ek[k];
    return p;
  }

  function esc(s) {
    var d = document.createElement('div');
    d.textContent = String(s == null ? '' : s);
    return d.innerHTML;
  }

  function api(path, opts) {
    return fetch(path, opts).then(function (r) {
      return r.json().then(function (j) {
        if (!r.ok) throw new Error((j.hata || ['Sunucu hatası']).join(' · '));
        return j;
      });
    });
  }

  function gonder(path, yontem, govde) {
    return api(path, {
      method: yontem,
      headers: govde ? { 'Content-Type': 'application/json' } : undefined,
      body: govde ? JSON.stringify(govde) : undefined
    });
  }

  /* ---- seçenek listesi ---------------------------------------------------- */
  function opsiyonlar(liste, secili, bosEtiket) {
    var h = bosEtiket ? '<option value="">' + esc(bosEtiket) + '</option>' : '';
    (liste || []).forEach(function (x) {
      h += '<option value="' + x.id + '"' + (String(x.id) === String(secili) ? ' selected' : '') +
           '>' + esc(x.ad) + '</option>';
    });
    return h;
  }

  function varsayilanBirim() {
    var b = (sozluk.uzaklik_birimi || []).filter(function (x) { return x.varsayilan; })[0];
    return b ? b.id : ((sozluk.uzaklik_birimi || [])[0] || {}).id;
  }

  function varsayilanSureBirim() {
    var b = (sozluk.sure_birimi || []).filter(function (x) { return x.varsayilan; })[0];
    return b ? b.id : ((sozluk.sure_birimi || [])[0] || {}).id;
  }

  function refId(r) { return r && r.id ? r.id : ''; }

  /* ---- kayıt özeti (liste satırı) ----------------------------------------- */
  function ozet(y) {
    var prf = profil(y.kategori);
    var p = [];
    if (y.eylem_turu) p.push(y.eylem_turu.ad);
    if (prf.element && y.element) p.push(y.element.ad);
    if (prf.enerji && y.enerji_turu) p.push(y.enerji_turu.ad);
    if (prf.yetkinlik && (y.yetkinlik || []).length) {
      p.push(y.yetkinlik.map(function (w) { return w.ad; }).join(' · '));
    }
    if (prf.kaynak) {
      if (y.kaynak_turu) p.push(y.kaynak_turu.ad + (y.kaynak_tuketimi ? ' - ' + y.kaynak_tuketimi : ''));
    } else {
      p.push(prf.kaynakBasligi + ' - ' + (y.kaynak_tuketimi || 0));
    }
    if (prf.sure) {
      var sr = y.sure || {};
      p.push(sr.tur === 'sureli' && sr.deger
        ? sr.deger + ' ' + ((sr.birim || {}).kisa || (sr.birim || {}).ad || '')
        : 'Anlık');
    }
    p.push(y.menzil.tur === 'mesafe' && y.menzil.deger
      ? y.menzil.deger + ' ' + ((y.menzil.birim || {}).kisa || (y.menzil.birim || {}).ad || '')
      : 'Kendin');
    var n = prf.nitelikler.filter(function (x) { return y[x[0]]; })
      .map(function (x) { return x[1].charAt(0); }).join('');
    if (n) p.push(n);
    if (prf.gereksinim) {
      var g = ['soz', 'hareket', 'materyal'].filter(function (k) { return y.gereksinim[k].gerekli; })
        .map(function (k) { return k.charAt(0).toUpperCase(); }).join('');
      if (g) p.push(g);
    }
    return p.join(' · ');
  }

  /* ====================================================================== form
     Tek bir yeteneğin bütün alanları. Yeni kayıtta `y` boş bir iskelettir —
     iki yol için ayrı şablon tutmak, alan eklendiğinde birini güncellemeyi
     unutmanın kısa yoludur. */
  function bosKayit() {
    return {
      id: 0, kategori: kategori, seviye: 0, ad: '',
      eylem_turu: null, element: null, enerji_turu: null, kaynak_turu: null,
      kaynak_tuketimi: 0,
      menzil: { tur: 'kendin', deger: null, birim: { id: varsayilanBirim() } },
      sure: { tur: 'anlik', deger: null, birim: null },
      ritual: false, konsantrasyon: false, yetkinlik: [],
      alan: { var: false, deger: null, birim: { id: varsayilanBirim() }, tipi: null, yukseklik: null },
      gereksinim: {
        soz: { gerekli: false, metin: '' },
        hareket: { gerekli: false, metin: '' },
        materyal: { gerekli: false, liste: [] }
      },
      aciklama: '', dipnot: ''
    };
  }

  function anahtar(ad, etiket, ic, ek) {
    return '<label class="sw' + (ek || '') + '">' +
      '<input type="checkbox" data-ysw="' + ad + '"' + (ic ? ' checked' : '') + '>' +
      '<span class="sw__track" aria-hidden="true"><span class="sw__knob"></span></span>' +
      '<span class="sw__text">' + esc(etiket) + '</span>' +
      '</label>';
  }

  function yetkinlikBlogu(y) {
    var secili = {};
    (y.yetkinlik || []).forEach(function (w) { secili[String(w.id || w)] = true; });
    var liste = sozluk.yetkinlik || [];
    if (!liste.length) {
      return '<fieldset class="yform__set">' +
        '<legend class="yform__legend">Yetkinlik</legend>' +
        '<p class="field__help">Yetkinlik listesi boş — <strong>Listeler…</strong> ' +
        'bölümünden silah türü ekle.</p></fieldset>';
    }
    return '<fieldset class="yform__set yform__set--yetkinlik">' +
      '<legend class="yform__legend">Yetkinlik</legend>' +
      '<div class="ywet">' +
      liste.map(function (w) {
        return '<label class="ywet__kutu">' +
          '<input type="checkbox" data-ywet value="' + w.id + '"' +
          (secili[String(w.id)] ? ' checked' : '') + '>' +
          '<span>' + esc(w.ad) + '</span></label>';
      }).join('') +
      '</div></fieldset>';
  }

  function materyalSatir(deger) {
    return '<div class="ymat__satir">' +
      '<input class="field__input" data-ymat value="' + esc(deger || '') +
      '" placeholder="Bir tutam kızıl kükürt" autocomplete="off">' +
      '<button class="iconbtn iconbtn--danger" type="button" data-ymatsil aria-label="Materyali sil">' +
      A.ICON.x + '</button></div>';
  }

  function formHTML(y) {
    var prf = profil(y.kategori);
    var m = y.menzil, a = y.alan, g = y.gereksinim;
    var sr = y.sure || { tur: 'anlik', deger: null, birim: null };
    var sureli = sr.tur === 'sureli' && !!refId(sr.birim);
    var mesafe = m.tur === 'mesafe';
    var alanVar = !!a['var'];
    var tipi = (sozluk.alan_tipi || []).filter(function (t) {
      return String(t.id) === String(refId(a.tipi));
    })[0];
    var yukGerek = !!(tipi && tipi.yukseklik_gerekir);

    return '' +
    '<form class="yform" data-yform novalidate>' +

      /* -- kimlik -- */
      '<div class="yform__grid yform__grid--kimlik">' +
        alan('Seviye', '<input class="field__input" type="number" data-yf="seviye" min="0" step="1" value="' +
             (y.seviye || 0) + '" required>', 'yf-sev') +
        alan('Yetenek adı', '<input class="field__input" data-yf="ad" value="' + esc(y.ad) +
             '" placeholder="Alev Mızrağı" autocomplete="off" required>', 'yf-ad', 'yform__cell--genis') +
        alan('Alan', '<select class="field__input" data-yf="kategori">' +
             (sozluk.kategori || []).map(function (k) {
               return '<option value="' + k.kod + '"' + (k.kod === y.kategori ? ' selected' : '') +
                      '>' + esc(k.ad) + '</option>';
             }).join('') + '</select>', 'yf-kat') +
      '</div>' +

      /* -- sınıflandırma -- */
      '<div class="yform__grid">' +
        alan('Eylem türü', '<select class="field__input" data-yf="eylem_turu" required>' +
             opsiyonlar(sozluk.eylem_turu, refId(y.eylem_turu), 'Seç…') + '</select>', 'yf-eyl') +
        (prf.element
          ? alan('Element', '<select class="field__input" data-yf="element">' +
                 opsiyonlar(sozluk.element, refId(y.element), '—') + '</select>', 'yf-ele') : '') +
        (prf.enerji
          ? alan('Enerji türü', '<select class="field__input" data-yf="enerji_turu">' +
                 opsiyonlar(sozluk.enerji_turu, refId(y.enerji_turu), '—') + '</select>', 'yf-ene') : '') +
      '</div>' +

      /* -- yetkinlik: çoklu seçim, kutucuklarla --
         Silah türleri az sayıda ve hepsi bir bakışta görünmeli; <select
         multiple> hem az keşfedilir hem de Ctrl-tık gerektirir. */
      (prf.yetkinlik ? yetkinlikBlogu(y) : '') +

      /* -- nitelikler --
         Koşullu bloğu olmayan iki serbest anahtar; gereksinimlerdeki
         anahtarlarla aynı denetim, orada olduğu gibi bir alt alan açmıyorlar.
         Tabloda adın yanında R ve K rozeti olarak çıkarlar. */
      '<fieldset class="yform__set yform__set--nitelik">' +
        '<legend class="yform__legend">Nitelikler</legend>' +
        prf.nitelikler.map(function (x) {
          return anahtar(x[0], x[1], y[x[0]]);
        }).join('') +
      '</fieldset>' +

      /* -- kaynak --
         Kaynak türü sabit olan alanda (fiziksel → Soluk) seçim yok: yalnız
         tüketim sorulur, tür sunucuda addan bulunur. */
      '<div class="yform__grid">' +
        (prf.kaynak
          ? alan('Kaynak türü', '<select class="field__input" data-yf="kaynak_turu">' +
                 opsiyonlar(sozluk.kaynak_turu, refId(y.kaynak_turu), '—') + '</select>', 'yf-kay') : '') +
        alan(prf.kaynak ? 'Kaynak tüketimi' : prf.kaynakBasligi + ' tüketimi',
             '<input class="field__input" type="number" data-yf="kaynak_tuketimi" ' +
             'min="0" step="1" value="' + (y.kaynak_tuketimi || 0) + '">', 'yf-tuk') +
      '</div>' +

      /* -- menzil -- */
      '<fieldset class="yform__set">' +
        '<legend class="yform__legend">Menzil</legend>' +
        '<div class="yform__satir">' +
          '<div class="segment" role="radiogroup" aria-label="Menzil türü">' +
            '<label class="segment__opt"><input type="radio" name="ymenzil" value="kendin"' +
              (mesafe ? '' : ' checked') + '><span>Kendin</span></label>' +
            '<label class="segment__opt"><input type="radio" name="ymenzil" value="mesafe"' +
              (mesafe ? ' checked' : '') + '><span>Mesafe</span></label>' +
          '</div>' +
          '<div class="yform__kosul" data-ymesafe' + (mesafe ? '' : ' hidden') + '>' +
            '<input class="field__input field__input--sayi" type="number" data-yf="menzil_deger" ' +
              'min="1" step="1" value="' + (m.deger == null ? '' : m.deger) + '" aria-label="Menzil">' +
            '<select class="field__input" data-yf="menzil_birim" aria-label="Menzil birimi">' +
              opsiyonlar(sozluk.uzaklik_birimi, refId(m.birim) || varsayilanBirim()) + '</select>' +
          '</div>' +
        '</div>' +
      '</fieldset>' +

      /* -- süre --
         Menzilden farklı olarak TEK açılır menü: boş seçenek "Anlık", geri
         kalanı süre birimleri. Birim seçilince sayı alanı beliriyor —
         "anlık mı" sorusuyla "hangi birim" sorusu tek denetimde birleşiyor,
         iki adımlık bir seçim kullanıcıya tek adım olarak görünüyor. */
      (prf.sure ?
      '<fieldset class="yform__set">' +
        '<legend class="yform__legend">Süre</legend>' +
        '<div class="yform__satir">' +
          '<select class="field__input" data-yf="sure_birim" aria-label="Süre birimi">' +
            opsiyonlar(sozluk.sure_birimi, sureli ? refId(sr.birim) : '', 'Anlık') +
          '</select>' +
          '<div class="yform__kosul" data-ysureli' + (sureli ? '' : ' hidden') + '>' +
            '<input class="field__input field__input--sayi" type="number" data-yf="sure_deger" ' +
              'min="1" step="1" value="' + (sr.deger == null ? '' : sr.deger) + '" aria-label="Süre">' +
            '<span class="yform__birimad" data-ysuread></span>' +
          '</div>' +
        '</div>' +
      '</fieldset>' : '') +

      /* -- alan (etki alanı) -- */
      '<fieldset class="yform__set">' +
        '<legend class="yform__legend">Etki alanı</legend>' +
        '<div class="yform__satir">' +
          '<div class="segment" role="radiogroup" aria-label="Etki alanı">' +
            '<label class="segment__opt"><input type="radio" name="yalan" value="yok"' +
              (alanVar ? '' : ' checked') + '><span>Yok</span></label>' +
            '<label class="segment__opt"><input type="radio" name="yalan" value="var"' +
              (alanVar ? ' checked' : '') + '><span>Var</span></label>' +
          '</div>' +
          '<div class="yform__kosul" data-yalanvar' + (alanVar ? '' : ' hidden') + '>' +
            '<select class="field__input" data-yf="alan_tipi" aria-label="Alan tipi">' +
              opsiyonlar(sozluk.alan_tipi, refId(a.tipi), 'Biçim…') + '</select>' +
            '<input class="field__input field__input--sayi" type="number" data-yf="alan_deger" ' +
              'min="1" step="1" value="' + (a.deger == null ? '' : a.deger) + '" aria-label="Ölçü">' +
            '<select class="field__input" data-yf="alan_birim" aria-label="Alan birimi">' +
              opsiyonlar(sozluk.uzaklik_birimi, refId(a.birim) || varsayilanBirim()) + '</select>' +
            '<span class="yform__yuk" data-yyuk' + (yukGerek ? '' : ' hidden') + '>' +
              '<span class="yform__carpi" aria-hidden="true">×</span>' +
              '<input class="field__input field__input--sayi" type="number" data-yf="alan_yukseklik" ' +
                'min="1" step="1" value="' + (a.yukseklik == null ? '' : a.yukseklik) +
                '" aria-label="Yükseklik" placeholder="yük.">' +
            '</span>' +
          '</div>' +
        '</div>' +
        '<p class="field__help" data-yalanipucu' + (alanVar ? '' : ' hidden') + '></p>' +
      '</fieldset>' +

      /* -- söz · hareket · materyal --
         Üç anahtar-blok çifti `.yger__blok` içine sarılı: pencerede sarmalı
         olmasalar üç yığın alt alta 467px tutuyordu. Sarmalayıcı olmadan
         ızgaraya alınamazlar — anahtar ile kendi bloğu kardeş öğeler. */
      (prf.gereksinim ?
      '<fieldset class="yform__set yform__set--ger">' +
        '<legend class="yform__legend">Gereksinimler — söz · hareket · materyal</legend>' +
        '<div class="yger">' +

          '<div class="yger__blok">' +
            anahtar('soz', 'Söz gerekli', g.soz.gerekli) +
            '<div class="yform__kosulblok" data-ysozblok' + (g.soz.gerekli ? '' : ' hidden') + '>' +
              alan('Sarf edilecek sözler',
                   '<textarea class="field__input field__input--alan" data-yf="soz_metin" rows="2" ' +
                   'placeholder="Vur, alev; kalbe dek yürü.">' + esc(g.soz.metin) + '</textarea>', 'yf-soz') +
            '</div>' +
          '</div>' +

          '<div class="yger__blok">' +
            anahtar('hareket', 'Hareket gerekli', g.hareket.gerekli) +
            '<div class="yform__kosulblok" data-yhareketblok' + (g.hareket.gerekli ? '' : ' hidden') + '>' +
              alan('Yapılacak hareketlerin betimlemesi',
                   '<textarea class="field__input field__input--alan" data-yf="hareket_metin" rows="2" ' +
                   'placeholder="Sağ el omuz hizasında ileri savrulur…">' + esc(g.hareket.metin) +
                   '</textarea>', 'yf-hrk') +
            '</div>' +
          '</div>' +

          '<div class="yger__blok">' +
            anahtar('materyal', 'Materyal gerekli', g.materyal.gerekli) +
            '<div class="yform__kosulblok" data-ymateryalblok' + (g.materyal.gerekli ? '' : ' hidden') + '>' +
              '<p class="field__label">Harcanacak materyaller</p>' +
              '<div class="ymat" data-ymatliste>' +
                (g.materyal.liste.length ? g.materyal.liste.map(materyalSatir).join('') : materyalSatir('')) +
              '</div>' +
              '<button class="btn btn--ghost btn--kucuk" type="button" data-ymatekle>+ Materyal ekle</button>' +
            '</div>' +
          '</div>' +

        '</div>' +
      '</fieldset>' : '') +

      /* -- metinler -- */
      alan('Açıklama', '<textarea class="field__input field__input--alan" data-yf="aciklama" rows="4" ' +
           'placeholder="Yeteneğin sitede görünecek açıklaması. Boş satır yeni paragraf açar.">' +
           esc(y.aciklama) + '</textarea>', 'yf-acik', 'yform__blok') +
      alan('Dipnot', '<textarea class="field__input field__input--alan" data-yf="dipnot" rows="2" ' +
           'placeholder="Açıklamaya ek özel not — kartta ayrı bir kutuda durur.">' +
           esc(y.dipnot) + '</textarea>', 'yf-dip', 'yform__blok') +

      '<div class="yform__foot">' +
        '<button class="btn btn--primary" type="submit">Kaydet</button>' +
        '<button class="btn btn--ghost" type="button" data-yvazgec>Vazgeç</button>' +
        (y.id ? '<button class="btn btn--danger" type="button" data-ysil2>Yeteneği sil</button>' : '') +
      '</div>' +
    '</form>';
  }

  function alan(etiket, ic, id, sinif) {
    return '<div class="field yform__cell ' + (sinif || '') + '">' +
      '<label class="field__label" for="' + id + '">' + esc(etiket) + '</label>' +
      ic.replace(/^<(input|select|textarea)/, '<$1 id="' + id + '"') +
      '</div>';
  }

  /* ============================================================ liste çizimi
     Liste artık yalnız satırlardan ibaret: form kendi penceresinde açılıyor,
     bu yüzden satır yüksekliği kaydın açık olup olmamasından bağımsız. Açık
     kayıt yalnız `is-acik` ile işaretlenir — hangi satırın düzenlendiği
     pencerenin arkasında da görünsün diye. */
  function ciz() {
    var liste = $('[data-ylist]', kok);
    var kayitlar = yetenekler.filter(function (y) { return y.kategori === kategori; });
    var say = $('[data-ysay]', kok);
    if (say) {
      say.textContent = kayitlar.length
        ? kayitlar.length + ' yetenek'
        : 'Bu alanda henüz yetenek yok';
    }

    var h = kayitlar.map(function (y) {
      return '<li class="yrow' + (acikId === y.id ? ' is-acik' : '') + '" data-yrow="' + y.id + '">' +
        '<div class="yrow__head">' +
          '<button class="yrow__toggle" type="button" aria-haspopup="dialog">' +
            '<span class="yrow__lvl">' + y.seviye + '</span>' +
            '<span class="yrow__ad">' + esc(y.ad) + '</span>' +
            '<span class="yrow__meta">' + esc(ozet(y)) + '</span>' +
            '<span class="yrow__chev" aria-hidden="true">' + A.ICON.chev + '</span>' +
          '</button>' +
          '<div class="yrow__tools">' +
            '<button class="iconbtn iconbtn--danger" type="button" data-ysil aria-label="Sil">' +
              A.ICON.x + '</button>' +
          '</div>' +
        '</div>' +
      '</li>';
    }).join('');
    if (!h) {
      h = '<li class="yrow yrow--bos">Bu alanda yetenek yok — yukarıdan ekleyebilirsin.</li>';
    }
    liste.innerHTML = h;
  }

  /* ================================================================= pencere
     Form eskiden satırın altına inen bir akordeon bloktu — 1280x720'de
     1392px tutuyor, listeyi ekranın iki katına itiyordu. Artık <dialog>:
     liste yerinde kalır, form ekranın ortasında sabit yükseklikte durur ve
     kendi içinde kayar.

     Diyalog `kok`un içinde durur; olay dinleyicileri orada delege edildiği
     için gövdesi tepe katmana (top layer) çıksa da baloncuk aynı yoldan
     gider. Arka plana tıklamak KAPATMAZ: yarısı doldurulmuş bir formu
     kazara tıklamayla kaybetmek pahalı. Esc ile kapanır (tarayıcının kendi
     davranışı) ve Vazgeç/× düğmeleri vardır. */
  function pop() { return $('[data-ypop]', kok); }

  function popAc(y) {
    var d = pop();
    acikId = y.id || 0;
    d.innerHTML =
      '<div class="ypop__head">' +
        '<div class="ypop__kim">' +
          '<p class="ypop__ustbas">' + (y.id ? 'Yeteneği düzenle' : 'Yeni yetenek') + '</p>' +
          '<h2 class="ypop__bas" data-ypopbas>' + esc(y.ad || 'Adsız yetenek') + '</h2>' +
        '</div>' +
        '<button class="iconbtn" type="button" data-ypopkapat aria-label="Kapat">' +
          A.ICON.x + '</button>' +
      '</div>' +
      formHTML(y);
    if (!d.open) d.showModal();
    alanIpucu($('[data-yform]', d));
    sureIpucu($('[data-yform]', d));
    var ilk = $('[data-yf="ad"]', d);
    if (ilk) { ilk.focus(); ilk.setSelectionRange(ilk.value.length, ilk.value.length); }
  }

  /* Kapanış tek kapıdan geçer: durum sıfırlanır, gövde boşaltılır, liste
     yeniden çizilir. Temizlik `close` OLAYINA BIRAKILMAZ — olay bazı gömülü
     tarayıcılarda hiç doğmuyor (panelin kendi `confirm` diyaloğu da aynı
     yerde sessiz kalıyor), o zaman `acikId` askıda kalır ve liste eski
     satırı açık göstermeye devam ederdi. Olaylar yalnız Esc'i bu kapıya
     bağlamak için var. */
  /* formuOku() düz kimlik döndürür ({element: "3"}), formHTML ise nesne
     bekler ({element: {id: 3}}). Kategori değişiminde form yeniden çizilirken
     bu çeviri olmasaydı bütün açılır menüler boşa düşerdi. */
  function kayitBicimine(v) {
    var ref = function (x) { return x ? { id: x } : null; };
    return {
      id: v.id, kategori: v.kategori, seviye: v.seviye, ad: v.ad,
      eylem_turu: ref(v.eylem_turu),
      element: ref(v.element),
      enerji_turu: ref(v.enerji_turu),
      kaynak_turu: ref(v.kaynak_turu),
      kaynak_tuketimi: v.kaynak_tuketimi,
      menzil: { tur: v.menzil.tur, deger: v.menzil.deger, birim: ref(v.menzil.birim) },
      sure: { tur: v.sure.tur, deger: v.sure.deger, birim: ref(v.sure.birim) },
      alan: {
        'var': v.alan['var'], deger: v.alan.deger, birim: ref(v.alan.birim),
        tipi: ref(v.alan.tipi), yukseklik: v.alan.yukseklik
      },
      gereksinim: v.gereksinim,
      ritual: v.ritual, konsantrasyon: v.konsantrasyon,
      yetkinlik: (v.yetkinlik || []).map(function (id) { return { id: id }; }),
      aciklama: v.aciklama, dipnot: v.dipnot
    };
  }

  function popYenidenCiz(v) {
    var d = pop();
    var eski = $('[data-yform]', d);
    if (!eski) return;
    var kap = document.createElement('div');
    kap.innerHTML = formHTML(kayitBicimine(v));
    var yeni = kap.firstChild;
    eski.parentNode.replaceChild(yeni, eski);
    alanIpucu(yeni);
    sureIpucu(yeni);
    var sec = $('[data-yf="kategori"]', yeni);
    if (sec) sec.focus();          // odak, az önce kullanılan denetimde kalsın
  }

  function popKapat() {
    var d = pop();
    acikId = null;
    d.innerHTML = '';
    if (d.open) d.close();
    ciz();
  }

  (function () {
    var d = pop();
    if (!d) return;
    /* Esc: tarayıcı önce `cancel` yollar. Varsayılanı durdurup kendi
       kapımızdan geçiriyoruz ki temizlik tek yerde kalsın. */
    d.addEventListener('cancel', function (e) { e.preventDefault(); popKapat(); });
    /* dışarıdan close() çağrılsa da durum tutarlı kalsın; popKapat `acikId`i
       kapatmadan önce sıfırladığı için bu dal kendini tekrar çağırmaz */
    d.addEventListener('close', function () { if (acikId !== null) popKapat(); });
    /* başlık yazıldıkça güncellensin — hangi kaydın düzenlendiği hep görünür */
    d.addEventListener('input', function (e) {
      if (!e.target.matches || !e.target.matches('[data-yf="ad"]')) return;
      var bas = $('[data-ypopbas]', d);
      if (bas) bas.textContent = e.target.value.trim() || 'Adsız yetenek';
    });
  })();

  /* Süre birimi seçimi sayı alanını açar/kapar. Boş seçenek "Anlık"tır:
     birim yoksa girilecek sayı da yok. Seçilen birimin adı sayının yanında
     yazılır — tabloda "3 Tur" göründüğü için formda da öyle okunsun. */
  function sureIpucu(form, odakla) {
    var sel = $('[data-yf="sure_birim"]', form);
    var kutu = $('[data-ysureli]', form);
    if (!sel || !kutu) return;
    var acik = !!sel.value;
    kutu.hidden = !acik;
    var ad = $('[data-ysuread]', form);
    if (ad) {
      var b = (sozluk.sure_birimi || []).filter(function (x) {
        return String(x.id) === sel.value;
      })[0];
      ad.textContent = b ? (b.ad || '') : '';
    }
    if (acik && odakla) {
      var g = $('[data-yf="sure_deger"]', form);
      if (g && !g.value) g.focus();
    }
  }

  /* alan tipi seçimi yükseklik alanını açar/kapar ve ölçünün adını söyler */
  function alanIpucu(form) {
    var sel = $('[data-yf="alan_tipi"]', form);
    var ipucu = $('[data-yalanipucu]', form);
    var yuk = $('[data-yyuk]', form);
    if (!sel) return;
    var t = (sozluk.alan_tipi || []).filter(function (x) { return String(x.id) === sel.value; })[0];
    if (yuk) yuk.hidden = !(t && t.yukseklik_gerekir);
    if (ipucu) {
      ipucu.textContent = t
        ? (t.olcu_adi || 'Yarıçap') + ' değeri girilir' +
          (t.yukseklik_gerekir ? '; bu biçimde ayrıca yükseklik gerekir.' : '.')
        : 'Önce bir biçim seç.';
    }
  }

  /* ---------------------------------------------------- formu kayda çevirme */
  function formuOku(form) {
    var d = function (s) { return $('[data-yf="' + s + '"]', form); };
    var sayi = function (s) {
      var e = d(s);
      return e && e.value !== '' ? parseInt(e.value, 10) : null;
    };
    var mesafe = $('input[name="ymenzil"]:checked', form).value === 'mesafe';
    var alanVar = $('input[name="yalan"]:checked', form).value === 'var';
    var sbirim = d('sure_birim') ? (d('sure_birim').value || null) : null;
    var sureliMi = !!sbirim;
    var yetkinlik = $$('[data-ywet]', form).filter(function (c) { return c.checked; })
      .map(function (c) { return parseInt(c.value, 10); });
    var sw = function (ad) { var e = $('[data-ysw="' + ad + '"]', form); return !!(e && e.checked); };

    return {
      id: acikId || 0,
      kategori: d('kategori').value,
      seviye: sayi('seviye') || 0,
      ad: d('ad').value,
      eylem_turu: d('eylem_turu').value || null,
      /* Profilde olmayan alanın denetimi formda hiç yok; okumaya kalkmak
         null'a çarpardı. Sunucu da bu alanları zaten susturuyor. */
      element: d('element') ? (d('element').value || null) : null,
      enerji_turu: d('enerji_turu') ? (d('enerji_turu').value || null) : null,
      kaynak_turu: d('kaynak_turu') ? (d('kaynak_turu').value || null) : null,
      yetkinlik: yetkinlik,
      kaynak_tuketimi: sayi('kaynak_tuketimi') || 0,
      menzil: {
        tur: mesafe ? 'mesafe' : 'kendin',
        deger: mesafe ? sayi('menzil_deger') : null,
        birim: mesafe ? (d('menzil_birim').value || null) : null
      },
      /* boş birim = Anlık; tür ayrı bir denetimden değil seçimden türer */
      sure: {
        tur: sureliMi ? 'sureli' : 'anlik',
        deger: sureliMi ? sayi('sure_deger') : null,
        birim: sureliMi ? sbirim : null
      },
      alan: {
        'var': alanVar,
        deger: alanVar ? sayi('alan_deger') : null,
        birim: alanVar ? (d('alan_birim').value || null) : null,
        tipi: alanVar ? (d('alan_tipi').value || null) : null,
        yukseklik: alanVar ? sayi('alan_yukseklik') : null
      },
      gereksinim: {
        soz: { gerekli: sw('soz'), metin: d('soz_metin') ? d('soz_metin').value : '' },
        hareket: { gerekli: sw('hareket'), metin: d('hareket_metin') ? d('hareket_metin').value : '' },
        materyal: {
          gerekli: sw('materyal'),
          liste: $$('[data-ymat]', form).map(function (i) { return i.value; })
            .filter(function (v) { return v.trim(); })
        }
      },
      ritual: sw('ritual'),
      konsantrasyon: sw('konsantrasyon'),
      /* sw() olmayan anahtarda false döner — profilde bulunmayan nitelik
         kapalı gider, sunucu da aynı kararı verir */
      aciklama: d('aciklama').value,
      dipnot: d('dipnot').value
    };
  }

  /* ---------------------------------------------------------------- olaylar */
  kok.addEventListener('click', function (e) {
    var t = e.target;

    var toggle = t.closest ? t.closest('.yrow__toggle') : null;
    if (toggle) {
      var id = parseInt(toggle.closest('.yrow').getAttribute('data-yrow'), 10);
      var kayit = yetenekler.filter(function (y) { return y.id === id; })[0];
      if (kayit) { popAc(kayit); ciz(); }
      return;
    }

    /* Sil düğmesi iki yerde: liste satırında ve formun altında. Pencerenin
       içinde `.yrow` atası yok — orada hedef, düzenlenen kayıt. */
    if (t.closest && t.closest('[data-ysil], [data-ysil2]')) {
      var satir = t.closest('.yrow');
      var yid = satir ? parseInt(satir.getAttribute('data-yrow'), 10) : acikId;
      var kayit = yetenekler.filter(function (y) { return y.id === yid; })[0];
      if (!kayit) return;
      A.confirmDialog('“' + kayit.ad + '” yeteneği silinsin mi? Bu geri alınamaz.', 'Sil')
        .then(function (ok) {
          if (!ok) return;
          gonder('/api/yetenek?id=' + yid, 'DELETE')
            .then(function (j) {
              yetenekler = j.yetenekler;
              if (acikId === yid) popKapat();   // popKapat listeyi de çizer
              else ciz();
              A.toast('“' + kayit.ad + '” silindi · ' + (j.yazilan || []).join(', '));
            })
            .catch(function (err) { A.toast(err.message, true); });
        });
      return;
    }

    if (t.closest && t.closest('[data-yvazgec], [data-ypopkapat]')) {
      popKapat();
      return;
    }

    if (t.closest && t.closest('[data-ymatekle]')) {
      var blok = $('[data-ymatliste]', t.closest('[data-yform]'));
      blok.insertAdjacentHTML('beforeend', materyalSatir(''));
      var son = blok.lastElementChild.querySelector('[data-ymat]');
      if (son) son.focus();
      return;
    }

    if (t.closest && t.closest('[data-ymatsil]')) {
      var sat = t.closest('.ymat__satir');
      var kap = sat.parentElement;
      sat.remove();
      if (!kap.children.length) kap.insertAdjacentHTML('beforeend', materyalSatir(''));
      return;
    }
  });

  /* koşullu blokların açılıp kapanması */
  kok.addEventListener('change', function (e) {
    var t = e.target;
    var form = t.closest ? t.closest('[data-yform]') : null;

    if (t.name === 'ymenzil' && form) {
      $('[data-ymesafe]', form).hidden = t.value !== 'mesafe';
      if (t.value === 'mesafe') $('[data-yf="menzil_deger"]', form).focus();
      return;
    }
    if (t.name === 'yalan' && form) {
      var g = t.value === 'var';
      $('[data-yalanvar]', form).hidden = !g;
      $('[data-yalanipucu]', form).hidden = !g;
      if (g) alanIpucu(form);
      return;
    }
    if (t.hasAttribute && t.hasAttribute('data-ysw') && form) {
      var ad = t.getAttribute('data-ysw');
      var blok = $('[data-y' + ad + 'blok]', form);
      if (blok) {
        blok.hidden = !t.checked;
        if (t.checked) {
          var ilk = blok.querySelector('textarea, input');
          if (ilk) ilk.focus();
        }
      }
      return;
    }
    if (t.getAttribute && t.getAttribute('data-yf') === 'alan_tipi' && form) {
      alanIpucu(form);
      return;
    }
    if (t.getAttribute && t.getAttribute('data-yf') === 'sure_birim' && form) {
      sureIpucu(form, true);
      return;
    }
    /* Kategori değişince alan kümesi de değişir (element/enerji/süre/
       gereksinim/yetkinlik). Formu o an elde ne varsa onunla yeniden çiziyoruz
       — kullanıcının doldurduğu ortak alanlar korunur, kategoriye ait olmayan
       alanlar düşer. */
    if (t.getAttribute && t.getAttribute('data-yf') === 'kategori' && form) {
      var suanki = formuOku(form);
      suanki.kategori = t.value;
      suanki.id = acikId || 0;
      popYenidenCiz(suanki);
      return;
    }
    if (t.hasAttribute && t.hasAttribute('data-ykat')) {
      kategori = t.value;
      popKapat();       // başka alanın kaydı açık kalmasın; listeyi de çizer
    }
  });

  /* ---------------------------------------------------------------- kaydet */
  kok.addEventListener('submit', function (e) {
    var form = e.target.closest ? e.target.closest('[data-yform]') : null;
    if (!form) return;
    e.preventDefault();
    var veri = formuOku(form);
    var dugme = $('button[type="submit"]', form);
    dugme.disabled = true;
    gonder('/api/yetenek', 'PUT', veri)
      .then(function (j) {
        yetenekler = j.yetenekler;
        popKapat();                          // popKapat listeyi de çizer
        A.toast('“' + veri.ad + '” kaydedildi · ' + (j.yazilan || []).join(', '));
      })
      .catch(function (err) {
        dugme.disabled = false;
        A.toast(err.message, true);
      });
  });

  /* ================================================================ sözlükler
     Element, enerji türü, kaynak türü, eylem türü, uzaklık birimi ve alan
     tipi listeleri veritabanında durur; formun açılır menüleri onlardan
     doğar. Bu blok o listelerin kendisini düzenler. */
  var SOZ_ALAN = [
    { t: 'element', ad: 'Elementler', ek: [] },
    { t: 'enerji_turu', ad: 'Enerji türleri', ek: ['sinif'] },
    { t: 'kaynak_turu', ad: 'Kaynak türleri', ek: [] },
    { t: 'eylem_turu', ad: 'Eylem türleri', ek: ['kisa'] },
    { t: 'uzaklik_birimi', ad: 'Uzaklık birimleri', ek: ['kisa', 'varsayilan'] },
    { t: 'sure_birimi', ad: 'Süre birimleri', ek: ['kisa', 'saniye', 'varsayilan'] },
    { t: 'alan_tipi', ad: 'Alan tipleri', ek: ['olcu_adi', 'yukseklik_gerekir'] },
    { t: 'yetkinlik', ad: 'Yetkinlikler (silah türleri)', ek: [] }
  ];
  var SINIF = { temel: 'Temel', ozel: 'Özel', yasak: 'Yasak' };

  function sozlukCiz() {
    var kap = $('[data-ysozluk]', kok);
    kap.innerHTML = '<h2 class="ysozluk__baslik">Listeler</h2>' +
      '<p class="field__help ysozluk__not">Formdaki açılır menüler bu listelerden doğar. ' +
      'Kullanımda olan bir kaydı silmeye çalışırsan sunucu engeller.</p>' +
      SOZ_ALAN.map(function (s) {
        var satirlar = (sozluk[s.t] || []).map(function (x) {
          return '<li class="ysoz__satir" data-ysozsatir="' + x.id + '">' +
            '<input class="field__input ysoz__ad" data-ysozad value="' + esc(x.ad) + '" aria-label="Ad">' +
            (s.ek.indexOf('sinif') >= 0
              ? '<select class="field__input ysoz__ek" data-ysozek="sinif" aria-label="Sınıf">' +
                Object.keys(SINIF).map(function (k) {
                  return '<option value="' + k + '"' + (x.sinif === k ? ' selected' : '') + '>' +
                         SINIF[k] + '</option>';
                }).join('') + '</select>' : '') +
            (s.ek.indexOf('kisa') >= 0
              ? '<input class="field__input ysoz__ek ysoz__ek--kisa" data-ysozek="kisa" value="' +
                esc(x.kisa || '') + '" placeholder="kısa" aria-label="Kısaltma">' : '') +
            (s.ek.indexOf('saniye') >= 0
              ? '<input class="field__input ysoz__ek ysoz__ek--kisa" type="number" min="1" ' +
                'step="1" data-ysozek="saniye" value="' + esc(x.saniye || 1) +
                '" placeholder="sn" aria-label="Kaç saniye">' : '') +
            (s.ek.indexOf('olcu_adi') >= 0
              ? '<input class="field__input ysoz__ek" data-ysozek="olcu_adi" value="' +
                esc(x.olcu_adi || '') + '" placeholder="Yarıçap" aria-label="Ölçünün adı">' : '') +
            (s.ek.indexOf('varsayilan') >= 0
              ? '<label class="ysoz__bayrak"><input type="checkbox" data-ysozek="varsayilan"' +
                (x.varsayilan ? ' checked' : '') + '><span>varsayılan</span></label>' : '') +
            (s.ek.indexOf('yukseklik_gerekir') >= 0
              ? '<label class="ysoz__bayrak"><input type="checkbox" data-ysozek="yukseklik_gerekir"' +
                (x.yukseklik_gerekir ? ' checked' : '') + '><span>yükseklik</span></label>' : '') +
            '<button class="btn btn--kucuk" type="button" data-ysozkaydet>Kaydet</button>' +
            '<button class="iconbtn iconbtn--danger" type="button" data-ysozsil aria-label="Sil">' +
              A.ICON.x + '</button>' +
          '</li>';
        }).join('');
        return '<section class="ysoz" data-ysoztablo="' + s.t + '">' +
          '<h3 class="ysoz__baslik">' + esc(s.ad) + '</h3>' +
          '<ul class="ysoz__liste">' + satirlar + '</ul>' +
          '<div class="ysoz__ekle">' +
            '<input class="field__input" data-ysozyeni placeholder="Yeni kayıt adı" ' +
            'aria-label="Yeni ' + esc(s.ad.toLowerCase()) + ' adı" autocomplete="off">' +
            '<button class="btn btn--ghost btn--kucuk" type="button" data-ysozyeniekle>Ekle</button>' +
          '</div>' +
        '</section>';
      }).join('');
  }

  function sozlukIste(tablo, veri, yontem, sorgu) {
    return gonder('/api/yetenek/sozluk?tablo=' + tablo + (sorgu || ''), yontem, veri)
      .then(function (j) {
        sozluk = j.sozluk;
        sozlukCiz();
        return api('/api/yetenek');
      })
      .then(function (j) {
        yetenekler = j.yetenekler;
        ciz();
      });
  }

  kok.addEventListener('click', function (e) {
    var t = e.target;
    if (!t.closest) return;

    if (t.closest('[data-ylistele]')) {
      var kap = $('[data-ysozluk]', kok);
      kap.hidden = !kap.hidden;
      t.closest('[data-ylistele]').classList.toggle('is-acik', !kap.hidden);
      if (!kap.hidden) kap.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      return;
    }

    if (t.closest('[data-yuret]')) {
      gonder('/api/yetenek/uret', 'POST')
        .then(function (j) { A.toast('Yeniden üretildi · ' + (j.yazilan || []).join(', ')); })
        .catch(function (err) { A.toast(err.message, true); });
      return;
    }

    if (t.closest('[data-yeni]')) {
      popAc(bosKayit());
      return;
    }

    var kaydet = t.closest('[data-ysozkaydet]');
    if (kaydet) {
      var satir = kaydet.closest('[data-ysozsatir]');
      var tablo = kaydet.closest('[data-ysoztablo]').getAttribute('data-ysoztablo');
      var veri = { id: parseInt(satir.getAttribute('data-ysozsatir'), 10),
                   ad: $('[data-ysozad]', satir).value };
      $$('[data-ysozek]', satir).forEach(function (el) {
        veri[el.getAttribute('data-ysozek')] = el.type === 'checkbox' ? el.checked : el.value;
      });
      sozlukIste(tablo, veri, 'PUT')
        .then(function () { A.toast('Liste güncellendi'); })
        .catch(function (err) { A.toast(err.message, true); });
      return;
    }

    var sil = t.closest('[data-ysozsil]');
    if (sil) {
      var sat = sil.closest('[data-ysozsatir]');
      var tab = sil.closest('[data-ysoztablo]').getAttribute('data-ysoztablo');
      var ad = $('[data-ysozad]', sat).value;
      A.confirmDialog('“' + ad + '” listeden silinsin mi?', 'Sil').then(function (ok) {
        if (!ok) return;
        sozlukIste(tab, null, 'DELETE', '&id=' + sat.getAttribute('data-ysozsatir'))
          .then(function () { A.toast('“' + ad + '” silindi'); })
          .catch(function (err) { A.toast(err.message, true); });
      });
      return;
    }

    var ekle = t.closest('[data-ysozyeniekle]');
    if (ekle) {
      var bolum = ekle.closest('[data-ysoztablo]');
      var giris = $('[data-ysozyeni]', bolum);
      if (!giris.value.trim()) { giris.focus(); return; }
      sozlukIste(bolum.getAttribute('data-ysoztablo'), { ad: giris.value }, 'PUT')
        .then(function () { A.toast('Listeye eklendi'); })
        .catch(function (err) { A.toast(err.message, true); });
      return;
    }
  });

  /* Enter tuşu "Ekle" düğmesi gibi davransın — liste doldururken fare gereksiz */
  kok.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter') return;
    if (e.target.hasAttribute && e.target.hasAttribute('data-ysozyeni')) {
      e.preventDefault();
      var b = $('[data-ysozyeniekle]', e.target.closest('[data-ysoztablo]'));
      if (b) b.click();
    }
  });

  /* ---------------------------------------------------------------- açılış */
  function yukle() {
    return api('/api/yetenek').then(function (j) {
      sozluk = j.sozluk;
      yetenekler = j.yetenekler;
      var sec = $('[data-ykat]', kok);
      sec.innerHTML = (sozluk.kategori || []).map(function (k) {
        return '<option value="' + k.kod + '">' + esc(k.ad) + '</option>';
      }).join('');
      sec.value = kategori;
      var db = $('[data-ydb]', kok);
      if (db) {
        db.textContent = j.durum.not;
        db.classList.toggle('is-err', !j.durum.tamam);
      }
      yuklendi = true;
      sozlukCiz();
      ciz();
    }).catch(function (err) {
      $('[data-ylist]', kok).innerHTML =
        '<li class="yrow yrow--bos">Yetenek veritabanına ulaşılamadı: ' + esc(err.message) + '</li>';
    });
  }

  A.registerView('yetenekler', {
    enter: function () { if (!yuklendi) yukle(); }
  });
})();
