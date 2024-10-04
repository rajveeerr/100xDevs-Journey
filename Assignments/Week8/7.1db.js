let mongoose=require("mongoose");
// find out why we are using schema here, mongo is schemaless isn't it??

// Well the mongoose db doesn't have schema(dont need to define rigid data structure), its the mongoose library based on 
// ODM(object document model), which adds schema for data consistency

// Mongoose gives you the option of enforcing a schema because it's beneficial for the application logic, creating schema here doesnt means
// ki we cant put random data in the db. To create schema-less data model uing node we can use mongodb library.

// Tldr schema is introduced by this mongoose library to reduce the errors that can occur in the program

let Schema=mongoose.Schema;  //mongoose library exports a class called schema

let ObjectId=mongoose.ObjectId;

let userSchema=new Schema({//the structure of data that will reach the database | userSchema is an instance of schema
    name: String,
    // email: {type: String, unique: true},//will make sure every email is unique
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email required"]
    },//email validation
    password: {type: String, required: true, minLength: 8}//password validation
});//object of class Schema

let todoSchema=new Schema({
    title: String,
    isDone: Boolean,
    due: Date,
    userId: ObjectId //the ids generated are of type objectid, so this line suggests that the type of userId is ObjectiD
},{timestamps: true})//this will simply create the timestamp when the document is added/updated

// model is basically creating something which uses schema to allow users to call functions on it
// we can call multiple function over a model

//  The .model() function makes a copy of schema

// Instance of model is called document

let userModel=mongoose.model('users',userSchema);//the first arguments tells which collection to put the data
let todoModel=mongoose.model('todos',todoSchema);//so this means i want to put data in todos collection with the todoSchema(datastructure)

// functions to used for model

// model.findOne({email: "smth"})
// model.find({email: "sjosd", password: "sdckjdcs"})
// model.create({email: "dsc","name": "password"})
// model.delete({_taskid: "dscdcs"})
// model.updateOne({_taskid: "dscdcs"},{idDone: true})

// await model.find({ _taskid: 'dscdss' }).where('createdDate').gt(oneYearAgo).exec();
// model.findOneAndUpdate(conditions, update)

module.exports={userModel,todoModel}