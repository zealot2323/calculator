const add = function(a, b) {
	return a + b
};

const subtract = function(a, b) {
	return a - b
};

const multiply = function(a, b) {
  return a * b
};

const divide = function(a, b) {
    return a / b
  };

const operate = function(op, a, b) {
    switch(op) {
        case 'add':
            return add(a, b);
        case 'subtract':
            return subtract(a, b);
        case 'multiply': 
            return multiply(a, b);
        case 'divide': 
            return divide(a, b);
    }
}

console.log(operate('divide', 1, 2));

