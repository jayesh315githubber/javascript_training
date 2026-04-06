// static methods and properties
//
// static = belongs to the CLASS itself, NOT to instances.
// Called on the class: Person.classInfo()    ✅
// NOT on instances:   person1.classInfo()   ❌ TypeError!
//
// Regular methods → called on instances (person1.eat())
// Static methods  → called on class (Person.classInfo())

class Person {

    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }

    // ========== Static Method — on CLASS, not instances ==========
    static classInfo() {       // static method
        return 'this is person class';
    }
    // Person.classInfo()   ✅ works
    // person1.classInfo()  ❌ TypeError: person1.classInfo is not a function

    // ========== Static Property — on CLASS, not instances ==========
    static desc = "static property";   // static variable
    // Person.desc   ✅ "static property"
    // person1.desc  ❌ undefined

    // ========== Regular methods — on instances (via prototype) ==========
    get fullName() {
        return `${this.firstName} ${this.lastName}`
    }

    set fullName(fullName) {
        const [firstName, lastName] = fullName.split(" ");
        this.firstName = firstName;
        this.lastName = lastName;
    }

    eat() {
        return `${this.firstName} is eating`;
    }

    isSuperCute() {
        return this.age <= 1;
    }

    isCute() {
        return true;
    }
}

const person1 = new Person("harshit", "sharma", 8);
console.log(person1.eat());        // "harshit is eating" ← instance method ✅
const info = Person.classInfo();    // classname.staticmethodname()
console.log(person1.desc);         // undefined ← static is NOT on instances!
console.log(Person.desc);          // "static property" ← static is on CLASS ✅
console.log(info);                 // "this is person class"


// ========== Static vs Instance — Where They Live ==========
//
// ┌─── Person (the class/function itself) ───────┐
// │  classInfo()    ← static method              │
// │  desc           ← static property            │
// │                                               │
// │  prototype: ──────────────────────────────────┼──► Person.prototype
// └───────────────────────────────────────────────┘   ┌──────────────────┐
//                                                     │ eat()            │
//                                                     │ isCute()         │ instance methods
//                                                     │ isSuperCute()    │ (shared via prototype)
//                                                     │ get fullName     │
//                                                     │ set fullName     │
//                                                     └──────────────────┘
//                                                              ↑
// ┌─── person1 ───────────────┐                                │
// │  firstName: "harshit"     │  __proto__ ────────────────────┘
// │  lastName: "sharma"       │
// │  age: 8                   │
// └───────────────────────────┘
//
// person1.eat()        → found on Person.prototype ✅
// person1.classInfo()  → not on person1, not on prototype → ❌ not found!
// Person.classInfo()   → found directly on Person class ✅
// Person.eat()         → ❌ not found! (eat is on prototype, for instances)


// ========== Real-World Examples of Static Methods ==========
//
// You already use static methods daily:
//
// Math.random()             ← static (not: const m = new Math(); m.random())
// Math.max(1, 2, 3)         ← static
// Array.isArray([1,2])      ← static
// Array.from("hello")       ← static
// Object.keys(obj)          ← static
// Object.freeze(obj)        ← static
// Number.isInteger(5)       ← static
// JSON.parse(str)           ← static
// Date.now()                ← static
//
// These are utility functions that don't need an instance.
// They belong to the CLASS, not to individual objects.


// ========== When to Use Static ==========
//
// Use STATIC for:
//   - Utility/helper functions (Math.max, Array.isArray)
//   - Factory methods (User.createFromJSON(json))
//   - Constants/config (Person.MAX_AGE = 150)
//   - Counters (Person.count++ in constructor)
//
// Use INSTANCE for:
//   - Methods that use 'this' (this.firstName, this.age)
//   - Methods that need instance data
//   - Getters/setters


// ========== 'this' in Static Methods ==========
//
// In static methods, 'this' = the CLASS itself (not an instance!)
//
// class Person {
//     static count = 0;
//     constructor() { Person.count++; }   // or this.constructor.count++
//     static getCount() {
//         return this.count;   // 'this' = Person class here!
//     }
// }
// new Person(); new Person(); new Person();
// Person.getCount()  → 3


// ========== Part 1 Complete! 🎉 ==========
//
// Files 01-91 covered:
//   01-13: Basics (variables, types, truthy/falsy)
//   14-19: Conditionals (if/else, switch, ternary)
//   20-25: Loops (while, for, do-while, break/continue)
//   26-35: Arrays (methods, cloning, destructuring)
//   36-43: Objects (dot/bracket, spread, destructuring)
//   44-55: Functions (arrow, scope, closures, HOF, callbacks)
//   56-65: Array Methods (forEach, map, filter, reduce, sort, find, every, some)
//   66-70: Iterables, Sets, Maps, optional chaining
//   71-75: this keyword (methods, call, apply, bind, arrow this)
//   76-85: Prototypes (Object.create, __proto__, constructor functions, new)
//   86-91: Classes (class, extends, super, override, getter/setter, static)
