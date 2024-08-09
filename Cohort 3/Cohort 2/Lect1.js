console.log("Namaskar Duniya!!");

//-------------Variables and how to declare them---------

let a=1; //ideal way to create var, because var will create variab;le with no block scope
a="world"; //changing varliable val
const b="hello";
let flag=true;
flag=(a=="hello"); //flag will store 1 true or false0
// b=2 //will throw an error as constant cannot be changed
console.log(a);
console.log("The variable b says "+b+" and the variable c says " +flag);

//-------------Operators------------------------

let sum = 10 + 5; // Arithmetic operator
let isEqual = (10==10); // Comparison operator(loose equality comparison), typecast before comparing)
isEqual = (10===10); // Comparison operator(strict equality comparison), doesn't typecast before comp, if types are diff, false will be returned.
let isTrue = (true && false); // Logical operator

//-------------If, Else if and Else--------------

// if(b=="hello"){
//     console.log("b says "+b+" not "+a)
// }
// else{
//     console.log("say somthn")
// }

// --------------LOOP in JS----------------------

// for(let i=0;i<7;i++){
//     console.log(i)
// }

console.log(typeof null); //returns the type i.i. object

//--------------------Array in JS-------------------

const arr=[1,4,3,667,43]
console.log(arr); //prints whole arr in to the console
console.log(arr[3])
i=arr.length; //returns length of the function

//------------------OBJECTS(or Dictionary)-----------

const obj1={
    nme: "RJS", 
    language: "JS"
}
console.log(obj1["language"]);
console.log(obj1.language);//same as above line
const arrobj=[{nme: "RJS", language: "JS"},{nme: "ARY", language: "CPP"}]
console.log(arrobj[1]["language"]);

// ----------------------Functions in JS----------------------

function sum(a,b){
    return a+b;
}
console.log(sum(3,7));

//----------Callback: a function passed as the parameter of another function, or function calling another fn-------

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
// setTimeout(fn,3000) this fn takes another function as input

// ------------------------------------------------------------------------------------------------------------------

/* What I've Learned??

-Why JS?
Web browser understands only Html,CSS,JS and web assembly, so technically rust and cpp compiled using wasm can be run
on browser instead of js, but mostly almost 99% of the web uses JS. C++ can be used to perform some extensive tasks, 
like adding blur to the zoom video 

-Function of Cores:
there are many different cores in a CPU responsible for performing multiple processes parallaly. One core can only
perform single process, if there are multiple processes to be executed by single core they go through context switching i.e
breaking up the processes and performing what's required at the moment. 

-Single threaded nature of JS:
JS is a single threaded language, that means it is restricted to only work on a single core and it is synchronous 
that means its executed line by line, if one line is taking longer time to processthe other lines will be waiting 
the for it to be executed.

-Strict and Dynamically Typed languages
C,C++ are strictly typed languages as variable of one datatype cannot be used to store variables of different datatype
JS, Python are dynamically typed language, wiz a problem for big production enviornment as it gives too many runtime 
errors and it becomes harder to debug, as a result TS was created which comes with different types and is then 
compiled down to js.

- Compiled vs Interpreted lang
C'mon I already know this, an interpreted language is converted to binary line by line so let's say if there is an error
at line 5 all code upto line 4 will be executed

-Variables in JS
var, const, let are three different types of variable. let is preffered instead of var because var dont have scopes

-Problems with JS
Dynamically typed lang(can result in runtime errors), to overcome this typescript was introduced and TS has types and 
it is compiled to js.
Slow for high traffic sites as every line must me compiled angain and again, not like C++ languages

Garbage Collector in JS for memory management(alot new memory, free uneused memory) which is sometimes 
comparatively slow as compared to manual management in cpp. It works by storing used variables in a tree and checking if a node
is in use or not time to time and basically collects garbage

Harder to scale as it is single threaded
*/
