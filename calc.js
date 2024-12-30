let sum = 0;
let currentNum = '';
let currentOp;
let previousNum = 0;
let previousOp;
let decPressed = false;

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

    if(previousOp) {
        //reset button colors
        previousOp.style.opacity = 1.0;
    }

    switch(target.className) {
        case 'num':
            //keep the current number unless an operator is pressed, this helps the misc buttons work in the case of pressing an operator but no number then selecting a misc button
            if(currentOp) {
                currentNum = '';
            }
            //check if the decimal button was pressed so we only add it once
            if (target.id === 'decimal' && decPressed) {
                break;
            } else if (target.id === 'decimal' && !decPressed) {
                currentNum += target.textContent;
                decPressed = true;
            } else {
                currentNum += target.textContent;
            };
            updateScreen(currentNum);
            break;
        case 'operator':
            if (target.id === 'equals' && currentNum !== '' && currentOp) {
                currentNum = Number(currentNum);
                sum = operate(currentOp, previousNum, currentNum);
                updateScreen(sum, 'equals');
                currentOp = '';
                currentNum = '';
            } else if (target.id !== 'equals') {
                currentOp = target.id;
                previousNum = Number(currentNum);
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
                    currentNum = Number(currentNum) / 100;
                    updateScreen(currentNum);
                    break;
            }
            break;
    }
});