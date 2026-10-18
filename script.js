document.getElementById('year').textContent = new Date().getFullYear();
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.main-nav');
function closeMenu() { menuButton.setAttribute('aria-expanded', 'false'); menu.classList.remove('is-open'); }
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; menuButton.setAttribute('aria-expanded', String(open)); menu.classList.toggle('is-open', open); });
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') { closeMenu(); menuButton.focus(); } });
document.querySelectorAll('[data-product]').forEach(link => link.addEventListener('click', () => { document.getElementById('product-interest').value = link.dataset.product; }));
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const reveals = document.querySelectorAll('.reveal');
let observer;
function configureMotion() {
  observer?.disconnect();
  document.body.classList.toggle('motion-enabled', !reducedMotion.matches && 'IntersectionObserver' in window);
  if (!reducedMotion.matches && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } }); }, { threshold: 0.08 });
    reveals.forEach(element => observer.observe(element));
  }
  updateScroll();
}
const progress = document.querySelector('.scroll-progress');
const syringe = document.querySelector('.syringe');
const hero = document.querySelector('.hero');
const approach = document.querySelector('.approach');
const mark = document.querySelector('.standard-mark');
let ticking = false;
function updateScroll() {
  const distance = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0})`;
  if (!reducedMotion.matches) {
    const heroOffset = Math.max(0, Math.min(window.scrollY, hero.offsetHeight));
    syringe.style.transform = `translateY(${heroOffset * 0.12}px) rotate(${-heroOffset * 0.018}deg)`;
    const position = approach.getBoundingClientRect();
    mark.style.setProperty('--mark-rotation', `${(window.innerHeight - position.top) * 0.08}deg`);
  } else { syringe.style.transform = ''; mark.style.removeProperty('--mark-rotation'); }
  ticking = false;
}
function requestUpdate() { if (!ticking) { requestAnimationFrame(updateScroll); ticking = true; } }
window.addEventListener('scroll', requestUpdate, { passive: true });
window.addEventListener('resize', requestUpdate);
reducedMotion.addEventListener('change', configureMotion);
configureMotion();
