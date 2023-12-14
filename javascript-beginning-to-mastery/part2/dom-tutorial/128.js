/**
 *  NOTE : 
 *1. Event bubbling and event capturing happen only when the element 
 * and it’s all ancestors have the same event listener (in our case, ‘click’ event) attach to them.
 *
 * 2. Event capturing means propagation of event is done from ancestor elements to child element 
 * in the DOM while event bubbling means propagation is done from child element to ancestor elements in the DOM.
 * 
 */


console.log("hello world");

const grandparent = document.querySelector(".grandparent");
const parent = document.querySelector(".parent");
const child = document.querySelector(".child");

// capturing events   (event,callbackfuntion,true/false)
/**
 * 
 */

child.addEventListener(
    "click",
    () => {
        console.log("capture !!!! child");
    },
    // true
    false
);

parent.addEventListener(
    "click",
    () => {
        console.log("capture !!!! parent");
    },
    // true
    false
);

grandparent.addEventListener(
    "click",
    () => {
        console.log("capture !!!! grandparent");
    },
    true
);

document.body.addEventListener(
    "click",
    () => {
        console.log("capture !!!! document.body");
    },
    true
);

///// event bubbling - not capture (event,callbackfunction)
/**
 *  the process of propagating from the closest element
 *  to the farthest away element in the DOM (Document Object Modal) is called event bubbling.
 */

child.addEventListener("click", () => {
    console.log("bubble child");
});
parent.addEventListener("click", () => {
    console.log("bubble parent");
});
grandparent.addEventListener("click", () => {
    console.log("bubble grandparent");
});
document.body.addEventListener("click", () => {
    console.log("bubble document.body");
});


// event delegation
// grandparent.addEventListener("click", (e) => {
//     console.log(e.target);
// });


