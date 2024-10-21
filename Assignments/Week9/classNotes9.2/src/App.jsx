import { useState, useEffect } from 'react'//this is similar to what we were doing: const {useState}=require("react")
import './App.css'

function App() {
  //conditional rendering is basically rendering components based on some condition

  // unmounting/cleanup, dependency array
  
  const [visibility,setVisibility]=useState(true)
  const [time,setTime]=useState(1)//setTime is called setter fn

  // someone asked how will react know ki a component has been unmounted, taking about <Timer> and the useEffect inside it? 
  // Well since we are updating the state var every 5 sec, the react adds/removes <Timer> and upon doing any of those the react 
  // knows ki mounting is hapenning, by , by calc what is present in the dom and whats needs to be present in the dom and calc 
  // its difference, basically react keeps track of the state var, if an element is removed from it means the component using it 
  // has been unmounted

  useEffect(()=>{
    const visi=setInterval(()=>{
      setVisibility(visible=>!visible)
    },5000)

    return(()=>{
      clearInterval(visi)
    })
  },[])
  
  // now the problem is ki, even after unmounting the setTimeout fn inside the Timer keeps running and it never clears, also
  // new settimeout starts upon mounting it again so it starts begaving wierdly again

  return (
    <div>
      <h2>Ohai Everyone! This is a Counter App</h2>
      <Counter></Counter>
      {visibility?<Timer time={time} setTime={setTime} visibility={visibility}></Timer>:null}
      {/* {visibility&&<Timer></Timer>}//does the same as above */}

    </div>//every 5 sec this component re-renders and hence the toggle works, eg of conditional rendering
  )//whatever is returned here(in the app fn) will be visible/rendered in the app
  //also i have to wrap all the  elements inside a outer div, bcz of the limitation of jsx to return only one element
} 

function Counter(props){//this is a component
  
  //it is best to define onclick function inside the component, aise to we can define these outside of the component but that'll
  // not be a good practice
  
  const [count, setCount] = useState(0)
  
  function updateCount(){
    // let count=0;
    // count++;
    // i cant just put normal variables and put them onto the dynamic parts of the app and expect it to work fine, react will
    // only rerender when there is a change in state variable, so i need to initialiise state var
    
    setCount(count+1)
  }
  
  function decCount(){
    setCount(count-1)
  }
  
  function resetCount(){
    setCount(0)
  }
  
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={updateCount}>Count ++</button>
      <button onClick={decCount}>Count --</button>
      <button onClick={resetCount}>Reset Count</button>
    </div>
  )//the basic counter is upp and working without doing manual dom manipulations, it was done by react, how? by using useState()
  // upon creating state var, reacts starts looking for the changes in the components using state var and when there is any 
  // change react re-renders the change in the components using it
}

//lifecycle events: mounting, re-rendering, unmounting
function Timer(props){
  
  // const [time,setTime]=useState(0)//earlier i was setting state here but the problem was ki after timer mounting the timer was 
  // starting from 0 again, no i have passed it as prop and its been updated once
  
  
  // setInterval(()=>{setTime(time+1)},1000)
  // this is behaving wierdly, bcz whenever there is any change in the state variable,
  // the component fn using that state will be called again by react, that means whatever written in Timer() fn/component will be
  // called everytime there in change in time var(wiz a state), now just bcz of this setInterval is called again and again, it 
  // gets pushed to web api and after completion it waites in callback queue, when the call stack is empty it gets pushed to
  // callstack and is displayed, there are multiple of these operations running making it behave wierdly. Basically react
  // says component, looks like you've changed so i will re-render you
  
  //  To solve this issue, we want to call set interval once when the component is created the first time, this can be done using
  //  useEffect hook, which hooks to the lifecycle events, and can be used to call the setTimeout or any fn(like fetch etc) only
  //  once, when the component is mounted, demounted or re-rendered. Mounting is when the component is created/rendered the first 
  //  time. Un-mounting is when the component is removed from the dom
  
  // One can say that if everything written inside component is called everytime there is change in state the the state
  // will be initialised to 0 everytime, well it doesn't, state var only gets initialised once and is only updated afterwards,
  // only mounting will set its val to 0, also this is bcz hooks get mounted to the lifecycle of the event

  // So basically the code we write in useEffect is used at the time of mounting and ignored during re-rendering and the function
  // we return in useEffect is called at the time of unmounting,
  
  console.log("state updated and component/fn re-rendered/called");

  //hooking into lifecycle events of the react: guards set-timeout from re-renders

  useEffect(()=>{//this line will run on every render but not the following lines

    let clock=setInterval(()=>{
      props.setTime(time=>time+1)//for getting the current value this is the right syntax, but for harcoded val we can directly do this setTime(200)
      //setTime(time+1) //we cant directly update state var(time) in useEffect without using dependencies, we have to create
  // a fn that updates the state var
    },1000)

    console.log("timer component mounted");
    //this was logged two times when we were using strict mode, now it logs once after removing strict mode, bcz in strict
    // mode every effect is called twice

    
    return (()=>{//this is the logic for unmounting, a function returned, which contains the logic of unmounting
      console.log("on unmount");
      
      clearInterval(clock)

      //example of what can be done on unmounting, cleanup of all the fetch requests, cleaning up web-sockets connection
    })
    
    //another way of seeing this is ki useEffect takes a fn as parameter and returns some other fn

  },[])//the [] is the array of dependencies, empty dependencies means this will run only once the the comp is mounted. 
  // abhi tk to i was listening to events like mounting, unmounting, re-renderiing in useEffect but what if i want to apply
  // these logics when state variable changes?? For that we use dependency array

  // If the dependency arr contains any state var passed using props, then the contents inside of the useEffect will run
  // when there is change the state mentioned and the return fn(clear fn) will run first and clear the prev fn and then 
  // the next lines will run to create new fn

  useEffect(()=>{
  /*dit*/ console.log("timer updated");//this will run every time there is change in the state var "time"(this is like saying, when 
    // time changes run this), this will not be called when there is change in any other state var
    return(()=>{
    /*dash*/  console.log("clearing prev output");//this gets called before the above lines and cleares previous values except for
      // the first iteration
      // when time is one it will be logged when time is updated to 2 cleanup will be called for count 1 and then count 2 will 
      // will be set, at last for unmount the cleanup will be called for last val

      // to upon using dependencies when there is change in state for first time dit will get logged, now when state changess 
      // again first cleanup will be called aand dash will be logged and after that dit will be logged, this will keep hapenning
      // until the component unmounts, upon unmounting cleanup will be called and dash will be logged
      

      // reallife usecase will be changing tbs, upon clicking on network tab,(tab state changes) i will cleanup network connections
      // of home tab and then i will start net connections for network tab
    })
  },[props.time,props.visibility])//now i have two dependencies, the value is depending on two different state vars, can pass
  // any other props here as well
  
  return (
    <div>
      <h2>Timer</h2>
      <h1>{props.time}</h1>
    </div>
  )
}


export default App


// useState is a hook(any var that starts with use is a hook), will initialise state and returns array with current state and fn
// to update the state

// Virtual DOM

// well dom is very expensive process, react avoids it by using virtual dom, basically to calc diff react will have to go through
// all the components and then calc the diff so it will have to do dom(document.querySelector("body") and then calc the diff)
// to avoid this, reacts creates the copy of this dom in object and call it virtual dom, its lightweight
