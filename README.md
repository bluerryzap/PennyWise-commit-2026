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

- React dan React DOM
- Vite
- Tailwind CSS dan PostCSS
- Nanoid

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
src/
├── app.jsx
├── main.jsx
├── index.css
├── components/
│   └── hero.jsx
└── pages/
    └── home.jsx
```

- `src/main.jsx` memasang aplikasi React pada elemen `#root` dan mengimpor CSS.
- `src/app.jsx` menjadi komponen aplikasi utama.
- `src/pages/home.jsx` menyusun halaman utama.
- `src/components/hero.jsx` menampilkan bagian hero.
- `src/index.css` mengimpor Tailwind CSS v4.

## Konfigurasi

- `postcss.config.cjs` menggunakan format CommonJS yang sesuai dengan `"type": "commonjs"` pada `package.json`, dan memuat plugin `@tailwindcss/postcss` serta Autoprefixer.
- `vite.config.mjs` dan `tailwind.config.mjs` menggunakan ekstensi `.mjs` agar sintaks ESM-nya dikenali.
- Konfigurasi Tailwind berada di `tailwind.config.mjs`; CSS mengimpor Tailwind melalui `@import "tailwindcss";` di `src/index.css`.

Build produksi dapat dibuat dengan `npm run build`.

## Keterangan penggunaan AI, template, starter code, dan aset pihak ketiga
- Penggunaan AI untuk membantu membenarkan error.
- Melakukan code reuse dari proyek pribadi sebelumnya, lalu diubah.
- Penggunaan library:
    1. React dan React DOM - untuk membangun antarmuka
    2. nanoid - untuk membuat ID unik
    3. Vite dan @vitejs/plugin-react - untuk dev server dan build tool
    4. Tailwind CSS, @tailwindcss/postcss, PostCSS, Autoprefixer - untuk styling

