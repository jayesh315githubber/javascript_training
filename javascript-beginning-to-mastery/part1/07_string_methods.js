// Useful string methods ->

// trim()
// toUpperCase()
// toLowerCase()
// slice()

let firstName = " harshit is my name";

console.log(firstName.length);   // will count the white space also
firstName = firstName.trim(); // "harshit"
console.log(firstName)

console.log(firstName.length);

// firstName = firstName.toUpperCase();

// firstName = firstName.toLowerCase();

// console.log(firstName);

// slice()  --> (chya pasun - chyach varti)
// start index
// end index

let newString = firstName.slice(1, 8); // hars
console.log("slice - " + newString);

let newString2 = firstName.substring(1, 8);
console.log("substring - " + newString2);

// split()   -> charatcter , limit no of split found
let str = "my name is jayesh";
var splitted = str.split(" ", 3)  // return the array
console.log(splitted);

// substr()  -> start , length
var str2 = str.substr(1, 5);
console.log(str2);

// substring()  -> indexA , indexB
var str3 = str.substring(1, 6);
console.log(str3);