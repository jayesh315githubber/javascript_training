// array push pop 

// array shift unshift 

let fruits = ["apple", "mango", "grapes"];
console.log(fruits);

// push 
fruits.push("banana");        // it will add at the last 
console.log(fruits);

// pop -> last element from the array will be removed from the array and return it.
let poppedFruit = fruits.pop();
console.log(fruits);
console.log("popped fruits is", poppedFruit);

// unshift -> inserts new elements at the start of an array, and returns the new length of the array..
let length1 = fruits.unshift("banana");
console.log(length1);
let length2 = fruits.unshift("myfruit");
console.log(length2);
console.log(fruits);

// shift  -> removed the 1st elem from the array and return it.
let removedFruit = fruits.shift();
console.log(fruits);
console.log("removed fruits is ", removedFruit);