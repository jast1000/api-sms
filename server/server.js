require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//configurar el body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

//cargar todos los routers
app.use(require('./routes/routes'));

//levantar el puerto
app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log('Ocurrio un error!');
        console.log(err);
    }
});