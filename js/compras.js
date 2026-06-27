// =========================================================
//  compras.js  —  Lógica de la página de carrito
// =========================================================

const CART_KEY = 'pdd_carrito';
const WA_NUMBER = '';   // ej: '573001234567'

// Mismos datos de productos para regenerar el SVG del frasco
const PRODUCTS_DATA = {
    'aurum-noir': { liquid: '#C9A227', cap: '#7A5E12', shape: 'hex' },
    'brisa-marina': { liquid: '#7FA0B4', cap: '#4F6B79', shape: 'cylinder' },
    'flor-azahar': { liquid: '#F1D9C8', cap: '#D98B73', shape: 'curvy' },
    'cafe-cuero': { liquid: '#6B4A2E', cap: '#3E2A18', shape: 'square' },
    'jardin-secreto': { liquid: '#D9667A', cap: '#9C3F52', shape: 'curvy' },
    'roble-ahumado': { liquid: '#5C6B5A', cap: '#33402F', shape: 'hex' },
    'dulce-caramelo': { liquid: '#C98A3D', cap: '#7A4E1E', shape: 'curvy' },
    'acero-frio': { liquid: '#A9C4D1', cap: '#5C7785', shape: 'cylinder' },
    'seda-blanca': { liquid: '#F4EEE1', cap: '#BFA98A', shape: 'cylinder' },
    'tierra-salvaje': { liquid: '#7A8B4F', cap: '#4A4023', shape: 'square' }
};

const BODY_SHAPES = {
    hex: (l, c) =>
        `<polygon points="30,16 44,22 49,36 49,69 44,80 30,85 16,80 11,69 11,36 16,22"
      fill="${l}" stroke="${c}" stroke-width="1" opacity=".94"/>`,
    cylinder: (l, c) =>
        `<rect x="16" y="16" width="28" height="70" rx="14"
      fill="${l}" stroke="${c}" stroke-width="1" opacity=".94"/>`,
    curvy: (l, c) =>
        `<path d="M17,17 C10,27 10,43 19,50 C10,59 10,74 18,83 L42,83
      C50,74 50,59 41,50 C50,43 50,27 43,17 Z"
      fill="${l}" stroke="${c}" stroke-width="1" opacity=".94"/>`,
    square: (l, c) =>
        `<rect x="13" y="15" width="34" height="70" rx="5"
      fill="${l}" stroke="${c}" stroke-width="1" opacity=".94"/>`
};

function miniBottle(id) {
    const d = PRODUCTS_DATA[id];
    if (!d) return '';
    const body = BODY_SHAPES[d.shape](d.liquid, d.cap);
    return `<svg viewBox="0 0 60 100" xmlns="http://www.w3.org/2000/svg">
    ${body}
    <ellipse cx="22" cy="36" rx="3" ry="14" fill="#fff" opacity=".13"/>
    <rect x="24" y="0" width="12" height="8" rx="2" fill="${d.cap}"/>
  </svg>`;
}

function cartLoad() {
    try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
    catch { return []; }
}


function artOrImage(p) {
    if (p.imagen) {
        return `<img
            src="../imagenes/productos/${p.imagen}"
            alt="${p.name}"
            style="width:100%; height:100%; object-fit:cover; display:block;">`;
    }
    return bottleArt(p);
}

function cartSave(items) {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
}

function cartTotal() {
    return cartLoad().reduce((sum, i) => sum + i.qty, 0);
}

function updateBadge() {
    const badge = document.getElementById('cart-badge');
    if (!badge) return;
    const total = cartTotal();
    badge.textContent = total;
    badge.style.display = total > 0 ? 'flex' : 'none';
}

function fmtPrice(n) {
    return '$' + n.toLocaleString('es-CO') + ' COP';
}

// ----------------------------------------------------------
// Render de la página de compras
// ----------------------------------------------------------
function renderCompras() {
    const items = cartLoad();
    const lista = document.getElementById('comprasLista');
    const resumen = document.getElementById('comprasResumen');
    const vacia = document.getElementById('comprasVacia');
    const lineas = document.getElementById('resumenLineas');
    const totalEl = document.getElementById('resumenTotal');
    const waBtn = document.getElementById('comprasWaBtn');

    updateBadge();

    if (items.length === 0) {
        lista.innerHTML = '';
        resumen.style.display = 'none';
        vacia.style.display = 'block';
        return;
    }

    resumen.style.display = '';
    vacia.style.display = 'none';

    // --- Lista de ítems ---
    lista.innerHTML = items.map(item => `
    <div class="compras-item" data-id="${item.id}">
      <div class="compras-item-art">
        ${artOrImage(p)}
      </div>
      <div class="compras-item-info">
        <p class="compras-item-name">${item.name}</p>
        <span class="compras-item-price">${fmtPrice(item.price)} c/u</span>
      </div>
      <div class="compras-qty">
        <button class="qty-btn" data-action="dec" data-id="${item.id}" aria-label="Quitar uno">−</button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn" data-action="inc" data-id="${item.id}" aria-label="Agregar uno">+</button>
        <button class="qty-remove" data-action="del" data-id="${item.id}" aria-label="Eliminar ${item.name}">✕</button>
      </div>
    </div>
  `).join('');

    // --- Resumen lateral ---
    const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

    lineas.innerHTML = items.map(i =>
        `<div class="resumen-linea">
      <span>${i.name} ×${i.qty}</span>
      <span>${fmtPrice(i.price * i.qty)}</span>
    </div>`
    ).join('');

    totalEl.textContent = fmtPrice(subtotal);

    // --- Link de WhatsApp con resumen del pedido ---
    const detalle = items.map(i => `• ${i.name} ×${i.qty} = ${fmtPrice(i.price * i.qty)}`).join('\n');
    const msg = encodeURIComponent(
        `Hola, quiero hacer el siguiente pedido:\n\n${detalle}\n\n*Total: ${fmtPrice(subtotal)}*\n\n¿Cómo procedo?`
    );
    waBtn.href = WA_NUMBER
        ? `https://wa.me/${WA_NUMBER}?text=${msg}`
        : `https://wa.me/?text=${msg}`;
}

// ----------------------------------------------------------
// Eventos de cantidad / eliminar
// ----------------------------------------------------------
document.getElementById('comprasLista').addEventListener('click', e => {
    const btn = e.target.closest('[data-action]');
    if (!btn) return;

    const id = btn.dataset.id;
    const action = btn.dataset.action;
    const items = cartLoad();
    const idx = items.findIndex(i => i.id === id);
    if (idx === -1) return;

    if (action === 'inc') {
        items[idx].qty += 1;
    } else if (action === 'dec') {
        items[idx].qty -= 1;
        if (items[idx].qty <= 0) items.splice(idx, 1);
    } else if (action === 'del') {
        items.splice(idx, 1);
    }

    cartSave(items);
    renderCompras();
});

document.getElementById('comprasVaciarBtn').addEventListener('click', () => {
    if (!confirm('¿Vaciar toda la bolsa?')) return;
    cartSave([]);
    renderCompras();
});

// ----------------------------------------------------------
// Arranque
// ----------------------------------------------------------
renderCompras();