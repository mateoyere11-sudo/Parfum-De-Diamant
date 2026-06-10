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
