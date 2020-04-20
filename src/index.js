//Server.
//Requerimientos necesarios.
const express = require('express');
const morgan= require('morgan');
const cors = require('cors');
const path = require('path');
const bodyParse = require('body-parser');
const session = require('express-session');
const ip = require('ip');
//Locales.
const router = require('./routes/index')
//const connection = require('./config/database/connection');
//Inicializaciones.
const server = express();
//const conn = new connection();
//Puerto de montaje del server.
const port = process.env.PORT || 3000;
//Configuraciones del server.
server.set('port', port);
server.set('views', path.join(__dirname,'views'));
server.set('view engine', 'ejs');
//Middlewares
server.use(morgan('dev'));
server.use(cors());
server.use(bodyParse.json());
server.use(bodyParse.urlencoded({extended: true}));
server.use(session({
    secret: 'mykeyOY',
    resave: false,
    saveUninitialized: false,
}));
//Variables Globales.
//Rutas.
server.use('/', router);
//Archivos del Server.
server.use(express.static(path.join(__dirname, 'public')));
//Levantamiento del Servidor.
server.listen(port, () =>{
    console.log('Server on Port: '+port);
    console.log('Open app: http://'+ip.address()+':'+port);
});