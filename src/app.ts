// onclick="displayButtonInfo(this.value)"
// function displayButtonInfo(v: string) {
//   alert(`${v}`);
// }

interface appState {
  dark: boolean;
}
let appState: appState = {
  dark: false,
};

function changeBgc(v: string) {
  document.querySelector("body").style.backgroundColor = v;
}

function toggleDark() {
  const body: HTMLBodyElement = document.querySelector("body");
  const input: element = document.querySelector("input");
  if (appState.dark) {
    body.classList.remove("dark");
    input.classList.remove("dark");
    toggleSelected(darkBtn);
    appState.dark = false;
  } else {
    body.classList.add("dark");
    input.classList.add("dark");
    toggleSelected(darkBtn);
    appState.dark = true;
  }
}

function toggleSelected(selectedBtn: Element) {
  if (selectedBtn.classList.contains("selected")) {
    selectedBtn.classList.remove("selected");
  } else {
    selectedBtn.classList.add("selected");
  }
}

function toggleHistory() {
  toggleSelected(historyBtn);
}
function toggleScientific() {
  toggleSelected(scientificBtn);
}

const historyBtn: Element = document.querySelector("#history-mode");
const scientificBtn: Element = document.querySelector("#sceintific-mode");
const darkBtn: Element = document.querySelector("#dark-mode");

darkBtn.addEventListener("click", (): void => toggleDark());
historyBtn.addEventListener("click", (): void => toggleHistory());
scientificBtn.addEventListener("click", (): void => toggleScientific());
