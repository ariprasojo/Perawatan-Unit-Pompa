(function () {
  "use strict";

  // ── Burger menu ──────────────────────────────────────
  const burgerBtn = document.getElementById("burgerBtn");
  const topNav = document.getElementById("topNav");

  if (burgerBtn && topNav) {
    burgerBtn.addEventListener("click", () => {
      const open = topNav.classList.toggle("is-open");
      burgerBtn.setAttribute("aria-expanded", open);
    });
    topNav.addEventListener("click", (e) => {
      if (e.target.closest(".nav__link")) {
        topNav.classList.remove("is-open");
        burgerBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ── Tahun otomatis di footer ─────────────────────────
  document.querySelectorAll(".js-year").forEach((el) => {
    el.textContent = new Date().getFullYear();
  });
})();
