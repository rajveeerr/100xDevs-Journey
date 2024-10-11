const {Router}=require("express");
const adminRouter=Router();

const env=require("dotenv");
env.config()

const jwt=require("jsonwebtoken");
const ADMIN_JWT_KEY=process.env.ADMIN_JWT_KEY;

const bcrypt=require("bcrypt");
const saltingRounds=10;

const {userModel, courseModel, instructorModel, purchasesModel,courseContentModel,lessonModel,sectionModel}=require("../database/databaseIndex")

const {adminAuthentication}=require("../middlewares/adminmiddleware");


adminRouter.post("/signup",async (req,res)=>{
    let {email,password}=req.body;
    let username=req.body.name

    if(email&&password&&username){

        try{
            let hashedPass=await bcrypt.hash(password,saltingRounds);
            
            let newInstructor=await instructorModel.create({
                email,
                username,
                password: hashedPass
            })
            
            let token=jwt.sign({
                email,
                id: newInstructor._id,
                role: "admin"
            },ADMIN_JWT_KEY)
    
            res.json({
                message: "Instructor Account created succesfully",
                token
            })
            return
        }
        catch(err){
            if(err.code===11000){
                res.status(401).json({
                    message: "Email already exists"//what if someone what to have two roles with same email
                })
                return;
            }
            res.status(401).json({
                message: "There was an error creating account",
                errorStatus: err
            })
            return;
        }
    }
    else{
        res.status(401).json({
            message: "No Email, Name or Password provided",
            email,
            username,
            password
        })
        return;
    }
})

adminRouter.post("/login",async (req,res)=>{
    let {email,password}=req.body;

    let instructorFound=await instructorModel.findOne({
        email
    })

    if(instructorFound){
        let passMatched=false;
        try{
            passMatched=await bcrypt.compare(password,instructorFound.password);
        }
        catch(e){
            res.status(401).json({
                message: "Internal Error",
                errorStatus: e
            })
            return
        }
        if(passMatched){

            let token=jwt.sign({
                email,
                id: instructorFound._id,
                role: "admin"
            },ADMIN_JWT_KEY)

            res.json({
                message: "Login as Instructor Succesful",
                token
            })
            return
        }
        else{
            res.status(401).json({
                message: "Incorrect Password for Instructor!"
            })
            return
        }
    }
    else{
        res.status(401).json({
            message: "No instructor exists with this email, SignUp First!"
        })
        return
    }
})

// adminRouter.use(adminAuthentication)

adminRouter.post("/course",adminAuthentication,async (req,res)=>{
    //maybe i need to do zod validations here
    const instructorId=req.instructorId;
    const {title,description,category,price,language,level,duration,coverImg}=req.body;
    
    try{
        newCourse=await courseModel.create({
            instructorId,
            title,
            description,
            category,
            price,
            language,
            level,
            duration,
            coverImg
        })
    }
    catch(err){
        res.status(500).json({
            message: "There was an error while creating the course!!",
            errorStatus: err
        })
        return
    }
    res.json({
        message: "Course Created Succesfully!!",
        courseId: newCourse._id
    })
    return
})

//received payload: {courseId,title,description,category,price,language,level,duration,coverImg} and instructorId is alag se
adminRouter.put("/course",async (req,res)=>{
    const instructorId=req.instructorId
    const {courseId}=req.body//courseId is what course we want to change
    try{
        let course=await courseModel.updateOne({_id: courseId, instructorId},req.body)//this will simply update the contents with the body
    //doing the above will only allow intructor to update his course
        if(!course.matchedCount){
            res.status(404).json({
                message: "No course found with the courseId!!"
            })
        }
    }
    catch(err){
        res.status(500).json({
            message: "There was an error while updating the course!!",
            errorStatus: err
        })
        return
    }
    res.json({
        message: "Course Updated Succesfully!!",
        courseId: courseId,
        updatedCourse: course
    })
    return
})

adminRouter.get("/courses",adminAuthentication,async (req,res)=>{
    let {instructorId}=req;

    let allCourses=await courseModel.find({
        instructorId
    })
    console.log(allCourses);
    
    res.json({
        message: "Displaying all courses of the instructor",
        data: allCourses
    })
})

adminRouter.delete("/delete/:id",(req,res)=>{

})


module.exports = {
    adminRouter: adminRouter
}