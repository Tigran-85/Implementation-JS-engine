const { rows, vars, varArray, varNames } = require('./data');
const { calculate } = require('./arithmetic');
const { sum, dec, mul, division } = require('./data').arithmeticObj;
const { equal, notEqual, gt, gte, lt, lte } = require('./data').cpmOperators;   

function forStatement(index) {

    let seconfBlockFor = rows[index].slice(rows[index].indexOf('('), rows[index].indexOf(')') + 1);
    let parentasesContain = seconfBlockFor.slice(1, -1);
    let parentasesContainExpressions = parentasesContain.split(';');
    let parentasesContainExpressionStart = parentasesContainExpressions[0];
    let parentasesContainExpressionStartTokens = parentasesContainExpressionStart.split(' ');
    let parentasesContainExpressionStartCounterValue = parentasesContainExpressionStartTokens.at(-1);
    let parentasesContainExpressionsEnd = parentasesContainExpressions[2].trimStart().slice(1).trimStart();
    if (parentasesContainExpressionsEnd === '++') {
        parentasesContainExpressionsEnd = '+ 1'
    };

    if (parentasesContainExpressionsEnd === '--') {
        parentasesContainExpressionsEnd = '- 1'
    };
   
    let parentasesContainConditionExpression = parentasesContainExpressions[1].trimStart();
    varArray.push(parentasesContainExpressionStartTokens);
    varNames.push(parentasesContainExpressionStartTokens[1]);
    let thirdBlockFor = rows[index].slice(rows[index].indexOf('{'), rows[index].indexOf('}') + 1);
    let bracketContain = thirdBlockFor.slice(1, -1);
    let bracketSign = bracketContain.split(' ')[1];

    if (!seconfBlockFor.startsWith('(') || !seconfBlockFor.endsWith(')') ) {
        console.error('you missed parentases');
        return;
    };

    if (!thirdBlockFor || !thirdBlockFor.startsWith('{') || !thirdBlockFor.endsWith('}')) {
        console.error('you missed curly bracket');
        return;
    };

    function checkCondLoop() {
        console.log(calculate(bracketContain, bracketSign));
        if (parentasesContainExpressionsEnd[0] === sum) {
            parentasesContainExpressionStartCounterValue = Number(parentasesContainExpressionStartCounterValue) + Number(parentasesContainExpressionsEnd[2]);
        };
        if (parentasesContainExpressionsEnd[0] === dec) {
            parentasesContainExpressionStartCounterValue = Number(parentasesContainExpressionStartCounterValue) - Number(parentasesContainExpressionsEnd[2]);
        };
        if (parentasesContainExpressionsEnd[0] === mul) {
            parentasesContainExpressionStartCounterValue = Number(parentasesContainExpressionStartCounterValue) * Number(parentasesContainExpressionsEnd[2]);
        };
        if (parentasesContainExpressionsEnd[0] === division) {
            parentasesContainExpressionStartCounterValue = Number(parentasesContainExpressionStartCounterValue) / Number(parentasesContainExpressionsEnd[2]);
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