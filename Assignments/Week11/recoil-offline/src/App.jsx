import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { RecoilRoot, useRecoilState, useRecoilValue, atom } from 'recoil'
import {notificationCount} from './store/atoms/notificationAtoms'
import { totalCount } from './store/selectors/notificationCountSelector'
import { todoFamily } from './store/atoms/todoFamily'


function App() {
  
  return (
    <>
    <RecoilRoot>
      <Navbar/>
      <ToDo id={1}/>
      <ToDo id={2}/>
      <ToDo id={3}/>
      <ToDo id={4}/>
    </RecoilRoot>
    </>
  )
}

function ToDo({id}){
  // i basically need to render the todos by id on the screen, using just the atoms(not useState) also i can't store all todos data in
  // one atom(as an array) as this would lead to unnessary re-renders when any of the todos changes

  // one way of doing this:-
  // const todoAtom=atom({
  //   key:"faketodo",
  //   default: {
  //     id: 1,
  //     title: "Complete the project report",
  //     completed: false
  //   }
  // })
  // problem with this approach?? we will have to create a new atom for every new todo, solution we can use atom family which does this
  // for us, it created a new atom for every todo component, with new input
  // instead of subscribing to the atom, we can subscribe to atomFamily which returns a new atom for a component with a new id
  
  const [todo,setTodo]=useRecoilState(todoFamily(id))//now this atomFamily will return new atom for new input id

  const todoStyle={display: "flex",alignItems:"center",gap:"10px",background: "#1b1f23", borderRadius: "6px",padding:"0.2rem 0.6rem", border:"1px solid #8c8c8c40",boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px"}

  return <div style={todoStyle}>
    <input type='checkbox' checked={todo.completed} onChange={()=>{setTodo((c)=>({...c,completed:!c.completed}))}}></input>
    <p style={{fontSize: "1rem",fontWeight:600}}>{todo.title}</p>
  </div>
} 

function Navbar(){
  // let [notificationCount,setNotificationCount]=useState(1000)
  // let [jobNotificationCount,setJobNotificationCount]=useState(0)
  // let [messageNotificationCount,setMessageNotificationCount]=useState(12)

  const [notifications,setNotificationCount]=useRecoilState(notificationCount)
  const totalNotifications=useRecoilValue(totalCount)  

  // useEffect(()=>{
  //   fetch("https://mocki.io/v1/5a1d9385-c7af-41bc-80f2-10c2a590afcb").then(async(response)=>{
  //     let data=await response.json()
  //     setNotificationCount(data)//this will change the default value after some time, bad ux to fix this we use selectors in the default value
  //   })
  // },[])

  // const totalNotificationsCount=useMemo(()=>{
  //   return count+ jobCount+ messageCount
  // },[count,jobCount,messageCount])//this value will re-compute only the dependency array changes

  let counterStyle={color: "white",backgroundColor:"red",padding:".5rem",borderRadius:"12px",textAlign:"center",fontSize:".7rem",fontWeight:"600",position:"absolute",right:"0",top:0,lineHeight: 0,display:"flex",alignItems:"center",justifyContemts:"center",cursor:"default"}
  let navStyle={display: "flex",gap:"10px",background: "#1b1f23", borderRadius: "6px",padding:".6rem", border:"1px solid #8c8c8c40",boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px"}

  return<div style={navStyle}>
    <button>Home</button>
    <div style={{position:"relative"}}>
      <button onClick={()=>setNotificationCount((prev) => ({ ...prev, network: prev.network + 1 }))}>Network</button>{notifications.network?<span style={counterStyle}>{notifications.network>99?"99+":notifications.network}</span>:null}
    </div>
    <div style={{position:"relative"}}>
      <button onClick={()=>setNotificationCount((prev) => ({ ...prev, job: prev.job + 1 }))}>Jobs</button>{notifications.job?<span style={counterStyle}>{notifications.job>99?"99+":notifications.job}</span>:null}
    </div>
    <div style={{position:"relative"}}>
      <button onClick={()=>setNotificationCount((prev)=>({...prev,messages: prev.messages+1}))}>Messages</button>{notifications.messages?<span style={counterStyle}>{notifications.messages>99?"99+":notifications.messages}</span>:null}
    </div>
    <div style={{position:"relative"}}>
      <button>Profile</button>{totalNotifications?<span style={counterStyle}>{totalNotifications}</span>:null}
    </div>
  </div>
}

export default App
// memo is for memoising components and depends upon props
// useMemo hook is for memoising values and def=pendes on dependencie array
// useCallback hook is for memoising functions and depends on dependencie array