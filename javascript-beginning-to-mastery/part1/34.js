// for in loop in array

const fruits = ["apple", "mango", "grapes", "fruit4", "fruit5"];
const fruits2 = [];

// for (let index in fruits) {
//     fruits2.push(fruits[index].toUpperCase());
// }

// console.log(fruits2);


// for of loop in array

for (let fruit of fruits) {
    fruits2.push(fruit);
}

console.log(fruits2);