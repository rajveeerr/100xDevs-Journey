// Primitives in ts
// - string number, null, undefined, boolean

function canVote(age:number):boolean{
    return age>18
}

//  usually interfaces are wirtten with capital innitials

interface User{// here in interfaces i can put real values too instead of types, but that will mean ki whatever var is using this type has to have that value inside
    name: string,
    // name: "rajveer"|"whatever",//this means user can have only these twwo names
    age: number,
    address?: {//? measns this field is optional, a var of this type can or cannot have address, but if adding address toh every field is required that doesn;t have ?
        street: number,
        city: string,
        country: string
    }
    // address?: Address //interfaces can user other interfaces
    // address: undefined|{// now adderess can be either undefined or the object, but it will not make it optional
    //     street: number,
    //     city: string,
    //     country: string
    // }
    // addresses: {// now adderess can be either undefined or the object, but it will not make it optional
    //     street: number,
    //     city: string,
    //     country: string
    // }[] //an array of addresses can be even given as user interface
}
// interfaces can user anouther interfaces
// need to follow DRY, whenever using any fiece of code at multiple places i need to put it somewhere in a central place

interface Address{
    street: number,
    city: string,
    country: string
}

let user1:User={// giving user type isnt necessary as it can be inferred by compiler but, restricting its type will make sure that the variable value follows the type
    name: "Rjvr",
    age: 19,
    address: {
        street: 12,
        city: "Delhi",
        country: "India"
    }   
}
let user2:User={
    name: "Ryn",
    age: 19
}

interface Employee{
    name: string,
    age: number,
    // greet?: (phrase:string)=>string
    greet2(phrase:string): string//another way of writing functions
}

let manager:Employee={
    name: "xyz",
    age: 20,
    greet2: (phrase)=>phrase+manager.name
}
let manager2:Employee={
    name: "abc",
    age: 20,
    greet2: (phrase)=>phrase+manager2.name//this is the problem, with inerfaces we can use this as these are just normal
    // variables, to make it work without using this keyword w'll have to use the variable just created and use its props
}

console.log(manager.greet2("Hi "));

// objects are instances of a class they have acess to 'this'(and cre created by constructors) from the classes, have same properties as classes and completely different from normal-object(key-value pairs)

let keyValuePairs={
    name: "dc",
    salary: 121
}
// class Users(){
//      constructors(){}
//      method(){}
// }
// let objects=new Users()

// Q. the difference between a type and interface is that, interfaces can be implemented as classes like in java and these
// implementations can contain, more methods and member than the interface, but they need to have everything from an 
// interface

class Manager implements Employee{
    // defining public member variables here, these can be acessed by using object.name or object.age on an object
    name: string;
    age: number;
    phoneNO:number;//this implementation of interface can have more member variables than Interface
    
    constructor(employeeName:string,employeeAge:number){//constructor constructs the object
        this.name=employeeName
        this.age=employeeAge
        this.phoneNO=21323123
    }
    greet2(phrase: string): string {
        return phrase + this.name
    }
}
// the benifit of implementing an interface using class is that we can create object of that class and use that class to 
// call methods for a particular object using 'this' keyword, also we can inherit the class for particular usecase

let Hr=new Manager("Bla Bla",20)
console.log(Hr.greet2("Hi "));

class Shape{
    width:number;
    height:number;
    constructor(){
        this.width=0 //in js only doing this was enough to declare and initialize a member variable, the extra step of first declaring and then initializing the member variable in constructor is just a typescript thing
        this.height=0
    }
    // first defining and then initializing the state variable is quote redundant, to reduce this we can simply define the
    // member variables in constructor parameter, with public keyword, and can initialize it once no repeating codes,
    // this is called public parameters. eg:
    // constructor(public width:number,public height:number){}//no need to initialize here too
    area(width:number,height:number){
        return this.width*this.height
    }
}

class Rectangle extends Shape{
    constructor(){
        super()//super is called inside constructor whenever a class extends another, to initialize the constructor of parent function, before initializing the constructors of extended fn
    }
    wtohRatio(){
        return this.width/this.height //since this extends(inherits) the Shape class, this class has acess to all the member vars and methods, from parent function
    }
}

let square=new Rectangle()
console.log(square.area(12,12))//see this member function is coming from Shape class

abstract class People{
    name:string;
    age:number;
    constructor(name:string,age:number){
        this.name=name
        this.age=age
    }
    abstract greet():string //the difference b/w greet: ()=>string and greet():string is that the 1st one is telling that the greet property has a fn whereas later one is telling the greet itself is a fn
    hello():void{
        console.log("Hello there!!")
    }
}
// abstract class abstract everything and just tell how to implement it, doesnt have the actual implementations
// abstract class is very similar to interfaces, we can implement abstract classes same as interfaces, by extending it
// the only difference being that we can also add defult implementation in abstract class, we cant have default implemention
// in interfaces, as interfaces arent even present in the js file they are ts concept 

class Student extends People{
    name:string;
    age:number;
    constructor(name:string,age:number){
        super(name,age)
        this.name=name
        this.age=age
    }
    greet():string{
        return "Hi "+this.name
    }
}
// see the implementation of abstract class is same as that of an interface only difference is ki we actually add ]
// implementations in abstract class too, unlike interfaces


// types are very similar to interfaces but the syntex is diff and they lets us aggeregate data 

// intersection

type Users={
    name: string;
    age: number
}
type Admin ={
    name:string;
    age: number;
    country: string;
}

type UsersAdmin= Users&Admin //now this type will have to have all the field of the above two types

let Usain:User={
    name:"Usain Bolt",
    age: 34
}

let Nick:Admin={
    name: "Nick Symmonds",
    age: 40,
    country: "USA"
}

let Neeraj:UsersAdmin={
    name: "Neeraj",
    age: 28,
    country: "India"
}

// now union of two types
type UserorAdmin= Users|Admin //this can either have types of a or b or a+ some of b be or a and b both, basically mininimum it will have is atleast all the types of a or b


function sayHi(person:UserorAdmin):void{
    console.log("Hi "+person.name)
    // UserorAdmin will type will havw only acess to fields that are common, we cant acces country here
}

sayHi(Nick)


// arrays in ts are quite simple, we just have to add [] after the type of array we want
let a:number[]=[1,2,3,4]

//given an array of nums create a fn to find the max element

function maxNum(arr:number[]):number{
    let maxNum=-99999999999;
    for(let i=0;i<arr.length;i++){
        if(arr[i]>maxNum){
            maxNum=arr[i]
        }
    }
    return maxNum
}

console.log(maxNum([12,32,14,43,23,12,44,0]));



// two imp ques:
// 1. what are the differences b/w types and interfaces
// 2. if interfaces can be implemented as classes what is the need of abstract classes?


interface Citizen{
    firstName: string,
    lastName: string,
    age: number
}

function inLegal(citizens:Citizen[]):Citizen[]{
    return citizens.filter(citizen=>citizen.age>=18)
}
let citizens:Citizen[]=[{firstName: "sd",lastName: "asd", age: 23},{firstName: "asd",lastName: "asd", age: 2},{firstName: "sasdd",lastName: "asadsd", age: 18}]
console.log(inLegal(citizens));

/* Union (I): Accepts any one of the types listed.
Intersection (&): Requires all types combined. */

// the name intersection(&) feels quite opposite to what it does like intersection of two types gives a type with all the 
// values of two types(wiz union), but actually it does what it says, ts has open types that means a type can have infinite
// set of all the values, passed that must contan the types spencified and any random thing on top of it, same can be
// said for the second set of types, now there will be one such value in both the set that will have the exact fields from 
// a and b and that is what taken as intersection, but my question: is tharah to there can be multiple values, that will
// intersect like a set that contains value from both the types and some random values that are intersecting then why arent they in intersection

//in js name var is depretiated b/c it is a legacy name for browsers, window.name, and there were a lot of clashes b/w other methods and members name