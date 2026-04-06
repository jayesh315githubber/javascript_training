// super keyword
//
// super() calls the PARENT class's constructor.
// MUST be called in child constructor BEFORE using 'this'.
// Without super() → ReferenceError: Must call super constructor first!

// ========== Parent Class ==========
class Animal {

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    eat() {
        return `${this.name} is eating`;
    }

    isSuperCute() {
        return this.age <= 1;
    }

    isCute() {
        return true;
    }
}

// ========== Child Class with its OWN constructor ==========
class Dog extends Animal {

    constructor(name, age, speed) {
        super(name, age);       // calls Animal's constructor → sets this.name & this.age
        this.speed = speed;     // Dog's own property (Animal doesn't have this!)
    }

    // Dog's own method (Animal doesn't have this!)
    run() {
        return `${this.name} is running at ${this.speed}kmph`
    }
}

// object / instance
const tommy = new Dog("tommy", 3, 45);
console.log(tommy.run());    // "tommy is running at 45kmph"

// tommy has:
//   name: "tommy"   ← set by super() (Animal's constructor)
//   age: 3          ← set by super() (Animal's constructor)
//   speed: 45       ← set by Dog's constructor (own property)
//   run()           ← Dog's own method
//   eat()           ← inherited from Animal
//   isCute()        ← inherited from Animal


// ========== What super(name, age) Does Step by Step ==========
//
// new Dog("tommy", 3, 45)
//
// Step 1: 'new' creates empty object, sets this = {}
// Step 2: Dog's constructor runs:
//
//   super(name, age)
//     ↓
//   Calls Animal's constructor with this = the new Dog object:
//     this.name = "tommy"     ← Animal sets this
//     this.age = 3            ← Animal sets this
//
//   this.speed = 45           ← Dog sets this (after super)
//
// Step 3: Returns this = { name: "tommy", age: 3, speed: 45 }


// ========== Why super() MUST Come First ==========
//
// class Dog extends Animal {
//     constructor(name, age, speed) {
//         this.speed = speed;      // ❌ ReferenceError!
//         super(name, age);        // Too late — 'this' wasn't initialized yet
//     }
// }
//
// 'this' doesn't exist until super() is called!
// super() initializes 'this' by running the parent constructor.
// Rule: super() FIRST, then use this.


// ========== File 87 vs File 88 ==========
//
// File 87: Dog has NO constructor
//   → Uses Animal's constructor automatically
//   → Dog can't add its own properties (no speed!)
//
// File 88: Dog has its OWN constructor
//   → Calls super() to run Animal's constructor (name, age)
//   → Then adds Dog-specific properties (speed)
//   → Dog can also add Dog-specific methods (run)
//
// ┌─── tommy ──────────────────────┐
// │  name: "tommy"     ← super()  │
// │  age: 3            ← super()  │
// │  speed: 45         ← Dog's own│
// │                                │
// │  [[Prototype]] ────────────────┼──► Dog.prototype
// └────────────────────────────────┘   ┌──────────────────┐
//                                      │ run()            │ ← Dog's method
//                                      │                  │
//                                      │ [[Prototype]] ───┼──► Animal.prototype
//                                      └──────────────────┘   ┌──────────────────┐
//                                                             │ eat()            │
//                                                             │ isSuperCute()    │
//                                                             │ isCute()         │
//                                                             └──────────────────┘


// ========== super can also call parent METHODS ==========
//
// class Dog extends Animal {
//     eat() {
//         const parentResult = super.eat();   // calls Animal's eat()
//         return parentResult + " and barking!";
//     }
// }
// tommy.eat()  → "tommy is eating and barking!"
//
// super.method() → calls the PARENT's version of that method
// Useful when you want to EXTEND (not replace) parent behavior
