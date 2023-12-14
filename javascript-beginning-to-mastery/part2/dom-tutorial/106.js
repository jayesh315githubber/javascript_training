// change the styles of elements

const mainHeading = document.querySelector("div.headline h2");
console.log(mainHeading.style);     // will give the style object

mainHeading.style.backgroundColor = "blue";    //note - not background-color
mainHeading.style.border = "20px solid green";
