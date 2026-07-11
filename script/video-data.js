/**
 * video-data.js — Data Video Edukasi (Channel Edu Damkar)
 * ─────────────────────────────────────────────────────────
 * Cara tambah video: tambahkan objek baru ke array videoData.
 * youtubeId diambil dari URL: youtube.com/watch?v=XXXXXXXXXXX
 *
 * Membutuhkan: utils.js dan modal.js sudah di-load sebelum file ini.
 */
window.LinkTerpadu = window.LinkTerpadu || {};

(function (App) {
  "use strict";

  const escapeHtml = App.escapeHtml;
  const PLACEHOLDER_ID = "dQw4w9WgXcQ";

  const videoData = [
    { id: 1, youtubeId: "dQw4w9WgXcQ", title: "Cara Perawatan dan Pemeliharaan Selang Penyalur", desc: "Panduan langkah demi langkah pemeliharaan selang penyalur pada unit mobil pompa." },
    { id: 2, youtubeId: "dQw4w9WgXcQ", title: "Inspeksi Harian Unit Mobil Pompa Sebelum Operasional", desc: "Checklist inspeksi harian agar unit pompa selalu siap digunakan saat bertugas." },
    { id: 3, youtubeId: "dQw4w9WgXcQ", title: "Teknik Dasar Pengoperasian Unit Mobil Pompa", desc: "Dasar-dasar pengoperasian unit mobil pompa sesuai Buku Diklat Operator." },
    { id: 4, youtubeId: "dQw4w9WgXcQ", title: "Keselamatan Kerja saat Pemeliharaan Perlengkapan", desc: "Prosedur keselamatan kerja (APD) yang wajib diterapkan selama pemeliharaan." },
    { id: 5, youtubeId: "dQw4w9WgXcQ", title: "Mengenal Bagian-Bagian Unit Mobil Pompa", desc: "Pengenalan komponen utama unit mobil pompa untuk personel baru." },
    { id: 6, youtubeId: "dQw4w9WgXcQ", title: "Prosedur Pelaporan Temuan Kerusakan Perlengkapan", desc: "Cara melaporkan temuan kendala atau kerusakan melalui Link Terpadu." },
  ];

  // Peringatan dini di console kalau ID video masih placeholder,
  // supaya kelihatan sebelum situs di-deploy ke production.
  videoData.forEach((v) => {
    if (v.youtubeId === PLACEHOLDER_ID) {
      console.warn(`[Link Terpadu] youtubeId video "${v.title}" masih placeholder, belum diganti ID asli.`);
    }
  });

  function thumbUrl(id) {
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
  }

  let videoModal = null;

  function renderVideoGrid() {
    const grid = document.getElementById("videoGrid");
    if (!grid) return;
    grid.innerHTML = "";
    videoData.forEach((v) => {
      const card = document.createElement("article");
      card.className = "video-card";
      card.innerHTML = `
        <div class="video-card__thumb">
          <img src="${escapeHtml(thumbUrl(v.youtubeId))}" alt="${escapeHtml(v.title)}" loading="lazy" decoding="async"
            onerror="this.src='https://placehold.co/640x360/0b1d3a/e5a83e?text=Edu+Damkar'"/>
          <div class="video-card__play"><div class="video-card__play-btn">▶</div></div>
        </div>
        <div class="video-card__body">
          <p class="video-card__title">${escapeHtml(v.title)}</p>
          <p class="video-card__source">▶ Edu Damkar · YouTube</p>
        </div>`;
      App.makeActivatable(card, () => openVideoModal(v), `Putar video ${v.title}`);
      grid.appendChild(card);
    });
  }

  function openVideoModal(v) {
    if (!videoModal) return;
    document.getElementById("videoModalTitleTxt").textContent = v.title;
    document.getElementById("videoModalDesc").textContent = v.desc;
    const frame = document.getElementById("youtubeFrame");
    frame.title = v.title;
    frame.src = `https://www.youtube.com/embed/${v.youtubeId}?autoplay=1&rel=0`;
    videoModal.open();
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderVideoGrid();

    if (document.getElementById("videoModalOverlay")) {
      videoModal = App.createModal({
        overlayId: "videoModalOverlay",
        closeId: "videoModalClose",
        onClose: () => {
          document.getElementById("youtubeFrame").src = "";
        },
      });
    }
  });
})(window.LinkTerpadu);
