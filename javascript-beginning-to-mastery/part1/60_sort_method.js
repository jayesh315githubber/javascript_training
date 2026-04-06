// sort method
// ⚠️ sort() MUTATES (changes) the original array!
// MUTATE = modify the original data directly (old version is LOST)
// To keep original safe: use .slice(0).sort() or [...arr].sort() or .toSorted() (ES2023)

// ========== ASCII TABLE (why default sort compares as strings) ==========
// sort() converts elements to STRINGS, then compares character by character using ASCII values
//
// ASCII order:
//   0-9  = (48 - 57)     ← numbers first
//   A-Z  = (65 - 90)     ← uppercase second
//   a-z  = (97 - 122)    ← lowercase last
//
// So: "ABC" < "Harshit" < "aabc" < "abcd" < "harshit"
//     (A=65)  (H=72)      (a=97)  (a=97)   (h=104)
//
// For numbers as strings, compares CHARACTER BY CHARACTER:
//   "1200" vs "410"  →  "1" vs "4"  →  49 vs 52  →  "1200" comes first!
//   This is WRONG for number sorting! That's why you MUST pass a compare function.

// char : ascii value
// '0' : 48
// '1' : 49
// '2' : 50
// '3' : 51
// '4' : 52
// '5' : 53
// '6' : 54
// '7' : 55
// '8' : 56
// '9' : 57


// ':' : 58
// ';' : 59
// '<' : 60
// '=' : 61
// '>' : 62
// '?' : 63
// '@' : 64

// [ A - Z => 65 - 90 ]
// 'A' : 65
// 'B' : 66
// 'C' : 67
// 'D' : 68
// 'E' : 69
// 'F' : 70
// 'G' : 71
// 'H' : 72
// 'I' : 73
// 'J' : 74
// 'K' : 75
// 'L' : 76
// 'M' : 77
// 'N' : 78
// 'O' : 79
// 'P' : 80
// 'Q' : 81
// 'R' : 82
// 'S' : 83
// 'T' : 84
// 'U' : 85
// 'V' : 86
// 'W' : 87
// 'X' : 88
// 'Y' : 89
// 'Z' : 90



// '[' : 91
// '\' : 92
// ']' : 93
// '^' : 94
// '_' : 95
// '`' : 96


// [a - z => 97 - 125]
// 'a' : 97
// 'b' : 98
// 'c' : 99
// 'd' : 100
// 'e' : 101
// 'f' : 102
// 'g' : 103
// 'h' : 104
// 'i' : 105
// 'j' : 106
// 'k' : 107
// 'l' : 108
// 'm' : 109
// 'n' : 110
// 'o' : 111
// 'p' : 112
// 'q' : 113
// 'r' : 114
// 's' : 115
// 't' : 116
// 'u' : 117
// 'v' : 118
// 'w' : 119
// 'x' : 120
// 'y' : 121
// 'z' : 122
// '{' : 123
// '|' : 124
// '}' : 125


// ========== 1. String Sort (default — works correctly for strings) ==========
// sort() with no compare function → alphabetical by ASCII
// Uppercase letters (A=65) come BEFORE lowercase (a=97)

const userNames = ['harshit', 'abcd', 'mohit', 'nitish', 'aabc', 'ABC', 'Harshit'];
userNames.sort();
console.log(userNames);
// ["ABC", "Harshit", "aabc", "abcd", "harshit", "mohit", "nitish"]
// A(65) < H(72) < a(97) < a(97),b(98) < h(104) < m(109) < n(110)


// ========== 2. Number Sort (MUST pass compare function!) ==========
// sort()  ->  will change the original array

// 5,9,1200, 400, 3000
// 5, 9, 400, 1200, 3000 (expected)

// Without compare function, sort treats as strings:
// ["5", "9", "1210", "410", "3000"]
// [53, 57, 49, 52, 51]             ← compares first char ASCII
// Result: [1210, 3000, 410, 5, 9]  ← WRONG! ❌

const numbers = [5, 9, 1200, 410, 3000];

// ========== How the Compare Function Works ==========
// sort((a, b) => ...)
//
// Return value determines order:
//   NEGATIVE (< 0) → a comes FIRST  → keep [a, b]
//   ZERO     (= 0) → no change
//   POSITIVE (> 0) → b comes FIRST  → swap to [b, a]
//
// Memory trick:
//   a - b = ascending  (small → big)   ↑
//   b - a = descending (big → small)   ↓

// desc order (high to low): b - a
numbers.sort((a, b) => {
    return b - a;
});
console.log(numbers);   // [3000, 1200, 410, 9, 5]

// asc order (low to high): a - b
numbers.sort((a, b) => a - b);
console.log(numbers);   // [5, 9, 410, 1200, 3000]

// How a - b works step by step:
// 1200, 410
// a-b ---> 1200-410 = 790
// a-b ---> positive (greater than 0) ---> b comes first → [410, 1200] ✅

// 5, 9
// a-b ---> 5-9 = -4
// a-b ---> negative ----> a comes first → [5, 9] ✅


// ========== 3. Sort Objects by Number Property (price) ==========
// price lowToHigh HighToLow

const products = [
    { productId: 1, produceName: "p1", price: 300 },
    { productId: 2, produceName: "p2", price: 3000 },
    { productId: 3, produceName: "p3", price: 200 },
    { productId: 4, produceName: "p4", price: 8000 },
    { productId: 5, produceName: "p5", price: 500 },
]

// lowToHigh   -> slice(0) - used to clone the array BEFORE sorting
// WHY clone? Because sort() MUTATES the original!
// Without clone: products would be permanently reordered
// With clone: products stays in original order, sorted copy is separate
const lowToHigh = products.slice(0).sort((a, b) => {
    return a.price - b.price
});
console.log(lowToHigh);
// [{price:200}, {price:300}, {price:500}, {price:3000}, {price:8000}]

const highToLow = products.slice(0).sort((a, b) => {
    return b.price - a.price;
});
console.log(highToLow);
// [{price:8000}, {price:3000}, {price:500}, {price:300}, {price:200}]


// ========== 4. Sort Objects by String Property (name) ==========
// For strings, you CAN'T use a - b (subtraction doesn't work on strings)
// Instead use > < comparison operators

const users = [
    { firstName: "harshit", age: 23 },
    { firstName: "mohit", age: 21 },
    { firstName: "nitish", age: 22 },
    { firstName: "garima", age: 20 },
]

// users.sort((a, b) => {
//     if (a.firstName > b.firstName) {
//         return 1;       // positive → swap (b first)
//     } else {
//         return -1;      // negative → keep (a first)
//     }
// });
// console.log(users);

// Shorter version (ternary):
users.sort((a, b) => { return (a.firstName > b.firstName) ? 1 : -1 })
console.log(users);
// [{firstName:"garima"}, {firstName:"harshit"}, {firstName:"mohit"}, {firstName:"nitish"}]

// Even cleaner: use localeCompare (handles special characters & locale)
// users.sort((a, b) => a.firstName.localeCompare(b.firstName));


// ========== What "MUTATES" means ==========
//
// MUTATE = change the ORIGINAL array directly (old order LOST forever)
//
// ❌ Problem:
//   const arr = [5, 3, 1];
//   arr.sort((a,b) => a-b);
//   console.log(arr);  // [1, 3, 5] ← original [5,3,1] is GONE!
//
// ✅ Solution: Clone first
//   const arr = [5, 3, 1];
//   const sorted = [...arr].sort((a,b) => a-b);    // spread clone
//   // or: const sorted = arr.slice(0).sort(...)    // slice clone
//   console.log(arr);     // [5, 3, 1] ← original safe!
//   console.log(sorted);  // [1, 3, 5] ← sorted copy
//
// ✅ ES2023 (newest): toSorted() — doesn't mutate!
//   const sorted = arr.toSorted((a,b) => a-b);     // returns new array
//   console.log(arr);     // [5, 3, 1] ← original safe!

// ========== Mutating vs Non-Mutating Methods ==========
//
// ┌─────────────────────────────────┬──────────────────────────────┐
// │ MUTATING (changes original) ⚠️   │ NON-MUTATING (returns new) ✅│
// ├─────────────────────────────────┼──────────────────────────────┤
// │ sort()                          │ map()                        │
// │ reverse()                       │ filter()                     │
// │ push() / pop()                  │ reduce()                     │
// │ shift() / unshift()             │ slice()                      │
// │ splice()                        │ concat()                     │
// │ fill()                          │ flat()                       │
// │                                 │ find() / findIndex()         │
// │                                 │ every() / some()             │
// ├─────────────────────────────────┼──────────────────────────────┤
// │ ES2023 non-mutating versions:   │                              │
// │ toSorted()   ← sort without mutating                          │
// │ toReversed() ← reverse without mutating                       │
// │ toSpliced()  ← splice without mutating                        │
// └─────────────────────────────────┴──────────────────────────────┘

// ========== Sort Cheat Sheet ==========
//
// Strings:      arr.sort()                          (default works!)
// Numbers ↑:    arr.sort((a,b) => a-b)              (ascending)
// Numbers ↓:    arr.sort((a,b) => b-a)              (descending)
// Objects num:  arr.sort((a,b) => a.price - b.price)
// Objects str:  arr.sort((a,b) => a.name.localeCompare(b.name))
//
// ⚠️ ALWAYS clone before sort if you need original:
//    [...arr].sort(...)  or  arr.slice(0).sort(...)  or  arr.toSorted(...)
