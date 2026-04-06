// Functions Are Objects in JavaScript!
//
// In JS, functions are FIRST-CLASS OBJECTS.
// A function is both:
//   1. Callable (you can call it with ())
//   2. An object (you can add properties to it!)
//
// Every function automatically gets a .prototype property (an empty object {}).
// This is KEY for constructor functions (file 82) and the 'new' keyword (file 83).

function hello() {
    console.log("hello world");
}

// // javascript function ===> function  + object  (we can treat the js function as object too)

// ========== Built-in function properties ==========

console.log(hello.name);         // "hello" — built-in name property

// Functions have built-in properties:
//   hello.name       → "hello" (function's name)
//   hello.length     → 0 (number of parameters)
//   hello.prototype  → {} (empty object — only functions have this!)

// // you can add your own properties — because functions ARE objects!
hello.myOwnProperty = "very unique value";

console.log(hello.myOwnProperty);   // "very unique value"
console.log();

// name property ---> tells function name;

// function provides more usefull properties.


// ========== .prototype property — only functions have this! ==========

console.log(hello.prototype);    // {}   -> object  -  like free space

// // only functions provide prototype property.
// // array, object -> will not provide the prototype property.
//
// const arr = [1,2,3];
// console.log(arr.prototype);   // undefined! Arrays don't have .prototype
// const obj = {};
// console.log(obj.prototype);   // undefined! Objects don't have .prototype


// ========== Adding properties to .prototype ==========
// You can store shared methods here — this is the foundation of
// constructor functions and the 'new' keyword!

hello.prototype.abc = "abc";
hello.prototype.xyz = "xyz";
hello.prototype.sing = function () {
    return "lalalla";
};

console.log(hello.prototype);     // { abc: "abc", xyz: "xyz", sing: [Function] }

console.log(hello.prototype.sing());   // "lalalla"


// ========== Why .prototype matters — the connection to 'new' ==========
//
// When you use: const obj = new hello()
//   Step 1: Creates empty object {}
//   Step 2: Sets obj.__proto__ = hello.prototype  (automatic link!)
//   Step 3: Calls hello() with this = obj
//   Step 4: Returns obj
//
// So all properties on hello.prototype (abc, xyz, sing)
// become available to obj through the prototype chain!
//
// obj.sing() → not on obj → check obj.__proto__ (hello.prototype) → found! ✅


// ========== .prototype vs __proto__ — The Key Difference ==========
//
// .prototype  → property on FUNCTIONS (the blueprint/template)
//               "What my children will inherit"
//
// __proto__   → property on OBJECTS (the link to parent)
//               "Who is my parent?"
//
// When you do: const obj = new hello()
//   obj.__proto__ === hello.prototype  →  true!
//
// ┌─── hello (function) ────────┐
// │  name: "hello"              │
// │  prototype: ────────────────┼──► { abc: "abc", xyz: "xyz", sing: fn }
// └─────────────────────────────┘              ↑
//                                              │  __proto__ link
//                                     const obj = new hello()
//                                     obj.__proto__ points HERE!
//
// Think of it as:
//   hello.prototype = "the inheritance template"
//   obj.__proto__   = "pointer to my template"


// ========== Summary ==========
//
// 1. Functions in JS = function + object (hybrid!)
// 2. Can add custom properties: hello.myProp = "value"
// 3. Built-in properties: .name, .length, .prototype
// 4. .prototype is an empty {} — only FUNCTIONS have it
// 5. .prototype is where you put shared methods
// 6. When 'new' creates an object, it links to .prototype via __proto__
// 7. This is the foundation of prototypal inheritance in JS!
