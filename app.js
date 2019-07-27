"use-stric"

//Declarar los paquetes con los que vamos a trabajar
const express = require('express');
const moongoose = require('mongoose');
const path = require('path');
const indexRoutes = require('./routes');

//Inicializa el servidor
const app = express();


//Se conecta a la BD
moongoose.connect('mongodb+srv://admin:rayP4ytQzU2M8MDy@clusteraws-oa6de.mongodb.net/miscosas', {useNewUrlParser: true})
    .then(db =>{console.log("Base de datos conectada")})
    .catch(error => {console.log(error)}
    );

//Configurar especificaciones del servidor
app.set("port", process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Permite posiciones POST
app.use(express.urlencoded({extend: false}));

//Proporciona una ruta de inicio al servidor
app.use('/', indexRoutes);


//Arrancamos el servidor http / express
app.listen(app.get("port"), () =>{
    console.log(`Server en puerto ${app.get("port")}`);
})

