let jwt=require("jsonwebtoken");
const JWT_SECRET= "dsjlcdskj32eoe3n1eio13l#";
const fs=require("fs");
const path=require("path");
const { v4: uuidv4 } = require('uuid');

todoJson=path.join(__dirname,"../database/todos.json");
let allUsersData=[];

function userMiddleware(req, res, next) {
    // Implement user auth logic
    reqToken=req.headers.authorization;
    if(reqToken){
        try{
            let username=jwt.verify(reqToken,JWT_SECRET).username;
            try{
                allUsersData=JSON.parse(fs.readFileSync(todoJson,"utf-8"));
            }
            catch(e){
                fs.writeFileSync(todoJson,"");
            }
            let userFound=allUsersData.find(user=>user.username===username)
            if(userFound){
                req.username=username;
                req.userData=userFound;
                req.allUsersData=allUsersData;
                next();
            }
            else{
                res.status(404).json({
                    message: "User Not Found"
                })
            }
        }
        catch(err){
            res.status(401).json({
                message: "Invalid Token given!!!!!! Make sure to use a valid token next time. Err Status: "+err
            })
        }
    }
    else{
        // res.status(302).send({
        //     message: 'You Cant Acess this resourse without logging in!!!!!!'
        // });
        res.redirect('/login');
    }
}

module.exports = userMiddleware;