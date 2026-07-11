/**
 * unit-data.js — Data 7 Unit Pompa Sektor Pademangan
 * ─────────────────────────────────────────────────────────
 * Cara edit: ubah nilai di dalam array unitData sesuai data
 * unit sebenarnya. Foto sudah memakai foto asli di folder
 * assets/unit-pompa/.
 *
 * Data ini adalah SATU-SATUNYA sumber data unit pompa —
 * dipakai baik untuk grid lengkap di profil-unit.html
 * (renderUnitGrid) maupun untuk fleet strip di index.html
 * (renderFleetStrip), supaya tidak perlu edit foto/nama unit
 * di dua tempat berbeda.
 *
 * Membutuhkan: utils.js dan modal.js sudah di-load sebelum file ini.
 */
window.LinkTerpadu = window.LinkTerpadu || {};

(function (App) {
  "use strict";

  const escapeHtml = App.escapeHtml;

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
      deskripsi:
        "Unit pompa yang bersiaga di Pos Pademangan Barat, menjadi unit garis depan untuk wilayah kerja Pademangan Barat dan sekitarnya.",
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
      deskripsi:
        "Unit pendamping di Pos Pademangan Barat, berfungsi sebagai unit cadangan sekaligus unit kedua saat terjadi penanganan kebakaran berskala besar.",
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
      deskripsi:
        "Ditempatkan di wilayah Pademangan Timur, mendukung respons cepat terhadap potensi kebakaran di area permukiman dan pergudangan.",
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
      deskripsi:
        "Unit pompa utama yang bersiaga di Pos Binaria untuk mendukung penanganan kebakaran di wilayah kerja terkait.",
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
      deskripsi:
        "Unit Light Pressure Unit (LPU) 'Asahimas' di Pos Binaria, dirancang untuk respons cepat dengan mobilitas yang lebih ringkas.",
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
      deskripsi:
        "Unit dengan kapasitas debit terbesar di Sektor Pademangan, disiagakan di kawasan Asahimas untuk mendukung penanganan kebakaran skala besar.",
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
      deskripsi:
        "Unit pendamping di kawasan Asahimas, siap dimobilisasi untuk mendukung unit utama dalam penanganan kebakaran.",
    },
  ];

  App.unitData = unitData; // expose kalau dibutuhkan file lain

  // Peringatan dini kalau ada foto yang belum diisi/masih placeholder
  unitData.forEach((u) => {
    if (!u.foto) {
      console.warn(`[Link Terpadu] Unit "${u.nama}" belum punya foto (field "foto" kosong).`);
    }
  });

  let unitModal = null;

  function unitPhotoMarkup(u) {
    if (!u.foto) return "🚒";
    return `<img src="${escapeHtml(u.foto)}" alt="${escapeHtml(u.nama)}" loading="lazy" decoding="async" style="width:100%;height:100%;object-fit:cover;position:absolute;inset:0;"/>`;
  }

  function renderUnitGrid() {
    const grid = document.getElementById("unitGrid");
    if (!grid) return;
    grid.innerHTML = "";
    unitData.forEach((u) => {
      const card = document.createElement("article");
      card.className = "unit-card";
      card.innerHTML = `
        <div class="unit-card__photo">
          <span class="unit-card__no">Unit ${String(u.id).padStart(2, "0")}</span>
          ${unitPhotoMarkup(u)}
        </div>
        <div class="unit-card__body">
          <p class="unit-card__title">${escapeHtml(u.nama)}</p>
          <p class="unit-card__loc">📍 ${escapeHtml(u.penempatan)}${u.kode !== "—" ? " · " + escapeHtml(u.kode) : ""}</p>
          <div class="unit-card__meta">
            <span>⚡ ${escapeHtml(u.kapasitas)}</span>
          </div>
          <p class="unit-card__cta">Lihat Detail →</p>
        </div>`;
      App.makeActivatable(card, () => openUnitModal(u), `Lihat detail ${u.nama}`);
      grid.appendChild(card);
    });
  }

  function openUnitModal(u) {
    if (!unitModal) return;
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
      heroEl.style.backgroundSize = "contain";
      heroEl.style.backgroundPosition = "center";
      heroEl.style.backgroundRepeat = "no-repeat";
      heroEl.style.fontSize = "0";
    } else {
      heroEl.style.backgroundImage = "none";
      heroEl.style.fontSize = "4rem";
    }

    unitModal.open();
  }

  /**
   * Fleet strip di Beranda (index.html).
   * Dulu daftar 7 foto ini di-hardcode manual di index.html,
   * terpisah dari unitData — sekarang di-render dari sumber
   * data yang sama supaya tidak perlu diedit di dua tempat.
   */
  function renderFleetStrip() {
    const grid = document.getElementById("fleetStripGrid");
    if (!grid) return;
    grid.innerHTML = "";

    unitData.forEach((u) => {
      const item = document.createElement("div");
      item.className = "fleet-strip__item";
      item.innerHTML = `
        <img src="${escapeHtml(u.foto)}" alt="${escapeHtml(u.nama)}" loading="lazy" decoding="async"/>
        <span>${escapeHtml(u.penempatan)}</span>`;
      grid.appendChild(item);
    });

    const more = document.createElement("a");
    more.href = "profil-unit.html";
    more.className = "fleet-strip__item fleet-strip__item--more";
    more.innerHTML = `
      <span class="fleet-strip__more-num">${unitData.length}</span>
      <span class="fleet-strip__more-txt">Lihat Semua Unit →</span>`;
    grid.appendChild(more);
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderUnitGrid();
    renderFleetStrip();

    if (document.getElementById("unitModalOverlay")) {
      unitModal = App.createModal({
        overlayId: "unitModalOverlay",
        closeId: "unitModalClose",
      });
    }
  });
})(window.LinkTerpadu);
