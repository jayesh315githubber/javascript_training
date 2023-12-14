// fetch - will return promise
// fetch will reject when network related error will occure.

const URL = "https://jsonplaceholder.typicode.com/posts";

fetch(URL, {
    method: 'POST',
    //  JSON.stringify - will convert the javascript object or array into json object 
    body: JSON.stringify({
        title: 'foo',
        body: 'bar',
        userId: 1,
    }),
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
})
    .then(response => {
        console.log(response);
        if (response.ok) {
            console.log(response.json());           ///response.json() will also return the promise
        } else {
            throw new Error("Something went wrong!!!")
        }
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log("inside catch");
        console.log(error);
    })
