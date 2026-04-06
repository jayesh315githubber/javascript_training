// Maps
// Map = key-value pairs where keys can be ANY type!
// Unlike objects where keys are always strings/symbols.
//
// Map keys can be: strings, numbers, arrays, objects, functions, booleans
// Object keys can only be: strings, symbols (numbers auto-convert to strings)

// map is an iterable
// store data in ordered fashion
// store key value pair (like object)
// duplicate keys are not allowed like objects

// NOTE :->
// different between maps and objects

// objects can only have string or symbol as key

// in maps you can use anything as key like array, number, string

// ========== Object keys are ALWAYS strings ==========

// object literal
// key -> string
// key -> symbol

const person = {
    firstName: "harshit",
    age: 7,
    1: "one"          // 1 gets auto-converted to string "1" internally
}

// console.log(person.firstName);          // "harshit" — dot notation
// console.log(person["firstName"]);       // "harshit" — bracket notation (key as STRING)
// console.log(person[1]);                 // "one" — JS converts 1 to "1" internally

// console.log(person[firstName]);         // ❌ ReferenceError: firstName is not defined
// WHY ERROR?
// person["firstName"] → looks for KEY with string "firstName" ✅
// person[firstName]   → looks for VARIABLE called firstName (no quotes!)
//                        JS thinks firstName is a variable name
//                        That variable doesn't exist → ReferenceError!
//
// RULE: bracket notation WITHOUT quotes = JS treats it as a variable
//       bracket notation WITH quotes = JS treats it as a string key
//
// Example:
//   let myKey = "firstName";
//   person[myKey]         → "harshit" ✅ (myKey variable holds "firstName")
//   person["firstName"]   → "harshit" ✅ (string key directly)
//   person[firstName]     → ❌ Error (firstName variable not declared!)

// //  for object = for in loop - bcz object is not iterable
// for (let key in person) {
//     console.log(typeof key);   // "string" for ALL keys — even 1 becomes "1"!
// }


// ========== Map: keys stay as their original type ==========

// key-value pair
// methods
// - set     → add key-value pair
// - get     → get value by key
// - has     → check if key exists (boolean)
// - delete  → remove key-value pair
// - clear   → remove all
// - size    → number of entries
// - keys    → all keys (iterable)
// - values  → all values (iterable)
// - entries → all [key, value] pairs

// const person = new Map();

person.set('firstName', 'Harshit');     // string key
person.set('age', 7);                   // string key
person.set(1, 'one');                   // NUMBER key — stays as number! (not "1")
person.set([1, 2, 3], 'onetwothree');         // ARRAY as key!
person.set({ 1: 'one' }, 'onetwothree');      // OBJECT as key!

console.log(person);
console.log(person.get(1));    // "one" — number 1 key, NOT string "1"

// ========== Iterating Map (for...of — Map is iterable) ==========

// Way 1: Loop over keys
for (let key of person.keys()) {
    console.log(key, typeof key);
    console.log(Array.isArray(key));            // for key-1 we get typeof as number
}
// "firstName" "string" (false)
// "age" "string"       (false)
// 1 "number"           (false)  ← stays number! (objects would make it "1")
// [1,2,3] "object"     (true)
// {1:'one'} "object"   (false)

// console.log("------------------------------------");

// Way 2: Destructure [key, value] directly
// for (let [key, value] of person) {    //  [ ]  -> to extract or destructure the key and value
//     console.log(Array.isArray(key));
//     console.log(key, value)
// }

// ========== 2nd way to declare Map (with initial values) ==========
// Pass array of [key, value] pairs
// const person = new Map([['firstName', 'jayesh'], ['lastname', 'gangurde']])
// console.log(person);


// ========== Powerful: Using Objects as Map Keys ==========
// Link extra data to objects WITHOUT modifying them!

const person1 = {
    id: 1,
    firstName: "harshit"
}

const person2 = {
    id: 2,
    firstName: "harshta"
}

const extraInfo = new Map();

// key : value pair — the OBJECT itself is the key!
// set
// get

extraInfo.set(person1, { age: 8, gender: "male" });
extraInfo.set(person2, { age: 9, gender: "female" });

// person1 object ──► { age: 8, gender: "male" }    (linked via Map)
// person2 object ──► { age: 9, gender: "female" }   (linked via Map)
// Original person1/person2 objects stay unchanged!

console.log(extraInfo);

console.log(extraInfo.get(person1));           // { age: 8, gender: "male" }
// console.log(extraInfo.get(person1).firstName);    // note — undefined! firstName is NOT in {age:8, gender:"male"}
// console.log(extraInfo.get(person1["firstName"])); // note — person1["firstName"] = "harshit" → extraInfo.get("harshit") = undefined
console.log(extraInfo.get(person1).gender);    // "male"
console.log(person1.id);                       // 1 (original object unchanged)
console.log(extraInfo.get(person2)["age"]);    // 9 (bracket notation on returned object)
console.log(extraInfo.get(person2).gender);    // "female"


// ========== Map vs Object ==========
//
// ┌──────────────────┬──────────────────────┬──────────────────────┐
// │ Feature           │ Object               │ Map                  │
// ├──────────────────┼──────────────────────┼──────────────────────┤
// │ Key types        │ String / Symbol only │ ANY type             │
// │ Key order        │ Not guaranteed*      │ Insertion order ✅   │
// │ Size             │ Object.keys().length │ .size                │
// │ Iterable         │ ❌ (use for...in)    │ ✅ (use for...of)   │
// │ Performance      │ Slower for frequent  │ Faster for frequent  │
// │                  │ add/remove           │ add/remove           │
// │ Default keys     │ Has prototype keys   │ Only what you add    │
// │ JSON support     │ ✅ JSON.stringify    │ ❌ needs conversion  │
// │ Syntax           │ { key: value }       │ new Map()            │
// └──────────────────┴──────────────────────┴──────────────────────┘
//
// When to use Map:
//   - Keys are not strings (numbers, objects, arrays)
//   - Need guaranteed insertion order
//   - Frequently adding/removing entries
//   - Need .size property
//
// When to use Object:
//   - Simple key-value with string keys
//   - Need JSON serialization
//   - Need destructuring { name, age } = obj
//   - Method definitions (classes, prototypes)
