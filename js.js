const display = document.querySelector(".ekran");
const keys = document.querySelector(".buttons");
let displayValue = "0";
let firstNum = null;
let operator = null;
let secondNum = false; // false olma sebebi operatör olmadan yeni değer girmeyi kontrol eder.

updateDisplay();

function updateDisplay() {
    display.value = displayValue;
}

keys.addEventListener("click", function(e) {
    const element = e.target;

    if (!element.matches("button")) return; // tıklanan yer button değilse return diyerek kodu çalıştırmamasını sağladık.

    if (element.classList.contains("btn_operator")) {
        //console.log("operator", element.value);
        handleOperator(element.value);
        updateDisplay();
        return;
    }

    if (element.classList.contains("decimal")) {
        //console.log("decimal", element.value);
        inputDecimal(element.value);
        updateDisplay();
        return;
    }

    if (element.classList.contains("clear")) {
        //console.log("clear", element.value);
        clear();
        updateDisplay();
        return;
    }
    
    //console.log("number", element.value);
    inputNumber(element.value);
    updateDisplay();
});

function handleOperator(operator2) {
    const value = parseFloat(displayValue);

    if(operator && secondNum) {
        operator = operator2;
        return;
    }

    if(firstNum === null) {
        firstNum = value;
    }
    else if(operator) {
        
       
        const result = calculus(firstNum, value, operator);
        displayValue = String(result);
        firstNum = result;
        
    }

    secondNum = true;
    operator = operator2;
    console.log(displayValue, firstNum, operator, secondNum)

}

function calculus(first, second, operator) {
    if(operator === "+") {
        return first + second;
    }
    else if(operator === "-") {
        return first - second;
    }
    else if(operator === "*") {
        return first * second;
    }
    else if(operator === "/") {
        return first / second;
    }
    else if(operator === "^") {
        return Math.pow(first, second);
    }
    return second;
}


function inputNumber(num) {
    if(secondNum) {
        displayValue = num;
        secondNum = false;
    }
    else {
        displayValue = displayValue === "0"? num: displayValue + num;

    }
    console.log(displayValue, firstNum, operator, secondNum)
}

function inputDecimal() {
    if(!displayValue.includes(".")) {
    displayValue += ".";
    }
}

function clear() {
    displayValue ="0";
}