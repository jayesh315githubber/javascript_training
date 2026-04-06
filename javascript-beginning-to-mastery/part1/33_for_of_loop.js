// for of loop in array
// for...of  →  loops over VALUES     (use with arrays, strings, maps, sets)
// for...in  →  loops over KEYS/INDEX (use with objects)
//
// Memory trick:
//   for...OF = values OF the array    (O = Output values)
//   for...IN = keys IN the object     (I = Index/keys)

const fruits = ["apple", "mango", "grapes", "fruit4", "fruit5"];
const fruits2 = [];

// for...of gives you the VALUES directly:
// Iteration 1: fruit = "apple"
// Iteration 2: fruit = "mango"
// Iteration 3: fruit = "grapes"  ... and so on
for (let fruit of fruits) {
    fruits2.push(fruit.toUpperCase());
}

console.log(fruits2);   // ["APPLE", "MANGO", "GRAPES", "FRUIT4", "FRUIT5"]

// Classic for loop — same result but more verbose
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}


// ========== for...of vs for...in — The Key Difference ==========

// for...of → gives VALUES (use with arrays, strings)
// for (let fruit of fruits) {
//     console.log(fruit);     // "apple", "mango", "grapes" ...
// }

// for...in → gives INDEXES/KEYS as strings (use with objects)
// for (let index in fruits) {
//     console.log(index);     // "0", "1", "2", "3", "4" (strings!)
// }


// ========== for...in with Objects ✅ ==========

// const person = { name: "Jayesh", age: 25, city: "Mumbai" };
//
// for (let key in person) {
//     console.log(key, person[key]);
// }
// "name" "Jayesh"
// "age" 25
// "city" "Mumbai"
//
// for (let value of person) { }  // ❌ TypeError: person is not iterable
//                                 // Objects don't work with for...of!


// ========== Why NOT use for...in with Arrays? ==========

// const arr = ["a", "b", "c"];
// arr.customProp = "oops";    // arrays are objects, can add properties!
//
// for (let key in arr) {
//     console.log(key);
// }
// "0", "1", "2", "customProp"   ← UNEXPECTED extra property! ⚠️
//
// for (let val of arr) {
//     console.log(val);
// }
// "a", "b", "c"                 ← clean, no surprises ✅


// ========== Comparison Table ==========
//
// ┌────────────────────────────────────────────────────────────────┐
// │                  for...of                for...in               │
// ├────────────────────────────────────────────────────────────────┤
// │  Iterates over  VALUES                   KEYS (property names) │
// │  Arrays         ✅ "apple","mango"       ⚠️ "0","1","2"        │
// │  Strings        ✅ "h","e","l","l","o"   ⚠️ "0","1","2","3"    │
// │  Objects        ❌ TypeError             ✅ "name","age"        │
// │  Maps/Sets      ✅ works                 ❌ don't use           │
// │  Best for       Arrays, Strings          Objects                │
// │  Inherited      No                       Yes (includes proto!) │
// │  props?                                                         │
// └────────────────────────────────────────────────────────────────┘


// ========== All Loop Types Compared ==========
//
// ┌──────────────┬────────────┬───────────┬────────────┬───────────┐
// │ Feature       │ for loop   │ for...of  │ for...in   │ forEach   │
// ├──────────────┼────────────┼───────────┼────────────┼───────────┤
// │ Gets value   │ arr[i]     │ directly  │ arr[key]   │ directly  │
// │ Gets index   │ i          │ no*       │ key        │ 2nd param │
// │ break        │ ✅         │ ✅        │ ✅         │ ❌        │
// │ continue     │ ✅         │ ✅        │ ✅         │ ❌        │
// │ async/await  │ ✅         │ ✅        │ ✅         │ ❌        │
// │ Best for     │ need index │ arrays    │ objects    │ simple    │
// └──────────────┴────────────┴───────────┴────────────┴───────────┘
//
// * for...of with index: for (let [i, val] of arr.entries())
// * return in forEach only skips current iteration, doesn't exit loop
