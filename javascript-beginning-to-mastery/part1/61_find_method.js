// find method
// array.find(callback) — returns the FIRST element that passes the test.
// If nothing passes → returns undefined.
//
// Unlike filter() which returns ALL matches in an array,
// find() returns just ONE element (the first match) or undefined.
//
// Syntax: array.find(function(value, index, array) { return condition; })

//  Returns the value of the first element in the array
//  where predicate is true, and undefined otherwise.

// ========== Example 1: Find string with length 3 ==========

const myArray = ["Hello", "catt", "dog", "lion"];

// Way 1: Named function as callback
function isLength3(string) {
    return string.length === 3;
}

const res = myArray.find(isLength3);
console.log(res);    // "dog"

// Way 2: Arrow function (same thing, shorter)
const ans = myArray.find((string) => string.length === 3);
console.log(ans);    // "dog"

// How find() works internally — checks EACH element:
//   "Hello" → length 5 → false ❌ (skip)
//   "catt"  → length 4 → false ❌ (skip)
//   "dog"   → length 3 → true ✅  (STOP! return "dog")
//   "lion"  → never checked (already found one!)
//
// find() stops at the FIRST match — doesn't check the rest.


// ========== Example 2: Find object by userId ==========

const users = [
    { userId: 1, userName: "harshit" },
    { userId: 2, userName: "harsh" },
    { userId: 3, userName: "nitish" },
    { userId: 4, userName: "mohit" },
    { userId: 5, userName: "aaditya" },
];

// Arrow function — find user with userId === 3
const myUser = users.find((user) => user.userId === 3);
console.log(myUser);   // { userId: 3, userName: "nitish" }
// Returns the entire OBJECT, not just true/false

// ----------------------------------------------
// Named function as callback — same result
function findById(user) {
    return user.userId == 3
}
const userByid = users.find(findById)
console.log(userByid);  // { userId: 3, userName: "nitish" }


// ========== What if nothing matches? ==========
// const notFound = users.find((user) => user.userId === 99);
// console.log(notFound);  // undefined


// ========== find() vs filter() vs findIndex() ==========
//
// ┌──────────────┬───────────────────────────┬─────────────────────────┐
// │ Method        │ Returns                   │ When to Use             │
// ├──────────────┼───────────────────────────┼─────────────────────────┤
// │ find()       │ FIRST matching element    │ Need ONE item           │
// │              │ or undefined              │ (user by ID, etc.)      │
// ├──────────────┼───────────────────────────┼─────────────────────────┤
// │ filter()     │ ALL matching elements     │ Need ALL matches        │
// │              │ as new array (or [])      │ (all active users, etc.)│
// ├──────────────┼───────────────────────────┼─────────────────────────┤
// │ findIndex()  │ INDEX of first match      │ Need the position       │
// │              │ or -1                     │ (to splice/remove, etc.)│
// └──────────────┴───────────────────────────┴─────────────────────────┘
//
// Example with users.find/filter/findIndex where userId === 3:
//   find()      → { userId: 3, userName: "nitish" }   (the object)
//   filter()    → [{ userId: 3, userName: "nitish" }]  (array with 1 item)
//   findIndex() → 2                                     (index position)
//
// Key differences:
//   find()   returns undefined if not found
//   filter() returns [] (empty array) if not found
//   findIndex() returns -1 if not found
