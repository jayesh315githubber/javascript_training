// objects  -> reference type  

// arrays are good but not sufficient 
// for real world data 
// objects store key value pairs 
// objects don't have index

// how to create objects 

// const person = {name:"Harshit",age:22};

const person = {
    name: "harshit",
    age: 22,
    hobbies: ["guitar", "sleeping", "listening music"]
}
console.log(person);

// how to access data from objects 
console.log(person["name"]);    // pass key as string - key are by default in string in Js
console.log(person["age"]);

console.log(person.hobbies);     // to access the array



// how to add key value pair to objects
person["person"] = "male";
person.gender = "male"

console.log(person)
console.log(person);