/*ESTA FUNCION APARECE CADA QUE SE CARGA LA PÁGINA "desglose-creditos"*/

function leerTablas(){
    //alert("mensaje");
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
                var tabla1 = document.getElementById("electivas_1");
                var tabla2 = document.getElementById("electivas_2");
                var tabla3 = document.getElementById("electivas_3");
                var total1 = 0, total2=0, total3=0; //Total de creditos para cada electiva

                for(constancia of objetoJSON.constancias){
                   //alert(constancia.electiva+"  "+constancia.constancia_nombre+"  "+constancia.eje_tematico+"  "+constancia.modalidad+"  "+constancia.horas+"  "+constancia.horas_usadas+"  "+constancia.factor+"  "+constancia.creditos);
                    if(constancia.electiva==1){
                        //AQUI ESTAN LAS CONSTANCIAS DE LA ELECTIVA 1
                        tabla1.innerHTML += '<tr><th scope="row">'+constancia.constancia_nombre+'</th><td align="left">'+constancia.eje_tematico+'</td><td>'+constancia.modalidad+'</td><td align="center">'+constancia.horas+'</td><td align="center">'+constancia.horas_usadas+'</td><td align="center">'+constancia.factor+'</td><td align="center">'+constancia.creditos+'</td></tr>';
                        //total1+=constancia.creditos;
                        total1 += parseFloat(constancia.creditos);
                    }else if(constancia.electiva==2){
                        //AQUI ESTAN LAS CONSTANCIAS DE LA ELECTIVA 2
                        tabla2.innerHTML += '<tr><th scope="row">'+constancia.constancia_nombre+'</th><td align="left">'+constancia.eje_tematico+'</td><td>'+constancia.modalidad+'</td><td align="center">'+constancia.horas+'</td><td align="center">'+constancia.horas_usadas+'</td><td align="center">'+constancia.factor+'</td><td align="center">'+constancia.creditos+'</td></tr>';
                        total2 += parseFloat(constancia.creditos);
                    }else if(constancia.electiva==3){
                        //AQUI ESTAN LAS CONSTANCIAS DE LA ELECTIVA 3
                        tabla3.innerHTML += '<tr><th scope="row">'+constancia.constancia_nombre+'</th><td align="left">'+constancia.eje_tematico+'</td><td>'+constancia.modalidad+'</td><td align="center">'+constancia.horas+'</td><td align="center">'+constancia.horas_usadas+'</td><td align="center">'+constancia.factor+'</td><td align="center">'+constancia.creditos+'</td></tr>';
                        total3 += parseFloat(constancia.creditos);
                    }
                }
                //Verifica que los totales sean mayor que 0, es decir que existan constancias en las electivas
                if(total1){
                    //alert("total1: "+total1);
                    tabla1.innerHTML+=' <tr> <th align="left" scope="row" colspan="6" ><b>Total</b></th><td >'+total1+'</td> </tr>';
                }if(total2){
                    tabla2.innerHTML+=' <tr> <th align="left" scope="row" colspan="6" ><b>Total</b></th><td >'+total2+'</td> </tr>';
                }if(total3){
                    tabla3.innerHTML+=' <tr> <th align="left" scope="row" colspan="6" ><b>Total</b></th><td >'+total3+'</td> </tr>';
                }
            }else{
                alert("nop");
            }

        }
    
      });
}