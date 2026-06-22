// =========================================================
//  catalogo.js — Catálogo + integración con carrito
// =========================================================

const WHATSAPP_NUMBER = '';

const PRODUCTS = [
  {
    id: 'aurum-noir', name: 'Aurum Noir', cat: 'unisex', price: 135000,
    shape: 'hex', liquid: '#C9A227', cap: '#7A5E12',
    short: 'Una noche envuelta en resina y oro: intensa y magnética.',
    long: 'Aurum Noir abre con un chispazo de pimienta rosa sobre bergamota, pero su alma vive en el oud y el incienso del corazón. El fondo de ámbar y vainilla deja una estela cálida que se queda horas después de la última aplicación.',
    salida: 'Bergamota, pimienta rosa', corazon: 'Oud, incienso', fondo: 'Ámbar, vainilla, almizcle'
  },
  {
    id: 'brisa-marina', name: 'Brisa Marina', cat: 'el', price: 98000,
    shape: 'cylinder', liquid: '#7FA0B4', cap: '#4F6B79',
    short: 'Aire de costa al mediodía: cítrico, salado y limpio.',
    long: 'Pensada para días de sol, Brisa Marina combina mandarina y sal marina con un corazón herbal de romero. El cedro del fondo le da estructura sin pesar, ideal para uso diario.',
    salida: 'Mandarina, sal marina', corazon: 'Romero, geranio', fondo: 'Cedro, almizcle blanco'
  },
  {
    id: 'flor-azahar', name: 'Flor de Azahar', cat: 'ella', price: 112000,
    shape: 'curvy', liquid: '#F1D9C8', cap: '#D98B73',
    short: 'Un jardín mediterráneo al amanecer, ligero y luminoso.',
    long: 'Flor de Azahar captura ese instante en que abren los naranjos: cítrico, blanco y fresco. El jazmín y el loto del corazón suavizan la entrada, y el almizcle del fondo prolonga su delicadeza durante el día.',
    salida: 'Azahar, bergamota', corazon: 'Jazmín, flor de loto', fondo: 'Almizcle blanco, cedro'
  },
  {
    id: 'cafe-cuero', name: 'Café & Cuero', cat: 'el', price: 145000,
    shape: 'square', liquid: '#6B4A2E', cap: '#3E2A18',
    short: 'Carácter y sobremesa: cuero curtido sobre café recién molido.',
    long: 'Café & Cuero es para noches largas. El cardamomo despierta el café tostado de salida; tabaco y cuero dominan el corazón con una densidad casi táctil, y el fondo de haba tonka redondea el conjunto con dulzura discreta.',
    salida: 'Café tostado, cardamomo', corazon: 'Tabaco, cuero', fondo: 'Haba tonka, sándalo'
  },
  {
    id: 'jardin-secreto', name: 'Jardín Secreto', cat: 'ella', price: 118000,
    shape: 'curvy', liquid: '#D9667A', cap: '#9C3F52',
    short: 'Frutal y floral, como un jardín que solo tú conoces.',
    long: 'La frambuesa y la pera abren paso a un corazón de peonía y rosa recién cortada. Jardín Secreto cierra con sándalo suave, una firma romántica pensada para el día y la noche.',
    salida: 'Frambuesa, pera', corazon: 'Peonía, rosa', fondo: 'Sándalo, almizcle'
  },
  {
    id: 'roble-ahumado', name: 'Roble Ahumado', cat: 'unisex', price: 128000,
    shape: 'hex', liquid: '#5C6B5A', cap: '#33402F',
    short: 'Bosque después de la lluvia, con un toque de humo lejano.',
    long: 'Roble Ahumado es terroso y envolvente. El vetiver y el incienso del corazón se apoyan en una salida especiada de pimienta negra, mientras el roble y el cuero del fondo construyen una estela profunda y duradera.',
    salida: 'Pimienta negra, enebro', corazon: 'Vetiver, incienso', fondo: 'Roble, cuero'
  },
  {
    id: 'dulce-caramelo', name: 'Dulce Caramelo', cat: 'ella', price: 105000,
    shape: 'curvy', liquid: '#C98A3D', cap: '#7A4E1E',
    short: 'Gourmand y cálida, como un postre recién hecho.',
    long: 'Dulce Caramelo abre con mandarina y praliné tostado. El corazón de caramelo y flor de cerezo es el centro de esta fragancia golosa, que el haba tonka y la vainilla del fondo vuelven aún más reconfortante.',
    salida: 'Mandarina, praliné', corazon: 'Caramelo, flor de cerezo', fondo: 'Haba tonka, vainilla'
  },
  {
    id: 'acero-frio', name: 'Acero Frío', cat: 'el', price: 99000,
    shape: 'cylinder', liquid: '#A9C4D1', cap: '#5C7785',
    short: 'Frescura deportiva con un fondo limpio y mineral.',
    long: 'Acero Frío está pensado para el gimnasio y la oficina por igual. La menta y la bergamota de salida dan energía inmediata; lavanda y pimienta sostienen el corazón, y el almizcle gris cierra con un rastro discreto.',
    salida: 'Menta, bergamota', corazon: 'Lavanda, pimienta', fondo: 'Almizcle gris, vetiver'
  },
  {
    id: 'seda-blanca', name: 'Seda Blanca', cat: 'ella', price: 108000,
    shape: 'cylinder', liquid: '#F4EEE1', cap: '#BFA98A',
    short: 'Piel limpia recién salida de la ducha, sin estridencias.',
    long: 'Seda Blanca busca la sensación de tela recién lavada. El jazmín blanco y el algodón del corazón son suaves casi hasta lo abstracto, y el fondo de almizcle e iris deja una piel perfumada sin saturar.',
    salida: 'Pera, bergamota', corazon: 'Jazmín blanco, algodón', fondo: 'Almizcle, madera de iris'
  },
  {
    id: 'tierra-salvaje', name: 'Tierra Salvaje', cat: 'unisex', price: 132000,
    shape: 'square', liquid: '#7A8B4F', cap: '#4A4023',
    short: 'Especiada y terrosa, para quien no le teme a un perfume con carácter.',
    long: 'Tierra Salvaje arranca con cardamomo y pimienta rosa antes de revelar un corazón de pachulí intenso. El cuero y el vetiver del fondo firman una fragancia con personalidad, perfecta para quienes buscan algo distinto.',
    salida: 'Cardamomo, pimienta rosa', corazon: 'Pachulí, geranio', fondo: 'Cuero, vetiver'
  }
];

// ----------------------------------------------------------
// Utilidades de carrito (localStorage compartido con compras.html)
// ----------------------------------------------------------
const CART_KEY = 'pdd_carrito';

function cartLoad() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}

function cartSave(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

function cartAdd(productId) {
  const items = cartLoad();
  const existing = items.find(i => i.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    const p = PRODUCTS.find(p => p.id === productId);
    items.push({ id: p.id, name: p.name, price: p.price, qty: 1 });
  }
  cartSave(items);
  updateBadge();
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

// Icono bolsa SVG para el botón de compra
function bagIcon() {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>`;
}

// ----------------------------------------------------------
// Estado del catálogo
// ----------------------------------------------------------
const CAT_LABEL = { ella: 'Para ella', el: 'Para él', unisex: 'Unisex' };

const state = {
  search: '',
  filter: 'todas',
  onlyFav: false,
  favorites: new Set(),
  open: new Set()
};

const grid = document.getElementById('grid');
const resultLine = document.getElementById('resultLine');

function fmtPrice(n) {
  return '$' + n.toLocaleString('es-CO') + ' COP';
}

const BODY_SHAPES = {
  hex: (liquid, cap) =>
    `<polygon points="60,32 88,44 98,72 98,138 88,160 60,170 32,160 22,138 22,72 32,44"
      fill="${liquid}" stroke="${cap}" stroke-width="1.6" opacity=".94"/>`,
  cylinder: (liquid, cap) =>
    `<rect x="38" y="32" width="44" height="134" rx="22"
      fill="${liquid}" stroke="${cap}" stroke-width="1.6" opacity=".94"/>`,
  curvy: (liquid, cap) =>
    `<path d="M34,34 C20,55 20,85 38,100 C20,118 20,148 36,166 L84,166
      C100,148 100,118 82,100 C100,85 100,55 86,34 Z"
      fill="${liquid}" stroke="${cap}" stroke-width="1.6" opacity=".94"/>`,
  square: (liquid, cap) =>
    `<rect x="26" y="30" width="68" height="138" rx="10"
      fill="${liquid}" stroke="${cap}" stroke-width="1.6" opacity=".94"/>`
};

function bottleArt(p) {
  const body = BODY_SHAPES[p.shape](p.liquid, p.cap);
  return `<svg viewBox="0 0 120 180" role="img" aria-label="Frasco de ${p.name}">
    ${body}
    <ellipse cx="44" cy="72" rx="6" ry="28" fill="#ffffff" opacity=".14"/>
    <rect x="48" y="0" width="24" height="16" rx="3" fill="${p.cap}"/>
    <rect x="52" y="10" width="16" height="8" fill="${p.cap}" opacity=".7"/>
  </svg>`;
}

function heartIcon(filled) {
  return `<svg viewBox="0 0 24 24" fill="${filled ? 'currentColor' : 'none'}"
    stroke="currentColor" stroke-width="2">
    <path d="M12 21s-7-4.4-9.5-9C.7 8.4 2.4 4.5 6 4c2-.3 3.7.7 6 3
             2.3-2.3 4-3.3 6-3 3.6.5 5.3 4.4 3.5 8-2.5 4.6-9.5 9-9.5 9z"/>
  </svg>`;
}

function buildWhatsApp(p) {
  const msg = encodeURIComponent(`Hola, me interesa la loción "${p.name}" (${fmtPrice(p.price)}). ¿Me das más información?`);
  return WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`
    : `https://wa.me/?text=${msg}`;
}

// ----------------------------------------------------------
// Feedback visual al agregar al carrito
// ----------------------------------------------------------
function showAddedFeedback(btn) {
  btn.classList.add('cat-btn-added');
  btn.textContent = '¡Agregado!';
  setTimeout(() => {
    btn.classList.remove('cat-btn-added');
    btn.innerHTML = bagIcon() + ' Agregar';
  }, 1400);
}

// ----------------------------------------------------------
// Filtrado
// ----------------------------------------------------------
function matches(p) {
  const q = state.search.trim().toLowerCase();
  const inSearch = !q ||
    [p.name, p.short, p.long, p.salida, p.corazon, p.fondo]
      .join(' ').toLowerCase().includes(q);
  const inFilter = state.filter === 'todas' || p.cat === state.filter;
  const inFav = !state.onlyFav || state.favorites.has(p.id);
  return inSearch && inFilter && inFav;
}

// ----------------------------------------------------------
// Render
// ----------------------------------------------------------
function render() {
  grid.innerHTML = '';
  const visible = PRODUCTS.filter(matches);

  resultLine.textContent = `Mostrando ${visible.length} de ${PRODUCTS.length} fragancias`;

  if (visible.length === 0) {
    grid.innerHTML = `
      <div class="cat-empty-state">
        <strong>Ninguna fragancia coincide</strong>
        Prueba con otra búsqueda o quita algún filtro.
      </div>`;
    return;
  }

  visible.forEach(p => {
    const isFav = state.favorites.has(p.id);
    const isOpen = state.open.has(p.id);
    const card = document.createElement('article');
    card.className = 'cat-card';

    card.innerHTML = `
      <div class="cat-card-art"
        style="background: radial-gradient(circle at 35% 28%, ${p.liquid}22, transparent 70%), #1a1410;">
        ${bottleArt(p)}
        <span class="cat-tag ${p.cat}">${CAT_LABEL[p.cat]}</span>
        <button class="cat-fav-btn" aria-pressed="${isFav}"
          aria-label="Guardar ${p.name} en favoritos" data-fav="${p.id}">
          ${heartIcon(isFav)}
        </button>
      </div>

      <div class="cat-card-body">
        <h3>${p.name}</h3>
        <p class="cat-short-desc">${p.short}</p>
        <div class="cat-card-foot">
          <span class="cat-price">${fmtPrice(p.price)}</span>
          <div class="cat-foot-actions">
            <button class="cat-add-btn" data-add="${p.id}" aria-label="Agregar ${p.name} al carrito">
              ${bagIcon()} Agregar
            </button>
            <button class="cat-expand-btn" aria-expanded="${isOpen}"
              aria-controls="details-${p.id}" data-toggle="${p.id}">
              Pirámide
              <svg viewBox="0 0 12 8" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 1l5 5 5-5"/>
              </svg>
            </button>
          </div>
        </div>

        <div class="cat-details" id="details-${p.id}" data-open="${isOpen}">
          <div class="cat-details-inner">
            <div class="cat-details-content">
              <div class="cat-pyramid">
                <div class="cat-pyr-row salida">
                  <span class="cat-pyr-label">Salida</span>
                  <div>
                    <div class="cat-pyr-bar"><i></i></div>
                    <span class="cat-pyr-notes">${p.salida}</span>
                  </div>
                </div>
                <div class="cat-pyr-row corazon">
                  <span class="cat-pyr-label">Corazón</span>
                  <div>
                    <div class="cat-pyr-bar"><i></i></div>
                    <span class="cat-pyr-notes">${p.corazon}</span>
                  </div>
                </div>
                <div class="cat-pyr-row fondo">
                  <span class="cat-pyr-label">Fondo</span>
                  <div>
                    <div class="cat-pyr-bar"><i></i></div>
                    <span class="cat-pyr-notes">${p.fondo}</span>
                  </div>
                </div>
              </div>
              <p class="cat-long-desc">${p.long}</p>
              <div class="cat-detail-actions">
                <button class="cat-add-btn cat-add-btn--full" data-add="${p.id}" aria-label="Agregar ${p.name} al carrito">
                  ${bagIcon()} Agregar al carrito
                </button>
                <a class="cat-order-btn" href="${buildWhatsApp(p)}" target="_blank" rel="noopener">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22
                      l5.27-1.38a9.9 9.9 0 0 0 4.77 1.22h.01c5.46 0 9.91-4.45 9.91-9.91
                      C21.96 6.45 17.5 2 12.04 2zm5.8 14.07c-.24.68-1.4 1.3-1.93 1.38
                      -.5.08-1.12.11-1.81-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.8-4.17
                      -4.94-4.36-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41
                      .27-.29.59-.36.78-.36.2 0 .39 0 .56.01.18.01.42-.07.65.5
                      .24.58.81 2 .88 2.15.07.15.12.32.02.51-.1.2-.15.32-.3.49
                      -.15.17-.31.39-.45.52-.15.15-.3.31-.13.6.17.29.76 1.25 1.63 2.02
                      1.12 1 2.06 1.31 2.35 1.46.29.15.46.13.63-.08.17-.2.72-.84.91-1.13
                      .19-.29.39-.24.65-.14.27.1 1.69.8 1.98.94.29.15.48.22.55.34
                      .07.12.07.71-.17 1.39z"/>
                  </svg>
                  Pedir por WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

// ----------------------------------------------------------
// Eventos
// ----------------------------------------------------------
document.getElementById('search').addEventListener('input', e => {
  state.search = e.target.value;
  render();
});

document.getElementById('pills').addEventListener('click', e => {
  const btn = e.target.closest('.cat-pill');
  if (!btn) return;
  state.filter = btn.dataset.filter;
  document.querySelectorAll('.cat-pill').forEach(b =>
    b.setAttribute('aria-pressed', b === btn)
  );
  render();
});

document.getElementById('favToggle').addEventListener('click', e => {
  state.onlyFav = !state.onlyFav;
  e.currentTarget.setAttribute('aria-pressed', state.onlyFav);
  render();
});

grid.addEventListener('click', e => {
  // Favorito
  const favBtn = e.target.closest('[data-fav]');
  if (favBtn) {
    const id = favBtn.dataset.fav;
    state.favorites.has(id) ? state.favorites.delete(id) : state.favorites.add(id);
    document.getElementById('favCount').textContent = state.favorites.size;
    render();
    return;
  }

  // Expandir pirámide
  const toggleBtn = e.target.closest('[data-toggle]');
  if (toggleBtn) {
    const id = toggleBtn.dataset.toggle;
    state.open.has(id) ? state.open.delete(id) : state.open.add(id);
    render();
    return;
  }

  // Agregar al carrito
  const addBtn = e.target.closest('[data-add]');
  if (addBtn) {
    cartAdd(addBtn.dataset.add);
    showAddedFeedback(addBtn);
  }
});

// ----------------------------------------------------------
// Arranque
// ----------------------------------------------------------
updateBadge();
render();
