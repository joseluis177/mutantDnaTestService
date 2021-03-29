// ----------------------------------------------------------------
// - Autor: Jose Luis Alfonso Buitrago
// - Fecha: 27/03/2021
// - Proyecto: Reto técnico Mercadolibre
// - App Inicial
// ----------------------------------------------------------------

// - Inicialización de modulos
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv/config');

const app = express();
const dnaTestRoutes = require('./routes/dnatest.routes');
const testParameters = require('./routes/testparameters.routes')

// - realizamos conexión a la base de datos
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_CONNECTION, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => console.log('BD Conectada'))
  .catch(err=>console.log(err));

// - Configuraciones de la aplicación
app.set('port', process.env.PORT || 4000);
app.set('json spaces', 2);

// - Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}));

// - Routes
app.use('/api', dnaTestRoutes);
app.use('/api', testParameters);

// - Inicio de servidor
app.listen(app.get('port'), () => {
    console.log('Servidor en puerto: ', app.get('port'));
});

