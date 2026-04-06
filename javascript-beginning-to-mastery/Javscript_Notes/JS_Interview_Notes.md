# JavaScript Interview Preparation - Basic to Advanced
## Complete Guide for Experienced JavaScript Developers

---

# TABLE OF CONTENTS

1. [JavaScript Engine & Execution](#1-javascript-engine--execution)
2. [Variables & Data Types](#2-variables--data-types)
3. [Type Coercion & Comparison](#3-type-coercion--comparison)
4. [Hoisting](#4-hoisting)
5. [Scope & Scope Chain](#5-scope--scope-chain)
6. [Functions](#6-functions)
7. [Closures](#7-closures)
8. [The `this` Keyword](#8-the-this-keyword)
9. [Objects & Prototypes](#9-objects--prototypes)
10. [Classes & OOP](#10-classes--oop)
11. [Arrays & Array Methods](#11-arrays--array-methods)
12. [Destructuring, Spread & Rest](#12-destructuring-spread--rest)
13. [Asynchronous JavaScript](#13-asynchronous-javascript)
14. [Event Loop](#14-event-loop)
15. [Promises](#15-promises)
16. [Async/Await](#16-asyncawait)
17. [Error Handling](#17-error-handling)
18. [ES6+ Features](#18-es6-features)
19. [Functional Programming](#19-functional-programming)
20. [Design Patterns](#20-design-patterns)
21. [Memory Management & Garbage Collection](#21-memory-management--garbage-collection)
22. [Performance Optimization](#22-performance-optimization)
23. [DOM & Browser APIs](#23-dom--browser-apis)
24. [Tricky Interview Output Questions](#24-tricky-interview-output-questions)

---

# 1. JavaScript Engine & Execution

## How JavaScript Works

JavaScript is a **single-threaded**, **interpreted/JIT-compiled**, **dynamically-typed** language.

### JavaScript Engine Architecture

```
┌─────────────────────────────────────────────────┐
│                 JAVASCRIPT ENGINE                │
│              (e.g., V8 in Chrome)                │
│                                                  │
│  ┌──────────────┐       ┌────────────────────┐   │
│  │   PARSER     │       │   INTERPRETER      │   │
│  │              │──────>│   (Ignition in V8)  │   │
│  │ Source Code  │       │                    │   │
│  │     to       │       │ Generates Bytecode │   │
│  │    AST       │       └────────┬───────────┘   │
│  └──────────────┘                │               │
│                                  v               │
│                        ┌─────────────────┐       │
│                        │   JIT COMPILER  │       │
│                        │ (TurboFan in V8)│       │
│                        │                 │       │
│                        │ Optimized       │       │
│                        │ Machine Code    │       │
│                        └─────────────────┘       │
│                                                  │
│  ┌──────────────┐       ┌────────────────────┐   │
│  │  CALL STACK  │       │   MEMORY HEAP      │   │
│  │              │       │                    │   │
│  │ Execution    │       │ Objects, Arrays,   │   │
│  │ Contexts     │       │ Functions stored   │   │
│  └──────────────┘       └────────────────────┘   │
└─────────────────────────────────────────────────┘
```

### Execution Context

Every time JS code runs, it runs inside an **Execution Context**.

```
┌─────────────────────────────────────────────┐
│          EXECUTION CONTEXT                   │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │    CREATION PHASE                      │  │
│  │                                        │  │
│  │  1. Create Variable Object (VO)        │  │
│  │     - function declarations stored     │  │
│  │     - var variables set to undefined   │  │
│  │     - let/const in TDZ (uninitialized) │  │
│  │                                        │  │
│  │  2. Create Scope Chain                 │  │
│  │     - Current VO + all parent VOs      │  │
│  │                                        │  │
│  │  3. Determine value of 'this'          │  │
│  └────────────────────────────────────────┘  │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │    EXECUTION PHASE                     │  │
│  │                                        │  │
│  │  - Code is executed line by line       │  │
│  │  - Variables are assigned values       │  │
│  │  - Functions are called               │  │
│  └────────────────────────────────────────┘  │
└─────────────────────────────────────────────┘
```

### Call Stack Example

```javascript
function first() {
  console.log("First");
  second();
  console.log("First again");
}

function second() {
  console.log("Second");
  third();
}

function third() {
  console.log("Third");
}

first();
```

```
CALL STACK (grows upward):

Step 1:  │ Global()    │
Step 2:  │ first()     │  ← pushed
         │ Global()    │
Step 3:  │ second()    │  ← pushed
         │ first()     │
         │ Global()    │
Step 4:  │ third()     │  ← pushed
         │ second()    │
         │ first()     │
         │ Global()    │
Step 5:  │ second()    │  ← third() popped
         │ first()     │
         │ Global()    │
Step 6:  │ first()     │  ← second() popped
         │ Global()    │
Step 7:  │ Global()    │  ← first() popped

Output: "First" → "Second" → "Third" → "First again"
```

### How to Explain in Interview

> "JavaScript code runs in two phases inside the engine. First, the **creation phase** scans all declarations and allocates memory — `var` gets `undefined`, `let`/`const` stay uninitialized (TDZ), and function declarations are stored completely. Then the **execution phase** runs code line-by-line. Each function call creates a new execution context pushed onto the call stack (LIFO). Modern engines like V8 use JIT compilation — interpreting code first (Ignition), then compiling hot paths to optimized machine code (TurboFan)."

### Deep Dive: V8 Engine Pipeline

```
Source Code → Tokenizer → Parser → AST
                                    │
                           ┌────────┴────────┐
                           ▼                  ▼
                     Ignition             TurboFan
                   (Interpreter)        (JIT Compiler)
                   Generates bytecode   Optimizes hot code
                   Fast startup         Fast execution
                           │                  │
                           └────────┬─────────┘
                                    ▼
                              EXECUTION
                         (Call Stack + Heap)

De-optimization: If TurboFan's assumptions break
(e.g., variable type changes), it falls back to Ignition.
This is why consistent types = faster code!
```

### Interview Q&A — Section 1

**Q: Is JavaScript interpreted or compiled?**
A: Neither purely. Modern JS engines use **JIT (Just-In-Time) compilation** — code is interpreted first for fast startup, then frequently-executed code is compiled to optimized machine code at runtime.

**Q: What's the difference between the creation phase and execution phase?**
A: Creation phase: memory allocation (hoisting), scope chain setup, `this` binding. Execution phase: code runs line-by-line, variables get real values, functions are called.

**Q: What happens when the call stack overflows?**
A: `RangeError: Maximum call stack size exceeded` — usually caused by infinite recursion. V8's limit is ~10,000-15,000 frames.

**Q: Can you have multiple execution contexts at once?**
A: Multiple can exist on the stack, but only the top one executes. JS is single-threaded — one thing at a time.

---

# 2. Variables & Data Types

## var vs let vs const

```
┌──────────────┬──────────┬──────────┬──────────┐
│   Feature    │   var    │   let    │  const   │
├──────────────┼──────────┼──────────┼──────────┤
│ Scope        │ Function │  Block   │  Block   │
│ Hoisting     │ Yes      │ Yes(TDZ) │ Yes(TDZ) │
│ Re-declare   │ Yes      │  No      │   No     │
│ Re-assign    │ Yes      │  Yes     │   No     │
│ Init needed  │ No       │  No      │  Yes     │
└──────────────┴──────────┴──────────┴──────────┘
```

### Detailed Examples

```javascript
// ========== var ==========
// Function-scoped, hoisted with value 'undefined'
console.log(a); // undefined (hoisted but not initialized)
var a = 10;

// var is function-scoped, NOT block-scoped
if (true) {
  var x = 5;
}
console.log(x); // 5 ← LEAKS out of block!

// Can be re-declared
var name = "Alice";
var name = "Bob"; // No error
console.log(name); // "Bob"


// ========== let ==========
// Block-scoped, hoisted but in Temporal Dead Zone (TDZ)
// console.log(b); // ReferenceError: Cannot access 'b' before initialization
let b = 20;

if (true) {
  let y = 10;
}
// console.log(y); // ReferenceError: y is not defined

// Cannot be re-declared in same scope
let city = "NYC";
// let city = "LA"; // SyntaxError: 'city' has already been declared


// ========== const ==========
// Block-scoped, must be initialized, cannot be reassigned
const PI = 3.14;
// PI = 3.15; // TypeError: Assignment to constant variable

// BUT: objects/arrays can be MUTATED
const person = { name: "Alice" };
person.name = "Bob";     // ✅ This works! (mutation, not reassignment)
// person = { name: "Charlie" }; // ❌ TypeError (reassignment)

const arr = [1, 2, 3];
arr.push(4);  // ✅ Works
// arr = [5];  // ❌ TypeError
```

### Temporal Dead Zone (TDZ) Explained

```
┌──────────────────────────────────────────────┐
│  {                                           │
│    // ─── TDZ for 'x' starts ───            │
│    console.log(x); // ReferenceError!        │
│    console.log(y); // undefined (var hoisted) │
│    // ─── TDZ for 'x' ends ───              │
│    let x = 10;   // x is now initialized     │
│    var y = 20;                               │
│  }                                           │
└──────────────────────────────────────────────┘
```

## Data Types

```
JavaScript Data Types
├── PRIMITIVE (7 types) - Immutable, stored on Stack
│   ├── string      → "hello", 'world', `template`
│   ├── number      → 42, 3.14, NaN, Infinity, -Infinity
│   ├── bigint      → 9007199254740991n
│   ├── boolean     → true, false
│   ├── undefined   → declared but not assigned
│   ├── null        → intentional absence of value
│   └── symbol      → Symbol("unique")
│
└── NON-PRIMITIVE (Reference Types) - Mutable, stored on Heap
    ├── Object      → { key: "value" }
    ├── Array       → [1, 2, 3]
    ├── Function    → function() {}
    ├── Date        → new Date()
    ├── RegExp      → /pattern/g
    ├── Map         → new Map()
    ├── Set         → new Set()
    ├── WeakMap     → new WeakMap()
    └── WeakSet     → new WeakSet()
```

### Stack vs Heap Memory

```
  STACK (Primitives)              HEAP (Reference Types)
┌──────────────────┐         ┌─────────────────────────┐
│ b = 10 (copy)    │         │                         │
│ a = 10           │         │  ┌───────────────────┐  │
│                  │         │  │ { name: "Alice" }  │  │
│ y ──────────────────────>  │  │  (Object at 0x01)  │  │
│ x ──────────────────────>  │  └───────────────────┘  │
└──────────────────┘         └─────────────────────────┘

let a = 10;
let b = a;     // b gets a COPY of 10
b = 20;
console.log(a); // 10 (unchanged!)

let x = { name: "Alice" };
let y = x;     // y gets a COPY of the REFERENCE (address)
y.name = "Bob";
console.log(x.name); // "Bob" (CHANGED! Both point to same object)
```

### typeof Operator - Quirks to Know

```javascript
typeof "hello"      // "string"
typeof 42           // "number"
typeof true         // "boolean"
typeof undefined    // "undefined"
typeof Symbol()     // "symbol"
typeof 10n          // "bigint"
typeof {}           // "object"
typeof []           // "object"    ← Array is object!
typeof null         // "object"    ← FAMOUS BUG in JS!
typeof function(){} // "function"  ← Special case
typeof NaN          // "number"    ← NaN is a number!

// How to properly check types:
Array.isArray([1,2,3])        // true
Object.prototype.toString.call(null)  // "[object Null]"
Object.prototype.toString.call([])    // "[object Array]"
```

### How to Explain in Interview

> "JavaScript has 7 primitive types (string, number, bigint, boolean, undefined, null, symbol) stored directly on the stack, and reference types (objects, arrays, functions) stored on the heap with a pointer on the stack. `var` is function-scoped and hoisted as `undefined`. `let`/`const` are block-scoped and stay in the TDZ until their declaration line. `const` prevents reassignment but doesn't make objects immutable — `Object.freeze()` does that (shallow only)."

### Deep Dive: How Primitives vs References Are Stored

```
PRIMITIVES (stored on STACK — copied by VALUE):
let a = 10;
let b = a;      // b gets a COPY of 10
b = 20;         // changing b does NOT affect a
console.log(a); // 10 (unchanged!)

Stack:
┌──────┬──────┐
│  a   │  10  │
├──────┼──────┤
│  b   │  20  │  ← its own copy
└──────┴──────┘

REFERENCES (pointer on STACK, object on HEAP — copied by REFERENCE):
let obj1 = { name: "Jay" };
let obj2 = obj1;       // obj2 gets a COPY of the POINTER (not the object!)
obj2.name = "Updated";
console.log(obj1.name); // "Updated" (BOTH point to same object!)

Stack:              Heap:
┌──────┬─────┐     ┌────────────────────┐
│ obj1 │ 0xA ├────►│ { name: "Updated" }│
├──────┼─────┤     └────────────────────┘
│ obj2 │ 0xA ├────►  (same object!)
└──────┴─────┘
```

### Interview Q&A — Section 2

**Q: What's the difference between `null` and `undefined`?**
A: `undefined` = variable declared but not assigned (JS sets it). `null` = intentionally set to "no value" (developer sets it). `typeof undefined` is `"undefined"`, but `typeof null` is `"object"` (a known JS bug since v1).

**Q: Why does `typeof null` return "object"?**
A: A bug from JavaScript's first implementation in 1995. Internally, values had a type tag — objects were tag 0, and `null` was the NULL pointer (0x00), so it was misidentified as an object. Can't be fixed without breaking the web.

**Q: What's the difference between `==` and `===` with `null`?**
A: `null == undefined` is `true` (special rule). `null === undefined` is `false` (different types). `null == 0` is `false` (null only equals undefined in `==`).

**Q: How do you deep copy an object?**
A: `structuredClone(obj)` (modern), `JSON.parse(JSON.stringify(obj))` (loses functions/dates/undefined), or recursive function. `Object.assign`/spread `{...obj}` are shallow only.

---

# 3. Type Coercion & Comparison

## Implicit vs Explicit Coercion

```javascript
// ========== EXPLICIT COERCION (you do it intentionally) ==========
String(123)      // "123"
Number("42")     // 42
Boolean(0)       // false
parseInt("10px") // 10
parseFloat("3.14abc") // 3.14

// ========== IMPLICIT COERCION (JS does it automatically) ==========
"5" + 3          // "53"  (number → string, concatenation)
"5" - 3          // 2     (string → number, subtraction)
"5" * 2          // 10    (string → number)
"5" / 2          // 2.5   (string → number)
true + 1         // 2     (true → 1)
false + 1        // 1     (false → 0)
null + 5         // 5     (null → 0)
undefined + 5    // NaN   (undefined → NaN)
"" + 0           // "0"   (number → string)
```

### The + Operator Rules

```
┌──────────────────────────────────────────────────────┐
│              THE + OPERATOR RULES                     │
│                                                       │
│  1. If EITHER operand is a string → concatenation     │
│     "5" + 3       →  "53"                             │
│     "hello" + true → "hellotrue"                      │
│                                                       │
│  2. If BOTH are numbers → addition                    │
│     5 + 3         →  8                                │
│                                                       │
│  3. Objects call valueOf() then toString()             │
│     [] + []       →  "" (empty string)                │
│     [] + {}       →  "[object Object]"                │
│     {} + []       →  0 (block + unary plus)           │
│                                                       │
│  MINUS (-) ALWAYS converts to number                  │
│     "5" - 3       →  2                                │
│     "5" - "3"     →  2                                │
└──────────────────────────────────────────────────────┘
```

## == vs === (Abstract vs Strict Equality)

```javascript
// === (Strict Equality) - NO type coercion
5 === 5       // true
5 === "5"     // false (different types)
null === undefined  // false

// == (Abstract Equality) - DOES type coercion
5 == "5"      // true  ("5" converted to 5)
0 == false    // true  (false converted to 0)
"" == false   // true  (both converted to 0)
null == undefined  // true  (special rule!)
null == 0     // false (null only equals undefined)
NaN == NaN    // false (NaN is not equal to anything!)

// ALWAYS use === in production code!
```

### Falsy & Truthy Values

```
FALSY VALUES (exactly 8):          TRUTHY VALUES (everything else):
┌───────────────────────┐          ┌──────────────────────────────┐
│ false                 │          │ true                         │
│ 0                     │          │ Any non-zero number (1, -1)  │
│ -0                    │          │ Any non-empty string ("0")   │
│ 0n (BigInt zero)      │          │ [] (empty array)             │
│ "" (empty string)     │          │ {} (empty object)            │
│ null                  │          │ function() {}                │
│ undefined             │          │ Infinity                     │
│ NaN                   │          │ new Date()                   │
└───────────────────────┘          └──────────────────────────────┘

// SURPRISE: These are truthy!
Boolean([])       // true  ← empty array is truthy!
Boolean({})       // true  ← empty object is truthy!
Boolean("0")      // true  ← string "0" is truthy!
Boolean("false")  // true  ← string "false" is truthy!

// BUT in == comparison:
[] == false       // true  ([] → "" → 0, false → 0)
"0" == false      // true  ("0" → 0, false → 0)
```

### How to Explain in Interview

> "Type coercion is JavaScript automatically converting one type to another. **Implicit** happens with operators (`+`, `==`, `if`). **Explicit** is when you manually convert (`Number()`, `String()`, `Boolean()`). The `+` operator is tricky — if either operand is a string, it concatenates; otherwise it adds numbers. Always use `===` to avoid surprises because `==` performs type coercion before comparing."

### Deep Dive: The ToPrimitive Algorithm

```
When JS needs to convert an object to a primitive:

Object → ToPrimitive(hint)
         │
         ├── hint = "number" (default for math operations)
         │   1. Try obj.valueOf() → if primitive, return it
         │   2. Try obj.toString() → if primitive, return it
         │   3. TypeError!
         │
         ├── hint = "string" (for string context)
         │   1. Try obj.toString() → if primitive, return it
         │   2. Try obj.valueOf() → if primitive, return it
         │   3. TypeError!
         │
         └── hint = "default" (for == and +)
             Same as "number" (valueOf first)

Examples:
  [] + []     → [].valueOf()=[](not primitive) → [].toString()="" → "" + "" = ""
  [] + {}     → "" + "[object Object]" = "[object Object]"
  {} + []     → 0 (if {} is parsed as empty block, +[] = 0)
```

### Interview Q&A — Section 3

**Q: What is `[] + []` in JavaScript?**
A: `""` (empty string). Both arrays convert to empty strings via `toString()`, then string concatenation: `"" + "" = ""`.

**Q: What is `[] + {}`?**
A: `"[object Object]"`. Array becomes `""`, object becomes `"[object Object]"`, then string concatenation.

**Q: Why is `NaN !== NaN` true?**
A: By IEEE 754 spec, NaN is not equal to anything, including itself. Use `Number.isNaN(x)` or `Object.is(x, NaN)` to check.

**Q: What are the 8 falsy values?**
A: `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`. Everything else is truthy — including `"0"`, `"false"`, `[]`, `{}`.

---

# 4. Hoisting

## What is Hoisting?

Hoisting is JavaScript's behavior of moving **declarations** to the top of their scope during the **creation phase** of the execution context.

```
┌──────────────────────────────────────────────────────┐
│                 HOISTING RULES                        │
│                                                       │
│  var       → Hoisted + initialized as 'undefined'     │
│  let/const → Hoisted + NOT initialized (TDZ)          │
│  function  → Hoisted + FULLY initialized (body too!)  │
│  class     → Hoisted + NOT initialized (TDZ)          │
│  function  → NOT hoisted (treated as variable)        │
│  expression                                           │
└──────────────────────────────────────────────────────┘
```

### Examples

```javascript
// ========== Function Declaration: FULLY hoisted ==========
sayHi();  // ✅ "Hello!" — works before declaration!

function sayHi() {
  console.log("Hello!");
}

// ========== Function Expression: NOT fully hoisted ==========
// sayBye(); // ❌ TypeError: sayBye is not a function
var sayBye = function() {
  console.log("Bye!");
};

// Why? Because JS sees it as:
// var sayBye = undefined;   ← hoisted
// sayBye();                 ← calling undefined as function!
// sayBye = function() {...} ← assigned later


// ========== var vs let hoisting ==========
console.log(a); // undefined (var hoisted, initialized as undefined)
// console.log(b); // ReferenceError (let is in TDZ)

var a = 1;
let b = 2;


// ========== Tricky: Function vs Var priority ==========
var myFunc = "hello";

function myFunc() {
  return "world";
}

console.log(typeof myFunc); // "string"
// Function is hoisted first, then var assignment overwrites it
```

### How to Explain in Interview

> "Hoisting is when JavaScript moves declarations to the top of their scope during the creation phase — before any code runs. `var` is hoisted and initialized as `undefined`. `let`/`const` are hoisted but stay uninitialized in the Temporal Dead Zone until their declaration line. Function declarations are fully hoisted with their body. Function expressions are hoisted as `var` (so they're `undefined`). This is why you can call a function declaration before its line, but not a function expression."

### Deep Dive: Why TDZ Exists (Design Decision)

```
TDZ was introduced in ES6 to catch bugs that var hid:

var x = "outer";
function test() {
    console.log(x);  // undefined (not "outer"!)
    var x = "inner";
}
// var silently shadowed outer x with undefined — confusing!

let x = "outer";
function test() {
    console.log(x);  // ReferenceError! Clear signal!
    let x = "inner";
}
// TDZ forces you to declare before use — safer code!

The engine internally tracks an INITIALIZED flag:
┌──────────┬──────────────┬──────────────┐
│ Variable │ var behavior  │ let behavior │
├──────────┼──────────────┼──────────────┤
│ Hoisted  │ yes + init   │ yes (no init)│
│ Flag     │ INITIALIZED  │ UNINITIALIZED│
│ Access   │ undefined ✅  │ Error ❌      │
│ After=   │ gets value   │ flag→INIT ✅  │
└──────────┴──────────────┴──────────────┘
```

### Interview Q&A — Section 4

**Q: Are `let` and `const` hoisted?**
A: Yes! They are hoisted (the engine knows about them during creation phase), but they are NOT initialized. Accessing them before declaration throws ReferenceError because they're in the TDZ.

**Q: What's the output: `var a = 1; function a() {}; console.log(typeof a);`?**
A: `"number"`. During hoisting, function `a` is hoisted first, then `var a` (which is a duplicate, ignored). During execution, `a = 1` overwrites the function.

**Q: Can you use `typeof` to check a variable in the TDZ?**
A: No! `typeof undeclaredVar` returns `"undefined"` safely, but `typeof tdzVar` throws ReferenceError if the variable is in TDZ.

---

# 5. Scope & Scope Chain

## Types of Scope

```
┌─────────────────────────────────────────────────────────┐
│                    GLOBAL SCOPE                          │
│  var globalVar = "I'm global";                           │
│  let globalLet = "I'm also global";                      │
│                                                          │
│  ┌───────────────────────────────────────────────────┐   │
│  │              FUNCTION SCOPE                        │   │
│  │  function outer() {                                │   │
│  │    var functionVar = "I'm function-scoped";        │   │
│  │    let functionLet = "I'm also function-scoped";   │   │
│  │                                                    │   │
│  │    ┌──────────────────────────────────────────┐    │   │
│  │    │          BLOCK SCOPE                      │    │   │
│  │    │  if (true) {                              │    │   │
│  │    │    var blockVar = "I ESCAPE blocks!";     │    │   │
│  │    │    let blockLet = "I stay in block";      │    │   │
│  │    │    const blockConst = "Me too";           │    │   │
│  │    │  }                                        │    │   │
│  │    │                                           │    │   │
│  │    │  console.log(blockVar);  // ✅ Works      │    │   │
│  │    │  console.log(blockLet);  // ❌ Error      │    │   │
│  │    └──────────────────────────────────────────┘    │   │
│  │  }                                                 │   │
│  └───────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Scope Chain (Lexical Scoping)

```javascript
const global = "global";

function outer() {
  const outerVar = "outer";

  function middle() {
    const middleVar = "middle";

    function inner() {
      const innerVar = "inner";

      // inner can access ALL variables up the chain:
      console.log(innerVar);   // ✅ "inner"  (own scope)
      console.log(middleVar);  // ✅ "middle" (parent)
      console.log(outerVar);   // ✅ "outer"  (grandparent)
      console.log(global);     // ✅ "global" (global)
    }
    inner();
  }
  middle();
}
outer();
```

```
SCOPE CHAIN LOOKUP:

inner() needs 'outerVar'
    │
    ├──→ Check inner scope     → Not found
    ├──→ Check middle scope    → Not found
    ├──→ Check outer scope     → ✅ FOUND "outer"
    └──→ Check global scope   → (not needed)

Note: Lookup goes UP only, never DOWN or SIDEWAYS
```

### Classic Interview: var in loop

```javascript
// PROBLEM with var
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 3, 3, 3 ← All print 3!
// Why? var is function-scoped, so there's ONE shared 'i'

// SOLUTION 1: Use let (block-scoped, new i each iteration)
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 0, 1, 2 ✅

// SOLUTION 2: Use IIFE (creates new scope each iteration)
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(() => console.log(j), 100);
  })(i);
}
// Output: 0, 1, 2 ✅

// SOLUTION 3: Use setTimeout's third parameter
for (var i = 0; i < 3; i++) {
  setTimeout((j) => console.log(j), 100, i);
}
// Output: 0, 1, 2 ✅
```

### How to Explain in Interview

> "JavaScript has 4 types of scope: global, function, block (let/const inside {}), and module. The scope chain is determined **lexically** — by where the code is written, not where it's called. When a variable is accessed, the engine searches the current scope, then the parent scope, up to global. If not found anywhere, it throws ReferenceError. `var` is function-scoped (ignores blocks like `if`/`for`), while `let`/`const` are block-scoped."

### Deep Dive: Lexical Environment Internals

```
Each scope creates a Lexical Environment with two parts:

┌── Lexical Environment ──────────────────────┐
│                                              │
│  Environment Record (local variables):       │
│  ┌──────────────┬───────────────────┐       │
│  │ firstName    │ "Jayesh"          │       │
│  │ age          │ 25                │       │
│  └──────────────┴───────────────────┘       │
│                                              │
│  Outer Reference → Parent Lexical Env        │
│  (this creates the scope chain!)             │
└──────────────────────────────────────────────┘

inner scope → outer scope → ... → global scope → null

The chain is set at DEFINITION time, not call time.
This is why closures work — the function remembers
where it was WRITTEN, not where it was CALLED.
```

### Interview Q&A — Section 5

**Q: What is lexical scoping?**
A: Scope is determined by where functions are written in the source code, not where they're called. A function always accesses variables from the scope where it was defined.

**Q: What's the difference between function scope and block scope?**
A: `var` is function-scoped — visible throughout the entire function. `let`/`const` are block-scoped — confined to the nearest `{ }` (if, for, while, or plain blocks).

**Q: In the classic `var` in loop problem, why does it print 3, 3, 3?**
A: `var i` is function-scoped — all 3 callbacks share the same `i`. By the time setTimeout fires, the loop has finished and `i = 3`. Fix: use `let` (block-scoped, each iteration gets its own `i`) or IIFE.

---

# 6. Functions

## Function Types

```javascript
// ========== 1. Function Declaration ==========
// Hoisted fully, can be called before declaration
function greet(name) {
  return `Hello, ${name}!`;
}

// ========== 2. Function Expression ==========
// NOT hoisted (treated as variable assignment)
const greet = function(name) {
  return `Hello, ${name}!`;
};

// ========== 3. Arrow Function ==========
// Short syntax, NO own 'this', NO 'arguments' object
const greet = (name) => `Hello, ${name}!`;

// Multi-line arrow
const add = (a, b) => {
  const sum = a + b;
  return sum;
};

// ========== 4. IIFE (Immediately Invoked Function Expression) ==========
// Executes immediately, creates private scope
(function() {
  var privateVar = "I'm private!";
  console.log(privateVar);
})();
// console.log(privateVar); // ❌ ReferenceError

// Arrow IIFE
(() => {
  console.log("Arrow IIFE!");
})();

// ========== 5. Generator Function ==========
function* counter() {
  yield 1;
  yield 2;
  yield 3;
}
const gen = counter();
gen.next(); // { value: 1, done: false }
gen.next(); // { value: 2, done: false }
gen.next(); // { value: 3, done: false }
gen.next(); // { value: undefined, done: true }
```

## Arrow Functions vs Regular Functions

```
┌────────────────────┬──────────────────┬──────────────────────┐
│     Feature        │ Regular Function │   Arrow Function     │
├────────────────────┼──────────────────┼──────────────────────┤
│ this binding       │ Dynamic (caller) │ Lexical (parent)     │
│ arguments object   │ ✅ Yes           │ ❌ No                │
│ new keyword        │ ✅ Can construct │ ❌ Cannot construct  │
│ prototype property │ ✅ Has it        │ ❌ Doesn't have it   │
│ Hoisting           │ ✅ (declaration) │ ❌ (expression only) │
│ Implicit return    │ ❌ No            │ ✅ Yes (single expr) │
│ super keyword      │ ❌ No            │ ✅ Inherits from     │
│                    │                  │   enclosing scope    │
└────────────────────┴──────────────────┴──────────────────────┘
```

```javascript
// KEY DIFFERENCE: 'this' behavior
const obj = {
  name: "Alice",

  // Regular: 'this' = the object calling the method
  regularMethod: function() {
    console.log(this.name); // "Alice"

    // Nested regular function loses 'this'!
    function inner() {
      console.log(this.name); // undefined (this = global/window)
    }
    inner();
  },

  // Arrow: 'this' = lexically inherited from parent
  arrowMethod: function() {
    console.log(this.name); // "Alice"

    // Arrow function keeps parent's 'this'!
    const inner = () => {
      console.log(this.name); // "Alice" ✅
    };
    inner();
  }
};

// No 'arguments' in arrow functions
function regular() {
  console.log(arguments); // [1, 2, 3]
}
regular(1, 2, 3);

const arrow = () => {
  // console.log(arguments); // ❌ ReferenceError
};
// Use rest parameters instead:
const arrowWithArgs = (...args) => {
  console.log(args); // [1, 2, 3] ✅
};
```

## Higher-Order Functions

A function that **takes a function as argument** OR **returns a function**.

```javascript
// Takes function as argument
function apply(fn, value) {
  return fn(value);
}
apply(x => x * 2, 5);  // 10

// Returns a function
function multiplier(factor) {
  return function(number) {
    return number * factor;
  };
}
const double = multiplier(2);
const triple = multiplier(3);
double(5);  // 10
triple(5);  // 15

// Built-in HOFs: map, filter, reduce, forEach, sort, find, some, every
```

## Pure Functions vs Impure Functions

```javascript
// PURE: Same input → Same output, No side effects
function add(a, b) {
  return a + b;  // Deterministic, no side effects
}

// IMPURE: Has side effects or depends on external state
let total = 0;
function addToTotal(value) {
  total += value;  // Mutates external state (side effect)
  return total;
}
```

## Callback Functions

```javascript
// A function passed as an argument to another function
function fetchData(callback) {
  setTimeout(() => {
    const data = { name: "Alice", age: 25 };
    callback(data);  // Execute the callback with data
  }, 1000);
}

fetchData(function(result) {
  console.log(result);  // { name: "Alice", age: 25 }
});

// Callback Hell (Pyramid of Doom)
getData(function(a) {
  getMoreData(a, function(b) {
    getEvenMoreData(b, function(c) {
      getYetMoreData(c, function(d) {
        console.log(d);  // Deeply nested = hard to read!
      });
    });
  });
});
// Solution: Use Promises or async/await (covered later)
```

### How to Explain in Interview

> "JavaScript has function declarations (fully hoisted), function expressions (hoisted as var), arrow functions (no own `this`/`arguments`, lexical `this`), and IIFEs. Arrow functions are NOT just shorter syntax — they fundamentally differ: no `this` binding, no `arguments` object, can't be used as constructors, no `prototype`. Higher-order functions take or return functions — `map`, `filter`, `reduce` are examples. Pure functions have no side effects and always return the same output for the same input."

### Deep Dive: Arrow vs Regular — Internal Differences

```
┌──────────────────────────────┬──────────────────────────────┐
│     Regular Function          │     Arrow Function            │
├──────────────────────────────┼──────────────────────────────┤
│ Has own 'this'               │ Inherits 'this' from parent   │
│ Has 'arguments' object       │ No 'arguments' object         │
│ Can be constructor (new)     │ Cannot use 'new'              │
│ Has 'prototype' property     │ No 'prototype' property       │
│ Can be generator (function*) │ Cannot be generator            │
│ 'this' depends on call-site  │ 'this' fixed at definition    │
│ Works as method              │ Avoid as method (wrong this)  │
│ Works with bind/call/apply   │ bind/call/apply don't change  │
│                              │ 'this' (it's lexical)         │
└──────────────────────────────┴──────────────────────────────┘

When to use which:
  Object methods  → regular function (need 'this' = object)
  Callbacks       → arrow function (keep parent's 'this')
  Event handlers  → regular if need 'this' = element
  Constructors    → regular function or class (must use 'new')
```

### Interview Q&A — Section 6

**Q: What's the difference between a function declaration and expression?**
A: Declaration (`function foo(){}`) is fully hoisted — callable before its line. Expression (`const foo = function(){}`) is hoisted as variable — `undefined` before assignment, calling it throws TypeError.

**Q: When should you NOT use arrow functions?**
A: Object methods (wrong `this`), event handlers where you need `this = element`, constructors (can't use `new`), when you need `arguments` object, and as generators.

**Q: What is an IIFE and why use it?**
A: Immediately Invoked Function Expression — `(function(){...})()`. Creates a private scope. Used before modules existed to avoid polluting global scope. Still used for one-time initialization.

**Q: What is a pure function?**
A: A function that (1) always returns the same output for same input, and (2) has no side effects (no mutations, no I/O, no external state changes). `Math.max()` is pure; `Math.random()` is not.

---

# 7. Closures

## What is a Closure?

A **closure** is a function that **remembers** and **accesses variables from its outer (lexical) scope**, even after the outer function has returned.

```
┌─────────────────────────────────────────────────────┐
│  function outer() {                                  │
│    let count = 0;     ← variable in outer scope      │
│                                                      │
│    function inner() { ← inner function               │
│      count++;         ← accesses outer variable       │
│      return count;                                   │
│    }                                                 │
│                                                      │
│    return inner;      ← returns the inner function   │
│  }                                                   │
│                                                      │
│  const counter = outer();  ← outer() finishes        │
│  counter(); // 1   ← but inner still accesses count! │
│  counter(); // 2   ← count is "closed over"          │
│  counter(); // 3                                     │
└─────────────────────────────────────────────────────┘

Memory Visualization:
┌──────────────────────┐
│ counter (function)   │
│   │                  │
│   └── [[Scope]] ─────┼──→ ┌─────────────────┐
│                      │    │ Closure (outer)  │
│                      │    │ count: 3         │
│                      │    └─────────────────┘
└──────────────────────┘
```

### Practical Closure Examples

```javascript
// ========== 1. Data Privacy / Encapsulation ==========
function createBankAccount(initialBalance) {
  let balance = initialBalance;  // Private variable!

  return {
    deposit(amount) {
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      if (amount > balance) return "Insufficient funds";
      balance -= amount;
      return balance;
    },
    getBalance() {
      return balance;  // Can read but not directly modify
    }
  };
}

const account = createBankAccount(100);
account.deposit(50);       // 150
account.withdraw(30);      // 120
account.getBalance();      // 120
// account.balance;        // undefined ← Can't access directly!


// ========== 2. Function Factory ==========
function createGreeter(greeting) {
  return function(name) {
    return `${greeting}, ${name}!`;
  };
}

const sayHello = createGreeter("Hello");
const sayHi = createGreeter("Hi");
sayHello("Alice");  // "Hello, Alice!"
sayHi("Bob");       // "Hi, Bob!"


// ========== 3. Memoization ==========
function memoize(fn) {
  const cache = {};  // Closed over - persists between calls!

  return function(...args) {
    const key = JSON.stringify(args);
    if (cache[key] !== undefined) {
      console.log("From cache");
      return cache[key];
    }
    console.log("Computing...");
    cache[key] = fn(...args);
    return cache[key];
  };
}

const expensiveAdd = memoize((a, b) => a + b);
expensiveAdd(1, 2); // "Computing..." → 3
expensiveAdd(1, 2); // "From cache" → 3


// ========== 4. Event Handlers with State ==========
function createClickCounter(buttonId) {
  let clicks = 0;

  document.getElementById(buttonId).addEventListener('click', () => {
    clicks++;  // Closure remembers 'clicks'
    console.log(`Button clicked ${clicks} times`);
  });
}


// ========== 5. Module Pattern (Pre-ES6) ==========
const Calculator = (function() {
  let history = [];  // Private

  return {
    add(a, b) {
      const result = a + b;
      history.push(`${a} + ${b} = ${result}`);
      return result;
    },
    getHistory() {
      return [...history];  // Return copy, not reference
    }
  };
})();

Calculator.add(2, 3);      // 5
Calculator.getHistory();    // ["2 + 3 = 5"]
// Calculator.history;      // undefined (private!)
```

### How to Explain in Interview

> "A closure is when a function remembers variables from its outer scope even after the outer function has returned. Internally, the engine stores a `[[Scopes]]` property on every function containing references to outer variables it uses. The garbage collector keeps these variables alive because they're still referenced. Closures enable data privacy, function factories, memoization, and the module pattern."

### Deep Dive: Closure Memory Lifecycle

```
function outer() {
    let x = 10;          // lives in outer's scope
    return function() {   // inner function references x
        return x;
    };
}
const fn = outer();      // outer() returns, but x survives!
fn();                    // 10 — x is still alive in closure

Memory:
BEFORE outer returns:       AFTER outer returns:
┌── Call Stack ──┐         ┌── Call Stack ──┐
│ outer()        │         │ (empty)        │
│  x = 10       │         └────────────────┘
│ Global()       │         
└────────────────┘         Heap:
                           fn → { code: ...,
                                  [[Scopes]]: [{x: 10}] }
                           x is kept alive because fn references it!

When fn is garbage collected (fn = null),
THEN x can finally be collected too.

⚠️ Common memory leak: closures in loops that capture
large objects unnecessarily. Always null out references
you no longer need.
```

### Interview Q&A — Section 7

**Q: What is a closure?**
A: A function + its lexical environment. When a function accesses variables from an outer scope, those variables are preserved even after the outer function returns. The inner function "closes over" them.

**Q: Give a practical use of closures.**
A: Data privacy (module pattern), function factories (`createMultiplier(2)`), memoization (caching results), event handlers with state, and React hooks (useState uses closures).

**Q: Can closures cause memory leaks?**
A: Yes. If a closure holds references to large objects that are no longer needed, the GC can't reclaim them. Fix: null out references, or restructure to avoid capturing unnecessary data.

**Q: What's the output of the `for var` + `setTimeout` problem?**
A: `3, 3, 3`. All callbacks share the same `var i`. Fix with `let` (block scope), IIFE, or passing `i` as parameter.

---

# 8. The `this` Keyword

## `this` Binding Rules (Priority Order)

```
┌─────────────────────────────────────────────────────────┐
│              'this' BINDING RULES                        │
│           (Highest to Lowest Priority)                   │
│                                                          │
│  1. new Binding                                          │
│     new Foo() → this = newly created object              │
│                                                          │
│  2. Explicit Binding                                     │
│     call(), apply(), bind() → this = specified object    │
│                                                          │
│  3. Implicit Binding                                     │
│     obj.method() → this = obj (the calling object)       │
│                                                          │
│  4. Default Binding                                      │
│     standalone function() → this = window/global         │
│     (strict mode → this = undefined)                     │
│                                                          │
│  5. Arrow Function (Special)                             │
│     () => {} → this = inherited from enclosing scope     │
│     (CANNOT be overridden by call/apply/bind!)           │
└─────────────────────────────────────────────────────────┘
```

### Detailed Examples for Each Rule

```javascript
// ========== Rule 1: new Binding ==========
function Person(name) {
  // this = new empty object {}
  this.name = name;
  // return this (implicitly)
}
const alice = new Person("Alice");
console.log(alice.name); // "Alice"
// this → the newly created Person object


// ========== Rule 2: Explicit Binding ==========
function greet() {
  console.log(`Hello, I'm ${this.name}`);
}
const user = { name: "Bob" };

// call - invokes immediately with given this + individual args
greet.call(user);           // "Hello, I'm Bob"
greet.call(user, arg1, arg2);

// apply - same as call but args as array
greet.apply(user);          // "Hello, I'm Bob"
greet.apply(user, [arg1, arg2]);

// bind - returns NEW function with this permanently bound
const boundGreet = greet.bind(user);
boundGreet();               // "Hello, I'm Bob"


// ========== Rule 3: Implicit Binding ==========
const obj = {
  name: "Charlie",
  greet() {
    console.log(this.name); // "Charlie"
    // this = obj (the object LEFT of the dot)
  }
};
obj.greet();

// GOTCHA: Losing implicit binding
const fn = obj.greet;  // Extracting method from object
fn();  // undefined! (this = global, not obj)
// Fix: const fn = obj.greet.bind(obj);


// ========== Rule 4: Default Binding ==========
function standalone() {
  console.log(this); // window (browser) or global (Node)
}
standalone();

// In strict mode:
"use strict";
function strictFn() {
  console.log(this); // undefined
}
strictFn();


// ========== Rule 5: Arrow Function ==========
const team = {
  name: "Dev Team",
  members: ["Alice", "Bob"],

  // Arrow function inherits 'this' from enclosing method
  listMembers() {
    this.members.forEach((member) => {
      console.log(`${member} is in ${this.name}`);
      // this = team object ✅ (inherited from listMembers)
    });
  },

  // Regular function would lose 'this'
  listMembersBroken() {
    this.members.forEach(function(member) {
      console.log(`${member} is in ${this.name}`);
      // this = global/undefined ❌
    });
  }
};
```

### call vs apply vs bind Comparison

```
┌──────────┬────────────────────────┬───────────────┬──────────────┐
│ Method   │ Purpose                │ Invocation    │ Arguments    │
├──────────┼────────────────────────┼───────────────┼──────────────┤
│ call()   │ Invoke with this       │ Immediate     │ arg1, arg2   │
│ apply()  │ Invoke with this       │ Immediate     │ [arg1, arg2] │
│ bind()   │ Create bound function  │ Returns func  │ arg1, arg2   │
└──────────┴────────────────────────┴───────────────┴──────────────┘
```

```javascript
function introduce(greeting, punctuation) {
  console.log(`${greeting}, I'm ${this.name}${punctuation}`);
}
const person = { name: "Alice" };

introduce.call(person, "Hello", "!");     // "Hello, I'm Alice!"
introduce.apply(person, ["Hello", "!"]);  // "Hello, I'm Alice!"

const bound = introduce.bind(person, "Hey");
bound(".");                                // "Hey, I'm Alice."
// bind supports partial application (currying)!
```

### Tricky `this` Interview Questions

```javascript
// Q1: What is logged?
const obj = {
  name: "Object",
  getName: () => {
    return this.name;  // Arrow in object literal
  }
};
console.log(obj.getName()); // undefined!
// Arrow function 'this' = enclosing scope = global, NOT obj


// Q2: What is logged?
function Foo() {
  this.value = 42;
  return { value: 100 };  // Returning object overrides 'this'!
}
const foo = new Foo();
console.log(foo.value); // 100 (not 42!)


// Q3: What is logged?
const obj2 = {
  name: "Outer",
  inner: {
    name: "Inner",
    getName() {
      return this.name;
    }
  }
};
console.log(obj2.inner.getName()); // "Inner"
// this = object LEFT of the last dot (inner)
const fn2 = obj2.inner.getName;
console.log(fn2()); // undefined (lost binding)
```

### How to Explain in Interview

> "`this` is determined by HOW a function is called, not where it's defined. There are 4 rules in priority order: (1) `new` — this = new object, (2) `call`/`apply`/`bind` — this = specified object, (3) method call `obj.fn()` — this = obj, (4) plain call `fn()` — this = window (non-strict) or undefined (strict). Arrow functions are the exception — they inherit `this` from their lexical parent and can't be changed with bind/call/apply."

### Deep Dive: this Binding Decision Flowchart

```
How to determine 'this':

Is it an arrow function?
├── YES → this = enclosing scope's this (lexical, unchangeable)
└── NO ↓

Was it called with 'new'?
├── YES → this = newly created object {}
└── NO ↓

Was it called with call/apply/bind?
├── YES → this = the specified object
└── NO ↓

Was it called as a method (obj.fn())?
├── YES → this = the object LEFT of the dot
└── NO ↓

Default:
├── Strict mode → this = undefined
└── Non-strict → this = window (global object)
```

### Interview Q&A — Section 8

**Q: What's the difference between call, apply, and bind?**
A: `call(obj, arg1, arg2)` — calls immediately with individual args. `apply(obj, [args])` — calls immediately with array. `bind(obj, arg1)` — returns a NEW function with `this` permanently bound (doesn't call it).

**Q: Why does `this` become undefined when you extract a method?**
A: `const fn = obj.method; fn();` — when called without the object, there's no implicit binding. In strict mode, `this` = undefined. Fix: `const fn = obj.method.bind(obj)`.

**Q: How does `this` work in arrow functions inside class methods?**
A: Arrow functions inside a method inherit `this` from the method's scope (the instance). That's why arrow callbacks inside methods correctly reference the class instance.

---

# 9. Objects & Prototypes

## Creating Objects

```javascript
// ========== 1. Object Literal ==========
const person = {
  name: "Alice",
  age: 30,
  greet() { return `Hi, I'm ${this.name}`; }
};

// ========== 2. Constructor Function ==========
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.greet = function() {
  return `Hi, I'm ${this.name}`;
};
const bob = new Person("Bob", 25);

// ========== 3. Object.create() ==========
const proto = {
  greet() { return `Hi, I'm ${this.name}`; }
};
const charlie = Object.create(proto);
charlie.name = "Charlie";

// ========== 4. Class (ES6) ==========
class PersonClass {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  greet() { return `Hi, I'm ${this.name}`; }
}
```

## Prototype Chain

Every JavaScript object has a hidden `[[Prototype]]` link to another object. This forms a **chain**.

```
┌──────────────────────────────────────────────────────────────┐
│                    PROTOTYPE CHAIN                            │
│                                                              │
│  const dog = new Animal("Rex");                              │
│                                                              │
│  dog ──[[Prototype]]──→ Animal.prototype                     │
│                            │                                 │
│                       [[Prototype]]                          │
│                            │                                 │
│                            ▼                                 │
│                      Object.prototype                        │
│                            │                                 │
│                       [[Prototype]]                          │
│                            │                                 │
│                            ▼                                 │
│                          null  (end of chain)                │
│                                                              │
│  When you access dog.toString():                             │
│  1. Check dog → not found                                    │
│  2. Check Animal.prototype → not found                       │
│  3. Check Object.prototype → ✅ FOUND!                       │
└──────────────────────────────────────────────────────────────┘
```

```javascript
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() {
  return `${this.name} makes a sound`;
};

const dog = new Animal("Rex");

// Prototype chain checks
console.log(dog.hasOwnProperty("name"));   // true (own property)
console.log(dog.hasOwnProperty("speak"));  // false (on prototype)
console.log("speak" in dog);               // true (found in chain)

// Inspect the chain
console.log(dog.__proto__ === Animal.prototype);          // true
console.log(Animal.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__ === null);         // true

// Object.getPrototypeOf() - preferred over __proto__
Object.getPrototypeOf(dog) === Animal.prototype; // true
```

## Prototypal Inheritance

```javascript
function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function() {
  return `${this.name} makes a sound`;
};

function Dog(name, breed) {
  Animal.call(this, name);  // Call parent constructor
  this.breed = breed;
}

// Set up inheritance chain
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;  // Fix constructor reference

Dog.prototype.bark = function() {
  return `${this.name} barks!`;
};

const rex = new Dog("Rex", "Labrador");
rex.speak();  // "Rex makes a sound" (inherited)
rex.bark();   // "Rex barks!" (own method)
rex instanceof Dog;    // true
rex instanceof Animal; // true
```

```
Inheritance Chain:
┌─────────────┐    ┌──────────────────┐    ┌───────────────────┐    ┌──────────────┐
│   rex       │───→│  Dog.prototype   │───→│ Animal.prototype  │───→│Object.prototype│
│             │    │                  │    │                   │    │              │
│ name: "Rex" │    │ bark()           │    │ speak()           │    │ toString()   │
│ breed: "Lab"│    │ constructor: Dog │    │ constructor:Animal│    │ hasOwnProp() │
└─────────────┘    └──────────────────┘    └───────────────────┘    └──────────────┘
```

## Object Methods You Must Know

```javascript
const obj = { a: 1, b: 2, c: 3 };

// ========== Iteration ==========
Object.keys(obj);       // ["a", "b", "c"]
Object.values(obj);     // [1, 2, 3]
Object.entries(obj);    // [["a", 1], ["b", 2], ["c", 3]]

// for...in (iterates own + inherited enumerable properties)
for (let key in obj) {
  if (obj.hasOwnProperty(key)) {  // Filter to own only
    console.log(key, obj[key]);
  }
}

// ========== Copying ==========
// Shallow copy
const shallow = { ...obj };
const shallow2 = Object.assign({}, obj);

// Deep copy (no functions, no circular refs)
const deep = JSON.parse(JSON.stringify(obj));

// Modern deep copy
const deep2 = structuredClone(obj);  // ✅ Handles circular refs!

// ========== Freezing & Sealing ==========
// Object.freeze() - Can't add, remove, or modify properties
const frozen = Object.freeze({ x: 1, nested: { y: 2 } });
// frozen.x = 10;        // ❌ Silently fails (strict: TypeError)
frozen.nested.y = 20;    // ✅ Works! Freeze is SHALLOW

// Object.seal() - Can't add or remove, CAN modify existing
const sealed = Object.seal({ x: 1 });
sealed.x = 10;           // ✅ Works
// sealed.z = 30;         // ❌ Can't add new

// Object.preventExtensions() - Can't add, CAN modify & delete
const noExtend = Object.preventExtensions({ x: 1 });
// noExtend.y = 2;        // ❌ Can't add
noExtend.x = 10;         // ✅ Can modify
delete noExtend.x;       // ✅ Can delete

// ========== Property Descriptors ==========
Object.defineProperty(obj, 'secret', {
  value: 42,
  writable: false,      // Can't change value
  enumerable: false,    // Won't appear in for...in / Object.keys
  configurable: false   // Can't delete or reconfigure
});
```

### Shallow vs Deep Copy Diagram

```
SHALLOW COPY:
original = { name: "Alice", address: { city: "NYC" } }
copy = { ...original }

original.address ──────→ ┌──────────────────┐
                         │ { city: "NYC" }  │ ← SHARED!
copy.address ──────────→ └──────────────────┘

copy.name = "Bob";              // ✅ Independent
copy.address.city = "LA";       // ❌ Changes original too!

DEEP COPY:
deepCopy = structuredClone(original)

original.address ──→ ┌──────────────────┐
                     │ { city: "NYC" }  │
                     └──────────────────┘
deepCopy.address ──→ ┌──────────────────┐  ← SEPARATE copy!
                     │ { city: "NYC" }  │
                     └──────────────────┘
```

### How to Explain in Interview

> "Every JS object has a hidden `[[Prototype]]` link to another object, forming a prototype chain. When you access a property, JS looks in the object first, then follows the chain up until it finds it or reaches `null`. `Object.create(proto)` creates an object with a specific prototype. Constructor functions use `.prototype` to define shared methods. `__proto__` is the getter/setter for `[[Prototype]]` (use `Object.getPrototypeOf()` instead)."

### Deep Dive: [[Prototype]] vs .prototype

```
VERY COMMON CONFUSION:

.prototype  → property on FUNCTIONS (constructor functions/classes)
              Becomes the [[Prototype]] of objects created with 'new'

[[Prototype]] → internal link on EVERY object
                Accessed via Object.getPrototypeOf(obj) or __proto__

function Dog(name) { this.name = name; }
Dog.prototype.bark = function() { return "Woof!"; }

const myDog = new Dog("Rex");

myDog:
┌─────────────────┐
│ name: "Rex"     │
│ [[Prototype]] ──┼──► Dog.prototype:
└─────────────────┘    ┌────────────────┐
                       │ bark: function │
                       │ [[Prototype]] ─┼──► Object.prototype:
                       └────────────────┘    ┌──────────────────┐
                                             │ toString, etc.   │
                                             │ [[Prototype]]: null│
                                             └──────────────────┘

myDog.bark()  → not on myDog → found on Dog.prototype ✅
myDog.toString() → not on myDog → not on Dog.prototype → Object.prototype ✅
myDog.fly()   → not found anywhere → undefined
```

### Interview Q&A — Section 9

**Q: What is prototypal inheritance?**
A: Objects can inherit properties from other objects through the prototype chain. When a property isn't found on the object, JS follows the `[[Prototype]]` link up the chain.

**Q: What's the difference between `Object.freeze()` and `Object.seal()`?**
A: `freeze`: can't add, remove, or modify properties (fully immutable, shallow). `seal`: can't add or remove properties, but CAN modify existing ones. Both are shallow.

**Q: How do you check if a property is the object's own or inherited?**
A: `obj.hasOwnProperty('key')` or `Object.hasOwn(obj, 'key')` (modern). `in` operator checks both own and inherited.

---

# 10. Classes & OOP

## ES6 Classes (Syntactic Sugar over Prototypes)

```javascript
class Animal {
  // Constructor - called with 'new'
  constructor(name) {
    this.name = name;      // Instance property
  }

  // Instance method (on prototype)
  speak() {
    return `${this.name} makes a sound`;
  }

  // Static method (on class itself, not instances)
  static create(name) {
    return new Animal(name);
  }

  // Getter
  get info() {
    return `Animal: ${this.name}`;
  }

  // Setter
  set nickname(value) {
    this._nickname = value.trim();
  }
}

const a = new Animal("Cat");
a.speak();           // "Cat makes a sound"
a.info;              // "Animal: Cat" (no parentheses needed)
Animal.create("Dog"); // Static call on class
// a.create("Dog");   // ❌ TypeError (static not on instances)
```

## Inheritance with extends

```javascript
class Dog extends Animal {
  constructor(name, breed) {
    super(name);           // MUST call super() before 'this'
    this.breed = breed;
  }

  speak() {
    return `${this.name} barks!`;  // Override parent method
  }

  parentSpeak() {
    return super.speak();  // Call parent's method
  }
}

const rex = new Dog("Rex", "Labrador");
rex.speak();        // "Rex barks!" (overridden)
rex.parentSpeak();  // "Rex makes a sound" (parent's)
rex instanceof Dog;    // true
rex instanceof Animal; // true
```

## Four Pillars of OOP in JavaScript

```javascript
// ========== 1. ENCAPSULATION (Private fields with #) ==========
class BankAccount {
  #balance;  // Private field (ES2022)
  #pin;

  constructor(initialBalance, pin) {
    this.#balance = initialBalance;
    this.#pin = pin;
  }

  #validatePin(pin) {  // Private method
    return pin === this.#pin;
  }

  withdraw(amount, pin) {
    if (!this.#validatePin(pin)) throw new Error("Invalid PIN");
    if (amount > this.#balance) throw new Error("Insufficient funds");
    this.#balance -= amount;
    return this.#balance;
  }

  get balance() {
    return this.#balance;
  }
}

const acc = new BankAccount(1000, "1234");
acc.balance;          // 1000 (via getter)
// acc.#balance;       // ❌ SyntaxError: Private field
acc.withdraw(100, "1234"); // 900


// ========== 2. ABSTRACTION ==========
// Hide complexity, expose simple interface
class EmailService {
  #validateEmail(email) { /* complex validation */ }
  #formatBody(body) { /* complex formatting */ }
  #connectToServer() { /* complex connection */ }

  // Simple public interface
  send(to, subject, body) {
    this.#validateEmail(to);
    const formatted = this.#formatBody(body);
    this.#connectToServer();
    // ... send email
    return "Email sent!";
  }
}


// ========== 3. INHERITANCE (shown above) ==========


// ========== 4. POLYMORPHISM ==========
class Shape {
  area() { throw new Error("Must implement area()"); }
}

class Circle extends Shape {
  constructor(radius) { super(); this.radius = radius; }
  area() { return Math.PI * this.radius ** 2; }
}

class Rectangle extends Shape {
  constructor(w, h) { super(); this.w = w; this.h = h; }
  area() { return this.w * this.h; }
}

// Same interface, different behavior
const shapes = [new Circle(5), new Rectangle(4, 6)];
shapes.forEach(s => console.log(s.area()));
// 78.54  (circle)
// 24     (rectangle)
```

### How to Explain in Interview

> "ES6 classes are syntactic sugar over prototypes — they compile to constructor functions + prototype methods. `extends` sets up the prototype chain. `super()` calls the parent constructor (MUST be called in child constructor before using `this`). Private fields use `#` prefix — truly private, not accessible outside the class. The four OOP pillars: Encapsulation (#private), Abstraction (hiding complexity), Inheritance (extends), Polymorphism (same method, different behavior)."

### Interview Q&A — Section 10

**Q: Are JS classes real classes like in Java/C++?**
A: No. They're syntactic sugar over prototypal inheritance. Under the hood, `class Dog extends Animal` sets up `Dog.prototype.[[Prototype]] = Animal.prototype`. There are no real classes — just objects linking to other objects.

**Q: What happens if you forget `super()` in a child constructor?**
A: `ReferenceError: Must call super constructor before accessing 'this'`. The child's `this` is not initialized until `super()` runs.

**Q: What are static methods?**
A: Methods on the class itself, not on instances. Called as `ClassName.method()`, not `instance.method()`. Useful for utility functions (e.g., `Array.isArray()`, `Object.keys()`).

**Q: How do private fields (#) differ from convention (_)?**
A: `#field` is truly private — accessing from outside throws SyntaxError. `_field` is just a naming convention — still publicly accessible. `#` is enforced by the engine.

---

# 11. Arrays & Array Methods

## What is an Array?

An array is an **ordered list of values**. Think of it like a numbered locker — each slot (index) holds one item, starting from 0.

```javascript
const fruits = ["apple", "banana", "cherry"];
//  index:        0         1          2

fruits[0];       // "apple"
fruits.length;   // 3
```

## Mutating vs Non-Mutating Methods

**Mutating** = changes the original array.
**Non-Mutating** = returns a NEW array, original stays the same.

```
┌──────────────────────────────────────────────────────────┐
│              MUTATING (changes original)                   │
│                                                           │
│  push()      → add to END          → returns new length   │
│  pop()       → remove from END     → returns removed item │
│  unshift()   → add to START        → returns new length   │
│  shift()     → remove from START   → returns removed item │
│  splice()    → add/remove ANYWHERE → returns removed items│
│  sort()      → sorts in place      → returns sorted array │
│  reverse()   → reverses in place   → returns reversed arr │
│  fill()      → fills with value    → returns filled array │
├──────────────────────────────────────────────────────────┤
│              NON-MUTATING (returns new array)              │
│                                                           │
│  map()       → transform each item → returns new array    │
│  filter()    → keep matching items → returns new array    │
│  reduce()    → combine all items   → returns single value │
│  concat()    → merge arrays        → returns new array    │
│  slice()     → extract portion     → returns new array    │
│  flat()      → flatten nested      → returns new array    │
│  flatMap()   → map + flatten       → returns new array    │
│  find()      → first match         → returns item/undef.  │
│  findIndex() → first match index   → returns index/-1     │
│  some()      → any item matches?   → returns true/false   │
│  every()     → all items match?    → returns true/false   │
│  includes()  → contains value?     → returns true/false   │
│  indexOf()   → first index of val  → returns index/-1     │
└──────────────────────────────────────────────────────────┘
```

### push, pop, unshift, shift — The 4 Basics

Think of an array like a **queue of people**:

```
                    unshift()              push()
                   adds here →  [ 🧑 🧑 🧑 ]  ← adds here
                   shift()                  pop()
                  removes here            removes here

const arr = [1, 2, 3];

arr.push(4);       // [1, 2, 3, 4]    → adds to END
arr.pop();         // [1, 2, 3]       → removes from END
arr.unshift(0);    // [0, 1, 2, 3]    → adds to START
arr.shift();       // [1, 2, 3]       → removes from START
```

### splice() — The Swiss Army Knife

`splice(startIndex, deleteCount, ...itemsToAdd)`

It can **add**, **remove**, or **replace** items at any position.

```javascript
const arr = ["a", "b", "c", "d", "e"];

// DELETE: Remove 2 items starting at index 1
arr.splice(1, 2);
// arr = ["a", "d", "e"]        removed: ["b", "c"]

// INSERT: At index 1, delete 0, add "x", "y"
arr.splice(1, 0, "x", "y");
// arr = ["a", "x", "y", "d", "e"]

// REPLACE: At index 0, delete 1, add "z"
arr.splice(0, 1, "z");
// arr = ["z", "x", "y", "d", "e"]
```

### slice() — Copy a Portion (Does NOT mutate)

`slice(startIndex, endIndex)` — endIndex is **not included**.

```javascript
const arr = [10, 20, 30, 40, 50];

arr.slice(1, 3);   // [20, 30]      (index 1 to 2, not 3)
arr.slice(2);      // [30, 40, 50]  (index 2 to end)
arr.slice(-2);     // [40, 50]      (last 2 items)
arr.slice();       // [10, 20, 30, 40, 50]  (shallow copy)

// Original is unchanged!
console.log(arr);  // [10, 20, 30, 40, 50]
```

### map() — Transform Every Item

**What it does:** Takes each item, runs your function on it, puts the result in a new array.

```javascript
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(num => num * 2);
// doubled = [2, 4, 6, 8, 10]

// Practical: extract names from objects
const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 }
];
const names = users.map(user => user.name);
// names = ["Alice", "Bob"]
```

```
How map() works:

  [1,   2,   3,   4,   5]     ← original
   ↓    ↓    ↓    ↓    ↓      ← x => x * 2
  [2,   4,   6,   8,   10]    ← new array
```

### filter() — Keep Only What Matches

**What it does:** Tests each item with your condition. If `true`, keeps it. If `false`, removes it.

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8];

const evens = numbers.filter(num => num % 2 === 0);
// evens = [2, 4, 6, 8]

// Practical: filter adults
const people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 17 },
  { name: "Charlie", age: 30 }
];
const adults = people.filter(p => p.age >= 18);
// adults = [{ name: "Alice"... }, { name: "Charlie"... }]
```

```
How filter() works:

  [1,  2,  3,  4,  5,  6,  7,  8]     ← original
   ✗   ✓   ✗   ✓   ✗   ✓   ✗   ✓     ← is even?
  [    2,      4,      6,      8]      ← new array (only ✓ kept)
```

### reduce() — Combine Everything Into One Value

**What it does:** Goes through each item and **accumulates** a result. Like a snowball rolling downhill, getting bigger.

`reduce(callback, initialValue)` where callback is `(accumulator, currentItem) => newAccumulator`

```javascript
const numbers = [1, 2, 3, 4, 5];

// Sum all numbers
const sum = numbers.reduce((total, num) => total + num, 0);
// sum = 15

// Step by step:
// Step 1: total=0,  num=1  → return 0+1  = 1
// Step 2: total=1,  num=2  → return 1+2  = 3
// Step 3: total=3,  num=3  → return 3+3  = 6
// Step 4: total=6,  num=4  → return 6+4  = 10
// Step 5: total=10, num=5  → return 10+5 = 15
```

```
How reduce() works (sum example):

  accumulator:   0 → 1 → 3 → 6 → 10 → 15
                 ↑   ↑   ↑   ↑    ↑
  current:       1   2   3   4    5

  Final result: 15
```

```javascript
// Practical: Count occurrences
const fruits = ["apple", "banana", "apple", "cherry", "banana", "apple"];

const count = fruits.reduce((acc, fruit) => {
  acc[fruit] = (acc[fruit] || 0) + 1;
  return acc;
}, {});
// count = { apple: 3, banana: 2, cherry: 1 }


// Practical: Flatten array
const nested = [[1, 2], [3, 4], [5, 6]];
const flat = nested.reduce((acc, arr) => acc.concat(arr), []);
// flat = [1, 2, 3, 4, 5, 6]
// (Modern way: nested.flat())


// Practical: Group by property
const people = [
  { name: "Alice", dept: "Engineering" },
  { name: "Bob", dept: "Marketing" },
  { name: "Charlie", dept: "Engineering" }
];

const byDept = people.reduce((groups, person) => {
  const dept = person.dept;
  groups[dept] = groups[dept] || [];
  groups[dept].push(person);
  return groups;
}, {});
// { Engineering: [Alice, Charlie], Marketing: [Bob] }

// Modern way: Object.groupBy(people, p => p.dept)
```

### find(), findIndex(), some(), every()

```javascript
const nums = [10, 20, 30, 40, 50];

// find() — returns FIRST item that matches
nums.find(n => n > 25);       // 30

// findIndex() — returns INDEX of first match
nums.findIndex(n => n > 25);  // 2

// some() — does ANY item match? (like OR)
nums.some(n => n > 40);       // true

// every() — do ALL items match? (like AND)
nums.every(n => n > 5);       // true
nums.every(n => n > 20);      // false
```

### sort() — Sorting (TRICKY! Must Know)

**Important:** `sort()` converts items to **strings** by default! This causes bugs with numbers.

```javascript
// ❌ WRONG: Default sort (alphabetical/string comparison)
[10, 9, 80, 1].sort();
// Result: [1, 10, 80, 9]  ← WRONG! "10" < "9" as strings

// ✅ CORRECT: Provide a compare function
[10, 9, 80, 1].sort((a, b) => a - b);
// Result: [1, 9, 10, 80]  ← Ascending

[10, 9, 80, 1].sort((a, b) => b - a);
// Result: [80, 10, 9, 1]  ← Descending
```

```
How the compare function works:

  sort((a, b) => return_value)

  return NEGATIVE  → a comes first   (a < b)
  return 0         → keep order      (a = b)
  return POSITIVE  → b comes first   (a > b)

  Example: a=10, b=9  →  10-9 = 1 (positive)  →  9 comes first
```

### Method Chaining

You can chain non-mutating methods together — the output of one becomes the input of the next.

```javascript
const users = [
  { name: "Alice", age: 25, active: true },
  { name: "Bob", age: 17, active: true },
  { name: "Charlie", age: 30, active: false },
  { name: "Diana", age: 22, active: true }
];

// Get names of active adults, sorted alphabetically
const result = users
  .filter(u => u.active)            // Keep active users
  .filter(u => u.age >= 18)         // Keep adults
  .map(u => u.name)                 // Extract names
  .sort();                          // Sort A-Z

// result = ["Alice", "Diana"]
```

### How to Explain in Interview

> "Arrays in JS are objects with numeric keys. Key methods: `map` transforms each element (returns new array), `filter` keeps elements passing a test, `reduce` accumulates into a single value, `find` returns first match, `some`/`every` test conditions. `sort()` converts to strings by default — always pass a compare function for numbers! Mutating methods: push/pop/shift/unshift/splice/sort/reverse. Non-mutating: map/filter/reduce/slice/concat/flat."

### Deep Dive: reduce() — The Most Powerful Array Method

```
reduce((accumulator, currentValue, index, array) => {}, initialValue)

reduce can implement ANY other array method:

// map with reduce:
arr.reduce((acc, val) => [...acc, val * 2], []);

// filter with reduce:
arr.reduce((acc, val) => val > 5 ? [...acc, val] : acc, []);

// flat with reduce:
arr.reduce((acc, val) => acc.concat(val), []);

Think of reduce as a conveyor belt:
┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐
│  1  │→ │  2  │→ │  3  │→ │  4  │  items
└──┬──┘  └──┬──┘  └──┬──┘  └──┬──┘
   ▼        ▼        ▼        ▼
  acc=0   acc=1    acc=3    acc=6    accumulator
  0+1=1   1+2=3   3+3=6   6+4=10   → final: 10
```

### Interview Q&A — Section 11

**Q: What's the difference between `map` and `forEach`?**
A: `map` returns a new array with transformed elements. `forEach` returns `undefined` — used for side effects only. `map` is chainable, `forEach` is not.

**Q: Why does `[10, 9, 80, 1].sort()` give `[1, 10, 80, 9]`?**
A: `sort()` converts elements to strings by default. `"10" < "9"` because `"1" < "9"` in string comparison. Fix: `.sort((a, b) => a - b)`.

**Q: What's the difference between `splice` and `slice`?**
A: `splice` MUTATES the array (add/remove elements). `slice` returns a COPY of a portion (non-mutating). Remember: splice = "cut and edit", slice = "photocopy a section".

**Q: How do you flatten a nested array?**
A: `arr.flat(Infinity)` for any depth, `arr.flat()` for one level, or `arr.reduce((acc, val) => acc.concat(val), [])` manually.

---

# 12. Destructuring, Spread & Rest

## Destructuring

**What is it?** A shortcut to **unpack values** from arrays or objects into separate variables. Instead of accessing each item one by one, you can do it in a single line.

### Object Destructuring

```javascript
// WITHOUT destructuring (the old way)
const person = { name: "Alice", age: 25, city: "NYC" };
const name = person.name;
const age = person.age;
const city = person.city;

// WITH destructuring (much cleaner!)
const { name, age, city } = person;
// name = "Alice", age = 25, city = "NYC"

// Rename while destructuring (when variable name is taken)
const { name: userName, age: userAge } = person;
// userName = "Alice", userAge = 25

// Default values (if property doesn't exist)
const { name, country = "USA" } = person;
// country = "USA" (default, since person has no 'country')

// Nested destructuring
const user = {
  name: "Alice",
  address: {
    city: "NYC",
    zip: "10001"
  }
};
const { address: { city, zip } } = user;
// city = "NYC", zip = "10001"

// In function parameters (very common!)
function greet({ name, age }) {
  return `${name} is ${age} years old`;
}
greet({ name: "Alice", age: 25 });  // "Alice is 25 years old"
```

### Array Destructuring

```javascript
// WITHOUT destructuring
const colors = ["red", "green", "blue"];
const first = colors[0];
const second = colors[1];

// WITH destructuring
const [first, second, third] = colors;
// first = "red", second = "green", third = "blue"

// Skip items with empty slots
const [, , third] = colors;
// third = "blue"

// Default values
const [a, b, c, d = "yellow"] = colors;
// d = "yellow" (default, since colors[3] doesn't exist)

// Swap variables (classic interview question!)
let x = 1, y = 2;
[x, y] = [y, x];
// x = 2, y = 1  ← Swapped without temp variable!
```

## Spread Operator (...)

**What is it?** "Spreads" (unpacks) an array or object into individual items. Think of it like opening a box and taking everything out.

```javascript
// ========== Array Spread ==========
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Combine arrays
const combined = [...arr1, ...arr2];
// [1, 2, 3, 4, 5, 6]

// Copy an array (shallow)
const copy = [...arr1];

// Add items while spreading
const withExtra = [0, ...arr1, 4];
// [0, 1, 2, 3, 4]

// Spread in function call
Math.max(...arr1);  // 3  (same as Math.max(1, 2, 3))


// ========== Object Spread ==========
const defaults = { theme: "light", lang: "en", fontSize: 14 };
const userPrefs = { theme: "dark", fontSize: 18 };

// Merge objects (later values overwrite earlier ones)
const settings = { ...defaults, ...userPrefs };
// { theme: "dark", lang: "en", fontSize: 18 }

// Copy with modifications
const updated = { ...person, age: 26, city: "LA" };
```

```
Spread Visualization:

  [...[1,2,3], ...[4,5,6]]

  Step 1:  unpack [1,2,3]  →  1, 2, 3
  Step 2:  unpack [4,5,6]  →  4, 5, 6
  Step 3:  combine          →  [1, 2, 3, 4, 5, 6]
```

## Rest Operator (...)

**Same syntax as spread `...` but opposite meaning!**
- **Spread** = unpacks items OUT of array/object
- **Rest** = gathers remaining items INTO an array/object

```javascript
// ========== Rest in function parameters ==========
// Collects "the rest" of the arguments into an array
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
sum(1, 2, 3, 4);  // 10
// numbers = [1, 2, 3, 4]

// Mix regular params with rest (rest MUST be last)
function logFirst(first, ...others) {
  console.log("First:", first);   // "First: 1"
  console.log("Others:", others); // "Others: [2, 3, 4]"
}
logFirst(1, 2, 3, 4);


// ========== Rest in destructuring ==========
// Array rest
const [head, ...tail] = [1, 2, 3, 4, 5];
// head = 1,  tail = [2, 3, 4, 5]

// Object rest
const { name, ...rest } = { name: "Alice", age: 25, city: "NYC" };
// name = "Alice",  rest = { age: 25, city: "NYC" }
```

```
REST vs SPREAD — How to tell them apart:

  SPREAD (unpacking):
    const newArr = [...oldArr]           ← RIGHT side of =
    myFunc(...args)                      ← in function CALL

  REST (gathering):
    const [first, ...rest] = arr         ← LEFT side of =
    function myFunc(...args) {}          ← in function DEFINITION
```

### How to Explain in Interview

> "Destructuring extracts values from objects/arrays into variables. Object destructuring uses property names, array destructuring uses position. Spread (`...`) expands an iterable into individual elements — used on the RIGHT side of `=` or in function calls. Rest (`...`) collects multiple elements into an array — used on the LEFT side of `=` or in function parameters. They look identical (`...`) but are opposite operations: spread unpacks, rest packs."

### Interview Q&A — Section 12

**Q: What's the difference between spread and rest?**
A: Same syntax (`...`), opposite behavior. Spread: expands (`[...arr]`, `{...obj}`, `fn(...args)`). Rest: collects (`function(...args)`, `const [a, ...rest]`). Position determines which: right side = spread, left side = rest.

**Q: How does destructuring with defaults work?**
A: `const { name = "Default" } = obj;` — if `obj.name` is `undefined`, the default `"Default"` is used. Note: `null` does NOT trigger the default (only `undefined` does).

**Q: Can you rename during destructuring?**
A: Yes! `const { name: fullName } = obj;` creates variable `fullName` with value of `obj.name`. The syntax is `{ sourceProperty: targetVariable }`.

---

# 13. Asynchronous JavaScript

## Why Async?

JavaScript is **single-threaded** — it can do only one thing at a time. But some tasks take a long time (fetching data from a server, reading files, timers). If JS waited for each one, the page would **freeze**.

**Solution:** Async operations. JS says _"start this task, and when it's done, call me back."_ Meanwhile, it continues running other code.

```
SYNCHRONOUS (blocking):                ASYNCHRONOUS (non-blocking):
┌─────────────────────┐               ┌─────────────────────┐
│ Task 1 (1 sec)      │               │ Task 1 (starts)     │
│ ████████████████    │               │ ██                  │
│ Task 2 (2 sec)      │               │ Task 2 (starts)     │
│ ████████████████████│               │ ██                  │
│ ████████████████████│               │ Task 3 (runs)       │
│ Task 3 (instant)    │               │ ████                │
│ ██                  │               │ Task 1 (finishes)   │
│                     │               │ ████                │
│ Total: ~3 seconds   │               │ Task 2 (finishes)   │
│                     │               │ ██████              │
│                     │               │ Total: ~2 seconds   │
└─────────────────────┘               └─────────────────────┘
```

## Async Patterns Evolution

```
┌──────────┐     ┌──────────┐     ┌──────────────┐
│ Callbacks │ ──→ │ Promises │ ──→ │ Async/Await  │
│ (old)     │     │ (ES2015) │     │ (ES2017)     │
│           │     │          │     │              │
│ Messy     │     │ Cleaner  │     │ Cleanest     │
│ Callback  │     │ .then()  │     │ Looks like   │
│ Hell      │     │ chains   │     │ sync code    │
└──────────┘     └──────────┘     └──────────────┘
```

### How to Explain in Interview

> "JavaScript is single-threaded — one call stack, one task at a time. But async operations (setTimeout, fetch, events) are handled by browser/Node.js Web APIs on separate threads. When they complete, their callbacks go to queues. The event loop checks: is the call stack empty? If yes, move the next callback from the queue to the stack. This is how JS achieves non-blocking behavior despite being single-threaded."

### Interview Q&A — Section 13

**Q: Why is asynchronous programming needed?**
A: Without async, long-running operations (network requests, file I/O) would block the entire program — the UI would freeze. Async lets JS delegate these to the browser and continue running other code.

**Q: What are the 3 async patterns and when to use each?**
A: Callbacks (simplest, but nests badly), Promises (flat chains, better error handling), async/await (cleanest, reads like sync code). Modern JS: always use async/await with try/catch.

---

# 14. Event Loop

## What is the Event Loop?

The Event Loop is the **traffic controller** of JavaScript. It decides what code runs and when.

Even though JS is single-threaded, the **browser/Node.js** provides extra threads for async tasks (timers, network, etc.). The Event Loop coordinates between them.

```
┌─────────────────────────────────────────────────────────────┐
│                    THE EVENT LOOP                             │
│                                                              │
│   Your Code              Browser/Node.js                     │
│  ┌──────────┐          ┌────────────────┐                    │
│  │          │  async   │  Web APIs:     │                    │
│  │  CALL    │  tasks   │  - setTimeout  │                    │
│  │  STACK   │ ───────→ │  - fetch       │                    │
│  │          │          │  - DOM events  │                    │
│  │ (runs    │          │  - file I/O    │                    │
│  │  sync    │          └──────┬─────────┘                    │
│  │  code)   │                 │                              │
│  │          │                 │ when done                    │
│  └────┬─────┘                 ▼                              │
│       │              ┌──────────────────┐                    │
│       │              │   TASK QUEUES     │                    │
│       │              │                  │                    │
│       │              │  Microtask Queue │ ← Promises         │
│       │              │  (high priority) │   queueMicrotask   │
│       │              │                  │   MutationObserver  │
│       │              │  Macrotask Queue │ ← setTimeout       │
│       │              │  (low priority)  │   setInterval      │
│       │              │                  │   I/O, UI events   │
│       │              └──────┬───────────┘                    │
│       │                     │                                │
│       │    ┌────────────────┘                                │
│       │    │                                                 │
│       ▼    ▼                                                 │
│  ┌─────────────┐                                             │
│  │ EVENT LOOP  │  Checks: Is call stack empty?               │
│  │             │  Yes → Move tasks from queue to stack        │
│  │  🔄 Loop:  │                                              │
│  │  1. Run all │  PRIORITY:                                  │
│  │     sync    │  1. ALL microtasks first                    │
│  │  2. ALL     │  2. ONE macrotask                           │
│  │     micro   │  3. ALL microtasks again                    │
│  │  3. ONE     │  4. Repeat...                               │
│  │     macro   │                                              │
│  │  4. Repeat  │                                              │
│  └─────────────┘                                             │
└─────────────────────────────────────────────────────────────┘
```

### Event Loop Example — CLASSIC Interview Question

```javascript
console.log("1");                          // Sync

setTimeout(() => console.log("2"), 0);     // Macrotask

Promise.resolve().then(() => {
  console.log("3");                        // Microtask
});

console.log("4");                          // Sync

// OUTPUT: 1, 4, 3, 2
```

**Why this order?**

```
Step 1: Run all synchronous code
        → console.log("1")  ✅ prints "1"
        → setTimeout(...)   → puts callback in MACROTASK queue
        → Promise.then(...) → puts callback in MICROTASK queue
        → console.log("4")  ✅ prints "4"

Step 2: Call stack is empty. Check MICROTASK queue first!
        → console.log("3")  ✅ prints "3"

Step 3: Microtask queue empty. Check MACROTASK queue.
        → console.log("2")  ✅ prints "2"

Final output: 1 → 4 → 3 → 2
```

### More Complex Event Loop Example

```javascript
console.log("Start");

setTimeout(() => {
  console.log("Timeout 1");
  Promise.resolve().then(() => console.log("Promise inside timeout"));
}, 0);

setTimeout(() => {
  console.log("Timeout 2");
}, 0);

Promise.resolve()
  .then(() => {
    console.log("Promise 1");
  })
  .then(() => {
    console.log("Promise 2");
  });

console.log("End");

// OUTPUT:
// Start
// End
// Promise 1
// Promise 2
// Timeout 1
// Promise inside timeout
// Timeout 2
```

```
Execution Timeline:

SYNC:       "Start" → "End"
MICROTASK:  "Promise 1" → "Promise 2"
MACRO 1:    "Timeout 1" → (adds microtask)
MICROTASK:  "Promise inside timeout"
MACRO 2:    "Timeout 2"
```

### How to Explain in Interview

> "The event loop continuously checks: is the call stack empty? If yes, it first drains the entire microtask queue (Promises, queueMicrotask, MutationObserver), then takes ONE macrotask (setTimeout, setInterval, I/O, events) from the callback queue. After each macrotask, it checks microtasks again. Microtasks always have higher priority. That's why `Promise.then()` runs before `setTimeout(fn, 0)`."

### Deep Dive: Event Loop Priority

```
┌─── Priority Order ─────────────────────────────────────────┐
│ 1. SYNCHRONOUS CODE (call stack)              HIGHEST      │
│ 2. MICROTASK QUEUE (Promise.then, queueMicrotask)          │
│    → Fully drained after EVERY macrotask                   │
│ 3. MACROTASK QUEUE (setTimeout, setInterval, I/O)          │
│    → One at a time, then check microtasks again            │
│ 4. requestAnimationFrame (before next paint)    LOWEST     │
└────────────────────────────────────────────────────────────┘

After each macrotask: DRAIN all microtasks → paint → next macrotask
```

### Interview Q&A — Section 14

**Q: What's the output of `setTimeout(fn, 0)` vs `Promise.resolve().then(fn)`?**
A: Promise runs first! Microtask queue (Promise) has higher priority than macrotask queue (setTimeout), even with 0ms delay.

**Q: Can microtasks block the UI?**
A: Yes! If a microtask keeps adding more microtasks, the queue never empties, and no macrotasks or renders can happen — the page freezes.

**Q: What's the difference between macrotask and microtask?**
A: Microtasks: Promise.then/catch/finally, queueMicrotask, MutationObserver. Macrotasks: setTimeout, setInterval, setImmediate (Node), I/O, UI rendering events.

---

# 15. Promises

## What is a Promise?

A Promise is an **object that represents a future value**. Think of it like ordering food at a restaurant — you get a receipt (promise) immediately, and later the food arrives (resolved) or the kitchen says it's out of stock (rejected).

```
┌────────────────────────────────────────────────┐
│               PROMISE STATES                    │
│                                                 │
│  ┌───────────┐                                  │
│  │  PENDING  │ ← initial state (waiting)        │
│  └─────┬─────┘                                  │
│        │                                        │
│   ┌────┴─────┐                                  │
│   │          │                                  │
│   ▼          ▼                                  │
│ ┌──────┐  ┌──────────┐                          │
│ │FULFILLED│ │ REJECTED │                          │
│ │(success)│ │ (error)  │                          │
│ └──────┘  └──────────┘                          │
│   ↓          ↓                                  │
│ .then()    .catch()                             │
│                                                 │
│ Once settled (fulfilled/rejected),              │
│ a promise CANNOT change state again.            │
└────────────────────────────────────────────────┘
```

### Creating and Using Promises

```javascript
// ========== Creating a Promise ==========
const myPromise = new Promise((resolve, reject) => {
  // Do some async work...
  const success = true;

  if (success) {
    resolve("Data loaded!");    // ← Fulfilled
  } else {
    reject("Something failed"); // ← Rejected
  }
});

// ========== Consuming a Promise ==========
myPromise
  .then(result => {
    console.log(result);       // "Data loaded!"
  })
  .catch(error => {
    console.log(error);        // runs if rejected
  })
  .finally(() => {
    console.log("Done!");      // ALWAYS runs (success or failure)
  });
```

### Promise Chaining

Each `.then()` returns a **new Promise**, so you can chain them. This solves callback hell!

```javascript
// Callback Hell (ugly):
getUser(id, (user) => {
  getOrders(user, (orders) => {
    getDetails(orders[0], (details) => {
      console.log(details);
    });
  });
});

// Promise Chain (clean):
getUser(id)
  .then(user => getOrders(user))
  .then(orders => getDetails(orders[0]))
  .then(details => console.log(details))
  .catch(error => console.error(error));  // catches ANY error in chain
```

```
Promise Chain Flow:

  getUser(id)
      │
      ▼ returns Promise
  .then(user => getOrders(user))
      │
      ▼ returns Promise
  .then(orders => getDetails(orders[0]))
      │
      ▼ returns Promise
  .then(details => console.log(details))
      │
      ▼ if ANY step fails
  .catch(error => ...)   ← catches error from ANY step above
```

### Promise Static Methods

```javascript
// ========== Promise.all() ==========
// Runs ALL promises in parallel. Resolves when ALL succeed.
// If ANY fails → rejects immediately.
const p1 = fetch("/api/users");
const p2 = fetch("/api/products");
const p3 = fetch("/api/orders");

Promise.all([p1, p2, p3])
  .then(([users, products, orders]) => {
    // All three completed!
  })
  .catch(error => {
    // ANY one failed — you get the FIRST error
  });


// ========== Promise.allSettled() ==========
// Runs ALL promises. Waits for ALL to finish (success or failure).
// Never rejects!
Promise.allSettled([p1, p2, p3])
  .then(results => {
    results.forEach(r => {
      if (r.status === "fulfilled") console.log(r.value);
      if (r.status === "rejected") console.log(r.reason);
    });
  });


// ========== Promise.race() ==========
// Returns result of FIRST promise to settle (win or lose).
Promise.race([p1, p2, p3])
  .then(winner => console.log("First to finish:", winner));


// ========== Promise.any() ==========
// Returns result of FIRST promise to SUCCEED.
// Only rejects if ALL fail.
Promise.any([p1, p2, p3])
  .then(firstSuccess => console.log(firstSuccess));
```

```
┌──────────────────────────────────────────────────────┐
│         PROMISE STATIC METHODS COMPARISON             │
│                                                       │
│  Method           Resolves When    Rejects When       │
│  ─────────────────────────────────────────────────    │
│  Promise.all      ALL succeed      ANY fails          │
│  Promise.allSettled ALL settle     NEVER rejects      │
│  Promise.race     FIRST settles   FIRST settles       │
│  Promise.any      FIRST succeeds  ALL fail            │
└──────────────────────────────────────────────────────┘
```

### How to Explain in Interview

> "A Promise represents a future value — it's in one of three states: pending, fulfilled, or rejected. Create with `new Promise((resolve, reject) => {...})`. Consume with `.then()` for success, `.catch()` for error, `.finally()` for cleanup. `.then()` always returns a new Promise, enabling chaining. Key static methods: `Promise.all` (all succeed), `Promise.allSettled` (wait for all regardless), `Promise.race` (first to settle), `Promise.any` (first to succeed)."

### Interview Q&A — Section 15

**Q: What happens if you don't handle a Promise rejection?**
A: `UnhandledPromiseRejectionWarning` in Node.js (will crash in future versions). In browsers, `unhandledrejection` event fires. Always add `.catch()` or use try/catch with await.

**Q: What's the difference between `Promise.all` and `Promise.allSettled`?**
A: `all` short-circuits on first rejection (fails fast). `allSettled` waits for ALL to complete and returns an array of `{status, value/reason}` objects — never rejects.

**Q: Can a Promise be resolved more than once?**
A: No. Once settled (fulfilled or rejected), it's immutable. Calling `resolve()` or `reject()` again has no effect.

**Q: What does `.then()` return?**
A: Always a new Promise. If you return a value, it's wrapped in `Promise.resolve(value)`. If you return a Promise, it's adopted. If you don't return anything, it resolves with `undefined`.

---

# 16. Async/Await

## What is Async/Await?

Async/await is **syntactic sugar over Promises**. It makes async code look and feel like synchronous code — much easier to read and write.

- `async` before a function → the function always returns a Promise
- `await` inside an async function → pauses until the Promise resolves

```javascript
// WITH Promises (.then chains)
function getUserData(id) {
  return fetch(`/api/users/${id}`)
    .then(response => response.json())
    .then(user => fetch(`/api/orders/${user.orderId}`))
    .then(response => response.json())
    .then(order => console.log(order))
    .catch(error => console.error(error));
}

// WITH Async/Await (same thing, much cleaner)
async function getUserData(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    const user = await response.json();

    const orderResponse = await fetch(`/api/orders/${user.orderId}`);
    const order = await orderResponse.json();

    console.log(order);
  } catch (error) {
    console.error(error);
  }
}
```

### Key Rules

```javascript
// 1. 'async' function ALWAYS returns a Promise
async function greet() {
  return "Hello";  // Automatically wrapped in Promise.resolve("Hello")
}
greet().then(msg => console.log(msg)); // "Hello"

// 2. 'await' can ONLY be used inside 'async' function
//    (or at top-level in ES modules)

// 3. 'await' pauses execution of THAT function only
//    (other code keeps running)

// 4. If awaited Promise rejects, it THROWS an error
//    (use try/catch to handle it)
```

### Sequential vs Parallel Execution

```javascript
// ❌ SEQUENTIAL — each waits for the previous one (SLOW)
async function sequential() {
  const user = await fetchUser();      // waits 1 sec
  const posts = await fetchPosts();    // waits 1 sec
  const comments = await fetchComments(); // waits 1 sec
  // Total: ~3 seconds
}

// ✅ PARALLEL — all start at the same time (FAST)
async function parallel() {
  const [user, posts, comments] = await Promise.all([
    fetchUser(),      // starts immediately
    fetchPosts(),     // starts immediately
    fetchComments()   // starts immediately
  ]);
  // Total: ~1 second (all run at same time)
}
```

```
SEQUENTIAL:
fetchUser()    ████████░░░░░░░░░░░░░░░░
fetchPosts()   ░░░░░░░░████████░░░░░░░░
fetchComments()░░░░░░░░░░░░░░░░████████
                                        → 3 seconds total

PARALLEL:
fetchUser()    ████████
fetchPosts()   ████████
fetchComments()████████
                        → 1 second total
```

### Error Handling with Async/Await

```javascript
// Method 1: try/catch (most common)
async function getData() {
  try {
    const data = await riskyOperation();
    return data;
  } catch (error) {
    console.error("Failed:", error.message);
    return null;  // fallback value
  } finally {
    console.log("Cleanup here");  // always runs
  }
}

// Method 2: .catch() on the promise
async function getData() {
  const data = await riskyOperation().catch(err => null);
  // data = result OR null (if failed)
}

// Method 3: Wrapper function (reusable)
async function tryCatch(promise) {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error];
  }
}

const [user, error] = await tryCatch(fetchUser());
if (error) console.log("Failed to fetch user");
```

### How to Explain in Interview

> "async/await is syntactic sugar over Promises. `async` makes a function always return a Promise. `await` pauses the function until the Promise resolves — but only pauses that function, not the whole program. For error handling, wrap `await` in try/catch. For parallel execution, use `Promise.all([await task1, await task2])` instead of sequential `await` calls."

### Deep Dive: Sequential vs Parallel Execution

```
// SEQUENTIAL (slow — 3 seconds total):
const a = await fetch('/api/users');     // 1 sec
const b = await fetch('/api/orders');    // 1 sec (waits for a)
const c = await fetch('/api/products');  // 1 sec (waits for b)

// PARALLEL (fast — 1 second total):
const [a, b, c] = await Promise.all([
    fetch('/api/users'),     // all 3 start
    fetch('/api/orders'),    // at the same time
    fetch('/api/products')   // → only as slow as slowest
]);
```

### Interview Q&A — Section 16

**Q: Does `await` block the main thread?**
A: No! It only pauses the async function. Other code, events, and UI updates continue normally. The rest of the program is not blocked.

**Q: Can you use `await` outside an async function?**
A: Only in ES modules (`<script type="module">` or `.mjs` files) — this is called "top-level await". In regular scripts, you must wrap it in an async function.

**Q: What happens if you `await` a non-Promise value?**
A: It's automatically wrapped in `Promise.resolve(value)`. So `await 42` resolves immediately to `42`.

**Q: What's the best error handling pattern for async/await?**
A: try/catch for most cases. For reusable patterns, use a wrapper function that returns `[data, error]` tuples (Go-style error handling).

---

# 17. Error Handling

## try / catch / finally

```javascript
try {
  // Code that might throw an error
  const data = JSON.parse("invalid json");
} catch (error) {
  // Runs ONLY if an error is thrown in try block
  console.log(error.name);     // "SyntaxError"
  console.log(error.message);  // "Unexpected token i..."
  console.log(error.stack);    // Full stack trace
} finally {
  // ALWAYS runs — success or failure
  // Good for cleanup (closing connections, etc.)
  console.log("Done");
}
```

## Error Types

```
┌─────────────────────────────────────────────────────────┐
│                  BUILT-IN ERROR TYPES                     │
│                                                          │
│  Error          → Base error (generic)                   │
│  SyntaxError    → Invalid code syntax                    │
│  ReferenceError → Variable doesn't exist                 │
│  TypeError      → Wrong type (e.g., calling non-function)│
│  RangeError     → Number out of range                    │
│  URIError       → Invalid URI function usage             │
│  EvalError      → Error in eval() (rare)                 │
└─────────────────────────────────────────────────────────┘
```

```javascript
// Common errors in interviews:
console.log(x);           // ReferenceError: x is not defined
null.property;            // TypeError: Cannot read properties of null
const a = 1; const a = 2; // SyntaxError: already declared
new Array(-1);            // RangeError: Invalid array length

// Custom Error
class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

throw new ValidationError("email", "Invalid email format");
```

### How to Explain in Interview

> "Use try/catch/finally for synchronous errors and async/await errors. `finally` always runs — good for cleanup. JavaScript has 6 built-in error types (SyntaxError, ReferenceError, TypeError, RangeError, URIError, EvalError). Create custom errors by extending the Error class. For global unhandled errors: `window.onerror` for sync, `window.addEventListener('unhandledrejection')` for Promises."

### Deep Dive: Global Error Handlers

```javascript
// Catch ALL unhandled errors (sync):
window.onerror = function(msg, source, line, col, error) {
    console.log("Global error:", msg);
    // return true to suppress default browser error handling
};

// Catch ALL unhandled Promise rejections:
window.addEventListener('unhandledrejection', (event) => {
    console.log("Unhandled rejection:", event.reason);
    event.preventDefault(); // prevents console error
});

// Node.js equivalents:
process.on('uncaughtException', (err) => { /* ... */ });
process.on('unhandledRejection', (reason) => { /* ... */ });
```

### Interview Q&A — Section 17

**Q: What's the difference between `throw new Error("msg")` and `throw "msg"`?**
A: `throw new Error()` includes a stack trace (debugging info). `throw "msg"` is just a string — no stack trace. Always use Error objects.

**Q: Does `finally` run even if there's a `return` in try/catch?**
A: Yes! `finally` ALWAYS runs. If `finally` has a `return`, it overrides the try/catch return value (avoid this!).

**Q: When should you use custom error classes?**
A: When you need to distinguish between error types in catch blocks (e.g., `ValidationError` vs `NetworkError`) — use `instanceof` to check.

---

# 18. ES6+ Features

## Template Literals

**What is it?** A better way to create strings. Use backticks `` ` `` instead of quotes. You can put variables and expressions directly inside using `${}`.

```javascript
const name = "Alice";
const age = 25;

// Old way (string concatenation — messy)
const msg = "Hello, " + name + "! You are " + age + " years old.";

// New way (template literals — clean!)
const msg = `Hello, ${name}! You are ${age} years old.`;

// Can put any expression inside ${}
const msg2 = `Next year you'll be ${age + 1}`;
const msg3 = `Status: ${age >= 18 ? "Adult" : "Minor"}`;

// Multi-line strings (no \n needed!)
const html = `
  <div>
    <h1>${name}</h1>
    <p>Age: ${age}</p>
  </div>
`;

// Tagged templates (advanced — used in libraries like styled-components)
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] ? `**${values[i]}**` : "");
  }, "");
}
const result = highlight`Hello ${name}, you are ${age}`;
// "Hello **Alice**, you are **25**"
```

## Optional Chaining (?.)

**What is it?** A safe way to access nested properties. If any part is `null` or `undefined`, it returns `undefined` instead of throwing an error.

```javascript
const user = {
  name: "Alice",
  address: {
    city: "NYC"
  }
};

// WITHOUT optional chaining (dangerous!)
// user.profile.avatar   ← TypeError! profile is undefined

// WITH optional chaining (safe!)
user.profile?.avatar;     // undefined (no error!)
user.address?.city;       // "NYC"
user.address?.zip;        // undefined

// Works with methods too
user.greet?.();           // undefined (doesn't crash if greet doesn't exist)

// Works with arrays
const users = null;
users?.[0]?.name;         // undefined (no error)

// Practical example
const street = user?.address?.street ?? "No street found";
// Uses nullish coalescing as fallback
```

## Nullish Coalescing (??)

**What is it?** Provides a fallback value, but ONLY for `null` and `undefined` (not for `0`, `""`, or `false`).

```javascript
// Problem with || (OR operator):
const count = 0;
const result = count || 10;  // 10 ← WRONG! 0 is falsy but valid!

// Solution with ?? (nullish coalescing):
const result = count ?? 10;  // 0 ← CORRECT! 0 is not null/undefined

// More examples:
null ?? "default"       // "default"   (null → use default)
undefined ?? "default"  // "default"   (undefined → use default)
0 ?? "default"          // 0           (0 is valid, keep it)
"" ?? "default"         // ""          (empty string is valid, keep it)
false ?? "default"      // false       (false is valid, keep it)
```

```
||  vs  ??  — When each provides the fallback:

           ||  (OR)          ??  (Nullish)
null       → fallback        → fallback
undefined  → fallback        → fallback
0          → fallback        → keeps 0 ✅
""         → fallback        → keeps "" ✅
false      → fallback        → keeps false ✅
NaN        → fallback        → keeps NaN

Use ?? when 0, "", or false are meaningful values.
```

## Symbols

**What is it?** A unique, one-of-a-kind value. No two Symbols are ever the same, even if they have the same description. Used for creating unique property keys.

```javascript
const sym1 = Symbol("id");
const sym2 = Symbol("id");
sym1 === sym2;  // false! Each Symbol is unique

// Use as object property key (won't collide with other keys)
const ID = Symbol("id");
const user = {
  name: "Alice",
  [ID]: 12345      // Symbol as key
};

user[ID];          // 12345
user.ID;           // undefined (not the same!)
Object.keys(user); // ["name"] — Symbols are hidden from loops!

// Well-known Symbols (customize built-in behavior)
class MyArray {
  [Symbol.iterator]() { /* make it iterable */ }
  [Symbol.toPrimitive](hint) { /* control type conversion */ }
}
```

## Map & Set

### Map — Key-Value Pairs (Better than Objects for some uses)

**What is it?** Like an object, but keys can be ANY type (objects, functions, numbers), not just strings.

```javascript
const map = new Map();

// Set key-value pairs
map.set("name", "Alice");       // string key
map.set(42, "forty-two");       // number key
map.set(true, "boolean key");   // boolean key

const obj = { id: 1 };
map.set(obj, "object as key!"); // object key!

// Get values
map.get("name");     // "Alice"
map.get(42);         // "forty-two"
map.get(obj);        // "object as key!"

// Other methods
map.has("name");     // true
map.delete("name");  // removes it
map.size;            // 3 (like length)
map.clear();         // removes all

// Iterate
map.forEach((value, key) => console.log(key, value));
for (const [key, value] of map) { console.log(key, value); }
```

```
Object vs Map:
┌────────────────────┬─────────────────┬──────────────────┐
│ Feature            │ Object          │ Map              │
├────────────────────┼─────────────────┼──────────────────┤
│ Key types          │ String/Symbol   │ ANY type         │
│ Key order          │ Not guaranteed  │ Insertion order  │
│ Size               │ Manual count    │ map.size         │
│ Iteration          │ Not iterable    │ Directly iterable│
│ Performance        │ Slower for      │ Faster for       │
│                    │ frequent adds   │ frequent adds    │
│ JSON support       │ ✅ Yes          │ ❌ No            │
└────────────────────┴─────────────────┴──────────────────┘
```

### Set — Unique Values Only

**What is it?** Like an array, but **every value must be unique**. Adding a duplicate simply does nothing.

```javascript
const set = new Set();

set.add(1);
set.add(2);
set.add(3);
set.add(2);  // Ignored! 2 already exists
set.add(1);  // Ignored!

console.log(set);      // Set {1, 2, 3}
console.log(set.size); // 3

set.has(2);    // true
set.delete(2); // removes 2

// MOST COMMON USE: Remove duplicates from array
const arr = [1, 2, 3, 2, 1, 4, 5, 4];
const unique = [...new Set(arr)];
// unique = [1, 2, 3, 4, 5] ✅
```

## WeakMap & WeakSet

**What is it?** Like Map and Set, but with **weak references** — if the key object has no other references, it gets garbage collected automatically. Great for avoiding memory leaks.

```javascript
// WeakMap — keys must be objects, weakly held
const cache = new WeakMap();

let user = { name: "Alice" };
cache.set(user, "cached data");
cache.get(user);  // "cached data"

user = null;  // Now the entry in WeakMap can be garbage collected!
// No memory leak!

// Use case: Store private data for objects
const privateData = new WeakMap();

class Person {
  constructor(name, secret) {
    privateData.set(this, { secret });
  }
  getSecret() {
    return privateData.get(this).secret;
  }
}
```

## Iterators & Generators

### Iterators

**What is it?** An object that knows how to access items one at a time. It has a `next()` method that returns `{ value, done }`.

```javascript
// Any object with a [Symbol.iterator] method is iterable
const range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    let current = this.from;
    const last = this.to;

    return {
      next() {
        if (current <= last) {
          return { value: current++, done: false };
        }
        return { done: true };
      }
    };
  }
};

for (const num of range) {
  console.log(num);  // 1, 2, 3, 4, 5
}

// Spread also works with iterables
[...range];  // [1, 2, 3, 4, 5]
```

### Generators

**What is it?** A special function that can **pause** and **resume**. Uses `function*` and `yield`. Each `yield` is like a checkpoint — the function pauses there until you call `.next()`.

```javascript
function* countUp() {
  console.log("Starting...");
  yield 1;          // Pause here, return 1
  console.log("Resuming...");
  yield 2;          // Pause here, return 2
  console.log("Almost done...");
  yield 3;          // Pause here, return 3
  console.log("Done!");
}

const gen = countUp();

gen.next(); // "Starting..."     → { value: 1, done: false }
gen.next(); // "Resuming..."     → { value: 2, done: false }
gen.next(); // "Almost done..."  → { value: 3, done: false }
gen.next(); // "Done!"           → { value: undefined, done: true }

// Practical: Infinite sequence
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
fib.next().value; // 0
fib.next().value; // 1
fib.next().value; // 1
fib.next().value; // 2
fib.next().value; // 3
fib.next().value; // 5

// Practical: ID generator
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}
const nextId = idGenerator();
nextId.next().value; // 1
nextId.next().value; // 2
nextId.next().value; // 3
```

## Proxy & Reflect

### Proxy

**What is it?** A wrapper around an object that lets you **intercept and customize** operations like reading, writing, and deleting properties. Like a security guard between you and the object.

```javascript
const person = { name: "Alice", age: 25 };

const proxy = new Proxy(person, {
  // Intercept reading a property
  get(target, property) {
    console.log(`Reading ${property}`);
    return property in target ? target[property] : "Not found";
  },

  // Intercept writing a property
  set(target, property, value) {
    if (property === "age" && typeof value !== "number") {
      throw new TypeError("Age must be a number");
    }
    target[property] = value;
    return true;
  },

  // Intercept 'in' operator
  has(target, property) {
    console.log(`Checking if ${property} exists`);
    return property in target;
  },

  // Intercept delete
  deleteProperty(target, property) {
    if (property === "name") {
      throw new Error("Can't delete name!");
    }
    delete target[property];
    return true;
  }
});

proxy.name;           // "Reading name" → "Alice"
proxy.unknown;        // "Reading unknown" → "Not found"
proxy.age = 30;       // ✅ Works
// proxy.age = "thirty"; // ❌ TypeError: Age must be a number
"name" in proxy;      // "Checking if name exists" → true

// Practical: Validation, logging, default values, data binding
```

## Modules (import/export)

**What is it?** A way to split code into separate files. Each file is a module. You `export` what you want to share and `import` what you need.

```javascript
// ========== math.js (the module) ==========

// Named exports (can have multiple)
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export function subtract(a, b) { return a - b; }

// Default export (only ONE per file)
export default class Calculator {
  multiply(a, b) { return a * b; }
}


// ========== app.js (importing) ==========

// Import named exports (use curly braces, exact names)
import { add, subtract, PI } from "./math.js";
add(2, 3);  // 5

// Import default export (any name, no braces)
import Calculator from "./math.js";
const calc = new Calculator();

// Import everything
import * as MathModule from "./math.js";
MathModule.add(2, 3);
MathModule.PI;

// Rename imports
import { add as sum } from "./math.js";

// Dynamic import (load on demand — returns Promise)
const module = await import("./math.js");
module.add(2, 3);
```

### How to Explain in Interview

> "ES6+ added: `let`/`const` (block scope), arrow functions, template literals, destructuring, spread/rest, classes, Promises, modules, Symbols, Map/Set, iterators/generators, Proxy, optional chaining (`?.`), nullish coalescing (`??`). Key interview topics: optional chaining prevents errors on null/undefined (`obj?.prop?.nested`). Nullish coalescing returns right side only for `null`/`undefined` (not for `0` or `""` like `||` does). Symbols are unique identifiers. Map/Set are better than objects/arrays for certain use cases."

### Interview Q&A — Section 18

**Q: What's the difference between `||` and `??`?**
A: `||` returns right side for ANY falsy value (0, "", false, null, undefined). `??` returns right side ONLY for null/undefined. `0 || 10` = 10, but `0 ?? 10` = 0.

**Q: What is optional chaining?**
A: `obj?.prop` returns `undefined` instead of throwing if `obj` is null/undefined. Works with methods (`obj?.method()`) and arrays (`arr?.[0]`). Short-circuits the entire chain.

**Q: When would you use a Map over an object?**
A: When keys aren't strings (Map allows any type), when you need insertion order, when you frequently add/remove entries, or when you need `.size` property.

**Q: What are Symbols used for?**
A: Creating unique property keys that won't collide with other properties. Used for well-known symbols (`Symbol.iterator`, `Symbol.toPrimitive`) that customize object behavior.

**Q: What are generators?**
A: Functions that can pause and resume (`function*`). They yield values one at a time using `yield`. Called with `.next()`. Used for lazy evaluation, infinite sequences, and custom iterators.

---

# 19. Functional Programming

## Core Concepts

**Functional Programming (FP)** is a style of coding where you:
1. Use **pure functions** (same input = same output, no side effects)
2. Avoid **mutating data** (create new values instead of changing existing ones)
3. Treat **functions as values** (pass them around like data)

### Currying

**What is it?** Transforming a function that takes multiple arguments into a chain of functions, each taking ONE argument.

Think of it like a vending machine: you insert one coin at a time, and only after all coins are in, you get the result.

```javascript
// Normal function
function add(a, b, c) {
  return a + b + c;
}
add(1, 2, 3);  // 6

// Curried version
function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}
curriedAdd(1)(2)(3);  // 6

// Arrow function version (shorter)
const curriedAdd = a => b => c => a + b + c;
curriedAdd(1)(2)(3);  // 6

// WHY is this useful? — Partial application!
const addTen = curriedAdd(10);  // "remember" that a = 10
addTen(5)(3);                   // 18

// Practical: Create reusable functions
const multiply = a => b => a * b;
const double = multiply(2);
const triple = multiply(3);
double(5);   // 10
triple(5);   // 15

// Generic curry utility
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }
    return (...moreArgs) => curried(...args, ...moreArgs);
  };
}

const curriedSum = curry((a, b, c) => a + b + c);
curriedSum(1)(2)(3);   // 6
curriedSum(1, 2)(3);   // 6
curriedSum(1)(2, 3);   // 6
```

### Function Composition

**What is it?** Combining small functions to create a bigger one. The output of one function becomes the input of the next. Like a pipeline.

```javascript
const double = x => x * 2;
const addOne = x => x + 1;
const square = x => x * x;

// Manual composition
const result = square(addOne(double(3)));
// double(3) = 6 → addOne(6) = 7 → square(7) = 49

// Compose utility (right to left)
const compose = (...fns) => x => fns.reduceRight((acc, fn) => fn(acc), x);

const transform = compose(square, addOne, double);
transform(3);  // 49

// Pipe utility (left to right — more readable)
const pipe = (...fns) => x => fns.reduce((acc, fn) => fn(acc), x);

const transform2 = pipe(double, addOne, square);
transform2(3);  // 49

// 3 → double → 6 → addOne → 7 → square → 49
```

```
Pipe visualization:

  3  ──→ [double] ──→  6  ──→ [addOne] ──→  7  ──→ [square] ──→  49
         (x * 2)              (x + 1)               (x * x)
```

### Debounce & Throttle

These control **how often a function runs**. Very common in interviews!

**Debounce:** Wait until the user STOPS doing something, then run once.
Example: Search box — don't search on every keystroke, wait until user stops typing.

**Throttle:** Run at most once every X milliseconds, no matter how many times triggered.
Example: Scroll handler — don't run on every pixel scrolled, run once per 100ms.

```javascript
// ========== DEBOUNCE ==========
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);              // Cancel previous timer
    timer = setTimeout(() => {
      fn.apply(this, args);           // Run after delay
    }, delay);
  };
}

// Usage: Search input
const searchInput = document.getElementById("search");
const handleSearch = debounce((e) => {
  console.log("Searching for:", e.target.value);
  // API call here
}, 300);

searchInput.addEventListener("input", handleSearch);
// Types: "h" "he" "hel" "hell" "hello"
// Only searches for "hello" (after 300ms pause)
```

```
Debounce visualization (delay = 300ms):

User types:  h    e    l    l    o         (stops)
             ↓    ↓    ↓    ↓    ↓
Timer:    [start][reset][reset][reset][start]──→ FIRE!
                                          300ms
Only ONE call happens — after user stops typing
```

```javascript
// ========== THROTTLE ==========
function throttle(fn, limit) {
  let inThrottle = false;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);           // Run immediately
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;           // Allow next call after limit
      }, limit);
    }
  };
}

// Usage: Scroll handler
const handleScroll = throttle(() => {
  console.log("Scroll position:", window.scrollY);
}, 100);

window.addEventListener("scroll", handleScroll);
// Scrolling continuously, but function only runs every 100ms
```

```
Throttle visualization (limit = 100ms):

Events:  ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
         ────────────────────────────────→ time
Runs:    ✓ ✗ ✗ ✗ ✓ ✗ ✗ ✗ ✓ ✗ ✗ ✗ ✓ ✗ ✗
         |←  100ms →|←  100ms →|←  100ms →|

Runs at a steady rate, ignoring extras in between
```

### How to Explain in Interview

> "Functional programming treats functions as first-class citizens — they can be passed as arguments, returned from other functions, and assigned to variables. Key concepts: pure functions (no side effects), immutability (don't mutate, create new), higher-order functions (map/filter/reduce), currying (transform `f(a,b)` into `f(a)(b)`), composition (pipe small functions together). Debounce waits for a pause then runs once (search input). Throttle runs at most once per interval (scroll handler)."

### Interview Q&A — Section 19

**Q: What is currying?**
A: Transforming a function with multiple arguments into a sequence of functions each taking one argument. `add(2, 3)` becomes `add(2)(3)`. Enables partial application — `const add5 = add(5)`.

**Q: What is function composition?**
A: Combining multiple functions where the output of one becomes the input of the next. `compose(f, g)(x)` = `f(g(x))`. `pipe(f, g)(x)` = `g(f(x))` (left-to-right order).

**Q: What's the difference between debounce and throttle?**
A: Debounce: wait until user STOPS, then run once. Throttle: run at most once per interval regardless. Debounce for search input, throttle for scroll/resize.

**Q: What makes a function pure?**
A: (1) Same input always gives same output. (2) No side effects (no mutations, no I/O, no DOM changes, no external state). Benefits: predictable, testable, cacheable.

---

# 20. Design Patterns

## What are Design Patterns?

Design patterns are **reusable solutions to common problems**. Think of them as recipes — proven ways to structure your code.

### Singleton Pattern

**What is it?** Ensures a class has **only ONE instance**. Like having only one president at a time.

```javascript
class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;  // Return existing instance
    }
    this.connection = "Connected!";
    Database.instance = this;    // Store the instance
  }
}

const db1 = new Database();
const db2 = new Database();
console.log(db1 === db2);  // true — same instance!

// Modern approach using modules (module itself is singleton)
// database.js
let instance;
export function getDB() {
  if (!instance) {
    instance = { connection: "Connected!" };
  }
  return instance;
}
```

### Observer Pattern (Pub/Sub)

**What is it?** One object (subject) maintains a list of dependents (observers) and notifies them of changes. Like a YouTube channel — subscribers get notified of new videos.

```javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }

  // Subscribe to an event
  on(event, callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
    return this;  // allow chaining
  }

  // Unsubscribe
  off(event, callback) {
    this.events[event] = this.events[event]?.filter(cb => cb !== callback);
    return this;
  }

  // Notify all subscribers
  emit(event, ...args) {
    this.events[event]?.forEach(callback => callback(...args));
    return this;
  }

  // Subscribe once (auto-unsubscribe after first call)
  once(event, callback) {
    const wrapper = (...args) => {
      callback(...args);
      this.off(event, wrapper);
    };
    this.on(event, wrapper);
    return this;
  }
}

// Usage
const emitter = new EventEmitter();

emitter.on("userLoggedIn", (user) => {
  console.log(`Welcome, ${user}!`);
});

emitter.on("userLoggedIn", (user) => {
  console.log(`Logging activity for ${user}`);
});

emitter.emit("userLoggedIn", "Alice");
// "Welcome, Alice!"
// "Logging activity for Alice"
```

### Factory Pattern

**What is it?** A function that creates and returns objects without using `new` directly. Like a car factory — tell it what you want, it builds it for you.

```javascript
function createUser(type) {
  switch(type) {
    case "admin":
      return { role: "admin", permissions: ["read", "write", "delete"] };
    case "editor":
      return { role: "editor", permissions: ["read", "write"] };
    case "viewer":
      return { role: "viewer", permissions: ["read"] };
    default:
      throw new Error(`Unknown user type: ${type}`);
  }
}

const admin = createUser("admin");
const viewer = createUser("viewer");
```

### Module Pattern

**What is it?** Uses closures to create **private** and **public** members. Like a TV remote — you press buttons (public) but the circuits inside are hidden (private).

```javascript
const ShoppingCart = (function() {
  // Private variables
  let items = [];

  // Private function
  function calculateTotal() {
    return items.reduce((sum, item) => sum + item.price, 0);
  }

  // Public interface (returned object)
  return {
    addItem(item) {
      items.push(item);
    },
    getTotal() {
      return calculateTotal();
    },
    getItems() {
      return [...items];  // Return copy, not reference
    }
  };
})();

ShoppingCart.addItem({ name: "Book", price: 15 });
ShoppingCart.addItem({ name: "Pen", price: 5 });
ShoppingCart.getTotal();  // 20
// ShoppingCart.items     // undefined (private!)
// ShoppingCart.calculateTotal() // error (private!)
```

### How to Explain in Interview

> "Design patterns are reusable solutions to common problems. Key JS patterns: **Singleton** (one instance — config, DB connection), **Observer/PubSub** (event system — one publisher, many subscribers), **Factory** (create objects without specifying exact class), **Module** (IIFE with closure for private state — pre-ES6 modules). React uses Observer (state changes → re-render), Factory (createElement), and Module (hooks) patterns extensively."

### Interview Q&A — Section 20

**Q: What is the Singleton pattern?**
A: Ensures only ONE instance of a class exists. Used for config objects, database connections, caches. In JS: module exports (ES6 modules are singletons by default) or closure with a shared instance.

**Q: What is the Observer pattern?**
A: An object (subject) maintains a list of dependents (observers) and notifies them of state changes. Used in: event listeners, React state management, RxJS, Node.js EventEmitter.

**Q: When would you use the Factory pattern?**
A: When you need to create different objects based on input/conditions, without the caller knowing the exact class. E.g., `createUser("admin")` returns AdminUser, `createUser("viewer")` returns ViewerUser.

---

# 21. Memory Management & Garbage Collection

## How Memory Works in JavaScript

**You don't manage memory manually in JS** — the engine does it automatically using **Garbage Collection (GC)**.

```
Memory Lifecycle:
┌────────────┐      ┌────────────┐      ┌────────────┐
│  ALLOCATE  │ ───→ │    USE     │ ───→ │  RELEASE   │
│            │      │            │      │            │
│ let x = {} │      │ x.name = 1 │      │ GC removes │
│ new Array()│      │ read x.name│      │ when unused │
└────────────┘      └────────────┘      └────────────┘
  (automatic)         (your code)         (automatic)
```

## Mark-and-Sweep Algorithm

**How GC decides what to remove:** Starting from "roots" (global variables, current call stack), it marks everything reachable. Anything NOT marked gets deleted.

```
Mark-and-Sweep:

  ROOT (global)
    │
    ├── obj1 ──→ obj2 ──→ obj3    ← ALL reachable (kept ✅)
    │
    └── obj4                      ← Reachable (kept ✅)

  obj5 ──→ obj6                   ← NOT reachable from root
                                     (garbage collected 🗑️)
```

## Common Memory Leaks

```javascript
// 1. Accidental global variables
function leak() {
  name = "oops";  // Missing 'let/const' → global variable!
}

// 2. Forgotten event listeners
element.addEventListener("click", handler);
// Element removed from DOM but listener still referenced!
// Fix: element.removeEventListener("click", handler);

// 3. Forgotten timers
const timer = setInterval(() => {
  // This keeps running forever!
}, 1000);
// Fix: clearInterval(timer) when no longer needed

// 4. Closures holding references
function outer() {
  const bigData = new Array(1000000);  // Large data
  return function inner() {
    // inner holds reference to bigData even if not using it!
    console.log("hello");
  };
}

// 5. Detached DOM nodes
const elements = [];
function addElement() {
  const div = document.createElement("div");
  document.body.appendChild(div);
  elements.push(div);  // Reference kept even after DOM removal
}
```

### How to Explain in Interview

> "JavaScript uses automatic garbage collection with the Mark-and-Sweep algorithm. The GC starts from 'roots' (global variables, call stack), marks everything reachable, and sweeps (frees) everything unreachable. V8 uses generational GC — new objects in 'young generation' (collected frequently), surviving objects promoted to 'old generation' (collected less often). Common leaks: forgotten timers, event listeners on removed elements, closures holding large objects, global variables, detached DOM nodes."

### Deep Dive: V8 Generational Garbage Collection

```
┌─────────────────────────────────────────────────────────┐
│  V8 Memory Structure:                                    │
│                                                          │
│  YOUNG GENERATION (small, collected often — Scavenge):   │
│  ┌───────────────────────────────────────────────────┐  │
│  │ New objects created here                           │  │
│  │ Most objects die young (temporary variables, etc.) │  │
│  │ Collected every few ms using "Scavenge" algorithm  │  │
│  │ Objects surviving 2 collections → promoted         │  │
│  └───────────────────────────────────────────────────┘  │
│                          │ survived 2x                   │
│                          ▼                               │
│  OLD GENERATION (large, collected rarely — Mark-Sweep):  │
│  ┌───────────────────────────────────────────────────┐  │
│  │ Long-lived objects (closures, cached data, etc.)   │  │
│  │ Collected less frequently (Mark-and-Sweep)         │  │
│  │ Can cause "GC pauses" if too much data             │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### Interview Q&A — Section 21

**Q: How does garbage collection work in JS?**
A: Mark-and-Sweep: GC starts from roots (global scope, call stack), marks all reachable objects, then frees unmarked ones. V8 adds generational GC — new objects collected often, old objects less frequently.

**Q: What are common memory leaks?**
A: (1) Global variables, (2) forgotten setInterval/setTimeout, (3) event listeners on removed DOM elements, (4) closures capturing large objects, (5) detached DOM nodes stored in arrays.

**Q: How do you detect memory leaks?**
A: Chrome DevTools → Memory tab → take heap snapshots → compare. Look for objects that keep growing. The Performance tab shows GC pauses.

---

# 22. Performance Optimization

## Key Techniques

### 1. Avoid Unnecessary Work

```javascript
// ❌ Bad: Creating function inside loop
for (let i = 0; i < 1000; i++) {
  element.addEventListener("click", function() { /* ... */ });
}

// ✅ Good: Create once, reuse
function handleClick() { /* ... */ }
for (let i = 0; i < 1000; i++) {
  element.addEventListener("click", handleClick);
}
```

### 2. Use Appropriate Data Structures

```javascript
// Checking if item exists:
// ❌ Array: O(n) — must check every item
const arr = [1, 2, 3, 4, 5];
arr.includes(3);  // Scans through array

// ✅ Set: O(1) — instant lookup
const set = new Set([1, 2, 3, 4, 5]);
set.has(3);  // Instant!

// Key-value lookups:
// ❌ Array of objects: O(n)
const users = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];
users.find(u => u.id === 2);  // Scans through array

// ✅ Map: O(1)
const userMap = new Map([[1, "Alice"], [2, "Bob"]]);
userMap.get(2);  // Instant!
```

### 3. Lazy Loading

```javascript
// Load code only when needed
const heavyModule = await import("./heavyModule.js");

// Intersection Observer — load images when visible
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;  // Load actual image
      observer.unobserve(img);
    }
  });
});
```

### 4. Web Workers

**What is it?** Run heavy JavaScript in a **background thread** so the main thread (UI) stays smooth.

```javascript
// main.js
const worker = new Worker("worker.js");
worker.postMessage({ data: bigArray });

worker.onmessage = (event) => {
  console.log("Result:", event.data);
};

// worker.js
self.onmessage = (event) => {
  const result = heavyComputation(event.data);
  self.postMessage(result);
};
```

### How to Explain in Interview

> "Key optimizations: avoid layout thrashing (batch DOM reads/writes), use DocumentFragment for multiple DOM insertions, debounce/throttle event handlers, lazy load images with IntersectionObserver, use Web Workers for heavy computation, prefer CSS animations over JS, minimize DOM access (cache references), use `requestAnimationFrame` for visual updates."

### Interview Q&A — Section 22

**Q: What is lazy loading?**
A: Deferring resource loading until needed. Images load when they enter the viewport (IntersectionObserver), code loads on demand (dynamic `import()`), data loads on scroll (infinite scroll).

**Q: What are Web Workers?**
A: Background threads for heavy computation. They run in parallel with the main thread, communicating via `postMessage`. They can't access DOM — only the main thread can.

**Q: What is layout thrashing?**
A: Reading and writing DOM properties alternately in a loop, forcing the browser to recalculate layout repeatedly. Fix: batch all reads first, then all writes, or use `requestAnimationFrame`.

**Q: What are Core Web Vitals?**
A: Google's UX metrics: LCP (Largest Contentful Paint — loading), FID/INP (First Input Delay/Interaction to Next Paint — interactivity), CLS (Cumulative Layout Shift — visual stability).

---

# 23. DOM & Browser APIs

## DOM (Document Object Model)

**What is it?** The browser converts your HTML into a **tree of objects** called the DOM. JavaScript can read and change this tree to update the page.

```
HTML:                          DOM Tree:
<html>                         document
  <body>                         └── html
    <h1>Hello</h1>                    └── body
    <p>World</p>                           ├── h1
  </body>                                  │    └── "Hello"
</html>                                    └── p
                                                └── "World"
```

### Selecting Elements

```javascript
// By ID (returns ONE element)
document.getElementById("myId");

// By CSS selector (returns FIRST match)
document.querySelector(".myClass");
document.querySelector("#myId > .child");

// By CSS selector (returns ALL matches — NodeList)
document.querySelectorAll("p.highlight");

// By class name (returns HTMLCollection — live)
document.getElementsByClassName("myClass");

// By tag name
document.getElementsByTagName("p");
```

### Manipulating Elements

```javascript
const el = document.querySelector("#myElement");

// Content
el.textContent = "New text";       // Text only (safe)
el.innerHTML = "<b>Bold text</b>"; // Parses HTML (XSS risk!)

// Attributes
el.setAttribute("data-id", "123");
el.getAttribute("data-id");        // "123"
el.removeAttribute("data-id");

// Styles
el.style.color = "red";
el.style.backgroundColor = "blue";
el.classList.add("active");
el.classList.remove("active");
el.classList.toggle("active");
el.classList.contains("active");    // true/false

// Create and add elements
const div = document.createElement("div");
div.textContent = "New element";
document.body.appendChild(div);
document.body.removeChild(div);
```

## Event Handling

### Event Bubbling & Capturing

**What is it?** When you click an element, the event travels through the DOM in two phases:
1. **Capturing** — from the top (document) DOWN to the target
2. **Bubbling** — from the target back UP to the top

```
Click on <button>:

CAPTURING PHASE (top → down):     BUBBLING PHASE (bottom → up):
     document                           document
       │                                   ↑
       ▼                                   │
      html                               html
       │                                   ↑
       ▼                                   │
      body                               body
       │                                   ↑
       ▼                                   │
      div                                div
       │                                   ↑
       ▼                                   │
    button  ← TARGET                    button  ← TARGET
```

```javascript
// By default, listeners run in BUBBLING phase
parent.addEventListener("click", () => {
  console.log("Parent clicked");  // Runs SECOND
});

child.addEventListener("click", () => {
  console.log("Child clicked");   // Runs FIRST
});

// Click child → "Child clicked" then "Parent clicked" (bubbles up)

// To listen during CAPTURING phase (third argument = true)
parent.addEventListener("click", () => {
  console.log("Parent (capture)");  // Runs FIRST
}, true);

// Stop event from bubbling up
child.addEventListener("click", (e) => {
  e.stopPropagation();  // Parent handler won't run
});

// Prevent default behavior (e.g., form submit, link navigation)
link.addEventListener("click", (e) => {
  e.preventDefault();  // Doesn't navigate
});
```

### Event Delegation

**What is it?** Instead of adding listeners to many child elements, add ONE listener to the parent. The event bubbles up, and you check which child was clicked.

**Why?** Better performance (fewer listeners), works for dynamically added elements.

```javascript
// ❌ Bad: Listener on every button
document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", handleClick);
});

// ✅ Good: One listener on parent
document.getElementById("buttonContainer").addEventListener("click", (e) => {
  if (e.target.matches("button")) {
    console.log("Button clicked:", e.target.textContent);
  }
});
// Works even for buttons added later!
```

## Web Storage

```javascript
// ========== localStorage (persists forever until cleared) ==========
localStorage.setItem("name", "Alice");
localStorage.getItem("name");        // "Alice"
localStorage.removeItem("name");
localStorage.clear();                // Remove all

// Store objects (must stringify)
localStorage.setItem("user", JSON.stringify({ name: "Alice", age: 25 }));
const user = JSON.parse(localStorage.getItem("user"));

// ========== sessionStorage (cleared when tab closes) ==========
sessionStorage.setItem("temp", "data");
// Same API as localStorage
```

```
localStorage vs sessionStorage vs Cookies:
┌──────────────┬──────────────┬──────────────┬──────────────┐
│ Feature      │ localStorage │sessionStorage│   Cookies    │
├──────────────┼──────────────┼──────────────┼──────────────┤
│ Capacity     │ ~5-10 MB     │ ~5-10 MB     │ ~4 KB        │
│ Expires      │ Never        │ Tab close    │ Configurable │
│ Sent to      │ No           │ No           │ Yes (every   │
│ server?      │              │              │ request!)    │
│ Accessible   │ Same origin  │ Same tab +   │ Same origin  │
│              │              │ origin       │              │
└──────────────┴──────────────┴──────────────┴──────────────┘
```

### How to Explain in Interview

> "The DOM is the browser's in-memory tree of HTML elements as objects. Select elements with `getElementById` (fastest), `querySelector` (CSS selectors), `querySelectorAll` (all matches, static NodeList). Events propagate in 3 phases: Capturing (top→down), Target, Bubbling (bottom→up). Event delegation places ONE listener on a parent to handle all children — works for dynamic elements too. `localStorage` persists forever, `sessionStorage` clears on tab close, cookies are sent to server with every request."

### Deep Dive: IntersectionObserver & MutationObserver

```javascript
// IntersectionObserver — detect when element enters/exits viewport
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");  // animate in
        }
    });
}, { threshold: 0.5 });  // 50% visible
observer.observe(document.querySelector(".section"));

// MutationObserver — watch for DOM changes
const mutObserver = new MutationObserver((mutations) => {
    mutations.forEach(m => {
        console.log("DOM changed:", m.type, m.target);
    });
});
mutObserver.observe(document.body, {
    childList: true,   // watch for added/removed children
    subtree: true,     // watch entire subtree
    attributes: true   // watch attribute changes
});
```

### Interview Q&A — Section 23

**Q: What's the difference between event.target and event.currentTarget?**
A: `target` = the element that TRIGGERED the event (what was clicked). `currentTarget` = the element with the event listener. They differ when event bubbles from child to parent.

**Q: What is event delegation?**
A: Attaching ONE listener on a parent instead of individual listeners on each child. Uses event bubbling — check `e.target` to identify which child was clicked. Works for dynamically added elements.

**Q: What's the difference between localStorage and sessionStorage?**
A: Both store key-value strings (~5-10MB). `localStorage` persists forever (until explicitly cleared). `sessionStorage` is cleared when the tab/window closes.

**Q: What is `e.preventDefault()` vs `e.stopPropagation()`?**
A: `preventDefault` stops default browser behavior (form submit reload, link navigation). `stopPropagation` stops event from bubbling/capturing further. Different purposes — can use both together.

---

# 24. Tricky Interview Output Questions

## Question 1: var in loop + setTimeout

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}
// Output: 3, 3, 3
// WHY: var is function-scoped. By the time setTimeout runs,
//      the loop is done and i = 3. All callbacks share the same i.
// FIX: Use 'let' instead of 'var'
```

## Question 2: == vs ===

```javascript
console.log([] == false);     // true
console.log([] == ![]);       // true  ← WHAT?!
console.log({} == !{});       // false

// Explanation for [] == ![]:
// Step 1: ![] = false ([] is truthy, !truthy = false)
// Step 2: [] == false
// Step 3: [] → "" → 0, false → 0
// Step 4: 0 == 0 → true
```

## Question 3: typeof and null

```javascript
console.log(typeof null);         // "object" (famous bug!)
console.log(typeof undefined);    // "undefined"
console.log(typeof NaN);          // "number"
console.log(null == undefined);   // true
console.log(null === undefined);  // false
console.log(NaN === NaN);         // false
console.log(NaN == NaN);          // false

// How to check for NaN:
Number.isNaN(NaN);  // true
Number.isNaN("hello"); // false (better than isNaN())
isNaN("hello");     // true (converts to number first — misleading!)
```

## Question 4: Object references

```javascript
const a = { name: "Alice" };
const b = a;          // b points to SAME object
b.name = "Bob";
console.log(a.name);  // "Bob" ← Changed!

const c = { name: "Alice" };
const d = { name: "Alice" };
console.log(c === d); // false ← Different objects in memory!
console.log(c == d);  // false ← Same result, no coercion for objects
```

## Question 5: Hoisting

```javascript
console.log(a);   // undefined (var hoisted)
console.log(b);   // ReferenceError (let — TDZ)
console.log(c());  // "Hello!" (function fully hoisted)

var a = 1;
let b = 2;
function c() { return "Hello!"; }
```

## Question 6: IIFE and Closure

```javascript
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(() => console.log(j), 0);
  })(i);
}
// Output: 0, 1, 2
// IIFE creates a new scope each time, capturing current i as j
```

## Question 7: Promise execution order

```javascript
console.log("A");

setTimeout(() => console.log("B"), 0);

Promise.resolve().then(() => {
  console.log("C");
  setTimeout(() => console.log("D"), 0);
}).then(() => console.log("E"));

console.log("F");

// Output: A, F, C, E, B, D
// A, F → synchronous
// C, E → microtasks (promises — high priority)
// B, D → macrotasks (setTimeout — low priority)
```

## Question 8: this in arrow vs regular

```javascript
const obj = {
  value: 42,
  getValue: function() { return this.value; },
  getValueArrow: () => this.value
};

console.log(obj.getValue());      // 42 (this = obj)
console.log(obj.getValueArrow()); // undefined (this = global/window)
```

## Question 9: Closures with let

```javascript
function createFunctions() {
  let fns = [];
  for (let i = 0; i < 3; i++) {
    fns.push(() => i);
  }
  return fns;
}
const fns = createFunctions();
console.log(fns[0]()); // 0
console.log(fns[1]()); // 1
console.log(fns[2]()); // 2
// let creates a new binding per iteration
```

## Question 10: Prototype chain

```javascript
function Animal() {}
Animal.prototype.speak = function() { return "..."; };

function Dog() {}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.speak = function() { return "Woof!"; };

const dog = new Dog();
console.log(dog.speak());                // "Woof!"
console.log(dog instanceof Dog);         // true
console.log(dog instanceof Animal);      // true
console.log(dog.constructor === Dog);    // false! (constructor not fixed)
// Fix: Dog.prototype.constructor = Dog;
```

## Question 11: async/await order

```javascript
async function foo() {
  console.log("foo start");
  await bar();
  console.log("foo end");  // This runs as microtask after bar
}

async function bar() {
  console.log("bar");
}

console.log("start");
foo();
console.log("end");

// Output: start → foo start → bar → end → foo end
// "foo end" is after "end" because await puts it in microtask queue
```

## Question 12: Type coercion madness

```javascript
console.log(1 + "2");       // "12" (number → string)
console.log("5" - 3);       // 2   (string → number)
console.log(true + true);   // 2   (true = 1, 1 + 1 = 2)
console.log("5" + + "3");   // "53" (+ "3" = 3, then "5" + 3 = "53")
console.log(+"");            // 0   (empty string → 0)
console.log(+[]);            // 0   ([] → "" → 0)
console.log(+{});            // NaN (object → NaN)
console.log([] + {});        // "[object Object]"
console.log({} + []);        // 0 (in console) or "[object Object]" (in code)
```

---

# Quick Reference Cheatsheet

```
┌─────────────────────────────────────────────────────────┐
│              JAVASCRIPT CHEATSHEET                       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  VARIABLES:  let/const (block), var (function)           │
│  TYPES:      string, number, boolean, null, undefined,   │
│              symbol, bigint, object                      │
│                                                          │
│  == vs ===:  Always use === (no coercion)                 │
│  ?? vs ||:   ?? only for null/undefined                   │
│  ?.:         Safe property access (no crash)              │
│                                                          │
│  SCOPE:      Global > Function > Block                    │
│  HOISTING:   var=undefined, let/const=TDZ, func=full     │
│  CLOSURE:    Function + its outer scope                   │
│                                                          │
│  this:       new > call/apply/bind > obj.method > default │
│  Arrow fn:   Lexical this, no arguments, can't new       │
│                                                          │
│  PROTO:      obj.__proto__ → Constructor.prototype        │
│                → Object.prototype → null                  │
│                                                          │
│  ASYNC:      callback → Promise → async/await             │
│  EVENT LOOP: sync → microtasks → macrotask → repeat       │
│  PROMISE:    .all .allSettled .race .any                   │
│                                                          │
│  ARRAY:      map filter reduce find some every            │
│  SPREAD:     [...arr]  { ...obj }  (unpack)               │
│  REST:       function(...args)  [first, ...rest] (gather) │
│  DESTRUCT:   const { a, b } = obj   const [x, y] = arr   │
│                                                          │
│  PATTERNS:   Singleton, Observer, Factory, Module         │
│  FP:         Curry, Compose, Debounce, Throttle           │
│  DOM:        querySelector, addEventListener, delegation  │
└─────────────────────────────────────────────────────────┘
```

---

# 25. Tricky JavaScript Questions (Extended)

These are the kind of questions interviewers love to ask. Each one tests a specific JS concept. Read the code, guess the output, then check the answer and explanation.

---

## Category 1: Type Coercion Tricks

### Q1: What does `+` do with different types?

```javascript
console.log(1 + "2" + "2");    // ?
console.log(1 + +"2" + "2");   // ?
console.log(1 + -"1" + "2");   // ?
console.log(+"1" + "1" + "2"); // ?
console.log("A" - "B" + "2");  // ?
console.log("A" - "B" + 2);   // ?
```

**Answers:**
```
"122"     → 1 + "2" = "12", "12" + "2" = "122"
"32"      → +"2" = 2 (unary +), 1 + 2 = 3, 3 + "2" = "32"
"02"      → -"1" = -1 (unary -), 1 + (-1) = 0, 0 + "2" = "02"
"112"     → +"1" = 1, 1 + "1" = "11", "11" + "2" = "112"
"NaN2"    → "A" - "B" = NaN (can't subtract strings), NaN + "2" = "NaN2"
NaN       → "A" - "B" = NaN, NaN + 2 = NaN (number + NaN = NaN)
```

**Simple Rule:**
- `+` with a string → concatenation (joins as text)
- `-` always → converts to number first
- Unary `+` or `-` before a value → converts it to number

---

### Q2: Comparing weird values

```javascript
console.log(3 > 2 > 1);   // ?
console.log(1 < 2 < 3);   // ?
console.log(1 < 2 < 1);   // ?
```

**Answers:**
```
false    → (3 > 2) = true, then true > 1 = 1 > 1 = false
true     → (1 < 2) = true, then true < 3 = 1 < 3 = true
true     → (1 < 2) = true, then true < 1 = 1 < 1 = false... WAIT!
```

Actually: `1 < 2 < 1` → `true < 1` → `1 < 1` → `false`

Let me correct:
```
3 > 2 > 1  → true > 1  → 1 > 1  → false
1 < 2 < 3  → true < 3  → 1 < 3  → true
1 < 2 < 1  → true < 1  → 1 < 1  → false
```

**Simple Explanation:** JS compares left to right. The first comparison gives `true` or `false`. Then `true` becomes `1` and `false` becomes `0` for the next comparison.

---

### Q3: Equality nightmares

```javascript
console.log(false == "");      // ?
console.log(false == []);      // ?
console.log(false == {});      // ?
console.log("" == 0);          // ?
console.log("" == []);         // ?
console.log("" == {});         // ?
console.log(0 == []);          // ?
console.log(0 == {});          // ?
console.log(0 == null);        // ?
console.log(0 == undefined);   // ?
console.log(null == undefined);// ?
```

**Answers:**
```
true      → false → 0, "" → 0, so 0 == 0
true      → false → 0, [] → "" → 0, so 0 == 0
false     → false → 0, {} → "[object Object]" → NaN, 0 != NaN
true      → "" → 0, so 0 == 0
true      → [] → "", so "" == ""
false     → {} → "[object Object]", "" != "[object Object]"
true      → [] → "" → 0, so 0 == 0
false     → {} → NaN, 0 != NaN
false     → null only equals undefined (special rule!)
false     → null only equals undefined (special rule!)
true      → null == undefined is true by specification
```

**Simple Rule:** `null` only equals `undefined` and nothing else. For everything else, JS converts both sides to numbers.

---

### Q4: The plus operator with objects

```javascript
console.log([] + []);       // ?
console.log([] + {});       // ?
console.log({} + []);       // ?
console.log({} + {});       // ?
console.log([] + null);     // ?
console.log("foo" + + "bar"); // ?
```

**Answers:**
```
""                  → both [] become "", so "" + "" = ""
"[object Object]"   → [] → "", {} → "[object Object]"
0 (in console)      → {} treated as empty block, + [] = +("") = 0
                      In code: "[object Object][object Object]"
"[object Object][object Object]"
"null"              → [] → "", "" + null = "" + "null" = "null"
"fooNaN"            → +"bar" = NaN, "foo" + NaN = "fooNaN"
```

**Simple Explanation:** When `+` sees objects, it calls `.toString()` on them.
- `[].toString()` → `""` (empty string)
- `{}.toString()` → `"[object Object]"`

---

## Category 2: Scope & Closure Tricks

### Q5: What gets logged?

```javascript
var a = 1;
function foo() {
  console.log(a);   // ?
  var a = 2;
  console.log(a);   // ?
}
foo();
console.log(a);      // ?
```

**Answer:** `undefined`, `2`, `1`

**Simple Explanation:**
```
Inside foo(), 'var a' is hoisted to top of function:

function foo() {
  var a;              // hoisted — a = undefined
  console.log(a);     // undefined
  a = 2;              // now a = 2
  console.log(a);     // 2
}

The outer 'a = 1' is never touched because foo has its own 'a'.
```

---

### Q6: Closure in a loop (the classic!)

```javascript
var funcs = [];
for (var i = 0; i < 5; i++) {
  funcs.push(function() {
    return i;
  });
}

console.log(funcs[0]()); // ?
console.log(funcs[1]()); // ?
console.log(funcs[4]()); // ?
```

**Answer:** `5`, `5`, `5`

**Simple Explanation:**
```
All 5 functions share the SAME variable 'i' (because var is function-scoped).
By the time you call them, the loop is done and i = 5.

It's like 5 people all looking at the SAME clock.
When they check later, they all see the same time.

Fix with let:
for (let i = 0; i < 5; i++) { ... }
// Each iteration gets its own 'i' → 0, 1, 2, 3, 4
```

---

### Q7: Nested function scope

```javascript
function outer() {
  var x = 10;
  function inner() {
    var y = 20;
    console.log(x + y);  // ?
  }
  inner();
  console.log(x);         // ?
  console.log(y);          // ?
}
outer();
```

**Answer:** `30`, `10`, `ReferenceError: y is not defined`

**Simple Explanation:**
- `inner()` can see `x` from parent scope → 10 + 20 = 30
- `x` is in `outer()` scope → accessible → 10
- `y` is in `inner()` scope → NOT accessible from `outer()` → Error!

**Rule:** Child can see parent's variables. Parent CANNOT see child's variables.

---

### Q8: Block scope with let

```javascript
let x = 1;

if (true) {
  let x = 2;
  console.log(x);   // ?
}

console.log(x);      // ?
```

**Answer:** `2`, `1`

**Simple Explanation:** `let` is block-scoped. The `x = 2` inside the if-block is a completely different variable. It doesn't affect the outer `x`.

---

### Q9: IIFE vs Block scope

```javascript
(function() {
  var a = b = 3;
})();

console.log(typeof a);  // ?
console.log(typeof b);  // ?
```

**Answer:** `"undefined"`, `"number"`

**Simple Explanation:**
```
var a = b = 3; is actually:
  b = 3;     ← No var/let/const! This becomes GLOBAL!
  var a = b; ← a is local to the IIFE (function-scoped)

After IIFE runs:
  a → doesn't exist outside IIFE → typeof = "undefined"
  b → is global (leaked!) → typeof = "number"
```

---

## Category 3: `this` Keyword Tricks

### Q10: Method extraction

```javascript
const user = {
  name: "Alice",
  greet() {
    return `Hello, ${this.name}`;
  }
};

const greet = user.greet;
console.log(user.greet());  // ?
console.log(greet());        // ?
```

**Answer:** `"Hello, Alice"`, `"Hello, undefined"`

**Simple Explanation:**
- `user.greet()` → called on `user` object, so `this` = `user` → "Alice"
- `greet()` → extracted and called alone, `this` = `global/window` → no `name` → `undefined`

**Think of it like this:** The dot (.) before the method decides what `this` is. No dot = no object = global.

---

### Q11: Arrow function `this`

```javascript
const obj = {
  name: "Alice",
  regular: function() {
    return function() {
      return this.name;
    };
  },
  arrow: function() {
    return () => {
      return this.name;
    };
  }
};

console.log(obj.regular()());  // ?
console.log(obj.arrow()());    // ?
```

**Answer:** `undefined`, `"Alice"`

**Simple Explanation:**
```
obj.regular()():
  Step 1: obj.regular() returns a regular function
  Step 2: That function is called alone (no dot) → this = global
  → this.name = undefined

obj.arrow()():
  Step 1: obj.arrow() returns an arrow function
  Step 2: Arrow function inherits this from where it was created
  Step 3: It was created inside arrow(), where this = obj
  → this.name = "Alice"
```

---

### Q12: setTimeout and this

```javascript
const obj = {
  name: "Alice",
  greet() {
    console.log(`Hi, ${this.name}`);
  }
};

setTimeout(obj.greet, 100);  // ?
```

**Answer:** `"Hi, undefined"`

**Simple Explanation:** `setTimeout` receives the function and calls it later WITHOUT the object. It's like extracting the method — `this` becomes `global/window`.

**Fixes:**
```javascript
setTimeout(() => obj.greet(), 100);       // ✅ Arrow wraps the call
setTimeout(obj.greet.bind(obj), 100);     // ✅ bind locks this = obj
```

---

### Q13: new keyword overrides this

```javascript
function Person(name) {
  this.name = name;
  this.greet = () => `Hi, ${this.name}`;
}

const alice = new Person("Alice");
const greet = alice.greet;

console.log(greet());  // ?
```

**Answer:** `"Hi, Alice"`

**Simple Explanation:** The arrow function was created inside the constructor when `this` = the new object (alice). Arrow functions permanently capture `this` from where they're created. Even after extraction, it still points to alice.

---

## Category 4: Hoisting Tricks

### Q14: Function declaration vs expression

```javascript
console.log(foo());  // ?
console.log(bar());  // ?

function foo() { return "foo"; }
var bar = function() { return "bar"; };
```

**Answer:** `"foo"`, `TypeError: bar is not a function`

**Simple Explanation:**
```
After hoisting, the code looks like this:

function foo() { return "foo"; }  // ← Fully hoisted!
var bar;                           // ← Only declaration hoisted (undefined)

console.log(foo());  // "foo" ✅ (function exists)
console.log(bar());  // TypeError! ❌ (bar is undefined, not a function)

bar = function() { return "bar"; };  // ← Assignment happens here
```

---

### Q15: Variable and function with same name

```javascript
var x = 1;
function x() { return 2; }
console.log(typeof x);  // ?
```

**Answer:** `"number"`

**Simple Explanation:**
```
During hoisting:
1. function x is hoisted first (fully)
2. var x is hoisted but since x already exists, it's ignored
3. Then x = 1 runs (assignment overwrites function)

Final result: x = 1 (a number)
```

---

### Q16: Hoisting in conditionals

```javascript
function test() {
  console.log(a);  // ?
  console.log(foo()); // ?

  var a = 1;
  function foo() { return 2; }
}
test();
```

**Answer:** `undefined`, `2`

**Simple Explanation:**
- `var a` → hoisted as `undefined` → prints `undefined`
- `function foo` → fully hoisted → can be called → returns `2`

---

## Category 5: Async Tricks

### Q17: setTimeout with 0 delay

```javascript
console.log("start");

setTimeout(() => {
  console.log("timeout");
}, 0);

console.log("end");
```

**Answer:** `"start"`, `"end"`, `"timeout"`

**Simple Explanation:** Even with `0` delay, `setTimeout` puts the callback in the **macrotask queue**. All synchronous code runs first. The Event Loop only checks the queue after the call stack is empty.

```
Call Stack:     log("start") → log("end") → (empty)
                                                ↓
Queue:          timeout callback ─────────→ log("timeout")
```

---

### Q18: Promise vs setTimeout priority

```javascript
setTimeout(() => console.log(1), 0);

new Promise((resolve) => {
  console.log(2);        // Sync! Promise constructor runs immediately
  resolve();
}).then(() => console.log(3));

console.log(4);
```

**Answer:** `2`, `4`, `3`, `1`

**Simple Explanation:**
```
Step 1 - Sync code runs:
  setTimeout → puts callback in macrotask queue
  new Promise → constructor runs NOW → prints 2
  .then → puts callback in microtask queue
  console.log(4) → prints 4

Step 2 - Microtasks run (Promises):
  prints 3

Step 3 - Macrotasks run (setTimeout):
  prints 1

Order: 2 → 4 → 3 → 1
```

**Key Insight:** The Promise constructor `new Promise((resolve) => { ... })` runs **synchronously**! Only `.then()` is async.

---

### Q19: Chained promises

```javascript
Promise.resolve(1)
  .then(x => x + 1)      // ?
  .then(x => { x + 1 })  // ?  ← CAREFUL!
  .then(x => console.log(x));
```

**Answer:** `undefined`

**Simple Explanation:**
```
Step 1: resolve(1)          → x = 1
Step 2: x => x + 1          → returns 2
Step 3: x => { x + 1 }      → returns undefined! (NO return keyword!)
        Curly braces = function body, NOT implicit return
Step 4: x => console.log(x) → prints undefined
```

**Fix:** Either `x => x + 1` (no braces) or `x => { return x + 1 }` (with return).

---

### Q20: async/await execution order

```javascript
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
}

console.log("script start");
async1();
console.log("script end");
```

**Answer:**
```
"script start"
"async1 start"
"async2"
"script end"
"async1 end"
```

**Simple Explanation:**
```
1. "script start"      → sync code
2. async1() is called:
   - "async1 start"    → sync code inside async1
   - await async2()    → calls async2
   - "async2"          → sync code inside async2
   - Everything AFTER await goes to microtask queue
3. "script end"        → sync code continues
4. "async1 end"        → microtask runs now (stack is empty)
```

**Think of `await` like this:** Everything BEFORE await runs immediately. Everything AFTER await goes to the microtask queue.

---

## Category 6: Object & Array Tricks

### Q21: Object key coercion

```javascript
const obj = {};
const a = { key: "a" };
const b = { key: "b" };

obj[a] = "value A";
obj[b] = "value B";

console.log(obj[a]);  // ?
```

**Answer:** `"value B"`

**Simple Explanation:**
```
Object keys must be strings or symbols. When you use an object as key,
JS calls .toString() on it:

{ key: "a" }.toString() → "[object Object]"
{ key: "b" }.toString() → "[object Object]"

Both keys become THE SAME string! So:
obj["[object Object]"] = "value A"
obj["[object Object]"] = "value B"  ← overwrites!

console.log(obj[a]) → obj["[object Object]"] → "value B"
```

---

### Q22: Array comparison

```javascript
const a = [1, 2, 3];
const b = [1, 2, 3];

console.log(a == b);   // ?
console.log(a === b);  // ?

const c = a;
console.log(a == c);   // ?
console.log(a === c);  // ?
```

**Answer:** `false`, `false`, `true`, `true`

**Simple Explanation:** Arrays are objects. Comparing objects checks if they're the **same object in memory**, not if they have the same content.

```
a ──→ [1,2,3] at address 0x01
b ──→ [1,2,3] at address 0x02    ← different object!
c ──→ [1,2,3] at address 0x01    ← same as a!

a == b  → 0x01 != 0x02 → false
a == c  → 0x01 == 0x01 → true
```

---

### Q23: Array sort surprise

```javascript
console.log([10, 9, 8, 2, 1].sort());     // ?
console.log([1, 30, 4, 21, 100].sort());   // ?
```

**Answer:**
```
[1, 10, 2, 8, 9]
[1, 100, 21, 30, 4]
```

**Simple Explanation:** Default `sort()` converts everything to **strings** and sorts alphabetically!
- `"10"` comes before `"2"` because `"1"` < `"2"` (first character)
- `"100"` comes before `"21"` because `"1"` < `"2"`

**Fix:** Always pass a compare function: `.sort((a, b) => a - b)`

---

### Q24: Array holes

```javascript
const arr = [1, , 3];   // Hole at index 1
console.log(arr.length);          // ?
console.log(arr[1]);              // ?
console.log(1 in arr);            // ?

const arr2 = [1, undefined, 3];
console.log(arr2.length);        // ?
console.log(arr2[1]);            // ?
console.log(1 in arr2);          // ?
```

**Answer:**
```
3              → length counts the hole
undefined      → accessing hole gives undefined
false          → the hole doesn't actually exist! (no key "1")

3              → same length
undefined      → explicitly set to undefined
true           → key "1" exists (it has a value: undefined)
```

**Simple Explanation:** A hole means the slot is empty — it doesn't even exist. `undefined` as a value means the slot exists but holds `undefined`. Subtle but important difference!

---

## Category 7: Prototype & Class Tricks

### Q25: Constructor return value

```javascript
function Dog(name) {
  this.name = name;
}

function Cat(name) {
  this.name = name;
  return { name: "Not a cat" };  // Returns an object!
}

function Bird(name) {
  this.name = name;
  return "Not a bird";  // Returns a primitive
}

console.log(new Dog("Rex").name);   // ?
console.log(new Cat("Kitty").name); // ?
console.log(new Bird("Tweety").name); // ?
```

**Answer:** `"Rex"`, `"Not a cat"`, `"Tweety"`

**Simple Explanation:**
```
When using 'new':
- If constructor returns an OBJECT → that object is used (overrides this)
- If constructor returns a PRIMITIVE → ignored! this is used

Dog   → returns nothing → uses this → this.name = "Rex"
Cat   → returns { name: "Not a cat" } → object overrides this!
Bird  → returns "Not a bird" (string = primitive) → ignored → uses this
```

---

### Q26: instanceof with prototype chain

```javascript
function A() {}
function B() {}
B.prototype = Object.create(A.prototype);

const b = new B();

console.log(b instanceof B);         // ?
console.log(b instanceof A);         // ?
console.log(b instanceof Object);    // ?

B.prototype = {};  // Reset prototype!

console.log(b instanceof B);         // ?
console.log(b instanceof A);         // ?
```

**Answer:** `true`, `true`, `true`, `false`, `true`

**Simple Explanation:**
```
Before reset:
b.__proto__ → old B.prototype → A.prototype → Object.prototype
So b is instance of B ✅, A ✅, Object ✅

After B.prototype = {} (new object):
b.__proto__ still points to OLD B.prototype
But instanceof checks against the CURRENT B.prototype
b.__proto__ !== new B.prototype → false!
b.__proto__ chain still has A.prototype → true!
```

---

## Category 8: Miscellaneous Brain Teasers

### Q27: delete operator

```javascript
var x = 1;
let y = 2;
const z = 3;
w = 4;  // No declaration keyword

console.log(delete x);  // ?
console.log(delete y);  // ?
console.log(delete z);  // ?
console.log(delete w);  // ?
```

**Answer:** `false`, `false`, `false`, `true`

**Simple Explanation:**
- `delete` only works on **object properties**
- `var`, `let`, `const` create non-deletable bindings → `delete` returns false
- `w = 4` without keyword creates a property on global object → CAN be deleted

---

### Q28: String is immutable

```javascript
let str = "hello";
str[0] = "H";
console.log(str);  // ?

let str2 = "hello";
str2 = "H" + str2.slice(1);
console.log(str2); // ?
```

**Answer:** `"hello"`, `"Hello"`

**Simple Explanation:** Strings are **immutable** (can't be changed). `str[0] = "H"` silently fails. To change a string, you must create a **new string**.

---

### Q29: parseInt traps

```javascript
console.log(parseInt("123abc"));   // ?
console.log(parseInt("abc123"));   // ?
console.log(parseInt("  42  "));   // ?
console.log(parseInt("0x10"));     // ?
console.log(parseInt("010"));      // ?
console.log(parseInt(0.0000005));  // ?
```

**Answer:**
```
123     → parses until non-digit ("abc" ignored)
NaN     → first char is not a digit → gives up
42      → trims whitespace first
16      → "0x" prefix = hexadecimal → 0x10 = 16
10      → parsed as decimal (modern JS)
5       → SURPRISE! 0.0000005 → toString = "5e-7" → parseInt("5e-7") = 5
```

---

### Q30: Comma operator

```javascript
console.log((1, 2, 3));        // ?
console.log((a = 1, b = 2, a + b)); // ?

const x = (10, 20, 30);
console.log(x);                // ?
```

**Answer:** `3`, `3`, `30`

**Simple Explanation:** The comma operator evaluates all expressions left to right and returns the **last one**.

---

### Q31: typeof in TDZ

```javascript
console.log(typeof undeclaredVar);   // ?
console.log(typeof declaredLater);   // ?

let declaredLater = 10;
```

**Answer:** `"undefined"`, `ReferenceError`

**Simple Explanation:**
- `typeof` on a variable that was **never declared** → `"undefined"` (safe!)
- `typeof` on a `let/const` variable **before its declaration** → TDZ → Error!

This is one of the rare cases where `typeof` can throw an error.

---

### Q32: Labelled statements

```javascript
outer: for (let i = 0; i < 3; i++) {
  inner: for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) {
      continue outer;  // Skip to next iteration of OUTER loop
    }
    console.log(i, j);
  }
}
```

**Answer:**
```
0 0
0 1
0 2
1 0       ← when i=1, j=1: skips rest of inner loop, goes to i=2
2 0
2 1
2 2
```

**Simple Explanation:** Labels let you `break` or `continue` an outer loop from inside a nested loop. Without the label, `continue` only affects the inner loop.

---

### Q33: Generator function behavior

```javascript
function* gen() {
  yield 1;
  yield 2;
  return 3;
  yield 4;  // Never reached!
}

const g = gen();
console.log(g.next());  // ?
console.log(g.next());  // ?
console.log(g.next());  // ?
console.log(g.next());  // ?

console.log([...gen()]); // ?
```

**Answer:**
```
{ value: 1, done: false }
{ value: 2, done: false }
{ value: 3, done: true }     ← return sets done: true
{ value: undefined, done: true }

[1, 2]  ← spread/for-of does NOT include return value!
```

**Simple Explanation:** `return` in a generator sets `done: true`, so iteration stops. `yield 4` is never reached. When using spread or `for...of`, the return value (3) is not included — only yielded values.

---

### Q34: Event loop — process.nextTick & queueMicrotask

```javascript
console.log("1");

queueMicrotask(() => console.log("2"));

Promise.resolve().then(() => console.log("3"));

setTimeout(() => console.log("4"), 0);

console.log("5");
```

**Answer:** `"1"`, `"5"`, `"2"`, `"3"`, `"4"`

**Simple Explanation:**
```
Sync:       1, 5
Microtasks: 2 (queueMicrotask), 3 (Promise.then)
Macrotasks: 4 (setTimeout)

Both queueMicrotask and Promise.then are microtasks.
They run in the order they were queued.
```

---

### Q35: WeakRef and garbage collection

```javascript
let obj = { name: "Alice" };
const weakRef = new WeakRef(obj);

console.log(weakRef.deref()?.name);  // ?

obj = null;  // Remove strong reference

// After garbage collection (unpredictable timing):
console.log(weakRef.deref()?.name);  // ?
```

**Answer:** `"Alice"`, `undefined` (eventually)

**Simple Explanation:** `WeakRef` holds a "weak" reference — it doesn't prevent garbage collection. Once `obj = null`, the only reference is weak, so GC can clean it up. After that, `deref()` returns `undefined`.

---

### Q36: Symbol.toPrimitive

```javascript
const obj = {
  [Symbol.toPrimitive](hint) {
    if (hint === "number") return 42;
    if (hint === "string") return "hello";
    return true;  // default
  }
};

console.log(+obj);          // ?
console.log(`${obj}`);      // ?
console.log(obj + "");      // ?
console.log(obj == 42);     // ?
```

**Answer:**
```
42        → hint = "number" (unary +)
"hello"   → hint = "string" (template literal)
"true"    → hint = "default" (+ with string) → true → "true"
false     → hint = "default" → true, 42 == true → 42 == 1 → false
```

---

## Category 9: Practical Coding Challenges

### Q37: Implement `Array.prototype.myMap`

```javascript
Array.prototype.myMap = function(callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};

[1, 2, 3].myMap(x => x * 2);  // [2, 4, 6]
```

### Q38: Implement `Array.prototype.myReduce`

```javascript
Array.prototype.myReduce = function(callback, initialValue) {
  let accumulator = initialValue;
  let startIndex = 0;

  if (accumulator === undefined) {
    accumulator = this[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }

  return accumulator;
};

[1, 2, 3, 4].myReduce((sum, n) => sum + n, 0);  // 10
```

### Q39: Implement `debounce`

```javascript
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
```

### Q40: Implement `throttle`

```javascript
function throttle(fn, limit) {
  let inThrottle = false;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}
```

### Q41: Implement `Promise.all`

```javascript
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;

    if (promises.length === 0) return resolve([]);

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          results[index] = value;  // Maintain order!
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);  // First rejection rejects all
    });
  });
}
```

### Q42: Flatten a deeply nested array

```javascript
// Recursive approach
function flatten(arr) {
  return arr.reduce((flat, item) => {
    return flat.concat(Array.isArray(item) ? flatten(item) : item);
  }, []);
}

flatten([1, [2, [3, [4]], 5]]);  // [1, 2, 3, 4, 5]

// Built-in (ES2019)
[1, [2, [3, [4]], 5]].flat(Infinity);  // [1, 2, 3, 4, 5]
```

### Q43: Deep clone an object

```javascript
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) return new RegExp(obj);
  if (Array.isArray(obj)) return obj.map(item => deepClone(item));

  const clone = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = deepClone(obj[key]);
    }
  }
  return clone;
}

// Or simply: structuredClone(obj)  ← modern built-in!
```

### Q44: Implement `curry` function

```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function(...moreArgs) {
      return curried.apply(this, args.concat(moreArgs));
    };
  };
}

const add = curry((a, b, c) => a + b + c);
add(1)(2)(3);     // 6
add(1, 2)(3);     // 6
add(1)(2, 3);     // 6
```

---

# Summary: Top 10 Concepts Interviewers Test Most

```
┌────┬────────────────────────────────────────────────────┐
│ #  │ Concept & What They Ask                            │
├────┼────────────────────────────────────────────────────┤
│ 1  │ Closures — How do they work? Write examples.       │
│ 2  │ Event Loop — Output order of sync/async code       │
│ 3  │ this keyword — What does 'this' refer to?          │
│ 4  │ Prototypes — How does inheritance work?             │
│ 5  │ Promises/async-await — Error handling, chaining     │
│ 6  │ Hoisting — What gets hoisted and how?               │
│ 7  │ Type Coercion — == vs ===, truthy/falsy             │
│ 8  │ Scope — var vs let vs const, block vs function      │
│ 9  │ Array methods — map/filter/reduce implementations   │
│ 10 │ Debounce/Throttle — Implement from scratch          │
└────┴────────────────────────────────────────────────────┘
```

---

**End of JavaScript Interview Preparation Notes**
