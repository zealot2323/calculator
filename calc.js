let displayValue = 0;
let currentNum = '';
let previousNum = 0;
let previousOp;
let previousOpTarget;

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
     
    if (displayValue.length > 9) {
        screen.textContent = displayValue.substring(0, 10);
    } else {
        screen.textContent = displayValue;
    }
}

buttons.addEventListener('click', (event) => {
    let target = event.target;

    if(previousOpTarget) {
        //reset button colors
        previousOpTarget.style.opacity = 1.0;
    }

    switch(target.className) {
        case 'num': 
            currentNum += target.textContent;
            displayValue = currentNum;
            updateScreen();
            break;
        case 'operator':
            
            if(!previousOp && target.id !== 'equals') {
                previousNum = Number(currentNum);
                previousOp = target.id;
                currentNum = '';
            } else if (previousOp && target.id !== 'equals') {
                displayValue = operate(previousOp, Number(previousNum), Number(currentNum)).toString();
                updateScreen();
                previousNum = Number(displayValue);
                previousOp = target.id;
                currentNum = '';
            } else if (target.id === 'equals' && currentNum && previousOp) {
                displayValue = operate(previousOp, Number(previousNum), Number(currentNum)).toString();
                updateScreen();
                previousNum = Number(displayValue);
                previousOp = null;
                currentNum = '';
            };
            
            if (target.id !== 'equals') {
                previousOpTarget = target;
                target.style.opacity = 0.8;
            };
            break;
        case 'misc':
            switch(target.id) {
                case 'clear':
                    currentNum = '';
                    previousOp = '';
                    displayValue = 0;
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