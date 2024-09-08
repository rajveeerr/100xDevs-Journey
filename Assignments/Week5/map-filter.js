/* Let's Talk Abouut Arrow Functions(=>)
arrow functions are used to create function in a cleaner way
function mod(num){
    return abs(num);
}
positive=mod(-4);
this can be written using arrow fn as:
mod= (num)=> abs(num); //if single statement to be RETURNED no brackets are used after arrow, else for
// multi statements{} are used, same for single parameter () can or cannot be used but are required for
// multiple parameters(before arrow fn), the name of fn will be the name given before equal sign

console.log(mod(-4));

ways of creating function:
let newFn= function(parameters){all statements};    //anonymos fn
*/

function sum(a,b){
    // this
    return a+b;
}
const Sum=(a,b)=>{
    return a+b;
} //both are them are alost the difference is of how this binds to them


// --------------------------------Map-------------------------------
let arr=[1,2,3,4,5];
// console.log(arr);

let transformationFn=(num)=>{return num*2};
arr=arr.map(transformationFn);//returns copy of arr, doesn't cahnge the original arr
arr=arr.map((ele)=>ele*2);//same as above
arr=customMap(arr,(ele)=>ele*2);//same as above
console.log(arr);

//customMap fn
function customMap(arr,fn){
    let carr=[];
    
    for(let i=0;i<arr.length;i++){
        carr[i]=fn(arr[i]);
    }
    return carr;
}

// --------------------------------------------------Filter-------------------------------
function filterLogic(n) { 
    if(n%2==0){
        return true;
    }
    return false;
}

let array=[1,2,3,4,5]
let ans = array.filter(filterLogic);//runs filter logic for every element of array returns the element if fn returns true
ans = array.filter((ele)=>ele%2==0);//both are same
console.log(ans);

let Name='rajveer';
console.log(Name.startsWith("r"));//startsWith() returns true if first letter of str starts with the argument given
