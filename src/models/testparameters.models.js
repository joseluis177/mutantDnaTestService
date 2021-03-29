// ----------------------------------------------------------------
// - Autor: Jose Luis Alfonso Buitrago
// - Fecha: 27/03/2021
// - Proyecto: Reto técnico Mercadolibre
// - modelo de colección testparameters
// ----------------------------------------------------------------

// - Inicialización de modulos
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// - Esquema de la colección testparameters
const testParametersSchema = new Schema({
    chainchars: {
        type: Number,
        required: true
    },
    chainnumber: {
        type: Number,
        required: true
    },
    codechars: [{
        type: String,
        required: true
    }]
});

// - Exportamos el modelo
module.exports = mongoose.model('testparameters', testParametersSchema);