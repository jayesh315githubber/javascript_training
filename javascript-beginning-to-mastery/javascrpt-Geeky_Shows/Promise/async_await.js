
// async and await

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

async function showHobby() {

    const nm = await getName("Jayesh");
    const hobby = await getHobbies(nm);
    console.log(hobby);
}

showHobby();

console.log("End...");