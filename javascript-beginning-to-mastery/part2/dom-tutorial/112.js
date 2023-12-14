// classList property and methods
// add(), remove(), toggle(), contains()

const sectionTodo = document.querySelector(".section-todo");
console.log(sectionTodo);
console.log(sectionTodo.classList);   // return the array class attribute values

sectionTodo.classList.add('bg-dark');
sectionTodo.classList.remove("container");

const ans = sectionTodo.classList.contains("container");
console.log(ans);

// toggle -> if present then it will remove  and  if not present it will add

// sectionTodo.classList.toggle("bg-dark");
// sectionTodo.classList.toggle("bg-dark");

const header = document.querySelector(".header");
header.classList.add("bg-dark");
console.log(header.classList);
