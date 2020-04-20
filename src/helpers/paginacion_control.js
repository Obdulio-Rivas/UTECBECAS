var configuracion = {
    filas_por_pagina: 5,
}

const crear_paginacion = (filas)=>{
    if((filas.length-1)<(configuracion.filas_por_pagina+1)){
        var pagina = 1;
        var fila_inicio = 0;
        var fila_final = filas.length-1;
        var filas_por_pagina = configuracion.filas_por_pagina*1;
        var filas_totales = filas.length-1;
        var paginas_totales = 1;
    }else{
        var pagina = 1;
        var fila_inicio = (pagina-1)*configuracion.filas_por_pagina;
        var fila_final = pagina*configuracion.filas_por_pagina;
        var filas_por_pagina = configuracion.filas_por_pagina*1;
        var filas_totales = filas.length-1;
        var paginas_totales = filas_totales/filas_por_pagina;
        //Evaluamos si se ocupa una pagina mas si el numero da decimal mayor a 0.0
        var int_part = Math.trunc(paginas_totales);
        var float_part = Number((paginas_totales-int_part).toFixed(2));
        if(float_part>0.00){
            paginas_totales = int_part+1;
        }else{
            paginas_totales = int_part;
        }
    }
    paginacion = {
        pagina: pagina,
        fila_inicio: fila_inicio,
        fila_final: fila_final,
        filas_por_pagina: filas_por_pagina,
        filas_totales: filas_totales,
        paginas_totales: paginas_totales
    }
    return paginacion;
}

const actualizar_paginacion = (filas,paginacion, pagina)=>{
    var filas_por_pagina = configuracion.filas_por_pagina*1;
    var pagina_nueva = pagina*1;
    var fila_inicio = (pagina_nueva-1)*configuracion.filas_por_pagina;
    var fila_final = pagina_nueva*configuracion.filas_por_pagina;
    var filas_totales = filas.length-1;
    var paginas_totales = filas_totales/filas_por_pagina;
    //Evaluamos si se ocupa una pagina mas si el numero da decimal mayor a 0.0
    var int_part = Math.trunc(paginas_totales);
    var float_part = Number((paginas_totales-int_part).toFixed(2));
    if(float_part>0.00){
        paginas_totales = int_part+1;
    }else{
        paginas_totales = int_part;
    }
    if(fila_final>filas_totales){
        fila_final = filas_totales;
    }
    if(pagina>paginas_totales && fila_final==filas_totales){
        pagina_nueva = pagina_nueva-1;
        fila_inicio = fila_inicio-configuracion.filas_por_pagina;
    }
    paginacion = {
        pagina: pagina_nueva,
        fila_inicio: fila_inicio,
        fila_final: fila_final,
        filas_por_pagina: filas_por_pagina,
        filas_totales: filas_totales,
        paginas_totales: paginas_totales
    }
    return paginacion;
}

module.exports = {
    crear_paginacion,
    actualizar_paginacion,
}