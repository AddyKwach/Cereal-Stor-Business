// ============================================================
// GrainHaus – nav-footer.js
// Injects shared nav + footer + whatsapp into every page
// ============================================================

const NAV_HTML = `
<header class="nav" id="nav">
  <div class="nav__inner">
    <a href="../index.html" class="nav__logo">
      <span class="nav__logo-icon">◈</span>
      <span class="nav__logo-text">GrainHaus</span>
    </a>
    <nav class="nav__links">
      <a href="../index.html">Home</a>
      <a href="shop.html">Shop</a>
      <a href="wholesale.html">Wholesale</a>
      <a href="about.html">About</a>
      <a href="contact.html">Contact</a>
    </nav>
    <div class="nav__actions">
      <a href="cart.html" class="nav__cart" aria-label="Cart">
        🛒
        <span class="cart-badge" style="display:none">0</span>
      </a>
      <a href="shop.html" class="btn btn--amber btn--sm">Order Now</a>
    </div>
    <button class="nav__hamburger" id="hamburger" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>

<div class="mob-overlay" id="mobOverlay"></div>
<div class="mobile-menu" id="mobileMenu">
  <button class="mobile-menu__close" id="closeMob">✕</button>
  <a href="../index.html" class="mobile-link">Home</a>
  <a href="shop.html" class="mobile-link">Shop</a>
  <a href="wholesale.html" class="mobile-link">Wholesale</a>
  <a href="about.html" class="mobile-link">About</a>
  <a href="contact.html" class="mobile-link">Contact</a>
  <a href="cart.html" class="mobile-link">🛒 Cart</a>
  <div class="mobile-menu__foot">Nairobi's Grain Specialists</div>
</div>
`;

const FOOTER_HTML = `
<footer class="footer">
  <div class="container footer__inner">
    <div class="footer__brand">
      <a href="../index.html" class="nav__logo" style="color:var(--cream)">
        <span class="nav__logo-icon">◈</span>
        <span class="nav__logo-text">GrainHaus</span>
      </a>
      <p>Nairobi's premier cereal specialist — quality grains, pulses &amp; cereals, wholesale &amp; retail.</p>
      <div class="footer__socials">
        <a href="#" aria-label="WhatsApp">📱</a>
        <a href="#" aria-label="Facebook">📘</a>
        <a href="#" aria-label="Instagram">📸</a>
        <a href="#" aria-label="TikTok">📹</a>
      </div>
    </div>
    <div class="footer__col">
      <h4>Quick Links</h4>
      <a href="shop.html">Shop Cereals</a>
      <a href="wholesale.html">Wholesale</a>
      <a href="about.html">About Us</a>
      <a href="contact.html">Contact</a>
    </div>
    <div class="footer__col">
      <h4>Products</h4>
      <a href="shop.html">Grains</a>
      <a href="shop.html">Pulses &amp; Legumes</a>
      <a href="shop.html">Flours &amp; Meals</a>
      <a href="wholesale.html">Bulk Orders</a>
    </div>
    <div class="footer__col">
      <h4>Contact</h4>
      <span>📍 Wakulima Market, Nairobi</span>
      <a href="tel:+254700000000">📞 +254 700 000 000</a>
      <a href="mailto:hello@grainhaus.co.ke">✉️ hello@grainhaus.co.ke</a>
      <span>🕐 Mon–Sat 7am–7pm</span>
    </div>
  </div>
  <div class="footer__bottom">
    <p>© 2025 GrainHaus Nairobi. All rights reserved.</p>
    <p>Proudly Kenyan 🇰🇪</p>
  </div>
</footer>

<a href="https://wa.me/254700000000?text=Hi%20GrainHaus!" class="wa-float" target="_blank" rel="noopener">
  <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  <span>WhatsApp Us</span>
</a>
`;

// Inject into page
document.body.insertAdjacentHTML('afterbegin', NAV_HTML);
document.body.insertAdjacentHTML('beforeend', FOOTER_HTML);
