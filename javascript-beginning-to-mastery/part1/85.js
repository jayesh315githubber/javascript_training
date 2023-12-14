// let numbers = [1,2,3];   // internally jscript create the array with the help of new keyword

let numbers = new Array(1, 2, 3);          // bcz of new keyword

console.log(Array.prototype);

console.log(Object.getPrototypeOf(numbers));              // Object.getPrototyprOf

console.log(Array.prototype);      // prototype contains all the array methods

console.log(numbers);

function hello() {
    console.log("hello");
}

console.log(hello.prototype);

// by default when we crate the function we get prototype as property
