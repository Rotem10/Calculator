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
    if (!appState.remoteMode) {
        updateOperand(el);
        renderScreen(false);
    }
    else {
        updateExp(el);
        renderRemote();
    }
}));
operators.forEach((el) => el.addEventListener("click", () => {
    back(false);
    if (!appState.remoteMode) {
        updateOperator(el);
        renderScreen(false);
    }
    else {
        updateExp(el);
        renderRemote();
    }
}));
const evalBtn = document.querySelector(".eval");
evalBtn.addEventListener("click", () => {
    back(false);
    if (!appState.remoteMode) {
        updateResult();
        renderScreen(true);
        clearState();
    }
    else {
        solveExp();
        renderRemote();
        clearRemote();
    }
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
    clearRemote();
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
const screenInp = document.querySelector(".calculator-screen");
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
    if (result) {
        screenInp.value = displayState.result;
    }
    else {
        let exp = `${displayState.firstOperand} ${displayState.operator} ${displayState.secondOperand}`;
        screenInp.value = exp;
    }
}
// ----------------- remote mode ---------------
let expression = "";
function updateExp(el) {
    if (el.value === "+" ||
        el.value === "-" ||
        el.value === "*" ||
        el.value === "/") {
        expression = expression + ` ${el.value} `;
    }
    else {
        expression = expression + el.value;
    }
}
function renderRemote(toRender = expression) {
    screenInp.value = toRender;
}
function solveExp() {
    let arrExp = expression.split(" ");
    arrExp.filter((e) => {
        e === " ";
    });
    let newExp = encodeURIComponent(arrExp.join(""));
    let url = "http://api.mathjs.org/v4/?expr=";
    url = url + newExp;
    getResult(url);
}
async function getResult(url) {
    try {
        let response = await fetchWithTimeout(url);
        let result = await response.text();
        renderRemote(result);
        console.log(result);
    }
    catch (err) {
        alert(err);
        console.log(err);
    }
}
async function fetchWithTimeout(url, timeout = 2000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    const response = await fetch(url, {
        signal: controller.signal,
    });
    clearTimeout(id);
    return response;
}
function clearRemote() {
    expression = "";
}
