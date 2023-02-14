/**
 * 

 *  
 * */



'use strict'

const mongoose = require('../common/services/mongoose.service').mongoose; 
 
const { Schema } = mongoose;
const cliente = require('./cliente.model');
const citasSchema = new mongoose.Schema({
        
    anio:{
        type:mongoose.Schema.Types.Number
    },
    mes:{
        type:mongoose.Schema.Types.Number
    },
    dia:{
        type:mongoose.Schema.Types.Number
    },
    hora:{
        type:mongoose.Schema.Types.Number
    },
    minuto:{
        type:mongoose.Schema.Types.Number
    },
    servicio: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Servicios'
    },
    duracion: {
        type: mongoose.Schema.Types.Number
    },
    trabajador:{
        type:mongoose.Schema.Types.ObjectId, ref:'Trabajadores'
    },
    cliente:{
        type:mongoose.Schema.Types.ObjectId, ref:'Clientes'
    },
 
    

},{versionKey:false})

citasSchema.set('toJSON',{virtuals:false});

const Citas = mongoose.model('citas',citasSchema,'citas');

const trabajadoresSchema = new mongoose.Schema({
        
    nombre:{
        type:mongoose.Schema.Types.String
    },
    apellidos:{
        type:mongoose.Schema.Types.String
    },
    email:{
        type:mongoose.Schema.Types.String
    },
    info:{
        type:mongoose.Schema.Types.String
    },    
    foto:{
        type:mongoose.Schema.Types.String
    }
    

},{versionKey:false})

trabajadoresSchema.set('toJSON',{virtuals:false});

const Trabajadores = mongoose.model('trabajadores',trabajadoresSchema,'trabajadores');

const serviciosSchema = new mongoose.Schema({
        
    nombre:{
        type:mongoose.Schema.Types.String
    },
    duracion:{
        type:mongoose.Schema.Types.Number
    },
    descripcion:{
        type:mongoose.Schema.Types.String
    },
    precio:{
        type:mongoose.Schema.Types.Number
    },
    foto:{
        type:mongoose.Schema.Types.String
    },
    categoria:{
        type:mongoose.Schema.Types.ObjectId, ref:'categorias'
    }

},{versionKey:false})

serviciosSchema.set('toJSON',{virtuals:false});

const Servicios = mongoose.model('servicios',serviciosSchema,'servicios');
 

const categoriasSchema = new Schema({

    nombre: {
        type: Schema.Types.String
    },
    minutos:{
        type:mongoose.Schema.Types.Number
    },
    foto: {
        type: Schema.Types.String
    }

}, { versionKey: false })

categoriasSchema.set('toJSON', { virtuals: false });

const Categorias = mongoose.model('categorias', categoriasSchema, 'categorias');

const servicio_trabajadorSchema = new mongoose.Schema({    
    servicio: {
        type: mongoose.Schema.Types.ObjectId, ref: 'servicios'
    },
    trabajador: {
        type: mongoose.Schema.Types.ObjectId, ref: 'trabajadores'
    }
}, { versionKey: false })

servicio_trabajadorSchema.set('toJSON', { virtuals: false });

const Servicio_trabajador = mongoose.model('servicio_trabajador', servicio_trabajadorSchema, 'servicio_trabajador');
/**
 * 
 * @param {*} id_servicio 
 * @returns lista de trabajadores que realizan el servicio id_servicio
 */
exports.getTrabajadoresServicio = async (id_servicio) => {
    try {
        return await new Promise((resolve, reject) => { 
            
            Servicio_trabajador.find({ servicio: id_servicio }).populate('trabajador'  ).exec((error, result) => {

                if (error) {
                    reject(error.message);
                    throw error.message;
                }
                if (result) {
                    //FIXME: tenemos que desconponer el array para obtener solo los trabajadores
                    result = result.map(a => a.trabajador); 
                    resolve(result); 
                }
            });
        });
    } catch (error) {
        throw error.message;
    }
}
/**
 * 
 * @returns lista de categorias
 */
exports.getCategorias = () => {
    return new Promise((resolve, reject) => {
        Categorias.find({}).exec((error, result) => {
            if (error) {
                reject(error.message);
                throw error.message;
            }
            if (result) {
                resolve(result);
            }
        })
    }).catch(error => {
        throw error.message;
    })
}
 
/**
 * 
 * @param {*} id de la categoria a la que pertenece el servicio
 * @returns servicios que pertencen a la categoria del parametro id
 */
exports.getServicios = async (id_categoria) => {
    try {
        return await new Promise((resolve, reject) => {
            Servicios.find({ categoria: id_categoria }).exec((error, result) => {

            if (error) {
                    reject(error.message);
                    throw error.message;
                }
                if (result) {
                    resolve(result); 
                }
            });
        });
    } catch (error) {
        throw error.message;
    }
}
exports.addCita = async (info) => { ;
    try {
 
        const nuevacita = new Citas({
            anyo: info.cita.anyo,
            mes:    info.cita.mes,
            dia:    info.cita.dia,
            hora:   info.cita.hora,
            minuto: info.cita.minuto,
            servicio: mongoose.Types.ObjectId(info.cita.servicio),
            duracion: info.cita.duracion,
            trabajador: mongoose.Types.ObjectId(info.cita.trabajador),
            cliente: mongoose.Types.ObjectId(info.cita.cliente)
        }); 
        return nuevacita.save().catch(error => { 
            console.log("Error guardando cita ", error);
            error.message;
        })

    } catch (error) {
        throw error.message;
    }
}
 