// ============================================================
// GrainHaus – cart.js
// ============================================================

const DELIVERY_FEES = {
  pickup_store: 0,
  pickup_mtaani: 200,
  uber_boda: 350,
  g4s: 500,
  sendy: 400,
  wholesale_delivery: 0,
};
let selectedDelivery = 'pickup_store';

function formatKSh(n) { return 'KSh ' + n.toLocaleString('en-KE'); }

function renderCart() {
  const cart = GH.getCart();
  const container = document.getElementById('cartItems');
  const summaryLines = document.getElementById('summaryLines');

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty">
        <div>🌾</div>
        <h3>Your cart is empty</h3>
        <p>Add some fresh cereals and grains to get started.</p>
        <a href="shop.html" class="btn btn--green btn--sm">Browse Products</a>
      </div>`;
    summaryLines.innerHTML = '';
    updateTotals(cart);
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item__icon">${item.icon || '🌾'}</div>
      <div class="cart-item__info">
        <div class="cart-item__name">${item.name}</div>
        <div class="cart-item__unit">${formatKSh(item.price)} per ${item.unit}</div>
      </div>
      <div class="cart-item__stepper">
        <button onclick="changeQty('${item.id}','${item.unit}',-1)">−</button>
        <span>${item.qty}</span>
        <button onclick="changeQty('${item.id}','${item.unit}',1)">+</button>
      </div>
      <div class="cart-item__price">${formatKSh(item.price * item.qty)}</div>
      <button class="cart-item__remove" onclick="GH.removeFromCart('${item.id}','${item.unit}');renderCart();" title="Remove">✕</button>
    </div>
  `).join('');

  summaryLines.innerHTML = cart.map(item => `
    <div class="summary-item"><span>${item.name} ×${item.qty}</span><span>${formatKSh(item.price * item.qty)}</span></div>
  `).join('');

  updateTotals(cart);
}

function changeQty(id, unit, delta) {
  const cart = GH.getCart();
  const item = cart.find(i => i.id === id && i.unit === unit);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  GH.saveCart(cart);
  renderCart();
}

function updateTotals(cart) {
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const deliveryFee = DELIVERY_FEES[selectedDelivery] ?? 0;
  const total = subtotal + deliveryFee;
  const deliveryLabel = deliveryFee === 0 ? 'Free' : formatKSh(deliveryFee);
  document.getElementById('subtotalVal').textContent = formatKSh(subtotal);
  document.getElementById('deliveryVal').textContent = deliveryLabel;
  document.getElementById('totalVal').textContent = formatKSh(total);
}

// ---- DELIVERY SELECTION ----
document.querySelectorAll('.delivery-card').forEach(card => {
  card.addEventListener('click', () => {
    document.querySelectorAll('.delivery-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    const radio = card.querySelector('input[type="radio"]');
    if (radio) { radio.checked = true; selectedDelivery = radio.value; }
    // Show agent select for pickup_mtaani
    const agentSelect = document.getElementById('agentSelect');
    const addressGroup = document.getElementById('addressGroup');
    if (agentSelect) agentSelect.style.display = selectedDelivery === 'pickup_mtaani' ? 'block' : 'none';
    if (addressGroup) addressGroup.style.display = (selectedDelivery === 'pickup_store' || selectedDelivery === 'pickup_mtaani') ? 'none' : 'block';
    updateTotals(GH.getCart());
  });
});

// Set initial selected
document.querySelector('.delivery-card[data-method="pickup_store"]')?.classList.add('selected');
document.getElementById('addressGroup').style.display = 'none';

// Payment method toggle
document.querySelectorAll('input[name="pay"]').forEach(r => {
  r.addEventListener('change', () => {
    const mpesaInfo = document.getElementById('mpesaInfo');
    if (mpesaInfo) mpesaInfo.style.display = r.value === 'mpesa' ? 'block' : 'none';
  });
});

// Clear cart
document.getElementById('clearCart')?.addEventListener('click', () => {
  if (confirm('Clear all items from your cart?')) { GH.saveCart([]); renderCart(); }
});

// ---- CHECKOUT FORM ----
document.getElementById('checkoutForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const cart = GH.getCart();
  if (cart.length === 0) { GH.showToast('⚠️ Your cart is empty!'); return; }
  const ref = 'GH-' + Date.now().toString().slice(-6);
  document.getElementById('orderRef').textContent = ref;
  document.getElementById('orderModal').classList.add('active');
  document.getElementById('orderOverlay').classList.add('active');
  GH.saveCart([]);
});
document.getElementById('orderOverlay')?.addEventListener('click', () => {
  document.getElementById('orderModal').classList.remove('active');
  document.getElementById('orderOverlay').classList.remove('active');
});

renderCart();
