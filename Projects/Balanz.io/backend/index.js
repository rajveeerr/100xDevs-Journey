const express = require("express");
const dotenv = require("dotenv");
const cors=require("cors");
dotenv.config();
// const fs=require("fs");
// const path=require("path");
// const { v4: uuidv4 } = require('uuid');
const routes=require("./routes/todo");
const userRoutes=require("./routes/user")

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

app.use(userRoutes);
app.use(routes);//this middleware allows acess to  the modular routes i've created

app.get("/healthy", (req, res)=> res.send("I am Healthy"));

//  start writing your routes here
app.get("*",(req,res)=>{
    res.status(404).send(`<h1>Ummm!!!! Looks Like the resourse you are looking for doesn't exists!!!</h1>`)
})

app.listen(port, ()=> console.log(`server is running at http://localhost:${port}`));