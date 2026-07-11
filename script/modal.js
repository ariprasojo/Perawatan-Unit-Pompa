/**
 * modal.js — Modal generik & reusable (namespace: LinkTerpadu)
 * ─────────────────────────────────────────────────────────
 * Dipakai bersama oleh unit-data.js (modal detail unit) dan
 * video-data.js (modal video), supaya logic buka/tutup modal
 * tidak ditulis ulang di setiap file.
 *
 * Fitur:
 * - Buka/tutup + kunci scroll body
 * - Tutup lewat tombol close, klik di luar modal, atau tombol Escape
 * - Aksesibilitas: focus trap (Tab tidak "bocor" ke halaman di
 *   belakang), dan fokus otomatis dikembalikan ke elemen pemicu
 *   (mis. kartu unit yang diklik) saat modal ditutup
 *
 * Cara pakai:
 *   const modal = LinkTerpadu.createModal({
 *     overlayId: "unitModalOverlay",
 *     closeId: "unitModalClose",
 *     onClose: () => { ... } // opsional
 *   });
 *   modal.open();
 *   modal.close();
 */
window.LinkTerpadu = window.LinkTerpadu || {};

(function (App) {
  "use strict";

  const FOCUSABLE_SELECTOR =
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

  App.createModal = function createModal({ overlayId, closeId, onClose }) {
    const overlay = document.getElementById(overlayId);
    if (!overlay) return null;

    const closeBtn = closeId ? document.getElementById(closeId) : null;
    let lastFocusedEl = null;

    function getFocusableEls() {
      return Array.from(overlay.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
        (el) => el.offsetParent !== null
      );
    }

    function trapFocus(e) {
      if (e.key !== "Tab") return;
      const focusables = getFocusableEls();
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    function onKeydown(e) {
      if (e.key === "Escape") close();
      else if (e.key === "Tab") trapFocus(e);
    }

    function open() {
      lastFocusedEl = document.activeElement;
      overlay.classList.add("is-open");
      overlay.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", onKeydown);

      // Pindahkan fokus ke dalam modal (elemen fokusable pertama,
      // atau overlay sendiri sebagai fallback lewat tabindex="-1")
      const focusables = getFocusableEls();
      (focusables[0] || overlay).focus({ preventScroll: true });
    }

    function close() {
      overlay.classList.remove("is-open");
      overlay.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeydown);

      if (typeof onClose === "function") onClose();

      if (lastFocusedEl && typeof lastFocusedEl.focus === "function") {
        lastFocusedEl.focus();
      }
      lastFocusedEl = null;
    }

    if (closeBtn) closeBtn.addEventListener("click", close);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) close();
    });

    return { open, close };
  };

})(window.LinkTerpadu);
