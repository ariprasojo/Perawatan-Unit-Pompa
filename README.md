# Link Terpadu — Informasi Perawatan Unit Pompa
Sektor Penanggulangan Kebakaran dan Penyelamatan Kecamatan Pademangan

Website statis, siap pakai, tanpa server/instalasi. Langsung bisa di-push ke repo GitHub dan dijalankan lewat GitHub Pages.

## Struktur Folder
```
link-terpadu/
├── index.html          ← Beranda (banner, tentang, tujuan, manfaat, menu utama)
├── profil-unit.html    ← Menu 1: Profil 7 Unit Pompa (klik unit → detail)
├── pemeliharaan.html   ← Menu 2: Info Pemeliharaan (infografis Selang Penyalur)
├── edukasi.html        ← Menu 3: Video Edukasi (Channel Edu Damkar)
├── dokumentasi.html    ← Menu 4: Dokumentasi Temuan (Google Form + Sheets)
├── css/style.css       ← Semua styling
├── script/
│   ├── main.js         ← Burger menu, tahun otomatis
│   ├── utils.js         ← Helper bersama: escapeHtml(), makeActivatable()
│   ├── modal.js          ← Modal generik reusable (dipakai unit & video)
│   ├── unit-data.js     ← Data 7 unit pompa + render grid & fleet strip + modal detail
│   └── video-data.js    ← Data video edukasi + modal video
└── assets/
    ├── unit-pompa/       ← Taruh foto 7 unit pompa asli di sini (lihat unit-data.js)
    └── pemeliharaan/     ← Foto infografis Selang Penyalur (sudah terisi, diekstrak dari PDF panduan)
```

## Cara Pakai Lokal
Cukup buka `index.html` di browser — tidak perlu server. Semua script tetap
memakai `<script>` biasa (bukan ES module) supaya cara ini tetap berfungsi.

## Cara Push ke GitHub Pages

```bash
cd link-terpadu
git init
git add .
git commit -m "Initial commit: Link Terpadu"
git branch -M main
git remote add origin https://github.com/rifkykurniawanputra/damkar.git
git push -u origin main
```

Lalu aktifkan GitHub Pages: **Settings → Pages → Branch: main → Save**.
Situs akan aktif di:
```
https://rifkykurniawanputra.github.io/damkar/
```

## Yang Perlu Disesuaikan (Data Dummy → Data Asli)

| File | Yang perlu diganti |
|---|---|
| `script/unit-data.js` | Data 7 unit pompa (kode, penempatan, kapasitas, foto asli) — dipakai juga oleh Beranda (fleet strip), jadi cukup edit di satu tempat ini |
| `script/video-data.js` | `youtubeId` diisi ID video asli dari Channel Edu Damkar (console akan warning kalau masih placeholder) |
| `dokumentasi.html` | Link `forms.google.com` & `sheets.google.com` diganti link Form/Sheet asli |
| `pemeliharaan.html` | Infografis **Selang Penyalur** sudah lengkap (foto asli + narasi teknis, dari PDF panduan). Item lain (Selang Penghisap, Hose Reel, Nozzle, dst) masih 🚧 Dalam Pengembangan — tambahkan dengan meniru struktur komponen yang sama (`.maint-intro`, `.stage-block`, `.checklist-grid`, dst di `css/style.css`) |
| `assets/unit-pompa/` | Taruh foto unit asli sesuai nama file yang dirujuk field `foto` di `unit-data.js` |

## Menambah Video Edukasi
Buka `script/video-data.js`, tambahkan objek baru ke `videoData`:
```js
{ id: 7, youtubeId: "ID_YOUTUBE", title: "Judul Video", desc: "Deskripsi singkat." },
```

## Menambah Item Pemeliharaan Baru
Di `pemeliharaan.html`, ubah salah satu blok `<div class="care-item care-item--dev">` menjadi:
```html
<a href="#nama-item" class="care-item care-item--ready">...</a>
```
lalu tambahkan section infografis baru dengan `id="nama-item"` meniru pola section "Pemeliharaan Selang Penyalur".

## Catatan Hasil Code Review (per Juli 2026)
Codebase sudah di-refactor untuk memperbaiki beberapa hal:
- **Keamanan** — semua data dinamis (nama unit, judul/deskripsi video) di-escape lewat `utils.js` → `escapeHtml()` sebelum dirender, mencegah HTML/script injection kalau suatu saat data diisi dari sumber luar (mis. Google Sheets).
- **Duplikasi kode** — logic buka/tutup modal (overlay, tombol close, klik-luar, Escape) disatukan jadi `script/modal.js`, dipakai bareng oleh modal unit & video.
- **Sumber data ganda** — foto armada di Beranda (fleet strip) sekarang di-render otomatis dari `unitData` yang sama dengan `profil-unit.html`, bukan hardcode manual di HTML.
- **Aksesibilitas** — modal kini punya `role="dialog"`, `aria-modal`, focus trap (Tab tidak keluar dari modal), dan fokus otomatis kembali ke kartu yang diklik saat modal ditutup. Kartu unit/video juga bisa diakses lewat keyboard (Tab + Enter/Space), bukan cuma klik mouse.
- **Performa** — gambar unit & fleet strip memakai `loading="lazy" decoding="async"`.
- **Namespace global** — `main.js`, `unit-data.js`, `video-data.js` dibungkus IIFE dan berbagi satu namespace `window.LinkTerpadu`, supaya tidak mencemari global scope.

---
**Pengembang:** Ari Prasojo — Petugas Pemadam Kebakaran Pemula, Sektor Penanggulangan Kebakaran dan Penyelamatan Kecamatan Pademangan, 2026.
