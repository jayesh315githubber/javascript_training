// promise && setTimeout
//
// Combining Promise + setTimeout = DELAYED async operation.
// The Promise stays PENDING until the timer fires,
// then resolves or rejects based on the condition.
//
// This is how real async works:
//   fetch() → Promise stays PENDING while server responds
//   Here → Promise stays PENDING while timer counts down

// I want to resolve / reject promise after 2 seconds

function myPromise() {
    return new Promise((resolve, reject) => {
        const value = false;          // change to true to see resolve!
        setTimeout(() => {            // delay the decision by 2 seconds
            if (value) {
                resolve();            // ✅ after 2 sec → FULFILLED
            } else {
                reject();             // ❌ after 2 sec → REJECTED
            }
        }, 2000)
    })
}

myPromise()
    .then(() => { console.log("resolved") })     // runs if resolve() was called
    .catch(() => { console.log("rejected") })     // runs if reject() was called

// Output (after 2 seconds): "rejected"  ← because value = false


// ========== Timeline ==========
//
// Time 0ms:    myPromise() called
//              → new Promise created (state: PENDING)
//              → setTimeout starts 2-second timer
//              → .then() and .catch() REGISTERED (not run yet — just waiting)
//              → function returns the Promise immediately
//
// Time 0-2000ms: Promise is PENDING ⏳
//                .then() and .catch() are waiting...
//
// Time 2000ms:  Timer fires!
//               → value = false → reject() called
//               → Promise state: PENDING → REJECTED
//               → .catch() callback → MICROTASK queue
//               → Event Loop → moves to call stack
//               → OUTPUT: "rejected"
//
// If value was true:
//               → resolve() called
//               → Promise state: PENDING → FULFILLED
//               → .then() callback runs
//               → OUTPUT: "resolved"


// ========== Why This Pattern Matters ==========
//
// This simulates real-world async operations:
//
//   function fetchUser(id) {
//       return new Promise((resolve, reject) => {
//           setTimeout(() => {                    // simulates network delay
//               if (id > 0) {
//                   resolve({ name: "Jay" });     // success after delay
//               } else {
//                   reject("Invalid ID");         // failure after delay
//               }
//           }, 1000)
//       })
//   }
//
//   fetchUser(1).then(user => console.log(user));   // { name: "Jay" } after 1 sec
//   fetchUser(-1).catch(err => console.log(err));   // "Invalid ID" after 1 sec
//
// Real fetch() works exactly like this internally —
// PENDING while waiting for server, then resolve/reject when response arrives.


// ========== Promise States Recap ==========
//
//   PENDING ─────┬── resolve() ──► FULFILLED → .then() runs
//                │
//                └── reject()  ──► REJECTED  → .catch() runs
//
//   .finally() runs in BOTH cases (cleanup)
//
//   Once settled → state NEVER changes again.
//   Calling resolve() after reject() (or vice versa) has NO effect.
