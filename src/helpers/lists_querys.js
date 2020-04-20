const admin_list_query = ((estado, filtro_tabla, filtro_valor, filtro_valor_f, order_by) => {
    var sql = "SELECT F.IDformulario AS IDformulario, F.Estado AS Estado_Aplicacion, U.Nombre AS Nombre, U.Apellido AS Apellido, U.CUM AS CUM, R.Nombre_Rubro AS Nombre_Rubro, CONVERT(nvarchar, U.FechaCreacion, 103) AS FechaCreacion FROM dbo.Usuarios AS U INNER JOIN dbo.Formularios AS F ON U.IDusuario = F.IDUsuario INNER JOIN dbo.Rubro_Becas AS R ON F.IDrubros = R.IDrubro WHERE F.Estado = "+estado;
    var filtro = "";
    if(filtro_tabla === "Apellido"){
        filtro = " AND U.Apellido LIKE '%"+filtro_valor+"%' ORDER BY U.Apellido ASC";
        if(order_by == 2){
            filtro = " AND U.Apellido LIKE '%"+filtro_valor+"%' ORDER BY U.Apellido DESC";
        }else if(filtro_valor=="" || filtro_valor_f==""){
            filtro = " ORDER BY U.Apellido ASC";
        }
    }else if(filtro_tabla === "Nombre"){
        filtro = " AND U.Nombre LIKE '%"+filtro_valor+"%' ORDER BY U.Nombre ASC";
        if(order_by == 2){
            filtro = " AND U.Nombre LIKE '%"+filtro_valor+"%' ORDER BY U.Nombre DESC";
        }else if(filtro_valor=="" || filtro_valor_f==""){
            filtro = " ORDER BY U.Nombre ASC";
        }
    }else if(filtro_tabla === "CUM"){
        filtro = " AND U.CUM >= "+filtro_valor+" AND U.CUM <= "+filtro_valor_f+" ORDER BY U.CUM ASC";
        if(order_by == 2){
            filtro = " AND U.CUM >= "+filtro_valor+" AND U.CUM <= "+filtro_valor_f+" ORDER BY U.CUM DESC";
        }else if(filtro_valor=="" || filtro_valor_f==""){
            filtro = " AND U.CUM >= 0 AND U.CUM <= 10.0 ORDER BY U.CUM ASC";
        }
    }else if(filtro_tabla === "Nombre_Rubro"){
        filtro = " AND R.IDrubro = "+filtro_valor+" ORDER BY U.Nombre ASC";
        if(order_by == 2){
            filtro = " AND R.IDrubro = "+filtro_valor+" ORDER BY U.Nombre DESC";
        }else if(filtro_valor==""){
            filtro = " ORDER BY IDrubro ASC";
        }
    }else if(filtro_tabla === "FechaCreacion"){
        filtro = " AND ( F.FechaCreacion BETWEEN '"+filtro_valor+"' AND '"+filtro_valor_f+"') ORDER BY CONVERT(DATE, F.FechaCreacion) ASC";
        if(order_by == 2){
            filtro = " AND ( F.FechaCreacion BETWEEN '"+filtro_valor+"' AND '"+filtro_valor_f+"') ORDER BY CONVERT(DATE, F.FechaCreacion) DESC";
        }else if(filtro_valor=="" || filtro_valor_f==""){
            filtro = " ORDER BY CONVERT(DATE, F.FechaCreacion) DESC";
        }
    }else{
        filtro = " ORDER BY U.Apellido ASC";
    }
    sql = sql+filtro;
    return sql;
});

const student_list_query = ((estado, id, filtro_tabla, filtro_valor, filtro_valor_f, order_by) => {
    var sql = "SELECT F.IDformulario AS IDformulario, F.Estado AS Estado_Aplicacion, U.Nombre AS Nombre, U.Apellido AS Apellido, U.CUM AS CUM, R.Nombre_Rubro AS Nombre_Rubro, CONVERT(nvarchar, U.FechaCreacion, 103) AS FechaCreacion FROM dbo.Usuarios AS U INNER JOIN dbo.Formularios AS F ON U.IDusuario = F.IDUsuario INNER JOIN dbo.Rubro_Becas AS R ON F.IDrubros = R.IDrubro WHERE U.IDusuario = "+id;
    var filtro = " ORDER BY CONVERT(DATE, F.FechaCreacion)";
    if(estado>0){
        filtro = "AND F.Estado="+estado+" ORDER BY CONVERT(DATE, F.FechaCreacion)";
    }
    sql = sql+filtro;
    return sql;
});

const action_list_query = ((estado, id)=>{
    var sql = "";
    if(estado>0){
        //Actualizar el estado de Pendiente > (Pre-Aprobado > Aprobado) || Denegado
        sql = "UPDATE dbo.Formularios SET Estado = "+estado+" WHERE IDformulario = "+id;
    }else{
        //Obtener una vista de la solicitud.
        sql = "SELECT * FROM dbo.Usuarios AS U INNER JOIN dbo.Formularios AS F ON U.IDusuario = F.IDUsuario INNER JOIN dbo.Rubro_Becas AS R ON F.IDrubros = R.IDrubro INNER JOIN dbo.Carreras as C ON F.IDcarrera = C.IDcarrera WHERE F.IDformulario = "+id+" ORDER BY CONVERT(DATE, F.FechaCreacion)";
    }
    return sql;
});

module.exports = {
    admin_list_query,
    student_list_query,
    action_list_query,
};