const express=require("express");
const cors=require("cors")
const app=express()

let count=0


function add(a,b) {
    return a+b;
}
function sub(a,b) {
    return a-b;
}
function multiply(a,b) {
    return a*b;
}
function divide(a,b) {
    return a/b;
}

/* MIDDLEWARES: (its not necessary)(biggest usecase is for authentication)
Middlewares are the fn which has acess to the request and response objects and the next function in request-response cycle
(users sends request, gets responded with data). Toh middlewares are the functions which comes in between of route handeler
and request, basically that means the requests first reach to the middlewares from there middleware can:
1. Modify the req or res objects
2. ending request response cycle, stops request before reaching route handeler
3. transfer the request to next handeler

1. it may or may not change the request object
2. It will
- Either stop the request right there
- Or forward the request to the real route handler

// Express function is a chain of middlewares, like in this code we are passing multiple functions as parameters
app.get("/multiply/:a/:b",(req,res)=>{
    countIncrease(req,res);
    a=parseInt(req.params.a);
    b=parseInt(req.params.b);
    res.json({answer: multiply(a,b)})
    })

    Note: In js parameters are passsed by reference
    
    */
   
app.use(cors({
    domains: ["http://127.0.0.1:5501/100xDevs-Journey/Assignments%20+%20ClassNotes/Week5/public/basicFullstack.html","google.com"], //allow cors for these list of domains
    hosts: []//allow cors from these hosts
}))//cors method allows cross origin resourses to be shared

// Cors is required when front and backend are hosted on different servers/domains, if both fronntend and backend
// are hosted on same server no cors will not be required

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/basicFullstack.html"); //this will allow to host html on same express server
})
   

function countIncrease(req,res,next){//middleware fn
    count++;
    console.log(`Total number of requests made: ${count}`);
    req.name="Rajveer"; //modifying req obj
    next();//this will call the next function passed to the middleware, if this is not called here the next fn to middleware will also not get called
    if(1==2){// this block will never run
        res.json({message: "I ended the req - res cycle early"});// middleware can stop req res cycle, this can be used for authontication purpose, llike if someone wants to acess a route we can check if he should be allowed to acesss that route or not
    }
    // ideally we should wither call next() fn or send a res.json(), else the user will get hung
}

function reqInfo(req,res,next){//middleware fn
    console.log(`Url of the request: ${req.hostname}${req.originalUrl}`);//req.hostname to het domain name, req.originalUrl to get the route
    console.log(`Time of the request: ${(new Date)}`);
    console.log(`Method of the request: ${req.method}`);
    console.log(`Status Code of Response: ${res.statusCode}`);//to get the status code of request
    next();
}

function realSumHandeler(req,res){//final route handeler
    a=parseInt(req.params.a);
    b=parseInt(req.params.b);
    res.json({answer: a+b})
    console.log(req.name);
    
    
}


app.get("/sum/:a/:b",countIncrease,realSumHandeler); //in the fns before last handeler there should be three parfamaters req,res, next 
// In last handeler usually we should pass two parameters req and res

// First the control will reach at countIncrease and if the countIncrease wants then the control will reach realSumHandeler


app.get("/admin",(req,res)=>{
    res.send(`Total number of requests made to the server: ${count}`);//this will not inc the count aas the middleware gn is not get called
})    

// To use middlewares for every route handeler either to we can call it for each function, or we can do this

app.use(countIncrease);//calles middleware for every end points that comes after it
app.use(reqInfo);


// this is basics of creating raw endpoints in express, we can learn more things like middlewares, databases, better routing

// app.get("/multiply/:a/:b",countIncrease,(req,res)=>{ //no need to call middlewares each time, as we created app.use(countIncrease)
app.get("/multiply/:a/:b",(req,res)=>{
    a=parseInt(req.params.a);
    b=parseInt(req.params.b);
    res.json({answer: multiply(a,b)});
})

app.get("/divide",(req,res)=>{
    a=parseInt(req.query.a);
    b=parseInt(req.query.b);
    res.json({answer: divide(a,b)})
})
app.get("/subtract",(req,res)=>{
    a=parseInt(req.query.a);
    b=parseInt(req.query.b);
    res.json({answer: sub(a,b)})
})

// let express={
//     json: function (){
//         return function (req,res,next){}; ///express signature
//     }
// }

// postman is a tool for api testing and debugging
// in express if we want to send json data we need to first parse JSON data
//  this can be done by using express.json() middleware, this middleware modifies the res data
app.use(express.json());//here we are calling express.json() fn unlike above where we were passing function name, because as calling express.json() it returns another function to be used as middlewares
// alternative of this will be using body-parser library

app.post("/floor",(req,res)=>{
    console.log(req.body);//will return undefined if express.json middleware isn't used to parse body of request
    
    a=parseFloat(req.body.a);
    res.json({
        result: Math.floor(a)
    })
})



app.listen(3000);


/* Commonly Used Middelwares:

1. express.json(): express people used bodyParser library to create express.json()
2.cors: cross-origin resourse sharing

Most of the times the frontend of the webbsite and its express backend is hosted on different servers, so they have
different origins, cross-origin resourse sharing can be done using fetch api, but it should be blocked by default
for security reasons, aise to my site can send req to hdfc backend and it will process the req but this is a
vulnerability, so backend ideally blocks the req not coming from its frontend, this can be cerified by the referer 
key in the header it shows the origin of request. Only my frontend should be able to acess by backend, it should by
allowed to cors

in Node jS CORS requests are blocked by default

CORS works in two step process, when we send request(let's say POST) then its pre-flight request which
// is responded by server with some headers, when this res header reaches the frontend the browser then sends the request
// to server, it browser protetcing us from shending requests to wierd domain






Hacking:

We can copy any request as curl and add it to postman as curl to start hacking
*/


