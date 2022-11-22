// onclick="displayButtonInfo(this.value)"
// function displayButtonInfo(v: string) {
//   alert(`${v}`);
// }
let appState = {
    dark: false,
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
        appState.dark = false;
    }
    else {
        body.classList.add("dark");
        input.classList.add("dark");
        appState.dark = true;
    }
}
const darkBtn = document.querySelector(".dark-mode");
darkBtn.addEventListener("click", () => toggleDark());
// document.addEventListener("DOMContentLoaded", () => {});
