// Add new HTML elements to page 

// innerHTML to add html element 
// note -> not recommended bcz of performance issue (it re-render all the element.)
// when you should use it , when you should not
// when we have to replace all the HTML instead of add HTML

// -------------------innerHTML----------------------
const todoList = document.querySelector(".todo-list");
console.log(todoList);
console.log(todoList.innerHTML)

// todoList.innerHTML = "<li>New Todo 2 </li>"
// console.log(todoList.innerHTML);

// todoList.innerHTML += "<li>New Todo </li>";
// todoList.innerHTML += "<li>teach students </li>";
// console.log(todoList.innerHTML);


//  -------------- insertAdjacentElement()---------------------
todoList.insertAdjacentElement("afterbegin", '<li> Hi </li>')
// console.log(todoList.innerHTML);

const temp = document.createElement("li");
temp.innerText = "Hi";
todoList.insertAdjacentElement("afterbegin", temp);
