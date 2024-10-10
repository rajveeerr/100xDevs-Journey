const mongoose=require("mongoose");
const schema=mongoose.Schema;
const ObjectId=mongoose.ObjectId;

mongoose.connect("mongodb+srv://randomadmin:9mVRp2O5Y9AI6Erz@cluster0.if7ev.mongodb.net/CourseSelling");

let user=new schema({
    name: String,
    email: {type: String,unique: true,trim: true},
    password: String
})
// let course=new schema({

// })

let userModel=mongoose.model("users",user)
// let courseModel=mongoose.model("courses",course)


module.exports={userModel}
