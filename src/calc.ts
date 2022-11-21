interface state {
  value: number;
  firstOperand: number | null;
  secondOperand: number | null;
  operator: string | null;
}

type element = HTMLInputElement | null;

let state: state = {
  value: 0,
  firstOperand: null,
  secondOperand: null,
  operator: null,
};

const operands: element[] = Array.from(document.querySelectorAll(".operand"));

const operators: element[] = Array.from(document.querySelectorAll(".operator"));

const updatedFirstOperand = (val: string) => {
  let updatedFirstOperand: string = state.firstOperand.toString() + val;
  state.firstOperand = parseInt(updatedFirstOperand);
};
const updatedSecondOperand = (val: string) => {
  let updatedSecondOperand: string = state.secondOperand.toString() + val;
  state.secondOperand = parseInt(updatedSecondOperand);
};

function updateOperand(el: element) {
  const dig: number = parseInt(el.value);
  if (!state.firstOperand) {
    state.firstOperand = dig;
  } else if (!state.operator) {
    updatedFirstOperand(el.value);
    console.log(state.firstOperand);
  } else {
    if (!state.secondOperand) {
      state.secondOperand = dig;
    } else {
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

function updateOperator(el: element) {
  state.operator = el.value;
}

operands.forEach((el: element) =>
  el.addEventListener("click", (): void => updateOperand(el))
);
operators.forEach((el: element) =>
  el.addEventListener("click", (): void => updateOperator(el))
);

// document.addEventListener("DOMContentLoaded", () => {});
