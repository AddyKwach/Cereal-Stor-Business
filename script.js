// ============================================================
// GrainHaus – script.js
// ============================================================

// --- NAV SCROLL SHADOW ---
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

// --- MOBILE MENU ---
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const closeMenu = document.getElementById('closeMenu');
const mobileOverlay = document.getElementById('mobileOverlay');
const mobileLinks = document.querySelectorAll('.mobile-link');

function openMenu() {
  mobileMenu.classList.add('open');
  mobileOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeMenuFn() {
  mobileMenu.classList.remove('open');
  mobileOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', openMenu);
closeMenu.addEventListener('click', closeMenuFn);
mobileOverlay.addEventListener('click', closeMenuFn);
mobileLinks.forEach(link => link.addEventListener('click', closeMenuFn));

// --- PRODUCT FILTER ---
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    productCards.forEach(card => {
      if (filter === 'all' || card.dataset.cat === filter) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

// --- FADE-IN ON SCROLL ---
const fadeEls = document.querySelectorAll('.section, .product-card, .wcard, .why-item, .tcard, .contact__item');
fadeEls.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

fadeEls.forEach(el => observer.observe(el));

// --- CONTACT FORM ---
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = contactForm.querySelector('button[type="submit"]');
  btn.textContent = '✓ Message Sent!';
  btn.style.background = '#1a7a3c';
  btn.style.borderColor = '#1a7a3c';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.style.background = '';
    btn.style.borderColor = '';
    btn.disabled = false;
    contactForm.reset();
  }, 3500);
});

// --- SMOOTH ANCHOR NAV ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  });
});
