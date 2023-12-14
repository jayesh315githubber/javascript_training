// Promise.resolve
// Promise chaining

// const myPromise = Promise.resolve(5);     // note - Promise.resolve return promise 

// myPromise.then(
//   (nm) => { console.log(nm); }
// )

// Promise.resolve(5).then(value => {
//   console.log(value);
// })


// then() - then method hamesha promise return karta hai (to achive the promise chaining)



function myPromise() {
  return new Promise((resolve, reject) => {
    resolve("foo");
  })
}

myPromise()
  .then((value) => {
    console.log(value);
    value += "bar";
    return value            // return the promise
    // return Promise.resolve(value);    // internally works like this.
    //  if we not return then it return undefined like return Promise.resolve(undefined)
  })
  .then((value) => {
    console.log(value);
    value += "baaz";
    return value;
  })
  .then(value => {
    console.log(value);
  })


