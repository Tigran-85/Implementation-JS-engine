const { calculate, value } = require('./arithmetic');
const { types, reservedNames, variables, varNames, 
        rows, rowArray, varArray, varTypes, vars
      } = require('./data');
const { sum, dec, mul, division } = require('./data').arithmeticObj;     

const { ifStatement } = require('./ifStatement');
const { forStatement } = require('./forStatement');

for (let i = 0; i < rowArray.length; i++) {
    
    //check if const variable assign value
    if (rowArray[i][0] === variables[0]) {
        if (rowArray[i].length === 2) {
            throw new Error('Missing initializer in const declaration')
        };
    };


                                        // Arithmetic 

    //implement sum
    
    if (rowArray[i].includes(sum) && rowArray[i][0] !== 'if' && rowArray[i][0] !== 'for') {
        console.log(calculate(rows[i], sum));
    }

    //implement division 
    if (rowArray[i].includes(dec) && rowArray[i][0] !== 'if' && rowArray[i][0] !== 'for') {
        console.log(calculate(rows[i], dec));    
    }

    //implement mul
    if (rowArray[i].includes(mul) && rowArray[i][0] !== 'if' && rowArray[i][0] !== 'for') {

        console.log(calculate(rows[i], mul));
        
    }

     //implement division
     if (rowArray[i].includes(division) && rowArray[i][0] !== 'if' && rowArray[i][0] !== 'for') {
        
        console.log(calculate(rows[i], div));
        
    };

    //check syntax for <if> operator
    
    if (rows[i].startsWith('if')) {
        ifStatement(i);
    };

    //check syntax for <for> operator
    if (rows[i].startsWith('for')) {
        forStatement(i)
        // if (!rowArray[i][1].startsWith('(') || !rowArray[i][1].endsWith(')')
        //     || !rowArray[i][2].startsWith('{') || !rowArray[i][2].endsWith('}')
        // ) {
        //     console.error('SyntaxError');
        //     return;
        // };
    };

    let varExist = rowArray[i][2] === '=';
    
    // validate variables 
    if (varExist) {

        // check if dublicate exist

        const dublicates = varNames.filter(function (value, index, array) {
            return array.indexOf(value) !== index;
        });

        if (dublicates.length) {
            console.error(`Dublicate variable name, variable ${dublicates[i]} is already exist`);
            return;
        };
        
        // check syntax
        if (!variables.includes(rowArray[i][0])) {
            console.error(`Syntax error: Unexpected Identifier ${rowArray[i][0]}`);
            return;
        }; 

        if (rowArray[i].length === 3) {
            throw new Error('Syntax error')
        };


        //check if variable start with not allowed letters
        if (!isNaN(varArray[i][1][0])) {
            console.error('Variable name can not start with number');
            return;
        };

        if (varNames[i].includes('-')) {
            console.error('SyntaxError: Unexpected token "-"');
            return;
        };

        //check reserved names
        if (reservedNames.includes(varNames[i])) {
            console.error('You can not use variable name with reserved names');
            return;
        };
    };  
};








  

