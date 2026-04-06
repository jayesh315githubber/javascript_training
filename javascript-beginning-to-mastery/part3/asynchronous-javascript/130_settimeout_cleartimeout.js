// synchronous programming vs asynchronous programming
//
// Synchronous: code runs LINE BY LINE, each line WAITS for previous to finish.
// Asynchronous: some tasks run in BACKGROUND, code doesn't wait for them.
//
// JavaScript is synchronous and single-threaded by default.
// But the BROWSER provides async capabilities (setTimeout, fetch, events).

// synchronous programming
// javascript -> synchronous programming single threaded

// ========== Synchronous Example ==========

// console.log("script start");

// for (let i = 1; i < 10000; i++) {
//   console.log("inside for loop");       // runs 9999 times — blocks everything!
// }

// console.log("script end");
// → "script start" → 9999 loops → "script end"
// Each line WAITS. If loop takes 5 sec, "script end" waits 5 sec.

// ===================================================

// ========== setTimeout — Asynchronous! ==========

// setTimeout(callback, delay)
//   → Runs callback ONCE after delay (in milliseconds)
//   → Returns a timer ID (number) for cancellation
//   → setTimeout is a WEB API (provided by browser, NOT JavaScript!)
//   → JS does NOT wait for the timer — moves to next line immediately!

// ( concept involve - event loop , callback queue, callstack, web api provided by browser)
//                  - will return the id
/**
 * setTimeout function handled by the browser after completing the time function will be added to callback queue
 * after executing the script then it added to callstack and then it will executed.
 */

console.log("script start");

const id = setTimeout(() => {               // also setTime function return the id
  console.log("inside setTimeout");
}, 1000);

// JS does NOT wait 1 second here!
// Browser takes the callback and starts timer in background.
// JS immediately moves to the for loop below.

for (let i = 1; i < 100; i++) {
  console.log("....");
}

console.log("settimeout id is ", id);
console.log("clearing time out");
clearTimeout(id);        // will not run the setTimeout callback function
// clearTimeout(id) → tells browser: CANCEL this timer!
// The callback will NEVER run — even if 1 second has passed.
console.log("Script end");


// ========== Step-by-Step Execution ==========
//
// Line 1: console.log("script start")     → OUTPUT: script start
// Line 2: setTimeout(() => {...}, 1000)    → browser starts 1-sec timer
//          → returns id = 1 immediately (doesn't wait!)
// Line 3: for loop runs 99 times          → OUTPUT: .... (99 times)
// Line 4: console.log("settimeout id")    → OUTPUT: settimeout id is 1
// Line 5: console.log("clearing...")      → OUTPUT: clearing time out
// Line 6: clearTimeout(id)               → CANCELS the timer ❌
// Line 7: console.log("Script end")       → OUTPUT: Script end
//
// "inside setTimeout" NEVER prints — clearTimeout cancelled it!


// ========== How setTimeout Works with Event Loop ==========
//
// ┌─── Call Stack ────┐  ┌─── Web APIs (Browser) ──┐  ┌── Callback Queue ──┐
// │                   │  │                          │  │                    │
// │ console.log(...)  │  │  Timer: 1000ms ⏱️        │  │    (empty)         │
// │ for loop          │  │  callback: () => {...}   │  │                    │
// │ clearTimeout(id)  │  │                          │  │                    │
// │ console.log(...)  │  │  ❌ CANCELLED!           │  │    (empty)         │
// └───────────────────┘  └──────────────────────────┘  └────────────────────┘
//
// Without clearTimeout:
//   After 1 sec → callback goes to Callback Queue
//   → Event Loop: "is call stack empty? YES"
//   → Moves callback to Call Stack → runs → "inside setTimeout"
//
// With clearTimeout:
//   Timer is cancelled → callback NEVER enters queue
//   → "inside setTimeout" NEVER prints


// ========== setTimeout(fn, 0) — Still Async! ==========
//
// console.log("A");
// setTimeout(() => console.log("B"), 0);   // 0ms delay!
// console.log("C");
//
// Output: A, C, B  (NOT A, B, C!)
//
// Even with 0ms delay, setTimeout callback goes to queue.
// It only runs AFTER all synchronous code finishes.
// 0ms = "as soon as the call stack is empty" (not "immediately")


// ========== setTimeout vs setInterval ==========
//
// setTimeout(fn, 1000)   → runs ONCE after 1 second
// setInterval(fn, 1000)  → runs EVERY 1 second (repeating)
//
// clearTimeout(id)   → cancels setTimeout
// clearInterval(id)  → cancels setInterval
