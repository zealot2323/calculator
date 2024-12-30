let sum = 0;
let currentNum = '';
let currentOp = '';
let previousNum = 0;

const screen = document.querySelector('#screen');
screen.textContent = sum;

const buttons = document.querySelector('#buttons');

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
};

const updateScreen = function(num, op) {
    if (op === 'equals') {
        screen.textContent = sum;
    } else {
        screen.textContent = num;
    }
}

buttons.addEventListener('click', (event) => {
    let target = event.target;

    switch(target.className) {
        case 'num':
            currentNum += target.textContent;
            updateScreen(currentNum);
            break;
        case 'operator':
            if (target.id === 'equals') {
                currentNum = Number(currentNum);
                sum = operate(currentOp, previousNum, currentNum);
                updateScreen(sum, 'equals');
                currentOp = '';
                currentNum = '';
            } else {
                currentOp = target.id;
                previousNum = Number(currentNum);
                currentNum = '';

                //update button state to pressed
            };
            break;
        case 'misc':
            switch(target.id) {
                case 'clear':
                    currentNum = '';
                    currentOp = '';
                    updateScreen('0');
                    break;
                case 'plusminus':
                    if (currentNum.startsWith('-')) {
                        currentNum = currentNum.substring(1);
                    } else {
                        currentNum = `-${currentNum}`;
                    }
                    updateScreen(currentNum);
                    break;
                case 'percentage':
                    // move decimal place two spaces, 1 to .01
                    //update screen
                    break;
            }
            break;
    }
});