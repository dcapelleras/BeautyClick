/**
 * se envia desde la pagina servicios (parametro servicio)
 * GET parametro: servicio , retorna  lista de {año,mes,dia,hora,minutos,trabajador,duracion}
 * 
 * 
 * se envia desde la pagina calendario para guardar la cita
 * POST {año,mes,dia,hora,minutos,servicio,trabajador,cliente}
 * 
 * Desde la pagina login se abre la pagina mis citas 
 * GET parametro: cliente, retorna lista de  {año,mes,dia,hora,minutos,servicio,duracion,trabajador}
 * 
 * TODO: faltan PUT para modificar citas de cliente y DELETE para borrar desde pagina de mis citas de cliente
 */
'use strict'

const citasController = require('../controllers/cita.controllers');
//const citasMiddleware = require('../middleware/user.middleware');


exports.citasRoutes = function (app) {
    //retorna lista de categorias
    app.get('/api/get_categorias', [citasController.get_categorias]);
    //retorna servicios que pertenezcan a la categoria representada por el id
    app.get('/api/get_servicios/:id', [citasController.get_servicios]);
    //retorna trabajadores que hagan un servicio (id)
    app.get('/api/get_trabajadores_servicio/:id', [citasController.get_trabajadores_servicio]);
    //retorna lista de trabajadores 
    app.get('/api/get_trabajadores',  [citasController.get_trabajadores]);

    // retorna citas de un cliente
    app.get('/api/get_citas_trabajador_dia', [citasController.get_citas_trabajador_dia]);
    // retorna citas de un cliente 
    app.get('/api/get_citas_cliente', [citasController.get_citas_cliente]);
    //guardar cita para un servicio, trabajador y cliente
    app.post('/api/post_cita_trabajador_cliente', [citasController.guardar_cita]);
 
    //app.put('/api/upload/user-pic', usersController.uploadUserPic);

}