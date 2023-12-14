const mainButton = document.querySelector("button");
const body = document.body;
const currentColor = document.querySelector(".current-color");

// Math.random()  => gives the number between 0.0 - 0.99
// Math.random() * 10  => gives the number between 0.000-9.999
function randomColorGenerator() {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const randomColor = `rgb(${red}, ${green}, ${blue})`
    return randomColor;
}

mainButton.addEventListener("click", () => {
    const randomColor = randomColorGenerator();
    body.style.backgroundColor = randomColor;
    currentColor.textContent = randomColor;
})