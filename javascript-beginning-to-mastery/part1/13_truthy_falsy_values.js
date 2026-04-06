// truthy and falsy values

// falsy values (only 8 in all of JavaScript)

// false
// ""         (empty string)
// null
// undefined
// 0
// -0
// NaN
// 0n         (BigInt zero)

// Everything else is TRUTHY! Including:
// "0"        ← string with zero (NOT empty!)
// "false"    ← string with text (NOT boolean!)
// " "        ← string with space
// []         ← empty array (it's an object!)
// {}         ← empty object
// function(){} ← any function

// ========== How truthy/falsy works in if() ==========

// if ("") {
//     console.log("won't run");    // "" is falsy
// }

// if ("hello") {
//     console.log("will run!");    // "hello" is truthy
// }

// if (0) {
//     console.log("won't run");    // 0 is falsy
// }

// if ([]) {
//     console.log("will run!");    // [] is truthy (surprise!)
// }

// ========== Quick boolean conversion ==========

// Boolean("")        // false
// Boolean("hello")   // true
// Boolean(0)         // false
// Boolean(42)        // true
// Boolean(null)      // false
// Boolean([])        // true  ← empty array is truthy!

// Double NOT shortcut (!! converts any value to boolean):
// !!"hello"   // true
// !!0         // false
// !!null      // false
// !![]        // true

// ========== INTERVIEW TRAP: == vs if() give DIFFERENT results! ==========

// [] == false     // true
//   → [] converts to "" → 0, false → 0, so 0 == 0 = true
//
// "0" == false    // true
//   → "0" converts to 0, false → 0, so 0 == 0 = true
//
// BUT:
// if ([])  { }     // runs! ([] is truthy)
// if ("0") { }     // runs! ("0" is truthy)
//
// == does type coercion (complex rules)
// if() just checks truthiness (simple Boolean conversion)
// That's why ALWAYS use === instead of ==
//
// === does NO coercion:
// [] === false  → false  (object !== boolean)
// "0" === false → false  (string !== boolean)

// ========== How == coercion works step by step ==========
//
// [] == false
// Step 1: false → 0            (boolean to number)
// Step 2: [] → "" → 0          (object → string → number)
// Step 3: 0 == 0 → true
//
// "0" == false
// Step 1: false → 0            (boolean to number)
// Step 2: "0" → 0              (string to number)
// Step 3: 0 == 0 → true
//
// == Coercion Rules (priority order):
// 1. null == undefined → true (special rule)
// 2. Boolean involved? → convert Boolean to Number
// 3. String vs Number? → convert String to Number
// 4. Object vs Primitive? → ToPrimitive: valueOf() then toString()
// 5. Same type? → compare values directly