var idSeleccionadoParaEliminar = 0;
var idSeleccionadoParaActualizar = 0;

function limpiarModalNuevo(){
  document.getElementById("nombre_act").value="";
  document.getElementById("fecha_inicio").value="";
  document.getElementById("fecha_termino").value="";//1982-01-31
  document.getElementById("horas").value=""; 
  document.getElementById("observaciones").value="";
  document.getElementById('archivo_nombre').innerHTML="Seleccionar archivo";
}

function actionCreate(){
    
    var tabla = $('#dataTable').DataTable();
    var nombre_act_create = document.getElementById("nombre_act").value;
    var fecha_inicio_create = document.getElementById("fecha_inicio").value;
    var fecha_termino_create = document.getElementById("fecha_termino").value;//1982-01-31
    var horas_create = document.getElementById("horas").value; 
    var observaciones_create = document.getElementById("observaciones").value;
    var archivo_create = document.getElementById('archivo').value; //direccion actual
    var archivo_nombre = document.getElementById('archivo_nombre').innerHTML;
    //Guardar en la base de datos
   $.ajax({
        url: "php/alta_constancias.php",
        method: 'POST',
        data: {
            nombre_act : nombre_act_create,
            fecha_inicio : fecha_inicio_create,
            fecha_termino : fecha_termino_create,
            horas : horas_create,
            observaciones : observaciones_create,
            archivo : archivo_create,
            archivo_nombre: archivo_nombre, 
            accion: 'create'
        },
        success: function(resultado) {
            //resultado = String = {"estado":=0, "mensaje":"Ocurrio un error desconocido", "id":-1}
            //alert("Esto dice:" + resultado);
          var objetoJSON = JSON.parse(resultado);
          if(objetoJSON.estado==1){
            //mostar en la tabla los datos que este regresando
                //BOTONES
                var Botones = '<p align="left"> <button type="button" class="btn btn-primary mb-1 mr-2" data-toggle="modal" data-target="#modalEditar" onclick="recuperarRegistroActualizar('+ objetoJSON.id+');" href="#" ><i class="ti-pencil"></i> Editar </button>';
                Botones += ' <button type="button" class="btn btn-danger mb-1" data-toggle="modal" data-target="#modalEliminar" onclick="identificaEliminar('+objetoJSON.id+');"><i class="ti-trash"></i> Eliminar </button> </p>';
                var nombre = '<p align="left">';
                    nombre+=nombre_act_create;
                    nombre+='</p>';
                
                tabla.row.add( [
                    nombre,
                    fecha_inicio_create,
                    horas_create,
                    Botones
                ] ).node().id = 'row_'+objetoJSON.id;
                    tabla.draw(false);
                //alert(objetoJSON.mensaje);
          }else{
              //alert(objetoJSON.mensaje);
          }
          var fd = new FormData();
                  var files = $('#archivo')[0].files;
                  
                  // Check file selected or not
                  if(files.length > 0 ){
                    fd.append('archivo',files[0]);
        
                    $.ajax({
                        url: 'php/upload.php',
                        type: 'post',
                        data: fd,
                        contentType: false,
                        processData: false,
                        success: function(response){
                          if(response != 0){
                              $("#archivo").attr("src",response); 
                              //alert("AQUI: " + response);
                          }else{
                              alert('archivo no cargado');
                          }
                        },
                    });
                  }else{
                    alert("Por favor, seleccione un archivo.");
                  }
        }
      });
    limpiarModalNuevo();
}

function actionRead(){
    $.ajax({
        url: "php/alta_constancias.php",
        method: 'GET',
        data: {
            accion: 'read'
        },
        success: function( resultado ) {
            var objetoJSON = JSON.parse(resultado);

            if(objetoJSON.estado==1){
                var tabla = $('#dataTable').DataTable();
                //mostrar en la tabla registros

                //for
                for(constancia of objetoJSON.constancias){
                
                  var Botones = '<p align="left"> <button type="button" class="btn btn-primary mb-1" data-toggle="modal" data-target="#modalEditar" onclick="recuperarRegistroActualizar('+ constancia.id+');"><i class="ti-pencil" ></i> Editar </button>';
                  Botones += ' <button type="button" class="btn btn-warning mb-1" data-toggle="modal" data-target="#modalVer"><i class="ti-zoom-in"></i> </button>'; //search-plus
                  Botones += ' <button type="button" class="btn btn-danger mb-1" data-toggle="modal" data-target="#modalEliminar" onclick="identificaEliminar('+constancia.id+');"><i class="ti-trash"></i> Eliminar </button> </p>';
                  var nombre = '<p align="left">';
                  nombre+=constancia.nombre_act;
                  nombre+='</p>';

                    tabla.row.add([
                        nombre,
                        constancia.fecha_inicio,
                        constancia.horas,
                        Botones
                    ]).node().id = 'row_'+constancia.id;
                    tabla.draw(false);
                }
            }
          
        }
    
      });
}

function actionUpdate(){
  var tabla = $('#dataTable').DataTable();
  var nombre_act_actualizar = document.getElementById("nombre_act_actualizar").value;
  var fecha_inicio_actualizar = document.getElementById("fecha_inicio_actualizar").value;
  var fecha_termino_actualizar = document.getElementById("fecha_termino_actualizar").value;//1982-01-31
  var horas_actualizar = document.getElementById("horas_actualizar").value; 
  var archivo_actualizar = document.getElementById('archivo_actualizar').value; //direccion actual
  var archivo_nombre_actualizar = document.getElementById('archivo_nombre_actualizar').innerHTML; //nombre archivo
  var observaciones_actualizar = document.getElementById("observaciones_actualizar").value; 
  
  $.ajax({
      url: "php/alta_constancias.php",
      method: 'POST',
      data: {
          id: idSeleccionadoParaActualizar,
          nombre_act: nombre_act_actualizar,
          fecha_inicio: fecha_inicio_actualizar,
          fecha_termino: fecha_termino_actualizar,
          horas: horas_actualizar,
          observaciones: observaciones_actualizar,
          archivo_ruta: archivo_actualizar,
          archivo_nombre: archivo_nombre_actualizar,
          accion: 'Actualizar'
      },
      success: function( respuesta ) {
          //alert(respuesta);
          tabla.row("#row_"+idSeleccionadoParaActualizar).remove().draw();
          actualizarRegistro();
      }
    });
}

function actionDelete(){
    $.ajax({
        url: "php/alta_constancias.php",
        type: 'POST',
        data: {
          id: idSeleccionadoParaEliminar,
          accion: 'delete'
        },
      success: function(resultado){
        var objetoJSON = JSON.parse(resultado);
        if(objetoJSON.estado==1){
          //Quitar el registro eliminado
          var tabla = $('#dataTable').DataTable();
          tabla.row("#row_"+idSeleccionadoParaEliminar).remove().draw();
    
          //alert(objetoJSON.mensaje);
          $('#modalEliminar').modal('hide');
        }
        else{
          //alert(objetoJSON.mensaje);
        }
      }
      });
}

function recuperarRegistroActualizar(id){
  //alert(id);
  idSeleccionadoParaActualizar=id;
  $.ajax({
      url: "php/alta_constancias.php",
      method: 'GET',
      data: {
          id: idSeleccionadoParaActualizar,
          accion: 'read'
      },
      success: function( resultado ) {
          var objetoJSON = JSON.parse(resultado);
          if(objetoJSON.estado==1){
            document.getElementById("nombre_act_actualizar").value = objetoJSON.nombre_act;
            document.getElementById("fecha_inicio_actualizar").value= objetoJSON.fecha_inicio;
            document.getElementById("fecha_termino_actualizar").value= objetoJSON.fecha_termino;//1982-01-31
            document.getElementById("horas_actualizar").value=objetoJSON.horas; 
            document.getElementById("observaciones_actualizar").value=objetoJSON.observaciones;
            document.getElementById("archivo_nombre_actualizar").innerHTML=objetoJSON.archivo_nombre;
          }else{
              //alert(objetoJSON.mensaje);
          }
          //alert(resultado);
      }
    });
}

function actualizarRegistro(){ //Función hija de actionUpdate. Se encarga de volver a agregar el renglón actualizado.
  $.ajax({
      url: "php/alta_constancias.php",
      method: 'GET',
      data: {
          id: idSeleccionadoParaActualizar,
          accion: 'read'
      },
      success: function( resultado ) {
          var objetoJSON = JSON.parse(resultado);
          var tabla = $('#dataTable').DataTable();
          if(objetoJSON.estado==1){
            var Botones = '<p align="left"> <button type="button" class="btn btn-primary mb-1" data-toggle="modal" data-target="#modalEditar" onclick="recuperarRegistroActualizar('+ objetoJSON.id+');" href="#" ><i class="ti-pencil"></i> Editar </button>';
            Botones += ' <button type="button" class="btn btn-danger mb-1" data-toggle="modal" data-target="#modalEliminar" onclick="identificaEliminar('+objetoJSON.id+');"><i class="ti-trash"></i> Eliminar </button></p>';
            var nombre = '<p align="left">';
                    nombre+=objetoJSON.nombre_act;
                    nombre+='</p>';

            tabla.row.add( [
                nombre,
                objetoJSON.fecha_inicio,
                objetoJSON.horas,
                Botones
            ] ).node().id = 'row_'+objetoJSON.id;
            tabla.draw(false);
          }else{
              alert(objetoJSON.mensaje);
          }
          //Actualizar archivo
          var fd = new FormData();
          var files = $('#archivo_actualizar')[0].files;
          
          if(files.length > 0 ){
            fd.append('archivo_actualizar',files[0]);

            $.ajax({
                url: 'php/upload1.php',
                type: 'post',
                data: fd,
                contentType: false,
                processData: false,
                success: function(response){
                  if(response != 0){
                      $("#archivo_actualizar").attr("src",response); 
                      //alert("AQUI: " + response);
                  }else{
                      alert('archivo no cargado');
                  }
                },
            });
          }else{
            alert("Por favor, seleccione un archivo.");
          }
      }
    });
}

function identificaEliminar(id){
    //alert("El id del registro a eliminar es "+id);
    idSeleccionadoParaEliminar=id;
  }
function identificarActualizar(id){
    //alert("El registro seleccionado actualizar es el siguiete: "+id);
    idSeleccionadoParaActualizar=id;
}
document.getElementById('archivo').onchange = function () {
  console.log(this.value);
  document.getElementById('archivo_nombre').innerHTML = document.getElementById('archivo').files[0].name;
}

document.getElementById('archivo_actualizar').onchange = function () {
  console.log(this.value);
  document.getElementById('archivo_nombre_actualizar').innerHTML = document.getElementById('archivo_actualizar').files[0].name;
}