<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$cone = mysqli_connect("localhost", "root", "", "parfum_de_diamant");
if (!$cone) {
    echo json_encode(["error" => "Error de conexión"]);
    exit;
}

$accion = $_POST["accion"] ?? '';

// INSERTAR

if ($accion === "insertar"){
    $id = strtolower(trim(preg_replace('/\s+/', '-', $_POST["name"] ?? '')));
    $name = mysqli_real_escape_string($cone, $_POST["name"] ?? '');
    $cat = mysqli_real_escape_string($cone, $_POST["cat"] ?? 'unisex');
    $price = intval($_POST["price"] ?? 0);
    $shape =mysqli_real_escape_string($cone, $_POST["shape"] ?? 'cylinder');
    $liquid =mysqli_real_escape_string($cone, $_POST["liquid"] ?? '#D4AF72');
    $cap =mysqli_real_escape_string($cone, $_POST["cap"] ?? '#8a6c2a');
    $short =mysqli_real_escape_string($cone, $_POST["short_desc"] ?? '');
    $long =mysqli_real_escape_string($cone, $_POST["long_desc"] ?? '');
    $salida =mysqli_real_escape_string($cone, $_POST["salida"] ?? '');
    $corazon =mysqli_real_escape_string($cone, $_POST["corazon"] ?? '');
    $fondo =mysqli_real_escape_string($cone, $_POST["fondo"] ?? '');
    $stock = intval($_POST["stock"] ?? 0);
    $estado = mysqli_real_escape_string($cone, $_POST["estado"] ?? 'activo');



    $nombreImagen = '';
    if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === 0 ){
        $carpeta ='../imagenes/productos/';
        if (!is_dir($carpeta)) mkdir($carpeta, 0755, true);

        $ext = strtolower(pathinfo($_FILES['imagen']['name'], PATHINFO_EXTENSION));
        $permitidas = ['jpg', 'jpeg', 'png', 'webp'];

        if(!in_array($ext, $permitidas)) {
            echo json_encode(["error" =>  "Solo se permkiten jpg, png o webp"]);
            exit;
        }

        $nombreImagen = $id . '.' . $ext;
        move_uploaded_file($_FILES['imagen']['tmp_name'], $carpeta . $nombreImagen);

        $sql = "INSERT INTO productos
            (id, name, cat, price, shape, liquid, cap, short_desc, long_desc, salida, corazon, fondo, imagen, stock, estado)
            VALUES
            ('$id', '$name', '$cat', '$price', '$shape', '$liquid', '$cap',
            '$short', '$long', '$salida', '$corazon', '$fondo', '$nombreImagen', '$stock', '$estado')";
        
        if (mysqli_query($cone, $sql)) {
            echo json_encode(["mensaje" => "Producto agrgado", "id" => $id]);
        } else {
            echo json_encode(["error" => mysqli_error($cone)]);
        }
    }
}

// ELIMINAR

else if ($accion === "eliminar") {
    $id = mysqli_real_escape_string($cone, $_POST["id"] ?? '');
    if (mysqli_query($cone, "UPDATE productos SET activo=0 WHERE id='$id'")) {
        echo json_encode(["mensaje" => "Producto eliminado"]);
    } else {
        echo json_encode(["error" => mysqli_error($cone)]);
    }
}

// EDITAR

else if ($accion === "editar") {
    $id    = mysqli_real_escape_string($cone, $_POST["id"]    ?? '');
    $name  = mysqli_real_escape_string($cone, $_POST["name"]  ?? '');
    $price = intval($_POST["price"] ?? 0);
    $cat   = mysqli_real_escape_string($cone, $_POST["cat"]   ?? 'unisex');
    $short = mysqli_real_escape_string($cone, $_POST["short_desc"] ?? '');

    if (mysqli_query($cone,
        "UPDATE productos SET name='$name', price=$price, cat='$cat',
         short_desc='$short' WHERE id='$id'")) {
        echo json_encode(["mensaje" => "Producto actualizado"]);
    } else {
        echo json_encode(["error" => mysqli_error($cone)]);
    }

}

else {
    echo json_encode(["error" => "Accion no válida"]);
}

mysqli_close($cone);
?>