// I can use any stack for backend, express - nodejs, springboot- java etc etc the only thing that will remain static is database
// there are multiple types of databases, sql no-sql. When for large scake projects we use multiple backend servers to handle the large
// trafic, these backend servers are transient, means if one server goes down others will handle the load, the data is
// not persisted, means we can start and stop them, no data will be lost as we use databases to persist data, these backends
// are stateless, means no data is stored in the database, which will be a bad idea. The best practice will be to stop auto scaling
// of the database and replicate it enough number of times so that the data remains safe. If backend goes down its not a problem
// one can fix it wery quickly

// Database are organised collection of data that are structured to enable efficient storage, retrival nd management
// of informatiion

// Whenever we create a full stack app we do persist the data in database
// data can be anything userinfo, todos a=data etc.

// MongoDb is a no sql database(diverge from traditional relational modal), suitable for various data models and workloads
// that may not fit into tabularschema of sql database

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

// Toh basically in mongo we can store data in mogo dtat doesnt have a fixed structure

// Second advantage of mongo db is scaling, mongo is horizontally scalable means with increase in traffic we can increase the
// add multiple number of instances (databases), which is really hard to do for sql databases(will have to use master-slave arcticture/sharding for that

// A mongodb cluster is basically bunch of machines holding our data, so we can store multiple apps info in a single cluster, multiple
// databases

// A cluster can hold multiple databases, database is a place to dumpl all the data, ths data can be divided into multiple
// different collections and can be linked together with a unique id

// We are currently hosting our database on internet/cloud

// Compass is basically a gui interface that lets us visualise database quickly

// In mongo there is concept of document, so one user info is stored in one document, also the ids of a document is generated automatically
// by mongo, tyype of id is object this id can then be used to connect different collections
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

let {userModel,todoModel}=require("./7.1db");
const mongoose = require("mongoose");
const { authenticate } = require("./7.1auth");

mongoose.connect("mongodb+srv://randomadmin:9mVRp2O5Y9AI6Erz@cluster0.if7ev.mongodb.net/Balanz")

app.use(express.json())



app.post("/signup",async (req,res)=>{
    let name=req.body.name;
    let email=req.body.email;
    let password=req.body.password;
    
    await userModel.create({//this is an asynchronous function for obvious reasons, it has to put this data to a remote server, and it cant stop execution
        name: name,
        email: email,
        password: password
    })
    // we can totally get away without using await, then we will just assume ki the data has been inserted succesfully, the the good
    // practice is to use await and check if the data has been inserted succesfully

    //have to chaek if the email is unique,no need already written a schema for that have to figure out what will happen if the same email
    // has been entered twice, do error handling thats it

    res.json({
        message: "User Added Succesfully!!!"
    })

    // everything is sorted here already, no need to read the file to check if the username is unique like it was earlier, it will
    //  simply throw error if duplicate email is used, and inserted the data to the collection
})
app.post("/login",async (req,res)=>{
    let email=req.body.email;
    let password=req.body.password;

    let user=await userModel.findOne({//same as what i was doing  earlier, users.find(user=>user.email===email&&user.password===password)
        email: email,
        password: password
    })

    if(user){
        token=jwt.sign({
            // email: email
            id: user._id //as the user id is of type obj
        },JWT_Secret);
    
        res.json({
            token: token,
            message: "Logged In Succesfully!!!"
        })
    }
    else{
        res.status(403).json({
            message: "Invalid Credentials"
        })

    }
})

app.use(authenticate);

app.post("/todo",async (req,res)=>{
    let userId=req.userId;
    let title=req.body.title;
    let isDone=req.body.isDone;
    let due=req.body.due;
    // console.log(todoModel);    
    let todo=await todoModel.create({
        title: title,
        isDone: isDone,
        due: due,
        userId: userId
    })
    // console.log(todo);    
    res.json({
        message: "Task Added Succesfully"
    })
})
app.get("/todos",async(req,res)=>{
    userId=req.userId;
    let todos=await todoModel.find({//NOTE: todoModel is not an array
        userId
    })
    res.json({
        message: todos
    })
})

app.listen(3000)