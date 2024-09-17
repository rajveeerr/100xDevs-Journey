const { Router } = require("express"); //same as writing const Router= require("express").Router using this router, router is a modular route handler, it allowws to group and organise seperate route handelers from main app instance, and can be mounted over the app instance
const adminMiddleware = require("../middleware/user");
const router = Router(); 
const fs=require("fs");
const path=require("path");
const { v4: uuidv4 } = require('uuid');

todoJson=path.join(__dirname,"../database/todos.json");

router.use(adminMiddleware);

router.post('/tasks', (req, res) => {
//received payload will look like this, {name,decsription,due,category,completed,status,priority}, id will be generatd on the server and username is taken from the auth middleware
//allUsersData=[{username: "user1",todos: [{id,name,description,due,category,completed,status,priority},{id,name,decsription,due,category,completed,status,priority}]},{username: "user2",todos: []}];
    
    let receivedPayload=req.body;

    if (!receivedPayload.name || !receivedPayload.due || !receivedPayload.category){
        return res.status(400).json({ 
            message: "Missing required fields" 
        });
    }

    let newTask={};
    let taskId=uuidv4();
    newTask.id=taskId;
    newTask.name=receivedPayload.name;
    newTask.description=receivedPayload.description;
    newTask.due=receivedPayload.due;
    newTask.category=receivedPayload.category;
    newTask.completed=receivedPayload.completed;
    newTask.status=receivedPayload.status;
    newTask.priority=receivedPayload.priority;
    
    let userData=req.userData;
    userData.todos.push(newTask);//adding new task to the user todos

    let username=req.username;

    let allUsersData=req.allUsersData;//retriving the contents of json file from auth middleware
    currentUserIndex=allUsersData.findIndex(user=>user.username===username);//finding the index of the current user in the json file
    allUsersData[currentUserIndex]=userData; //replacing the existing user data with the updated user data containing added task
    
    try{
        fs.writeFileSync(todoJson, JSON.stringify(allUsersData));
    } 
    catch(err){
        return res.status(500).json({ 
            message: "Internal server error. Couldn't save the data.", 
            error: err 
        });
    }

    res.status(201).json({
        message: "New Todo added.",
        id: taskId
    });

});

router.put('/tasks', (req, res) => {
// user can update everything so, payload will look like this {id, name,description,due,category,completed,status,priority}

    let username=req.username;
    let userData=req.userData;
    let allUsersData=req.allUsersData;//retriving the contents of json file from auth middleware
    let receivedPayload=req.body;
    if (!receivedPayload.name || !receivedPayload.due || !receivedPayload.category){
        return res.status(400).json({ 
            message: "Missing required fields" 
        });
    }
    let taskIdToUpdate=receivedPayload.id||null;
    let taskToUpdate=userData.todos.find(task=>task.id===taskIdToUpdate);

    if(taskToUpdate){

        // receivedPayload.name?taskToUpdate.name=receivedPayload.name:null;
        // receivedPayload.description?taskToUpdate.description=receivedPayload.description:null;
        // receivedPayload.due?taskToUpdate.due=receivedPayload.due:null;
        // receivedPayload.category?taskToUpdate.category=receivedPayload.category:null;
        // receivedPayload.completed?taskToUpdate.completed=receivedPayload.completed:null;
        // receivedPayload.status?taskToUpdate.status=receivedPayload.status:null;
        // receivedPayload.priority?taskToUpdate.priority=receivedPayload.priority:null;

        let updatedTask=Object.assign({},taskToUpdate,receivedPayload);
    
        let taskIndexToUpdate=userData.todos.findIndex(task=>task.id===taskIdToUpdate);//finding the index of the task/todo to update, in the userData, this --> {username: "user2",todos: []}
        // userData.todos[updatedTaskIndex]=taskIdToUpdate; //replacing the existing task data with the updated task data
        userData.todos[taskIndexToUpdate]=updatedTask; //replacing the existing task data with the updated task data
        
        currentUserIndex=allUsersData.findIndex(user=>user.username===username);//finding the index of the current user in the json file
        allUsersData[currentUserIndex]=userData; //replacing the existing user data with the updated user data containing updated task
        
        try{
            fs.writeFileSync(todoJson, JSON.stringify(allUsersData));
        } 
        catch(err){
            return res.status(500).json({ 
                message: "Internal server error. Couldn't save the data.", 
                error: err 
            });
        }
    
        res.status(200).json({
            message: `Updated the ${JSON.stringify(receivedPayload)} of existing Todo.`,
            id: taskIdToUpdate
        });
    }
    else{
        res.status(404).json({
            message: `Couldn't update the non-existing Todo with invalid id.`,
            id: taskIdToUpdate
        });
    }
});

router.delete('/tasks', (req, res) => {
    // Implement delete todo logic
    let userData=req.userData;
    userData.todos=[];

    let username=req.username;
    let allUsersData=req.allUsersData;
    currentUserIndex=allUsersData.findIndex(user=>user.username===username);
    allUsersData[currentUserIndex]=userData;

    try{
        fs.writeFileSync(todoJson, JSON.stringify(allUsersData));
    } 
    catch(err){
        return res.status(500).json({ 
            message: "Internal server error. Couldn't save the data.", 
            error: err 
        });
    }
    
    res.status(204).json({
        message: `Deleted all the Tasks.`
    });

});

router.delete('/tasks/:id',(req, res) => {
    // Implement delete todo by id logic
    let username=req.username;
    let userData=req.userData;
    let allUsersData=req.allUsersData;
    let taskIdToDelete=req.params.id;
    let taskToDelete=userData.todos.find(task=>task.id===taskIdToDelete);

    if(taskToDelete){

        userData.todos=userData.todos.filter(task=>task.id!=taskIdToDelete);
        
        currentUserIndex=allUsersData.findIndex(user=>user.username===username);
        allUsersData[currentUserIndex]=userData;//updating the changed user data in all users data 
        
        try{
            fs.writeFileSync(todoJson, JSON.stringify(allUsersData));
        } 
        catch(err){
            return res.status(500).json({ 
                message: "Internal server error. Couldn't save the data.", 
                error: err 
            });
        }
    
        res.status(204).json({
            message: `Deleted the Todo.`,
            id: taskIdToDelete
        });
    }
    else{
        res.status(404).json({
            message: `Couldn't delete the non-existing Todo with invalid id.`,
            id: taskIdToDelete
        });
    }
    
});


router.get('/tasks', (req, res) => {
    // Implement fetching all todo logic
    userData=req.userData;
    if(userData.todos){
        res.json({
            "allTasks": userData.todos
        });
    }
    else{
        res.status(404).json({
            message: `No Tasks Assigned yet for the user with username ${req.username}`
        })
    }

});

router.get('/tasks/:id', (req, res) => {
    // Implement fetching todo by id logic

    let userData=req.userData;
    let requestedTaskId=req.params.id;
    let requestedTask=userData.todos.find(task=>task.id===requestedTaskId);

    if(requestedTask){
        res.json({
            "taskDetails": requestedTask,
            "id": requestedTaskId
        });
    }
    else{
        res.status(404).json({
            message: `Couldn't display the non-existing Todo with invalid id.`,
            id: requestedTaskId
        });
    }

});

module.exports = router;