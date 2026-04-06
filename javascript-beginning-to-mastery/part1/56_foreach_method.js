// important array methods

// forEach
// Syntax: array.forEach(function(value, index, array) { })
//                              ↑       ↑       ↑
//                         current   position  the whole
//                         element   number    array (rarely used)
//
// forEach calls a function for EACH element in the array.
// It always returns undefined (NOT chainable like map).

const numbers = [4, 2, 5, 8];

// ========== Way 1: Named function as callback ==========
function myFunc(number, index) {
    console.log(`index is ${index} number is ${number}`);
}

// ========== Way 2: Anonymous function ==========
numbers.forEach(function (number, index) {
    console.log(`index is ${index} number is ${number}`);
});
// index is 0 number is 4
// index is 1 number is 2
// index is 2 number is 5
// index is 3 number is 8

// numbers.forEach(myFunc);  // note- we can directly pass the function(callback) as argument to the foreach
//                            // pass function NAME without () — don't call it, just pass reference!

numbers.forEach(function (number, index) {       // anonymous function as arg
    console.log(number * 3, index);
})
// 12 0
// 6  1
// 15 2
// 24 3

// ========== forEach with array of objects ==========
const users = [
    { firstName: "harshit", age: 23 },
    { firstName: "mohit", age: 21 },
    { firstName: "nitish", age: 22 },
    { firstName: "garima", age: 20 },
]

function func(user) {
    console.log("2 " + user.firstName);
}

users.forEach(func)   // forEach function take callback function as input

// users.forEach(function (user) {
//     console.log(user.firstName);
// });

// ========== Way 3: Arrow function (cleanest) ==========
users.forEach((user, index) => {
    console.log(user.firstName, index);
})
// harshit 0
// mohit 1
// nitish 2
// garima 3

// ========== Same thing with for...of ==========
for (let user of users) {
    console.log(user.firstName);
}


// ========== forEach LIMITATIONS (Important for Interviews!) ==========
//
// 1. Can't BREAK out:
//    numbers.forEach(num => {
//        if (num === 5) break;    // ❌ SyntaxError!
//    });
//    Fix: use for...of or regular for loop
//
// 2. Can't use AWAIT properly:
//    numbers.forEach(async (num) => {
//        await fetch(url);        // ❌ Won't wait! All fire at once
//    });
//    Fix: use for...of with await
//
// 3. return doesn't exit — only skips current iteration:
//    numbers.forEach(num => {
//        if (num === 2) return;   // skips 2, but continues to 5, 8
//        console.log(num);        // 4, 5, 8 (2 skipped)
//    });
//
// 4. Returns undefined — NOT chainable:
//    numbers.forEach(...).map(...)  // ❌ TypeError! forEach returns undefined
//    numbers.map(...).filter(...)   // ✅ map returns array, chainable

// ========== forEach vs for...of vs for loop ==========
//
// ┌──────────────┬────────────┬───────────┬───────────┐
// │ Feature       │ forEach    │ for...of  │ for loop  │
// ├──────────────┼────────────┼───────────┼───────────┤
// │ Gets value   │ directly   │ directly  │ arr[i]    │
// │ Gets index   │ 2nd param  │ no*       │ i         │
// │ break        │ ❌         │ ✅        │ ✅        │
// │ continue     │ ❌         │ ✅        │ ✅        │
// │ async/await  │ ❌         │ ✅        │ ✅        │
// │ Best for     │ simple     │ need break│ need index│
// │              │ iteration  │ or await  │ or control│
// └──────────────┴────────────┴───────────┴───────────┘
//
// * for...of with index: for (let [i, val] of arr.entries())
//
// When to use which:
//   forEach → simple iteration, don't need break/await
//   for...of → need break, continue, or await
//   for loop → need index, or complex iteration control
