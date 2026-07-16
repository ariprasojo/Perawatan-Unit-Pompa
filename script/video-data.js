/**
 * video-data.js — Data Video Edukasi (Channel Edu Damkar)
 * ─────────────────────────────────────────────────────────
 * Cara tambah video: tambahkan objek baru ke array videoData.
 * youtubeId bisa diisi dengan ID polos (contoh: "vY3DpEboi68")
 * ATAU URL lengkap YouTube (contoh: "https://www.youtube.com/watch?v=vY3DpEboi68").
 * Keduanya akan otomatis dinormalisasi oleh extractYoutubeId().
 *
 * Membutuhkan: utils.js dan modal.js sudah di-load sebelum file ini.
 */
window.LinkTerpadu = window.LinkTerpadu || {};
(function (App) {
  "use strict";
  const escapeHtml = App.escapeHtml;
  const PLACEHOLDER_ID = "dQw4w9WgXcQ";

  const videoData = [
    { id: 1, youtubeId: "https://www.youtube.com/watch?v=vY3DpEboi68", title: "Perawatan Mobil Pompa Pasca Pelaksanaan Penyemprotan Disinfektan", desc: "Panduan langkah demi langkah Perawatan Mobil Pompa Pasca Pelaksanaan Penyemprotan Disinfektan" },
    { id: 2, youtubeId: "dQw4w9WgXcQ", title: "Inspeksi Harian Unit Mobil Pompa Sebelum Operasional", desc: "Checklist inspeksi harian agar unit pompa selalu siap digunakan saat bertugas." },
    { id: 3, youtubeId: "dQw4w9WgXcQ", title: "Teknik Dasar Pengoperasian Unit Mobil Pompa", desc: "Dasar-dasar pengoperasian unit mobil pompa sesuai Buku Diklat Operator." },
    { id: 4, youtubeId: "dQw4w9WgXcQ", title: "Keselamatan Kerja saat Pemeliharaan Perlengkapan", desc: "Prosedur keselamatan kerja (APD) yang wajib diterapkan selama pemeliharaan." },
    { id: 5, youtubeId: "dQw4w9WgXcQ", title: "Mengenal Bagian-Bagian Unit Mobil Pompa", desc: "Pengenalan komponen utama unit mobil pompa untuk personel baru." },
    { id: 6, youtubeId: "dQw4w9WgXcQ", title: "Prosedur Pelaporan Temuan Kerusakan Perlengkapan", desc: "Cara melaporkan temuan kendala atau kerusakan melalui Link Terpadu." },
  ];

  /**
   * Mengekstrak ID video YouTube (11 karakter) dari berbagai bentuk input:
   * - ID polos: "vY3DpEboi68"
   * - watch URL: "https://www.youtube.com/watch?v=vY3DpEboi68"
   * - short URL: "https://youtu.be/vY3DpEboi68"
   * - embed URL: "https://www.youtube.com/embed/vY3DpEboi68"
   * Kalau tidak cocok pola manapun, input dikembalikan apa adanya
   * (supaya warning placeholder di bawah tetap bisa mendeteksi kejanggalan).
   */
  function extractYoutubeId(input) {
    if (!input) return input;
    const trimmed = String(input).trim();

    // Sudah berupa ID polos (11 karakter valid, tanpa slash/titik/spasi)
    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed;

    const patterns = [
      /(?:v=|\/embed\/|\/v\/|\/shorts\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    ];
    for (const re of patterns) {
      const m = trimmed.match(re);
      if (m) return m[1];
    }

    console.warn(`[Link Terpadu] Gagal mengekstrak ID YouTube dari: "${trimmed}". Menggunakan nilai asli sebagai fallback.`);
    return trimmed;
  }

  // Normalisasi seluruh data sekali di awal, supaya field youtubeId
  // di objek yang dipakai selanjutnya selalu berupa ID polos yang valid.
  videoData.forEach((v) => {
    v.youtubeId = extractYoutubeId(v.youtubeId);
  });

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
  let ytPlayer = null;
  let ytApiReady = false;
  let ytApiLoading = false;
  const ytApiCallbacks = [];

  /**
   * Memuat YouTube IFrame Player API sekali saja (lazy-loaded saat
   * video pertama kali dibuka), supaya kita bisa mendeteksi error
   * resmi dari YouTube (video tidak ditemukan / embedding dimatikan /
   * video dihapus atau private) alih-alih membiarkan iframe kosong
   * tanpa keterangan apa pun ke pengguna.
   */
  function loadYoutubeApi(callback) {
    if (ytApiReady && window.YT && window.YT.Player) {
      callback();
      return;
    }
    ytApiCallbacks.push(callback);
    if (ytApiLoading) return;
    ytApiLoading = true;

    const previousCallback = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = function () {
      if (typeof previousCallback === "function") previousCallback();
      ytApiReady = true;
      ytApiCallbacks.splice(0).forEach((cb) => cb());
    };

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  }

  function showVideoError(show) {
    const player = document.getElementById("youtubePlayer");
    const fallback = document.getElementById("videoErrorFallback");
    if (player) player.style.visibility = show ? "hidden" : "visible";
    if (fallback) fallback.classList.toggle("is-visible", show);
  }

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

    const watchLink = document.getElementById("videoWatchLink");
    if (watchLink) watchLink.href = `https://www.youtube.com/watch?v=${v.youtubeId}`;

    showVideoError(false);
    videoModal.open();

    loadYoutubeApi(() => {
      // Kalau modal sudah ditutup sebelum API selesai dimuat (koneksi lambat), jangan lanjut.
      if (!document.getElementById("videoModalOverlay").classList.contains("is-open")) return;

      if (ytPlayer && typeof ytPlayer.loadVideoById === "function") {
        ytPlayer.loadVideoById(v.youtubeId);
        return;
      }

      ytPlayer = new YT.Player("youtubePlayer", {
        videoId: v.youtubeId,
        playerVars: { autoplay: 1, rel: 0 },
        events: {
          onError: function () {
            // Kode error YT: 2=ID tidak valid, 5=masalah HTML5 player,
            // 100=video tidak ditemukan/private/dihapus, 101/150=embedding dimatikan pemilik.
            showVideoError(true);
          },
        },
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderVideoGrid();
    if (document.getElementById("videoModalOverlay")) {
      videoModal = App.createModal({
        overlayId: "videoModalOverlay",
        closeId: "videoModalClose",
        onClose: () => {
          showVideoError(false);
          if (ytPlayer && typeof ytPlayer.stopVideo === "function") {
            ytPlayer.stopVideo();
          }
        },
      });
    }
  });
})(window.LinkTerpadu);
