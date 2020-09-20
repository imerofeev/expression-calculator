function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
  const newExpression = /\d+|\+|\-|\*|\/|\(|\)/g;
  const newExpressionArr = expr.match(newExpression);

  const leftBrackets = expr.match(/\(/g) ? expr.match(/\(/g).length : 0;
  const rightBrackets = expr.match(/\)/g) ? expr.match(/\)/g).length : 0;

  if (leftBrackets !== rightBrackets) {
    throw new Error("ExpressionError: Brackets must be paired");
  }

  const operators = {
    "+": {
      priority: 1,
      action: (a, b) => a + b
    },
    "-": {
      priority: 1,
      action: (a, b) => a - b
    },
    "*": {
      priority: 2,
      action: (a, b) => a * b
    },
    "/": {
      priority: 2,
      action: (a, b) => a / b
    },
    "(": {},
    ")": {}
  };

  function calc(b, a, op) {
    if (op === "/" && b === 0) {
      throw new Error("TypeError: Division by zero.");
    }
    return operators[op].action(a, b);
  }

  const numberArr = [];
  const operatorArr = [];

  for (let i = 0; i < newExpressionArr.length; i++) {
    if (!isNaN(newExpressionArr[i])) {
      numberArr.push(Number(newExpressionArr[i]));
    }

    function addOperator() {
      if (
        !operatorArr.length ||
        operatorArr[operatorArr.length - 1] === "(" ||
        newExpressionArr[i] === "("
      ) {
        operatorArr.push(newExpressionArr[i]);
      } else if (newExpressionArr[i] === ")") {
        countBrackets();
        operatorArr.pop();
      } else if (
        operators[newExpressionArr[i]].priority >
        operators[operatorArr[operatorArr.length - 1]].priority
      ) {
        operatorArr.push(newExpressionArr[i]);
      } else {
        numberArr.push(
          calc(numberArr.pop(), numberArr.pop(), operatorArr.pop())
        );
        addOperator();
      }
    }

    function countBrackets() {
      if (operatorArr[operatorArr.length - 1] === "(") {
          return;
      }

      numberArr.push(
        calc(numberArr.pop(), numberArr.pop(), operatorArr.pop())
      );

      countBrackets();
    }

    if (newExpressionArr[i] in operators) {
      addOperator();
    }
  }

  function countRest() {
    if (!operatorArr.length) {
      return;
    }
    numberArr.push(
      calc(numberArr.pop(), numberArr.pop(), operatorArr.pop())
    );
    countRest();
  }
  countRest();
  return numberArr[0];
}

module.exports = {
    expressionCalculator
}