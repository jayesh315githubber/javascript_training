// methods
//  -> function inside object

function personInfo() {
    console.log(`person name is ${this.firstName} and age is ${this.age}`);
}

const person1 = {
    firstName: "harsh",
    age: 8,
    // about: personInfo
    about: function () {            //  function inside object  - method
        console.log(this);         // this represent person1 object
        console.log(this.firstName);
    }
}

const person2 = {
    firstName: "mohit",
    age: 18,
    about: personInfo
}

const person3 = {
    firstName: "nitish",
    age: 17,
    about: personInfo
}

person1.about();
person2.about();
person3.about();

