// Sets (it is iterable)
// Set = a collection of UNIQUE values (no duplicates allowed!)
//
// Key properties:
// - Iterable (can use for...of)
// - No index access (can't do set[0])
// - Order is insertion order
// - Can store ANY data type (numbers, strings, objects, arrays)
// - Uses .size (not .length like arrays)

// store data
// sets also have its own methods
// No index-based access
// Order is not guaranteed
// unique items only (no duplicates allowed)
// can save any data type of element            // imp pt

// methods  ->
// 1. add     → adds element (ignored if duplicate)
// 2. has     → returns true/false
// 3. delete  → removes element
// 4. clear   → removes all elements
// 5. size    → number of elements (like length for arrays)

const items = ['item1', 'item2', 'item3'];

// ========== Creating Set from String ==========
// String is iterable → each CHARACTER becomes a separate element
const string = new Set("jayesh");  // we can pass a string as arg bcz it is iterable
console.log(string);     // Set(6) { 'j', 'a', 'y', 'e', 's', 'h' }
// If string had duplicates: new Set("hello") → Set(4) { 'h', 'e', 'l', 'o' }


// ========== Adding Elements ==========
const numbers = new Set();

numbers.add(1);
numbers.add(2);
numbers.add(3);
numbers.add(4);
numbers.add(['item1', 'item2']);   // both array are different
numbers.add(['item1', 'item2']);
numbers.add(6);
numbers.add(items);
numbers.add(items);  //ignore the second items bcz it point to the same array

// WHY are two ['item1','item2'] both added but items added only once?
//
// ['item1','item2'] ← each time creates a NEW array (different reference)
//   0xA1 !== 0xB2 → different objects → both added ✅
//
// items ← same variable, same reference both times
//   0xC3 === 0xC3 → same object → second one ignored ❌
//
// RULE: Set checks equality by REFERENCE for objects/arrays,
//       by VALUE for primitives (numbers, strings, booleans)


// ========== has() - return boolean value ==========

if (numbers.has(1)) {
    console.log("1 is present")       // ✅ prints this
} else {
    console.log("1 is not present")
}

// ========== Iterating a Set (for...of works because Set is iterable) ==========

for (let number of numbers) {
    console.log(number);
}
// 1, 2, 3, 4, ['item1','item2'], ['item1','item2'], 6, ['item1','item2','item3']


// ========== Most Common Use: Remove Duplicates from Array ==========

const myArray = [1, 2, 4, 4, 5, 6, 5, 6];
const uniqueElements = new Set(myArray);   // pass as arg bcz array is iterable
let length = 0;

for (let element of uniqueElements) {
    length++;
}

console.log(uniqueElements);   // Set(5) { 1, 2, 4, 5, 6 }

console.log(length);           // 5 (number of unique elements)

// Note: Set has .size property — no need to manually count!
// console.log(uniqueElements.size);   // 5 (same result, easier!)

// ========== Convert Set back to Array ==========
// const unique = [...uniqueElements];             // [1, 2, 4, 5, 6]
// or one-liner shortcut:
// const unique = [...new Set(myArray)];           // [1, 2, 4, 5, 6]
// or: const unique = Array.from(new Set(myArray));


// ========== Set vs Array ==========
//
// ┌──────────────────┬──────────────────┬──────────────────┐
// │ Feature           │ Array            │ Set              │
// ├──────────────────┼──────────────────┼──────────────────┤
// │ Duplicates       │ ✅ allowed       │ ❌ no duplicates │
// │ Index access     │ ✅ arr[0]        │ ❌ not available │
// │ Order            │ ✅ guaranteed    │ ✅ insertion order│
// │ Size             │ .length          │ .size            │
// │ Check existence  │ includes() O(n)  │ has() O(1) faster│
// │ Add element      │ push()           │ add()            │
// │ Remove element   │ splice()         │ delete()         │
// │ Iterable         │ ✅ yes           │ ✅ yes           │
// └──────────────────┴──────────────────┴──────────────────┘
//
// When to use Set:
//   - Need unique values only
//   - Frequently checking if item exists (.has() is faster than .includes())
//   - Removing duplicates from array
//
// When to use Array:
//   - Need index access
//   - Need array methods (map, filter, reduce)
//   - Order and duplicates both matter
