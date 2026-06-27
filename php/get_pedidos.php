<?php

$cone = mysqli_connect("localhost", "root", "", "parfum_de_diamant");
if (!$cone) {
    echo json_encode(["error" => "Error de conexión a la base de datos"]);
    exit;
}

$sql = "SELECT id, cliente, producto, total, estado FROM pedidos ORDER BY id DESC";
$resultado = mysqli_query($cone, $sql);

$pedidos = [];
while ($row = mysqli_fetch_assoc($resultado)) {
    $pedidos[] = $row;
}

echo json_encode($pedidos);
?>