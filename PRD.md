# PRD — Probiogreen Web & Agri-Utility Platform

**Versi:** 1.1 (hasil negosiasi)
**Tanggal:** 18 November 2026
**Status:** Siap eksekusi
**Pemilik produk:** Probiogreen
**Target rilis MVP:** 4 minggu (± 16 Desember 2026)

---

## 0. Ringkasan Perubahan dari v1.0

PRD awal sudah benar arahnya, tapi belum bisa langsung dieksekusi. Revisi ini menutup 8 celah:

| # | Celah di v1.0 | Perbaikan di v1.1 |
|---|---|---|
| 1 | Kalkulator tidak punya formula, unit, atau sumber data dosis | Spesifikasi mesin kalkulasi lengkap: basis dosis, pembulatan kemasan, validation, contoh uji |
| 2 | Tidak ada model data | Skema tabel inti + ERD relasi |
| 3 | "Proyeksi hasil/ROI" adalah klaim agronomis berisiko | Dikeluarkan dari MVP; diganti output biaya + jadwal aplikasi yang bisa diverifikasi |
| 4 | Strategi PLG tanpa mekanisme konversi | WhatsApp deep-link berisi hasil kalkulasi + penyimpanan lead dengan consent |
| 5 | Admin panel ambigu (Blade vs headless) | Admin dibangun di dalam Laravel dengan Inertia v3 + React + shadcn/ui; API tetap JSON untuk frontend Next.js |
| 6 | Analitik berpotensi melanggar UU PDP 27/2022 | IP di-hash, tanpa PII, retensi 90 hari, consent eksplisit di form lead, rate limit |
| 7 | "Load < 3 detik" tidak terukur | Performance budget p75 mobile 4G, LCP/INP/CLS eksplisit |
| 8 | Ruang lingkup tidak konsisten (cuaca disebut tapi tidak ada di MVP) | Cuaca 7 hari masuk MVP dengan batas yang jelas; peta distributor & e-commerce keluar |

**Keputusan negosiasi yang mengikat:**

| Topik | Keputusan |
|---|---|
| Status brand | Brand nyata, data produk menyusul. **Belum ada izin edar.** |
| Kalkulator | Rule-based + estimasi biaya. Tanpa klaim hasil panen/ROI. |
| Panel admin | Laravel 13 + Inertia v3 + React + shadcn/ui |
| Konversi | WhatsApp prefilled + simpan lead ke database |
| Fitur tambahan MVP | Cuaca 7 hari, multi-bahasa ID/EN, kalkulator ternak & ikan terpisah |
| Timeline | 1 bulan |

**Stack final:** Next.js 16.4 (App Router, TypeScript, Tailwind CSS v4, shadcn/ui) untuk situs publik; Laravel 13 (PHP 8.3+) + Inertia v3 + React 19 + shadcn/ui untuk API dan panel admin; MySQL 8 (SQLite untuk lokal); Laravel Sanctum; Open-Meteo.

> Laravel 11 di PRD awal sudah End of Life sejak 12 Maret 2026. Laravel 13 adalah versi stabil saat ini (rilis 17 Maret 2026).

---

## 1. Ringkasan Eksekutif

Probiogreen Web & Agri-Utility Platform adalah situs web hibrida: profil perusahaan resmi sekaligus alat bantu keputusan untuk petani, peternak, dan pembudidaya ikan.

Nilai intinya bukan katalog, melainkan **kalkulator yang menjawab pertanyaan "berapa yang saya butuhkan dan berapa biayanya?"** dalam waktu kurang dari satu menit, tanpa login. Katalog dan artikel berfungsi sebagai bukti kredibilitas; kalkulator berfungsi sebagai pintu masuk percakapan penjualan lewat WhatsApp.

### Tesis produk
Pengunjung agri umumnya tidak membeli karena tidak tahu dosis dan takut salah beli. Menghilangkan ketidakpastian itu — secara gratis dan tanpa registrasi — lebih efektif daripada halaman kampanye.

### Metrik keberhasilan
| Metrik | Target 3 bulan |
|---|---|
| Kalkulator completion rate (mulai → hasil tampil) | ≥ 60% |
| Klik WhatsApp dari halaman hasil | ≥ 8% |
| Lead tersimpan (dengan consent) | ≥ 3% dari sesi kalkulator |
| LCP p75 mobile 4G | ≤ 2,5 detik |
| Halaman terindeks Google | ≥ 80% dari total URL publik |
| Sesi organik/bulan | ≥ 500 |

---

## 2. Pengguna & Kebutuhan

### 2.1 Petani tanaman pangan/perkebunan
- Lahan 0,1–5 ha, sering di luar Jawa, akses via Android mid-range dengan kuota terbatas.
- Butuh: dosis per luas lahan, biaya total, kapan aplikasi, apakah cocok untuk komoditasnya.
- Kekhawatiran: "jangan-jangan saya beli kebanyakan" dan "apakah ini benar-benar bekerja".

### 2.2 Peternak
- Populasi 10–5.000 ekor, siklus 3–8 minggu.
- Butuh: dosis per ekor per hari, total per siklus, biaya per siklus, manfaat yang bisa diobservasi (nafsu makan, konversi pakan, bau kandang).

### 2.3 Pembudidaya ikan/udang
- Kolam 50–2.000 m² atau tambak, padat tebar bervariasi.
- Butuh: dosis per m³ atau per kg pakan per hari, total per siklus.

### 2.4 Administrator Probiogreen
- 1–3 orang, tidak teknis.
- Butuh: mengubah harga/dosis tanpa developer, menulis artikel dengan gambar, melihat komoditas apa yang paling banyak dihitung, menindaklanjuti lead.

### 2.5 Non-target
Pengguna yang mencari konsultasi penyakit tanaman (bukan domain produk), pembeli grosir dengan negosiasi harga, dan pencari lowongan kerja. Tetap disediakan jalur kontak, tapi tidak dibangun fiturnya.

---

## 3. Ruang Lingkup MVP

### 3.1 Masuk MVP
| # | Modul | Ringkas |
|---|---|---|
| M1 | Company profile | Home, Tentang, Kontak, Kebijakan Privasi |
| M2 | Katalog produk | Daftar + filter kategori/komoditas, detail produk, varian kemasan, status harga |
| M3 | Kalkulator tanaman | Luas lahan → dosis, kemasan, biaya, jadwal aplikasi |
| M4 | Kalkulator ternak | Populasi × hari siklus → dosis harian, total, biaya |
| M5 | Kalkulator ikan | Volume kolam / biomassa × hari → dosis, total, biaya |
| M6 | Cuaca 7 hari | Berdasarkan lokasi user atau kota pilihan, ringkas dan tidak mengganggu |
| M7 | Portal artikel | Berita, edukasi, kisah sukses. SSG/ISR untuk SEO |
| M8 | Admin (Laravel + Inertia + shadcn) | CRUD produk/varian/dosis, artikel ID+EN, lead, log kalkulator, pengaturan situs |
| M9 | Analitik | Event kalkulator anonim + dashboard ringkas di admin |
| M10 | i18n | UI dan konten ID/EN, URL terpisah |
| M11 | SEO teknis | Metadata, sitemap, JSON-LD, OG image, hreflang, RSS |

### 3.2 Tidak masuk MVP (fase 2)
- Proyeksi hasil panen / ROI / klaim peningkatan produktivitas
- Akun publik, riwayat kalkulasi, favorit
- E-commerce, keranjang, pembayaran
- Peta/daftar distributor
- WhatsApp Business API otomatis (MVP hanya deep-link `wa.me`)
- Komentar, forum, rating produk
- Dashboard multi-role kompleks (cukup admin + editor)
- Aplikasi mobile native

### 3.3 Batasan konten karena belum ada izin edar
Wajib dipatuhi di seluruh copy, termasuk placeholder:

1. **Dilarang** menampilkan nomor izin edar, nomor registrasi Kementan, atau logo sertifikasi yang belum dimiliki.
2. **Dilarang** klaim "pupuk terdaftar", "tersertifikasi organik", atau "aman untuk semua tanaman" tanpa dasar.
3. **Dilarang** klaim menyembuhkan/mengobati penyakit tanaman atau hewan.
4. **Dilarang** angka hasil panen yang spesifik ("+30% panen") di halaman mana pun.
5. Blok legalitas di situs ditampilkan sebagai **status jujur**: bagian "Legalitas & Mutu" hanya berisi apa yang benar-benar ada (mis. hasil uji laboratorium internal, izin usaha). Jika kosong, blok tidak ditampilkan sama sekali.
6. Semua output kalkulator menyertakan: *"Hasil perhitungan adalah estimasi berdasarkan dosis anjuran. Kondisi lahan, air, dan iklim dapat mengubah kebutuhan aktual. Konsultasikan dengan penyuluh atau tim kami."*

> **Tindakan di luar lingkup dev:** verifikasi kewajiban izin edar pupuk dengan Kementan/konsultan hukum sebelum situs dipakai komersial. Sampai itu selesai, situs berstatus portofolio/profil dan harga tidak dipublikasikan.

---

## 4. Information Architecture

```
/                          Home (ID)
/en                        Home (EN)
/tentang                   Tentang kami
/produk                    Katalog + filter
/produk/[slug]             Detail produk
/kalkulator                Kalkulator (tab: tanaman | ternak | ikan)
/artikel                   Index artikel (filter: berita | edukasi | kisah sukses)
/artikel/[slug]            Detail artikel
/kontak                    Kontak
/kebijakan-privasi         Privacy policy
/admin                     Filament panel (noindex)
/sitemap.xml, /robots.txt, /rss.xml
```

Navigasi utama maksimal 5 item: **Produk · Kalkulator · Artikel · Tentang · Kontak**, plus CTA WhatsApp permanen.

---

## 5. Spesifikasi Fungsional

Semua kriteria penerimaan bersifat testable. `AC-x.y` dipakai sebagai ID uji.

### 5.1 Home

**Tujuan:** menyatakan dalam 5 detik apa yang dijual dan mengarahkan ke kalkulator.

Struktur: hero (proposisi nilai + 2 CTA: "Hitung kebutuhan" dan "Lihat produk") → pita 3 sektor → kalkulator ringkas (embed, 1 field) → produk unggulan (3–6) → cara kerja 3 langkah → artikel terbaru (3) → testimoni (opsional, hanya yang asli) → CTA WhatsApp.

| ID | Kriteria | Verifikasi |
|---|---|---|
| AC-1.1 | CTA utama di atas fold pada viewport 360×640 | Screenshot |
| AC-1.2 | Embed kalkulator menghasilkan output tanpa pindah halaman | Manual |
| AC-1.3 | Jika cuaca gagal dimuat, halaman tetap render normal tanpa layout shift | Throttle/offline test |
| AC-1.4 | Semua section punya heading hierarkis (satu `h1`) | Lighthouse/a11y audit |

### 5.2 Katalog Produk

Filter: kategori (pertanian / peternakan / perikanan) + komoditas + pencarian teks. Filter disimpan di URL query agar bisa dibagikan.

Kartu produk menampilkan: nama, kategori, bentuk (cair/padat), kemasan tersedia, rentang harga **atau** label "Hubungi kami" (diatur per produk), dan tombol "Hitung kebutuhan".

Detail produk: deskripsi, komposisi/kandungan mikroba, komoditas yang cocok (link ke kalkulator dengan produk terpilih), dosis ringkas, cara aplikasi, peringatan penyimpanan, varian kemasan + harga (jika `price_visible`), CTA WhatsApp dengan pesan berisi nama produk.

| ID | Kriteria | Verifikasi |
|---|---|---|
| AC-2.1 | Filter kategori + komoditas bisa dikombinasikan dan hasilnya benar | Feature test |
| AC-2.2 | URL filter dapat di-refresh dan menghasilkan state sama | Manual |
| AC-2.3 | Produk nonaktif tidak muncul di API publik maupun sitemap | Feature test |
| AC-2.4 | Produk tanpa harga menampilkan "Hubungi kami", bukan `Rp 0` | Manual |
| AC-2.5 | Halaman detail mengeluarkan JSON-LD `Product` | Rich Results Test |

### 5.3 Kalkulator — mesin inti

#### 5.3.1 Prinsip
Satu mesin, tiga mode. Semua dosis berasal dari tabel `dosage_rules` yang diisi admin — **tidak ada angka dosis yang di-hardcode di frontend**.

#### 5.3.2 Input

| Mode | Field wajib | Field opsional |
|---|---|---|
| Tanaman | komoditas, luas lahan (m² atau ha), produk | fase tanam, jumlah tanaman, frekuensi |
| Ternak | jenis ternak, populasi, lama siklus (hari), produk | bobot rata-rata, fase (starter/grower/finisher) |
| Ikan | jenis ikan, volume kolam (m³) atau populasi + bobot, lama siklus, produk | sistem (kolam/tambak/akuaponik), jenis pakan |

Produk boleh dikosongkan → sistem merekomendasikan produk yang punya aturan dosis untuk komoditas tersebut.

#### 5.3.3 Basis dosis (enum `basis`)
| Basis | Rumus |
|---|---|
| `per_ha` | `kebutuhan = (luas_m2 / 10_000) × dosis_per_ha` |
| `per_plant` | `kebutuhan = jumlah_tanaman × dosis_per_tanaman` |
| `per_animal_day` | `kebutuhan = populasi × dosis_per_ekor_per_hari × hari` |
| `per_m3_day` | `kebutuhan = volume_m3 × dosis_per_m3_per_hari × hari` |
| `per_kg_biomass_day` | `kebutuhan = (populasi × bobot_gram / 1000) × dosis_per_kg_per_hari × hari` |

Satuan internal selalu **mililiter (integer)**. Konversi tampilan dilakukan di lapisan presentasi (liter bila ≥ 1.000 ml).

#### 5.3.4 Output
1. **Total kebutuhan** — ml/L, dibulatkan ke atas ke 10 ml terdekat.
2. **Kombinasi kemasan** — algoritma greedy dari varian terbesar ke terkecil, minimum pembelian. Contoh: butuh 1.400 ml, varian 1.000 + 500 → `1 botol 1 L + 1 botol 500 ml`.
3. **Estimasi biaya** — jumlah kemasan × harga varian. Jika ada varian tanpa harga → tampilkan "sebagian harga perlu dikonfirmasi".
4. **Jadwal aplikasi** — dari `dosage_rules.frequency` (`weekly`, `biweekly`, `monthly`, `once`) dan `duration_weeks`, ditampilkan sebagai daftar minggu.
5. **Catatan dosis** — teks dari admin (mis. "encerkan 5 ml per liter air").
6. **Disclaimer** (wajib, lihat §3.3).
7. **CTA WhatsApp** dengan pesan terisi otomatis.

Contoh pesan WhatsApp (URL-encoded, maks 1.000 karakter):
```
Halo Probiogreen, saya ingin konsultasi.
Komoditas: Padi
Luas: 0,5 ha
Kebutuhan: 1 L (1 botol 1 L)
Estimasi biaya: Rp 85.000
Sumber: Kalkulator Probiogreen (ID)
```

#### 5.3.5 Validasi
| Field | Aturan |
|---|---|
| Luas lahan | 1 – 100.000 m² |
| Populasi | 1 – 1.000.000 |
| Volume kolam | 1 – 100.000 m³ |
| Lama siklus | 1 – 365 hari |
| Bobot | 1 – 10.000 gram |

Pesan error ditampilkan inline di bawah field, bahasa manusiawi, tanpa stack trace. Validasi dijalankan di client (UX) **dan** server (kebenaran).

#### 5.3.6 Contoh uji (dipakai QA)
Dengan data seed: padi, dosis 2.000 ml/ha, 2 aplikasi.
- Input: padi, 5.000 m² → 1.000 ml → 2 botol 500 ml → biaya = 2 × harga 500 ml.
- Input: padi, 25.000 m² → 5.000 ml → 5 botol 1 L.
- Input: 0 m² → ditolak dengan pesan "Luas lahan minimal 1 m²".
- Input: komoditas tanpa aturan dosis → tampil "Dosis untuk komoditas ini belum tersedia" + CTA WhatsApp, bukan error 500.

| ID | Kriteria | Verifikasi |
|---|---|---|
| AC-3.1 | Tidak ada angka dosis di kode frontend; semua dari API | Code review |
| AC-3.2 | Ketiga mode menghasilkan output sesuai rumus di atas | Unit test |
| AC-3.3 | Pembulatan kemasan tidak pernah menghasilkan pembelian kurang dari kebutuhan | Property test |
| AC-3.4 | Perubahan harga di admin langsung tercermin di hasil kalkulasi berikutnya | Manual |
| AC-3.5 | Endpoint dibatasi 30 permintaan/menit/IP, mengembalikan 429 | Rate limit test |
| AC-3.6 | Hasil tampil < 1 detik (p95) pada 4G | Lighthouse/Network |
| AC-3.7 | Setiap kalkulasi tersimpan sebagai log anonim | DB check |
| AC-3.8 | Halaman hasil dapat dibaca screen reader (label, `aria-live`) | NVDA/VoiceOver |

### 5.4 Cuaca 7 hari

- Sumber: **Open-Meteo** (gratis, tanpa API key) — forecast harian: suhu min/max, curah hujan, probabilitas hujan, kelembapan, angin, plus `et0_fao_evapotranspiration` dan `soil_moisture_0_to_7cm`.
- Lokasi: tombol "Gunakan lokasi saya" (browser geolocation, butuh izin) atau pencarian kota (Open-Meteo Geocoding API).
- Cache: server 30 menit per koordinat (dibulatkan 2 desimal), `Cache-Control: public, s-maxage=1800`.
- Fallback: jika API gagal/timeout 3 detik → modul disembunyikan, tidak ada pesan error menakutkan.
- Tidak boleh memblokir render kalkulator. Dimuat setelah interaksi atau via `Suspense`.

| ID | Kriteria | Verifikasi |
|---|---|---|
| AC-6.1 | Penolakan izin lokasi tidak memicu error | Manual |
| AC-6.2 | Tidak ada request ke Open-Meteo sebelum user meminta | Network tab |
| AC-6.3 | Response API di-cache, request kedua < 100 ms | Header check |
| AC-6.4 | Menampilkan label sumber data | Visual |

### 5.5 Portal Artikel

Tipe: `news`, `education`, `success_story`. Slug unik per locale.

Halaman index: kartu dengan thumbnail, tipe, judul, ringkasan, tanggal, estimasi waktu baca. Paginasi server-side, 9 per halaman. Filter tipe via query.

Detail: SSR/ISR (`revalidate = 300`), rich text tersanitasi, daftar isi otomatis untuk artikel > 800 kata, produk terkait, artikel terkait, CTA WhatsApp, tombol share.

| ID | Kriteria | Verifikasi |
|---|---|---|
| AC-7.1 | Artikel `draft` tidak bisa diakses publik (404) | Feature test |
| AC-7.2 | HTML artikel tersanitasi; `<script>` dan `onerror` dihapus | Security test |
| AC-7.3 | Metadata OG + `Article` JSON-LD valid | Rich Results Test |
| AC-7.4 | Artikel > 1.500 kata tetap LCP ≤ 2,5 s | Lighthouse |
| AC-7.5 | Perubahan artikel memicu revalidasi halaman < 60 detik | Manual |

### 5.6 Lead

Form singkat di halaman hasil kalkulator dan halaman kontak: nama, nomor WhatsApp, lokasi (opsional), pesan, **checkbox consent wajib** dengan tautan kebijakan privasi.

Lead menyimpan: `name`, `phone`, `location`, `message`, `source` (calculator/contact/product), `calculator_log_id`, `consent_at`, `status` (new/contacted/closed), `locale`. Nomor telepon dinormalisasi ke format `62…`.

| ID | Kriteria | Verifikasi |
|---|---|---|
| AC-8.1 | Submit tanpa consent ditolak 422 | Feature test |
| AC-8.2 | Notifikasi ke admin (email/queue) terkirim < 1 menit | Manual |
| AC-8.3 | Rate limit 5/menit/IP | Rate limit test |
| AC-8.4 | Honeypot atau time-trap menolak bot | Manual |

### 5.7 Admin (Laravel + Inertia + shadcn/ui)

Panel admin berada di aplikasi Laravel (`/admin`), dirender dengan Inertia + React dan komponen shadcn/ui. Autentikasi memakai session guard Laravel, bukan token API.

| Resource | Kemampuan |
|---|---|
| Produk | CRUD, varian kemasan + harga, toggle `price_visible`, toggle aktif, upload gambar, urutan tampil, terjemahan ID/EN |
| Komoditas | CRUD (nama, slug, kategori, ikon, deskripsi) |
| Aturan dosis | CRUD per produk × komoditas: basis, nilai, satuan, frekuensi, durasi, catatan, sumber |
| Artikel | CRUD, rich text, thumbnail, tipe, jadwal terbit, draft/published, field SEO, dua locale |
| Lead | Daftar + filter status, ubah status, ekspor CSV, buka chat WA |
| Log kalkulator | Tabel + filter tanggal/mode/komoditas, chart 30 hari |
| Pengaturan | Nomor WhatsApp, alamat, sosial media, teks disclaimer |
| Pengguna | Admin/editor, reset password |

Semua mutasi dari panel memicu revalidasi frontend (lihat §10.4).

| ID | Kriteria | Verifikasi |
|---|---|---|
| AC-9.1 | Editor tidak bisa menghapus pengguna atau mengubah pengaturan | Policy test |
| AC-9.2 | Upload ditolak jika > 2 MB atau bukan gambar | Feature test |
| AC-9.3 | Simpan artikel memicu revalidate frontend | Log check |
| AC-9.4 | Panel `noindex` dan tidak muncul di sitemap | Header check |
| AC-9.5 | Dua admin mengedit bersamaan tidak menimpa data tanpa peringatan | Manual |

### 5.8 i18n

- Library: `next-intl`, `localePrefix: 'as-needed'` → ID di `/`, EN di `/en`.
- UI strings di file terjemahan; konten (produk, artikel, komoditas) di tabel terjemahan.
- Artikel/produk tanpa terjemahan EN: tampil versi ID dengan banner "This content is available in Indonesian only" dan `hreflang` hanya menunjuk versi yang ada.
- Format angka & mata uang mengikuti locale (`Rp 85.000` / `IDR 85,000`), tanggal `id-ID` / `en-GB`.

| ID | Kriteria | Verifikasi |
|---|---|---|
| AC-10.1 | Tidak ada string hardcoded berbahasa Indonesia di komponen EN | Code review + snapshot |
| AC-10.2 | `hreflang` resiprokal dan `x-default` menunjuk ID | HTML check |
| AC-10.3 | Bahasa tersimpan di URL, bukan hanya cookie | Manual |

---

## 6. Model Data

```
users (id, name, email, password, role enum[admin,editor])
commodities (id, slug, category enum[agriculture,livestock,fishery], icon, sort, is_active)
commodity_translations (id, commodity_id, locale, name, description)
products (id, slug, category, form enum[liquid,solid], description_short, is_active, price_visible, sort)
product_translations (id, product_id, locale, name, description, composition, application, warning)
product_commodity (product_id, commodity_id)
product_variants (id, product_id, label, volume_ml, price_idr nullable, sku, is_active)
dosage_rules (id, product_id, commodity_id, basis enum[...], value_ml, frequency, duration_weeks, note, source, is_active)
articles (id, type, author_id, thumbnail_path, status enum[draft,published], published_at)
article_translations (id, article_id, locale, slug, title, excerpt, body_html, seo_title, seo_description)
calculator_logs (id, session_hash, mode, commodity_id, product_ids json, input json, result json, locale, ip_hash, created_at)
leads (id, name, phone, location, message, source, calculator_log_id, consent_at, status, locale, created_at)
settings (key, value json)
media (upload via Laravel)
```

Catatan:
- `calculator_logs` **tanpa** nama, telepon, atau IP mentah. `ip_hash = hash_hmac('sha256', ip, app_key)`. Retensi 90 hari via scheduled command.
- `session_hash` = UUID v4 yang dibuat di client dan disimpan di `sessionStorage` (bukan cookie), agar satu sesi bisa dihitung tanpa tracking lintas situs.

---

## 7. API (v1)

Base: `https://api.<domain>/api/v1`. JSON, `Accept: application/json`.

| Method | Endpoint | Auth | Keterangan |
|---|---|---|---|
| GET | `/products` | – | Filter `category`, `commodity`, `q`; paginasi 12 |
| GET | `/products/{slug}` | – | Detail + varian |
| GET | `/commodities` | – | Dikelompokkan per kategori |
| GET | `/articles` | – | Filter `type`, paginasi 9 |
| GET | `/articles/{slug}` | – | Detail + terjemahan |
| POST | `/calculator/calculate` | – | Body: `{mode, commodity_slug, product_slug?, area_m2?, population?, volume_m3?, weight_g?, days?, locale}` |
| POST | `/leads` | – | Body lead + `consent: true` |
| GET | `/weather` | – | `lat`, `lon`; proxy + cache 30 menit |
| GET | `/settings` | – | Kontak publik, WhatsApp, disclaimer |

**Kontrak respons kalkulasi:**
```json
{
  "data": {
    "total_ml": 1000,
    "display": "1 L",
    "packages": [{"variant_id": 3, "label": "500 ml", "qty": 2, "subtotal_idr": 85000}],
    "estimated_cost_idr": 85000,
    "price_complete": true,
    "schedule": [{"week": 0, "dose_ml": 500}, {"week": 2, "dose_ml": 500}],
    "notes": ["Encerkan 5 ml per 1 liter air"],
    "products": [{"slug": "probiogreen-padi", "name": "Probiogreen Padi"}],
    "disclaimer": "Hasil perhitungan adalah estimasi..."
  }
}
```

**Konvensi error:** `422 {message, errors{field:[...]}}`, `429 {message}` + `Retry-After`, `404 {message}`. Tidak pernah mengembalikan stack trace di production.

**Header:** `ETag` + `Cache-Control: public, s-maxage=60, stale-while-revalidate=300` untuk GET publik.

**Auth admin:** Filament memakai session guard di domain yang sama. Sanctum disiapkan untuk token API bila nanti ada integrasi eksternal — tidak dipakai di MVP.

---

## 8. Arsitektur & Deployment

```
Browser
  │
  ├── Next.js 16.4 (Vercel)  ──REST/JSON──►  Laravel 13 API (VPS/Railway)
  │      ├── SSG/ISR untuk artikel & produk        ├── MySQL 8
  │      └── Server Actions untuk form lead        ├── Redis (cache + queue)
  │                                                ├── Inertia + React /admin
  │                                                └── Storage (R2/S3)
  └── Open-Meteo (langsung dari server Next, di-cache)
```

- **Monorepo** dua folder: `web/` (Next.js) dan `api/` (Laravel) — memudahkan portofolio dan CI tunggal.
- **Revalidasi:** Laravel memanggil webhook `/api/revalidate` di Next setelah simpan artikel/produk, dengan `X-Revalidate-Secret`. Next memanggil `revalidateTag('products')` / `revalidateTag('article:<slug>')`.
- **Media:** Cloudflare R2 (free tier) di production; disk lokal saat development. URL publik di domain CDN.
- **Environment:** `local`, `staging`, `production` terpisah; staging `noindex`.
- **CI:** GitHub Actions — lint + typecheck + PHPUnit/Pest + `next build` pada PR.

---

## 9. Kebutuhan Non-Fungsional

| Area | Target | Cara ukur |
|---|---|---|
| Performance | LCP ≤ 2,5 s; INP ≤ 200 ms; CLS ≤ 0,1 (p75, mobile 4G) | Vercel Speed Insights + Lighthouse |
| Bundle | First load JS ≤ 180 KB gzip | `next build` |
| Gambar | AVIF/WebP, `next/image`, `sizes` eksplisit, lazy di bawah fold | Audit |
| Aksesibilitas | WCAG 2.2 AA: kontras ≥ 4,5:1, target sentuh ≥ 44 px, fokus terlihat, form berlabel, `prefers-reduced-motion` | axe + manual keyboard |
| Responsif | 360 px – 1920 px tanpa horizontal scroll | Manual multi-viewport |
| SEO | Metadata unik per halaman, canonical, sitemap, robots, JSON-LD, hreflang | Rich Results + Search Console |
| Keamanan | HTTPS/HSTS, CSP, rate limit, validasi upload, sanitasi HTML, dependency audit | Checklist rilis |
| Privasi | Tanpa cookie non-esensial; IP di-hash; retensi log 90 hari; consent tercatat | Code review + DB check |
| Reliabilitas | Uptime target 99,5%; backup DB harian (retensi 7 hari); error tracking (Sentry free) | Monitoring |
| Observability | Log terstruktur, Sentry untuk exception, alert saat 5xx > 1% | Dashboard |

---

## 10. SEO & Distribusi

1. `generateMetadata` per halaman; template `%s | Probiogreen`.
2. `sitemap.ts` dinamis (produk + artikel + halaman statis) dengan `lastModified` asli.
3. JSON-LD: `Organization` (beranda), `Product` (detail produk), `Article` (artikel), `BreadcrumbList`, `WebSite` + `SearchAction` bila pencarian aktif.
4. OG image dinamis via `next/og` (judul + kategori + logo).
5. `hreflang` ID/EN + `x-default`.
6. RSS di `/rss.xml` dari artikel terbaru.
7. Internal linking: setiap artikel menyebut ≥ 1 produk dan ≥ 1 kalkulator.
8. Konten minimum saat launch: **6 produk, 12 artikel (4 edukasi, 4 berita, 4 kisah sukses)**. Lebih baik 6 artikel bagus daripada 30 hasil AI tanpa data.

---

## 11. Rencana 4 Minggu

| Minggu | Fokus | Output |
|---|---|---|
| **1** | Fondasi | Repo, CI, skema DB + migration + seeder, admin Inertia + shadcn terpasang, auth admin, CRUD produk/varian/komoditas, katalog + detail produk di Next, deploy staging |
| **2** | Mesin kalkulasi | Endpoint calculate + unit test rumus, kalkulator 3 mode, output + WhatsApp, log kalkulator, cuaca 7 hari, halaman hasil mobile-first |
| **3** | Konten & konversi | Artikel (CMS + frontend + ISR), i18n ID/EN, form lead + notifikasi, dashboard analitik Filament, revalidasi webhook |
| **4** | Polish & rilis | SEO teknis, OG image, sitemap, a11y audit, performance tuning, konten final, UAT, backup + monitoring, domain + production deploy |

**Garis potong bila molor (urutan yang dikorbankan):**
1. Terjemahan EN artikel (UI tetap EN, konten ID dengan banner)
2. Cuaca 7 hari (sembunyikan modul, bukan setengah jadi)
3. Kalkulator ikan (pertahankan tanaman + ternak)
4. Kisah sukses (sisakan berita + edukasi)

Yang **tidak boleh** dikorbankan: kalkulator tanaman akurat, admin berfungsi, mobile usable, disclaimer, consent.

---

## 12. Risiko

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Data dosis belum tersedia saat dev | Kalkulator tidak bisa diuji | Seed data realistis bertanda `is_placeholder`, satu sumber kebenaran `dosage_rules`, admin bisa ganti tanpa deploy |
| Tanpa izin edar | Klaim pemasaran berisiko | Batasan konten §3.3; harga disembunyikan; verifikasi legal sebelum komersial |
| Nama "Probiogreen" bertabrakan secara pencarian | Sulit ditemukan, potensi sengketa merek | Cek merek/domain sebelum launch; siapkan alternatif nama; jangan belanja SEO besar sebelum jelas |
| Terjemahan EN dikerjakan mesin | Kredibilitas turun | Minimal halaman UI + 4 artikel inti diterjemahkan manusia |
| 4 minggu terlalu ketat | Rilis setengah jadi | Garis potong §11 disepakati sejak awal |
| Dosis salah → kerugian petani | Reputasi + risiko hukum | Semua dosis bersumber dari perusahaan, ditandai `source`, ada disclaimer, QA contoh uji §5.3.6 |
| Endpoint publik disalahgunakan | Biaya + data kotor | Rate limit, honeypot, validasi ketat, log anonim |

---

## 13. Definition of Done (MVP)

- [ ] 6 produk aktif dengan varian + minimal 1 aturan dosis per komoditas utama
- [ ] 12 artikel terbit, minimal 4 punya gambar asli
- [ ] Ketiga kalkulator lulus contoh uji §5.3.6
- [ ] WhatsApp terisi otomatis benar di Android & iOS
- [ ] Lead masuk, notifikasi terkirim, consent tercatat
- [ ] Admin bisa mengubah harga → tampil di frontend < 60 detik
- [ ] Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, SEO 100
- [ ] Tidak ada error console di production
- [ ] Sitemap terkirim ke Search Console, 0 error
- [ ] Kebijakan privasi & disclaimer tampil
- [ ] Backup harian terbukti (restore test 1x)
- [ ] README: cara run lokal, env vars, deploy

---

## 14. Pertanyaan yang Masih Terbuka

1. **Harga tampil atau tidak?** Default PRD: `price_visible = false` (tampil "Hubungi kami"). Jika harga tampil, pastikan tidak bentrok dengan harga distributor.
2. **Domain & nama final** — "Probiogreen" atau alternatif?
3. **Siapa mengisi konten?** 12 artikel + 6 produk butuh bahan dari pemilik brand; tanpa itu jadwal minggu 3–4 bergeser.
4. **Nomor WhatsApp tujuan** — satu nomor sales atau per wilayah?
5. **Angka dosis** — siapa yang menandatangani kebenaran tabel dosis sebelum launch?
