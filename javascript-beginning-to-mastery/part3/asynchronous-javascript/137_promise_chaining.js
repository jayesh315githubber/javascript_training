// Promise.resolve & Promise Chaining
//
// KEY RULE: .then() ALWAYS returns a new Promise!
// That's what makes chaining possible.
// Whatever you return inside .then() becomes the resolved value of the next .then()

// ========== Promise.resolve — shortcut to create resolved Promise ==========

// Promise.resolve(value) → creates a Promise that is ALREADY resolved with that value
// Useful for: testing, starting a chain, wrapping sync values in a Promise

// const myPromise = Promise.resolve(5);     // note - Promise.resolve return promise

// myPromise.then(
//   (nm) => { console.log(nm); }       // OUTPUT: 5
// )

// One-liner version:
// Promise.resolve(5).then(value => {
//   console.log(value);                 // OUTPUT: 5
// })


// ========== Promise Chaining ==========

// then() - then method hamesha promise return karta hai (to achieve the promise chaining)
// Whatever you RETURN from .then() is passed to the NEXT .then()

function myPromise() {
  return new Promise((resolve, reject) => {
    resolve("foo");
  })
}

myPromise()
  .then((value) => {
    console.log(value);          // OUTPUT: "foo"
    value += "bar";              // "foo" + "bar" = "foobar"
    return value                 // return the promise
    // return Promise.resolve(value);    // internally works like this.
    //  if we not return then it return undefined like return Promise.resolve(undefined)
  })
  .then((value) => {
    console.log(value);          // OUTPUT: "foobar"
    value += "baaz";             // "foobar" + "baaz" = "foobarbaaz"
    return value;
  })
  .then(value => {
    console.log(value);          // OUTPUT: "foobarbaaz"
  })


// ========== How Chaining Works Step by Step ==========
//
// myPromise() resolves with "foo"
//       │
//       ▼
// .then(value => {                value = "foo"
//   console.log(value);           → prints "foo"
//   value += "bar";               → value = "foobar"
//   return value;                 → internally: return Promise.resolve("foobar")
// })
//       │  passes "foobar" to next .then()
//       ▼
// .(thenvalue => {                value = "foobar"
//   console.log(value);           → prints "foobar"
//   value += "baaz";              → value = "foobarbaaz"
//   return value;                 → internally: return Promise.resolve("foobarbaaz")
// })
//       │  passes "foobarbaaz" to next .then()
//       ▼
// .then(value => {                value = "foobarbaaz"
//   console.log(value);           → prints "foobarbaaz"
//   // no return → internally: return Promise.resolve(undefined)
// })


// ========== What .then() Returns Internally ==========
//
// return "foobar"               → Promise.resolve("foobar")     → next .then gets "foobar"
// return 42                     → Promise.resolve(42)            → next .then gets 42
// return { name: "Jay" }       → Promise.resolve({name:"Jay"})  → next .then gets the object
// return anotherPromise         → waits for it, then passes result
// return nothing (no return)   → Promise.resolve(undefined)     → next .then gets undefined
//
// .then() ALWAYS wraps your return value in a Promise!
// That's why you can keep chaining .then().then().then()...


// ========== What Happens Without Return? ==========
//
// myPromise()
//   .then(value => {
//     console.log(value);       // "foo"
//     value += "bar";
//     // NO return! → returns Promise.resolve(undefined)
//   })
//   .then(value => {
//     console.log(value);       // undefined! ← lost the value!
//   })
//
// ALWAYS return if you want to pass data to the next .then()!


// ========== Output ==========
// foo
// foobar
// foobarbaaz
