// intro to events
// click 
// event add karne ke 3 tarike hai 

const btn = document.querySelector(".btn-headline");
// console.dir(btn)    // gives the element in the object like structure.

// 1.)
// btn.onClike = function () {
//     console.log("you clicked me !!!!!");
// }

// 2).
// method --- addEventListener
function clickMe() {
    console.log("you clicked me !!!!!");
}

btn.addEventListener("click", clickMe);


// btn.addEventListener("click", function(){
//     console.log("you clicked me !!!!");
// });


// btn.addEventListener("click", ()=>{
//     console.log("arrow function !!!")
// });