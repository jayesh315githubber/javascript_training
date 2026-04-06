// methods
//  -> function inside object = METHOD
//
// When called as object.method(), 'this' refers to that object.
// 'this' is determined by WHO CALLS it (object left of the dot).

// ========== Standalone function ==========
// This function uses 'this' — its value depends on how it's called
function personInfo() {
    console.log(`person name is ${this.firstName} and age is ${this.age}`);
}

// ========== person1: Inline method (anonymous function) ==========
const person1 = {
    firstName: "harsh",
    age: 8,
    // about: personInfo
    about: function () {            //  function inside object  - method
        console.log(this);         // this represent person1 object
        console.log(this.firstName);
    }
}
// person1.about() →
//   this = person1
//   console.log(this) → { firstName: "harsh", age: 8, about: ƒ }
//   console.log(this.firstName) → "harsh"

// ========== person2 & person3: Shared function as method ==========
// SAME function (personInfo) is reused — 'this' changes based on caller
const person2 = {
    firstName: "mohit",
    age: 18,
    about: personInfo       // personInfo is assigned as method
}

const person3 = {
    firstName: "nitish",
    age: 17,
    about: personInfo       // same function, different object
}

person1.about();
// { firstName: 'harsh', age: 8, about: [Function: about] }
// harsh

person2.about();
// person name is mohit and age is 18

person3.about();
// person name is nitish and age is 17


// ========== How 'this' works in methods ==========
//
// RULE: this = the object LEFT of the dot when calling
//
//   person1.about()  →  this = person1  →  "harsh", 8
//   person2.about()  →  this = person2  →  "mohit", 18
//   person3.about()  →  this = person3  →  "nitish", 17
//         ↑
//    this = this object
//
// SAME function (personInfo), but 'this' changes based on WHO calls it.
// The function doesn't "belong" to any object.
// 'this' is determined at CALL TIME, not definition time.


// ========== What happens if you call personInfo() directly? ==========
//
// personInfo();
// → this = window (browser) or global (Node) in non-strict mode
// → this = undefined in strict mode
// → "person name is undefined and age is undefined"
//
// Because there's no object left of the dot!


// ========== Method shorthand (ES6 — cleaner syntax) ==========
//
// Old way:
//   const obj = { greet: function() { return "hi"; } }
//
// New way (shorthand):
//   const obj = { greet() { return "hi"; } }
//
// Both are identical — shorthand is just cleaner.


// ========== Arrow functions as methods — AVOID! ==========
//
// const person = {
//     name: "Jay",
//     greet: () => {
//         console.log(this.name);   // ❌ undefined!
//     }
// }
// person.greet();  // undefined
//
// Arrow functions don't have their own 'this'.
// They inherit 'this' from parent scope (window in this case).
// ALWAYS use regular functions for object methods!
