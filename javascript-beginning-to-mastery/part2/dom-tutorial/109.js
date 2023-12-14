// get multiple elements using getElements by class name 
// get multiple elements items using querySelectorAll

// array like object ---> indexing, length property             // note

// let navItems = document.getElementsByTagName("a");    // HTMLCollection(array like object but not array)
// console.log(navItems);
// console.log(navItems.length);

// we can't use forEach method to iterate through HTMLCollection  -> to iterate we have to convert into array first
// simple for loop 
// for of loop 
// forEach 

// for (let i = 0; i < navItems.length; i++) {
//     console.log(navItems[i]);
//     const navItem = navItems[i];
//     navItem.style.backgroundColor = "#fff";
//     navItem.style.color = "green";
//     navItem.style.fontWeight = "bold";
// }

// for (let navItem of navItems) {
//     console.log(navItem);
//     navItem.style.backgroundColor = "#fff";
//     navItem.style.color = "green";
//     navItem.style.fontWeight = "bold";
// }
// // Array.from()    =>  // to convert HTMLCollection into array
// navItems = Array.from(navItems);
// console.log(Array.isArray(navItems));


// navItems.forEach((navItem) => {
//     console.log(navItem);
//     navItem.style.backgroundColor = "#fff";
//     navItem.style.color = "green";
//     navItem.style.fontWeight = "bold";
// })

// console.log(Array.isArray(navItems));


// ----------------------------------------------

// const navItems = document.querySelectorAll(".nav-item");      // NodeList -> we can use foreach loop
// console.log(navItems[1]);

let navItems = document.querySelectorAll("a");
// console.log(navItems);   // RETURN nodelist
// navItems = Array.from(navItems);
// console.log(Array.isArray(navItems));

// simple for loop
// for of loop
// forEach

// for (let i = 0; i < navItems.length; i++) {
//     console.log(navItems[i]);
//     const navItem = navItems[i];
//     navItem.style.backgroundColor = "#fff";
//     navItem.style.color = "green";
//     navItem.style.fontWeight = "bold";

// }

// for (let navItem of navItems) {
//     console.log(navItem);
//     navItem.style.backgroundColor = "#fff";
//     navItem.style.color = "green";
//     navItem.style.fontWeight = "bold";
// }

// note - // we can use foreach method on Nodelist directly - no need to convert it into array
navItems.forEach((navItem) => {
    console.log(navItem);
    navItem.style.backgroundColor = "#fff";
    navItem.style.color = "green";
    navItem.style.fontWeight = "bold";
})

console.log(navItems);