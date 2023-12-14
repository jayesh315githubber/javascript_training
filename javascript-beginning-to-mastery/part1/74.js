
const user1 = {
    firstName: "harshit",
    age: 8,
    about: function () {
        console.log(this.firstName, this.age);
    }
}

// user1.about();

// ---------------------
// don't do this mistake

// const myFunc = user1.about();
const myFunc = function () {
    console.log(this.firstName, this.age);
}
myFunc();        /// will get undefined undefined - becz myFunc is not bind to user1
// -------------------

//  this is correct way
// const myFunc = user1.about.bind(user1);
// myFunc();