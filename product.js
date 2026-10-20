document.getElementById('year').textContent = new Date().getFullYear();
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.main-nav');
function closeMenu() { menuButton.setAttribute('aria-expanded', 'false'); menu.classList.remove('is-open'); }
menuButton.addEventListener('click', () => { const open = menuButton.getAttribute('aria-expanded') !== 'true'; menuButton.setAttribute('aria-expanded', String(open)); menu.classList.toggle('is-open', open); });
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') { closeMenu(); menuButton.focus(); } });
const galleryButtons = [...document.querySelectorAll('[data-panel]')];
const viewer = document.querySelector('.image-viewer');
const viewerImage = document.querySelector('.viewer-image');
const viewerCaption = document.getElementById('viewer-caption');
let activeImage = 0;
let opener;
function selectImage(index) {
  activeImage = (index + galleryButtons.length) % galleryButtons.length;
  galleryButtons.forEach((button, i) => {
    button.setAttribute('aria-pressed', String(i === activeImage));
    document.getElementById(button.dataset.panel).hidden = i !== activeImage;
  });
  const image = document.querySelector(`#${galleryButtons[activeImage].dataset.panel} img`);
  viewerImage.src = image.src;
  viewerImage.alt = image.alt;
  viewerCaption.textContent = `${activeImage + 1} / ${galleryButtons.length} · ${galleryButtons[activeImage].querySelector('span').textContent}`;
}
galleryButtons.forEach((button, index) => button.addEventListener('click', () => selectImage(index)));
document.querySelectorAll('.gallery-open').forEach((button, index) => button.addEventListener('click', () => {
  opener = button;
  selectImage(index);
  viewer.showModal();
  document.body.classList.add('viewer-open');
}));
document.querySelector('.viewer-close').addEventListener('click', () => viewer.close());
document.querySelector('.viewer-prev').addEventListener('click', () => selectImage(activeImage - 1));
document.querySelector('.viewer-next').addEventListener('click', () => selectImage(activeImage + 1));
viewer.addEventListener('close', () => {
  document.body.classList.remove('viewer-open');
  // Restore focus to the visible gallery image, including after changing slides.
  const current = document.querySelector(`#${galleryButtons[activeImage].dataset.panel} .gallery-open`);
  (current || opener)?.focus();
});
viewer.addEventListener('click', event => { if (event.target === viewer) viewer.close(); });
viewer.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault();
    selectImage(activeImage + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
const stage = document.querySelector('.viewer-stage');
let touchStart;
stage.addEventListener('touchstart', event => {
  touchStart = event.touches.length === 1 ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
}, { passive: true });
stage.addEventListener('touchend', event => {
  if (!touchStart) return;
  const dx = event.changedTouches[0].clientX - touchStart.x;
  const dy = event.changedTouches[0].clientY - touchStart.y;
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) selectImage(activeImage + (dx < 0 ? 1 : -1));
  touchStart = null;
}, { passive: true });
stage.addEventListener('touchcancel', () => { touchStart = null; });
let lastWheel = 0;
stage.addEventListener('wheel', event => {
  if (event.ctrlKey || Math.abs(event.deltaX) < 20 || Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
  event.preventDefault();
  if (Date.now() - lastWheel > 450) { selectImage(activeImage + (event.deltaX > 0 ? 1 : -1)); lastWheel = Date.now(); }
}, { passive: false });
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
