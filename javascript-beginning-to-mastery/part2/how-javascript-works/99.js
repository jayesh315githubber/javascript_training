// example 2

function hello(x) {

    const a = "varA";
    const b = "varB";

    return function () {
        console.log(a, b, x);
    }
}

const ans = hello("arg");
ans();

// in the ans varible -  store the function which is return by the hello -
// so it will return the function with  variable a, b, x