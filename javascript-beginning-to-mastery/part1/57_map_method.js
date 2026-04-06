// map method 

const numbers = [3, 4, 6, 1, 8];

const square = function (number) {
    return number * number;
}

// note -> generally we pass function(callback) as argument to the map which return the something

// const squareNumber = numbers.map((number, index) => {
//     // return index;
//     return number ** 2;  // always return something to the map function
// });

const squareNumber = numbers.map(square);

console.log(squareNumber);

// -----------------------------------------

const users = [
    { firstName: "harshit", age: 23 },
    { firstName: "mohit", age: 21 },
    { firstName: "nitish", age: 22 },
    { firstName: "garima", age: 20 },
]

const userNames = users.map((user) => {
    return user.firstName;
});

console.log(userNames);

// ----------------------------------------

function ageDetails(user) {
    return user.age;
}

const userAge = users.map(ageDetails);
console.log(userAge);

