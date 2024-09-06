//Whenever we visit any website we send bunch of http requests to the ip of that site, the server of that site responds 
// to the request with multiple html,css and js, or other assets files. On one machine can be running multiple http
// servers handling multiple processes on different ports. If we want to go to one process w'll use ip of the machine
// with port number specific port number if we wanna go to another process well goto differt port 

// Headers
// Key value pairs containing b/w client and server all the metadata about the requests and response(payloads)
// Common Headers: 
// -Authorization(sends user auth requests), 
// -Content Type(type of info client is sending), this should be specified or the browser will get confused even if the request data is just json
// -Referer - url from which the req is cooming from

// Whenever i go to google.com, i am not sending any authoriisation details bit google still knows its me that's so because
// brower silently send cookies data to google in header section of the request and google thwn got to know me

// cookie contains authorization info, it doesnt contaiin useername and passowrd it contains tokens, and one can use
// cookie to log into someones acc temporarly, until

// There are two ways to send requests to http server:
// . From browser url, initial requests(these requests are prepared by browsers, with headers containing cookies, etc etc)
// . Background Requests, like for eg: when i goto linkedin.com i am sending request for the html of the site but when 
// i scroll on the site more requests are send to the server which are triggered by the scroll event listener
// this background requests are made using fetch api wiz provided by the browsers like those settimeout, setInterval apis
// provided by browsers

// Fetch: this is the fn provided by the browsers which requests data from the server,fetch fn returns a promise because
// fetching data from a server takes time as request travels through bunch of wires and reach server which authorises
// and does stuff then send back response data. So to make sure the execution of program ins't hung for that long this is a 
// promise that is returned by fetch. 
// Fetch is sort of a http client 

// const data=fetch("url/to/site");

// // now the default method of this request will be GET and no header or body will be sent wih the req
// // to change method or send headers and body one can use this syntax
// const postData=fetch("random.url",{
//     method: "Post",
//     headers:{
//         cookie: "smthn"
//     },
//     body: {
//         data: "json",
//         key: "value-pair"
//     }
// })
async function gettingData() {
    const result=await fetch("https://jsonplaceholder.typicode.com/todos/");//awaiting this bcz this returns a promise
    const actualResult = await result.json() //this also returns a promise //task: figure out why?? bcz it takes time to convert a large amt of data into json, find if there are any more reasons
    console.log(actualResult);

    // the above three lines are asyn await which means they are just syntactic sugars over promises they are same as
    
    // const resultT = fetch("https://jsonplaceholder.typicode.com/todos/").then((result)=>{
    //     result.json().then((actualResultT)=>{
    //         console.log(actualResultT);
    //         console.log("Done Fetching Data");
            
    //     })
    // })
    

}



// gettingData()

// creating local http server

const express=require("express");
const app=express()


/* 
app.use('/admin', function (req, res, next) { // GET 'http://www.example.com/admin/new?a=b'
  console.dir(req.originalUrl) // '/admin/new?a=b' (WARNING: beware query string)
  console.dir(req.baseUrl) // '/admin'
  console.dir(req.path) // '/new'
  console.dir(req.baseUrl + req.path) // '/admin/new' (full path without query string)
  next()
})
var fullPath = req.baseUrl + req.path; */
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

// one can enter inputs like this as well localhost:3000/multiply/1/2
app.get("/multiply/:a/:b",(req,res)=>{
    a=parseInt(req.params.a);
    b=parseInt(req.params.b);
    res.json({answer: multiply(a,b)}) //multiplying two strings is just fine we dont need to parse it to int
})
app.get("/add",(req,res)=>{
    a=parseInt(req.query.a);
    b=parseInt(req.query.b);
    res.send(`${add(a,b)}`)
    res.json({answer: add(a,b)})
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


app.listen(3000);


// AJAX stands for Asynchronous Javascript and Xml, introduced by browser to let user fetch data asynchronously from
// the backend an update frontend based on that data, in order to create sub pages on a single web page
