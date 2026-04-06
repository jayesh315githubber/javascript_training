// How Arrays Work Behind the Scenes
//
// [1,2,3] is shorthand for new Array(1,2,3)
// Arrays are objects created by the Array constructor.
// All array methods (push, map, filter, etc.) live on Array.prototype.

// let numbers = [1,2,3];   // internally jscript create the array with the help of new keyword

let numbers = new Array(1, 2, 3);          // bcz of new keyword
// Same as: let numbers = [1, 2, 3];

// ========== Where do array methods come from? ==========

console.log(Array.prototype);
// [push, pop, map, filter, reduce, forEach, find, sort, slice, splice, ...]
// ALL array methods live HERE on Array.prototype!

console.log(Object.getPrototypeOf(numbers));              // Object.getPrototypeOf
// Same as numbers.__proto__ — points to Array.prototype

console.log(Array.prototype);      // prototype contains all the array methods

console.log(numbers);   // [1, 2, 3]


// ========== The Prototype Chain of Arrays ==========
//
// numbers = [1, 2, 3]
//     │
//     │  __proto__
//     ▼
// Array.prototype
//   → push, pop, map, filter, reduce, forEach, find, sort, ...
//     │
//     │  __proto__
//     ▼
// Object.prototype
//   → toString, hasOwnProperty, valueOf, ...
//     │
//     │  __proto__
//     ▼
//   null (end of chain)
//
// Full chain: numbers → Array.prototype → Object.prototype → null
//
// That's why arrays have BOTH:
//   numbers.push(4)              ← from Array.prototype
//   numbers.hasOwnProperty(0)   ← from Object.prototype
//   numbers.toString()          ← from Object.prototype (overridden by Array.prototype)
//
// ┌─── numbers [1,2,3] ────────┐
// │  0: 1                       │
// │  1: 2                       │
// │  2: 3                       │
// │  length: 3                  │
// │                              │
// │  [[Prototype]] ──────────────┼──► Array.prototype
// └──────────────────────────────┘   ┌──────────────────────┐
//                                    │ push(), pop()        │
//                                    │ map(), filter()      │
//                                    │ reduce(), forEach()  │
//                                    │ sort(), slice()      │
//                                    │ find(), some()       │
//                                    │                      │
//                                    │ [[Prototype]] ───────┼──► Object.prototype
//                                    └──────────────────────┘   ┌──────────────────┐
//                                                               │ toString()       │
//                                                               │ hasOwnProperty() │
//                                                               │ valueOf()        │
//                                                               │ [[Prototype]]: null│
//                                                               └──────────────────┘


// ========== Functions also have .prototype ==========

function hello() {
    console.log("hello");
}

console.log(hello.prototype);   // {} — empty object

// by default when we crate the function we get prototype as property
// This is where you'd put shared methods for constructor functions (files 82-83)


// ========== Everything in JS has a prototype chain ==========
//
// ┌──────────────┬──────────────────────────────────────────────┐
// │ Value         │ Prototype Chain                              │
// ├──────────────┼──────────────────────────────────────────────┤
// │ [1,2,3]      │ Array.prototype → Object.prototype → null   │
// │ "hello"      │ String.prototype → Object.prototype → null  │
// │ 42           │ Number.prototype → Object.prototype → null  │
// │ true         │ Boolean.prototype → Object.prototype → null │
// │ {a:1}        │ Object.prototype → null                     │
// │ function(){} │ Function.prototype → Object.prototype → null│
// └──────────────┴──────────────────────────────────────────────┘
//
// Object.prototype is the TOP of every chain (except null).
// That's why toString(), hasOwnProperty() work on everything!
//
// This is the core of JavaScript:
// EVERYTHING is an object (or wraps to one), connected through prototypes.
