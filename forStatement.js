const { rows, vars, varArray, varNames } = require('./data');
const { calculate } = require('./arithmetic');
const { sum, dec, mul, division } = require('./data').arithmeticObj;
const { equal, notEqual, gt, gte, lt, lte } = require('./data').cpmOperators;   

function forStatement(index) {

    const seconfBlockFor = rows[index].slice(rows[index].indexOf('('), rows[index].indexOf(')') + 1);
    const parentasesContain = seconfBlockFor.slice(1, -1);

    if (!parentasesContain.split(' ')[3].endsWith(";") || !parentasesContain.split(' ')[6].endsWith(";")) {
        throw new Error('you missed semicolon')
    };

    const parentasesContainExpressions = parentasesContain.split(';');
    const parentasesContainExpressionStart = parentasesContainExpressions[0];
    const parentasesContainExpressionStartTokens = parentasesContainExpressionStart.split(' ');
    let parentasesContainExpressionStartCounterValue = parentasesContainExpressionStartTokens.at(-1);
    let parentasesContainExpressionsEnd = parentasesContainExpressions[2].trimStart().slice(parentasesContainExpressionStartTokens[1].length).trimStart();
    const secondVariable = parentasesContainExpressions[1].split(' ')[1];
    const thirdVariable = parentasesContainExpressions[2].trimStart().slice(0, -2);

    if (parentasesContainExpressionsEnd === '++') {
        parentasesContainExpressionsEnd = '+ 1'
    };

    if (parentasesContainExpressionsEnd === '--') {
        parentasesContainExpressionsEnd = '- 1'
    };

    const parentasesContainConditionExpression = parentasesContainExpressions[1].trimStart();

    varArray.push(parentasesContainExpressionStartTokens);

    const thirdBlockFor = rows[index].slice(rows[index].indexOf('{'), rows[index].indexOf('}') + 1);
    const bracketContain = thirdBlockFor.slice(1, -1);
    const bracketSign = bracketContain.split(' ')[1];

    if (!seconfBlockFor.startsWith('(') || !seconfBlockFor.endsWith(')') ) {
        console.error('you missed parentases');
        return;
    };

    if (!thirdBlockFor || !thirdBlockFor.startsWith('{') || !thirdBlockFor.endsWith('}')) {
        console.error('you missed curly bracket');
        return;
    };
    
    if (secondVariable !== parentasesContainExpressionStartTokens[1]) {
      throw new Error(`variable ${secondVariable} is not defined`);  
    } else if(thirdVariable !== parentasesContainExpressionStartTokens[1]) {
        throw new Error(`variable ${thirdVariable} is not defined`);
    };

    function checkCondLoop() {
        console.log(calculate(bracketContain, bracketSign));
        if (parentasesContainExpressionsEnd[0] === sum) {
            parentasesContainExpressionStartCounterValue = Number(parentasesContainExpressionStartCounterValue) + Number(parentasesContainExpressionsEnd.at(-1));
        };
        if (parentasesContainExpressionsEnd[0] === dec) {
            parentasesContainExpressionStartCounterValue = Number(parentasesContainExpressionStartCounterValue) - Number(parentasesContainExpressionsEnd.at(-1));
        };
        if (parentasesContainExpressionsEnd[0] === mul) {
            parentasesContainExpressionStartCounterValue = Number(parentasesContainExpressionStartCounterValue) * Number(parentasesContainExpressionsEnd.at(-1));
        };
        if (parentasesContainExpressionsEnd[0] === division) {
            parentasesContainExpressionStartCounterValue = Number(parentasesContainExpressionStartCounterValue) / Number(parentasesContainExpressionsEnd.at(-1));
        };
    }

    if (parentasesContainConditionExpression.includes(lt)) {
        while (+parentasesContainExpressionStartCounterValue < +parentasesContainConditionExpression.split(' ')[2]) {
           checkCondLoop();
        };
    };

    if (parentasesContainConditionExpression.includes(lte)) {
        while (+parentasesContainExpressionStartCounterValue <= +parentasesContainConditionExpression.split(' ')[2]) {
            checkCondLoop();
        };
    };
    

    if (parentasesContainConditionExpression.includes(gt)) {
        while (+parentasesContainExpressionStartCounterValue > +parentasesContainConditionExpression.split(' ')[2]) {
            checkCondLoop();
        };
    };

    if (parentasesContainConditionExpression.includes(gte)) {
        while (+parentasesContainExpressionStartCounterValue >= +parentasesContainConditionExpression.split(' ')[2]) {
            checkCondLoop();
        };
    };

    if (parentasesContainConditionExpression.includes(equal)) {
        while (+parentasesContainExpressionStartCounterValue === +parentasesContainConditionExpression.split(' ')[2]) {
            checkCondLoop();
        };
    };

    if (parentasesContainConditionExpression.includes(notEqual)) {
        while (+parentasesContainExpressionStartCounterValue !== +parentasesContainConditionExpression.split(' ')[2]) {
            checkCondLoop();
        };
    };
};

module.exports = {
    forStatement
}