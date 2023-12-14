// Sets (it is iterable)

// store data
// sets also have its own methods
// No index-based access
// Order is not guaranteed
// unique items only (no duplicates allowed)    
// can save any data type of element            // imp pt

// methods  -> 
// 1. add
// 2. has

const items = ['item1', 'item2', 'item3'];

const string = new Set("jayesh");  // we can pass a string as arg bcz it is iterable
console.log(string);     // Set(6) { 'j', 'a', 'y', 'e', 's', 'h' }

const numbers = new Set();

numbers.add(1);
numbers.add(2);
numbers.add(3);
numbers.add(4);
numbers.add(['item1', 'item2']);   // both array are different 
numbers.add(['item1', 'item2']);
numbers.add(6);
numbers.add(items);
numbers.add(items);  //ignore the seconde items becz it point to the same array


//  has - return boolean value

if (numbers.has(1)) {
    console.log("1 is present")
} else {
    console.log("1 is not present")
}

for (let number of numbers) {
    console.log(number);
}

const myArray = [1, 2, 4, 4, 5, 6, 5, 6];
const uniqueElements = new Set(myArray);   // pass as arg becz array is iterable
let length = 0;

for (let element of uniqueElements) {
    length++;
}

console.log(uniqueElements);

console.log(length);