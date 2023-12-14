// getter and setters 

class Person {

    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }

    // fullName() {
    //     return `${this.firstName} ${this.lastName}`
    // }

    // fullName(fullName) {
    //     const [firstName, lastName] = fullName.split(" ");
    //     this.firstName = firstName;
    //     this.lastName = lastName;
    // }

    get fullName() {            // to call like property name we use get
        return `${this.firstName} ${this.lastName}`
    }

    set fullName(fullName) {
        const [firstName, lastName] = fullName.split(" ");
        this.firstName = firstName;
        this.lastName = lastName;
    }

}


const person1 = new Person("harshit", "sharma", 5);
// console.log(person1.fullName());
console.log(person1.fullName);          // calling get fullname() 
person1.fullName = "mohit vashistha";   // setter
console.log(person1);
console.log(person1.fullName);
