// getter and setters
//
// get → makes a METHOD behave like a PROPERTY (no parentheses needed!)
// set → lets you assign to a "property" that actually runs a function
//
// Without getter: person1.fullName()    ← need parentheses (it's a method)
// With getter:    person1.fullName      ← looks like a property! (cleaner)

class Person {

    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }

    // Without get/set — called as method with ():
    // fullName() {
    //     return `${this.firstName} ${this.lastName}`
    // }
    // Usage: person1.fullName()   ← needs ()

    // Can't have two methods with same name for get and set:
    // fullName(fullName) {
    //     const [firstName, lastName] = fullName.split(" ");
    //     this.firstName = firstName;
    //     this.lastName = lastName;
    // }

    // ========== GETTER — read like a property ==========
    get fullName() {            // to call like property name we use get
        return `${this.firstName} ${this.lastName}`
    }
    // Usage: person1.fullName    ← NO parentheses! Looks like a property!

    // ========== SETTER — assign like a property ==========
    set fullName(fullName) {
        const [firstName, lastName] = fullName.split(" ");
        this.firstName = firstName;
        this.lastName = lastName;
    }
    // Usage: person1.fullName = "mohit vashistha"   ← looks like assignment!
    //        But actually runs the set function internally!

}


const person1 = new Person("harshit", "sharma", 5);

// console.log(person1.fullName());     // ❌ without get → need ()
console.log(person1.fullName);          // "harshit sharma" ← calling get fullName()
// Internally: calls the get fullName() method → returns "harshit sharma"

person1.fullName = "mohit vashistha";   // setter
// Internally: calls set fullName("mohit vashistha")
//   → "mohit vashistha".split(" ") → ["mohit", "vashistha"]
//   → this.firstName = "mohit"
//   → this.lastName = "vashistha"

console.log(person1);                   // Person { firstName: 'mohit', lastName: 'vashistha', age: 5 }
console.log(person1.fullName);          // "mohit vashistha" ← getter again


// ========== How get/set Works Step by Step ==========
//
// Reading: person1.fullName
//   JS sees 'fullName' is a getter → runs the get function
//   → returns "harshit sharma"
//   You never see () — it LOOKS like reading a property!
//
// Writing: person1.fullName = "mohit vashistha"
//   JS sees 'fullName' is a setter → runs the set function
//   → splits the string, updates firstName and lastName
//   You never call a function — it LOOKS like assigning a property!


// ========== Without get/set vs With get/set ==========
//
// WITHOUT (regular method):
//   person1.fullName()                    ← read (need parentheses)
//   person1.setFullName("mohit sharma")   ← write (call separate method)
//
// WITH get/set:
//   person1.fullName                      ← read (looks like property!)
//   person1.fullName = "mohit sharma"     ← write (looks like assignment!)
//
// get/set makes the interface CLEANER — users don't need to know
// it's a function. It looks and feels like a simple property.


// ========== Common Use Cases for get/set ==========
//
// 1. Computed properties (fullName from firstName + lastName)
//    get fullName() { return this.firstName + " " + this.lastName; }
//
// 2. Validation on assignment:
//    set age(value) {
//        if (value < 0) throw new Error("Age can't be negative!");
//        this._age = value;
//    }
//    get age() { return this._age; }
//
// 3. Read-only properties (only getter, no setter):
//    get id() { return this._id; }
//    // person1.id = 5;  ← silently fails (or throws in strict mode)
//
// 4. Lazy computation / caching:
//    get data() {
//        if (!this._cache) this._cache = expensiveCalculation();
//        return this._cache;
//    }
