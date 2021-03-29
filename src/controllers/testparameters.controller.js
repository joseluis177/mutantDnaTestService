// ----------------------------------------------------------------
// - Autor: Jose Luis Alfonso Buitrago
// - Fecha: 27/03/2021
// - Proyecto: Reto técnico Mercadolibre
// - Contolador para acciones sobre testparameters
// ----------------------------------------------------------------

// - Importamos el modelo de la colección
const Testparameters = require('../models/testparameters.models');

// - Metodos del controlador
module.exports = {
    // - Lista todos los parametros de la aplicación
    listParam: async () => {
        const param = await Testparameters.find({});
        return param[0];
    },
    
    // - Actualiza parametros de test de DNA
    updateParam: async (req, res, next) => {
        const newParam = new Testparameters(req.body);
        const param = await Testparameters.find({});
        const { paramId } = param[0]._id;
        const oldParam = await Testparameters.findByIdAndUpdate(paramId, newParam);
        res.status(200).json(oldParam);
    },
};