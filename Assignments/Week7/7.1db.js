let mongoose=require("mongoose");
// find out why we are using schema here, mongo is schemaless isn't it??

// Well the mongoose db doesn't have schema(dont nedd to define rigid data structure), its the mongoose library based on 
// ODM(object document model), which adds schema for data consistency

// Mongoose gives you the option of enforcing a schema when it's beneficial for your application logic.

let Schema=mongoose.Schema;  //mongoose library exports a class called schema

let ObjectId=mongoose.ObjectId;

let userSchema=new Schema({//the structure of datta that will reach the database
    name: String,
    email: {type: String, unique: true},//will make sure every email is unique
    password: String,
});//object of class Schema

let todoSchema=new Schema({
    title: String,
    isDone: Boolean,
    due: String,
    userId: ObjectId
})

// model is basically creating something which uses schema to allow users to call functions on it
// we can call multiple function over a model

let userModel=mongoose.model('users',userSchema);//the first arguments tells which collection to put the data
let todoModel=mongoose.model('todos',todoSchema);//so this means i want to put data in todos collection with the todoSchema(datastructure)

module.exports={userModel,todoModel}