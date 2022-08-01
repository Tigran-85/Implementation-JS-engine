const { types, rowArray, varArray, varNames, varTypes } = require('./data');

const { sum, dec, mul, division } = require('./data').arithmeticObj;

const { equal, notEqual, gt, gte, lt, lte } = require('./data').cpmOperators;     

let value;

function add(num1, num2) {
    value = Number(num1) + Number(num2);
    return value;
};

function calculate(expression, operator) {
    
    let firstOperand = expression.split(' ')[0];
    let secondOperand = expression.split(' ')[2];
    
    let isFirstOperandExist = varNames.includes(firstOperand);
    let isSecondOperandExist = varNames.includes(secondOperand);
    let firstOperandValue = firstOperand;
    let secondOperandValue = secondOperand;
    let isNumberValue = !isNaN(Number(firstOperandValue)) && !isNaN(Number(secondOperandValue));
    let isNumber = !isNaN(Number(firstOperand)) && !isNaN(Number(secondOperand));
    const isNumberFirst = isNaN(Number(firstOperandValue));
    const isNumberSecond = isNaN(Number(secondOperandValue));
    const isStringFirst = firstOperandValue.startsWith('"') && firstOperandValue.endsWith('"');
    const isStringSecond = secondOperandValue.startsWith('"') && secondOperandValue.endsWith('"');
    
    for (let i = 0; i < rowArray.length; i++) {
        
        for (let j = 0; j < varArray.length; j++) {
            if (!isFirstOperandExist) {
                if (isNaN(Number(firstOperand)) && (!firstOperandValue?.startsWith('"') && !secondOperandValue?.startsWith('"'))) {
                    throw new Error(`ReferenceError: variable ${firstOperand} is not defined`);
                };
            };

            if (!isSecondOperandExist) {
                if (isNaN(Number(secondOperand)) && (!firstOperandValue?.startsWith('"') && !secondOperandValue?.startsWith('"'))) {
                    throw new Error(`ReferenceError: variable ${secondOperand} is not defined`);
                };
            };

            if ((firstOperandValue.startsWith('"') && !firstOperandValue.endsWith('"')) ||
                (!firstOperandValue.startsWith('"') && firstOperandValue.endsWith('"') ||
                (secondOperandValue.startsWith('"') && !secondOperandValue.endsWith('"')) ||
                (!secondOperandValue.startsWith('"') && secondOperandValue.endsWith('"'))    
            )) {
                return new Error(`SyntaxError`);
            };

            if (varArray[j][1] === firstOperand) {
                firstOperandValue = rowArray[j][rowArray[j].length - 1];
                
            }; 

            if (varArray[j][1] === secondOperand) {
                secondOperandValue = rowArray[j][rowArray[j].length - 1];
                
            };
            
        };
    };    

    if (operator === sum) {
        if (varTypes[firstOperand] === types[0] && varTypes[secondOperand] === types[0]) {
            value = add(firstOperandValue, secondOperandValue);
            return value;
        } else if(varTypes[firstOperand] !== types[0] || varTypes[secondOperand] !== types[0]){

            if (!isNumberFirst && isSecondOperandExist) {
                value = add(firstOperand, secondOperandValue);
                return value;
            };

            if (!isNumberSecond && isFirstOperandExist) {
                value = add(firstOperandValue, secondOperand);
                return value;
            };

            if (!isNumberFirst + !isNumberSecond) {
                value = add(firstOperand, secondOperand);
                return value;
            };
            
            if (firstOperandValue?.startsWith('"') && secondOperandValue?.startsWith('"')) {
                let newStrSecond = secondOperandValue.slice(1, -1);
                let newStrFirst = firstOperandValue.slice(1, -1);
                value = newStrSecond.concat(newStrFirst)
                return value;
            };
        
            if (firstOperandValue?.startsWith('"')) {
                let newStrFirst = firstOperandValue.slice(1, -1);
                value = newStrFirst.concat(secondOperandValue);
                return value;
            };

            if (secondOperandValue?.startsWith('"')) {
                let newStrSecond = secondOperandValue.slice(1, -1);
                value = firstOperandValue.concat(newStrSecond);
                return value;
            } else {
                value = firstOperandValue.concat(secondOperandValue);
                return value;
            };  
        };
    };

    // Compare operations
    if (operator === equal) {
        if (isNumber || isFirstOperandExist || isSecondOperandExist 
            || isStringFirst || isStringSecond) {
            if (firstOperandValue === secondOperandValue) {
                return true;
            };
        };
    };
    
    if (operator === notEqual) {
        
        if (isNumber || isFirstOperandExist || isSecondOperandExist 
            || isStringFirst || isStringSecond) {
            if (firstOperandValue !== secondOperandValue) {
                return true;
            }; 
        };
    };

    if (operator === gt) {
        if (isNumber || isFirstOperandExist || isSecondOperandExist 
            || isStringFirst || isStringSecond) {
            if (firstOperandValue > secondOperandValue) {
                return true;
            };
        };
    };

    if (operator === gte) {
        if (isNumber || isFirstOperandExist || isSecondOperandExist 
            || isStringFirst || isStringSecond) {
            if (firstOperandValue >= secondOperandValue) {
                return true;
            };
        };
    };

    if (operator === lt) {
        if (isNumber || isFirstOperandExist || isSecondOperandExist 
            || isStringFirst || isStringSecond) {
            if (firstOperandValue < secondOperandValue) {
                return true;
            };
        };
    };

    if (operator === lte) {
        if (isNumber || isFirstOperandExist || isSecondOperandExist 
            || isStringFirst || isStringSecond) {
            if (firstOperandValue <= secondOperandValue) {
                return true;
            };
        };
    };
    
    // Arithmetic operations
    if(operator === dec){
        if (isNumberValue || isFirstOperandExist || isSecondOperandExist) {
            value = Number(firstOperandValue) - Number(secondOperandValue);
            return value;
        }else {
            return NaN;
        }
    };

    if(operator === mul){
        if (isNumberValue || isFirstOperandExist || isSecondOperandExist) {
            value = Number(firstOperandValue) * Number(secondOperandValue);
            return value;
        } else {
            return NaN;
        };
    };

    if(operator === division){
        if (isNumberValue || isFirstOperandExist || isSecondOperandExist) {
            value = Number(firstOperandValue) / Number(secondOperandValue);
            return value;
        } else {
            return NaN;
        };
    };    
};

module.exports = {
    calculate, types, value
};


