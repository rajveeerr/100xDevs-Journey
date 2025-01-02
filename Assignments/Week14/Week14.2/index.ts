// Primitives in ts
// - string number, null, undefined, boolean

function canVote(age:number):boolean{
    return age>18
}

//  usually interfaces are written with capital initials

interface User{// here in interfaces i can put real values too instead of types, but that will mean ki whatever var is using this type has to have that value inside
    name: string,
    // name: "rajveer"|"whatever",//this means user can have only these two names
    age: number,
    address?: {// ?-means this field is optional, a var of this type can or cannot have address, but if adding address toh every field is required that doesn;t have ?
        street: number,
        city: string,
        country: string
    }
    // address?: Address //interfaces can user other interfaces too
    // address: undefined|{// now adderess can be either undefined or the object, but it will not make it optional
    //     street: number,
    //     city: string,
    //     country: string
    // }
    // addresses: {
    //     street: number,
    //     city: string,
    //     country: string
    // }[] //an array of addresses can be even given as user interface
}
// need to follow DRY, whenever using any piece of code at multiple places i need to put it somewhere in a central place

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
    // greet: (phrase:string)=>string //this says greet key has to have a fn that takes and returns string, the property holds a fn
    greet2(phrase:string): string,//another way of writing functions, this says that the greet is a method tied to object, toh in the implementation there will be two keys and a method(without any key) in the type, treated as method tied to an object
}

let manager:Employee={
    name: "xyz",
    age: 20,
    greet2(phrase:string):string {return phrase+manager.name}
    // greet2(phrase:string):string {return phrase+this.name}// this keyword works here because this method is tied to the object and now has acess to all the member variables as the function itself became member of the object also normal objects can have this keyword, for arrow fn they dont have 'this' they inherit 'this' from parent scope, thats why we dont use them in the eventlisteners
}
let manager2:Employee={
    name: "abc",
    age: 20,
    greet2: (phrase)=>phrase+manager2.name//this is the problem, with interfaces we can use 'this' as these are just normal
    // variables, to make it work without using 'this' keyword we'll have to use the variable just created and use its props - solved this
    // greet2: function(phrase){return phrase+this.name}
}

console.log(manager.greet2("Hi from Manager "));

// objects(oops) are instances of a class they have acess to 'this'(and are created by constructors) of the classes, 
// they have same properties as classes and completely different from normal-object(key-value pairs)

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
    // defining public member variables here, these can be acessed using object.name or object.age
    name: string;
    age: number;
    phoneNO:number;//this implementation of interface can have more member variables than those were present in Interfaces
    
    constructor(employeeName:string,employeeAge:number){//constructor constructs the object
        this.name=employeeName
        this.age=employeeAge
        this.phoneNO=21323123
    }
    greet2(phrase: string): string {
        return phrase + this.name
    }
}
// the benifit of implementing an interface using class is that we can create object of that class and use that object to 
// call methods for that particular object, also we can inherit the class for particular usecase

let Hr=new Manager("Bla Bla",20)
console.log(Hr.greet2("Hi "));

class Shape{
    width:number;
    height:number;
    constructor(){
        this.width=0 
        this.height=0
        // in js only doing this was enough to declare and initialize a member variable, the extra step of first 
        // declaring and then initializing the member variable in constructor is just a typescript thing
    }
    // first defining and then initializing the state variable is quite redundant, to reduce this we can simply define the
    // member variables in constructor parameter, with public keyword, and can initialize it once, this is 
    // called public parameters. eg:
    // constructor(public width:number,public height:number){}
    area(width:number,height:number){
        return this.width*this.height
    }
}

class Rectangle extends Shape{
    constructor(){
        super()//super() is called inside constructor whenever a class extends another, to initialize the constructor of 
        // parent class, before initializing the constructors extended class
    }
    wtohRatio(){
        return this.width/this.height // since this class extends(inherits) the Shape class, it has acess to all the member 
        // vars and methods, from parent class
    }
}

let square=new Rectangle()
console.log(square.area(12,12))//see this member function is coming from Shape class

// Q: if abstract class does the same thing why to implement interfaces using classes

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
// in interfaces, as interfaces arent even present in the js file they are ts concept so as asbtract classes(/but they get converted to normal classes)

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
let Student1=new Student("Aneesh",20)
Student1.hello()//this is coming from default implementation from abstract class

// see the implementation of abstract class is same as that of an interface only difference is ki we actually added
// implementations in abstract class too, unlike interfaces

// types are very similar to interfaces but the syntax is diff and they lets us aggeregate data 

// intersection

type Users={
    name: string;
    age: number
}
type Admin ={
    name:string;
    age: number;
    country: string;
    company: string;
}

let proof={
    name: "dsa",
    age: 34,
    weight: 54
}
let Athlete:User=proof//some way to get around of the typechecks, i added one more field that what wwas permitted in User

let Usain:User={
    name:"Usain Bolt",
    age: 34,
}

let Nick:Admin={
    name: "Nick Symmonds",
    age: 40,
    country: "USA",
    company: "xyz"
}

type UsersAdmin= Users&Admin //now this type will have to have all the field of the above two types, for non-primitive datatypes

let Neeraj:UsersAdmin={
    name: "Neeraj",
    age: 28,
    country: "India",
    company: "xyz"
}// since UsersAdmin is an intersection we cant have more types in it than from the types its taken from

type UserorAdmin= Users|Admin // this can either have types of User or Admin or Aser + some of Admin , basically 
// mininimum it will have is atleast one of the types - only applies to non-primitive datatypes b/c in those some fields 
// can overlap 

let Rvr:UserorAdmin={
    name: "asd",
    country: "ads",
    age:34
}
//atleast have to have one type, can have more than one type too

function sayHi(person:UserorAdmin): UserorAdmin{
    // here since the ts compiler doesnt knows ki what type of value is being passed
    // is it of User or Admin type it only takes common values from both types, for this case name and age

    // console.log(0.5===0.5?`${person.name+person.age+person.country}`:`${person.name+person.age}`)//this will result 
    // in an error as country isnt common and tsc doesnt knows what type of value is being passed in here

    if ("country" in person){//this clearly tells compiler if type Admin is passed at runtime, called type guard
        // in operator checks if the specified property exist in the object(and prototype chain), another way of doing
        // this would be typeof="string"
        return {name: person.name, age: person.age,country: person.country,company: person.company}
    }
    else{
        return {name: person.name, age: person.age}
    }
}
//we can also define custom type guard fn
function isAdmin(person: UserorAdmin): person is Admin{
    // 'is' keyword is part of type predicate - A type predicate is a return type of a function in the form: paramName is Type
    // It tells TypeScript that the function checks and confirms whether
    // the parameter (paramName) is of the specified type (Type). If the function returns true, TypeScript narrows the type
    // of the parameter to Type within the code block where the function is used.

    return (person as Admin).country!==undefined// as is type assertion, tells compiler to take type as passed
} 
// usage
// isAdmin(person){//do smth}

sayHi(Nick)
// type Impossible=number&string //no type can have both number and string together

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

/* Union (|): Accepts any one of the types listed.
Intersection (&): Requires all types combined. */

// Intersection creates a type that satifies of all two types simultaneously, as in real life too intersection is known as
// the set of values that satisfies bot sets, in ts union and intersection apply to the types rather than individual
// properties

// the name intersection(&) feels quite opposite to what it does like intersection of two types gives a type with all the 
// values of two types(wiz union), but actually it does what it says, ts types can be thought of as set of values ts has
// open types that means a type can have infinite set of all the values that must contan the types
// specified and any random thing on top of it, same can be said for the second set of types, now there 
// will be one such value in both the set that will have the exact fields from 
// a and b and that is what taken as intersection, but my question: is tharah to there can be multiple values, that will
// intersect like a set that contains value from both the types and some random values that are intersecting then why arent 
// they in intersection, because we are taking atleast minimum intersecting points, 

// whereas union is, that the set of values that is present have to be atleast one of the 1st/2nd type and can have more 
// values

// in js name var is depretiated b/c it is a legacy name for browsers, window.name, and there were a lot of clashes b/w 
// other methods and members name


// one interface can extend another interface

interface City extends People, Employee{
    // all existing properties of people, this is also eq to taking intersection(&)
    lat: number
}