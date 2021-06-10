function progreso(){
    //Esta funcion ocurre cada que se carga la página "dashboard.html"
    /*
    Lo que se debe hacer es mandar a las barras de progreso (con id: electiva1, electiva2, electiva 3. En el html linea 140)
    el porcentaje de lo que lleva acumulado.
    El la base de datos hay tres electivas, cada una con 7 creditos
    La primera tiene 5 créditos acumulados.
    Primero se debe verificar que aún no esté llena la primera electiva.
    Esto se hace comparando el valor de creditos_acumulados con cretidos, si son iguales está llena y 
    se manda 100% a la primera electiva, y así sucesivamnete

    Si aún no está llena, se hace lo siguiente:

    Si recuerdan las reglas de 3, esto se hará tomando los datos de la base de datos:
    de la tabla electiva (e):
    e.creditos_acumulados*(100/e.creditos) -> este es el porcentaje tomando los datos de la base de datos
    
    al final el porcentaje se va pasando a cada electiva de las 3 posibles en el html, tamnto el el valor de style, como escrito

    Para la conexion a la base de datos usen el php que ya tenemos hecho, obvio deben hacer otro php para las consultas
    a la tabla electiva
    */

    var lugar_barras = document.getElementById("barras_progreso");
    
    $.ajax({
        url: "php/barrasProgreso.php",
        method:'GET',
        data: {
        },
        success: function( respuesta ) {
            var objetoJSON = JSON.parse(respuesta);
            if(objetoJSON.estado == 1){
                var contador_color = 0;
                var colores = ["bg-success", "bg-warning", "bg-danger"];
                for(electiva of objetoJSON.electivas){
                    var porcentaje_electiva = electiva.creditos_acumulados*(100/electiva.creditos);
                    var barra = '<div> <p>'+electiva.nombre+'</p></div> <div class="progress"> <div id="barra_'+electiva.id+'" class="progress-bar progress-bar-striped '+colores[contador_color]+' progress-bar-animated" role="progressbar" aria-valuemin="0" aria-valuemax="100" style="width: '+porcentaje_electiva+'%"> '+parseInt(porcentaje_electiva)+'%</div> </div><br>';
                    lugar_barras.innerHTML += barra;
                    contador_color++;
                }
            }
            alert(objetoJSON.mensaje);
        }
      });
}