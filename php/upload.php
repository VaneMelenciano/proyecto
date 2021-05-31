
<?php
$directorio = '../archivos/';
$subir_archivo = $directorio.basename($_FILES['archivo']['name']);
move_uploaded_file($_FILES['archivo']['tmp_name'], $subir_archivo);
header("Location: ../alta-constancias.html");
/*if (move_uploaded_file($_FILES['archivo']['tmp_name'], $subir_archivo)) {
      echo "El archivo es válido y se cargó correctamente";
    } else {
       echo "La subida ha fallado";
    }*/

    //<form enctype="multipart/form-data" action="php/upload.php" method="POST">-->
?>