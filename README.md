# Probiogreen

**Probiogreen** adalah website informasi dan kalkulator dosis probiotik untuk sektor pertanian, peternakan, dan perikanan. Website ini membantu petani dan entrepreneur menghitung kebutuhan produk probiotik berdasarkan luas lahan, jenis komoditas, dan fase tanam.

## Overview

Probiogreen menyediakan solusi kalkulasi dosis otomatis untuk:
- **Sektor Pertanian**: Menghitung dosis probiotik per hektar lahan
- **Peternakan**: Estimasi kebutuhan suplemen ternak dan probiotik air
- **Perikanan**: Perhitungan dosis untuk maintained air

Website ini memiliki hero carousel yang menampilkan gambar respondent dengan overlay gradient, navigasi carousel kiri/kanan, serta indikator slide untuk berpindah slide.

## Fitur Utama

- **Hero Carousel Responsive**: Gambar laptop/pertanian/perikanan yang menyesuaikan diri antara tampilan desktop (foto di samping kanan dengan teks) dan mobile (stack vertikal).
- **Navigasi Carousel**: Tombol kiri/kanan untuk berganti slide, serta indikator bawah.
- **Kalkulator Dosis**: Link ke section kalkulator untuk masing-masing sektor.
- **Navigasi Utama**: Menu navigasi utama yang menampilkan kategori produk.
- **Theme Toggle**: Pemilih mode terang/gelap.
- **CTA Button**: Tombol "Tanya kebutuhan" untuk konsultasi.

## Teknologi yang Digunakan

- **Next.js** - Framework React untuk rendering server dan routing
- **React** - Library antarmuka pengguna
- **Tailwind CSS** - Framework utilitas CSS untuk styling cepat dan responsif
- **Lucide React** - Ikon set untuk UI elements
- **TypeScript** - Untuk tipe data dan pengelolaan kode
- **CSS Variables** - Untuk theming warna konsisten

## Struktur Project

```
web/
├── src/
│   ├── components/
│   │   ├── nav/                    # Komponen navigasi
│   │   │   └── GooeyNav.tsx        # Komponen navigasi WebGL droplet/particle
│   │   │   └── GooeyNav.css        # CSS theming variabel untuk GooeyNav
│   │   ├── hero-carousel.tsx       # Hero carousel responsive component
│   │   ├── site/
│   │   │   ├── site-header.tsx     # Header dengan navbar, theme toggle, CTA
│   │   │   └── product-card.tsx    # Card produk
│   │   └── ui/                     # Komponen UI reusable (button, etc.)
│   ├── lib/
│   │   └── site.ts                 # Konfigurasi site (nama, nav, consultation href)
│   └── app/                        # Page routing (jika ada)
├── api/
│   └── resources/
│       └── js/                     # Sumber daya JS tambahan
└── prisma/                         # Database schema (jika terintegrasi)
```

## Cara Penggunaan

1. **Menjalankan Development Server**:
   ```bash
   cd web
   npm run dev
   # atau
   pnpm dev
   ```

2. **Akses Aplikasi**:
   Buka `http://localhost:3000` di browser untuk melihat halaman utama.

3. **Navigasi**:
   - Klik menu kategori untuk berpindah section
   - Gunakan tombol kiri/kanan di hero carousel untuk berganti slide
   - Gunakan tombol "Tanya kebutuhan" untuk menghubungi konsultasi
   - Pindahkan mode terang/gelap menggunakan toggle di kanan atas

4. **Mode Terang/Gelap**:
   - Website secara otomatis mengikuti setting sistem OS
   - Mode gelap menggunakan warna dasar hijau hutan `#072110` untuk kontras yang optimal

## Desain Visual

- **Palette Warna**:
  - Latar belakang terang: `#F8FAF6` (cream putih muda)
  - Hijau hutan: `#072110` (teks utama, navbar dark mode)
  - Sage green: `#D3EED9` (gradient hero carousel)
  - Cream sangat muda: `#DCE6DC` (border navbar)
  
- **Typografi**:
  - Teks utama: `text-[#072110]` (hijau hutan)
  - Heading: `text-3xl font-bold lg:text-5xl`
  - Subheading: `text-base leading-relaxed`

- **Spacing & Layout**:
  - Container maksimal lebar `max-w-6xl` dengan padding internal
  - Hero carousel tinggi `h-[440px] lg:h-[480px]`
  - Rounded corner konsisten `[32px]` untuk container

## Fix yang Dilakukan Terbaru

1. **Tombol hijau play/pause di tengah carousel** - Dihapus total
2. **Tombol navigasi kiri/kanan** - Diperbaiki ukuran `w-10 h-10`, warna teks `text-[#072110]`, background dihapus untuk tampilan yang rapi
3. **Bayangan hijau di pojok kanan atas** - Dihapus `backdrop-blur` dari header, warna navbar `bg-[#F8FAF6]` dengan border `border-[#DCE6DC]`
4. **Dark mode navbar** - Light mode `bg-[#F8FAF6]`, Dark mode `dark:bg-[#072110]` dengan border yang sesuai
5. **TypeScript compile** - 0 error