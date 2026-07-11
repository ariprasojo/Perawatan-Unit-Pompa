/**
 * unit-data.js — Data 7 Unit Pompa Sektor Pademangan
 * ─────────────────────────────────────────────────────────
 * Cara edit: ubah nilai di dalam array unitData sesuai data
 * unit sebenarnya. Foto sudah memakai foto asli di folder
 * assets/unit-pompa/.
 */
const unitData = [
  {
    id: 1,
    kode: "B 9522 PHA",
    nama: "Unit Pompa Pademangan Barat I",
    penempatan: "Pos Pademangan Barat",
    kapasitas: "4.000 L/menit",
    tahun: "—",
    bahanBakar: "Solar (Diesel)",
    kondisi: "Baik",
    foto: "assets/unit-pompa/unit-pademangan-barat-tall.jpeg",
    deskripsi: "Unit pompa yang bersiaga di Pos Pademangan Barat, menjadi unit garis depan untuk wilayah kerja Pademangan Barat dan sekitarnya."
  },
  {
    id: 2,
    kode: "B 9316 PHA",
    nama: "Unit Pompa Pademangan Barat II",
    penempatan: "Pos Pademangan Barat",
    kapasitas: "2.500 L/menit",
    tahun: "—",
    bahanBakar: "Solar (Diesel)",
    kondisi: "Baik",
    foto: "assets/unit-pompa/unit-pademangan-barat-2-tall.jpeg",
    deskripsi: "Unit pendamping di Pos Pademangan Barat, berfungsi sebagai unit cadangan sekaligus unit kedua saat terjadi penanganan kebakaran berskala besar."
  },
  {
    id: 3,
    kode: "B 9640 PHA",
    nama: "Unit Pompa Pademangan Timur",
    penempatan: "Pos Pademangan Timur",
    kapasitas: "2.500 L/menit",
    tahun: "—",
    bahanBakar: "Solar (Diesel)",
    kondisi: "Baik",
    foto: "assets/unit-pompa/unit-pademangan-timur-tall.jpeg",
    deskripsi: "Ditempatkan di wilayah Pademangan Timur, mendukung respons cepat terhadap potensi kebakaran di area permukiman dan pergudangan."
  },
  {
    id: 4,
    kode: "B 9305 PHA",
    nama: "Unit Pompa Pos Binaria I",
    penempatan: "Pos Binaria",
    kapasitas: "4.000 L/menit",
    tahun: "—",
    bahanBakar: "Solar (Diesel)",
    kondisi: "Baik",
    foto: "assets/unit-pompa/unit-pos-binaria-tall.jpeg",
    deskripsi: "Unit pompa utama yang bersiaga di Pos Binaria untuk mendukung penanganan kebakaran di wilayah kerja terkait."
  },
  {
    id: 5,
    kode: "B 9233 PHA",
    nama: "Unit Pompa Pos Binaria II (Light Pressure Unit)",
    penempatan: "Pos Binaria",
    kapasitas: "2.500 L/menit",
    tahun: "—",
    bahanBakar: "Solar (Diesel)",
    kondisi: "Baik",
    foto: "assets/unit-pompa/unit-pos-binaria-2-tall.jpeg",
    deskripsi: "Unit Light Pressure Unit (LPU) 'Asahimas' di Pos Binaria, dirancang untuk respons cepat dengan mobilitas yang lebih ringkas."
  },
  {
    id: 6,
    kode: "—",
    nama: "Unit Pompa Asahimas I",
    penempatan: "Asahimas",
    kapasitas: "10.000 L/menit",
    tahun: "—",
    bahanBakar: "Solar (Diesel)",
    kondisi: "Baik",
    foto: "assets/unit-pompa/unit-asahimas-tall.jpeg",
    deskripsi: "Unit dengan kapasitas debit terbesar di Sektor Pademangan, disiagakan di kawasan Asahimas untuk mendukung penanganan kebakaran skala besar."
  },
  {
    id: 7,
    kode: "B 9408 PHA",
    nama: "Unit Pompa Asahimas II",
    penempatan: "Asahimas",
    kapasitas: "2.500 L/menit",
    tahun: "—",
    bahanBakar: "Solar (Diesel)",
    kondisi: "Baik",
    foto: "assets/unit-pompa/unit-asahimas-2-tall.jpeg",
    deskripsi: "Unit pendamping di kawasan Asahimas, siap dimobilisasi untuk mendukung unit utama dalam penanganan kebakaran."
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
        <p class="unit-card__title">${u.nama}</p>
        <p class="unit-card__loc">📍 ${u.penempatan}${u.kode !== "—" ? " · " + u.kode : ""}</p>
        <div class="unit-card__meta">
          <span>⚡ ${u.kapasitas}</span>
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
  document.getElementById("unitModalSub").textContent = `${u.kode !== "—" ? u.kode + " · " : ""}${u.penempatan}`;
  document.getElementById("unitModalDesc").textContent = u.deskripsi;
  document.getElementById("unitModalKapasitas").textContent = u.kapasitas;
  document.getElementById("unitModalTahun").textContent = u.tahun;
  document.getElementById("unitModalBBM").textContent = u.bahanBakar;
  const kondisiEl = document.getElementById("unitModalKondisi");
  kondisiEl.textContent = u.kondisi;
  kondisiEl.style.color = u.kondisi === "Baik" ? "var(--ok)" : "var(--dev)";

  const heroEl = document.querySelector(".modal-box__hero");
  if (u.foto) {
    heroEl.style.backgroundImage = `url('${u.foto}')`;
    heroEl.style.backgroundSize = "cover";
    heroEl.style.backgroundPosition = "center";
    heroEl.style.fontSize = "0";
  } else {
    heroEl.style.backgroundImage = "none";
    heroEl.style.fontSize = "4rem";
  }

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
