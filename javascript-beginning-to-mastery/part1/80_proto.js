// __proto__ and [[Prototype]]
//
// Every JS object has a hidden link to another object called its PROTOTYPE.
// This link is:
//   [[Prototype]]  → official name (ECMAScript spec, internal slot)
//   __proto__      → the way to ACCESS it in code (getter/setter)
//   Both refer to the SAME thing!
//
// Modern way to access: Object.getPrototypeOf(obj)  (preferred over __proto__)

const obj1 = {
    key1: "value1",
    key2: "value2"
}

// __proto__

// offical ecmascript documentation

// [[prototype]]

// __proto__ , [[prototype]]  - both are same

// =================================================================

// ========== Example 1: Prototype Chain Lookup ==========

const obj2 = Object.create(obj1);    // {}
// there is one more way to create empty object
console.log(obj2);           // {}  -> in obj2's __proto__ property it will set the obj1 values.

obj2.key3 = "value3";
// obj2.key2 = "unique";
console.log(obj2);           // { key3: "value3" }
console.log(obj2.key2);     // "value2" — found on obj1 via prototype chain!
// meaning : This case 1st it look in the obj2 object if key present in that object then it returns
//  if key not present then it will go to obj1 object.

// How lookup works:
//   obj2.key2
//   Step 1: Check obj2 → no key2 here ❌
//   Step 2: Check obj2.__proto__ (obj1) → found key2! ✅ → "value2"
//
// ┌─── obj2 ───────────────┐
// │  key3: "value3"        │   key2 not here!
// │                        │
// │  [[Prototype]] ────────┼──► obj1
// └────────────────────────┘   ┌──────────────────────┐
//                              │ key1: "value1"       │
//                              │ key2: "value2" ← found!
//                              └──────────────────────┘

// ================================================================

// ========== Example 2: Shadowing ==========
// When you set a property that exists on the prototype,
// it creates an OWN property on the object (doesn't modify prototype!)

// prototype

// const obj2 = Object.create(obj1);  // {}
// there is one more way to create empty object
// console.log(obj2);           // {}

// obj2.key3 = "value3";
// obj2.key2 = "unique";       // ← creates OWN key2 on obj2 (SHADOWS obj1's key2!)
// console.log(obj2);           // { key3: "value3", key2: "unique" }

// console.log(obj2.__proto__);     // {key1: 'value1', key2: 'value2'}  ← obj1 unchanged!

// console.log(obj2.key2);          // "unique"  ← found on obj2 itself (own property)
// console.log(obj1.key2);          // "value2"  ← obj1 is NOT modified!

// SHADOWING explained:
//
// BEFORE obj2.key2 = "unique":
//   obj2 = { key3: "value3" }
//   obj2.key2 → not on obj2 → check obj1 → "value2"
//
// AFTER obj2.key2 = "unique":
//   obj2 = { key3: "value3", key2: "unique" }
//   obj2.key2 → found on obj2! → "unique" (STOPS — doesn't go to obj1)
//   obj1.key2 → still "value2" (untouched!)
//
// ┌─── obj2 (AFTER shadowing) ──┐
// │  key3: "value3"             │
// │  key2: "unique"  ← OWN     │   shadows (hides) obj1's key2
// │                             │
// │  [[Prototype]] ─────────────┼──► obj1
// └─────────────────────────────┘   ┌──────────────────────┐
//                                   │ key1: "value1"       │
//                                   │ key2: "value2"obj2       │ ← still here, but hidden
//                                   └──────────────────────┘
//
// Key rule: Setting a property NEVER modifies the prototype.
// It always creates/updates an OWN property on the object itself.


// ========== The Full Prototype Chain ==========
//
// obj2 → obj1 → Object.prototype → null
//
// obj2.toString()
//   Step 1: obj2 → not found
//   Step 2: obj1 → not found
//   Step 3: Object.prototype → found! ✅ (built-in method)
//
// obj2.nonExistent
//   Step 1: obj2 → not found
//   Step 2: obj1 → not found
//   Step 3: Object.prototype → not found
//   Step 4: null → END OF CHAIN → returns undefined


// ========== __proto__ vs .prototype vs [[Prototype]] ==========
//
// ┌────────────────────┬──────────────────────────────────────────┐
// │ Term                │ What it is                               │
// ├────────────────────┼──────────────────────────────────────────┤
// │ [[Prototype]]      │ Internal slot on EVERY object            │
// │                    │ (the actual hidden link)                 │
// │                    │                                          │
// │ __proto__          │ Getter/setter to ACCESS [[Prototype]]    │
// │                    │ (older way, works but avoid in prod)     │
// │                    │                                          │
// │ Object.getPrototypeOf(obj)  │ Modern way to read [[Prototype]]│
// │ Object.setPrototypeOf(obj)  │ Modern way to set [[Prototype]] │
// │                    │                                          │
// │ .prototype         │ Property on FUNCTIONS only               │
// │                    │ Becomes [[Prototype]] of objects created  │
// │                    │ with 'new' (covered in file 82)          │
// └────────────────────┴──────────────────────────────────────────┘
