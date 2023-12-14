/*
Debouncing -> most useful concept for performance optimization by limiting
function calls on different event (typing events , scroll event, resize event
    on other keyboard/ mouse events) 
*/


const myInput = document.getElementById("input-event");

function findSuggestions(e) {
    console.log("Suggestion for ", e.target.value);
}

function debounce(func, delay) {

    let timeoutId;

    return function (...args) {

        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func.call(this, ...args);         //
        }, delay)
    };
}

const decoratedFindSuggestions = debounce(findSuggestions, 400);

myInput.addEventListener("input", decoratedFindSuggestions);