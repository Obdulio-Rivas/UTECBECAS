$(document).ready(function(){

  $('.modal-confirmar').click(function(e){
    e.preventDefault();
    //Configuramos nuestro modal.
    var titulo_modal = this.id;
    var href = $(this).attr('href'); //Obteneros el href del enlace presionado.
    var name_modal = "modal-confirmar"; //Nombre del modal a mostrar.
    var modal = document.getElementById(name_modal);
    $(modal).find("#confirmar").attr('href',href);
    $(modal).find(".titulo-modal").html(titulo_modal);
    $(modal).find(".info-modal").text("¿Desea realmente "+titulo_modal+" la solicitud?");
    $(modal).find(".btn-cancel").attr('id',name_modal);
    modal.style.display = "block";
  });

  $('#User-Seting').click(function(e){
    e.preventDefault();
    //Capturamos los valores del enlace presionado.
    var btn = this.id; //id del boton eliminar
    var id = $(this).children("i").attr("id");  //id del icono eliminar (id del registro);
    //Mas codigo.
    var name_modal = "modal-"+btn;
    var modal = document.getElementById(name_modal);
    $(modal).find("#id_registro").attr("value",id);
    $(modal).find(".info-modal").text("");
    modal.setAttribute("id","modal-open");
    modal.style.display = "block";
  });

  $('.btn-cancel').click(function(e){
    e.preventDefault();
    //Capturamos los valores del enlace presionado.
    var name_modal = this.id;
    var modal = document.getElementById(name_modal);
    modal.style.display = "none";
  });

});