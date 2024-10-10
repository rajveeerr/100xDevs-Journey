const express=require("express");
const router=express.Router();//well router, does routes all the routing of the requests to the correct req handelers while making 
// the code modular, the router is the instance of Router() and Router() exports a function

let user=require("../database/databaseIndex").userModel

const bcrypt=require("bcrypt");
const saltingRounds=10;

const jwt=require("jsonwebtoken");
const Secret_Key="sdkcjnsdc892ewln";

router.post("/signup",async (req,res)=>{
    let email=req.body.email;
    let password=req.body.password;
    let username=req.body.name;
    //apply proper zod validations, also check if these field has values
    if(email&&password&&username){

        try{
            let hashedPass=await bcrypt.hash(password,saltingRounds);
            
            await user.create({
                email,
                username,
                password: hashedPass
            })
            
            let token=jwt.sign({
                email
            },Secret_Key)
    
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

router.post("/login",async (req,res)=>{
    let email=req.body.email;
    let password=req.body.password;

    let userFound=await user.findOne({
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
                email
            },Secret_Key)
    

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

router.post("/purchases",(req,res)=>{
    res.json({
        message: "Purchasing Course"
    })
})


module.exports= {
    userRoutes: router
}//correct way to export