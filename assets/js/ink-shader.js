/* SLVNZ — duman (WebGL fragment shader)
   ============================================================================
   Kâğıdın üzerinde alana dağılmış, ağır ağır dönen prosedürel duman. İmleç
   dumanı sürükler ve ardından usulca kıvrılır. Süs değil zemin: içerik hep
   önde, canvas pointer-events almaz.

   Görünüşü belirleyen dört karar
   ------------------------------
   1) Quintic yumuşatma (Perlin'in 6t⁵−15t⁴+10t³). Klasik kübik `f*f*(3-2f)`
      ikinci türevinde süreksiz; geniş ve yavaş alanlarda kafes çizgileri
      boyunca "kırışıklık" olarak görünür. Quintic C² sürekli — pürüzsüz.
   2) Oktavlar arasında dönme (mat2(.8,.6,-.6,.8) ≈ 36.87°) ve tam sayı
      olmayan lacunarity (2.02). İkisi de eksen hizalı kafes desenini kırar.
   3) İki katmanlı domain warp (IQ): q = fbm(p), r = fbm(p+q), d = fbm(p+r).
      Duman kütlelerini kendi içinde katlar — tek fbm'in "leke" hâlinden çıkarır.
   4) Sert eşik yerine yumuşak güç eğrisi. smoothstep ile kesilen yoğunluk
      kenarları belli baloncuklar yapar; pow() uzun bir kuyruk bırakır, duman
      seyreldiği yerde usulca yok olur.

   GPU'yu minimumda tutan kararlar
   -------------------------------
   - `powerPreference: "low-power"` — tarayıcı tümleşik GPU'yu seçer
   - kare hızı 30fps tavanlı; imleç 2.5sn kıpırdamazsa 20fps'e iner
   - iç çözünürlük uzun kenar ≤ 640px (duman alçak frekanslı, büyütme belli olmaz)
   - warp fbm'leri 3, ana fbm 4 oktav — kare başına 16 gürültü örneği
   - doku/FBO/çoklu geçiş yok; tek tam ekran üçgen, harmanlama kapalı
   - sekme gizliyken tamamen durur; WebGL yoksa sessizce hiç görünmez
   - hareket azaltılmışsa tek durağan kare çizilir

   > Not: canvas varsayılan olarak **premultiplied alpha** bekler. Düz renk +
   > alfa yazmak (rgb > a) geçersiz bir piksel üretir; tarayıcı kırpar ve
   > sonuç ya soluk ya kirli çıkar. Bu yüzden çıktı premultiplied: rgb *= a.
   ========================================================================== */
(function () {
  var canvas = document.querySelector('canvas.mist');
  if (!canvas) return;

  var gl = canvas.getContext('webgl', {
    alpha: true, antialias: false, depth: false, stencil: false,
    premultipliedAlpha: true, powerPreference: 'low-power'
  });
  if (!gl) { canvas.remove(); return; }

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---- kaynak ------------------------------------------------------------ */
  var VERT =
    'attribute vec2 a;' +
    'void main(){gl_Position=vec4(a,0.,1.);}';

  var FRAG = [
    /* mediump'ta 10 bit mantis, geniş koordinatlarda basamaklanır */
    '#ifdef GL_FRAGMENT_PRECISION_HIGH',
    'precision highp float;',
    '#else',
    'precision mediump float;',
    '#endif',
    '',
    'uniform vec2  u_res;',
    'uniform float u_time;',
    'uniform vec3  u_ink;',
    'uniform float u_alpha;',
    'uniform vec4  u_ptr;',        /* xy: yumuşatılmış imleç · zw: hızı */
    'uniform float u_fill;',       /* 0→1 giriş dolumu (karanlığa geçiş) */
    '',
    /* altın oran karması — sin() yok, mediump'ta da kararlı */
    'float hash(vec2 p){',
    '  p = fract(p * vec2(0.3183099, 0.3678794));',
    '  p += dot(p, p + 19.19);',
    '  return fract(p.x * p.y);',
    '}',
    '',
    /* quintic yumuşatmalı değer gürültüsü — C² sürekli, kafes kırışmaz */
    'float noise(vec2 p){',
    '  vec2 i = floor(p), f = fract(p);',
    '  vec2 u = f*f*f*(f*(f*6.0-15.0)+10.0);',
    '  return mix(mix(hash(i),            hash(i+vec2(1.0,0.0)), u.x),',
    '             mix(hash(i+vec2(0.0,1.0)), hash(i+vec2(1.0,1.0)), u.x), u.y);',
    '}',
    '',
    /* oktavlar arası dönme — eksen hizalı deseni kırar */
    'const mat2 M = mat2(0.80, 0.60, -0.60, 0.80);',
    '',
    'float fbm3(vec2 p, float t){',
    '  float v = 0.0, a = 0.5;',
    '  for(int i=0;i<3;i++){',
    '    v += a * noise(p);',
    '    p = M * p * 2.02 + vec2(t, -t*0.63);',
    '    a *= 0.52;',
    '  }',
    '  return v;',
    '}',
    'float fbm4(vec2 p, float t){',
    '  float v = 0.0, a = 0.5;',
    '  for(int i=0;i<4;i++){',
    '    v += a * noise(p);',
    '    p = M * p * 2.02 + vec2(t, -t*0.63);',
    '    a *= 0.52;',
    '  }',
    '  return v;',
    '}',
    '',
    'void main(){',
    '  vec2 uv = gl_FragCoord.xy / u_res;',
    '  float asp = u_res.x / u_res.y;',
    '  vec2 sp = vec2(uv.x * asp, uv.y);',   /* en-boy düzeltilmiş, y yukarı */
    '',
    /* -- imleç: sürükleme + kıvrım ------------------------------------------
       Gauss ağırlık (exp(-r²k)) hiçbir yerde kenar üretmez — eski sürümdeki
       "mercek" halkası buradan geliyordu. Örnek noktası hızın TERSİNE kayar;
       böylece desen imleçle aynı yöne sürüklenmiş görünür. Dikey bileşen
       (perp(d)) strokun ardında usul bir girdap bırakır.                    */
    '  vec2 d = sp - u_ptr.xy;',
    '  float w = exp(-dot(d, d) * 7.0);',
    '  float spd = min(length(u_ptr.zw), 1.6);',
    '  vec2 flow = -u_ptr.zw * 0.42 + vec2(-d.y, d.x) * spd * 0.85;',
    '  sp += flow * w;',
    '',
    /* dolum sırasında örnekleme ölçeği 1.22'den 1.0'a iner: kütleler
       büyüyerek yayılır — duman kabararak alanı kaplar */
    '  vec2 p = sp * (2.35 * mix(1.22, 1.0, u_fill));',
    '  float t = u_time * 0.05;',
    '',
    /* -- iki katmanlı domain warp (IQ) ------------------------------------- */
    '  vec2 q = vec2(fbm3(p, t),',
    '                fbm3(p + vec2(5.2, 1.3), t));',
    '  vec2 r = vec2(fbm3(p + 1.75*q + vec2(1.7, 9.2), t*1.25),',
    '                fbm3(p + 1.75*q + vec2(8.3, 2.8), t*0.85));',
    /* duman usulca yükselir: y'den düşmek deseni yukarı taşır */
    '  float f = fbm4(p + 1.45*r - vec2(0.0, u_time*0.012), t*0.7);',
    '',
    /* -- yumuşak yoğunluk ---------------------------------------------------
       Sert smoothstep baloncuk yapar; güç eğrisi seyrek yerlerde uzun bir
       kuyruk bırakıp yok olur. q.x ile büyük ölçekli bir dalgalanma, dumanın
       alanda eşit değil kütleler hâlinde dağılmasını sağlar.                */
    /* Eşik dolumla 1.05'ten 0.22'ye iner: önce hiçbir yer geçmez, sonra en
       yoğun çekirdekler belirir ve yayılır. uv.y payı alt kenarın önce
       dolmasını sağlar — duman yükselerek alanı doldurur. u_fill=1'de
       terim doyar, yani bitişte tam olarak normal görünüme oturur. */
    '  float bloom = clamp(u_fill * 1.35 - uv.y * 0.35, 0.0, 1.0);',
    '  float dens = pow(clamp(f * 1.45 - mix(1.05, 0.22, bloom), 0.0, 1.0), 1.7);',
    '  dens *= mix(0.55, 1.25, clamp(q.x, 0.0, 1.0));',
    '  dens *= smoothstep(0.0, 0.30, u_fill);',   /* ilk anlarda fazladan yumuşak */
    '',
    /* 8 bit kuantalama bandını kıran çok ince serpme (kâğıt taneciği gibi) */
    '  float dith = (hash(gl_FragCoord.xy) - 0.5) * (1.6/255.0);',
    '',
    '  float a = clamp(dens * u_alpha + dith, 0.0, 1.0);',
    '  gl_FragColor = vec4(u_ink * a, a);',   /* premultiplied */
    '}'
  ].join('\n');

  function compile(type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) return null;
    return s;
  }

  var vs = compile(gl.VERTEX_SHADER, VERT);
  var fs = compile(gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) { canvas.remove(); return; }

  var prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) { canvas.remove(); return; }
  gl.useProgram(prog);

  /* tam ekran üçgen — quad'dan bir üçgen ucuz, kenar dikişi yok */
  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  var loc = gl.getAttribLocation(prog, 'a');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  var uRes   = gl.getUniformLocation(prog, 'u_res');
  var uTime  = gl.getUniformLocation(prog, 'u_time');
  var uInk   = gl.getUniformLocation(prog, 'u_ink');
  var uAlpha = gl.getUniformLocation(prog, 'u_alpha');
  var uPtr   = gl.getUniformLocation(prog, 'u_ptr');
  var uFill  = gl.getUniformLocation(prog, 'u_fill');

  /* tek üçgen tüm alanı kaplıyor ve çıktı premultiplied — harmanlamaya
     gerek yok, kapalı olması dolgu hızını da bir tık düşürür */
  gl.disable(gl.BLEND);

  /* ---- tema: karanlık mı? ------------------------------------------------ */
  /* theme.js ile aynı mantık, ona bağımlılık kurmadan: açık bir seçim varsa o,
     yoksa işletim sistemi tercihi. */
  var darkMq = window.matchMedia('(prefers-color-scheme: dark)');
  function isDark() {
    var t = document.documentElement.getAttribute('data-theme');
    return t === 'dark' || (t !== 'light' && darkMq.matches);
  }

  /* ---- giriş dolumu ------------------------------------------------------- */
  /* Karanlığa geçildiğinde (ve karanlıkta açılışta) duman yoktan var olup
     alanı aşağıdan yukarı doldurur. Aydınlıkta dolum yok: orada duman zaten
     çok soluk, animasyon gürültü olurdu. */
  var FILL_MS = 1800;
  var fillStart = -1e9;

  function startFill() { fillStart = reduce.matches ? -1e9 : performance.now(); }
  function fillAt(now) {
    if (reduce.matches) return 1;
    var x = (now - fillStart) / FILL_MS;
    if (x >= 1) return 1;
    if (x <= 0) return 0;
    return x * x * x * (x * (x * 6 - 15) + 10);        /* smootherstep */
  }

  /* ---- tema: duman rengi token'lardan ------------------------------------ */
  function readInk() {
    var cs = getComputedStyle(document.documentElement);
    var ink = (cs.getPropertyValue('--mist-ink') || '30,30,30').split(',').map(Number);
    var alpha = parseFloat(cs.getPropertyValue('--mist-alpha'));
    gl.uniform3f(uInk, (ink[0] || 0) / 255, (ink[1] || 0) / 255, (ink[2] || 0) / 255);
    gl.uniform1f(uAlpha, isNaN(alpha) ? 0.05 : alpha);
  }

  /* ---- boyut: uzun kenar ≤ 640 iç piksel --------------------------------- */
  var MAX_DIM = 640;
  function resize() {
    var w = canvas.clientWidth || 1, h = canvas.clientHeight || 1;
    var s = Math.min(0.5, MAX_DIM / Math.max(w, h));
    var iw = Math.max(1, Math.round(w * s));
    var ih = Math.max(1, Math.round(h * s));
    if (canvas.width !== iw || canvas.height !== ih) {
      canvas.width = iw; canvas.height = ih;
      gl.viewport(0, 0, iw, ih);
      gl.uniform2f(uRes, iw, ih);
    }
    aspect = iw / ih;
  }

  /* ---- imleç: ataletli takip --------------------------------------------- */
  /* Ham imleç konumu doğrudan shader'a gitmez. Hedefe yavaşça yaklaşan bir
     konum ve ondan türeyen, kendi de sönümlenen bir hız tutulur: duman
     imlecin ardından gecikmeli gelir, dururken usulca yatışır. Sıçrama yok. */
  var aspect = 1;
  var tgtX = 0.5, tgtY = 0.6;          /* ham hedef (uv, y yukarı)           */
  var posX = 0.5, posY = 0.6;          /* yumuşatılmış konum                 */
  var velX = 0, velY = 0;              /* yumuşatılmış hız                   */
  var lastMove = -1e9;
  var seen = false;

  window.addEventListener('pointermove', function (e) {
    tgtX = e.clientX / window.innerWidth;
    tgtY = 1 - e.clientY / window.innerHeight;
    if (!seen) { posX = tgtX; posY = tgtY; seen = true; }   /* ilk temasta ışınlan */
    lastMove = performance.now();
    kick();
  }, { passive: true });

  /* imleç pencereden çıkınca hız sıfıra doğru söner (aşağıdaki sönümleme) */
  window.addEventListener('pointerleave', function () { lastMove = 0; }, { passive: true });

  function stepPointer() {
    var px = posX, py = posY;
    posX += (tgtX - posX) * 0.085;      /* tembel takip */
    posY += (tgtY - posY) * 0.085;
    /* hız: karedeki yer değiştirme, kendi de yumuşatılıp sönümleniyor */
    velX = velX * 0.90 + (posX - px) * 2.2;
    velY = velY * 0.90 + (posY - py) * 2.2;
    gl.uniform4f(uPtr, posX * aspect, posY, velX, velY);
  }

  /* ---- döngü: 30fps tavan, boştayken 20fps -------------------------------- */
  var ACTIVE_MS = 33, IDLE_MS = 50, IDLE_AFTER = 2500;
  var start = performance.now();
  var last = 0;
  var raf = null;

  function frame(now) {
    raf = null;
    if (reduce.matches || document.hidden) return;
    raf = requestAnimationFrame(frame);
    /* dolum sürerken boşta moduna düşme — geçiş pürüzsüz kalsın */
    var filling = (now - fillStart) < FILL_MS;
    var budget = (!filling && now - lastMove > IDLE_AFTER) ? IDLE_MS : ACTIVE_MS;
    if (now - last < budget - 1) return;          /* kare atlama = daha az GPU */
    last = now;
    resize();
    stepPointer();
    gl.uniform1f(uFill, fillAt(now));
    gl.uniform1f(uTime, (now - start) / 1000);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  function kick() {
    if (gl.isContextLost && gl.isContextLost()) return;
    if (reduce.matches) {                          /* tek durağan kare */
      resize();
      gl.uniform4f(uPtr, 0.5 * aspect, 0.6, 0, 0);
      gl.uniform1f(uFill, 1.0);
      gl.uniform1f(uTime, 14.0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      return;
    }
    if (!raf && !document.hidden) raf = requestAnimationFrame(frame);
  }

  readInk();
  gl.uniform1f(uFill, 1.0);
  if (isDark()) startFill();      /* karanlıkta açılış da dolarak gelir */
  kick();

  document.addEventListener('visibilitychange', kick);
  window.addEventListener('resize', kick, { passive: true });
  reduce.addEventListener && reduce.addEventListener('change', kick);

  /* Tema değişince rengi tazele; yalnızca aydınlık→karanlık geçişinde dolumu
     başlat. Karanlık→karanlık (ör. sistem tercihi değişti ama sonuç aynı)
     tetiklemez; karanlıktan çıkışta dolum iptal olur. */
  var wasDark = isDark();
  function onTheme() {
    var d = isDark();
    if (d && !wasDark) startFill();
    else if (!d) { fillStart = -1e9; gl.uniform1f(uFill, 1.0); }
    wasDark = d;
    readInk();
    kick();
  }
  new MutationObserver(onTheme)
    .observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  darkMq.addEventListener && darkMq.addEventListener('change', onTheme);

  canvas.addEventListener('webglcontextlost', function (e) { e.preventDefault(); raf = null; }, false);
  canvas.addEventListener('webglcontextrestored', function () { readInk(); kick(); }, false);
})();
