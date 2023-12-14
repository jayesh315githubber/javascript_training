// static list vs live list
/*
querySelectorAll - gives static list 
getElementsBy___ - gives live list
*/

const ul = document.querySelector(".todo-list");
const listItems = ul.getElementsByTagName("li");

const sixthLi = document.createElement("li");
sixthLi.textContent = "item 6";

ul.append(sixthLi);
console.log(listItems);