/**
 * video-data.js — Data Video Edukasi (Channel Edu Damkar)
 * ─────────────────────────────────────────────────────────
 * Cara tambah video: tambahkan objek baru ke array videoData.
 * youtubeId diambil dari URL: youtube.com/watch?v=XXXXXXXXXXX
 */
const videoData = [
  { id: 1, youtubeId: "dQw4w9WgXcQ", title: "Cara Perawatan dan Pemeliharaan Selang Penyalur", desc: "Panduan langkah demi langkah pemeliharaan selang penyalur pada unit mobil pompa." },
  { id: 2, youtubeId: "dQw4w9WgXcQ", title: "Inspeksi Harian Unit Mobil Pompa Sebelum Operasional", desc: "Checklist inspeksi harian agar unit pompa selalu siap digunakan saat bertugas." },
  { id: 3, youtubeId: "dQw4w9WgXcQ", title: "Teknik Dasar Pengoperasian Unit Mobil Pompa", desc: "Dasar-dasar pengoperasian unit mobil pompa sesuai Buku Diklat Operator." },
  { id: 4, youtubeId: "dQw4w9WgXcQ", title: "Keselamatan Kerja saat Pemeliharaan Perlengkapan", desc: "Prosedur keselamatan kerja (APD) yang wajib diterapkan selama pemeliharaan." },
  { id: 5, youtubeId: "dQw4w9WgXcQ", title: "Mengenal Bagian-Bagian Unit Mobil Pompa", desc: "Pengenalan komponen utama unit mobil pompa untuk personel baru." },
  { id: 6, youtubeId: "dQw4w9WgXcQ", title: "Prosedur Pelaporan Temuan Kerusakan Perlengkapan", desc: "Cara melaporkan temuan kendala atau kerusakan melalui Link Terpadu." }
];

function thumbUrl(id) { return `https://img.youtube.com/vi/${id}/hqdefault.jpg`; }

function renderVideoGrid() {
  const grid = document.getElementById("videoGrid");
  if (!grid) return;
  grid.innerHTML = "";
  videoData.forEach(v => {
    const card = document.createElement("article");
    card.className = "video-card";
    card.innerHTML = `
      <div class="video-card__thumb">
        <img src="${thumbUrl(v.youtubeId)}" alt="${v.title}" loading="lazy"
          onerror="this.src='https://placehold.co/640x360/0b1d3a/e5a83e?text=Edu+Damkar'"/>
        <div class="video-card__play"><div class="video-card__play-btn">▶</div></div>
      </div>
      <div class="video-card__body">
        <p class="video-card__title">${v.title}</p>
        <p class="video-card__source">▶ Edu Damkar · YouTube</p>
      </div>`;
    card.addEventListener("click", () => openVideoModal(v));
    grid.appendChild(card);
  });
}

function openVideoModal(v) {
  const overlay = document.getElementById("videoModalOverlay");
  if (!overlay) return;
  document.getElementById("videoModalTitleTxt").textContent = v.title;
  document.getElementById("videoModalDesc").textContent = v.desc;
  document.getElementById("youtubeFrame").src = `https://www.youtube.com/embed/${v.youtubeId}?autoplay=1&rel=0`;
  overlay.classList.add("is-open");
  document.body.style.overflow = "hidden";
}

function closeVideoModal() {
  const overlay = document.getElementById("videoModalOverlay");
  if (!overlay) return;
  overlay.classList.remove("is-open");
  document.getElementById("youtubeFrame").src = "";
  document.body.style.overflow = "";
}

document.addEventListener("DOMContentLoaded", () => {
  renderVideoGrid();
  const closeBtn = document.getElementById("videoModalClose");
  const overlay = document.getElementById("videoModalOverlay");
  if (closeBtn) closeBtn.addEventListener("click", closeVideoModal);
  if (overlay) overlay.addEventListener("click", e => { if (e.target === overlay) closeVideoModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closeVideoModal(); });
});
