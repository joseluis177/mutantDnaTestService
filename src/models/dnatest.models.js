// ----------------------------------------------------------------
// - Autor: Jose Luis Alfonso Buitrago
// - Fecha: 27/03/2021
// - Proyecto: Reto técnico Mercadolibre
// - modelo de colección dnatest
// ----------------------------------------------------------------

// - Inicialización de modulos
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// - Esquema de la colección dnatest
const dnacodeSchema = new Schema({
    dna: [],
    result: Boolean
});

// - Exportamos el modelo
module.exports = mongoose.model('dnatest', dnacodeSchema);