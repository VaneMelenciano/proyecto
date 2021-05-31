<?php
    /*
    GET = Read
    POST = Create
    PUT = Update (Actualizar)
    DELETE = Eliminar
    */
    if(isset($_POST['accion']))
      $accion   = $_POST['accion'];
    else if(isset($_GET['accion']))
      $accion   = $_GET['accion'];
    include '../php/conexion.php';
    
    switch($accion){
      case 'create':
        accionCrear($conexion);
        break;
      case 'delete':
        accionEliminar($conexion);
        break;
      case 'read':
        accionLeer($conexion);
        break;
      case 'Actualizar':
         accionActualizar($conexion);
         break;
      default:
        break;
    }

    function accionCrear($conexion){

      $respuesta = array();
      $nombre_act    = $_POST['nombre_act'];
      $fecha_inicio  = $_POST['fecha_inicio'];
      $fecha_termino = $_POST['fecha_termino'];
      $horas         = $_POST['horas'];
      $observaciones = $_POST['observaciones'];
      $archivo_nombre= $_POST['archivo_nombre'];
      $destino = '../archivos/'. $archivo_nombre;

      //$Query = "INSERT INTO constancias (id, nombre_act, fecha_inicio, fecha_termino, horas, observaciones) VALUES (NULL, '".$nombre_act."', '".$fecha_inicio."', '".$fecha_termino."', ".$horas.", '".$observaciones."') ";
      $Query = " INSERT INTO constancias (id, nombre_act, fecha_inicio, fecha_termino, horas, observaciones, archivo_ruta, archivo_nombre) VALUES (NULL, '$nombre_act', '$fecha_inicio', '$fecha_termino', '$horas', '$observaciones', '$destino', '$archivo_nombre'); ";
      $resultado = mysqli_query($conexion,$Query);

      if($resultado>=1){
        $respuesta['estado']=1; //Programador
        $respuesta['mensaje']="El registro se creo con exito"; //el alumn o la persona encaragda de las Electivas
        $respuesta['id']=mysqli_insert_id($conexion); //Programador
        echo json_encode($respuesta);
      }
      else{
        $respuesta['estado']=0; //programador
        $respuesta['mensaje']="Ocurrio un error desconocido"; //el alumn o la persona encaragda de las Electivas
        $respuesta['id'] = -1; //programador
        echo json_encode($respuesta);
      }
      //echo "Tu query es: ".$Query;
      
    }

    function accionLeer($conexion){
      $respuesta = array();
      //isset permite saber si me esta enviando el paramentro id
      if(isset($_GET['id'])){
        //quiero un solo registro
        $id = $_GET['id'];
        $Query ="SELECT * FROM constancias WHERE id = ".$id."";
        $resultado = mysqli_query($conexion,$Query);
        $numero = mysqli_num_rows($resultado);
        if($numero==1){
          $row = mysqli_fetch_array($resultado);

          $respuesta["id"] = $row["id"];
          $respuesta["nombre_act"] = $row["nombre_act"];
          $respuesta["fecha_inicio"] = $row["fecha_inicio"];
          $respuesta["fecha_termino"] = $row["fecha_termino"];
          $respuesta["horas"] = $row["horas"];
          $respuesta["observaciones"] = $row["observaciones"];
          $respuesta["archivo_ruta"]=$row["archivo_ruta"];
          $respuesta["archivo_nombre"]=$row["archivo_nombre"];
          $respuesta["estado"]=1;
          $respuesta["mensaje"]= "Si hay registro para mostrar";
        }else{
            $respuesta["estado"]=0;
            $respuesta["mensaje"]= "Ocurrió un error desconocido";
        }
      }else{
        //Quiero todos los registros
        $Query ="SELECT * FROM constancias";
        $resultado = mysqli_query($conexion,$Query); //Contiene 
        $numero = 1;
        //Cuantos registros me regreso
          if( $numero>=1){
              $respuesta["estado"]=1;
              $respuesta["mensaje"]= "Registros encontrados";
            
              $respuesta["constancias"]=array();

            while($row = mysqli_fetch_array($resultado)){ //Se ejecuta el ciclo el número de veces = número de registros
              $rowConstancia = array();
              //Temporalmente obtener los campos de cada registro
              $rowConstancia["id"] = $row["id"];
              $rowConstancia["nombre_act"] = $row["nombre_act"];
              $rowConstancia["fecha_inicio"] = $row["fecha_inicio"];
              $rowConstancia["fecha_termino"] = $row["fecha_termino"];
              $rowConstancia["horas"] = $row["horas"];
              $rowConstancia["observaciones"] = $row["observaciones"];
              $rowConstancia["archivo_ruta"]=$row["archivo_ruta"];
              $rowConstancia["archivo_nombre"]=$row["archivo_nombre"];
              //Ponereste objeto = $rowDenominacion poner en el arrelo denominaciones
              array_push($respuesta["constancias"], $rowConstancia);
            
            }
          }else{
              $respuesta["estado"]=0;
              $respuesta["mensaje"]= "Registros no encontrados";
          }
        }
        

        //codificar para eliminar un registro
        echo json_encode($respuesta);
    }
    function accionActualizar($conexion){
      $id = $_POST['id'];
      $nombre_act    = $_POST['nombre_act'];
      $fecha_inicio  = $_POST['fecha_inicio'];
      $fecha_termino = $_POST['fecha_termino'];
      $horas         = $_POST['horas'];
      $observaciones = $_POST['observaciones'];
      $archivo_ruta  = $_POST['archivo_ruta'];
      $archivo_nombre= $_POST['archivo_nombre'];
    }

    function accionEliminar($conexion){
      //ELIMINAR
      $respuesta = array();
      $id = $_POST['id'];

      $Query = "DELETE FROM constancias WHERE constancias.id = ".$id;
      mysqli_query($conexion,$Query);
  
      $constanciasEliminadas = mysqli_affected_rows($conexion);

      if($constanciasEliminadas>=1){
      $respuesta['estado'] = 1;
      $respuesta['mensaje'] = "La constancia se eliminó con exito";
      }
      else{
      $respuesta['estado'] = 0;
      $respuesta['mensaje'] = mysqli_error($conexion);
      }
      echo json_encode($respuesta);
      mysqli_close($conexion);
    }

?>