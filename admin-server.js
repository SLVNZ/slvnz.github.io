const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: "5mb" }));

const ROOT = __dirname;
app.use(express.static(ROOT));

// ── Güvenli dosya adı kontrolü ──────────────────────────────
function safeFilename(filename) {
  return typeof filename === "string"
    && filename.endsWith(".html")
    && !filename.includes("/")
    && !filename.includes("\\")
    && !filename.includes("..");
}

// ── Korunan sayfalar ───────────────────────────────────────
const PROTECTED = [
  "index.html", "game-rules.html", "game-skills.html",
  "game-guide.html", "labirent-oda-paneli.html"
];

// ═══════════ MEVCUT ENDPOINT'LER ═══════════════════════════

// Enerjisel Yetenekler oku
app.get("/api/yetenekler", (req, res) => {
  const file = path.join(ROOT, "yetenekler.json");
  fs.readFile(file, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "yetenekler.json okunamadı" });
    try { res.json(JSON.parse(data || "[]")); } catch { res.status(500).json({ error: "Parse hatası" }); }
  });
});

app.post("/api/yetenekler", (req, res) => {
  if (!Array.isArray(req.body)) return res.status(400).json({ error: "Dizi bekleniyor" });
  fs.writeFile(path.join(ROOT, "yetenekler.json"), JSON.stringify(req.body, null, 2), "utf8", (err) => {
    if (err) return res.status(500).json({ error: "Yazılamadı" });
    res.json({ ok: true });
  });
});

// Enerji Akımları oku
app.get("/api/enerji-akimlari", (req, res) => {
  const file = path.join(ROOT, "admin", "enerji-akimlari.json");
  fs.readFile(file, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: "enerji-akimlari.json okunamadı" });
    try { res.json(JSON.parse(data || "[]")); } catch { res.status(500).json({ error: "Parse hatası" }); }
  });
});

app.post("/api/enerji-akimlari", (req, res) => {
  if (!Array.isArray(req.body)) return res.status(400).json({ error: "Dizi bekleniyor" });
  fs.writeFile(path.join(ROOT, "admin", "enerji-akimlari.json"), JSON.stringify(req.body, null, 2), "utf8", (err) => {
    if (err) return res.status(500).json({ error: "Yazılamadı" });
    res.json({ ok: true });
  });
});

// ═══════════ YENİ ENDPOINT'LER ═════════════════════════════

// Tüm HTML sayfalarını listele
app.get("/api/page-list", (req, res) => {
  fs.readdir(ROOT, (err, files) => {
    if (err) return res.status(500).json({ error: err.message });
    const htmlFiles = files
      .filter(f => f.endsWith(".html"))
      .map(filename => {
        const stat = fs.statSync(path.join(ROOT, filename));
        return { filename, size: stat.size, modified: stat.mtime };
      });
    res.json(htmlFiles);
  });
});

// HTML sayfa içeriğini oku
app.get("/api/read-page/:filename", (req, res) => {
  const { filename } = req.params;
  if (!safeFilename(filename)) return res.status(400).json({ error: "Geçersiz dosya adı" });
  const file = path.join(ROOT, filename);
  fs.readFile(file, "utf8", (err, data) => {
    if (err) return res.status(404).json({ error: "Dosya bulunamadı" });
    res.json({ content: data });
  });
});

// HTML sayfayı kaydet (yeni oluştur veya güncelle)
app.post("/api/save-page", (req, res) => {
  const { filename, content } = req.body;
  if (!safeFilename(filename)) return res.status(400).json({ error: "Geçersiz dosya adı" });
  if (!content) return res.status(400).json({ error: "İçerik boş olamaz" });
  const file = path.join(ROOT, filename);
  fs.writeFile(file, content, "utf8", (err) => {
    if (err) return res.status(500).json({ error: "Dosya yazılamadı: " + err.message });
    console.log(`[Admin] Sayfa kaydedildi: ${filename}`);
    res.json({ ok: true });
  });
});

// HTML sayfayı sil
app.delete("/api/delete-page/:filename", (req, res) => {
  const { filename } = req.params;
  if (!safeFilename(filename)) return res.status(400).json({ error: "Geçersiz dosya adı" });
  if (PROTECTED.includes(filename)) return res.status(403).json({ error: "Bu sayfa silinemez (sistem sayfası)" });
  const file = path.join(ROOT, filename);
  if (!fs.existsSync(file)) return res.status(404).json({ error: "Dosya bulunamadı" });
  fs.unlink(file, (err) => {
    if (err) return res.status(500).json({ error: "Dosya silinemedi: " + err.message });
    console.log(`[Admin] Sayfa silindi: ${filename}`);
    res.json({ ok: true });
  });
});

// Site yapılandırmasını oku
app.get("/api/site-config", (req, res) => {
  const file = path.join(ROOT, "admin", "site-config.json");
  if (!fs.existsSync(file)) return res.json({});
  fs.readFile(file, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    try { res.json(JSON.parse(data)); } catch { res.status(500).json({ error: "Parse hatası" }); }
  });
});

// Site yapılandırmasını kaydet
app.post("/api/site-config", (req, res) => {
  const file = path.join(ROOT, "admin", "site-config.json");
  fs.writeFile(file, JSON.stringify(req.body, null, 2), "utf8", (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ ok: true });
  });
});

// Genel JSON dosyası oku (admin klasöründeki)
app.get("/api/json/:filename", (req, res) => {
  const { filename } = req.params;
  if (!filename.endsWith(".json") || filename.includes("/") || filename.includes("..")) {
    return res.status(400).json({ error: "Geçersiz dosya adı" });
  }
  const file = path.join(ROOT, "admin", filename);
  if (!fs.existsSync(file)) return res.json([]);
  fs.readFile(file, "utf8", (err, data) => {
    if (err) return res.status(500).json({ error: err.message });
    try { res.json(JSON.parse(data)); } catch { res.status(500).json({ error: "Parse hatası" }); }
  });
});

// Genel JSON dosyası kaydet (admin klasörüne)
app.post("/api/json/:filename", (req, res) => {
  const { filename } = req.params;
  if (!filename.endsWith(".json") || filename.includes("/") || filename.includes("..")) {
    return res.status(400).json({ error: "Geçersiz dosya adı" });
  }
  const file = path.join(ROOT, "admin", filename);
  fs.writeFile(file, JSON.stringify(req.body, null, 2), "utf8", (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ ok: true });
  });
});

// ═══════════ SUNUCU BAŞLAT ═════════════════════════════════

app.listen(PORT, () => {
  console.log(`\n╔══════════════════════════════════════╗`);
  console.log(`║   SLVNZ Admin Sunucusu Çalışıyor    ║`);
  console.log(`║   http://localhost:${PORT}             ║`);
  console.log(`╚══════════════════════════════════════╝`);
  console.log(`\n▶ Admin Paneli: http://localhost:${PORT}/admin/index.html`);
  console.log(`▶ Eski Dashboard: http://localhost:${PORT}/admin/admin-dashboard.html\n`);
});
