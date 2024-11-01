import { backend } from 'declarations/backend';

let firstNumber = '';
let secondNumber = '';
let currentOperation = null;
let shouldResetDisplay = false;

const display = document.getElementById('display');

window.appendToDisplay = (value) => {
    if (shouldResetDisplay) {
        display.value = '';
        shouldResetDisplay = false;
    }
    display.value += value;
};

window.setOperation = (operation) => {
    if (currentOperation !== null) calculate();
    firstNumber = display.value;
    currentOperation = operation;
    shouldResetDisplay = true;
};

window.clearDisplay = () => {
    display.value = '';
    firstNumber = '';
    secondNumber = '';
    currentOperation = null;
};

window.calculate = async () => {
    if (currentOperation === null) return;

    secondNumber = display.value;
    let result;

    try {
        switch (currentOperation) {
            case '+':
                result = await backend.add(parseFloat(firstNumber), parseFloat(secondNumber));
                break;
            case '-':
                result = await backend.subtract(parseFloat(firstNumber), parseFloat(secondNumber));
                break;
            case '*':
                result = await backend.multiply(parseFloat(firstNumber), parseFloat(secondNumber));
                break;
            case '/':
                result = await backend.divide(parseFloat(firstNumber), parseFloat(secondNumber));
                break;
        }

        display.value = result.toString();
    } catch (error) {
        display.value = 'Error';
    }

    currentOperation = null;
    shouldResetDisplay = true;
};
