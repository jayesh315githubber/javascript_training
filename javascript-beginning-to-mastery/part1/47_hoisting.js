// hoisting
/*
- Hoisting is JavaScript's default behavior of moving all declarations to the top of the current scope.
- a variable can be used before it has been declared.

let and const Keywords =>
-Variables defined with let and const are hoisted to the top of the block, but not initialized.
-Meaning: The block of code is aware of the variable, but it cannot be used until it has been declared.
-Using a let variable before it is declared will result in a ReferenceError.
-The variable is in a "temporal dead zone" from the start of the block until it is declared
*/

// --------------------------------
// hello();

// function hello() {
//     console.log("hello world");
// }

// ----------------------------------------------

// hello();    /// will get the error - run only in the case of function declaration.
// const hello = function () {
//     console.log("hello world");
// }

//  ---------------------------------------------------

// hello();    /// will get the error
// const hello = () => {
//     console.log("hello world");
// }

// console.log(hello());

//  ---------------------------------------------------

// note => for var- undefined ,
//         for let, const - will get error

console.log(hello);
// const hello = 'hello world'
var hello = 'hello world'
console.log(hello)
