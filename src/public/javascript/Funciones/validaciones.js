$(document).ready(function(){
    //Formateo de Campos.
    //Formularios en general.
    $('input[type=tel]').mask("(999) 9999-9999",{placeholder:""});
    //Formulario Crear Usuario.
    $('input[name=DUI]').mask("99999999-9",{placeholder:""});
    $('input[name=NIT]').mask("9999-999999-999-9",{placeholder:""});
    $('input[name=carnet]').mask("99-9999-9999",{placeholder:""});
    //Formulario Aplicar a Beca.
    $('input[name=MadreNU]').prop('readonly', true);
    $('input[name=MadreAU]').prop('readonly', true);
    $('input[name=TrabajoMU]').prop('readonly', true);
    $('input[name=LugarTrabajoMU]').prop('readonly', true);
    $('input[name=TelefonoTMU]').prop('readonly', true);
    $('input[name=TelefonoRMU]').prop('readonly', true);
    $('input[name=CelularMU]').prop('readonly', true);

    function probadorCampos(tag){
        console.log($("input[name='"+tag+"']").val());
    }    

    function removedorAdvertencia(){
        var objecto = $("input[type=text]");
        objecto.siblings("p").remove();
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

    function desabilitarSelect(tag, estado){
        if(estado){
            $('#'+tag).find("option:not(:selected)").hide().attr("disabled",estado);
        }else{
            $('#'+tag).find("option:not(:selected)").show().attr("disabled",estado);
        }
    }

    $("input[name=radio_familia]").click(function () {
        var tokenP = false;
        var tokenM = false;
        var valor = $(this).val();
        if($(this).val()==1){
            //PAPA.
            tokenP = false;
            tokenM = true;
        }else if($(this).val()==2){
            //MAMA.
            tokenM = false;
            tokenP = true;
        }else if($(this).val()==3){
            //AMBOS
            tokenP = false;
            tokenM = false;
        }else{
            tokenP = true;
            tokenM = true;
        }
        //PAPA
        $('input[name=PadreNU]').prop('readonly', tokenP);
        $('input[name=PadreAU]').prop('readonly', tokenP);
        $('input[name=TrabajoPU]').prop('readonly', tokenP);
        $('input[name=LugarTrabajoPU]').prop('readonly', tokenP);
        $('input[name=TelefonoTPU]').prop('readonly', tokenP);
        $('input[name=TelefonoRPU]').prop('readonly', tokenP);
        $('input[name=CelularPU]').prop('readonly', tokenP);
        //MAMA
        $('input[name=MadreNU]').prop('readonly', tokenM);
        $('input[name=MadreAU]').prop('readonly', tokenM);
        $('input[name=TrabajoMU]').prop('readonly', tokenM);
        $('input[name=LugarTrabajoMU]').prop('readonly', tokenM);
        $('input[name=TelefonoTMU]').prop('readonly', tokenM);
        $('input[name=TelefonoRMU]').prop('readonly', tokenM);
        $('input[name=CelularMU]').prop('readonly', tokenM);
    });

    $("input[name=radio_trabaja]").click(function () {
        var token = false;
        if($(this).val()==1){
            token = false;
        }else{
            token = true;
        }
        $('input[name=LugarTU]').prop('readonly', token);
        $('input[name=TelefonoLugarTU]').prop('readonly', token);
        desabilitarSelect("TiempoTrabajando", token);
        desabilitarSelect("SalarioAproximado", token);
        $('input[name=NJIU]').prop('readonly', token);
        $('input[name=TelefonoNJIU]').prop('readonly', token);
        $('input[name=PuestoTrabajoU]').prop('readonly', token);
        $('input[name=TelefonoPuestoTrabajoU]').prop('readonly', token);
        $('input[name=ConstanciaSueldo]').prop('readonly', token);
    });

    $("input[name=radio_horas]").click(function () {
        var token = false;
        if($(this).val()==1){
            token = false;
        }else{
            token = true;
        }
        desabilitarSelect("HorasSociales", token);
    });

    function obtenerValRdn(tag){
        return $("input:radio[name="+tag+"]:checked").val();
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
        var token = false;
        removedorAdvertencia();
        //Validamos el apartado numero 1
        if(validarNumTelefonico('celularUsuario', true) && validarSeleccion('Ciclo') && validarCampoNumerico('numeroHijos', 0, 10, 'cantidad de hijos')
        && validarCampoNumerico('CUM',0,10,'CUM') && validarSeleccion('RubroBeca')){
            //Validamos el apartado numero 2
            if(obtenerValRdn('radio_familia')==1){
                //Validamos los datos del padre.
                alert('validando P');
                if(validarCampoVacio('PadreNU') && validarCampoVacio('PadreAU') && validarCampoVacio('TrabajoPU') && 
                validarCampoVacio('LugarTrabajoPU') && validarNumTelefonico('TelefonoTPU', true) && validarNumTelefonico('TelefonoRPU', true) &&
                validarNumTelefonico('CelularPU', false)){
                    token = true;
                }else{
                    token = false;
                }
            }else if(obtenerValRdn('radio_familia')==2){
                //Validamos los datos de la madre.
                alert('validando M');
                if(validarCampoVacio('MadreNU') && validarCampoVacio('MadreAU') && validarCampoVacio('TrabajoMU') && 
                validarCampoVacio('LugarTrabajoMU') && validarNumTelefonico('TelefonoTMU', true) && validarNumTelefonico('TelefonoRMU', true) &&
                validarNumTelefonico('CelularMU', false)){
                    token = true;
                }else{
                    token = false;
                }
            }else{
                //Validamos los datos de ambos.
                alert('validando A');
                if(validarCampoVacio('PadreNU') && validarCampoVacio('PadreAU') && validarCampoVacio('TrabajoPU') && 
                validarCampoVacio('LugarTrabajoPU') && validarNumTelefonico('TelefonoTPU', true) && validarNumTelefonico('TelefonoRPU', true) &&
                validarNumTelefonico('CelularPU', false) && validarCampoVacio('MadreNU') && validarCampoVacio('MadreAU') && validarCampoVacio('TrabajoMU') && 
                validarCampoVacio('LugarTrabajoMU') && validarNumTelefonico('TelefonoTMU', true) && validarNumTelefonico('TelefonoRMU', true) &&
                validarNumTelefonico('CelularMU', false)){
                    token = true;
                }else{
                    token = false;
                }
            }
            //Validamos el apartado 3
            if(token){
                if(obtenerValRdn('radio_trabaja')==1){
                    //Validamos los datos del trabajo.
                    if(validarCampoVacio('LugarTU') && validarNumTelefonico('TelefonoLugarTU', true) && validarSeleccion('TiempoTrabajando')
                    && validarSeleccion('SalarioAproximado') && validarCampoVacio('NJIU') && validarNumTelefonico('TelefonoNJIU', true)
                    && validarCampoVacio('PuestoTrabajoU') && validarNumTelefonico('TelefonoPuestoTrabajoU', true)){
                        token = true;
                    }else{
                        token = false;
                    }
                }else{
                    token = true;
                }
            }else{
                token = false;
            }
            //Validamos el apartado 4
            if(token){
                //Validamos los datos de estudio minimo.
                if(validarCampoVacio('EducacionBU') && validarCampoVacio('EducacionMU')){
                    token = true;
                    //Validamos el select de horas sociales.
                    if(obtenerValRdn('radio_horas')==1){
                        if(validarSeleccion('HorasSociales')){
                            token = true;
                        }else{
                            token = false;
                        }
                    }
                }else{
                    token = false;
                }
            }else{
                token = false;
            }
        }else{
            token=false;
        }
        //retornamos el valor.
        return token;
    });

});