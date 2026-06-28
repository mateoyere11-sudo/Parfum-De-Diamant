// ── TEMA ──
const temaGuardado = localStorage.getItem('tema');
if (temaGuardado === 'oscuro') document.body.classList.add('modo-oscuro');

function Cambio() {
    const oscuro = document.body.classList.toggle('modo-oscuro');
    localStorage.setItem('tema', oscuro ? 'oscuro' : 'claro');
}

// ── SESIÓN ──
const usuario = localStorage.getItem('usuario');
const rol = localStorage.getItem('rol');

if (!usuario || rol !== 'admin') {
    window.location.href = '../Html/index.html';
}

if (usuario) {
    const iniciales = usuario.substring(0, 2).toUpperCase();
    document.getElementById('avatar-iniciales').textContent = iniciales;
    document.getElementById('sidebar-nombre').textContent = usuario;
    document.getElementById('titulo-nombre').textContent = usuario;
}

function cerrarSesion() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('rol');
    window.location.href = '../Html/index.html';
}

// ── NAVEGACIÓN ──
const secciones = ['dashboard', 'productos', 'usuarios', 'pedidos'];

function mostrarSeccion(id, link) {
    secciones.forEach(s => {
        document.getElementById('sec-' + s).style.display = s === id ? 'block' : 'none';
    });
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    if (link) link.classList.add('active');
}

// ── MODAL ──
function abrirModal() {
    document.getElementById('modal-producto').classList.add('open');
}

function cerrarModal() {
    document.getElementById('modal-producto').classList.remove('open');
}

async function guardarProducto() {
    const nombre = document.getElementById('input-nombre').value.trim();
    const precio = document.getElementById('input-precio').value.trim();
    const cat = document.getElementById('input-cat').value;
    const short = document.getElementById('input-short').value.trim();
    const long = document.getElementById('input-long').value.trim();
    const salida = document.getElementById('input-salida').value.trim();
    const corazon = document.getElementById('input-corazon').value.trim();
    const fondo = document.getElementById('input-fondo').value.trim();
    const inputImagen = document.getElementById('input-imagen');
    const imagen = (inputImagen && inputImagen.files) ? inputImagen.files[0] : null;
    const stock = document.getElementById('input-stock').value.trim();
    const estado = document.getElementById('input-estado').value;

    if (!nombre || !precio) {
        mostrarToast('Nombre y precio son obligatorios.');
        return;
    }

    if (!nombre || !precio || stock === '') {
        mostrarToast('Nombre, precio y stock son obligatorios.');
        return;
    }

    const body = new FormData();
    body.append('accion', 'insertar');
    body.append('name', nombre);
    body.append('price', precio);
    body.append('cat', cat);
    body.append('short_desc', short);
    body.append('long_desc', long);
    body.append('salida', salida);
    body.append('corazon', corazon);
    body.append('fondo', fondo);
    if (imagen) body.append('imagen', imagen);
    body.append('stock', stock);
    body.append('estado', estado);

    try {
        const res = await fetch('../php/productos_admin.php', { method: 'POST', body });
        const data = await res.json();

        if (data.error) {
            mostrarToast('Error: ' + data.error);
        } else {
            mostrarToast('¡Producto guardado!');
            cerrarModal();
            cargarProductosAdmin(); // refresca la tabla del admin
        }
    } catch (e) {
        console.error("Error del fetch:", e);
        mostrarToast('No se pudo conectar con el servidor.');
    }
}

async function eliminarProducto(id, fila) {
    const body = new FormData();
    body.append('accion', 'eliminar');
    body.append('id', id);

    try {
        const res = await fetch('../php/productos_admin.php', { method: 'POST', body });
        const data = await res.json();
        if (data.error) {
            mostrarToast('Error: ' + data.error);
        } else {
            fila.remove();
            mostrarToast('Producto eliminado.');
        }
    } catch (e) {
        mostrarToast('Error de conexión.');
    }
}

async function cargarProductosAdmin() {
    try {
        const res = await fetch('../php/get_productos.php');
        const data = await res.json();
        const tbody = document.getElementById('tabla-productos');
        tbody.innerHTML = '';

        data.forEach(p => {
            const fila = document.createElement('tr');
            const clasePill = p.estado === 'activo' ? 'pill-green' : 'pill-red';
            const textoEstado = p.estado === 'activo' ? 'Activo' : 'Inactivo';
            fila.innerHTML = `
                <td>
                    <div class="prod-cell">
                        <div class="prod-thumb">
                            ${p.imagen
                    ? `<img src="../imagenes/productos/${p.imagen}"
                                        style="width:100%;height:100%;object-fit:cover;border-radius:4px">`
                    : '<i class="fi fi-rr-flower"></i>'}
                        </div>
                        <div>
                            <div class="prod-name">${p.name}</div>
                            <div class="prod-sub">${p.cat}</div>
                        </div>
                    </div>
                </td>
                <td>$${parseInt(p.price).toLocaleString('es-CO')}</td>
                <td>${p.stock ?? 0} u.</td>
                <td><span class="pill ${clasePill}">${textoEstado}</span></td>
                <td>
                    <button class="action-icon" title="Eliminar"
                        onclick="eliminarProducto('${p.id}', this.closest('tr'))">
                        <i class="fi fi-rr-trash"></i>
                    </button>
                </td>`;
            tbody.appendChild(fila);
        });
    } catch (e) {
        console.error('Error cargando productos admin:', e);
    }
}

// Cargar Usuarios

async function cargarUsuariosAdmin() {
    try {
        const res = await fetch('../php/get_usuarios.php');
        const data = await res.json();
        
        const tbody = document.getElementById('tabla-usuarios');
        tbody.innerHTML = '';

        data.forEach(u => {
            const fila = document.createElement('tr');
            
            const palabras = u.nombre.trim().split(" ");
            let iniciales = palabras[0] ? palabras[0].charAt(0).toUpperCase() : "U";
            if (palabras.length > 1 && palabras[1]) {
                iniciales += palabras[1].charAt(0).toUpperCase();
            } else {
                iniciales += u.nombre.length > 1 ? u.nombre.charAt(1).toUpperCase() : "";
            }

            const claseRol = u.rol.toLowerCase() === 'admin' ? 'pill-amber' : 'pill-dark';
            
            const claseEstado = 'pill-green'; 
            const textoEstado = 'Activo';

            const correoSimulado = `${u.nombre.toLowerCase().replace(/\s+/g, '')}@email.com`;

            fila.innerHTML = `
                <td>
                    <div class="prod-cell">
                        <div class="avatar-circle" style="width:34px;height:34px;font-size:13px">
                            ${iniciales}
                        </div>
                        <div>
                            <div class="prod-name">${u.nombre}</div>
                            <div class="prod-sub">${correoSimulado}</div>
                        </div>
                    </div>
                </td>
                <td><span class="pill ${claseRol}">${u.rol}</span></td>
                <td><span class="pill ${claseEstado}">${textoEstado}</span></td>
            `;
            tbody.appendChild(fila);
        });
    } catch (e) {
        console.error('Error cargando usuarios:', e);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById('tabla-usuarios')) {
        cargarUsuariosAdmin();
    }
});

// --Guardar los pedidos

function abrirModalPedido() { document.getElementById('modal-pedido').style.display = 'flex'; }
function cerrarModalPedido() { document.getElementById('modal-pedido').style.clear = ''; document.getElementById('modal-pedido').style.display = 'none'; }
function cerrarModalDetalle() { document.getElementById('modal-detalle').style.display = 'none'; }

async function guardarPedido() {
    const cliente = document.getElementById('pedido-cliente').value.trim();
    const producto = document.getElementById('pedido-producto').value.trim();
    const total = document.getElementById('pedido-total').value.trim();
    const estado = document.getElementById('pedido-estado').value;

    if (!cliente || !producto || !total) {
        alert('Todos los campos con * son obligatorios.');
        return;
    }

    const body = new FormData();
    body.append('accion', 'insertar_pedido');
    body.append('cliente', cliente);
    body.append('producto', producto);
    body.append('total', total);
    body.append('estado', estado);

    try {
        const res = await fetch('../php/pedidos_admin.php', { method: 'POST', body });
        const data = await res.json();

        if (data.error) {
            alert('Error: ' + data.error);
        } else {
            alert('¡Pedido agregado con éxito!');
            cerrarModalPedido();
            cargarPedidosAdmin();
        }
    } catch (e) {
        console.error(e);
        alert('Error de conexión.');
    }
}

function verDetallePedido(pedidoString) {
    const p = JSON.parse(decodeURIComponent(pedidoString));

    const contenedor = document.getElementById('detalle-contenido');
    // Plantilla de pedidos
    contenedor.innerHTML = `
        <p><strong>Número de Pedido:</strong> <span style="color:#D4AF72">#${p.id.toString().padStart(4, '0')}</span></p>
        <p><strong>Cliente:</strong> ${p.cliente}</p>
        <p><strong>Fragancia Solicitada:</strong> ${p.producto}</p>
        <p><strong>Monto Total:</strong> $${parseInt(p.total).toLocaleString('es-CO')}</p>
        <p><strong>Fecha/Hora:</strong> ${p.fecha ?? 'No registrada'}</p>
        <p><strong>Estado Actual:</strong> <span class="pill pill-${obtenerClaseEstado(p.estado)}">${p.estado}</span></p>
    `;

    document.getElementById('modal-detalle').style.display = 'flex';
}


function obtenerClaseEstado(estado) {
    switch (estado.toLowerCase()) {
        case 'entregado': return 'green';
        case 'en camino': return 'amber';
        case 'pendiente': return 'dark';  
        case 'cancelado': return 'red';
        default: return 'dark';
    }
}

async function cargarPedidosAdmin() {
    try {
        const res = await fetch('../php/get_pedidos.php');
        const data = await res.json();
        
        const tbody = document.getElementById('tabla-pedidos');
        tbody.innerHTML = '';

        data.forEach(p => {
            const fila = document.createElement('tr');
            
            const pedidoString = encodeURIComponent(JSON.stringify(p));
            
            let clasePill = 'pill-dark'; 
            if (p.estado === 'entregado') clasePill = 'pill-green';
            if (p.estado === 'en camino') clasePill = 'pill-amber';
            if (p.estado === 'cancelado') clasePill = 'pill-red';

            fila.innerHTML = `
                <td style="color:#8C7B6E">#${p.id.toString().padStart(4, '0')}</td>
                <td>${p.cliente}</td>
                <td>${p.producto}</td>
                <td>$${parseInt(p.total).toLocaleString('es-CO')}</td>
                <td><span class="pill ${clasePill}">${p.estado}</span></td>
                <td>
                    <button class="action-icon" title="Ver Detalle" onclick="verDetallePedido('${pedidoString}')">
                        <i class="fi fi-rr-eye"></i>
                    </button>
                    
                    <button class="action-icon" title="Eliminar" onclick="eliminarPedido('${p.id}', this.closest('tr'))">
                        <i class="fi fi-rr-trash"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(fila);
        });
    } catch (e) {
        console.error('Error cargando pedidos:', e);
    }
}

// Llama a la función automáticamente al cargar la página del admin
document.addEventListener('DOMContentLoaded', () => {
    cargarPedidosAdmin();
});

// Ver detalles
function verDetallePedido(pedidoString) {
    const p = JSON.parse(decodeURIComponent(pedidoString));
    const contenedor = document.getElementById('detalle-contenido');
    
    contenedor.innerHTML = `
        <p><strong>Orden:</strong> <span style="color:#8a6c2a">#${p.id.toString().padStart(4, '0')}</span></p>
        <p><strong>Cliente:</strong> ${p.cliente}</p>
        <p><strong>Fragancia:</strong> ${p.producto}</p>
        <p><strong>Total de Compra:</strong> $${parseInt(p.total).toLocaleString('es-CO')}</p>
        <p><strong>Estado Actual:</strong> ${p.estado.toUpperCase()}</p>
    `;
    
    document.getElementById('modal-detalle').style.display = 'flex';
}


async function eliminarPedido(id, filaElemento) {
    if (!confirm(`¿Estás seguro de que deseas eliminar permanentemente el pedido #${id}?`)) {
        return;
    }

    try {
        const res = await fetch('../php/pedidos_admin.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                accion: 'eliminar_pedido',
                id: id
            })
        });

        const data = await res.json();

        if (data.error) {
            alert('Error al eliminar: ' + data.error);
        } else {
            filaElemento.remove();
            alert('Pedido eliminado correctamente.');
        }
    } catch (e) {
        console.error("Error en fetch eliminar:", e);
        alert('No se pudo conectar con el servidor para eliminar el pedido.');
    }
}
// Llámala al cargar la página
cargarProductosAdmin();

// ── TOAST ──
function mostrarToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2800);
}

// ── BACK TO TOP ──
const btn_sb = document.getElementById('backtotop');
window.addEventListener('scroll', () => {
    btn_sb.classList.toggle('visible', window.scrollY > 100);
});
btn_sb.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

// ── CERRAR MODAL AL HACER CLICK FUERA ──
document.getElementById('modal-producto').addEventListener('click', function (e) {
    if (e.target === this) cerrarModal();
});