//will have to rearn how to refresh tokens

const env=require("dotenv");
env.config()

const jwt=require("jsonwebtoken");
const USER_JWT_KEY=process.env.USER_JWT_KEY;//different keys are used to sign admin and users, credentials tokens, dunno why??

function userAuthentication(req,res,next){//token will be received in the header, with key authorizationn
    let token=req.headers.authentication;
    if(token){
        try{
            let {email,role,id}=jwt.verify(token,USER_JWT_KEY);
            req.email=email;//well the problem with this approach is ki, if the user delets his acc, this will still give them
            // the acesss to the endpoint, maybe refreshing tokens can solve this issue
            req.role=role
            req.userId=id
            next()
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
    userAuthentication
}