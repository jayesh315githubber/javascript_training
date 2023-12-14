// computed properties

const key1 = "objkey1";
const key2 = "objkey2";

const value1 = "myvalue1";
const value2 = "myvalue2";

// 1).
// const obj = {
//     objkey1: "myvalue1",
//     objkey2: "myvalue2",
// }
// console.log(obj);

// 2).
// const obj = {
//     [key1]: value1,        // declare key in [ k ] :  v
//     [key2]: value2
// }
// console.log(obj);

// 3).
const obj = {};             // object literal

obj[key1] = value1;
obj[key2] = value2;

console.log(obj);

