// ============================================================
// GrainHaus – admin.js
// ============================================================

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'grainhaus';
const CATALOGUE_KEY = 'gh_catalogue';

// ---- PRODUCTS DEFAULT ----
const DEFAULT_PRODUCTS = [
  { id:'maize',    name:'Whole Maize',          cat:'grains',  icon:'🌽', price:80,  bagPrice:3500, retail:true, wholesale:true, inStock:true },
  { id:'rice',     name:'Pishori Rice',          cat:'grains',  icon:'🌾', price:160, bagPrice:7200, retail:true, wholesale:true, inStock:true },
  { id:'sorghum',  name:'Sorghum',               cat:'grains',  icon:'🌿', price:75,  bagPrice:3300, retail:true, wholesale:true, inStock:true },
  { id:'millet',   name:'Finger Millet',         cat:'grains',  icon:'🌾', price:90,  bagPrice:4000, retail:true, wholesale:true, inStock:true },
  { id:'wheat',    name:'Whole Wheat',            cat:'grains',  icon:'🌾', price:70,  bagPrice:3100, retail:true, wholesale:true, inStock:true },
  { id:'soya',     name:'Soya Beans',             cat:'grains',  icon:'🟤', price:100, bagPrice:4500, retail:true, wholesale:true, inStock:true },
  { id:'beans',    name:'Red Kidney Beans',       cat:'pulses',  icon:'🫘', price:140, bagPrice:6300, retail:true, wholesale:true, inStock:true },
  { id:'ndengu',   name:'Green Grams (Ndengu)',   cat:'pulses',  icon:'🟢', price:130, bagPrice:5800, retail:true, wholesale:true, inStock:true },
  { id:'lentils',  name:'Yellow Lentils',         cat:'pulses',  icon:'🟡', price:125, bagPrice:5500, retail:true, wholesale:true, inStock:true },
  { id:'chickpea', name:'Chickpeas',              cat:'pulses',  icon:'🫛', price:135, bagPrice:6000, retail:true, wholesale:true, inStock:true },
  { id:'unga',     name:'Maize Flour (Unga)',     cat:'flours',  icon:'🧂', price:65,  bagPrice:2800, retail:true, wholesale:true, inStock:true },
  { id:'milletfl', name:'Millet Flour',           cat:'flours',  icon:'🌰', price:95,  bagPrice:4200, retail:true, wholesale:true, inStock:true },
  { id:'wheatfl',  name:'Wheat Flour',            cat:'flours',  icon:'🌾', price:72,  bagPrice:3200, retail:true, wholesale:true, inStock:true },
  { id:'sunfl',    name:'Sunflower Seeds',        cat:'seeds',   icon:'🌻', price:110, bagPrice:4900, retail:true, wholesale:true, inStock:true },
  { id:'sesame',   name:'Sesame Seeds',           cat:'seeds',   icon:'🤍', price:180, bagPrice:8000, retail:true, wholesale:true, inStock:true },
];

function getCatalogue() {
  try { return JSON.parse(localStorage.getItem(CATALOGUE_KEY)) || DEFAULT_PRODUCTS; } catch { return DEFAULT_PRODUCTS; }
}
function saveCatalogue(c) { localStorage.setItem(CATALOGUE_KEY, JSON.stringify(c)); }

// ---- LOGIN ----
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const adminLogin = document.getElementById('adminLogin');
const adminDash = document.getElementById('adminDash');

loginForm?.addEventListener('submit', e => {
  e.preventDefault();
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value;
  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    adminLogin.style.display = 'none';
    adminDash.style.display = 'grid';
    initDash();
  } else {
    loginError.textContent = 'Incorrect username or password. Try admin / grainhaus';
  }
});

document.getElementById('adminLogout')?.addEventListener('click', () => {
  adminDash.style.display = 'none';
  adminLogin.style.display = 'flex';
  document.getElementById('loginPass').value = '';
});

// ---- PANEL NAVIGATION ----
document.querySelectorAll('.admin-nav__item').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.admin-nav__item').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const panel = btn.dataset.panel;
    document.querySelectorAll('.admin-panel').forEach(p => p.classList.remove('active'));
    document.getElementById('panel-' + panel)?.classList.add('active');
    if (panel === 'catalogue') renderCatalogue();
  });
});

// ---- INIT ----
function initDash() {
  const now = new Date();
  const el = document.getElementById('adminDate');
  if (el) el.textContent = now.toLocaleDateString('en-KE', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
}

// ---- CATALOGUE ----
let editingId = null;

function renderCatalogue() {
  const products = getCatalogue();
  const tbody = document.getElementById('catalogueTable');
  if (!tbody) return;
  tbody.innerHTML = products.map(p => `
    <tr>
      <td style="font-size:1.4rem">${p.icon}</td>
      <td><strong>${p.name}</strong></td>
      <td><span style="background:rgba(45,106,79,0.1);color:var(--green-mid);padding:2px 8px;border-radius:10px;font-size:0.72rem;font-weight:700;text-transform:uppercase">${p.cat}</span></td>
      <td>KSh ${p.price}</td>
      <td>KSh ${p.bagPrice.toLocaleString()}</td>
      <td>${p.inStock ? '<span style="color:var(--green-mid);font-weight:700">✓ In Stock</span>' : '<span style="color:#e74c3c;font-weight:700">✗ Out</span>'}</td>
      <td class="action-btns">
        <button class="btn-action approve" onclick="editProduct('${p.id}')">Edit</button>
        <button class="btn-action view" onclick="toggleStock('${p.id}')">${p.inStock ? 'Mark Out' : 'Mark In'}</button>
        <button class="btn-action" style="background:rgba(231,76,60,0.1);color:#e74c3c" onclick="deleteProduct('${p.id}')">Del</button>
      </td>
    </tr>
  `).join('');
}

function editProduct(id) {
  const products = getCatalogue();
  const p = products.find(x => x.id === id);
  if (!p) return;
  editingId = id;
  document.getElementById('formTitle').textContent = 'Edit Product';
  document.getElementById('pName').value = p.name;
  document.getElementById('pCat').value = p.cat;
  document.getElementById('pPrice').value = p.price;
  document.getElementById('pBagPrice').value = p.bagPrice;
  document.getElementById('pIcon').value = p.icon;
  document.getElementById('pRetail').checked = p.retail;
  document.getElementById('pWholesale').checked = p.wholesale;
  document.getElementById('pInStock').checked = p.inStock;
  document.getElementById('productFormWrap').style.display = 'block';
}

function toggleStock(id) {
  const products = getCatalogue();
  const p = products.find(x => x.id === id);
  if (p) { p.inStock = !p.inStock; saveCatalogue(products); renderCatalogue(); }
}

function deleteProduct(id) {
  if (!confirm('Delete this product?')) return;
  saveCatalogue(getCatalogue().filter(p => p.id !== id));
  renderCatalogue();
}

function updateStatus(btn, newStatus) {
  const td = btn.closest('tr').querySelector('.status-badge');
  if (!td) return;
  td.className = 'status-badge ' + newStatus;
  td.textContent = newStatus.charAt(0).toUpperCase() + newStatus.slice(1);
  btn.remove();
}

document.getElementById('addProductBtn')?.addEventListener('click', () => {
  editingId = null;
  document.getElementById('formTitle').textContent = 'Add New Product';
  document.getElementById('pName').value = '';
  document.getElementById('pCat').value = 'grains';
  document.getElementById('pPrice').value = '';
  document.getElementById('pBagPrice').value = '';
  document.getElementById('pIcon').value = '';
  document.getElementById('pRetail').checked = true;
  document.getElementById('pWholesale').checked = true;
  document.getElementById('pInStock').checked = true;
  document.getElementById('productFormWrap').style.display = 'block';
});

document.getElementById('cancelForm')?.addEventListener('click', () => {
  document.getElementById('productFormWrap').style.display = 'none';
  editingId = null;
});

document.getElementById('saveProduct')?.addEventListener('click', () => {
  const name = document.getElementById('pName').value.trim();
  const price = parseInt(document.getElementById('pPrice').value);
  const bagPrice = parseInt(document.getElementById('pBagPrice').value);
  if (!name || isNaN(price) || isNaN(bagPrice)) { alert('Please fill in all required fields.'); return; }

  const newProduct = {
    id: editingId || name.toLowerCase().replace(/\s+/g, '_') + '_' + Date.now(),
    name,
    cat: document.getElementById('pCat').value,
    icon: document.getElementById('pIcon').value || '🌾',
    price, bagPrice,
    retail: document.getElementById('pRetail').checked,
    wholesale: document.getElementById('pWholesale').checked,
    inStock: document.getElementById('pInStock').checked,
  };

  const products = getCatalogue();
  if (editingId) {
    const idx = products.findIndex(p => p.id === editingId);
    if (idx > -1) products[idx] = newProduct;
  } else {
    products.push(newProduct);
  }
  saveCatalogue(products);
  renderCatalogue();
  document.getElementById('productFormWrap').style.display = 'none';
  editingId = null;
});

// Expose
window.editProduct = editProduct;
window.toggleStock = toggleStock;
window.deleteProduct = deleteProduct;
window.updateStatus = updateStatus;
