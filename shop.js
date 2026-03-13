// ============================================================
// GrainHaus – shop.js
// ============================================================

const PRODUCTS = [
  // Grains
  { id:'maize',    name:'Whole Maize',          cat:'grains',  icon:'🌽', desc:'Premium-grade, clean and dry whole maize. Ideal for milling, cooking, and animal feed.',           price:80,  bagPrice:3500 },
  { id:'rice',     name:'Pishori Rice',          cat:'grains',  icon:'🌾', desc:'Fragrant Kenyan Pishori rice — aromatic and fluffy. A household favourite.',                       price:160, bagPrice:7200 },
  { id:'sorghum',  name:'Sorghum',               cat:'grains',  icon:'🌿', desc:'Drought-resistant, nutrient-dense sorghum grain. Perfect for porridge, flour, and brewing.',       price:75,  bagPrice:3300 },
  { id:'millet',   name:'Finger Millet',         cat:'grains',  icon:'🌾', desc:'High-calcium, iron-rich finger millet — traditional Kenyan staple for uji and ugali.',            price:90,  bagPrice:4000 },
  { id:'wheat',    name:'Whole Wheat',            cat:'grains',  icon:'🌾', desc:'Clean whole wheat grains. Excellent for home milling, porridge, and fermented beverages.',        price:70,  bagPrice:3100 },
  { id:'soya',     name:'Soya Beans',             cat:'grains',  icon:'🟤', desc:'High-protein soya beans — ideal for tofu, soya milk, animal feeds, and cooking.',               price:100, bagPrice:4500 },
  { id:'oats',     name:'Rolled Oats',            cat:'grains',  icon:'🥣', desc:'Wholesome, quick-cooking rolled oats. Rich in fibre and perfect for breakfast porridge.',       price:120, bagPrice:5400 },
  { id:'cassava',  name:'Cassava Chips',          cat:'grains',  icon:'🫚', desc:'Dried cassava chips — a versatile starch source used for flour and animal feeds.',               price:55,  bagPrice:2400 },
  // Pulses
  { id:'beans',    name:'Red Kidney Beans',       cat:'pulses',  icon:'🫘', desc:'Plump, protein-packed kidney beans. A Kenyan kitchen staple for families and restaurants.',     price:140, bagPrice:6300 },
  { id:'ndengu',   name:'Green Grams (Ndengu)',   cat:'pulses',  icon:'🟢', desc:'Fast-cooking, versatile green grams — a must-have in every Kenyan household.',                  price:130, bagPrice:5800 },
  { id:'lentils',  name:'Yellow Lentils',         cat:'pulses',  icon:'🟡', desc:'Mild, nutritious lentils excellent for soups, stews, and dhal preparations.',                   price:125, bagPrice:5500 },
  { id:'chickpea', name:'Chickpeas',              cat:'pulses',  icon:'🫛', desc:'Premium whole chickpeas — great for hummus, curries, and protein-rich roasted snacks.',         price:135, bagPrice:6000 },
  { id:'blackeye', name:'Black-Eyed Peas',        cat:'pulses',  icon:'⚪', desc:'Earthy, filling black-eyed peas. Excellent in stews, salads, and traditional dishes.',          price:115, bagPrice:5100 },
  // Flours
  { id:'unga',     name:'Maize Flour (Unga)',     cat:'flours',  icon:'🧂', desc:'Finely milled maize flour — the backbone of Kenyan ugali. Available in bulk quantities.',       price:65,  bagPrice:2800 },
  { id:'milletfl', name:'Millet Flour',           cat:'flours',  icon:'🌰', desc:'Stone-ground finger millet flour — naturally gluten-free and rich in calcium and iron.',       price:95,  bagPrice:4200 },
  { id:'wheatfl',  name:'Wheat Flour (All-Purpose)',cat:'flours',icon:'🌾', desc:'Premium all-purpose wheat flour. Perfect for bakeries, chapati, mandazi, and baking.',          price:72,  bagPrice:3200 },
  // Seeds
  { id:'sunfl',    name:'Sunflower Seeds',        cat:'seeds',   icon:'🌻', desc:'Clean, oil-rich sunflower seeds. Great for cooking oil extraction, snacking, and bird feed.',    price:110, bagPrice:4900 },
  { id:'sesame',   name:'Sesame Seeds',           cat:'seeds',   icon:'🤍', desc:'Premium white sesame seeds — used in tahini, baking, and Swahili cooking.',                    price:180, bagPrice:8000 },
];

let currentProduct = null;
let currentQty = 1;
let currentUnit = 'kg';

function formatKSh(n) { return 'KSh ' + n.toLocaleString('en-KE'); }

function renderProducts(list) {
  const grid = document.getElementById('shopGrid');
  const count = document.getElementById('shopCount');
  if (!grid) return;

  count.textContent = `Showing ${list.length} product${list.length !== 1 ? 's' : ''}`;

  if (list.length === 0) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:60px 20px;color:var(--mid-grey)"><div style="font-size:3rem;margin-bottom:16px">🌾</div><h3>No products found</h3><p>Try adjusting your filters</p></div>`;
    return;
  }

  grid.innerHTML = list.map(p => `
    <div class="product-card fade-up" data-cat="${p.cat}" data-price="${p.price}">
      <div class="product-card__img">${p.icon}</div>
      <div class="product-card__body">
        <h3 class="product-card__name">${p.name}</h3>
        <p class="product-card__desc">${p.desc}</p>
        <div class="product-card__meta">
          <div>
            <div class="product-card__price">${formatKSh(p.price)} <span>/ kg</span></div>
            <div style="font-size:0.75rem;color:var(--amber);font-weight:600">${formatKSh(p.bagPrice)} <span style="font-weight:400;color:var(--mid-grey)">/ 50kg bag</span></div>
          </div>
          <button class="product-card__add" data-id="${p.id}" aria-label="Add to cart">+</button>
        </div>
      </div>
    </div>
  `).join('');

  // Re-observe new cards
  document.querySelectorAll('.fade-up').forEach(el => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if(e.isIntersecting){ setTimeout(()=>e.target.classList.add('visible'),60); obs.unobserve(e.target); } });
    }, { threshold: 0.06 });
    obs.observe(el);
  });

  // Add-to-cart buttons → open modal
  grid.querySelectorAll('.product-card__add').forEach(btn => {
    btn.addEventListener('click', () => openQtyModal(btn.dataset.id));
  });
}

function getFiltered() {
  const cat = document.querySelector('.cat-btn.active')?.dataset.cat || 'all';
  const maxPrice = parseInt(document.getElementById('priceRange')?.value || 500);
  return PRODUCTS.filter(p => {
    if (cat !== 'all' && p.cat !== cat) return false;
    if (p.price > maxPrice) return false;
    return true;
  });
}

function sortList(list) {
  const sort = document.getElementById('sortSelect')?.value || 'default';
  const l = [...list];
  if (sort === 'price-asc') l.sort((a,b) => a.price - b.price);
  if (sort === 'price-desc') l.sort((a,b) => b.price - a.price);
  if (sort === 'name') l.sort((a,b) => a.name.localeCompare(b.name));
  return l;
}

function refresh() { renderProducts(sortList(getFiltered())); }

// Bind filters
document.querySelectorAll('.cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    refresh();
  });
});
document.getElementById('priceRange')?.addEventListener('input', function() {
  document.getElementById('priceVal').textContent = this.value;
  refresh();
});
document.getElementById('sortSelect')?.addEventListener('change', refresh);

// ---- QUANTITY MODAL ----
function openQtyModal(id) {
  currentProduct = PRODUCTS.find(p => p.id === id);
  if (!currentProduct) return;
  currentQty = 1;
  currentUnit = 'kg';
  document.getElementById('qtyModalName').textContent = currentProduct.name;
  document.getElementById('qtyUnit').value = 'kg';
  document.getElementById('qtyInput').value = 1;
  updateTotal();
  document.getElementById('qtyModal').classList.add('active');
  document.getElementById('modalOverlay').classList.add('active');
}
function closeQtyModal() {
  document.getElementById('qtyModal').classList.remove('active');
  document.getElementById('modalOverlay').classList.remove('active');
}
function updateTotal() {
  if (!currentProduct) return;
  const price = currentUnit === 'bag' ? currentProduct.bagPrice : currentProduct.price;
  document.getElementById('qtyModalPrice').textContent = `${formatKSh(currentProduct.price)}/kg · ${formatKSh(currentProduct.bagPrice)}/50kg bag`;
  document.getElementById('qtyTotal').textContent = formatKSh(price * currentQty);
}
document.getElementById('closeQty')?.addEventListener('click', closeQtyModal);
document.getElementById('modalOverlay')?.addEventListener('click', closeQtyModal);
document.getElementById('qtyMinus')?.addEventListener('click', () => { if (currentQty > 1) { currentQty--; document.getElementById('qtyInput').value = currentQty; updateTotal(); } });
document.getElementById('qtyPlus')?.addEventListener('click', () => { currentQty++; document.getElementById('qtyInput').value = currentQty; updateTotal(); });
document.getElementById('qtyInput')?.addEventListener('input', function() { currentQty = Math.max(1, parseInt(this.value)||1); this.value = currentQty; updateTotal(); });
document.getElementById('qtyUnit')?.addEventListener('change', function() { currentUnit = this.value; updateTotal(); });
document.getElementById('confirmAdd')?.addEventListener('click', () => {
  if (!currentProduct) return;
  const price = currentUnit === 'bag' ? currentProduct.bagPrice : currentProduct.price;
  GH.addToCart({ id: currentProduct.id, name: currentProduct.name, price, unit: currentUnit, qty: currentQty, icon: currentProduct.icon });
  closeQtyModal();
});

// Initial render
refresh();
