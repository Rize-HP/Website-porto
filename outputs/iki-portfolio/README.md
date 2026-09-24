# Iki — Personal Portfolio

Portfolio Farrizqi Ichsan Maulana, pelajar Bisnis Digital dengan minat pada marketing, content, visual storytelling, dan creative strategy.

Desain editorial menggunakan warm white, charcoal, dan cobalt blue. Manrope menjadi display font, DM Sans untuk body, dan Instrument Serif untuk aksen. Seluruh font dan visual disimpan lokal; website tidak memerlukan layanan eksternal untuk tampil.

## Menjalankan

Gunakan Node.js 20 atau lebih baru. Tidak perlu memasang dependency.

```sh
node scripts/dev.mjs
```

Buka **http://localhost:4173**. Setelah mengedit source, refresh browser. Pilih port lain bila diperlukan:

```sh
node scripts/dev.mjs --port 3000
```

Build untuk hosting statis:

```sh
node scripts/build.mjs
```

Upload **isi folder `dist/`** ke hosting statis. Tidak dibutuhkan server aplikasi atau database. Preview build dengan `node scripts/dev.mjs --dist`.

Untuk menghasilkan satu file HTML yang dapat dibuka langsung dan offline:

```sh
node scripts/standalone.mjs
```

File `iki-portfolio.html` dihasilkan di folder induk project. Buka di browser modern. Font dan ilustrasi telah disertakan di dalamnya.

## Mengubah konten

- **`src/data.js`**: profil, email, Instagram, LinkedIn, project, tahun, case study, skills, dan pengalaman.
- **`src/components.js`**: reusable Navbar, ProjectCard, SkillCard, SectionHeader, CTA, Footer, dan section lainnya.
- **`src/app.js`**: filter project, menu mobile, penanda navigasi aktif, animasi, dan modal case study.
- **`src/styles.css`**: design tokens, layout, breakpoint, state interaksi, dan reduced motion.
- **`src/fonts.css`**: font yang disimpan lokal.
- **`public/assets/`**: ilustrasi SVG, favicon, font, dan lisensinya.

Ubah source, kemudian jalankan build kembali. Jangan mengedit `dist/` secara langsung karena build berikutnya akan menimpanya.

## Mengganti thumbnail

Enam cover adalah ilustrasi konsep, **bukan dokumentasi asli karya Iki**. Label placeholder sengaja ditampilkan pada kartu dan dijelaskan dalam case study.

1. Simpan gambar asli, sebaiknya WebP/AVIF dengan rasio mendekati **800 × 570**, di `public/assets/`.
2. Ubah properti `image` dan `alt` project di `src/data.js`.
3. Setelah karya asli tersedia, sesuaikan label `coverLabel`, badge placeholder pada `ProjectCard`, dan catatan case study agar cocok dengan dokumentasinya.

Thumbnail menggunakan `loading="lazy"`, ukuran eksplisit untuk menjaga layout, dan `decoding="async"`. Ilustrasi hero dimuat lebih awal. Tidak ada tracking, autoplay, atau video berat.

## Akurasi konten

Instagram, LinkedIn, dan email berasal dari informasi yang diberikan pemilik portfolio. GitHub tidak ditampilkan karena belum tersedia.

Detail SMKN 20 Jakarta, pengalaman kompetisi, film “Jejak Batik”, Santara VCI, serta organisasi mengacu pada CV yang diberikan. File CV, alamat rumah, dan nomor telepon tidak disertakan dalam website.

Tahun yang belum diketahui tetap ditulis **Year —**. Terra Coffee, Zenithro, dan Infinix menggunakan kerangka case study yang ditandai sebagai *study outline*. Jangan mengganti fokus pembelajaran dengan klaim hasil sebelum ada bukti. Tidak ada angka reach, conversion, penjualan, atau ROI yang dibuat-buat.

## Fitur

- Semua konten utama sudah tersedia dalam HTML untuk SEO dan akses tanpa JavaScript.
- Enam case study dengan tautan langsung seperti `#case/terra-coffee`.
- Filter marketing, brand/business, dan visual/community.
- Modal native dengan keyboard, Escape, backdrop, dan pengembalian fokus.
- Menu mobile, sticky navbar, dan indikator section aktif.
- Fade-in, hover image, CTA ringan, serta dukungan `prefers-reduced-motion`.
- Tag judul, meta description, Open Graph, favicon, dan schema Person.

Saat domain final tersedia, tambahkan canonical URL, `og:url`, dan gambar social sharing beralamat absolut pada `scripts/build.mjs`. Tidak ada domain contoh atau identitas palsu yang ditambahkan.

## Lisensi asset

Ilustrasi SVG dibuat untuk portfolio ini dan dapat diedit. Font didistribusikan dengan SIL Open Font License; file lisensinya berada di `public/assets/`.

Lihat `QA.md` untuk ringkasan verifikasi.
