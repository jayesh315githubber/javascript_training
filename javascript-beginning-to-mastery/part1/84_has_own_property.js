// hasOwnProperty()
// Checks if a property is directly ON the object (own) vs inherited from prototype.
// Returns true for own properties, false for inherited ones.

function CreateUser(firstName, lastName, email, age, address) {

    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.age = age;
    this.address = address;
}

// Shared methods on prototype (inherited, NOT own properties of user objects)
CreateUser.prototype.about = function () {
    return `${this.firstName} is ${this.age} years old.`;
};
CreateUser.prototype.is18 = function () {
    return this.age >= 18;
}
CreateUser.prototype.sing = function () {
    return "la la la la ";
}

const user1 = new CreateUser('harshit', 'vashsith', 'harshit@gmail.com', 18, "my address");
const user2 = new CreateUser('harsh', 'vashsith', 'harshit@gmail.com', 19, "my address");
const user3 = new CreateUser('mohit', 'vashsitha', 'harshit@gmail.com', 17, "my address");

// ========== The Problem: for...in shows inherited properties too! ==========
//
// for (let key in user1) { console.log(key); }
// Output:
//   firstName   ← own ✅
//   lastName    ← own ✅
//   email       ← own ✅
//   age         ← own ✅
//   address     ← own ✅
//   about       ← INHERITED from prototype ⚠️
//   is18        ← INHERITED from prototype ⚠️
//   sing        ← INHERITED from prototype ⚠️
//
// Usually you only want the object's OWN properties!

// ========== The Fix: hasOwnProperty() filters out inherited ==========

for (let key in user1) {
    // console.log(key);
    if (user1.hasOwnProperty(key)) {    // Object.hasOwnProperty - to show the object's own properties
        console.log(key);
    }

}
// Output:
//   firstName   ← own ✅
//   lastName    ← own ✅
//   email       ← own ✅
//   age         ← own ✅
//   address     ← own ✅
// about, is18, sing are FILTERED OUT!

// ========== How hasOwnProperty works ==========
//
// ┌─── user1 (own properties) ──────────┐
// │  firstName: "harshit"    ← own ✅   │
// │  lastName: "vashsith"   ← own ✅   │
// │  email: "harshit@..."   ← own ✅   │
// │  age: 18                ← own ✅   │
// │  address: "my address"  ← own ✅   │
// │                                      │
// │  [[Prototype]] ──────────────────────┼──► CreateUser.prototype
// └──────────────────────────────────────┘   │  about: fn  ← inherited ❌
//                                            │  is18: fn   ← inherited ❌
//                                            │  sing: fn   ← inherited ❌
//                                            └──────────────────────────
//
// user1.hasOwnProperty("firstName")  → true  (on user1 itself)
// user1.hasOwnProperty("about")      → false (on prototype, not user1)


// ========== Modern Alternatives ==========
//
// 1. Object.hasOwn(obj, key) — ES2022 (recommended, newer)
//    if (Object.hasOwn(user1, key)) { console.log(key); }
//
// 2. Object.keys(obj) — returns ONLY own enumerable keys (no inherited!)
//    Object.keys(user1).forEach(key => console.log(key));
//    // firstName, lastName, email, age, address — no prototype methods!
//
// 3. Object.entries(obj) — own key-value pairs
//    Object.entries(user1).forEach(([key, val]) => console.log(key, val));
//
// These are cleaner than for...in + hasOwnProperty:
//
// ┌───────────────────────────┬──────────────┬────────────────────┐
// │ Method                     │ Own only?    │ Returns            │
// ├───────────────────────────┼──────────────┼────────────────────┤
// │ for...in                  │ ❌ own+inherited │ keys (strings)  │
// │ for...in + hasOwnProperty │ ✅ own only  │ keys (strings)     │
// │ Object.keys(obj)          │ ✅ own only  │ array of keys      │
// │ Object.values(obj)        │ ✅ own only  │ array of values    │
// │ Object.entries(obj)       │ ✅ own only  │ array of [key,val] │
// │ Object.hasOwn(obj, key)   │ ✅ check one │ true/false         │
// └───────────────────────────┴──────────────┴────────────────────┘
