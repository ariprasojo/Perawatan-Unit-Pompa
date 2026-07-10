// ── Burger menu ──────────────────────────────────────
const burgerBtn = document.getElementById('burgerBtn');
const topNav    = document.getElementById('topNav');

if (burgerBtn && topNav) {
  burgerBtn.addEventListener('click', () => {
    const open = topNav.classList.toggle('is-open');
    burgerBtn.setAttribute('aria-expanded', open);
  });
  document.querySelectorAll('.nav__link').forEach(l =>
    l.addEventListener('click', () => {
      topNav.classList.remove('is-open');
      burgerBtn.setAttribute('aria-expanded', 'false');
    })
  );
}

// ── Tahun otomatis di footer ─────────────────────────
document.querySelectorAll('.js-year').forEach(el => {
  el.textContent = new Date().getFullYear();
});
