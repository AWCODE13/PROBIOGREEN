# Probiogreen

**Probiogreen** adalah website informasi dan kalkulator dosis probiotik untuk sektor pertanian, peternakan, dan perikanan. Website ini membantu petani dan entrepreneur menghitung kebutuhan produk probiotik berdasarkan luas lahan, jenis komoditas, dan fase tanam.

## Overview

Probiogreen menyediakan solusi kalkulasi dosis otomatis untuk:

- **Sektor Pertanian**: Menghitung dosis probiotik per hektar lahan
- **Peternakan**: Estimasi kebutuhan suplemen ternak dan probiotik air
- **Perikanan**: Perhitungan dosis untuk maintained air

Website ini dirancang untuk memudahkan petani dan pengusaha dalam menentukan kebutuhan produk probiotik dengan tepat guna, tanpa perlu hypothesis atau estimasiManual.

## Gambar

Berikut adalah ilustrasi tampilan utama Probiogreen:

### Hero Carousel

<details>
<summary>Tampilan Hero Carousel</summary>

Hero carousel responsive dengan tiga slide sektor (pertanian, peternakan, perikanan):

- **Desktop**: Gambar di samping kanan dengan teks di kiri
- **Mobile**: Tumpukan vertikal elemen

![Hero Carousel Desktop](/images/laptop-seeds.png)
![Hero Carousel Mobile Stack](/images/farm-paddy.png)
![Hero Carousel Aquaculture](/images/aquaculture.png)

</details>

### Struktur Halaman

<details>
<summary>Struktur Halaman Utama</summary>

- **Hero Section**: Carousel intro dengan tiga sektor
- **Produk Section**: Grid kartu produk per sektor
- **Kalkulator Section**: Form input komoditas & luas/lahan/volume
- **Batasan Section**: Catatan transparansi penggunaan
- **Tanya Section**: FAQ dan formulir konsultasi
</details>

## tentang Project

Probiogreen dibuat untuk menjawab permasalahan petani dan pengusaha yang kesulitan menentukan dosis probiotik yang tepat. Biasanya mereka:

- Kesulitan menghitung dosis berdasarkan luas lahan/volume air
- Tidak memiliki referensi satuan per komoditas
- Cemas membeli berlebih atau too little

Project ini menyediakan kalkulator otomatis yang mempertimbangkan:
- Luas lahan (hektar) atau volume air (liter)
- Jenis komoditas atau populasi ternak/ikan
- Fase tanam atau siklus hidup
- Dosis anjuran tim Probiogreen

## Isi (Fitur Utama)

- **Hero Carousel Responsive**: Gambar laptop/pertanian/perikanan yang menyesuaikan diri antara tampilan desktop (foto di samping kanan dengan teks) dan mobile (stack vertikal)
- **Navigasi Carousel**: Tombol kiri/kanar untuk berganti slide, serta indikator slide di bawah
- **Kalkulator Dosis**: Form input dengan tiga kolom (komoditas, ukuran, siklus) yang menghasilkan:
  - Total kebutuhan produk dalam liter/mililiter
  - Jumlah kemasan yang perlu dibeli
  - Perkiraan biaya berdasarkan harga kemasan
  - Jadwal aplikasi selama satu siklus
- **Navigasi Utama**: Menu navigasi yang menampilkan kategori produk (pertanian, peternakan, perikanan)
- **Theme Toggle**: Pemilih mode terang/gelap
- **CTA Button**: Tombol "Tanya kebutuhan" untuk konsultasi dengan tim
- **Popular Products**: Grid kartu produk per sektor dengan badge
- **FAQ Section**: Pertanyaan sering dengan kategori kritis dan selengkapnya

## Teknologi yang Digunakan

- **Next.js 16** - Framework React dengan App Router dan Server Components
- **React 19** - Library antarmuka pengguna
- **Tailwind CSS 4** - Framework utilitas CSS untuk styling cepat dan responsif
- **Lucide React** - Ikon set untuk UI elements
- **TypeScript** - Untuk tipe data dan pengelolaan kode
- **CSS Variables** - Untuk theming warna konsisten (mode terang/gelap)
- **shadcn/ui** - Komponen UI reusable (button, accordion, card, dll.)
- **next-themes** - Pengelolaan tema terintegrasi
- **React Fast Refresh** - Pengembangan instan

## Struktur Project

```
web/
├── src/
│   ├── app/                        # Page routing (App Router)
│   │   ├── kalkulator/             # Halaman kalkulator dosis
│   │   ├── produk/                 # Halaman daftar produk
│   │   ├── layout.tsx              # Root layout dengan ThemeProvider
│   │   ├── page.tsx                # Halaman utama (home)
│   │   └── globals.css             # Global styling Tailwind
│   ├── components/
│   │   ├── hero-carousel.tsx       # Hero carousel responsive component
│   │   ├── site/
│   │   │   ├── site-header.tsx     # Header dengan navbar, theme toggle, CTA
│   │   │   ├── site-footer.tsx     # Footer
│   │   │   ├── popular-products.tsx# Grid kartu produk
│   │   │   ├── product-card.tsx    # Card produk individual
│   │   │   └── theme-toggle.tsx    # Toggle mode terang/gelap
│   │   └── ui/                     # Komponen UI reusable (button, accordion, card, dll.)
│   ├── lib/
│   │   ├── site.ts                 # Konfigurasi site (nama, nav, consultation href)
│   │   └── utils.ts                # Utilitas helper
│   └── theme-provider.tsx          # Provider untuk theme management
├── api/
│   ├── routes/                     # Laravel API routes
│   ├── composer.json               # Laravel PHP dependencies
│   └── prisma/                     # Database schema (jika terintegrasi)
└── public/
    ├── images/
    │   ├── laptop-seeds.png        # Hero carousel slide 1 (pertanian)
    │   ├── farm-paddy.png          # Hero carousel slide 2 (peternakan)
    │   └── aquaculture.png         # Hero carousel slide 3 (perikanan)
```

## Cara Penggunaan

### 1. Menjalankan Development Server

**Metode A: Menjalankan keduanya (Direkomendasikan)**

Jalankan keduanya terminal terpisah:

```bash
# Terminal 1: Next.js frontend
cd web
npm run dev

# Terminal 2: Laravel API
cd api
php artisan serve
```

Aplikasi akan tersedia di `http://localhost:3000` dan API di `http://localhost:8000`.

**Metode B: Hanya Next.js (Tanpa API)**

```bash
# Dari root project
cd web
npm run dev
```

Aplikasi akan tersedia di `http://localhost:3000`, namun fitur kalkulator dan WhatsApp CTA akan menampilkan fallback URL karena Laravel API belum berjalan.

### 2. Akses Aplikasi

Buka `http://localhost:3000` di browser untuk melihat halaman utama.

### 3. Navigasi

- Klik menu kategori (Produk/Kalkulator) untuk berpindah section
- Gunakan tombol kiri/kanan di hero carousel untuk berganti slide
- Gunakan tombol "Tanya kebutuhan" untuk menghubungi konsultasi
- Pindahkan mode terang/gelap menggunakan toggle di kanan atas header

### 4. Menggunakan Kalkulator Dosis

1. Masukkan **Komoditas** (pertanian/ternak/ikan)
2. Masukkan **Luas Lahan** (hektar) atau **Volume Air** (liter)
3. Pilih **Fase Tanam/Siklus** hidup
4. Klik "Hitung" untuk melihat hasil:
   - Total kebutuhan produk
   - Jumlah kemasan
   - Perkiraan biaya
   - Jadwal aplikasi
5. Klik "Tanya kebutuhan" untuk menghubungi tim via WhatsApp

### 5. Mode Terang/Gelap

- Website secara otomatis mengikuti setting sistem OS
- Mode gelap menggunakan warna dasar hijau hutan `#072110` untuk kontras yang optimal
- Mode terang menggunakan `#F8FAF6` (cream putih muda)

### 6. Kontak

- Tombol "Tanya kebutuhan" mengirim pesan ke WhatsApp terintegrasi
- Email konsultasi tersedia di footer halaman

## Catatan Development

- **0 TypeScript error** - Codebase bersih tanpa error tipe
- **Tailwind CSS v4** - Digunakan dengan Turbopack untuk pengembangan cepat
- **ISR Components** - Cache components dinonaktifkan (`cacheComponents: false`) untuk kemudahan pengembangan dengan next-intl
- **API Rewrites** - Semua request `/api/:path*` di-forward ke `http://localhost:8000/api/:path*` (Laravel API)