const URL = "https://jsonplaceholder.typicode.com/posts";
const xhr = new XMLHttpRequest();
// console.log(xhr);

// step1
// console.log(xhr.readyState);    ( readystate 0 - 4 )
xhr.open("GET", URL);
// console.log(xhr.readyState);
// xhr.onreadystatechange = function(){
//     // console.log(xhr.readyState);
//     if(xhr.readyState === 4){
//         console.log(xhr)
//         const response = xhr.response;      // note- return the response in string form 
//         const data = JSON.parse(response);  // note- to covert the string form of response jsons to javascrpt object
//         console.log(typeof data);
//     }
// }

xhr.onload = function () {            // onload method run only when the readystate = 4 
    const response = xhr.response;
    const data = JSON.parse(response);
    console.log(data);
}

xhr.send();