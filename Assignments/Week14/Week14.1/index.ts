// In react hooks cant be used inside any loop or function, because they need to remain same-order for every re-render
// This means they should not be called conditionally or inside loops that might change the number of times they are called.

// types of languages:-

// 1. Based upon compiation
  // -compiled(cpp,go-lang,rust)
  // -interpreted(js)

// 2. Based upon type
  // -strongly typed(cpp,c,java)
  // -loosely typed(js,py)

// compilers checks for errors while compiling code, without running by doing some symentic and bla bla checks, and output
// will contain very less errors(only runtime errors)
// Runtime error: errors occured while running the code(infinite loop, calling fn again and again yada yada)
// Compile-time error: errors occured while compiling the code(incorrect type assignment-for strictly typed lang, 
// syntactic errors), won't be able to take wrong code in production as output will not be generated

// interpreted languages directly start running/executing, before even checking for compile time errors, this can go 
// horibly wrongin production where, like at a stage error is encountered and code throws an error

// typescript, provides types over js and gives type safty
// any js code is valid in ts, but any ts code may or may not be valid it can be voilating types

// ts code cant run directly, first it compiles back to js by tsc-compiler, and then that js runs problem with ts is 
// that it make running js files a lot harder, first it gets compiled down to js and then js runs

// tsc is a compiler that let's us compile ts->js, there are many compilers out there, eg: esbuild, swc

// we can install any package globally using, -g flag before package name, eg: npm i -g typescript

// npx -> np executable, npx basically allows us to execute npm packages directly from npm registory, withput installing them
// how it works:=> it first check for the package, if its installed or not, then if not found npx temporarly install the
// package and caches it, after done executing it then deletes the package

// to install tsc-> npx tsc --init  
// tsc -b to build all the tsc files or for particular file tsc index.ts | npx tsc -b if typescript isnt installed locally 

let x: number | string= 45;// if ill not give type number, a type inference will happen and type of number will be assigned to x 

x="daadsads"; //this could have resulted in an error, if string type had not been used
console.log(x);
// if compilation/build is not succesful, a index.js file will be spit out regardless(this setting can be changed in 
// tsconfig.json),but the compiler will show error

function greet(name: string){//here if no type is given explicitily, tsc will throw an error, if we want to have a var
// of type "any" we'll have to explicitely give that type
  console.log("Hello "+name);
}
greet("Rajveer")

function sum(fn1:()=>number,fn2: ()=>number):number{//here we can give the return type of a function, if not done ts compiler
// will infer the type based on the types of parameters provided, and so as the var storing the return type of fn
  return fn1()+fn2()
}
let a=sum(()=>3,()=>5)//here the type of a has already been inferred implicitely, b/c the sum() fn returns the value of 
// type int
console.log(a) 

function debounce(fn:(name:string)=>void){ ()=> //this basically tells about the signature of function, which can be taken as input
  setTimeout(()=>fn("delayed"),1000)
}
debounce(greet);

function multipleArgs(fn1:(()=>void)|((a:string)=>void)|((a:string,b:string)=>void)|((a:number)=>number)){
  return "cool"
}

// basically on higher level, we are giving a lot of information to compiler, and tells it ki how a fn,a var should look like
// if it doesn't matches, throw up

// tsconfig.json:

// 1. target: basically this allows us to tell compiler to compile code i a particular ECMAscript standard, ecmascript
// standard is just the set of rules, governed by an international organization, that makes js consistant, releases new
// features, and asks browsers to add support for the new standards, like the arrow fn, const/let,  was introduced recently
// in js in ecma20 now this standard was followed by all browsers/js engines(v8, spider-monkey) and they added interpretation 
// support for arrow fns now some users might be using browser all the way from 2016, these older versions might not support
// the latest ecmascript standards, as they are backward compatable ES2016 will be perfectly fine with current browsers,
// arrow function will break in brower having js16, to fix this give target, basically the ecma script that the code should
// be compiled back to

// 2. rootDir: bacically tells where compiler those ts files are
// 3. outDir: bacically tells where to put the compiled js files, currently it spitting the js files in same dir as input files
// 4. outDir: bacically tells where to put the compiled js files, currently it spitting the js files in same dir as input files
// 5. removeComments: removes all the comments
// 6. noImplicitAny: compiler will start complaining if explicit types arent given, see the first example where i was creating
//    a greet function

// how can i convert my js code to ts? well i can set noImplicitAny=false and start adding types

// how to give types for complex objects?
function data(source:{
    id: string;
    title: string;
    match: {
        key1: string;
        key2: number;
    },
    age: number
}){
  console.log(source.id,source.title);
  // console.log(source.id,source.name);//this will return in an error as the parameter type doesn't contain name
}

let post={id:"1221",title:"Title",match:{key1:"ASasd",key2:34},age:12}//post inferred data-type from the object assigned to it
data(post)

// now the type of post and data parameter is same, it's type is being repeated, to fix this we can define a custom 
// type or interface which can be used everywhere we want to have that type

interface customInterface{
  id:string,
  title: string,
  match: {
    key1:string,
    key2:number
  },
  age: number
}
//interfaces can be think as a custom type

let user:customInterface={
  id:"1",
  title:"Idk",
  match: {
    key1:"smth",
    key2: 34
  },
  age: 12
}

data(user)

interface userType{
  firstName:string,
  age: number,
  email: string
}

function isLegal(user:userType){
  return user.age>=18
}

let user1:userType={
  firstName: "Rajveer",
  age: 18,
  email: "xyz@gmail.com"
}

console.log("User is legal?: "+isLegal(user1))

// defining interface for react component
interface taskInterface{
  title: string,
  completed: boolean,
  due: Date
}

interface props{
  task: taskInterface,
  lastUpdate: number
}

function Todo(props:props){
  return props.task.title + props.lastUpdate
}

// how to use this component in react <Todo task={title: "asd",completed:"false",due: "date"} lastUpdate={34}/>

// types are same as interfaces but they let's us aggregate data too, do union and intersection

type numberOrString=number|string //this type is union of type number and string, interface has no equals

let xyz:numberOrString=3
xyz="something"

function func1(a:numberOrString,b:numberOrString):void{
  // return a+b //ts cant directly sum (string|number)+(string|number )
}

interface Manager{
  name: string,
  age: number,
}

interface Employee{
  name:string,
  department: string
}

type teamLead=Manager&Employee // intersection of both types
// the teamLead will look like this now
/*{
  name: string,
  age: number,
  department: string
}*/
let leader:teamLead={
  name: "xyz",
  age: 24,
  department: "smth"
}

// bun does this thing of first compiling ts -> js and then running js in one go, wiz different from what node does, but 
// thers tsnode that does the same thing

// is ts partial polymorphism exists like diff implementation of function for different input params

function delayedFn(func:()=>void|string):void{
  setTimeout(()=>{
    let result=func()
    if(typeof(result)==="string"){
      return result//this should have resulted in an error-> no why would this return in error, its the return of settimeout fn , not the delayed function
    }
  },1000)
}//basically this will return string or void depending upon the function passed

delayedFn(()=>"asdsa")
delayedFn(()=>console.log("void"))

// why ts doesn't have true true method overloading, because ts do runs directly its first compiled to js, we can to have
// many type limits-restrictions in ts code but these will be of no value when the code will be compiled to js, as ts type 
// system will be erased after after being converted to js
