//Modulos del controlador.
//Modulos externos.
const faker = require('faker');
//Importamos las configuraciones de la DB.
const executeUpdate = require('../config/database/executeUpdate');
const executeQuery = require('../config/database/executeQuery');
//Importamos los modulos internos.
const paginacion_control = require('../helpers/paginacion_control');
const configuracion_lista = require('../helpers/configuracion_lista');
const lists_querys = require('../helpers/lists_querys');
//-----------------------------------------//
//-METODOS PARA LOS PROCESOS DE LAS LISTAS-//
//-----------------------------------------//
// Procesos para peticiones por metodo GET.
const proceso_listas_get = (req,res)=>{
    /*Validamos que la peticion se ha realizada desde
    una session en ejecucion aun o estado activo.*/
    if(req.session.data_user === undefined){
        //Redigimiento, de session no activa.
        res.render('index');
    }else{
        //Session si activa.
        var nivel = req.session.data_user.Nivel;
        var id_usuario = req.session.data_user['IDusuario'];
        console.log(id_usuario);
        if(nivel === 1){
            //Listas del Alumno.
            //Listado de solicitudes Estudiante.
            var estado = req.session.configuracion.estado;
            var nivel = req.session.data_user.Nivel;
            //Ruta por metodo GET.
            var filtro_valor = req.query.filtro_valor;
            var filtro_tabla = req.query.filtro_tabla;
            var order_by = (req.query.order_by==1)?1:req.query.order_by;
            var filtro_valor_f = (req.query.filtro_valor_f=="")?"":req.query.filtro_valor_f;
            if(req.query.pag === undefined){
                //Ruta por metodo GET al cambiar de filtro.
                sql = lists_querys.student_list_query(estado, id_usuario, filtro_tabla, "", "", 1);
            }else{
                //Ruta por metodo GET al cambiar por pagina.
                sql = lists_querys.student_list_query(estado, id_usuario, filtro_tabla, filtro_valor, filtro_valor_f, order_by);
            }
            //Establecimiento de Promesa.
            let promesa = executeQuery(sql);
            //Ejecucion de Pormesa.
            promesa.then((filas) => {
                //Validacion de paginacion.
                if(req.query.pag === undefined){
                    //Ruta por metodo GET al cambiar de filtro.
                    filtro_tabla = (req.query.filtro_tabla===undefined)?"Nombre":req.query.filtro_tabla;
                    filtro_valor = "";
                    order_by = 1;
                    filtro_valor_f = "";
                    req.session.paginacion = paginacion_control.crear_paginacion(filas);
                }else{
                    //Ruta por metodo GET al cambiar de pagina.
                    req.session.paginacion = paginacion_control.actualizar_paginacion(filas,req.session.paginacion, req.query.pag);
                }
                req.session.configuracion = configuracion_lista.actualizar_configuracion_lista(req.session.configuracion.panel, estado,filtro_tabla, filtro_valor, filtro_valor_f, order_by);
                console.log(req.session.configuracion);
                res.render('home', {data_user: req.session.data_user, configuracion_lista: req.session.configuracion, filas: filas, paginacion: req.session.paginacion});
            }).catch((error)=>{
                console.log("Error: "+error);
                res.render('index');
            });
        }else{
            //Validamos el arbol de direcciones.
            //Listado de solicitudes Docente o Estudiante.
            var estado = req.session.configuracion.estado;
            var nivel = req.session.data_user.Nivel;
            //Ruta por metodo GET.
            var filtro_valor = req.query.filtro_valor;
            var filtro_tabla = req.query.filtro_tabla;
            var order_by = (req.query.order_by==1)?1:req.query.order_by;
            var filtro_valor_f = (req.query.filtro_valor_f=="")?"":req.query.filtro_valor_f;
            if(req.query.pag === undefined){
                //Ruta por metodo GET al cambiar de filtro.
                sql = lists_querys.admin_list_query(estado, filtro_tabla, "", "", 1);
            }else{
                //Ruta por metodo GET al cambiar por pagina.
                sql = lists_querys.admin_list_query(estado, filtro_tabla, filtro_valor, filtro_valor_f, order_by);
            }
            //Establecimiento de Promesa.
            let promesa = executeQuery(sql);
            //Ejecucion de Pormesa.
            promesa.then((filas) => {
                //Validacion de paginacion.
                if(req.query.pag === undefined){
                    //Ruta por metodo GET al cambiar de filtro.
                    filtro_tabla = (req.query.filtro_tabla===undefined)?"Nombre":req.query.filtro_tabla;
                    filtro_valor = "";
                    order_by = 1;
                    filtro_valor_f = "";
                    req.session.paginacion = paginacion_control.crear_paginacion(filas);
                }else{
                    //Ruta por metodo GET al cambiar de pagina.
                    req.session.paginacion = paginacion_control.actualizar_paginacion(filas,req.session.paginacion, req.query.pag);
                }
                req.session.configuracion = configuracion_lista.actualizar_configuracion_lista(req.session.configuracion.panel, estado,filtro_tabla, filtro_valor, filtro_valor_f, order_by);
                res.render('home', {data_user: req.session.data_user, configuracion_lista: req.session.configuracion, filas: filas, paginacion: req.session.paginacion});
            }).catch((error)=>{
                console.log("Error: "+error);
                res.render('index');
            });
        }
    }
}

//Procesos para peticiones POST
const proceso_listas_post = (req,res) => {
    /*Validamos que la peticion se ha realizada desde
    una session en ejecucion aun o estado activo.*/
    if(req.session.data_user === undefined){
        //Redigimiento, de session no activa.
        res.render('index');
    }else{
        var nivel = req.session.data_user.Nivel;
        var IdUsuario = req.session.IDusuario;
        if(nivel===1){
            //Dashboard Alumnov.
            sql = lists_querys.student_list_query(0,"","","",0);
            let promesa = executeQuery(sql);
            promesa.then((filas) => {
                req.session.paginacion = paginacion_control.crear_paginacion(filas);
                res.render('home', {data_user: req.session.data_user, configuracion_lista: req.session.configuracion, filas: filas, paginacion: req.session.paginacion});
            }).catch((error)=>{
                console.log("Error: "+error);
                res.render('index');
            });
        }else{
            //Dashboard Docente.
            //Listado de solicitudes pendientes Docente.
            var estado = 1; //1 -> Solictud Pendiente.
            //Ruta por metodo POST, al filtrar datos en la tabla.
            var filtro_tabla = req.body.filtro_tabla;
            var filtro_valor = req.body.filtro_valor;
            var filtro_valor_f = req.body.filtro_valor_f;
            var order_by = req.body.order_by;
            var sql = lists_querys.admin_list_query(estado, filtro_tabla, filtro_valor, filtro_valor_f, order_by);
            //Establecimiento de Promesa.
            console.log(sql);
            let promesa = executeQuery(sql);
            //Ejecucion de Pormesa.
            promesa.then((filas) => {
                //Validacion de paginacion.
                req.session.paginacion = paginacion_control.crear_paginacion(filas);
                req.session.configuracion = configuracion_lista.actualizar_configuracion_lista(req.session.configuracion.panel, estado, filtro_tabla, filtro_valor, filtro_valor_f, order_by);
                res.render('home', {data_user: req.session.data_user, configuracion_lista: req.session.configuracion, filas: filas, paginacion: req.session.paginacion});
            }).catch((error)=>{
                console.log("Error: "+error);
                res.render('index');
            });
        }
    }
}

//-----------------------------------------//
//-----------------------------------------//
//-----------------------------------------//

//-----------------------------------------//
//- FUNCIONES FLECHAS PARA PETICIONES DE  -//
//-      RUTAS POR METODO GET - POST      -//
//-----------------------------------------//

const dashboard_get = (req, res) =>{
    if(req.session.configuracion.panel !== "dashboard"){
        req.session.configuracion = configuracion_lista.actualizar_configuracion_lista("dashboard", 1, "Nombre", "", "", 1);
    }
    proceso_listas_get(req, res);
};

const dashboard_post = (req, res) =>{
    proceso_listas_post(req,res);
}; 

const pre_approve_list_get = (req, res) =>{
    if(req.session.configuracion.panel !== "pre_approve_list"){
        req.session.configuracion = configuracion_lista.actualizar_configuracion_lista("pre_approve_list", 2, "Nombre", "", "", 1);
    }
    proceso_listas_get(req, res);
}

const pre_approve_list_post = (req, res) =>{
    proceso_listas_post(req,res);
}

const deny_list_get = (req, res) =>{
    if(req.session.configuracion.panel !== "deny_list"){
        req.session.configuracion = configuracion_lista.actualizar_configuracion_lista("deny_list", 3, "Nombre", "", "", 1);
    }
    proceso_listas_get(req, res);
};

const deny_list_post = (req, res) =>{
    proceso_listas_post(req,res);
};


const approve_list_get = (req, res) =>{
    if(req.session.configuracion.panel !== "approve_list"){
        req.session.configuracion = configuracion_lista.actualizar_configuracion_lista("approve_list", 4, "Nombre", "", "", 1);
    }
    proceso_listas_get(req, res);
}

const approve_list_post = (req, res) =>{
    proceso_listas_post(req,res);
}

const maintenance = (req,res) =>{
    if(req.session.configuracion.panel !== "maintenance"){
        req.session.configuracion = configuracion_lista.actualizar_configuracion_lista("maintenance", 0, "Nombre", "", "", 1);
    }
    res.render('home', {data_user: req.session.data_user, configuracion_lista: req.session.configuracion}); 
};

const paycheck = (req,res) =>{
    if(req.session.configuracion.panel !== "paycheck"){
        req.session.configuracion = configuracion_lista.actualizar_configuracion_lista("maintenance", 0, "Nombre", "", "", 1);
    }
    res.render('home', {data_user: req.session.data_user, configuracion_lista: req.session.configuracion}); 
};

const configuration = (req,res) =>{
    if(req.session.configuracion.panel !== "configuration"){
        req.session.configuracion = configuracion_lista.actualizar_configuracion_lista("maintenance", 0, "Nombre", "", "", 1);
    }
    res.render('home', {data_user: req.session.data_user, configuracion_lista: req.session.configuracion}); 
};

const reports = (req,res) =>{
    if(req.session.configuracion.panel !== "reports"){
        req.session.configuracion = configuracion_lista.actualizar_configuracion_lista("reports", 0, "Nombre", "", "", 1);
    }
    res.render('home', {data_user: req.session.data_user, configuracion_lista: req.session.configuracion}); 
};


//-----------------------------------------//
//-----------------------------------------//
//-----------------------------------------//

const applicant_action = (req,res) =>{
    //Validamos que exista la sesion en uso.
    if(req.session.data_user === undefined){
        res.render('index');
    }else{
        //Session activa.
        //Guardamos los datos que vienen por metodo GET.
        var estado = req.session.configuracion.estado;
        var nuevo_estado = req.query.action;
        var id = req.query.id;
        //----------------------------------//        
        var sql = lists_querys.action_list_query(nuevo_estado, id);
        //----------------------------------//
        if(nuevo_estado>0){
            let promesa = executeUpdate(sql);
            promesa.then((filas) => {
                console.log(filas);
            }).catch((error)=>{
                console.log("Error: "+error);
                res.render('index');
            });
        }
        //----------------------------------//
        var filtro_valor = req.query.filtro_valor;
        var filtro_tabla = req.query.filtro_tabla;
        var order_by = (req.query.order_by==1)?1:req.query.order_by;
        var filtro_valor_f = (req.query.filtro_valor_f=="")?"":req.query.filtro_valor_f;
        if(req.query.pag === undefined){
            //Ruta por metodo GET al cambiar de filtro.
            sql = lists_querys.admin_list_query(estado, filtro_tabla, "", "", 1);
        }else{
            //Ruta por metodo GET al cambiar por pagina.
            sql = lists_querys.admin_list_query(estado, filtro_tabla, filtro_valor, filtro_valor_f, order_by);
        }
        //Validamos si no se intenta abrir la solicitud.
        if(nuevo_estado==0){
            sql = lists_querys.action_list_query(nuevo_estado, id);
        }
        //Establecimiento de Promesa.
        promesa = executeQuery(sql);
        //Ejecucion de la Promesa.
        promesa.then((filas) => {
            if(nuevo_estado>0){
                //No se esta intentando abrir la solicitud.
                if(req.query.pag === undefined){
                    //Ruta por metodo GET al cambiar de filtro.
                    filtro_tabla = (req.query.filtro_tabla===undefined)?"Nombre":req.query.filtro_tabla;
                    filtro_valor = "";
                    order_by = 1;
                    filtro_valor_f = "";
                    req.session.paginacion = paginacion_control.crear_paginacion(filas);
                }else{
                    //Ruta por metodo GET al cambiar de pagina.
                    req.session.paginacion = paginacion_control.actualizar_paginacion(filas, req.session.paginacion, req.query.pag);
                }
                //Le restamos uno, debido a que ya cambiamos el estado de uno de ellos
                req.session.configuracion = configuracion_lista.actualizar_configuracion_lista(req.session.configuracion.panel, estado, filtro_tabla, filtro_valor, filtro_valor_f, order_by);
                res.render('home', {data_user: req.session.data_user, configuracion_lista: req.session.configuracion, filas: filas, paginacion: req.session.paginacion});
            }else{
                //Redirigimos al usuario a ver la solicitud.
                var configuracion = req.session.configuracion;
                configuracion.panel = "applicant_view";
                res.render('home',{data_user: req.session.data_user, configuracion_lista: configuracion, filas: filas, imageTest: faker.image.avatar()});
            }
        }).catch((error)=>{
            console.log("Error: "+error);
            res.render('index');
        });
    }
}

const btns_float_action = (req, res) => {
    //Validamos que exista la sesion en uso.
    if(req.session.data_user !== undefined){        
        var nivel = req.session.data_user.Nivel;
        if(nivel===1){
            //Add_applicant
            res.render('home',{data_user: req.session.data_user, panel: "add_applicant"});
        }else{
            //Dashboard Admin.
            res.render('home',{data_user: req.session.data_user, panel: "add_applicant"});
        }
    }else{
        res.render('index');
    }
}

module.exports = {
    dashboard_get,
    dashboard_post,
    pre_approve_list_get,
    pre_approve_list_post,
    deny_list_get,
    deny_list_post,
    approve_list_get,
    approve_list_post,
    maintenance,
    paycheck,
    configuration,
    reports,
    applicant_action,
    btns_float_action,
};