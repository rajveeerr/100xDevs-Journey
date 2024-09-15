// Lets understand how login/signup works at facebook- first we send a request containing signup credentials to the facebook server
// (can be express/php/spring boot server)then those credentials are (stored in database) for login req those credentials are verified by 
// server, my matching them with the data stored in the database. Once the credentials are verified server sends a token that 
// is stored somewhere(in cookies) in the browser thet allows to have persistant sessions(user is logged in until he logs out). Now in every
// subsequent requests those stored tokens are send to server, we can send req to the server with token throug postman
// and the server will respond normally with the user data. This token is generated everytime we signin

// Whenever we send request to any endpoint of a website lets say 100xdevs, the endpoint is same for all users, but still 
// every user sees different content bcz of tokens. Based on token server identified=s who's sending the request and displays 
// data accordingly
// Sending tokens in requests is much secure as compared to sending userneame and password in every rq, if token somehow
// gets leaked it can be revoked by logging out and logging in again

// My tokens are stored in the browser and all the users token is stored in the server

// what type of data do we put in headers, all those data which is common for all requests, such as authorization, content type
// so that we dont need to write it again and again in the body of req

const express=require("express");//epress library exports a fn which is then called to create instance of app
const jwt=require("jsonwebtoken");

const JWT_SECRET="randomSecret" //creating a jwt secret for sign

app=express();

let users=[]

function getToken(){
    // return Math.random();//can use uuidv4() or any logic to generate token
    let token=''
    tokenOptions=['0', '1', '2', '3', '4', '5', '6', '7', '8', '9','a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',  'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',  'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z','-','_']
    for(let i=0;i<40;i++){
        token+=tokenOptions[Math.floor(Math.random() * tokenOptions.length)];
    }
    return token;
}

app.use(express.json());//this middleware parses the post body

app.post("/signup",(req,res)=>{//no token is generated on signup
    //here we can use zod for input validation, for leng of ue=sername,pass etc etc
    if(req.body.username&&req.body.password){
        let found=users.find(user=>user.username===req.body.username);
        if(!found){
            token=getToken()
            users.push({
                username: req.body.username,
                password: req.body.password,
                // token: token //stores the most recent token generated 
            });

            res.json({
                message: 'Signup Complete, enjoy!!!',
                // token: token
            });
            console.log(users);
            return;
        }
        else{
            res.json({
                message: "User already exist"
            });
            return;
        }
    }

    else{
        res.json({
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
                // can store multiple things here
            },JWT_SECRET); //now this jwt token already contains username details
            
            // token=getToken(); //stateful token
            // found.token=token; //no need to do this now since jwt is stateless token, it itselvs store its state

            let indexNo=users.findIndex(user=>user.username===req.body.username);
            users[indexNo]=found;
            res.json({
                message: "User SignedIn succesfully!!!!",
                token: token
            })
            console.log(users);
            return;
        }
        else{
            res.json({
                message: "SignedIn Failed!!!! as either user doesn't exist or password is incorrect"
            })
            return;
        }
    }
    else if(req.body.token){
        // not a good practice to signin using token, it should just be used to authenticate user from the req in header and must 
        // be changed after every login
        let found=users.find(user=>user.token===req.body.token);
        if(found){
            res.json({
                message: "SignedIn Succefull using token!!!!"
            })
            console.log(users);
            
            return;
        }
        else{
            res.json({
                message: "SignedIn Failed!!!! Invalid Token"
            })
            return;
        }
    }
    
    else{
        res.json({
            message: "SignedIn Failed!!!! No username password or token provided"
        })
        return;
    }

    
});

app.get("/me",(req,res)=>{
    let reqToken=req.headers.Authorization;
    let decodedInformation=verify(reqToken,JWT_SECRET); //this will return whatever we had encoded, if the req has this it means user is already logged in so no need to do login logic again
    username=decodedInformation.username;

    // found=users.find(user=>user.token===reqToken);
    found=users.find(user=>user.username===username);//now server knows which user has requested but for other details like paddword it still has to hit database
    if(found){
        res.send(`Hello ${found.username}. Your Password is ${found.password}`);
    }
    else{
        res.send("Invalid Token")
    }
})

app.listen(3000);
// So basically i can share my cookies with anyone and he will be able to send req to the website endpoint on my behalf, this can
// be used to share  videos, but nah sending this req on postman doesnt display any video
// Basically sharing cookies are very dangerous



// Now lets talk about JWT(json web token):
// why use jwt: with the stateful(stored in a state somewhere) token approach, we store everything along with token in database, now for every authanticated 
// request we will have to look up database for the token which will become very costly real quick

// Solution: what if the token itself contains the username details, and token can be decrypted back to username
// JWTs are compact and self contained(inside of the token username is contained) way to represent information, commonly used for
//  authentication
// JWTs are encoded not encrypted
// JWTs are stateless, they store all the data
// NOTE NEVER COMPARE JWTS CONTAINs all the infor for authentication so server doesn't need to store session data, all the data
// is present in the token itself
// Jwts can be stored in cookies or authorix=zation headers

// Does this makes databases useless, no! databases are used to store data of the site images, videos, etc etc, jwt just makes
// the authorization on the server itself, no need to hit database for that

// Let's understand the authorization workflow with jwt,

// First the user signups and the request is sent to server and if username is unique it gets stored in the database
// When user sends the login request the login credentials which are stored on database are verified by sever, if
// credentials are correct the server generates the jwt token and sends back the token to the browser(client), which gets stored
// in cookies. Now whenever user any endpoint like '/me' the jwt token is sent as req headers, this jwt token is then decoded
// on the server to get the username, theres no need to hit database as if the user has jwt it means he has already signuped on the 
// website so no need to send req to database for authantication, however server can send requests to database fot the contents
// stored and required. This is how jwt reduces the hitting of database for authentication

// JWT is same as encryption, it also requires key to encode and decode the token, to spit some jibberish, this key can be used 
// to decode the token, like in encryption/decryption