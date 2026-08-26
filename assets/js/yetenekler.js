/* SLVNZ — Yetenekler: arama, süzgeç, sıralama ve yetenek kartı
   ============================================================================
   Sayfadaki bütün veri HTML olarak gelir (admin/yetenek.py üretir). Bu dosya
   ağ isteği yapmaz, veri getirmez — yalnız var olan tabloyu gezilebilir kılar:

     · arama kutusu   satırın data-ara alanında geçiyor mu (aksansız, küçük)
     · süzgeçler      data-eylem / element / enerji / kaynak / seviye eşleşmesi
                      (data-ykapsar taşıyan süzgeç tam değil KAPSAYAN eşleşir:
                      satırın " · " ile ayrılmış listesinde geçiyor mu)
     · nitelikler     ritüel / konsantrasyon onay kutuları (İŞARETLİ olan
                      süzer, işaretsiz kutu hiçbir şeyi elemez)
     · sıralama       başlığa tıkla → artan → azalan → varsayılan
     · seçim          satıra tıkla → o yeteneğin kartı sağdaki panele geçer

   Aşamalı iyileştirme
   -------------------
   JS yoksa tablo bir dizin, altındaki kartlar tam metindir; satırdaki ad
   gerçek bir çapa bağlantısıdır ve doğru kartın üstüne iner. Gizleme işini
   yalnız bu dosya yapar — işaretlemede hiçbir şey gizli değildir.

   Sıralama Türkçedir: localeCompare('tr') olmadan "Çakmak" < "Cam" olur ve
   ı/i ayrımı kaybolur.

   kurallar.js ile ilişki
   ---------------------
   Kategori panellerini (Enerjisel/Fiziksel/Karma) o dosya değiştirir — burada
   yalnız derin bağlantı düzeltilir. Seçim adres çubuğuna replaceState ile
   yazılır: pushState olsaydı geri tuşu kurallar.js'in popstate işleyicisine
   düşer ve ilk panele atlardı.
   ========================================================================== */
(function () {
  'use strict';

  var bloklar = Array.prototype.slice.call(document.querySelectorAll('[data-yet]'));
  if (!bloklar.length) return;

  var doc = document.documentElement;
  doc.classList.add('js');              // kurallar.js yoksa da tek başına çalışsın
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var genis = window.matchMedia('(min-width: 1280px)');

  /* ---- metin katlama -----------------------------------------------------
     "ates" yazan "Ateş"i bulsun. Tablo bu tabloyla üretildi (yetenek.py
     katla()); iki taraf aynı metni üretmezse arama sessizce ıskalar. */
  var KATLA = {
    'ı': 'i', 'İ': 'i', 'I': 'i',
    'ş': 's', 'Ş': 's', 'ğ': 'g', 'Ğ': 'g',
    'ü': 'u', 'Ü': 'u', 'ö': 'o', 'Ö': 'o',
    'ç': 'c', 'Ç': 'c', 'â': 'a', 'Â': 'a',
    'î': 'i', 'Î': 'i', 'û': 'u', 'Û': 'u'
  };
  function katla(s) {
    return String(s == null ? '' : s).replace(/[ıİIşŞğĞüÜöÖçÇâÂîÎûÛ]/g, function (h) {
      return KATLA[h];
    }).toLowerCase();
  }

  var karsilastir = (function () {
    if (window.Intl && Intl.Collator) {
      var c = new Intl.Collator('tr', { sensitivity: 'base', numeric: true });
      return function (a, b) { return c.compare(a, b); };
    }
    return function (a, b) { return String(a).localeCompare(String(b), 'tr'); };
  })();

  bloklar.forEach(kur);

  /* ====================================================================== */
  function kur(blok) {
    var govde = blok.querySelector('[data-ygovde]');
    var tablo = blok.querySelector('[data-ytablo]');
    if (!govde || !tablo) return;

    var satirlar = Array.prototype.slice.call(govde.querySelectorAll('.ytablo__satir'));
    if (!satirlar.length) return;

    var kartSarma = blok.querySelector('[data-ykartlar]');
    var ipucu = blok.querySelector('[data-yipucu]');
    var sayac = blok.querySelector('[data-ysayac]');
    var bosMesaj = blok.querySelector('[data-ybos]');
    var sifirla = blok.querySelector('[data-ysifirla]');
    var arama = blok.querySelector('[data-yara]');
    var seciciler = Array.prototype.slice.call(blok.querySelectorAll('[data-yfiltre]'));
    var kutular = Array.prototype.slice.call(blok.querySelectorAll('[data-ykutu]'));
    var basliklar = Array.prototype.slice.call(tablo.querySelectorAll('th[data-ysort]'));

    var kartlar = {};
    if (kartSarma) {
      Array.prototype.forEach.call(kartSarma.querySelectorAll('[data-ykart]'), function (k) {
        kartlar[k.getAttribute('data-ykart')] = k;
        k.hidden = true;                        // JS var: kartlar teke iner
      });
    }
    if (ipucu) ipucu.hidden = false;

    var varsayilanSira = satirlar.slice();      // üretimdeki sıra (seviye, ad)
    var sortAnahtar = null;
    var sortYon = 0;                            // 0 yok · 1 artan · -1 azalan
    var secili = null;

    /* ---- süzme ---------------------------------------------------------- */
    function suz() {
      var q = katla(arama ? arama.value.trim() : '');
      var kosul = {};
      var suzgecVar = !!q;
      var kapsayan = {};
      seciciler.forEach(function (s) {
        var v = s.value;
        var ad = s.getAttribute('data-yfiltre');
        s.classList.toggle('is-on', !!v);
        if (s.hasAttribute('data-ykapsar')) kapsayan[ad] = true;
        if (v) { kosul[ad] = v; suzgecVar = true; }
      });

      /* Onay kutusu açılır menü gibi okunamaz: `value` işaretli olup
         olmadığından bağımsızdır. İşaretli kutu "yalnız bu niteliği taşıyanlar"
         demektir; işaretsiz kutu hiçbir şeyi elemez. */
      var nitelik = [];
      kutular.forEach(function (c) {
        var acik = c.checked;
        c.parentNode.classList.toggle('is-on', acik);
        if (acik) { nitelik.push(c.getAttribute('data-ykutu')); suzgecVar = true; }
      });

      var gorunen = 0;
      satirlar.forEach(function (tr) {
        var ok = true;
        if (q && tr.getAttribute('data-ara').indexOf(q) < 0) ok = false;
        if (ok) {
          for (var k in kosul) {
            var deger = tr.getAttribute('data-' + k) || '';
            /* Kapsayan süzgeç (yetkinlik): satır birden çok değer taşır,
               " · " ile ayrılmış. Tam eşleşme ararsak "Kılıç · Balta" satırı
               "Kılıç" süzgecine takılmazdı. */
            var uydu = kapsayan[k]
              ? deger.split(' · ').indexOf(kosul[k]) >= 0
              : deger === kosul[k];
            if (!uydu) { ok = false; break; }
          }
        }
        if (ok) {
          for (var i = 0; i < nitelik.length; i++) {
            if (tr.getAttribute('data-' + nitelik[i]) !== '1') { ok = false; break; }
          }
        }
        tr.hidden = !ok;
        if (ok) gorunen++;
      });

      if (bosMesaj) bosMesaj.hidden = gorunen > 0;
      if (sifirla) sifirla.hidden = !suzgecVar;
      if (sayac) {
        sayac.textContent = gorunen === satirlar.length
          ? satirlar.length + ' yetenek'
          : gorunen + ' / ' + satirlar.length + ' yetenek';
      }
      // süzgeç seçili satırı sakladıysa kart da kapansın
      if (secili && secili.hidden) sec(null);
    }

    /* ---- sıralama -------------------------------------------------------- */
    function metin(tr, anahtar) {
      if (anahtar === 'ad') {
        var a = tr.querySelector('.ytablo__link');
        return a ? a.textContent.trim() : '';
      }
      return (tr.getAttribute('data-' + anahtar) || '').trim();
    }

    function sayi(tr, anahtar) {
      var v = parseFloat(tr.getAttribute('data-' + anahtar));
      return isNaN(v) ? 0 : v;
    }

    function sirala() {
      var dizi;
      if (!sortAnahtar || !sortYon) {
        dizi = varsayilanSira;
      } else {
        var th = basliklar.filter(function (h) {
          return h.getAttribute('data-ysort') === sortAnahtar;
        })[0];
        var tur = th ? th.getAttribute('data-ytur') : 'metin';
        dizi = satirlar.slice().sort(function (a, b) {
          var d = 0;
          if (tur === 'sayi') {
            d = sayi(a, sortAnahtar) - sayi(b, sortAnahtar);
          } else {
            var ta = metin(a, sortAnahtar), tb = metin(b, sortAnahtar);
            // boş hücre ("—") yönü ne olursa olsun sona düşsün
            if (!ta !== !tb) return ta ? -1 : 1;
            d = karsilastir(ta, tb);
          }
          if (!d && sortAnahtar === 'kaynak') d = sayi(a, 'tuketim') - sayi(b, 'tuketim');
          if (d) return d * sortYon;
          // kararlı ikincil sıra: her zaman ada göre artan
          return karsilastir(metin(a, 'ad'), metin(b, 'ad'));
        });
      }
      var parca = document.createDocumentFragment();
      dizi.forEach(function (tr) { parca.appendChild(tr); });
      govde.appendChild(parca);

      basliklar.forEach(function (h) {
        var on = h.getAttribute('data-ysort') === sortAnahtar && sortYon;
        h.setAttribute('aria-sort', !on ? 'none' : (sortYon > 0 ? 'ascending' : 'descending'));
      });
    }

    basliklar.forEach(function (th) {
      th.tabIndex = 0;                          // JS yokken odaklanılır olmasın
      function tikla() {
        var anahtar = th.getAttribute('data-ysort');
        if (sortAnahtar !== anahtar) { sortAnahtar = anahtar; sortYon = 1; }
        else if (sortYon === 1) { sortYon = -1; }
        else if (sortYon === -1) { sortYon = 0; sortAnahtar = null; }
        else { sortYon = 1; }
        sirala();
      }
      th.addEventListener('click', tikla);
      th.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
          e.preventDefault();
          tikla();
        }
      });
    });

    /* ---- seçim ----------------------------------------------------------- */
    function sec(tr, opts) {
      opts = opts || {};
      if (secili) {
        secili.classList.remove('is-secili');
        secili.removeAttribute('aria-current');
      }
      secili = tr;
      for (var id in kartlar) kartlar[id].hidden = true;
      if (!tr) {
        if (ipucu) ipucu.hidden = false;
        return;
      }
      tr.classList.add('is-secili');
      tr.setAttribute('aria-current', 'true');
      var kart = kartlar[tr.getAttribute('data-yid')];
      if (!kart) return;
      if (ipucu) ipucu.hidden = true;
      kart.hidden = false;
      if (!reduce.matches) {
        kart.classList.remove('is-in');
        void kart.offsetHeight;                 // animasyonu baştan koştur
        kart.classList.add('is-in');
      }
      if (opts.hash !== false && window.history && history.replaceState) {
        history.replaceState(history.state, '', '#' + kart.id);
      }
      // dar ekranda kart tablonun üstünde: tıklamanın karşılığı görünsün
      if (!genis.matches && opts.kaydir !== false) {
        kart.scrollIntoView({ block: 'nearest',
                              behavior: reduce.matches ? 'auto' : 'smooth' });
      }
      if (opts.odak) kart.focus({ preventScroll: true });
    }

    govde.addEventListener('click', function (e) {
      if (e.button || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var tr = e.target.closest ? e.target.closest('.ytablo__satir') : null;
      if (!tr || tr.hidden) return;
      e.preventDefault();                       // ad hücresindeki çapa atlamasın
      sec(tr === secili ? null : tr);
    });

    /* satırlar arasında ok tuşuyla gezinme — seçili kart takip eder */
    govde.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
      var acik = satirlar.filter(function (t) { return !t.hidden; });
      if (!acik.length) return;
      var i = secili ? acik.indexOf(secili) : -1;
      var j = e.key === 'ArrowDown' ? i + 1 : i - 1;
      if (j < 0) j = acik.length - 1;
      if (j >= acik.length) j = 0;
      e.preventDefault();
      sec(acik[j]);
      var bag = acik[j].querySelector('.ytablo__link');
      if (bag) bag.focus({ preventScroll: true });
      acik[j].scrollIntoView({ block: 'nearest' });
    });

    /* ---- bağlama --------------------------------------------------------- */
    var zaman = null;
    if (arama) {
      arama.addEventListener('input', function () {
        clearTimeout(zaman);
        zaman = setTimeout(suz, 120);
      });
      // Esc kutuyu temizler — sayfadan çıkmadan aramadan çıkmak
      arama.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && arama.value) { arama.value = ''; suz(); }
      });
    }
    seciciler.forEach(function (s) { s.addEventListener('change', suz); });
    kutular.forEach(function (c) { c.addEventListener('change', suz); });
    if (sifirla) {
      sifirla.addEventListener('click', function () {
        if (arama) arama.value = '';
        seciciler.forEach(function (s) { s.value = ''; });
        kutular.forEach(function (c) { c.checked = false; });
        suz();
        if (arama) arama.focus();
      });
    }

    /* ---- derin bağlantı --------------------------------------------------
       #y-enerjisel-3 ile gelindiyse o kart açılsın. kurallar.js bu kimliği
       bir panel sanmaz ve ilk paneli açar; doğru paneli burada düzeltiyoruz. */
    blok.__yetSec = function (yid, opts) {
      var tr = satirlar.filter(function (t) { return t.getAttribute('data-yid') === yid; })[0];
      if (tr) sec(tr, opts);
      return !!tr;
    };

    suz();
  }

  /* ---- açılışta derin bağlantı -------------------------------------------
     Çapa kimliği yeteneğin ADINDAN türer (y-enerjisel-alev-mizragi), veritabanı
     kimliğinden değil — veritabanı yeniden kurulduğunda birincil anahtarlar
     değişir ve paylaşılmış bağlantılar bozulurdu. Biçimi burada ayrıştırmıyoruz:
     kartı kimliğinden bulup anahtarı kendi `data-ykart`ından okuyoruz. */
  (function () {
    if (location.hash.length < 2) return;
    var kart = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (!kart || !kart.hasAttribute('data-ykart')) return;
    var panel = kart.closest ? kart.closest('[data-panel]') : null;
    if (panel && panel.hidden) {
      // kategori panelini kurallar.js açsın: menü bağlantısını tıkla
      var bag = document.querySelector('.toc__link[href="#' + panel.id + '"]');
      if (bag) bag.click();
    }
    var blok = kart.closest ? kart.closest('[data-yet]') : null;
    if (blok && blok.__yetSec) {
      /* Panel geçişi bitsin, sonra kart açılsın. `hash` açık bırakılır:
         kategori bağlantısını tıklamak kurallar.js'e adres çubuğuna "#karma"
         yazdırıyor — kart kimliğini geri yazmazsak derin bağlantıyla gelen
         kişinin kopyaladığı adres artık o kartı göstermez. */
      setTimeout(function () {
        blok.__yetSec(kart.getAttribute('data-ykart'), { kaydir: true });
      }, 260);
    }
  })();
})();
