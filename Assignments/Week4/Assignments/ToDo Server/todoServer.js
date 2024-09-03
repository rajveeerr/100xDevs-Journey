/**
 * DONE: USED PROMISES TO READ AND WRITE TO FILE, Saved the todo in json file in case server crashes, CRUD Application USING HTTPS
//  * Learned object.assign(), uuid to generate id, json parse, stringify, find
 * 
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
  const express = require('express');
  const fileObj =require('fs');
  const { v4: uuidv4 } = require('uuid')
  const bodyParser = require('body-parser');
  
  const app = express();

  function promisifiedreadfile(filename){
    return new Promise((resolve,reject)=>{
      fileObj.readFile(filename,'utf-8',(err,data)=>{
        if(!err){
          resolve(JSON.parse(data));
        }
        else{
          reject(err);
        }
      })
    })
  }
  
  function promisifiedwritefile(filename,data){
    return new Promise((resolve,reject)=>{
      fileObj.writeFile(filename,JSON.stringify(data),(err)=>{
        if(!err){
          resolve();
        }
        else{
          reject();
        }
      })
    })
  }
  
  app.use(bodyParser.json());

  
  let usersData=[{
    user: 1,
    todos: []
  }];
promisifiedwritefile('todos.json',usersData);

  // sending details of todo
  app.get("/todos",(req,res)=>{
    promisifiedreadfile('todos.json').then((data)=>{
      usersData=data;
      todoItems=usersData[0].todos;
      res.status(200).json(todoItems)
    })
  })
 
  //sending detail of todo based on id
  app.get('/todos/:id',(req,res)=>{
    let requestedId=req.params.id;
    promisifiedreadfile('todos.json').then((data)=>{
      usersData=data;
      let todoItem=usersData[0].todos.find((todo)=>todo.id===requestedId);
      if(todoItem){
        res.status(200).send(todoItem);
      }
      else{
        res.status(404).send("404 Not Found");
      }
    })
  })

  //creating a new todo using post request
  // ctr=0
  app.post("/todos",(req,res)=>{
    let todoData=req.body;
    todoData.id=uuidv4(); //added id to the received json request
    promisifiedreadfile('todos.json').then((data)=>{
      usersData=data;
      usersData[0].todos.push(todoData);
      res.status(201).json({
        id: todoData.id
      })
      promisifiedwritefile('todos.json',usersData).then(()=>console.log("updated file"));
    })
    // ctr++;
  })
  app.put("/todos/:id",(req,res)=>{
    let requestedId=req.params.id;
    let reqData=req.body;
    promisifiedreadfile('todos.json').then((data)=>{
      usersData=data;
      let existingDataObj=usersData[0].todos.find((todo)=>todo.id==requestedId);//used == to compare string
      changingId=reqData.id||null;
      if((existingDataObj)&&!((usersData[0].todos.filter((todo)=>todo.id==changingId))&&changingId)){
        // let updatedData={...existingData,...reqData};//the seperator operator(...) joins two objects, if req and existing data contains same key the value of reqData will be overwrite the value of existing data: googled it
        let updatedData=Object.assign({},existingDataObj,reqData);//better way to do the same as above in case of same keys the value of reqData will overwrite the value of existingData
        usersData[0].todos=usersData[0].todos.filter(todo=>todo.id!=requestedId);
        usersData[0].todos.push(updatedData);
        res.status(200).json({
          message:"Updated todo",
          id: existingDataObj.id
        })
        promisifiedwritefile('todos.json',usersData).then(()=>console.log("Updated data of todo and added it to file"));
      }
      else{
        res.status(404).send("404 Not Found");
      }
    })
    })

  app.delete("/todos/:id",(req,res)=>{
    let requestedId=req.params.id;
    promisifiedreadfile('todos.json').then((data)=>{
      usersData=data;
      idFound=usersData[0].todos.filter(todo=>todo.id==requestedId);
      if(idFound&&requestedId){
        usersData[0].todos=usersData[0].todos.filter(todo=>todo.id!=requestedId);
        res.status(200).send();
        promisifiedwritefile('todos.json',usersData).then(()=>console.log("Todo deleted and added to file succesfully!!"))
      }
      else{
        res.status(404).send("404 Not Found");
      }
    })
    })

  app.get("*",(req,res)=>{ //"*" creares reoute handeler for every route that is not handeled above, googled it
    res.status(404).send('404 Not Found');
  })

  app.listen(4000);

  
  // There were multiple problems running this, one was that ki port 3000 was already in use, found it using this command: 'netstat -ano | findstr :3000' so i've changed it to 4000
  // To check what asynchronous operation was stopping jest from exiting i ran this in teerminal: npm run test-todoServer -- --detectOpenHandles, i got to know ki app.listen wast stopping jst form exiting
  // another error was ki i was sending json onject in responce to get request by id, i was supposed to send string(clearified by reading test cases)

  // 
  module.exports = app;