function progreso(){
    //Esta funcion ocurre cada que se caraga la página "deshboard.html"
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
   
    alert("progreso");
}