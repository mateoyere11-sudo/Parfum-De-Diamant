function registrarUsuario() {
    let contra = document.getElementById("contrasena").value.trim();
    let nombre = document.getElementById("nombre").value;
    let contra_conf = document.getElementById("contrasena_conf").value;

    if (!nombre) {
        document.getElementById("alert1").textContent = "Debes de ingresar un nombre";
        document.getElementById("alert1").style = "color: red"
        return
    }

    if (!contra) {
        document.getElementById("alert2").textContent = "Ingresa una contraseña"
        document.getElementById("alert2").style = "color: red"
        return
    }

    if (contra.length < 10) {
        document.getElementById("alert2").textContent = "La contraseña debe tener como minmo 10 caracteres"
        document.getElementById("alert2").style = "color: red"
        return
    }

    if (contra !== contra_conf) {
        document.getElementById("alert3").textContent = "Las contraseñas deben de coincidir"
        document.getElementById("alert3").style = "color: red"

        return
    }

    fetch("../php/conex.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `nombre=${nombre}&contrasena=${contra}`
    })

        .then(res => res.text())
        .then(text => {
            try {
                const data = JSON.parse(text);
                if (data.mensaje) {
                    console.log("Exito!");
                    window.location.href = "../Html/Landing.html"
                } else {
                    console.error("Error: ", data.error);
                }
            } catch (err) {
                console.error("El PHP falló. Esto es lo que respondió exactamente:\n\n", text);
            }
        })
        .catch(err => console.error("Error en el Fetch: ", err));

}

const iniciar = document.getElementById("iniciar");
const registrar = document.getElementById("regis");
const contenedorRegistro = document.querySelector(".contenedor-login");
const contenedorLogin = document.querySelector(".contenedor-iniciar");


iniciar.addEventListener('click', () => {
    contenedorRegistro.classList.add("ocultar");
    contenedorLogin.classList.remove("ocultar");
});

registrar.addEventListener('click', () => {
    contenedorRegistro.classList.remove("ocultar");
    contenedorLogin.classList.add("ocultar");
});

function iniciarUsuario() {
    let nombre = document.getElementById("nombre_i").value.trim();
    let contra = document.getElementById("contrasena_i").value;

    document.getElementById("alert1_i").textContent = "";
    document.getElementById("alert2_i").textContent = "";

    if (!nombre) {
        document.getElementById("alert1_i").textContent = "Debes ingresar tu nombre";
        document.getElementById("alert1_i").style = "color: red";
        return;
    }

    if (!contra) {
        document.getElementById("alert2_i").textContent = "Debes ingresar tu contraseña";
        document.getElementById("alert2_i").style = "color: red";
        return;
    }

    fetch("../php/conex.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `nombre=${encodeURIComponent(nombre)}&contrasena=${encodeURIComponent(contra)}&accion=login`
    })
        .then(res => res.text())
        .then(text => {
            try {
                const data = JSON.parse(text);

                if (data.mensaje) {
                    localStorage.setItem("usuario", data.nombre);
                    localStorage.setItem("rol", data.rol);

                    if (data.rol === "admin") {
                        window.location.href = "../Html/Admin.html";
                    } else {
                        window.location.href = "../Html/Landing.html";
                    }
                }
            } catch (err) {
                console.error("El PHP falló:\n\n", text);
            }
        })
        .catch(err => console.error("Error en el Fetch: ", err));
}