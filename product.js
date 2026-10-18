document.getElementById('year').textContent = new Date().getFullYear();
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.main-nav');
function closeMenu() { menuButton.setAttribute('aria-expanded', 'false'); menu.classList.remove('is-open'); }
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; menuButton.setAttribute('aria-expanded', String(open)); menu.classList.toggle('is-open', open); });
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') { closeMenu(); menuButton.focus(); } });
const galleryButtons = document.querySelectorAll('[data-panel]');
galleryButtons.forEach(button => button.addEventListener('click', () => {
  galleryButtons.forEach(item => { const active = item === button; item.setAttribute('aria-pressed', String(active)); document.getElementById(item.dataset.panel).hidden = !active; });
}));
const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
let observer;
function configureMotion() {
  observer?.disconnect();
  document.body.classList.toggle('motion-enabled', !motion.matches && 'IntersectionObserver' in window);
  if (!motion.matches && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }), { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(item => observer.observe(item));
  }
}
motion.addEventListener('change', configureMotion);
configureMotion();
