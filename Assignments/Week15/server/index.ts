import express from 'express'
import {authRouter} from './api/routes/signup'
import env from 'dotenv'
env.config()

let app=express()

app.use("/api/v1",authRouter)

app.get("/",(req,res)=>{
    res.send("I am healthy!!")
})

const port:string=process.env.port||"3000";
app.listen(port,()=>{
    console.log(`The server is running at port ${port}`);
})