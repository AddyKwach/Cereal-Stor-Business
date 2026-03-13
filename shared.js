// ============================================================
// GrainHaus – shared.js
// Nav, mobile menu, cart, toast, fade-in
// ============================================================

// ---- NAV SCROLL ----
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  });
}

// ---- MOBILE MENU ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMob  = document.getElementById('closeMob');
const mobOverlay = document.getElementById('mobOverlay');

function openMob() {
  mobileMenu?.classList.add('open');
  mobOverlay?.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeMobFn() {
  mobileMenu?.classList.remove('open');
  mobOverlay?.classList.remove('active');
  document.body.style.overflow = '';
}
hamburger?.addEventListener('click', openMob);
closeMob?.addEventListener('click', closeMobFn);
mobOverlay?.addEventListener('click', closeMobFn);
document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', closeMobFn));

// ---- SMOOTH ANCHORS ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 82, behavior: 'smooth' }); }
  });
});

// ---- CART (localStorage) ----
const CART_KEY = 'grainhaus_cart';

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; }
}
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}
function addToCart(item) {
  const cart = getCart();
  const existing = cart.find(i => i.id === item.id && i.unit === item.unit);
  if (existing) { existing.qty += item.qty; } else { cart.push(item); }
  saveCart(cart);
  showToast(`✓ ${item.name} added to cart`);
}
function removeFromCart(id, unit) {
  saveCart(getCart().filter(i => !(i.id === id && i.unit === unit)));
}
function updateCartCount(delta) {
  // used externally
}
function updateCartBadge() {
  const cart = getCart();
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.querySelectorAll('.cart-badge').forEach(b => {
    b.textContent = total;
    b.style.display = total > 0 ? 'flex' : 'none';
  });
}
updateCartBadge();

// ---- TOAST ----
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; document.body.appendChild(t); }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2800);
}

// ---- FADE-IN OBSERVER ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 70);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ---- ACTIVE NAV LINK ----
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__links a, .mobile-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href && currentPage.includes(href.replace('.html', ''))) link.classList.add('active');
});

// Expose globally
window.GH = { getCart, saveCart, addToCart, removeFromCart, showToast };
