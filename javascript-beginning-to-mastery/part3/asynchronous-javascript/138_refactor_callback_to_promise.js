// Refactoring Callback Hell (file 133) → Promise Chain
//
// File 133: 10 levels of nested callbacks (pyramid of doom) ❌
// File 138: Flat .then() chain — same result, MUCH cleaner! ✅
//
// KEY CHANGE in changeText function:
//   File 133: takes onSuccessCallback, onFailureCallback as arguments
//   File 138: RETURNS a Promise with resolve/reject instead

const heading1 = document.querySelector(".heading1");
const heading2 = document.querySelector(".heading2");
// /const heading2 = document.querySelector(".heading");
const heading3 = document.querySelector(".heading3");
const heading4 = document.querySelector(".heading4");
const heading5 = document.querySelector(".heading5");
const heading6 = document.querySelector(".heading6");
const heading7 = document.querySelector(".heading7");
const heading8 = document.querySelector(".heading8");
const heading9 = document.querySelector(".heading9");
const heading10 = document.querySelector(".heading10");


// ========== changeText now RETURNS a Promise ==========
// Instead of taking success/failure callbacks, it returns a Promise.
// resolve() = element was found and updated (success)
// reject() = element was null/missing (failure)

function changeText(element, text, color, time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (element) {
        element.textContent = text;
        element.style.color = color;
        resolve();                   // ✅ success → will return the promise
      } else {
        reject("element not found"); // ❌ failure → caught by .catch()
      }
    }, time)
  })
}

// ========== Way 1: Explicit return in each .then() ==========

// 1.
changeText(heading1, "one", "red", 1000)
  .then(() => {
    return changeText(heading2, "two", "purple", 1000)
  })
  .then(() => {
    return changeText(heading3, "three", "green", 1000)
  })
  .then(() => {
    return changeText(heading4, "four", "orange", 1000)
  })
  .then(() => {
    return changeText(heading5, "four", "orange", 1000)
  })
  .then(() => {
    return changeText(heading6, "four", "orange", 1000)
  })
  .catch((error) => {
    alert(error);     // ONE .catch() handles errors from ANY step!
  })

// ========== Way 2: Arrow function shorthand (cleaner!) ==========
// When arrow function has single expression, { return ... } can be omitted

// ------------ we can also write in this way -------
// 2.
// changeText(heading1, "one", "red", 1000)
//   .then(() => changeText(heading2, "two", "purple", 1000))
//   .then(() => changeText(heading3, "three", "green", 1000))
//   .then(() => changeText(heading4, "four", "orange", 1000))
//   .then(() => changeText(heading5, "four", "orange", 1000))
//   .then(() => changeText(heading6, "four", "orange", 1000))
//   .then(() => changeText(heading7, "four", "orange", 1000))
//   .then(() => changeText(heading8, "four", "orange", 1000))
//   .then(() => changeText(heading9, "four", "orange", 1000))
//   .then(() => changeText(heading10, "four", "orange", 1000))
//   .catch((error) => {
//     alert(error);
//   })


// ========== File 133 (Callback Hell) vs File 138 (Promise Chain) ==========
//
// CALLBACK HELL (file 133):                  PROMISE CHAIN (this file):
// ──────────────────────────                 ─────────────────────────
// changeText(h1,...,()=>{                    changeText(h1, ...)
//   changeText(h2,...,()=>{                    .then(() => changeText(h2,...))
//     changeText(h3,...,()=>{                  .then(() => changeText(h3,...))
//       changeText(h4,...,()=>{                .then(() => changeText(h4,...))
//         changeText(h5,...,()=>{              .then(() => changeText(h5,...))
//           // deeper...                      .catch(err => alert(err))
//         },()=>{err})
//       },()=>{err})                        FLAT! ✅
//     },()=>{err})                          ONE .catch() for ALL errors! ✅
//   },()=>{err})
// },()=>{err})
//
// NESTED 10 levels! ❌
// Each level needs its own error handler! ❌


// ========== How It Executes (Sequential) ==========
//
// Time 0s:  changeText(heading1) starts → 1 sec timer
// Time 1s:  heading1 = "one" (red) → resolve()
//           → .then() runs → changeText(heading2) starts → 1 sec timer
// Time 2s:  heading2 = "two" (purple) → resolve()
//           → .then() runs → changeText(heading3) starts → 1 sec timer
// Time 3s:  heading3 = "three" (green) → resolve()
//           ... continues ...
//
// Each step waits for the previous one to resolve before starting!
// This is SEQUENTIAL execution — one after another.


// ========== Error Handling — ONE .catch() for All! ==========
//
// If ANY heading is null (e.g., heading3 doesn't exist):
//   changeText(heading1) → resolve ✅
//   changeText(heading2) → resolve ✅
//   changeText(heading3) → reject("element not found") ❌
//   → SKIPS all remaining .then() steps!
//   → JUMPS directly to .catch()
//   → alert("element not found")
//
// In callback hell, you needed error handler for EACH level.
// With promises, ONE .catch() at the end catches ALL errors!


// ========== Next Improvement: async/await (file 144) ==========
//
// Even cleaner than .then() chains:
//
//   async function animate() {
//       await changeText(heading1, "one", "red", 1000);
//       await changeText(heading2, "two", "purple", 1000);
//       await changeText(heading3, "three", "green", 1000);
//   }
//
// Reads like synchronous code!
