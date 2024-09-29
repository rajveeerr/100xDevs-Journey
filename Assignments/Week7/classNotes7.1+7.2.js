// I can use any stack for backend, express - nodejs, springboot- java etc etc the only thing that will remain static is database
// there are multiple types of databases, sql no-sql. When for large scale projects we use multiple backend servers to handle the large
// trafic, these backend servers are transient, means if one server goes down others will handle the load, the data is
// not persisted, means we can start and stop them, no data will be lost as we use databases to persist data, these backends
// are stateless, means no data is stored in the database, which will be a bad idea. The best practice will be to stop auto scaling
// of the database and replicate it enough number of times so that the data remains safe. If backend goes down its not a problem
// one can fix it wery quickly

// Database are organised collection of data that are structured to enable efficient storage, retrival nd management
// of informatiion

// Whenever we create a full stack app we do persist the data in database
// data can be anything userinfo, todos data etc.

// MongoDb is a no sql database(diverge from traditional relational modal), suitable for various data models and workloads
// that may not fit into tabular schema of sql database

// Sql database gets difficult for wierd data model(like nested structure, folder-under folder-under-folder)

// We use mongo for its schema flexibility, schema is basically data model/the structure of data/how will my database look like
// For my todos database the database schema will look like this, for users table:-
// users
// name-> string
// pasword-> string
// age-> number

// for todos the schema will look like this
// task name->string
// isDone-> boolean

// MongoDb is schemaless, me dont need to describe the schema, we can put any data inside, good because for nested folders
// we dont really know ki how many files will be in a folder, will it be a folder etc etc, so its hard to predict the structure 
// upfront

// Toh basically in mongo we can store data in mogodb that doesnt have a fixed structure

// Second advantage of mongo db is: scaling, mongo is horizontally scalable means with increase in traffic we can increase the dbs
// add multiple number of instances (databases), which is really hard to do for sql databases(will have to use master-slave arcticture/sharding for that

// A mongodb cluster is basically bunch of machines holding our data, so we can store multiple apps info in a single cluster, multiple
// databases

// A cluster can hold multiple databases, database is a place to dump all the data, ths data can be divided into multiple
// different collections and can be linked together with a unique id generated my mongo itself

// We are currently hosting our database on internet/cloud

// Compass is basically a gui interface that lets us visualise database quickly

// In mongo there is concept of document, so one user info is stored in one document, also the ids of a document is generated automatically
// by mongo, type of id is object this id can then be used to connect different collections
let userDocument={
    "_id": {"$oid":"vjhvjhvjhv"},
    "name": "smthn",
    "email": "dcs@dsc.ds"
};
// this is the example of a document in mongo db collection
let todoDocument={
    "_id": {"$oid":"vjhvjhvcsdjhv"},//id of todo
    "title": "sojaa",
    "isDone": "false",
    // "userId": ObjectId("vjhvjhvjhv")//(type of this will be object) , id of user, used to relate data
};


const express=require("express")
const app=express();
const jwt=require("jsonwebtoken");
const JWT_Secret="dscbsjdh382r32"
const {z}=require("zod");

let {userModel,todoModel}=require("./7.1db");
const mongoose = require("mongoose");
const { authenticate } = require("./7.1auth");

mongoose.connect("mongodb+srv://randomadmin:9mVRp2O5Y9AI6Erz@cluster0.if7ev.mongodb.net/Balanz")

const bcrypt=require("bcrypt");
// Storing passowrds in plain text is a big security vulneraibility, one with the database acess can see it, also if the db gets
// hacked users are screwed, thats why we should hash passwords(basically converting it into random fixed length string that cant
// be converted back to the original password) first and then store it.

// bcrypt uses cryptographic algorithms to hash and salt passwords

// Hashing is one way, also hashing is deterministic means same string will always be converted to same hash, now thats a problem
// as anyone can look them can can compare if two users have same passwords to tackle this problem we can add 
// salting(random strings) to the original password and then do the hashing.
// now the salt along with the hashed password is stored in the database, when the user sends the password while logging in, 
// the salt is retrived from the db and added to the password and then the password is hashed and then compared.
// all of this is done by bcrypt's compare fn, no need to do it manually.

//  If salting isn't used some common passwords can be easily guessed using rainbow tables(table containing all the common 
// passwords and their hashes).

// The hashed password itself contains the version of becrypt, the number of salting rounds and the salt(16 chars) and the hashed
// password in itself, no need to store the salt alag se

// Bcrypt.compare() will read the hashed pass stored in db and use the data about the version of bcrypt, salting rounds and salt
// stored in hashed pass to create the hash and compare

app.use(express.json())


let saltingRounds=10;//increasing this will increase the number of hashes module goes to secure data, no the larger
// the number the larger time it will take to hash and compare



app.post("/signup",async (req,res)=>{
    let validSchema=z.object({
        name: z.string().min(3).max(20,{message: "name is required"}),
        email: z.string().min(6).max(50).email(),
        password: z.string().min(8).max(30)//zod will only validate these fileds, if more kays are present they will not be parsed
    })

// task: figure out how to validate passwords to contain ablhabetiic chars, nums etc etc

    // let parseData=validSchema.parse(req.body)
    let safeParseData=validSchema.safeParse(req.body)//same as above but will not throw error when data doenst match schema, this function basically returns an object with multiple fields
    if(!safeParseData.success){
        res.status(403).json({
            message: "Incorrect Format",
            error: safeParseData.error
        })
        return
    }
    let name=req.body.name;
    let email=req.body.email;
    let password=req.body.password;
    let salt=await bcrypt.genSalt(saltingRounds).catch((err)=>{//this generates a random salt(string) to add to passowrd before hashing it, callbacks can also be used to call this
        console.log("There was an error while salting!! Err Status: "+err);
    });
    
    try{
        let hashedPassword= await bcrypt.hash(password,salt)//convertes the salted password to a random fixed-length string that can be converted back to the original one
        // method 2 to do the same as above
        // let hashedPassword=await bcrypt.hash(password,saltingRounds)//one line to salt and hashing

        await userModel.create({//this is an asynchronous function for obvious reasons, it has to put this data to a remote server, and it cant stop execution
            name: name,
            email: email,
            password: hashedPassword
        })//.catch(e){} whill do the same job as below
        
        // we can totally get away without using await, then we will just assume ki the data has been inserted succesfully, the the good
        // practice is to use await and check if the data has been inserted succesfully
    
        //have to check if the email is unique,no need-already written a schema for that have to figure out what will happen if the same email
        // has been entered twice, do error handling thats it
    }
    catch(e){
        res.status(403).json({
            message: e
        })
        return

    }

    res.json({
        message: "User Added Succesfully!!!"
    })
    return

    // everything is sorted here already, no need to read the file to check if the email is unique like it was earlier, it will
    //  simply throw error if duplicate email is used, and inserted the data to the collection
})


app.post("/login",async (req,res)=>{
    let email=req.body.email;
    let password=req.body.password;
    console.log(email);
    
    let user=await userModel.findOne({//same as what i was doing  earlier, users.find(user=>user.email===email&&user.password===password)
        email: email
        // password: password //now this cant be done as the password stored in db is hashed and we just cant directly compare them
    })
    if(user){
        let matched=await bcrypt.compare(password,user.password).catch(err=>{//will return true if pass matched
            console.log("There was an error while Comparing Password!! Err Status: "+err);
        });
        if(matched){
            token=jwt.sign({
                id: user._id 
            },JWT_Secret);
        
            res.json({
                token: token,
                message: "Logged In Succesfully!!!"
            })
            return;
        }
        else{
            res.status(403).json({
                message: "Incorrect Password!"
            })
            return;
        }
    }
    else{
        res.status(403).json({
            message: "No User registered with this Email!! Try Signung in First!!"
        })
        return;
    }
})

app.use(authenticate);

app.post("/todo",async (req,res)=>{
    let userId=req.userId;
    let title=req.body.title;
    let isDone=req.body.isDone;
    try{
        let due=new Date(req.body.due);
        // console.log(todoModel);    
        let todo=await todoModel.create({
            title: title,
            isDone: isDone,
            due: due,
            userId: userId
        })
        // console.log(todo);    
        res.json({
            message: "Task Added Succesfully",
            createdAt: todo.createdAt
        })
        return;
    }
    catch(e){
        res.json({
            message: `Error Creating the tOdO for user with id: ${userId}. Error Status: ${e}!`
        })
        return;
    }
})
app.post("/done/:id",async (req,res)=>{
    let id=req.params.id;
    let userId=req.userId;
    // console.log(todoModel);  
    try{
        let todo=await todoModel.updateOne({
            _id: id
        },{
            isDone: true
        })
        console.log(todo);    
        res.json({
            message: `Task with id ${id} marked as complete!!`,
            updatedAt: todo.updatedAt
        })
        return;
    }  
    catch(e){
        res.json({
            message: `Error Updating the tOdO with id: ${id}. Error Status: ${e}!`
        })
        return;
    }
})
app.get("/todos",async(req,res)=>{
    userId=req.userId;
    let todos=await todoModel.find({//NOTE: todoModel is not an array
        userId
    })
    res.json({
        message: todos
    })
    return;
})

app.listen(3000)

// Relations in db is imp, it will not allow me to add todo with the user id that doesn't exist

// Bearer in the token suggests the type of token, bearer is the most common one another type is APIKey followed by the token

// Authentication/Authorization: Authentication means logging in logging out, Authorization means if i am authorized to acess
// this resourse like /admin. Like i have logged in to google but not authorised to visit google/admin, toh authorization means
// the level of acess i have in the be
// How can i do that, like only some can acess a particular end point regardless of whether they are logged in or not, just create
// an admin table/collection containing the users who are authorised to acess that endpoint

// Refresh token is basically revoking a token and reissuing it time to time for security, as if anyone gets hold of someone elses
// token, the token will become invalid after some time


// Input validation on be is very important as user can send any data on be using postman if not from fe

// This input validation can be done manually, by doing checks using if-elses, but theres a library called zod to do the same

// regex is basically specifying the format of data like {}.{}@{somathing}

// This might be how zod is written


module.exports={
    z: {
        object: function(){
            return {}
        },
        string: function(){
            return {}
        },
        number: function(){
            return {}
        },
        min: function(){
            return {}
        },
        safeParse(self){
            return{succes: true}
        }
    }
}

// figure out how do big companies with very large dataset search if user doesnt exist?? does they simply iterate through data??

// assignment is to add password validation

// Read about oauth