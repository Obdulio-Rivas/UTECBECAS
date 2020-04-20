//Importamos el modulo mssql.
const sql = require("mssql");
//Importamos las configuraciones de la DB.
const dbConfig = require('./configDB');

//Para Sentencias Select
function executeQuery(SQL_query){
    return new Promise((resolve, reject) => {
        new sql.ConnectionPool(dbConfig).connect().then(pool => {
            return pool.request().query(SQL_query);
        }).then(result => {
            sql.close();
            let num_rows = result.rowsAffected[0];
            console.log("Numero de Filas: "+num_rows);
            result.recordset.push({num_rows: num_rows});
            if(num_rows > 0){
                resolve(result.recordset);
            }else{
                //result.recordset.push({info: "No hay filas afectadas"});
                resolve(result.recordset);
            }
        }).catch(error => {
            sql.close();
            reject(error);
        });
    });
}

module.exports = executeQuery;