// this keyword

const btn = document.querySelector(".btn-headline");

// btn.addEventListener("click", function () {
//     console.log("you clicked me !!!!");
//     console.log("value of this")
//     console.log(this);    // in this case this represent the btn element object.
// });

// ==================================

// console.log(this);          // for arrow function  outer this represent the inner function this.(level up object)
// btn.addEventListener("click", () => {
//     console.log("you clicked me !!!!");
//     console.log("value of this")
//     console.log(this);     // in this case this represent the window object
// });

// ============================


// 2nd way
function myFunct() {
    console.log("you clicked me !!!!");
    console.log("value of this")
    console.log(this);        // this represent the btn element object.
};

btn.addEventListener("click", myFunct);