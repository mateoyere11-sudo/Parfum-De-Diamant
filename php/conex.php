<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$cone = mysqli_connect("localhost", "root", "", "parfum_de_diamant");

if(!$cone){
    echo json_encode(["error" => "Error de conexión: " . mysqli_connect_error()]);
    exit;
}

$nombre = $_POST["nombre"] ?? '';
$contraInput = $_POST["contrasena"] ?? '';
$accion = $_POST["accion"] ?? 'registro';

if (empty($nombre) || empty($contraInput)) {
    echo json_encode(["error" => "Campos obligatorios vacíos"]);
    exit;
}

// ==========================================
// BLOQUE 1: PROCESO DE REGISTRO
// ==========================================
if ($accion === "registro") {
    $checkUser = "SELECT nombre FROM usuarios WHERE nombre = '$nombre'";
    $resCheck = mysqli_query($cone, $checkUser);
    
    if (mysqli_num_rows($resCheck) > 0) {
        echo json_encode(["error" => "El nombre de usuario ya está en uso"]);
        exit;
    }

    $contraHash = password_hash($contraInput, PASSWORD_DEFAULT);
    $sql = "INSERT INTO usuarios (nombre, contrasena) VALUES ('$nombre', '$contraHash')";

    if(mysqli_query($cone, $sql)){
        echo json_encode(["mensaje" => "Se registró exitosamente"]);
    } else {
        echo json_encode(["error" => "Error al registrar: " . mysqli_error($cone)]);
    }

} else if ($accion === "login") {

    $sql = "SELECT * FROM usuarios WHERE nombre = '$nombre'";
    $resultado = mysqli_query($cone, $sql);

    if ($resultado && mysqli_num_rows($resultado) > 0) {
        $usuario = mysqli_fetch_assoc($resultado);
        
        if (password_verify($contraInput, $usuario["contrasena"])) {
            echo json_encode([
               "mensaje" => "Inicio de sesión exitoso",
               "rol" => $usuario["rol"],
               "nombre" => $usuario["nombre"] 
            ]);
        } else {
            echo json_encode(["error" => "La contraseña es incorrecta"]);
        }
    } else {
        echo json_encode(["error" => "El usuario no existe"]);
    }
}

mysqli_close($cone);
?>