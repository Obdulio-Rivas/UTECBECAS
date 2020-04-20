$(document).ready(function(){
    var discos = $('#cbox_horarios');
    var disco_sel = $('#disco_sel');
    
    //Ejecutar accion al cambiar de opcion en el select de las bandas
    $('#campo_Fecha_Cita').change(function(){
        var banda_id = $(this).val(); //obtener el id seleccionado
        console.log(banda_id);
        $.ajax({
            type:"POST",
            url:"../Componentes/JS/Procesos/get_horarios.php",
            data:"fecha=" + $('#campo_Fecha_Cita').val(),
            success:function(r){
                $('#cbox_horarios').html(r);
            }
        });
    });
});