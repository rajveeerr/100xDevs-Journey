import { useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom' //HashRouter for routing in extensions
import './App.css'


/* Single Page Applications are those apps that loads single html and dynamically change contents on different routes, without
loading the whole page for faster navigation. These are faster then multi page applications, MPAs re-fetch and reload html 
for every other page(home,about us), this can be verified by the favicon loader.

Basically in SPAs html of all the pages are fetched in just one and first fetch request, after that the html are conditionally
rendered depending upon the page

Back in the day MPAs were used, even i used this approach for balanzio, but modern applications include react for good ux

client side routing is the routing that happens on the browser/client side itself*/

function App() {

  const routes=[{
    path: "/",
    element: <Landing/>
  },{
    path: "/tests",
    element: <Tests/>
  },{
    path: "/aboutus",
    element: <AboutUs/>
  }]//this is also a good oractice to define all the rutes in arr of obj and map them at once to route element
  // routes.map((route)=><Route path={route.path} element={route.element}></Route>)

  return (//to navigate b/w pages the dumb way will be to use <a href="/tests">Tests</a>, b/c this will reload the html of whole
    //  page and refresh the page, this takes away the benifit of SPAs and react
    <>
      <BrowserRouter>
    {/* <div>instead of defining them here and complicating this fn, we've defined them using <Layout/>
      <Link to="/"><button>Home</button></Link>
      <Link to="/tests"><button>Tests</button></Link>
      <Link to="/aboutus"><button>About Us</button></Link>
      {/* cannot use link components outside the <BrowserRouter/>}
    </div> */}
      <Routes>
        <Route path="/" element={<Layout/>}>{/* if we add path to /user in parent route then the layout will be renderend only for routes starting with /user*/}
          <Route path='/' element={<Landing/>}></Route>
          <Route path='/tests' element={<Tests/>}></Route>
          <Route path='/aboutus' element={<AboutUs/>}></Route>
          <Route path='*' element={"<h1>404 you landed at wrong page</h1>"}></Route>{/* we can write html directly here too */}
        </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}
//layout as the name suggests, give the overall layout of how the page will look like, layout of a generic page(topbar - Contents - Footer)
function Layout(){
  return(<>
    <Navbar/>

    <div style={{height: '70vh'}}>
      <Outlet/>{/* An <Outlet/> is used in parent route to render its children route elements in a layout, react native equivalent is <Slot/> */}
    </div>
    <Clock/>
    <Form/>
    <div>
      This is Footer.
    </div>
  </>
  )//basically in Layout first the navbar will be rendered, then the child of the parent route will be rendered depending upon 
  // the route of the page
}

function Form(){

/* 
useRef is a hook that allows to create references to a value or dom element, its value persists across renders and changing 
it doesnt triggers re-renders when value changes

useRef allows us to create variables (or reference to a value to) upon changing which doesnt triggers re-renders

types of var in react:

let a=10;//this is very rarely used, dunno why? SEARCH THIS
const [a,setA]=useState(10)
const a=useRef(10)//either this or useState vars are used in react to create var
*/

  const usernameRef=useRef();

  function inputFocus(){
    // document.getElementById("username").focus();
    // this is one way of acessing elements from dom, this is bad espacially getElementById
    // in react elements can be rendered twice and if we are preforming operations based on id, then this will start mis-behaving
    // toh doing this should be avoided
    usernameRef.current.focus()
  }

  return(
  <div>
    <input ref={usernameRef} id="username" placeholder='Enter your name'></input>
    <input id="password" placeholder='Enter your password'></input>
    <button onClick={inputFocus}>Submit</button>
  </div>)
}

function Clock(){
  let [time,setTime]=useState(1);
  let clock=useRef(null);
  // let [clock,setClock]=useState(null);//this can be done using state vars too but the problem will be performance, there will be
  // too many re-renders hapenning even for clearing the interval, using useRef will be a more performant and efficient than this

  // let time=useRef(1);//didnt used this as this wasnt triggering rerenders
  // let clock=null;//this cant work as at every render this will be set to null again, and the value will not persist,
  // the value will persist until th rerender

  function startClock(){

    // if(clock){
    if(clock.current){
      console.log("clock already running");
      return;
    }
    clock.current=setInterval(()=>{
      // time.current=time.current+1 //this wasnt trigerring re-render
      setTime(time=>time+1)
    },1000)
    console.log("started clock");

    // let interval=setInterval(()=>{
    //   // time.current=time.current+1 //this wasnt trigerring re-render
    //   setTime(time=>time+1)
    // },1000)
    // setClock(interval)//extra rerendering even for something we arent displaying on dom
    
  }
  function pauseClock(){
    console.log("paused clock");
    
    clearInterval(clock.current)//after starting the clock resumes as the value of current time is stored in state var 'time'
    clock.current=null;
    // clearInterval(clock)
    // setClock(null)
  }
  function resetClock(){
    clearInterval(clock.current)
    clock.current=null
    // clearInterval(clock)
    // setClock(null)
    setTime(1)
  }

  return(
    <div>
      <h1>{time}</h1>
      <button onClick={startClock}>Start</button>
      <button onClick={pauseClock}>Pause</button>
      <button onClick={resetClock}>Reset</button>
    </div>
  )
}

function Navbar(){
  return <div>
  <Link to="/"> <button>Home</button></Link>
  <Link to="/tests"><button>Tests</button></Link>
  <Link to="/aboutus"><button>About Us</button></Link>
</div>
}

function Landing(){
  return (<>
    <h1>HomePage</h1>
    <p>This is HomePage.</p>
  </>)
}

function AboutUs(){
  return (<>
    <h1>About US❌ ME✅</h1>
    <p>Dont have anything to say here.</p>
  </>)
}

function Tests(){
  const navigate=useNavigate();//doing routing with useNavigation hook

  function redirect(){
    navigate("/")//use case of this will be routing after an event, like after 5s passed route to some page
  }

  return (<>
    <h1>Tests 100xDevs</h1>
    <p>Includes MERN.</p>
    <button onClick={redirect}>Go to Homepage</button>{/* This can be done using link too*/}
    <Link to="/"><button>Homepage with link</button></Link>

  </>)
}


export default App
// challange: do the routing yourselvs, without library

