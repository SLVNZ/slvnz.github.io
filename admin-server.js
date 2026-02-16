const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// JSON gövdesini okumak için
app.use(express.json({ limit: "1mb" }));

// Statik dosyalar (HTML, CSS, JS, JSON vs.)
const publicDir = __dirname;
app.use(express.static(publicDir));

const JSON_PATH = path.join(__dirname, "yetenekler.json");

// Yetenekleri oku
app.get("/api/yetenekler", (req, res) => {
  fs.readFile(JSON_PATH, "utf8", (err, data) => {
    if (err) {
      console.error("yetenekler.json okunamadı:", err);
      return res.status(500).json({ error: "yetenekler.json okunamadı" });
    }
    try {
      const parsed = JSON.parse(data || "[]");
      if (!Array.isArray(parsed)) {
        return res.status(500).json({ error: "Beklenen format bir dizi olmalı" });
      }
      res.json(parsed);
    } catch (e) {
      console.error("yetenekler.json parse edilemedi:", e);
      res.status(500).json({ error: "yetenekler.json parse edilemedi" });
    }
  });
});

// Yetenekleri yaz
app.post("/api/yetenekler", (req, res) => {
  const body = req.body;
  if (!Array.isArray(body)) {
    return res.status(400).json({ error: "Gönderilen veri bir dizi olmalı" });
  }

  const json = JSON.stringify(body, null, 2);
  fs.writeFile(JSON_PATH, json, "utf8", (err) => {
    if (err) {
      console.error("yetenekler.json yazılamadı:", err);
      return res.status(500).json({ error: "yetenekler.json yazılamadı" });
    }
    res.json({ ok: true });
  });
});

app.listen(PORT, () => {
  console.log(`Admin sunucusu http://localhost:${PORT} adresinde çalışıyor`);
  console.log("skills-admin.html sayfasını bu adres üzerinden açın.");
});

