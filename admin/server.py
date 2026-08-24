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


# ---------------------------------------------------------------- doğrulama
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
        L.append('        <figure class="panel__art" aria-hidden="true">')
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
        f'          <h2 class="panel__title" id="b{no}">{esc(ch["baslik"])}</h2>',
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
    return yazilan


# ---------------------------------------------------------------- görseller
def list_images():
    """Kullanılabilir çizimler: alfa çifti olanlar + kendisi alfalı png'ler."""
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
            if not png_alfali(p):
                continue                      # düz RGB — sitede kutu görünür
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
        })
    return out


def save_upload(ad, data):
    if not re.fullmatch(r'[a-z0-9-]+\.png', ad or ''):
        raise ValueError('Dosya adı yalnız küçük harf, rakam ve tire olabilir: ornek-cizim.png')
    base0 = ad[:-4]
    base, k = base0, 2
    while (IMGDIR / f'{base}-alpha.png').exists() or (IMGDIR / f'{base}.png').exists():
        base, k = f'{base0}-{k}', k + 1
    try:
        from PIL import Image
    except ImportError:
        # Pillow yoksa ham kaydet — çizim zaten alfalıysa sorunsuz çalışır
        (IMGDIR / f'{base}.png').write_bytes(data)
        w, h = png_boyut(IMGDIR / f'{base}.png')
        return {'ad': base, 'img': f'assets/images/{base}.png', 'webp': None, 'w': w, 'h': h}
    im = Image.open(io.BytesIO(data))
    im.load()
    if 'A' in im.getbands() and im.getchannel('A').getextrema()[0] < 255:
        rgba = im.convert('RGBA')             # zaten saydam — dokunma
    else:
        # site geleneği: beyaz kâğıt üstüne siyah mürekkep → beyaz alfaya döner
        l = im.convert('L')
        rgba = Image.new('RGBA', im.size, (0, 0, 0, 0))
        rgba.putalpha(l.point(lambda v: 255 - v))
    rgba.save(IMGDIR / f'{base}-alpha.png', optimize=True)
    rgba.save(IMGDIR / f'{base}.webp', quality=90, method=6)
    return {'ad': base, 'img': f'assets/images/{base}-alpha.png',
            'webp': f'assets/images/{base}.webp', 'w': rgba.width, 'h': rgba.height}


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
        path = urlparse(self.path).path
        if path == '/api/site':
            self._json(load_site())
        elif path == '/api/images':
            self._json(list_images())
        elif path == '/api/git':
            self._json(git_state())
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
                entry = save_upload(ad, self._body())
            except ValueError as e:
                self._json({'hata': [str(e)]}, 400)
                return
            self._json({'tamam': True, 'gorsel': entry})
        else:
            self._json({'hata': ['bilinmeyen uç']}, 404)

    do_POST = do_PUT

    def log_message(self, fmt, *args):
        # yalnız API ve hataları yaz; statik dosya gürültüsü olmasın
        if '/api/' in (args[0] if args else '') or (args and str(args[1]) >= '400'):
            sys.stderr.write('%s %s\n' % (self.address_string(), fmt % args))


def main():
    # Windows konsolu varsayılan cp1252 — Türkçe çıktı için UTF-8'e geç
    for stream in (sys.stdout, sys.stderr):
        try:
            stream.reconfigure(encoding='utf-8', errors='replace')
        except Exception:
            pass
    srv = ThreadingHTTPServer((HOST, PORT), Handler)
    print(f'SLVNZ yönetim → http://{HOST}:{PORT}/  (durdurmak için Ctrl+C)')
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        pass


if __name__ == '__main__':
    main()
