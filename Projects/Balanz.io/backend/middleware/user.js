let jwt=require("jsonwebtoken");
const JWT_SECRET= "dsjlcdskj32eoe3n1eio13l#";
const fs=require("fs");
const path=require("path");

todoJson=path.join(__dirname,"../database/todos.json");

function userMiddleware(req, res, next) {
    // Implement user auth logic
    reqToken=req.headers.authorization;
    if(reqToken){
        try{
            let username=jwt.verify(reqToken,JWT_SECRET).username;
            let allUsersData=[];
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
                req.allUsersData=allUsersData
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
        res.status(401).json({
            message: "You Cant Acess this without logging in!!!!!!"
        })
    }
}

module.exports = userMiddleware;