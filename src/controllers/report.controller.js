//--------------------------------------//
const ejs = require("ejs");
const pdf = require("html-pdf");
const path = require("path");
const moment = require('moment');
//////////////////////////////////////////
//--------------------------------------//
//Importamos las configuraciones de la DB.
const executeQuery = require('../config/database/executeQuery');
const reports_querys = require('../helpers/reports_querys');

//Direcciones relacionadas a reportes.

const report_download = (req, res)=>{
    var name_report = req.query.name_report;
    var file = 'src/public/files/'+name_report;
    res.download(file);
};

const report_list = (req, res) =>{
    var request = req.body;
    var data_user = req.session.data_user;
    var type_report = request.type_report;
    var order_by = request.order_by;
    var fecha_actual = moment().format('DDMMYYYY');
    //---------------------------------
    //Nombre del reporte.
    var name_report = `Reporte-${type_report}-${order_by}-${fecha_actual}.pdf`;
    //----------------------------------
    //Validacion por reporte en rangos de fechas.
    if(request.order_by !== "Rango de Fecha"){
        var sql = reports_querys.report_query(request.type_report,request.order_by,0);
    }else{
        var date = [
            request.date_start,
            request.date_end,]
        var sql = reports_querys.report_query(request.type_report,request.order_by,date);
    }
    let promesa = executeQuery(sql);
    promesa.then(function(result){
        ejs.renderFile(path.join(__dirname, '../views/reports/', "report_list_template.ejs"),
            {titulo_reporte: request.type_report, datos: data_user, moment: moment, filas: result},
        (err, data) => {
            if (err) {
                res.send(err);
            } else {
                let options = {
                    "format": 'A4',
                    "border": {
                        "top": "1cm",
                        "right": "1cm",
                        "bottom": "0.5cm",
                        "left": "1.5cm"
                    },
                };
                pdf.create(data, options).toFile("src/public/files/"+name_report, function (err, data) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.redirect('/report_download?name_report='+name_report);
                    }
                });
            }
        });
    }).catch((error)=>{
        console.log("Error: "+error);
        res.render('index', {info_error: 'Error interno al generar el reporte.'});
    });
};

const report_test = (req, res) =>{
    var request = req.body;
    var data_user = req.session.data_user;
    var type_report = request.type_report;
    var order_by = request.order_by;
    var fecha_actual = moment().format('DDMMYYYY');
    //---------------------------------
    //Nombre del reporte.
    var name_report = `Reporte-${type_report}-${order_by}-${fecha_actual}.pdf`;
    //----------------------------------
    //Validacion por reporte en rangos de fechas.
    if(request.order_by !== "Rango de Fecha"){
        var sql = reports_querys.report_query(request.type_report,request.order_by,0);
    }else{
        var date = [
            request.date_start,
            request.date_end,]
        var sql = reports_querys.report_query(request.type_report,request.order_by,date);
    }
    let promesa = executeQuery(sql);
    promesa.then(function(result){
        ejs.renderFile(path.join(__dirname, '../views/reports/', "report_list_template.ejs"),
            {titulo_reporte: request.type_report, datos: data_user, moment: moment, filas: result},
        (err, data) => {
            if (err) {
                res.send(err);
            } else {
                let options = {
                    "format": 'A4',
                    "border": {
                        "top": "0cm",
                        "right": "1cm",
                        "bottom": "0.5cm",
                        "left": "1.5cm"
                    },
                };
                pdf.create(data, options).toFile("src/public/files/"+name_report, function (err, data) {
                    if (err) {
                        res.send(err);
                    } else {
                        res.redirect('/report_download?name_report='+name_report);
                    }
                });
            }
        });
    }).catch((error)=>{
        console.log("Error: "+error);
        res.render('index', {info_error: 'Error interno al generar el reporte.'});
    });
};

module.exports = {
    report_test,
    report_list,
    report_download,
}