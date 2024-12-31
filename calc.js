let displayValue = 0;
let currentNum = '';
let currentOp;
let previousNum = 0;
let previousOp;

const screen = document.querySelector('#screen');
screen.textContent = displayValue;

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

const updateScreen = function() {
        screen.textContent = displayValue;
}

buttons.addEventListener('click', (event) => {
    let target = event.target;

    if(previousOp) {
        //reset button colors
        previousOp.style.opacity = 1.0;
    }

    switch(target.className) {
        case 'num': 
            currentNum += target.textContent;
            displayValue = currentNum;
            updateScreen();
            break;
        case 'operator':
            if (target.id === 'equals' && currentNum !== '' && currentOp) {
                currentNum = Number(currentNum);
                displayValue = operate(currentOp, previousNum, currentNum);
                updateScreen();
                currentOp = '';
                currentNum = '';
            } else if (target.id !== 'equals') {
                currentOp = target.id;
                previousNum = Number(currentNum);
                currentNum = '';
                previousOp = target;
                target.style.opacity = 0.8;
            };
            decPressed = false;
            break;
        case 'misc':
            switch(target.id) {
                case 'clear':
                    currentNum = '';
                    currentOp = '';
                    decPressed = false;
                    displayValue = '0';
                    updateScreen();
                    break;
                case 'plusminus':
                    if (currentNum.startsWith('-')) {
                        currentNum = currentNum.substring(1);
                    } else {
                        currentNum = `-${currentNum}`;
                    }
                    displayValue = currentNum;
                    updateScreen();
                    break;
                case 'percentage':
                    currentNum = Number(currentNum) / 100;
                    displayValue = currentNum;
                    updateScreen();
                    break;
            };
            break;
        case 'decimal':
            if(!displayValue.includes('.')) {
                currentNum += '.';
                displayValue = currentNum;
                updateScreen();
            }
            break;
    };
});