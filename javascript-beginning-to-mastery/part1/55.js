// function returning function 

/*
Higher Order Function ->
Higher order functions are functions that take one or more functions as arguments, 
or return a function as their result
*/

function myFunc() {

    function hello() {
        return "hello world"
    }

    return hello;            // return the hello function
}

function myFunc() {

    return function hello() {
        return "hello world"
    }
}

const ans = myFunc();        // it return the function so ans becomes function
console.log(ans());          // note  - call like function with () 
// ans()

//  higher order function - function which accept input or return function or perform both called as h.o.f 
