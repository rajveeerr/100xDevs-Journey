const jwt=require("jsonwebtoken");
const JWT_Secret="dscbsjdh382r32"

function authenticate(req,res,next){
    let recToken=req.headers.authorization;
    if(recToken){
        try{
            userId=jwt.verify(recToken,JWT_Secret);
            if(userId.id){
                req.userId=userId.id
                next();
            }
            else{
                res.status(403).json({
                    message: "Invalid Token"
                })
            }
        }
        catch(err){
            res.status(403).json({
                message: "Invalid Token"
            })
        }
    }
    else{
        res.status(403).json({
            message: "Try Logged in first before acessing this!!!"
        })

    }
}

module.exports={authenticate}