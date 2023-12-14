// Maps

// map is an iterable
// store data in ordered fashion
// store key value pair (like object)
// duplicate keys are not allowed like objects

// NOTE :->
// different between maps and objects

// objects can only have string or symbol as key 

// in maps you can use anything as key like array, number, string 

// object literal 
// key -> string 
// key -> symbol

// const person = {
//     firstName: "harshit",
//     age: 7,
//     1: "one"
// }

// console.log(person.firstName);
// console.log(person["firstName"]);    // in form of string as key
// console.log(person[1]);            // note  - vimp
// // console.log(person[firstName]);    // note - will get error

// //  for object = for in loop - bcz object is not iterable
// for (let key in person) {
//     console.log(typeof key);   // note - for 1  - we get typeof as string
// }

// key-value pair
// methods
// - set
// - get
// - keys

const person = new Map();

person.set('firstName', 'Harshit');     // set as key : value pair
person.set('age', 7);
person.set(1, 'one');
person.set([1, 2, 3], 'onetwothree');         // key can be anything - like string,number, array, object
person.set({ 1: 'one' }, 'onetwothree');

console.log(person);
console.log(person.get(1));

// 1   for of loop - bcz map is iterable
for (let key of person.keys()) {
    console.log(key, typeof key);
    console.log(Array.isArray(key));            // for key-1 we get typeof as number
}
// console.log("------------------------------------");
// // 2
// for (let [key, value] of person) {    //  [ ]  -> to extract or destructure the key and value
//     console.log(Array.isArray(key));
//     console.log(key, value)
// }

// --------------------2nd way of declare Map-----------------
// const person = new Map([['firstName', 'jayesh'], ['lastname', 'gangurde']])
// console.log(person);

// ------------------------------------------------------
const person1 = {
    id: 1,
    firstName: "harshit"
}

const person2 = {
    id: 2,
    firstName: "harshta"
}

const extraInfo = new Map();

// key : value pair
// set
// get

extraInfo.set(person1, { age: 8, gender: "male" });
extraInfo.set(person2, { age: 9, gender: "female" });

console.log(extraInfo);

console.log(extraInfo.get(person1));    // note
// console.log(extraInfo.get(person1).firstName);    // note
// console.log(extraInfo.get(person1["firstName"]));    // note
console.log(extraInfo.get(person1).gender);
console.log(person1.id);
console.log(extraInfo.get(person2)["age"]);
console.log(extraInfo.get(person2).gender);
