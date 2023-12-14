// arrow functions 
//  (this) is not working in the arrow function.

const user1 = {
    firstName: "harshit",
    age: 8,

    about: () => {
        console.log(this); // this in the arrow function is not from arrow function,
        //  it from one level up from the arrow function surrounding , in this case this is of window object
        console.log(this.firstName, this.age);
    },

    about2: function () {
        console.log(this.firstName, this.age);
    }
}
// 
// user1.about(user1);    // will not work -  we connot change of arrow function's this

// user1.about2();
// user1.about2(user1);     