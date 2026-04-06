// new keyword (improvement over file 82)
//
// 'new' automates the 2 manual steps from file 82:
//   File 82: const user = Object.create(createUser.prototype);  ← manual
//            return user;                                        ← manual
//   File 83: 'new' does BOTH automatically!

// What 'new' does behind the scenes (3 steps):
// 1.) this = {}                                          // creates empty object
// 2.) this.__proto__ = CreateUser.prototype               // links prototype (Object.create)
// 3.) return this                                        // auto returns the object

// __proto__
// // official ecmascript document
// [[prototype]]

// ========== Constructor Function + new keyword ==========
// Convention: Constructor function names start with CAPITAL letter (CreateUser, not createUser)

// constructor function
function CreateUser(firstName, lastName, email, age, address) {

    // const user = Object.create(createUser.prototype);   no need to write this
    // 'new' already created empty object and set this = that object

    this.firstName = firstName;     // this = the new empty object
    this.lastName = lastName;
    this.email = email;
    this.age = age;
    this.address = address;

    // return user;  no need to write return
    // 'new' automatically returns 'this'
}

// ========== Shared methods on .prototype ==========
// Same as file 82 — all users share these through prototype chain

CreateUser.prototype.about = function () {
    return `${this.firstName} is ${this.age} years old.`;
};
CreateUser.prototype.is18 = function () {
    return this.age >= 18;
}
CreateUser.prototype.sing = function () {
    return "la la la la ";
}


// ========== Creating objects with 'new' ==========
const user1 = new CreateUser('harshit', 'vashsith', 'harshit@gmail.com', 18, "my address");
const user2 = new CreateUser('harsh', 'vashsith', 'harshit@gmail.com', 19, "my address");
const user3 = new CreateUser('mohit', 'vashsitha', 'harshit@gmail.com', 17, "my address");

console.log(user1);          // CreateUser { firstName: 'harshit', ... }
console.log(user1.is18());   // true


// ========== What 'new CreateUser(...)' Does Step by Step ==========
//
// Step 1: Creates empty object
//   this = {}
//
// Step 2: Links prototype
//   this.__proto__ = CreateUser.prototype
//   (so this can access about, is18, sing via prototype chain)
//
// Step 3: Executes function body with this = new object
//   this.firstName = "harshit"
//   this.lastName = "vashsith"
//   ... etc
//
// Step 4: Returns this automatically
//   return this → { firstName: "harshit", lastName: "vashsith", ... }
//
// ┌─── What 'new' creates ─────────────────────────────────────┐
// │                                                             │
// │  user1 = {                                                  │
// │    firstName: "harshit",                                    │
// │    lastName: "vashsith",                                    │
// │    email: "harshit@gmail.com",                              │
// │    age: 18,                                                 │
// │    address: "my address",                                   │
// │    __proto__: CreateUser.prototype ──► { about, is18, sing }│
// │  }                                                          │
// └─────────────────────────────────────────────────────────────┘


// ========== File 82 vs File 83 — Side by Side ==========
//
// FILE 82 (manual):                     FILE 83 (with new):
// ──────────────────                    ────────────────────
// function createUser(...) {            function CreateUser(...) {
//   const user = Object.create(           // new does this ↑
//     createUser.prototype);
//   user.firstName = firstName;           this.firstName = firstName;
//   return user;                          // new does this ↑
// }                                     }
//
// createUser("Jay");                    new CreateUser("Jay");
//
// 'new' removed 2 lines of boilerplate code!


// ========== What happens WITHOUT 'new'? ==========
//
// const user = CreateUser("Jay", ...);   // forgot 'new'!
// console.log(user);  // undefined! (no return statement)
// console.log(firstName);  // "Jay" — leaked to global! (this = window)
//
// Without 'new':
//   this = window (non-strict) or undefined (strict)
//   Properties go on window object — BIG BUG!
//   Function returns undefined (no explicit return)
//
// ALWAYS use 'new' with constructor functions!
// Convention: Capital letter reminds you to use 'new'


// ========== Evolution Complete! ==========
//
// File 77: Factory Function         → methods duplicated ❌
// File 78: Shared Methods Object    → manual linking ❌
// File 79: Object.create(methods)   → separate methods object ❌
// File 82: Constructor + .prototype → manual Object.create + return ❌
// File 83: 'new' keyword (this!)    → automates everything ✅
// File 86: ES6 Class                → cleanest syntax (sugar over this!) ✅
