// lets understand the doctor's logic
// a doctor acquires some skill, and sets up a clinic or hospital to make its skill acessible to the world so that
// everyone in the world can benifit from there skills. To navigate to a doctor an user first search his/her's 
// address on internet and the go to the door of clinic, enters through door to waiting area, doctor is single
// threaded it examines single patient at a time. From waiting area you enter in doctor's cabin it deligates you a task
// asynchronously(it doesn't wait for you to complete your task, it sees other patients in the meantime), once your
// delegated task gets complete you get to waiting area again and wait for your turn after your issue gets resolved

function calculateSum(n){
    let ans = 0;
    for (let i = 1; i<=n; i++) {
        ans = ans + i;
    }
    return ans;
}
// Your relative using you like a patient
// Relative doesn't need to find your address,
// They stay in the same house
let ans = calculateSum(10);
console.log(ans); //just using the logic locally on our machine, this isn't availaible for public just like 
// the doctor treating relatives, they don't need to find their addresses the live in same house

// But what if one want to expose this logic to world
// They'll have to create HTTP server using http(hypertext transfer protocol), to transfer some files over internet
// to user

// How to create HTTP server??? Using express, although it can be created using spring boot, or using any different 
// package in node, express isn't the only one






const express=require("express"); // express is just a library that encapsulates the capacity of creating a server, allows our code to be exposed over http
const app=express(); //opening the clinic
// app.get("/",(req,res)=>{ //this callback fn gets called everytime an user requests for the site, / - allows us to create route to listen requests it can be anything like /asdasd
//     res.send("Hello Mofin World"); //make sure to send response in the form of a string, otherwise some error might be generated
// }) //Exposing the doctors one functionality(kidney surgery, brain surgery) Doctor could have multiple rooms inside their hospital, this is one of them
// app.listen(3000);  //port at which the server listens(this is the address of the clinic), this makes the node js 
// process running for a longer period of time, so that its alive to cater new requests

// Http servers can be created using node js, python, java but they should have unique address otherwise on one address 
// multiple functionality will collide, and only one of those server will become active

// I can make my algorithm availaible for everyone and if the want to acess that they can simply send a request to 
// address(port) and i will respond with the message, if multiple people are sending messages they have to wait in a 
// queue and wait for their previous tasks to complete

// This http server isn't open for everyone yet!! its accessable for everyone on same network, so i can use my phone 
// to send the request to the http server using address(port 3000) through router and my laptop running the logic 
// responds to the request made my my phone, benifit?? I can run expensive operation on mac and give it to phone

// Taking Input as Query parameters:
// after final route localhost/3000/smthn use a ?a=1&&b=2&&c=3 to give parameters, localhost is the ip of my own machine
function sum(n){
    return n/2*(2+(n-1)); //sum upto n
}

// const express=require("express");
// app=express();
// app.get("/",(req,res)=>{ //route handeler
//     //when someone requests for the site the control reaches here and we can respond that 
//     // req object=> request(includes all the headers in query), res object=> response(what status code to send, what data to send etc etc, wiil be in res)
//     let n=req.query.n;
//     res.send("The sum of numbers upto "+n+" is "+sum(n).toString()); //for sending text
//     res.json({detail: 'somth here', status code: 200}); //for sending JSON Object
//     res.send(<b>This is HTML</b>); //for sending HTML

//     can only send to client once the first send will send data and the later ones will produce error

//     //if theres any error express will automatically send status code 500
// })
// app.get("/asd",(req,res)=>{ //route handeler for /asd endpoint 
//     let n=req.query.n;
//     res.send("The sum of numbers upto "+n+" is "+sum(n).toString());
// })

// app.listen(5500);//i am listening infinitely, whenerver req comes to / or /asd endpoint(routs) ill repond with some data


// Request Methods:
// GET- used for asking something from the server
// POST- used when i want to put some data to the backend
// PUT- whenever we want to update a data on the server
// DELETE- delete smthn on the server

// Status Codes:
// 200 - Everything went fine(in 200 series)
// 404 - if the route is not present,(or no route handeler)
// 500 - something went wrong while the process was running
// 403 - not allowed to send requests
// 411 - Inputs were incorrect, wrong person came to surgery



// Let's Create the Hospital Enquiry


// const express=require("express");  //did this already
// const app=express();

let users=[{ //storing data in memory(i.e using variables), ideally we should be using database, this will we updated and maintained as long as the node server(or program) is running once it'll stop this will reset
    name: "Diya",
    kidneys: [{healthy:true},{healthy:true}],

}]

app.use(express.json());//concept of middleware will get to know abt it soon

//populer way to take input in this request method is: query
app.get("/",(req,res)=>{//so this is basically similar to what those api servers were responsing, they were sending json data
    let username=users[0].name;
    const userKidneys=users[0].kidneys;
    let noOfKidneys=userKidneys.length;
    let noOfHealthyKidneys=userKidneys.filter(kidney => kidney.healthy).length;
    let noOfUnhealthyKidneys=noOfKidneys-noOfHealthyKidneys;
    
    res.json({ //used res.json instead of res.send to sent a json(javascript object notation) data
        username,
        noOfKidneys,
        noOfHealthyKidneys,
        noOfUnhealthyKidneys
    });
})

//popular way to take input in post request method is body, we send the data in the body
app.post("/",(req,res)=>{ 
    const isHealthy=req.body.isHealthy;
    users[0].kidneys.push({healthy: isHealthy});
    res.json({
        msg: "Done" //the request method isnt required to respond with any data, it is just supposed to put data to server
        //after this whenever someone sends a get request they will get the updated response
    })//including this is a must, whether you send any data or not

    // now the main question is how to send post requests, answer: using postman for now
})

//backend servers aren't just accessible only by browsers, they can be hit by postman, another node process, mobile phone, other backend processs etc etc
// now multiple clients can send data to the server and can get update the database or inmemory variable and can see those changes
app.put("/",(req,res)=>{//put route handeler
    let noOfUnhealthyKidneys=users[0].kidneys.filter(kidney => kidney.healthy===false).length;
    if(noOfUnhealthyKidneys){
        users[0].kidneys.forEach(kidney => {
            kidney.healthy=true;
        });
        res.json({
            msg:"updates all kidneys to healthy",
            users
        })
    }
    else{
        res.status(411).json({
            msg: "You have no Unhealthy Kidneys"
        })
    }
})

app.delete("/",(req,res)=>{
    //if theres no unhealthy kidney we should return ststus code 411-for wrong input(basically the best practice is ki we should be checking all edge cases and respond accordongly)
    let noOfUnhealthyKidneys=users[0].kidneys.filter(kidney => kidney.healthy===false).length;
    if(noOfUnhealthyKidneys>0){
        users[0].kidneys=users[0].kidneys.filter(kidney=>kidney.healthy);
        res.json({
            msg: "deleted unhealthy kidneys"
        })
    }
    else{
        res.status(411).json({
            msg: "You have no bad kidneys"
    });
    }
})

app.get("/:filename",(req,res)=>{//:filename - called wildcard, allows to this route to catch anything comes after/
    filename=req.params.filename;
})
// Should always include status codes, like one can be added to put if theres no unhealthy kidneys. Using status codes is a good practice
app.listen(6969);
