<?php
header('Content-Type: application/json');

$cone = mysqli_connect("localhost", "root", "", "parfum_de_diamant");
if (!$cone) {
    echo json_encode(["error" => "Error de conexion"]);
    exit;
}

$sql = "SELECT nombre, rol FROM usuarios ORDER BY nombre ASC";
$resultado = mysqli_query($cone, $sql);

if (!$resultado) {
    echo json_encode(["error" => mysqli_error($cone)]);
    exit;
}

$usuarios = [];
while ($row = mysqli_fetch_assoc($resultado)) {
    $usuarios[] = $row;
}

echo json_encode($usuarios);
?>