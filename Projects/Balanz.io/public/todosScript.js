function capitalize(string) {
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
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


function collapse(){
    sidebar=document.getElementById("sidebar");
    hamberger=document.getElementById("hamberger");
    sidebar.classList.toggle("sidebar-collapse");
    hamberger.classList.toggle("hamberger-collapse");
}
async function loggedin(){
    let token=localStorage.getItem("token");
    try{
        let response=await axios.get("http://localhost:3000/me",{
            headers: {
                authorization: token
            }
        });
        userData=response.data;
        alert(`${userData.name} logged in!!!`)
        // if(userData.name){
            return true;
        // }
    }
    catch(err){
        alert("Not logged in! Redirecting to login page");
        return false;
    }
}

loggedin().then((data)=>{
if(!data){
    window.location.href = '/login';
}
else{
    profileName=document.getElementById('profileName')
    username=document.getElementById("username");
    profileImg=document.getElementById("profileImg");
    
    profileName.innerText=capitalize(userData.name);
    username.innerText=`@${(userData.username).toLowerCase()}`;
    profileImg.setAttribute("src",userData.profileImg)
    displayGreeting(capitalize(userData.name));
}
})
// displayGreeting();

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

let todos=[];  //this is state variable
let ctr=1;
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


//this is component
function todoComponent(todo){

let div=document.createElement("div");

let checkbox=document.createElement("input");
checkbox.id="check"+todo.id;
checkbox.type='checkbox';
checkbox.onchange= ()=>{isCompleted(checkbox,todo.id)};
checkbox.checked = todo.isDone;

let span=document.createElement("span");
span.id="todo"+todo.id;
span.innerHTML=todo.title;

let edit=document.createElement("button");
edit.id="edit"+todo.id;
edit.setAttribute("onclick",`editTodo(${todo.id})`);
edit.innerHTML="Edit";

let btn=document.createElement("button");
// btn.id=todo.deleteId;
btn.setAttribute("onclick",`deleteTodo(${todo.id})`);
btn.innerHTML="Delete";

div.appendChild(checkbox);
div.appendChild(span);
div.appendChild(btn);
div.appendChild(edit);

return div;
}

function render(){
parent=document.querySelector(".todos");
parent.innerHTML="";
for(let i=0;i<todos.length;i++){    

    parent.appendChild(todoComponent(todos[i]));
    span=document.getElementById(`todo${todos[i].id}`);
    if(todos[i].isDone){
        span.style.textDecoration="line-through";
        // console.log(span)
    }
    else{
        span.style.textDecoration="none";
        // console.log(span)
    }
}
}

const tasks = [
    {
      title: 'Complete UI Design',
      description: 'Design the UI for the new project',
      dueDate: '2024-09-30',
      priority: 'High',
      category: 'Design',
      status: 'To Do'
    },
    {
      title: 'Fix Backend API',
      description: 'Resolve bugs in the API',
      dueDate: '2024-09-25',
      priority: 'Medium',
      category: 'Development',
      status: 'In Progress'
    },
    {
      title: 'Submit Report',
      description: 'Complete and submit the final report',
      dueDate: '2024-09-27',
      priority: 'Low',
      category: 'Documentation',
      status: 'Done'
    }
  ];
  
  
  
  function displayTasks() {
      tasks.forEach(task => {
          const column = document.getElementById(`${task.status.toLowerCase().replace(" ", "")}-column`);
          const taskTemplate = document.getElementById('task-template').content.cloneNode(true);
  
          taskTemplate.querySelector('.task-status').innerText = task.status;
          taskTemplate.querySelector('.task-title').innerText = task.title;
          taskTemplate.querySelector('.task-desc').innerText = task.description;
          taskTemplate.querySelector('.task-due span').innerText = task.dueDate;
          taskTemplate.querySelector('.task-priority span').innerText = task.priority;
          taskTemplate.querySelector('.task-category span').innerText = task.category;
  
          column.appendChild(taskTemplate);
      });
  }
  
  function sortTasks(criteria) {
      tasks.sort((a, b) => {
          if (criteria === 'priority') {
              return a.priority.localeCompare(b.priority); 
          } else if (criteria === 'dueDate') {
              return new Date(a.dueDate) - new Date(b.dueDate); 
          }
      });
  
      document.querySelectorAll('.kanban-tasks').forEach(column => column.innerHTML = '');
      displayTasks();
  }
  document.addEventListener('DOMContentLoaded', () => {
      displayTasks();
      displayDate();
  });

  function openAddEditModal(action,id){
    taskModal=document.getElementById("task-modal");
    if(action==="add"){
        taskModal.style.display="flex";
    }
    else if(action==="edit"){
        taskModal.style.display="flex";
    }
  }
  function closeAddEditModal(){
    taskModal=document.getElementById("task-modal").style.display="none";
  }
  function saveAddEditModal(){
    taskModal=document.getElementById("task-modal").style.display="none";
  }
  function addTask(event){
    event.preventDefault();
  }
  window.onclick = function(event) {
    taskModal=document.getElementById('task-modal');
    logoutModal=document.getElementById('logoutModal');
    if (event.target === taskModal || event.target === logoutModal){
      closeAddEditModal();
      closeModal();
    }
  };