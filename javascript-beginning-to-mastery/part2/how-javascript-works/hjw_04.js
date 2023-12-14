

//  in the case of var  => variable is allowcate as undefined.

// (Error) => Uncaught ReferenceError: firstName is not defined
//  get this error when variable is not present but we use this variable.

// console.log(firstName);

// ---------------------------------------------------

// in the case of let, const => varialble is allowcate unintialized
// (Error) => Uncaught ReferenceError: Cannot access 'firstName' before initialization
// get this error when variable is present but use before intializec

// console.log(firstName);    //for let - firstname allowcate as un initialized - gives error
// let firstName;
// console.log(firstName);

// console.log(typeof firstName);        // undefined

// let firstName = "harshit";

// =================================================
/*

Notes:

TDZ = Temporal Dead Zone   
A temporal dead zone (TDZ) is the area of a block where a variable is inaccessible
until the moment the computer completely initializes it with a value

   unintialize |----------(TDZ)------------->| initialized
*/