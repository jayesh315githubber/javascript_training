# How JavaScript Works — Complete Deep Dive Explanation

## Every Concept Explained from Scratch with Internal Mechanism Diagrams

Each file from `javascript-beginning-to-mastery/part2/how-javascript-works/` is explained in depth — not just WHAT happens, but WHY and HOW internally.

---

# Table of Contents

0. [How JavaScript Engine Works Internally (Foundation)](#foundation-how-javascript-engine-works-internally)

1. [hjw_01.js — Global Execution Context, `this`, `window`, var hoisting](#file-1-hjw_01js)
2. [hjw_02.js — Hoisting: function declarations vs var](#file-2-hjw_02js)
3. [hjw_03.js — Function Expression Hoisting](#file-3-hjw_03js)
4. [hjw_04.js — let/const vs var, Temporal Dead Zone (TDZ)](#file-4-hjw_04js)
5. [hjw_05.js — Function Execution Context & Block Scope](#file-5-hjw_05js)
6. [96.js — Function Execution Context, arguments object](#file-6-96js)
7. [97.js — Lexical Environment & Scope Chain](#file-7-97js)
8. [98.js — Closures Introduction](#file-8-98js)
9. [99.js — Closures with Captured Variables](#file-9-99js)
10. [100.js — Closure Practical: Power Function](#file-10-100js)
11. [101.js — Closure Practical: Counter (Call-Once Pattern)](#file-11-101js)

---

# Foundation: How JavaScript Engine Works Internally

Before diving into the code files, you need to understand the COMPLETE picture of how JavaScript works behind the scenes.

## What Happens When You Open a Web Page?

```
You type URL → Browser downloads HTML
                    │
                    ▼
        ┌─────────────────────┐
        │  HTML Parser         │  Reads HTML top to bottom
        │  Builds DOM Tree     │
        └─────────┬───────────┘
                  │
                  │  When it encounters <script src="hjw_01.js">
                  │
                  ▼
        ┌─────────────────────┐
        │  STOP HTML parsing!  │  Browser pauses HTML parsing
        │  Download JS file    │  Downloads the .js file
        └─────────┬───────────┘
                  │
                  ▼
        ┌─────────────────────┐
        │  JAVASCRIPT ENGINE   │  (V8 in Chrome, SpiderMonkey in Firefox)
        │  Takes over           │
        └─────────┬───────────┘
                  │
          ┌───────┴───────┐
          ▼               ▼
   ┌─────────────┐  ┌──────────────┐
   │ PHASE 1:    │  │ PHASE 2:     │
   │ COMPILATION │  │ EXECUTION    │
   │ (memory     │  │ (run code    │
   │  setup)     │  │  line by line│
   └─────────────┘  └──────────────┘
```

## JavaScript Engine Internal Architecture

```
┌───────────────────────────────────────────────────────────────────┐
│                    JAVASCRIPT ENGINE (e.g., V8)                    │
│                                                                    │
│  YOUR CODE: "var x = 5; function foo() { return x; }"            │
│       │                                                            │
│       ▼                                                            │
│  ┌──────────────────────────────────────────────────────────┐     │
│  │  STEP 1: TOKENIZER / LEXER                                │     │
│  │                                                           │     │
│  │  Breaks code into tokens (smallest meaningful pieces):    │     │
│  │                                                           │     │
│  │  "var x = 5;" becomes:                                    │     │
│  │  ┌─────┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐                        │     │
│  │  │ var │ │ x │ │ = │ │ 5 │ │ ; │                        │     │
│  │  └─────┘ └───┘ └───┘ └───┘ └───┘                        │     │
│  │  keyword  name  operator number semicolon                 │     │
│  └────────────────────┬──────────────────────────────────────┘     │
│                       │                                            │
│                       ▼                                            │
│  ┌──────────────────────────────────────────────────────────┐     │
│  │  STEP 2: PARSER                                           │     │
│  │                                                           │     │
│  │  Builds an Abstract Syntax Tree (AST) — a tree structure  │     │
│  │  that represents the meaning of your code:                │     │
│  │                                                           │     │
│  │       Program                                             │     │
│  │       ├── VariableDeclaration (var)                       │     │
│  │       │   └── VariableDeclarator                          │     │
│  │       │       ├── id: "x"                                 │     │
│  │       │       └── init: NumericLiteral(5)                 │     │
│  │       └── FunctionDeclaration                             │     │
│  │           ├── id: "foo"                                   │     │
│  │           └── body: ReturnStatement                       │     │
│  │               └── argument: Identifier("x")              │     │
│  └────────────────────┬──────────────────────────────────────┘     │
│                       │                                            │
│                       ▼                                            │
│  ┌──────────────────────────────────────────────────────────┐     │
│  │  STEP 3: INTERPRETER (Ignition in V8)                     │     │
│  │                                                           │     │
│  │  Reads AST and generates bytecode (intermediate code)     │     │
│  │  Also: creates Execution Contexts, handles hoisting       │     │
│  │                                                           │     │
│  │  This is where COMPILATION PHASE happens:                 │     │
│  │  → Scans all var/let/const/function declarations          │     │
│  │  → Allocates memory for them                              │     │
│  │  → Sets up scope chains                                   │     │
│  └────────────────────┬──────────────────────────────────────┘     │
│                       │                                            │
│                       ▼                                            │
│  ┌──────────────────────────────────────────────────────────┐     │
│  │  STEP 4: EXECUTION + JIT COMPILER (TurboFan in V8)       │     │
│  │                                                           │     │
│  │  Bytecode executes line by line                           │     │
│  │  Hot code (run many times) gets optimized to machine code │     │
│  │                                                           │     │
│  │  Uses two memory areas:                                   │     │
│  │  ┌─────────────────┐  ┌─────────────────────────────┐    │     │
│  │  │   CALL STACK     │  │   MEMORY HEAP               │    │     │
│  │  │                  │  │                              │    │     │
│  │  │  Stores:         │  │  Stores:                     │    │     │
│  │  │  • Execution     │  │  • Objects                   │    │     │
│  │  │    contexts      │  │  • Arrays                    │    │     │
│  │  │  • Primitive     │  │  • Functions                 │    │     │
│  │  │    values        │  │  • Strings (large)           │    │     │
│  │  │  • References    │  │                              │    │     │
│  │  │    to heap       │  │  Unstructured memory         │    │     │
│  │  │                  │  │  Managed by Garbage Collector │    │     │
│  │  │  LIFO (Last In,  │  │                              │    │     │
│  │  │  First Out)      │  │                              │    │     │
│  │  └─────────────────┘  └─────────────────────────────┘    │     │
│  └──────────────────────────────────────────────────────────┘     │
└───────────────────────────────────────────────────────────────────┘
```

## What is an Execution Context? (The Core Concept)

An Execution Context is like a **box/container** where JavaScript runs your code. Think of it as a room where your code lives — it has its own variables, its own `this`, and knows about its parent room.

```
┌──────────────────────────────────────────────────────────────────┐
│                   EXECUTION CONTEXT                               │
│                   (Think of it as a "Room")                       │
│                                                                   │
│  Every execution context has THREE components:                    │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  COMPONENT 1: Variable Environment (Memory)                │  │
│  │                                                             │  │
│  │  This is a TABLE that stores all variables and functions:   │  │
│  │                                                             │  │
│  │  ┌──────────────────┬───────────────────────┐              │  │
│  │  │  Variable Name    │  Value                │              │  │
│  │  ├──────────────────┼───────────────────────┤              │  │
│  │  │  firstName        │  undefined → "Harshit"│              │  │
│  │  │  myFunc           │  function(){...}      │              │  │
│  │  │  age              │  undefined → 25       │              │  │
│  │  └──────────────────┴───────────────────────┘              │  │
│  │                                                             │  │
│  │  During COMPILATION: values are undefined or function body  │  │
│  │  During EXECUTION: values get their real assigned values    │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  COMPONENT 2: Scope Chain (Outer Environment Reference)    │  │
│  │                                                             │  │
│  │  A LINK to the parent execution context:                    │  │
│  │                                                             │  │
│  │  myFunction scope ──► outer function scope ──► global scope │  │
│  │                                                             │  │
│  │  When a variable is NOT found in current scope,             │  │
│  │  JS follows this chain upward to find it.                   │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  COMPONENT 3: this binding                                  │  │
│  │                                                             │  │
│  │  What does 'this' refer to?                                 │  │
│  │                                                             │  │
│  │  Global context:    this = window (browser)                 │  │
│  │  Function call:     this = window (non-strict)              │  │
│  │  Method call:       this = the object before the dot        │  │
│  │  Arrow function:    this = inherited from parent            │  │
│  │  new keyword:       this = newly created object             │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

## Types of Execution Context

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                   │
│  TYPE 1: GLOBAL EXECUTION CONTEXT (GEC)                          │
│  ─────────────────────────────────────                           │
│  • Created ONCE when the program starts                          │
│  • Contains global variables and functions                       │
│  • this = window (in browser)                                    │
│  • Always at the BOTTOM of the call stack                        │
│  • Destroyed when the page is closed/navigated away              │
│                                                                   │
│  TYPE 2: FUNCTION EXECUTION CONTEXT (FEC)                        │
│  ─────────────────────────────────────────                       │
│  • Created EVERY TIME a function is called                       │
│  • Contains function's local variables, parameters, arguments    │
│  • this depends on how the function is called                    │
│  • Pushed onto call stack when function is called                │
│  • Popped from call stack when function returns                  │
│  • DESTROYED after return (unless closure keeps variables alive) │
│                                                                   │
│  TYPE 3: EVAL EXECUTION CONTEXT (rare, avoid eval)               │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

## How the Call Stack Works (Like a Stack of Plates)

```
Imagine a stack of plates in a cafeteria:
• You can only ADD a plate on TOP          → "push"
• You can only REMOVE the plate from TOP   → "pop"
• You can only USE the TOP plate           → current execution

┌─────────────────────────────────────────────────────────────┐
│                     CALL STACK                               │
│                                                              │
│   When function is called → PUSH new context on top          │
│   When function returns   → POP context from top             │
│   Current running code    → Whatever is on TOP               │
│                                                              │
│   If stack gets too deep → "Stack Overflow" error!           │
│   (e.g., infinite recursion)                                 │
│                                                              │
│            ┌─────────────┐                                   │
│            │  third()    │ ← Currently executing             │
│            ├─────────────┤                                   │
│            │  second()   │ ← Waiting for third() to finish   │
│            ├─────────────┤                                   │
│            │  first()    │ ← Waiting for second() to finish  │
│            ├─────────────┤                                   │
│            │  Global()   │ ← Always at the bottom            │
│            └─────────────┘                                   │
│                                                              │
│   Rule: Only the TOP context runs.                           │
│   Everything below is PAUSED, waiting.                       │
└─────────────────────────────────────────────────────────────┘
```

## Stack Memory vs Heap Memory

```
┌──────────────────────────┐    ┌──────────────────────────────┐
│      STACK MEMORY         │    │       HEAP MEMORY             │
│      (organized)          │    │       (unstructured)          │
│                           │    │                               │
│  Stores:                  │    │  Stores:                      │
│  • Primitive values       │    │  • Objects { }                │
│    (numbers, strings,     │    │  • Arrays [ ]                 │
│     booleans, undefined,  │    │  • Functions                  │
│     null)                 │    │  • Anything complex           │
│  • References/pointers    │    │                               │
│    to heap objects        │    │                               │
│  • Execution contexts     │    │                               │
│                           │    │                               │
│  Example:                 │    │  Example:                     │
│  var age = 25;            │    │  var person = {name: "Jay"};  │
│  ┌──────────────────┐    │    │  ┌──────────────────────┐     │
│  │ age │ 25          │    │    │  │ Address: 0x4F2       │     │
│  └──────────────────┘    │    │  │ {name: "Jay"}        │     │
│  Value stored directly   │    │  └──────────────────────┘     │
│                           │    │        ↑                      │
│  var person = {..};       │    │        │ reference points     │
│  ┌──────────────────┐    │    │        │ to heap              │
│  │ person │ 0x4F2 ──┼────┼────┼────────┘                      │
│  └──────────────────┘    │    │                               │
│  Only REFERENCE stored   │    │                               │
│  in stack                │    │                               │
│                           │    │                               │
│  FAST access             │    │  SLOWER access                │
│  Fixed size              │    │  Dynamic size                 │
│  Auto cleanup            │    │  Garbage Collected            │
└──────────────────────────┘    └──────────────────────────────┘
```

## The Two Phases Explained in Simple Terms

```
Think of it like a MOVIE PRODUCTION:

PHASE 1: PRE-PRODUCTION (Compilation)                    
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Read the entire script (scan all code)
• Book all actors (register all variables)
• Reserve filming locations (allocate memory)                  
• Nobody acts yet — just preparation!         

  var actors: "booked but no role yet" (undefined)
  function actors: "fully cast with their role" (complete definition)
  let/const actors: "name on list but not yet arrived" (uninitialized/TDZ)


PHASE 2: FILMING (Execution)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Scene 1, Action! (line 1 executes)
• Scene 2, Action! (line 2 executes)
• Each scene filmed in ORDER (synchronous)
• One scene at a time (single-threaded)
• Actors now perform their roles (variables get values)
```

---

Now let's see each file and understand HOW the engine processes it internally:

---

# File 1: hjw_01.js

## Topic: Global Execution Context, `this`, `window`, var hoisting

### The Code

```javascript
// compilation 
// code execution

// why compilation

// How javascript code executes 

// what is global exection context ? 
// what is local execution context ? 

// closures

console.log(this);
console.log(window);
console.log(firstName);
var firstName = "Harshit";
console.log(firstName);
```

### Step 1: Compilation Phase (Memory Creation)

Before ANY code runs, the engine scans the entire file and allocates memory:

```
┌─────────────────────────────────────────────────────────┐
│              COMPILATION PHASE (Memory Setup)            │
│                                                          │
│  The engine scans ALL lines and finds:                   │
│                                                          │
│  Line 18: var firstName = "Harshit";                     │
│           ↓                                              │
│           Found a var declaration!                        │
│           Allocate memory: firstName = undefined          │
│                                                          │
│  Also automatically created:                             │
│  ┌───────────────┬────────────────────────────────────┐  │
│  │ this          │ Window object (global object)      │  │
│  ├───────────────┼────────────────────────────────────┤  │
│  │ window        │ Window object (same as this)       │  │
│  ├───────────────┼────────────────────────────────────┤  │
│  │ firstName     │ undefined                          │  │
│  └───────────────┴────────────────────────────────────┘  │
│                                                          │
│  Note: Comments are ignored. Only declarations matter.   │
└─────────────────────────────────────────────────────────┘
```

### Step 2: Execution Phase (Line by Line)

Now the engine goes back to line 1 and executes:

```
┌──────────────────────────────────────────────────────────────────┐
│                    EXECUTION PHASE                                │
│                                                                   │
│  Line 11: console.log(this);                                      │
│           → Looks up 'this' → finds Window object                │
│           → OUTPUT: Window {window: Window, ...}                  │
│                                                                   │
│  Line 12: console.log(window);                                    │
│           → Looks up 'window' → finds Window object              │
│           → OUTPUT: Window {window: Window, ...}                  │
│           (Same object as 'this' in global scope)                │
│                                                                   │
│  Line 13: console.log(firstName);                                 │
│           → Looks up 'firstName' → finds undefined (hoisted!)    │
│           → OUTPUT: undefined                                     │
│                                                                   │
│  Line 14: var firstName = "Harshit";                              │
│           → Assignment: firstName = "Harshit"                     │
│           → Memory updated: firstName: undefined → "Harshit"     │
│                                                                   │
│  Line 15: console.log(firstName);                                 │
│           → Looks up 'firstName' → finds "Harshit"               │
│           → OUTPUT: Harshit                                       │
└──────────────────────────────────────────────────────────────────┘
```

### Call Stack Diagram

```
Program Start              console.log(this)       console.log(window)
┌──────────────┐          ┌──────────────┐         ┌──────────────┐
│              │          │ console.log()│←pushed   │ console.log()│←pushed
│  Global()    │          │  Global()    │          │  Global()    │
└──────────────┘          └──────────────┘          └──────────────┘
                               ↓ pops                    ↓ pops

console.log(firstName)    firstName = "Harshit"    console.log(firstName)
┌──────────────┐          ┌──────────────┐         ┌──────────────┐
│ console.log()│←pushed   │              │         │ console.log()│←pushed
│  Global()    │          │  Global()    │         │  Global()    │
└──────────────┘          └──────────────┘         └──────────────┘
     ↓ pops              (just assignment)              ↓ pops
```

### Memory State Changes

```
Timeline ──────────────────────────────────────────────────────►

After Compilation:     After Line 14:         After Line 15:
┌─────────────────┐   ┌─────────────────┐    (no change, just read)
│ firstName:      │   │ firstName:      │
│   undefined     │   │   "Harshit"     │
└─────────────────┘   └─────────────────┘
```

### Final Output

```
Window {window: Window, self: Window, ...}    ← this
Window {window: Window, self: Window, ...}    ← window (same object)
undefined                                      ← firstName (hoisted, not yet assigned)
Harshit                                        ← firstName (now assigned)
```

### Deep Dive: Why `this === window` in Global Scope?

```
When the browser creates the Global Execution Context, it does this internally:

┌────────────────────────────────────────────────────────────────┐
│  BROWSER STARTUP:                                               │
│                                                                  │
│  1. Creates the "window" object                                  │
│     → This object contains ALL browser APIs:                     │
│       window.document, window.console, window.alert,             │
│       window.setTimeout, window.fetch, window.location...       │
│                                                                  │
│  2. Creates the Global Execution Context                         │
│     → Sets this = window                                         │
│                                                                  │
│  3. So in global scope:                                          │
│     this === window  →  TRUE                                     │
│     window === this  →  TRUE                                     │
│                                                                  │
│  4. var declarations attach to window:                           │
│     var firstName = "Harshit"                                    │
│     → window.firstName = "Harshit"  (same thing!)                │
│     → this.firstName = "Harshit"    (also same!)                 │
│                                                                  │
│  5. let/const do NOT attach to window:                           │
│     let age = 25                                                 │
│     → window.age = undefined  (NOT attached!)                    │
└────────────────────────────────────────────────────────────────┘
```

### Deep Dive: How var Hoisting Works Internally

```
YOUR CODE:                    WHAT ENGINE ACTUALLY DOES:
─────────────                 ──────────────────────────

                              ┌─ COMPILATION PHASE ────────────┐
                              │                                 │
                              │  Scan line by line for          │
console.log(firstName);       │  declarations only:             │
var firstName = "Harshit";    │                                 │
console.log(firstName);       │  Found: var firstName           │
                              │  Action: allocate memory        │
                              │          firstName = undefined  │
                              │                                 │
                              │  Skip: console.log (not a decl) │
                              │  Skip: "Harshit" (assignment,   │
                              │         not declaration)        │
                              └─────────────────────────────────┘
                              
                              ┌─ EXECUTION PHASE ──────────────┐
                              │                                 │
                              │  Line 1: console.log(firstName) │
                              │  → Memory lookup: firstName     │
                              │  → Found: undefined             │
                              │  → Print: undefined             │
                              │                                 │
                              │  Line 2: firstName = "Harshit"  │
                              │  (only the ASSIGNMENT part runs │
                              │   because var was already       │
                              │   processed in compilation)     │
                              │  → Memory update: "Harshit"     │
                              │                                 │
                              │  Line 3: console.log(firstName) │
                              │  → Memory lookup: firstName     │
                              │  → Found: "Harshit"             │
                              │  → Print: Harshit               │
                              └─────────────────────────────────┘
                              
KEY INSIGHT: "var firstName = 'Harshit'" is actually TWO operations:
  1. var firstName;        ← This part happens in COMPILATION
  2. firstName = "Harshit" ← This part happens in EXECUTION
  
The engine SPLITS declaration and assignment into two phases!
```

### Key Concepts Learned
- **`this` in global scope** = `window` object (in browser)
- **`window`** = the global object provided by the browser
- **`var` hoisting** = variable exists during compilation but has value `undefined`
- **Compilation happens BEFORE execution** — that's why `firstName` is `undefined`, not an error

---

# File 2: hjw_02.js

## Topic: Hoisting — Function Declarations vs var Variables

### The Code

```javascript
// hoisting
// Hoisting is JavaScript's default behavior of moving all declarations to 
// the top of the current scope 

console.log(this);
console.log(window);

console.log(myFunction);  // return the function code bcz of function declaration.

console.log(fullName);

var age;
console.log(age);

function myFunction() {        // function declaration - first word is function 
    console.log("this is my function");
}

age = 28;

var firstName = "Harshit";
var lastName = "Sharma"
var fullName = firstName + " " + lastName;

console.log(fullName);
```

### Step 1: Compilation Phase

```
┌─────────────────────────────────────────────────────────────────┐
│                    COMPILATION PHASE                              │
│                                                                   │
│  Engine scans ALL lines and finds these declarations:            │
│                                                                   │
│  Line 12: var age;              → age = undefined                │
│  Line 15: function myFunction() → FULLY stored (entire body!)    │
│  Line 20: var firstName         → firstName = undefined          │
│  Line 21: var lastName          → lastName = undefined           │
│  Line 22: var fullName          → fullName = undefined           │
│                                                                   │
│  Memory after compilation:                                        │
│  ┌───────────────┬──────────────────────────────────────────┐    │
│  │ this          │ Window object                             │    │
│  ├───────────────┼──────────────────────────────────────────┤    │
│  │ window        │ Window object                             │    │
│  ├───────────────┼──────────────────────────────────────────┤    │
│  │ myFunction    │ function myFunction() {                   │    │
│  │               │     console.log("this is my function");   │    │
│  │               │ }                     ← FULL DEFINITION!  │    │
│  ├───────────────┼──────────────────────────────────────────┤    │
│  │ age           │ undefined                                 │    │
│  ├───────────────┼──────────────────────────────────────────┤    │
│  │ firstName     │ undefined                                 │    │
│  ├───────────────┼──────────────────────────────────────────┤    │
│  │ lastName      │ undefined                                 │    │
│  ├───────────────┼──────────────────────────────────────────┤    │
│  │ fullName      │ undefined                                 │    │
│  └───────────────┴──────────────────────────────────────────┘    │
│                                                                   │
│  KEY DIFFERENCE:                                                  │
│  • var → hoisted as undefined                                    │
│  • function declaration → hoisted with COMPLETE body             │
└─────────────────────────────────────────────────────────────────┘
```

### Step 2: Execution Phase

```
┌──────────────────────────────────────────────────────────────────┐
│                    EXECUTION PHASE                                │
│                                                                   │
│  Line 5: console.log(this);                                       │
│          → OUTPUT: Window {...}                                   │
│                                                                   │
│  Line 6: console.log(window);                                     │
│          → OUTPUT: Window {...}                                   │
│                                                                   │
│  Line 8: console.log(myFunction);                                 │
│          → Looks up myFunction                                    │
│          → Finds the COMPLETE function (hoisted with body!)       │
│          → OUTPUT: ƒ myFunction() {                               │
│                      console.log("this is my function");          │
│                    }                                              │
│                                                                   │
│  Line 10: console.log(fullName);                                  │
│           → Looks up fullName → finds undefined                  │
│           → OUTPUT: undefined                                     │
│                                                                   │
│  Line 12: var age;                                                │
│           → Already hoisted, no new action                        │
│                                                                   │
│  Line 13: console.log(age);                                       │
│           → Looks up age → finds undefined                       │
│           → OUTPUT: undefined                                     │
│                                                                   │
│  Line 15-17: function myFunction() {...}                          │
│              → Already hoisted, SKIPPED during execution          │
│                                                                   │
│  Line 19: age = 28;                                               │
│           → Memory: age: undefined → 28                           │
│                                                                   │
│  Line 20: var firstName = "Harshit";                              │
│           → Memory: firstName: undefined → "Harshit"              │
│                                                                   │
│  Line 21: var lastName = "Sharma";                                │
│           → Memory: lastName: undefined → "Sharma"                │
│                                                                   │
│  Line 22: var fullName = firstName + " " + lastName;              │
│           → Evaluates: "Harshit" + " " + "Sharma" = "Harshit Sharma"
│           → Memory: fullName: undefined → "Harshit Sharma"        │
│                                                                   │
│  Line 24: console.log(fullName);                                  │
│           → OUTPUT: Harshit Sharma                                │
└──────────────────────────────────────────────────────────────────┘
```

### Hoisting Comparison Diagram

```
┌──────────────────────────────────────────────────────────┐
│            HOISTING: var vs function declaration           │
│                                                           │
│  ┌─────────────────────┐   ┌──────────────────────────┐  │
│  │     var variable     │   │  function declaration    │  │
│  │                     │   │                          │  │
│  │  var age;           │   │  function myFunction(){  │  │
│  │       ↓             │   │    console.log("...");   │  │
│  │  Hoisted as:        │   │  }                       │  │
│  │  age = undefined    │   │       ↓                  │  │
│  │                     │   │  Hoisted as:             │  │
│  │  Only declaration   │   │  ENTIRE function body    │  │
│  │  moves up.          │   │  moves up.               │  │
│  │  Value stays.       │   │                          │  │
│  └─────────────────────┘   └──────────────────────────┘  │
│                                                           │
│  That's why:                                              │
│  console.log(age)        → undefined                     │
│  console.log(myFunction) → ƒ myFunction() { ... }       │
└──────────────────────────────────────────────────────────┘
```

### Final Output

```
Window {window: Window, ...}                          ← this
Window {window: Window, ...}                          ← window
ƒ myFunction() { console.log("this is my function"); }  ← function (fully hoisted!)
undefined                                              ← fullName (var hoisted)
undefined                                              ← age (var hoisted, no value yet)
Harshit Sharma                                         ← fullName (now computed)
```

### Deep Dive: WHY Are Function Declarations Fully Hoisted?

```
This is a DESIGN DECISION by JavaScript creators.

The reason: So you can call functions BEFORE defining them.
This allows a coding style where you put your main logic at the TOP
and helper functions at the BOTTOM:

┌─────────────────────────────────────────────────────────┐
│  // MAIN LOGIC (at top — easy to read!)                  │
│  const result = calculateTotal(100, 20);                 │
│  displayResult(result);                                  │
│                                                          │
│  // HELPER FUNCTIONS (at bottom — details)               │
│  function calculateTotal(price, tax) {                   │
│      return price + tax;                                 │
│  }                                                       │
│                                                          │
│  function displayResult(total) {                         │
│      console.log("Total: " + total);                     │
│  }                                                       │
│                                                          │
│  This works BECAUSE function declarations are            │
│  fully hoisted — the engine knows about them             │
│  before any code runs!                                   │
└─────────────────────────────────────────────────────────┘
```

### Deep Dive: How `fullName` Gets Computed Step by Step

```
Line 22: var fullName = firstName + " " + lastName;

At this point in execution, memory looks like:
┌──────────────┬──────────────┐
│ firstName    │ "Harshit"    │  ← was set on Line 20
│ lastName     │ "Sharma"     │  ← was set on Line 21
└──────────────┴──────────────┘

The engine evaluates the RIGHT side first:
  firstName + " " + lastName
  "Harshit"  + " " + "Sharma"
  
  Step 1: "Harshit" + " "    = "Harshit "
  Step 2: "Harshit " + "Sharma" = "Harshit Sharma"

Then assigns to fullName:
  fullName = "Harshit Sharma"

String concatenation with + goes LEFT TO RIGHT!
```

---

# File 3: hjw_03.js

## Topic: Function Expression Hoisting

### The Code

```javascript
console.log(myFunction);       // for var - it is variable so assign as undefined

var myFunction = function () {    // function expression - bcz first word is var - undefined
    console.log("this is my function");
}

console.log(myFunction);     // assign whole function as value
```

### Step 1: Compilation Phase

```
┌─────────────────────────────────────────────────────────────────┐
│                    COMPILATION PHASE                              │
│                                                                   │
│  Engine finds: var myFunction = function() {...}                 │
│                                                                   │
│  This is a FUNCTION EXPRESSION (not a declaration!)              │
│  Because the first word is "var", not "function"                 │
│                                                                   │
│  So it's treated as a regular var:                               │
│  ┌───────────────┬────────────────────────────────────┐          │
│  │ myFunction    │ undefined                          │          │
│  └───────────────┴────────────────────────────────────┘          │
│                                                                   │
│  The function body is NOT stored yet!                             │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐     │
│  │  RULE: Only function DECLARATIONS are fully hoisted      │     │
│  │                                                          │     │
│  │  function foo() {}     ← Declaration (fully hoisted)    │     │
│  │  var foo = function()  ← Expression (hoisted as var)    │     │
│  └─────────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────────┘
```

### Step 2: Execution Phase

```
┌──────────────────────────────────────────────────────────────────┐
│                    EXECUTION PHASE                                │
│                                                                   │
│  Line 1: console.log(myFunction);                                 │
│          → Looks up myFunction → finds undefined                 │
│          → OUTPUT: undefined                                      │
│                                                                   │
│          ⚠️ NOT the function! Because function expression        │
│             is treated as a var, and var = undefined at this point│
│                                                                   │
│  Line 3: var myFunction = function () {                           │
│              console.log("this is my function");                  │
│          }                                                        │
│          → NOW the function body is assigned to myFunction        │
│          → Memory: myFunction: undefined → function(){...}        │
│                                                                   │
│  Line 7: console.log(myFunction);                                 │
│          → Looks up myFunction → finds the function!             │
│          → OUTPUT: ƒ () { console.log("this is my function"); }  │
└──────────────────────────────────────────────────────────────────┘
```

### Memory Timeline

```
Timeline ─────────────────────────────────────────────────────────►

  After Compilation     After Line 3 executes    After Line 7
  ┌──────────────┐     ┌──────────────────────┐  (just reads)
  │ myFunction:  │     │ myFunction:           │
  │  undefined   │     │  function() {         │
  │              │     │    console.log(...)   │
  │              │     │  }                    │
  └──────────────┘     └──────────────────────┘
       ↑                        ↑
  Line 1 reads this       Line 7 reads this
  → prints undefined      → prints function
```

### Function Declaration vs Function Expression

```
┌────────────────────────────────────────────────────────────────┐
│                                                                 │
│  FUNCTION DECLARATION:              FUNCTION EXPRESSION:        │
│  ─────────────────────              ─────────────────────       │
│  function greet() {                 var greet = function() {    │
│      console.log("Hi");                console.log("Hi");      │
│  }                                  }                           │
│                                                                 │
│  First word: "function"             First word: "var"           │
│  Hoisted: ✅ FULLY (with body)      Hoisted: as undefined       │
│                                                                 │
│  greet() BEFORE declaration:        greet() BEFORE declaration: │
│  ✅ Works!                           ❌ TypeError: greet is      │
│                                        not a function           │
│                                     (because greet = undefined  │
│                                      and undefined() = error)   │
└────────────────────────────────────────────────────────────────┘
```

### Final Output

```
undefined                                          ← myFunction (var hoisted, not the function yet)
ƒ () { console.log("this is my function"); }       ← myFunction (now assigned the function)
```

### Deep Dive: What Would Happen If You Called myFunction() Before Assignment?

```javascript
myFunction();  // What happens?

var myFunction = function () {
    console.log("this is my function");
}
```

```
┌──────────────────────────────────────────────────────────────┐
│                                                               │
│  After compilation: myFunction = undefined                    │
│                                                               │
│  Line 1: myFunction()                                         │
│                                                               │
│  The engine tries to CALL myFunction:                         │
│  → Looks up myFunction → finds undefined                     │
│  → Tries to execute: undefined()                              │
│  → undefined is NOT a function!                               │
│                                                               │
│  ❌ TypeError: myFunction is not a function                    │
│                                                               │
│  NOT a ReferenceError (variable EXISTS, it's just undefined)  │
│  It's a TypeError (you're trying to call undefined as if      │
│  it were a function, which is a TYPE mismatch)                │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  THREE types of errors with variables:                │    │
│  │                                                       │    │
│  │  1. ReferenceError: x is not defined                  │    │
│  │     → Variable doesn't exist at all                   │    │
│  │                                                       │    │
│  │  2. ReferenceError: Cannot access x before init       │    │
│  │     → Variable exists (let/const) but in TDZ          │    │
│  │                                                       │    │
│  │  3. TypeError: x is not a function                    │    │
│  │     → Variable exists and has a value, but that       │    │
│  │       value is not what you expected (undefined,      │    │
│  │       number, string — not a function)                │    │
│  └──────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────┘
```

### Deep Dive: How Functions Are Stored in Memory

```
When you write a function (declaration or expression), the engine
stores it as an OBJECT in the heap memory:

┌── STACK ──────────────────┐    ┌── HEAP ──────────────────────┐
│                            │    │                               │
│  myFunction: 0xA3F ────────┼───►│  Address: 0xA3F               │
│  (reference to heap)       │    │  {                            │
│                            │    │    [[Call]]: <internal code>  │
│                            │    │    name: ""  (anonymous)      │
│                            │    │    length: 0 (no params)      │
│                            │    │    body: "console.log(...)"   │
│                            │    │  }                            │
└────────────────────────────┘    └───────────────────────────────┘

Functions are OBJECTS in JavaScript!
They are stored in the HEAP (because they can be large).
The variable in the stack just holds a REFERENCE (address).
```

---

# File 4: hjw_04.js

## Topic: let/const vs var — Temporal Dead Zone (TDZ)

### The Code

```javascript
//  in the case of var  => variable is allocated as undefined.

// (Error) => Uncaught ReferenceError: firstName is not defined
//  get this error when variable is not present but we use this variable.

// console.log(firstName);

// ---------------------------------------------------

// in the case of let, const => variable is allocated uninitialized
// (Error) => Uncaught ReferenceError: Cannot access 'firstName' before initialization
// get this error when variable is present but use before initialized

// console.log(firstName);    //for let - firstname allocated as uninitialized - gives error
// let firstName;
// console.log(firstName);

// console.log(typeof firstName);        // undefined

// let firstName = "harshit";

// =================================================
/*
Notes:
TDZ = Temporal Dead Zone   
A temporal dead zone (TDZ) is the area of a block where a variable is inaccessible
until the moment the computer completely initializes it with a value

   uninitialized |----------(TDZ)------------->| initialized
*/
```

### Concept Explanation (code is commented out — this is a teaching file)

This file demonstrates **three different error scenarios**. Let's analyze each:

### Scenario 1: Variable Does NOT Exist

```javascript
console.log(firstName);    // firstName is never declared anywhere
```

```
┌─────────────────────────────────────────────────────────────────┐
│  COMPILATION PHASE:                                              │
│  Engine scans... finds NO declaration for firstName              │
│                                                                   │
│  EXECUTION PHASE:                                                │
│  console.log(firstName)                                          │
│  → Looks in current scope: NOT FOUND                             │
│  → Looks in parent scope: NOT FOUND                              │
│  → Looks in global scope: NOT FOUND                              │
│                                                                   │
│  ❌ ReferenceError: firstName is not defined                      │
│                                                                   │
│  "is not defined" = variable DOES NOT EXIST at all               │
└─────────────────────────────────────────────────────────────────┘
```

### Scenario 2: let Variable Used Before Declaration

```javascript
console.log(firstName);    // firstName declared below with let
let firstName;
console.log(firstName);
```

```
┌─────────────────────────────────────────────────────────────────┐
│  COMPILATION PHASE:                                              │
│  Engine scans... finds: let firstName                            │
│  Allocates memory but does NOT initialize (unlike var)           │
│                                                                   │
│  Memory:                                                         │
│  ┌───────────────┬──────────────────────┐                        │
│  │ firstName     │ <uninitialized>      │  ← NOT undefined!      │
│  └───────────────┴──────────────────────┘                        │
│                                                                   │
│  EXECUTION PHASE:                                                │
│  Line 1: console.log(firstName)                                   │
│  → Looks up firstName → found but UNINITIALIZED!                 │
│  → We are in the TEMPORAL DEAD ZONE!                             │
│                                                                   │
│  ❌ ReferenceError: Cannot access 'firstName' before initialization│
│                                                                   │
│  "Cannot access before initialization" = variable EXISTS but     │
│  you're in the TDZ (between hoisting and declaration line)       │
└─────────────────────────────────────────────────────────────────┘
```

### Two Different Errors — Know the Difference!

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                   │
│  ERROR 1: "is not defined"                                       │
│  ──────────────────────────                                      │
│  Meaning: Variable DOES NOT EXIST anywhere in scope              │
│  Cause:   You never declared it (no var/let/const)               │
│  Example: console.log(xyz);  // xyz never declared               │
│                                                                   │
│  vs                                                               │
│                                                                   │
│  ERROR 2: "Cannot access before initialization"                  │
│  ──────────────────────────────────────────────                  │
│  Meaning: Variable EXISTS but you're in the TDZ                  │
│  Cause:   let/const variable used before its declaration line    │
│  Example: console.log(x);  // x is declared below with let      │
│           let x = 5;                                              │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Temporal Dead Zone (TDZ) Visual

```
  let firstName = "harshit";     // declared on line 10

  Line 1  ─┐
  Line 2   │
  Line 3   │  ◄── TEMPORAL DEAD ZONE (TDZ)
  Line 4   │      Any access to firstName here → ReferenceError
  Line 5   │
  ...      │
  Line 9  ─┘
  Line 10 ───── let firstName = "harshit";  ← TDZ ENDS HERE
  Line 11  ┐
  Line 12  │  ◄── SAFE ZONE: firstName is accessible
  ...      │
  End     ─┘
```

### var vs let/const Hoisting Comparison

```
┌─────────────────────────┬─────────────────────────────┐
│         var              │       let / const            │
├─────────────────────────┼─────────────────────────────┤
│ Hoisted: YES            │ Hoisted: YES                │
│ Initialized: YES        │ Initialized: NO             │
│ Initial value: undefined│ Initial value: <none> (TDZ) │
│                         │                             │
│ Access before decl:     │ Access before decl:         │
│ → returns undefined     │ → ReferenceError!           │
│ (no error!)             │ (TDZ violation)             │
│                         │                             │
│ console.log(x); //undef │ console.log(y); //ERROR!    │
│ var x = 5;              │ let y = 5;                  │
└─────────────────────────┴─────────────────────────────┘
```

### Deep Dive: WHY Was TDZ Introduced?

```
┌──────────────────────────────────────────────────────────────┐
│  PROBLEM with var hoisting (before let/const existed):        │
│                                                               │
│  var was TOO forgiving — it allowed bugs to go unnoticed:    │
│                                                               │
│  console.log(userName);  // undefined — NO error!             │
│  // ... 100 lines of code ...                                 │
│  var userName = "Jayesh";                                     │
│                                                               │
│  The developer probably meant to declare userName FIRST,      │
│  but var silently returned undefined instead of throwing      │
│  an error. This caused HIDDEN BUGS.                          │
│                                                               │
│  SOLUTION: let/const with TDZ                                 │
│                                                               │
│  console.log(userName);  // ❌ ERROR! Clear signal!           │
│  let userName = "Jayesh";                                     │
│                                                               │
│  Now the developer IMMEDIATELY knows something is wrong.      │
│  TDZ is a SAFETY FEATURE, not a limitation!                  │
└──────────────────────────────────────────────────────────────┘
```

### Deep Dive: How the Engine Tracks TDZ Internally

```
The engine maintains a FLAG for each let/const variable:

┌─────────────────────────────────────────────────────────┐
│  COMPILATION PHASE:                                      │
│                                                          │
│  let firstName;                                          │
│                                                          │
│  Internal memory representation:                         │
│  ┌──────────────┬───────────┬──────────────────────┐    │
│  │ Variable      │ Value     │ Status Flag          │    │
│  ├──────────────┼───────────┼──────────────────────┤    │
│  │ firstName    │ <empty>   │ UNINITIALIZED ⛔     │    │
│  └──────────────┴───────────┴──────────────────────┘    │
│                                                          │
│  EXECUTION (before declaration line):                    │
│  console.log(firstName)                                  │
│  → Engine checks: is firstName UNINITIALIZED? → YES ⛔   │
│  → THROW ReferenceError!                                 │
│                                                          │
│  EXECUTION (at declaration line):                        │
│  let firstName = "harshit";                              │
│  → Change flag: UNINITIALIZED → INITIALIZED ✅          │
│  → Set value: "harshit"                                  │
│  ┌──────────────┬───────────┬──────────────────────┐    │
│  │ firstName    │ "harshit" │ INITIALIZED ✅       │    │
│  └──────────────┴───────────┴──────────────────────┘    │
│                                                          │
│  EXECUTION (after declaration):                          │
│  console.log(firstName)                                  │
│  → Engine checks: is firstName INITIALIZED? → YES ✅    │
│  → Return value: "harshit"                               │
└─────────────────────────────────────────────────────────┘

For var, there is NO such flag check — it's always accessible!
```

---

# File 5: hjw_05.js

## Topic: Function Execution Context & Block Scope with let

### The Code

```javascript
console.log("hello world");

let firstName = "Harshit";
let lastName = "Vashistha";

const myFunction = function () {

    let var1 = "First Variable";
    let var2 = "second Variable";

    console.log(var1);
    console.log(var2);

}

myFunction();

console.log(var1);  // error - let - block scope
```

### Step 1: Compilation Phase

```
┌─────────────────────────────────────────────────────────────────┐
│              GLOBAL COMPILATION PHASE                             │
│                                                                   │
│  Engine scans global scope and finds:                            │
│  ┌───────────────┬──────────────────────────────────────────┐    │
│  │ firstName     │ <uninitialized> (let → TDZ)              │    │
│  ├───────────────┼──────────────────────────────────────────┤    │
│  │ lastName      │ <uninitialized> (let → TDZ)              │    │
│  ├───────────────┼──────────────────────────────────────────┤    │
│  │ myFunction    │ <uninitialized> (const → TDZ)            │    │
│  └───────────────┴──────────────────────────────────────────┘    │
│                                                                   │
│  Note: var1 and var2 are INSIDE the function — they are NOT      │
│  part of the global scope. They will be created when the         │
│  function is called.                                              │
└─────────────────────────────────────────────────────────────────┘
```

### Step 2: Execution Phase

```
┌──────────────────────────────────────────────────────────────────┐
│                 GLOBAL EXECUTION PHASE                             │
│                                                                   │
│  Line 1: console.log("hello world");                              │
│          → OUTPUT: hello world                                    │
│                                                                   │
│  Line 3: let firstName = "Harshit";                               │
│          → firstName: <uninitialized> → "Harshit"                │
│                                                                   │
│  Line 4: let lastName = "Vashistha";                              │
│          → lastName: <uninitialized> → "Vashistha"               │
│                                                                   │
│  Line 6: const myFunction = function () {...}                     │
│          → myFunction: <uninitialized> → function(){...}         │
│                                                                   │
│  Line 16: myFunction();                                           │
│           → NEW Function Execution Context created!               │
│           → Pushed onto Call Stack                                │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  FUNCTION EXECUTION CONTEXT (myFunction)                  │    │
│  │                                                           │    │
│  │  Compilation Phase (inside function):                     │    │
│  │  ┌──────────┬──────────────────────────┐                 │    │
│  │  │ var1     │ <uninitialized> (let)     │                 │    │
│  │  ├──────────┼──────────────────────────┤                 │    │
│  │  │ var2     │ <uninitialized> (let)     │                 │    │
│  │  └──────────┴──────────────────────────┘                 │    │
│  │                                                           │    │
│  │  Execution Phase (inside function):                       │    │
│  │  Line 8: let var1 = "First Variable";                     │    │
│  │          → var1 = "First Variable"                        │    │
│  │                                                           │    │
│  │  Line 9: let var2 = "second Variable";                    │    │
│  │          → var2 = "second Variable"                       │    │
│  │                                                           │    │
│  │  Line 11: console.log(var1);                              │    │
│  │           → OUTPUT: First Variable                        │    │
│  │                                                           │    │
│  │  Line 12: console.log(var2);                              │    │
│  │           → OUTPUT: second Variable                       │    │
│  │                                                           │    │
│  │  Function ends → popped from Call Stack                   │    │
│  │  var1 and var2 are DESTROYED (garbage collected)          │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                   │
│  Line 18: console.log(var1);                                      │
│           → Looks in global scope → NOT FOUND                    │
│           → var1 only existed inside myFunction's scope!          │
│           → ❌ ReferenceError: var1 is not defined                │
└──────────────────────────────────────────────────────────────────┘
```

### Call Stack

```
Start          myFunction() called    Inside function     Function returns     Error on var1
┌────────┐    ┌────────────────┐     ┌────────────────┐   ┌────────┐         ┌────────┐
│        │    │  myFunction()  │     │ console.log()  │   │        │         │  ERROR │
│Global()│    │  Global()      │     │ myFunction()   │   │Global()│         │Global()│
└────────┘    └────────────────┘     │ Global()       │   └────────┘         └────────┘
                                     └────────────────┘
```

### Block Scope Diagram

```
┌───────────────────────────────────────────────────┐
│  GLOBAL SCOPE                                      │
│  ┌─────────────────────────────────────────┐      │
│  │ firstName = "Harshit"      ✅ accessible │      │
│  │ lastName = "Vashistha"     ✅ accessible │      │
│  │ myFunction = function(){...}            │      │
│  └─────────────────────────────────────────┘      │
│                                                    │
│  ┌─────────────────────────────────────────┐      │
│  │  myFunction SCOPE (created when called) │      │
│  │  ┌──────────────────────────────────┐   │      │
│  │  │ var1 = "First Variable"          │   │      │
│  │  │ var2 = "second Variable"         │   │      │
│  │  │                                  │   │      │
│  │  │ Can access firstName ✅ (parent) │   │      │
│  │  │ Can access lastName ✅ (parent)  │   │      │
│  │  └──────────────────────────────────┘   │      │
│  └─────────────────────────────────────────┘      │
│                                                    │
│  Global trying to access var1:                     │
│  var1 is NOT in global scope → ❌ ERROR            │
│  (let variables are block-scoped!)                 │
└───────────────────────────────────────────────────┘
```

### Final Output

```
hello world
First Variable
second Variable
❌ ReferenceError: var1 is not defined
```

### Deep Dive: What Happens to Function's Variables After It Returns?

```
┌──────────────────────────────────────────────────────────────┐
│  LIFECYCLE OF FUNCTION VARIABLES:                             │
│                                                               │
│  1. myFunction() is called                                    │
│     → Function Execution Context CREATED                     │
│     → var1 and var2 allocated in this context's memory       │
│                                                               │
│     Call Stack:                                               │
│     ┌──────────────────┐                                     │
│     │ myFunction()     │ ← var1, var2 live HERE              │
│     │ Global()         │                                      │
│     └──────────────────┘                                     │
│                                                               │
│  2. myFunction() finishes (returns)                           │
│     → Function Execution Context DESTROYED                   │
│     → var1 and var2 are REMOVED from memory                  │
│     → Garbage Collector will reclaim the memory              │
│                                                               │
│     Call Stack:                                               │
│     ┌──────────────────┐                                     │
│     │                  │ ← var1, var2 GONE!                  │
│     │ Global()         │                                      │
│     └──────────────────┘                                     │
│                                                               │
│  3. Global code tries: console.log(var1)                      │
│     → Searches global memory → NOT FOUND                     │
│     → var1 was DESTROYED with the function context            │
│     → ReferenceError!                                         │
│                                                               │
│  This is WHY block/function scoping exists:                   │
│  Variables are TEMPORARY — they live only as long as          │
│  their function/block is executing. This prevents             │
│  memory leaks and naming conflicts!                           │
│                                                               │
│  EXCEPTION: Closures (covered in files 98-101) can keep      │
│  variables alive even after the function returns!             │
└──────────────────────────────────────────────────────────────┘
```

---

# File 6: 96.js

## Topic: Function Execution Context, arguments Object, Return Values

### The Code

```javascript
// function execution context 

let foo = "foo";

console.log(foo);

function getFullName(firstName, lastName) {

    console.log(arguments);       // return as array of arguments []
    let myVar = "var inside func";
    console.log(myVar);
    const fullName = firstName + " " + lastName;
    return fullName;

}

const personName = getFullName("harshit", "sharma");
console.log(personName);
```

### Step 1: Compilation Phase

```
┌─────────────────────────────────────────────────────────────────┐
│              GLOBAL COMPILATION PHASE                             │
│                                                                   │
│  ┌───────────────┬──────────────────────────────────────────┐    │
│  │ foo           │ <uninitialized> (let)                    │    │
│  ├───────────────┼──────────────────────────────────────────┤    │
│  │ getFullName   │ function getFullName(firstName, lastName)│    │
│  │               │ { ... }  ← FULLY hoisted (declaration!) │    │
│  ├───────────────┼──────────────────────────────────────────┤    │
│  │ personName    │ <uninitialized> (const)                  │    │
│  └───────────────┴──────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

### Step 2: Execution Phase

```
┌──────────────────────────────────────────────────────────────────┐
│                 GLOBAL EXECUTION                                  │
│                                                                   │
│  Line 3: let foo = "foo";                                         │
│          → foo = "foo"                                            │
│                                                                   │
│  Line 5: console.log(foo);                                        │
│          → OUTPUT: foo                                            │
│                                                                   │
│  Line 17: const personName = getFullName("harshit", "sharma");    │
│           → Call getFullName → NEW execution context!             │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────────┐│
│  │  FUNCTION EXECUTION CONTEXT: getFullName("harshit", "sharma")││
│  │                                                               ││
│  │  COMPILATION (Creation) Phase:                                ││
│  │  ┌──────────────┬───────────────────────────────────┐        ││
│  │  │ firstName    │ "harshit"  (parameter)            │        ││
│  │  ├──────────────┼───────────────────────────────────┤        ││
│  │  │ lastName     │ "sharma"   (parameter)            │        ││
│  │  ├──────────────┼───────────────────────────────────┤        ││
│  │  │ arguments    │ ["harshit", "sharma"]             │        ││
│  │  │              │ (auto-created array-like object)  │        ││
│  │  ├──────────────┼───────────────────────────────────┤        ││
│  │  │ myVar        │ <uninitialized> (let)             │        ││
│  │  ├──────────────┼───────────────────────────────────┤        ││
│  │  │ fullName     │ <uninitialized> (const)           │        ││
│  │  └──────────────┴───────────────────────────────────┘        ││
│  │                                                               ││
│  │  EXECUTION Phase:                                             ││
│  │  Line 9: console.log(arguments);                              ││
│  │          → OUTPUT: Arguments(2) ["harshit", "sharma"]         ││
│  │                                                               ││
│  │  Line 10: let myVar = "var inside func";                      ││
│  │           → myVar = "var inside func"                         ││
│  │                                                               ││
│  │  Line 11: console.log(myVar);                                 ││
│  │           → OUTPUT: var inside func                           ││
│  │                                                               ││
│  │  Line 12: const fullName = firstName + " " + lastName;        ││
│  │           → "harshit" + " " + "sharma" = "harshit sharma"    ││
│  │           → fullName = "harshit sharma"                       ││
│  │                                                               ││
│  │  Line 13: return fullName;                                    ││
│  │           → Returns "harshit sharma" to the caller            ││
│  │           → Function context DESTROYED, popped from stack     ││
│  └──────────────────────────────────────────────────────────────┘│
│                                                                   │
│  Back in global: personName = "harshit sharma"                    │
│                                                                   │
│  Line 18: console.log(personName);                                │
│           → OUTPUT: harshit sharma                                │
└──────────────────────────────────────────────────────────────────┘
```

### The `arguments` Object

```
┌─────────────────────────────────────────────────────────────────┐
│                    arguments OBJECT                               │
│                                                                   │
│  When a function is called, JS automatically creates             │
│  an "arguments" object containing ALL passed arguments:          │
│                                                                   │
│  getFullName("harshit", "sharma")                                │
│                                                                   │
│  arguments = {                                                    │
│      0: "harshit",        ← accessed as arguments[0]            │
│      1: "sharma",         ← accessed as arguments[1]            │
│      length: 2,           ← total arguments count               │
│      callee: getFullName  ← reference to the function           │
│  }                                                                │
│                                                                   │
│  It looks like an array but it's NOT a real array!               │
│  • arguments[0]     ✅ works                                     │
│  • arguments.length ✅ works                                     │
│  • arguments.map()  ❌ doesn't work (not a real array)           │
│  • [...arguments]   ✅ converts to real array                    │
└─────────────────────────────────────────────────────────────────┘
```

### Call Stack

```
Start        getFullName called    console.log(arguments)   return         After return
┌────────┐  ┌─────────────────┐   ┌─────────────────┐    ┌────────────┐  ┌────────┐
│        │  │ getFullName()   │   │ console.log()   │    │            │  │        │
│Global()│  │ Global()        │   │ getFullName()   │    │ Global()   │  │Global()│
└────────┘  └─────────────────┘   │ Global()        │    └────────────┘  └────────┘
                                  └─────────────────┘    ↑ getFullName
                                                           popped off
```

### Final Output

```
foo
Arguments(2) ['harshit', 'sharma', callee: ƒ, Symbol(Symbol.iterator): ƒ]
var inside func
harshit sharma
```

### Deep Dive: How Return Values Travel Back

```
┌──────────────────────────────────────────────────────────────┐
│  const personName = getFullName("harshit", "sharma");         │
│                                                               │
│  This single line does A LOT internally:                      │
│                                                               │
│  Step 1: Engine sees getFullName("harshit", "sharma")         │
│          → Recognizes this as a function CALL                 │
│                                                               │
│  Step 2: Creates new Function Execution Context               │
│          → Pushes onto call stack                             │
│          → Maps arguments: firstName="harshit", lastName="sharma"
│                                                               │
│  Step 3: Executes function body line by line                  │
│          → Eventually hits: return fullName;                  │
│          → fullName currently = "harshit sharma"              │
│                                                               │
│  Step 4: return statement triggers:                           │
│          ┌────────────────────────────────────────────┐      │
│          │  a) Takes the return value ("harshit sharma")│      │
│          │  b) Pops function context from call stack   │      │
│          │  c) Destroys function's local variables     │      │
│          │  d) Passes the value back to the caller     │      │
│          └────────────────────────────────────────────┘      │
│                                                               │
│  Step 5: Back in global context:                              │
│          The returned value "harshit sharma" is assigned      │
│          to personName                                        │
│                                                               │
│          personName = "harshit sharma"                        │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  Think of return like a DELIVERY SERVICE:             │    │
│  │                                                       │    │
│  │  function = a factory                                 │    │
│  │  parameters = raw materials sent to factory           │    │
│  │  function body = manufacturing process                │    │
│  │  return value = finished product delivered back       │    │
│  │  local variables = tools used (discarded after)       │    │
│  └──────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────┘
```

### Deep Dive: The `arguments` Object in Detail

```
┌──────────────────────────────────────────────────────────────┐
│  arguments is an ARRAY-LIKE object (not a real array!)        │
│                                                               │
│  getFullName("harshit", "sharma")                             │
│                                                               │
│  arguments internally looks like:                             │
│  {                                                            │
│      0: "harshit",                                            │
│      1: "sharma",                                             │
│      length: 2,                                               │
│      callee: function getFullName() {...}                     │
│  }                                                            │
│                                                               │
│  It has numeric INDEXES (0, 1, 2...) and a LENGTH property    │
│  But it does NOT have array methods!                          │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐     │
│  │  What you CAN do:           What you CANNOT do:      │     │
│  │  arguments[0]  ✅           arguments.map()    ❌    │     │
│  │  arguments[1]  ✅           arguments.filter() ❌    │     │
│  │  arguments.length ✅        arguments.forEach()❌    │     │
│  │                                                      │     │
│  │  To convert to real array:                           │     │
│  │  const args = [...arguments];       // spread       │     │
│  │  const args = Array.from(arguments);// Array.from   │     │
│  └─────────────────────────────────────────────────────┘     │
│                                                               │
│  WHY does arguments exist?                                    │
│  → Created before rest parameters (...args) existed           │
│  → Allows functions to accept ANY number of arguments         │
│  → Modern alternative: function foo(...args) {}               │
└──────────────────────────────────────────────────────────────┘
```

---

# File 7: 97.js

## Topic: Lexical Environment & Scope Chain

### The Code

```javascript
// lexical environment, scope chain

const lastName = "Vashistha";

const printName = function () {

    const firstName = "harshit";

    function myFunction() {
        console.log(firstName);   // firstname is present in the lexical env of the myFunction function
        console.log(lastName);
    }

    myFunction()
}
printName();
```

### Step 1: Compilation Phase

```
┌─────────────────────────────────────────────────────────────────┐
│              GLOBAL COMPILATION PHASE                             │
│                                                                   │
│  ┌───────────────┬──────────────────────────────────────────┐    │
│  │ lastName      │ <uninitialized> (const)                  │    │
│  ├───────────────┼──────────────────────────────────────────┤    │
│  │ printName     │ <uninitialized> (const)                  │    │
│  └───────────────┴──────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

### Step 2: Execution — The Scope Chain in Action

```
┌──────────────────────────────────────────────────────────────────┐
│  Line 3: const lastName = "Vashistha"; → assigned                │
│  Line 5: const printName = function(){...}; → assigned           │
│  Line 16: printName(); → CALL!                                    │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  printName() EXECUTION CONTEXT                            │    │
│  │                                                           │    │
│  │  Compilation: firstName = <uninitialized>                 │    │
│  │               myFunction = function(){...} (declaration!) │    │
│  │                                                           │    │
│  │  Line 7: const firstName = "harshit"; → assigned          │    │
│  │  Line 14: myFunction(); → CALL!                           │    │
│  │                                                           │    │
│  │  ┌──────────────────────────────────────────────────┐    │    │
│  │  │  myFunction() EXECUTION CONTEXT                   │    │    │
│  │  │                                                    │    │    │
│  │  │  Line 10: console.log(firstName);                  │    │    │
│  │  │           → Look in myFunction scope: NOT FOUND   │    │    │
│  │  │           → Look in printName scope: FOUND! ✅    │    │    │
│  │  │           → OUTPUT: harshit                        │    │    │
│  │  │                                                    │    │    │
│  │  │  Line 11: console.log(lastName);                   │    │    │
│  │  │           → Look in myFunction scope: NOT FOUND   │    │    │
│  │  │           → Look in printName scope: NOT FOUND    │    │    │
│  │  │           → Look in global scope: FOUND! ✅       │    │    │
│  │  │           → OUTPUT: Vashistha                      │    │    │
│  │  └──────────────────────────────────────────────────┘    │    │
│  └──────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────┘
```

### Scope Chain Diagram

```
┌──────────────────────────────────────────────────────────────┐
│  GLOBAL SCOPE                                                 │
│  ┌──────────────────────────────────┐                        │
│  │ lastName = "Vashistha"           │                        │
│  │ printName = function(){...}      │                        │
│  └──────────────────────────────────┘                        │
│         ↑                                                     │
│         │ parent scope                                        │
│  ┌──────────────────────────────────────────────────┐        │
│  │  printName SCOPE                                  │        │
│  │  ┌──────────────────────────────────┐            │        │
│  │  │ firstName = "harshit"            │            │        │
│  │  │ myFunction = function(){...}     │            │        │
│  │  └──────────────────────────────────┘            │        │
│  │         ↑                                         │        │
│  │         │ parent scope                            │        │
│  │  ┌──────────────────────────────────────────┐    │        │
│  │  │  myFunction SCOPE                         │    │        │
│  │  │  (no local variables)                     │    │        │
│  │  │                                           │    │        │
│  │  │  SCOPE CHAIN for myFunction:              │    │        │
│  │  │  myFunction → printName → Global          │    │        │
│  │  │                                           │    │        │
│  │  │  firstName lookup:                        │    │        │
│  │  │  myFunction ❌ → printName ✅ "harshit"   │    │        │
│  │  │                                           │    │        │
│  │  │  lastName lookup:                         │    │        │
│  │  │  myFunction ❌ → printName ❌ → Global ✅  │    │        │
│  │  │                            "Vashistha"    │    │        │
│  │  └──────────────────────────────────────────┘    │        │
│  └──────────────────────────────────────────────────┘        │
└──────────────────────────────────────────────────────────────┘
```

### Lexical Environment Explained

```
"Lexical" means "where the code is physically written"

myFunction is WRITTEN INSIDE printName
  → So myFunction's lexical parent is printName
  → printName is WRITTEN INSIDE global
  → So printName's lexical parent is global

This PHYSICAL nesting determines the scope chain.
It does NOT matter WHERE the function is CALLED from —
it matters WHERE the function is WRITTEN.
```

### Call Stack

```
Start      printName()         myFunction()          Returns         Returns
┌──────┐  ┌──────────────┐   ┌──────────────┐      ┌────────────┐  ┌──────┐
│      │  │ printName()  │   │ myFunction() │      │ printName()│  │      │
│Global│  │ Global()     │   │ printName()  │      │ Global()   │  │Global│
└──────┘  └──────────────┘   │ Global()     │      └────────────┘  └──────┘
                             └──────────────┘
```

### Final Output

```
harshit       ← found in printName's scope (parent)
Vashistha     ← found in global scope (grandparent)
```

### Deep Dive: How Scope Chain Lookup Works Internally

```
When myFunction executes console.log(firstName):

┌──────────────────────────────────────────────────────────────┐
│  VARIABLE LOOKUP ALGORITHM (simplified):                      │
│                                                               │
│  function lookupVariable(name, currentScope) {                │
│                                                               │
│      Step 1: Check current scope's variable environment       │
│              Does myFunction scope have "firstName"?          │
│              → Scan memory table... NOT FOUND                 │
│                                                               │
│      Step 2: Follow outer environment reference               │
│              myFunction was WRITTEN INSIDE printName           │
│              → Go to printName's scope                        │
│                                                               │
│      Step 3: Check printName's variable environment           │
│              Does printName scope have "firstName"?           │
│              → Scan memory table... FOUND! ✅                 │
│              → Return "harshit"                               │
│                                                               │
│      (If not found, would continue to global scope)           │
│      (If not found in global scope → ReferenceError)         │
│  }                                                            │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  THE LOOKUP IS ALWAYS ONE-WAY: INWARD → OUTWARD      │    │
│  │                                                       │    │
│  │  inner function CAN access outer's variables ✅       │    │
│  │  outer function CANNOT access inner's variables ❌    │    │
│  │                                                       │    │
│  │  Think of it like one-way mirrors:                    │    │
│  │  • From inside, you can see EVERYTHING outside        │    │
│  │  • From outside, you CANNOT see what's inside         │    │
│  └──────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────┘
```

### Deep Dive: Lexical (Static) Scoping vs Dynamic Scoping

```
JavaScript uses LEXICAL (STATIC) scoping.
This means scope is determined by WHERE the function is WRITTEN,
NOT where it is CALLED.

┌──────────────────────────────────────────────────────────────┐
│  EXAMPLE to understand the difference:                        │
│                                                               │
│  const x = "global";                                          │
│                                                               │
│  function foo() {                                             │
│      console.log(x);                                          │
│  }                                                            │
│                                                               │
│  function bar() {                                             │
│      const x = "bar's x";                                     │
│      foo();  // What does foo print?                          │
│  }                                                            │
│                                                               │
│  bar();                                                       │
│                                                               │
│  ─────────────────────────────────────────────────            │
│                                                               │
│  LEXICAL SCOPING (JavaScript):                                │
│  foo is WRITTEN in global scope → looks up x in global       │
│  → prints "global" ✅                                         │
│                                                               │
│  DYNAMIC SCOPING (not JavaScript):                            │
│  foo is CALLED from bar → would look up x in bar's scope    │
│  → would print "bar's x"                                     │
│                                                               │
│  JavaScript ALWAYS uses lexical scoping!                      │
│  WHERE you write the function determines its scope chain,     │
│  NOT where you call it from.                                  │
└──────────────────────────────────────────────────────────────┘
```

---

# File 8: 98.js

## Topic: Closures — Function Returning Function

### The Code

```javascript
// closures

// function can return functions, object, array, number, String

function printFullName(firstName, lastName) {

    function printName() {
        console.log(firstName, lastName);
    }

    return printName;
}

// when outer function return the inner function then it will return 
// with variables which are used in inner function.

const ans = printFullName("harshit", "sharma");
console.log(ans);
ans();
```

### What is a Closure?

```
┌─────────────────────────────────────────────────────────────────┐
│                     WHAT IS A CLOSURE?                            │
│                                                                   │
│  A closure is when a function "remembers" variables from its     │
│  outer (parent) scope, even AFTER the outer function has         │
│  finished executing and been removed from the call stack.        │
│                                                                   │
│  Think of it like a backpack:                                    │
│  When inner function is returned, it takes a "backpack"          │
│  containing all the variables it needs from the outer function.  │
└─────────────────────────────────────────────────────────────────┘
```

### Step-by-Step Execution

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                   │
│  Line 17: const ans = printFullName("harshit", "sharma");         │
│                                                                   │
│  STEP 1: printFullName is called                                  │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  printFullName EXECUTION CONTEXT                          │    │
│  │                                                           │    │
│  │  Memory:                                                  │    │
│  │  ┌──────────────┬──────────────────────┐                 │    │
│  │  │ firstName    │ "harshit"            │                 │    │
│  │  ├──────────────┼──────────────────────┤                 │    │
│  │  │ lastName     │ "sharma"             │                 │    │
│  │  ├──────────────┼──────────────────────┤                 │    │
│  │  │ printName    │ function(){...}      │                 │    │
│  │  └──────────────┴──────────────────────┘                 │    │
│  │                                                           │    │
│  │  return printName;                                        │    │
│  │  → Returns the printName function                         │    │
│  │  → printFullName is DONE, popped from call stack          │    │
│  │  → BUT firstName and lastName are NOT destroyed!          │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                   │
│  STEP 2: ans = printName (with closure)                           │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  What ans actually holds:                                 │    │
│  │                                                           │    │
│  │  ans = function printName() {                             │    │
│  │      console.log(firstName, lastName);                    │    │
│  │  }                                                        │    │
│  │  + CLOSURE (backpack): {                                  │    │
│  │      firstName: "harshit",                                │    │
│  │      lastName: "sharma"                                   │    │
│  │  }                                                        │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                   │
│  Line 18: console.log(ans);                                       │
│           → OUTPUT: ƒ printName() { console.log(firstName, lastName); }
│                                                                   │
│  Line 19: ans();                                                  │
│           → Calls printName                                       │
│           → Needs firstName → looks in closure → "harshit" ✅    │
│           → Needs lastName → looks in closure → "sharma" ✅      │
│           → OUTPUT: harshit sharma                                │
└──────────────────────────────────────────────────────────────────┘
```

### Closure Diagram

```
BEFORE printFullName returns:        AFTER printFullName returns:

Call Stack:                          Call Stack:
┌──────────────────┐                ┌──────────────────┐
│ printFullName()  │                │                  │
│ Global()         │                │ Global()         │
└──────────────────┘                └──────────────────┘

printFullName's memory:              printFullName's memory:
┌──────────────────┐                DESTROYED! ❌
│ firstName:"harshit"│               
│ lastName: "sharma" │               BUT...
│ printName: func   │               
└──────────────────┘                ans still holds printName
                                    WITH a closure containing:
                                    ┌──────────────────────┐
                                    │ 🎒 CLOSURE BACKPACK  │
                                    │ firstName: "harshit"  │
                                    │ lastName: "sharma"    │
                                    └──────────────────────┘

When ans() is called:
printName looks for firstName → not in own scope
→ checks closure backpack → found "harshit"! ✅
```

### Final Output

```
ƒ printName() { console.log(firstName, lastName); }    ← the function itself
harshit sharma                                          ← closure in action!
```

### Deep Dive: How Closures Work in Memory

```
┌──────────────────────────────────────────────────────────────┐
│  NORMAL FUNCTION (no closure):                                │
│                                                               │
│  function add(a, b) { return a + b; }                        │
│  const result = add(3, 5);                                    │
│                                                               │
│  Call Stack during add():     Call Stack after add():          │
│  ┌──────────────────┐        ┌──────────────────┐            │
│  │ add()            │        │                  │            │
│  │ Memory:          │        │ Global()         │            │
│  │  a=3, b=5        │        └──────────────────┘            │
│  │ Global()         │        a and b are GONE!               │
│  └──────────────────┘        Garbage collected. ✅           │
│                                                               │
│  ──────────────────────────────────────────────────────       │
│                                                               │
│  CLOSURE FUNCTION:                                            │
│                                                               │
│  function outer(name) {                                       │
│      return function inner() { console.log(name); }          │
│  }                                                            │
│  const greet = outer("Jayesh");                               │
│                                                               │
│  Call Stack during outer():    Call Stack after outer():       │
│  ┌──────────────────┐        ┌──────────────────┐            │
│  │ outer()          │        │                  │            │
│  │ Memory:          │        │ Global()         │            │
│  │  name="Jayesh"   │        └──────────────────┘            │
│  │ Global()         │        outer is GONE from stack...     │
│  └──────────────────┘        BUT name="Jayesh" is NOT        │
│                               garbage collected! ❌           │
│                                                               │
│  WHY? Because the inner function (now stored in greet)        │
│  still REFERENCES name. The garbage collector sees this       │
│  reference and KEEPS name alive in memory.                    │
│                                                               │
│  ┌── HEAP MEMORY ─────────────────────────────────────┐      │
│  │                                                     │      │
│  │  greet (the inner function) stored here:            │      │
│  │  {                                                  │      │
│  │    [[Code]]: "console.log(name)"                    │      │
│  │    [[Scopes]]: [                                    │      │
│  │      { name: "Jayesh" }  ← CLOSURE SCOPE           │      │
│  │      { ... }             ← Global scope             │      │
│  │    ]                                                │      │
│  │  }                                                  │      │
│  │                                                     │      │
│  │  The [[Scopes]] property is how the engine          │      │
│  │  internally stores the closure!                     │      │
│  │  You can see this in Chrome DevTools → Sources →    │      │
│  │  set a breakpoint → check "Scope" panel             │      │
│  └─────────────────────────────────────────────────────┘      │
└──────────────────────────────────────────────────────────────┘
```

### Deep Dive: Visualizing Closure in Chrome DevTools

```
If you add a breakpoint inside printName() and run the code,
Chrome DevTools shows this in the Scope panel:

┌── SCOPE PANEL ─────────────────────────────────┐
│                                                  │
│  ▼ Local                                         │
│    this: Window                                  │
│                                                  │
│  ▼ Closure (printFullName)    ← HERE IT IS!     │
│    firstName: "harshit"                          │
│    lastName: "sharma"                            │
│                                                  │
│  ▼ Global                                        │
│    ans: ƒ printName()                            │
│    printFullName: ƒ printFullName()              │
│    ...                                           │
└──────────────────────────────────────────────────┘

Chrome explicitly labels it "Closure" and shows
which variables are captured from which function!
```

---

# File 9: 99.js

## Topic: Closures with Captured Variables

### The Code

```javascript
// example 2

function hello(x) {

    const a = "varA";
    const b = "varB";

    return function () {
        console.log(a, b, x);
    }
}

const ans = hello("arg");
ans();

// in the ans variable - store the function which is return by the hello -
// so it will return the function with variable a, b, x
```

### Step-by-Step Execution

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                   │
│  Line 13: const ans = hello("arg");                               │
│                                                                   │
│  STEP 1: hello("arg") is called                                  │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  hello EXECUTION CONTEXT                                  │    │
│  │                                                           │    │
│  │  Memory:                                                  │    │
│  │  ┌──────────────┬──────────────────────┐                 │    │
│  │  │ x            │ "arg" (parameter)    │                 │    │
│  │  ├──────────────┼──────────────────────┤                 │    │
│  │  │ a            │ "varA"               │                 │    │
│  │  ├──────────────┼──────────────────────┤                 │    │
│  │  │ b            │ "varB"               │                 │    │
│  │  └──────────────┴──────────────────────┘                 │    │
│  │                                                           │    │
│  │  return function() { console.log(a, b, x); }             │    │
│  │  → Returns anonymous function WITH closure                │    │
│  │  → hello() is popped from call stack                      │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                   │
│  STEP 2: ans now holds the returned function + closure            │
│                                                                   │
│  ans = function() { console.log(a, b, x); }                      │
│        + 🎒 Closure: { a: "varA", b: "varB", x: "arg" }         │
│                                                                   │
│  Line 14: ans();                                                  │
│  → Executes the anonymous function                                │
│  → Needs a → closure → "varA" ✅                                 │
│  → Needs b → closure → "varB" ✅                                 │
│  → Needs x → closure → "arg" ✅                                  │
│  → OUTPUT: varA varB arg                                          │
└──────────────────────────────────────────────────────────────────┘
```

### What Gets Captured in the Closure?

```
function hello(x) {           ← x is a parameter (also captured!)
    const a = "varA";         ← local variable (captured)
    const b = "varB";         ← local variable (captured)

    return function () {
        console.log(a, b, x); ← uses a, b, x from parent
    }                            so ALL THREE are in the closure
}

┌────────────────────────────────────────────┐
│  The inner function uses: a, b, x          │
│                                            │
│  Closure captures ALL of them:             │
│  ┌──────────────────────────────────────┐  │
│  │  🎒 Closure = {                      │  │
│  │      a: "varA",    ← const variable  │  │
│  │      b: "varB",    ← const variable  │  │
│  │      x: "arg"      ← parameter!      │  │
│  │  }                                    │  │
│  └──────────────────────────────────────┘  │
│                                            │
│  Key: Parameters ARE also captured!        │
│  They are just variables in the function   │
│  scope, so closures include them too.      │
└────────────────────────────────────────────┘
```

### Final Output

```
varA varB arg
```

---

# File 10: 100.js

## Topic: Closure Practical — Power Function (Square, Cube)

### The Code

```javascript
// example 3    

function myFunction(power) {
    return function (number) {
        return number ** power
    }
}

const square = myFunction(2);
const ans = square(3);
console.log(ans);

const cube = myFunction(3);
const ans2 = cube(3);
console.log(ans2);
```

### Step-by-Step Execution

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                   │
│  Line 9: const square = myFunction(2);                            │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  myFunction(2) EXECUTION CONTEXT                          │    │
│  │  Memory: { power: 2 }                                     │    │
│  │                                                           │    │
│  │  return function(number) { return number ** power }       │    │
│  │  → Returns function + closure { power: 2 }               │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                   │
│  square = function(number) { return number ** power }             │
│           + 🎒 Closure: { power: 2 }                             │
│                                                                   │
│  Line 10: const ans = square(3);                                  │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  square(3) EXECUTION CONTEXT                              │    │
│  │  Memory: { number: 3 }                                    │    │
│  │  Closure: { power: 2 }                                    │    │
│  │                                                           │    │
│  │  return number ** power                                   │    │
│  │  return 3 ** 2                                            │    │
│  │  return 9                                                 │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                   │
│  ans = 9                                                          │
│  Line 11: console.log(ans);  → OUTPUT: 9                          │
│                                                                   │
│  ──────────────────────────────────────────────────────           │
│                                                                   │
│  Line 13: const cube = myFunction(3);                             │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  myFunction(3) EXECUTION CONTEXT                          │    │
│  │  Memory: { power: 3 }                                     │    │
│  │                                                           │    │
│  │  return function(number) { return number ** power }       │    │
│  │  → Returns function + closure { power: 3 }               │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                   │
│  cube = function(number) { return number ** power }               │
│         + 🎒 Closure: { power: 3 }                               │
│                                                                   │
│  Line 14: const ans2 = cube(3);                                   │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  cube(3) EXECUTION CONTEXT                                │    │
│  │  Memory: { number: 3 }                                    │    │
│  │  Closure: { power: 3 }                                    │    │
│  │                                                           │    │
│  │  return number ** power                                   │    │
│  │  return 3 ** 3                                            │    │
│  │  return 27                                                │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                   │
│  ans2 = 27                                                        │
│  Line 15: console.log(ans2);  → OUTPUT: 27                        │
└──────────────────────────────────────────────────────────────────┘
```

### How Two Closures Exist Independently

```
myFunction(2) creates:                myFunction(3) creates:
┌────────────────────────┐           ┌────────────────────────┐
│  square = function()   │           │  cube = function()     │
│  🎒 Closure:           │           │  🎒 Closure:           │
│  { power: 2 }          │           │  { power: 3 }          │
└────────────────────────┘           └────────────────────────┘
         │                                    │
         ▼                                    ▼
  square(3)                            cube(3)
  3 ** 2 = 9                           3 ** 3 = 27

Each call to myFunction creates a SEPARATE closure!
square's closure has power=2, cube's closure has power=3.
They don't interfere with each other.
```

### This is a "Function Factory" Pattern

```
┌─────────────────────────────────────────────────────────┐
│  myFunction is a FACTORY that creates specialized       │
│  functions based on the argument you pass:              │
│                                                          │
│  myFunction(2) → creates a "squaring" function          │
│  myFunction(3) → creates a "cubing" function            │
│  myFunction(4) → creates a "4th power" function         │
│  myFunction(0.5) → creates a "square root" function     │
│                                                          │
│  Each returned function "remembers" its power value     │
│  through closure — even after myFunction has returned.  │
└─────────────────────────────────────────────────────────┘
```

### Final Output

```
9       ← 3 ** 2 (square)
27      ← 3 ** 3 (cube)
```

### Deep Dive: Why Each Closure is Independent

```
┌──────────────────────────────────────────────────────────────┐
│  COMMON CONFUSION: Do square and cube share the same power?  │
│                                                               │
│  NO! Each call to myFunction() creates a BRAND NEW           │
│  execution context with its OWN memory:                      │
│                                                               │
│  myFunction(2) called:                                        │
│  ┌─────────────────────┐                                     │
│  │  Execution Context 1 │                                     │
│  │  Memory: power = 2   │ → returns function + closure {2}   │
│  └─────────────────────┘                                     │
│                              ↓                                │
│                    square has closure: { power: 2 }           │
│                                                               │
│  myFunction(3) called (SEPARATE call):                        │
│  ┌─────────────────────┐                                     │
│  │  Execution Context 2 │  ← DIFFERENT context!              │
│  │  Memory: power = 3   │ → returns function + closure {3}   │
│  └─────────────────────┘                                     │
│                              ↓                                │
│                    cube has closure: { power: 3 }             │
│                                                               │
│  These are TWO SEPARATE closures with SEPARATE memories:     │
│                                                               │
│  square's backpack: 🎒 { power: 2 }                          │
│  cube's backpack:   🎒 { power: 3 }                          │
│                                                               │
│  They NEVER interfere with each other.                        │
│  Changing one does not affect the other.                      │
│                                                               │
│  It's like two people who went to the SAME school             │
│  but graduated in DIFFERENT years — they have their own       │
│  memories of the school!                                      │
└──────────────────────────────────────────────────────────────┘
```

### Deep Dive: The `**` (Exponentiation) Operator

```
The ** operator raises a number to a power:

  number ** power

  3 ** 2  =  3 × 3         =  9     (3 squared)
  3 ** 3  =  3 × 3 × 3     =  27    (3 cubed)
  2 ** 10 =  2 × 2 × ... × 2 = 1024 (2 to the 10th)
  5 ** 0  =  1                        (any number to power 0 = 1)

  It's the same as Math.pow(number, power) but shorter.
  Introduced in ES2016 (ES7).
```

---

# File 11: 101.js

## Topic: Closure Practical — Counter with Call-Once Pattern

### The Code

```javascript
function func() {
    let counter = 0;
    return function () {
        if (counter < 1) {
            console.log("Hi You Called me");
            counter++;
        } else {
            console.log("Mai already ek bar call ho chuka hoon!");
        }
    }
}

const myFunc = func();
myFunc();
myFunc();

// func will return the function with counter value
```

### Step-by-Step Execution

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                   │
│  Line 13: const myFunc = func();                                  │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  func() EXECUTION CONTEXT                                 │    │
│  │  Memory: { counter: 0 }                                   │    │
│  │                                                           │    │
│  │  return function() { if(counter < 1)... }                 │    │
│  │  → Returns function + closure { counter: 0 }             │    │
│  │  → func() popped from call stack                          │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                   │
│  myFunc = function() { if(counter < 1)... }                       │
│           + 🎒 Closure: { counter: 0 }                           │
│                                                                   │
│  ─────────────────────────────────────────────────────────       │
│                                                                   │
│  Line 14: myFunc();  ← FIRST CALL                                │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  Execution:                                               │    │
│  │  Check: counter < 1  →  0 < 1  →  TRUE ✅                │    │
│  │  → console.log("Hi You Called me")                        │    │
│  │  → OUTPUT: Hi You Called me                               │    │
│  │  → counter++  →  counter: 0 → 1                          │    │
│  │                                                           │    │
│  │  Closure after this call: { counter: 1 }                  │    │
│  └──────────────────────────────────────────────────────────┘    │
│                                                                   │
│  ─────────────────────────────────────────────────────────       │
│                                                                   │
│  Line 15: myFunc();  ← SECOND CALL                               │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  Execution:                                               │    │
│  │  Check: counter < 1  →  1 < 1  →  FALSE ❌               │    │
│  │  → Goes to else branch                                    │    │
│  │  → console.log("Mai already ek bar call ho chuka hoon!")  │    │
│  │  → OUTPUT: Mai already ek bar call ho chuka hoon!         │    │
│  │                                                           │    │
│  │  Closure still: { counter: 1 }                            │    │
│  └──────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────┘
```

### Closure Maintains STATE Across Calls

```
This is the KEY insight about closures:
The closure variable (counter) PERSISTS between function calls!

Call 1:                              Call 2:
┌──────────────────────┐            ┌──────────────────────┐
│  myFunc()            │            │  myFunc()            │
│                      │            │                      │
│  🎒 counter = 0      │            │  🎒 counter = 1      │
│  0 < 1 → TRUE       │            │  1 < 1 → FALSE      │
│  "Hi You Called me"  │            │  "Mai already..."   │
│  counter++ → 1       │            │                      │
└──────────────────────┘            └──────────────────────┘
         │                                    │
         └──── counter is NOW 1 ──────────────┘
               (persisted in closure!)

The counter variable is NOT reset between calls!
It lives in the closure and maintains its value.
```

### Why This Pattern is Useful

```
┌─────────────────────────────────────────────────────────┐
│  REAL-WORLD USE CASES for this pattern:                  │
│                                                          │
│  1. Run-once functions:                                  │
│     Initialize something only once (DB connection,       │
│     API setup, event listener setup)                     │
│                                                          │
│  2. Rate limiting:                                       │
│     Limit how many times something can be called         │
│                                                          │
│  3. Private state:                                       │
│     counter is PRIVATE — no outside code can access      │
│     or modify it directly. Only the returned function    │
│     can read/write counter through the closure.          │
│                                                          │
│  4. Memoization:                                         │
│     Cache results of expensive computations              │
│                                                          │
│  This is JavaScript's way of creating PRIVATE variables  │
│  (before class private fields #variable existed)         │
└─────────────────────────────────────────────────────────┘
```

### Final Output

```
Hi You Called me                              ← first call (counter was 0)
Mai already ek bar call ho chuka hoon!        ← second call (counter is now 1)
```

### Deep Dive: Closure Creates PRIVATE Variables

```
┌──────────────────────────────────────────────────────────────┐
│  THE MOST POWERFUL THING ABOUT THIS PATTERN:                  │
│                                                               │
│  The 'counter' variable is COMPLETELY PRIVATE.                │
│                                                               │
│  Outside code CANNOT:                                         │
│  ❌ counter = 0;         // ReferenceError — doesn't exist   │
│  ❌ myFunc.counter = 0;  // Creates a NEW property, not      │
│                          // the closure variable!             │
│  ❌ func.counter = 0;    // Same — can't touch the closure   │
│                                                               │
│  Only the returned function can READ and WRITE counter.      │
│  This is JavaScript's version of PRIVATE variables!          │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐    │
│  │  Before class private fields (#counter) existed       │    │
│  │  in ES2022, closures were THE way to make             │    │
│  │  private state in JavaScript.                         │    │
│  │                                                       │    │
│  │  Many libraries (jQuery, Lodash, React hooks)         │    │
│  │  use this pattern internally!                         │    │
│  └──────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────┘
```

### Deep Dive: What If We Call func() Again?

```javascript
const myFunc = func();    // Creates closure with counter=0
const myFunc2 = func();   // Creates ANOTHER closure with counter=0

myFunc();   // "Hi You Called me"  (myFunc's counter: 0 → 1)
myFunc();   // "Mai already..."    (myFunc's counter is 1)

myFunc2();  // "Hi You Called me"  (myFunc2's counter: 0 → 1)
myFunc2();  // "Mai already..."    (myFunc2's counter is 1)
```

```
Each call to func() creates a SEPARATE closure:

myFunc's closure:   🎒 { counter: 0 → 1 }
myFunc2's closure:  🎒 { counter: 0 → 1 }

They are INDEPENDENT. Calling myFunc does NOT affect myFunc2's counter.

┌────────────────────┐     ┌────────────────────┐
│  myFunc             │     │  myFunc2            │
│  🎒 counter = 1     │     │  🎒 counter = 1     │
│  (has been called   │     │  (has been called   │
│   twice)            │     │   twice)            │
└────────────────────┘     └────────────────────┘
      ↑ SEPARATE ↑              ↑ SEPARATE ↑
```

### Deep Dive: Real-World Closure Pattern — Module Pattern

```
This counter pattern is the basis of the MODULE PATTERN,
which was the most common design pattern before ES Modules:

const UserModule = (function() {
    // PRIVATE state (closure variables)
    let users = [];
    let nextId = 1;

    // PUBLIC methods (returned in object)
    return {
        addUser: function(name) {
            users.push({ id: nextId++, name: name });
        },
        getUsers: function() {
            return [...users];  // return copy, not reference
        },
        getUserCount: function() {
            return users.length;
        }
    };
})();

UserModule.addUser("Jayesh");
UserModule.addUser("Harshit");
console.log(UserModule.getUserCount());  // 2
console.log(UserModule.users);           // undefined! (PRIVATE)

// users array and nextId are PRIVATE — closure protects them.
// Only addUser, getUsers, getUserCount can access them.
```

---

# Summary: Concept Progression Across All Files

```
FILE       CONCEPT                    BUILDS ON
─────────────────────────────────────────────────────────────────
hjw_01 →  Global Context, this,      Foundation: how JS starts
          window, var hoisting

hjw_02 →  Hoisting: var vs           Why functions work before
          function declarations      their declaration line

hjw_03 →  Function expression        Why var + function = trap
          hoisting (the trap!)       (undefined, not function)

hjw_04 →  let/const TDZ              Modern JS fixes hoisting
                                     confusion with TDZ

hjw_05 →  Function execution         Each function call creates
          context, block scope       its own isolated world

96.js  →  arguments object,          What JS auto-creates inside
          parameters, return         every function context

97.js  →  Lexical environment,       How nested functions find
          scope chain                variables in parent scopes

98.js  →  Closures intro             Functions remember their
                                     parent's variables!

99.js  →  Closure captures all       Parameters + locals are
          used variables             all captured

100.js →  Closure: function          Practical: create specialized
          factory pattern            functions (square, cube)

101.js →  Closure: private state     Practical: variables persist
          & run-once pattern         between calls (counter)
─────────────────────────────────────────────────────────────────
```

## The Complete Mental Model

```
┌──────────────────────────────────────────────────────────────────┐
│            HOW JAVASCRIPT WORKS — THE COMPLETE PICTURE            │
│                                                                   │
│  1. BROWSER loads your JS file                                    │
│                      │                                            │
│                      ▼                                            │
│  2. ENGINE does COMPILATION (scan everything, allocate memory)    │
│     • var → undefined                                             │
│     • let/const → uninitialized (TDZ)                            │
│     • function declarations → full body stored                    │
│                      │                                            │
│                      ▼                                            │
│  3. ENGINE does EXECUTION (line by line, one at a time)           │
│     • Variables get real values                                   │
│     • Function calls create NEW execution contexts               │
│     • Each context has: variables + scope chain + this            │
│                      │                                            │
│                      ▼                                            │
│  4. CALL STACK manages execution contexts (LIFO)                  │
│     • Push when function called                                   │
│     • Pop when function returns                                   │
│                      │                                            │
│                      ▼                                            │
│  5. SCOPE CHAIN resolves variable lookups                         │
│     • Check current scope → parent scope → ... → global         │
│     • Determined by WHERE code is WRITTEN (lexical)              │
│                      │                                            │
│                      ▼                                            │
│  6. CLOSURES keep variables alive after function returns          │
│     • Inner function + outer variables = closure                  │
│     • Variables persist in closure "backpack"                     │
│     • Each closure is independent                                 │
│     • Enables private state, factories, callbacks                │
└──────────────────────────────────────────────────────────────────┘
```

---

# Interview Preparation: Every Concept in Detail

## Detailed Definitions, Explanations & Interview Q&A for Each Concept

---

## 1. JavaScript Engine

### Definition
A JavaScript Engine is a program (written in C++) that **reads, interprets, and executes** JavaScript code. Every browser has its own JS engine.

### Popular Engines

| Browser | Engine | Creator |
|---------|--------|---------|
| Chrome | V8 | Google |
| Firefox | SpiderMonkey | Mozilla |
| Safari | JavaScriptCore (Nitro) | Apple |
| Edge | V8 (was Chakra) | Microsoft |
| Node.js | V8 | Google |

### How It Works Internally

```
Your JS Code (text)
      │
      ▼
┌─────────────────┐     Breaks code into tokens:
│  1. LEXER /     │     "var", "x", "=", "5", ";"
│     TOKENIZER   │     Identifies keywords, operators, names
└────────┬────────┘
         │
         ▼
┌─────────────────┐     Builds a tree structure (AST):
│  2. PARSER      │     Program → VariableDeclaration → Identifier("x")
│                 │     Checks for syntax errors HERE
└────────┬────────┘     (SyntaxError thrown if invalid code)
         │
         ▼
┌─────────────────┐     Reads AST, generates bytecode
│  3. INTERPRETER │     (intermediate representation)
│  (Ignition)     │     Starts executing immediately
└────────┬────────┘     Slower but fast startup
         │
         ▼
┌─────────────────┐     Watches for "hot" code (loops, repeated calls)
│  4. JIT COMPILER│     Compiles hot code to optimized MACHINE CODE
│  (TurboFan)     │     Much faster execution
└─────────────────┘     Can de-optimize if assumptions break
```

### Interview Q&A

**Q: Is JavaScript interpreted or compiled?**
A: Neither purely. Modern JavaScript engines use **JIT (Just-In-Time) compilation** — a hybrid approach. Code is first interpreted (for fast startup), then frequently-run code is compiled to optimized machine code at runtime.

**Q: What is an AST?**
A: Abstract Syntax Tree — a tree representation of your code's structure. The parser converts source code text into this tree, which the interpreter can then process. Tools like Babel and ESLint also use ASTs.

**Q: What happens if there's a syntax error?**
A: The Parser catches it BEFORE any code runs. That's why a syntax error on line 50 prevents even line 1 from executing — the entire file is parsed first.

---

## 2. Execution Context

### Definition
An Execution Context is the **environment (container/wrapper)** in which JavaScript code is evaluated and executed. It contains everything the code needs: variables, functions, the scope chain, and the value of `this`.

### Types of Execution Context

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                   │
│  1. GLOBAL EXECUTION CONTEXT (GEC)                               │
│     • Created automatically when program starts                  │
│     • Only ONE per program                                       │
│     • Creates: global object (window/global) + this              │
│     • Destroyed when page closes / program ends                  │
│                                                                   │
│  2. FUNCTION EXECUTION CONTEXT (FEC)                             │
│     • Created EVERY TIME a function is called                    │
│     • Can be MANY (one per function call)                        │
│     • Creates: arguments object + local variables + this         │
│     • Destroyed when function returns (unless closure)           │
│                                                                   │
│  3. EVAL EXECUTION CONTEXT                                       │
│     • Created when eval() is used (AVOID using eval!)            │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Three Components of Every Execution Context

```
┌── EXECUTION CONTEXT ─────────────────────────────────────────┐
│                                                               │
│  ┌─────────────────────────────────────────────────────┐     │
│  │ 1. VARIABLE ENVIRONMENT                              │     │
│  │    Stores all variables, function declarations,      │     │
│  │    and function arguments (parameters)               │     │
│  │                                                      │     │
│  │    var x → stored as undefined (then gets value)     │     │
│  │    let y → stored as uninitialized (TDZ)             │     │
│  │    function foo() {} → stored with full body         │     │
│  └─────────────────────────────────────────────────────┘     │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐     │
│  │ 2. SCOPE CHAIN (Outer Environment Reference)        │     │
│  │    A reference to the parent execution context       │     │
│  │    Used for variable lookup when not found locally   │     │
│  │                                                      │     │
│  │    inner scope → outer scope → ... → global scope    │     │
│  └─────────────────────────────────────────────────────┘     │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐     │
│  │ 3. this BINDING                                      │     │
│  │    The value of 'this' keyword in this context       │     │
│  │                                                      │     │
│  │    Global:        this = window                      │     │
│  │    Regular func:  this = window (non-strict)         │     │
│  │                   this = undefined (strict)          │     │
│  │    Method:        this = object before the dot       │     │
│  │    Arrow func:    this = lexical (inherited)         │     │
│  │    new keyword:   this = new empty object            │     │
│  └─────────────────────────────────────────────────────┘     │
└───────────────────────────────────────────────────────────────┘
```

### Two Phases of Execution Context

```
PHASE 1: CREATION PHASE (Compilation)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Happens BEFORE any code runs. Engine scans the code and:
  ① Creates the Variable Object (VO)
    • Function declarations → stored completely
    • var variables → initialized to undefined
    • let/const → registered but uninitialized (TDZ)
    • Function parameters → set to argument values
  ② Establishes the Scope Chain
  ③ Determines the value of 'this'


PHASE 2: EXECUTION PHASE
━━━━━━━━━━━━━━━━━━━━━━━━
Code runs line by line:
  ① Variables are assigned their actual values
  ② Expressions are evaluated
  ③ Functions are called (creating new execution contexts)
  ④ Conditions are checked
  ⑤ Loops iterate
```

### Interview Q&A

**Q: What is an execution context?**
A: It's the environment where JavaScript code runs. It stores the variables, the scope chain, and `this` value. A new one is created for every function call and pushed onto the call stack.

**Q: How many execution contexts can exist at a time?**
A: Only ONE is actively running (the one on top of the call stack). But many can exist simultaneously — the ones below on the stack are paused, waiting for the current one to finish.

**Q: When is the global execution context created and destroyed?**
A: Created when the JavaScript program starts (page loads in browser). Destroyed when the page is closed or navigated away. It's always the first context created and the last one destroyed.

---

## 3. Call Stack

### Definition
The Call Stack is a **data structure (LIFO — Last In, First Out)** that the JavaScript engine uses to keep track of function calls. It records where in the program we currently are and which functions are waiting to resume.

### How It Works

```
RULE 1: When a function is CALLED  → PUSH its context onto the stack
RULE 2: When a function RETURNS    → POP its context from the stack
RULE 3: Whatever is on TOP         → That's what's currently running
RULE 4: Everything BELOW the top   → Paused, waiting

Example:

function a() { b(); }
function b() { c(); }
function c() { console.log("done"); }
a();

Step 1:  Step 2:  Step 3:  Step 4:   Step 5:  Step 6:  Step 7:
         a()      b()      c()       c done   b done   a done
┌─────┐ ┌─────┐ ┌─────┐ ┌──────┐  ┌─────┐  ┌─────┐  ┌─────┐
│     │ │     │ │     │ │ c()  │  │     │  │     │  │     │
│     │ │     │ │ b() │ │ b()  │  │ b() │  │     │  │     │
│     │ │ a() │ │ a() │ │ a()  │  │ a() │  │ a() │  │     │
│GEC  │ │GEC  │ │GEC  │ │ GEC  │  │GEC  │  │GEC  │  │GEC  │
└─────┘ └─────┘ └─────┘ └──────┘  └─────┘  └─────┘  └─────┘
 push a  push b  push c  pop c    pop b    pop a    only GEC
```

### Stack Overflow

```
When the call stack exceeds its maximum size:

function infinite() {
    infinite();  // calls itself forever!
}
infinite();

┌──────────────┐
│ infinite()   │  ← call #10,000+
│ infinite()   │
│ infinite()   │
│ infinite()   │
│ ...          │  The stack keeps growing!
│ infinite()   │
│ infinite()   │
│ GEC          │
└──────────────┘

❌ RangeError: Maximum call stack size exceeded

This is called "Stack Overflow" — the stack ran out of space.
Chrome's V8 limit is approximately ~10,000-15,000 frames.
```

### Interview Q&A

**Q: What is the call stack?**
A: A LIFO data structure that tracks function execution. When a function is called, a new execution context is pushed on top. When it returns, the context is popped off. Only the topmost context runs at any time.

**Q: What is a stack overflow?**
A: When the call stack exceeds its maximum size, usually caused by infinite recursion (a function calling itself endlessly). JS throws `RangeError: Maximum call stack size exceeded`.

**Q: Why does JavaScript have only one call stack?**
A: Because JavaScript is **single-threaded** — it can only do one thing at a time. One thread = one call stack = one piece of code executing at any moment. Async operations (setTimeout, fetch) are handled by browser APIs, not the call stack itself.

---

## 4. Hoisting

### Definition
Hoisting is JavaScript's behavior of **moving declarations (NOT assignments) to the top of their scope** during the compilation phase. The code itself doesn't physically move — the engine just processes declarations before execution.

### How Different Declarations Are Hoisted

```
┌─────────────────────┬──────────────┬─────────────────┬────────────────────┐
│ Declaration Type     │ Hoisted?     │ Initial Value   │ Access Before Decl │
├─────────────────────┼──────────────┼─────────────────┼────────────────────┤
│ var x = 5;          │ ✅ Yes       │ undefined       │ undefined (silent) │
│ let x = 5;          │ ✅ Yes       │ <uninitialized> │ ReferenceError     │
│ const x = 5;        │ ✅ Yes       │ <uninitialized> │ ReferenceError     │
│ function foo() {}   │ ✅ Yes       │ Full function   │ Works normally!    │
│ var foo = function()│ ✅ Yes (var) │ undefined       │ TypeError          │
│ var foo = () => {}  │ ✅ Yes (var) │ undefined       │ TypeError          │
│ let foo = () => {}  │ ✅ Yes (let) │ <uninitialized> │ ReferenceError     │
│ class Foo {}        │ ✅ Yes       │ <uninitialized> │ ReferenceError     │
└─────────────────────┴──────────────┴─────────────────┴────────────────────┘
```

### What Actually Happens Internally

```
YOUR CODE:                        ENGINE SEES IT AS:
──────────                        ──────────────────

console.log(a);                   // COMPILATION: var a = undefined
console.log(b);                   // COMPILATION: let b = <uninitialized>
console.log(greet);               // COMPILATION: greet = function(){...}
                                  
var a = 10;                       // EXECUTION starts here:
let b = 20;                       // console.log(a) → undefined
function greet() {                // console.log(b) → ReferenceError (TDZ!)
    console.log("hi");            // console.log(greet) → ƒ greet(){...}
}                                 // a = 10
                                  // b = 20 (TDZ ends)
                                  // greet already stored
```

### The Key Insight

```
"var x = 10;" is actually TWO operations that happen in DIFFERENT phases:

Phase 1 (Compilation):  var x;        → x = undefined
Phase 2 (Execution):    x = 10;       → x = 10

The DECLARATION (var x) is processed in compilation.
The ASSIGNMENT (= 10) is processed in execution.
They are SPLIT across two phases!
```

### Interview Q&A

**Q: What is hoisting?**
A: During compilation, JavaScript moves variable and function declarations to the top of their scope. `var` is initialized with `undefined`, function declarations are stored completely, and `let`/`const` are registered but left uninitialized (TDZ).

**Q: Are let and const hoisted?**
A: YES, they ARE hoisted (registered in memory during compilation). But unlike `var`, they are NOT initialized. Accessing them before the declaration line throws a ReferenceError because they're in the Temporal Dead Zone.

**Q: Why does `console.log(foo)` before `var foo = function(){}` give undefined, not the function?**
A: Because `var foo = function(){}` is a function EXPRESSION, not a declaration. The `var foo` part is hoisted as `undefined`. The function body is only assigned during execution. So before that line, `foo` is `undefined`.

**Q: Can hoisting cause bugs?**
A: Yes! With `var`, accessing a variable before its assignment silently returns `undefined` instead of throwing an error, which can hide bugs. This is one reason `let`/`const` were introduced — the TDZ catches these mistakes with a clear error.

---

## 5. Temporal Dead Zone (TDZ)

### Definition
The Temporal Dead Zone is the **period between when a `let`/`const` variable is hoisted (scope entry) and when it is initialized (declaration line)**. During this period, any attempt to access the variable throws a ReferenceError.

### Visual Explanation

```
function example() {
    //  ┌──── TDZ for 'name' STARTS here (top of scope) ────┐
    //  │                                                      │
    //  │  console.log(name);  // ❌ ReferenceError!          │
    //  │  console.log(name);  // ❌ ReferenceError!          │
    //  │  console.log(name);  // ❌ ReferenceError!          │
    //  │                                                      │
    //  └──── TDZ for 'name' ENDS here ─────────────────────┘
    let name = "Jayesh";       // ← Declaration line. TDZ ends!
    console.log(name);         // ✅ "Jayesh" — safe now
}
```

### TDZ Is Per-Scope, Not Per-File

```javascript
let x = "global";

function test() {
    // TDZ for local 'x' starts HERE (because let x exists below)
    console.log(x);   // ❌ ReferenceError! (NOT "global"!)
    let x = "local";  // TDZ ends here
    console.log(x);   // ✅ "local"
}
```

```
WHY doesn't it print "global"?

Because the engine KNOWS that a local 'x' will be declared 
(it saw it during compilation). So it creates a LOCAL 'x' 
in TDZ state — it does NOT fall back to the global 'x'.

This is different from var, where the lookup would find
the hoisted local var (which would be undefined).
```

### TDZ with typeof

```javascript
// No variable declared at all:
console.log(typeof undeclaredVar);  // "undefined" — no error!

// let variable in TDZ:
console.log(typeof myVar);         // ❌ ReferenceError!
let myVar = 10;

// typeof is normally "safe" (doesn't throw for undeclared variables)
// BUT it DOES throw for TDZ variables! This is by design.
```

### Interview Q&A

**Q: What is the Temporal Dead Zone?**
A: The TDZ is the region of code between the start of a scope and the `let`/`const` declaration line. The variable is hoisted but not initialized during this zone. Accessing it throws `ReferenceError: Cannot access 'x' before initialization`.

**Q: Why was TDZ introduced?**
A: To catch bugs early. With `var`, accessing a variable before assignment silently returns `undefined`, which hides errors. TDZ forces developers to declare variables before using them, making code more predictable and bugs more visible.

**Q: Does `const` also have a TDZ?**
A: Yes, `const` behaves exactly like `let` regarding TDZ. The only additional rule is that `const` must be initialized at declaration (`const x;` is a SyntaxError) and cannot be reassigned.

---

## 6. Scope & Scope Chain

### Definition
**Scope** determines the **accessibility (visibility)** of variables in different parts of your code. The **Scope Chain** is the ordered list of scopes the engine searches through when looking up a variable.

### Types of Scope

```
┌─────────────────────────────────────────────────────────────────┐
│  1. GLOBAL SCOPE                                                 │
│     Variables declared outside any function or block             │
│     Accessible from EVERYWHERE in your code                     │
│     var/function → attached to window object                    │
│     let/const → NOT attached to window                          │
│                                                                  │
│  2. FUNCTION SCOPE                                               │
│     Variables declared inside a function                         │
│     Accessible ONLY inside that function                        │
│     var, let, const ALL respect function scope                  │
│                                                                  │
│  3. BLOCK SCOPE (ES6+)                                           │
│     Variables declared inside { } (if, for, while, etc.)        │
│     let and const are block-scoped                              │
│     var is NOT block-scoped (it "escapes" blocks!)              │
│                                                                  │
│  4. MODULE SCOPE (ES Modules)                                    │
│     Variables in a module file are scoped to that module        │
│     Not available globally unless explicitly exported           │
└─────────────────────────────────────────────────────────────────┘
```

### var vs let in Blocks

```javascript
// var IGNORES block scope:
if (true) {
    var x = 10;
}
console.log(x);   // 10 ✅ — var leaked out of the block!

// let RESPECTS block scope:
if (true) {
    let y = 20;
}
console.log(y);   // ❌ ReferenceError — y doesn't exist here
```

```
┌────────────────────────────────────────────────────────────┐
│  WHY var leaks:                                             │
│                                                             │
│  var is FUNCTION-scoped, not block-scoped.                  │
│  An if-block is NOT a function, so var ignores it.          │
│  var only respects function boundaries.                     │
│                                                             │
│  let/const are BLOCK-scoped.                                │
│  ANY { } creates a boundary for let/const.                  │
│  This includes: if, for, while, switch, and plain { }      │
└────────────────────────────────────────────────────────────┘
```

### Scope Chain Lookup

```
When the engine encounters a variable, it searches:

  1. Current scope (local variables, parameters)
     ↓ not found?
  2. Outer (parent) scope
     ↓ not found?
  3. Outer's outer scope
     ↓ not found?
  4. ... continue outward ...
     ↓ not found?
  5. Global scope
     ↓ not found?
  6. ReferenceError!

This is ALWAYS outward — never inward or sideways.
Parent can NEVER access child's variables.
Sibling functions CANNOT access each other's variables.
```

```
const global = "I'm global";

function parent() {
    const parentVar = "I'm parent";
    
    function child() {
        const childVar = "I'm child";
        console.log(childVar);    // ✅ found in own scope
        console.log(parentVar);   // ✅ found in parent scope
        console.log(global);      // ✅ found in global scope
    }
    
    child();
    console.log(childVar);  // ❌ ReferenceError! Can't see child's vars
}

parent();
console.log(parentVar);    // ❌ ReferenceError! Can't see parent's vars
```

### Interview Q&A

**Q: What is scope in JavaScript?**
A: Scope defines where variables are accessible. JavaScript has global scope, function scope, block scope (let/const), and module scope. Variables are only accessible within their scope and any nested (inner) scopes.

**Q: What is the scope chain?**
A: An ordered list of scopes that JavaScript searches through when looking up a variable. It starts from the current scope and goes outward to parent scopes until it reaches the global scope. If the variable isn't found anywhere, a ReferenceError is thrown.

**Q: What's the difference between function scope and block scope?**
A: `var` is function-scoped — it's accessible anywhere within the function, even outside blocks like `if` or `for`. `let`/`const` are block-scoped — they're confined to the nearest `{ }` block.

**Q: What is lexical scoping?**
A: JavaScript uses lexical (static) scoping — the scope chain is determined by WHERE the function is WRITTEN in the source code, NOT where it is called. A function always has access to variables from the scope where it was defined.

---

## 7. Lexical Environment

### Definition
A Lexical Environment is an **internal data structure** that holds variable-to-value mappings for a specific scope. Every execution context has an associated lexical environment. It consists of an **Environment Record** (local variables) and a **reference to the outer lexical environment** (parent scope).

### Structure

```
┌── LEXICAL ENVIRONMENT ─────────────────────────────────┐
│                                                         │
│  ┌─── Environment Record ───────────────────────────┐  │
│  │                                                   │  │
│  │  Stores all local bindings:                       │  │
│  │  • Variable declarations (var, let, const)        │  │
│  │  • Function declarations                          │  │
│  │  • Function parameters                            │  │
│  │  • arguments object                               │  │
│  │                                                   │  │
│  │  ┌──────────────┬────────────────────────────┐   │  │
│  │  │ identifier    │ value                      │   │  │
│  │  ├──────────────┼────────────────────────────┤   │  │
│  │  │ firstName    │ "Jayesh"                    │   │  │
│  │  │ age          │ 25                          │   │  │
│  │  │ greet        │ function() {...}            │   │  │
│  │  └──────────────┴────────────────────────────┘   │  │
│  └───────────────────────────────────────────────────┘  │
│                                                         │
│  ┌─── Outer Environment Reference ──────────────────┐  │
│  │                                                   │  │
│  │  Points to → Parent Lexical Environment           │  │
│  │  (This is what creates the SCOPE CHAIN)           │  │
│  │                                                   │  │
│  │  Global's outer = null (no parent)                │  │
│  │  Function's outer = where it was defined          │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

### How Lexical Environments Chain Together

```
const a = "global a";

function outer() {
    const b = "outer b";
    
    function inner() {
        const c = "inner c";
        console.log(a, b, c);
    }
    inner();
}
outer();

Three Lexical Environments created:

┌── inner LE ──────────────┐
│  Record: { c: "inner c" }│
│  Outer: ──────────────────┼──►┌── outer LE ──────────────┐
└──────────────────────────┘    │  Record: { b: "outer b" }│
                                │  Outer: ──────────────────┼──►┌── global LE ────────────┐
                                └──────────────────────────┘    │  Record: { a: "global a"}│
                                                                │  Outer: null              │
                                                                └───────────────────────────┘

Lookup for 'a' from inner:
inner LE → not found → outer LE → not found → global LE → FOUND! "global a"
```

### Interview Q&A

**Q: What is a lexical environment?**
A: An internal structure that stores variable bindings (name-value pairs) for a scope, plus a reference to the outer (parent) lexical environment. Together, these references form the scope chain.

**Q: What does "lexical" mean?**
A: "Lexical" means "relating to the source code text." Lexical scoping means the scope is determined by the physical position of code in the source file, decided at write-time, not at runtime.

---

## 8. Closures

### Definition
A closure is formed when a function **retains access to variables from its outer (parent) scope**, even after the outer function has returned and its execution context has been destroyed. The inner function "closes over" the variables it uses.

### Simple Explanation

```
A closure = function + its remembered outer variables

Think of it like this:
• A function is created inside another function
• The inner function uses variables from the outer function
• The outer function returns the inner function
• The outer function finishes (its context is destroyed)
• BUT the inner function still remembers the outer variables!
• Those variables are kept alive in a "closure scope"
```

### How Closures Work in Memory

```
function createGreeter(name) {
    return function() {
        console.log("Hello, " + name);
    };
}

const greet = createGreeter("Jayesh");
greet();  // "Hello, Jayesh"


STEP 1: createGreeter("Jayesh") is called
┌─── Call Stack ─────────────┐    ┌─── Heap Memory ──────────────┐
│ createGreeter()            │    │                                │
│   name = "Jayesh"          │    │  inner function object:        │
│   returns inner function ──┼───►│  { code: "console.log(...)",   │
│ Global()                   │    │    [[Scopes]]: [               │
└────────────────────────────┘    │      Closure: {name:"Jayesh"}, │
                                  │      Global: {...}              │
                                  │    ]                            │
                                  │  }                              │
                                  └────────────────────────────────┘

STEP 2: createGreeter returns → popped from stack
┌─── Call Stack ─────────────┐    ┌─── Heap Memory ──────────────┐
│                            │    │                                │
│ Global()                   │    │  greet → function object       │
│   greet = ref to function ─┼───►│  with [[Scopes]] containing   │
└────────────────────────────┘    │  name = "Jayesh" (ALIVE!)     │
                                  └────────────────────────────────┘

createGreeter is GONE from the stack.
But name="Jayesh" survives in the heap because the inner function
(now stored in greet) references it through [[Scopes]].
Garbage collector sees this reference and keeps it alive.

STEP 3: greet() is called
The function looks up 'name':
→ Not in local scope
→ Checks [[Scopes]] closure → Found! "Jayesh" ✅
→ Prints: "Hello, Jayesh"
```

### Common Closure Patterns

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│  1. DATA PRIVACY (Private Variables)                         │
│  function counter() {                                        │
│      let count = 0;                // private!               │
│      return {                                                │
│          increment: () => ++count,                           │
│          getCount: () => count                               │
│      };                                                      │
│  }                                                           │
│                                                              │
│  2. FUNCTION FACTORIES                                       │
│  function multiply(x) {                                      │
│      return (y) => x * y;                                    │
│  }                                                           │
│  const double = multiply(2);                                 │
│  const triple = multiply(3);                                 │
│                                                              │
│  3. CALLBACKS / EVENT HANDLERS                               │
│  function setup(name) {                                      │
│      button.addEventListener('click', () => {                │
│          console.log(name + ' clicked!');  // closure!       │
│      });                                                     │
│  }                                                           │
│                                                              │
│  4. MEMOIZATION                                              │
│  function memoize(fn) {                                      │
│      const cache = {};                 // closure variable   │
│      return (...args) => {                                   │
│          const key = JSON.stringify(args);                    │
│          if (cache[key]) return cache[key];                   │
│          return cache[key] = fn(...args);                     │
│      };                                                      │
│  }                                                           │
│                                                              │
│  5. MODULE PATTERN (pre-ES6)                                 │
│  const myModule = (function() {                              │
│      let privateData = [];           // private via closure  │
│      return {                                                │
│          add: (item) => privateData.push(item),              │
│          getAll: () => [...privateData]                       │
│      };                                                      │
│  })();                                                       │
└─────────────────────────────────────────────────────────────┘
```

### Classic Closure Interview Trap: Loop + var

```javascript
// THE BUG:
for (var i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000);
}
// Output: 3, 3, 3  (NOT 0, 1, 2!)

// WHY?
// var i is function-scoped (shared across all iterations)
// By the time setTimeout callbacks run, the loop has finished
// and i = 3 for ALL callbacks (they all close over the SAME i)

// FIX 1: Use let (block-scoped — each iteration gets its own i)
for (let i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000);
}
// Output: 0, 1, 2 ✅

// FIX 2: Use IIFE to create a new scope per iteration
for (var i = 0; i < 3; i++) {
    (function(j) {
        setTimeout(function() {
            console.log(j);
        }, 1000);
    })(i);
}
// Output: 0, 1, 2 ✅
```

```
WHY let fixes it:

var i (one shared variable):
┌─────────────────────────────────┐
│  i = 0 → 1 → 2 → 3            │
│  All callbacks point to SAME i  │
│  When they run, i = 3           │
└─────────────────────────────────┘

let i (new variable per iteration):
┌──────────┐  ┌──────────┐  ┌──────────┐
│ i₁ = 0   │  │ i₂ = 1   │  │ i₃ = 2   │
│ callback₁│  │ callback₂│  │ callback₃│
│ closes   │  │ closes   │  │ closes   │
│ over i₁  │  │ over i₂  │  │ over i₃  │
└──────────┘  └──────────┘  └──────────┘
Each callback has its OWN copy of i!
```

### Interview Q&A

**Q: What is a closure?**
A: A closure is a function that remembers and can access variables from its outer (lexical) scope, even after the outer function has returned. It's created when an inner function references variables from an outer function.

**Q: How do closures work in memory?**
A: When a function is created, the engine stores its code plus a `[[Scopes]]` property containing references to outer scope variables it uses. Even after the outer function returns, these variables are kept alive in the heap (not garbage collected) because the inner function still references them.

**Q: What are the practical uses of closures?**
A: Data privacy (private variables), function factories, callbacks/event handlers, memoization/caching, and the module pattern. Closures are also fundamental to how React hooks, currying, and partial application work.

**Q: What happens in the `for` loop with `var` and `setTimeout`?**
A: All callbacks share the same `var i` (function-scoped). By the time they execute, the loop has finished and `i` equals the final value. Fix: use `let` (block-scoped — creates a new `i` per iteration) or an IIFE.

---

## 9. `this` Keyword

### Definition
`this` is a special keyword that refers to the **object that is currently executing the code**. Its value depends on HOW and WHERE the function is called (call-site), not where it is defined.

### Rules for `this` (in order of precedence)

```
┌──────────────────────────────────────────────────────────────────┐
│  RULE 1: new keyword (Constructor Call)                           │
│  ──────────────────────────────────────                          │
│  function Person(name) { this.name = name; }                     │
│  const p = new Person("Jayesh");                                  │
│  // this = newly created empty object → {name: "Jayesh"}         │
│                                                                   │
│  RULE 2: Explicit Binding (call, apply, bind)                    │
│  ────────────────────────────────────────────                    │
│  function greet() { console.log(this.name); }                     │
│  greet.call({name: "Jayesh"});     // this = {name: "Jayesh"}    │
│  greet.apply({name: "Jayesh"});    // this = {name: "Jayesh"}    │
│  const bound = greet.bind({name: "Jayesh"});                      │
│  bound();                          // this = {name: "Jayesh"}    │
│                                                                   │
│  RULE 3: Implicit Binding (Method Call)                          │
│  ──────────────────────────────────────                          │
│  const obj = {                                                    │
│      name: "Jayesh",                                              │
│      greet() { console.log(this.name); }                          │
│  };                                                               │
│  obj.greet();  // this = obj (the object BEFORE the dot)         │
│                                                                   │
│  RULE 4: Default Binding (Plain Function Call)                   │
│  ─────────────────────────────────────────────                   │
│  function greet() { console.log(this); }                          │
│  greet();                                                         │
│  // Non-strict: this = window (global object)                    │
│  // Strict mode: this = undefined                                │
│                                                                   │
│  SPECIAL: Arrow Functions (Lexical this)                         │
│  ───────────────────────────────────────                         │
│  Arrow functions do NOT have their own this.                      │
│  They INHERIT this from the surrounding scope.                    │
│  const obj = {                                                    │
│      name: "Jayesh",                                              │
│      greet: () => console.log(this.name)                          │
│  };                                                               │
│  obj.greet();  // undefined! Arrow fn inherits global this       │
└──────────────────────────────────────────────────────────────────┘
```

### Quick Reference

```
┌────────────────────────────┬──────────────────────────────┐
│ How Function is Called      │ this =                       │
├────────────────────────────┼──────────────────────────────┤
│ new Person()               │ New empty object {}          │
│ greet.call(obj)            │ obj (explicit)               │
│ greet.apply(obj)           │ obj (explicit)               │
│ greet.bind(obj)()          │ obj (explicit, permanent)    │
│ obj.greet()                │ obj (before the dot)         │
│ greet()                    │ window (non-strict)          │
│ greet() in strict mode     │ undefined                    │
│ () => {} (arrow)           │ Inherited from parent scope  │
│ In global scope            │ window (browser)             │
│ Event handler              │ The element (e.g., button)   │
└────────────────────────────┴──────────────────────────────┘
```

### Interview Q&A

**Q: What is `this` in JavaScript?**
A: `this` is a keyword that refers to the object executing the current function. Its value is determined by how the function is called (call-site), not where it's defined. Exception: arrow functions inherit `this` lexically.

**Q: What are the rules for `this`?**
A: In order of precedence: (1) `new` binding — this = new object, (2) Explicit binding — `call`/`apply`/`bind`, (3) Implicit binding — object method call (this = object before dot), (4) Default — `window` in non-strict, `undefined` in strict mode.

**Q: Why don't arrow functions have their own `this`?**
A: By design. Arrow functions were created to solve the common problem of losing `this` context in callbacks. They inherit `this` from their enclosing lexical scope, making them predictable in callbacks and event handlers.

---

## 10. `window` Object

### Definition
The `window` object is the **global object in browsers**. It represents the browser window and provides access to browser APIs. In the global scope, `this === window`, and `var` declarations become properties of `window`.

### What `window` Contains

```
┌── window object ───────────────────────────────────────────────┐
│                                                                 │
│  Browser APIs:                                                  │
│  ├── window.document          (DOM access)                     │
│  ├── window.console           (console.log, etc.)              │
│  ├── window.alert()           (popup alert)                    │
│  ├── window.setTimeout()      (delayed execution)              │
│  ├── window.setInterval()     (repeated execution)             │
│  ├── window.fetch()           (HTTP requests)                  │
│  ├── window.localStorage      (persistent storage)             │
│  ├── window.location          (URL info)                       │
│  ├── window.history           (browser history)                │
│  ├── window.navigator         (browser/device info)            │
│  └── window.innerWidth/Height (viewport size)                  │
│                                                                 │
│  Global variables:                                              │
│  var x = 10;  → window.x = 10 (attached!)                     │
│  let y = 20;  → window.y = undefined (NOT attached!)           │
│                                                                 │
│  You can omit "window.":                                        │
│  window.console.log()  ===  console.log()                      │
│  window.setTimeout()   ===  setTimeout()                       │
│  window.document       ===  document                           │
└─────────────────────────────────────────────────────────────────┘
```

### window vs global (Node.js)

```
┌──────────────────────┬──────────────────────┐
│  Browser              │  Node.js              │
├──────────────────────┼──────────────────────┤
│  Global: window       │  Global: global       │
│  this === window ✅   │  this === global ❌   │
│  (in global scope)    │  (module scope)       │
│                       │                       │
│  Universal: globalThis (works in both!)      │
└──────────────────────┴──────────────────────┘
```

---

## 11. `arguments` Object

### Definition
`arguments` is an **array-like object** automatically available inside every regular function (NOT arrow functions). It contains all the values passed to the function, regardless of how many parameters are defined.

### Key Properties

```
function example(a, b) {
    console.log(arguments);
    // Arguments(3) [10, 20, 30, callee: ƒ, Symbol(Symbol.iterator): ƒ]
    
    console.log(arguments[0]);     // 10
    console.log(arguments[1]);     // 20
    console.log(arguments[2]);     // 30 (extra argument!)
    console.log(arguments.length); // 3
}

example(10, 20, 30);  // 3 args passed, but only 2 params defined
```

### arguments vs Rest Parameters

```
┌────────────────────────────────┬──────────────────────────────────┐
│  arguments (old way)            │  Rest parameters (modern way)    │
├────────────────────────────────┼──────────────────────────────────┤
│  function foo() {              │  function foo(...args) {         │
│    console.log(arguments);     │    console.log(args);            │
│  }                             │  }                               │
│                                │                                  │
│  Array-LIKE object             │  Real Array                      │
│  No .map(), .filter()          │  Has .map(), .filter() etc.     │
│  Available in regular funcs    │  Available everywhere            │
│  NOT in arrow functions        │  Works in arrow functions too    │
│  Implicit (auto-created)       │  Explicit (you declare it)      │
└────────────────────────────────┴──────────────────────────────────┘

Modern recommendation: Use rest parameters (...args) instead of arguments.
```

### Interview Q&A

**Q: What is the `arguments` object?**
A: An array-like object available in regular functions that contains all passed arguments. It has indexed access and a `length` property but lacks array methods. It's NOT available in arrow functions.

**Q: How is `arguments` different from rest parameters?**
A: `arguments` is an array-like object (no array methods), implicitly created, not available in arrow functions. Rest parameters (`...args`) are a real array (have all array methods), explicitly declared, and work everywhere.

---

## 12. Single-Threaded & Synchronous

### Definition
JavaScript is **single-threaded** (one call stack, executes one thing at a time) and **synchronous by default** (code runs line by line, each line must complete before the next runs).

### What Single-Threaded Means

```
┌──────────────────────────────────────────────────────────────┐
│                                                               │
│  SINGLE-THREADED = ONE call stack = ONE task at a time        │
│                                                               │
│  Thread 1: ████████████████████████████████████████           │
│  (the only  Line1 → Line2 → Line3 → Line4 → ...             │
│   thread)                                                     │
│                                                               │
│  There is NO Thread 2, Thread 3, etc.                        │
│  If Line 2 takes 5 seconds, Line 3 WAITS.                   │
│  This is called "BLOCKING."                                   │
│                                                               │
│  vs Multi-threaded (like Java):                               │
│  Thread 1: ████████████████████████████████████████           │
│  Thread 2: ████████████████████████████████████████           │
│  Thread 3: ████████████████████████████████████████           │
│  (Can do 3 things simultaneously)                             │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

### But How Does Async Work Then?

```
JavaScript itself is synchronous, but the BROWSER provides async capabilities:

┌── JavaScript Engine ──┐    ┌── Browser (Web APIs) ──────────┐
│                        │    │                                 │
│  Call Stack:           │    │  setTimeout timer ⏱️            │
│  ┌──────────────┐     │    │  fetch HTTP request 🌐          │
│  │ main code    │     │──► │  DOM event listeners 🖱️         │
│  └──────────────┘     │    │  setInterval timer 🔄            │
│                        │    │  Geolocation 📍                 │
│  (synchronous,         │    │                                 │
│   one thing at a time) │    │  (runs in separate threads!)    │
└────────────────────────┘    └─────────────┬───────────────────┘
                                            │
                                            ▼
                              ┌── Callback Queue ──────────┐
                              │  callback1, callback2, ... │
                              └─────────────┬──────────────┘
                                            │
                                            ▼
                              ┌── Event Loop ──────────────┐
                              │  Checks: is call stack     │
                              │  empty? If yes, push next  │
                              │  callback to call stack.   │
                              └────────────────────────────┘
```

### Interview Q&A

**Q: Is JavaScript single-threaded?**
A: Yes. JavaScript has one call stack and can only execute one piece of code at a time. However, the browser/Node.js provides Web APIs that run on separate threads (timers, HTTP, DOM events), enabling asynchronous behavior through the event loop.

**Q: If JS is single-threaded, how does async code work?**
A: Async operations (setTimeout, fetch, event listeners) are delegated to browser Web APIs. When they complete, their callbacks are queued in the Callback Queue. The Event Loop monitors the call stack — when it's empty, it pushes the next callback from the queue onto the stack.

---

## Quick Interview Cheat Sheet

```
┌──────────────────────────────────────────────────────────────────┐
│                  RAPID-FIRE INTERVIEW ANSWERS                     │
│                                                                   │
│  Execution Context = environment where code runs (vars + scope    │
│                      + this)                                      │
│                                                                   │
│  Call Stack = LIFO stack tracking function calls                  │
│                                                                   │
│  Hoisting = declarations moved to top of scope during compilation│
│             var→undefined, let/const→TDZ, function→full body     │
│                                                                   │
│  TDZ = period where let/const exists but can't be accessed       │
│        (between scope start and declaration line)                 │
│                                                                   │
│  Scope = where variables are accessible                           │
│          Global > Function > Block                                │
│                                                                   │
│  Scope Chain = lookup path: current → parent → ... → global      │
│                                                                   │
│  Lexical Scoping = scope determined by WHERE code is written     │
│                                                                   │
│  Closure = function + its remembered outer variables              │
│            survives after outer function returns                  │
│                                                                   │
│  this = depends on HOW function is called                        │
│         new > call/apply/bind > obj.method > default(window)     │
│         arrow functions: inherit from parent                      │
│                                                                   │
│  Single-threaded = one call stack, one task at a time            │
│                    async via browser APIs + event loop            │
│                                                                   │
│  arguments = array-like object in functions (use ...rest instead)│
│                                                                   │
│  window = global object in browser, this===window in global scope│
└──────────────────────────────────────────────────────────────────┘
```

---
