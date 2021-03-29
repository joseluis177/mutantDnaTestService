// ----------------------------------------------------------------
// - Autor: Jose Luis Alfonso Buitrago
// - Fecha: 27/03/2021
// - Proyecto: Reto técnico Mercadolibre
// - Router de metodos testparameter
// ----------------------------------------------------------------

// - Realizamos importación de express
const router = require('express-promise-router')();

// - Realizamos importación de metodos utilizados
const { 
    listParam,
    updateParam
} = require('../controllers/testparameters.controller');

// - Configuramos rutas de funcionalidad
router.get('/show', listParam);
router.get('/update', updateParam);

// - exportamos el modulo
module.exports = router;
