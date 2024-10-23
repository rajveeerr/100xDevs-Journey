import { useState, useEffect } from 'react'
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

  return (
    <div>
    {/* <Message></Message> */}


      <div style={{width: "100vw", display: "flex", flexDirection:"column", gap: "2rem", padding:"20px", justifyContent: "center", alignItems: "center"}}>
        {/* [<Card title={"Rajveeerr"} subTitle={"Mentor@GGSIPU"} imgUrl={"/logoImg.jpg"} time={"12m"} content={data}></Card> */}
        {/* ,<Card title={"100xDevs"} subTitle={"Promotion"} imgUrl={"/logoImg.jpg"} time={"12m"} content={data} postImg={"/postImg.jpg"}></Card>] */}
        {/* putting the cards in array does the same thing as without putting them in it, it is an array of components */}
        
      <button onClick={addPosts}>Add Post/Card</button>

      {posts.map(post=>{
        return (<Card title={post.title} subTitle={post.subTitle} imgUrl={post.imgUrl} time={post.time} postImg={post.postImg} content={post.content}></Card>)
        // here we are simply mapping each of the state objects array to components array, means creating a component
        // for each state object

        // workflow of this-> upon clicking on add card btn i am appending data of a post in the state var and then
        // i am creating [array of components] for each of the data present in state therefter displaying them on dom, the 
        // moment i'll update state var react will simply re run this entire function, and the new components generated will be
        // displayed
      })}

      </div>

    </div>
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

export default App
//useEffect hook comes into play when dealing with sideEffects, those fn ths hsve nothing to do with the rendering of the dom,
// element. Sideeffects are functions that interects wtih the real world like setting settimeout or a fetch fn.
// Sife effects dont care about the input output cycle of the component
