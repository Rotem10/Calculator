let state = {
    value: 0,
    firstOperand: null,
    secondOperand: null,
    operator: null,
};
const operands = Array.from(document.querySelectorAll(".operand"));
const operators = Array.from(document.querySelectorAll(".operator"));
const updatedFirstOperand = (val) => {
    let updatedFirstOperand = state.firstOperand.toString() + val;
    state.firstOperand = parseInt(updatedFirstOperand);
};
const updatedSecondOperand = (val) => {
    let updatedSecondOperand = state.secondOperand.toString() + val;
    state.secondOperand = parseInt(updatedSecondOperand);
};
function updateOperand(el) {
    const dig = parseInt(el.value);
    if (!state.firstOperand) {
        state.firstOperand = dig;
    }
    else if (!state.operator) {
        updatedFirstOperand(el.value);
        console.log(state.firstOperand);
    }
    else {
        if (!state.secondOperand) {
            state.secondOperand = dig;
        }
        else {
            updatedSecondOperand(el.value);
            console.log(state.secondOperand);
        }
    }
}
// if (el.value === ".") {
//     if (!state.secondOperand) {
//       updatedFirstOperand(el.value);
//     } else {
//       updatedSecondOperand(el.value);
//     }
//   } else {}
function updateOperator(el) {
    state.operator = el.value;
}
operands.forEach((el) => el.addEventListener("click", () => updateOperand(el)));
operators.forEach((el) => el.addEventListener("click", () => updateOperator(el)));
// document.addEventListener("DOMContentLoaded", () => {});
