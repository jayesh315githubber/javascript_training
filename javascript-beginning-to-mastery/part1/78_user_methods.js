// Shared Methods Pattern (improvement over file 77)
//  create seperate object to store the all common function for reuse.
//
// File 77: Methods defined INSIDE createUser → duplicated per user ❌
// File 78: Methods in SEPARATE object → shared by reference ✅

// pros : dont occupy the seperate memory for each function for each user.
// cons : if we want to add new method then we have to add in userMethod object as well as in createUser function also.

// ========== Shared methods object ==========
// All users will point to these SAME functions (not copies!)

const userMethods = {

    about: function () {
        return `${this.firstName} is ${this.age} years old.`;
    },

    is18: function () {
        return this.age >= 18;
    }
    //   here
}

// ========== Factory function using shared methods ==========

function createUser(firstName, lastName, email, age, address) {

    const user = {};

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.age = age;
    user.address = address;

    user.about = userMethods.about;       // here store the REFERENCE of the methods (not a copy!)
    user.is18 = userMethods.is18;
    // If new method added to userMethods, must also add line here ← the CON!

    return user;
}

const user1 = createUser('harshit', 'vashsith', 'harshit@gmail.com', 9, "my address");
const user2 = createUser('harsh', 'vashsith', 'harshit@gmail.com', 19, "my address");
const user3 = createUser('mohit', 'vashsitha', 'harshit@gmail.com', 17, "my address");

console.log(user1.about());   // "harshit is 9 years old."
console.log(user3.about());   // "mohit is 17 years old."

// When user1.about() is called:
//   this = user1 (object left of dot)  →  "harshit is 9 years old."
// When user3.about() is called:
//   this = user3 (object left of dot)  →  "mohit is 17 years old."
// SAME function, but 'this' changes based on WHO calls it!


// ========== Memory: How sharing works ==========
//
// userMethods → { about: function(){}, is18: function(){} }
//                   ↑                      ↑
// user1.about ──────┘                      │
// user2.about ──────┘                      │
// user3.about ──────┘                      │
//                                          │
// user1.is18 ─────────────────────────────┘
// user2.is18 ─────────────────────────────┘
// user3.is18 ─────────────────────────────┘
//
// ALL users share the SAME function references!
// 3 users = 2 functions total (not 6 like file 77!)


// ========== Pros and Cons ==========
//
// ✅ PRO:  Methods are shared — saves memory!
// ❌ CON:  Adding a new method requires TWO changes:
//
//   1. Add to userMethods:
//      userMethods.greet = function() { return "Hi " + this.firstName; }
//
//   2. Add to createUser:
//      user.greet = userMethods.greet;   ← easy to forget!
//
//   Forgetting step 2 → bug! New users won't have the method.
//
// SOLUTION → Object.create() (file 79) links objects via prototype chain.
//   New methods automatically available to all users — no manual linking!


// ========== Evolution So Far ==========
//
// File 77: Factory Function
//   Methods inside createUser → duplicated per user ❌
//   user1.about !== user2.about (different copies)
//
// File 78: Factory + Shared Methods (this file)
//   Methods in separate object → shared by reference ✅
//   user1.about === user2.about (same function!)
//   But must manually link each method ❌
//
// File 79: Object.create() → automatic prototype linking ✅
// File 82: Constructor Function → 'new' keyword does it for you ✅
// File 86: ES6 Class → cleanest syntax ✅
