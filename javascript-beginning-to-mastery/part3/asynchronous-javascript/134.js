// Promise (represent future value jo abhi nahi pata par bad me pata chalegi)
//  works in async way (feature of browser)

/**Note -
 * If the promise resolves, the .then() method will be called. If the promise rejects with an error,
 *  the .catch() method will be called. The 
 * .finally() will be called irrespective of the resolve or reject.
 */

console.log("script start");

const bucket = ['coffee', 'chips', 'vegetables', 'salt', 'rice'];

// producing code
const friedRicePromise = new Promise((resolve, reject) => {

    if (bucket.includes("vegetables") && bucket.includes("salt") && bucket.includes("rice")) {
        resolve({ value: "friedrice" });     // return object , string
    } else {
        reject("could not do it");    // return object , string
    }

})

// consuming code
// how to consume   - browser will consume the promise 
// 1.                                     .then(onResolved, OnRejected)
friedRicePromise.then(
    // jab promise resolve hoga 
    (myfriedRice) => {
        console.log("lets eat ", myfriedRice);
    }
),
    (error) => {
        console.log(error)
    }

// 2.
friedRicePromise.then(
    // jab promise resolve hoga 
    (myfriedRice) => {
        console.log("lets eat ", myfriedRice);
    }
).catch(
    (error) => {
        console.log(error)
    })


setTimeout(() => {
    console.log("hello from setTimeout")
}, 0)

for (let i = 0; i <= 100; i++) {
    console.log(Math.random(), i);
}

console.log("script end!!!!")


/*
concept involve - ( - event loop , callback queue,microtask queue( promise will added in this queue) callstack,event loop,  web api provided by browser)
priority of microtask queue is higher than callback queue
*/