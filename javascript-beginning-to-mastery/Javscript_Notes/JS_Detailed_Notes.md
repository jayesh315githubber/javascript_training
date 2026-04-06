# JavaScript Detailed Notes: Execution Context, DOM, Events & Practical Examples

## A Complete Learning Guide with Diagrams and Code Examples

---

# TABLE OF CONTENTS

1. [JavaScript Execution Context and Compilation](#1-javascript-execution-context-and-compilation)
2. [Execution Context Details](#2-execution-context-details)
3. [Hoisting and Temporal Dead Zone](#3-hoisting-and-temporal-dead-zone)
4. [DOM (Document Object Model)](#4-dom-document-object-model)
5. [DOM Manipulation Techniques](#5-dom-manipulation-techniques)
6. [Event Handling in JavaScript](#6-event-handling-in-javascript)
7. [Practical Examples and Projects](#7-practical-examples-and-projects)

---

# 1. JavaScript Execution Context and Compilation

## How JavaScript Engine Processes Your Code

When you write JavaScript code and run it in the browser or Node.js, the code does NOT execute immediately. It goes through a **pipeline** of stages inside the JavaScript engine.

### JavaScript Engine Pipeline

```
  Your Code (source text)
       │
       ▼
┌──────────────────┐
│     PARSER        │   Reads your code character by character
│                    │   Checks for syntax errors
│  Source Code ──►  │   Breaks code into tokens (tokenization)
│  Abstract Syntax  │   Builds a tree structure (AST)
│  Tree (AST)       │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│   COMPILATION     │   JavaScript is NOT purely interpreted!
│   PHASE           │   Modern engines use JIT (Just-In-Time) compilation
│                    │
│  • Hoisting       │   ← Variables & functions are registered
│  • Scope setup    │   ← Scope chains are determined
│  • Execution      │   ← Execution context is created
│    Context setup  │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│   EXECUTION       │   Code runs line-by-line
│   PHASE           │   Variables get their actual values
│                    │   Functions are called
│  Synchronous,     │   One line at a time (single-threaded)
│  line-by-line     │
└──────────────────┘
```

### What Happens in Each Phase?

#### Phase 1: Compilation (Creation Phase)

Before any code runs, the engine scans the **entire** code and does the following:

1. **Registers all `var` declarations** → initialized with `undefined`
2. **Registers all function declarations** → stored with their complete definition
3. **Registers `let` and `const`** → noted but NOT initialized (Temporal Dead Zone)
4. **Sets up scope chains** → determines which variables belong to which scope
5. **Creates the Execution Context** → the environment where code will run

#### Phase 2: Execution

After compilation, the engine goes back to line 1 and executes code **line by line**:

1. Variables get their actual assigned values
2. Function calls create new execution contexts
3. Expressions are evaluated
4. Outputs are produced

### Example: Watching Both Phases

```javascript
console.log(myName);     // Output: undefined (var is hoisted)
console.log(greet);      // Output: [Function: greet] (function is hoisted with definition)
console.log(age);        // ERROR: Cannot access 'age' before initialization (TDZ)

var myName = "Jayesh";
let age = 25;

function greet() {
    console.log("Hello!");
}
```

**What happened during Compilation Phase:**

```
┌─────────────────────────────────────────────────┐
│         COMPILATION PHASE (Memory Setup)         │
│                                                   │
│  Memory:                                          │
│  ┌─────────────┬─────────────────────────────┐   │
│  │  myName     │  undefined                   │   │  ← var → gets undefined
│  ├─────────────┼─────────────────────────────┤   │
│  │  age        │  <uninitialized> (TDZ)      │   │  ← let → NOT initialized
│  ├─────────────┼─────────────────────────────┤   │
│  │  greet      │  function greet() {...}     │   │  ← function → full definition
│  └─────────────┴─────────────────────────────┘   │
└─────────────────────────────────────────────────┘
```

**What happened during Execution Phase:**

```
┌─────────────────────────────────────────────────┐
│         EXECUTION PHASE (Line by Line)           │
│                                                   │
│  Line 1: console.log(myName)                      │
│           → Looks up myName → finds "undefined"   │
│           → Prints: undefined                     │
│                                                   │
│  Line 2: console.log(greet)                       │
│           → Looks up greet → finds function body  │
│           → Prints: [Function: greet]             │
│                                                   │
│  Line 3: console.log(age)                         │
│           → Looks up age → still in TDZ!          │
│           → THROWS ReferenceError ❌               │
│                                                   │
│  (Lines below never execute due to error)         │
└─────────────────────────────────────────────────┘
```

### Global Execution Context

When your JavaScript program starts, the very first thing created is the **Global Execution Context (GEC)**.

```
┌──────────────────────────────────────────────────────┐
│            GLOBAL EXECUTION CONTEXT                   │
│                                                       │
│  ┌─────────────────────────────────────────────────┐ │
│  │  Global Object                                   │ │
│  │  (window in browser / global in Node.js)        │ │
│  │                                                   │ │
│  │  window.alert()    window.document               │ │
│  │  window.console    window.setTimeout()           │ │
│  │  window.location   window.fetch()                │ │
│  └─────────────────────────────────────────────────┘ │
│                                                       │
│  ┌─────────────────────────────────────────────────┐ │
│  │  this = window  (in browser, non-strict mode)   │ │
│  └─────────────────────────────────────────────────┘ │
│                                                       │
│  ┌─────────────────────────────────────────────────┐ │
│  │  Your global variables and functions             │ │
│  │  var x = 10;  → window.x = 10                   │ │
│  │  function foo() {}  → window.foo = function      │ │
│  │  let y = 20;  → NOT on window object            │ │
│  └─────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────┘
```

**Key Point:** `var` declarations and function declarations at the global level become properties of the `window` object. `let` and `const` do NOT.

```javascript
var a = 10;
let b = 20;

console.log(window.a);  // 10  ← var attaches to window
console.log(window.b);  // undefined  ← let does NOT attach to window
```

### JavaScript is Single-Threaded and Synchronous

```
┌────────────────────────────────────────────────┐
│           SINGLE THREAD OF EXECUTION            │
│                                                  │
│   Line 1  ──►  Execute  ──►  Done               │
│   Line 2  ──►  Execute  ──►  Done               │
│   Line 3  ──►  Execute  ──►  Done               │
│   ...                                            │
│                                                  │
│   Only ONE line runs at a time!                  │
│   Each line must finish before the next starts   │
└────────────────────────────────────────────────┘

But browsers give us ASYNC capabilities:
┌────────────────────────────────────────────────┐
│   Browser APIs (NOT part of JavaScript):        │
│   • setTimeout / setInterval                    │
│   • fetch / XMLHttpRequest                      │
│   • DOM Events (click, scroll, etc.)            │
│   • Web Workers                                 │
│                                                  │
│   These run in browser threads, not JS thread   │
└────────────────────────────────────────────────┘
```

---

# 2. Execution Context Details

## The Two Phases of Every Execution Context

Every execution context (whether global or function) is created in **two phases**:

```
┌─────────────────────────────────────────────────────┐
│              EXECUTION CONTEXT                       │
│                                                       │
│  ╔═══════════════════════════════════════════════╗   │
│  ║         PHASE 1: CREATION PHASE               ║   │
│  ║                                                ║   │
│  ║  Step 1: Create Variable Object (VO)          ║   │
│  ║    • Scan for function declarations → store   ║   │
│  ║    • Scan for var declarations → undefined    ║   │
│  ║    • Scan for let/const → TDZ (uninitialized) ║   │
│  ║                                                ║   │
│  ║  Step 2: Create Scope Chain                   ║   │
│  ║    • Current scope + all parent scopes        ║   │
│  ║    • Forms a chain for variable lookup        ║   │
│  ║                                                ║   │
│  ║  Step 3: Determine 'this' value              ║   │
│  ║    • Global: this = window                    ║   │
│  ║    • Method: this = calling object            ║   │
│  ║    • Arrow fn: this = lexical parent          ║   │
│  ╚═══════════════════════════════════════════════╝   │
│                                                       │
│  ╔═══════════════════════════════════════════════╗   │
│  ║         PHASE 2: EXECUTION PHASE              ║   │
│  ║                                                ║   │
│  ║  • Code runs line by line                     ║   │
│  ║  • Variables receive their actual values      ║   │
│  ║  • Function calls trigger new exec contexts   ║   │
│  ║  • Expressions are evaluated                  ║   │
│  ╚═══════════════════════════════════════════════╝   │
└─────────────────────────────────────────────────────┘
```

## Call Stack (Execution Stack)

The Call Stack is how JavaScript keeps track of **where it is** in the code. It follows **LIFO** (Last In, First Out).

### Step-by-Step Call Stack Example

```javascript
function first() {
    console.log("Inside first");
    second();
    console.log("Back in first");
}

function second() {
    console.log("Inside second");
    third();
    console.log("Back in second");
}

function third() {
    console.log("Inside third");
}

first();
```

**Call Stack Visualization — Step by Step:**

```
Step 1: Program starts          Step 2: first() called
┌──────────────────┐           ┌──────────────────┐
│                  │           │                  │
│                  │           │                  │
│                  │           │   first()        │  ← pushed
│  Global()        │           │   Global()        │
└──────────────────┘           └──────────────────┘

Step 3: second() called        Step 4: third() called
┌──────────────────┐           ┌──────────────────┐
│                  │           │   third()         │  ← pushed
│   second()       │  ← pushed│   second()        │
│   first()        │           │   first()         │
│   Global()        │           │   Global()        │
└──────────────────┘           └──────────────────┘

Step 5: third() returns        Step 6: second() returns
┌──────────────────┐           ┌──────────────────┐
│                  │           │                  │
│   second()       │           │                  │
│   first()        │           │   first()        │
│   Global()        │           │   Global()        │
└──────────────────┘           └──────────────────┘
      ↑ third() popped               ↑ second() popped

Step 7: first() returns        Step 8: Program ends
┌──────────────────┐           ┌──────────────────┐
│                  │           │                  │
│                  │           │                  │
│                  │           │                  │
│   Global()        │           │      (empty)      │
└──────────────────┘           └──────────────────┘
      ↑ first() popped               ↑ Global() popped
```

**Output:**
```
Inside first
Inside second
Inside third
Back in second
Back in first
```

## Scope Chain and Lexical Environment

The **Scope Chain** is how JavaScript looks up variables. If a variable is not found in the current scope, it looks in the **parent scope**, then the **grandparent scope**, and so on until it reaches the global scope.

### Lexical Environment = Where the code is physically written

```javascript
var globalVar = "I'm global";

function outer() {
    var outerVar = "I'm in outer";

    function inner() {
        var innerVar = "I'm in inner";
        console.log(innerVar);   // ✅ Found in current scope
        console.log(outerVar);   // ✅ Found in parent scope (outer)
        console.log(globalVar);  // ✅ Found in grandparent scope (global)
    }

    inner();
}

outer();
```

**Scope Chain Diagram:**

```
┌──────────────────────────────────────────────────────────┐
│  GLOBAL SCOPE                                             │
│  ┌──────────────────────────────┐                        │
│  │ globalVar = "I'm global"     │                        │
│  │ outer = function             │                        │
│  └──────────────────────────────┘                        │
│                                                           │
│    ┌──────────────────────────────────────────────────┐  │
│    │  OUTER SCOPE (lexically inside Global)           │  │
│    │  ┌──────────────────────────────┐                │  │
│    │  │ outerVar = "I'm in outer"    │                │  │
│    │  │ inner = function             │                │  │
│    │  └──────────────────────────────┘                │  │
│    │                                                   │  │
│    │    ┌──────────────────────────────────────────┐  │  │
│    │    │  INNER SCOPE (lexically inside Outer)    │  │  │
│    │    │  ┌──────────────────────────────┐        │  │  │
│    │    │  │ innerVar = "I'm in inner"    │        │  │  │
│    │    │  └──────────────────────────────┘        │  │  │
│    │    │                                          │  │  │
│    │    │  Scope Chain Lookup:                     │  │  │
│    │    │  innerVar → found HERE ✅                │  │  │
│    │    │  outerVar → not here → go to outer ✅   │  │  │
│    │    │  globalVar → not here → outer → global ✅│  │  │
│    │    │  unknownVar → not here → ... → ERROR ❌  │  │  │
│    │    └──────────────────────────────────────────┘  │  │
│    └──────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘

Scope Chain for inner():  inner scope → outer scope → global scope
```

**Key Rule:** Scope chain goes **outward only** (child can access parent, but parent CANNOT access child).

```javascript
function outer() {
    function inner() {
        var secret = "hidden";
    }
    inner();
    console.log(secret);  // ❌ ReferenceError! Parent cannot access child scope
}
```

---

# 3. Hoisting and Temporal Dead Zone

## What is Hoisting?

Hoisting is JavaScript's behavior of **moving declarations to the top of their scope** during the compilation phase. Only the **declarations** are hoisted, NOT the assignments.

## var Hoisting

`var` declarations are hoisted and initialized with `undefined`.

```javascript
console.log(x);  // undefined (NOT an error!)
var x = 5;
console.log(x);  // 5
```

**What the engine actually sees (after hoisting):**

```javascript
var x = undefined;    // ← Declaration hoisted and initialized
console.log(x);       // undefined
x = 5;                // ← Assignment stays in place
console.log(x);       // 5
```

**Memory Timeline for `var`:**

```
Timeline ─────────────────────────────────────────────────►

  Compilation Phase              Execution Phase
  ┌─────────────────┐           ┌────────────────────────┐
  │ var x = undefined│           │ Line 1: log(x) → undefined
  │                  │           │ Line 2: x = 5          │
  │                  │           │ Line 3: log(x) → 5     │
  └─────────────────┘           └────────────────────────┘
        ↑                              ↑
   x exists with                  x gets real value
   value "undefined"              when assignment runs
```

## let and const — Temporal Dead Zone (TDZ)

`let` and `const` ARE hoisted, but they are NOT initialized. The period between hoisting and the actual declaration line is called the **Temporal Dead Zone (TDZ)**.

```javascript
console.log(y);  // ❌ ReferenceError: Cannot access 'y' before initialization
let y = 10;
console.log(y);  // 10
```

**Temporal Dead Zone Diagram:**

```
Timeline ─────────────────────────────────────────────────►

  ┌─────────────────────────────────┬──────────────────────┐
  │         TEMPORAL DEAD ZONE      │   ACCESSIBLE         │
  │         (TDZ)                   │                      │
  │                                 │                      │
  │   let y is hoisted but          │   let y = 10;        │
  │   NOT initialized               │   (declaration line) │
  │                                 │                      │
  │   Any access here →             │   y = 10 ✅          │
  │   ReferenceError ❌              │   console.log(y) ✅  │
  │                                 │                      │
  └─────────────────────────────────┴──────────────────────┘
          ↑ Start of scope               ↑ Declaration line
```

### TDZ Applies Per-Scope

```javascript
let x = "global";

function demo() {
    // TDZ for local x starts here (because let x exists below)
    console.log(x);  // ❌ ReferenceError (NOT "global"!)
    let x = "local";
    console.log(x);  // "local"
}
```

## Function Hoisting

### Function Declarations — Fully Hoisted

```javascript
greet();  // ✅ "Hello!" — works because entire function is hoisted

function greet() {
    console.log("Hello!");
}
```

### Function Expressions — Hoisted as Variables

```javascript
sayHi();  // ❌ TypeError: sayHi is not a function

var sayHi = function() {
    console.log("Hi!");
};
```

**Why?** Because `var sayHi` is hoisted as `undefined`, and `undefined()` causes a TypeError.

### Arrow Functions — Same as Function Expressions

```javascript
doWork();  // ❌ TypeError (with var) or ReferenceError (with let/const)

var doWork = () => {
    console.log("Working!");
};
```

## Complete Hoisting Comparison Table

```
┌──────────────────┬────────────┬──────────────┬────────────────────┐
│ Declaration Type │  Hoisted?  │ Initialized? │ Access Before Decl │
├──────────────────┼────────────┼──────────────┼────────────────────┤
│ var              │    ✅ Yes  │ ✅ undefined │ undefined          │
│ let              │    ✅ Yes  │ ❌ No (TDZ)  │ ReferenceError     │
│ const            │    ✅ Yes  │ ❌ No (TDZ)  │ ReferenceError     │
│ function decl    │    ✅ Yes  │ ✅ Full body │ Works normally      │
│ function expr    │    ✅ Yes  │ ❌ (as var)  │ TypeError           │
│ arrow function   │    ✅ Yes  │ ❌ (as var)  │ TypeError/RefError  │
│ class            │    ✅ Yes  │ ❌ No (TDZ)  │ ReferenceError     │
└──────────────────┴────────────┴──────────────┴────────────────────┘
```

## Tricky Hoisting Example

```javascript
var a = 1;

function foo() {
    console.log(a);   // What prints?
    var a = 2;
    console.log(a);
}

foo();
```

**Answer:** `undefined` then `2`

```
Why? Inside foo():
- Compilation: local 'a' is hoisted as undefined
- Line 1 (console.log): looks up 'a' in local scope → finds undefined
  (Does NOT go to global scope because local 'a' exists!)
- Line 2: a = 2
- Line 3 (console.log): a is now 2
```

---

# 4. DOM (Document Object Model)

## What is the DOM?

The DOM is the browser's **in-memory representation** of an HTML document as a **tree of objects**. When the browser loads HTML, it parses it and creates this tree structure that JavaScript can interact with.

### HTML to DOM Tree Conversion

**HTML Source:**
```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Hello World</h1>
    <p>Welcome to <strong>JavaScript</strong></p>
    <!-- A comment -->
    <ul id="list">
      <li>Item 1</li>
      <li>Item 2</li>
    </ul>
  </body>
</html>
```

**DOM Tree Representation:**

```
                        document
                           │
                        <html>
                       ┌───┴───┐
                    <head>    <body>
                       │       ├──────────┬──────────────┬─────────┐
                    <title>   <h1>       <p>          comment    <ul>
                       │       │          │           "A comment"  │
                    "My Page" "Hello    ┌─┴──┐                 ┌──┴──┐
                              World"  "Welcome" <strong>     <li>   <li>
                                        "to "    │            │      │
                                              "JavaScript" "Item 1" "Item 2"
```

## Types of DOM Nodes

```
┌──────────────────────────────────────────────────────────────┐
│                     DOM NODE TYPES                            │
├──────────────────┬────────────┬───────────────────────────────┤
│ Node Type        │ nodeType   │ Example                       │
├──────────────────┼────────────┼───────────────────────────────┤
│ Document Node    │     9      │ document                      │
│ Element Node     │     1      │ <div>, <p>, <h1>, <ul>        │
│ Text Node        │     3      │ "Hello World", "Item 1"       │
│ Comment Node     │     8      │ <!-- A comment -->            │
│ Attribute Node   │     2      │ id="list", class="active"     │
└──────────────────┴────────────┴───────────────────────────────┘

Important: Even whitespace between tags creates text nodes!
```

## DOM Node Relationships

```
                    ┌──────────┐
                    │  parent  │
                    │  <div>   │
                    └────┬─────┘
                         │  parentNode / parentElement
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
    ┌─────────┐    ┌─────────┐    ┌─────────┐
    │ child 1 │◄──►│ child 2 │◄──►│ child 3 │
    │  <p>    │    │  <p>    │    │  <p>    │
    └─────────┘    └─────────┘    └─────────┘
    firstChild  previousSibling  lastChild
                nextSibling

    Navigation Properties:
    ─────────────────────────────────────────
    parentNode.children        → [child1, child2, child3]  (elements only)
    parentNode.childNodes      → includes text nodes too
    parentNode.firstElementChild → child1
    parentNode.lastElementChild  → child3
    child2.nextElementSibling    → child3
    child2.previousElementSibling → child1
```

## DOM Selection Methods

### 1. getElementById — Select by ID (fastest)

```javascript
// HTML: <div id="header">Welcome</div>

const header = document.getElementById("header");
console.log(header);  // <div id="header">Welcome</div>
```

### 2. getElementsByClassName — Select by Class (returns live HTMLCollection)

```javascript
// HTML: <p class="intro">First</p>
//       <p class="intro">Second</p>

const intros = document.getElementsByClassName("intro");
console.log(intros.length);  // 2
console.log(intros[0]);      // <p class="intro">First</p>
```

### 3. getElementsByTagName — Select by Tag (returns live HTMLCollection)

```javascript
const paragraphs = document.getElementsByTagName("p");
console.log(paragraphs.length);  // All <p> elements on page
```

### 4. querySelector — Select First Match (CSS selector)

```javascript
const first = document.querySelector(".intro");      // First .intro element
const nested = document.querySelector("ul > li");    // First <li> inside <ul>
const byId = document.querySelector("#header");      // Same as getElementById
```

### 5. querySelectorAll — Select All Matches (returns static NodeList)

```javascript
const allIntros = document.querySelectorAll(".intro");
allIntros.forEach(el => console.log(el.textContent));
```

### Comparison Table

```
┌───────────────────────────┬──────────────┬───────────────┬────────────┐
│ Method                    │ Returns      │ Collection    │ Speed      │
├───────────────────────────┼──────────────┼───────────────┼────────────┤
│ getElementById()          │ Element      │ N/A           │ ⚡ Fastest │
│ getElementsByClassName()  │ HTMLCollection│ Live (auto-  │ ⚡ Fast    │
│                           │              │  updates)     │            │
│ getElementsByTagName()    │ HTMLCollection│ Live          │ ⚡ Fast    │
│ querySelector()           │ Element      │ N/A           │ 🔵 Medium  │
│ querySelectorAll()        │ NodeList     │ Static (snap- │ 🔵 Medium  │
│                           │              │  shot in time)│            │
└───────────────────────────┴──────────────┴───────────────┴────────────┘
```

### Live vs Static Collections

```javascript
const liveList = document.getElementsByClassName("item");
const staticList = document.querySelectorAll(".item");

console.log(liveList.length);    // 3
console.log(staticList.length);  // 3

// Now add a new element with class "item" to the DOM
const newItem = document.createElement("div");
newItem.className = "item";
document.body.appendChild(newItem);

console.log(liveList.length);    // 4  ← Auto-updated!
console.log(staticList.length);  // 3  ← Still the old snapshot
```

---

# 5. DOM Manipulation Techniques

## Creating Elements

```javascript
// Step 1: Create the element
const newDiv = document.createElement("div");

// Step 2: Add content
newDiv.textContent = "Hello, I'm new!";
// OR create a text node and append it
const textNode = document.createTextNode("Hello, I'm new!");
newDiv.appendChild(textNode);

// Step 3: Add attributes
newDiv.id = "myDiv";
newDiv.className = "highlight";
newDiv.setAttribute("data-role", "content");

// Step 4: Add to the page
document.body.appendChild(newDiv);
```

## appendChild — Add to End

```javascript
const parent = document.getElementById("list");
const newLi = document.createElement("li");
newLi.textContent = "New Item";
parent.appendChild(newLi);
```

```
BEFORE:                          AFTER:
┌──────────┐                     ┌──────────┐
│  <ul>    │                     │  <ul>    │
│  ├─ <li> │ Item 1              │  ├─ <li> │ Item 1
│  └─ <li> │ Item 2              │  ├─ <li> │ Item 2
└──────────┘                     │  └─ <li> │ New Item  ← added
                                 └──────────┘
```

## insertBefore — Insert at Specific Position

```javascript
const parent = document.getElementById("list");
const newLi = document.createElement("li");
newLi.textContent = "Inserted Item";

const referenceNode = parent.children[1];  // Item 2
parent.insertBefore(newLi, referenceNode);
```

```
BEFORE:                          AFTER:
┌──────────┐                     ┌──────────┐
│  <ul>    │                     │  <ul>    │
│  ├─ <li> │ Item 1              │  ├─ <li> │ Item 1
│  └─ <li> │ Item 2              │  ├─ <li> │ Inserted Item  ← new
└──────────┘                     │  └─ <li> │ Item 2
                                 └──────────┘
```

## removeChild / remove — Delete Elements

```javascript
// Method 1: removeChild (older, works everywhere)
const parent = document.getElementById("list");
const child = parent.children[0];
parent.removeChild(child);

// Method 2: remove (modern, simpler)
const element = document.querySelector(".unwanted");
element.remove();
```

```
BEFORE:                          AFTER removeChild(Item 1):
┌──────────┐                     ┌──────────┐
│  <ul>    │                     │  <ul>    │
│  ├─ <li> │ Item 1  ← removed  │  └─ <li> │ Item 2
│  └─ <li> │ Item 2              └──────────┘
└──────────┘
```

## replaceChild — Replace One Element with Another

```javascript
const parent = document.getElementById("list");
const newLi = document.createElement("li");
newLi.textContent = "Replaced Item";

const oldLi = parent.children[0];
parent.replaceChild(newLi, oldLi);
```

```
BEFORE:                          AFTER:
┌──────────┐                     ┌──────────┐
│  <ul>    │                     │  <ul>    │
│  ├─ <li> │ Item 1  ← replaced │  ├─ <li> │ Replaced Item  ← new
│  └─ <li> │ Item 2              │  └─ <li> │ Item 2
└──────────┘                     └──────────┘
```

## Modifying Element Properties

```javascript
const div = document.querySelector("#myDiv");

// Text Content
div.textContent = "Plain text (no HTML parsed)";
div.innerHTML = "<strong>Bold text</strong>";  // HTML is parsed

// Styles
div.style.color = "red";
div.style.backgroundColor = "#f0f0f0";
div.style.fontSize = "18px";

// Classes
div.classList.add("active");
div.classList.remove("hidden");
div.classList.toggle("highlight");   // Add if missing, remove if present
div.classList.contains("active");    // true or false

// Attributes
div.setAttribute("data-id", "123");
div.getAttribute("data-id");        // "123"
div.removeAttribute("data-id");
```

## Performance Tip: DocumentFragment

When adding **multiple elements**, use a DocumentFragment to avoid multiple reflows:

```javascript
// ❌ Bad: Causes reflow on each appendChild
const list = document.getElementById("list");
for (let i = 0; i < 100; i++) {
    const li = document.createElement("li");
    li.textContent = `Item ${i}`;
    list.appendChild(li);  // Reflow happens 100 times!
}

// ✅ Good: Single reflow with DocumentFragment
const list = document.getElementById("list");
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
    const li = document.createElement("li");
    li.textContent = `Item ${i}`;
    fragment.appendChild(li);  // No reflow yet
}
list.appendChild(fragment);  // Single reflow!
```

```
DocumentFragment Concept:
┌─────────────────────┐
│  DocumentFragment    │    (exists only in memory)
│  ├─ <li> Item 0     │    (not part of DOM yet)
│  ├─ <li> Item 1     │
│  ├─ <li> Item 2     │
│  └─ ... (100 items) │
└──────────┬──────────┘
           │  appendChild(fragment)
           ▼
┌─────────────────────┐
│  <ul id="list">     │    (all items appear at once)
│  ├─ <li> Item 0     │    (only ONE reflow/repaint!)
│  ├─ <li> Item 1     │
│  ├─ <li> Item 2     │
│  └─ ... (100 items) │
└─────────────────────┘
```

---

# 6. Event Handling in JavaScript

## What are Events?

Events are **signals** that something has happened in the browser — a user clicked a button, moved the mouse, pressed a key, submitted a form, or the page finished loading.

## Adding Event Listeners

```javascript
const button = document.querySelector("#myBtn");

// Method 1: addEventListener (recommended)
button.addEventListener("click", function(event) {
    console.log("Button clicked!");
    console.log("Event type:", event.type);        // "click"
    console.log("Target:", event.target);           // the button element
});

// Method 2: onclick property (older, only one handler per event)
button.onclick = function() {
    console.log("Clicked!");
};

// Method 3: Inline HTML (avoid this)
// <button onclick="handleClick()">Click me</button>
```

**Why addEventListener is best:**
- Can attach **multiple** handlers for the same event
- Can control **capturing vs bubbling** phase
- Can **remove** handlers with `removeEventListener`

## The Event Object

Every event handler receives an **event object** with useful information:

```javascript
element.addEventListener("click", function(event) {
    console.log(event.type);            // "click"
    console.log(event.target);          // Element that TRIGGERED the event
    console.log(event.currentTarget);   // Element that HANDLER is attached to
    console.log(event.clientX);         // Mouse X position
    console.log(event.clientY);         // Mouse Y position
    console.log(event.key);            // Key pressed (for keyboard events)
    console.log(event.preventDefault); // Function to prevent default
});
```

### event.target vs event.currentTarget

```
┌──────────────────────────────────────────┐
│  <div id="parent">   ← currentTarget     │
│  (event listener is HERE)                 │
│                                           │
│    ┌──────────────────────────────────┐  │
│    │  <button>Click Me</button>       │  │
│    │  ↑ target (user clicked HERE)    │  │
│    └──────────────────────────────────┘  │
└──────────────────────────────────────────┘

// If listener is on #parent, and user clicks <button>:
event.target        → <button>  (what was actually clicked)
event.currentTarget → <div>     (where the listener lives)
```

## Event Propagation: Capturing, Target, and Bubbling

When an event occurs, it travels through the DOM in **three phases**:

```
           PHASE 1                PHASE 2           PHASE 3
          CAPTURING               TARGET            BUBBLING
         (top → down)           (at target)       (bottom → up)

         document                                    document
            │  ↓                                       ↑  │
         <html>                                     <html>
            │  ↓                                       ↑  │
          <body>                                    <body>
            │  ↓                                       ↑  │
          <div>                                     <div>
            │  ↓                                       ↑  │
            └──────►  <button>  ◄──────┘
                     (CLICK!)
                     TARGET PHASE

Phase 1: Event travels DOWN from document to the target (Capturing)
Phase 2: Event arrives at the target element (Target)
Phase 3: Event travels back UP from target to document (Bubbling)
```

### Controlling the Phase

```javascript
const parent = document.querySelector("#parent");
const child = document.querySelector("#child");

// Default: Bubbling phase (3rd argument = false or omitted)
parent.addEventListener("click", () => {
    console.log("Parent - Bubbling");
});

child.addEventListener("click", () => {
    console.log("Child - Bubbling");
});

// Click on child → Output:
// "Child - Bubbling"    ← target phase
// "Parent - Bubbling"   ← bubbling phase (goes UP)


// Capturing phase (3rd argument = true)
parent.addEventListener("click", () => {
    console.log("Parent - Capturing");
}, true);

child.addEventListener("click", () => {
    console.log("Child - Capturing");
}, true);

// Click on child → Output:
// "Parent - Capturing"  ← capturing phase (goes DOWN)
// "Child - Capturing"   ← target phase
```

### Complete Example with Both Phases

```javascript
// With both capturing and bubbling listeners:
// Click on child → Output order:
// 1. "Parent - Capturing"   (Phase 1: going down)
// 2. "Child - Capturing"    (Phase 2: at target)
// 3. "Child - Bubbling"     (Phase 2: at target)
// 4. "Parent - Bubbling"    (Phase 3: going up)
```

### Stopping Propagation

```javascript
child.addEventListener("click", (event) => {
    console.log("Child clicked");
    event.stopPropagation();  // ← Stops event from going further
    // Parent's handler will NOT fire
});
```

## Event Delegation

Instead of attaching event listeners to **every child**, attach ONE listener to the **parent** and use `event.target` to determine which child was clicked.

### Why Event Delegation?

```
❌ WITHOUT Event Delegation (100 listeners for 100 items):

   <ul>
   ├─ <li> ← addEventListener("click", ...)
   ├─ <li> ← addEventListener("click", ...)
   ├─ <li> ← addEventListener("click", ...)
   ├─ ... (97 more listeners)
   └─ <li> ← addEventListener("click", ...)

   Problem: 100 event listeners = more memory
   Problem: Dynamically added items have NO listener!


✅ WITH Event Delegation (1 listener on parent):

   <ul> ← addEventListener("click", ...)  ← ONLY ONE listener!
   ├─ <li> (event bubbles up to <ul>)
   ├─ <li> (event bubbles up to <ul>)
   ├─ <li> (event bubbles up to <ul>)
   ├─ ... (works for all children)
   └─ <li> (even dynamically added ones!)

   Benefit: 1 listener instead of 100
   Benefit: Works for NEW items added later!
```

### Event Delegation Example

```javascript
const ul = document.querySelector("#todoList");

// ONE listener on the parent
ul.addEventListener("click", function(event) {
    // Check if a <li> was clicked
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("completed");
        console.log("Toggled:", event.target.textContent);
    }
});

// Even new items work automatically!
const newLi = document.createElement("li");
newLi.textContent = "New Task";
ul.appendChild(newLi);
// Clicking "New Task" will work — no new listener needed!
```

## preventDefault

Prevents the **browser's default action** for an event:

```javascript
// Prevent form submission (page reload)
const form = document.querySelector("form");
form.addEventListener("submit", function(event) {
    event.preventDefault();  // Page will NOT reload
    const name = document.querySelector("#name").value;
    console.log("Form data:", name);
    // Handle form data with JavaScript instead
});

// Prevent link navigation
const link = document.querySelector("a");
link.addEventListener("click", function(event) {
    event.preventDefault();  // Will NOT navigate to href
    console.log("Link click intercepted!");
});
```

---

# 7. Practical Examples and Projects

## Project 1: Dynamic To-Do List

### Flow Diagram

```
User Types Task → Clicks "Add" Button
        │
        ▼
┌─────────────────────┐
│ preventDefault()     │  ← Stop form reload
│ Get input value      │
│ Validate (not empty) │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ createElement("li")  │
│ Set textContent      │
│ Create delete button │
│ Append to <ul>       │
└─────────┬───────────┘
          │
          ▼
┌─────────────────────┐
│ Clear input field    │
│ Focus back on input  │
└─────────────────────┘
```

### Complete Code

```html
<!DOCTYPE html>
<html>
<head>
    <title>To-Do List</title>
    <style>
        .completed { text-decoration: line-through; color: gray; }
        .delete-btn { margin-left: 10px; color: red; cursor: pointer; }
    </style>
</head>
<body>
    <h1>My To-Do List</h1>
    <form id="todoForm">
        <input type="text" id="todoInput" placeholder="Enter a task...">
        <button type="submit">Add</button>
    </form>
    <ul id="todoList"></ul>

    <script>
        const form = document.getElementById("todoForm");
        const input = document.getElementById("todoInput");
        const list = document.getElementById("todoList");

        // Add new task
        form.addEventListener("submit", function(event) {
            event.preventDefault();

            const taskText = input.value.trim();
            if (taskText === "") return;

            // Create list item
            const li = document.createElement("li");
            li.textContent = taskText;

            // Create delete button
            const deleteBtn = document.createElement("span");
            deleteBtn.textContent = " ✕";
            deleteBtn.className = "delete-btn";
            li.appendChild(deleteBtn);

            // Add to list
            list.appendChild(li);

            // Clear input
            input.value = "";
            input.focus();
        });

        // Event Delegation: handle click on any list item or delete button
        list.addEventListener("click", function(event) {
            if (event.target.tagName === "LI") {
                // Toggle completed
                event.target.classList.toggle("completed");
            } else if (event.target.classList.contains("delete-btn")) {
                // Remove the item
                event.target.parentElement.remove();
            }
        });
    </script>
</body>
</html>
```

**DOM Changes Visualized:**

```
INITIAL STATE:              AFTER ADDING "Buy Groceries":
┌──────────────┐            ┌──────────────┐
│  <ul>        │            │  <ul>        │
│  (empty)     │            │  └─ <li>     │
└──────────────┘            │     ├─ "Buy Groceries"
                            │     └─ <span> "✕"
                            └──────────────┘

AFTER CLICKING THE ITEM:    AFTER CLICKING "✕":
┌──────────────┐            ┌──────────────┐
│  <ul>        │            │  <ul>        │
│  └─ <li class│            │  (empty)     │
│    ="completed">          └──────────────┘
│     ├─ "B̶u̶y̶ ̶G̶r̶o̶c̶e̶r̶i̶e̶s̶"
│     └─ <span> "✕"
└──────────────┘
```

---

## Project 2: Random Color Generator

### Logic Flow

```
User Clicks "Change Color" Button
        │
        ▼
┌──────────────────────────────────┐
│ Generate random R (0-255)         │
│ Generate random G (0-255)         │
│ Generate random B (0-255)         │
│                                   │
│ R = Math.floor(Math.random()*256) │
│ G = Math.floor(Math.random()*256) │
│ B = Math.floor(Math.random()*256) │
└─────────────┬────────────────────┘
              │
              ▼
┌──────────────────────────────────┐
│ Create color string:              │
│ "rgb(R, G, B)"                   │
│ e.g., "rgb(142, 68, 210)"       │
└─────────────┬────────────────────┘
              │
              ▼
┌──────────────────────────────────┐
│ Apply to element:                 │
│ document.body.style              │
│   .backgroundColor = colorString │
│ Display the color code on screen │
└──────────────────────────────────┘
```

### Complete Code

```html
<!DOCTYPE html>
<html>
<head>
    <title>Random Color Generator</title>
    <style>
        body {
            display: flex; flex-direction: column;
            align-items: center; justify-content: center;
            height: 100vh; transition: background-color 0.5s;
            font-family: Arial, sans-serif;
        }
        #colorDisplay { font-size: 2em; margin: 20px; }
        button { padding: 15px 30px; font-size: 1.2em; cursor: pointer; }
    </style>
</head>
<body>
    <h1>Random Color Generator</h1>
    <div id="colorDisplay">Click the button!</div>
    <button id="colorBtn">Change Color</button>

    <script>
        const btn = document.getElementById("colorBtn");
        const display = document.getElementById("colorDisplay");

        function getRandomColor() {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            return `rgb(${r}, ${g}, ${b})`;
        }

        btn.addEventListener("click", function() {
            const color = getRandomColor();
            document.body.style.backgroundColor = color;
            display.textContent = color;
        });
    </script>
</body>
</html>
```

---

## Project 3: Form Submission Handling

### Event Flow

```
User fills form → Clicks Submit
        │
        ▼
┌─────────────────────────┐
│ "submit" event fires     │
│ on <form> element        │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ event.preventDefault()   │  ← Stop page reload!
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Extract values:          │
│ input.value for each     │
│ form field               │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Validate data            │
│ Display on page / send   │
│ to server via fetch()    │
└─────────────────────────┘
```

### Complete Code

```html
<!DOCTYPE html>
<html>
<head><title>Form Handling</title></head>
<body>
    <h1>User Registration</h1>
    <form id="regForm">
        <input type="text" id="name" placeholder="Your Name" required>
        <input type="email" id="email" placeholder="Your Email" required>
        <button type="submit">Register</button>
    </form>
    <div id="output"></div>

    <script>
        const form = document.getElementById("regForm");
        const output = document.getElementById("output");

        form.addEventListener("submit", function(event) {
            // 1. Prevent page reload
            event.preventDefault();

            // 2. Get form values
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;

            // 3. Validate
            if (!name || !email) {
                output.textContent = "Please fill in all fields!";
                return;
            }

            // 4. Display result
            output.innerHTML = `
                <h2>Welcome, ${name}!</h2>
                <p>Email: ${email}</p>
                <p>Registration successful!</p>
            `;

            // 5. Reset form
            form.reset();
        });
    </script>
</body>
</html>
```

---

## Project 4: Event Delegation with Dynamic Elements

### How Event Delegation Works with Dynamically Added Elements

```
┌────────────────────────────────────────────────────┐
│  <div id="buttonContainer">   ← Listener lives HERE│
│                                                     │
│   ┌─────────────┐  ┌─────────────┐                │
│   │  Button 1   │  │  Button 2   │  (exist at     │
│   │  (original) │  │  (original) │   page load)   │
│   └─────────────┘  └─────────────┘                │
│                                                     │
│   ┌─────────────┐  ┌─────────────┐                │
│   │  Button 3   │  │  Button 4   │  (added later  │
│   │  (dynamic)  │  │  (dynamic)  │   via JS)      │
│   └─────────────┘  └─────────────┘                │
│                                                     │
│   ALL buttons work because event bubbles up to     │
│   the container, which has the single listener!     │
└────────────────────────────────────────────────────┘
```

### Complete Code

```html
<!DOCTYPE html>
<html>
<head>
    <title>Event Delegation Demo</title>
    <style>
        .btn { padding: 10px 20px; margin: 5px; cursor: pointer; }
        .btn:hover { opacity: 0.8; }
    </style>
</head>
<body>
    <h1>Dynamic Buttons with Event Delegation</h1>
    <button id="addBtn">Add New Button</button>
    <div id="buttonContainer">
        <button class="btn" data-id="1">Button 1</button>
        <button class="btn" data-id="2">Button 2</button>
    </div>
    <p id="log"></p>

    <script>
        const container = document.getElementById("buttonContainer");
        const addBtn = document.getElementById("addBtn");
        const log = document.getElementById("log");
        let buttonCount = 2;

        // Event Delegation: ONE listener handles ALL buttons
        container.addEventListener("click", function(event) {
            // Only respond to clicks on .btn elements
            if (event.target.classList.contains("btn")) {
                const id = event.target.getAttribute("data-id");
                log.textContent = `You clicked Button ${id}!`;

                // Change background color of clicked button
                const randomColor = `hsl(${Math.random() * 360}, 70%, 70%)`;
                event.target.style.backgroundColor = randomColor;
            }
        });

        // Add new buttons dynamically
        addBtn.addEventListener("click", function() {
            buttonCount++;
            const newBtn = document.createElement("button");
            newBtn.className = "btn";
            newBtn.setAttribute("data-id", buttonCount);
            newBtn.textContent = `Button ${buttonCount}`;
            container.appendChild(newBtn);
            // No need to add event listener — delegation handles it!
        });
    </script>
</body>
</html>
```

---

## Quick Reference: Common Event Types

```
┌──────────────┬──────────────────────────────────────────────┐
│ Category     │ Events                                        │
├──────────────┼──────────────────────────────────────────────┤
│ Mouse        │ click, dblclick, mousedown, mouseup,          │
│              │ mouseover, mouseout, mousemove                │
├──────────────┼──────────────────────────────────────────────┤
│ Keyboard     │ keydown, keyup, keypress (deprecated)         │
├──────────────┼──────────────────────────────────────────────┤
│ Form         │ submit, change, input, focus, blur, reset     │
├──────────────┼──────────────────────────────────────────────┤
│ Window       │ load, DOMContentLoaded, resize, scroll        │
├──────────────┼──────────────────────────────────────────────┤
│ Touch        │ touchstart, touchend, touchmove               │
├──────────────┼──────────────────────────────────────────────┤
│ Drag & Drop  │ dragstart, drag, dragend, drop, dragover      │
├──────────────┼──────────────────────────────────────────────┤
│ Clipboard    │ copy, cut, paste                              │
└──────────────┴──────────────────────────────────────────────┘
```

---

## Summary of Key Takeaways

| # | Topic | Key Insight |
|---|-------|-------------|
| 1 | Compilation & Execution | JS has TWO phases — compilation sets up memory, execution runs code |
| 2 | Execution Context | Every function call creates a new context pushed onto the Call Stack |
| 3 | Hoisting & TDZ | `var` → undefined, `let`/`const` → TDZ error, functions → fully hoisted |
| 4 | DOM | Browser converts HTML into a tree of node objects JavaScript can manipulate |
| 5 | DOM Manipulation | Create, append, insert, remove, replace — use DocumentFragment for performance |
| 6 | Events | Events propagate in 3 phases: Capturing → Target → Bubbling |
| 7 | Event Delegation | One listener on parent handles all children — even dynamically added ones |

---
