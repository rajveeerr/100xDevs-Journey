// Express, Spring Boot(Java), flask(python), Gurella(Go) and Actix-Web(Rust) are the library used to create http servers

//Whenever we type google.com in our browser we send request through router and fiber optics cable to the http server 
// present at the ip address which the google.com(domain name) resolves to. That http server then responds with 
// the html, css and js files stored on the server along with the images and assets which gets rendered on the browser
//  and google.com is visible to us. All this communication between our machine and web server in hapenning through
//  http protocol(i.e. servers are talking to each other using http protocol), to verify this goto

// chrometools => network  => explore this tab

// A client(you asking for content) talking to(sending requests) the server(machine that is processing the request and
// responding back with the content), this is called request response model. 

// Various other Protocols:
// - WebSocket
// - WebRTC
// - GRPC


// Domain Names (x.com, 100xdevs.com)are the way to reach the servers, ip addresses are underlying under them, dns 
// resolves ip to domain name, this dns resolution happens on the local machine, means one can easily cange it by
// writing this in terminal: sudo vi /etc/hosts

// Ip addresses are the address of the machine(server) hosting the content, to find ip of a site use
// ping google.com on the terminal, if multiple sites have save addresses they are probably hosted on same server

// Steps to create a website:
// rent a server(aws) whenever you'll run that server it will generate an ip address
// buy a bodain name for that server
// point the domain name to the ip address

// PORTS
// in networking port is a logical endpoint on a machine(server) used by protocol to identifyspecific processes running 
// on a computer or a (react,html,express)server. They help direct network traffic to the correct application or
//  service on a system.

// In case of app.100xdevs.com and projects.100xdevs.com the port is same 443 but this doesn't mean that the node 
// processes are same for them as well, the port 443 is running nginx which redirects te request to the fspecific
// process based on the place from where the request was came from, this is called reverse proxy

// Good practice is to deploy website on the port 443

//Methods to send request to servers, get, post, put(to create/update data), delete(CRUD), patch(just to update): these practices are good to follow but not necessary

// default ports:
// http=> 80
// https=> 443
// ssh=> 22

// Response
// The response represents what the server returns you in response to the request. can be html,css,js file or a 
// json(js object notation: used for data interchange), a string etc

// For ed: when you scroll down on linkedin the request is sent to server for netx 3(or smthn) posts, the server 
// responds with json data(can be stored in state variable and rendered into components) most of the times

// Status Code
// A 3 digit number sending the outcome of the requests
// -200(series): req was succesful, server returned the requested resource
// -204: request was sussesful, no content to respond with
// -301(300series-Redirection): moved permanently- The requested resource has been moved to a new URL permanently. 
//                              The client should use the new URL provided in the response.
// -304 Modified: The resource has not been modified since the last request. The client can use the cached version.
// Errors Happen-
// -400(series-your(client) fault): 400- bad request(invalid syntax), 401- unauthorised, 403-forbidden, 404- not found
// -500(series-server(out) fault): smthn wwent wrong executing the process
// -411: incorrect input

// We should use status code correctly: some companies send status code 200 and respond with error: true in body

// Body of Requests

// Body(or payload) of requests (prolly using post/put methods) contains the actual data(in json or string) being sent 
// to the server, we can inspect the body by using dev tools and getting in the payload section

// Routes

// In the context of HTTP, routes are paths or endpoints that define how incoming requests are handled by a server. 
// Routing is a mechanism used to direct incoming HTTP requests to the appropriate handler functions or resources 
// based on the URL path.

// Headers
// Headers are all the metatadata about the message included in requests as well as responses, these metadata cound be 
// included in the body it is a good idea to include everythind in header that isn't related with application logic

// Http vs hTTPS:
// In http all the requests and response are sent in plain text FormData, on can easily sniff and read read them, whereas
// in https the request and response data is encrypted before transmitting hence making them secure