//Importamos el modulo mssql.
const sql = require("mssql");
//Importamos las configuraciones de la DB.
const dbConfig = require('./configDB');

//Para Sentencias Insert, Delete, Update
function executeUpdate(SQL_query){
    return new Promise((resolve, reject) => {
        new sql.ConnectionPool(dbConfig).connect().then(pool => {
            return pool.request().query(SQL_query);
        }).then(result => {
            sql.close();
            let num_rows_affected = result.rowsAffected[0];
            console.log("Numero de Filas afectadas: "+num_rows_affected);
            resolve({rows_affected: num_rows_affected});
        }).catch(error => {
            sql.close();
            reject(error);
        });
    });
}

module.exports = executeUpdate;