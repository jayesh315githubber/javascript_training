// how to clone array 

// how to concatenate two arrays

// let array1 = ["item1", "item2"];
// let array2 = ["item1", "item2"];

// 1.  slice(0)
// let arr = array1.slice(0);
// console.log(arr);

// let array2 = array1.slice(0).concat(["item3", "item4"]);  // slice method will return the new array.

// 2. [].concat()
// let array2 = [].concat(array1, ["item3", "item4"]);
// console.log(array2)

// 3. new way -> spread operator

// let oneMoreArray = ["item3", "item4"]
// let array2 = [...array1, ...oneMoreArray];

// array1.push("item3");

// console.log(array1 === array2);
// console.log(array1)
// console.log(array2)

// -------------------------------------------
var a = b = c = [1, 2, 3, 4, 5];

// SLOWER (V8 and Edge, very slightly faster in Firefox)
console.time('t1');
for (i = 0; i < 1000000; i++) {
    Array.prototype.concat(a, b, c);               // 1st way
};
console.timeEnd('t1')

// FASTER (V8 and Edge, very slightly slower in Firefox)
// console.time('t2');
// for (i = 0; i < 1000000; i++) {
//     [].concat(a, b, c);                         // 2nd way
// };
// console.timeEnd('t2')