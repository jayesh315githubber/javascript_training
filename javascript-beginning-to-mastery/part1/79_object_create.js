// Object.create() — Automatic Prototype Linking (improvement over file 78)
//
// File 78: const user = {};  + manual linking (user.about = userMethods.about) ❌
// File 79: const user = Object.create(userMethods);  ← automatic prototype link! ✅
//
// Object.create(proto) creates an empty object with its
// [[Prototype]] (__proto__) automatically pointing to proto.
// Any method on proto is automatically available — no manual linking!

/*
JavaScript object.create() method is used to create a new object with the
specified prototype object and properties.
*/

const userMethods = {

    about: function () {
        return `${this.firstName} is ${this.age} years old.`;
    },
    is18: function () {
        return this.age >= 18;
    },
    sing: function () {
        return 'toon na na na la la ';
    }
}

function createUser(firstName, lastName, email, age, address) {

    const user = Object.create(userMethods);    // {}   -> create the empty object and set the __proto__  or [[Prototype]] property value as userMethods

    // Object.create(userMethods) does this:
    //   1. Creates empty object {}
    //   2. Sets user.__proto__ = userMethods (automatic link!)
    //   Now user can access about(), is18(), sing() through prototype chain

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.age = age;
    user.address = address;

    user.about = userMethods.about;
    // ⚠️ This line is NOT needed! Object.create already links userMethods
    // as prototype. user.about() would work WITHOUT this line because:
    //   JS looks in user → not found → checks __proto__ (userMethods) → found!
    // This line adds about DIRECTLY on user (own property) which
    // "shadows" the prototype's about — works but defeats the purpose.

    return user;
}

const user1 = createUser('harshit', 'vashsith', 'harshit@gmail.com', 9, "my address");
const user2 = createUser('harsh', 'vashsith', 'harshit@gmail.com', 19, "my address");
const user3 = createUser('mohit', 'vashsitha', 'harshit@gmail.com', 17, "my address");

console.log(user1);
console.log(user1.about());   // "harshit is 9 years old."
console.log(user3.sing());    // "toon na na na la la "

// user3.sing() lookup:
//   Step 1: Look in user3 → no 'sing' property
//   Step 2: Look in user3.__proto__ (userMethods) → found! ✅
//   Calls sing() with this = user3


// ========== How Object.create Links Prototype ==========
//
// ┌─── user1 ──────────────────────┐
// │  firstName: "harshit"          │
// │  age: 9                        │
// │  (own properties only)         │
// │                                │
// │  [[Prototype]] ────────────────┼──► userMethods
// └────────────────────────────────┘   ┌──────────────────────┐
//                                      │ about: function(){}  │
// ┌─── user2 ──────────────────────┐   │ is18: function(){}   │
// │  firstName: "harsh"            │   │ sing: function(){}   │
// │  [[Prototype]] ────────────────┼──►└──────────────────────┘
// └────────────────────────────────┘         ↑
//                                            │
// ┌─── user3 ──────────────────────┐         │
// │  firstName: "mohit"            │         │
// │  [[Prototype]] ────────────────┼─────────┘
// └────────────────────────────────┘
//
// ALL 3 users share the SAME methods through prototype chain!
// Adding a new method to userMethods → ALL users get it automatically!
// No manual linking needed! ✅


// ========== The Big Advantage Over File 78 ==========
//
// File 78 problem: Adding new method required TWO changes
//   userMethods.newMethod = function() {...}   ← 1. add here
//   user.newMethod = userMethods.newMethod;    ← 2. AND here (easy to forget!)
//
// File 79 solution: Adding new method requires ONE change
//   userMethods.newMethod = function() {...}   ← add here ONLY
//   All users automatically have it via prototype chain! ✅


// ========== Prototype Chain Lookup ==========
//
// When you access user1.sing():
//   1. Is 'sing' on user1 itself?      → NO (not an own property)
//   2. Is 'sing' on user1.__proto__?   → YES! (userMethods has it) ✅
//   3. Call it with this = user1
//
// If not found in __proto__ either:
//   4. Check __proto__.__proto__ (Object.prototype)
//   5. Check __proto__.__proto__.__proto__ → null → undefined
//
// This chain: user1 → userMethods → Object.prototype → null


// ========== Evolution So Far ==========
//
// File 77: Factory Function         → methods duplicated per user ❌
// File 78: Shared Methods Object    → shared, but manual linking ❌
// File 79: Object.create() (this)   → automatic prototype link ✅
//          But still verbose — next: Constructor Functions (file 82)
//          and new keyword (file 83) make this even cleaner!
