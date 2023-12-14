console.log(window);      // this === window

// "use strict";

function myFunc() {
    console.log(this);  // if we use use strict mode - it will give undefined as result
}

myFunc();
// window.myFunc();