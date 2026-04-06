// The Problem: Losing 'this' when extracting a method
// This is one of the MOST COMMON bugs in JavaScript!

const user1 = {
    firstName: "harshit",
    age: 8,
    about: function () {
        console.log(this.firstName, this.age);
    }
}

// user1.about();   // "harshit" 8 — works! this = user1

// ---------------------
// don't do this mistake

// ❌ WRONG: extracting method loses 'this' binding
// const myFunc = user1.about();    // this CALLS the function (notice the parentheses!)
//                                   // and stores the RESULT (undefined) in myFunc

const myFunc = function () {
    console.log(this.firstName, this.age);
}
myFunc();        /// will get undefined undefined - becz myFunc is not bind to user1

// WHY undefined?
//
//   user1.about()  →  this = user1 (object LEFT of dot) ✅
//   myFunc()       →  this = window (no object, no dot!) ❌
//                     window.firstName = undefined
//                     window.age = undefined
//
// When you copy a method into a standalone variable,
// 'this' is no longer user1 — it's LOST!
//
//   ┌─────────────────────────────────────────────────────┐
//   │  user1.about()                                       │
//   │  ↑ this = user1 ✅ (object before the dot)           │
//   │                                                      │
//   │  const myFunc = user1.about;  ← extract the function │
//   │  myFunc()                                            │
//   │  ↑ this = window ❌ (no object before the dot!)      │
//   └─────────────────────────────────────────────────────┘

// -------------------

//  ✅ CORRECT way — use bind() to lock 'this' permanently
// const myFunc = user1.about.bind(user1);
// myFunc();   // "harshit" 8 — works! this is permanently user1

// bind(user1) creates a NEW function where:
//   this = user1 (FOREVER — can't be changed even with call/apply!)
//
// Without bind:  myFunc() → this = window → undefined undefined
// With bind:     myFunc() → this = user1  → "harshit" 8


// ========== Real-World: This Problem Happens With Event Listeners ==========
//
// const button = document.querySelector("button");
//
// ❌ button.addEventListener("click", user1.about);
//    → this = button element (not user1!) — loses binding!
//
// ✅ button.addEventListener("click", user1.about.bind(user1));
//    → this = user1 — bind locks it!
//
// ✅ button.addEventListener("click", () => user1.about());
//    → arrow function calls it as user1.about() — dot notation preserves this


// ========== 3 Ways to Fix Lost 'this' ==========
//
// 1. bind():
//    const fn = user1.about.bind(user1);
//    fn();  // ✅
//
// 2. Arrow function wrapper:
//    const fn = () => user1.about();
//    fn();  // ✅ (called with dot → this = user1)
//
// 3. call/apply at call time:
//    myFunc.call(user1);   // ✅ (sets this explicitly)
