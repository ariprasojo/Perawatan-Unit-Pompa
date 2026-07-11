/**
 * utils.js — Helper bersama (namespace: LinkTerpadu)
 * ─────────────────────────────────────────────────────────
 * Kumpulan fungsi util kecil yang dipakai lintas file, supaya
 * logic tidak duplikat di unit-data.js & video-data.js.
 *
 * Wajib di-load SEBELUM modal.js, unit-data.js, dan video-data.js.
 */
window.LinkTerpadu = window.LinkTerpadu || {};

(function (App) {
  "use strict";

  /**
   * Escape karakter HTML khusus (&, <, >, ", ') supaya string
   * aman disisipkan ke dalam template literal yang di-render
   * lewat innerHTML.
   *
   * PENTING: pakai fungsi ini untuk SEMUA data dinamis (nama unit,
   * judul video, deskripsi, dst) sebelum masuk ke innerHTML — jangan
   * pernah interpolasi data mentah langsung ke innerHTML.
   */
  const ESCAPE_MAP = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };

  App.escapeHtml = function escapeHtml(value) {
    if (value === null || value === undefined) return "";
    return String(value).replace(/[&<>"']/g, (ch) => ESCAPE_MAP[ch]);
  };

  /**
   * Bikin elemen bisa "diklik" lewat keyboard (Enter / Space),
   * sekalian dikasih role & tabindex kalau belum ada.
   * Dipakai untuk kartu unit & kartu video yang sebelumnya
   * hanya bisa diakses lewat mouse click.
   */
  App.makeActivatable = function makeActivatable(el, onActivate, ariaLabel) {
    el.setAttribute("role", "button");
    el.setAttribute("tabindex", "0");
    if (ariaLabel) el.setAttribute("aria-label", ariaLabel);
    el.addEventListener("click", onActivate);
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onActivate();
      }
    });
  };

})(window.LinkTerpadu);
