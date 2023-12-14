// important array methods 

// foreach

const numbers = [4, 2, 5, 8];

function myFunc(number, index) {
    console.log(`index is ${index} number is ${number}`);
}

numbers.forEach(function (number, index) {
    console.log(`index is ${index} number is ${number}`);
});

// numbers.forEach(myFunc);  // note- we can directly pass the function(callback) as argument to the foreach

numbers.forEach(function (number, index) {       // anonymous function as arg
    console.log(number * 3, index);
})

const users = [
    { firstName: "harshit", age: 23 },
    { firstName: "mohit", age: 21 },
    { firstName: "nitish", age: 22 },
    { firstName: "garima", age: 20 },
]

function func(user) {
    console.log("2 " + user.firstName);
}

users.forEach(func)   // forEach function take callback function as input

// users.forEach(function (user) {
//     console.log(user.firstName);
// });

users.forEach((user, index) => {
    console.log(user.firstName, index);
})

for (let user of users) {
    console.log(user.firstName);
}


