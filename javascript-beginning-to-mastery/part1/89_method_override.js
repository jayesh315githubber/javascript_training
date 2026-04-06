// Method Override (Polymorphism)
//
// When a child class defines a method with the SAME NAME as the parent,
// the child's version OVERRIDES (replaces) the parent's version.
// This is called "method overriding" — a key part of Polymorphism in OOP.

// same method in subclass

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

// ========== Child Class — overrides eat() ==========
class Dog extends Animal {
    constructor(name, age, speed) {
        super(name, age);
        this.speed = speed;
    }

    eat() {                    // override method — SAME name as Animal's eat()
        return `Modified Eat : ${this.name} is eating`
    }

    run() {
        return `${this.name} is running at ${this.speed}kmph`
    }
}

// object / instance
const tommy = new Dog("tommy", 3, 45);
console.log(tommy.run());    // "tommy is running at 45kmph"
console.log(tommy.eat());    // "Modified Eat : tommy is eating"  ← Dog's eat(), NOT Animal's!

const animal1 = new Animal('sheru', 2);
console.log(animal1.eat());  // "sheru is eating"  ← Animal's eat() (no override)


// ========== How Override Works (Prototype Chain) ==========
//
// tommy.eat() lookup:
//   Step 1: tommy → no eat() on instance
//   Step 2: Dog.prototype → found eat()! ✅ STOPS HERE
//   Step 3: Animal.prototype → NEVER reached (already found in step 2!)
//
// animal1.eat() lookup:
//   Step 1: animal1 → no eat() on instance
//   Step 2: Animal.prototype → found eat()! ✅ (original version)
//
// ┌─── tommy (Dog instance) ───────┐
// │  name: "tommy", age: 3         │
// │                                │
// │  [[Prototype]] ────────────────┼──► Dog.prototype
// └────────────────────────────────┘   ┌───────────────────────────┐
//                                      │ eat() ← OVERRIDDEN here! │
//                                      │ run()                     │
//                                      │                           │
//                                      │ [[Prototype]] ────────────┼──► Animal.prototype
//                                      └───────────────────────────┘   ┌──────────────────┐
//                                                                      │ eat() ← SHADOWED │
//                                                                      │ isSuperCute()    │
//                                                                      │ isCute()         │
//                                                                      └──────────────────┘
//
// Dog's eat() "shadows" Animal's eat() — same concept as property shadowing (file 80)!
// JS finds eat() on Dog.prototype first → stops looking → never reaches Animal's eat()


// ========== Override vs Extend (using super.method()) ==========
//
// OVERRIDE (replace completely):
//   eat() {
//       return `Modified Eat : ${this.name} is eating`;
//   }
//   → Animal's eat() is completely ignored
//
// EXTEND (add to parent's behavior):
//   eat() {
//       const parentResult = super.eat();     // "tommy is eating"
//       return `Dog version: ${parentResult} loudly!`;
//   }
//   → "Dog version: tommy is eating loudly!"
//   → Uses parent's result + adds more
//
// super.eat() → specifically calls ANIMAL's eat(), skipping Dog's


// ========== This is Polymorphism! ==========
//
// Polymorphism = "same method name, different behavior"
//
// const animals = [
//     new Dog("tommy", 3, 45),
//     new Animal("sheru", 2),
// ];
//
// animals.forEach(a => console.log(a.eat()));
// "Modified Eat : tommy is eating"    ← Dog's eat()
// "sheru is eating"                    ← Animal's eat()
//
// Same method call .eat() — but each object runs its OWN version!
// The correct version is chosen based on the object's TYPE.
// This is polymorphism in action.
