#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
SLVNZ — yerel yönetim sunucusu
==============================
Tek dosyalık, bağımlılıksız bir HTTP sunucusu (yalnız standart kütüphane;
görsel yüklemede Pillow varsa beyaz zemin → alfa dönüşümü yapılır).

Çalıştırma:
    python admin/server.py
    → http://127.0.0.1:8090/  (panele yönlendirir; site de aynı kökten servis edilir)

Ne yapar
--------
- /admin/         yönetim paneli arayüzü
- /api/site       GET içerik (content/site.json) · PUT doğrula + kaydet + ÜRET
- /api/images     assets/images içindeki kullanılabilir çizimler
- /api/upload     PUT ?ad=x.png — beyaz zemin alfaya çevrilir, webp üretilir
- /api/git        git durumu (salt okunur — commit'i sen atarsın)
- /index.html?edit=1 · /kurallar.html?edit=1
                  tuval modu: sayfa, site etkileşim script'leri OLMADAN servis
                  edilir (theme.js kalır) — davranışı panelin canvas editörü
                  devralır (admin/canvas.js). Sayfanın diskteki hâli değişmez.

Üretim modeli
-------------
Site elle yazılmış statik HTML; panel her şeyi değil, dosyalardaki İŞARETLİ
bölgeleri yeniden üretir:

    <!-- yonetim:AD --> … <!-- /yonetim:AD -->

  index.html      surum            "4.0" düğmesi + sürüm menüsü
  kurallar.html   kimlik           ray logosu (sürüm no + tür)
                  bolum-sayisi     "5 Bölüm"
                  bolumler         sağ menü (toc listesi)
                  paneller         bölüm makaleleri

İşaret dışındaki her satır elle yazılmıştır ve panele dokunulmadan kalır.
İşaretlerin İÇİ ise her kayıtta ezilir — oraya elle yazma.

Güvenlik: sunucu yalnız 127.0.0.1'i dinler; Host/Origin yerel değilse 403.
Kimlik doğrulama YOK — bu bilinçli: tek kullanıcılı yerel bir araç.
"""

import html as html_mod
import io
import json
import re
import struct
import subprocess
import sys
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

ROOT = Path(__file__).resolve().parent.parent
SITE_JSON = ROOT / 'content' / 'site.json'
IMGDIR = ROOT / 'assets' / 'images'
HOST, PORT = '127.0.0.1', 8090

# Yetenekler ayrı bir modülde ve ayrı bir veritabanında yaşar (admin/db.py +
# admin/yetenek.py). Bağlantı kurulamazsa panelin geri kalanı çalışmaya devam
# etsin diye ithal korumalı: hata metni /api/yetenek/durum ile panele düşer.
try:
    import yetenek
    YETENEK_HATA = None
except Exception as _e:                                # pragma: no cover
    yetenek = None
    YETENEK_HATA = str(_e)

MIME = {
    '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
    '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml',
    '.ttf': 'font/ttf', '.ico': 'image/x-icon', '.txt': 'text/plain; charset=utf-8',
}


# ---------------------------------------------------------------- yardımcılar
def esc(s):
    return html_mod.escape(str(s), quote=False)


def esc_attr(s):
    return html_mod.escape(str(s), quote=True)


def load_site():
    return json.loads(SITE_JSON.read_text(encoding='utf-8'))


def write_text(path, text):
    """Atomik yazım: geçici dosyaya yaz, sonra yerine koy."""
    tmp = path.with_suffix(path.suffix + '.tmp')
    tmp.write_text(text, encoding='utf-8', newline='\n')
    tmp.replace(path)


def png_boyut(path):
    d = path.read_bytes()[:26]
    if len(d) < 26 or d[1:4] != b'PNG':
        return 0, 0
    w, h = struct.unpack('>II', d[16:24])
    return w, h


def png_alfali(path):
    d = path.read_bytes()[:26]
    return len(d) >= 26 and d[25] in (4, 6)     # gri+alfa | RGBA


def style_t(t):
    """Tuvalin serbest dönüşümü → satır içi stil (admin.js tEmit ile aynı dil).

    Kayıt: {x, y (px) · s (ölçek) · r (derece) · z (katman)} + kırılım
    geçersiz kılmaları `tab`/`mob` (aynı alanlar; kurallar.css'in
    --t-t/--t-m medya kuralları uygular). Boş/varsayılan kayıt hiç stil
    üretmez; üretim bayt-kararlı kalır.
    """
    if not isinstance(t, dict):
        return ''

    def g(v):
        return f'{v:g}'

    def num(d, k, dft):
        v = d.get(k, dft)
        return float(v) if isinstance(v, (int, float)) else dft

    def tl(d):
        return (f'translate({g(num(d, "x", 0))}px, {g(num(d, "y", 0))}px) '
                f'scale({g(num(d, "s", 1))}) rotate({g(num(d, "r", 0))}deg)')

    x, y, s, r = num(t, 'x', 0), num(t, 'y', 0), num(t, 's', 1), num(t, 'r', 0)
    z = t.get('z')
    fs = t.get('fs')
    parts = []
    if isinstance(z, (int, float)) and int(z) != 0:
        parts += ['position:relative', f'z-index:{int(z)}']
    if isinstance(fs, (int, float)) and 8 <= fs <= 72:
        parts.append(f'font-size:{g(float(fs))}px')
    if x or y or s != 1 or r:
        parts.append(f'transform:{tl(t)}')
    for key, sfx in (('tab', 't'), ('mob', 'm')):
        sub = t.get(key)
        if isinstance(sub, dict):
            parts.append(f'--t-{sfx}:{tl(sub)}')
            w = sub.get('w')
            if isinstance(w, (int, float)) and 0 < w < 100:
                parts.append(f'--w-{sfx}:{g(float(w))}%')
    return f' style="{";".join(parts)}"' if parts else ''


# ---------------------------------------------------------------- doğrulama
def t_dogrula(t, yer, errs):
    """Dönüşüm kaydı: sayılar makul aralıkta olsun — tuval dışından gelen
    bozuk değer siteyi görünmez öğelerle doldurmasın."""
    if t is None:
        return
    if not isinstance(t, dict):
        errs.append(f'{yer}: dönüşüm nesne olmalı')
        return
    for k, lo, hi in (('x', -3000, 3000), ('y', -3000, 3000),
                      ('s', 0.05, 20), ('r', -360, 360), ('z', -99, 999),
                      ('w', 5, 100), ('fs', 8, 72)):
        v = t.get(k)
        if v is not None and not (isinstance(v, (int, float)) and lo <= v <= hi):
            errs.append(f'{yer}: dönüşüm {k} değeri {lo}..{hi} arası sayı olmalı')
    for key in ('tab', 'mob'):
        if t.get(key) is not None:
            t_dogrula(t.get(key), f'{yer}/{key}', errs)


def validate(site):
    errs = []
    sv = site.get('surumler')
    if not isinstance(sv, list) or not sv:
        return ['surumler listesi boş olamaz']
    nolar, simdiki = set(), 0
    for v in sv:
        no = str(v.get('no', ''))
        if not re.fullmatch(r'\d+\.\d+', no):
            errs.append(f'Sürüm no geçersiz: "{no}" (örnek: 5.0)')
        if no in nolar:
            errs.append(f'Sürüm no tekrarı: {no}')
        nolar.add(no)
        if not str(v.get('tur', '')).strip():
            errs.append(f'{no}: tür boş olamaz')
        if v.get('durum') not in ('simdiki', 'arsiv'):
            errs.append(f'{no}: durum "simdiki" ya da "arsiv" olmalı')
        if v.get('durum') == 'simdiki':
            simdiki += 1
    if simdiki != 1:
        errs.append('Tam olarak bir sürüm "şimdiki" olmalı')
    for no, k in (site.get('kurallar') or {}).items():
        ids = set()
        for ch in k.get('bolumler', []):
            cid = str(ch.get('id', ''))
            if not re.fullmatch(r'[a-z0-9-]+', cid):
                errs.append(f'{no}: bölüm id geçersiz: "{cid}"')
            if cid in ids:
                errs.append(f'{no}: bölüm id tekrarı: {cid}')
            ids.add(cid)
            if not str(ch.get('baslik', '')).strip():
                errs.append(f'{no}/{cid}: başlık boş olamaz')
            g = ch.get('gorsel')
            if g:
                img = str(g.get('img', ''))
                if not img.startswith('assets/images/') or '..' in img:
                    errs.append(f'{no}/{cid}: görsel yolu assets/images altında olmalı')
                t_dogrula(g.get('t'), f'{no}/{cid}/görsel', errs)
            t_dogrula(ch.get('baslik_t'), f'{no}/{cid}/başlık', errs)
            if not isinstance(ch.get('html', ''), str):
                errs.append(f'{no}/{cid}: html metin olmalı')
    return errs


# ---------------------------------------------------------------- üretim
def replace_between(text, name, inner, indent, fname):
    a, b = f'<!-- yonetim:{name} -->', f'<!-- /yonetim:{name} -->'
    i, j = text.find(a), text.find(b)
    if i < 0 or j < 0 or j < i:
        raise RuntimeError(f'{fname}: "yonetim:{name}" işaretleri eksik — üretim durduruldu, dosya yazılmadı')
    return text[: i + len(a)] + '\n' + inner + '\n' + ' ' * indent + text[j:]


def gen_surum_slot(site, cur):
    """index.html — '4.0' düğmesi + sürüm menüsü (10 boşluk taban girinti)."""
    p = ' ' * 10
    L = [
        f'{p}<button class="wordmark__version" type="button" data-version-trigger',
        f'{p}        aria-haspopup="true" aria-expanded="false"',
        f'{p}        aria-label="Sürüm {esc_attr(cur["no"])} — sürüm seç">',
        f'{p}  <span class="wordmark__version-label" data-text="{esc_attr(cur["no"])}">{esc(cur["no"])}</span>',
        f'{p}</button>',
        '',
        f'{p}<!-- Sürüm listesi content/site.json\'dan üretilir; buraya elle yazılan',
        f'{p}     her şey kaydetmede ezilir — yönetim panelini kullan. -->',
        f'{p}<div class="vmenu" role="menu" data-version-menu aria-label="Sürümler" hidden>',
    ]
    for v in site['surumler']:
        if v['durum'] == 'simdiki':
            L.append(f'{p}  <a class="vmenu__item is-current" role="menuitem" href="./" aria-current="true">')
            tag, kapat = 'şimdiki', 'a'
        elif v.get('sayfa'):
            L.append(f'{p}  <a class="vmenu__item" role="menuitem" href="{esc_attr(v["sayfa"])}">')
            tag, kapat = 'arşiv', 'a'
        else:
            L.append(f'{p}  <span class="vmenu__item" role="menuitem" aria-disabled="true">')
            tag, kapat = 'arşiv', 'span'
        L += [
            f'{p}    <span class="vmenu__no">{esc(v["no"])}</span>',
            f'{p}    <span class="vmenu__name">{esc(v["tur"])}</span>',
            f'{p}    <span class="vmenu__tag">{tag}</span>',
            f'{p}  </{kapat}>',
        ]
    L.append(f'{p}</div>')
    return '\n'.join(L)


def gen_kimlik(cur):
    """kurallar.html — ray logosu (4 boşluk taban girinti)."""
    no, tur = esc(cur['no']), esc(cur['tur'])
    aria = esc_attr(f'SLVNZ {cur["no"]} {cur["tur"]} — başlık sayfası')
    return (
        f'    <a class="rail__home" href="index.html" aria-label="{aria}">\n'
        f'      <span class="rail__lockup" aria-hidden="true">\n'
        f'        <span class="rail__mark">SLVNZ</span><span class="rail__ver">{no}</span>\n'
        f'        <span class="rail__genre">{tur}</span>\n'
        f'      </span>\n'
        f'    </a>'
    )


def gen_sayi(bolumler):
    return f'      <p class="rail__count">{len(bolumler)} Bölüm</p>'


def gen_toc(bolumler):
    L = ['    <ol class="toc__list">']
    for i, ch in enumerate(bolumler):
        no = f'{i + 1:02d}'
        L.append(
            f'      <li><a class="toc__link" href="#{esc_attr(ch["id"])}">'
            f'<span class="toc__label">{esc(ch["baslik"])}</span>'
            f'<span class="toc__no" aria-hidden="true">{no}</span></a></li>'
        )
    L.append('    </ol>')
    return '\n'.join(L)


def gen_panel(ch, i):
    no = f'{i + 1:02d}'
    L = [f'      <article class="panel" id="{esc_attr(ch["id"])}" aria-labelledby="b{no}" tabindex="-1" data-panel>']
    g = ch.get('gorsel')
    if g:
        # ilk bölüm açılışta görünür: öncelikli iner; ötekiler tembel yüklenir
        attrs = 'decoding="async" fetchpriority="high"' if i == 0 else 'decoding="async" loading="lazy"'
        L.append(f'        <figure class="panel__art" aria-hidden="true"{style_t(g.get("t"))}>')
        if g.get('webp'):
            L += [
                '          <picture>',
                f'            <source srcset="{esc_attr(g["webp"])}" type="image/webp">',
                f'            <img src="{esc_attr(g["img"])}" width="{int(g["w"])}" height="{int(g["h"])}"',
                f'                 alt="" {attrs} data-parallax>',
                '          </picture>',
            ]
        else:
            L += [
                f'          <img src="{esc_attr(g["img"])}" width="{int(g["w"])}" height="{int(g["h"])}"',
                f'               alt="" {attrs} data-parallax>',
            ]
        L.append('        </figure>')
    L += [
        '        <header class="panel__head">',
        f'          <p class="panel__no" aria-hidden="true">{no}</p>',
        f'          <h2 class="panel__title" id="b{no}"{style_t(ch.get("baslik_t"))}>{esc(ch["baslik"])}</h2>',
        '        </header>',
        '        <div class="panel__rich">',
    ]
    for line in ch.get('html', '').strip('\n').split('\n'):
        L.append(('          ' + line) if line.strip() else '')
    L += ['        </div>', '      </article>']
    return '\n'.join(L)


def gen_paneller(bolumler):
    return '\n\n'.join(gen_panel(ch, i) for i, ch in enumerate(bolumler))


def regenerate(site):
    """İşaretli bölgeleri üret; yalnız değişen dosyaları yaz."""
    cur = next(v for v in site['surumler'] if v['durum'] == 'simdiki')
    bolumler = site.get('kurallar', {}).get(cur['no'], {}).get('bolumler', [])
    yazilan = []

    p = ROOT / 'index.html'
    t0 = p.read_text(encoding='utf-8')
    t = replace_between(t0, 'surum', gen_surum_slot(site, cur), 10, 'index.html')
    t = re.sub(
        r'(<h1 class="wordmark" id="baslik" aria-label=")[^"]*(")',
        lambda m: m.group(1) + esc_attr(f'SLVNZ {cur["no"]} — {cur["tur"]}') + m.group(2), t)
    if t != t0:
        write_text(p, t)
        yazilan.append('index.html')

    p = ROOT / 'kurallar.html'
    t0 = p.read_text(encoding='utf-8')
    t = replace_between(t0, 'kimlik', gen_kimlik(cur), 4, 'kurallar.html')
    t = replace_between(t, 'bolum-sayisi', gen_sayi(bolumler), 6, 'kurallar.html')
    t = replace_between(t, 'bolumler', gen_toc(bolumler), 4, 'kurallar.html')
    t = replace_between(t, 'paneller', gen_paneller(bolumler), 6, 'kurallar.html')
    if t != t0:
        write_text(p, t)
        yazilan.append('kurallar.html')

    # Yetenekler sayfasının ray logosu da sürümü izler: sürüm değişince
    # orada eski numara kalmasın.
    if yetenek is not None:
        try:
            yazilan += [y for y in yetenek.sayfa_uret(gen_kimlik(cur)) if y not in yazilan]
        except Exception as e:
            print('yetenekler.html üretilemedi: %s' % e, file=sys.stderr)
    return yazilan


def yetenek_uret():
    """Yetenek yazımından sonra sayfayı ve JSON'u tazele. Ray logosu için
    şimdiki sürümü site.json'dan okur."""
    site = load_site()
    cur = next(v for v in site['surumler'] if v['durum'] == 'simdiki')
    return yetenek.sayfa_uret(gen_kimlik(cur))


# ---------------------------------------------------------------- mürekkep motoru
# Sitenin çizim geleneği: RGB'si saf siyah, saydamlığı mürekkebin koyuluğu olan
# PNG. Aydınlık temada siyah mürekkep kâğıtsız durur; karanlık temada
# kurallar.css `filter: invert(var(--art-invert))` uygular ve aynı dosya beyaz
# mürekkebe döner. Zemin saydam olduğundan iki temada da çerçeve görünmez.
#
# Naif 255−L dönüşümü yetmiyor: tarayıcı kâğıdı 255 değil 248 olabiliyor, geriye
# alfası 2–10 olan soluk bir kutu kalıyor. Motor bu yüzden kâğıt tonunu
# histogramın parlak ucundaki tepeden, mürekkep koyuluğunu alt yüzdelikten okur
# ve ikisi arasına doğrusal rampa kurar: kâğıt ve ondan açığı TAM saydam, en koyu
# mürekkep TAM opak olur.

KAGIT_TOL = 4              # kâğıt tepesinin kaç basamak altı da kâğıt sayılsın
MUREKKEP_DILIM = 0.005     # en koyu bu oran tam opak (%0,5)
_ALFA_ONBELLEK = {}


def _pil():
    try:
        from PIL import Image
        return Image
    except ImportError:
        return None


def gercek_alfa(path):
    """Dosyada GERÇEKTEN saydam piksel var mı?

    PNG renk tipi baytı yetmez: panel dışından kopyalanan RGBA çizimler tamamen
    opak olabiliyor ve sitede beyaz kutu görünüyorlar. mtime+boy ile
    önbelleklenir — /api/images her çağrıda bütün dosyaları çözmesin.
    """
    try:
        st = path.stat()
    except OSError:
        return False
    key = (str(path), st.st_mtime_ns, st.st_size)
    if key in _ALFA_ONBELLEK:
        return _ALFA_ONBELLEK[key]
    Image = _pil()
    if Image is None:
        sonuc = png_alfali(path)              # Pillow yoksa renk tipiyle yetin
    else:
        try:
            with Image.open(path) as im:
                sonuc = 'A' in im.getbands() and im.getchannel('A').getextrema()[0] < 255
        except Exception:
            sonuc = False
    _ALFA_ONBELLEK[key] = sonuc
    return sonuc


def _kenar_ort(lum):
    """Çerçeve şeridinin ortalama parlaklığı — zemin gerçekten açık mı?"""
    w, h = lum.size
    k = max(1, min(w, h) // 50)
    seritler = [lum.crop((0, 0, w, k)), lum.crop((0, h - k, w, h)),
                lum.crop((0, 0, k, h)), lum.crop((w - k, 0, w, h))]
    toplam = adet = 0
    for s in seritler:
        hist = s.histogram()
        toplam += sum(i * n for i, n in enumerate(hist))
        adet += sum(hist)
    return toplam / max(1, adet)


def beyazi_alfaya(data=None, path=None, tol=KAGIT_TOL):
    """Beyaz kâğıt → saydamlık, mürekkep → siyah + alfa.

    Dönüş: (RGBA görsel, rapor). Zemin açık değilse ValueError — koyu zeminli ya
    da fotoğraf bir görseli sessizce bozmaktansa dokunmamak doğrusu.
    """
    Image = _pil()
    if Image is None:
        raise ValueError('Pillow kurulu değil — "pip install Pillow" sonrası yeniden dene')
    im = Image.open(io.BytesIO(data)) if data is not None else Image.open(path)
    im.load()
    rapor = {'genislik': im.width, 'yukseklik': im.height}

    if 'A' in im.getbands() and im.getchannel('A').getextrema()[0] < 255:
        rapor.update({'zaten_alfali': True,
                      'not': 'Görselde saydamlık zaten vardı — olduğu gibi alındı'})
        return im.convert('RGBA'), rapor

    lum = im.convert('L')
    hist = lum.histogram()
    toplam = sum(hist) or 1
    kenar = _kenar_ort(lum)
    parlak = sum(hist[200:]) / toplam
    if kenar < 200 or parlak < 0.25:
        raise ValueError('Zemin açık değil (kenar parlaklığı %d/255, açık piksel %%%d) — '
                         'bu motor beyaz kâğıt üstüne çizim içindir'
                         % (round(kenar), round(parlak * 100)))

    kagit = max(range(200, 256), key=lambda v: hist[v])   # kâğıt tonu: parlak uçtaki tepe
    esik = MUREKKEP_DILIM * toplam
    birikim, murekkep = 0, 0
    for v in range(256):
        birikim += hist[v]
        if birikim >= esik:
            murekkep = v
            break
    beyaz = max(1, kagit - tol)
    murekkep = max(0, min(murekkep, beyaz - 20))          # rampa çökmesin

    olcek = 255.0 / max(1, beyaz - murekkep)
    tablo = [0 if v >= beyaz else 255 if v <= murekkep else int(round((beyaz - v) * olcek))
             for v in range(256)]
    rgba = Image.new('RGBA', im.size, (0, 0, 0, 0))
    rgba.putalpha(lum.point(tablo))

    shist = im.convert('RGB').resize((64, 64)).convert('HSV').getchannel('S').histogram()
    doygun = sum(i * n for i, n in enumerate(shist)) / max(1, sum(shist))
    rapor.update({'zaten_alfali': False, 'kagit': kagit, 'murekkep': murekkep,
                  'renkli': doygun > 28})
    if rapor['renkli']:
        rapor['not'] = 'Kaynak renkliydi — site geleneği gereği tek renk mürekkebe çevrildi'
    return rgba, rapor


def _yaz_cift(base, rgba):
    """İşlenmiş çifti diske yaz: <base>-alpha.png + <base>.webp"""
    rgba.save(IMGDIR / f'{base}-alpha.png', optimize=True)
    rgba.save(IMGDIR / f'{base}.webp', quality=90, method=6)
    return {'ad': base, 'img': f'assets/images/{base}-alpha.png',
            'webp': f'assets/images/{base}.webp',
            'w': rgba.width, 'h': rgba.height, 'islenmis': True}


# ---------------------------------------------------------------- görseller
def list_images():
    """Klasördeki çizimler. Ham/işlenmiş çifti olanlarda işlenmiş olan listelenir;
    tek başına duran dosyalar da listelenir ama saydamlığı yoksa `islenmis: False`
    ile — panel onlara "Arka planı temizle" düğmesi gösterir."""
    out, gorulen = [], set()
    pngler = {p.name for p in IMGDIR.glob('*.png')}
    webpler = {p.stem for p in IMGDIR.glob('*.webp')}
    for p in sorted(IMGDIR.glob('*.png')):
        if p.name.endswith('-alpha.png'):
            base = p.name[:-10]
        else:
            base = p.stem
            if f'{base}-alpha.png' in pngler:
                continue                      # ham kaynak; alfa çifti listelenir
        if base in gorulen:
            continue
        gorulen.add(base)
        img = f'{base}-alpha.png' if f'{base}-alpha.png' in pngler else f'{base}.png'
        w, h = png_boyut(IMGDIR / img)
        out.append({
            'ad': base,
            'img': f'assets/images/{img}',
            'webp': f'assets/images/{base}.webp' if base in webpler else None,
            'w': w, 'h': h,
            'islenmis': gercek_alfa(IMGDIR / img),
            'ham': f'{base}.png' in pngler,
        })
    return out


def process_image(ad, tol=KAGIT_TOL):
    """Klasörde duran bir çizimi işle — panelin "Arka planı temizle" düğmesi.

    Kaynak hep HAM dosyadır (<base>.png); yoksa <base>-alpha.png okunur. Üretim
    <base>-alpha.png + <base>.webp; ham dosyaya dokunulmaz, böylece eşik
    değiştirilip yeniden işlenebilir.
    """
    if not re.fullmatch(r'[a-z0-9-]+', ad or ''):
        raise ValueError('Geçersiz görsel adı')
    ham = IMGDIR / f'{ad}.png'
    alfali = IMGDIR / f'{ad}-alpha.png'
    kaynak = ham if ham.is_file() else alfali
    if not kaynak.is_file():
        raise ValueError(f'Görsel bulunamadı: {ad}')
    if kaynak == alfali and gercek_alfa(alfali):
        raise ValueError('Bu çizimin zemini zaten temiz — yeniden işlemek için ham .png gerekir')
    rgba, rapor = beyazi_alfaya(path=kaynak, tol=tol)
    entry = _yaz_cift(ad, rgba)
    entry['ham'] = ham.is_file()
    return entry, rapor


def save_upload(ad, data):
    if not re.fullmatch(r'[a-z0-9-]+\.png', ad or ''):
        raise ValueError('Dosya adı yalnız küçük harf, rakam ve tire olabilir: ornek-cizim.png')
    base0 = ad[:-4]
    base, k = base0, 2
    while (IMGDIR / f'{base}-alpha.png').exists() or (IMGDIR / f'{base}.png').exists():
        base, k = f'{base0}-{k}', k + 1
    (IMGDIR / f'{base}.png').write_bytes(data)     # ham hep kalsın: yeniden işlenebilsin
    try:
        rgba, rapor = beyazi_alfaya(data=data)
    except ValueError as e:
        # Pillow yok ya da zemin açık değil — ham durur, panel "işlenmemiş" der
        yol = IMGDIR / f'{base}.png'
        w, h = png_boyut(yol)
        return ({'ad': base, 'img': f'assets/images/{base}.png', 'webp': None,
                 'w': w, 'h': h, 'islenmis': gercek_alfa(yol), 'ham': True},
                {'not': str(e)})
    entry = _yaz_cift(base, rgba)
    entry['ham'] = True
    return entry, rapor


# ---------------------------------------------------------------- tuval modu
# Canvas editörü sayfayı iframe'e alır; site script'leri (panel geçişi, duman,
# sürüm menüsü) editörle yarışmasın diye çıkarılır. theme.js kalır — tuval,
# panelin temasını izler. Yalnız bellekte: diskteki dosyaya dokunulmaz.
EDIT_STRIP = re.compile(
    r'\s*<script src="assets/js/(?:nav|kurallar|ink-shader|version-menu)\.js" defer></script>')


def edit_html(name):
    return EDIT_STRIP.sub('', (ROOT / name).read_text(encoding='utf-8'))


# ---------------------------------------------------------------- git
def git_state():
    try:
        r = subprocess.run(['git', 'status', '--porcelain=v1', '-b'],
                           cwd=ROOT, capture_output=True, text=True, timeout=10)
        if r.returncode:
            return {'hata': (r.stderr or 'git hatası').strip()}
        lines = r.stdout.splitlines()
        dal = lines[0][3:].split('...')[0] if lines else '?'
        return {'dal': dal,
                'degisen': [{'durum': l[:2].strip(), 'yol': l[3:]} for l in lines[1:]]}
    except Exception as e:
        return {'hata': str(e)}


# ---------------------------------------------------------------- sunucu
class Handler(BaseHTTPRequestHandler):
    server_version = 'SLVNZYonetim/1'
    protocol_version = 'HTTP/1.1'

    # -- ortak --
    def _yerel(self):
        """DNS-rebinding'e karşı: Host ve Origin yerel olmalı."""
        host = (self.headers.get('Host') or '').split(':')[0]
        origin = self.headers.get('Origin')
        ohost = urlparse(origin).hostname if origin else None
        if host not in ('127.0.0.1', 'localhost') or (origin and ohost not in ('127.0.0.1', 'localhost')):
            self._json({'hata': ['Yalnız yerel erişim']}, 403)
            return False
        return True

    def _json(self, obj, code=200):
        body = json.dumps(obj, ensure_ascii=False).encode('utf-8')
        self.send_response(code)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Cache-Control', 'no-store')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def _body(self):
        n = int(self.headers.get('Content-Length') or 0)
        return self.rfile.read(n) if n else b''

    def _govde_json(self):
        """Gövdeyi JSON olarak çöz; bozuksa 400 yazıp None döner."""
        try:
            return json.loads(self._body().decode('utf-8') or '{}')
        except Exception:
            self._json({'hata': ['Gövde geçerli JSON değil']}, 400)
            return None

    def _yetenek_var(self):
        if yetenek is None:
            self._json({'hata': ['Yetenek modülü yüklenemedi: %s' % YETENEK_HATA]}, 500)
            return False
        return True

    def _static(self, path):
        rel = path.lstrip('/')
        if path == '/admin' or path == '/admin/':
            rel = 'admin/index.html'
        f = (ROOT / rel).resolve()
        if ROOT not in f.parents and f != ROOT:
            self._json({'hata': ['geçersiz yol']}, 400)
            return
        if f.is_dir():
            f = f / 'index.html'
        if not f.is_file():
            self.send_response(404)
            self.send_header('Content-Type', 'text/plain; charset=utf-8')
            body = 'bulunamadı'.encode('utf-8')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        body = f.read_bytes()
        self.send_response(200)
        self.send_header('Content-Type', MIME.get(f.suffix.lower(), 'application/octet-stream'))
        self.send_header('Cache-Control', 'no-store')   # yerel araç: bayat CSS/JS derdi olmasın
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    # -- yöntemler --
    def do_GET(self):
        if not self._yerel():
            return
        u = urlparse(self.path)
        path = u.path
        if path in ('/index.html', '/kurallar.html') and 'edit' in parse_qs(u.query):
            body = edit_html(path.lstrip('/')).encode('utf-8')
            self.send_response(200)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.send_header('Cache-Control', 'no-store')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            self.wfile.write(body)
        elif path == '/api/site':
            self._json(load_site())
        elif path == '/api/images':
            self._json(list_images())
        elif path == '/api/git':
            self._json(git_state())
        elif path == '/api/yetenek':
            if not self._yetenek_var():
                return
            try:
                self._json({'durum': yetenek.db.durum(),
                            'sozluk': yetenek.sozluk(),
                            'yetenekler': yetenek.liste()})
            except Exception as e:
                self._json({'hata': ['Veritabanı okunamadı: %s' % e]}, 500)
        elif path == '/':
            self.send_response(302)
            self.send_header('Location', '/admin/')
            self.send_header('Content-Length', '0')
            self.end_headers()
        else:
            self._static(path)

    def do_PUT(self):
        if not self._yerel():
            return
        u = urlparse(self.path)
        if u.path == '/api/site':
            try:
                site = json.loads(self._body().decode('utf-8'))
            except Exception:
                self._json({'hata': ['Gövde geçerli JSON değil']}, 400)
                return
            errs = validate(site)
            if errs:
                self._json({'hata': errs}, 400)
                return
            write_text(SITE_JSON, json.dumps(site, ensure_ascii=False, indent=2) + '\n')
            try:
                yazilan = regenerate(site)
            except RuntimeError as e:
                self._json({'hata': [str(e)]}, 500)
                return
            self._json({'tamam': True,
                        'yazilan': ['content/site.json'] + yazilan,
                        'git': git_state()})
        elif u.path == '/api/upload':
            ad = (parse_qs(u.query).get('ad') or [''])[0]
            try:
                entry, rapor = save_upload(ad, self._body())
            except ValueError as e:
                self._json({'hata': [str(e)]}, 400)
                return
            self._json({'tamam': True, 'gorsel': entry, 'rapor': rapor})
        elif u.path == '/api/islem':
            q = parse_qs(u.query)
            ad = (q.get('ad') or [''])[0]
            try:
                tol = int((q.get('tol') or [KAGIT_TOL])[0])
            except ValueError:
                tol = KAGIT_TOL
            try:
                entry, rapor = process_image(ad, max(0, min(40, tol)))
            except ValueError as e:
                self._json({'hata': [str(e)]}, 400)
                return
            self._json({'tamam': True, 'gorsel': entry, 'rapor': rapor})
        elif u.path.startswith('/api/yetenek'):
            self._yetenek_yaz(u)
        else:
            self._json({'hata': ['bilinmeyen uç']}, 404)

    do_POST = do_PUT

    def do_DELETE(self):
        if not self._yerel():
            return
        u = urlparse(self.path)
        if u.path.startswith('/api/yetenek'):
            self._yetenek_yaz(u, silme=True)
        else:
            self._json({'hata': ['bilinmeyen uç']}, 404)

    # ------------------------------------------------------------- yetenekler
    # Her başarılı yazımdan sonra yetenekler.html ve content/yetenekler.json
    # yeniden üretilir: veritabanı YAZIM tarafı, üretilmiş dosyalar OKUMA
    # tarafıdır — yayındaki statik site veritabanına bağlanamaz.
    def _yetenek_yaz(self, u, silme=False):
        if not self._yetenek_var():
            return
        q = parse_qs(u.query)
        yol = u.path

        try:
            if yol == '/api/yetenek/sozluk':
                tablo = (q.get('tablo') or [''])[0]
                if silme:
                    hata = yetenek.sozluk_sil(tablo, (q.get('id') or [''])[0])
                    sid = None
                else:
                    veri = self._govde_json()
                    if veri is None:
                        return
                    sid, hata = yetenek.sozluk_kaydet(tablo, veri)
                if hata:
                    self._json({'hata': hata}, 400)
                    return
                self._json({'tamam': True, 'id': sid, 'sozluk': yetenek.sozluk(),
                            'yazilan': yetenek_uret(), 'git': git_state()})

            elif yol == '/api/yetenek/ice-aktar':
                n, hata = yetenek.ice_aktar(zorla=True)
                self._json({'tamam': True, 'sayi': n, 'hata': hata,
                            'yetenekler': yetenek.liste(),
                            'yazilan': yetenek_uret(), 'git': git_state()})

            elif yol == '/api/yetenek/uret':
                self._json({'tamam': True, 'yazilan': yetenek_uret(), 'git': git_state()})

            elif yol == '/api/yetenek':
                if silme:
                    hata = yetenek.sil((q.get('id') or [''])[0])
                    yid = None
                else:
                    veri = self._govde_json()
                    if veri is None:
                        return
                    yid, hata = yetenek.kaydet(veri)
                if hata:
                    self._json({'hata': hata}, 400)
                    return
                self._json({'tamam': True, 'id': yid,
                            'yetenekler': yetenek.liste(),
                            'yazilan': yetenek_uret(), 'git': git_state()})
            else:
                self._json({'hata': ['bilinmeyen uç']}, 404)
        except Exception as e:
            yetenek.db.islem_geri()
            self._json({'hata': ['Yetenek işlemi başarısız: %s' % e]}, 500)

    def do_HEAD(self):
        # Bazı istemciler (önizleme araçları, sağlık yoklamaları) HEAD atıyor.
        # Tanımlı olmadığı sürece taban sınıf 501 üretiyor ve o yol
        # log_message'ı metin olmayan argümanlarla çağırıyordu.
        self.do_GET()

    def log_message(self, fmt, *args):
        # Yalnız API ve hataları yaz; statik dosya gürültüsü olmasın.
        # args[0] her zaman istek satırı DEĞİL: send_error() buraya
        # (HTTPStatus, mesaj) ikilisiyle gelir ve `'/api/' in args[0]`
        # TypeError atıp isteği işleyen iş parçacığını düşürüyordu.
        ilk = str(args[0]) if args else ''
        kod = str(args[1]) if len(args) > 1 else ''
        if '/api/' not in ilk and kod < '400':
            return
        try:
            satir = fmt % args
        except Exception:
            satir = ' '.join(str(a) for a in args)
        sys.stderr.write('%s %s\n' % (self.address_string(), satir))


def main():
    # Windows konsolu varsayılan cp1252 — Türkçe çıktı için UTF-8'e geç
    for stream in (sys.stdout, sys.stderr):
        try:
            stream.reconfigure(encoding='utf-8', errors='replace')
        except Exception:
            pass
    # Yetenek veritabanı: şemayı kur, boşsa content/yetenekler.json'dan geri
    # yükle. Taze bir klonda ya da MySQL'e yeni geçildiğinde veri buradan gelir.
    if yetenek is not None:
        try:
            d = yetenek.db.durum()
            print('yetenek veritabanı → %s' % d['not'])
            n, hatalar = yetenek.ice_aktar()
            if n:
                print('  content/yetenekler.json içinden %d yetenek geri yüklendi' % n)
            for h in hatalar:
                print('  ! %s' % h, file=sys.stderr)
        except Exception as e:
            print('yetenek veritabanı açılamadı: %s' % e, file=sys.stderr)
    else:
        print('yetenek modülü yüklenemedi: %s' % YETENEK_HATA, file=sys.stderr)

    srv = ThreadingHTTPServer((HOST, PORT), Handler)
    print(f'SLVNZ yönetim → http://{HOST}:{PORT}/  (durdurmak için Ctrl+C)')
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        pass


if __name__ == '__main__':
    main()
