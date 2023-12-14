

const myInput = document.getElementById("input-event");
console.log(myInput);

// keyup
// input       (recommneded)
// change     - print the value when facus is change from the element
// keypress
// keydown

// function findSuggestion(e) {
//     console.log(this.value);
// }

// myInput.addEventListener("input", findSuggestion)

myInput.addEventListener("input", function (e) {
    console.log(this.value);

})

// myInput.addEventListener("input", (e) => {
//     // console.log(myInput.value);  //  in this case we only target myInput element
//     console.log(e.target.value);   // e.target -> shows on which elememnt the event is trigger
//     console.log(this.value);   // works only in the case of normal function not for arrow function 
// })

