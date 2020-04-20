//importamos el modulo mssql.
const sql = require("mssql");
//importamos las configuraciones de la DB.
const dbConfig = require('./configDB');

class Connection{

    Connection(){
        //Constructore de la clase Connection.
    }

    //Metodo para obtener la conexion.
    getConnection(centinel){
        //True devuelve el msg
        var connection_pool = new sql.ConnectionPool(dbConfig);
        centinel ? console.log("Conexion establecida con la base de datos: "+dbConfig.database) : null ;
        return connection_pool; //Retorna un hilo de conexion.
    }

    //Implementar para solo usos de testing.
    getTest(SQL_query){
        var connection_pool = new sql.ConnectionPool(dbConfig);
        //SQL_query is null or clean
        if(SQL_query!=="" && SQL_query!==null){
            connection_pool.connect().then(function () {
                var req = new sql.Request(connection_pool);
                req.query(SQL_query).then(function (recordset) {
                    console.table(recordset.recordset); //Table mode.
                    //console.log(recordset); JSON.
                    connection_pool.close();
                    return recordset;
                })
                .catch(function (err) {
                    console.log(err);
                    connection_pool.close();
                    return -1;
                });        
                })
                .catch(function (err) {
                    console.log(err);
                    return -1;
                });
        }else{
            SQL_query = SQL_query=="" ? "No se mando nada" : null,
            console.log("Error: Script sql no correcto, setencia ingresada: "+SQL_query);
        }
    }
}

module.exports = Connection;