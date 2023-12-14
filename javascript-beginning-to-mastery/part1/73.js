//  ref website - https://www.freecodecamp.org/news/understand-call-apply-and-bind-in-javascript-with-examples/

//  ========== call() ============
// With call(), an object can use a method belonging to another object
/*
call is a function that you use to change the value of this inside a function and
execute it with the arguments provided.
*/


// const user1 = {

//     firstName: "harshit",
//     age: 8,

//     // about: function () {
//     //     console.log(this.firstName, this.age, hobby, favMusician);
//     // }

//     // about: function () {
//     //     console.log(this.firstName, this.age);
//     // }

//     about: function (hobby, favMusician) {
//         console.log(this.firstName, this.age, hobby, favMusician);  // note this.hobby
//     }

// }

// const user2 = {
//     firstName: "mohit",
//     age: 9,
// }

// // call
// user1.about();
// user1.about.call();         // note - how to call ,  will give undefined undefined as result
// user1.about.call(user2);     // note = to call the about method of user1 for user2

// user1.about.call(user2, "guitar", "music");  // note = to call the about method of user1 for user2
// // meanig -> user1's about method call for user2 , means this object is bind to which user


//  ================ apply()==================
// The apply() method is similar to the call() method

/*
diff bet call and apply
The call() method takes arguments separately.
The apply() method takes arguments as an array.
The Apply function is very similar to the Call function.
The only difference between call and apply is the difference in how arguments are passed.
*/

// function about(hobby, favMusician) {
//     console.log(this.firstName, this.age, hobby, favMusician);
// }

// const user1 = {
//     firstName: "harshit",
//     age: 8,
// }

// const user2 = {
//     firstName: "mohit",
//     age: 9,
// }

// // apply() - accept array as parameter -> internally apply use call method
// about.apply(user1, ["guitar", "bach"]);      // note - method.apply()

// // Since JavaScript arrays do not have a max() method, you can apply the Math.max() method instead.
// Math.max.apply(null, [1, 2, 3]); // Will also return 3

// ============== bind() ====================

// bind()   -> return the function
// Bind is a function that helps you create another function that you can execute later
// with the new context of this that is provided.

/*
The bind function creates a copy of a function with a new value to the this present
inside the calling function.
*/

const func = about.bind(user2, "guitar", "bach25");
func();
