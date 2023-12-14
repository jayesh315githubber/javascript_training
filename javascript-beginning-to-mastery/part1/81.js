function hello() {
    console.log("hello world");
}

// // javascript function ===> function  + object  (we can treat the js function as object too)

console.log(hello.name);         // hello

// // you can add your own properties
hello.myOwnProperty = "very unique value";

console.log(hello.myOwnProperty);
console.log();

// name property ---> tells function name;

// function provides more usefull properties.

console.log(hello.prototype);    // {}   -> object  -  like free space 

// // only functions provide prototype property.
// // array, object -> will not provide the prototype property.

hello.prototype.abc = "abc";
hello.prototype.xyz = "xyz";
hello.prototype.sing = function () {
    return "lalalla";
};

console.log(hello.prototype);     // note

console.log(hello.prototype.sing());