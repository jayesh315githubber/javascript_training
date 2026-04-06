// Constructor Function Pattern (improvement over file 79)
//
// File 79: Separate userMethods object + Object.create(userMethods)
// File 82: Methods on createUser.PROTOTYPE + Object.create(createUser.prototype)
//
// No need for a separate userMethods object!
// Every function already has .prototype (free space from file 81) — use that!

// const userMethods = {
//     about : function(){
//         return `${this.firstName} is ${this.age} years old.`;
//     },
//     is18 : function(){
//         return this.age >= 18;
//     },
//     sing: function(){
//         return 'toon na na na la la ';
//     }
// }

//  note - when we crate function we get prototype object (as free space)

function createUser(firstName, lastName, email, age, address) {       // constructor function

    const user = Object.create(createUser.prototype);       // Note - {}
    // Creates empty object with __proto__ = createUser.prototype
    // So user can access about(), is18(), sing() via prototype chain

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.age = age;
    user.address = address;

    return user;
}

// ========== Add shared methods to .prototype ==========
// These are shared by ALL users — not duplicated!

createUser.prototype.about = function () {
    return `${this.firstName} is ${this.age} years old.`;
};
createUser.prototype.is18 = function () {
    return this.age >= 18;
}
createUser.prototype.sing = function () {
    return "la la la la ";
}


const user1 = createUser('harshit', 'vashsith', 'harshit@gmail.com', 18, "my address");
const user2 = createUser('harsh', 'vashsith', 'harshit@gmail.com', 19, "my address");
const user3 = createUser('mohit', 'vashsitha', 'harshit@gmail.com', 17, "my address");

console.log(user1);
console.log(user1.about());    // "harshit is 18 years old."
console.log(user1.is18());     // true
console.log(user1.sing());     // "la la la la "

// user1.sing() lookup:
//   Step 1: user1 → no 'sing' property
//   Step 2: user1.__proto__ (createUser.prototype) → found! ✅
//   this = user1


// ========== How Prototype Chain Looks ==========
//
// createUser.prototype = { about: fn, is18: fn, sing: fn }
//                               ↑
// user1.__proto__ ──────────────┘  (linked by Object.create)
// user2.__proto__ ──────────────┘  (all share same prototype!)
// user3.__proto__ ──────────────┘
//
// 3 users, but about/is18/sing exist only ONCE in memory!


// ========== This is Almost What 'new' Does Automatically! ==========
//
// This file MANUALLY does 2 things that 'new' automates:
//
// MANUAL (this file):                    WITH 'new' (file 83):
// ─────────────────────                  ──────────────────────
// function createUser(...) {             function CreateUser(...) {
//   const user = Object.create(            // 'new' does this automatically:
//     createUser.prototype);               // 1. this = Object.create(CreateUser.prototype)
//   user.firstName = firstName;            this.firstName = firstName;
//   // ...                                 // ...
//   return user;                           // 2. return this (automatic!)
// }                                      }
//
// const u = createUser("Jay");           const u = new CreateUser("Jay");
//
// 'new' automates:
//   1. Object.create(Function.prototype)  ← creates object + links prototype
//   2. return                             ← auto returns the object
//
// So file 83 is simpler — uses 'new' to avoid manual steps!


// ========== Evolution So Far ==========
//
// File 77: Factory Function         → methods duplicated per user ❌
// File 78: Shared Methods Object    → shared, but manual linking ❌
// File 79: Object.create(methods)   → auto prototype, but separate object ❌
// File 82: Constructor + .prototype → methods on function's own .prototype ✅
//          Still manual: Object.create + return
// File 83: 'new' keyword            → automates Object.create + return ✅
// File 86: ES6 Class                → cleanest syntax ✅
