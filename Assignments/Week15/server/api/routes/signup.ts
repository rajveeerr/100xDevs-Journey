import express from "express";
import {z} from "zod"
const authRouter=express()

authRouter.post("/signup",(req,res)=>{

})

// module.exports={
//     authRouter: authRouter
// } // ts requires es6 version for import and exports, toh this is wrong

export { authRouter }