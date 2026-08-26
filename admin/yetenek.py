#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
SLVNZ — yetenekler: veri katmanı, doğrulama ve sayfa üretimi
============================================================
Üç görevi var:

1. **CRUD** — ``admin/db.py`` üzerinden yetenek ve sözlük satırlarını okur/yazar.
2. **Doğrulama** — panelden gelen her kayıt buradan geçer. Sunucu tarafı
   doğrulama, tarayıcı doğrulamasının kopyası değil ASLI'dır: form atlansa da
   veritabanına bozuk satır girmez.
3. **Üretim** — her yazımdan sonra ``content/yetenekler.json`` (kalıcı, git'e
   giren, diff'lenebilir kayıt) ve ``yetenekler.html``'in işaretli bölgeleri
   yeniden yazılır.

Neden statik üretim
-------------------
Site GitHub Pages'te duruyor; yayındaki sayfa bir veritabanına bağlanamaz.
Bu yüzden veritabanı YAZIM tarafında, üretilmiş HTML ise OKUMA tarafındadır —
panelin ``content/site.json`` için yaptığının aynısı.

Aşamalı iyileştirme
-------------------
Üretilen sayfada hem tablo satırları hem de yetenek KARTLARININ TAMAMI HTML
olarak bulunur. JS kapalıyken tablo bir dizin, kartlar da altında akan tam
metindir (satırdaki ad gerçek bir çapa bağlantısıdır). JS açıldığında
``assets/js/yetenekler.js`` kartları tek tek sağdaki panele taşır, aramayı,
süzgeci ve sıralamayı bağlar. Hiçbir veri yalnız JS ile görünür değildir.
"""

import html as html_mod
import json
import re
from pathlib import Path

import db

ROOT = Path(__file__).resolve().parent.parent
JSON_YOL = ROOT / 'content' / 'yetenekler.json'
SAYFA = ROOT / 'yetenekler.html'

# Panelden yönetilebilen sözlükler: tablo → (yazılabilir kolonlar, etiket)
SOZLUKLER = {
    'element':        (('ad', 'aciklama', 'sira'), 'Element'),
    'enerji_turu':    (('ad', 'sinif', 'aciklama', 'sira'), 'Enerji türü'),
    'kaynak_turu':    (('ad', 'aciklama', 'sira'), 'Kaynak türü'),
    'eylem_turu':     (('ad', 'kisa', 'sira'), 'Eylem türü'),
    'uzaklik_birimi': (('ad', 'kisa', 'varsayilan', 'sira'), 'Uzaklık birimi'),
    'sure_birimi':    (('ad', 'kisa', 'saniye', 'varsayilan', 'sira'), 'Süre birimi'),
    'alan_tipi':      (('ad', 'yukseklik_gerekir', 'olcu_adi', 'sira'), 'Alan tipi'),
    'yetkinlik':      (('ad', 'aciklama', 'sira'), 'Yetkinlik'),
}

ENERJI_SINIF = {'temel': 'Temel', 'ozel': 'Özel', 'yasak': 'Yasak'}


# ======================================================================= profil
# Kategoriler artık AYNI tabloyu paylaşmıyor. Fiziksel yetenekte element,
# enerji türü, kaynak türü, süre, ritüel ve söz/hareket/materyal üçlüsü yok;
# buna karşılık yetkinlik (silah türü) var ve kaynak hep Soluk olduğu için
# sütun "Soluk" başlığıyla yalnız tüketimi gösterir. Karma ikisinin birleşimi.
#
# Tablo sütunları, kart katmanları, süzgeç çubuğu, form alanları ve doğrulama
# HEP buradan türer. Üç yerin ayrışması bu dosyadaki en pahalı hata olurdu:
# formda görünmeyen bir alanı doğrulama zorunlu tutarsa kayıt hiç kaydedilemez.
VARSAYILAN_PROFIL = {
    'element': True,
    'enerji': True,
    'kaynak': True,          # kaynak TÜRÜ seçilir mi (yoksa sabit)
    'sure': True,
    'gereksinim': True,      # söz · hareket · materyal
    'yetkinlik': False,
    'nitelikler': (('ritual', 'R', 'Ritüel'),
                   ('konsantrasyon', 'K', 'Konsantrasyon')),
    'kaynak_basligi': 'Kaynak',
    'sabit_kaynak': None,
}

PROFILLER = {
    'fiziksel': {
        'element': False, 'enerji': False, 'kaynak': False, 'sure': False,
        'gereksinim': False, 'yetkinlik': True,
        # Ritüel yok; konsantrasyon aynı sütunda ama bu alanda "Odak" adıyla
        # ve O harfiyle görünür.
        'nitelikler': (('konsantrasyon', 'O', 'Odak'),),
        'kaynak_basligi': 'Soluk',
        'sabit_kaynak': 'Soluk',
    },
    'karma': {
        'yetkinlik': True,   # gerisi varsayılan: enerjisel alanların hepsi
    },
}


def profil(kod):
    p = dict(VARSAYILAN_PROFIL)
    p.update(PROFILLER.get(kod) or {})
    return p


def nitelikleri(y):
    """Yeteneğin taşıdığı nitelikler — (anahtar, harf, ad) üçlüleri.
    Harf ve ad KATEGORİYE bağlı: aynı `konsantrasyon` sütunu enerjisel alanda
    K/Konsantrasyon, fiziksel alanda O/Odak olarak okunur."""
    return [n for n in profil(y.get('kategori'))['nitelikler'] if y.get(n[0])]


def sutunlar(kod):
    """Kategorinin tablo başlıkları: (anahtar, etiket, sıralama türü)."""
    p = profil(kod)
    L = [('seviye', 'Sv.', 'sayi'),
         ('ad', 'Yetenek', 'metin'),
         ('eylem', 'Eylem Türü', 'metin')]
    if p['element']:
        L.append(('element', 'Element', 'metin'))
    if p['enerji']:
        L.append(('enerji', 'Enerji Türü', 'metin'))
    if p['sure']:
        L.append(('sure', 'Süre', 'sayi'))
    if p['yetkinlik']:
        L.append(('yetkinlik', 'Yetkinlik', 'metin'))
    if p['kaynak']:
        L.append(('kaynak', p['kaynak_basligi'], 'metin'))
    else:
        # Kaynak türü sabit: sütun yalnız tüketimi taşır, o yüzden sayısal.
        L.append(('soluk', p['kaynak_basligi'], 'sayi'))
    L.append(('menzil', 'Menzil', 'sayi'))
    return tuple(L)


# ---------------------------------------------------------------- yardımcılar
def esc(s):
    return html_mod.escape('' if s is None else str(s), quote=False)


def esc_attr(s):
    return html_mod.escape('' if s is None else str(s), quote=True)


def _int(v, dft=None):
    if v is None or v == '':
        return dft
    try:
        return int(v)
    except (TypeError, ValueError):
        return dft


def _bool(v):
    return 1 if v in (True, 1, '1', 'true', 'True', 'evet') else 0


def _metin(v, sinir=0):
    s = ('' if v is None else str(v)).replace('\r\n', '\n').replace('\r', '\n').strip()
    if sinir:
        s = s[:sinir]
    return s or None


# Arama alanı için katlama: büyük/küçük ve Türkçe aksan farkı arama sonucunu
# değiştirmesin ("ates" yazan "Ateş"i bulsun). yetenekler.js aynı tabloyu
# kullanır — iki taraf aynı metni üretmezse arama sessizce ıskalar.
_KATLA = str.maketrans({
    'ı': 'i', 'İ': 'i', 'I': 'i', 'i': 'i',
    'ş': 's', 'Ş': 's', 'ğ': 'g', 'Ğ': 'g',
    'ü': 'u', 'Ü': 'u', 'ö': 'o', 'Ö': 'o',
    'ç': 'c', 'Ç': 'c', 'â': 'a', 'Â': 'a',
    'î': 'i', 'Î': 'i', 'û': 'u', 'Û': 'u',
})


def katla(s):
    return ('' if s is None else str(s)).translate(_KATLA).lower()


def slug(s):
    """Yetenek adı → çapa kimliği parçası (ör. "Alev Mızrağı" → alev-mizragi).

    Kart çapaları veritabanı kimliğine DEĞİL ada bağlanır. Sebebi somut:
    veritabanı yeniden kurulduğunda (taze klon, MySQL'e geçiş) birincil
    anahtarlar yeniden atanır ve paylaşılmış her kart bağlantısı bozulurdu.
    Ad kategori içinde zaten tekil, kategori de kimliğin parçası."""
    g = re.sub(r'[^a-z0-9]+', '-', katla(s)).strip('-')
    return g or 'yetenek'


# ---------------------------------------------------------------- sözlükler
def sozluk():
    """Formun bütün seçim listeleri — tek çağrıda."""
    return {
        'kategori': db.sorgu('SELECT id, kod, ad, aciklama, sira FROM kategori ORDER BY sira, id'),
        'eylem_turu': db.sorgu('SELECT id, ad, kisa, sira FROM eylem_turu ORDER BY sira, id'),
        'element': db.sorgu('SELECT id, ad, aciklama, sira FROM element ORDER BY sira, id'),
        'enerji_turu': db.sorgu('SELECT id, ad, sinif, aciklama, sira FROM enerji_turu ORDER BY sira, id'),
        'kaynak_turu': db.sorgu('SELECT id, ad, aciklama, sira FROM kaynak_turu ORDER BY sira, id'),
        'uzaklik_birimi': db.sorgu('SELECT id, ad, kisa, varsayilan, sira FROM uzaklik_birimi ORDER BY sira, id'),
        'sure_birimi': db.sorgu('SELECT id, ad, kisa, saniye, varsayilan, sira FROM sure_birimi ORDER BY sira, id'),
        'alan_tipi': db.sorgu('SELECT id, ad, yukseklik_gerekir, olcu_adi, sira FROM alan_tipi ORDER BY sira, id'),
        'yetkinlik': db.sorgu('SELECT id, ad, aciklama, sira FROM yetkinlik ORDER BY sira, id'),
    }


def sozluk_kaydet(tablo, veri):
    """Sözlük satırı ekle/güncelle. Dönüş: (id, hatalar)."""
    if tablo not in SOZLUKLER:
        return None, ['Bilinmeyen liste: %s' % tablo]
    kolonlar = SOZLUKLER[tablo][0]
    ad = _metin(veri.get('ad'), 64)
    if not ad:
        return None, ['Ad boş olamaz']

    deger = {'ad': ad}
    if 'aciklama' in kolonlar:
        deger['aciklama'] = _metin(veri.get('aciklama'), 600)
    if 'kisa' in kolonlar:
        deger['kisa'] = _metin(veri.get('kisa'), 12)
    if 'olcu_adi' in kolonlar:
        deger['olcu_adi'] = _metin(veri.get('olcu_adi'), 32) or 'Yarıçap'
    if 'sinif' in kolonlar:
        s = (veri.get('sinif') or 'temel')
        if s not in ENERJI_SINIF:
            return None, ['Enerji sınıfı temel / ozel / yasak olmalı']
        deger['sinif'] = s
    if 'varsayilan' in kolonlar:
        deger['varsayilan'] = _bool(veri.get('varsayilan'))
    if 'yukseklik_gerekir' in kolonlar:
        deger['yukseklik_gerekir'] = _bool(veri.get('yukseklik_gerekir'))
    if 'saniye' in kolonlar:
        # Sıralamanın tek dayanağı; 0/negatif bütün süreleri eşitler.
        sn = _int(veri.get('saniye'))
        if sn is None or sn < 1:
            return None, ['Saniye karşılığı en az 1 olmalı']
        deger['saniye'] = sn
    yid = _int(veri.get('id'))
    if 'sira' in kolonlar:
        s = _int(veri.get('sira'))
        if s is None and not yid:
            # sıra verilmemiş YENİ kayıt listenin sonuna eklenir. 0 varsayarsak
            # tohum satırları 1..n olduğu için yeni kayıt listenin başına
            # düşüyordu — panelden ekleyen kişi onu en altta arıyor.
            son = db.tek('SELECT MAX(sira) AS m FROM %s' % tablo)
            s = int((son or {}).get('m') or 0) + 1
        if s is not None:
            deger['sira'] = s

    cak = db.tek('SELECT id FROM %s WHERE ad = ?' % tablo, (ad,))
    if cak and cak['id'] != yid:
        return None, ['"%s" bu listede zaten var' % ad]

    k = list(deger.keys())
    if yid:
        db.calistir('UPDATE %s SET %s WHERE id = ?' % (tablo, ', '.join(x + ' = ?' for x in k)),
                    [deger[x] for x in k] + [yid])
    else:
        yid = db.calistir('INSERT INTO %s (%s) VALUES (%s)' % (
            tablo, ', '.join(k), ', '.join('?' for _ in k)), [deger[x] for x in k])

    # tek varsayılan birim: yenisi işaretlenince ötekiler düşer
    if tablo in ('uzaklik_birimi', 'sure_birimi') and deger.get('varsayilan'):
        db.calistir('UPDATE %s SET varsayilan = 0 WHERE id <> ?' % tablo, (yid,))
    db.islem_bitir()
    return yid, []


def sozluk_sil(tablo, sid):
    """Sözlük satırı sil — kullanımdaysa reddet (yabancı anahtar hatasını
    kullanıcıya ham göstermek yerine sebebini söyleriz)."""
    if tablo not in SOZLUKLER:
        return ['Bilinmeyen liste: %s' % tablo]
    sid = _int(sid)
    if not sid:
        return ['Geçersiz kayıt']
    alan = {'element': 'element_id', 'enerji_turu': 'enerji_turu_id',
            'kaynak_turu': 'kaynak_turu_id', 'eylem_turu': 'eylem_turu_id',
            'alan_tipi': 'alan_tipi_id'}.get(tablo)
    if alan:
        n = db.tek('SELECT COUNT(*) AS n FROM yetenek WHERE %s = ?' % alan, (sid,))['n']
        if n:
            return ['Bu kayıt %d yetenekte kullanılıyor — önce onları değiştir' % n]
    if tablo == 'uzaklik_birimi':
        n = db.tek('SELECT COUNT(*) AS n FROM yetenek '
                   'WHERE menzil_birim_id = ? OR alan_birim_id = ?', (sid, sid))['n']
        if n:
            return ['Bu birim %d yetenekte kullanılıyor — önce onları değiştir' % n]
    if tablo == 'sure_birimi':
        n = db.tek('SELECT COUNT(*) AS n FROM yetenek WHERE sure_birim_id = ?', (sid,))['n']
        if n:
            return ['Bu birim %d yetenekte kullanılıyor — önce onları değiştir' % n]
    if tablo == 'yetkinlik':
        n = db.tek('SELECT COUNT(*) AS n FROM yetenek_yetkinlik WHERE yetkinlik_id = ?', (sid,))['n']
        if n:
            return ['Bu yetkinlik %d yetenekte kullanılıyor — önce onları değiştir' % n]
    db.calistir('DELETE FROM %s WHERE id = ?' % tablo, (sid,))
    db.islem_bitir()
    return []


# ---------------------------------------------------------------- okuma
_SELECT = '''
SELECT y.*,
       k.kod  AS kategori_kod,  k.ad  AS kategori_ad,
       e.ad   AS eylem_ad,      e.kisa AS eylem_kisa,
       el.ad  AS element_ad,
       en.ad  AS enerji_ad,     en.sinif AS enerji_sinif,
       kt.ad  AS kaynak_ad,
       mb.ad  AS mbirim_ad,     mb.kisa AS mbirim_kisa,
       sb.ad  AS sbirim_ad,     sb.kisa AS sbirim_kisa,   sb.saniye AS sbirim_sn,
       ab.ad  AS abirim_ad,     ab.kisa AS abirim_kisa,
       at.ad  AS atipi_ad,      at.olcu_adi AS atipi_olcu,
       at.yukseklik_gerekir AS atipi_yuk
  FROM yetenek y
  JOIN kategori       k  ON k.id  = y.kategori_id
  LEFT JOIN eylem_turu     e  ON e.id  = y.eylem_turu_id
  LEFT JOIN element        el ON el.id = y.element_id
  LEFT JOIN enerji_turu    en ON en.id = y.enerji_turu_id
  LEFT JOIN kaynak_turu    kt ON kt.id = y.kaynak_turu_id
  LEFT JOIN uzaklik_birimi mb ON mb.id = y.menzil_birim_id
  LEFT JOIN sure_birimi    sb ON sb.id = y.sure_birim_id
  LEFT JOIN uzaklik_birimi ab ON ab.id = y.alan_birim_id
  LEFT JOIN alan_tipi      at ON at.id = y.alan_tipi_id
'''


def _sar(r, materyaller, yetkinlikler=None):
    """Ham satır → panelin ve sayfanın okuduğu kayıt. Yazım da aynı biçimi
    kabul eder; okuma ile yazma biçiminin ayrışması hata kaynağıdır."""
    def ref(idk, adk, **ek):
        if not r.get(idk):
            return None
        out = {'id': r[idk], 'ad': r[adk]}
        out.update({k: v for k, v in ek.items() if v is not None})
        return out

    return {
        'id': r['id'],
        'kategori': r['kategori_kod'],
        'kategori_ad': r['kategori_ad'],
        'seviye': r['seviye'],
        'ad': r['ad'],
        'eylem_turu': ref('eylem_turu_id', 'eylem_ad', kisa=r.get('eylem_kisa')),
        'element': ref('element_id', 'element_ad'),
        'enerji_turu': ref('enerji_turu_id', 'enerji_ad', sinif=r.get('enerji_sinif')),
        'kaynak_turu': ref('kaynak_turu_id', 'kaynak_ad'),
        'kaynak_tuketimi': r['kaynak_tuketimi'],
        'menzil': {
            'tur': r['menzil_tur'],
            'deger': r['menzil_deger'],
            'birim': ref('menzil_birim_id', 'mbirim_ad', kisa=r.get('mbirim_kisa')),
        },
        'sure': {
            'tur': r['sure_tur'],
            'deger': r['sure_deger'],
            'birim': ref('sure_birim_id', 'sbirim_ad', kisa=r.get('sbirim_kisa'),
                         saniye=r.get('sbirim_sn')),
        },
        'alan': {
            'var': bool(r['alan_var']),
            'deger': r['alan_deger'],
            'birim': ref('alan_birim_id', 'abirim_ad', kisa=r.get('abirim_kisa')),
            'tipi': ref('alan_tipi_id', 'atipi_ad', olcu_adi=r.get('atipi_olcu'),
                        yukseklik_gerekir=bool(r.get('atipi_yuk'))),
            'yukseklik': r['alan_yukseklik'],
        },
        'ritual': bool(r['ritual']),
        'konsantrasyon': bool(r['konsantrasyon']),
        'yetkinlik': (yetkinlikler or {}).get(r['id'], []),
        'gereksinim': {
            'soz': {'gerekli': bool(r['soz_gerekli']), 'metin': r['soz_metin']},
            'hareket': {'gerekli': bool(r['hareket_gerekli']), 'metin': r['hareket_metin']},
            'materyal': {'gerekli': bool(r['materyal_gerekli']),
                         'liste': materyaller.get(r['id'], [])},
        },
        'aciklama': r['aciklama'],
        'dipnot': r['dipnot'],
    }


def liste(kategori=None):
    sql = _SELECT
    par = []
    if kategori:
        sql += ' WHERE k.kod = ?'
        par.append(kategori)
    satirlar = db.sorgu(sql, par)
    mat = {}
    for m in db.sorgu('SELECT yetenek_id, ad FROM yetenek_materyal ORDER BY yetenek_id, sira, id'):
        mat.setdefault(m['yetenek_id'], []).append(m['ad'])
    yet = {}
    for w in db.sorgu('SELECT yy.yetenek_id, y.id, y.ad FROM yetenek_yetkinlik yy '
                      'JOIN yetkinlik y ON y.id = yy.yetkinlik_id '
                      'ORDER BY yy.yetenek_id, yy.sira, yy.id'):
        yet.setdefault(w['yetenek_id'], []).append({'id': w['id'], 'ad': w['ad']})
    kayitlar = [_sar(r, mat, yet) for r in satirlar]
    kayitlar.sort(key=lambda y: (y['seviye'], db.tr_anahtar(y['ad'])))
    return kayitlar


def getir(yid):
    r = db.tek(_SELECT + ' WHERE y.id = ?', (_int(yid),))
    if not r:
        return None
    mat = {r['id']: [m['ad'] for m in db.sorgu(
        'SELECT ad FROM yetenek_materyal WHERE yetenek_id = ? ORDER BY sira, id', (r['id'],))]}
    yet = {r['id']: [{'id': w['id'], 'ad': w['ad']} for w in db.sorgu(
        'SELECT y.id, y.ad FROM yetenek_yetkinlik yy JOIN yetkinlik y ON y.id = yy.yetkinlik_id '
        'WHERE yy.yetenek_id = ? ORDER BY yy.sira, yy.id', (r['id'],))]}
    return _sar(r, mat, yet)


# ---------------------------------------------------------------- doğrulama
def _var_mi(tablo, sid):
    return bool(sid) and bool(db.tek('SELECT id FROM %s WHERE id = ?' % tablo, (sid,)))


def dogrula(v):
    """Panelden gelen kayıt → (alanlar, materyal, yetkinlik, hatalar).

    Kategorinin profilinde OLMAYAN alanlar burada susturulur: formda
    görünmeyen bir alanı zorunlu tutmak kaydı imkânsız kılar, gelen çöp veriyi
    saklamak da kategori değiştiğinde eski alanların geri gelmesine yol açar.
    Her iki yönde de tek doğru yer burasıdır."""
    h = []
    prf = profil(v.get('kategori'))
    kat = db.tek('SELECT id FROM kategori WHERE kod = ?', (v.get('kategori'),))
    if not kat:
        h.append('Kategori seçilmeli (enerjisel / fiziksel / karma)')

    ad = _metin(v.get('ad'), 160)
    if not ad:
        h.append('Yetenek adı boş olamaz')

    seviye = _int(v.get('seviye'), None)
    if seviye is None or seviye < 0:
        h.append('Yetenek seviyesi 0 ya da daha büyük bir tam sayı olmalı')

    eylem = _int((v.get('eylem_turu') or {}).get('id') if isinstance(v.get('eylem_turu'), dict)
                 else v.get('eylem_turu'))
    if not _var_mi('eylem_turu', eylem):
        h.append('Eylem türü seçilmeli')

    def ref(alan, tablo, zorunlu=False, etiket=''):
        ham = v.get(alan)
        sid = _int(ham.get('id') if isinstance(ham, dict) else ham)
        if sid and not _var_mi(tablo, sid):
            h.append('%s listede yok' % (etiket or alan))
            return None
        if zorunlu and not sid:
            h.append('%s seçilmeli' % (etiket or alan))
        return sid

    element = ref('element', 'element', etiket='Element')
    enerji = ref('enerji_turu', 'enerji_turu', etiket='Enerji türü')
    kaynak = ref('kaynak_turu', 'kaynak_turu', etiket='Kaynak türü')

    # Profilde olmayan alanlar sessizce düşer.
    if not prf['element']:
        element = None
    if not prf['enerji']:
        enerji = None

    # Enerjisel yetenekte element/enerji/kaynak üçlüsü kimliğin kendisidir.
    if kat and v.get('kategori') == 'enerjisel':
        for sid, etiket in ((element, 'Element'), (enerji, 'Enerji türü'), (kaynak, 'Kaynak türü')):
            if not sid:
                h.append('Enerjisel yetenekte %s seçilmeli' % etiket.lower())

    # Kaynak türü sabit olan alanda (fiziksel → Soluk) seçim yapılmaz: tür
    # addan bulunur, yoksa yaratılmaz — sözlükten silinmişse hata söylenir.
    if prf['sabit_kaynak']:
        sbt = db.tek('SELECT id FROM kaynak_turu WHERE ad = ?', (prf['sabit_kaynak'],))
        if sbt:
            kaynak = sbt['id']
        else:
            kaynak = None
            h.append('"%s" kaynak türü listede yok — Listeler bölümünden ekle'
                     % prf['sabit_kaynak'])

    tuketim = _int(v.get('kaynak_tuketimi'), 0) or 0
    if tuketim < 0:
        h.append('Kaynak tüketimi 0’ın altına düşemez')
    if tuketim and not kaynak:
        h.append('Kaynak tüketimi girildi ama kaynak türü seçilmedi')

    # -- menzil ---------------------------------------------------------
    m = v.get('menzil') or {}
    mtur = m.get('tur') or 'kendin'
    if mtur not in ('kendin', 'mesafe'):
        h.append('Menzil türü "kendin" ya da "mesafe" olmalı')
        mtur = 'kendin'
    mdeger = mbirim = None
    if mtur == 'mesafe':
        mdeger = _int(m.get('deger'))
        if mdeger is None or mdeger < 1:
            h.append('Menzil en az 1 olmalı (ya da "Kendin" seç)')
        mbirim = _int((m.get('birim') or {}).get('id') if isinstance(m.get('birim'), dict)
                      else m.get('birim'))
        if not _var_mi('uzaklik_birimi', mbirim):
            h.append('Menzil birimi seçilmeli')
            mbirim = None

    # -- süre -------------------------------------------------------------
    # Menzille aynı kalıp: 'anlik' değer istemez, 'sureli' değer + birim ister.
    sr = (v.get('sure') or {}) if prf['sure'] else {}
    stur = sr.get('tur') or 'anlik'
    if stur not in ('anlik', 'sureli'):
        h.append('Süre türü "anlik" ya da "sureli" olmalı')
        stur = 'anlik'
    sdeger = sbirim = None
    if stur == 'sureli':
        sdeger = _int(sr.get('deger'))
        if sdeger is None or sdeger < 1:
            h.append('Süre en az 1 olmalı (ya da "Anlık" seç)')
        sbirim = _int((sr.get('birim') or {}).get('id') if isinstance(sr.get('birim'), dict)
                      else sr.get('birim'))
        if not _var_mi('sure_birimi', sbirim):
            h.append('Süre birimi seçilmeli')
            sbirim = None

    # -- alan ------------------------------------------------------------
    a = v.get('alan') or {}
    avar = _bool(a.get('var'))
    adeger = abirim = atipi = ayuk = None
    if avar:
        adeger = _int(a.get('deger'))
        if adeger is None or adeger < 1:
            h.append('Alan ölçüsü en az 1 olmalı (ya da "Yok" seç)')
        abirim = _int((a.get('birim') or {}).get('id') if isinstance(a.get('birim'), dict)
                      else a.get('birim'))
        if not _var_mi('uzaklik_birimi', abirim):
            h.append('Alan birimi seçilmeli')
            abirim = None
        atipi = _int((a.get('tipi') or {}).get('id') if isinstance(a.get('tipi'), dict)
                     else a.get('tipi'))
        if not _var_mi('alan_tipi', atipi):
            h.append('Alan tipi seçilmeli')
            atipi = None
        else:
            t = db.tek('SELECT yukseklik_gerekir, ad FROM alan_tipi WHERE id = ?', (atipi,))
            if t['yukseklik_gerekir']:
                ayuk = _int(a.get('yukseklik'))
                if ayuk is None or ayuk < 1:
                    h.append('%s biçiminde yükseklik en az 1 olmalı' % t['ad'])

    # -- söz / hareket / materyal ----------------------------------------
    g = (v.get('gereksinim') or {}) if prf['gereksinim'] else {}
    soz = g.get('soz') or {}
    hrk = g.get('hareket') or {}
    mtl = g.get('materyal') or {}

    soz_g, soz_m = _bool(soz.get('gerekli')), _metin(soz.get('metin'), 2000)
    hrk_g, hrk_m = _bool(hrk.get('gerekli')), _metin(hrk.get('metin'), 2000)
    mtl_g = _bool(mtl.get('gerekli'))
    liste_mat = [x for x in (_metin(s, 200) for s in (mtl.get('liste') or [])) if x]

    if soz_g and not soz_m:
        h.append('Söz gerekliyse sarf edilecek sözler yazılmalı')
    if hrk_g and not hrk_m:
        h.append('Hareket gerekliyse hareketin betimlemesi yazılmalı')
    if mtl_g and not liste_mat:
        h.append('Materyal gerekliyse en az bir materyal yazılmalı')
    if not soz_g:
        soz_m = None
    if not hrk_g:
        hrk_m = None
    if not mtl_g:
        liste_mat = []

    # Ritüel ve konsantrasyon birbirinden bağımsız iki nitelik; kısıtı yok,
    # yalnız profilde bulunmayan bayrak kapatılır (fiziksel alanda ritüel yok).
    nitelik_anahtarlari = {n[0] for n in prf['nitelikler']}
    ritual = _bool(v.get('ritual')) if 'ritual' in nitelik_anahtarlari else False
    konsantrasyon = (_bool(v.get('konsantrasyon'))
                     if 'konsantrasyon' in nitelik_anahtarlari else False)

    # -- yetkinlik (silah türleri) ---------------------------------------
    yetkinlikler = []
    if prf['yetkinlik']:
        gorulen = set()
        for x in (v.get('yetkinlik') or []):
            wid = _int(x.get('id') if isinstance(x, dict) else x)
            if not wid or wid in gorulen:
                continue
            if not _var_mi('yetkinlik', wid):
                h.append('Yetkinlik listede yok (id %s)' % wid)
                continue
            gorulen.add(wid)
            yetkinlikler.append(wid)

    aciklama = _metin(v.get('aciklama'), 8000)
    dipnot = _metin(v.get('dipnot'), 4000)

    # -- ad tekilliği (kategori içinde) ----------------------------------
    yid = _int(v.get('id'))
    if kat and ad:
        cak = db.tek('SELECT id FROM yetenek WHERE kategori_id = ? AND ad = ?', (kat['id'], ad))
        if cak and cak['id'] != yid:
            h.append('Bu kategoride "%s" adlı bir yetenek zaten var' % ad)

    alanlar = {
        'kategori_id': kat['id'] if kat else None,
        'seviye': seviye if seviye is not None and seviye >= 0 else 0,
        'ad': ad,
        'eylem_turu_id': eylem,
        'element_id': element,
        'enerji_turu_id': enerji,
        'kaynak_turu_id': kaynak,
        'kaynak_tuketimi': max(0, tuketim),
        'menzil_tur': mtur,
        'menzil_deger': mdeger if mtur == 'mesafe' else None,
        'menzil_birim_id': mbirim if mtur == 'mesafe' else None,
        'sure_tur': stur,
        'sure_deger': sdeger if stur == 'sureli' else None,
        'sure_birim_id': sbirim if stur == 'sureli' else None,
        'alan_var': avar,
        'alan_deger': adeger if avar else None,
        'alan_birim_id': abirim if avar else None,
        'alan_tipi_id': atipi if avar else None,
        'alan_yukseklik': ayuk if avar else None,
        'ritual': ritual, 'konsantrasyon': konsantrasyon,
        'soz_gerekli': soz_g, 'soz_metin': soz_m,
        'hareket_gerekli': hrk_g, 'hareket_metin': hrk_m,
        'materyal_gerekli': mtl_g,
        'aciklama': aciklama, 'dipnot': dipnot,
        'sira': _int(v.get('sira'), 0) or 0,
    }
    return alanlar, liste_mat, yetkinlikler, h


# ---------------------------------------------------------------- yazma
def kaydet(v):
    """Yetenek ekle/güncelle. Dönüş: (id, hatalar)."""
    alanlar, materyaller, yetkinlikler, h = dogrula(v)
    if h:
        return None, h
    yid = _int(v.get('id'))
    simdi = db.simdi()
    try:
        if yid:
            if not db.tek('SELECT id FROM yetenek WHERE id = ?', (yid,)):
                return None, ['Yetenek bulunamadı (id %s)' % yid]
            alanlar['guncelleme'] = simdi
            k = list(alanlar.keys())
            db.calistir('UPDATE yetenek SET %s WHERE id = ?' % ', '.join(x + ' = ?' for x in k),
                        [alanlar[x] for x in k] + [yid])
            db.calistir('DELETE FROM yetenek_materyal WHERE yetenek_id = ?', (yid,))
            db.calistir('DELETE FROM yetenek_yetkinlik WHERE yetenek_id = ?', (yid,))
        else:
            alanlar['olusturma'] = alanlar['guncelleme'] = simdi
            k = list(alanlar.keys())
            yid = db.calistir('INSERT INTO yetenek (%s) VALUES (%s)' % (
                ', '.join(k), ', '.join('?' for _ in k)), [alanlar[x] for x in k])
        for i, m in enumerate(materyaller):
            db.calistir('INSERT INTO yetenek_materyal (yetenek_id, sira, ad) VALUES (?, ?, ?)',
                        (yid, i, m))
        for i, w in enumerate(yetkinlikler):
            db.calistir('INSERT INTO yetenek_yetkinlik (yetenek_id, yetkinlik_id, sira) '
                        'VALUES (?, ?, ?)', (yid, w, i))
        db.islem_bitir()
    except Exception as e:
        db.islem_geri()
        return None, ['Veritabanı yazımı başarısız: %s' % e]
    return yid, []


def sil(yid):
    yid = _int(yid)
    if not yid or not db.tek('SELECT id FROM yetenek WHERE id = ?', (yid,)):
        return ['Yetenek bulunamadı']
    # SQLite'ta ON DELETE CASCADE için PRAGMA açık, ama silmeyi açıkça
    # yazmak sürücüden bağımsız aynı sonucu verir
    db.calistir('DELETE FROM yetenek_materyal WHERE yetenek_id = ?', (yid,))
    db.calistir('DELETE FROM yetenek_yetkinlik WHERE yetenek_id = ?', (yid,))
    db.calistir('DELETE FROM yetenek WHERE id = ?', (yid,))
    db.islem_bitir()
    return []


# ---------------------------------------------------------------- gösterim
def kart_kimlik(y):
    """Kartın çapası ve satır–kart eşleşme anahtarı. Tek yerden üretilir:
    tablo satırı ile kart farklı kimlik üretirse tıklama sessizce ölür."""
    return 'y-%s-%s' % (y['kategori'], slug(y['ad']))


def menzil_metin(y, kisa=False):
    m = y['menzil']
    if m['tur'] != 'mesafe' or not m.get('deger'):
        return 'Kendin'
    b = m.get('birim') or {}
    ad = (b.get('kisa') if kisa else b.get('ad')) or b.get('ad') or ''
    return ('%d %s' % (m['deger'], ad)).strip()


def sure_metin(y, kisa=False):
    sr = y.get('sure') or {}
    if sr.get('tur') != 'sureli' or not sr.get('deger'):
        return 'Anlık'
    b = sr.get('birim') or {}
    ad = (b.get('kisa') if kisa else b.get('ad')) or b.get('ad') or ''
    return ('%d %s' % (sr['deger'], ad)).strip()


def sure_saniye(y):
    """Süre sütununun sıralama değeri — saniyeye indirgenmiş.

    Ham değerle sıralamak birimleri karıştırırdı: "2 Saat" (7200 sn) ile
    "3 Tur" (18 sn) arasında 2 < 3 çıkardı. "Anlık" −1'dir, yani artan
    sıralamada en başa gelir; menzildeki "Kendin" ile aynı deyim."""
    sr = y.get('sure') or {}
    if sr.get('tur') != 'sureli' or not sr.get('deger'):
        return -1
    return (sr['deger'] or 0) * ((sr.get('birim') or {}).get('saniye') or 1)


def alan_metin(y, kisa=False):
    a = y['alan']
    if not a['var'] or not a.get('deger'):
        return 'Yok'
    b = a.get('birim') or {}
    t = a.get('tipi') or {}
    birim = (b.get('kisa') if kisa else b.get('ad')) or b.get('ad') or ''
    olcu = (t.get('olcu_adi') or 'Yarıçap').lower()
    parca = '%s · %d %s %s' % (t.get('ad') or 'Alan', a['deger'], birim, olcu)
    if a.get('yukseklik'):
        parca += ', %d %s yükseklik' % (a['yukseklik'], birim)
    return parca.strip()


def kaynak_metin(y):
    k = y.get('kaynak_turu')
    if not k:
        return '—'
    if y.get('kaynak_tuketimi'):
        return '%s - %d' % (k['ad'], y['kaynak_tuketimi'])
    return k['ad']


def shm_kodu(y):
    """Söz-Hareket-Materyal rozeti: gerekli olanların baş harfi."""
    g = y['gereksinim']
    return ''.join(h for h, k in (('S', 'soz'), ('H', 'hareket'), ('M', 'materyal'))
                   if g[k]['gerekli']) or '—'


def arama_metni(y):
    """Arama kutusunun taradığı tek satır — katlanmış (aksansız, küçük)."""
    p = [y['ad'], str(y['seviye']), y.get('aciklama') or '', y.get('dipnot') or '']
    for k in ('eylem_turu', 'element', 'enerji_turu', 'kaynak_turu'):
        if y.get(k):
            p.append(y[k]['ad'])
    for w in (y.get('yetkinlik') or []):
        p.append(w['ad'])
    p.append(menzil_metin(y))
    if profil(y.get('kategori'))['sure']:
        p.append(sure_metin(y))
    p.append(alan_metin(y))
    if y.get('ritual'):
        p.append('ritüel')
    if y.get('konsantrasyon'):
        p.append('konsantrasyon')
    g = y['gereksinim']
    if g['soz']['gerekli']:
        p += ['söz', g['soz']['metin'] or '']
    if g['hareket']['gerekli']:
        p += ['hareket', g['hareket']['metin'] or '']
    if g['materyal']['gerekli']:
        p += ['materyal'] + list(g['materyal']['liste'])
    # tek satıra indir: açıklamadaki paragraf boşlukları niteliğin içine
    # ham satır sonu olarak düşüyor ve üretilen HTML'i okunmaz kılıyordu
    return re.sub(r'\s+', ' ', katla(' '.join(x for x in p if x))).strip()


def _paragraflar(metin, sinif=''):
    """Düz metin → <p> dizisi. Boş satır paragrafı böler, tek satır sonu <br>
    olur. HTML kaçırılır: yetenek metinleri veri, işaretleme değil."""
    if not metin:
        return []
    s = ' class="%s"' % sinif if sinif else ''
    out = []
    for blok in re.split(r'\n\s*\n', metin.strip()):
        govde = '<br>'.join(esc(x) for x in blok.split('\n') if x.strip())
        if govde:
            out.append('<p%s>%s</p>' % (s, govde))
    return out


# ---------------------------------------------------------------- HTML üretimi
def yetkinlik_metin(y):
    """Yetkinlik sütunu: birden çok silah türü orta noktayla ayrılır."""
    w = y.get('yetkinlik') or []
    return ' · '.join(x['ad'] for x in w) if w else '—'


# Hücreyi de başlığı da `sutunlar()` sırası çizer; ikisi ayrı listelerden
# üretilseydi bir kategoriye sütun eklemek ötekinde kaymaya yol açardı.
_HUCRE = {
    'eylem':     lambda y: (esc((y.get('eylem_turu') or {}).get('ad') or '—'), ''),
    'element':   lambda y: (esc((y.get('element') or {}).get('ad') or '—'), ''),
    'enerji':    lambda y: (esc((y.get('enerji_turu') or {}).get('ad') or '—'), ''),
    'sure':      lambda y: (esc(sure_metin(y, kisa=True)), ' class="ytablo__sure"'),
    'yetkinlik': lambda y: (esc(yetkinlik_metin(y)), ' class="ytablo__yetkinlik"'),
    'kaynak':    lambda y: (esc(kaynak_metin(y)), ' class="ytablo__kaynak"'),
    'soluk':     lambda y: (esc(str(y.get('kaynak_tuketimi') or 0)), ' class="ytablo__soluk"'),
    'menzil':    lambda y: (esc(menzil_metin(y, kisa=True)), ' class="ytablo__menzil"'),
}


def _satir(y):
    """Tablo satırı. data-* nitelikleri sıralama/süzme/arama için — JS ham
    değeri okur, gösterilen metni değil (18 m ile 9 m doğru sıralansın).

    Sütunlar kategoriye göre değişir (bkz. profil); nitelikler ise HEP yazılır.
    Süzülmeyen bir data-* niteliğinin bedeli birkaç bayt, eksik olanınki ise
    sessizce çalışmayan bir süzgeç."""
    m = y['menzil']
    menzil_sayi = -1 if m['tur'] != 'mesafe' else (m.get('deger') or 0)
    a = [
        ('data-yid', kart_kimlik(y)),
        ('data-seviye', y['seviye']),
        ('data-ad', katla(y['ad'])),
        ('data-eylem', (y.get('eylem_turu') or {}).get('ad') or ''),
        ('data-element', (y.get('element') or {}).get('ad') or ''),
        ('data-enerji', (y.get('enerji_turu') or {}).get('ad') or ''),
        ('data-sure', sure_saniye(y)),
        ('data-yetkinlik', yetkinlik_metin(y) if (y.get('yetkinlik') or []) else ''),
        ('data-ritual', 1 if y.get('ritual') else 0),
        ('data-konsantrasyon', 1 if y.get('konsantrasyon') else 0),
        ('data-kaynak', (y.get('kaynak_turu') or {}).get('ad') or ''),
        ('data-soluk', y.get('kaynak_tuketimi') or 0),
        ('data-tuketim', y.get('kaynak_tuketimi') or 0),
        ('data-menzil', menzil_sayi),
        ('data-ara', arama_metni(y)),
    ]
    nit = ' '.join('%s="%s"' % (k, esc_attr(v)) for k, v in a)
    kid = kart_kimlik(y)
    bayrak = ''.join(
        '<span class="ybayrak" data-nitelik="%s" title="%s">%s</span>'
        % (esc_attr(anahtar), esc_attr(ad), esc(harf))
        for anahtar, harf, ad in nitelikleri(y))

    L = ['            <tr class="ytablo__satir" %s>' % nit]
    for anahtar, _etiket, _tur in sutunlar(y['kategori']):
        if anahtar == 'seviye':
            L.append('              <td class="ytablo__lvl">%d</td>' % y['seviye'])
        elif anahtar == 'ad':
            L.append('              <th class="ytablo__ad" scope="row">'
                     '<a class="ytablo__link" href="#%s">%s</a>%s</th>'
                     % (esc_attr(kid), esc(y['ad']), bayrak))
        else:
            metin, sinif = _HUCRE[anahtar](y)
            L.append('              <td%s>%s</td>' % (sinif, metin))
    L.append('            </tr>')
    return '\n'.join(L)


def _kart(y):
    """Yetenek kartı: okuma hiyerarşisine göre dizilmiş tam kayıt.

    Sıra kasıtlı — kimlik (seviye, ad, tür etiketleri) → mekanik (kaynak,
    menzil, alan) → bedel (söz-hareket-materyal) → anlatı (açıklama) →
    kenar not (dipnot). Tabloda görünen alanlar da kartta tekrar eder;
    kart tek başına okunabilir olmalı."""
    kid = kart_kimlik(y)
    g = y['gereksinim']
    L = ['        <article class="ykart" id="%s" data-ykart="%s" tabindex="-1">'
         % (esc_attr(kid), esc_attr(kid))]

    # -- kimlik
    L += [
        '          <header class="ykart__head">',
        '            <p class="ykart__eyebrow">',
        '              <span class="ykart__lvl">Seviye %d</span>' % y['seviye'],
        '              <span class="ykart__kat">%s</span>' % esc(y['kategori_ad'].replace(' Yetenekler', '')),
        '            </p>',
        '            <h3 class="ykart__ad">%s</h3>' % esc(y['ad']),
        '            <p class="ykart__etiketler">',
    ]
    et = y.get('eylem_turu')
    if et:
        L.append('              <span class="yet-tag yet-tag--eylem">%s</span>' % esc(et['ad']))
    if y.get('element'):
        L.append('              <span class="yet-tag yet-tag--element">%s</span>' % esc(y['element']['ad']))
    if y.get('enerji_turu'):
        en = y['enerji_turu']
        L.append('              <span class="yet-tag yet-tag--enerji" data-sinif="%s">%s</span>'
                 % (esc_attr(en.get('sinif') or 'temel'), esc(en['ad'])))
    # tabloda harf, kartta sözcük — kart tek başına okunabilir olmalı
    for anahtar, _harf, ad in nitelikleri(y):
        L.append('              <span class="yet-tag yet-tag--nitelik" data-nitelik="%s">%s</span>'
                 % (esc_attr(anahtar), esc(ad)))
    L += ['            </p>', '          </header>']

    # -- mekanik
    prf = profil(y['kategori'])
    kunye = []
    if prf['yetkinlik']:
        kunye.append(('Yetkinlik', yetkinlik_metin(y)))
    # Kaynak türü sabitse başlık türün kendisi olur ("Soluk"), değer tüketim
    kunye.append((prf['kaynak_basligi'],
                  kaynak_metin(y) if prf['kaynak'] else str(y.get('kaynak_tuketimi') or 0)))
    if prf['sure']:
        kunye.append(('Süre', sure_metin(y)))
    kunye += [('Menzil', menzil_metin(y)), ('Alan', alan_metin(y))]

    L.append('          <dl class="ykart__stats">')
    for etiket, deger in kunye:
        L += ['            <div class="ykart__stat">',
              '              <dt>%s</dt>' % esc(etiket),
              '              <dd>%s</dd>' % esc(deger),
              '            </div>']
    L.append('          </dl>')

    # -- bedel: söz · hareket · materyal (profilde varsa)
    if prf['gereksinim']:
        L += _kart_gereksinim(g)

    # -- anlatı
    if y.get('aciklama'):
        L.append('          <div class="ykart__aciklama">')
        L += ['            ' + q for q in _paragraflar(y['aciklama'])]
        L.append('          </div>')

    # -- kenar not
    if y.get('dipnot'):
        L += ['          <aside class="ykart__dipnot">',
              '            <p class="ykart__getiket">Dipnot</p>']
        L += ['            ' + q for q in _paragraflar(y['dipnot'])]
        L.append('          </aside>')

    L.append('        </article>')
    return '\n'.join(L)


def _kart_gereksinim(g):
    """Söz · hareket · materyal katmanı — satır listesi döner.

    Yalnız profilinde gereksinim olan kategorilerde çağrılır; fiziksel
    yetenekte bu katman hiç yoktur."""
    L = ['          <section class="ykart__ger">',
         '            <h4 class="ykart__bas">Gereksinimler</h4>',
         '            <p class="ykart__shm">']
    for harf, anahtar, ad in (('S', 'soz', 'Söz'), ('H', 'hareket', 'Hareket'),
                              ('M', 'materyal', 'Materyal')):
        var = g[anahtar]['gerekli']
        L.append('              <span class="shm %s" title="%s%s">%s</span>'
                 % ('is-on' if var else 'is-off', esc_attr(ad),
                    ' gerekli' if var else ' gerekmiyor', harf))
    L.append('            </p>')

    if g['soz']['gerekli']:
        L += ['            <div class="ykart__gsat">',
              '              <p class="ykart__getiket">Söz</p>',
              '              <blockquote class="ykart__soz">']
        L += ['                ' + q for q in _paragraflar(g['soz']['metin'])]
        L += ['              </blockquote>', '            </div>']
    if g['hareket']['gerekli']:
        L += ['            <div class="ykart__gsat">',
              '              <p class="ykart__getiket">Hareket</p>']
        L += ['              ' + q for q in _paragraflar(g['hareket']['metin'])]
        L.append('            </div>')
    if g['materyal']['gerekli'] and g['materyal']['liste']:
        L += ['            <div class="ykart__gsat">',
              '              <p class="ykart__getiket">Materyal</p>',
              '              <ul class="ykart__mat">']
        L += ['                <li>%s</li>' % esc(m) for m in g['materyal']['liste']]
        L += ['              </ul>', '            </div>']
    if not any(g[k]['gerekli'] for k in ('soz', 'hareket', 'materyal')):
        L.append('            <p class="ykart__yok">Söz, hareket ya da materyal gerektirmez.</p>')
    L.append('          </section>')
    return L


def _secenekler(ad, etiket, degerler, kapsar=False):
    """Açılır süzgeç. `kapsar=True` ise satırın değeri TEK bir ad değil bir
    liste ("Kılıç · Balta"); eşleşme tam değil kapsayan olur."""
    L = ['            <label class="yfiltre">',
         '              <span class="yfiltre__label">%s</span>' % esc(etiket),
         '              <select class="yfiltre__sel" data-yfiltre="%s"%s>'
         % (esc_attr(ad), ' data-ykapsar' if kapsar else ''),
         '                <option value="">Hepsi</option>']
    for d in degerler:
        L.append('                <option value="%s">%s</option>' % (esc_attr(d), esc(d)))
    L += ['              </select>', '            </label>']
    return '\n'.join(L)


def _kutular(kayitlar, prf):
    """Nitelik süzgeçleri — onay kutusu olarak.

    Öteki süzgeçlerle aynı kural: seçenek yalnız o kategoride GERÇEKTEN
    kullanılıyorsa üretilir. Hiçbir yetenek ritüel değilse "Ritüel" kutusu da
    olmaz; sonucu hep boş çıkan bir süzgeç kullanıcıyı yanıltır."""
    var = [n for n in prf['nitelikler'] if any(y.get(n[0]) for y in kayitlar)]
    if not var:
        return ''
    L = ['            <div class="yfnitelik">',
         '              <span class="yfiltre__label">Nitelik</span>',
         '              <div class="yfnitelik__kutular">']
    # Kutu yalnız HARF gösterir, sözcüğü değil: sözcüklerle çubuk 1000px'de
    # ikinci satıra taşıyor ve kartın ekrana sığması için kazanılan 56px geri
    # gidiyordu. Harf kriptik değil — tablo hemen altında aynı rozeti adın
    # yanında taşıyor; kartın S·H·M rozeti de aynı deyimi kullanıyor.
    # Sözcük `title` ve ekran okuyucu metniyle duruyor.
    for anahtar, harf, ad in var:
        L += ['                <label class="ybkutu" title="Yalnız %s olanları göster">' % esc_attr(ad),
              '                  <input type="checkbox" data-ykutu="%s">' % esc_attr(anahtar),
              '                  <span class="ybkutu__im" aria-hidden="true">%s</span>' % esc(harf),
              '                  <span class="visually-hidden">%s</span>' % esc(ad),
              '                </label>']
    L += ['              </div>', '            </div>']
    return '\n'.join(L)


def _bolum(kat, kayitlar, i):
    """Bir kategorinin tam paneli: süzgeç çubuğu + tablo + kartlar."""
    no = '%02d' % (i + 1)
    kod = kat['kod']
    L = ['      <article class="panel" id="%s" aria-labelledby="b%s" tabindex="-1" data-panel>'
         % (esc_attr(kod), no),
         '        <header class="panel__head">',
         '          <p class="panel__no" aria-hidden="true">%s</p>' % no,
         '          <h2 class="panel__title" id="b%s">%s</h2>' % (no, esc(kat['ad'])),
         '        </header>']
    if kat.get('aciklama'):
        L.append('        <p class="panel__lede">%s</p>' % esc(kat['aciklama']))

    if not kayitlar:
        L += ['        <p class="yet__bos">Bu alanda henüz yetenek yok. '
              'Yönetim panelindeki <strong>Yetenekler</strong> görünümünden ekleyebilirsin.</p>',
              '      </article>']
        return '\n'.join(L)

    prf = profil(kod)

    def benzersiz(anahtar):
        s = {(y.get(anahtar) or {}).get('ad') for y in kayitlar}
        return sorted((x for x in s if x), key=db.tr_anahtar)

    L += ['        <div class="yet" data-yet="%s">' % esc_attr(kod),
          '          <div class="yet__bar">',
          '            <label class="yara">',
          '              <span class="yara__label">Ara</span>',
          '              <input class="yara__input" type="search" data-yara',
          '                     placeholder="Yetenek, element, enerji, açıklama…"',
          '                     autocomplete="off" spellcheck="false">',
          '            </label>']
    L.append(_secenekler('eylem', 'Eylem', benzersiz('eylem_turu')))
    if prf['element']:
        L.append(_secenekler('element', 'Element', benzersiz('element')))
    if prf['enerji']:
        L.append(_secenekler('enerji', 'Enerji', benzersiz('enerji_turu')))
    if prf['yetkinlik']:
        # yetkinlik çoklu: süzgeç TEK bir türe göre eşleşir, satırın listesinde
        # o tür geçiyorsa satır kalır (bkz. yetenekler.js — kapsayan eşleşme)
        adlar = sorted({w['ad'] for y in kayitlar for w in (y.get('yetkinlik') or [])},
                       key=db.tr_anahtar)
        if adlar:
            L.append(_secenekler('yetkinlik', 'Yetkinlik', adlar, kapsar=True))
    if prf['kaynak']:
        L.append(_secenekler('kaynak', 'Kaynak', benzersiz('kaynak_turu')))
    sv = sorted({y['seviye'] for y in kayitlar})
    L.append(_secenekler('seviye', 'Seviye', [str(x) for x in sv]))
    kutular = _kutular(kayitlar, prf)
    if kutular:
        L.append(kutular)
    L += ['            <button class="yet__sifirla" type="button" data-ysifirla hidden>Süzgeci temizle</button>',
          '            <p class="yet__sayac" data-ysayac role="status" aria-live="polite">'
          '%d yetenek</p>' % len(kayitlar),
          '          </div>',
          '',
          '          <div class="yet__split" data-yprofil="%s">' % esc_attr(kod),
          '            <div class="yet__tablowrap">',
          '              <table class="ytablo" data-ytablo data-yprofil="%s">' % esc_attr(kod),
          '                <caption class="visually-hidden">%s — sıralanabilir tablo</caption>' % esc(kat['ad']),
          '                <thead>',
          '                  <tr>']
    for anahtar, etiket, tur in sutunlar(kod):
        L.append('                    <th scope="col" data-ysort="%s" data-ytur="%s" aria-sort="none">'
                 '<span class="ytablo__bas">%s<span class="ytablo__ok" aria-hidden="true"></span></span></th>'
                 % (esc_attr(anahtar), tur, esc(etiket)))
    L += ['                  </tr>', '                </thead>', '                <tbody data-ygovde>']
    L += [_satir(y) for y in kayitlar]
    L += ['                </tbody>', '              </table>',
          '              <p class="yet__bosluk" data-ybos hidden>Süzgece uyan yetenek yok.</p>',
          '            </div>',
          '',
          '            <div class="yet__panel" data-ypanel>',
          '              <p class="yet__ipucu" data-yipucu hidden>Ayrıntı için tablodan bir yetenek seç.</p>',
          '              <div class="yet__kartlar" data-ykartlar>']
    L += [_kart(y) for y in kayitlar]
    L += ['              </div>', '            </div>', '          </div>', '        </div>',
          '      </article>']
    return '\n'.join(L)


def gen_toc(kategoriler):
    L = ['    <ol class="toc__list">']
    for i, k in enumerate(kategoriler):
        L.append('      <li><a class="toc__link" href="#%s">'
                 '<span class="toc__label">%s</span>'
                 '<span class="toc__no" aria-hidden="true">%02d</span></a></li>'
                 % (esc_attr(k['kod']), esc(k['ad'].replace(' Yetenekler', '')), i + 1))
    L.append('    </ol>')
    return '\n'.join(L)


def gen_paneller(kategoriler, hepsi):
    return '\n\n'.join(_bolum(k, [y for y in hepsi if y['kategori'] == k['kod']], i)
                       for i, k in enumerate(kategoriler))


def gen_sayi(hepsi):
    return '      <p class="rail__count">%d Yetenek</p>' % len(hepsi)


# ---------------------------------------------------------------- dosya yazımı
def _replace_between(text, name, inner, indent, fname):
    a, b = '<!-- yonetim:%s -->' % name, '<!-- /yonetim:%s -->' % name
    i, j = text.find(a), text.find(b)
    if i < 0 or j < 0 or j < i:
        raise RuntimeError('%s: "yonetim:%s" işaretleri eksik — üretim durduruldu, '
                           'dosya yazılmadı' % (fname, name))
    return text[: i + len(a)] + '\n' + inner + '\n' + ' ' * indent + text[j:]


def _write_text(path, text):
    tmp = path.with_suffix(path.suffix + '.tmp')
    tmp.write_text(text, encoding='utf-8', newline='\n')
    tmp.replace(path)


def disa_aktar(hepsi=None):
    """content/yetenekler.json — git'e giren kalıcı kayıt. Veritabanı silinse
    de yetenekler burada durur; ``ice_aktar()`` onları geri yükler."""
    if hepsi is None:
        hepsi = liste()
    veri = {'kategoriler': db.sorgu('SELECT kod, ad, aciklama FROM kategori ORDER BY sira, id'),
            'sozluk': sozluk(),
            'yetenekler': hepsi}
    JSON_YOL.parent.mkdir(parents=True, exist_ok=True)
    _write_text(JSON_YOL, json.dumps(veri, ensure_ascii=False, indent=2) + '\n')
    return 'content/yetenekler.json'


def sayfa_uret(kimlik_html=None):
    """yetenekler.html'in işaretli bölgelerini yeniden yaz. Dönüş: yazılan
    dosyaların listesi (değişmediyse boş)."""
    hepsi = liste()
    kategoriler = db.sorgu('SELECT kod, ad, aciklama FROM kategori ORDER BY sira, id')
    yazilan = [disa_aktar(hepsi)]
    if not SAYFA.is_file():
        return yazilan
    t0 = SAYFA.read_text(encoding='utf-8')
    t = t0
    if kimlik_html:
        t = _replace_between(t, 'kimlik', kimlik_html, 4, 'yetenekler.html')
    t = _replace_between(t, 'yetenek-sayisi', gen_sayi(hepsi), 6, 'yetenekler.html')
    t = _replace_between(t, 'kategoriler', gen_toc(kategoriler), 4, 'yetenekler.html')
    t = _replace_between(t, 'yetenekler', gen_paneller(kategoriler, hepsi), 6, 'yetenekler.html')
    if t != t0:
        _write_text(SAYFA, t)
        yazilan.append('yetenekler.html')
    return yazilan


def ice_aktar(zorla=False):
    """content/yetenekler.json → veritabanı. Yalnız veritabanı BOŞken (ya da
    açıkça zorlandığında) çalışır: taze bir klon ya da MySQL'e geçiş sonrası
    yetenekleri geri getirmenin yolu budur."""
    if not JSON_YOL.is_file():
        return 0, []
    if not zorla and db.tek('SELECT COUNT(*) AS n FROM yetenek')['n']:
        return 0, []
    try:
        veri = json.loads(JSON_YOL.read_text(encoding='utf-8'))
    except Exception as e:
        return 0, ['yetenekler.json okunamadı: %s' % e]

    # Sözlükteki eksik satırları önce tamamla (JSON'daki yetenekler ada göre
    # bağlanır — id'ler iki veritabanı arasında aynı olmak zorunda değil)
    for tablo in SOZLUKLER:
        for s in (veri.get('sozluk') or {}).get(tablo) or []:
            if s.get('ad') and not db.tek('SELECT id FROM %s WHERE ad = ?' % tablo, (s['ad'],)):
                sozluk_kaydet(tablo, s)

    def id_ile_ad(tablo, ref):
        if not ref or not ref.get('ad'):
            return None
        r = db.tek('SELECT id FROM %s WHERE ad = ?' % tablo, (ref['ad'],))
        return r['id'] if r else None

    n, hatalar = 0, []
    for y in veri.get('yetenekler') or []:
        kayit = dict(y)
        kayit.pop('id', None)
        for alan, tablo in (('eylem_turu', 'eylem_turu'), ('element', 'element'),
                            ('enerji_turu', 'enerji_turu'), ('kaynak_turu', 'kaynak_turu')):
            kayit[alan] = id_ile_ad(tablo, y.get(alan))
        m = dict(y.get('menzil') or {})
        m['birim'] = id_ile_ad('uzaklik_birimi', (y.get('menzil') or {}).get('birim'))
        kayit['menzil'] = m
        sr = dict(y.get('sure') or {})
        sr['birim'] = id_ile_ad('sure_birimi', (y.get('sure') or {}).get('birim'))
        kayit['sure'] = sr
        # yetkinlikler de ada göre bağlanır — id'ler iki veritabanında farklı
        kayit['yetkinlik'] = [w for w in
                              (id_ile_ad('yetkinlik', x) for x in (y.get('yetkinlik') or []))
                              if w]
        a = dict(y.get('alan') or {})
        a['birim'] = id_ile_ad('uzaklik_birimi', (y.get('alan') or {}).get('birim'))
        a['tipi'] = id_ile_ad('alan_tipi', (y.get('alan') or {}).get('tipi'))
        kayit['alan'] = a
        _, h = kaydet(kayit)
        if h:
            hatalar.append('%s: %s' % (y.get('ad', '?'), ' · '.join(h)))
        else:
            n += 1
    return n, hatalar
