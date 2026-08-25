-- =========================================================================
-- SLVNZ — Yetenek veritabanı şeması
-- Lehçe: MySQL 8. admin/db.py bu dosyayı okur; sürücü SQLite ise aynı
-- metni satır satır çevirir (AUTO_INCREMENT ve ENGINE kuyruğu dışında her
-- şey iki lehçede de birebir geçerlidir).
--
-- Kural: bu dosyada METİN SABİTİ (tırnak içinde ';' taşıyabilecek değer)
-- BULUNMAZ. Tohum satırları db.py içinde parametreli olarak yazılır —
-- Türkçe açıklamalardaki noktalı virgül bu dosyayı bölmesin diye.
--
-- Tasarım
-- -------
-- Elementler, enerji türleri, kaynak türleri, uzaklık birimleri ve alan
-- tipleri ayrı SÖZLÜK tablolarındadır: "database'de belirtilmiş seçenekler
-- arasından seçim" isteği bire bir budur. Yetenek onlara yabancı anahtarla
-- bağlanır, panelden liste düzenlenince bütün yetenekler birlikte döner.
--
-- Materyaller çocuk tabloda (yetenek_materyal) durur — istenen "materyal
-- listesi" gerçekten liste olsun, tek metin alanına virgülle sıkışmasın.
-- =========================================================================

CREATE TABLE IF NOT EXISTS kategori (
  id       INT AUTO_INCREMENT PRIMARY KEY,
  kod      VARCHAR(32)  NOT NULL,
  ad       VARCHAR(64)  NOT NULL,
  aciklama TEXT         NULL,
  sira     INT          NOT NULL DEFAULT 0,
  CONSTRAINT uq_kategori_kod UNIQUE (kod)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

CREATE TABLE IF NOT EXISTS eylem_turu (
  id   INT AUTO_INCREMENT PRIMARY KEY,
  ad   VARCHAR(64) NOT NULL,
  kisa VARCHAR(8)  NULL,
  sira INT         NOT NULL DEFAULT 0,
  CONSTRAINT uq_eylem_turu_ad UNIQUE (ad)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

CREATE TABLE IF NOT EXISTS element (
  id       INT AUTO_INCREMENT PRIMARY KEY,
  ad       VARCHAR(64) NOT NULL,
  aciklama TEXT        NULL,
  sira     INT         NOT NULL DEFAULT 0,
  CONSTRAINT uq_element_ad UNIQUE (ad)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

-- sinif: temel | ozel | yasak  (Oyun Kuralları/Enerjiler bölümünün ayrımı)
CREATE TABLE IF NOT EXISTS enerji_turu (
  id       INT AUTO_INCREMENT PRIMARY KEY,
  ad       VARCHAR(64) NOT NULL,
  sinif    VARCHAR(16) NOT NULL DEFAULT 'temel',
  aciklama TEXT        NULL,
  sira     INT         NOT NULL DEFAULT 0,
  CONSTRAINT uq_enerji_turu_ad UNIQUE (ad),
  CONSTRAINT ck_enerji_sinif CHECK (sinif IN ('temel', 'ozel', 'yasak'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

CREATE TABLE IF NOT EXISTS kaynak_turu (
  id       INT AUTO_INCREMENT PRIMARY KEY,
  ad       VARCHAR(64) NOT NULL,
  aciklama TEXT        NULL,
  sira     INT         NOT NULL DEFAULT 0,
  CONSTRAINT uq_kaynak_turu_ad UNIQUE (ad)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

-- varsayilan: yeni yetenek formu bu birimi hazır seçer (tam bir satır)
CREATE TABLE IF NOT EXISTS uzaklik_birimi (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  ad          VARCHAR(64) NOT NULL,
  kisa        VARCHAR(12) NULL,
  varsayilan  TINYINT(1)  NOT NULL DEFAULT 0,
  sira        INT         NOT NULL DEFAULT 0,
  CONSTRAINT uq_uzaklik_birimi_ad UNIQUE (ad)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

-- yukseklik_gerekir: silindir/koni/prizma gibi yarıçap tek başına yetmeyen
-- biçimlerde form ikinci bir ölçü ister
CREATE TABLE IF NOT EXISTS alan_tipi (
  id                INT AUTO_INCREMENT PRIMARY KEY,
  ad                VARCHAR(64) NOT NULL,
  yukseklik_gerekir TINYINT(1)  NOT NULL DEFAULT 0,
  olcu_adi          VARCHAR(32) NULL,
  sira              INT         NOT NULL DEFAULT 0,
  CONSTRAINT uq_alan_tipi_ad UNIQUE (ad)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

CREATE TABLE IF NOT EXISTS yetenek (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  kategori_id     INT          NOT NULL,
  seviye          INT          NOT NULL DEFAULT 0,
  ad              VARCHAR(160) NOT NULL,
  eylem_turu_id   INT          NULL,
  element_id      INT          NULL,
  enerji_turu_id  INT          NULL,
  kaynak_turu_id  INT          NULL,
  kaynak_tuketimi INT          NOT NULL DEFAULT 0,

  -- menzil: 'kendin' ya da 'mesafe' + en az 1 değer + birim
  menzil_tur      VARCHAR(8)   NOT NULL DEFAULT 'kendin',
  menzil_deger    INT          NULL,
  menzil_birim_id INT          NULL,

  -- alan: yok (0) ya da var (1) + en az 1 yarıçap + birim + biçim
  alan_var        TINYINT(1)   NOT NULL DEFAULT 0,
  alan_deger      INT          NULL,
  alan_birim_id   INT          NULL,
  alan_tipi_id    INT          NULL,
  alan_yukseklik  INT          NULL,

  -- söz / hareket / materyal üçlüsü: her biri anahtar + kendi alanı
  soz_gerekli      TINYINT(1)  NOT NULL DEFAULT 0,
  soz_metin        TEXT        NULL,
  hareket_gerekli  TINYINT(1)  NOT NULL DEFAULT 0,
  hareket_metin    TEXT        NULL,
  materyal_gerekli TINYINT(1)  NOT NULL DEFAULT 0,

  aciklama    TEXT     NULL,
  dipnot      TEXT     NULL,

  sira        INT      NOT NULL DEFAULT 0,
  olusturma   DATETIME NOT NULL,
  guncelleme  DATETIME NOT NULL,

  CONSTRAINT uq_yetenek_ad UNIQUE (kategori_id, ad),
  CONSTRAINT ck_yetenek_seviye  CHECK (seviye >= 0),
  CONSTRAINT ck_yetenek_kaynak  CHECK (kaynak_tuketimi >= 0),
  CONSTRAINT ck_yetenek_menzil  CHECK (menzil_deger IS NULL OR menzil_deger >= 1),
  CONSTRAINT ck_yetenek_alan    CHECK (alan_deger IS NULL OR alan_deger >= 1),
  CONSTRAINT ck_yetenek_alan_h  CHECK (alan_yukseklik IS NULL OR alan_yukseklik >= 1),
  CONSTRAINT ck_yetenek_mtur    CHECK (menzil_tur IN ('kendin', 'mesafe')),
  CONSTRAINT fk_yetenek_kategori FOREIGN KEY (kategori_id)     REFERENCES kategori (id),
  CONSTRAINT fk_yetenek_eylem    FOREIGN KEY (eylem_turu_id)   REFERENCES eylem_turu (id),
  CONSTRAINT fk_yetenek_element  FOREIGN KEY (element_id)      REFERENCES element (id),
  CONSTRAINT fk_yetenek_enerji   FOREIGN KEY (enerji_turu_id)  REFERENCES enerji_turu (id),
  CONSTRAINT fk_yetenek_kaynak   FOREIGN KEY (kaynak_turu_id)  REFERENCES kaynak_turu (id),
  CONSTRAINT fk_yetenek_mbirim   FOREIGN KEY (menzil_birim_id) REFERENCES uzaklik_birimi (id),
  CONSTRAINT fk_yetenek_abirim   FOREIGN KEY (alan_birim_id)   REFERENCES uzaklik_birimi (id),
  CONSTRAINT fk_yetenek_atipi    FOREIGN KEY (alan_tipi_id)    REFERENCES alan_tipi (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

CREATE TABLE IF NOT EXISTS yetenek_materyal (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  yetenek_id INT          NOT NULL,
  sira       INT          NOT NULL DEFAULT 0,
  ad         VARCHAR(200) NOT NULL,
  CONSTRAINT fk_materyal_yetenek FOREIGN KEY (yetenek_id) REFERENCES yetenek (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_turkish_ci;

CREATE INDEX ix_yetenek_kategori ON yetenek (kategori_id, seviye, ad);
CREATE INDEX ix_yetenek_element  ON yetenek (element_id);
CREATE INDEX ix_yetenek_enerji   ON yetenek (enerji_turu_id);
CREATE INDEX ix_yetenek_kaynak   ON yetenek (kaynak_turu_id);
CREATE INDEX ix_materyal_yetenek ON yetenek_materyal (yetenek_id, sira);
