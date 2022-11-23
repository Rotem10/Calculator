let state = {
    result: 0,
    firstOperand: null,
    secondOperand: null,
    operator: null,
    decimal: false,
};
let copyState = {
    result: 0,
    firstOperand: null,
    secondOperand: null,
    operator: null,
    decimal: false,
};
const backBtn = document.querySelector(".back");
backBtn.addEventListener("click", () => back(true));
function back(goBack) {
    if (!goBack) {
        copyState = JSON.parse(JSON.stringify(state));
    }
    else {
        state = copyState;
        if (state.result) {
            renderScreen(true);
        }
        else {
            renderScreen(false);
        }
    }
}
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
            if (state.secondOperand === null) {
                updatedFirstOperand("." + el.value);
                state.decimal = false;
            }
            else {
                updatedSecondOperand("." + el.value);
                state.decimal = false;
            }
        }
        else {
            if (state.firstOperand === null) {
                state.firstOperand = dig;
            }
            else if (!state.operator) {
                updatedFirstOperand(el.value);
            }
            else {
                if (state.secondOperand === null) {
                    state.secondOperand = dig;
                }
                else {
                    updatedSecondOperand(el.value);
                }
            }
        }
    }
}
function updateOperator(el) {
    if (!state.firstOperand) {
        console.log("missing operand");
    }
    else {
        state.operator = el.value;
    }
}
operands.forEach((el) => el.addEventListener("click", () => {
    back(false);
    updateOperand(el);
    renderScreen(false);
}));
operators.forEach((el) => el.addEventListener("click", () => {
    back(false);
    updateOperator(el);
    renderScreen(false);
}));
const evalBtn = document.querySelector(".eval");
evalBtn.addEventListener("click", () => {
    back(false);
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
    const screenInp = document.querySelector(".calculator-screen");
    if (result) {
        screenInp.value = displayState.result;
    }
    else {
        screenInp.value = `${displayState.firstOperand} ${displayState.operator} ${displayState.secondOperand}`;
    }
}
