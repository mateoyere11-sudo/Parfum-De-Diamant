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

// btn para subir arriba

const btn_sb = document.getElementById("backtotop");

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        btn_sb.classList.add('visible')
    } else {
        btn_sb.classList.remove('visible')
    }
});

btn_sb.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});