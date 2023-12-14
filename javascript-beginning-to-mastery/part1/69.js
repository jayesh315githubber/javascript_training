// clone using -> Object.assign
 
// Object.assign() returns the target object.
// The Object.assign() method is used to copy the values and properties from one or more source objects to a target object.

// memory  

const obj = {
    key1: "value1",
    key2: "value2"
}

// const obj2 = { 'key69': "value69", ...obj };

const obj2 = Object.assign({ 'key69': "value69" }, obj);
console.log(obj2);

obj.key3 = "value3";
console.log(obj);



