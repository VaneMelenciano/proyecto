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
            accion: 'create'
        },
        success: function(resultado) {
            //resultado = String = {"estado":=0, "mensaje":"Ocurrio un error desconocido", "id":-1}
            //alert("Esto dice:" + resultado);
          var objetoJSON = JSON.parse(resultado);
          if(objetoJSON.estado==1){
            //mostar en la tabla los datos que este regresando
                //BOTONES
                var Botones = '<button type="button" class="btn btn-primary mb-1" data-toggle="modal" data-target="#modalEditar" onclick="recuperarRegistroActualizar('+ objetoJSON.id+');" href="#" ><i class="ti-pencil"></i> Editar </button>';
                Botones += ' <button type="button" class="btn btn-danger mb-1" data-toggle="modal" data-target="#modalEliminar" onclick="identificaEliminar('+objetoJSON.id+');"><i class="ti-trash"></i> Eliminar </button>';
                
                tabla.row.add( [
                    nombre_act_create,
                    fecha_inicio_create,
                    horas_create,
                    Botones
                ] ).draw( false );
                alert(objetoJSON.mensaje);
          }else{
              alert(objetoJSON.mensaje);
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
                
                    var Botones = '<button type="button" class="btn btn-primary mb-1" data-toggle="modal" data-target="#modalEditar" onclick="recuperarRegistroActualizar('+ constancia.id+');"><i class="ti-pencil" ></i> Editar </button>';
                    Botones += ' <button type="button" class="btn btn-danger mb-1" data-toggle="modal" data-target="#modalEliminar" onclick="identificaEliminar('+constancia.id+');"><i class="ti-trash"></i> Eliminar </button>';
                    
                    tabla.row.add([
                        constancia.nombre_act,
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
    alert("Actualizar");

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
    
          alert(objetoJSON.mensaje);
          $('#modalEliminar').modal('hide');
        }
        else{
          alert(objetoJSON.mensaje);
        }
      }
      });
}

function recuperarRegistroActualizar(id){
  alert(id);
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
          }else{
              alert(objetoJSON.mensaje);
          }
          alert(resultado);
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