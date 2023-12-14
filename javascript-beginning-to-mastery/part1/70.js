// optional chaining 

const user = {
    firstName: "harshit",
    address: { houseNumber: '1234' }
}

console.log(user?.firstName);   // if not present then will get undefined but will not throw error.
console.log(user?.address?.houseNumber);    