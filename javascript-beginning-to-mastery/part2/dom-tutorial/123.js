// event object 

const firstButton = document.querySelector("#one");

firstButton.addEventListener("click", function (event) {
    console.log(event);
})

// jab bhi mai kisi bhi element pe event listener add hoga 
// js Engine --- line by line execute karta hai 
// browser ---- js Engine + extra features 
// browser ----- js Engine + WebApi

// jab browser ko pata chala ki user ne event perform kia 
// jo hum listen kar rahe hai 
// browser perform two task----- 2 
// 1.) callback function hai vo js Engine ko dega ...... 
// 2.)  callback function ke sath browser jo event hua hai uski information bhi dega
// ye info hamein ek object ke form mai milegi  
//  we can get this info as object in the function as argument


const allButtons = document.querySelectorAll(".my-buttons button");

for (let button of allButtons) {
    button.addEventListener("click", (e) => {
        // console.log(e.target);
        console.log(e.currentTarget);
    })
}


//  note -> target vs currentTarget

// target - means kis element ne event ko trigger kiya
// currentTaget - kis element pe hamne event listner attach kiya tha