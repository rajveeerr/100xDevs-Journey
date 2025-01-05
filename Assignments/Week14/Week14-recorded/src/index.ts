interface Employee{
    name: string,
    age: number
}

function Sum(employee1:Employee,employee2:Employee):number{
    return employee1.age+employee2.age
}
console.log(Sum({name: "rjvr",age:19},{name:"smth",age:18}));


// pick:- lets say we have a user type where we are storing the data retrived from the db, and we want to create
// an ep that only updates some of the fields like name and email from the user type, for that we can either create another
// type with name and email, but this will be redundant for same thing and also we will have to update the type at two 
// different places for update in any field for the user, so we can use pick to select some types of an already existing 
// type, basically pick allows us to create a type by selecting some properties from an existing type

interface User{
    name: string,
    email: string,
    age: number,
    readonly password: string, //can give readonly identifier here itself 
    profilePic: string
}
// type updateProps={
//     name: string,
//     age: number,
//     password: string,
// } //redundancy, will have to update this too if user schema updates

type updateProps=Pick<User, 'name'|'age'|'password'>//since this is not a fn and it does not have a runtime, generics is used here to do sort of function calls
// now updatedUser will simply select specified properties from User

function updateUser(userData:updateProps):updateProps{//rule of thumb: any fn should not have more than 5-6 args
    return {name:"updatedName",age:userData.age,password:userData.password}
}

// Partial, lets us create a type from existing type, by making its all properties as optional for particular usecases
// we can make particualr keys as partial too by either adding a ? or partial keyword

type updatePropsOptional=Partial<updateProps>// every field is derived from updateUser is now set to optional

function updateUserDetails(userData:updatePropsOptional){
    return userData
}

updateUserDetails({
    name:"das"
})//not complaine if only one field is passed

// Readonly, creates sequesnces that are truely constant, like in js/java any array set as constant can be updated from
// inside like the elements at any position can be modified defying the whole purpose of creating const var, we cant
// modify the sequence by increasing its length or reassigning its value

const client:User={
    name: "imUser",
    email: "xyz@...",
    age: 19,
    password: "s3cur3Pa55",
    profilePic:"./logo1.png"
}

client.name="Jane Doe"//we can update the name of this client var set to const, to avoid doing this in js we were using 
// const constArr=Object.freeze([1,2,3])//now this is a really constsnt sequence, cannot be updated
// in ts tho we can create a readonly type, which cannot be updated, readonly can be used to just make one field constant 

type Admin=Readonly<User>//now admin has same type properties as user but they cannot be changed

// const rootUser:Admin={
const rootUser:Readonly<User>={//another way of writing the same thingy
    name: "rjvr",
    email: "xyz@...",
    age: 19,
    password: "s3cur3Pa55",
    profilePic:"./logo1.png"
}
// rootUser.name="smth" // results in error
// this props can be used to create those types which we want to never update like api key configuration, this is a compiletime
// checking not runtime checking, unlike const

type Student={
    id: string,
    name:string,
    age:number
} 

type Students={
    [key:string]: Student;
}//type for key as string annd value as of non-promitive/custom datatype 

let user:Students={
    'id1': {
        id: "sm1",
        name: "yada yada",
        age: 18,
    },
    'id2': {
        id: "sm2",
        name: "bla bla",
        age: 24,
    }
}
console.log(user['id1'].name);//to acces an student


type Pet={
    [key:string]: string
}//this is basically a way to describe an abject having key and value both as string

let Dog:Pet={
    "sound": "bark"
}

type Car=Record<string,string>//this is the same way of doing as above, creates a type of obj having key and value as string 

//record is a ts thingy

// map, a js concept to do the same thing

let players=new Map<string,Student>() // or players={} and players["id12"]={id:"se1",name:"smth",age:20} //can even specify the type of key value pair here 
players.set("id12",{id:"se1",name:"smth",age:20}) 
players.set("id13",{id:"se2",name:"dayum",age:20}) 

const player=players.get("id1")
//just another syntax of cresating key value pair  


// Exclude - as name suggests, used to exclude some properties from an existing type

type EventType= "scroll"|"keyup"|"keydown"

type AllowedEvent=Exclude<EventType,"keyup">//now this type will contain only scroll and keydown

function onEvent(eventOccured:AllowedEvent){
    return eventOccured+" do something"
}
// onEvent("keyup")//not- fine


//type inferencing
// npm install express types/express
const express=require("express")
const app=express()

import z from "zod"

let resType=z.object({
    name: z.string().min(1,{message: "Name cannot be less than 1 character"}),
    email: z.string().email({message: "Email is Invalid"}),// all these properties are required by default
    age: z.number().min(18,{message: "Should be an Adult"}).optional()
})//this is runtime variable, present in js

type UserType=z.infer<typeof resType>//this is a compile time variable only present in ts

app.use(express.json())

app.put("/",(req:any,res:any)=>{
    let reqBody=resType.safeParse(req.body) //{succes,data} - data here already contains all the right types
    let updateUser:UserType=req.body; // the problem? well this doesnt have same type as zod schema defined body is 
    // supposed to have it, solution? zod inferencing
    // let updatedUser:{//dont need to do this now
    //     name: string,
    //     email: string,
    //     age?: number
    // }=req.body // this defined type is same as zod schema
    if(!reqBody||!reqBody.success){
        res.status(400).json({
            message: "Incomplete User Details!!"
        })
        return
    }

    res.json({
        message: "User details updated succesfully!!"
    })
})

app.listen(3000,()=>console.log("Server is running at port 3k"))

//type inferencing becomes super important when we will be creating mono repos, and using the same code on fe