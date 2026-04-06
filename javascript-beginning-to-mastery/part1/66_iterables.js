// iterables
// Iterable = anything you can use for...of loop on.
// It has a built-in Symbol.iterator method that tells JS
// how to go through its elements one by one.
//
// Iterable:     String, Array, Map, Set, TypedArray, arguments, NodeList
// NOT Iterable: Plain Objects {}  ← can't use for...of on objects!

// jispe hum for of loop laga sakein
// - string, array are iterable
// - Objects are not iterable.  - imp


// ========== Example 1: String is Iterable ==========
// for...of on string → gives one character at a time

const firstName = "Harshit";
for (let char of firstName) {
    console.log(char);
}
// H → a → r → s → h → i → t


// ========== Example 2: Array is Iterable ==========
// for...of on array → gives one element at a time

const items = ['item1', 'item2', 'item3'];
for (let item of items) {
    console.log(item);
}
// item1 → item2 → item3


// ========== Object is NOT Iterable ==========
// const obj = { name: "Jay", age: 25 };
// for (let val of obj) { }  // ❌ TypeError: obj is not iterable!
//
// To loop over objects use:
//   for...in           → for (let key in obj)
//   Object.keys(obj)   → ["name", "age"]
//   Object.values(obj) → ["Jay", 25]
//   Object.entries(obj) → [["name","Jay"], ["age",25]]


// ========== Array-Like Object ==========
// jinke pas length property hoti hai
// aur jiko hum index se access kar sakte hai
// example :- string

const firstName1 = "harshit";
console.log(firstName1.length);   // 7
console.log(firstName1[2]);       // "r" (index 2)


// ========== Iterable vs Array-Like — Two Different Things! ==========
//
// ITERABLE   = has Symbol.iterator (can use for...of)
// ARRAY-LIKE = has length + numeric indexes (can use [0], .length)
//
// ┌──────────────┬────────────┬─────────────┬────────────────┐
// │              │ Iterable?  │ Array-like? │ Category       │
// ├──────────────┼────────────┼─────────────┼────────────────┤
// │ Array        │ ✅ yes     │ ✅ yes      │ Both!          │
// │ String       │ ✅ yes     │ ✅ yes      │ Both!          │
// │ Map / Set    │ ✅ yes     │ ❌ no       │ Iterable only  │
// │ arguments    │ ✅ yes     │ ✅ yes      │ Both!          │
// │ NodeList     │ ✅ yes     │ ✅ yes      │ Both!          │
// │ Plain Object │ ❌ no      │ ❌ no       │ Neither!       │
// │ {0:"a",      │ ❌ no      │ ✅ yes      │ Array-like only│
// │  length: 1}  │            │             │                │
// └──────────────┴────────────┴─────────────┴────────────────┘
//
// Convert array-like or iterable to real Array:
//   Array.from("hello")      → ["h", "e", "l", "l", "o"]
//   Array.from(nodeList)     → real array with all array methods
//   [...iterable]            → spread into array (only for iterables)
