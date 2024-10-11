const express=require("express");
const userRouter=express.Router();//well router, does routes all the routing of the requests to the correct req handelers while making 
// the code modular, the router is the instance of Router() and Router() exports a function

const {userModel, courseModel, instructorModel, purchasesModel,courseContentModel,lessonModel,sectionModel}=require("../database/databaseIndex")

const bcrypt=require("bcrypt");
const saltingRounds=10;

const env=require("dotenv");
env.config()

const jwt=require("jsonwebtoken");
const USER_JWT_KEY=process.env.USER_JWT_KEY;//we should use different keys for signing user tokens and admins token, bcz if the
// the userid of admin and user is repeated(vely low probability) and same key is used to sign those same ids then the token 
// generated will also be same and user can use all the admin endpoints, this is a very big vulnerability, so we should different
// keys to sign the token, also even if the ids which are being signed are different, if same password is used the middleware will
// not be able to distinguish between user and amin eps

const {userAuthentication} = require("../middlewares/usermiddleware")

userRouter.post("/signup",async (req,res)=>{
    let {email,password}=req.body;
    let username=req.body.name
    //apply proper zod validations, also check if these field has values
    if(email&&password&&username){

        try{
            let hashedPass=await bcrypt.hash(password,saltingRounds);
            
            let newUser=await userModel.create({
                email,
                username,
                password: hashedPass
            })
            
            let token=jwt.sign({
                email,
                id: newUser._id,
                role: "user"
            },USER_JWT_KEY)
    
            res.json({
                message: "Account created succesfully",
                token
            })
            return
        }
        catch(err){
            if(err.code===11000){
                res.status(401).json({
                    message: "Email already exists"
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

userRouter.post("/login",async (req,res)=>{
    let {email,password}=req.body;

    let userFound=await userModel.findOne({//.find returns array
        email
    })

    if(userFound){
        let passMatched=false;
        try{
            passMatched=await bcrypt.compare(password,userFound.password);
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
                id: userFound._id,
                role: "user"
            },USER_JWT_KEY)
    

            res.json({
                message: "Login Succesful",
                token
            })
            return
        }
        else{
            res.status(401).json({
                message: "Incorrect Password!"
            })
            return
        }
    }
    else{
        res.status(401).json({
            message: "No user exists with this email, SignUp First!"
        })
        return
    }
})

// userRouter.use(userAuthentication);

userRouter.post("/purchase",userAuthentication,async (req,res)=>{
    let userId=req.userId;
    let {courseId}=req.body;

    try{
        let purchaseExists=await purchasesModel.findOne({
            courseId,
            userId
        })
        if(!purchaseExists){
            let purchasedCourse=await purchasesModel.create({
                courseId,
                userId
            })
            res.json({
                message: "Course purchased succesfully",
                courseId,
                purchasedCourse
            })
        }
        else{
            res.status(401).json({
                message: "You've already purchased this course!!",
                errorStatus: err
            })
            return
        }
/*      const purchasedCourse = await courseModel.findOneAndUpdate(
            { courseId, userId }, // Filter to find the existing purchase
            { $setOnInsert: { courseId, userId } }, // Only set these values if no document matches
            { new: true, upsert: true } // Return the updated document and create if not found
        );

        if (purchasedCourse.wasNew) {
            res.status(201).json({
                message: "Course purchased successfully!",
                course: purchasedCourse,
            });
        } else {
            res.status(401).json({
                message: "You've already purchased this course!",
            });
        }
 */
    }
    catch(err){
        res.status(500).json({
            message: "There was an error!!Try again later!!",
            errorStatus: err
        })
        return
    }

    
})

userRouter.get("/purchases",userAuthentication,async (req,res)=>{
    let userId=req.userId;

    let purchases=await purchasesModel.find({
        userId
    })

    let course=await courseModel.find({
        _id: {$in: purchases.map(purchase=>purchase.courseId)}//find the course whose id is in this array
    })

    res.json({
        message: "Displaying all of your purchased courses",
        data: course
    })
})

module.exports= {
    userRouter
}//correct way to export