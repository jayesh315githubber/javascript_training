// closures

// closure : 30-40%
// analyse : 70-80%
// real example : 100%


// function can return functions, object, array, number, String

// function outerFunction() {

//     function innerFunction() {
//         console.log("hello world")
//     }

//     return innerFunction;
// }

// const ans = outerFunction();       // in the ans variable - innerFunction is stored which return by the outerFunction.
// console.log(ans);
// ans();


//  example 1

function printFullName(firstName, lastName) {

    function printName() {
        console.log(firstName, lastName);
    }

    return printName;
}

/*
-> when outer function return the inner function then it will return with variable which are used in inner function.

-> printFullName return the printName function with (with lexical scope envi varibles) firstname, lastname variables
in the ans varible = printName function is stored which is return by the printFullName function
*/

const ans = printFullName("harshit", "sharma");
console.log(ans);
ans();


