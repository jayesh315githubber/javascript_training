# DOM Tutorial — Complete File-by-File Explanation

## Deep Dive with Diagrams: Part 2 DOM Tutorial (102.js - 129.js)

Each file from `javascript-beginning-to-mastery/part2/dom-tutorial/` is explained step-by-step with internal mechanism diagrams.

---

# Table of Contents

1. [102.js — DOM Overview & document Object](#file-1-102js)
2. [103.js — getElementById()](#file-2-103js)
3. [104.js — querySelector() & querySelectorAll()](#file-3-104js)
4. [105.js — textContent vs innerText](#file-4-105js)
5. [106.js — Changing Styles](#file-5-106js)
6. [107.js — getAttribute & setAttribute](#file-6-107js)
7. [108.js — getElementsByClassName & HTMLCollection vs NodeList](#file-7-108js)
8. [109.js — Iterating Over Collections](#file-8-109js)
9. [110.js — innerHTML](#file-9-110js)
10. [111.js — DOM Tree Traversal](#file-10-111js)
11. [112.js — classList Methods](#file-11-112js)
12. [113.js — Adding Elements (innerHTML & insertAdjacentElement)](#file-12-113js)
13. [114.js — createElement, append, prepend, remove](#file-13-114js)
14. [115.js — insertAdjacentHTML()](#file-14-115js)
15. [116.js — cloneNode()](#file-15-116js)
16. [117.js — Legacy Methods (appendChild, insertBefore, etc.)](#file-16-117js)
17. [118.js — Static vs Live Lists](#file-17-118js)
18. [119.js — getBoundingClientRect() (Element Dimensions)](#file-18-119js)
19. [120.js — Event Listeners (addEventListener)](#file-19-120js)
20. [121.js — this Keyword in Events](#file-20-121js)
21. [122.js — Multiple Event Listeners](#file-21-122js)
22. [123.js — Event Object (target vs currentTarget)](#file-22-123js)
23. [124.js — Synchronous Script & Heavy Computation](#file-23-124js)
24. [125.js — Click Event Practice](#file-24-125js)
25. [126.js — Random Color Generator](#file-25-126js)
26. [127.js — Keyboard & Mouse Events](#file-26-127js)
27. [128.js — Event Bubbling & Capturing](#file-27-128js)
28. [129.js — Todo App with Event Delegation](#file-28-129js)
29. [Interview Preparation: Complete DOM Concepts](#interview-preparation)

---

# File 1: 102.js

## Topic: DOM Overview & document Object

### The Code

```javascript
// DOM - document object model
console.dir(document);
```

### What is the DOM?

```
┌──────────────────────────────────────────────────────────────────┐
│  When browser loads HTML, it creates the DOM:                     │
│                                                                   │
│  HTML text file ──► Browser Parser ──► DOM (tree of objects)     │
│                                                                   │
│  The DOM is NOT your HTML file!                                   │
│  It's a LIVE, in-memory OBJECT representation of your HTML.      │
│  JavaScript can READ and MODIFY this object.                     │
│                                                                   │
│  console.log(document)  → shows HTML-like representation         │
│  console.dir(document)  → shows the OBJECT with all properties   │
│                            and methods (hundreds of them!)        │
│                                                                   │
│  document object includes:                                        │
│  ├── document.title           ("My Page")                        │
│  ├── document.URL             ("http://...")                      │
│  ├── document.body            (<body> element)                   │
│  ├── document.head            (<head> element)                   │
│  ├── document.forms           (all <form> elements)              │
│  ├── document.images          (all <img> elements)               │
│  ├── document.links           (all <a> elements)                 │
│  ├── document.getElementById()                                   │
│  ├── document.querySelector()                                    │
│  ├── document.createElement()                                    │
│  └── ... hundreds more                                           │
└──────────────────────────────────────────────────────────────────┘
```

---

# File 2: 103.js

## Topic: getElementById()

### The Code

```javascript
const mainHeading = document.getElementById("main-heading");
console.log(mainHeading);
console.log(typeof document.getElementById("main-heading"));  // object
```

### How It Works

```
HTML: <h1 id="main-heading">Hello World</h1>

document.getElementById("main-heading")
         │
         ▼
┌──────────────────────────────────────────────────────┐
│  Browser searches the DOM tree for an element        │
│  with id="main-heading"                              │
│                                                       │
│  Returns: an OBJECT representing that HTML element   │
│  typeof → "object" (not "element" or "html")         │
│                                                       │
│  The returned object has properties:                  │
│  ├── .id           → "main-heading"                  │
│  ├── .textContent  → "Hello World"                   │
│  ├── .innerHTML    → "Hello World"                   │
│  ├── .style        → CSSStyleDeclaration object      │
│  ├── .classList    → DOMTokenList (classes)           │
│  ├── .parentNode   → parent element                  │
│  ├── .children     → child elements                  │
│  └── ... many more                                   │
│                                                       │
│  If ID not found → returns null                      │
└──────────────────────────────────────────────────────┘
```

---

# File 3: 104.js

## Topic: querySelector() & querySelectorAll()

### The Code

```javascript
const mainHeading = document.querySelector("#main-heading");      // by id
const header = document.querySelector(".header");                 // by class
const navItems = document.querySelectorAll(".nav-item");          // all matches
```

### querySelector vs getElementById

```
┌─────────────────────────────────────────────────────────────────┐
│  getElementById("main-heading")    querySelector("#main-heading")│
│       ↑ only ID                         ↑ any CSS selector      │
│                                                                   │
│  querySelector uses CSS selector syntax:                         │
│  "#id"           → by ID                                         │
│  ".class"        → by class                                      │
│  "tag"           → by tag name                                   │
│  "div.class"     → tag + class                                   │
│  "ul > li"       → direct child                                  │
│  "div p"         → descendant                                    │
│  "[type='text']" → by attribute                                  │
│                                                                   │
│  querySelector   → returns FIRST match (single element)          │
│  querySelectorAll→ returns ALL matches (NodeList)                │
└─────────────────────────────────────────────────────────────────┘
```

---

# File 4: 105.js

## Topic: textContent vs innerText

### The Code

```javascript
const mainHeading = document.getElementById("main-heading");

console.log(mainHeading.textContent);
console.log(mainHeading.innerText);

mainHeading.textContent = "This is something else";
mainHeading.innerText = "This is updated by innerText";
```

### The Difference

```
HTML: <h1 id="main-heading">Hello  <span style="display:none">Hidden</span>  World</h1>

┌──────────────────────────────────┬─────────────────────────────────┐
│  textContent                      │  innerText                      │
├──────────────────────────────────┼─────────────────────────────────┤
│  Returns ALL text (including      │  Returns only VISIBLE text      │
│  hidden elements and whitespace) │  (respects CSS display:none)    │
│                                   │                                  │
│  "Hello  Hidden  World"          │  "Hello World"                   │
│  (includes Hidden, includes      │  (Hidden is excluded because    │
│   extra spaces)                  │   display:none, spaces trimmed) │
│                                   │                                  │
│  Faster (doesn't check CSS)      │  Slower (must check CSS layout) │
│  Doesn't trigger reflow          │  Triggers reflow                 │
└──────────────────────────────────┴─────────────────────────────────┘

Both can SET text:
element.textContent = "new text"  → replaces ALL content
element.innerText = "new text"    → replaces ALL content
(HTML tags in the string are displayed as plain text, NOT parsed)
```

---

# File 5: 106.js

## Topic: Changing Styles with JavaScript

### The Code

```javascript
const mainHeading = document.querySelector("div.headline h2");
console.log(mainHeading.style);

mainHeading.style.backgroundColor = "blue";
mainHeading.style.border = "20px solid green";
```

### CSS Property Names in JavaScript

```
CSS uses kebab-case → JS uses camelCase:

CSS Property              JavaScript Property
──────────────            ────────────────────
background-color    →     backgroundColor
font-size           →     fontSize
border-radius       →     borderRadius
margin-top          →     marginTop
z-index             →     zIndex
text-decoration     →     textDecoration

element.style gives you a CSSStyleDeclaration OBJECT
with ALL possible CSS properties (hundreds of them).
Initially all empty strings "" until you set them.
```

---

# File 6: 107.js

## Topic: getAttribute & setAttribute

### The Code

```javascript
const link = document.querySelector("a");

console.log(link.getAttribute("href"));
link.setAttribute("href", "https://codprog.com");

const inputElement = document.querySelector(".form-todo input");
console.log(inputElement.getAttribute("type"));
```

### How Attributes Work

```
HTML: <a href="https://google.com" class="nav-link">Click</a>

getAttribute("href")      → "https://google.com" (reads attribute)
setAttribute("href", ...) → changes the attribute value
removeAttribute("href")   → removes the attribute entirely

Common attributes:
├── href (links)
├── src (images, scripts)
├── type (inputs)
├── class (CSS classes)
├── id (unique identifier)
├── data-* (custom data attributes)
├── disabled, readonly, required (form attributes)
└── style (inline styles)
```

---

# File 7: 108.js

## Topic: getElementsByClassName & HTMLCollection vs NodeList

### The Code

```javascript
const navItems = document.getElementsByClassName("nav-item"); // HTMLCollection
// const navItems = document.querySelectorAll(".nav-item");   // NodeList
```

### HTMLCollection vs NodeList

```
┌────────────────────────────┬────────────────────────────────┐
│  HTMLCollection              │  NodeList                       │
│  (getElementsBy...)          │  (querySelectorAll)             │
├────────────────────────────┼────────────────────────────────┤
│  LIVE collection            │  STATIC snapshot                │
│  Auto-updates when DOM      │  Does NOT update when DOM      │
│  changes                    │  changes                        │
│                             │                                 │
│  Can access by:             │  Can access by:                 │
│  - Index [0]                │  - Index [0]                    │
│  - Name                    │                                 │
│  - ID                      │                                 │
│                             │                                 │
│  No forEach()              │  Has forEach() ✅               │
│  (must convert to array)    │  (can use directly)             │
│                             │                                 │
│  Array.isArray → false      │  Array.isArray → false          │
│  (array-like object)        │  (array-like object)            │
└────────────────────────────┴────────────────────────────────┘
```

---

# File 8: 109.js

## Topic: Iterating Over Collections

### The Code

```javascript
let navItems = document.querySelectorAll("a");

navItems.forEach((navItem) => {
    console.log(navItem);
    navItem.style.backgroundColor = "#fff";
    navItem.style.color = "green";
    navItem.style.fontWeight = "bold";
})
```

### Ways to Iterate

```
NodeList (querySelectorAll):
✅ forEach directly    → navItems.forEach(item => ...)
✅ for...of loop       → for(let item of navItems) {...}
✅ simple for loop     → for(let i=0; i<navItems.length; i++) {...}

HTMLCollection (getElementsBy...):
❌ forEach directly    → DOES NOT WORK!
✅ Convert first       → [...navItems].forEach(item => ...)
                        → Array.from(navItems).forEach(item => ...)
✅ for...of loop       → for(let item of navItems) {...}
✅ simple for loop     → for(let i=0; i<navItems.length; i++) {...}
```

---

# File 9: 110.js

## Topic: innerHTML

### The Code

```javascript
const headline = document.querySelector(".headline");
console.log(headline.innerHTML);

headline.innerHTML = "<h1>Inner html changed </h1>";
headline.innerHTML += "<button class=\"btn\"> Learn More </button>";
```

### textContent vs innerHTML

```
┌──────────────────────────────────┬─────────────────────────────────┐
│  textContent                      │  innerHTML                       │
├──────────────────────────────────┼─────────────────────────────────┤
│  Gets/sets PLAIN TEXT             │  Gets/sets HTML (with tags!)    │
│                                   │                                  │
│  element.textContent = "<b>hi</b>"│  element.innerHTML = "<b>hi</b>"│
│  Displays: <b>hi</b>             │  Displays: hi (bold!)           │
│  (tags shown as text)             │  (tags are PARSED as HTML)      │
│                                   │                                  │
│  Safe from XSS attacks           │  ⚠️ XSS risk if using user input│
│  (no HTML injection possible)    │  (HTML/scripts can be injected) │
└──────────────────────────────────┴─────────────────────────────────┘

⚠️ innerHTML re-renders ALL child elements!
   Use createElement + append for better performance.
```

---

# File 10: 111.js

## Topic: DOM Tree Traversal

### The Code

```javascript
const rootNode = document.getRootNode();
console.log(rootNode.childNodes);

const h1 = document.querySelector("h1");
console.log(h1.parentNode);

const container = document.querySelector(".container");
console.log(container.children);
```

### DOM Navigation Properties

```
                    ┌──────────┐
                    │  parent   │
                    │  <div>    │
                    └────┬─────┘
                         │  parentNode / parentElement
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
    ┌─────────┐    ┌─────────┐    ┌─────────┐
    │ child 1 │◄──►│ child 2 │◄──►│ child 3 │
    │  <p>    │    │  <p>    │    │  <p>    │
    └─────────┘    └─────────┘    └─────────┘

Navigation Properties:
─────────────────────────────────────────────────────────
PARENT:
  element.parentNode          → parent (any node type)
  element.parentElement       → parent (element only)

CHILDREN:
  element.childNodes          → ALL nodes (text, comments too!)
  element.children            → ONLY element nodes
  element.firstChild          → first node (could be text)
  element.firstElementChild   → first element node
  element.lastChild           → last node
  element.lastElementChild    → last element node

SIBLINGS:
  element.nextSibling         → next node (could be text)
  element.nextElementSibling  → next element
  element.previousSibling     → previous node
  element.previousElementSibling → previous element
```

---

# File 11: 112.js

## Topic: classList Methods

### The Code

```javascript
const sectionTodo = document.querySelector(".section-todo");

sectionTodo.classList.add('bg-dark');
sectionTodo.classList.remove("container");
const ans = sectionTodo.classList.contains("container");  // false
// sectionTodo.classList.toggle("bg-dark");  // removes if present, adds if not
```

### classList Methods

```
┌──────────────────────────────────────────────────────────────┐
│  element.classList returns a DOMTokenList (array-like)        │
│                                                               │
│  .add("class1", "class2")    → adds one or more classes      │
│  .remove("class1", "class2") → removes one or more classes   │
│  .toggle("class")            → add if missing, remove if has │
│  .contains("class")          → returns true/false             │
│  .replace("old", "new")      → replaces a class              │
│                                                               │
│  Why classList over className?                                │
│  className = "header active"  → replaces ALL classes (string)│
│  classList.add("active")      → adds ONE class (keeps others)│
└──────────────────────────────────────────────────────────────┘
```

---

# Files 12-17: Creating & Manipulating Elements

## Key Methods Summary

```
┌──────────────────────────────────────────────────────────────────┐
│  CREATING:                                                        │
│  document.createElement("tag")     → creates new element         │
│  document.createTextNode("text")   → creates text node           │
│                                                                   │
│  ADDING:                                                          │
│  parent.append(child)              → adds at END (modern)        │
│  parent.prepend(child)             → adds at START (modern)      │
│  parent.appendChild(child)         → adds at END (legacy)        │
│  parent.insertBefore(new, ref)     → adds before ref element     │
│  element.after(newElement)         → adds after element          │
│  element.before(newElement)        → adds before element         │
│  elem.insertAdjacentHTML(pos, html)→ insert HTML string          │
│                                                                   │
│  insertAdjacentHTML positions:                                    │
│  "beforebegin" → before the element itself                       │
│  "afterbegin"  → inside element, before first child              │
│  "beforeend"   → inside element, after last child                │
│  "afterend"    → after the element itself                        │
│                                                                   │
│  REMOVING:                                                        │
│  element.remove()                  → removes itself (modern)     │
│  parent.removeChild(child)         → removes child (legacy)      │
│                                                                   │
│  CLONING:                                                         │
│  element.cloneNode(false)          → shallow (element only)      │
│  element.cloneNode(true)           → deep (element + all children)│
│                                                                   │
│  REPLACING:                                                       │
│  parent.replaceChild(new, old)     → replaces old with new       │
└──────────────────────────────────────────────────────────────────┘
```

### insertAdjacentHTML Positions Diagram (115.js)

```
<!-- beforebegin -->
<ul class="todo-list">
    <!-- afterbegin -->
    <li>Item 1</li>
    <li>Item 2</li>
    <!-- beforeend -->
</ul>
<!-- afterend -->
```

---

# File 17: 118.js

## Topic: Static vs Live Lists

### The Code

```javascript
const ul = document.querySelector(".todo-list");
const listItems = ul.getElementsByTagName("li");  // LIVE

const sixthLi = document.createElement("li");
sixthLi.textContent = "item 6";
ul.append(sixthLi);

console.log(listItems);  // Includes the new item!
```

### Live vs Static

```
LIVE (getElementsBy...):                 STATIC (querySelectorAll):
const live = elem.getElementsByTagName() const static = elem.querySelectorAll()

DOM changes? → auto-updates!             DOM changes? → unchanged!

Before append: live.length = 5           Before append: static.length = 5
After append:  live.length = 6  ✅       After append:  static.length = 5 ❌
              (automatically updated!)                   (still old snapshot!)
```

---

# File 18: 119.js

## Topic: getBoundingClientRect()

### The Code

```javascript
const sectionTodo = document.querySelector(".section-todo");
const info = sectionTodo.getBoundingClientRect();
console.log(info);
```

### What It Returns

```
Returns a DOMRect object:
┌──────────────────────────────────────────────────┐
│  {                                                │
│    x: 50,        ← distance from left viewport   │
│    y: 200,       ← distance from top viewport    │
│    width: 800,   ← element width (with padding)  │
│    height: 300,  ← element height (with padding) │
│    top: 200,     ← same as y                     │
│    right: 850,   ← x + width                     │
│    bottom: 500,  ← y + height                    │
│    left: 50      ← same as x                     │
│  }                                                │
│                                                   │
│  All values relative to the VIEWPORT (visible     │
│  area), not the document. Values change on scroll!│
└──────────────────────────────────────────────────┘
```

---

# Files 19-22: Event Handling

## File 19 (120.js): addEventListener

```javascript
const btn = document.querySelector(".btn-headline");

function clickMe() {
    console.log("you clicked me !!!!!");
}

btn.addEventListener("click", clickMe);
```

## File 20 (121.js): this in Events

```
┌─────────────────────────────────────────────────────────────┐
│  Regular function as handler:                                │
│  btn.addEventListener("click", function() {                  │
│      console.log(this);  // → the BUTTON element ✅         │
│  });                                                         │
│                                                              │
│  Arrow function as handler:                                  │
│  btn.addEventListener("click", () => {                       │
│      console.log(this);  // → WINDOW object ❌              │
│  });                                                         │
│                                                              │
│  Arrow functions inherit 'this' from parent scope!           │
│  In global scope, this = window.                             │
│  So arrow function's this = window, NOT the button.          │
│                                                              │
│  Rule: Use regular functions if you need 'this' = element.   │
│  Use arrow functions if you don't need 'this'.               │
└─────────────────────────────────────────────────────────────┘
```

## File 22 (123.js): event.target vs event.currentTarget

```
HTML:
<div id="parent">
    <button>Click Me</button>
</div>

// Listener on parent div:
parent.addEventListener("click", (e) => {
    console.log(e.target);         // <button> (what was CLICKED)
    console.log(e.currentTarget);  // <div>    (where LISTENER is)
});

┌────────────────────────────────────────────────────────────┐
│  target = the element that TRIGGERED the event             │
│           (what the user actually clicked on)              │
│                                                            │
│  currentTarget = the element that HAS the event listener   │
│                  (where addEventListener was called)       │
│                                                            │
│  They are SAME when you click directly on the element      │
│  They DIFFER when event bubbles up from a child element    │
└────────────────────────────────────────────────────────────┘
```

---

# File 27: 128.js

## Topic: Event Bubbling & Capturing

### The Code

```javascript
const grandparent = document.querySelector(".grandparent");
const parent = document.querySelector(".parent");
const child = document.querySelector(".child");

// Capturing (third argument = true)
grandparent.addEventListener("click", () => {
    console.log("capture !!!! grandparent");
}, true);

// Bubbling (default, third argument = false)
child.addEventListener("click", () => {
    console.log("bubble child");
});
parent.addEventListener("click", () => {
    console.log("bubble parent");
});
```

### Event Propagation — Three Phases

```
When you click on <child>:

  PHASE 1: CAPTURING (top → down)
  ═══════════════════════════════
  document
     ↓
  document.body     "capture !!!! document.body"
     ↓
  grandparent       "capture !!!! grandparent"
     ↓
  parent            (no capture listener)
     ↓
  child             (target reached)

  PHASE 2: TARGET
  ═══════════════
  child             "capture !!!! child" (if true)
  child             "bubble child"

  PHASE 3: BUBBLING (bottom → up)
  ═══════════════════════════════
  child
     ↑
  parent            "bubble parent"
     ↑
  grandparent       "bubble grandparent"
     ↑
  document.body     "bubble document.body"
     ↑
  document

  addEventListener(event, handler, useCapture)
  useCapture = true  → listen during CAPTURE phase
  useCapture = false → listen during BUBBLE phase (default)
```

---

# File 28: 129.js

## Topic: Todo App with Event Delegation

### The Code

```javascript
const todoForm = document.querySelector(".form-todo");
const todoInput = document.querySelector(".form-todo input[type='text']");
const todoList = document.querySelector(".todo-list");

// Add task
todoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTodoText = todoInput.value;
  const newLi = document.createElement("li");
  newLi.innerHTML = `
    <span class="text">${newTodoText}</span>
    <div class="todo-buttons">
      <button class="todo-btn done">Done</button>
      <button class="todo-btn remove">Remove</button>
    </div>`;
  todoList.append(newLi);
  todoInput.value = "";
});

// Event Delegation — ONE listener handles all buttons!
todoList.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove")) {
    e.target.parentNode.parentNode.remove();
  }
  if (e.target.classList.contains("done")) {
    e.target.parentNode.previousElementSibling.style.textDecoration = "line-through";
  }
});
```

### Event Delegation Explained

```
┌──────────────────────────────────────────────────────────────┐
│  WITHOUT delegation: add listener to EACH button             │
│  (100 buttons = 100 listeners, new buttons need new listener)│
│                                                               │
│  WITH delegation: ONE listener on PARENT (todoList)           │
│  Event BUBBLES up from button → to li → to todoList          │
│  We check e.target to see WHICH button was clicked            │
│                                                               │
│  Benefits:                                                    │
│  1. Only ONE event listener (less memory)                     │
│  2. Works for DYNAMICALLY added elements!                     │
│  3. Cleaner code                                              │
└──────────────────────────────────────────────────────────────┘

DOM traversal to find the <li> to remove:
e.target = <button class="remove">
e.target.parentNode = <div class="todo-buttons">
e.target.parentNode.parentNode = <li> ← THIS is what we remove!

DOM traversal to find the <span> to strike-through:
e.target = <button class="done">
e.target.parentNode = <div class="todo-buttons">
e.target.parentNode.previousElementSibling = <span class="text"> ← style this!
```

---

# Interview Preparation

## DOM (Document Object Model)

### Definition
The DOM is the browser's **in-memory tree representation** of an HTML document. Each HTML element becomes a **node object** with properties and methods that JavaScript can read and modify.

### Interview Q&A

**Q: What is the DOM?**
A: A tree-structured, object-based representation of an HTML document created by the browser. JavaScript uses the DOM API to select, create, modify, and delete elements dynamically.

**Q: Is the DOM the same as HTML?**
A: No. HTML is the source text file. The DOM is the live in-memory object tree the browser builds from that HTML. The DOM can be modified by JavaScript without changing the HTML file.

---

## Element Selection

### Methods Comparison

```
┌───────────────────────────┬──────────────┬───────────────┬────────────┐
│ Method                    │ Returns      │ Collection    │ Speed      │
├───────────────────────────┼──────────────┼───────────────┼────────────┤
│ getElementById()          │ Element/null │ N/A           │ Fastest    │
│ getElementsByClassName()  │ HTMLCollection│ Live          │ Fast       │
│ getElementsByTagName()    │ HTMLCollection│ Live          │ Fast       │
│ querySelector()           │ Element/null │ N/A           │ Medium     │
│ querySelectorAll()        │ NodeList     │ Static        │ Medium     │
└───────────────────────────┴──────────────┴───────────────┴────────────┘
```

### Interview Q&A

**Q: What's the difference between HTMLCollection and NodeList?**
A: HTMLCollection is LIVE (auto-updates when DOM changes), cannot use `forEach` directly. NodeList from `querySelectorAll` is STATIC (snapshot), supports `forEach` directly.

**Q: What does querySelector return if no match is found?**
A: `null`. Always check for null before accessing properties to avoid TypeError.

---

## DOM Manipulation

### Interview Q&A

**Q: What's the difference between textContent, innerText, and innerHTML?**
A: `textContent` returns all text including hidden elements. `innerText` returns only visible text (respects CSS). `innerHTML` returns/sets the HTML markup including tags. innerHTML can parse HTML; the other two treat everything as plain text.

**Q: Why is innerHTML considered risky?**
A: It parses strings as HTML, creating XSS (Cross-Site Scripting) vulnerability if user input is inserted. Use `textContent` for user-provided text, or sanitize input before using innerHTML.

**Q: What's the performance difference between innerHTML and createElement?**
A: `innerHTML` re-parses and re-renders ALL child elements even when adding one item. `createElement` + `append` only adds the new element without affecting siblings. For adding single elements, createElement is more efficient.

---

## Events

### Event Flow

```
┌──────────────────────────────────────────────────────────────────┐
│  3 PHASES OF EVENT PROPAGATION:                                   │
│                                                                   │
│  1. CAPTURING: document → html → body → ... → target (top→down) │
│  2. TARGET: event reaches the clicked element                     │
│  3. BUBBLING: target → ... → body → html → document (bottom→up) │
│                                                                   │
│  Default: listeners fire in BUBBLING phase                        │
│  To use CAPTURING: addEventListener(event, fn, true)             │
│                                                                   │
│  event.stopPropagation() → stops event from going further        │
│  event.preventDefault()  → stops default browser behavior        │
└──────────────────────────────────────────────────────────────────┘
```

### Interview Q&A

**Q: What is event delegation?**
A: Attaching ONE event listener to a PARENT element instead of individual listeners on each child. Uses event bubbling — when a child is clicked, the event bubbles up to the parent where the listener catches it. `event.target` identifies which child was clicked.

**Q: Why use event delegation?**
A: (1) Less memory — one listener instead of many. (2) Works for dynamically added elements automatically. (3) Cleaner code.

**Q: What's the difference between event.target and event.currentTarget?**
A: `target` is the element that triggered the event (what was clicked). `currentTarget` is the element that has the event listener attached. They differ when event bubbles up from a child.

**Q: What's the difference between event.preventDefault() and event.stopPropagation()?**
A: `preventDefault` stops the browser's default action (e.g., form submission reload, link navigation). `stopPropagation` stops the event from bubbling/capturing further through the DOM tree. They do completely different things.

**Q: Why does 'this' differ between regular and arrow functions in event listeners?**
A: Regular functions get their own `this` = the element the listener is on. Arrow functions inherit `this` from the surrounding scope (usually `window`). Use regular functions when you need `this` to be the element.

---

## Common Event Types

```
┌──────────────┬──────────────────────────────────────────────┐
│ Category     │ Events                                        │
├──────────────┼──────────────────────────────────────────────┤
│ Mouse        │ click, dblclick, mousedown, mouseup,          │
│              │ mouseover, mouseout, mousemove, mouseenter,   │
│              │ mouseleave                                    │
├──────────────┼──────────────────────────────────────────────┤
│ Keyboard     │ keydown, keyup, keypress (deprecated)         │
├──────────────┼──────────────────────────────────────────────┤
│ Form         │ submit, change, input, focus, blur, reset     │
├──────────────┼──────────────────────────────────────────────┤
│ Window       │ load, DOMContentLoaded, resize, scroll,       │
│              │ beforeunload, unload                          │
├──────────────┼──────────────────────────────────────────────┤
│ Touch        │ touchstart, touchend, touchmove, touchcancel  │
├──────────────┼──────────────────────────────────────────────┤
│ Drag         │ dragstart, drag, dragend, drop, dragover      │
└──────────────┴──────────────────────────────────────────────┘
```

---

## Quick Interview Cheat Sheet

```
┌──────────────────────────────────────────────────────────────────┐
│  RAPID-FIRE ANSWERS                                               │
│                                                                   │
│  DOM = tree of objects representing HTML in browser memory        │
│  document = root object to access/modify DOM                     │
│  getElementById = fastest, returns one element by ID             │
│  querySelector = CSS selector, returns first match               │
│  querySelectorAll = CSS selector, returns static NodeList        │
│  HTMLCollection = live, auto-updates, no forEach                 │
│  NodeList = static snapshot, has forEach                         │
│  textContent = all text (including hidden)                       │
│  innerText = visible text only                                   │
│  innerHTML = HTML markup (XSS risk with user input!)             │
│  classList.add/remove/toggle/contains = manage CSS classes       │
│  createElement + append = best way to add elements               │
│  cloneNode(true) = deep clone, cloneNode(false) = shallow        │
│  addEventListener(event, handler, useCapture)                    │
│  event.target = what was clicked                                 │
│  event.currentTarget = where listener is attached                │
│  Bubbling = event goes UP (child → parent) — default             │
│  Capturing = event goes DOWN (parent → child) — set true         │
│  Event delegation = one listener on parent for all children      │
│  preventDefault = stop default browser action                    │
│  stopPropagation = stop event from traveling further             │
│  this in regular fn handler = the element                        │
│  this in arrow fn handler = window (inherited)                   │
└──────────────────────────────────────────────────────────────────┘
```

---
