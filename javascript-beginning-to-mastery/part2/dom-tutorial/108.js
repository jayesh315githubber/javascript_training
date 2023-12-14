// => get multiple elements using getElements by class name 
const navItems = document.getElementsByClassName("nav-item"); // HTMLCollection -> array like object(i.e we can use indexing)
console.log(navItems);
console.log(navItems[1]);


// console.log(Array.isArray(navItems));    // false

// => get multiple elements items using querySelectorAll
// const navItems = document.querySelectorAll(".nav-item"); // NodeList  -> array like object(i.e we can use indexing)
// console.log(navItems);
// // console.log(navItems);
// console.log(Array.isArray(navItems))   // false
// console.log(navItems[1]);


// Que. HTMLCollection vs NodeList

/*
- Both have a length property that returns the number of elements in the list (collection).
- An HTMLCollection is a collection of document elements.
- A NodeList is a collection of document nodes (element nodes, attribute nodes, and text nodes).
- HTMLCollection items can be accessed by their name, id, or index number.
- NodeList items can only be accessed by their index number.
*/