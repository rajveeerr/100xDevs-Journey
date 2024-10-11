const env=require("dotenv")
env.config();

const jwt=require("jsonwebtoken");
const ADMIN_JWT_KEY=process.env.ADMIN_JWT_KEY;

function adminAuthentication(req,res,next){//token will be received in the header, with key authorizationn
    let token=req.headers.authentication;
    if(token){
        try{
            let {email,role,id}=jwt.verify(token,ADMIN_JWT_KEY);
            req.email=email;
            if(role==="admin"){
                req.role=role,
                req.instructorId=id
                next()
            }
            else{
                res.status(401).json({
                    message: "You cannot acess this as an user!!",
                    errStatus: err
                })
            }
        }
        catch(err){
            res.status(401).json({
                message: "Invalid token provided!!",
                errStatus: err
            })
        }
    }
    else{
        res.status(401).json({
            message: "You've to LogIn first to acess this endpoint!"
        })
    }
}

module.exports={
    adminAuthentication
}