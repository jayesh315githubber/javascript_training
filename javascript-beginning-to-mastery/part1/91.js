// static methods and properties

class Person {

    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }

    static classInfo() {       // static method
        return 'this is person class';
    }

    static desc = "static property";   // static variable

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
console.log(person1.eat());
const info = Person.classInfo();    // classname.staticmethodname()
console.log(person1.desc);
console.log(Person.desc);           // static variable
console.log(info);