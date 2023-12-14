
// decorator function takes a function and return function 
// if we want to increase the functionality of any function that time we use decorator function.


function decorator(func) {
    return function (...args) {
        console.log("you are calling decorated", func.name);
        func.call(this, ...args);
    }
}

function hello() {
    console.log("hello world");
}

function hi(name) {
    console.log("hi", name);
}

const decoratedHi = decorator(hi);
decoratedHi("jayesh");