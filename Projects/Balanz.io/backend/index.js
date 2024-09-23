const express = require("express");
const dotenv = require("dotenv");
const cors=require("cors");
dotenv.config();
const routes=require("./routes/todo");
const userRoutes=require("./routes/user");
const path = require("path");

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname,'../public')));

app.use(userRoutes);
app.use(routes);//this middleware allows acess to  the modular routes i've created

app.get("/healthy", (req, res)=> res.send("I am Healthy"));

//  start writing your routes here
app.get("*",(req,res)=>{
    res.status(404).sendFile(path.join(__dirname,"../frontend/notFound.html"))
})

app.listen(port, ()=> console.log(`server is running at http://localhost:${port}`));