// function returning promise
//
// WHY wrap Promise in a function?
//   File 134: const promise = new Promise(...)  → runs IMMEDIATELY, can only use ONCE
//   File 135: function makePromise() { return new Promise(...) }  → creates NEW promise each call!
//
// This is the STANDARD PATTERN for reusable async operations.
// Every time you call the function, a fresh Promise is created.

function ricePromise() {
  const bucket = ['coffee', 'chips', 'vegetables', 'salt', 'rice'];
  return new Promise((resolve, reject) => {
    if (bucket.includes("vegetables") && bucket.includes("salt") && bucket.includes("rice")) {
      resolve({ value: "friedrice" });       // ✅ has all ingredients → success
    } else {
      reject("could not do it");             // ❌ missing ingredient → failure
    }
  })
}

// Call the function → get a new Promise → consume with .then/.catch
ricePromise().then(
  // jab promise resolve hoga
  (myfriedRice) => {
    console.log("lets eat ", myfriedRice);   // OUTPUT: lets eat { value: "friedrice" }
  }
).catch(
  (error) => {
    console.log(error)
  })

// How it works step by step:
//   1. ricePromise() is called
//   2. Inside: creates new Promise
//   3. Checks bucket → has vegetables, salt, rice → resolve({ value: "friedrice" })
//   4. Promise state: PENDING → FULFILLED
//   5. .then() callback runs → "lets eat { value: 'friedrice' }"


// ========== File 134 vs File 135 ==========
//
// File 134 (direct Promise):
//   const friedRicePromise = new Promise((resolve, reject) => { ... });
//   friedRicePromise.then(...)
//   → Promise created ONCE, immediately
//   → Can't reuse to create new promises
//
// File 135 (function returning Promise):
//   function ricePromise() { return new Promise(...) }
//   ricePromise().then(...)
//   → Creates FRESH promise every time you call ricePromise()
//   → REUSABLE! Can call multiple times!
//
//   ricePromise().then(...)   ← call 1 → new promise
//   ricePromise().then(...)   ← call 2 → another new promise
//   ricePromise().then(...)   ← call 3 → yet another new promise


// ========== This is How Real-World APIs Work ==========
//
// fetch(url) → returns Promise
//   fetch("https://api.example.com/users")
//     .then(response => response.json())
//     .then(data => console.log(data))
//     .catch(err => console.log(err))
//
// fetch is a FUNCTION that RETURNS a Promise — same pattern as ricePromise()!
//
// You can also make it reusable with parameters:
//
//   function getUser(id) {
//       return new Promise((resolve, reject) => {
//           // ... fetch user by id
//           if (found) resolve(user);
//           else reject("User not found");
//       });
//   }
//   getUser(1).then(user => console.log(user));
//   getUser(2).then(user => console.log(user));   ← reuse with different id!
