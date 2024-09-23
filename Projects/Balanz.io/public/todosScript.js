let url="http://localhost:3000";
let tasks = [];

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

let openedTaskId=""
function openAddEditModal(action,id){
    taskModal=document.getElementById("task-modal");
    if(action==="add"){
        taskModal.style.display="flex";
        document.getElementById("modalTitle").innerText="Add Your Task";
        document.getElementById("task-title").value="";
        document.getElementById("task-desc").value="";
        document.getElementById("due-date").value="";
        document.getElementById("priority").value="";
        tdocument.getElementById("status").value="";
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
        category.value=taskToEdit.category;
        priority.value=taskToEdit.priority;
        taskStatus.value = taskToEdit.status === "pending" ? "inprogress" : "completed";
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

function saveAddEditModal(){
    console.log("creating new todo");

    const form = document.getElementById('task-form');
    if (!form.checkValidity()) {
        return;
    }
    
    taskTitle=document.getElementById("task-title").value;
    taskDesc=document.getElementById("task-desc").value;
    dueDate=document.getElementById("due-date").value;
    priority=document.getElementById("priority").value;
    taskStatus=document.getElementById("status").value;
    category=document.getElementById("category-input").value;

    

    let id = crypto.randomUUID();
    
    let task={
        name: taskTitle,
        description: taskDesc,
        due: dueDate,
        category: category.toLowerCase(),
        completed: taskStatus==="completed"?true:false,
        status: taskStatus==="inprogress"?"pending":"complete",
        priority: priority.toLowerCase()
    }

    if(document.getElementById("modalTitle").innerText==="Add Your Task"){
        task.id=id
        tasks.push(task);
        console.log(tasks);
    }
    
    else{
        let taskIndex = tasks.findIndex(t=> t.id === openedTaskId);
        task.id=openedTaskId;
        tasks[taskIndex] = task;
        console.log(tasks);
        
    }
    // now send a put req to server to save the data and verify is the content is saved by response received
    //now add a popup saying task edited, added and syncing bar somewhere
    
    displayAllTasks(tasks);
    displayCompletedTasks(tasks);
    displayPendingTasks(tasks);
    document.getElementById("task-modal").style.display="none";
}


function closeAddEditModal(){
  taskModal=document.getElementById("task-modal").style.display="none";
}

window.onclick = function(event) {
    taskModal=document.getElementById('task-modal');
    logoutModal=document.getElementById('logoutModal');
    if (event.target === taskModal || event.target === logoutModal){
        closeAddEditModal();
        closeModal();
    }
};

function addTask(event){
  event.preventDefault();
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


document.addEventListener('DOMContentLoaded', () => {
    // displayTasks();
});



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
    taskCard.id = task.id;
    
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
    task.status!="complete"?taskCard.appendChild(markCompleteBtn):null;
    
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
}
function displayPendingTasks(tasks){
    allTasks=document.getElementById("inprogress-column");
    allTasks.innerHTML="";
    tasks.forEach(task=>{
        if(task.status==="pending"){
            let card=createTaskCard(task);
            allTasks.appendChild(card);
        }
    })
    if(tasks.length===0){
        allTasks.innerHTML="<span class='no-task-placeholder'> No Tasks in Progress!!! Add a task by Dragging and Dropping here or by Editing its Status to Pending."
    }
}
function displayCompletedTasks(tasks){
    allTasks=document.getElementById("done-column");
    allTasks.innerHTML="";
    tasks.forEach(task=>{
        if(task.status==="complete"){
            let card=createTaskCard(task);
            allTasks.appendChild(card);
        }
    })
    if(tasks.length===0){
        allTasks.innerHTML="<span class='no-task-placeholder'> No Tasks Completed!!! Add a task by Dragging and Dropping here or by marking its Status to Complete."
    }
}




function addTodo(){
    todos.push({
        title: document.querySelector("input").value,
        id: `${ctr}`,
        editId: `edit${ctr}`,
        deleteId: `del${ctr}`,
        isDone: false
    });
    ctr++;
    if(document.querySelector("input").value){
        render();
    }
    else{
        alert("Enter The Task!!!!!!!!")
    }
    document.querySelector("input").value='';
}

function deleteTodo(index){
    // todos.splice(index,1); //theres a better way to do this
    todos= todos.filter((obj)=>{if(obj.id!=index){return obj}});
    render();
}

function editTodo(index){
    span=document.getElementById(`todo${index}`);
    editbtn=document.getElementById(`edit${index}`)
    
    span.setAttribute("contentEditable","true");
    editbtn.style.display="none";
    span.style.border="1px solid black";
    let save=document.createElement("button");
    save.innerHTML="Save";
    let cancel=document.createElement("button");
    cancel.innerHTML="Cancel"
    span.parentNode.appendChild(save);
    span.parentNode.appendChild(cancel);
    cancel.addEventListener("click",()=>{render()});
    
    save.addEventListener("click",()=>{
        editedText=span.textContent;
        for(let i=0;i<todos.length;i++){
            if(todos[i].id==index){
                console.log("done")
                todos[i].title=editedText;
            }
        }
        render();
    })
}

function isCompleted(ele,index){
    // box=document.getElementById(`check${index}`);
    if(ele.checked){
        for(let i=0;i<todos.length;i++){
            if(todos[i].id===index){
                todos[i].isDone=true;
                break;
            }
        }
    }
    else{
        for(let i=0;i<todos.length;i++){
            if(todos[i].id===index){
                todos[i].isDone=false;
                break;
            }
        }
        
    }
    render();
    console.log(todos)
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
