// clone nodes -> cloneNode(true or false)

/*
we cannot use append and prepend simultenously.
so to add element at the start as well as at the end we have to clone the element.
*/


const ul = document.querySelector(".todo-list");

const li = document.createElement("li");
li.textContent = "new todo";

const li2 = li.cloneNode(true);       // note - true for deep cloning

ul.append(li);

ul.prepend(li2);
