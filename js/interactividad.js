const temaGuardado = localStorage.getItem('tema');
if (temaGuardado === 'oscuro') {
    document.body.classList.add('modo-oscuro');
}

function Cambio() {
    const body = document.body;
    const modo_oscuro = body.classList.toggle("modo-oscuro");

    if (modo_oscuro) {
        localStorage.setItem('tema', 'oscuro');
    } else {
        localStorage.setItem('tema', 'claro')
    }
}

const observ = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.2 });

document.querySelectorAll('.descripcion_principal .ds_izq, .descripcion_principal .ds_der').forEach(el => observ.observe(el));


// btn para subir arriba
const btn_sb = document.getElementById("backtotop");

if (btn_sb) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            btn_sb.classList.add('visible');
        } else {
            btn_sb.classList.remove('visible');
        }
    });

    btn_sb.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

function cerrarSesion() {
    localStorage.removeItem("usuario");
    localStorage.removeItem("rol");
    window.location.href = "../Html/index.html";
}

const paginasProtegidas = ["catalogo.html", "nosotros.html", "compras.html", "Admin.html"];
const paginaActual = window.location.pathname.split("/").pop();

if (paginasProtegidas.includes(paginaActual)) {
    const usuario = localStorage.getItem("usuario");
    if (!usuario) {
        window.location.href = "../Html/index.html";
    }
}