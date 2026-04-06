// function returning function

/*
Higher Order Function ->
Higher order functions are functions that take one or more functions as arguments,
or return a function as their result

Two types:
  1. Takes a function as ARGUMENT  → forEach, map, filter, setTimeout
  2. Returns a function as RESULT  → this file's example, closures, factories
*/

// ========== Version 1: Named inner function ==========
// function myFunc() {
//
//     function hello() {
//         return "hello world"
//     }
//
//     return hello;            // return the hello function (NOT calling it!)
// }

// ========== Version 2: Return function directly (same thing, shorter) ==========
// Note: Both versions declared with same name 'myFunc' using function declaration.
//       When you declare same function name twice, the LAST ONE wins (overwrites first).
//       This is allowed with 'function' and 'var' — but NOT with 'let'/'const'.

function myFunc() {

    return function hello() {
        return "hello world"
    }
}

const ans = myFunc();        // myFunc returns a FUNCTION → ans is now a function
console.log(ans());          // call ans as function with () → "hello world"
// ans()

// ========== How it executes step by step ==========
//
// Step 1: myFunc() called → runs the function
// Step 2: Inside myFunc: creates function hello(), returns it
// Step 3: ans = function hello() { return "hello world" }
//         ans is now a FUNCTION (not a string!)
// Step 4: ans() → calls hello() → returns "hello world"
// Step 5: console.log("hello world")
//
// KEY DIFFERENCE:
//   return hello    → returns the FUNCTION itself (as a value)
//                     ans = function hello() {...}
//                     ans() → "hello world"
//
//   return hello()  → CALLS hello first, returns the RESULT
//                     ans = "hello world" (just a string)
//                     ans() → ❌ TypeError: ans is not a function


//  higher order function - function which accept input or return function or perform both called as h.o.f

// ========== Real-World Higher-Order Function Examples ==========
//
// 1. TAKES a function (as argument):
//    [1,2,3].forEach(fn)           ← forEach takes fn
//    [1,2,3].map(fn)               ← map takes fn
//    [1,2,3].filter(fn)            ← filter takes fn
//    setTimeout(fn, 1000)          ← setTimeout takes fn
//    btn.addEventListener("click", fn)  ← takes fn
//
// 2. RETURNS a function:
//    function multiply(x) {
//        return function(y) { return x * y; }0
//    }
//    const double = multiply(2);   // returns a function
//    double(5);                    // 10
//    double(10);                   // 20
//
// 3. BOTH (takes AND returns function):
//    function debounce(fn, delay) {     ← takes fn
//        let timer;
//        return function(...args) {     ← returns fn
//            clearTimeout(timer);
//            timer = setTimeout(() => fn(...args), delay);
//        }
//    }

// ========== Why Higher-Order Functions Matter ==========
//
// They enable:
// 1. CALLBACKS       → pass function to run later
// 2. CLOSURES        → returned function remembers outer vars
// 3. FUNCTION FACTORY→ create specialized functions (multiply(2) → double)
// 4. DECORATORS      → wrap functions to add behavior
// 5. CURRYING        → transform f(a,b) into f(a)(b)
// 6. COMPOSITION     → pipe(fn1, fn2, fn3)
//
// map, filter, reduce, forEach — ALL are higher-order functions.
// They are the FOUNDATION of functional programming in JS.

// ========== Same function name redeclaration rule ==========
//
// ┌─────────────────────┬──────────────┬─────────────────────┐
// │ Declaration          │ Redeclare?   │ What Happens        │
// ├─────────────────────┼──────────────┼─────────────────────┤
// │ function foo() {}    │ ✅ Allowed   │ Last one wins       │
// │ var foo = ...        │ ✅ Allowed   │ Last one wins       │
// │ let foo = ...        │ ❌ Error     │ SyntaxError         │
// │ const foo = ...      │ ❌ Error     │ SyntaxError         │
// └─────────────────────┴──────────────┴─────────────────────┘
