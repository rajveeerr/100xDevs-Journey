// Lets understand how login/signup works at facebook- first we send a request containing signup credentials to the facebook server
// (can be express/php/spring boot server)then those credentials are stored in database if valid, for login req those credentials are verified by 
// server, my matching them with the data stored in the database. Once the credentials are verified server sends a token that 
// is stored somewhere(in cookies) in the browser thet allows to have persistant sessions(user is logged in until he logs out). Now in every
// subsequent requests those stored tokens are send to server, we can send req to the server with token through postman
// and the server will respond as the user has logged in. This token is generated everytime we signin

// Whenever we send request to any endpoint of a website lets say 100xdevs, the endpoint is same for all users, but still 
// every user sees different content bcz of tokens. Based on token server identifies who's sending the request and displays 
// data accordingly
// Sending tokens in requests is much secure as compared to sending username and password in every req, if token somehow
// gets leaked it can be revoked by logging out and logging in again

// My tokens are stored in the browser and all the users token is stored in the server db

// what type of data do we put in headers? all those data which is common for all requests, such as authorization, content type
// so that we dont need to write it again and again in the body of req

const express=require("express");//express library exports a fn which is then called to create instance of app
const jwt=require("jsonwebtoken");

const JWT_SECRET="randomSecret"; //creating a jwt secret for sign

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
    //here we can use zod for input validation, for leng of username,pass etc etc
    if(req.body.username&&req.body.password){
        let found=users.find(user=>user.username===req.body.username);
        if(!found){
            // token=getToken();
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
            
            token=jwt.sign({ //aise to we can story any data here, but only id is stored and every data whichh can be dynamically changed by multiple clients are store in the database, like if i start storing data in jwt and if user logs in to mobile and changest password it will never sync will all clients
                username: req.body.username
                // can store multiple things here, but only should encode user id
            },JWT_SECRET); //now this jwt token already contains username details, hence stateless
            
            // token=getToken(); //stateful token, as this will be stored in the db, and will be checked for every subsequent reqs
            // found.token=token; //no need to do this now since jwt is stateless token, it itselvs store its state

            // let indexNo=users.findIndex(user=>user.username===req.body.username);
            // users[indexNo]=found; //no need to store the jwt tokem in the server
            res.json({
                message: "User SignedIn succesfully!!!!",
                token: token
            })
            console.log(users+" : "+token);
            return;
        }
        else{
            res.json({
                message: `SignedIn Failed!!!! as ${found?'Password is incorrect':'User doesn\'t exist! signup first'}  `
            })
            return;
        }
    }
    // else if(req.body.token){  //this doesnt work like that no one uses tokens to signin
    //     // not a good practice to signin using token, it should just be used to authenticate user from the req in header and must 
    //     // be changed after every login
    //     let found=users.find(user=>user.token===req.body.token);
    //     if(found){
    //         res.json({
    //             message: "SignedIn Succefull using token!!!!"
    //         })
    //         console.log(users);
            
    //         return;
    //     }
    //     else{
    //         res.json({
    //             message: "SignedIn Failed!!!! Invalid Token"
    //         })
    //         return;
    //     }
    // }
    
    else{
        res.json({
            message: "SignedIn Failed!!!! No username or password provided"
        })
        return;
    }

    
});

app.get("/me",(req,res)=>{
    let reqToken=req.headers.authorization;
    // console.log("Request header: "+reqToken+" "+JSON.stringify(req.headers));
    
    let decodedInformation=jwt.verify(reqToken,JWT_SECRET); //this will return whatever we have encoded, if the req has this it means user is already logged in so no need to do login logic again
    // why do we need JWT_SECTET to decode token, as we've already seen that jwt.io site decodes the jwt without the secret key,
    // site uses jwt.decode(reqToken) to do that, decode fn doesnt require JWT_SECRET to decode
    username=decodedInformation.username;

    // found=users.find(user=>user.token===reqToken);
    found=users.find(user=>user.username===username);//now server knows which user has requested but for other details like password it still has to hit database
    // we dont need to do this to check if the user exists in database or not if user has token that means user exists,
    // but sometimes like if the database resets or something happens, for that we might need to check that
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

// Now lets talk about JWT(json web token):--
// why use jwt: with the stateful(stored in a state somewhere) token approach, we store everything along with token in database, 
// now for every authanticated request we will have to look up database for the token which will become very costly real quick

// Solution: what if the token itself contains the username details, and token can be decrypted back to username
// JWTs are compact and self contained(inside of the token username is contained) way to represent information, commonly used for
//  authentication
// JWTs are encoded not encrypted
// JWTs are stateless, they store all the data
// NOTE: NEVER COMPARE JWTS WITH ENCRYPTION, as JWT CONTAINs all the information for authentication so server doesn't need to 
// store session data, all the data is present in the token itself
// Jwts can be stored in cookies or authorization headers

// Does this makes databases useless, no! databases are used to store data of the site images, videos, etc etc, jwt just makes
// the authorization on the server itself, no need to hit database for that

// Let's understand the authorization workflow with jwt,

// First the user signups and the request is sent to server and if username is unique it gets stored in the database
// When user sends the login request the login credentials which are stored on database are verified by server, if
// credentials are correct the server generates the jwt token and sends back the token to the browser(client), which gets stored
// in cookies. Now whenever user hits any endpoint like '/me' the jwt token is sent as req headers, this jwt token is then decoded
// on the server to get the username, theres no need to hit database, as if the user has jwt it means he has already signuped on the 
// website so no need to send req to database for authantication, however server can send requests to database fot the contents
// stored and required. This is how jwt reduces the hitting of database for authentication

// JWT is same as encryption, it also requires key to encode and decode the token, to spit some jibberish, this key can be used 
// to decode the token, like in encryption/decryption

// JWT can be decoded easily without secret key on jwt.io, but kirat says its secure

// JWT is not specific to only node js, any other server running java, golang can use this jwt, the catch is they muast have same 
// JWT SECRET. One possible usecase: User can hit node js server to signin and generate jwt, then send the requests containing 
// jwt token to java/golang server.

// COOKIES: Cookies(only used in browser) are special types of headers, which stores token along with data, when server sends 
// specific type of response-header jaise, {set-cookie: "dcscs"}, browser saves the header as cookie and it then for every
// subsequent request browser makes sure to send the cookie as the request-header with key cookie. I f the cookie gets deleted
// we get logged out. If we relogin new token will be generated

// Our approach is to explicitely store token in the local storage and get the token from local storage and send the fetch request
// with the token as header, this works best as compared to the cookie approach as mobile browsers doesnt automatically stores
// set-cookie request and doent send it everytime as request headers

// JWT secret should not be shared with anyone, as whoever has this secret they can issue tokens for a particular username or 
// payload on our behalf, by using jwt.sign({payload},secret)

// Acess tokens are short lived they changes after a short amount of time, so that even if they get leaked there should not be
// any problem, Refresh tokens are used to refresh the acess token after some time, if someone gets refresh token thats a problem

// If i have acess of someone's , machine i can have acess to their cookies, localstorage and can use those to login as them
// sites can prevent this by browser fingerprinting but what if i copy whole browser's code only way to prevent me from acessing
// someone else's account using their cookiest is by ip-checks if the same user is logging in with different ips

// jwt saves roundtrip to server this is how

app.get("/courses",(req,res)=>{
    //if jwt is not used
    // first call to database for getting the username from token
    // first call can be avoided by using jwt as it can be decoded to get username and hence saving one roundtrip to db

    // second call to database to get the details of the user
})

// To logout any user we can simply remove the token fron the fe, and that user will have to login again, this is ugly way
// Clean way will be to store the tokens in datbase and to logout the token from the database as well

// Is storing tokens in local storage safe??? It is mildly safe if our site allows users to inject js, the can read through localstorage
// to get the token(to prevent this make the site secure), to one can say http only cookies cannot be read this way
// conventially http-only-cookies>>>>localstorage jwts

/* But heres a better way to say this:
yes storing your token in localStorage is vulnerable to XSS

but I can also wreak havoc by making requests on your behalf(and reset the pass) if you store your token in an httpOnly cookie

XSS wrecks you either way
 */

// For otp login we can use firebase