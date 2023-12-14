// find method 

//  Returns the value of the first element in the array
//  where predicate is true, and undefined otherwise.

const myArray = ["Hello", "catt", "dog", "lion"];

function isLength3(string) {
    return string.length === 3;
}

const res = myArray.find(isLength3);
console.log(res);

const ans = myArray.find((string) => string.length === 3);
console.log(ans);

const users = [
    { userId: 1, userName: "harshit" },
    { userId: 2, userName: "harsh" },
    { userId: 3, userName: "nitish" },
    { userId: 4, userName: "mohit" },
    { userId: 5, userName: "aaditya" },
];

const myUser = users.find((user) => user.userId === 3);
console.log(myUser);

// ----------------------------------------------
function findById(user) {
    return user.userId == 3
}
const userByid = users.find(findById)
console.log(userByid);