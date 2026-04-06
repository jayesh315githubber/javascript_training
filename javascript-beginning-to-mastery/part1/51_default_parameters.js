// default parameters 

//  Function to handle default parameter - earliear used to write this

function addTwo(a, b) {
    if (typeof b === "undefined") {
        b = 0;
    }
    return a + b;
}

console.log("----------------------------------------");

function addTwo(a, b = 0) {
    return a + b;
}

const ans = addTwo(4, 8);
console.log(ans);