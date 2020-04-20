//Rutas del Servidor.
//Requerimientos necesarios.
const express = require('express');
const router = express.Router();
//Importamos el modulo mssql.
const sql = require("mssql");
//Controladores
const session_controller = require('../controllers/session.controller');
const validation_controller = require('../controllers/validation.controller');
const user_controller = require('../controllers/user.controller');
const report_controller = require('../controllers/report.controller');
const api_user = require('../controllers/api.user.controler');
const pagination_controller = require('../controllers/pagination.controller');
//Rutas al Sitio.
//----------------------------------
//Rutas de validacion del sistema.
router.get('' || '/', validation_controller.index);
router.get('/login', validation_controller.index);
router.get('/index' || 'index', validation_controller.index);
//----------------------------------
//Rutas de sesion, navegacion & registro.
router.get('/logout' , session_controller.logout);
router.post('/login', session_controller.startLogin);
router.post('/sign_in', session_controller.sign_in);
router.get('/sign_in', (req, res)=>{res.render('sing_in');});
router.get('/new_applicant', session_controller.id_applicant);
router.post('/new_applicant', session_controller.new_applicant);
//Rutas por menu.
router.get('/dashboard', user_controller.dashboard_get);
router.post('/dashboard', user_controller.dashboard_post);
router.get('/approve_list', user_controller.approve_list_get);
router.post('/approve_list', user_controller.approve_list_post);
router.get('/deny_list', user_controller.deny_list_get);
router.post('/deny_list', user_controller.deny_list_post);
router.get('/pre_approve_list', user_controller.pre_approve_list_get);
router.post('/pre_approve_list', user_controller.pre_approve_list_post);
router.get('/maintenance', user_controller.maintenance);
router.get('/paycheck', user_controller.paycheck);
router.get('/configuration', user_controller.configuration);
router.get('/reports', user_controller.reports);
//Rutas de accion del usuario por eventos.
router.all('/add_applicant', user_controller.btns_float_action);
router.get('/applicant_action', user_controller.applicant_action);
//Rutas de reportes.
router.get('/report_test', report_controller.report_test);
router.post('/report',report_controller.report_test);
router.get('/report_download',report_controller.report_download);
//Rutas de vistas de Maquetacion.
router.get('/vistaReporte', (req,res)=>{res.render('../views/reports/report_template',{});});
/*Direccionamiento a la API Rest de Produccion,  para
    los usuarios moviles y Desktop*/
//--------------------------------------------------//
//Direccionamiento a la API Rest de testing y dev.
//API del Server.
router.get('/API/test/select', api_user.api_user_slc_controller);
router.get('/API/test/api_user_image', api_user.api_user_image);
router.get('/API/test/select_applicantion', api_user.api_application_slc_controller);
router.get('/API/test/deleteAll', api_user.api_delete_all);
//Esportacion de las rutas, definidas.
module.exports = router;