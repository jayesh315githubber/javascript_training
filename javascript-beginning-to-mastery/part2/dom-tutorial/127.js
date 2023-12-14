// keypress event

// mouseover event
// mouseleave event

const body = document.body;
console.log(body);

body.addEventListener("keypress", (e) => {
    console.log(e.key);
});

const mainButton = document.querySelector(".btn-headline");
console.log(mainButton);

mainButton.addEventListener("mouseover", () => {
    console.log("mouseover event ocurred!!!");
});

mainButton.addEventListener("mouseleave", () => {
    console.log("mouseleave event ocurred!!!");
});
