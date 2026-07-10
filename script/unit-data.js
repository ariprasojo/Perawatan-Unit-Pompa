/**
 * unit-data.js — Data 7 Unit Pompa Sektor Pademangan
 * ─────────────────────────────────────────────────────────
 * Cara edit: ubah nilai di dalam array unitData sesuai data
 * unit sebenarnya (nomor lambung, kapasitas, penempatan, dll).
 * Ganti foto: isi field `foto` dengan path gambar, contoh:
 * foto: "../assets/unit-01.jpg"  (kosongkan "" untuk pakai ikon).
 */
const unitData = [
  {
    id: 1,
    kode: "UP-01",
    nama: "Unit Pompa 01",
    penempatan: "Pos Sektor Pademangan Induk",
    kapasitas: "2.000 L/menit",
    tahun: "2019",
    bahanBakar: "Solar (Diesel)",
    kondisi: "Baik",
    foto: "",
    deskripsi: "Unit pompa utama yang bersiaga di pos induk Sektor Pademangan, digunakan sebagai unit garis depan untuk penanganan kebakaran di wilayah kerja."
  },
  {
    id: 2,
    kode: "UP-02",
    nama: "Unit Pompa 02",
    penempatan: "Pos Sektor Pademangan Induk",
    kapasitas: "2.000 L/menit",
    tahun: "2020",
    bahanBakar: "Solar (Diesel)",
    kondisi: "Baik",
    foto: "",
    deskripsi: "Unit pendamping di pos induk, berfungsi sebagai unit cadangan sekaligus unit kedua saat terjadi penanganan kebakaran berskala besar."
  },
  {
    id: 3,
    kode: "UP-03",
    nama: "Unit Pompa 03",
    penempatan: "Pos Pademangan Barat",
    kapasitas: "1.800 L/menit",
    tahun: "2018",
    bahanBakar: "Solar (Diesel)",
    kondisi: "Baik",
    foto: "",
    deskripsi: "Bersiaga di wilayah Pademangan Barat untuk mempercepat respons penanganan kebakaran di area permukiman padat."
  },
  {
    id: 4,
    kode: "UP-04",
    nama: "Unit Pompa 04",
    penempatan: "Pos Pademangan Timur",
    kapasitas: "1.800 L/menit",
    tahun: "2021",
    bahanBakar: "Solar (Diesel)",
    kondisi: "Baik",
    foto: "",
    deskripsi: "Ditempatkan di wilayah Pademangan Timur, mendukung respons cepat terhadap potensi kebakaran di kawasan industri dan pergudangan."
  },
  {
    id: 5,
    kode: "UP-05",
    nama: "Unit Pompa 05",
    penempatan: "Pos Ancol",
    kapasitas: "2.200 L/menit",
    tahun: "2017",
    bahanBakar: "Solar (Diesel)",
    kondisi: "Baik",
    foto: "",
    deskripsi: "Unit dengan kapasitas debit tertinggi, disiagakan di kawasan Ancol untuk mendukung penanganan area wisata dan padat pengunjung."
  },
  {
    id: 6,
    kode: "UP-06",
    nama: "Unit Pompa 06",
    penempatan: "Pos Pademangan Induk",
    kapasitas: "1.500 L/menit",
    tahun: "2016",
    bahanBakar: "Solar (Diesel)",
    kondisi: "Perlu Perhatian",
    foto: "",
    deskripsi: "Unit dalam pemantauan rutin. Sedang dijadwalkan pemeriksaan berkala terhadap komponen mesin dan sistem pompa."
  },
  {
    id: 7,
    kode: "UP-07",
    nama: "Unit Pompa 07",
    penempatan: "Pos Cadangan Sektor",
    kapasitas: "1.500 L/menit",
    tahun: "2022",
    bahanBakar: "Solar (Diesel)",
    kondisi: "Baik",
    foto: "",
    deskripsi: "Unit cadangan sektor yang siap dimobilisasi ke pos mana pun sesuai kebutuhan operasional dan penugasan piket."
  }
];

function renderUnitGrid() {
  const grid = document.getElementById("unitGrid");
  if (!grid) return;
  grid.innerHTML = "";
  unitData.forEach(u => {
    const card = document.createElement("article");
    card.className = "unit-card";
    card.innerHTML = `
      <div class="unit-card__photo">
        <span class="unit-card__no">Unit ${String(u.id).padStart(2,"0")}</span>
        ${u.foto ? `<img src="${u.foto}" alt="${u.nama}" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0;"/>` : "🚒"}
      </div>
      <div class="unit-card__body">
        <p class="unit-card__title">${u.nama} <span style="color:var(--ink-soft);font-weight:600;font-size:0.8rem;">· ${u.kode}</span></p>
        <p class="unit-card__loc">📍 ${u.penempatan}</p>
        <div class="unit-card__meta">
          <span>⚡ ${u.kapasitas}</span>
          <span>📅 ${u.tahun}</span>
        </div>
        <p class="unit-card__cta">Lihat Detail →</p>
      </div>`;
    card.addEventListener("click", () => openUnitModal(u));
    grid.appendChild(card);
  });
}

function openUnitModal(u) {
  const overlay = document.getElementById("unitModalOverlay");
  if (!overlay) return;
  document.getElementById("unitModalTitle").textContent = u.nama;
  document.getElementById("unitModalSub").textContent = `${u.kode} · ${u.penempatan}`;
  document.getElementById("unitModalDesc").textContent = u.deskripsi;
  document.getElementById("unitModalKapasitas").textContent = u.kapasitas;
  document.getElementById("unitModalTahun").textContent = u.tahun;
  document.getElementById("unitModalBBM").textContent = u.bahanBakar;
  const kondisiEl = document.getElementById("unitModalKondisi");
  kondisiEl.textContent = u.kondisi;
  kondisiEl.style.color = u.kondisi === "Baik" ? "var(--ok)" : "var(--dev)";
  overlay.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closeUnitModal() {
  const overlay = document.getElementById("unitModalOverlay");
  if (!overlay) return;
  overlay.classList.remove("is-open");
  document.body.style.overflow = "";
}

document.addEventListener("DOMContentLoaded", () => {
  renderUnitGrid();
  const closeBtn = document.getElementById("unitModalClose");
  const overlay = document.getElementById("unitModalOverlay");
  if (closeBtn) closeBtn.addEventListener("click", closeUnitModal);
  if (overlay) overlay.addEventListener("click", e => { if (e.target === overlay) closeUnitModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeUnitModal(); });
});
