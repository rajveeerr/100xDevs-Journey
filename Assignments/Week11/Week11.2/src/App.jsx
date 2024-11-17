import { createContext, useContext, useEffect, useState, memo } from 'react'
import './App.css'
import { counterAtom } from './store/atoms/counter';
import {useSetRecoilState,useRecoilValue,RecoilRoot} from 'recoil'

// Recoil is a state management library(does same job as useState) which allows us to manage global state(objects of all the states)
// and minimize the number of re-renders by only re-rendering the components that depends on changed atoms

// in react global state is an object of all the states, which are created using useState hook, 
// example of global state of linkedin(in react):
/* {
  notificationCount: 12,
  message: "this",
  posts: [{},{}]
} can be created with useState(), const [notificationCount,setNotificationCount]=useState(12)
if notificationCount value is changed, all the components will re-render regardless of whether they were using that state or not

Atoms: These are units of state(like useState), which can be used and modified from within a component, the only difference is that 
changing stste of these atoms will only re-render the components subscribing to these, unlike useState vars which were re-rendering every 
component

TlDr: Recoil is a performant library, it minimizes the no of re-renders as the global state changes, use the concept of atoms and 
selectors 

How REcoil is Defferent from ContextApi?

well in context api approach(if every state is defined in store), every component was re-rendered when one state was changing, even if 
they were not using that state unlike recoil, where only the component subscribed to the state/atom/selector are changing
*/

let Counter=createContext()

function CountProvider(props){
  const [count,setCount]=useState(0);

  return <Counter.Provider value={{
    count,
    setCount
  }}>
    {props.children}
  </Counter.Provider>
}

function App() {

  return (
    <>
      <RecoilRoot>
      {/* <CountProvider> */}
        <Count/>
      {/* </CountProvider> */}
      </RecoilRoot>
      <MemoisedCounter/>
    </>
  )
}

function Increase(){
  // let {setCount}=useContext(Counter)
  let setCount=useSetRecoilState(counterAtom);//this component only needs acces to the setter, not the value
  
  return <button onClick={()=>{setCount(c=>c+1)}}>Increase</button>
}
function Decrease(){
  // let {setCount}=useContext(Counter)
  let setCount=useSetRecoilState(counterAtom);

  return <button onClick={()=>{setCount(c=>c-1)}}>Decrease</button>
}
function CurrentCount(){
  // let {count}=useContext(Counter)
  let count=useRecoilValue(counterAtom)//now only this component is subscribed to the atom, hence on this will re-render upon atom change
  
  return<h1>{count}</h1>
}
function Count(){

  return <div>
    <Increase/>
    <Decrease/>
    <CurrentCount/>
  </div>
}
// top level overvier, counter component renders 3 components, 1. increase, 2. decrease and 3. current count, the current count 
// component is subscribed to the value and only it needs to be rerendered when the value of atom changes, increase and decrease are 
// subscribed to the setters they can only push the changes and dont care about the actual value so they dont need to re-render
// earlier we were using useState in the context api provider which was trigerring re-renders when the state var was cahnging

// In react when a parent component re-renders, its children components re-renders too, even if no-state or prop is changing in the 
// children components. To fix this issue Memo api are used, memo basically tells react to only re-render the Memoised component when
// either the state variable inside the component changes or the props passed to it changes

const MemoisedCount=memo(({count})=>{
  return<div>{count}</div>
})//basically memo takes a function/component as input and returns the memoised component

const MemoisedIncrease=memo(({setCount})=>{
  return<div>
      <button onClick={()=>{setCount(c=>c+1)}}>Increase</button>
    </div>
})

const MemoisedDecrease=memo(({setCount})=>{
  return<div>
      <button onClick={()=>{setCount(c=>c-1)}}>Decrease</button>
  </div>
})

function MemoisedCounter(){
  const [count,setCount]=useState(0)

  // useEffect(()=>{
  //   let intervalId=setInterval(()=>{
  //     setCount(c=>c+1)
  //   },2000)

  //   return (()=>{
  //     clearInterval(intervalId)
  //   })
  // },[])

  return <>
    {/* <button onClick={()=>{setCount(count=>count+1)}}>Re-render</button> */}
    <MemoisedIncrease setCount={setCount}/>
    <MemoisedDecrease setCount={setCount}/>
    <MemoisedCount count={count}/>
  </>
  //without Memo api when this component re-renders all f its childrens are alo re-rendering
}

// till now we were storing contexts in a global object, and there was no way of rendering components based on particular state,
// if one state was changing in the store every other component was re-rendering, but to fix this we can simply use selectors
// which says ki create a global atom and instead of subscribing to the global atom, create selectors out of it and subscribe to
// those selectors instead, this way if some atoms change only the selector and hence components using that atom will change, if we
// will subscribe to the global atom directly, changing any atom will cause re-rendering to all the subscribers
// example of one atom
/* {
  user: "harkirat", 
  notification Count: 2, 
  messageCount: 3, 
  messages: []
} */

// Selectors basically reperesents the piece of derived state(from complete state), these are like pure fn(which doesnt change anything 
// from the input it just derives the new state from the input)

export default App
