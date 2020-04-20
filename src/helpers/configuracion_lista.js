const crear_configuracion_lista = ()=>{
    configuracion_lista = {
        panel: "dashboard",
        estado: 1,
        filtro_tabla: "Nombre",
        filtro_valor: "",
        filtro_valor_f: "",
        order_by: 1,
    }
    return configuracion_lista;
}

const actualizar_configuracion_lista = (panel, estado, filtro_tabla, filtro_valor, filtro_valor_f, orderby)=>{
    configuracion_lista = {
        panel: panel,
        estado: estado,
        filtro_tabla: filtro_tabla,
        filtro_valor: filtro_valor,
        filtro_valor_f: filtro_valor_f,
        order_by: orderby,
    }
    return configuracion_lista;
}

module.exports = {
    crear_configuracion_lista,
    actualizar_configuracion_lista
}