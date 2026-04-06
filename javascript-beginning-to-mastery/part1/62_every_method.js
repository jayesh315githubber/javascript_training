// every method
// array.every(callback) — checks if ALL elements pass the test.
// Returns true only if EVERY element returns true.
// If even ONE fails → returns false immediately (short-circuits, stops checking).
//
// Think of every() as AND (&&): true && true && true = true
//                                true && true && false = false

// callback function returns---> true/false (boolean)
//  every takes --> true/false (boolean)

// ========== Example 1: Are all numbers even? ==========

const numbers = [2, 4, 6, 9, 10];

const ans1 = numbers.every((number) => number % 2 === 0);

console.log(ans1);   // false

// How every() checks — stops at first failure:
//   2  → 2 % 2 === 0 → true ✅ (continue)
//   4  → 4 % 2 === 0 → true ✅ (continue)
//   6  → 6 % 2 === 0 → true ✅ (continue)
//   9  → 9 % 2 === 0 → false ❌ (STOP! return false immediately)
//   10 → never checked!
//
// One failure (9) → entire result is false.


// ========== Example 2: Are all prices under 30000? ==========

const userCart = [
    { productId: 1, productName: "mobile", price: 12000 },
    { productId: 2, productName: "laptop", price: 22000 },
    { productId: 3, productName: "tv", price: 35000 },
]

const ans2 = userCart.every((cartItem) => cartItem.price < 30000);
console.log(ans2);   // false

// mobile → 12000 < 30000 → true ✅
// laptop → 22000 < 30000 → true ✅
// tv     → 35000 < 30000 → false ❌ (STOP! return false)
//
// tv is 35000 which is NOT < 30000, so every() returns false.


// ========== every() vs some() ==========
//
// ┌──────────────┬─────────────────────────────┬──────────────────────────┐
// │ Method        │ Returns true when           │ Think of it as           │
// ├──────────────┼─────────────────────────────┼──────────────────────────┤
// │ every()      │ ALL elements pass           │ AND (&&)                 │
// │              │ (all must be true)          │ true && true && true     │
// ├──────────────┼─────────────────────────────┼──────────────────────────┤
// │ some()       │ AT LEAST ONE passes         │ OR (||)                  │
// │              │ (just one true is enough)   │ false || false || true   │
// └──────────────┴─────────────────────────────┴──────────────────────────┘
//
// every() → "Are ALL students present?"    → one absent = false
// some()  → "Is ANY student present?"      → one present = true
//
// Short-circuit behavior:
//   every() stops at first FALSE (no point checking rest — already failed)
//   some()  stops at first TRUE  (no point checking rest — already passed)
//
// Empty array edge case:
//   [].every(() => false)  → true  (vacuously true — nothing to fail!)
//   [].some(() => true)    → false (nothing to pass)
