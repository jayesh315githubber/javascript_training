// lexical environment, scope chain

const lastName = "Vashistha";

const printName = function () {

    const firstName = "harshit";

    function myFunction() {
        console.log(firstName);   // firstname is present in the lexical env of the myFunction function
        console.log(lastName);
    }

    myFunction()
}
printName();