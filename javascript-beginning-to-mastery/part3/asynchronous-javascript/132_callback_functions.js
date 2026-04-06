// understand callback
//
// A callback is a function PASSED AS AN ARGUMENT to another function.
// The receiving function can then CALL IT (call it back) at the right time.
//
// Why "callback"? Because you pass it, and the other function "calls it back" later.

// A callback is a function passed as an argument to another function.
// This technique allows a function to call another function
// A callback function can run after another function has finished


// ========== Simple Callback Example ==========

// function myFunc(callback) {
//   console.log("Function is doing task 1 ");
//   callback();                                   // "calling back" the passed function
// }

// myFunc(() => {
//   console.log("function is doing task 2");
// });

// Output:
//   Function is doing task 1
//   function is doing task 2
//
// How it works:
//   myFunc receives () => {...} as the 'callback' parameter
//   → does task 1
//   → calls callback() → runs the arrow function → does task 2


// ========== Callback with Success & Failure Pattern ==========
// This is the foundation of how async operations work!
// Same pattern that Promises formalize with resolve/reject.

function getTwoNumbersAndAdd(number1, number2, onSuccess, onFailure) {
  if (typeof number1 === "number" && typeof number2 === "number") {
    onSuccess(number1, number2);     // ✅ both are numbers → call success callback
  } else {
    onFailure();                     // ❌ wrong type → call failure callback
  }
}

function addTwoNumbers(num1, num2) {
  console.log(num1 + num2);
}

function onFail() {
  console.log("Wrong data type");
  console.log("please pass numbers only")
}

getTwoNumbersAndAdd(4, 4, addTwoNumbers, onFail);  // function pass as argument to function.
// Output: 8

// How it works step by step:
//   getTwoNumbersAndAdd(4, 4, addTwoNumbers, onFail)
//                       ↑  ↑      ↑            ↑
//                      n1  n2  success cb    failure cb
//
//   typeof 4 === "number" → true ✅
//   typeof 4 === "number" → true ✅
//   Both numbers → call onSuccess(4, 4)
//   → addTwoNumbers(4, 4) → console.log(4 + 4) → 8

// If we pass wrong types:
// getTwoNumbersAndAdd("hello", 4, addTwoNumbers, onFail);
//   typeof "hello" === "number" → false ❌
//   → call onFailure()
//   → "Wrong data type"
//   → "please pass numbers only"


// ========== Callbacks Are Everywhere in JS ==========
//
// You already use callbacks daily:
//   setTimeout(callback, 1000)              ← callback runs after delay
//   button.addEventListener("click", callback)  ← callback runs on click
//   [1,2,3].forEach(callback)               ← callback runs for each item
//   [1,2,3].map(callback)                   ← callback transforms each item
//   [1,2,3].filter(callback)                ← callback tests each item
//   fetch(url).then(callback)               ← callback runs when data arrives
//
// ALL of these take a function as argument = callback pattern!


// ========== This Pattern → Leads to Promises ==========
//
// Callback style (this file):
//   doTask(data, onSuccess, onFailure)
//
// Promise style (file 134):
//   doTask(data).then(onSuccess).catch(onFailure)
//
// Async/Await style (file 144):
//   try { const result = await doTask(data); } catch(err) { ... }
//
// Same concept (success/failure), cleaner syntax each time!
//
// Problem with callbacks: when you chain many → CALLBACK HELL (file 133)
