// ----------------------------------------------------------------
// - Autor: Jose Luis Alfonso Buitrago
// - Fecha: 27/03/2021
// - Proyecto: Reto técnico Mercadolibre
// - Router de metodos dnatest
// ----------------------------------------------------------------

// - Realizamos importación de express
const router = require('express-promise-router')();

// - Realizamos importación de metodos utilizados
const { 
    index,
    newTest,
    getStats
} = require('../controllers/dnatest.controller');

// - Configuramos rutas de funcionalidad
router.get('/index', index);
router.get('/stats', getStats);
router.post('/mutant', newTest);

// - exportamos el modulo
module.exports = router;


