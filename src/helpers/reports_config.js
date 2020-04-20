const moment = require('moment');

const nameReport = ((type_report,order_by)=>{
    return 'Reporte-'+type_report+'-'+order_by+'-'+moment().format('YYYYMMDD')+'.pdf';
});

const pagHeader = ((datos,base_url)=>{
    var contenido = '<img src="'+base_url+'public/assets/UtecBrand.png" alt="Imagen de UTEC"><br>';
    contenido = contenido + '<span style="color: #444; font-size: 18px;">Universidad Tecnológica de El Salvador.</span>';
    return contenido;
});

const pagFooter = ((datos)=>{
    var contenido = '<div style="color: #444; border-top: 1px solid #ddd; padding-top: 0px;">Fecha: '+moment().format('L')+'</div>';
    contenido = contenido + '<div style="color: #444;">Universidad Tecnológica de El Salvador.</div>';
    contenido = contenido + '<div style="color: #444;">'
    contenido = contenido + '<div style="width:100%;">Realizado por '+datos.Nombre+' '+datos.Apellido+'<span style="color: #444; display:block; width:auto; text-align: right; float: right;">Pag: {{page}}/{{pages}}</span></div>';
    contenido = contenido + '</div>';
    return contenido;
});

module.exports = {
    nameReport,
    pagHeader,
    pagFooter,
}