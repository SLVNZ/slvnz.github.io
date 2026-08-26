#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""SLVNZ — panel gereksinim denetimi
=============================================================================
``panel.bat`` sunucuyu başlatmadan önce burayı çağırır. Amaç, eksik bir parça
yüzünden panelin sessizce yarım çalışmasını önlemek: kurulabilir olanı
KULLANICIYA SORARAK kurmak, kurulamayanı da ne yapılacağını söyleyerek
bildirmek.

Denetlenenler
-------------
  Python sürümü      3.8+ — panel f-string ve ThreadingHTTPServer kullanır
  pip                eksik parçayı kurabilmek için
  MySQL sürücüsü     PyMySQL | mysql-connector-python | mysqlclient
  MySQL sunucusu     db.config.json'daki host:port dinliyor mu

> Hiçbiri ZORUNLU DEĞİL. Sürücü ya da sunucu yoksa panel SQLite'a düşer ve
> tam çalışır (bkz. ``admin/db.py``). Bu yüzden çıkış kodu yalnız Python'un
> kendisi yetersizken sıfırdan farklıdır — eksik MySQL paneli durdurmaz.

Sürücü ile sunucu AYRI iki gerekliliktir; en sık karışan yer burası. Yalnız
``pip install PyMySQL`` demek MySQL'e geçirmez: sunucu ayakta değilse
``db.py`` yine SQLite'a düşer, sadece mesajı değişir. Rapor bu yüzden ikisini
birden gösterir ve eksik olan hangisiyse onu söyler.

MySQL sunucusu neden kendiliğinden kurulmuyor
---------------------------------------------
Kurulum tek adım değil: winget paketi indirir, ardından servis ayağa kalkar,
root parolası belirlenir ve veritabanının kendisi ``CREATE DATABASE`` ile
açılır. Başlatıcı bu zincirin yalnız ilk halkasını yapabilir; yarısında
bırakmak "kuruldu" izlenimi verip sonraki hatayı daha anlaşılmaz kılardı.
Bu yüzden sunucu için rapor, komutları yazdırıp kararı kullanıcıya bırakır.

Kullanım
--------
  python admin/gerekli.py            denetle, eksik ve kurulabilirse sor
  python admin/gerekli.py --kur      sormadan kur (gözetimsiz kullanım)
  python admin/gerekli.py --sessiz   yalnız denetle; hiç sorma, hiç kurma
=============================================================================
"""

import json
import socket
import subprocess
import sys
from pathlib import Path

KOK = Path(__file__).resolve().parent.parent
CONFIG = KOK / 'admin' / 'db.config.json'

EN_AZ_PYTHON = (3, 8)

# Kurulacak paket adı ile içe aktarma adı ayrışır: pip "PyMySQL" bilir,
# import "pymysql" ister. Sıra tercih sırasıdır — ilki saf Python, derleyici
# istemez, Windows'ta tek adımda kurulur.
SURUCULER = [
    ('pymysql', 'PyMySQL'),
    ('mysql.connector', 'mysql-connector-python'),
    ('MySQLdb', 'mysqlclient'),
]
VARSAYILAN_PAKET = 'PyMySQL'


# ---------------------------------------------------------------- çıktı
def _utf8():
    """Konsol Türkçe yazabilsin. panel.bat `chcp 65001` yapıyor ama script
    doğrudan da çalıştırılabilir; reconfigure yoksa sessizce geç."""
    for akis in (sys.stdout, sys.stderr):
        try:
            akis.reconfigure(encoding='utf-8')
        except Exception:
            pass


# İşaretler ASCII: panel.bat'in kendi `[HATA]` diliyle aynı, ayrıca kod
# sayfası ne olursa olsun bozulmaz.
ISARET = {'var': '[ok] ', 'yok': '[--] ', 'uyari': '[!]  ', 'atlandi': '[..] '}


def satir(ad, durum, aciklama=''):
    print('  %s%-22s %s' % (ISARET[durum], ad, aciklama))


def baslik(s):
    print()
    print('  ' + s)
    print('  ' + '-' * len(s))


# ---------------------------------------------------------------- denetimler
def python_surumu():
    v = sys.version_info
    tamam = (v.major, v.minor) >= EN_AZ_PYTHON
    return {
        'ad': 'Python',
        'durum': 'var' if tamam else 'yok',
        'not': '%d.%d.%d' % (v.major, v.minor, v.micro) + (
            '' if tamam else '  (en az %d.%d gerekli)' % EN_AZ_PYTHON),
        'zorunlu': True,
    }


def pip_var():
    try:
        r = subprocess.run([sys.executable, '-m', 'pip', '--version'],
                           capture_output=True, text=True, timeout=25)
        tamam = r.returncode == 0
        surum = (r.stdout or '').split(' from ')[0].strip() if tamam else ''
    except Exception:
        tamam, surum = False, ''
    return {
        'ad': 'pip',
        'durum': 'var' if tamam else 'uyari',
        'not': surum or 'bulunamadı — eksik paket kurulamaz',
        'zorunlu': False,
    }


def mysql_surucusu():
    """Kurulu sürücüyü bul. db.py ile AYNI sırayı izler; ayrışırsa rapor
    panelin gerçekte kullanacağı sürücüyü yanlış gösterir."""
    for icaktar, paket in SURUCULER:
        try:
            __import__(icaktar)
            return {'ad': 'MySQL sürücüsü', 'durum': 'var', 'not': paket,
                    'zorunlu': False, 'paket': None}
        except ImportError:
            pass
    return {'ad': 'MySQL sürücüsü', 'durum': 'yok',
            'not': 'kurulu değil — panel SQLite kullanır',
            'zorunlu': False, 'paket': VARSAYILAN_PAKET}


def _config():
    try:
        with open(CONFIG, encoding='utf-8') as f:
            c = json.load(f)
        m = c.get('mysql') or {}
        sq = c.get('sqlite') or {}
        return (c.get('surucu') or 'otomatik',
                m.get('host', '127.0.0.1'), int(m.get('port', 3306)),
                m.get('database', 'slvnz'),
                sq.get('dosya', 'admin/data/slvnz.db'))
    except Exception:
        return 'otomatik', '127.0.0.1', 3306, 'slvnz', 'admin/data/slvnz.db'


def mysql_sunucusu(host, port):
    """Sunucu dinliyor mu — el sıkışma değil, yalnız soket. Sürücü kurulu
    olmasa da çalışır, o yüzden iki denetim birbirinden bağımsız."""
    try:
        with socket.create_connection((host, port), timeout=0.6):
            pass
        return {'ad': 'MySQL sunucusu', 'durum': 'var',
                'not': '%s:%d dinliyor' % (host, port), 'zorunlu': False}
    except Exception:
        return {'ad': 'MySQL sunucusu', 'durum': 'yok',
                'not': '%s:%d yanıt vermiyor' % (host, port), 'zorunlu': False}


# ---------------------------------------------------------------- kurulum
def paket_kur(paket):
    print()
    print('  %s kuruluyor...' % paket)
    print()
    # pip konsola DOĞRUDAN yazar, buradaki print'ler ise tamponlu: boşaltmadan
    # alt süreç başlatılırsa "kuruluyor" satırı pip'in çıktısından sonra düşer
    sys.stdout.flush()
    try:
        r = subprocess.run([sys.executable, '-m', 'pip', 'install', paket])
    except Exception as e:
        print()
        print('  [--] Kurulum başlatılamadı: %s' % e)
        return False
    print()
    if r.returncode == 0:
        print('  [ok] %s kuruldu.' % paket)
        return True
    print('  [--] Kurulum başarısız (pip %d döndü).' % r.returncode)
    print('       Elle denemek için:  pip install %s' % paket)
    return False


def sor(soru):
    """Varsayılan HAYIR: Enter'a basmak bir şey kurmasın."""
    sys.stdout.flush()
    try:
        c = input('  %s [e/H] ' % soru).strip().lower()
    except (EOFError, KeyboardInterrupt):
        print()
        return False
    return c in ('e', 'evet', 'y', 'yes')


# ---------------------------------------------------------------- rapor
def sunucu_yolu(host, port, veritabani):
    print()
    print('  MySQL sunucusu kurmak istersen (yönetici konsolunda):')
    print()
    print('      winget install Oracle.MySQL')
    print('      mysql -u root -p -e "CREATE DATABASE %s '
          'CHARACTER SET utf8mb4 COLLATE utf8mb4_turkish_ci;"' % veritabani)
    print()
    print('  Ardından admin/db.config.json içindeki kullanıcı/parolayı yaz.')
    print('  Bu adımlar otomatik yapılmıyor: kurulum servis ayağa kaldırmayı,')
    print('  root parolası belirlemeyi ve veritabanını açmayı da gerektiriyor —')
    print('  yarısında bırakmak "kuruldu" sanıp sonraki hatayı gizlerdi.')


def main(argv):
    _utf8()
    kur_zorla = '--kur' in argv
    sessiz = '--sessiz' in argv

    istek, host, port, veritabani, sqlite_dosya = _config()

    baslik('Gereksinimler')
    py = python_surumu()
    satir(py['ad'], py['durum'], py['not'])
    if py['durum'] != 'var':
        print()
        print('  [HATA] Python sürümü yetersiz. Panel başlatılamaz.')
        print('         https://www.python.org/downloads/')
        return 1

    pip = pip_var()
    satir(pip['ad'], pip['durum'], pip['not'])

    # db.config.json "sqlite" derse db.py MySQL'i hiç denemez (bkz. baglan).
    # Denetim de denememeli: kurulu olmayan sürücüyü "eksik" diye göstermek
    # bilinçli bir tercihi arıza gibi okutur — üstelik soket beklemesi de boşa
    # gider. Bu durumda ne satır kırmızı olur ne de kurulum önerilir.
    mysql_kapali = (istek == 'sqlite')
    sur = snc = None
    if mysql_kapali:
        satir('MySQL', 'atlandi', 'db.config.json "sqlite" diyor — denetlenmedi')
    else:
        sur = mysql_surucusu()
        satir(sur['ad'], sur['durum'], sur['not'])
        snc = mysql_sunucusu(host, port)
        satir(snc['ad'], snc['durum'], snc['not'])

    # -- eksik sürücüyü kurmayı öner ---------------------------------------
    kuruldu = False
    if not mysql_kapali and sur['durum'] == 'yok' and pip['durum'] == 'var' and not sessiz:
        print()
        if snc['durum'] == 'var':
            print('  Sunucu ayakta ama sürücü yok: panel MySQL yerine SQLite')
            print('  kullanacak. Sürücü kurulunca MySQL\'e geçer.')
        else:
            print('  Sürücü de sunucu da yok. Panel SQLite ile tam çalışır;')
            print('  MySQL istiyorsan İKİSİ birden gerekli.')
        if kur_zorla or sor('%s şimdi kurulsun mu?' % sur['paket']):
            kuruldu = paket_kur(sur['paket'])

    # -- sonuç --------------------------------------------------------------
    if kuruldu:
        sur = mysql_surucusu()

    baslik('Sonuç')
    if mysql_kapali:
        print('  Panel SQLite kullanacak — %s' % sqlite_dosya)
        print("  Bu bir eksiklik değil, db.config.json'daki tercih.")
        print('  MySQL yeniden denensin istersen: "surucu": "otomatik".')
    elif sur['durum'] == 'var' and snc['durum'] == 'var':
        print('  Panel MySQL kullanacak (%s → %s:%d/%s).'
              % (sur['not'], host, port, veritabani))
    else:
        eksik = []
        if sur['durum'] != 'var':
            eksik.append('sürücü')
        if snc['durum'] != 'var':
            eksik.append('sunucu')
        print('  Panel SQLite kullanacak — eksik: %s.' % ' ve '.join(eksik))
        print('  Veri admin/data/slvnz.db dosyasında durur; panelin')
        print('  tüm özellikleri çalışır.')
        if snc['durum'] != 'var' and not sessiz:
            sunucu_yolu(host, port, veritabani)

    print()
    return 0


if __name__ == '__main__':
    sys.exit(main(sys.argv[1:]))
