
//  Refactor Previous Example Using Promise
// callback hell - without promise

console.log("Start");

function getName(name) {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Inside name SetTimeout");
            resolve(name);
        }, 2000);
    })

}

function getHobbies(name) {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Inside hobbies SetTimout.");
            resolve(["cricket", "reading", "Dancing"]);
        }, 1000)
    })
}

getName("Jayesh")
    .then(nm => getHobbies(nm))
    .then(hobby => console.log(hobby));

console.log("End...");