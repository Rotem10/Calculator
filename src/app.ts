function info() {
  alert("Rotem Yosef \n version 1.0 \n Calculator");
}

function displayButtonInfo(v: string) {
  alert(`${v}`);
}

function changeBgc(v: string) {
  const body: HTMLElement = document.querySelector("body") as HTMLElement;
  body.style.backgroundColor = v;
}

function load() {}

document.addEventListener<any>("DOMContentLoaded", () => {
  load();
});
