// undefined 
// null

let firstName;
console.log(typeof firstName);
firstName = "Harshit";
console.log(typeof firstName, firstName);

let myVariable = null;
console.log(myVariable);
myVariable = "harshit";
console.log(myVariable, typeof myVariable);
console.log(typeof null);    // object  -> bug , error 
// bug , error 

// BigInt
let myNumber = BigInt(13);   // 13n
let sameMyNumber = 123n;    // n at the end of number to convert it into BigInt
console.log(myNumber);
console.log(Number.MAX_SAFE_INTEGER);
console.log(myNumber + sameMyNumber);
