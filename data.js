const arithmeticObj = {
    sum: "+",
    dec: "-",
    mul: "*",
    division: "/"
};

const cpmOperators = {
    equal: "===",
    notEqual: "!==",
    gt: ">",
    gte: ">=",
    lt: "<",
    lte: "<=",
};

const types = ["number", "string", "boolean"];

const fs = require('fs');

const txt = fs.readFileSync('./text.txt', 'utf-8');

const reservedNames = ['let', 'const', 'var', 'object', 'class', 'return', 'function'];

const variables = ['const', 'var', 'let'];

const varNames = [];

const rows = txt.split('\n');

let rowArray = [];

for (let i = 0; i < rows.length; i++) {
    rowArray.push(rows[i].split(' '));
    
};

const ifsArray = rows.filter(t => t.startsWith('if'));

const varArray = rowArray.filter(t => t[2] === '=');
        
for (let j = 0; j < varArray.length; j++) {
    varNames.push(varArray[j][1]);
};

const vars = {};
for (let j = 0; j < varArray.length; j++) {
    
    vars[varArray[j][1]] = varArray[j][3];
    
};

const varTypes = {};
for (const key in vars) {
    if (!isNaN(Number(vars[key]))) {
        varTypes[key] = types[0];
    };

    if (vars[key] === 'true' || vars[key] === 'false') {
        varTypes[key] = types[2];
    };

    if (vars[key][0] === '"' && vars[key][vars[key].length - 1] === '"') {
        varTypes[key] = types[1];
    };
};

module.exports = {
    types, reservedNames, variables, varNames, rows, rowArray, 
    varArray, varTypes, varNames, vars, arithmeticObj, cpmOperators,
    ifsArray
};