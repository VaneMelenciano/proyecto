function limpiarModalNuevo(){
    var nombre_act_create = document.getElementById("nombre_act");
    var fecha_inicio_create = document.getElementById("fecha_inicio");
    var fecha_termino_create = document.getElementById("fecha_termino");//1982-01-31
    var horas_create = document.getElementById("horas"); 
    var observaciones_create = document.getElementById("observaciones");
    nombre_act_create.value="";
    fecha_inicio_create.value="";
    fecha_termino_create.value="";
    horas_create.value="";
    observaciones_create.value="";
}

function actionCreate(){
    
    var tabla = $('#dataTable').DataTable();
    var nombre_act_create = document.getElementById("nombre_act").value;
    var fecha_inicio_create = document.getElementById("fecha_inicio").value;
    var fecha_termino_create = document.getElementById("fecha_termino").value;//1982-01-31
    var horas_create = document.getElementById("horas").value; 
    var observaciones_create = document.getElementById("observaciones").value;
    //alert(nombre_act_create);
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
                var Botones = '<button type="button" class="btn btn-primary mb-1" data-toggle="modal" data-target="#modalEditar"><i class="ti-pencil"></i> Editar </button>';
                Botones += ' <button type="button" class="btn btn-danger mb-1" data-toggle="modal" data-target="#modalEliminar" onclick="identificaEliminar('+objetoJSON.id+');"><i class="ti-trash"></i> Eliminar </button>';
                
                tabla.row.add( [
                    nombre_act_create,
                    fecha_inicio_create,
                    horas,
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
            accion: 'Read'
        },
        success: function( resultado ) {
            var objetoJSON = JSON.parse(resultado);

            if(objetoJSON.estado==1){
                var tabla = $('#dataTable').DataTable();
                //mostrar en la tabla registros

                //for
                for(constancia of objetoJSON.constancias){
                
                    var Botones = '<button type="button" class="btn btn-primary mb-1" data-toggle="modal" data-target="#modalEditar"><i class="ti-pencil"></i> Editar </button>';
                    Botones += ' <button type="button" class="btn btn-danger mb-1" data-toggle="modal" data-target="#modalEliminar" onclick="identificaEliminar('+denominacion.id+');"><i class="ti-trash"></i> Eliminar </button>';
                    
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
        url: "../php/alta_constancias.php",
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

function identificaEliminar(id){
    //alert("El id del registro a eliminar es "+id);
    idSeleccionadoParaEliminar=id;
  }