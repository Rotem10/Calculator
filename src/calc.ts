interface state {
  result: number;
  firstOperand: number | null;
  secondOperand: number | null;
  operator: string | null;
  decimal: boolean;
}

type element = HTMLInputElement | null;

let state: state = {
  result: 0,
  firstOperand: null,
  secondOperand: null,
  operator: null,
  decimal: false,
};

let copyState: state = {
  result: 0,
  firstOperand: null,
  secondOperand: null,
  operator: null,
  decimal: false,
};

const backBtn = document.querySelector(".back");
backBtn.addEventListener("click", (): void => back(true));

function back(goBack: boolean) {
  if (!goBack) {
    copyState = JSON.parse(JSON.stringify(state));
  } else {
    state = copyState;
    if (state.result) {
      renderScreen(true);
    } else {
      renderScreen(false);
    }
  }
}

const operands: element[] = Array.from(document.querySelectorAll(".operand"));

const operators: element[] = Array.from(document.querySelectorAll(".operator"));

const updatedFirstOperand = (val: string) => {
  let updatedFirstOperand: string = state.firstOperand.toString() + val;
  state.firstOperand = parseFloat(updatedFirstOperand);
};
const updatedSecondOperand = (val: string) => {
  let updatedSecondOperand: string = state.secondOperand.toString() + val;
  state.secondOperand = parseFloat(updatedSecondOperand);
};

function updateOperand(el: element) {
  if (el.value === ".") {
    state.decimal = true;
  } else {
    const dig: number = parseInt(el.value);
    if (state.decimal) {
      if (state.secondOperand === null) {
        updatedFirstOperand("." + el.value);
        state.decimal = false;
      } else {
        updatedSecondOperand("." + el.value);
        state.decimal = false;
      }
    } else {
      if (state.firstOperand === null) {
        state.firstOperand = dig;
      } else if (!state.operator) {
        updatedFirstOperand(el.value);
      } else {
        if (state.secondOperand === null) {
          state.secondOperand = dig;
        } else {
          updatedSecondOperand(el.value);
        }
      }
    }
  }
}

function updateOperator(el: element) {
  if (!state.firstOperand) {
    console.log("missing operand");
  } else {
    state.operator = el.value;
  }
}

operands.forEach((el: element) =>
  el.addEventListener("click", (): void => {
    back(false);
    if (!appState.remoteMode) {
      updateOperand(el);
      renderScreen(false);
    } else {
      updateExp(el);
      renderRemote();
    }
  })
);
operators.forEach((el: element) =>
  el.addEventListener("click", (): void => {
    back(false);
    if (!appState.remoteMode) {
      updateOperator(el);
      renderScreen(false);
    } else {
      updateExp(el);
      renderRemote();
    }
  })
);

const evalBtn: element = document.querySelector(".eval");
evalBtn.addEventListener("click", (): void => {
  back(false);
  if (!appState.remoteMode) {
    updateResult();
    renderScreen(true);
    clearState();
  } else {
    solveExp();
    renderRemote();
    clearRemote();
  }
});

function updateResult() {
  let res: number = 0;
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

const clearBtn: element = document.querySelector(".clear");
clearBtn.addEventListener("click", (): void => {
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

const screenInp: element = document.querySelector(".calculator-screen");

function renderScreen(result: boolean) {
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
  } else {
    let exp = `${displayState.firstOperand} ${displayState.operator} ${displayState.secondOperand}`;
    screenInp.value = exp;
  }
}

// ----------------- remote mode ---------------
let expression: string = "";

function updateExp(el: element) {
  if (
    el.value === "+" ||
    el.value === "-" ||
    el.value === "*" ||
    el.value === "/"
  ) {
    expression = expression + ` ${el.value} `;
  } else {
    expression = expression + el.value;
  }
}

function renderRemote(toRender = expression) {
  screenInp.value = toRender;
}

function solveExp() {
  let arrExp: string[] = expression.split(" ");
  arrExp.filter((e) => {
    e === " ";
  });
  let newExp: string = encodeURIComponent(arrExp.join(""));
  let url: string = "http://api.mathjs.org/v4/?expr=";
  url = url + newExp;
  getResult(url);
}

async function getResult(url: string) {
  try {
    let response = await fetchWithTimeout(url);
    let result = await response.text();
    renderRemote(result);
    console.log(result);
  } catch (err) {
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
