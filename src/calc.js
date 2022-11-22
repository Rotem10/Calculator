let state = {
    result: 0,
    firstOperand: null,
    secondOperand: null,
    operator: null,
    decimal: false,
};
const operands = Array.from(document.querySelectorAll(".operand"));
const operators = Array.from(document.querySelectorAll(".operator"));
const updatedFirstOperand = (val) => {
    let updatedFirstOperand = state.firstOperand.toString() + val;
    state.firstOperand = parseFloat(updatedFirstOperand);
};
const updatedSecondOperand = (val) => {
    let updatedSecondOperand = state.secondOperand.toString() + val;
    state.secondOperand = parseFloat(updatedSecondOperand);
};
function updateOperand(el) {
    if (el.value === ".") {
        state.decimal = true;
    }
    else {
        const dig = parseInt(el.value);
        if (state.decimal) {
            if (!state.secondOperand) {
                updatedFirstOperand("." + el.value);
                state.decimal = false;
            }
            else {
                updatedSecondOperand("." + el.value);
                state.decimal = false;
            }
        }
        else {
            if (!state.firstOperand) {
                state.firstOperand = dig;
            }
            else if (!state.operator) {
                updatedFirstOperand(el.value);
            }
            else {
                if (!state.secondOperand) {
                    state.secondOperand = dig;
                }
                else {
                    updatedSecondOperand(el.value);
                }
            }
        }
    }
    console.log(state);
}
function updateOperator(el) {
    state.operator = el.value;
}
operands.forEach((el) => el.addEventListener("click", () => {
    updateOperand(el);
    renderScreen(false);
}));
operators.forEach((el) => el.addEventListener("click", () => {
    updateOperator(el);
    renderScreen(false);
}));
const evalBtn = document.querySelector(".eval");
evalBtn.addEventListener("click", () => {
    updateResult();
    renderScreen(true);
    clearState();
});
function updateResult() {
    let res = 0;
    switch (state.operator) {
        case "+":
            res = state.firstOperand + state.secondOperand;
            break;
        case "-":
            res = state.firstOperand - state.secondOperand;
            break;
        case "*":
            res = state.firstOperand * state.secondOperand;
            break;
        case "/":
            res = state.firstOperand / state.secondOperand;
            break;
    }
    state.result = res;
    console.log(state.result);
}
const clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", () => {
    clearState();
    renderScreen(false);
});
function clearState() {
    state = {
        result: 0,
        firstOperand: null,
        secondOperand: null,
        operator: null,
        decimal: false,
    };
    console.log(state);
}
function renderScreen(result) {
    let displayState = JSON.parse(JSON.stringify(state));
    if (!displayState.firstOperand) {
        displayState.firstOperand = "";
    }
    if (!displayState.secondOperand) {
        displayState.secondOperand = "";
    }
    if (!displayState.operator) {
        displayState.operator = "";
    }
    // if (displayState.operator === "/") {
    //   displayState.operator = "&divide";
    // }
    console.log(displayState);
    const screenInp = document.querySelector(".calculator-screen");
    if (result) {
        screenInp.value = displayState.result;
    }
    else {
        screenInp.value = `${displayState.firstOperand} ${displayState.operator} ${displayState.secondOperand}`;
    }
}
