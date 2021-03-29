// ----------------------------------------------------------------
// - Autor: Jose Luis Alfonso Buitrago
// - Fecha: 27/03/2021
// - Proyecto: Reto técnico Mercadolibre
// - Contolador para acciones sobre dnatest
// ----------------------------------------------------------------

// - Importamos el modelo de la colección
const Dnatest = require('../models/dnatest.models');
const testIntellegence = require('../business/dnatest.business')

// - Metodos del controlador
module.exports = {
    // - Lista todos los test DNA    
    index: async (req, res, next) => {
        const tests = await Dnatest.find({});
        res.status(200).json(tests);
    },
    
    // - Inserta un nuevo test DNA
    newTest: async (req, res, next) => {
        const newTest = new Dnatest(req.body);
        var mutant = false;
        await testIntellegence.getParameters().then(data => {
            var { dnaMutantCode, chainChars, chainNumber } = data;
            testIntellegence.executeTest(newTest.dna, dnaMutantCode, chainChars, chainNumber).then(data => {
                newTest.result=data;
                newTest.save();
                const vercode = data ? 200:403;
                res.status(vercode).send();
            });
        });
    },

    // - Realiza consulta de estadisticas
    getStats: async (req, res, next) => {
        var human = 0;
        var mutant = 0;
        var ratio = 0;
        await Dnatest.find({result:false}).then(data => {
            if (data) { human = data.length;};
        });
        await Dnatest.find({result:true}).then(data => {
            if (data) { mutant = data.length;};
        });
        ratio = Math.round((mutant/human)*100)/100;
        res.status(200).json({count_mutant_dna: mutant, count_human_dna:human, ratio: ratio });
    }
};