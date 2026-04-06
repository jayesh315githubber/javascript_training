// function - we can declare the function in 3 ways

// 1. 
function singHappyBirthday() {
    console.log("happy birthday to you ......");
}

function sumThreeNumbers(number1, number2, number3) {
    return number1 + number2 + number3;
}

// isEven
// input : 1 (number) 
// output : true , false 

function isEven(number) {
    return number % 2 === 0;
}

console.log(isEven(4));

// 2. function 
// input : string 
// output: firstCharacter 

function firstChar(anyString) {
    return anyString[0];
}

console.log(firstChar("zbc"));

// 3. function 
// input : array, target (number)
// output: index of target if target present in array 

function findTarget(array, target) {

    for (let i = 0; i < array.length; i++) {
        if (array[i] === target) {
            return i;         // return the index of the target number
        }
    }
    return -1;
}
const myArray = [1, 3, 8, 90]
const ans = findTarget(myArray, 8);
console.log(ans);