<?php

header("Acces-Control-Allow-Origin: *");
header("Content-Type: application/json");

$cone = mysqli_connect("localhost", "root", "", "parfum_de_diamant");
if (!$cone) {
    echo json_encode(["error" => "Error de conexion"]);
    exit;
}

$sql = "SELECT * FROM productos WHERE activo = 1 ORDER BY creado_en DESC";
$res = mysqli_query($cone, $sql);

$productos = [];

while ($row = mysqli_fetch_assoc($res)) {
    $productos[] = $row;
}

echo json_encode($productos);
mysqli_close($cone)
?>