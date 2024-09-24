const { Router } = require("express");
const jwt=require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const JWT_SECRET= process.env.JWT_SECRET;
const router = Router();
const userMiddleware = require("../middleware/user");
const fs=require("fs");
const path=require("path");
const { profile } = require("console");

todoJson=path.join(__dirname,"../database/todos.json");
let allUsersData=[];

const profilePictures=["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg","9.jpg","10.jpg","11.jpg","12.jpg","13.jpg"];

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
// user data looks like this = [{username: "this is basically user id",password: "", name: "smthn", profileImg: "", todos: [{id,name,description,due,category,completed,status,priority},{id,name,decsription,due,category,completed,status,priority}]},{username: "user2",todos: []}];
// {username: "user-id-generated-on-server, name: "smthn", profileImg: "generated-randomly-on-BE", todos:[]"initialised on be"}
// received-payload: {username: "wewef", name: "asca",password: "casa"}

    if(req.body.username&&req.body.password&&req.body.name){
        try{
            allUsersData=JSON.parse(fs.readFileSync(todoJson,"utf-8"));
        }
        catch(e){
            fs.writeFileSync(todoJson,"[]");
        }
        let username=req.body.username;
        let userFound=allUsersData.find(user=>user.username===username);
        if(!userFound){
            // let username= uuidv4();
            let newUser={
                username: username,
                name: req.body.name,
                password: req.body.password,
                profileImg: profilePictures[Math.floor(Math.random()*profilePictures.length)],
                todos: []
            }
            allUsersData.push(newUser);
            try{
                fs.writeFileSync(todoJson, JSON.stringify(allUsersData));
            } 
            catch(err){
                return res.status(500).json({ 
                    message: "Internal server error. Couldn't save the data.", 
                    error: err 
                });
            }
            token=jwt.sign({ 
                username: username
            },JWT_SECRET); 

            res.status(200).json({
                message: `Signup Complete, for ${req.body.name}!!!`,
                token: token,
                profileImg: newUser.profileImg,
                username: username
            });
            return;
        }
        else{
            res.status(409).json({
                message: "Username already exist!!"
            });
            return;
        }
    }
    else{
        res.status(401).json({
            message: 'Signup Incomplete, username, name, password not provided!!!'
        });
        return;
    }    
});
     

router.post("/login",(req,res)=>{
    // Implement user login logic
    if(req.body.username&&req.body.password){
        let username=req.body.username;
        try{
            allUsersData=JSON.parse(fs.readFileSync(todoJson,"utf-8"));
        }
        catch(e){
            fs.writeFileSync(todoJson,"[]");
        }
        let userFound=allUsersData.find(user=>user.username===username);
        if(userFound && userFound.password===req.body.password){
            token=jwt.sign({ 
                username: username
            },JWT_SECRET); 

            res.json({
                message: `User ${username} Logged In succesfully!!!!`,
                token: token,
                username: userFound.username
            });
            return;
        }
        else{
            res.status(401).json({
                message: `LogIn Failed!!!! as ${userFound?'Password is incorrect':'User doesn\'t exist! signup first'}`,
                status: userFound?'Password is incorrect':'User doesn\'t exist!'
            })
            return;
        }
    }
    else{
        res.status(401).json({
            message: "LogIn Failed!!!!",
            status: "No Username or Password provided!!!"
        })
        return;
    }
});

router.get('/signup',(req,res)=>{
    res.sendFile(path.join(__dirname,"../../frontend/signup.html")); //i'm thinking of taking signups/login on same page and basically changing routs on fe
})
router.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,"../../frontend/login.html"));

})

router.get('/todos',  (req, res) => {
    // Implement logic for getting todos for a user
    res.sendFile(path.join(__dirname,"../../frontend/index.html"));
});
router.get('/',  (req, res) => {
    // Implement logic for getting todos for a user
    res.sendFile(path.join(__dirname,"../../frontend/landing.html"));
});

router.post('/logout', userMiddleware, (req, res) => {
    // Implement logout logic
    // no need to do this simply remove token from fe
});

module.exports = router