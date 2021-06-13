/*ESTA FUNCION APARECE CADA QUE SE CARGA LA PÁGINA "desglose-creditos"*/

function leerTablas(){
    alert("mensaje");
    $.ajax({
        url: "php/barrasProgreso.php",
        method: 'GET',
        data: {
            accion: 'Desglose'
        },
        success: function( respuesta ) {
            var objetoJSON = JSON.parse(respuesta);

            if(objetoJSON.estado==1){
                alert(objetoJSON.mensaje);
                for(constancia of objetoJSON.constancias){
                   //alert(constancia.electiva+"  "+constancia.constancia_nombre+"  "+constancia.eje_tematico+"  "+constancia.modalidad+"  "+constancia.horas+"  "+constancia.horas_usadas+"  "+constancia.factor+"  "+constancia.creditos);
                    if(constancia.electiva==1){
                        //AQUI ESTAN LAS CONSTANCIAS DE LA ELECTIVA 1
                    }else if(constancia.electiva==2){
                        //AQUI ESTAN LAS CONSTANCIAS DE LA ELECTIVA 2
                    }else if(constancia.electiva==3){
                        //AQUI ESTAN LAS CONSTANCIAS DE LA ELECTIVA 3
                    }
                }
            }else{
                alert("nop");
            }
          
        }
    
      });
}