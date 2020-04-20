//Importamos las configuraciones de la DB.
const executeUpdate = require('../config/database/executeUpdate');
const executeQuery = require('../config/database/executeQuery');
const paginacion_control = require('../helpers/paginacion_control');
const configuracion_lista = require('../helpers/configuracion_lista');
const lists_querys = require('../helpers/lists_querys');
//Direcciones relacionadas a sessiones.

const logout = (req, res) =>{
    req.session.destroy();
    res.render('index');
};


const startLogin = (req, res) => {
    //Validamos que no hayan campos vacios.
    if (!req.body.email || !req.body.password) {
        //Se direcciona al login.
        res.render('index', {info_error: 'Hay campos vacios.'});
    }else{
        //Validamos si existe ese usuario.
        var user_email = req.body.email;
        var user_pwr = req.body.password;
        var btn_login = req.body.submit_login;
        var sql = "Select * from Usuarios WHERE Email = '"+user_email+"' AND Pwr = '"+user_pwr+"' AND Estado = 1";
        let promesa = executeQuery(sql);
        promesa.then(function(result){
            var num_rows = result.length;
            console.log(num_rows);
            if(num_rows > 1){
                //Estado del Usuario.
                var estado = result[0].Estado;
                if(estado === 1){
                    //Usuario (Estudiante).
                    nivel = result[0].Nivel; //1- Alumno, 2-Docente
                    if(nivel === 1){
                        if(btn_login==="Alumno"){
                            //Usuario (Estudiante).
                            //Variables de Session user.
                            req.session.data_user = result[0];
                            var id_usuario = req.session.data_user['IDusuario'];
                            req.session.configuracion = configuracion_lista.actualizar_configuracion_lista("dashboard",1,"Estado","","",1);
                            req.session.configuracion.estado = 0;
                            sql = lists_querys.student_list_query(req.session.configuracion.estado, id_usuario, req.session.configuracion.filtro_tabla, "", "", req.session.configuracion.order_by);
                            promesa = executeQuery(sql);
                            promesa.then((filas) => {
                                console.log('Alumno entrando');
                                req.session.paginacion = paginacion_control.crear_paginacion(filas);
                                res.render('home',{data_user: req.session.data_user, configuracion_lista: req.session.configuracion, filas: filas, paginacion: req.session.paginacion});
                            }).catch((error)=>{
                                console.log("Error: "+error);
                            });
                        }else{
                            res.render('index', {info_error: 'Usuario o contrañesa equivocado.'});
                        }
                    }else if(nivel === 2){
                        if (btn_login==="Docente") {
                            //Variables de Session.
                            req.session.data_user = result[0];
                            req.session.configuracion = configuracion_lista.crear_configuracion_lista();
                            sql = lists_querys.admin_list_query(req.session.configuracion.estado, req.session.configuracion.filtro_tabla, "", "", req.session.configuracion.order_by);
                            promesa = executeQuery(sql);
                            promesa.then((filas) => {
                                console.log('Admin entrando');                                                                
                                req.session.paginacion = paginacion_control.crear_paginacion(filas);
                                req.session.configuracion = configuracion_lista.crear_configuracion_lista();
                                res.render('home',{data_user: req.session.data_user, configuracion_lista: req.session.configuracion, filas: filas, paginacion: req.session.paginacion});
                            }).catch((error)=>{
                                console.log("Error: "+error);
                            });
                        }else{
                            res.render('index', {info_error: 'Usuario o contrañesa equivocado.'});
                        }
                    }
                }else{
                    //Usuario Incorrecto.
                    console.log("Usuario Incorrecto.");
                    res.render('index', {info_error: 'Usuario Incorrecto.'});
                }
            }else{
                if(btn_login==="Docente"){
                    res.render('index', {info_error: 'Usuario o contrañesa equivocado.'});
                }else{
                    sql = "Select * from Usuarios where Email = '"+user_email+"'";
                    promesa = executeQuery(sql);
                    promesa.then((result)=>{
                        num_rows = result.length;
                        if (num_rows > 1) {
                            res.render('index', {info_error: 'Usuario o contrañesa equivocado.'});
                        }else{
                            //No existe aun ese usuario.
                            res.render('sing_in');
                        }
                    }).catch((error)=>{
                        console.log("Error: "+error);
                        res.render('index', {info_error: 'Error interno.'});
                    });
                }
            }
        },
        function(error){
            console.log(error)
            res.render('index', {info_error: 'SQL syntax error.'});
        });
    }
};

const sign_in = (req, res) => {
    //Req = request object (params by post).
    const request = req.body;
    //Validamos que no este vacias las variables importantes.
    if(request){
        //Validamos Campos vacios.
        if (request.carnet || request.nombreUsuario || request.apellidoUsuario || request.radio_sexo
            || request.edadU || request.direccion || request.email || request.password || request.NIT 
            || request.DUI || request.celularUsuario || request.telefonoUsuario || request.fechaNacimiento
            || request.carrera || request.CUM){
            //Insertamos el nuevo Usuario.
            var sql = "INSERT INTO dbo.Usuarios(Carnet,Nombre,Apellido,Sexo,Edad,Direccion,Email,Pwr,DUI,NIT,Celular,Telefono,FechaNacimiento,Carrera,CUM,Estado,Nivel)";
            sql += "VALUES ('"+request.carnet+"','"+request.nombreUsuario+"','"+request.apellidoUsuario+"','"+request.radio_sexo+"',"+request.edadU+",'"+request.direccion+"',";
            sql += "'"+request.email+"','"+request.password+"','"+request.DUI+"','"+request.NIT+"','"+request.celularUsuario+"','"+request.telefonoUsuario+"','"+request.fechaNacimiento+"',";
            sql += ""+request.carrera+","+request.CUM+",1,1)";
            var promesa_number = executeUpdate(sql);
            var sql2 = "SELECT * FROM dbo.Usuarios WHERE Email = '"+req.body.email+"'";
            console.log(sql2);
            //Insert Usuario.
            promesa_number.then(function(result){
                console.log("Usuario registrado: codeDB #"+result["num_rows"]);
                res.redirect('new_applicant/?user=' + req.body.email);
            },function(error){
                //Ocurrio un error en el registro del usuario.
                res.render('sing_in');
            });
        }else{
            //Hay campos vacios.
            res.render('sing_in');
        }
    }else{
        //El obj. request no tiene nada.
        res.render('sing_in');
    }
};

const id_applicant = ((req,res) => {
    var user_email=req.query.user;
    //res.send({hola: req.query.user});
    var sql2 = "SELECT * FROM dbo.Usuarios WHERE Email = '"+user_email+"'";
    console.log(sql2)
    var promesa = executeQuery(sql2);
    //Select Usuario.
    promesa.then(function(result){
        //Retornamos el ID.
        console.log(result[0].IDusuario);
        res.render('application_form', {user_data: result});
    }).catch((error)=>{
        //Ocurrio un error en el registro del usuario.
        res.render('sing_in');
    });
});

const new_applicant = ((req, res)=>{
    var request = req.body;
    console.log('ID: '+request.id_user);
    var padre = request.PadreNU+" "+request.PadreAU;
    var madre = request.MadreNU+" "+request.MadreAU;
    var sql3 = "INSERT INTO Formularios(IDUsuario,IDrubros,IDcarrera,CUM,Ciclo_a_aplicar,Estado_civil,N_de_hijos,Tipo_casa,"; //8
    sql3 += "Con_quien_vive,Nombre_del_padre,Profesion_padre,Lugar_trabajo_padre,Telefono_trabajo_padre,Telefono_residencia_padre,"; //6
    sql3 += "Celular_padre,Nombre_de_la_madre,Profesion_madre,Lugar_trabajo_madre,Telefono_trabajo_madre,Telefono_residencia_madre,";  //6
    sql3 += "Celular_madre,Trabaja,Lugar_de_trabajo,Telefono_Trabajo,Tiempo_de_trabajo_empresa,Salario_actual,Nombre_jefe,"; //7
    sql3 += "Telefono_jefe,Cargo_que_desempena,Celular_empresa,Educacion_Basico,Bachillerato,Tecnico,Grado_Universitario,Post_grado,"; //7
    sql3 += "Maestria,Medio_de_transporte,Serevicio_social,Horas_sociales_realizadas,Estado)"; //5
    sql3 += "VALUES("+request.id_user+","+request.RubroBeca+","+request.carrera+","+request.CUM+","+request.Ciclo+","+2+","+0+","+request.radio_tipo_casa+","+request.radio_familia+",";
    sql3 += "'"+padre+"','"+request.TrabajoPU+"','"+request.LugarTrabajoPU+"','"+request.TelefonoTPU+"','"+request.TelefonoRPU+"','"+request.CelularPU+"','"+madre+"',";
    sql3 += "'"+request.TrabajoMU+"','"+request.LugarTrabajoMU+"','"+request.TelefonoTMU+"','"+request.TelefonoRMU+"','"+request.CelularMU+"',"+request.radio_trabaja+",";
    sql3 += "'"+request.LugarTU+"','"+request.TelefonoLugarTU+"',"+request.TiempoTrabajando+","+request.SalarioAproximado+",'"+request.NJIU+"','"+request.TelefonoNJIU+"',";
    sql3 += "'"+request.PuestoTrabajoU+"','"+request.TelefonoPuestoTrabajoU+"','"+request.EducacionBU+"','"+request.EducacionMU+"','"+request.EducacionTU+"','"+request.EducacionGUU+"','"+request.EducacionPGU+"',";
    sql3 += "'"+request.EducacionMMU+"',"+request.radio_transporte_U+","+request.radio_horas+","+request.HorasSociales+",1)";
    console.log(sql3);
    var promesa = executeUpdate(sql3);
    promesa.then((r)=>{
        //Registro Exitoso.
        console.log(r);
        res.render('index');
    }).catch(error =>{
        console.log('Error: '+error);
        res.render('sing_in');
    });
});

module.exports = {
    startLogin,
    sign_in,
    logout,
    id_applicant,
    new_applicant,
};