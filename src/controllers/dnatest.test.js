const dnatest = require('./dnatest.controller');
const expect = global.expect;




describe('newTest', () => {
    const dnaTestTry = [
        {
            "dna":["ATTGTG","TCTCTC","GAGACA","TCTCTC","GACAGA","TCTCTC"]
        },
        {
            "dna":["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
        }];
    const statsData = [{
        "count_mutant_dna": 23,
        "count_human_dna": 19,
        "ratio": 1.21
    }];

    const tests = dnatest.index();

    test('Caso de ADN humano', () => {
        const testd = dnaTestTry[0];
        dnatest.newTest(testd).then(data => {
            expect(data).toEqual(false);
        });
    });

    test('Caso de ADN mutante', () => {
        const testd = dnaTestTry[1];
        dnatest.newTest(testd).then(data => {
            expect(data).toBe(true);
        });
    });

    test('Stats de ejecución', () => {
        dnatest.getStats().then(data => {
            expect(data).toEqual(statsData);
        });
    });

    test('Listado de pruebas', () => {
        dnatest.index().then(data => {
            expect(data).toEqual(tests);
        });
    });
});
