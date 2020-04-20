//Importamos las configuraciones de la DB.
const executeUpdate = require('../config/database/executeUpdate');
const executeQuery = require('../config/database/executeQuery');
const faker = require('faker');

const api_user_slc_controller = (req, res) =>{
    let promesa = executeQuery("Select * from Usuarios");
    promesa.then(function(result){
        res.send(result);
    },
    function(error){
        res.send(error);
    });
};

const api_user_image = (req,res) =>{
    res.send({image: faker.image.avatar()});
};

const api_application_slc_controller = (req, res) =>{
    let promesa = executeQuery("SELECT * FROM dbo.Usuarios AS U INNER JOIN dbo.Formularios AS F ON U.IDusuario = F.IDUsuario INNER JOIN dbo.Rubro_Becas AS R ON F.IDrubros = R.IDrubro ORDER BY CONVERT(DATE, F.FechaCreacion)");
    promesa.then(function(result){
        res.send(result);
    },
    function(error){
        res.send(error);
    });
};

const api_delete_all = (req,res) =>{
    let promesa = executeUpdate("Delete from Usuarios");
    promesa.then(function(result){
        res.send(result);
    },
    function(error){
        res.send(error);
    });
};

module.exports = {
    api_user_slc_controller,
    api_user_image,
    api_application_slc_controller,
    api_delete_all
}