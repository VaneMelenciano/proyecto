<?php
    if(isset($_POST['accion'])) $accion = $_POST['accion'];        
    else if(isset($_GET['accion'])) $accion = $_GET['accion'];

    include 'conexion.php';
    
    switch($accion){
        case 'leer':
            leer($conexion);
            break;
        case 'leerTablas':
            leerTablas($conexion);
            break;
        default:
            break;
    }

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

    function leerTablas($conexion){
        $respuesta = array();
        $Query = "SELECT eje_tematico, modalidad, ejemplos, descripcion FROM denominacion WHERE eje_tematico = 'Inquietudes vocacionales propias' OR eje_tematico = 'Énfasis en la profesión' OR eje_tematico = 'Complementarias a la formación'";
        
        $resultado = mysqli_query($conexion, $Query);
        $num_resultados = mysqli_num_rows($resultado);
        if($num_resultados > 0){
            $respuesta["estado"] = 1;
            $respuesta["mensaje"] = "registros encontrados";

            $respuesta["denominaciones"] = array();

            while($row = mysqli_fetch_array($resultado)){
                $rowDenominacion = array();
                
                $rowDenominacion["eje_tematico"] = $row["eje_tematico"];
                $rowDenominacion["modalidad"] = $row["modalidad"];
                $rowDenominacion["ejemplos"] = $row["ejemplos"];
                $rowDenominacion["descripcion"] = $row["descripcion"];

                array_push($respuesta["denominaciones"], $rowDenominacion);
            }
        }else{
            $respuesta["estado"] = 0;
            $respuesta["mensaje"] = "No se encontraron registros";
        }
        echo json_encode($respuesta);
        mysqli_close($conexion);
    }
?>