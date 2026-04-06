// how to iterate object 

/*
Note =>
 The for...of loop cannot be used to iterate over an object.
*/

const person = {
    name: "harshit",
    age: 22,
    "person hobbies": ["guitar", "sleeping", "listening music"]
}

// for in loop 
// Object.keys 
// Object.values
// for loop

// for (let key in person) {
//     console.log(`${key} : ${person[key]}`);   // note
//     console.log(key, " : ", person[key]);
// }


// console.log(Object.keys(person));          // return the array
// console.log(typeof Object.keys(person));
// const val = Array.isArray((Object.keys(person)));
// console.log(val);   // TRUE

// console.log(Object.keys(person));
// console.log(Object.values(person));

// for (let key of person) {        // will get error - person is not iterable
//     console.log(`${key} : ${person[key]}`);
//     console.log(key, " : ", person[key]);
// }

for (let key of Object.keys(person)) {    // convert the person object into array
    console.log(person[key]);
}


/* for...of  Vs  for...in

for...of =>
1. The for...of loop is used to iterate through the values of an iterable.(arrays, sets, maps, strings etc).
2.The for...of loop cannot be used to iterate over an object.

for...in =>
1.The for...in loop is used to iterate through the keys of an object.
2.You can use for...in to iterate over an iterable such arrays and strings but you should avoid using for...in for iterables.

*/
