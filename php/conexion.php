<?php
    $servidor = "localhost";
    $usuario  = "root";
    $clave    = "";
    $basedatos     = "electivas1";

    $conexion = mysqli_connect($servidor, $usuario, $clave, $basedatos);
  
    mysqli_set_charset($conexion, "utf8");
?>