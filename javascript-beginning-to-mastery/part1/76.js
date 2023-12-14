// way of writing the method in the object


// const user1 = {
//     firstName: "harshit",
//     age: 8,
//     about: function () {
//         console.log(this.firstName, this.age);
//     }
// }

const user1 = {
    firstName: "harshit",
    age: 8,
    about() {               // can write this, no need to write in the form of key value pair
        console.log(this.firstName, this.age);
    }
}

user1.about();