const {Router}=require("express");
const courseRouter=Router();

const {userAuthentication}=require("../middlewares/usermiddleware");
const {courseModel}=require("../database/databaseIndex")

courseRouter.get("/",(req,res)=>{
    res.json({
        message: "All Courses"
    })
})


courseRouter.get("/preview",async (req,res)=>{

    let allCourses=await courseModel.find({})
    res.json({
        message: "Displaying all courses",
        data: allCourses
    })
})

module.exports={
    courseRouter: courseRouter
};