// fill method - will change the original array ⚠️ MUTATES!
// Syntax: array.fill(value, start, end)
//
// value → what to fill with
// start → from which index (inclusive, default 0)
// end   → up to which index (exclusive, default array.length)

// ========== Example 1: Create array of zeros ==========

// const myArray = new Array(10).fill(0);
// console.log(myArray);   // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
//
// Step 1: new Array(10)  → creates empty array with 10 slots
//         [ , , , , , , , , , ]  (10 empty slots)
// Step 2: .fill(0)       → fills ALL slots with 0
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]


// ========== Example 2: Fill specific range ==========

const myArray = [1, 2, 3, 4, 5, 6, 7, 8];
myArray.fill(0, 2, 5);
console.log(myArray);   // [1, 2, 0, 0, 0, 6, 7, 8]

// fill(0, 2, 5) → fill with 0, from index 2 to index 5 (NOT including 5)
//
// Index:    0  1  2  3  4  5  6  7
// Before:  [1, 2, 3, 4, 5, 6, 7, 8]
//                ↓  ↓  ↓
// Fill:         [0, 0, 0]  (index 2, 3, 4 replaced with 0)
//
// After:   [1, 2, 0, 0, 0, 6, 7, 8]
//
// Index 2 ✅ filled (start is inclusive)
// Index 3 ✅ filled
// Index 4 ✅ filled
// Index 5 ❌ NOT filled (end is exclusive — same pattern as slice!)


// ========== More fill() variations ==========
//
// fill(value)         → fills entire array
//   [1,2,3].fill(0)           → [0, 0, 0]
//
// fill(value, start)  → fills from start to end
//   [1,2,3,4,5].fill(0, 3)   → [1, 2, 3, 0, 0]
//
// fill(value, start, end) → fills from start to end (exclusive)
//   [1,2,3,4,5].fill(0, 1, 3) → [1, 0, 0, 4, 5]


// ========== Common use cases ==========
//
// 1. Initialize array with default values:
//    new Array(5).fill(0)         → [0, 0, 0, 0, 0]
//    new Array(3).fill("empty")   → ["empty", "empty", "empty"]
//    new Array(4).fill(false)     → [false, false, false, false]
//
// 2. Reset part of an array:
//    scores.fill(0, 3)            → reset scores from index 3 onwards
//
// ⚠️ GOTCHA with objects/arrays:
//    new Array(3).fill({})        → [{}, {}, {}]
//    BUT all 3 are the SAME object reference!
//    arr[0].name = "Jay"          → ALL three get name: "Jay"!
//    Fix: Array.from({length: 3}, () => ({}))  → 3 separate objects
