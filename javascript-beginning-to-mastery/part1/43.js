// nested destructuring 

const users = [
    { userId: 1, firstName: 'harshit', gender: 'male' },
    { userId: 2, firstName: 'mohit', gender: 'male' },
    { userId: 3, firstName: 'nitish', gender: 'male' },
]

//  for destructuring - variable name must be same
const [{ firstName: user1firstName, userId }, , { gender: user3gender }] = users;
//  firstName: user1firstName - assign the new name to the variable
console.log(user1firstName);
// console.log(firstName);    // we cannote call by this name now
console.log(userId);
// console.log(id);
console.log(user3gender);