// arrow functions
//  (this) is not working in the arrow function.
//
// Arrow functions do NOT have their own 'this'.
// They INHERIT 'this' from the parent scope where they were DEFINED.
// This is called "lexical this".
// You CANNOT change an arrow function's 'this' — not even with call/apply/bind!

const user1 = {
    firstName: "harshit",
    age: 8,

    // ❌ Arrow function as method — AVOID!
    about: () => {
        console.log(this); // this in the arrow function is not from arrow function,
        //  it from one level up from the arrow function surrounding , in this case this is of window object
        console.log(this.firstName, this.age);
    },

    // ✅ Regular function as method — CORRECT
    about2: function () {
        console.log(this.firstName, this.age);
    }
}
//
// user1.about(user1);    // will not work -  we connot change of arrow function's this

// user1.about2();
// user1.about2(user1);

// ========== Why arrow function gives Window, not user1? ==========
//
// REGULAR FUNCTION:
//   user1.about2()  →  this = user1 (object left of dot)
//   ✅ Gets its OWN 'this' at call time
//
// ARROW FUNCTION:
//   user1.about()   →  this = window (inherited from parent scope!)
//   ❌ Does NOT get its own 'this'
//   Looks UP to where it was DEFINED (lexical this)
//
//   Where was about() defined? Inside user1 object literal { }
//   Object literals { } do NOT create a scope!
//   So parent scope = global scope → this = window
//
// ┌─── Global Scope (this = window) ──────────────────────┐
// │                                                        │
// │  const user1 = {           ← object literal            │
// │      about: () => {        ← { } is NOT a scope!       │
// │          console.log(this) ← looks UP for this          │
// │      }                        no scope in { }           │
// │  }                            → goes to global scope    │
// │                               → this = window ❌        │
// │                                                        │
// │  vs                                                     │
// │                                                        │
// │  const user1 = {                                        │
// │      about2: function() {  ← regular function           │
// │          console.log(this) ← gets its OWN this          │
// │      }                        = object left of dot      │
// │  }                            → this = user1 ✅         │
// └────────────────────────────────────────────────────────┘


// ========== When Arrow Functions ARE Good for 'this' ==========
//
// Arrow functions are USEFUL inside methods (not AS methods):
//
// const user = {
//     name: "Jay",
//     hobbies: ["coding", "reading"],
//
//     showHobbies: function() {           ← regular fn (this = user ✅)
//         this.hobbies.forEach((hobby) => {   ← arrow fn inside method
//             console.log(this.name + " likes " + hobby);
//             // Arrow fn inherits 'this' from showHobbies → this = user ✅
//         });
//     }
// }
// user.showHobbies();
// "Jay likes coding"
// "Jay likes reading"
//
// If forEach used regular function instead:
//     this.hobbies.forEach(function(hobby) {
//         console.log(this.name);  // ❌ undefined! (this = window in callback)
//     });


// ========== RULE ==========
//
// ❌ Don't use arrow functions AS object methods:
//    const obj = { greet: () => { this... } }    → this = window!
//
// ✅ Use arrow functions INSIDE methods (callbacks):
//    const obj = { greet() { arr.forEach(() => { this... }) } }  → this = obj!
//
// ❌ Don't use arrow functions as constructors:
//    const Foo = () => {};
//    new Foo();  → TypeError: Foo is not a constructor
//
// ❌ Don't use arrow functions when you need arguments object:
//    const fn = () => { console.log(arguments); }  → ReferenceError!


// ========== Regular vs Arrow — Quick Comparison ==========
//
// ┌──────────────────────────┬──────────────────────────────┐
// │ Regular Function          │ Arrow Function                │
// ├──────────────────────────┼──────────────────────────────┤
// │ Has own 'this'           │ Inherits 'this' from parent   │
// │ this = caller (dot rule) │ this = where defined (lexical)│
// │ call/apply/bind work     │ call/apply/bind CAN'T change  │
// │ Has 'arguments' object   │ No 'arguments' object         │
// │ Can be constructor (new) │ Cannot use 'new'              │
// │ Use AS methods           │ Use INSIDE methods (callbacks)│
// └──────────────────────────┴──────────────────────────────┘
