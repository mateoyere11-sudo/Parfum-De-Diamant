<?php
header('Content-Type: application/json');

$cone = mysqli_connect("localhost", "root", "", "parfum_de_diamant");
if (!$cone) {
    echo json_encode(["error" => "Error de conexion"]);
    exit;
}

$accion = $_POST['accion'] ?? '';

if (empty($accion)) {
    $input = json_decode(file_get_contents('php://input'), true);
    $accion = $input['accion'] ?? '';
}

// INSERTAR
if ($accion === 'insertar_pedido') {
    $cliente = mysqli_real_escape_string($cone, $_POST['cliente'] ?? '');
    $producto = mysqli_real_escape_string($cone, $_POST['producto'] ?? '');
    $total = intval($_POST['total'] ?? 0);
    $estado = mysqli_real_escape_string($cone, $_POST['estado'] ?? 'pendiente');

    $sql = "INSERT INTO pedidos (cliente, producto, total, estado) 
            VALUES ('$cliente', '$producto', '$total', '$estado')";

    if (mysqli_query($cone, $sql)) {
        echo json_encode(["mensaje" => "Pedido guardado con éxito"]);
    } else {
        echo json_encode(["error" => mysqli_error($cone)]);
    }
    exit;
}

if ($accion === 'eliminar_pedido') {
    $id = intval($input['id'] ?? 0);

    if ($id > 0) {
        $sql = "DELETE FROM pedidos WHERE id = $id";
        if (mysqli_query($cone, $sql)) {
            echo json_encode(["mensaje" => "Pedido eliminado con éxito"]);
        } else {
            echo json_encode(["error" => mysqli_error($cone)]);
        }
    } else {
        echo json_encode(["error" => "ID de pedido no válido"]);
    }
    exit;
}

echo json_encode(["error" => "Acción no válida"]);
?>