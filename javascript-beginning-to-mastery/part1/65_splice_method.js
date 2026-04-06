// splice method - to delete or insert something from the array
// ⚠️ MUTATES the original array!
// Returns an array of DELETED elements (or [] if nothing deleted).
//
// Syntax: array.splice(start, deleteCount, ...itemsToInsert)
//
//   start       → index to begin
//   deleteCount → how many to remove (0 = don't remove, just insert)
//   ...items    → elements to insert at that position (optional)
//
// splice can do 3 things:
//   1. DELETE  → splice(start, count)
//   2. INSERT  → splice(start, 0, newItems)
//   3. REPLACE → splice(start, count, newItems)  (delete + insert)

const myArray = ['item1', 'item2', 'item3', 'item4'];

// ========== 1. DELETE ==========
// splice(1, 2) → start at index 1, delete 2 elements
const deletedItem = myArray.splice(1, 2);
console.log("delted item", deletedItem);   // ["item2", "item3"]
console.log(myArray);                       // ["item1", "item4"]

// Index:    0       1       2       3
// Before:  [item1, item2, item3, item4]
//                  ↑─────────↑
//                  delete these 2
//
// After:   [item1, item4]
// Returns: [item2, item3]  ← the deleted elements


// ========== 2. INSERT (delete 0, add new) ==========
// splice(1, 0, 'inserted item') → at index 1, delete 0, insert new item

// myArray.splice(1, 0, 'inserted item');
// console.log(myArray);

// Index:    0       1       2       3
// Before:  [item1, item2, item3, item4]
//                  ↑ insert here (delete 0 = don't remove anything)
// After:   [item1, 'inserted item', item2, item3, item4]
//
// deleteCount = 0 means "don't remove anything, just insert"


// ========== 3. INSERT + DELETE (Replace) ==========
// splice(1, 2, "new1", "new2") → at index 1, delete 2, insert 2 new

// const deletedItem = myArray.splice(1, 2, "inserted item1", "inserted item2")
// console.log("delted item", deletedItem);   // ["item2", "item3"]
// console.log(myArray);                       // ["item1", "inserted item1", "inserted item2", "item4"]

// Index:    0       1       2       3
// Before:  [item1, item2, item3, item4]
//                  ↑─────────↑
//                  remove 2, insert 2 new
//
// After:   [item1, "inserted item1", "inserted item2", item4]
// Returns: [item2, item3]  ← removed elements


// ========== splice() vs slice() ==========
//
// ┌───────────────────────────────┬──────────────────────────────────┐
// │  splice()                      │  slice()                          │
// ├───────────────────────────────┼──────────────────────────────────┤
// │  MUTATES original ⚠️           │  Does NOT mutate ✅               │
// │  Can delete, insert, replace  │  Can only copy a portion          │
// │  Returns deleted elements     │  Returns copied portion           │
// │  splice(start, deleteCount)   │  slice(start, end)                │
// │  "cut & edit the original"    │  "photocopy a section"            │
// └───────────────────────────────┴──────────────────────────────────┘
//
// Remember:
//   splice → has "p" → "p"ermanently changes (mutates)
//   slice  → no "p"  → safe copy (no mutation)


// ========== Common use cases ==========
//
// Remove element by index:
//   arr.splice(index, 1)
//
// Remove and get last element (like pop):
//   arr.splice(-1, 1)
//
// Insert at beginning (like unshift):
//   arr.splice(0, 0, "new item")
//
// Replace element at index:
//   arr.splice(index, 1, "replacement")
//
// Clear array from index onwards:
//   arr.splice(2)  → removes everything from index 2 to end
