import { Component, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { atom, RecoilRoot, useRecoilState, useRecoilValue, useRecoilStateLoadable, atomFamily, selectorFamily } from 'recoil'
import {notificationCount} from './store/atoms/notificationAtoms'
import { totalCount } from './store/selectors/notificationCountSelector'
import { todoFamily } from './store/atoms/todoFamily'
import ChatSection from './components/ChatBot'


class ErrorBoundry extends Component{
  constructor(props){
    super(props)
    this.state={hasError:false}
  }
  static getDerivedStateFromError(error){
    return {hasError:true}
  }
  componentDidCatch(error,errorInfo){
    console.log(error);
    
  }
  render(){
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children; 
  }

}

function App() {
  //suspense along with error boundry can be used for loadings
  return (
    <>
    <RecoilRoot>
      <Suspense fallback={<div>Loading contents...</div>}>
        <ErrorBoundry>
          <ChatSection/>
          <Navbar/>
          <ToDo id={1}/>
          <ToDo id={2}/>
          <ToDo id={3}/>
          <ToDo id={4}/>
          <ToDo id={4}/>{/*even if i render this component multiple times, already created atom will be cashed and used, no new atom will be created and hence only one fetch call will go out for component with id 4,*/}
        </ErrorBoundry>
      </Suspense>
    </RecoilRoot>
    {/* <Online/> */}
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
  
  // const [todo,setTodo]=useRecoilState(todoFamily(id))

  const [todo,setTodo]=useRecoilStateLoadable(todoFamily(id))//now this atomFamily will return new atom for new input id
  // if multiple components with same ids are called then atom will be generated once and will be used by all of them having same od

  // useRecoilStateLodable() is similar as useRecoilState(), the only difference is ki todo will have three keys, content, hasError
  // and state(state represents loading or loaded)
  console.log(todo.state);
  
  if(todo.state==="loading"){
    return<div>Loading...</div>
  }
  else if(todo.state==="hasError"){
    return<div>Error loading todo</div>
  }


  const todoStyle={display: "flex",width:"516px",alignItems:"center",gap:"10px",background: "#1b1f23", borderRadius: "6px",padding:"0.2rem 0.6rem", border:"1px solid #8c8c8c40",boxShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px"}

  return <div style={todoStyle}>
    <input type='checkbox' checked={todo.contents.completed} onChange={()=>{setTodo((c)=>({...c,completed:!c.completed}))}}></input>
    <p style={{fontSize: "1rem",fontWeight:600}}>{todo.contents.title}</p>
  </div>
} 
//this was the most optimal way to create a todos app, when user creates todo, we will simply create a new atomFamily with id and call setter
// right away to set the vlue of the atom to the value existing in the input field, and we will siply store all these ids in an array
// at last we can simply map all the ids to the components with id as prop, now the rest will be same, that every id will use the created
// atom to render the todo

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