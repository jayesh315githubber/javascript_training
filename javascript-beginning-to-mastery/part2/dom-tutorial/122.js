const allButtons = document.querySelectorAll(".my-buttons button");
console.log(allButtons);

for (let button of allButtons) {
    button.addEventListener("click", function () {
        console.log(this);
        console.log(this.textContent);
    })
}

// for(let i = 0 ; i< allButtons.length; i++){
//     allButtons[i].addEventListener("click", function(){
//         console.log(this);
//     })
// }

// allButtons.forEach(function(button){
//     button.addEventListener("click", function(){
//         console.log(this);
//         });
// })

// btn.forEach((button) => {
//     button.addEventListener("click", function () {
//         console.log(button);
//     })
// })
