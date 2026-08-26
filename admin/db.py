#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
SLVNZ — yetenek veritabanı katmanı
==================================
Şema tek ve MySQL lehçesinde yazılıdır (``admin/schema.sql``). Bu modül onu
çalıştırılabilir bir bağlantıya bağlar:

  * **MySQL** — PyMySQL / mysql-connector / MySQLdb sürücülerinden biri kurulu
    ve sunucuya ulaşılabiliyorsa. Kanonik hedef budur.
  * **SQLite** — sürücü ya da sunucu yoksa. Standart kütüphanede olduğu için
    kurulum istemez; şema aynı dosyadan, üç satırlık bir lehçe çevirisiyle
    kurulur. Aynı SQL, aynı tablolar, aynı kısıtlar.

Hangisinin kullanıldığı ``durum()`` ile okunur ve yönetim panelinde yazar —
sessizce başka bir yere yazmak, veriyi kaybetmenin en sinsi yoludur.

Yapılandırma: ``admin/db.config.json`` (ilk çalıştırmada üretilir, git dışı).

    {
      "surucu": "otomatik",              // otomatik | mysql | sqlite
      "mysql":  {"host": "127.0.0.1", "port": 3306,
                 "user": "root", "password": "", "database": "slvnz"},
      "sqlite": {"dosya": "admin/data/slvnz.db"}
    }

MySQL'e geçiş: sunucuyu kur, ``CREATE DATABASE slvnz CHARACTER SET utf8mb4
COLLATE utf8mb4_turkish_ci;`` de, ``pip install PyMySQL`` yap, yukarıdaki
kullanıcı/parolayı yaz. Şema ve tohum ilk açılışta kendiliğinden kurulur;
veriyi taşımak için panelin "İçe aktar" düğmesi ``content/yetenekler.json``
dosyasını okur.

Not: SQLite dosyası git'e girmez (her yazımda değişen ikili dosya). Kalıcı ve
diff'lenebilir kayıt ``content/yetenekler.json``'dır; veritabanı boşsa yetenek
modülü açılışta oradan geri yükler.
"""

import json
import re
import sqlite3
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SCHEMA = Path(__file__).resolve().parent / 'schema.sql'
CONFIG = Path(__file__).resolve().parent / 'db.config.json'

VARSAYILAN_CONFIG = {
    'surucu': 'otomatik',
    'mysql': {'host': '127.0.0.1', 'port': 3306,
              'user': 'root', 'password': '', 'database': 'slvnz'},
    'sqlite': {'dosya': 'admin/data/slvnz.db'},
}

_BAGLANTI = None        # açık bağlantı (tekil)
_SURUCU = None          # 'mysql' | 'sqlite'
_NOT = ''               # panelde gösterilecek açıklama


# ---------------------------------------------------------------- yapılandırma
def config():
    if not CONFIG.is_file():
        CONFIG.write_text(json.dumps(VARSAYILAN_CONFIG, ensure_ascii=False, indent=2) + '\n',
                          encoding='utf-8', newline='\n')
        return json.loads(json.dumps(VARSAYILAN_CONFIG))
    try:
        c = json.loads(CONFIG.read_text(encoding='utf-8'))
    except Exception:
        return json.loads(json.dumps(VARSAYILAN_CONFIG))
    out = {'surucu': c.get('surucu') or VARSAYILAN_CONFIG['surucu']}
    for k in ('mysql', 'sqlite'):
        birlesik = dict(VARSAYILAN_CONFIG[k])
        birlesik.update(c.get(k) or {})
        out[k] = birlesik
    return out


# ---------------------------------------------------------------- sürücü seçimi
def _mysql_modul():
    """Kurulu MySQL sürücüsünü bul. Üçü de DB-API 2.0 ve '%s' yer tutucusu
    kullanır — çağrı tarafı hangisi olduğunu bilmek zorunda değil."""
    try:
        import pymysql
        return pymysql, 'pymysql'
    except ImportError:
        pass
    try:
        import mysql.connector as mc
        return mc, 'mysql.connector'
    except ImportError:
        pass
    try:
        import MySQLdb
        return MySQLdb, 'MySQLdb'
    except ImportError:
        pass
    return None, None


def _mysql_bagla(cfg):
    mod, ad = _mysql_modul()
    if mod is None:
        raise RuntimeError('MySQL sürücüsü kurulu değil (pip install PyMySQL)')
    m = cfg['mysql']
    kw = {'host': m['host'], 'port': int(m['port']), 'user': m['user'],
          'password': m['password'], 'database': m['database'], 'charset': 'utf8mb4'}
    if ad in ('pymysql', 'mysql.connector'):
        kw['autocommit'] = False
    return mod.connect(**kw), ad


def _sqlite_bagla(cfg):
    yol = ROOT / cfg['sqlite']['dosya']
    yol.parent.mkdir(parents=True, exist_ok=True)
    con = sqlite3.connect(str(yol), check_same_thread=False)
    con.execute('PRAGMA foreign_keys = ON')
    con.execute('PRAGMA journal_mode = WAL')
    return con


def baglan():
    """Tekil bağlantı. İlk çağrıda sürücüyü seçer, şemayı ve tohumu kurar."""
    global _BAGLANTI, _SURUCU, _NOT
    if _BAGLANTI is not None:
        return _BAGLANTI
    cfg = config()
    istek = (cfg.get('surucu') or 'otomatik').lower()

    if istek in ('mysql', 'otomatik'):
        try:
            con, ad = _mysql_bagla(cfg)
            _BAGLANTI, _SURUCU = con, 'mysql'
            _NOT = 'MySQL · %s@%s:%s/%s (%s)' % (
                cfg['mysql']['user'], cfg['mysql']['host'],
                cfg['mysql']['port'], cfg['mysql']['database'], ad)
        except Exception as e:
            if istek == 'mysql':
                raise RuntimeError('MySQL bağlantısı kurulamadı: %s' % e)
            _NOT = 'SQLite · MySQL yok (%s)' % e

    if _BAGLANTI is None:
        _BAGLANTI = _sqlite_bagla(cfg)
        _SURUCU = 'sqlite'
        if not _NOT:
            _NOT = 'SQLite · %s' % cfg['sqlite']['dosya']

    kur()
    return _BAGLANTI


def surucu():
    baglan()
    return _SURUCU


def durum():
    """Panelin üst çubuğunda gösterilen tek satırlık bağlantı künyesi."""
    try:
        baglan()
        return {'surucu': _SURUCU, 'not': _NOT, 'tamam': True}
    except Exception as e:
        return {'surucu': None, 'not': str(e), 'tamam': False}


# ---------------------------------------------------------------- sorgu yardımı
def _yer_tutucu(sql):
    """Şablonlar '?' ile yazılır; MySQL sürücüleri '%s' ister."""
    if surucu() == 'mysql':
        return sql.replace('%', '%%').replace('?', '%s')
    return sql


def sorgu(sql, params=()):
    """SELECT → sözlük listesi. Sütun adları cursor.description'dan gelir,
    böylece sqlite3.Row / MySQL tuple farkı çağrı tarafına sızmaz."""
    con = baglan()
    cur = con.cursor()
    try:
        cur.execute(_yer_tutucu(sql), tuple(params))
        kolon = [d[0] for d in cur.description]
        return [dict(zip(kolon, satir)) for satir in cur.fetchall()]
    finally:
        cur.close()


def tek(sql, params=()):
    r = sorgu(sql, params)
    return r[0] if r else None


def calistir(sql, params=()):
    """INSERT/UPDATE/DELETE → son eklenen id (varsa)."""
    con = baglan()
    cur = con.cursor()
    try:
        cur.execute(_yer_tutucu(sql), tuple(params))
        return cur.lastrowid
    finally:
        cur.close()


def islem_bitir():
    baglan().commit()


def islem_geri():
    try:
        baglan().rollback()
    except Exception:
        pass


# ---------------------------------------------------------------- şema kurulumu
_SQLITE_CEVIRI = (
    (re.compile(r'\bINT\s+AUTO_INCREMENT\s+PRIMARY\s+KEY\b', re.I),
     'INTEGER PRIMARY KEY AUTOINCREMENT'),
    (re.compile(r'\)\s*ENGINE=\w+[^;]*', re.I), ')'),
    (re.compile(r'\bCREATE\s+INDEX\s+(?!IF\s+NOT\s+EXISTS)', re.I),
     'CREATE INDEX IF NOT EXISTS '),
)


def _ifadeler():
    """schema.sql → çalıştırılabilir ifade listesi (lehçeye göre çevrilmiş).

    Dosyada metin sabiti yok (bkz. schema.sql başlığı), o yüzden yorumları
    atıp ';' ile bölmek güvenli."""
    ham = SCHEMA.read_text(encoding='utf-8')
    ham = re.sub(r'--[^\n]*', '', ham)
    if surucu() == 'sqlite':
        for kalip, yeni in _SQLITE_CEVIRI:
            ham = kalip.sub(yeni, ham)
    return [s.strip() for s in ham.split(';') if s.strip()]


def _zaten_var(e):
    m = str(e).lower()
    return 'exist' in m or 'duplicate' in m


# CREATE TABLE IF NOT EXISTS var olan bir tabloya SÜTUN eklemez: şemaya sonradan
# giren alanlar buradan geçer. Her ifade bir kez denenir, "zaten var" yutulur —
# CREATE INDEX'te kullanılan deyimin aynısı (SQLite "duplicate column name",
# MySQL "Duplicate column name" der; ikisi de _zaten_var'a takılır).
#
# Yabancı anahtar bilerek yok: SQLite ALTER TABLE ile kısıt eklemeyi
# desteklemiyor. Taze kurulumlar fk_yetenek_sbirim'i schema.sql'den alır,
# göçle gelenlerde referansı yetenek.py doğrular (_var_mi).
_GOCLER = (
    "ALTER TABLE yetenek ADD COLUMN sure_tur VARCHAR(8) NOT NULL DEFAULT 'anlik'",
    'ALTER TABLE yetenek ADD COLUMN sure_deger INT NULL',
    'ALTER TABLE yetenek ADD COLUMN sure_birim_id INT NULL',
    'ALTER TABLE yetenek ADD COLUMN ritual TINYINT(1) NOT NULL DEFAULT 0',
    'ALTER TABLE yetenek ADD COLUMN konsantrasyon TINYINT(1) NOT NULL DEFAULT 0',
)


_KURULDU = False


def kur():
    """Şemayı ve tohum satırlarını kur — her açılışta çalışır, ikinci kez
    çalıştığında hiçbir şey yapmaz (IF NOT EXISTS + "zaten var" yutumu)."""
    global _KURULDU
    if _KURULDU:
        return
    _KURULDU = True
    con = _BAGLANTI
    cur = con.cursor()
    try:
        for ifade in _ifadeler():
            try:
                cur.execute(ifade)
            except Exception as e:              # MySQL'de CREATE INDEX'in
                if not _zaten_var(e):           # IF NOT EXISTS'i yok
                    raise
        for ifade in _GOCLER:
            try:
                cur.execute(ifade)
            except Exception as e:
                if not _zaten_var(e):
                    raise
    finally:
        cur.close()
    con.commit()
    tohumla()


# ---------------------------------------------------------------- tohum
# Türkçe açıklamalar burada, SQL dosyasında değil: parametreli yazılırlar,
# içlerindeki noktalı virgül şema bölmesini bozamaz.
TOHUM = {
    'kategori': (
        ('kod', 'ad', 'aciklama', 'sira'),
        [('enerjisel', 'Enerjisel Yetenekler',
          'Büyüler. Kaynak · kanal · enerji · element katmanlarıyla kurulur.', 1),
         ('fiziksel', 'Fiziksel Yetenekler',
          'Kas gücüne dayanan yetenekler; çoğunlukla SOLUK tüketir.', 2),
         ('karma', 'Karma Yetenekler',
          'Fiziksel gücü enerjisel yönlendirmeyle harmanlayan savaş manevraları.', 3)],
    ),
    'eylem_turu': (
        ('ad', 'kisa', 'sira'),
        [('Eylem', 'E', 1), ('Ek Eylem', 'EE', 2), ('Tepki Eylem', 'TE', 3)],
    ),
    'element': (
        ('ad', 'aciklama', 'sira'),
        [('Ateş', 'Isı, yanma, köz, alev, patlama, kavurma ve tüketim.', 1),
         ('Su', 'Akış, soğutma, basınç, arındırma, sis, buz, sıvı hareketi.', 2),
         ('Toprak', 'Taş, kum, maden, kil, kristal, ağırlık, yapı ve sabitlik.', 3),
         ('Hava', 'Rüzgâr, basınç, ses, nefes, uçuş, itme, savurma.', 4),
         ('Yıldırım', 'Elektrik, ani boşalma, sinirsel şok, iletkenlik.', 5),
         ('Işık', 'Görünürlük, parlama, yansıma, gölge bastırma, algı yönlendirme.', 6)],
    ),
    'enerji_turu': (
        ('ad', 'sinif', 'aciklama', 'sira'),
        [('Yıkım', 'temel', 'Var olan yapıyı bozma, parçalama, doğrudan hasar.', 1),
         ('Koruma', 'temel', 'Varlığı, alanı, nesneyi dış etkilerden muhafaza.', 2),
         ('Oluşturma', 'temel', 'Enerjiyi geçici biçime sokarak madde/form meydana getirme.', 3),
         ('Dönüştürme', 'temel', 'Var olanın formunu, halini, niteliğini değiştirme.', 4),
         ('Efsun', 'temel', 'Zihin, duygu, arzu, korku ve karar süreçlerine etki.', 5),
         ('İllüzyon', 'temel', 'Duyulara yönelik yanılsama; gerçekliği değil algıyı değiştirir.', 6),
         ('Kehanet', 'temel', 'İz, olasılık, geçmiş yankısı, gizli bağ ve sonuç sezme.', 7),
         ('Çürüme', 'temel', 'Canlı, ölü, ruhsal ya da maddesel bütünlüğün bozulması.', 8),
         ('İnanç', 'ozel', 'Kadim, kutsal ilke, yemin ya da manevi bağ üzerinden.', 9),
         ('Pakt', 'ozel', 'Bir patron ya da üstün varlıkla yapılan anlaşmadan doğar.', 10),
         ('Kaos', 'ozel', 'Denge dışına taşmış, sonuçları tam öngörülemeyen enerji.', 11),
         ('Kan', 'yasak', 'Soy, hafıza, bedensel bağ, hastalık ve yaşam izleri.', 12),
         ('Aydınlık', 'yasak', 'Varoluşsal arındırma, hüküm, kutsal yakıcılık.', 13),
         ('Karanlık', 'yasak', 'Enerjinin doğasını bozan, varoluşu içe çökerten enerji.', 14),
         ('Ruh', 'yasak', 'Ölüler, benlik izleri, hatıra yankıları, ruhsal bağlar.', 15),
         ('Yaşam', 'yasak', 'Büyüme, çoğalma, yenilenme, taşma ve mutasyon gücü.', 16)],
    ),
    'kaynak_turu': (
        ('ad', 'aciklama', 'sira'),
        [('Mana', 'Evrende vahşi biçimde akan temel büyüsel yakıt. En güvenli kaynak.', 1),
         ('Ki', 'Beden-ruh disipliniyle açığa çıkan içsel kaynak. Kontrollü ama sınırlı.', 2),
         ('Ruh', 'Benlik özünden harcanan kaynak. Çok riskli, yavaş yenilenir.', 3),
         ('Yaşam', 'Varoluşsal canlılık gücü. Hem eksikliği hem fazlalığı ölümcül.', 4),
         ('Soluk', 'Fiziksel kaynak havuzu; DAY niteliğine dayanır.', 5)],
    ),
    'uzaklik_birimi': (
        ('ad', 'kisa', 'varsayilan', 'sira'),
        [('Birim', 'br', 0, 1), ('Metre', 'm', 1, 2), ('Feet', 'ft', 0, 3),
         ('Kare', 'kare', 0, 4), ('Adım', 'adım', 0, 5), ('Kilometre', 'km', 0, 6)],
    ),
    # saniye: sıralama bununla yapılır (bkz. schema.sql). Tur = savaş turu,
    # 6 saniye. Ay 30 gün, yıl 365 gün kabul edilir — takvim doğruluğu değil
    # tutarlı bir SIRA aranıyor.
    'sure_birimi': (
        ('ad', 'kisa', 'saniye', 'varsayilan', 'sira'),
        [('Tur', 'Tur', 6, 1, 1),
         ('Dakika', 'Dk', 60, 0, 2),
         ('Saat', 'Saat', 3600, 0, 3),
         ('Gün', 'Gün', 86400, 0, 4),
         ('Hafta', 'Hafta', 604800, 0, 5),
         ('Ay', 'Ay', 2592000, 0, 6),
         ('Yıl', 'Yıl', 31536000, 0, 7)],
    ),
    # Başlangıç seti; panelden düzenlenir. Yalnız BOŞ tabloya yazılır, yani
    # silinen bir tür her açılışta geri gelmez (bkz. tohumla).
    'yetkinlik': (
        ('ad', 'aciklama', 'sira'),
        [('Kılıç', 'Tek ya da çift elle kullanılan kesici kılıç sınıfı.', 1),
         ('Balta', 'Savaş baltası ve türevleri.', 2),
         ('Mızrak', 'Mızrak, kargı, uzun saplı delici silahlar.', 3),
         ('Yay', 'Yay ve arbalet gibi menzilli atış silahları.', 4),
         ('Hançer', 'Kısa saplı delici ve kesici silahlar.', 5),
         ('Topuz', 'Topuz, gürz, çekiç gibi ezici silahlar.', 6),
         ('Kalkan', 'Savunma amaçlı kalkan kullanımı.', 7),
         ('Silahsız', 'Yumruk, tekme, tutuş — silah gerektirmeyen dövüş.', 8)],
    ),
    'alan_tipi': (
        ('ad', 'yukseklik_gerekir', 'olcu_adi', 'sira'),
        [('Küre', 0, 'Yarıçap', 1), ('Daire', 0, 'Yarıçap', 2),
         ('Küp', 0, 'Kenar', 3), ('Kare', 0, 'Kenar', 4),
         ('Silindir', 1, 'Yarıçap', 5), ('Koni', 1, 'Yarıçap', 6),
         ('Prizma', 1, 'Kenar', 7), ('Hat', 0, 'Uzunluk', 8),
         ('Halka', 0, 'Yarıçap', 9)],
    ),
}


def tohumla():
    """Boş sözlük tablolarını doldur. Dolu olanlara DOKUNMAZ — panelden
    silinmiş bir element her açılışta geri gelmesin."""
    for tablo in TOHUM:
        kolon, satirlar = TOHUM[tablo]
        var = tek('SELECT COUNT(*) AS n FROM ' + tablo)
        if var and var['n']:
            continue
        yer = ', '.join('?' for _ in kolon)
        sql = 'INSERT INTO %s (%s) VALUES (%s)' % (tablo, ', '.join(kolon), yer)
        for s in satirlar:
            calistir(sql, s)
    islem_bitir()


# ---------------------------------------------------------------- yardımcılar
def simdi():
    return datetime.now(timezone.utc).astimezone().strftime('%Y-%m-%d %H:%M:%S')


# Türk alfabesi sıralaması. Python'un varsayılan sıralaması Unicode kod
# noktasına göredir: "Çakmak" < "Cam" olur, "ışık" ile "isim" karışır.
# Aşağıdaki anahtar tarayıcıdaki localeCompare('tr') ile aynı sırayı verir.
_TR_ABC = 'aâbcçdefgğhıiîjklmnoöprsştuüûvwxyqz0123456789'
_TR_INDEX = {}
for _i, _h in enumerate(_TR_ABC):
    _TR_INDEX[_h] = _i
_TR_KUCUK = str.maketrans({'I': 'ı', 'İ': 'i', 'Â': 'â', 'Î': 'î', 'Û': 'û'})


def tr_anahtar(s):
    s = (s or '').translate(_TR_KUCUK).lower()
    return [_TR_INDEX.get(h, 900 + (ord(h) % 100)) for h in s]
