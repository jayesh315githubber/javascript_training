// synchronous programming vs asynchronous programming
// synchronous programming
// javascript -> synchronous programming single threaded

// console.log("script start");

// for (let i = 1; i < 10000; i++) {
//   console.log("inside for loop");
// }

// console.log("script end");

// ===================================================

// setTimeout       ( concept involve - event loop , callback queue, callstack, web api provided by browser)
//                  - will return the id
/**
 * setTimeout function handled by the browser after completing the time function will be added to callback queue
 * after executing the script then it added to callstack and then it will executed.
 */

console.log("script start");

const id = setTimeout(() => {               // also setTime function return the id
  console.log("inside setTimeout");
}, 1000);

for (let i = 1; i < 100; i++) {
  console.log("....");
}

console.log("settimeout id is ", id);
console.log("clearing time out");
clearTimeout(id);        // will not run the setTimeout callback function
console.log("Script end");
