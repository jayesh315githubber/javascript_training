// Promise (represent future value jo abhi nahi pata par bad me pata chalegi)
//  works in async way (feature of browser)
//
// A Promise is an OBJECT that represents the eventual completion or failure
// of an asynchronous operation. Think of it like ordering food:
//   1. You order → get a RECEIPT (Promise)  → state: PENDING
//   2. Food ready → FULFILLED (resolved)    → .then() runs
//   3. Out of stock → REJECTED              → .catch() runs
//
// Promise States:
//   PENDING    → initial state (waiting for result)
//   FULFILLED  → resolve() was called (success!)
//   REJECTED   → reject() was called (failure!)
//   Once settled (fulfilled/rejected) → NEVER changes again!

/**Note -
 * If the promise resolves, the .then() method will be called. If the promise rejects with an error,
 *  the .catch() method will be called. The
 * .finally() will be called irrespective of the resolve or reject.
 */

console.log("script start");

const bucket = ['coffee', 'chips', 'vegetables', 'salt', 'rice'];

// ========== PRODUCING CODE (creates the Promise) ==========

// producing code
const friedRicePromise = new Promise((resolve, reject) => {
    //                                  ↑         ↑
    //                           success fn    failure fn

    if (bucket.includes("vegetables") && bucket.includes("salt") && bucket.includes("rice")) {
        resolve({ value: "friedrice" });     // ✅ success → return object , string
        // resolve() → changes state: PENDING → FULFILLED
        // The value { value: "friedrice" } is passed to .then()
    } else {
        reject("could not do it");    // ❌ failure → return object , string
        // reject() → changes state: PENDING → REJECTED
        // The string "could not do it" is passed to .catch()
    }

})

// ========== CONSUMING CODE (uses the Promise) ==========

// how to consume   - browser will consume the promise

// Way 1: .then(onResolved, OnRejected) — both handlers in .then()
friedRicePromise.then(
    // jab promise resolve hoga
    (myfriedRice) => {
        console.log("lets eat ", myfriedRice);
    }
),
    (error) => {
        console.log(error)
    }

// Way 2: .then().catch() — RECOMMENDED! Cleaner separation
friedRicePromise.then(
    // jab promise resolve hoga
    (myfriedRice) => {
        console.log("lets eat ", myfriedRice);
        // OUTPUT: lets eat { value: "friedrice" }
    }
).catch(
    (error) => {
        console.log(error)
        // Would output: "could not do it" (if bucket didn't have ingredients)
    })


// ========== Microtask Queue vs Callback Queue Demo ==========

setTimeout(() => {
    console.log("hello from setTimeout")     // → Callback Queue (macrotask)
}, 0)

for (let i = 0; i <= 100; i++) {
    console.log(Math.random(), i);           // → Synchronous (call stack)
}

console.log("script end!!!!")                // → Synchronous (call stack)


/*
concept involve - ( - event loop , callback queue,microtask queue( promise will added in this queue) callstack,event loop,  web api provided by browser)
priority of microtask queue is higher than callback queue
*/

// ========== Execution Order Explained ==========
//
// 1. "script start"                    ← synchronous (runs first)
// 2. friedRicePromise created          ← resolve() called immediately
// 3. .then() callback → MICROTASK queue (not run yet!)
// 4. setTimeout callback → CALLBACK queue (not run yet!)
// 5. for loop runs 101 times           ← synchronous (blocks everything)
// 6. "script end!!!!"                  ← synchronous
//
// === Call stack is now EMPTY ===
//
// 7. Event Loop checks MICROTASK queue first (higher priority!)
//    → "lets eat { value: 'friedrice' }"
//
// 8. Event Loop checks CALLBACK queue
//    → "hello from setTimeout"
//
// OUTPUT ORDER:
//   script start
//   lets eat { value: "friedrice" }   ← .then() (appears during sync code)
//   lets eat { value: "friedrice" }   ← second .then()
//   0.7234... 0                        ← for loop
//   0.1298... 1
//   ... (101 random numbers)
//   script end!!!!
//   hello from setTimeout              ← setTimeout (LAST — lowest priority!)


// ========== Priority Order ==========
//
// ┌─── Priority ──────────────────────────────────────────────┐
// │ 1. SYNCHRONOUS code (call stack)              HIGHEST     │
// │ 2. MICROTASK queue (Promise .then/.catch)                 │
// │ 3. CALLBACK queue (setTimeout, setInterval)   LOWEST      │
// └───────────────────────────────────────────────────────────┘
//
// That's why Promise .then() runs BEFORE setTimeout(fn, 0)!
// Even though setTimeout has 0ms delay, it's in the lower-priority queue.


// ========== Promise Anatomy ==========
//
// new Promise((resolve, reject) => {
//     // PRODUCING code (async work happens here)
//     if (success) resolve(value);     // → .then(value)
//     else         reject(error);      // → .catch(error)
// })
// .then(value => { })       // runs on resolve
// .catch(error => { })      // runs on reject
// .finally(() => { })       // runs ALWAYS (cleanup)
