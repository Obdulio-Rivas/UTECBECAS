$(document).ready(function(){
    //Formateo de Campos.
    //Formulario Crear Usuario.
    $('input[type=tel]').mask("(999) 9999-9999",{placeholder:""});
    $('input[name=DUI]').mask("99999999-9",{placeholder:""});
    $('input[name=NIT]').mask("9999-999999-999-9",{placeholder:""});
    $('input[name=carnet]').mask("99-9999-9999",{placeholder:""});
    //Formulario Aplicar a Beca.

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
        var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,16}$/;
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

    function validarNumTelefonico(tag, noValidarOpcion){
        var objecto = $("input[name='"+tag+"']");
        var valor = objecto.val();
        console.log(valor);
        var regex = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{4}[-\s\.]{0,1}[0-9]{4}$/;
        if(noValidarOpcion){
            if (regex.test(valor)) {
                objecto.siblings("p").remove();
                return true;
            } else {
                objecto.siblings("p").remove();
                objecto.after('<p class="advertencia" style="color: red;">Formato de Telefono incorrecto.<p>');
                return false;
            }
        }else{
            return true;
        }
    }

    function validarNumCarnet(tag){
        var objecto = $("input[name='"+tag+"']");
        var valor = objecto.val();
        console.log(valor);
        var regex = /^[0-9]{2}[-]{0,1}[0-9]{4}[-]{0,1}[0-9]{4}$/;
        if (regex.test(valor)) {
            objecto.siblings("p").remove();
            return true;
        } else {
            objecto.siblings("p").remove();
            objecto.after('<p class="advertencia" style="color: red;">Formato de carnet incorrecto.<p>');
            return false;
        }
    }

    function validarNumDUI(tag){
        var objecto = $("input[name='"+tag+"']");
        var valor = objecto.val();
        console.log(valor);
        var regex = /^[0-9]{8}[-]{0,1}[0-9]{1}$/;
        if (regex.test(valor)) {
            objecto.siblings("p").remove();
            return true;
        } else {
            objecto.siblings("p").remove();
            objecto.after('<p class="advertencia" style="color: red;">Formato de DUI incorrecto.<p>');
            return false;
        }
    }
    
    function validarNumNIT(tag){
        var objecto = $("input[name='"+tag+"']");
        var valor = objecto.val();
        console.log(valor);
        var regex = /^[0-9]{4}[-]{0,1}[0-9]{6}[-]{0,1}[0-9]{3}[-]{0,1}[0-9]{1}$/;
        if (regex.test(valor)) {
            objecto.siblings("p").remove();
            return true;
        } else {
            objecto.siblings("p").remove();
            objecto.after('<p class="advertencia" style="color: red;">Formato de NIT incorrecto.<p>');
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

    function submitCrearUsuario(){
        //Validamos que los campos no esten vacios.
        if(validarCampoVacio('nombreUsuario') && validarCampoVacio('apellidoUsuario') && validarCampoVacio('fechaNacimiento')
        && validarNumCarnet('carnet') && validarSeleccion('carrera') && validarCampoVacio('direccion')
        && validarCampoNumerico('edadU',15,70,'edad') && validarNumDUI('DUI') && validarNumNIT('NIT')
        && validarEmail('email') && validarPassword('password') && validarSeleccion('Ciclo')
        && validarCampoNumerico('CUM',0,10,'CUM') && validarNumTelefonico('telefonoUsuario', false)
        && validarNumTelefonico('celularUsuario', true)){
            return true;
        }else{
            return false;
        }
    }

    function submitAplicarBeca(){
        //Validamos que los campos no esten vacios.
        if(true){
            return true;
        }else{
            return false;
        }
    }

    $('.submitCrearUsuario').click(function(){
        //Validamos que los campos no esten vacios.
        if(validarCampoVacio('nombreUsuario') && validarCampoVacio('apellidoUsuario') && validarCampoVacio('fechaNacimiento')
        && validarNumCarnet('carnet') && validarSeleccion('carrera') && validarCampoVacio('direccion')
        && validarCampoNumerico('edadU',15,70,'edad') && validarNumDUI('DUI') && validarNumNIT('NIT')
        && validarEmail('email') && validarPassword('password') && validarSeleccion('Ciclo')
        && validarCampoNumerico('CUM',0,10,'CUM') && validarNumTelefonico('telefonoUsuario', false)
        && validarNumTelefonico('celularUsuario', true)){
            return true;
        }else{
            return false;
        }
    });

    $('.submitAplicarBeca').click(function(){
        submitAplicarBeca();
    });

});