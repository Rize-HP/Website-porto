# Verification — 24 September 2026

Pemeriksaan dilakukan pada Chrome 153 melalui Playwright, disertai pemeriksaan screenshot desktop, tablet, mobile, menu, dan modal.

## Hasil fungsional

- Keenam project tampil; empat filter menghasilkan kartu dan status `aria-pressed` yang benar.
- Semua case study menampilkan tujuh bagian, mendukung tautan langsung, next project, tombol Back browser, dan fallback untuk project yang tidak ditemukan.
- Fokus masuk ke judul modal, tetap di dalam dialog saat navigasi keyboard, dan kembali ke kartu setelah Escape atau tombol tutup.
- Sticky navbar, indikator section aktif, menu mobile, dan navigasi anchor berfungsi.
- Instagram dan LinkedIn menggunakan URL pemilik; CTA email memakai `mailto:farrizqiichsanm@gmail.com`.
- Tidak ditemukan JavaScript error atau asset 404 dalam pengujian alur browser.

## Responsive dan motion

Tidak ada horizontal overflow atau heading terpotong pada lebar **320, 375, 390, 600, 768, 820, 1024, 1440, dan 1920 px**.

Viewport reveal diperiksa dengan animasi aktif. Perubahan preferensi `prefers-reduced-motion` membuat semua konten tetap terlihat dan menonaktifkan gerakan. Konten utama tetap tersedia saat JavaScript dinonaktifkan.

## Aksesibilitas

axe-core 4.10.3 dengan ruleset WCAG 2 A/AA dan WCAG 2.1 AA melaporkan **0 pelanggaran otomatis** pada halaman desktop, case study terbuka, dan menu mobile terbuka.

Kontras sejumlah teks di atas gambar menghasilkan status perlu pemeriksaan manual, karena analisis otomatis tidak dapat memastikan background gambar. Overlay diperiksa secara visual; caption hero diberi latar gelap untuk keterbacaan. Hasil ini bukan sertifikasi aksesibilitas menyeluruh. Screen reader fisik dan browser Safari/Firefox belum diuji.

## Build dan versi offline

- Semua modul JavaScript lulus `node --check`.
- Build statis `dist/` berhasil; total seluruh file sekitar 232 KB sebelum kompresi HTTP.
- Tidak ada request runtime ke layanan pihak ketiga.
- Versi `iki-portfolio.html` diuji dengan jaringan browser dimatikan: font, ilustrasi, filter, case study, menu mobile, dan kontak tetap tampil.
- Link Instagram/LinkedIn memerlukan internet saat dibuka; tombol email memerlukan aplikasi email yang terkonfigurasi.

## Konten yang masih dapat dilengkapi pemilik

Cover project masih berupa ilustrasi konsep yang diberi label placeholder. Tahun yang belum diketahui ditulis “Year —”. Detail eksekusi dan refleksi yang belum didukung dokumentasi ditandai sebagai kerangka pembelajaran, bukan hasil terukur.
