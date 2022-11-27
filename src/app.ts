// onclick="displayButtonInfo(this.value)"
// function displayButtonInfo(v: string) {
//   alert(`${v}`);
// }

interface appState {
  dark: boolean;
  scientificMode: boolean;
  remoteMode: boolean;
}
let appState: appState = {
  dark: false,
  scientificMode: false,
  remoteMode: false,
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
  const historySec = document.getElementById("history");
  historySec.classList.contains("hide")
    ? historySec.classList.remove("hide")
    : historySec.classList.add("hide");
}
function toggleScientific() {
  toggleSelected(scientificBtn);
  appState.scientificMode = true;
  const scientificSec = document.getElementById("scientific");
  scientificSec.classList.contains("hide")
    ? scientificSec.classList.remove("hide")
    : scientificSec.classList.add("hide");
  // appState.scientificMode
  //   ? (appState.scientificMode = false)
  //   : (appState.scientificMode = true);
}

function toggleRemote() {
  toggleSelected(remoteBtn);
  appState.remoteMode
    ? (appState.remoteMode = false)
    : (appState.remoteMode = true);
}

const historyBtn: Element = document.querySelector("#history-mode");
const scientificBtn: Element = document.querySelector("#sceintific-mode");
const darkBtn: Element = document.querySelector("#dark-mode");
const remoteBtn: Element = document.querySelector("#remote-mode");

darkBtn.addEventListener("click", (): void => toggleDark());
historyBtn.addEventListener("click", (): void => toggleHistory());
scientificBtn.addEventListener("click", (): void => {
  toggleScientific();
});
remoteBtn.addEventListener("click", (): void => toggleRemote());
