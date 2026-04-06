// how to clone array
// how to concatenate two arrays

// ========== WHY clone? ==========
// Because arrays are REFERENCES (stored on heap, variable holds pointer):
//   let arr2 = arr1;     → both point to SAME array in memory
//   arr2.push("new");    → arr1 is ALSO changed! (not a copy)
//   To avoid this, we need to CLONE (create a separate copy)
//
//   arr1 ──┐
//          ├──► ["item1", "item2"]  (SAME array in memory!)
//   arr2 ──┘
//
//   With clone:
//   arr1 ──► ["item1", "item2"]  (separate array)
//   arr2 ──► ["item1", "item2"]  (separate array)

let array1 = ["item1", "item2"];
let array2 = ["item1", "item2"];

// ========== Method 1: slice(0) ==========
// slice(startIndex) returns a NEW array from that index to end
// slice(0) = copy everything from index 0 onwards = full clone
let arr = array1.slice(0);    // copies from index 0 to end
console.log(arr);             // ["item1", "item2"] — separate copy!

// Can also clone + concatenate in one step:
// let array2 = array1.slice(0).concat(["item3", "item4"]);  // slice method will return the new array.

// ========== Method 2: [].concat() ==========
// Start with empty array [], then merge other arrays into it
// Also returns a NEW array
// let array2 = [].concat(array1, ["item3", "item4"]);
// console.log(array2)    // ["item1", "item2", "item3", "item4"]
//
// ========== Method 3: Spread operator ... (Modern/Best Way) ==========
// ... "spreads" each array's items into the new array
// Cleanest syntax, most commonly used today

// let oneMoreArray = ["item3", "item4"]
// let array2 = [...array1, ...oneMoreArray];
// // ["item1", "item2", "item3", "item4"]

// array1.push("item3");

// console.log(array1 === array2);   // false — different references (separate arrays)
// console.log(array1)
// console.log(array2)

// ========== Summary: 3 Ways to Clone ==========
//
// ┌─────────────────────────────┬────────────────────────────────┐
// │  Method                      │  Example                       │
// ├─────────────────────────────┼────────────────────────────────┤
// │  1. slice(0)                 │  array1.slice(0)               │
// │  2. [].concat()              │  [].concat(array1, array2)     │
// │  3. Spread operator (best!)  │  [...array1, ...array2]        │
// └─────────────────────────────┴────────────────────────────────┘
//
// All three create a SHALLOW copy:
//   - Primitive values (strings, numbers) are fully copied
//   - Nested objects/arrays are still SHARED (same reference)
//   - For deep clone: use structuredClone(array)

// -------------------------------------------
// ========== Performance Benchmark: concat speed test ==========

// This creates ONE array and assigns to a, b, c
// All three point to the SAME array (not copies!)
var a = b = c = [1, 2, 3, 4, 5];

// console.time() / console.timeEnd() = measures execution time
// Runs concat 1 MILLION times to see which is faster

// SLOWER (V8 and Edge, very slightly faster in Firefox)
// Calls concat on the Array prototype directly — more lookup overhead
console.time('t1');
for (i = 0; i < 1000000; i++) {
    Array.prototype.concat(a, b, c);               // 1st way
};
console.timeEnd('t1')
// Example output: t1: 245.123ms

// FASTER (V8 and Edge, very slightly slower in Firefox)
// Creates empty array [], calls concat on it — V8 optimizes this better

// console.time('t2');
// for (i = 0; i < 1000000; i++) {
//     [].concat(a, b, c);                         // 2nd way
// };
// console.timeEnd('t2')
// Example output: t2: 198.456ms

// ========== Why [].concat() is faster ==========
// Array.prototype.concat(a,b,c) → extra prototype chain lookup
// [].concat(a,b,c) → direct call on instance, V8 optimizes better
//
// In practice: difference is tiny
// Modern JS: just use [...a, ...b, ...c] (spread operator)