//  ref website - https://www.freecodecamp.org/news/understand-call-apply-and-bind-in-javascript-with-examples/

// call(), apply(), bind() — Three ways to CONTROL what 'this' is inside a function.
//
// call()  → calls function immediately, args passed ONE BY ONE
// apply() → calls function immediately, args passed as ARRAY
// bind()  → does NOT call, returns a NEW function with 'this' permanently locked


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
// user1.about();                                   // "harshit" 8 undefined undefined
// user1.about.call();                              // undefined undefined undefined undefined (no this passed)
// user1.about.call(user2);                         // "mohit" 9 undefined undefined
// user1.about.call(user2, "guitar", "music");      // "mohit" 9 "guitar" "music"

// How call() works:
// user1.about.call(user2, "guitar", "music")
//        ↑          ↑       ↑         ↑
//     method     this=user2  arg1     arg2
//
// "Borrow user1's about method and run it with user2 as this"
// user2 doesn't have an about method, but we can borrow user1's!

// meanig -> user1's about method call for user2 , means this object is bind to which user


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
// // "harshit" 8 "guitar" "bach"

// call vs apply — only difference is how args are passed:
//   call:  about.call(user1, "guitar", "bach")     ← args SEPARATE
//   apply: about.apply(user1, ["guitar", "bach"])   ← args as ARRAY
//
// Memory trick: Apply = Array (both start with "A")

// // Since JavaScript arrays do not have a max() method, you can apply the Math.max() method instead.
// Math.max.apply(null, [1, 2, 3]); // Will also return 3
// // Modern way: Math.max(...[1, 2, 3])  ← spread operator (no need for apply!)


// ============== bind() ====================

// bind()   -> return the function
// Bind is a function that helps you create another function that you can execute later
// with the new context of this that is provided.

/*
The bind function creates a copy of a function with a new value to the this present
inside the calling function.
*/

// bind does NOT call the function!
// It returns a NEW function with 'this' permanently set.
const func = about.bind(user2, "guitar", "bach25");
func();
// "mohit" 9 "guitar" "bach25"

// const func = about.bind(user2, "guitar", "bach25");
//   → func is a NEW function where this = user2 (forever!)
//   → arguments "guitar", "bach25" are also locked in (pre-filled)
//
// func();          // calls it later — this is always user2
// func.call(user1); // still user2! bind can't be overridden by call!

// Common use case for bind:
// const handleClick = obj.method.bind(obj);
// button.addEventListener("click", handleClick);
// Without bind, 'this' would be the button element, not obj!


// ========== call vs apply vs bind — Complete Comparison ==========
//
// ┌──────────┬─────────────────┬──────────────────┬─────────────────────┐
// │          │ call             │ apply            │ bind                │
// ├──────────┼─────────────────┼──────────────────┼─────────────────────┤
// │ Executes │ Immediately ✅   │ Immediately ✅    │ NO! Returns new fn  │
// │ Args     │ One by one       │ As array []      │ One by one          │
// │ Returns  │ Function result  │ Function result  │ New function        │
// │ Use when │ Know args        │ Args in array    │ Need to call later  │
// │ Syntax   │ fn.call(obj,a,b) │ fn.apply(obj,[]) │ fn.bind(obj,a,b)() │
// └──────────┴─────────────────┴──────────────────┴─────────────────────┘
//
// Memory trick:
//   Call = Comma separated args          (C = Comma)
//   Apply = Array of args                (A = Array)
//   Bind = returns Bound function later  (B = Bound, later)
