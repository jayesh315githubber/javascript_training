// clone using -> Object.assign
// Syntax: Object.assign(target, ...sources)
//   → copies properties from source objects INTO the target object
//   → returns the target object (modified!)
//   → creates a SHALLOW copy (nested objects still shared)

// Object.assign() returns the target object.
// The Object.assign() method is used to copy the values and properties from one or more source objects to a target object.

// memory

const obj = {
    key1: "value1",
    key2: "value2"
}

// Spread operator way (modern, cleaner — same result):
// const obj2 = { 'key69': "value69", ...obj };

// Object.assign way:
const obj2 = Object.assign({ 'key69': "value69" }, obj);
console.log(obj2);
// { key69: "value69", key1: "value1", key2: "value2" }
//
// How it works:
// Object.assign({ 'key69': "value69" }, obj)
//                ↑ TARGET                  ↑ SOURCE
//
// Step 1: Start with target → { key69: "value69" }
// Step 2: Copy all props from obj into target → + key1, key2
// Step 3: Return target → { key69: "value69", key1: "value1", key2: "value2" }

obj.key3 = "value3";
console.log(obj);
// { key1: "value1", key2: "value2", key3: "value3" }
// console.log(obj2);
// { key69: "value69", key1: "value1", key2: "value2" } ← NOT affected!
//
// obj  ──► { key1, key2, key3 }     (modified — key3 added)
// obj2 ──► { key69, key1, key2 }    (separate object — unchanged!)


// ========== Object.assign vs Spread Operator ==========
//
// Both create SHALLOW copy — same result:
//   Object.assign({}, obj)    ← older way
//   { ...obj }                ← modern way (cleaner)
//
// With extra properties:
//   Object.assign({ extra: 1 }, obj)
//   { extra: 1, ...obj }


// ========== Merging Multiple Objects ==========
//
// const a = { x: 1 };
// const b = { y: 2 };
// const c = { z: 3 };
//
// Object.assign({}, a, b, c)  → { x: 1, y: 2, z: 3 }
// { ...a, ...b, ...c }        → { x: 1, y: 2, z: 3 }
//
// If keys conflict, LAST source wins:
// const a = { name: "Jay" };
// const b = { name: "Updated" };
// Object.assign({}, a, b)     → { name: "Updated" }  ← b overwrites a


// ========== SHALLOW copy warning ==========
//
// const original = { name: "Jay", address: { city: "Mumbai" } };
// const clone = { ...original };
//
// clone.name = "New";           // ✅ doesn't affect original
// clone.address.city = "Delhi"; // ⚠️ CHANGES original too!
//
// Because address is a nested object — only the REFERENCE was copied.
// Both original.address and clone.address point to SAME object!
//
// Fix for deep clone:
//   structuredClone(original)              ← modern (best!)
//   JSON.parse(JSON.stringify(original))   ← old way (loses functions/dates)


// ========== Object.assign vs Spread vs structuredClone ==========
//
// ┌─────────────────────┬───────────────┬──────────────┬────────────────┐
// │ Feature              │ Object.assign │ Spread {...} │ structuredClone│
// ├─────────────────────┼───────────────┼──────────────┼────────────────┤
// │ Copy depth          │ Shallow       │ Shallow      │ Deep ✅        │
// │ Nested objects      │ Shared ref ⚠️  │ Shared ref ⚠️ │ Separate ✅    │
// │ Functions in object │ ✅ copied     │ ✅ copied    │ ❌ lost        │
// │ Syntax              │ Verbose       │ Clean ✅     │ Clean ✅       │
// │ Mutates target      │ Yes ⚠️        │ No ✅        │ No ✅          │
// └─────────────────────┴───────────────┴──────────────┴────────────────┘


// ========== Shallow Copy vs Deep Copy — In Detail ==========
//
// SHALLOW COPY = only TOP LEVEL is copied.
//   Primitives (string, number, boolean) → separate copy ✅
//   Objects/Arrays (nested)              → same reference shared ⚠️
//
// DEEP COPY = EVERYTHING is copied (all levels).
//   All primitives AND nested objects → separate copies ✅
//
// ┌─── SHALLOW COPY ──────────────────────────────────────┐
// │                                                        │
// │  Level 1 (primitives): COPIED ✅                       │
// │    original.name = "Jay"    clone.name = "Jay"         │
// │    (separate)               (separate)                 │
// │                                                        │
// │  Level 2+ (objects/arrays): SHARED REFERENCE ⚠️        │
// │    original.address ──┐                                │
// │                       ├──► { city: "Mumbai" }          │
// │    clone.address    ──┘    ONE object, TWO pointers!   │
// └────────────────────────────────────────────────────────┘
//
// ┌─── DEEP COPY ─────────────────────────────────────────┐
// │                                                        │
// │  ALL levels: COPIED ✅                                  │
// │    original.address ──► { city: "Mumbai" }  (separate) │
// │    clone.address    ──► { city: "Mumbai" }  (separate) │
// └────────────────────────────────────────────────────────┘
//
// Example:
//   const original = {
//       name: "Jay",
//       scores: [90, 85, 92],
//       address: { city: "Mumbai" }
//   };
//
//   // SHALLOW — nested objects/arrays shared
//   const shallow = { ...original };
//   shallow.name = "New";             // ✅ original.name still "Jay"
//   shallow.scores.push(100);         // ⚠️ original.scores ALSO gets 100!
//   shallow.address.city = "Delhi";   // ⚠️ original.address.city ALSO "Delhi"!
//
//   // DEEP — everything separate
//   const deep = structuredClone(original);
//   deep.scores.push(100);            // ✅ original.scores unchanged
//   deep.address.city = "Delhi";      // ✅ original.address.city still "Mumbai"
//
//
// All Copy Methods:
// ┌─────────────────────────────────────┬──────────┬──────────────────┐
// │ Method                               │ Depth    │ Gotcha           │
// ├─────────────────────────────────────┼──────────┼──────────────────┤
// │ = assignment                        │ No copy! │ Same reference   │
// │ { ...obj }  (spread)                │ Shallow  │ Nested shared    │
// │ Object.assign({}, obj)              │ Shallow  │ Nested shared    │
// │ JSON.parse(JSON.stringify(obj))     │ Deep     │ Loses functions, │
// │                                     │          │ dates, undefined │
// │ structuredClone(obj)                │ Deep ✅  │ Loses functions  │
// └─────────────────────────────────────┴──────────┴──────────────────┘
//
// Memory trick:
//   Shallow = "photocopy the top page only" — nested pages still shared
//   Deep    = "photocopy the ENTIRE book"   — every page is separate
