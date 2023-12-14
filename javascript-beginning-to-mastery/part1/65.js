// splice method - to delete or insert something from the array
// start , delete , insert 

const myArray = ['item1', 'item2', 'item3', 'item4'];

// delete
const deletedItem = myArray.splice(1, 2);
console.log("delted item", deletedItem);


// insert
// myArray.splice(1, 0, 'inserted item');
// console.log(myArray);


// // insert and delete
// const deletedItem = myArray.splice(1, 2, "inserted item1", "inserted item2")
// console.log("delted item", deletedItem);
// console.log(myArray);