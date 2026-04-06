// Factory Function Pattern
// A function that CREATES and RETURNS a new object.
//
// Steps:
//   1. Create an empty object {}
//   2. Add key-value pairs (properties + methods)
//   3. Return the object

// function (that function create object)
// 2.) add key value pair
// 3.) object ko return krega

function createUser(firstName, lastName, email, age, address) {

    const user = {};              // Step 1: Create empty object literal

    user.firstName = firstName;   // Step 2: Add properties
    user.lastName = lastName;
    user.email = email;
    user.age = age;
    user.address = address;

    user.about = function () {    // Step 2: Add methods
        return `${this.firstName} is ${this.age} years old.`;
    };
    user.is18 = function () {
        return this.age >= 18;
    }

    return user;      // Step 3: Return the object
}

const user1 = createUser('harshit', 'vashsith', 'harshit@gmail.com', 19, "my address");
console.log(user1);
// {
//   firstName: 'harshit', lastName: 'vashsith',
//   email: 'harshit@gmail.com', age: 19, address: 'my address',
//   about: [Function], is18: [Function]
// }

const is18 = user1.is18();       // this = user1 → 19 >= 18 → true
const about = user1.about();     // this = user1 → "harshit is 19 years old."

console.log(about);   // "harshit is 19 years old."
console.log(is18);    // true


// ========== The Problem With This Pattern ==========
//
// Every user gets its OWN COPY of about() and is18() functions!
//
//   user1 → { ...data, about: function(){}, is18: function(){} }
//   user2 → { ...data, about: function(){}, is18: function(){} }
//   user3 → { ...data, about: function(){}, is18: function(){} }
//
//   3 users = 6 copies of the SAME functions! Wastes memory.
//
// The methods do the same thing for every user — they should be SHARED.
//
// SOLUTION → Prototypes (files 79-85) and Constructor Functions (file 82)
//   Put shared methods on a prototype — all users share ONE copy.
//
//   OR use ES6 Classes (file 86):
//   class User {
//       constructor(firstName, age) {
//           this.firstName = firstName;
//           this.age = age;
//       }
//       about() { return `${this.firstName} is ${this.age}`; }  ← shared!
//   }


// ========== Evolution of Object Creation in JS ==========
//
// ┌──────────────────────────┬───────────┬─────────────────────────────┐
// │ Pattern                   │ File      │ Shared Methods?             │
// ├──────────────────────────┼───────────┼─────────────────────────────┤
// │ Factory Function          │ 77 (this) │ ❌ duplicated per object    │
// │ Factory + shared methods  │ 78        │ ✅ manual prototype linking │
// │ Object.create()           │ 79        │ ✅ prototype chain          │
// │ Constructor Function      │ 82        │ ✅ via .prototype           │
// │ new keyword               │ 83        │ ✅ auto prototype link      │
// │ ES6 Class                 │ 86        │ ✅ cleanest syntax          │
// └──────────────────────────┴───────────┴─────────────────────────────┘
//
// Each file builds on the previous — solving the "duplicated methods" problem
// step by step until reaching ES6 Classes (the modern solution).
