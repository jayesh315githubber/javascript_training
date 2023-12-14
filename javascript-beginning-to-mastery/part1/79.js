
/*
JavaScript object.create() method is used to create a new object with the 
specified prototype object and properties. 
*/
const userMethods = {

    about: function () {
        return `${this.firstName} is ${this.age} years old.`;
    },
    is18: function () {
        return this.age >= 18;
    },
    sing: function () {
        return 'toon na na na la la ';
    }
}

function createUser(firstName, lastName, email, age, address) {

    const user = Object.create(userMethods);    // {}   -> create the empty object and set the __proto__  or [[Prototype]] property value as userMethods

    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email;
    user.age = age;
    user.address = address;

    user.about = userMethods.about;

    return user;
}

const user1 = createUser('harshit', 'vashsith', 'harshit@gmail.com', 9, "my address");
const user2 = createUser('harsh', 'vashsith', 'harshit@gmail.com', 19, "my address");
const user3 = createUser('mohit', 'vashsitha', 'harshit@gmail.com', 17, "my address");

console.log(user1);
console.log(user1.about());
console.log(user3.sing());