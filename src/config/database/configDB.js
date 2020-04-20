//Configuraciones de la Base Datos.
var server = "LOCALHOST\\MSSQLOBDULIO"; 
var database = "SISTEMA_DE_BECAS";
var user = "sa";
var pwr = "sa1234";
var port = 1433;

var dbConfig = {
    server: server,
    database: database,
    user: user,
    password: pwr,
    port: port
};

module.exports = dbConfig;