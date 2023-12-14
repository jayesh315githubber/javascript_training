// document.createElement()
// append  - add the element at the last
// appendChild
// prepend  - add the element at the start
// remove -

// const newTodoItem = document.createElement("li");
// console.log(document);

// newTodoItem.textContent = "Teach students";
// console.log(newTodoItem);

// const newTodoItemText = document.createTextNode("Teach students");
// console.log(newTodoItemText);

// const todoList = document.querySelector(".todo-list");
// todoList.append(newTodoItem);
// console.log(newTodoItem);


// const todoList = document.querySelector(".todo-list");
// todoList.prepend(newTodoItem);
// console.log(newTodoItem);

// const todo1 = document.querySelector('.todo-list li');
// todo1.remove();
// console.log(todo1)


// before
// after

const newTodoItem = document.createElement("li");
newTodoItem.textContent = "Teach students";

const todoList = document.querySelector(".todo-list");
todoList.after(newTodoItem);