// use const for creating array

// heap memory --> ["apple", "mango"] -> address - 0x11 

const fruits = ["apple", "mango"]; // address - 0x11
fruits.push("banana");
fruits[0] = "APPLE";
console.log(fruits);

// fruits = ["papai"]   // for const var-we cannot reasign the variable.bcaz in this case we are changing the address of the array which are stored in the fruits var
// console.log(fruits);

/*
- In the case of const for variable we cannot change the variable

- But using const for array we can change or modified the array with the help of array method
 bcaz in this case in the fruits variable the address is stored not the array. 
 The array is stored in the heap memory.
 
 we cannot the reasign the array but we can modified the arrya using array method.
*/
