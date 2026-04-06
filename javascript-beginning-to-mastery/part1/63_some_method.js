// some method
// array.some(callback) — checks if AT LEAST ONE element passes the test.
// Returns true if even ONE element returns true.
// Stops immediately at first true (short-circuits — no need to check rest).
//
// Think of some() as OR (||): false || false || true = true
// "Is there ANY item that matches?"

const numbers = [3, 5, 11, 9];

// kya ek bhi number esa hai jo even hai
// true

const ans = numbers.some((number) => number % 2 === 0);
console.log(ans);   // false

// How some() checks — stops at first true:
//   3  → 3 % 2 === 0 → false ❌ (continue)
//   5  → 5 % 2 === 0 → false ❌ (continue)
//   11 → 11 % 2 === 0 → false ❌ (continue)
//   9  → 9 % 2 === 0 → false ❌ (continue)
//
// ALL failed → no even number found → false
//
// If array was [3, 5, 4, 9]:
//   3 → false ❌
//   5 → false ❌
//   4 → 4 % 2 === 0 → true ✅ (STOP! return true immediately)
//   9 → never checked!


// ========== Example 2: Is any product price > 100000? ==========

// const userCart = [
//     {productId: 1, productName: "mobile", price: 12000},
//     {productId: 2, productName: "laptop", price: 22000},
//     {productId: 3, productName: "tv", price: 35000},
//     {productId: 3, productName: "macbook", price: 25000},
// ]

// const ans = userCart.some((cartItem)=>cartItem.price > 100000);
// console.log(ans);   // false
//
// mobile  → 12000 > 100000 → false ❌
// laptop  → 22000 > 100000 → false ❌
// tv      → 35000 > 100000 → false ❌
// macbook → 25000 > 100000 → false ❌
//
// No price exceeds 100000 → false


// ========== some() vs every() ==========
//
// ┌──────────────┬─────────────────────────────┬──────────────────────────┐
// │ Method        │ Returns true when           │ Think of it as           │
// ├──────────────┼─────────────────────────────┼──────────────────────────┤
// │ some()       │ AT LEAST ONE passes         │ OR (||)                  │
// │              │ (just one true is enough)   │ false || false || true   │
// ├──────────────┼─────────────────────────────┼──────────────────────────┤
// │ every()      │ ALL elements pass           │ AND (&&)                 │
// │              │ (all must be true)          │ true && true && true     │
// └──────────────┴─────────────────────────────┴──────────────────────────┘
//
// some()  → "Is ANY student present?"     → one present = true
// every() → "Are ALL students present?"   → one absent = false
//
// Short-circuit behavior:
//   some()  stops at first TRUE  (already passed!)
//   every() stops at first FALSE (already failed!)
//
// Empty array edge case:
//   [].some(() => true)    → false (nothing to pass)
//   [].every(() => false)  → true  (vacuously true — nothing to fail)
//
// Real-world use cases:
//   some()  → "Does user have admin role?", "Is any item out of stock?"
//   every() → "Are all fields filled?", "Are all items under budget?"
