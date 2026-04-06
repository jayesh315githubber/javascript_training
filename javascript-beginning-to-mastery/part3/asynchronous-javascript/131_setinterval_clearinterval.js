// setInterval & clearInterval
//
// setInterval(callback, delay)
//   → Runs callback REPEATEDLY every delay milliseconds
//   → Returns an interval ID (number) for cancellation
//   → Keeps running FOREVER until clearInterval(id) is called
//
// setTimeout  → runs ONCE after delay      ⏱️
// setInterval → runs EVERY delay FOREVER   🔄🔄🔄

// ========== Basic setInterval Example ==========

// console.log("script start");
// setInterval(() => {
//   // console.log(total);
//   console.log(Math.random());
// }, 500);
// console.log("script end");
//
// Output:
//   script start
//   script end
//   0.7234...     ← after 500ms
//   0.1298...     ← after 1000ms
//   0.9471...     ← after 1500ms
//   ... (never stops until page closes or clearInterval!)


// ========== Practical: Random Color Changer ==========

const body = document.body;
const button = document.querySelector("button");

// Every 1 second: generate random color and set as background
const intervalId = setInterval(() => {
  const red = Math.floor(Math.random() * 256);     // 0-255
  const green = Math.floor(Math.random() * 256);   // 0-255
  const blue = Math.floor(Math.random() * 256);    // 0-255
  const rgb = `rgb(${red},${green}, ${blue})`;
  body.style.background = rgb;                     // change background!
}, 1000);

// How Math.floor(Math.random() * 256) works:
//   Math.random()       → 0.000 to 0.999
//   * 256               → 0.000 to 255.744
//   Math.floor()        → 0 to 255 (whole number)


// ========== Stop Button ==========
// Click → stop color changes + show last color on button

button.addEventListener("click", () => {
  clearInterval(intervalId);                    // STOP the repeating timer!
  button.textContent = body.style.background;   // show last color on button text
});
// After click:
//   1. clearInterval stops the 1-second loop
//   2. Button text shows: "rgb(142, 68, 210)" (last color)
//   3. Background stays frozen on last color

console.log(intervalId);   // prints the ID immediately (e.g., 1)
// intervalId is available immediately — setInterval doesn't block!


// ========== setTimeout vs setInterval ==========
//
// ┌────────────────────────────────────────────────────────────────┐
// │  setTimeout(fn, 1000)         setInterval(fn, 1000)           │
// │  ─────────────────────        ──────────────────────          │
// │  Runs ONCE after 1 sec        Runs EVERY 1 sec (repeating)   │
// │  Cancel: clearTimeout(id)     Cancel: clearInterval(id)      │
// │                                                                │
// │  Timeline:                    Timeline:                       │
// │  ───[callback]                ──[cb]──[cb]──[cb]──[cb]──     │
// │     ↑ once                      ↑     ↑     ↑     ↑          │
// │                                 1s    2s    3s    4s          │
// └────────────────────────────────────────────────────────────────┘
//
// Use setTimeout for: delayed action (show toast, redirect after delay)
// Use setInterval for: repeated action (clock, animation, polling API)


// ========== Common Gotcha: setInterval doesn't guarantee exact timing ==========
//
// setInterval(fn, 1000) means "at LEAST 1000ms between calls"
// If the callback takes 300ms to run:
//   Actual gap between starts = 1000ms
//   Actual gap between end→start = 700ms
//
// If callback takes LONGER than interval (e.g., 1500ms):
//   Callbacks pile up! Interval doesn't wait for previous to finish.
//
// Safer alternative — recursive setTimeout:
//   function repeat() {
//       doWork();
//       setTimeout(repeat, 1000);  // schedule next AFTER current finishes
//   }
//   repeat();
