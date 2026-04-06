# Asynchronous JavaScript — Complete File-by-File Explanation

## Deep Dive with Diagrams: Part 3 (130.js - 144.js) + ES6 Modules

Each file from `javascript-beginning-to-mastery/part3/asynchronous-javascript/` is explained step-by-step with internal mechanism diagrams.

---

# Table of Contents

1. [130.js — setTimeout, clearTimeout & Event Loop](#file-1-130js)
2. [131.js — setInterval & clearInterval with DOM](#file-2-131js)
3. [132.js — Callback Functions Basics](#file-3-132js)
4. [133.js — Callback Hell / Pyramid of Doom](#file-4-133js)
5. [134.js — Promise Basics: resolve, reject, then, catch](#file-5-134js)
6. [135.js — Functions Returning Promises](#file-6-135js)
7. [136.js — Promises with setTimeout Delay](#file-7-136js)
8. [137.js — Promise.resolve & Promise Chaining](#file-8-137js)
9. [138.js — Refactoring Callback Hell with Promises](#file-9-138js)
10. [139.js — AJAX Theory & HTTP Requests](#file-10-139js)
11. [140.js — XMLHttpRequest (XHR) Basics](#file-11-140js)
12. [141.js — XHR Chained Requests & Error Handling](#file-12-141js)
13. [142.js — XHR Wrapped in Promises](#file-13-142js)
14. [143.js — Fetch API: POST Request](#file-14-143js)
15. [144.js — Async/Await](#file-15-144js)
16. [Part3B — ES6 Modules (import/export)](#file-16-part3b-modules)
17. [Interview Preparation: Complete Async Concepts](#interview-preparation)

---

# File 1: 130.js

## Topic: setTimeout, clearTimeout & the Event Loop

### The Code

```javascript
console.log("script start");

const id = setTimeout(() => {
  console.log("inside setTimeout");
}, 1000);

for (let i = 1; i < 100; i++) {
  console.log("....");
}

console.log("settimeout id is ", id);
console.log("clearing time out");
clearTimeout(id);
console.log("Script end");
```

### How setTimeout Works Internally

```
setTimeout is NOT a JavaScript feature!
It's a WEB API provided by the browser.

┌─── JavaScript Engine ────┐    ┌─── Browser (Web APIs) ──────────┐
│                           │    │                                  │
│  Call Stack:              │    │  setTimeout is handled HERE      │
│  ┌─────────────────────┐ │    │  Browser starts a timer thread   │
│  │ script code         │ │    │  JS engine continues running     │
│  └─────────────────────┘ │────►│                                  │
│                           │    │  When timer finishes:            │
│  JS doesn't wait!         │    │  callback → Callback Queue      │
│  It keeps running the     │    │                                  │
│  next line immediately.   │    │  Event Loop: if call stack empty │
│                           │    │  → move callback to call stack   │
└───────────────────────────┘    └──────────────────────────────────┘
```

### Step-by-Step Execution

```
┌──────────────────────────────────────────────────────────────────────┐
│  Line 1: console.log("script start");                                 │
│          → OUTPUT: script start                                       │
│                                                                       │
│  Line 3: setTimeout(() => {...}, 1000)                                │
│          → Browser takes the callback and starts 1-second timer       │
│          → Returns a timer ID (e.g., 1) immediately                   │
│          → id = 1                                                     │
│          → JS engine moves to next line (does NOT wait 1 second!)     │
│                                                                       │
│  Lines 7-9: for loop runs 99 times                                    │
│          → OUTPUT: .... (99 times)                                    │
│          → This might take a few milliseconds                         │
│                                                                       │
│  Line 11: console.log("settimeout id is ", id);                       │
│           → OUTPUT: settimeout id is 1                                │
│                                                                       │
│  Line 12: console.log("clearing time out");                           │
│           → OUTPUT: clearing time out                                 │
│                                                                       │
│  Line 13: clearTimeout(id);                                           │
│           → Tells browser: CANCEL the timer with this ID!             │
│           → The callback will NEVER run                               │
│                                                                       │
│  Line 14: console.log("Script end");                                  │
│           → OUTPUT: Script end                                        │
│                                                                       │
│  "inside setTimeout" NEVER prints because clearTimeout cancelled it!  │
└──────────────────────────────────────────────────────────────────────┘
```

### setTimeout Returns an ID

```
Every setTimeout/setInterval returns a numeric ID:

const id1 = setTimeout(fn1, 1000);  // id1 = 1
const id2 = setTimeout(fn2, 2000);  // id2 = 2
const id3 = setInterval(fn3, 500);  // id3 = 3

Use the ID to cancel:
clearTimeout(id1);   // Cancels fn1 — it won't run
clearInterval(id3);  // Stops fn3 from repeating
```

### Final Output

```
script start
.... (99 times)
settimeout id is 1
clearing time out
Script end
(inside setTimeout NEVER prints — cancelled!)
```

---

# File 2: 131.js

## Topic: setInterval & clearInterval with DOM Manipulation

### The Code

```javascript
const body = document.body;
const button = document.querySelector("button");

const intervalId = setInterval(() => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  const rgb = `rgb(${red},${green}, ${blue})`;
  body.style.background = rgb;
}, 1000);

button.addEventListener("click", () => {
  clearInterval(intervalId);
  button.textContent = body.style.background;
});

console.log(intervalId);
```

### setTimeout vs setInterval

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                   │
│  setTimeout(callback, delay)                                     │
│  → Runs callback ONCE after delay                                │
│  → Then stops                                                    │
│                                                                   │
│  Timeline: ───────────[callback]                                  │
│                       ↑ after delay                               │
│                                                                   │
│  setInterval(callback, delay)                                    │
│  → Runs callback REPEATEDLY every delay milliseconds             │
│  → Keeps running until clearInterval() is called                 │
│                                                                   │
│  Timeline: ──[cb]──[cb]──[cb]──[cb]──[cb]──[STOP]               │
│              ↑      ↑     ↑     ↑     ↑      ↑                  │
│              1s     2s    3s    4s    5s    clearInterval()       │
└─────────────────────────────────────────────────────────────────┘
```

### How This Code Works

```
Every 1 second:
┌──────────────────────────────────────────────────────────┐
│ 1. Generate random R, G, B (each 0-255)                  │
│ 2. Create color string: "rgb(142, 68, 210)"              │
│ 3. Apply as background: body.style.background = color    │
│ 4. Page background changes to random color!              │
└──────────────────────────────────────────────────────────┘

When user clicks button:
┌──────────────────────────────────────────────────────────┐
│ 1. clearInterval(intervalId) → STOPS the color changes   │
│ 2. button.textContent = body.style.background            │
│    → Shows the last color on the button text             │
└──────────────────────────────────────────────────────────┘
```

---

# File 3: 132.js

## Topic: Callback Functions — Basics and Patterns

### The Code

```javascript
function getTwoNumbersAndAdd(number1, number2, onSuccess, onFailure) {
  if (typeof number1 === "number" && typeof number2 === "number") {
    onSuccess(number1, number2);
  } else {
    onFailure();
  }
}

function addTwoNumbers(num1, num2) {
  console.log(num1 + num2);
}

function onFail() {
  console.log("Wrong data type");
  console.log("please pass numbers only")
}

getTwoNumbersAndAdd(4, 4, addTwoNumbers, onFail);
```

### How Callbacks Work

```
getTwoNumbersAndAdd(4, 4, addTwoNumbers, onFail)
       ↓          ↓  ↓        ↓            ↓
    function     n1  n2    success cb    failure cb

┌──────────────────────────────────────────────────────────────┐
│  Inside getTwoNumbersAndAdd:                                  │
│                                                               │
│  number1 = 4              (is a number? YES ✅)              │
│  number2 = 4              (is a number? YES ✅)              │
│                                                               │
│  Both are numbers → call onSuccess(4, 4)                     │
│                   → which is addTwoNumbers(4, 4)             │
│                   → console.log(4 + 4)                       │
│                   → OUTPUT: 8                                │
│                                                               │
│  If we passed ("hello", 4, addTwoNumbers, onFail):           │
│  "hello" is NOT a number → call onFailure()                  │
│                          → which is onFail()                 │
│                          → OUTPUT: Wrong data type           │
│                          → OUTPUT: please pass numbers only  │
└──────────────────────────────────────────────────────────────┘

This pattern: success callback + failure callback
is EXACTLY what Promises formalize with resolve + reject!
```

---

# File 4: 133.js

## Topic: Callback Hell / Pyramid of Doom

### The Code (key parts)

```javascript
// The callback hell version:
changeText(heading1, "one","violet",1000,()=>{
  changeText(heading2, "two","purple",2000,()=>{
    changeText(heading3, "three","red",1000,()=>{
      changeText(heading4, "four","pink",1000,()=>{
        changeText(heading5, "five","green",2000,()=>{
          changeText(heading6, "six","blue",1000,()=>{
            changeText(heading7, "seven","brown",1000,()=>{
              // ... more nesting ...
            })
          })
        })
      })
    })
  })
})
```

### The Pyramid of Doom Visualized

```
Level 0: changeText(heading1, ...)
Level 1:   changeText(heading2, ...)
Level 2:     changeText(heading3, ...)
Level 3:       changeText(heading4, ...)
Level 4:         changeText(heading5, ...)
Level 5:           changeText(heading6, ...)
Level 6:             changeText(heading7, ...)
Level 7:               changeText(heading8, ...)
Level 8:                 changeText(heading9, ...)
Level 9:                   changeText(heading10, ...)

The code forms a PYRAMID shape → "Pyramid of Doom"
Each step depends on the previous one finishing.
Error handling becomes extremely difficult.
```

### Why This is a Problem

```
┌──────────────────────────────────────────────────────────────┐
│  PROBLEMS WITH CALLBACK HELL:                                 │
│                                                               │
│  1. READABILITY: Hard to follow the logic flow                │
│  2. DEBUGGING: Which callback is failing? Hard to tell.       │
│  3. ERROR HANDLING: Each level needs its own error callback    │
│  4. MAINTENANCE: Adding a step in the middle is painful       │
│  5. SCALABILITY: 10 steps = 10 levels of nesting              │
│                                                               │
│  SOLUTION → Promises (next file: 134.js)                      │
│  SOLUTION → async/await (file: 144.js)                        │
└──────────────────────────────────────────────────────────────┘
```

---

# File 5: 134.js

## Topic: Promise Basics — resolve, reject, then, catch

### The Code

```javascript
const bucket = ['coffee', 'chips', 'vegetables', 'salt', 'rice'];

// Producing code
const friedRicePromise = new Promise((resolve, reject) => {
    if (bucket.includes("vegetables") && bucket.includes("salt") && bucket.includes("rice")) {
        resolve({ value: "friedrice" });
    } else {
        reject("could not do it");
    }
})

// Consuming code
friedRicePromise.then(
    (myfriedRice) => { console.log("lets eat ", myfriedRice); }
).catch(
    (error) => { console.log(error) }
)
```

### Promise Anatomy

```
┌──────────────────────────────────────────────────────────────────┐
│  new Promise((resolve, reject) => { ... })                        │
│              ↑          ↑                                         │
│     success function  failure function                            │
│     (call when done)  (call when error)                           │
│                                                                   │
│  PRODUCING CODE: Creates the Promise                              │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  Check if bucket has vegetables, salt, rice              │    │
│  │  YES → resolve({ value: "friedrice" })                   │    │
│  │        → Promise state: PENDING → FULFILLED              │    │
│  │        → The value { value: "friedrice" } is stored      │    │
│  │                                                           │    │
│  │  NO  → reject("could not do it")                         │    │
│  │        → Promise state: PENDING → REJECTED               │    │
│  │        → The error "could not do it" is stored            │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                   │
│  CONSUMING CODE: Uses the Promise                                 │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  .then(onFulfilled)  → runs when resolve() was called    │    │
│  │  .catch(onRejected)  → runs when reject() was called     │    │
│  │  .finally(callback)  → runs either way                    │    │
│  └──────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────┘
```

### Microtask Queue Priority

```
This file also demonstrates:

setTimeout(() => { console.log("hello from setTimeout") }, 0);
// vs
friedRicePromise.then(...)

Even with 0ms delay, setTimeout runs AFTER Promise .then():

┌─── Priority Order ──────────────────────────────────┐
│ 1. Synchronous code (call stack)         HIGHEST    │
│ 2. Microtask Queue (Promise .then/.catch)           │
│ 3. Callback Queue (setTimeout/setInterval) LOWEST   │
└─────────────────────────────────────────────────────┘
```

---

# File 6: 135.js

## Topic: Functions Returning Promises

### The Code

```javascript
function ricePromise() {
  const bucket = ['coffee', 'chips', 'vegetables', 'salt', 'rice'];
  return new Promise((resolve, reject) => {
    if (bucket.includes("vegetables") && bucket.includes("salt") && bucket.includes("rice")) {
      resolve({ value: "friedrice" });
    } else {
      reject("could not do it");
    }
  })
}

ricePromise()
  .then((myfriedRice) => { console.log("lets eat ", myfriedRice); })
  .catch((error) => { console.log(error) })
```

### Why Wrap Promises in Functions?

```
┌──────────────────────────────────────────────────────────────┐
│  WITHOUT function wrapper:                                    │
│  const promise = new Promise(...)  → runs IMMEDIATELY        │
│  Can only use ONCE                                           │
│                                                               │
│  WITH function wrapper:                                       │
│  function makePromise() { return new Promise(...) }          │
│  makePromise()  → creates NEW promise each call              │
│  Can REUSE multiple times!                                    │
│                                                               │
│  This is the standard pattern for:                            │
│  • API calls: function fetchUser(id) { return fetch(...) }   │
│  • Database queries                                           │
│  • File operations                                            │
│  • Any reusable async operation                               │
└──────────────────────────────────────────────────────────────┘
```

---

# File 7: 136.js

## Topic: Promises with setTimeout (Delayed Resolution)

### The Code

```javascript
function myPromise() {
    return new Promise((resolve, reject) => {
        const value = false;
        setTimeout(() => {
            if (value) {
                resolve();
            } else {
                reject();
            }
        }, 2000)
    })
}

myPromise()
    .then(() => { console.log("resolved") })
    .catch(() => { console.log("rejected") })
```

### Timeline

```
Time 0ms:  myPromise() called → Promise created (PENDING)
           setTimeout starts 2-second timer
           .then() and .catch() registered (not executed)

Time 0-2000ms: Promise is PENDING
               .then() and .catch() are waiting

Time 2000ms: Timer fires!
             value = false → reject() is called
             Promise: PENDING → REJECTED
             .catch() callback goes to Microtask Queue
             → OUTPUT: rejected

If value were true:
             resolve() would be called
             Promise: PENDING → FULFILLED
             .then() callback would run
             → OUTPUT: resolved
```

---

# File 8: 137.js

## Topic: Promise.resolve & Promise Chaining

### The Code

```javascript
function myPromise() {
  return new Promise((resolve, reject) => {
    resolve("foo");
  })
}

myPromise()
  .then((value) => {
    console.log(value);       // "foo"
    value += "bar";
    return value              // returns "foobar"
  })
  .then((value) => {
    console.log(value);       // "foobar"
    value += "baaz";
    return value;             // returns "foobarbaaz"
  })
  .then(value => {
    console.log(value);       // "foobarbaaz"
  })
```

### How Promise Chaining Works

```
myPromise() resolves with "foo"
      │
      ▼
.then(value => {              value = "foo"
  console.log(value);         OUTPUT: foo
  value += "bar";             value = "foobar"
  return value;               → internally: return Promise.resolve("foobar")
})                            .then() ALWAYS returns a Promise!
      │
      ▼
.then(value => {              value = "foobar"
  console.log(value);         OUTPUT: foobar
  value += "baaz";            value = "foobarbaaz"
  return value;               → internally: return Promise.resolve("foobarbaaz")
})
      │
      ▼
.then(value => {              value = "foobarbaaz"
  console.log(value);         OUTPUT: foobarbaaz
})

KEY INSIGHT:
  return value;
  // is the same as:
  return Promise.resolve(value);
  
  .then() AUTOMATICALLY wraps the return value in a Promise!
  If you don't return anything, it returns Promise.resolve(undefined)
```

### Final Output

```
foo
foobar
foobarbaaz
```

---

# File 9: 138.js

## Topic: Refactoring Callback Hell with Promise Chaining

### The Code

```javascript
function changeText(element, text, color, time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (element) {
        element.textContent = text;
        element.style.color = color;
        resolve();
      } else {
        reject("element not found");
      }
    }, time)
  })
}

// Clean Promise chain (vs callback hell in 133.js)
changeText(heading1, "one", "red", 1000)
  .then(() => changeText(heading2, "two", "purple", 1000))
  .then(() => changeText(heading3, "three", "green", 1000))
  .then(() => changeText(heading4, "four", "orange", 1000))
  .then(() => changeText(heading5, "five", "orange", 1000))
  .then(() => changeText(heading6, "six", "orange", 1000))
  .catch((error) => { alert(error); })
```

### Before vs After

```
CALLBACK HELL (133.js):              PROMISE CHAIN (138.js):
────────────────────────             ─────────────────────────
changeText(h1,...,()=>{              changeText(h1, ...)
  changeText(h2,...,()=>{              .then(() => changeText(h2,...))
    changeText(h3,...,()=>{            .then(() => changeText(h3,...))
      changeText(h4,...,()=>{          .then(() => changeText(h4,...))
        changeText(h5,...,()=>{        .then(() => changeText(h5,...))
          changeText(h6,...,()=>{      .then(() => changeText(h6,...))
          },()=>{err})                 .catch((error) => alert(error))
        },()=>{err})
      },()=>{err})               FLAT! One .catch handles ALL errors!
    },()=>{err})
  },()=>{err})
},()=>{err})

NESTED (hard to read)                FLAT (easy to read)
```

### Sequential Execution

```
Time 0s:    changeText(heading1) starts → 1 sec timer
Time 1s:    heading1 shows "one" in red → resolve()
            → changeText(heading2) starts → 1 sec timer
Time 2s:    heading2 shows "two" in purple → resolve()
            → changeText(heading3) starts → 1 sec timer
Time 3s:    heading3 shows "three" in green → resolve()
            → ... continues ...

Each heading appears one after another, 1 second apart!
If any element is null → reject("element not found") → .catch() runs
```

---

# File 10: 139.js

## Topic: AJAX Theory & HTTP Requests

### Key Concepts (Theory File — No Executable Code)

```
┌──────────────────────────────────────────────────────────────────┐
│  AJAX = Asynchronous JavaScript And XML                           │
│                                                                   │
│  What it does:                                                    │
│  Send/receive data from a server WITHOUT reloading the page      │
│                                                                   │
│  Before AJAX:                                                     │
│  Click button → entire page reloads → server sends new page     │
│                                                                   │
│  With AJAX:                                                       │
│  Click button → JS sends request in background → updates only    │
│  the part that changed (no page reload!)                         │
│                                                                   │
│  3 Ways to Make HTTP Requests:                                    │
│  ┌─────────────────────────────────────────────────────────┐     │
│  │ 1. XMLHttpRequest (XHR) — old way, verbose              │     │
│  │ 2. fetch API — modern, Promise-based, clean              │     │
│  │ 3. axios — third-party library, even cleaner             │     │
│  └─────────────────────────────────────────────────────────┘     │
│                                                                   │
│  Data Format:                                                     │
│  XML (old) → JSON (modern, lightweight, standard now)            │
└──────────────────────────────────────────────────────────────────┘
```

---

# File 11: 140.js

## Topic: XMLHttpRequest (XHR) — Basic GET Request

### The Code

```javascript
const URL = "https://jsonplaceholder.typicode.com/posts";
const xhr = new XMLHttpRequest();

xhr.open("GET", URL);

xhr.onload = function () {
    const response = xhr.response;
    const data = JSON.parse(response);
    console.log(data);
}

xhr.send();
```

### XHR Step by Step

```
┌──────────────────────────────────────────────────────────────────┐
│  Step 1: Create XHR object                                        │
│          const xhr = new XMLHttpRequest();                        │
│                                                                   │
│  Step 2: Configure the request                                    │
│          xhr.open("GET", URL);                                    │
│          → Method: GET (fetch data)                               │
│          → URL: where to send request                             │
│          → readyState: 0 → 1 (OPENED)                            │
│                                                                   │
│  Step 3: Set up response handler                                  │
│          xhr.onload = function() {...}                            │
│          → This runs when readyState = 4 (DONE)                  │
│          → xhr.response contains raw text (string)                │
│          → JSON.parse() converts string → JS object              │
│                                                                   │
│  Step 4: Send the request                                         │
│          xhr.send();                                              │
│          → Request goes to server in background                   │
│          → readyState changes: 1 → 2 → 3 → 4                    │
│          → When 4 (DONE): onload fires                            │
└──────────────────────────────────────────────────────────────────┘

readyState values:
┌───────┬──────────────────────┐
│ State │ Meaning              │
├───────┼──────────────────────┤
│   0   │ UNSENT (created)     │
│   1   │ OPENED (.open called)│
│   2   │ HEADERS_RECEIVED     │
│   3   │ LOADING (data coming)│
│   4   │ DONE (complete!)     │
└───────┴──────────────────────┘
```

---

# File 12: 141.js

## Topic: XHR Chained Requests & Error Handling

### The Code

```javascript
const URL = "https://jsonplaceholder.typicode.com/posts";
const xhr = new XMLHttpRequest();

xhr.open("GET", URL);
xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.response);
        const id = data[3].id;
        
        // Second request using data from first
        const xhr2 = new XMLHttpRequest();
        xhr2.open("GET", `${URL}/${id}`);
        xhr2.onload = () => {
            const data2 = JSON.parse(xhr2.response);
            console.log(data2);
        }
        xhr2.send();
    } else {
        console.log("something went wrong");
    }
}

xhr.onerror = () => { console.log("network error"); }
xhr.send();
```

### Two Requests Chained

```
Request 1: GET /posts → gets all posts
      │
      ▼ Extract id from post[3]
      │
Request 2: GET /posts/{id} → gets specific post

This is the XHR version of chaining — nested callbacks!
(File 142.js wraps this in Promises for cleaner code)

HTTP Status Codes:
┌─────────┬──────────────────────────────┐
│ 200-299 │ SUCCESS ✅                    │
│ 300-399 │ REDIRECT                     │
│ 400-499 │ CLIENT ERROR (404 not found) │
│ 500-599 │ SERVER ERROR                 │
└─────────┴──────────────────────────────┘

xhr.onerror → ONLY fires for NETWORK errors
             (no internet, DNS failure, CORS blocked)
             Does NOT fire for 404 or 500 errors!
```

---

# File 13: 142.js

## Topic: XHR Wrapped in Promises

### The Code

```javascript
const URL = "https://jsonplaceholder.typicode.com/posts";

function sendRequest(method, url) {
    return new Promise(function (resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            } else {
                reject(new Error("Something Went wrong"));
            }
        }
        xhr.onerror = function () {
            reject(new Error("Something went wrong"));
        }
        xhr.send();
    })
}

sendRequest("GET", URL)
    .then(response => JSON.parse(response))
    .then(data => data[3].id)
    .then(id => sendRequest("GET", `${URL}/${id}`))
    .then(newResponse => console.log(JSON.parse(newResponse)))
    .catch(error => console.log(error))
```

### XHR + Promise = Clean Chain

```
Callback version (141.js):          Promise version (142.js):
──────────────────────               ─────────────────────────
xhr.onload = () => {                 sendRequest("GET", URL)
  // get data                          .then(resp => parse(resp))
  xhr2 = new XMLHttpRequest();         .then(data => data[3].id)
  xhr2.open("GET", url2);             .then(id => sendRequest("GET",url))
  xhr2.onload = () => {               .then(resp => console.log(resp))
    // nested!                         .catch(err => handle(err))
  }
  xhr2.send();                       FLAT! One .catch() for all!
}
xhr.send();
```

---

# File 14: 143.js

## Topic: Fetch API — POST Request

### The Code

```javascript
const URL = "https://jsonplaceholder.typicode.com/posts";

fetch(URL, {
    method: 'POST',
    body: JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1,
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
})
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Something went wrong!!!")
        }
    })
    .then(data => console.log(data))
    .catch(error => console.log(error))
```

### fetch vs XHR

```
┌─── XHR (old) ──────────────────┐  ┌─── fetch (modern) ──────────────┐
│ const xhr = new XMLHttpRequest()│  │ fetch(URL, options)              │
│ xhr.open("GET", URL);          │  │   .then(response => ...)         │
│ xhr.onload = function() {      │  │   .catch(error => ...)           │
│   // handle response            │  │                                  │
│ }                               │  │ Returns a Promise!               │
│ xhr.onerror = function() {     │  │ Built-in, no extra objects       │
│   // handle error               │  │ Cleaner syntax                   │
│ }                               │  │                                  │
│ xhr.send();                     │  │ BUT: fetch only rejects on       │
│                                 │  │ NETWORK errors, not 404/500!    │
│ Verbose, callback-based         │  │ Must check response.ok manually │
└─────────────────────────────────┘  └──────────────────────────────────┘
```

### Key fetch Concepts

```
1. fetch() returns a Promise
2. response.ok → true if status 200-299
3. response.json() → parses JSON body (returns Promise!)
4. response.text() → gets raw text
5. JSON.stringify() → JS object → JSON string (for sending)
6. response.json() → JSON string → JS object (for receiving)

GOTCHA: fetch does NOT reject on 404 or 500!
You must check response.ok yourself!
```

---

# File 15: 144.js

## Topic: Async/Await

### The Code

```javascript
console.log("script start");
const URL = "https://jsonplaceholder.typicode.com/posts";

const getPosts = async() => {   
    const response = await fetch(URL);
    if(!response.ok){
        throw new Error("Something went wrong")
    }
    const data = await response.json();
    return data;
}

getPosts()
    .then((myData) => console.log(myData))
    .catch(error => console.log(error))

console.log("script end");
```

### How async/await Works

```
┌──────────────────────────────────────────────────────────────────┐
│  const getPosts = async() => {                                    │
│      const response = await fetch(URL);  ← PAUSE here           │
│      //                                                           │
│      // While paused:                                             │
│      // 1. fetch sends HTTP request in background                │
│      // 2. Control returns to caller                             │
│      // 3. "script end" prints                                    │
│      // 4. When response arrives → resume here                   │
│      //                                                           │
│      const data = await response.json(); ← PAUSE again          │
│      //                                                           │
│      // response.json() parses the body                          │
│      // When parsing done → resume here                          │
│      //                                                           │
│      return data;  ← getPosts() Promise resolves with data      │
│  }                                                                │
│                                                                   │
│  Output order:                                                    │
│  1. "script start"    (synchronous)                               │
│  2. "script end"      (synchronous, runs while getPosts paused)  │
│  3. [posts data]      (async, after fetch completes)              │
└──────────────────────────────────────────────────────────────────┘
```

### async/await is Sugar Over Promises

```
FETCH WITH .then():                  FETCH WITH async/await:
───────────────────                  ────────────────────────
fetch(URL)                           async function get() {
  .then(response => {                  const response = await fetch(URL);
    if(!response.ok) throw Error();    if(!response.ok) throw Error();
    return response.json();            const data = await response.json();
  })                                   return data;
  .then(data => {                    }
    console.log(data);
  })                                 Same thing, but reads like
  .catch(err => console.log(err))    synchronous code!
```

---

# File 16: Part3B — ES6 Modules

## Topic: import/export Syntax

### The Files

```
part3B/
├── app.js           ← Main file (imports everything)
├── Utils/
│   ├── fistname.js  ← Named export
│   ├── lastnam.js   ← Named export (different syntax)
│   └── Person.js    ← Default export + Named export
```

### Export Types

```javascript
// Named Export (inline):
export const firstname = "Jayesh";           // fistname.js

// Named Export (at bottom):
const lastname = "Gangurde";
export { lastname };                         // lastnam.js

// Default Export:
export default class Person { ... }          // Person.js

// Default + Named in same file:
export default class Person { ... }
export class Person2 { ... }                 // Person.js
```

### Import Types

```javascript
// Named import (must match export name, use { }):
import { firstname } from "./Utils/fistname.js";
import { lastname } from "./Utils/lastnam.js";

// Default import (any name, NO { }):
import Person from "./Utils/Person.js";
// Could also be: import MyClass from "./Utils/Person.js"  ← any name!

// Both default + named from same file:
import Person, { Person2 } from "./Utils/Person.js";

// Rename with 'as':
import { firstname as fname } from "./Utils/fistname.js";
```

### Key Rules

```
┌──────────────────────────────────────────────────────────────────┐
│  DEFAULT EXPORT                  │  NAMED EXPORT                  │
├──────────────────────────────────┼────────────────────────────────┤
│  export default class Foo {}     │  export class Foo {}           │
│  Only ONE per file               │  Can have MANY per file        │
│  Import: import Foo from "..."   │  Import: import {Foo} from "." │
│  Can use ANY name on import      │  MUST use exact name (or 'as')│
│  No curly braces { }            │  Requires curly braces { }    │
└──────────────────────────────────┴────────────────────────────────┘

HTML must use type="module":
<script src="app.js" type="module"></script>
```

---

# Interview Preparation

## setTimeout & setInterval

### Definition
- **setTimeout**: Executes a callback function **once** after a specified delay (in ms). Returns a timer ID for cancellation.
- **setInterval**: Executes a callback function **repeatedly** at specified intervals. Returns an ID for cancellation with `clearInterval`.

### Interview Q&A

**Q: Does setTimeout guarantee exact timing?**
A: No! setTimeout guarantees a MINIMUM delay, not exact. If the call stack is busy, the callback waits in the queue even after the timer expires. `setTimeout(fn, 0)` doesn't mean "run immediately" — it means "run as soon as the stack is empty."

**Q: What's the difference between setTimeout and setInterval?**
A: setTimeout runs once after the delay. setInterval runs repeatedly every delay milliseconds until cleared.

---

## Callbacks

### Definition
A callback is a function **passed as an argument** to another function, to be executed later — typically after an async operation completes.

### Interview Q&A

**Q: What is callback hell?**
A: Deeply nested callbacks that form a pyramid shape, making code hard to read, debug, and maintain. Solved by Promises (flat chains) or async/await (synchronous-looking code).

---

## Promises

### Definition
A Promise is an **object representing the eventual completion or failure** of an asynchronous operation. It has three states: **Pending** (initial), **Fulfilled** (resolved), **Rejected** (failed).

### Promise Methods

```
┌──────────────────────────────────────────────────────────────┐
│  INSTANCE METHODS:                                            │
│  .then(onFulfilled, onRejected) → handles resolve/reject     │
│  .catch(onRejected)             → handles reject only         │
│  .finally(callback)             → runs either way             │
│                                                               │
│  STATIC METHODS:                                              │
│  Promise.resolve(value) → creates fulfilled Promise           │
│  Promise.reject(error)  → creates rejected Promise            │
│  Promise.all([p1,p2])   → waits for ALL, fails if ANY fails  │
│  Promise.allSettled()   → waits for ALL, never short-circuits │
│  Promise.race([p1,p2])  → first to settle wins               │
│  Promise.any([p1,p2])   → first to FULFILL wins              │
└──────────────────────────────────────────────────────────────┘
```

### Interview Q&A

**Q: What is Promise chaining?**
A: Connecting multiple `.then()` calls. Each `.then()` returns a new Promise, allowing the next `.then()` to wait for it. Creates a flat chain instead of nested callbacks.

**Q: What's the difference between Promise.all and Promise.allSettled?**
A: `Promise.all` rejects immediately if ANY promise rejects. `Promise.allSettled` waits for ALL promises to complete (resolve or reject) and returns results for each.

---

## Fetch API

### Definition
`fetch()` is a modern, Promise-based API for making HTTP requests. It returns a Promise that resolves to a Response object.

### Interview Q&A

**Q: Does fetch reject on 404 errors?**
A: NO! fetch only rejects on NETWORK errors (no internet, DNS failure). For HTTP errors (404, 500), you must check `response.ok` or `response.status` manually.

**Q: What does response.json() return?**
A: A Promise (not the data directly). You need to `.then()` or `await` it: `const data = await response.json();`

---

## Async/Await

### Definition
Syntactic sugar over Promises. `async` marks a function as asynchronous (always returns Promise). `await` pauses the async function until a Promise settles.

### Error Handling

```javascript
async function fetchData() {
    try {
        const response = await fetch(URL);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error:", error.message);
    }
}
```

### Interview Q&A

**Q: Can you use await outside an async function?**
A: In ES modules (`type="module"`), yes — top-level await is supported. In regular scripts, no — await must be inside an async function.

**Q: Does await block the main thread?**
A: NO. It only pauses the async function. The rest of the program continues. Other events, timers, and user interactions still work.

---

## ES6 Modules

### Definition
ES6 Modules allow you to split code into separate files with explicit `import`/`export` statements. Each module has its own scope (variables don't leak to global).

### Interview Q&A

**Q: What's the difference between default and named exports?**
A: Default: one per file, imported without `{ }`, any name. Named: many per file, imported with `{ }`, must match exact name (or use `as`).

**Q: What's the difference between CommonJS and ES Modules?**
A: CommonJS (`require`/`module.exports`) is synchronous, used in Node.js. ES Modules (`import`/`export`) are asynchronous, standard in browsers and modern Node.js.

---

## Quick Interview Cheat Sheet

```
┌──────────────────────────────────────────────────────────────────┐
│  RAPID-FIRE ANSWERS                                               │
│                                                                   │
│  setTimeout = run once after delay, returns ID                   │
│  setInterval = run repeatedly, clearInterval to stop             │
│  Callback = function passed to function, called later            │
│  Callback Hell = deeply nested callbacks (pyramid)               │
│  Promise = object for future result (pending/fulfilled/rejected) │
│  .then() = on resolve, .catch() = on reject                     │
│  Promise chain = flat .then().then().catch()                     │
│  Microtask Queue = Promises (higher priority than setTimeout)    │
│  AJAX = async HTTP requests without page reload                  │
│  XHR = old way (XMLHttpRequest), verbose                        │
│  fetch = modern way, returns Promise                             │
│  fetch does NOT reject on 404!                                   │
│  response.json() returns a Promise!                              │
│  async = function returns Promise                                │
│  await = pause until Promise resolves                            │
│  await does NOT block main thread                                │
│  ES Modules = import/export, each file = own scope               │
│  default export = one per file, any import name                  │
│  named export = many per file, exact import name                 │
└──────────────────────────────────────────────────────────────────┘
```

---
