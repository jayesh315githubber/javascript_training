// 2015 / es6 
// class keyword 
// class are fake      -> internally it is work like function
// Object.getPrototypeOf() ->  static method returns the prototype of the specified object.

class CreateUser {

    constructor(firstName, lastName, email, age, address) {

        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.age = age;
        this.address = address;

    }

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
