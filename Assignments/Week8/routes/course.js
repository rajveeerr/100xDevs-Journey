const {Router}=require("express");
const courseRouter=Router();

courseRouter.get("/",(req,res)=>{
    res.json({
        message: "All Courses"
    })
})

courseRouter.get("/purchases",(req,res)=>{
    res.json({
        message: "Purchased Courses"
    })
})

courseRouter.get("/preview",(req,res)=>{
    res.json({
        message: "Previewing Course"
    })
})

module.exports={
    courseRouter: courseRouter
};