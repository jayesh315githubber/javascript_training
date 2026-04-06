// Inheritance with 'extends'
//
// 'extends' lets a child class INHERIT all properties and methods
// from a parent class. The child gets everything the parent has,
// plus can add its own stuff.
//
// Parent class = base class / super class
// Child class  = derived class / sub class

// ========== Parent Class ==========
class Animal {

    constructor(name, age) {
        this.name = name;       // own property on each instance
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

// ========== Child Class — inherits EVERYTHING from Animal ==========
class Dog extends Animal {
    // Empty class! But Dog gets ALL of Animal's:
    //   - constructor (name, age)
    //   - eat()
    //   - isSuperCute()
    //   - isCute()
    // All inherited automatically via 'extends'!
}

const tommy = new Dog("tommy", 3);
console.log(tommy);            // Dog { name: 'tommy', age: 3 }
console.log(tommy.isCute());   // true — inherited from Animal!

// tommy.eat()         → "tommy is eating"        ← inherited ✅
// tommy.isSuperCute() → false (3 <= 1 = false)   ← inherited ✅
// tommy.isCute()      → true                      ← inherited ✅
// tommy instanceof Dog    → true
// tommy instanceof Animal → true (Dog IS an Animal!)


// ========== How 'extends' Works Internally (Prototype Chain) ==========
//
// 'extends' sets up the prototype chain:
//   Dog.prototype.__proto__ = Animal.prototype
//
// ┌─── tommy ──────────────────────┐
// │  name: "tommy"                 │  own properties
// │  age: 3                        │  (from Animal's constructor)
// │                                │
// │  [[Prototype]] ────────────────┼──► Dog.prototype
// └────────────────────────────────┘   ┌──────────────────────┐
//                                      │ (empty — no own      │
//                                      │  methods added yet)  │
//                                      │                      │
//                                      │ [[Prototype]] ───────┼──► Animal.prototype
//                                      └──────────────────────┘   ┌──────────────────┐
//                                                                 │ eat()            │
//                                                                 │ isSuperCute()    │
//                                                                 │ isCute()         │
//                                                                 └──────────────────┘
//
// tommy.isCute() lookup:
//   Step 1: tommy → no isCute ❌
//   Step 2: Dog.prototype → no isCute ❌
//   Step 3: Animal.prototype → found! ✅
//
// Full chain: tommy → Dog.prototype → Animal.prototype → Object.prototype → null


// ========== Why Dog Gets Animal's Constructor ==========
//
// Dog has no constructor, so JS uses the parent's:
//   new Dog("tommy", 3)
//   → Dog has no constructor → uses Animal's constructor
//   → this.name = "tommy", this.age = 3
//
// If Dog had its own constructor, it MUST call super() first! (file 88)


// ========== 'extends' is Like Real-World Inheritance ==========
//
// Animal (parent):  can eat, can be cute, has name & age
//    ↓ extends
// Dog (child):      inherits ALL of Animal's abilities
//                   + can add dog-specific things (bark, fetch, etc.)
//
// Cat extends Animal → Cat also gets eat(), isCute(), etc.
// Bird extends Animal → Bird also gets eat(), isCute(), etc.
//
// Write shared behavior ONCE in parent → all children get it!
// This is the DRY principle (Don't Repeat Yourself)
