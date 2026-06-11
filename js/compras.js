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
