import { useState } from 'react'
import './App.css'
import React from 'react'

export default function App() {
  //app is where all the logic goes
  
  // const [counter,setCounter]=useState(0)//this is basically setting state and destructuring it, as its an array

  const [todos,setTodo]=useState([{
    title: "gym",
    description: "go to gym at 5",
    complete: true
  }])//initialising state

  // with const keyword, we can change the value of the variable but not the variable itself, that means that the counter value can be changed, to anything but the length of array cannot

  function incCounter(){
    setCounter(counter+1)//this will trigger re-render
  }

  function addTodo() {//can we pass arguments to this function while calling this onClick from button?? 
    let newTodos=[]
    todos.forEach(todo=>{newTodos.push(todo)})
    let task={
      title: document.getElementById("title").value,//we should avoid this, the best way to do this is useRef, react-hook-forms or using more state variables
      description: document.getElementById("description").value,
      complete: false
    }
    newTodos.push(task)
    //we cant directly push task at the end of the todos array because it is a reference type, so we need to create a new array and push the task at the end of that array, React states should not be mutated directly
    setTodo(newTodos)


    // setTodo([...todos,{
    //     title: document.getElementById("title").value,
    //     description: document.getElementById("description").value,
    //     complete: false
    // }])

    //minimal way of doing the same as above, [...todos,task], is basically creating new array with all teh elements of the todos array and adding the task at the end of the array
  }

  // return <Button incCounter={incCounter} counter={counter}></Button>
  
  return (//this is the component we are rendering
  <div>
      <input id="title" placeholder="Enter title" />
      <input id="description" placeholder="Describe task!!!" />
      <button onClick={addTodo}>Add Todo</button>

      {todos.map((todo)=>(
          <Todo title= {todo.title} description= {todo.description} complete={todo.complete}></Todo>
      ))}
    
  </div>
  )
  // return React.createElement("button",{onClick: incCounter},`Counter ${counter}`)
  
  //   <div>
  //     <button onClick={incCounter}>Counter {counter}</button> 
  //   </div>
  //jsx code
}

function Button(props){
  return <button onClick={props.incCounter}>Count {props.counter}</button>
  
}
//this is like creating components or html tags

function Todo(props) {
  return(<div>
    <h1>{props.title}</h1>
    <p>{props.description}</p>
    <p>{props.complete?"Completed":"Pending"}</p>
  </div>)
}//boolean is not rendered, so we need to convert it to string