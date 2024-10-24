import { useState, useEffect, Component } from 'react'
// import './App.css'
import {Card} from './Card'//IVE SHIFTED THE CARD COMPONENT TO DIFFERENT FILE

function App() {

  let data="We use vite to initialise and run react projects by converting them to html css and js, it lets us reun both dev and production server locally in pkg file, for web apps we use react-dom as dependency and for apps we use react-native as dependency";

  const [posts,setPost]=useState([{
    title: "Rajveeerr",
    subTitle: "1220 Followers",
    imgUrl: "/logoImg.jpg",
    time: "39min",
    content: data
  },{
    title: "100xDevs",
    subTitle: "Promotion",
    imgUrl: "/logoImg.jpg",
    time: "39min",
    content: data,
    postImg: "/postImg.jpg"
  }])

  function addPosts(){
    setPost([...posts,{
      title: "100xDevs",
      subTitle: "Promotion",
      imgUrl: "/logoImg.jpg",
      time: "39min",
      content: data,
      postImg: "/postImg.jpg"
    }])
    //cant mutate state var directly, so creating a copy of it updating it and then setting it
    //... spreads the original array, means iterate through the original array put its elements
    //[23,...arr], will create a new arr with 23 at beginning followed by the elements of arr
 
  }

  return (<>
    <div>
    {/* <Message></Message> */}


      <div style={{width: "100%", display: "flex", flexDirection:"column", gap: "2rem", padding:"20px", justifyContent: "center", alignItems: "center"}}>
        {/* [<Card title={"Rajveeerr"} subTitle={"Mentor@GGSIPU"} imgUrl={"/logoImg.jpg"} time={"12m"} content={data}></Card> */}
        {/* ,<Card title={"100xDevs"} subTitle={"Promotion"} imgUrl={"/logoImg.jpg"} time={"12m"} content={data} postImg={"/postImg.jpg"}></Card>] */}
        {/* putting the cards in array does the same thing as without putting them in it, it is an array of components */}
        
      <Tabs></Tabs>
      
      <button onClick={addPosts}>Add Post/Card</button>

      {posts.map((post,index)=>{
        return (<Card key={index} title={post.title} subTitle={post.subTitle} imgUrl={post.imgUrl} time={post.time} postImg={post.postImg} content={post.content}></Card>)

        // here we are simply mapping each of the state objects array to components array, means creating a component
        // for each state object

        // workflow of this-> upon clicking on add card btn i am appending data of a post in the state var and then
        // i am creating [array of components] for each of the data present in state therefter displaying them on dom, the 
        // moment i'll update state var react will simply re run this entire function, and the new components generated will be
        // displayed

        // now creating lists without adding unique key to each component will result in warning, it is a good practice
        // to give unique keys to the components, it increases the performance. React can figure out differences preety well if 
        // the key has been provided, like if the elements in arr will be swapped then react will simply remove one and add it below
        // istead of removing both of them ard rerendering them. if the keys arent unique, react will start behaving wierdly

        
      })}
    

      <PostWrapper>
        <h2 style={{margin: 0}}>Hi Title!</h2>
        <p style={{margin: "4px 0 16px 0"}}>Oh shoot! i forgot it!! Nevermind</p>
        <button>Do Something</button>
        {/* this is how we pass and receive childrens to component, instead of writing html i can pass different component here */}
      </PostWrapper>

      <PostWrapper>{/* all the following lines are childrens */}
        <img style={{borderRadius: "20px"}} src='/logoImg.jpg'></img>
        <h2 style={{margin: "12px 0 4px 0"}}>Youtube Playlist</h2>
        <p style={{margin: "0 0 20px 0"}}>Well, that was a clickbait and hahaha you did fall for it!</p>
        <button>Rick Roll</button>
      </PostWrapper>

      <PostWrapper>
        <ErrorBoundary>
          <BuggyComponent></BuggyComponent>
        </ErrorBoundary>
      </PostWrapper>

      {/* <PostWrapper children={<div><h2>Hi Title!</h2>
        <p>Oh shoot! i forgot it!! Nevermind</p></div>}></PostWrapper>{/*can pass it as this also , but this is a veru ugly way of 
        doing this*/} 

      </div>

    </div>
    </>//fragment, using this we caan avoid one extra layer of nesting with div
  )
}



function Message(){
  //if there are three different of these components upon clicking the button of one component will only rerender the 
  // corresponding component, not all of them as they are differnt, they have their own state var and all, these changes
  // will be unrelated to all the other of of same component
  const [visible,setVisibility]=useState(false);

  function visibilityToggle(){
    setVisibility(!visible)//everytime there is change in state var the whole component will be rerendered, means all these line will run again
    // ererendering means react will recalculate, what should come inside dom
  }

  return(
    <div>
      <button onClick={visibilityToggle}>Show/Hide Messages</button>
      {visible&&<p>tHIS IS A SECRET message.....</p>}
    </div>
  )

}


function Tabs(){
  // with changing tabs, all the dynamic componens along with this component<Tabs/> are re-rendered, basically dynamic bits in app
  // component are re-reendered , static elements arent rerendered

  const [currentTab,setcurrentTab]=useState("home");
  const [loading,setLoading]=useState(true);
  const [tabData,settabData]=useState([])

  function changeTab(tab){
      setcurrentTab(tab)
  }

  const numberOfTab={"home":1,"notifications":2,"jobs":3,"messages":4}

  useEffect(()=>{
    setLoading(true)
    fetch('https://dummyjson.com/todos/'+numberOfTab[currentTab]).then(async (data)=>{
      let result= await data.json()
      settabData(result)
      setLoading(false)
    })

    // return (()=>{//this will run on cleanup
    //   settabData("")
    //   setLoading(true)
    // })

  },[currentTab])//now this fetch will only work on mounting of tabs or changing of current tab




  return(<div>
      <button  style={{color: currentTab==="home"?"red":"black"}} onClick={()=>changeTab("home")}>Home</button>
      <button style={{color: currentTab==="notifications"?"red":"black"}} onClick={()=>changeTab("notifications")}>Notifications</button>
      <button style={currentTab==="jobs"?{color: "red"}:{color: "black"}} onClick={()=>changeTab("jobs")}>Jobs</button>
      <button style={currentTab==="messages"?{color: "red"}:{color: "black"}} onClick={()=>changeTab("messages")}>Messages</button>
      <p>{loading?"Loading...":tabData.todo}</p>
  </div>)
}

export default App
//useEffect hook comes into play when dealing with sideEffects, those fn ths hsve nothing to do with the rendering of the dom,
// element. Side-effects are functions that interects wtih the real world like setting settimeout or a fetch fn.
// Sife effects dont care about the input output cycle of the component



/* Recorded 9.2 ClassNotes

Childrens:
these are the props that allows us to pass different components as clildrens to the component

Functional components are the fn that uses hooks inside them

ClassBased components extends the components class to create new components, also in this approach we use global state var
and upg=date it

syntax:

import React, { Component } from 'react';

class ClassCounter extends Component {
    state = { count: 0 };

    increment(){//this is the way of defining fn/methods in classes
        this.setState({ count: this.state.count + 1 });
    };

    render() {
        return (
            <div>
                <p>Count: {this.state.count}</p>
                <button onClick={this.increment}>Increment</button>
            </div>
        );
    }
}


lifecycle events: are the code executed upon the mounting, updating, demounting of components


Lifecycle Events in Class Bases Components:

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  componentDidMount() {
    console.log('Component mounted');
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('Component updated');
  }

  componentWillUnmount() {
    console.log('Component will unmount');
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>
      </div>
    );
  }
}

In Reaact components are supposed to return a single parent div, either to we can wrap all of our code in one <div> or we can
use fragments if we dont want to wrap our other elements inside of a div, this is how it can be done <></> or
import {Fragment} from react
return <Fragment>
iske andar kuch bhi
</Fragment>

Error Boundry
these are react components that catches js errors and display fallback ui without the whole page to be crashing, 
basically this can be used to enclose an error in the component, class based components are used for this rn
*/

class ErrorBoundary extends Component{
  constructor (props){
    super(props)
    this.state={hasError:false}
  }

  static getDerivedStateFromError(error){
    return {hasError: true}
  }
  componentDidCatch(error,info){
    // console.log(error,info);
    
  }
  render(){
      if(this.state.hasError){
        return (<><h1>Something Went Wrong</h1><button>Refresh</button></>)
      }
      return this.props.children
      
  }
}
function BuggyComponent(props) {
  throw new Error("kaido, you found me")
  return <>
    <h2>Glitch in teh Matrix!</h2>
    <p>Glitch in the Matrix!</p>
  </>
}


function PostWrapper(props){
  return <div style={{backgroundColor:"#2d3436", color:"#fff", width: "300px", gap: "2px", height: "max-content",display: "flex", flexDirection: "column", borderRadius: "20px", padding: "25px"}}>
        {props.children}
        {/* we can add normal just below and after the children */}
  </div>
}