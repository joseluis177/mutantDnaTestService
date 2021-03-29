// ----------------------------------------------------------------
// - Autor: Jose Luis Alfonso Buitrago
// - Fecha: 27/03/2021
// - Proyecto: Reto técnico Mercadolibre
// - Capa de negocio con inteligencia de análisis de DNA mutante
// ----------------------------------------------------------------

// - Realizamos importación de express
const business = require('express-promise-router')();
const testParam = require('../controllers/testparameters.controller')

// - Realizamos decalaración de arreglos de análisis
var dnaMatrix = [];
var dnaMatrixTraspose = [];
var dnaMatrixOblique = [];
var dnaMutantCode = [];
var chainNumber = 0;
var chainChars = 0;

// - Función que se encarga de crear matrices de análisis
function createMatrixCode(dnaCode, mutantCode, chars, number) {
    dnaMatrix = [];
    dnaMatrixTraspose = [];
    dnaMatrixOblique = [];
    dnaMutantCode = mutantCode;
    chainNumber = number;
    chainChars = chars;

    // - Creamos matriz inicial
    dnaCode.forEach(function(dnaString){
        const dnaVector = dnaString.split('');
        dnaMatrix.push(dnaVector);
    });

    // - Creamos matriz traspuesta
    dnaMatrixTraspose = dnaMatrix[0].map((_, colIndex) => dnaMatrix.map(row => row[colIndex]));

    // - Creamos matriz oblicua
    var n = dnaMatrix.length;
    for (j=0; j < n - chainChars - 1; j++) {
        var newFilaInf = [];
        var newFilaSup = [];
        for (q=0; q < n ; q++) {
            if (j+q < n) {
                newFilaInf.push(dnaMatrix[j+q][q]);
                if (j > 0) {newFilaSup.push(dnaMatrix[q][j+q]);}
            }
        }
        dnaMatrixOblique.push(newFilaInf);
        if (j > 0){dnaMatrixOblique.push(newFilaSup);}
    }

    for (j=n-1; j > chainChars - 2; j--) {
        var newFilaInf = [];
        var newFilaSup = [];
        
        for (q=0; q < n ; q++) {
            if (j-q >= 0) {newFilaSup.push(dnaMatrix[q][j-q]);}
        }
        dnaMatrixOblique.push(newFilaSup);

        var s = dnaMatrix.length - 1
        if (j < n-1) {
            for (q=n-1-j; q < n ; q++) {
                newFilaInf.push(dnaMatrix[q][s]);
                s -= 1;
            }
            dnaMatrixOblique.push(newFilaInf);
        }
    }  
}

// - Función que opera las matrices de DNA
function loadDnaCode () {
    var mutantCodeCount = 0;
    mutantCodeCount = loadMatrix(dnaMatrix);  
    mutantCodeCount += loadMatrix(dnaMatrixTraspose);
    mutantCodeCount += loadMatrix(dnaMatrixOblique);
    return mutantCodeCount >= chainNumber;
}

// - Función que convierte cada fila de una matriz en cadena
function loadMatrix(matrix) {
    var mutantCodeCount = 0;
    matrix.forEach(function(code) {
        if (mutantCode(code.join(''))) {
            mutantCodeCount += 1;
        }
    });
    return mutantCodeCount;
}

// - Función que evalua si una cadena contiene el gen mutante
function mutantCode (cadena) {
    for (code of dnaMutantCode){
        if (cadena.includes(code)) {
            return true;
        }
    }
    return false;
}


module.exports = {
    // - Recupera los parametros de código mutante de la base de datos
    getParameters: async () => {
        await testParam.listParam(null, null, null).then(data => {
            const { chainchars, codechars, chainnumber } = data;
            for (code of codechars) {
                dnaMutantCode.push(Array(chainchars + 1).join(code));
            }
            chainChars = chainchars;
            chainNumber= chainnumber;    
        });
        return { dnaMutantCode, chainChars, chainNumber };
    },
    
    // - Ejecuta el análisis de DNA
    executeTest: async (dnaCode, dnaMutantCode, chainChars, chainNumber) => {
        createMatrixCode(dnaCode, dnaMutantCode, chainChars, chainNumber); 
        return loadDnaCode();
    }
};




