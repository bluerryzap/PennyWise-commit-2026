# PennyWise

Website pencatat keuangan pribadi untuk mahasiswa.

## Tim
- Nama Tim: Nama timnya mau yg bener apa yg gajelas
- Anggota:
    - Ajwa Fadhila Zulfa (26/583353/PA/24485) - Mendesain UI/UX dan kode program CSS
    - Khaira Denisa (26/586577/PA/24693) - Kode program JavaScript
    - Lumongga Anandita Helmy  (26/587341/PA/24756) - Mendesain UI/UX dan edit README
    - Audina Dwiyunita Putri (26/587248/PA/24748) - Membuat laporan

## Deskripsi
"PennyWise" merupakan website pencatat keuangan pribadi yang praktis dan ramah bagi mahasiswa. Website ini memiliki beberapa fitur seperti:
- Ringkasan keuangan yang terdapat saldo terkini, total pemasukan dan pengeluaran.
- Menambahkan jenis transaksi seperti pengeluaran dan pemasukan dengan nominal dan kategorinya.
- Menampilkan seluruh riwayat transaksi termasuk pengeluaran dan pemasukan. Serta dapat mengedit dan menghapus riwayat.
- Setiap catatan transaksi tersimpan secara otomatis di peramban.

## Teknologi

- React dan React DOM untuk antarmuka.
- Vite dan plugin React untuk pengembangan dan build.
- Tailwind CSS v4 untuk styling.
- PostCSS dan Autoprefixer untuk pemrosesan CSS.
- Nanoid untuk membuat ID transaksi.

## Instalasi

Pastikan Node.js dan npm sudah terpasang, lalu jalankan:

```bash
npm install
```

## Perintah

Jalankan server pengembangan:

```bash
npm run dev
```

Buat build produksi:

```bash
npm run build
```

Pratinjau build produksi:

```bash
npm run preview
```

## Struktur proyek

```text
.
├── index.html
├── package.json
├── postcss.config.cjs
├── tailwind.config.mjs
├── vite.config.mjs
└── src/
    ├── app.jsx
    ├── index.css
    ├── main.jsx
    ├── assets/
    │   └── Logo.svg
    └── pages/
        └── home.jsx
```

- `src/main.jsx` memasang aplikasi React pada elemen `#root` dan mengimpor CSS.
- `src/app.jsx` menjadi komponen aplikasi utama.
- `src/pages/home.jsx` memuat ringkasan keuangan, formulir, dan riwayat transaksi.
- `src/assets/Logo.svg` adalah logo yang digunakan pada header.
- `src/index.css` mengimpor Tailwind CSS.

## Konfigurasi

- `vite.config.mjs` mengaktifkan plugin React untuk Vite.
- `postcss.config.cjs` menggunakan CommonJS sesuai `"type": "commonjs"` di `package.json`, dengan plugin `@tailwindcss/postcss` dan Autoprefixer.
- `src/index.css` memuat Tailwind CSS v4 melalui `@import "tailwindcss";`.
- `tailwind.config.mjs` berisi pengaturan `content`, tema, dan plugin. Tailwind CSS v4 tidak otomatis memuat konfigurasi JavaScript ini; tambahkan direktif `@config` di CSS jika pengaturan tersebut ingin diterapkan.

Build produksi dapat dibuat dengan `npm run build`.

## Keterangan penggunaan AI, template, starter code, dan aset pihak ketiga
- Penggunaan AI untuk membantu membenarkan error pada kode.
- Melakukan code reuse dari proyek pribadi sebelumnya, lalu diubah.
- Penggunaan library:
    1. React dan React DOM - untuk membangun antarmuka
    2. nanoid - untuk membuat ID unik
    3. Vite dan @vitejs/plugin-react - untuk dev server dan build tool
    4. Tailwind CSS, @tailwindcss/postcss, PostCSS, Autoprefixer - untuk styling

