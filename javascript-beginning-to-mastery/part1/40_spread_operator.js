// spread operator

const array1 = [1, 2, 3];
const array2 = [5, 6, 7];

// const newArray = [...array1, ...array2, 89, 69];  

const newArray = [..."123456789"];    // support only in string form becz string is iterable
const newArray2 = [..."jayesh"];      // support only in string form
console.log(newArray);
console.log(newArray2);


// spread operator in objects
const obj1 = {
  key1: "value1",
  key2: "value2",
};

const obj2 = {
  key1: "valueUnique",
  key3: "value3",
  key4: "value4",
};

// const newObject = { ...obj2, ...obj1, key69: "value69" };
// const newObject = { ..."abc" }     // { '0': 'a', '1': 'b', '2': 'c' }

const newObject = { ...["item1", "item2"] };  //note -> { '0': 'item1', '1': 'item2' }

const newObject2 = { ...[1, 2, 3], 4: "four" }  // note
// const newObject = { ..."abcdefghijklmnopqrstuvwxyz" };
console.log(newObject);
console.log(newObject2);
