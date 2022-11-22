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
    appState.dark = false;
  } else {
    body.classList.add("dark");
    input.classList.add("dark");
    appState.dark = true;
  }
}

const darkBtn: Element = document.querySelector(".dark-mode");
darkBtn.addEventListener("click", (): void => toggleDark());

// document.addEventListener("DOMContentLoaded", () => {});
