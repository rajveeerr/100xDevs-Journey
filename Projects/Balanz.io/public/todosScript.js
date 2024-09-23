let url="http://localhost:3000";
let tasks = [];
// tasks=[
//     {
    // id: jjjhv987mnbbmiyi,
//       name: 'Complete UI Design',
//       description: 'Design the UI for the new project',
//       due: '2024-09-30',
//       category: 'design',
//       priority: 'high',
//       status: 'completed' or 'in progress' 
        // completed: false
//     }];

function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
}

function collapse(){
    sidebar=document.getElementById("sidebar");
    hamberger=document.getElementById("hamberger");
    sidebar.classList.toggle("sidebar-collapse");
    hamberger.classList.toggle("hamberger-collapse");
}

function openModal(){
    document.getElementById("logoutModal").style.display="block";
}
    
function closeModal(){
    document.getElementById("logoutModal").style.display="none";
}

function logout(){
    localStorage.setItem("token","")
    window.location.href="/login";
}

function syncLoader(){
    let sync = document.getElementById('sync');
    sync.classList.toggle('show');
}

function showPopup(message,type='success') {
    let popupModal = document.getElementById('popup-modal');
    let popupMessage = document.getElementById('popup-message');
    
    if (type==='error'){
        popupMessage.innerHTML = `<i class="fa-solid fa-circle-xmark" style="color: #dc3545"></i>   ${message}`;
    } 
    else {
        popupMessage.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #05a571"></i>   ${message}`;
    }

    popupModal.classList.add('show');
    setTimeout(() => {
        popupModal.classList.add('fade-out');
    }, 2000);

    setTimeout(() => {
        popupModal.classList.remove('show', 'fade-out');
    }, 3000); 
}



let openedTaskId="";
function openAddEditModal(action,id){
    taskModal=document.getElementById("task-modal");
    if(action==="add"){
        taskModal.style.display="flex";
        document.getElementById("modalTitle").innerText="Add Your Task";
        document.getElementById("task-title").value="";
        document.getElementById("task-desc").value="";
        document.getElementById("due-date").value="";
        document.getElementById("priority").value="";
        document.getElementById("status").value="";
        document.getElementById("category-input").value="";
    }
    else if(action==="edit"){
        taskModal.style.display="flex";
        
        openedTaskId=id;
        document.getElementById("modalTitle").innerText="Edit Your Task";
        taskTitle=document.getElementById("task-title");
        taskDesc=document.getElementById("task-desc");
        dueDate=document.getElementById("due-date");
        priority=document.getElementById("priority");
        taskStatus=document.getElementById("status");
        category=document.getElementById("category-input");

        taskToEdit=tasks.find(task=>task.id===id);

        taskTitle.value=taskToEdit.name;
        taskDesc.value=taskToEdit.description;
        category.value=capitalize(taskToEdit.category);
        priority.value=taskToEdit.priority;
        // taskStatus.value = taskToEdit.status === "pending" ? "inprogress" : taskToEdit.status;
        taskStatus.value = taskToEdit.status;
        if(taskToEdit.due){
            const dueDateObj = new Date(taskToEdit.due);
            const formattedDate = dueDateObj.toISOString().split('T')[0];
            dueDate.value = formattedDate;
        } 
        else {
            dueDate.value = '';
        }
    }
}

async function saveAddEditModal(){

    let token=localStorage.getItem("token");

    const form = document.getElementById('task-form');
    if (!form.checkValidity()) {
        return;
    }
    
    taskTitle=document.getElementById("task-title").value;
    taskDesc=document.getElementById("task-desc").value;
    dueDate=document.getElementById("due-date").value;
    priority=document.getElementById("priority").value;
    taskStatus=document.getElementById("status").value;//todo,completed, pending
    category=document.getElementById("category-input").value;

    

    let id = crypto.randomUUID();
    
    let task={
        name: taskTitle,
        description: taskDesc,
        due: dueDate,
        category: category.toLowerCase(),
        completed: taskStatus==="completed"?true:false,
        // status: taskStatus==="inprogress"?"pending":"complete",
        status: taskStatus.toLowerCase(),
        priority: priority.toLowerCase()
    }

    if(document.getElementById("modalTitle").innerText==="Add Your Task"){
        task.id=id
        tasks.push(task);
        // console.log(tasks);

        try{
            syncLoader();
            let addedConfirmation=await axios.post(`${url}/tasks`,task,{
                headers: {
                    authorization: token
                }
            });
            addedConfirmationData=addedConfirmation.data;
            // console.log(JSON.stringify(tasks),JSON.stringify(editConfirmationData.data));
            // if(JSON.stringify(tasks)===JSON.stringify(editConfirmationData.data)){
            if(addedConfirmationData){
                syncLoader();
                showPopup("Task Created Succesfully!",'success');
            }
            else{
                syncLoader();
                showPopup("Changes Aren't Saved!",'error');
                console.log("data isnt synced");
            }
        }
        catch(err){
            syncLoader();
            showPopup("There was an error in creating Task. Try Again!",'error');
        }
        
    }
    
    else{
        let taskIndex = tasks.findIndex(t=> t.id === openedTaskId);
        task.id=openedTaskId;
        tasks[taskIndex] = task;
        console.log(tasks);
        
        try{
            syncLoader();
            let editConfirmation=await axios.put(`${url}/tasks`,task,{
                headers: {
                    authorization: token
                }
            });
            editConfirmationData=editConfirmation.data;
            // console.log(JSON.stringify(tasks),JSON.stringify(editConfirmationData.data));
            // if(JSON.stringify(tasks)===JSON.stringify(editConfirmationData.data)){
                if(editConfirmationData){
                    syncLoader();
                    showPopup("Edited Task Succesfully!",'success');
                }
                else{
                    syncLoader();
                    showPopup("Changes Aren't Saved!",'error');
                }
            }
            catch(err){
                syncLoader();
                showPopup("There was an error in creating Task. Try Again!",'error');

        }

    }
    // todo - send a put req to server to save the data and verify is the content is saved by response received
    //now add a popup saying task edited, added and syncing bar somewhere -done
    
    displayAllTasks(tasks);
    displayCompletedTasks(tasks);
    displayPendingTasks(tasks);
    document.getElementById("task-modal").style.display="none";
}


function closeAddEditModal(){
  taskModal=document.getElementById("task-modal").style.display="none";
}

window.onclick = function(event) {
//     taskModal=document.getElementById('task-modal');
    logoutModal=document.getElementById('logoutModal');
    if (event.target === logoutModal){
//         closeAddEditModal();
        closeModal();
    }
};

async function deleteTask(id){
    token=localStorage.getItem("token");

    tasks=tasks.filter(task=> task.id!=id);//deleted
    displayAllTasks(tasks);
    displayCompletedTasks(tasks);
    displayPendingTasks(tasks);

    try{
        syncLoader();
        let deleteConfirmation=await axios.delete(`${url}/tasks/${id}`,{
            headers: {
                authorization: token
            }
        });
        deleteConfirmationData=deleteConfirmation.data;
        console.log(deleteConfirmationData);
        
        if(deleteConfirmationData){
            syncLoader();
            console.log("Data Synced Succesfully");
            showPopup("Task Deleted Succesfully!",'success');
        }
        else{
            syncLoader();
            console.log("data isnt synced");
            showPopup("Changes Aren't Saved!",'error');
        }
        }
        catch(err){
            syncLoader();
            console.log("data isnt synced. There was an error"+err);
            showPopup("There was an error in Deleting Task. Try Again!",'error');
    }
}

async function markAsComplete(id,toStatus="completed"){
    token=localStorage.getItem("token");

    let updateTask=tasks.find(task=> task.id===id);
    updateTask.status=toStatus;
    let indexToUpdate=tasks.findIndex(task=> task.id===id);
    tasks[indexToUpdate]=updateTask;

    displayAllTasks(tasks);
    displayCompletedTasks(tasks);
    displayPendingTasks(tasks);

    try{
        syncLoader();
        let editConfirmation=await axios.put(`${url}/tasks`,updateTask,{
            headers: {
                authorization: token
            }
        });
        let editConfirmationData=editConfirmation.data;
        // console.log(JSON.stringify(tasks),JSON.stringify(editConfirmationData.data));
        // if(JSON.stringify(tasks)===JSON.stringify(editConfirmationData.data)){
            if(editConfirmationData){
                syncLoader();
                // console.log("Data Synced Succesfully");
                showPopup(`Task Marked as ${toStatus==="completed"?"Complete":capitalize(toStatus)}`,'success');
            }
            else{
                syncLoader();
                console.log("data isnt synced");
                showPopup("Changes Aren't Saved! Refresh and Retry",'error');
            }
        }
        catch(err){
            syncLoader();
            console.log("data isnt synced. There was an error"+err);
            showPopup("There was an error in marking Task as Complete. Try Again!",'error');

    }
}


function displayGreeting(user) {
    const hours = new Date().getHours();
    let greetingText = '';

    if (hours < 4 && hours>=0) {
        greetingText = `Good Night, ${user}🤩`;
    } 
    else if (hours < 12 && hours>=4) {
        greetingText = `Good Morning, ${user}🤩`;
    } 
    else if (hours < 18) {
        greetingText = `Good Afternoon, ${user}🤩`;
    } 
    else {
        greetingText = `Good Evening, ${user}🤩`;
    }

    document.getElementById('greeting').innerText = greetingText;
}

function displayDate() {
    const date = new Date();
    today=`Today, ${date.toDateString()}`
    document.getElementById('displayDate').innerText = today;
}


async function loggedin(){
    let token=localStorage.getItem("token");
    try{
        let response=await axios.get(`${url}/me`,{
            headers: {
                authorization: token
            }
        });
        userData=await response.data;

        // alert(`${userData.name} logged in!!!`)
        profileName=document.getElementById('profileName')
        username=document.getElementById("username");
        profileImg=document.getElementById("profileImg");
        
        profileName.innerText=capitalize(userData.name);
        username.innerText=`@${(userData.username).toLowerCase()}`;
        profileImg.setAttribute("src",userData.profileImg)
        displayGreeting(capitalize(userData.name));
        displayDate();
        
        let tasksResponse= await axios.get(`${url}/tasks`,{
            headers: {
                authorization: token
            }
        });
        userTasks=tasksResponse.data;
        tasks= userTasks["allTasks"];
        
        displayAllTasks(tasks);
        displayCompletedTasks(tasks);
        displayPendingTasks(tasks);
        
        document.getElementsByClassName("loading")[0].style.display="none";
    return true;
}
catch(err){
    console.log(err);
    
    alert("Not logged in! Redirecting to login page");
    window.location.href = '/login';
    return false;
}
}

loggedin();


function createTaskCard(task){
    
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');
    taskCard.setAttribute("draggable","true");
    taskCard.id = task.id;

    taskCard.addEventListener('dragstart', handleDragStart);
    
    const taskCardHeader = document.createElement('div');
    taskCardHeader.classList.add('task-card-header');
    
    const taskStatus = document.createElement('p');
    taskStatus.classList.add('task-status', task.status.toLowerCase()); 
    taskStatus.textContent = capitalize(task.status);
    
    const editSection = document.createElement('span');
    editSection.classList.add('edit-section');
    
    const ellipsisIcon = document.createElement('i');
    ellipsisIcon.classList.add('fa-solid', 'fa-ellipsis-vertical');
    
    const editDropdown = document.createElement('div');
    editDropdown.classList.add('edit-dropdown');
    
    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-task-btn');
    editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i> Edit`;
    editBtn.onclick = () => openAddEditModal('edit', task.id);
    
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-task-btn');
    deleteBtn.innerHTML = `<i class="fa-solid fa-trash"></i> Delete`;
    deleteBtn.onclick = () => deleteTask(task.id);
    
    editDropdown.appendChild(editBtn);
    editDropdown.appendChild(deleteBtn);
    
    editSection.appendChild(ellipsisIcon);
    editSection.appendChild(editDropdown);
    
    taskCardHeader.appendChild(taskStatus);
    taskCardHeader.appendChild(editSection);
    
    const taskTitle = document.createElement('h4');
    taskTitle.classList.add('task-title');
    taskTitle.textContent = task.name;
    
    const taskDesc = document.createElement('p');
    taskDesc.classList.add('task-desc');
    taskDesc.textContent = task.description;
    
    const taskMetadata = document.createElement('div');
    taskMetadata.classList.add('task-metadata');
    
    const taskDue = document.createElement('p');
    taskDue.classList.add('task-due');
    taskDue.innerHTML = `<i class="fa-regular fa-calendar"></i> <span>${task.due}</span>`;
    
    const taskPriority = document.createElement('p');
    taskPriority.classList.add('task-priority',`${task.priority.toLowerCase()}-priority`);
    priorityIconMap={
        "high": '<i class="fa-solid fa-angles-up"></i>',
        "medium": '<i class="fa-solid fa-angle-up"></i>',
        "low": '<i class="fa-solid fa-angle-down"></i>'
    }
    taskPriority.innerHTML = `${priorityIconMap[task.priority.toLowerCase()]} Priority ${capitalize(task.priority)}`;
    
    const taskCategory = document.createElement('p');
    taskCategory.classList.add('task-category');
    taskCategory.innerHTML = `<span>${capitalize(task.category)}</span>`;
    
    taskMetadata.appendChild(taskDue);
    taskMetadata.appendChild(taskPriority);
    taskMetadata.appendChild(taskCategory);
    
    const markCompleteBtn = document.createElement('button');
    markCompleteBtn.id = 'markComplete';
    markCompleteBtn.classList.add('mark-complete');
    markCompleteBtn.innerHTML = `<i class="fa-solid fa-check-double"></i> Mark as Complete`;
    markCompleteBtn.onclick = () => markAsComplete(task.id);
    
    taskCard.appendChild(taskCardHeader);
    taskCard.appendChild(taskTitle);
    taskCard.appendChild(taskDesc);
    taskCard.appendChild(taskMetadata);
    task.status!="completed"?taskCard.appendChild(markCompleteBtn):null;
    
    return taskCard;
}


function displayAllTasks(tasks){
    allTasks=document.getElementById("todo-column");
    allTasks.innerHTML="";
    tasks.forEach(task=>{
        let card=createTaskCard(task);
        allTasks.appendChild(card);
    })
    if(tasks.length===0){
        allTasks.innerHTML="<span class='no-task-placeholder'> No Tasks to Display!!! Create a task using Add Todo  <i class='fa-solid fa-circle-plus'></i>  Button!!</span>"
    }
    else{
        span=document.createElement("span");
        span.classList.add("no-task-placeholder");
        span.innerText="Tip: You can Drag and Drop cards to change their Status!!";
        allTasks.appendChild(span);
    }
}
function displayPendingTasks(tasks){
    allTasks=document.getElementById("inprogress-column");
    allTasks.innerHTML="";
    let pendingTasks=[];
    tasks.forEach(task=>{
        if(task.status==="pending"){
            pendingTasks.push(task)
            let card=createTaskCard(task);
            allTasks.appendChild(card);
        }
    })
    if(pendingTasks.length===0){
        allTasks.innerHTML="<span class='no-task-placeholder'> No Tasks in Progress!!! Add a task by Dragging and Dropping here or by Editing its Status to 'In Progress'."
    }
    else{
        span=document.createElement("span");
        span.classList.add("no-task-placeholder");
        span.innerText="Tip: Drag Cards and Drop them here to mark them as 'In Progress'!!";
        allTasks.appendChild(span);
    }
}
function displayCompletedTasks(tasks){
    allTasks=document.getElementById("done-column");
    allTasks.innerHTML="";
    let completedTasks=[];
    tasks.forEach(task=>{
        if(task.status==="completed"){
            completedTasks.push(task)
            card=createTaskCard(task);
            allTasks.appendChild(card);
        }
    })
    if(completedTasks.length===0){
        allTasks.innerHTML="<span class='no-task-placeholder'> No Tasks Completed!!! Add a task by Dragging and Dropping here or by marking its Status to Complete.</span>"
    }
    else{
        span=document.createElement("span");
        span.classList.add("no-task-placeholder");
        span.innerText="Tip: Drag Cards and Drop them here to mark them as `Complete`!!";
        allTasks.appendChild(span);
    }
}


function dragger(){

    let doneDroppableArea=document.getElementById("done-column");
    let inprogressDroppableArea=document.getElementById("inprogress-column");
    let todoDroppableArea=document.getElementById("todo-column");
    
    doneDroppableArea.addEventListener('drop', (event) => {
        event.preventDefault();
        const data = event.dataTransfer.getData('text/plain');
        markAsComplete(data)
        
        // event.target.appendChild(draggableElement);
    })

    inprogressDroppableArea.addEventListener('drop', (event) => {
        event.preventDefault();
        const data = event.dataTransfer.getData('text/plain');
        const draggableElement = document.getElementById(data);
        markAsComplete(data,"pending")

        // event.target.appendChild(draggableElement);
    })
    todoDroppableArea.addEventListener('drop', (event) => {
        event.preventDefault();
        const data = event.dataTransfer.getData('text/plain');
        const draggableElement = document.getElementById(data);
        markAsComplete(data,"todo")
        
        // event.target.appendChild(draggableElement);
    })
    
    doneDroppableArea.addEventListener('dragover', (event) => {
        event.preventDefault();
      });
    inprogressDroppableArea.addEventListener('dragover', (event) => {
        event.preventDefault();
      });
    todoDroppableArea.addEventListener('dragover', (event) => {
        event.preventDefault();
      });
}

function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
    console.log(event.target.id);
    dragger()
}


// function sortTasks(criteria,tasks) {
//     tasks.sort((a, b) => {
//         if (criteria === 'priority') {
//             return a.priority.localeCompare(b.priority); 
//         } else if (criteria === 'dueDate') {
//             return new Date(a.dueDate) - new Date(b.dueDate); 
//         }
// });
// }

function sortTasks(criteria) {
    if (criteria === 'priority') {
        tasks.sort((a, b) => a.priority - b.priority);
        console.log("sorting by priority");
        displayAllTasks(tasks);
        displayCompletedTasks(tasks);
        displayPendingTasks(tasks);
        
    } else if (criteria === 'dueDate') {
        // tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        console.log("sorting by date");

        tasks.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA - dateB; 
          });

        displayAllTasks(tasks);
        displayCompletedTasks(tasks);
        displayPendingTasks(tasks);
    }
    
}
