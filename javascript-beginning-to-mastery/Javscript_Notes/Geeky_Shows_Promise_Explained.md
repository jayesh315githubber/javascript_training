# Geeky Shows: Promises & Async Programming — Complete Explanation

## File-by-File Deep Dive with Diagrams

Each file from `javascrpt-Geeky_Shows/Promise/` is explained step-by-step showing how JavaScript handles asynchronous operations internally.

---

# Table of Contents

1. [withoutLPromise.js — Callback Hell Pattern](#file-1-withoutlpromisejs)
2. [withPromise.js — Promise Chaining with .then()](#file-2-withpromisejs)
3. [async_await.js — Async/Await (Modern Approach)](#file-3-async_awaitjs)
4. [Interview Preparation: Async Concepts in Detail](#interview-preparation)

---

# File 1: withoutLPromise.js

## Topic: Callback Hell — The Problem That Promises Solve

### The Code

```javascript
// callback hell - without promise

console.log("Start");

function getName(name, callback) {
    setTimeout(() => {
        console.log("Inside name SetTimeout");
        callback(name);
    }, 2000);
}

function getHobbies(name, callback) {
    setTimeout(() => {
        console.log("Inside hobbies SetTimout.");
        callback(["cricket", "reading", "Dancing"]);
    }, 1000)
}

const nm = getName("Jayesh", (nm) => {
    console.log(nm);
    getHobbies(nm, (hobby) => {
        console.log(hobby);
    })
});
console.log("End...");
```

### What is a Callback?

```
A callback is a function passed as an ARGUMENT to another function.
The receiving function calls (invokes) it later — usually after
some async operation completes.

function doSomething(callback) {
    // ... do some work ...
    callback();  // ← call the function that was passed in
}

doSomething(function() {
    console.log("I was called back!");
});
```

### Step-by-Step Execution

```
┌──────────────────────────────────────────────────────────────────────┐
│  EXECUTION TIMELINE                                                   │
│                                                                       │
│  Line 3: console.log("Start");                                        │
│          → OUTPUT: Start                                              │
│                                                                       │
│  Line 19: getName("Jayesh", callback) is called                       │
│           → Inside getName:                                           │
│             setTimeout(() => {...}, 2000) is called                    │
│             → setTimeout is a WEB API (not JavaScript!)               │
│             → Browser takes the callback and starts a 2-second timer  │
│             → getName returns immediately (doesn't wait!)             │
│                                                                       │
│  Line 25: console.log("End...");                                      │
│           → OUTPUT: End...                                            │
│                                                                       │
│  ═══════════ SCRIPT IS DONE. Call stack is empty. ════════════        │
│                                                                       │
│  After 2 seconds: Browser timer fires!                                │
│           → Callback is placed in Callback Queue                      │
│           → Event Loop sees empty call stack                          │
│           → Moves callback to call stack                              │
│           → Executes:                                                 │
│             console.log("Inside name SetTimeout")                     │
│             → OUTPUT: Inside name SetTimeout                          │
│             callback("Jayesh") is called                              │
│             → This is the function: (nm) => { console.log(nm); ... }  │
│             → OUTPUT: Jayesh                                          │
│                                                                       │
│             → Now getHobbies("Jayesh", callback) is called            │
│               → setTimeout(() => {...}, 1000) — another 1-sec timer   │
│               → Returns immediately                                   │
│                                                                       │
│  After 1 more second: Second timer fires!                             │
│           → OUTPUT: Inside hobbies SetTimout.                         │
│           → callback(["cricket", "reading", "Dancing"]) is called     │
│           → OUTPUT: ["cricket", "reading", "Dancing"]                 │
└──────────────────────────────────────────────────────────────────────┘
```

### How It Flows Through the Event Loop

```
TIME 0ms:
┌─── Call Stack ─────┐  ┌─── Web APIs ────────┐  ┌── Callback Queue ──┐
│ console.log("Start")│  │                     │  │     (empty)        │
│ Global()           │  │                     │  │                    │
└────────────────────┘  └─────────────────────┘  └────────────────────┘
OUTPUT: Start

TIME 1ms:
┌─── Call Stack ─────┐  ┌─── Web APIs ────────┐  ┌── Callback Queue ──┐
│ getName()          │  │ Timer: 2000ms ⏱️     │  │     (empty)        │
│ Global()           │  │ (getName callback)   │  │                    │
└────────────────────┘  └─────────────────────┘  └────────────────────┘

TIME 2ms:
┌─── Call Stack ─────┐  ┌─── Web APIs ────────┐  ┌── Callback Queue ──┐
│ console.log("End") │  │ Timer: 1998ms ⏱️     │  │     (empty)        │
│ Global()           │  │                     │  │                    │
└────────────────────┘  └─────────────────────┘  └────────────────────┘
OUTPUT: End...

TIME 3ms: Call stack empty!
┌─── Call Stack ─────┐  ┌─── Web APIs ────────┐  ┌── Callback Queue ──┐
│     (empty)        │  │ Timer: 1997ms ⏱️     │  │     (empty)        │
└────────────────────┘  └─────────────────────┘  └────────────────────┘

TIME 2000ms: Timer fires!
┌─── Call Stack ─────┐  ┌─── Web APIs ────────┐  ┌── Callback Queue ──┐
│     (empty)        │  │                     │  │ getName callback ←│
└────────────────────┘  └─────────────────────┘  └────────────────────┘
Event Loop: Stack empty + queue has item → MOVE to stack!

TIME 2001ms:
┌─── Call Stack ─────┐  ┌─── Web APIs ────────┐  ┌── Callback Queue ──┐
│ getName callback   │  │ Timer: 1000ms ⏱️     │  │     (empty)        │
│ (runs, calls       │  │ (getHobbies callback)│  │                    │
│  getHobbies)       │  │                     │  │                    │
└────────────────────┘  └─────────────────────┘  └────────────────────┘
OUTPUT: Inside name SetTimeout
OUTPUT: Jayesh

TIME 3001ms: Second timer fires!
┌─── Call Stack ─────┐
│ getHobbies callback│
└────────────────────┘
OUTPUT: Inside hobbies SetTimout.
OUTPUT: ["cricket", "reading", "Dancing"]
```

### Why This is Called "Callback Hell"

```
With more steps, callbacks NEST deeper and deeper:

getName("Jayesh", (nm) => {                          // level 1
    getHobbies(nm, (hobby) => {                      //   level 2
        getAddress(nm, (address) => {                 //     level 3
            getPhone(nm, (phone) => {                 //       level 4
                getEmail(nm, (email) => {             //         level 5
                    saveProfile(nm, hobby, address,   //           level 6
                        phone, email, () => {
                            console.log("Done!");     //             level 7
                        })
                })
            })
        })
    })
});

This is called the "Pyramid of Doom" because of its shape: ▷
- Hard to read
- Hard to debug
- Hard to handle errors
- Hard to maintain
```

### Final Output (in order)

```
Start                                    ← immediate (synchronous)
End...                                   ← immediate (synchronous)
Inside name SetTimeout                   ← after 2 seconds
Jayesh                                   ← after 2 seconds
Inside hobbies SetTimout.                ← after 3 seconds total (2+1)
["cricket", "reading", "Dancing"]        ← after 3 seconds total
```

---

# File 2: withPromise.js

## Topic: Promise Chaining — Solving Callback Hell

### The Code

```javascript
//  Refactor Previous Example Using Promise

console.log("Start");

function getName(name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Inside name SetTimeout");
            resolve(name);
        }, 2000);
    })
}

function getHobbies(name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Inside hobbies SetTimout.");
            resolve(["cricket", "reading", "Dancing"]);
        }, 1000)
    })
}

getName("Jayesh")
    .then(nm => getHobbies(nm))
    .then(hobby => console.log(hobby));

console.log("End...");
```

### What is a Promise?

```
┌──────────────────────────────────────────────────────────────────┐
│  A Promise is an OBJECT representing the eventual completion     │
│  or failure of an asynchronous operation.                        │
│                                                                   │
│  Think of it like ordering food at a restaurant:                 │
│  1. You place an order → you get a RECEIPT (Promise)             │
│  2. The kitchen is cooking → PENDING state                       │
│  3. Food is ready → FULFILLED (resolved) — you eat              │
│  4. Kitchen is out of ingredients → REJECTED — you get refund   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │  Promise States:                                         │    │
│  │                                                          │    │
│  │  PENDING ─────┬─── resolve() ───► FULFILLED             │    │
│  │               │                     (.then() runs)       │    │
│  │               │                                          │    │
│  │               └─── reject() ────► REJECTED              │    │
│  │                                     (.catch() runs)      │    │
│  │                                                          │    │
│  │  Once settled (fulfilled/rejected), it NEVER changes!    │    │
│  └─────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────┘
```

### Key Difference from Callback Version

```
CALLBACK VERSION:                    PROMISE VERSION:
─────────────────                    ─────────────────
function getName(name, callback) {   function getName(name) {
    setTimeout(() => {                   return new Promise((resolve) => {
        callback(name);                      setTimeout(() => {
    }, 2000);                                    resolve(name);
}                                            }, 2000);
                                         })
                                     }

Callback: passes result via callback()
Promise:  passes result via resolve()

Callback: nested to chain               Promise: flat .then() chain
getName(nm, (nm) => {                    getName(nm)
    getHobbies(nm, (hobby) => {              .then(nm => getHobbies(nm))
        // deeper and deeper...              .then(hobby => console.log(hobby))
    })                                       .catch(err => console.log(err))
})
```

### Step-by-Step Execution

```
┌──────────────────────────────────────────────────────────────────────┐
│  Line 3: console.log("Start");                                        │
│          → OUTPUT: Start                                              │
│                                                                       │
│  Line 23: getName("Jayesh") is called                                 │
│           → Creates a new Promise object (state: PENDING)             │
│           → Inside the Promise constructor:                           │
│             setTimeout(() => {...}, 2000) — timer started             │
│           → Returns the Promise object immediately                    │
│                                                                       │
│  Line 24: .then(nm => getHobbies(nm))                                 │
│           → Registers this callback for when getName resolves         │
│           → Does NOT execute now — just registers                     │
│           → Returns a NEW Promise (chaining)                          │
│                                                                       │
│  Line 25: .then(hobby => console.log(hobby))                          │
│           → Registers this callback for when getHobbies resolves      │
│           → Does NOT execute now — just registers                     │
│                                                                       │
│  Line 27: console.log("End...");                                      │
│           → OUTPUT: End...                                            │
│                                                                       │
│  ═══════════ SCRIPT IS DONE ════════════════════                      │
│                                                                       │
│  After 2 seconds: Timer fires!                                        │
│           → resolve("Jayesh") is called                               │
│           → Promise state: PENDING → FULFILLED                        │
│           → .then() callback goes to MICROTASK QUEUE                  │
│           → Event Loop moves it to call stack                         │
│           → OUTPUT: Inside name SetTimeout                            │
│           → nm = "Jayesh"                                             │
│           → getHobbies("Jayesh") is called                            │
│             → Creates new Promise, starts 1-second timer              │
│                                                                       │
│  After 1 more second:                                                 │
│           → resolve(["cricket", "reading", "Dancing"])                │
│           → Second .then() callback runs                              │
│           → OUTPUT: Inside hobbies SetTimout.                         │
│           → OUTPUT: ["cricket", "reading", "Dancing"]                 │
└──────────────────────────────────────────────────────────────────────┘
```

### Promise Chaining Diagram

```
getName("Jayesh")        returns Promise₁ (PENDING)
      │
      │ after 2 sec: resolve("Jayesh")
      │ Promise₁ → FULFILLED
      ▼
.then(nm => getHobbies(nm))    receives "Jayesh", returns Promise₂ (PENDING)
      │
      │ after 1 sec: resolve(["cricket",...])
      │ Promise₂ → FULFILLED
      ▼
.then(hobby => console.log(hobby))   receives array, prints it
      │
      ▼
    DONE

Each .then() returns a NEW Promise, enabling the chain!
If any step fails → .catch() at the end handles ALL errors.
```

### Microtask Queue vs Callback Queue

```
┌──────────────────────────────────────────────────────────────────┐
│  IMPORTANT: Promises use the MICROTASK QUEUE (not Callback Queue)│
│                                                                   │
│  Priority:                                                        │
│  1. Call Stack (current code)           ← HIGHEST                │
│  2. Microtask Queue (Promises, .then)   ← HIGHER than callbacks  │
│  3. Callback Queue (setTimeout, events) ← LOWER                  │
│                                                                   │
│  Event Loop checks microtask queue FIRST after each task!         │
│  This means .then() callbacks run BEFORE setTimeout callbacks     │
│  even if setTimeout has delay of 0ms!                             │
│                                                                   │
│  Example:                                                         │
│  setTimeout(() => console.log("timeout"), 0);                     │
│  Promise.resolve().then(() => console.log("promise"));            │
│  console.log("sync");                                             │
│                                                                   │
│  Output:                                                          │
│  sync      ← call stack (runs first)                             │
│  promise   ← microtask queue (higher priority)                   │
│  timeout   ← callback queue (lower priority)                     │
└──────────────────────────────────────────────────────────────────┘
```

### Final Output

```
Start                                    ← immediate
End...                                   ← immediate
Inside name SetTimeout                   ← after 2 seconds
Inside hobbies SetTimout.                ← after 3 seconds total
["cricket", "reading", "Dancing"]        ← after 3 seconds total
```

---

# File 3: async_await.js

## Topic: Async/Await — The Modern Clean Syntax

### The Code

```javascript
// async and await

console.log("Start");

function getName(name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Inside name SetTimeout");
            resolve(name);
        }, 2000);
    })
}

function getHobbies(name) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Inside hobbies SetTimout.");
            resolve(["cricket", "reading", "Dancing"]);
        }, 1000)
    })
}

async function showHobby() {
    const nm = await getName("Jayesh");
    const hobby = await getHobbies(nm);
    console.log(hobby);
}

showHobby();

console.log("End...");
```

### What is async/await?

```
┌──────────────────────────────────────────────────────────────────┐
│  async/await is SYNTACTIC SUGAR over Promises.                    │
│  It makes Promise-based code LOOK synchronous.                   │
│                                                                   │
│  async → marks a function as asynchronous (always returns Promise)│
│  await → PAUSES execution inside async function until Promise     │
│          resolves, then gives you the resolved value              │
│                                                                   │
│  PROMISE VERSION:                    ASYNC/AWAIT VERSION:         │
│  ─────────────────                   ─────────────────────        │
│  getName("Jayesh")                   async function show() {      │
│    .then(nm => getHobbies(nm))         const nm = await getName();│
│    .then(hobby => {                    const hobby = await        │
│      console.log(hobby);                  getHobbies(nm);         │
│    })                                  console.log(hobby);        │
│                                      }                            │
│                                                                   │
│  Same behavior, but reads like normal synchronous code!           │
└──────────────────────────────────────────────────────────────────┘
```

### Step-by-Step Execution

```
┌──────────────────────────────────────────────────────────────────────┐
│  Line 3: console.log("Start");                                        │
│          → OUTPUT: Start                                              │
│                                                                       │
│  Line 30: showHobby() is called                                       │
│           → This is an async function                                 │
│           → Starts executing like normal...                           │
│                                                                       │
│  Line 24: const nm = await getName("Jayesh");                         │
│           → getName("Jayesh") is called → returns a Promise (PENDING)│
│           → await sees a PENDING Promise                              │
│           → PAUSES showHobby() execution ⏸️                           │
│           → Returns control to the CALLER (global scope)              │
│           → showHobby() is suspended, NOT blocking!                   │
│                                                                       │
│  Line 32: console.log("End...");                                      │
│           → OUTPUT: End...                                            │
│           (Global scope continues while showHobby is paused!)         │
│                                                                       │
│  ═══════════ SCRIPT IS DONE ════════════════════                      │
│                                                                       │
│  After 2 seconds: getName's timer fires                               │
│           → resolve("Jayesh")                                         │
│           → OUTPUT: Inside name SetTimeout                            │
│           → await resumes! nm = "Jayesh"                              │
│                                                                       │
│  Line 25: const hobby = await getHobbies("Jayesh");                   │
│           → getHobbies returns Promise → PAUSES again ⏸️              │
│                                                                       │
│  After 1 more second: getHobbies timer fires                          │
│           → resolve(["cricket", "reading", "Dancing"])                │
│           → OUTPUT: Inside hobbies SetTimout.                         │
│           → await resumes! hobby = ["cricket",...]                    │
│                                                                       │
│  Line 26: console.log(hobby);                                         │
│           → OUTPUT: ["cricket", "reading", "Dancing"]                 │
│                                                                       │
│  showHobby() finishes → returns resolved Promise                      │
└──────────────────────────────────────────────────────────────────────┘
```

### How await Pauses and Resumes

```
async function showHobby() {
    const nm = await getName("Jayesh");   ← PAUSE POINT 1
    //    ⏸️ Everything below waits here
    //    ↓  Control returns to global scope
    //    ↓  "End..." prints
    //    ↓  2 seconds pass...
    //    ▶️ RESUME: nm = "Jayesh"
    
    const hobby = await getHobbies(nm);    ← PAUSE POINT 2
    //    ⏸️ Pauses again
    //    ↓  1 second passes...
    //    ▶️ RESUME: hobby = [...]
    
    console.log(hobby);                    ← Runs after both awaits
}

KEY INSIGHT: await does NOT block the entire program!
It only pauses the async function. The rest of the program
continues running (that's why "End..." prints before the awaits finish).
```

### Comparison: All Three Approaches Side by Side

```
┌─── CALLBACK HELL ─────────────┐
│                                │
│ getName("Jayesh", (nm) => {    │
│   getHobbies(nm, (hobby) => {  │
│     console.log(hobby);        │
│   })                           │
│ })                             │
│                                │
│ ❌ Nested, hard to read        │
│ ❌ Error handling is messy     │
│ ❌ Hard to add steps           │
└────────────────────────────────┘

┌─── PROMISE .then() ───────────┐
│                                │
│ getName("Jayesh")              │
│   .then(nm => getHobbies(nm)) │
│   .then(hobby => {            │
│     console.log(hobby);       │
│   })                           │
│   .catch(err => {...})         │
│                                │
│ ✅ Flat chain, not nested      │
│ ✅ .catch() handles all errors │
│ ⚠️  Still looks "different"    │
└────────────────────────────────┘

┌─── ASYNC/AWAIT ───────────────┐
│                                │
│ async function show() {        │
│   const nm = await getName();  │
│   const hobby = await          │
│     getHobbies(nm);            │
│   console.log(hobby);          │
│ }                              │
│                                │
│ ✅ Reads like synchronous code │
│ ✅ try/catch for errors        │
│ ✅ Easy to understand          │
│ ✅ Easy to debug (line by line)│
└────────────────────────────────┘
```

### Final Output

```
Start                                    ← immediate (sync)
End...                                   ← immediate (sync, runs while showHobby is paused)
Inside name SetTimeout                   ← after 2 seconds
Inside hobbies SetTimout.                ← after 3 seconds total
["cricket", "reading", "Dancing"]        ← after 3 seconds total
```

---

# Interview Preparation

## Callback Functions

### Definition
A callback is a function **passed as an argument** to another function, which is then invoked (called back) at a later time — usually after an asynchronous operation completes.

### Interview Q&A

**Q: What is a callback function?**
A: A function passed as an argument to another function, to be executed later. Used in async operations like setTimeout, event listeners, and API calls.

**Q: What is callback hell?**
A: When callbacks are deeply nested inside each other (pyramid of doom), making code hard to read, debug, and maintain. Example: 5+ levels of nested setTimeout callbacks.

**Q: How do you solve callback hell?**
A: Use Promises (flat .then() chains) or async/await (synchronous-looking code). Both avoid deep nesting.

---

## Promises

### Definition
A Promise is an **object representing the eventual completion or failure** of an asynchronous operation. It has three states: Pending, Fulfilled (resolved), and Rejected.

### Promise Lifecycle

```
                     ┌─── resolve(value) ───► FULFILLED
                     │                         │
  new Promise() ► PENDING                      ├──► .then(value)
                     │                         │
                     └─── reject(error) ────► REJECTED
                                               │
                                               └──► .catch(error)
                                               
                     .finally() runs in BOTH cases
```

### Interview Q&A

**Q: What is a Promise?**
A: An object representing a future value. Created with `new Promise((resolve, reject) => {...})`. States: pending → fulfilled (resolve called) or rejected (reject called). Consumed with `.then()`, `.catch()`, `.finally()`.

**Q: What is Promise chaining?**
A: Connecting multiple `.then()` calls in sequence. Each `.then()` returns a new Promise, allowing the next `.then()` to wait for it. This creates a flat chain instead of nested callbacks.

**Q: What is the difference between callback queue and microtask queue?**
A: Microtask queue (Promises) has HIGHER priority than callback queue (setTimeout). After each task, the event loop empties the entire microtask queue before checking the callback queue.

---

## Async/Await

### Definition
`async/await` is **syntactic sugar over Promises**. `async` marks a function as asynchronous (always returns a Promise). `await` pauses execution until a Promise resolves, then returns the resolved value.

### Key Rules

```
1. await can ONLY be used inside an async function
2. async function ALWAYS returns a Promise
3. await pauses the async function, NOT the whole program
4. Use try/catch for error handling with async/await
5. Multiple awaits run SEQUENTIALLY (one after another)
   Use Promise.all() for PARALLEL execution
```

### Error Handling

```javascript
// With .then()/.catch():
getName("Jayesh")
    .then(nm => getHobbies(nm))
    .then(hobby => console.log(hobby))
    .catch(err => console.log(err));     // catches ANY error in the chain

// With async/await:
async function show() {
    try {
        const nm = await getName("Jayesh");
        const hobby = await getHobbies(nm);
        console.log(hobby);
    } catch (err) {
        console.log(err);               // catches ANY error
    }
}
```

### Interview Q&A

**Q: What is async/await?**
A: Syntactic sugar over Promises that makes async code look synchronous. `async` makes a function return a Promise. `await` pauses the function until a Promise resolves, returning the value.

**Q: Does await block the main thread?**
A: NO! `await` only pauses the async function itself. The rest of the program continues running. That's why "End..." prints before the awaited results.

**Q: How do you handle errors with async/await?**
A: Wrap `await` calls in a `try/catch` block. The `catch` block handles any rejected Promise, similar to `.catch()` in Promise chains.

**Q: What's the difference between sequential and parallel await?**
A: Sequential: `const a = await task1(); const b = await task2();` — task2 waits for task1. Parallel: `const [a, b] = await Promise.all([task1(), task2()]);` — both run simultaneously.

---

## Event Loop, Callback Queue & Microtask Queue

### How Everything Fits Together

```
┌─── YOUR CODE ────────────────────────────────────────────────┐
│  console.log("sync");                    // 1. Runs immediately│
│  setTimeout(() => console.log("timer")); // 2. Goes to Web API │
│  Promise.resolve().then(() =>                                  │
│      console.log("promise"));            // 3. Goes to Microtask│
│  console.log("sync2");                   // 4. Runs immediately│
└──────────────────────────────────────────────────────────────┘

  ┌─── Call Stack ──┐  ┌── Web APIs ──┐  ┌── Microtask Q ──┐  ┌── Callback Q ──┐
  │ "sync"          │  │              │  │                  │  │                │
  │ "sync2"         │  │ timer ⏱️      │  │ promise callback │  │ timer callback │
  └─────────────────┘  └──────────────┘  └──────────────────┘  └────────────────┘
                                              ↑ checked FIRST      ↑ checked SECOND

  Output order:
  1. sync         ← call stack
  2. sync2        ← call stack  
  3. promise      ← microtask queue (HIGHER priority)
  4. timer        ← callback queue (LOWER priority)
```

### Quick Interview Cheat Sheet

```
┌──────────────────────────────────────────────────────────────────┐
│  RAPID-FIRE ANSWERS                                               │
│                                                                   │
│  Callback = function passed to another function, called later    │
│  Callback Hell = deeply nested callbacks (pyramid of doom)       │
│  Promise = object for future async result (pending/fulfilled/    │
│            rejected)                                              │
│  .then() = runs when Promise resolves                            │
│  .catch() = runs when Promise rejects                            │
│  .finally() = runs regardless of resolve/reject                  │
│  Promise.all() = wait for ALL promises (parallel)                │
│  Promise.race() = wait for FIRST promise to settle               │
│  async = makes function return Promise                           │
│  await = pauses async function until Promise resolves            │
│  Event Loop = mechanism that moves callbacks to call stack       │
│  Microtask Queue = for Promises (higher priority)                │
│  Callback Queue = for setTimeout/events (lower priority)         │
│  try/catch = error handling for async/await                      │
└──────────────────────────────────────────────────────────────────┘
```

---
