/* ============================================================================
   SLVNZ 4.0 — İÇERİK DOSYASI
   ----------------------------------------------------------------------------
   Sitenin TÜM metinleri burada. Elle düzenlemek için en güvenli yer burası.
   Yapı basit bir JavaScript nesnesidir; istediğin kadar bölüm/öğe ekleyebilir,
   başlık ve gövde metinlerini değiştirebilirsin.

   - meta        : Genel başlık, slogan ve landing açıklaması
   - sections    : Üç ana sekme (oyun-kurallari, yetenekler, evren-rehberi)
       label     : Sekmenin görünen adı
       blurb     : Sekme giriş cümlesi (landing butonunda görünür)
       items[]   : Yan menüde sıralanan alt başlıklar
           id    : URL'de kullanılan kısa kimlik (boşluksuz, küçük harf)
           title : Görünen başlık
           body  : Açıklama metni. Paragrafları boş satırla ayır.

   NOT: Admin/Editör panelinden (editor.html) yaptığın değişiklikler tarayıcına
   kaydedilir ve bu dosyanın üzerine YAZILMAZ. Kalıcı yapmak için editördeki
   "content.js olarak kopyala" butonunu kullanıp bu dosyayı güncelleyebilirsin.
   ========================================================================== */

/* ----------------------------------------------------------------------------
   TABLO YARDIMCISI (YETENEKLER için)
   ----------------------------------------------------------------------------
   "table" modundaki öğeler bir tablo nesnesi taşır:
     columns[] : { id, label, type:"text"|"number", showInTable:true|false }
                 - type      -> veri girişinin türü (metin / sayı)
                 - showInTable-> false ise sütun tabloda gizlenir, yalnızca
                                 satıra tıklayınca açılan snapshot kartında görünür.
     rows[]    : her satır bir kayıt. Anahtarlar sütun id'leridir; _id satırın
                 benzersiz kimliğidir (otomatik üretilir).
   abilityTable() varsayılan sütun şemasını üretir — editörden istediğin gibi
   sütun ekleyip çıkarabilirsin.
   -------------------------------------------------------------------------- */
/* Sütun şeması v2:
   type      : "text" (kısa metin) | "number" (sayı) | "textarea" (uzun metin)
   showInTable: true/false — tabloda sütun görünsün mü
   snapZone  : "top"    — büyük başlığın hemen altında küçük meta bilgisi olarak
             | "bottom" — çizgiden sonra alan/değer çifti olarak
             | "none"   — snapshot kartında hiç görünme (sadece başlık için)
   İlk sütun her zaman snapshot'taki büyük başlıktır; snapZone önemsizdir. */
function abilityTable(rows) {
  return {
    columns: [
      { id: "isim",     label: "İSİM",     type: "text",     showInTable: true,  snapZone: "none"   },
      { id: "tur",      label: "TÜR",      type: "text",     showInTable: true,  snapZone: "top"    },
      { id: "seviye",   label: "SEVİYE",   type: "number",   showInTable: true,  snapZone: "top"    },
      { id: "maliyet",  label: "MALİYET",  type: "number",   showInTable: true,  snapZone: "top"    },
      { id: "aciklama", label: "AÇIKLAMA", type: "textarea", showInTable: false, snapZone: "bottom" },
    ],
    rows: rows || [],
  };
}

window.SLVNZ_CONTENT = {
  meta: {
    title: "SLVNZ 4.0",
    /* Üst baştaki marka yazısı iki parçaya ayrıldı:
       brandName  -> normal (beyaz/metin) renginde yazılan kısım
       brandAccent-> vurgu (kırmızı) renginde yazılan kısım
       brandLogo  -> DOLUYSA yazı yerine bu kullanılır. Bir görsel URL'si
                     (https://… ya da logo.svg) veya doğrudan <svg…>…</svg>
                     kodu olabilir. Boş bırakılırsa yazı gösterilir. */
    brandName: "SLVNZ",
    brandAccent: "4.0",
    brandLogo: "",
    /* Landing (ana giriş) ekranındaki büyük başlık — iki satır.
       heroLine1 sonunda vurgu (kırmızı) bir nokta gösterilir; heroLine2 alt satır.
       İkisi de boş bırakılırsa başlık gizlenir. */
    heroLine1: "SLVNZ",
    heroLine2: "4.0",
    tagline: "MASAÜSTÜ ROL YAPMA SİSTEMİ",
    description:
      "Buraya SLVNZ 4.0 için kısa bir tanıtım metni gelecek. Sistemin ne olduğunu, " +
      "neyi vaat ettiğini ve oyuncuyu hangi evrene davet ettiğini birkaç cümleyle " +
      "anlatan bir açıklama. (Bu bir yer tutucu metindir — sonra düzenlenecek.)",
    version: "v4.0",
    /* İçerik tohumu: bu değer değiştiğinde, tarayıcıdaki eski kayıt
       otomatik olarak bu dosyadaki yeni varsayılan içerikle güncellenir.
       Yeni varsayılan içerik yayınladığında bu numarayı artır. */
    contentSeed: "2026-05-creatures-1",
  },

  sections: {
    "oyun-kurallari": {
      label: "OYUN KURALLARI",
      blurb: "Sistemin çekirdeği — zarlar, nitelikler, savaş ve karakter gelişimi.",
      items: [
        { id: "oyun-sistemi",       title: "OYUN SİSTEMİ" },
        { id: "zarlar-eylemler",    title: "ZARLAR & EYLEMLER" },
        { id: "nitelikler",         title: "NİTELİKLER" },
        { id: "beceriler",          title: "BECERİLER" },
        { id: "enerjiler",          title: "ENERJİLER" },
        { id: "yetenekler",         title: "YETENEKLER" },
        { id: "ekipman",            title: "EKİPMAN" },
        { id: "savas-mucadele",     title: "SAVAŞ & MÜCADELE" },
        { id: "savas-sistemi",      title: "SAVAŞ SİSTEMİ" },
        { id: "karakter-gelisimi",  title: "KARAKTER GELİŞİMİ" },
        { id: "huner-kusurlar",     title: "HÜNER & KUSURLAR" },
        { id: "siniflar",           title: "SINIFLAR" },
      ],
    },

    "yetenekler": {
      label: "YETENEKLER",
      blurb: "Karakterlerin sahip olabileceği güçlerin ve uzmanlıkların kataloğu.",
      items: [
        {
          id: "enerjisel-yetenekler",
          title: "ENERJİSEL YETENEKLER",
          mode: "table",
          table: abilityTable([
            { _id: "r1", isim: "Alev Çağrısı",  tur: "Saldırı",  seviye: 2, maliyet: 15, aciklama: "Hedefe yoğun bir alev hüzmesi fırlatır. Temas ettiği yüzeyde kısa süreli yangın bırakır." },
            { _id: "r2", isim: "Akı Kalkanı",   tur: "Savunma",  seviye: 1, maliyet: 8,  aciklama: "Vücudun çevresinde enerji bir kalkan oluşturur ve gelen ilk darbeyi emer." },
            { _id: "r3", isim: "Boşluk Adımı",  tur: "Hareket",  seviye: 3, maliyet: 22, aciklama: "Kısa mesafeli anlık ışınlanma. Görüş hattındaki bir noktaya sıçrar." },
          ]),
        },
        { id: "fiziksel-yetenekler", title: "FİZİKSEL YETENEKLER", mode: "table", table: abilityTable([]) },
        { id: "savas-sanatlari",     title: "SAVAŞ SANATLARI",     mode: "table", table: abilityTable([]) },
        { id: "ozel-beceriler",      title: "ÖZEL BECERİLER",      mode: "table", table: abilityTable([]) },
        { id: "hunerler",            title: "HÜNERLER",            mode: "table", table: abilityTable([]) },
      ],
    },

    "evren-rehberi": {
      label: "EVREN REHBERİ",
      blurb: "Diyarlar, varlıklar ve yaratıklarla SLVNZ evreninin atlası.",
      /* HUB bölümü: items[] doğrudan içerik değil, birer SAYFADIR.
         Her sayfanın kendi yan menüsü (pages[]) ve o menüdeki içerikleri vardır.
         Yönlendirme:
           #/evren-rehberi                      -> sayfa kartları (ana menü)
           #/evren-rehberi/diyarlar             -> sayfa + yan menü (ilk bölüm)
           #/evren-rehberi/diyarlar/giris       -> belirli bölüm */
      type: "hub",
      items: [
        {
          id: "genel-evren", title: "GENEL EVREN",
          blurb: "Evrenin genel işleyişi, kozmolojisi ve temel kavramları.",
          pages: [
            { id: "giris", title: "GİRİŞ", mode: "text" },
          ],
        },
        {
          id: "diyarlar", title: "DİYARLAR",
          blurb: "Evreni oluşturan diyarlar, katmanlar ve düzlemler.",
          pages: [
            { id: "giris", title: "GİRİŞ", mode: "text" },
          ],
        },
        {
          id: "varliklar", title: "VARLIKLAR",
          blurb: "Evrende yaşayan akıllı ırklar, halklar ve varlıklar.",
          pages: [
            { id: "giris", title: "GİRİŞ", mode: "text" },
          ],
        },
        {
          id: "yaratiklar", title: "YARATIKLAR",
          blurb: "Vahşi yaratıklar ve canavarlardan oluşan bestiyer.",
          pages: [
            { id: "giris", title: "BESTİYER", mode: "creature-list", creatures: [] },
          ],
        },
      ],
    },
  },
};

/* ----------------------------------------------------------------------------
   Yer tutucu (placeholder) gövde metni.
   Henüz kendi metnini yazmadığın her öğeye otomatik olarak bu metin atanır.
   Kendi metnini yazmak için yukarıdaki ilgili öğeye `body: "..."` ekle.
   -------------------------------------------------------------------------- */
window.SLVNZ_PLACEHOLDER_BODY =
  "Bu bölümün açıklaması henüz yazılmadı. Buraya ilgili kuralların, tanımların " +
  "ve örneklerin geleceği yer tutucu bir metindir.\n\n" +
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod " +
  "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, " +
  "quis nostrud exercitation ullamco laboris.\n\n" +
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore " +
  "eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.";

/* Normalizasyon: metin öğelerine placeholder body ata; tablo öğelerini düzenle.
   HUB bölümlerinde içerik, sayfaların pages[] dizisindedir; oraya iner. */
(function normalize(c) {
  var rid = 0;
  function fix(it) {
    if (it.mode === "table") {
      if (!it.table) it.table = abilityTable([]);
      if (!Array.isArray(it.table.columns)) it.table.columns = [];
      if (!Array.isArray(it.table.rows)) it.table.rows = [];
      it.table.rows.forEach(function (r) {
        if (!r._id) r._id = "r" + (++rid) + "_" + Date.now().toString(36);
      });
    } else if (it.mode === "rich") {
      if (!Array.isArray(it.blocks)) it.blocks = [];
    } else if (it.mode === "creature-list") {
      if (!Array.isArray(it.creatures)) it.creatures = [];
    } else if (!it.body) {
      it.body = window.SLVNZ_PLACEHOLDER_BODY;
    }
  }
  Object.values(c.sections).forEach(function (sec) {
    if (sec.type === "hub") {
      sec.items.forEach(function (page) {
        if (!Array.isArray(page.pages)) page.pages = [];
        page.pages.forEach(fix);
      });
    } else {
      sec.items.forEach(fix);
    }
  });
})(window.SLVNZ_CONTENT);
