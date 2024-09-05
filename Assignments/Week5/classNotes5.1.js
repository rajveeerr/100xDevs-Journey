//Whenever we visit any website we send bunch ofhttp requests to the ip of that site, the server of that site responds 
// to the request with multiple html,css and js, or other assets files. On one machine can be running multiple http
// servers handling multiple processes on different ports. If we want to go to one process w'll use ip of the machine
// with port number specific port number if we wanna go to another process well goto differt port 

// Headers
// Key value pairs containing b/w client and server all the metadata about the requests and response(oayloads)
// Common Headers: 
// -Authorization(sends user auth requests), 
// -Content Type(type of info client is sending), this should be specified or the browser will get confused even if the data is just json
// -Referer - url from which the req is cooming from

// cookie contains authorization info

// There are two ways to send requests to http server:
// . From browser url, initial requests
// . Background Requests, like for eg: when i goto linkedin.com i am sending request for the html of the site but when 
// i scroll on the site more requests are send to the server which are triggered by the scroll event listener
// this background requests are made using fetch api wiz provided by the browsers like those settimeout, setInterval apis
// provided by browsers

// Fetch: this is the fn provided bt the browser which requests data from the server,fetch fn returns a promise because
// fetching data from a server takes time as request travells through bunch of wires and reach serveer which authorises
// and does stuff then send back data. So tto make sure the execution of program ins't hung for that long this is a 
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

gettingData()
