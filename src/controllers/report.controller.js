//--------------------------------------//
const ejs = require("ejs");
const pdf = require("html-pdf");
const path = require("path");
//////////////////////////////////////////
//--------------------------------------//
//Importamos las configuraciones de la DB.
const executeQuery = require('../config/database/executeQuery');
const reports_querys = require('../helpers/reports_querys');
const reports_config = require('../helpers/reports_config');
//Direcciones relacionadas a reportes.

const report_download = (req, res)=>{
    var name_report = req.query.name_report;
    var file = 'src/public/files/'+name_report;
    res.download(file);
};

const report_test = (req, res) =>{
    var request = req.body;
    var data_user = req.session.data_user;
    var base_url = req.protocol + '://' + req.get('host');
    //---------------------------------
    var name_report = reports_config.nameReport(request.type_report,request.order_by);
    //----------------------------------
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
        //res.render('../views/reports/report_template',{titulo_reporte: type_report, filas: result});
        ejs.renderFile(path.join(__dirname, '../views/reports/', "report_template.ejs"),
            {titulo_reporte: request.type_report, filas: result},
        (err, data) => {
            if (err) {
                res.send(err);
            } else {
                let options = {
                    "format": 'A4',
                    "border": {
                        "top": "1.5cm",
                        "right": "1cm",
                        "bottom": "1cm",
                        "left": "1.5cm"
                      },
                    "header": {
                        "height": "2cm",
                        "contents": {
                            default: '<img src="assets/COVER-UTEC.jpg" alt="hola">'
                        }
                    },
                    "footer": {
                        "height": "2cm",
                        "contents": {
                            default: reports_config.pagFooter(data_user),
                        }
                    },
                    "base": base_url
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
        res.render('index', {info_error: 'Error interno.'});
    });
};

module.exports = {
    report_test,
    report_download,
}