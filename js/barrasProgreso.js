//Esta funcion ocurre cada que se carga la página "dashboard.html"
function progreso(){
    var lugar_barras = document.getElementById("barras_progreso");
    
    $.ajax({
        url: "php/barrasProgreso.php",
        method:'GET',
        data: {
            accion: 'leer'
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
            }else alert(objetoJSON.mensaje);
        }
    });
}

function leerTablas(){
    var tabla_ivp = document.getElementById("tabla_inquietudes_vocacionales_propias");
    var tabla_ep = document.getElementById("tabla_enfasis_en_la_profesion");
    var tabla_cf = document.getElementById("tabla_complementarias_a_la_formacion");

    $.ajax({
        url: "php/barrasProgreso.php",
        method:'GET',
        data: {
            accion: 'leerTablas'
        },
        success: function( respuesta ) {
            var objetoJSON = JSON.parse(respuesta);
            if(objetoJSON.estado == 1){
                for(denominacion of objetoJSON.denominaciones){
                    if(denominacion.eje_tematico == "Inquietudes vocacionales propias"){
                        tabla_ivp.innerHTML += '<tr><th scope="row">'+denominacion.modalidad+'</th><td align="left"><ol type="a">'+denominacion.ejemplos+'</ol></td><td>'+denominacion.descripcion+'</td></tr>';
                    }
                    else if(denominacion.eje_tematico == "Énfasis en la profesión"){
                        tabla_ep.innerHTML += '<tr><th scope="row">'+denominacion.modalidad+'</th><td align="left"><ol type="a">'+denominacion.ejemplos+'</ol></td><td>'+denominacion.descripcion+'</td></tr>';
                    }
                    else if(denominacion.eje_tematico == "Complementarias a la formación"){
                        tabla_cf.innerHTML += '<tr><th scope="row">'+denominacion.modalidad+'</th><td align="left"><ol type="a">'+denominacion.ejemplos+'</ol></td><td>'+denominacion.descripcion+'</td></tr>';
                    }
                }
            } else alert(objetoJSON.mensaje);
        }
    });
}