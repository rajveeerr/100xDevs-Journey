const { Router } = require("express"); //same as writing const Router= require("express").Router using this router, router is a modular route handler, it allowws to group and organise seperate route handelers from main app instance, and can be mounted over the app instance
const adminMiddleware = require("../middleware/user");
const router = Router(); 
const fs=require("fs");
const path=require("path");

todoJson=path.join(__dirname,"../database/todos.json");


router.post('/tasks', adminMiddleware, (req, res) => {
//received payload will look like this, {id,name,decsription,due,category,completed,status,priority}, id will be generatd on the server and username is taken from the auth middleware
//allUsersData=[{username: "this is basically user id",name: "smthn", profileImg: "", todos: [{id,name,description,due,category,completed,status,priority},{id,name,decsription,due,category,completed,status,priority}]},{username: "user2",todos: []}];
    
    let receivedPayload=req.body;

    if (!receivedPayload.name || !receivedPayload.due || !receivedPayload.category){
        return res.status(400).json({ 
            message: "Missing required fields" 
        });
    }

    // let taskId=uuidv4();
    let newTask= {
        // id: taskId,
        id: receivedPayload.id,
        name: receivedPayload.name,
        description: receivedPayload.description,
        due: receivedPayload.due,
        category: receivedPayload.category,
        completed: receivedPayload.completed || false,
        status: receivedPayload.status || 'pending',
        priority: receivedPayload.priority || 'medium'
    };
    
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
        data: userData.todos,
        id: receivedPayload.id
    });

});

router.put('/tasks', adminMiddleware, (req, res) => {
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
            data: userData.todos,
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

router.delete('/tasks', adminMiddleware ,(req, res) => {
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

router.delete('/tasks/:id', adminMiddleware , (req, res) => {
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
        res.status(200).json({
            message: `Deleted the Todo.`,
            id: taskIdToDelete,
            data: userData.todos
        });
    }
    else{
        res.status(404).json({
            message: `Couldn't delete the non-existing Todo with invalid id.`,
            id: taskIdToDelete
        });
    }
    
});


router.get('/tasks', adminMiddleware , (req, res) => {
    // Implement fetching all todo logic
    userData=req.userData;
    res.json({
        "allTasks": userData.todos
    });

});

router.get('/tasks/:id', adminMiddleware , (req, res) => {
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

router.get("/me", adminMiddleware ,(req,res)=>{//for displaying username and profile image
    username=req.username;
    userData=req.userData;
    res.json({
        username: username,
        name: userData.name,
        profileImg: userData.profileImg,
        data: userData.todos,
    })
})

module.exports = router;