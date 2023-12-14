// param destructuring 

// use in -> 
// object 
// react 

const person = {

    firstName: "harshit",
    gender: "male",
    age: 500
}

function printDetails(obj) {
    console.log(obj.firstName);
    console.log(obj.gender);
}

printDetails(person);

// ==========================================

// param destructuring =>

// Note - param named should be the same as properties name and should be write in { } bracket

function printDetails({ firstName, gender, age }) {
    console.log(firstName);
    console.log(gender);
    console.log(age);
}
printDetails(person);