// this keyword
// 'this' refers to the object that is currently executing the code.
// Its value depends on HOW and WHERE the function is called.

// ========== 1. 'this' in Global Scope ==========
// In global scope (outside any function): this === window (browser)

console.log(window);      // Window object (browser's global object)
console.log(this)         // Window object — this === window in global scope

// In browser:  this === window  →  true
// In Node.js:  this === module.exports  →  true (slightly different)


// ========== 2. 'this' Inside a Regular Function ==========

// "use strict";

function myFunc() {
    console.log(this);  // if we use use strict mode - it will give undefined as result
}

myFunc();
// window.myFunc();

// NON-STRICT MODE (default):
//   myFunc()  →  this = window
//   Why? Because myFunc() is actually window.myFunc()
//   The object left of the dot is window (implicitly).
//   window.myFunc() = myFunc() — same thing!

// STRICT MODE ("use strict"):
//   myFunc()  →  this = undefined
//   Why? Strict mode doesn't auto-default to window.
//   No object left of the dot = undefined.
//   This prevents accidental global variable creation.


// ========== How to determine 'this' — Decision Flowchart ==========
//
// Is it an arrow function?
// ├── YES → this = enclosing scope's this (lexical, can't change)
// └── NO ↓
//
// Called with 'new'?
// ├── YES → this = newly created object {}
// └── NO ↓
//
// Called with call/apply/bind?
// ├── YES → this = the specified object
// └── NO ↓
//
// Called as method (obj.fn())?
// ├── YES → this = object LEFT of the dot
// └── NO ↓
//
// Default:
// ├── Strict mode → this = undefined
// └── Non-strict → this = window


// ========== All 'this' Rules — Quick Reference ==========
//
// ┌─────────────────────────────────┬───────────────────────────────┐
// │ How function is called           │ this =                        │
// ├─────────────────────────────────┼───────────────────────────────┤
// │ Global scope                    │ window                        │
// │ myFunc()  (non-strict)          │ window                        │
// │ myFunc()  (strict mode)         │ undefined                     │
// │ obj.myFunc()                    │ obj (left of dot)             │
// │ myFunc.call(obj)                │ obj (explicit)                │
// │ myFunc.apply(obj)               │ obj (explicit)                │
// │ myFunc.bind(obj)()              │ obj (permanent)               │
// │ new MyFunc()                    │ new empty object {}           │
// │ () => {}  (arrow function)      │ inherited from parent scope   │
// │ Event handler (regular fn)      │ the element (e.g., button)   │
// │ Event handler (arrow fn)        │ window (inherited)            │
// └─────────────────────────────────┴───────────────────────────────┘
//
// Priority (highest to lowest):
//   new > call/apply/bind > obj.method() > default(window/undefined)
//   Arrow functions ALWAYS inherit — can't be changed by any of these!
