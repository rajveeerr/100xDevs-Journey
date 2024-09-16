// A jwt token can be created by encoding any data using secret key, just like the encryption, but it can be decoded back
// 1. without the jwt secret key - decode(token)
// 2. but can only verify it with the jwt secret key - verify(token,secret key), this basically verifies if i was the person
// who has created the jwt
// unlike encryption/decription where data can only be decrypted using secret key


// user={username,password} will create obj with key username and its value to username variable

const express=require("express");
const jwt=require("jsonwebtoken");
const cors=require("cors");

const JWT_SECRET="randomSecret";

app=express();

let users=[]

function auth(req,res,next){//this is very flawed logic, it works well if the requests are just made by fe, but if someone request this using postman and sends a token thata contains a username that doesn't exist on the server/db this auth will still show them they are logged and give acess to the endpoint, where the endpoint will try to extract the data for the non-existant user and will throw err, i can handle this error there to say ki user doesnt exist but this is wrong, to make this correct i can call database and chack if user exists in db, but this defets the whole purpose of jwt, well actually not i can simpley call the database requesting the data of user here and if the data exists i will modify the req object to contain this data and pass to the next fn so they dont need to call the database again, if the data is empty this simply means user doesn't exists
    if(req.headers.authorization){
        let reqToken=req.headers.authorization;
        let decodedData=jwt.verify(reqToken,JWT_SECRET);
        if(decodedData.username){
            req.username=decodedData.username;
            // res.json({message: "Authorization succesfull!!! Redirecting..."})//can send data in body back only once so dont do it here
            next();//since the token exists that means user has logged in and hen can acess endpoint, we cant pass parameter to next, as it will not reach the next fn 
        }
        else{
            res.status(401).json({
                message: "Invalid token provided!!!!"
            })

        }
        
    }
    else{
        res.status(401).json({
            message: "You cannot acess this without logging in!!!!"
        })//no token provided is is not logged
    }
}

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/index.html");//this wll host fe and be on same server no need of cors
})

app.post("/signup",(req,res)=>{
    if(req.body.username&&req.body.password){
        let found=users.find(user=>user.username===req.body.username);
        if(!found){
            users.push({
                username: req.body.username,
                password: req.body.password,
            });
            console.log(users);
            

            res.status(200).json({
                message: 'Signup Complete, enjoy!!!'
            });
            return;
        }
        else{
            res.status(409).json({
                message: "User already exist"
            });
            return;
        }
    }

    else{
        res.status(401).json({
            message: 'Signup Incomplete, username or password not provided!!!'
        });
        return;
    }    
    
}) 

app.post("/signin",(req,res)=>{
    if(req.body.username&&req.body.password){
        let found=users.find(user=>user.username===req.body.username);
        if(found && found.password===req.body.password){
            
            token=jwt.sign({ 
                username: req.body.username
            },JWT_SECRET); 
            
            // token=jwt.sign({ 
            //     username: req.body.username
            // },JWT_SECRET,{
            //     expiresIn: "1d"} //this make sure ki token gets expired after 1day
            // )}; 

            res.header("token",token);
            res.header("smthn","something");

            res.json({
                message: "User SignedIn succesfully!!!!",
                token: token
            });
            return;
        }
        else{
            res.status(401).json({
                message: `SignedIn Failed!!!! as ${found?'Password is incorrect':'User doesn\'t exist! signup first'}  `
            })
            return;
        }
    }
    else{
        res.status(401).json({
            message: "SignedIn Failed!!!! No username or password provided"
        })
        return;
    }
});

app.use(auth);

app.get("/me",(req,res)=>{//authanticated ep, means you have to be signed in to acess this
    // let reqToken=req.headers.authorization;
    // let decodedInformation=jwt.verify(reqToken,JWT_SECRET); //this will verify if i was the one who created the token
    // let decodedInformation=jwt.decode(reqToken)//if ill just decode the token and not verify it, anyone can generate token(with an existing userid) and send request with it to get signedin
    username=req.username;//auth middleware modified the req obj to contain the username so no need to do above commented things
    found=users.find(user=>user.username===username); //now i can call db for data of the user, can do this in aut for better auth, read auth comments
    if(found){
        res.json({
            username: found.username,
            password: found.password
        })
    }
    else{
        res.status(401).json({message: 'Invalid token of non-existing user!!!!'})//bcz with the current auth logic, one can send token that contains username that is not present in server, but since it passes all of checks the control will reach here, and since the user doesn't exists the found variable will have null, so this check, halaki i can check this in auth itself if the user exists in db already
        //when sending request from the fe this error can happen if server crashes and dp resets, only the it will say user doesnt exist
    }

    
})



app.listen(3000);

// To basically if someone creates their own token with the user id and signs it with their secret key, when decoded theirs
// token will also give the same payload as token generated by me but when verified it will result in an error

// Hacking tipp, start looking for secret keys, and use them to create token of or whatever data website is using(can get to
// know this through localstorage maybe) and then use that data to login yourselvs as them
// Or can use someone elses cookies to login as them

// iat in the token when decoded represents when t=was the token issued, Date.time() returns unix timestamp, total time passed since 1 Jan 1970

// I can allow multiple users login by storing all of logged-in account's token in local storage nd mapping them somehow,
// gotta try this for todos

// For deployment i can host node js projects on vercel either on same instance or different like fe on cds/netlify/vercel and 
// be on aws/azure but for large scale deploying fe on cdn and be on vm(virtual machince) is the way to go


// Why does websites ask for cookies, cookies are used to track you, and there are some rights of user thats forces website
// owners to accept you to store cookies so they can track you