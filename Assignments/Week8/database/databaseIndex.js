const mongoose=require("mongoose");
const schema=mongoose.Schema;
const ObjectId=mongoose.ObjectId;

let user=new schema({ //the object id is created automatically and is an uuid which is a highly randomised string, so the chances
    // of duplicate uuids is very-very low
    name: String,
    email: {type: String,unique: true,trim: true},
    password: String,
    profilePicture: String,
    dateOfBirth: Date,
    bio: String
},{timestamps: true})

let course=new schema({
    instructorId: ObjectId,
    // contentId: ObjectId,
    title: String,
    description: String,
    category: String,
    price: Number,
    language: String,
    level: String,
    duration: Number,
    coverImg: String //to store an image we should simply store its url or convert it to base 64 then store it, this is the best approach, instead of storing the actual img on the db
},{timestamps: true})

let courseContent= new schema({
    courseId: String,
    sections: [String], //(array containing multiple sections; each section has title, order, and lessons)
    lessons: [String], //(array of lessons, each containing lesson_id, title, content_type (video, PDF, quiz), and content_url)
    quizzes: {
        type: Map,
        of: String
    } //(array of quiz objects with questions, options, and correct answers)
    // assignments: //(if applicable, include assignment details and submission instructions)
},{timestamps: true})

let section= new schema({
    title: String,
    order: Number,
    description: String,
    lessons: [String]
},{timestamps: true})

let lesson= new schema({
    title: String,
    content_type: String,
    content_url: String,
    duration: Number,
    order: Number,
    is_preview: Boolean
},{timestamps: true})

let instructor=new schema({
    // courseId: ObjectId,
    name: String,
    email: {type: String,unique: true,trim: true},
    password: String,
    profilePicture: String,
    dateOfBirth: Date,
    bio: String
},{timestamps: true})

let purchase=new schema({
    userId: ObjectId,
    courseId: ObjectId
},{timestamps: true})

// purchase.findUserByEmailorName=function(){}//this way we can define custom functions to the schema

let userModel=mongoose.model("users",user)
let courseModel=mongoose.model("courses",course)
let instructorModel=mongoose.model("instructors",instructor)
let purchasesModel=mongoose.model("purchases",purchase)
let courseContentModel=mongoose.model("coursecontents",courseContent)
let lessonModel=mongoose.model("lessons",lesson)
let sectionModel=mongoose.model("sections",section)

module.exports={
    userModel, 
    courseModel, 
    instructorModel, 
    purchasesModel,
    courseContentModel,
    lessonModel,
    sectionModel
}
