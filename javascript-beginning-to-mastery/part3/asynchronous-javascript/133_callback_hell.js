// callbacks , callback hell, pyramid of doom
// asynchronous programming
//
// Callback Hell = when callbacks are DEEPLY NESTED inside each other.
// Each async step depends on the previous one finishing.
// The code forms a PYRAMID shape → also called "Pyramid of Doom".
//
// PROBLEMS:
//   1. Hard to READ (too many indentation levels)
//   2. Hard to DEBUG (which callback is failing?)
//   3. Hard to add ERROR HANDLING (each level needs its own)
//   4. Hard to MAINTAIN (adding a step in the middle is painful)
//
// SOLUTION → Promises (file 138) and async/await (file 144)

const heading1 = document.querySelector(".heading1");
const heading2 = document.querySelector(".heading2");
const heading3 = document.querySelector(".heading3");
const heading4 = document.querySelector(".heading4");
const heading5 = document.querySelector(".heading5");
const heading6 = document.querySelector(".heading6");
const heading7 = document.querySelector(".heading7");
const heading8 = document.querySelector(".heading8");
const heading9 = document.querySelector(".heading9");
const heading10 = document.querySelector(".heading10");

// Text       Delay   Color

// one        1s      Violet
// two        2s      purple
// three      2s      red
// four       1s      Pink
// five       2s      green
// six        3s      blue
// seven      1s      brown


// ========== Version 1: Raw Callback Hell (setTimeout nesting) ==========

// callback hell
// setTimeout(()=>{
//   heading1.textContent = "one";
//   heading1.style.color = "violet";
//   setTimeout(()=>{
//     heading2.textContent = "two";
//     heading2.style.color = "purple";
//     setTimeout(()=>{
//       heading3.textContent = "three";
//       heading3.style.color = "red";
//       setTimeout(()=>{
//         heading4.textContent = "four";
//         heading4.style.color = "pink";
//         setTimeout(()=>{
//           heading5.textContent = "five";
//           heading5.style.color = "green";
//         },2000)

//       },1000)

//     },2000)

//   },2000)

// },1000)

// The shape of the code:
//   ▷▷▷▷▷▷▷▷▷  ← each level indents further → pyramid!
// 5 levels deep, and we only have 5 headings.
// 10 headings = 10 levels deep! Unreadable!


// ========== Version 2: Improved with reusable function ==========
// Still callback hell (nesting), but at least the logic is extracted.

function changeText(element, text, color, time, onSuccessCallback, onFailureCallback) {
  setTimeout(()=>{
    if(element){
      element.textContent = text;
      element.style.color = color;
      if(onSuccessCallback){
        onSuccessCallback();           // ✅ element exists → call success
      }
    }else{
      if(onFailureCallback){
        onFailureCallback();           // ❌ element null �� call failure
      }
    }
  },time)
}

// How changeText works:
//   changeText(heading1, "one", "violet", 1000, successFn, failureFn)
//     → waits 1000ms (setTimeout)
//     → if heading1 exists: set text "one", color "violet", call successFn
//     → if heading1 is null: call failureFn


// pyramid of doom — each step nested inside the previous step's success callback
changeText(heading1, "one","violet",1000,()=>{                         // level 1
  changeText(heading2, "two","purple",2000,()=>{                       //   level 2
    changeText(heading3, "three","red",1000,()=>{                      //     level 3
      changeText(heading4, "four","pink",1000,()=>{                    //       level 4
        changeText(heading5, "five","green",2000,()=>{                 //         level 5
          changeText(heading6, "six","blue",1000,()=>{                 //           level 6
            changeText(heading7, "seven","brown",1000,()=>{            //             level 7
              changeText(heading8, "eight","cyan",1000,()=>{           //               level 8
                changeText(heading9, "nine","#cda562",1000,()=>{       //                 level 9
                  changeText(heading10, "ten","dca652",1000,()=>{      //                   level 10

                  },()=>{console.log("Heading10 does not exist")})
                },()=>{console.log("Heading9 does not exist")})
              },()=>{console.log("Heading8 does not exist")})
            },()=>{console.log("Heading7 does not exist")})
          },()=>{console.log("Heading6 does not exist")})
        },()=>{console.log("Heading5 does not exist")})
      },()=>{console.log("Heading4 does not exist")})
    },()=>{console.log("Heading3 does not exist")})
  },()=>{console.log("Heading2 does not exist")})
},()=>{console.log("Heading1 does not exist")})

// Execution timeline:
//   0s    → heading1 = "one" (violet)
//   1s    → heading2 = "two" (purple)
//   3s    → heading3 = "three" (red)
//   4s    → heading4 = "four" (pink)
//   5s    → heading5 = "five" (green)
//   7s    → heading6 = "six" (blue)
//   8s    → heading7 = "seven" (brown)
//   9s    → heading8 = "eight" (cyan)
//   10s   → heading9 = "nine" (#cda562)
//   11s   → heading10 = "ten" (dca652)


// ========== Callback Hell vs Promise Chain vs Async/Await ==========
//
// CALLBACK HELL (this file):               10 levels deep!
//   changeText(h1,...,()=>{
//     changeText(h2,...,()=>{
//       changeText(h3,...,()=>{
//         // ... deeper and deeper ...
//       })
//     })
//   })
//
// PROMISE CHAIN (file 138):                flat!
//   changeText(h1, ...)
//     .then(() => changeText(h2, ...))
//     .then(() => changeText(h3, ...))
//     .then(() => changeText(h4, ...))
//     .catch(err => console.log(err))
//
// ASYNC/AWAIT (file 144):                  cleanest!
//   await changeText(h1, ...);
//   await changeText(h2, ...);
//   await changeText(h3, ...);
//   await changeText(h4, ...);
//
// Same result, MUCH cleaner code!
// File 138 shows how to refactor THIS code using Promises.
