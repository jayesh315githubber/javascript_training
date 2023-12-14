// block scope vs function scope

// let and const are block scope
// var is function scope

// ---------------  var -----------------------
// var is function scope

// {
//     var firstName = 'harshit'
//     console.log(firstName)
// }
// console.log(firstName)

// {
//     firstName = 'mohit'
//     console.log(firstName)
// }

// ---------------  let,const -----------------------
// let and const are block scope

// {
//     let firstName = "harshit";
//     console.log(firstName);
// }

// console.log(firstName);  //we cannot access the firstName outside the block

// {
//     let firstName = "mohit";
//     console.log(firstName);
// }

// --------------------------------------------------
//  { }  -> block

// if (true) {
//     let firstName = 'harshit1'
//     console.log(' 1 ' + firstName)
// }

// console.log(' 2 ' + firstName)

// ----------------------

function myApp() {
    //  var is function scope
    if (true) {
        var firstName = 'harshit'
        console.log(' 3 ' + firstName)
    }

    if (true) {
        console.log(' 4 ' + firstName)
    }

    console.log(' 5 ' + firstName)
}

myApp()

// var
// We can declare a variable again even if it has been defined previously in the same scope.
// Hoisting is allowed with var.

// let
// We cannot declare a variable more than once if we defined that previously in the same scope.
// Hoisting is not allowed with let.
