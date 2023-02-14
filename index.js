'use strict'
//importem llibreria dotenv i carreguem la configuració de l'arxiu .env
const config = require('dotenv').config();
//importem llibreria express
const express = require('express');
//importem llibreria cors
const cors = require('cors');
//importem llibreria Morgan
const morgan = require('morgan');
//importem llibreria express-fileupload
const fileUpload = require('express-fileupload');
const path= require('path');

//instanciem express cap a l'objecte app
const app = express();


//middlewares
/*
implementem express-fileupload
necessario para la recepcion de los formularios que llegan del frontend
*/

app.use(fileUpload());
//implementem cors
app.use(cors());
//implementem morgan en mode desenvolupament
app.use(morgan('dev'));
//per passar de json en el body a objectes javaScript
app.use(express.json());
//per passar de json url a objectes javaScript
app.use(express.urlencoded({extended:false}));
//importar l'arxiu de rutes de product.routes
const users = require('./routes/cliente.routes');
const citas = require('./routes/cita.routes');
const contacto = require('./routes/contacto.routes');
 
//passem la instància app
users.userRoutes(app);
citas.citasRoutes(app);
contacto.route(app);
app.use('/public/img', express.static(__dirname + '/assets/img'));
app.use(express.static(path.join(__dirname,'components')))
//executem el servidor per escoltar en el puerto 3000 i la ip localhost---->127.0.0.1
//FIXME: url de produccion http://backend.formactiu.com/

app.listen(config.parsed.SERVER_PORT, 'localhost', () => {
    console.log('Server listening on port %s',config.parsed.SERVER_PORT);
})