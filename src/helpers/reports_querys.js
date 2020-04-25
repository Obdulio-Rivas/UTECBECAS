const report_query = ((type_report, order_by, date) => {
    var sql="SELECT F.IDformulario AS IDformulario, F.Estado AS Estado_Aplicacion, U.Nombre AS Nombre, U.Apellido AS Apellido, U.CUM AS CUM, R.Nombre_Rubro AS Nombre_Rubro, U.Carnet, CONVERT(nvarchar, U.FechaCreacion, 103) AS FechaCreacion FROM dbo.Usuarios AS U INNER JOIN dbo.Formularios AS F ON U.IDusuario = F.IDUsuario INNER JOIN dbo.Rubro_Becas AS R ON F.IDrubros = R.IDrubro";;
    var status = 0;
    switch (type_report) {
        case "Pendientes":
            status=1;
            break;
        case "PreAprobados":
            status=2;
            break;
        case "Denegados":
            status=3;
            break;
        case "Aprobados":
            status=4;
            break;
        default:
            status = "Select 0";
            return status;
            break;
    }
    if(order_by === "Apellidos A-Z"){
        sql = sql+" WHERE F.Estado = "+status+" ORDER BY U.Apellido ASC";
    }else if(order_by === "Apellidos Z-A"){
        sql = sql+" WHERE F.Estado = "+status+" ORDER BY U.Apellido DESC";
    }else if(order_by === "Nombres A-Z"){
        sql = sql+" WHERE F.Estado = "+status+" ORDER BY U.Nombre ASC";
    }else if(order_by === "Nombres Z-A"){
        sql = sql+" WHERE F.Estado = "+status+" ORDER BY U.Nombre DESC";
    }else if(order_by === "CUM Min-Max"){
        sql = sql+" WHERE F.Estado = "+status+" AND U.CUM >= 0 AND U.CUM <= 10 ORDER BY U.CUM ASC";
    }else if(order_by === "CUM Max-Min"){
        sql = sql+" WHERE F.Estado = "+status+" AND U.CUM >= 0 AND U.CUM <= 10 ORDER BY U.CUM DESC";
    }else if(order_by === "Rubros A-Z"){
        sql = sql+"  WHERE F.Estado = "+status+" ORDER BY Nombre_Rubro ASC";
    }else if(order_by === "Rubros Z-A"){
        sql = sql+"  WHERE F.Estado = "+status+" ORDER BY Nombre_Rubro DESC";
    }else if(order_by === "Rango de Fecha"){
        sql = sql+" WHERE F.Estado = "+status+" AND ( F.FechaCreacion BETWEEN '"+date[0]+"' AND '"+date[1]+"') ORDER BY CONVERT(DATE, F.FechaCreacion) ASC";
    }else{
        sql= "Select 0";
    }
    return sql;
});

module.exports = {
    report_query
};