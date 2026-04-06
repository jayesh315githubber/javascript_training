
// callback hell - without promise

console.log("Start");

function getName(name, callback) {

    setTimeout(() => {
        console.log("Inside name SetTimeout");
        callback(name);
    }, 2000);
}

function getHobbies(name, callback) {
    setTimeout(() => {
        console.log("Inside hobbies SetTimout.");
        callback(["cricket", "reading", "Dancing"]);
    }, 1000)
}

const nm = getName("Jayesh", (nm) => {
    console.log(nm);
    getHobbies(nm, (hobby) => {
        console.log(hobby);
    })
}
);
console.log("End...");