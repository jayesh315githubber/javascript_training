// for loop in array 

let fruits = ["apple", "mango", "grapes", "banana"];

for (let i = 0; i <= 9; i++) {
    console.log(i);
}

console.log("-------------------")

console.log(fruits.length);
console.log(fruits[fruits.length - 2]);

console.log("-------------------")

let fruits2 = [];    // creat a empty array

for (let i = 0; i < fruits.length; i++) {
    fruits2.push(fruits[i].toUpperCase());
}

console.log(fruits2);