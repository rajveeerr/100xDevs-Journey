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

class project{
    constructor(name,stack){
        this.name=name; //default value undefined
        this.stack=stack;
    }
    displayProject() {
        console.log(`You\'re creating ${this.name}.`);
        console.log(`You\'re using tech stack: ${this.stack}.`);
    }
    rating(){
        console.log(`You\'re project name is rated ${(this.name.length/10)*100}%.`);
    }
}

const project1=new project("Assignments.100xDevs",["HTML","CSS","JS"]); //instance of the project class or object of the project class 
project1.displayProject();
project1.rating();

// Normal objects are just key value pair they aren't meaned to create blueprint for something, though they can have 
// function as their key value
// constuctor gets automatically called when new keyword is used  
// this keyword returns whole object(gives acess to the current object) 
// same as cpp string is also an instance of String class

// some classes provided by js are: Date, Map, Promises

let dictionary=new Map;
dictionary.set("key","value"); //same as objects in js 
console.log(dictionary.get("key"));

const today=new Date;
console.log(today.getDate()); 

// ----------------------Let's Start Promises-----------------------
// A Promise in JavaScript is an object that represents the eventual completion (or failure) of an 
// asynchronous operation and its resulting value. Promises are used to handle asynchronous operations more 
// effectively than traditional callback functions, providing a cleaner and more manageable way to deal 
// with code that executes asynchronously, such as API calls, file I/O, or timers.
// recap: why use PROMISES over callback??(ans above and) no callback hell (not technically true)

// -> tldr: promises are the class that promises to return something in future(async operations)
// -> one can always use callback based approach or promises based approach
// eg. of callback based approach: 

// function loveu(){
// console.log("I'm Irom Man (snap)")
// }
// setTimeout(loveu,3000);


//  Basically, promise is a class, which takes function as the constructer parameters and returns the eventual
//  completion of the function. If the function's tasks are compleated then the resolve function passed as 
//  this function's parameter will be called(which calls callback fn), promise will return instance(object)
//  and that instance(object) can be used to pass callback using then() method.
// Example:

// function fn(resolve){//here resolve(can have any other name) is another function, once this resolve is called the fn is marked as compleated and promise instance will have some value as a result the .then(callback) methodnwill work

    // this RESOLVE PARAMETER HAS CALLBACK FUNCTION AS THE ARGUMENT

//  Tldr of this fn: do ur thing, whenever u have the final value, call resolve();

        // resolve(); //resolve is called the promise is complete, callback ran, whenever this function(resolve) is called the callback gets called, now one can use settimeout on this anything the want 
// }

// let newPromise=new Promise(fn); //supposed to return something eventually
// console.log(newPromise); //this will print Promise { <pending> } if the fn(passed as parameter) is not called(or completed)
// newPromise.then(()=>console.log("Promise compleated!!!!")); //used arrow fn

// --------------------ANOTHER Way to Understand Promises:----------------

// A Promise is a proxy for a value not necessarily known when the promise is created. It allows you to associate handlers
//  with an asynchronous action's eventual success value or failure reason. This lets asynchronous methods return values
//  like synchronous methods: instead of immediately returning the final value, the asynchronous method returns a promise
//  to supply the value at some point in the future.

/* ----------------------------REAL LIFE EXAMPLE OF PROMISE-----------------------------
 Imagine you're ordering a pizza. When you place the order, the pizza place gives you a receipt with a promise: 
"Your pizza will be delivered soon."
1) The Order (Promise Creation): Just like you order a pizza, in JavaScript, you create a promise when you start 
an action that will complete in the future. For example, fetching data from a server.
2) Waiting (Pending State): When you first make the order, you have to wait for it to be delivered. Similarly,
 the promise is in a "pending" state until the action is complete.
3) Delivery (Promise Fulfillment): If the pizza is delivered successfully, the pizza place fulfills their promise. 
In JavaScript, if the action completes successfully, the promise is "resolved," and you get the result you wanted.
Problem (Promise Rejection): If there's a problem and the pizza can't be delivered, the pizza place will let you know, 
and they reject their promise. In JavaScript, if something goes wrong, the promise is "rejected."
Getting Your Pizza (Using the Promise): Once */

// ---------------Creating my own Promisified version of setTimeout, readFile, writeFile and cleanFile----------

function promisifiedSetTimeout(ms){
    // function checkingFunction(resolve){ //resolve is a callback function
    //     setTimeout(resolve,5000); //when the resolve will be called the promise will return something and callback will be called
    // }
    // return new Promise(checkingFunction); //checkingFunction is basically fn which takes another fn(resolve in this case) as argument(this is actually the callback fn passed when the .then(cb) method is used) and does all the async tasks and at the end it calls the resolve(callback)

    return new Promise(resolve => setTimeout(resolve,ms)); //more condensed version of what's done in the above comments
}

const fileObj=require("fs");

function promisifiedReadFile(fileName){
    return new Promise( (resolve) => fileObj.readFile(fileName,"utf-8",(err,data)=>{
        if(err){
            console.log("Error Occured while reading file. ERROR STATUS: "+err)
            resolve();
        };
        resolve(data);
    }))
}

function promisifiedWriteFile(fileName,data){
    return new Promise( resolve => {fileObj.writeFile(fileName,data,(err) => {
        if(err){
            console.log("There was a problem writing to the file. ERROR STaTUS: "+err);
            resolve();
        }
        console.log("File has been written succesfully");
        resolve();
    })});
}


function promisifiedCleanFile(fileName){

    function cleaner(resolve){
        fileObj.readFile(fileName,"utf-8",(err,data)=>{ //its just a function header with no name
            if(err){
                console.log("Error Occured while reading file. ERROR STATUS: "+err)
                resolve();
            }
            fileContent=data.trim();
            fileObj.writeFile(fileName,fileContent,(err)=>{
                if(err){
                    console.log("There was a problem writing to the file. ERROR STaTUS: "+err);
                    resolve();
                }
                console.log("File has been CLEANED SuccesfullY!!! enjoy...");
                resolve(fileContent);
            });
        });
    }
    return new Promise(cleaner);    
}

function stopped(atTime){
    console.log(`Timer Stopped at ${atTime}`);
}
function fileReadingStatus(data){
    console.log("This fn ran after file has been READ. Data of File: "+data)
}
function fileWritingStatus(){
    console.log("This fn ran after file has been WRITTEN")
}
function fileCleaningStatus(data){
    console.log("This fn ran after file has been CLEANED. Data of File: "+data)
}

promisifiedSetTimeout(5000).then(()=>stopped(5000)) //workaround to pass arguments to callback fn, then(stopped.bind(arg1,arg2)) can also be done easily

promisifiedWriteFile("sampleFile.txt","                   Write this content to the file      ").then(fileWritingStatus);

promisifiedReadFile("sampleFile.txt").then(fileReadingStatus); //fileStatus works after hello.txt gets read succesfully

promisifiedCleanFile("sampleFile.txt").then(fileCleaningStatus);


// --------------------writing own promise class---------------------------

class Promised{
    constructor(asyncfn){
        function complete(){
            this.resolve();
        }
        asyncfn(complete);
    }
    then(callback){
        this.resolve=callback;
    }
}