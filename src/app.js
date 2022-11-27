// onclick="displayButtonInfo(this.value)"
// function displayButtonInfo(v: string) {
//   alert(`${v}`);
// }
let appState = {
  dark: false,
  scientificMode: false,
  remoteMode: false,
};
function changeBgc(v) {
  document.querySelector("body").style.backgroundColor = v;
}
function toggleDark() {
  const body = document.querySelector("body");
  const input = document.querySelector("input");
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
function toggleSelected(selectedBtn) {
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
  appState.scientificMode
    ? (appState.scientificMode = false)
    : (appState.scientificMode = true);
}
function toggleRemote() {
  toggleSelected(remoteBtn);
  appState.remoteMode
    ? (appState.remoteMode = false)
    : (appState.remoteMode = true);
}
const historyBtn = document.querySelector("#history-mode");
const scientificBtn = document.querySelector("#sceintific-mode");
const darkBtn = document.querySelector("#dark-mode");
const remoteBtn = document.querySelector("#remote-mode");
darkBtn.addEventListener("click", () => toggleDark());
historyBtn.addEventListener("click", () => toggleHistory());
scientificBtn.addEventListener("click", () => {
  toggleScientific();
});
remoteBtn.addEventListener("click", () => toggleRemote());
