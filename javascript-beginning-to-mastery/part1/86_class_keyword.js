// 2015 / es6
// class keyword
// class are fake      -> internally it is work like function (syntactic sugar!)
// Object.getPrototypeOf() ->  static method returns the prototype of the specified object.

// ========== ES6 Class — The Cleanest Syntax! ==========
// Class is just syntactic sugar over constructor function + prototype (files 82-83).
// Under the hood, it does the SAME thing — but much cleaner to read and write.

class CreateUser {

    // constructor runs when 'new CreateUser(...)' is called
    // Same as the constructor function body in file 83
    constructor(firstName, lastName, email, age, address) {

        this.firstName = firstName;     // own properties (on each instance)
        this.lastName = lastName;
        this.email = email;
        this.age = age;
        this.address = address;

    }

    // Methods defined here go on CreateUser.prototype automatically!
    // NOT duplicated per instance — shared via prototype chain ✅
    // Same as: CreateUser.prototype.about = function() {...} in file 83

    about() {
        return `${this.firstName} is ${this.age} years old.`;
    }

    is18() {
        return this.age >= 18;
    }

    sing() {
        return "la la la la ";
    }

}


const user1 = new CreateUser('harshit', 'vashsith', 'harshit@gmail.com', 18, "my address");
const user2 = new CreateUser('harsh', 'vashsith', 'harshit@gmail.com', 19, "my address");
const user3 = new CreateUser('mohit', 'vashsitha', 'harshit@gmail.com', 17, "my address");

console.log(Object.getPrototypeOf(user1));   // return the prototype of user1 object
console.log(CreateUser.prototype);     // return the prototype of user1 object
// Both print: { about: fn, is18: fn, sing: fn }
// Object.getPrototypeOf(user1) === CreateUser.prototype  →  true!


// ========== Class vs Constructor Function — Side by Side ==========
//
// FILE 83 (Constructor Function):         FILE 86 (Class — this file):
// ────────────────────────────            ──────────────────────────────
// function CreateUser(first, age) {       class CreateUser {
//     this.firstName = first;               constructor(first, age) {
//     this.age = age;                         this.firstName = first;
// }                                           this.age = age;
//                                           }
// CreateUser.prototype.about =
//   function() {                            about() {
//     return `${this.firstName}...`;          return `${this.firstName}...`;
//   };                                      }
//                                         }
// const u = new CreateUser("Jay", 25);    const u = new CreateUser("Jay", 25);
//
// IDENTICAL behavior! Class is just cleaner syntax.


// ========== What 'class' Does Internally ==========
//
// class CreateUser { constructor(...) { ... }  about() { ... } }
//
// Is equivalent to:
//   1. Creates a function called CreateUser (the constructor)
//   2. Puts about(), is18(), sing() on CreateUser.prototype
//   3. That's it! Same as files 82-83!
//
// ┌─── user1 ──────────────────────┐
// │  firstName: "harshit"          │  own properties
// │  lastName: "vashsith"          │  (from constructor)
// │  email, age, address           │
// │                                │
// │  [[Prototype]] ────────────────┼──► CreateUser.prototype
// └────────────────────────────────┘   ┌──────────────────────┐
//                                      │ about()              │  shared methods
//                                      │ is18()               │  (from class body)
//                                      │ sing()               │
//                                      │ constructor: CreateUser│
//                                      └──────────────────────┘


// ========== Class Features Not Covered Here (files 87-91) ==========
//
// extends       → inheritance (file 87)
// super()       → call parent constructor (file 88)
// method override→ override parent methods (file 89)
// get / set     → getter and setter (file 90)
// static        → methods on class itself, not instances (file 91)
// #private      → truly private fields (ES2022)


// ========== The Complete Evolution ==========
//
// File 77: Factory Function           → methods duplicated ❌
// File 78: Shared Methods Object      → manual linking ❌
// File 79: Object.create(methods)     → separate methods object ❌
// File 82: Constructor + .prototype   → manual Object.create + return ❌
// File 83: 'new' keyword              → automates create + return ✅
// File 84: hasOwnProperty             → filter own vs inherited ✅
// File 85: Array prototype chain      → understanding the chain ✅
// File 86: ES6 Class (this file!)     → cleanest syntax! ✅ 🎉
//
// Class is the FINAL form — modern JS standard for creating objects.
// But understanding files 77-85 helps you know what class does internally!
