function Sum(a,b){
    return a+b;
    //return parseInt(a)+parseInt(b); //this will convert string to int, parsefloat will convert to float
}
console.log(Sum(2,3));
console.log(Sum("hello",3)); //3 gets concatenated at te end of the string, to avoid this pasing is done

//learned how to take input from user in js, either it can be done in terminal and can be catched using 
// process.env.varName and running file as varName=10 node filename.js or pass it as nodejs filename.js

//Synchronous Code: code in which a singe thread is running every line of code, one line at a time(single execution contest)

// file handling
const fileobj=require("fs");  //this is equivalent to writing #include<stdio.h> in c, this module imports the external library, variable type needs not to be const
const contents=fileobj.readFileSync("sampleFile.txt","utf-8"); //utf8 is the encoding in which one want to raad the file, it can either be binary, hex etc. This function is the key of object fileObj  
console.log(contents);

const dataB=fileobj.readFileSync("b.txt","utf-8");
console.log(dataB);

// Functional Arguments: passing a fn as an argument to another fn
function calc(a,b,fntocall){
    return fntocall(a,b);
}
function sum(a,b){
    return a+b;
}
function sub(a,b){//no of parameters must be same
    return a-b;
}
console.log(calc(3,7,sub));

//callback means calling fn back whenever the taxk is compleated, even tho fn was passed in starting, its 
// meaningful to call it callback when it the function is called after some time or after the task is compleated
function display(err,data){  //fn signature is defined by devs of the module, typeof error is object
    console.log(data);
    console.log("Error is: "+err) //typeof error is object
}

fileobj.readFile("sampleFile.txt","utf-8",display); //we have to pass name of the function, not what the fn is returning so, no paranthesis, display is basically a fn signature
fileobj.readFile("b.txt","utf-8",display); //asynchronous fn
console.log("Done!!!!!!")


// Synchronous setTimeout fn:
function syncSetTime(time){
    // setTimeout(function(){console.log("Done")}, time);
    const start=Date.now();
    while(1){
        end=Date.now();
        if((end-start)>time){
            break;
        }
    }
    return true;
}
let count=0;
console.log("Starting Sync setTime Fn");
while(coun<=10){
    // setTimeout(function(){console.log(count+" seconds")},1000);
    syncSetTime(1000);
    console.log(count+" seconds");
    count++;
}
// Some JaRgons

/* I/O (Input/Output) heavy operations refer to tasks in a computer program that involve a lot of data transfer between
 the program and external systems or devices. These operations usually require waiting for data to be read from or 
 written to sources like disks, networks, databases, or other external devices, which can be time-consuming compared 
 to in-memory computations. 
 
 - CPU Bound tasks: the tasks which are performed by cpus and are limited by the speed and performance of cpu
 
 - I/O bound tasks are those tasks which are totally depended on system input/ooutput capabilities, like 
 networki/o diski/o. These tasks mostly waits for the i/o to complete

 Sidenote: almost all async fn have callbacks or are promisified 
 
Someone's Ques: How can improve the perormance of my code to prevent blocking the main thread while handing
 expensive cpu bound tasks without delaying other asynchronous operations?
 
 (kirat's answer)-Basically you can't using js as js is single threaded language, you can either use 
 worker thread or launch multiple node js using cluster module for performing multiple processes parallely  

 JS Articeture:-
 cALL stack:
 A data structure which keeps tack of function calls in a program and operates in lifo manner. When a fn is called it 
 gets pushed to stack if it is compleated it gets popped out of the stack
 
 Web Apis:
 These apis(provided by browser) provide things which are not part of js.
 // settimeout, settimeinterval,fetch, database calls are provided and are(io intensive tasks) handeled by web apis and 
 are async fn, any fn build completely on to of by me will be async as well 
 // these web apis (io tasks) when completed are pushed to callback queue from there the wait till the callstack is empty,
  these processes only run after thread gets empty
 
Event Loops:
 //event loop constantly checks if call stack is empty or not, if it is it pushes the first  processes from callback queue to call stack
 
 To-Do:-

 => Read about arrow fn
 =>Assignment: read about promises 
 
 */

