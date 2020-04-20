$(document).ready(function(){
    //(123) 456-7890
    $('input[type=tel]').mask("(999) 9999-9999",{placeholder:""});
    $('input[name=DUI]').mask("99999999-9",{placeholder:""});
    $('input[name=NIT]').mask("9999-999999-999-9",{placeholder:""});

    function probadorCampos(tag){
        console.log($("input[name='"+tag+"']").val());
    }    

    function validarCampoVacio(tag){
        var objecto = $("input[name='"+tag+"']");
        var valor = objecto.val();
        if(valor.length == 0){
            objecto.siblings("p").remove();
            objecto.after('<p class="advertencia" style="color: red;">Este campo es requerido<p>');
            return false;
        }else{
            objecto.siblings("p").remove();
            return true;
        }
    }

    function validarEmail(tag){
        var objecto = $("input[name='"+tag+"']");
        var valor = objecto.val();
        var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var regOficial = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      
        //Se muestra un texto a modo de ejemplo, luego va a ser un icono
        if (reg.test(valor) && regOficial.test(valor)) {
            objecto.siblings("p").remove();
            return true;
        } else if (reg.test(valor)) {
            objecto.siblings("p").remove();
            return true;
        } else {
            objecto.siblings("p").remove();
            objecto.after('<p class="advertencia" style="color: red;">Email no valido.<p>');
            return false;
        }
    }

    function validarPassword(tag){
        var objecto = $("input[name='"+tag+"']");
        var valor = objecto.val();
        var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,16}$/;
        //Se muestra un texto a modo de ejemplo, luego va a ser un icono
        if (regex.test(valor)) {
            objecto.siblings("p").remove();
            return true;
        } else {
            objecto.siblings("p").remove();
            objecto.after('<p class="advertencia" style="color: red;">La contraseña debe contener de 8 a 16 caracteres, una letra minuscula, una mayuscula, un digito y un caracter especial.<p>');
            return false;
        }
    }

    function validarCampoNumerico(tag, minimo, maximo, label){
        var objecto = $("input[name='"+tag+"']");
        var valor = objecto.val();
        if(valor.length == 0){
            objecto.siblings("p").remove();
            objecto.after('<p class="advertencia" style="color: red;">Este campo es requerido<p>');
            return false;
        }else{
            if(valor < minimo || valor > maximo){
                objecto.siblings("p").remove();
                objecto.after('<p class="advertencia" style="color: red;">El valor de '+label+' no es valido, digita un valor entre '+minimo+' y '+maximo+'.<p>');
                return false;
            }else{
                objecto.siblings("p").remove();
                return true;
            }
        }
    }

    function validarNumTelefonico(tag){
        var objecto = $("input[name='"+tag+"']");
        var valor = objecto.val();
        console.log(valor);
        var regex = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{4}[-\s\.]{0,1}[0-9]{4}$/;
        if (regex.test(valor)) {
            objecto.siblings("p").remove();
            return true;
        } else {
            objecto.siblings("p").remove();
            objecto.after('<p class="advertencia" style="color: red;">Formato de Telefono incorrecto.<p>');
            return false;
        }
    }

    function validarSeleccion(tag){
        var objecto = $("#"+tag);
        var x = document.getElementById(tag).selectedIndex;
        var y = document.getElementById(tag).options;
        var valor = y[x].index;
        if(valor == 0){
            objecto.siblings("p").remove();
            objecto.after('<p class="advertencia" style="color: red;">Selecciona una Opcion.<p>');
            return false;
        }else{
            objecto.siblings("p").remove();
            return true;
        }
    }

    $(".submit").click(function(){
        var token = false;
        //Obtener el valor del objeto.
        probadorCampos("fechaNacimiento");
        //Validamos que los campos no esten vacios.
        if(/*validarCampoVacio('nombreUsuario') && validarCampoVacio('apellidoUsuario') && validarEmail('email')
        && validarSeleccion('Ciclo') && validarPassword('password') && validarCampoNumerico('edadU',15,70,'edad')
        &&*/ validarNumTelefonico('telefonoUsuario')){
            return true;
        }else{
            return false;
        }
    })
});