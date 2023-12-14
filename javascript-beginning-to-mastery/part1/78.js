//  create seperate object to store the all common function for reuse.

// pros : dont occupy the seperate memory for each function for each user.
// cons : if we want to add new method then we have to add in userMethod object as well as in createUser function also.

const userMethods = {

    about: function () {
        return `${this.firstName} is ${this.age} years old.`;
    },

    is18: function () {
        return this.age >= 18;
    }
    //   here
}

function createUser(firstName, lastName, email, age, address) {

    const user = {};

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.age = age;
    user.address = address;

    user.about = userMethods.about;       // here store the reference of the methods
    user.is18 = userMethods.is18;

    return user;
}

const user1 = createUser('harshit', 'vashsith', 'harshit@gmail.com', 9, "my address");
const user2 = createUser('harsh', 'vashsith', 'harshit@gmail.com', 19, "my address");
const user3 = createUser('mohit', 'vashsitha', 'harshit@gmail.com', 17, "my address");

console.log(user1.about());
console.log(user3.about());