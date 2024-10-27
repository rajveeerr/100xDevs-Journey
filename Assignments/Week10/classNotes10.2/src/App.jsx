import { createContext, useContext, useState } from 'react'
import './App.css'

// context api allows us to manage state more effectively by allowing us to pass values/state/data between deeply nested 
// components, without manually passing props at each level

/* Jargons

-> context: some data/part of the application, serves as container for data to be shared, React.createContext() is used to 
            create contexts
-> provider: these wraps part of application/some components and allows them and their decendents to access the context data
             
-> consumer: consumes the context

Step 1: define the context, LightState
Step 2: provide the the value you want the childrens to have
Step 3: consume the context/values from the children component

Context apis doesnt optimize the number of rerenders, for that we need to use state management libraries like recoil

*/


let LightState=createContext()//context is always created outside the component chain, ususally defined in seperate file
let CountState=createContext()

function App() {

  const [light,setLight]=useState(false)//abhi to im creating this state var at the very top in the chain, this is also good but 
  // passing it to least common ancestor will be a better approach, here the least common ancestor is <Light> component
  // the best will be to use state management libraries like zustand
  
  return (<div>
    <LightState.Provider value={{
      light: light,
      setLight: setLight
    }}>{/* providing object containing state var/context to all the childrens, now childrens and there decendents can use this
      value of state without prop drilling, abhi to im providing context to light component, if i want i can only wrap LightBulb 
      and ToggleSwitch*/}
      <Light light={light} setLight={setLight}/>
    </LightState.Provider>

    {/* <LightStateProvider>
      <Light/>
    </LightStateProvider> */}
    {/* cleaner way of hiding providers */}

    <CountProvider>
      <Counter></Counter>
    </CountProvider>
    
  </div>
  )
}
function LightStateProvider({children}){

  const [light,setLight]=useState(false)

  return (<LightState.Provider value={{
    light,
    setLight
  }}>
    {children}
  </LightState.Provider>)
}

function CountProvider({children}){

  const [count,setCount]=useState(0)

  return <CountState.Provider value={{
    count: count,
    setCount: setCount
  }}>
    {children}
  </CountState.Provider>
}

function Light(props){
  return <>
  <LightBulb light={props.light}/>{/* this is prop drilling */}
  <ToggleSwitch setLight={props.setLight}/>
  </>
}
// prop drilling is basically passing state var or function from parent/higher-level component to its child/lower-level component
// deep in the component tree, here we are passing state var 'light' from <App/> to <LightBulb/> through <Light/> light is not using 
// this state var its just passing it down in the tree(acting like phantom component)/drill it down the prop chain, this make 
// code un-managable and un-redable for larger applications and more complex as we have to pass the props to the elements which are
// not even using them, to fix this we can use contextApi, api-application programming interface, useState(),useRef() these are apis

function ToggleSwitch(props){
  const {setLight}=useContext(LightState)//receiving value of state from the app component directly, without doing prop drilling
  

  function toggle(){
    // props.setLight(light=>!light)
    setLight(light=>!light)
  }
  
  return<>
  <button onClick={toggle}>Toggle On/Off</button>
  </>
}

function LightBulb(props){
  
  // const [light,setLight]=useState(false) 
  
  // this state of light is to be used by the ToggleSwitch too, and this state var (props)
  // can't be directly passed up in the chain to parent component(props are mostly send from parent to child, sending them
  // from child to parent is uncommon and isnt suggested, but can be done by using callbacks),
  // the best will be to roll up this state var to the least common ancestor

  const {light}=useContext(LightState)

  return(<div style={{margin: "1rem"}}>
    {/* {props.light?<img src='https://cdn-icons-png.flaticon.com/128/3681/3681913.png'/>:<img src='https://cdn-icons-png.flaticon.com/128/9984/9984985.png'/>} */}
    {light?<img src='https://cdn-icons-png.flaticon.com/128/3681/3681913.png'/>:<img src='https://cdn-icons-png.flaticon.com/128/9984/9984985.png'/>}
  </div>)
}

function Counter(){
  const {count}=useContext(CountState)
  return(<div>
    {count}
    <div>
    <Increase/>
    <Decrease/>
    </div>
  </div>)
  // now upon clicking inc/dec button all these components rerender even though there is no change in increase and decrease button
  // this code is now optimised, abhi to we are using context api for managing state, we should use state management libraies for this
}
function Increase(){
  const {setCount}=useContext(CountState)
  return <button onClick={()=>setCount(count=>count+1)}>Increase</button>
}
function Decrease(){
  const {setCount}=useContext(CountState)
  return <button onClick={()=>setCount(count=>count-1)}>Decrease</button>
}

export default App
