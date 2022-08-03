const { calculate } = require('./arithmetic');
const { rowArray, varArray, varNames, varTypes, vars, rows } = require('./data');
const { sum, dec, mul, division } = require('./data').arithmeticObj;
const { equal, notEqual, gt, gte, lt, lte } = require('./data').cpmOperators;      

function ifStatement(index) {

        let seconfBlockIf = rows[index].slice(rows[index].indexOf('('), rows[index].indexOf(')') + 1);
        let parentasesContain = seconfBlockIf.slice(1, -1);
        let thirdBlockIf = rows[index].slice(rows[index].indexOf('{'), rows[index].indexOf('}') + 1);
        let bracketContain = thirdBlockIf.slice(1, -1);
        let parentasesContainValue = vars[parentasesContain];
        let bracketSign = bracketContain.split(' ')[1];
        
        if (!seconfBlockIf.startsWith('(') || !seconfBlockIf.endsWith(')') ) {
            console.error('you missed parentases');
            return;
        };
    
        if (!thirdBlockIf || !thirdBlockIf.startsWith('{') || !thirdBlockIf.endsWith('}')) {
            console.error('you missed curly bracket');
            return;
        };

            // if inside parentases expression

        if (parentasesContain.split(' ').length > 1) {
            let parentasesExpressionValue;
            
            function checkIfCond() {
                if (parentasesExpressionValue) {
                    console.log(calculate(bracketContain, bracketSign));
                };
            };

            if (parentasesContain.includes(sum)) {
                parentasesExpressionValue = calculate(parentasesContain, sum);
                checkIfCond();
            };

            if (parentasesContain.includes(dec)) {
                parentasesExpressionValue = calculate(parentasesContain, dec);
                checkIfCond();
            };

            if (parentasesContain.includes(mul)) {
                parentasesExpressionValue = calculate(parentasesContain, mul);
                checkIfCond();
            };

            if (parentasesContain.includes(division)) {
                parentasesExpressionValue = calculate(parentasesContain, division);
                checkIfCond();
            };

            if (parentasesContain.includes(equal)) {
                parentasesExpressionValue = calculate(parentasesContain, equal);
                checkIfCond();  
            };

            if (parentasesContain.includes(notEqual)) {
                parentasesExpressionValue = calculate(parentasesContain, notEqual);
                checkIfCond(); 
            };

            if (parentasesContain.includes(gt)) {
                parentasesExpressionValue = calculate(parentasesContain, gt);
                checkIfCond();  
            };

            if (parentasesContain.includes(gte)) {
                parentasesExpressionValue = calculate(parentasesContain, gte);
                checkIfCond();           
            };

            if (parentasesContain.includes(lt)) {
                parentasesExpressionValue = calculate(parentasesContain, lt);
                checkIfCond(); 
            };

            if (parentasesContain.includes(lte)) {
                parentasesExpressionValue = calculate(parentasesContain, lte);
                checkIfCond();   
            };
        };

        if (parentasesContain.split(' ').length === 1) {
                
            if (!varNames.includes(parentasesContain) && isNaN(Number(parentasesContain))
                && parentasesContain !== "true" && parentasesContain !== "false") {
                    console.error(`ReferenceError: variable ${parentasesContain} is not defined`);
                    return;
            } else {
                
                if (!isNaN(Number(parentasesContain)) && Number(parentasesContain) || Number(parentasesContainValue)) {        
                    console.log(calculate(bracketContain, bracketSign));
                };

                if (parentasesContain === "true") {
                    console.log(calculate(bracketContain, bracketSign));
                };
            };
        };
    };
// };

module.exports = {
    ifStatement
}