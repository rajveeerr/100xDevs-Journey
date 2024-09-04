function canVote(age){
    return age>=18;
}
//-------------------------------Part 1 of the Assignment----------------------------------
// function greet(person){
//     if(person.gender=="male"){
//         console.log("Hello, Mr. "+person.userName+". You're "+person.age+" years old.");
//         if(person.age>=18){
//             return person;
//         }
//     }
//     else if(person.gender=="female"){
//         console.log("Hello, Mrs. "+person.userName+". You're "+person.age+" years old.");
//     }
//     else{
//         console.log("Hello, M "+person.userName+". You're "+person.age+" years old.");
//     }
//     canVote(person.age);
// }

// -------------------------Traditional method--------------------------------
// function greet(person){
//     let user=[];
//     for(let i=0;i<person.length;i++){
//         if(person[i].gender=="male" && canVote(person[i].age)){
//             user.push(person[i]);
//         }
//     }
//     return user;
// }

// -----------------------Using filter function----------------------------
function greet(person){
    let filteredUsers=person.filter(user=> user.gender==="male"&&canVote(user.age));
    return filteredUsers;
}

/*
wHAT ARE fILTERED fUNCTIONS??
These are higher functions which iterate over each element of the array, and check for the certain conditions, 
if the conditions are met the element is stored in a new array, original is not modified
SYNTAX:
let newArray=array.filter(callback(element[, index[, array]])[, thisArg]);
 where:
 callback is the function executed for each element
 element is the current element being processed in the array
 index of current element, current array and this arg(An optional object to which this can refer in the callback function.)
  are optional.
  eg. 
  const ages = [32, 33, 16, 40];
  const result = ages.filter(checkAdult);
  function checkAdult(age) {
    return age >= 18;
  }

*/


users=[{
    userName: "Eleven",
    gender: "female",
    age: 11
},
{
    userName: "Mike",
    gender: "male",
    age: 17
},
{
    userName: "Div",
    gender: "rather not say",
    age: 19
},
{
    userName: "Andy",
    gender: "male",
    age: 19
},
{
    userName: "Rjvr",
    gender: "male",
    age: 18
}]

// for(let i=0;i<users.length;i++){
//     console.log(greet(users[i]));
// }

console.log(greet(users));

// ----------------------How to take input in JS----------------------------
const readline=require("readline-sync");
//taking inpput
let a=readline.question(); //this method takes string as input, if number is to be inputted, one can typecast this
let num=Number(readline.question());
console.log("You've entered "+a+" and number "+num);



/*
Function of a Browser:-
The function of a browser is to basically allow an user to talk to another machine for eg if i search for a website
the browser sends req to the server containing the html,css,js,img of that site and it sends back to the browser. 
The browser then renders those HTM, CSS, JS files and display the content.

*/