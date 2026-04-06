// filter method 
// Returns the elements of an array that meet the condition specified in a callback function

const numbers = [1, 3, 2, 6, 4, 8];

const evenNumbers = numbers.filter((number) => {
    return number % 2 === 0;
});

console.log(evenNumbers);

// --------------------------------
// Note -> callback function of map, filter is always return something.

function evenChk(number) {
    return number % 2 === 0;   // callback function of filter is always return something
}

const evenNumbers2 = numbers.filter(evenChk);
console.log(evenNumbers2);

