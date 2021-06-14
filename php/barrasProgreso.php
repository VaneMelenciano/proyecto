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
        case 'Desglose':
            desgloseCreditos($conexion);
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
    function desgloseCreditos($conexion){
        $respuesta = array();
        $Query =" SELECT e.nombre electiva, c.id, c.nombre_act constancia_nombre, d.eje_tematico, d.modalidad, c.horas, ROUND(ce.creditos *d.factor, 2) horas_usadas, d.factor, ce.creditos  FROM alumno a, constancias c, denominacion d, constancia_electiva ce, electiva e  WHERE a.id=c.alumno_id AND d.id=c.denominacion_id AND ce.constancia_id=c.id AND ce.electiva_id=e.id ";
        
        $resultado = mysqli_query($conexion, $Query);
        $num_resultados = mysqli_num_rows($resultado);
        //
        
        if($num_resultados>0){
            $respuesta['estado']=1;
            $respuesta['mensaje']="Constancias encontradas";
            $respuesta["constancias"] = array();
           while($row = mysqli_fetch_array($resultado)){
                $rowConstancia = array();
                if($row["electiva"]=='Electiva 1'){
                    $rowConstancia["electiva"]=1;
                }else if($row["electiva"]=='Electiva 2'){
                    $rowConstancia["electiva"]=2;
                }else if($row["electiva"]=='Electiva 3'){
                    $rowConstancia["electiva"]=3;
                }
                $rowConstancia["id"] = $row["id"];
                $rowConstancia["constancia_nombre"] = $row["constancia_nombre"];
                $rowConstancia["eje_tematico"] = $row["eje_tematico"];
                $rowConstancia["modalidad"] = $row["modalidad"];
                $rowConstancia["horas"] = $row["horas"];
                $rowConstancia["factor"] = $row["factor"];
                $rowConstancia["horas_usadas"]= $row["horas_usadas"];
                $rowConstancia["creditos"]= $row["creditos"];
                array_push($respuesta["constancias"], $rowConstancia);
            }
        }else{
            $respuesta['estado']=0;
            $respuesta['mensaje']="No exiten constancias";
        }
        echo json_encode($respuesta);
        mysqli_close($conexion);
    }
?>