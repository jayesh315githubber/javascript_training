// hoisting
// Hoisting is JavaScript's default behavior of moving all declarations to the top of the current scope 

console.log(this);
console.log(window);

console.log(myFunction);  // return the function code bcz of function declaration.

console.log(fullName);

var age;
console.log(age);

function myFunction() {        // function declaration   - first world is function 
    console.log("this is my function");
}

age = 28;

var firstName = "Harshit";
var lastName = "Sharma"
var fullName = firstName + " " + lastName;

console.log(fullName);