$(document).ready(function(){
    
    $('.order_rpt').click(function(e){
        e.preventDefault();
        //Capturamos los valores del enlace presionado.
        var id_control = this.id;
        var id_orden = document.getElementById("order_rpt_"+id_control);
        id_orden.innerHTML=this.innerHTML;
        //////////////////////////////////
    });

    $('.order_rpt_date').click(function(e){
        e.preventDefault();
        var btn = this.id; //id del boton eliminar
        var id = $(this).children("span").attr("id");
        var id_orden = document.getElementById("order_rpt_"+id);
        var order_by = this.innerHTML;
        id_orden.innerHTML=this.innerHTML;
        //Mas codigo.
        var name_modal = "modal-"+btn;
        console.log(btn);
        var modal = document.getElementById(name_modal);
        $(modal).find("#name_report").attr("value",id);
        $(modal).find("#order_by").attr("value","Rango de Fecha");
        $(modal).find(".info-modal").text("Establesca fechas de comienzo y fin para la informacion del reporte.");
        modal.setAttribute("id","modal-open");
        modal.style.display = "block";
        //////////////////////////////////
    });

    $('.generate_rpt').click(function(e){
        e.preventDefault();
        //Capturamos los valores del enlace presionado.
        var btn = this.id; //id del boton eliminar
        var report = $(this).children("span").attr("id");
        var order_by = document.getElementById("order_rpt_"+report).innerHTML;
        //Mas codigo.
        var name_modal = "modal-"+btn;
        var modal = document.getElementById(name_modal);
        $(modal).find("#name_report").attr("value",report);
        $(modal).find("#order_by").attr("value",order_by);
        $(modal).find(".info-modal").text("¿Desea realmente generar el reporte?");
        modal.setAttribute("id","modal-open");
        modal.style.display = "block";
    });
    
    $('#grid').click(function(e){
        e.preventDefault();
        //Capturamos los valores del enlace presionado.
        var id_table = "#table_list";
        var id_controler = this.id;
        //////////////////////////////////
        var table = document.getElementById(id_table);
        console.log(table);
        table.setAttribute("class","grid-view-table");
    });

    $('#list').click(function(e){
        e.preventDefault();
        //Capturamos los valores del enlace presionado.
        var id_table = "#table_list";
        var id_controler = this.id;
        //////////////////////////////////
        var table = document.getElementById(id_table);
        table.removeAttribute("class","grid-view-table");
    });

    $('#back_button').click(function(e){
        e.preventDefault();
        window.history.back();
    });

    $('#block_part_1').click(function(e){
        e.preventDefault();
        //Capturamos los valores del enlace presionado.
        var id_block_part_1 = document.getElementById('block_part_1');
        var id_block_part_2 = document.getElementById('block_part_2');
        var id_block_part_3 = document.getElementById('block_part_3');
        var id_block_part_4 = document.getElementById('block_part_4');
        var block_content_1 = document.getElementById('content_block_part_1');
        var block_content_2 = document.getElementById('content_block_part_2');
        var block_content_3 = document.getElementById('content_block_part_3');
        var block_content_4 = document.getElementById('content_block_part_4');
        if(!id_block_part_1.classList.contains("controler-content-activated")){
            id_block_part_1.classList.add("controler-content-activated");
            id_block_part_2.classList.remove("controler-content-activated");
            id_block_part_3.classList.remove("controler-content-activated");
            id_block_part_4.classList.remove("controler-content-activated");
            block_content_1.classList.remove("block-content-none");
            block_content_2.classList.add("block-content-none");
            block_content_3.classList.add("block-content-none");
            block_content_4.classList.add("block-content-none");
        }
    });

    $('#block_part_2').click(function(e){
        e.preventDefault();
        //Capturamos los valores del enlace presionado.
        var id_block_part_1 = document.getElementById('block_part_1');
        var id_block_part_2 = document.getElementById('block_part_2');
        var id_block_part_3 = document.getElementById('block_part_3');
        var id_block_part_4 = document.getElementById('block_part_4');
        var block_content_1 = document.getElementById('content_block_part_1');
        var block_content_2 = document.getElementById('content_block_part_2');
        var block_content_3 = document.getElementById('content_block_part_3');
        var block_content_4 = document.getElementById('content_block_part_4');
        if(!id_block_part_2.classList.contains("controler-content-activated")){
            id_block_part_2.classList.add("controler-content-activated");
            id_block_part_1.classList.remove("controler-content-activated");
            id_block_part_3.classList.remove("controler-content-activated");
            id_block_part_4.classList.remove("controler-content-activated");
            block_content_2.classList.remove("block-content-none");
            block_content_1.classList.add("block-content-none");
            block_content_3.classList.add("block-content-none");
            block_content_4.classList.add("block-content-none");
        }
    });

    $('#block_part_3').click(function(e){
        e.preventDefault();
        //Capturamos los valores del enlace presionado.
        var id_block_part_1 = document.getElementById('block_part_1');
        var id_block_part_2 = document.getElementById('block_part_2');
        var id_block_part_3 = document.getElementById('block_part_3');
        var id_block_part_4 = document.getElementById('block_part_4');
        var block_content_1 = document.getElementById('content_block_part_1');
        var block_content_2 = document.getElementById('content_block_part_2');
        var block_content_3 = document.getElementById('content_block_part_3');
        var block_content_4 = document.getElementById('content_block_part_4');
        if(!id_block_part_3.classList.contains("controler-content-activated")){
            id_block_part_3.classList.add("controler-content-activated");
            id_block_part_1.classList.remove("controler-content-activated");
            id_block_part_2.classList.remove("controler-content-activated");
            id_block_part_4.classList.remove("controler-content-activated");
            block_content_3.classList.remove("block-content-none");
            block_content_1.classList.add("block-content-none");
            block_content_2.classList.add("block-content-none");
            block_content_4.classList.add("block-content-none");
        }
    });

    $('#block_part_4').click(function(e){
        e.preventDefault();
        //Capturamos los valores del enlace presionado.
        var id_block_part_1 = document.getElementById('block_part_1');
        var id_block_part_2 = document.getElementById('block_part_2');
        var id_block_part_3 = document.getElementById('block_part_3');
        var id_block_part_4 = document.getElementById('block_part_4');
        var block_content_1 = document.getElementById('content_block_part_1');
        var block_content_2 = document.getElementById('content_block_part_2');
        var block_content_3 = document.getElementById('content_block_part_3');
        var block_content_4 = document.getElementById('content_block_part_4');
        if(!id_block_part_4.classList.contains("controler-content-activated")){
            id_block_part_4.classList.add("controler-content-activated");
            id_block_part_1.classList.remove("controler-content-activated");
            id_block_part_2.classList.remove("controler-content-activated");
            id_block_part_3.classList.remove("controler-content-activated");
            block_content_4.classList.remove("block-content-none");
            block_content_1.classList.add("block-content-none");
            block_content_2.classList.add("block-content-none");
            block_content_3.classList.add("block-content-none");
        }
    });
  });