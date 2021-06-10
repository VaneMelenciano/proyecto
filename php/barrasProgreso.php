<?php
    include 'conexion.php';

    //no incluí switch por ahora
    leer($conexion);

    function leer($conexion){
        $respuesta = array();
        $Query = "SELECT a.id, e.alumno_id, e.nombre, e.creditos, e.creditos_acumulados FROM alumno a, electiva e";
        
        $resultado = mysqli_query($conexion, $Query);
        $num_resultados = mysqli_num_rows($resultado);
        if($num_resultados > 0){
            $respuesta["estado"] = 1;
            $respuesta["mensaje"] = "registros encontrados";

            $respuesta["electivas"] = array();

            while($row = mysqli_fetch_array($resultado)){
                $rowElectivas = array();
                $rowElectivas["id"] = $row["id"];
                $rowElectivas["alumno_id"] = $row["alumno_id"];
                $rowElectivas["nombre"] = $row["nombre"];
                $rowElectivas["creditos"] = $row["creditos"];
                $rowElectivas["creditos_acumulados"] = $row["creditos_acumulados"];
                
                array_push($respuesta["electivas"], $rowElectivas);
            }
        }else{
            $respuesta["estado"] = 0;
            $respuesta["mensaje"] = "No se encontraron registros";
        }
        echo json_encode($respuesta);
        mysqli_close($conexion);
    }
?>