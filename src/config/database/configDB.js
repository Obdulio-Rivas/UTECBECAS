//Configuraciones de la Base Datos.
var server = "becas-utec.database.windows.net";//"LOCALHOST\\MSSQLOBDULIO"; 
var database = "SISTEMA_DE_BECAS";
var user = "grupo01";
var pwr = "Sa123456";
var port = 1433;

var dbConfig = {
    server: server,
    database: database,
    user: user,
    password: pwr,
    port: port,
    encrypt: true,
};

module.exports = dbConfig;