// Topic - change text 

// textContent and innerText  -> return text or we can change the text

// innerText vs textContent ->
// innerText property returns the text, without spacing 
// textContent property returns the text along with spacing.


// textContent will give the hide text along with the text content
// But innerText will give only the visible text content. 

const mainHeading = document.getElementById("main-heading");
console.log(mainHeading);

console.log(mainHeading.textContent);
console.log(mainHeading.innerText);

mainHeading.textContent = "This is something else";
console.log(mainHeading.textContent);

mainHeading.innerText = "This is updated by innerText";
console.log(mainHeading.textContent);