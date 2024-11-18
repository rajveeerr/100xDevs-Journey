import { useRef, useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import useFetch from '../hooks/useFetch'
import Card from '../../../Week9/recordedClassNotes9.3+9.4/src/Card'
import useReFetching from '../hooks/useReFetching'
import usePrev from '../hooks/usePrev'
import useDebounce from '../hooks/useDebounce'
import useDebounce2 from '../hooks/useDebounce2'

function App() {
  const [count, setCount] = useState(0)

  // Custom hooks are basically functions that starts with use and uses atleast one hook inside of them, only custom hooks
  // and components can have different hoooks(useEff and useRef etc etc)

  // Custom hooks basically allows us to encapsulate and reuse stateful logic

  return (
    <div>
       <Counter/>{/*all these counters have their own state variables, changing one wont affect others*/}
       <Counter/>
       <Post/>
       <RecepieDisplay/>
       <Input/>
       <InputDebounce/>
    </div>
  )
}

// react swr or anstack library contains these custom hooks and can be used

function useCounter(){//now this can be reused, this is named hook b/c it uses hook inside of it to it is also a hook
  const [count,setCount]=useState(0);

  function incCount(){
    setCount(count=>count+1)
  }

  return {
    count,
    incCount
  }
  
}

function Counter(){
  // const [count,setCount]=useState(0)
  // function incCount(){
  //   setCount(count=>count+1)
  // }

  const {count,incCount}=useCounter()//this is same as creating useState hook inside of the the component
  let previous=usePrev(count);

  const [glitch,setGlitch]=useState(false)


  return <div>
    <button onClick={incCount}>Count {count}</button>
    <button onClick={()=>setGlitch(!glitch)}>Glitch</button>
    <p>The previous value of count was: {previous}</p>
  </div>
}

function usePost(){
  const [postData,setPostData]=useState({})
  
  async function getData(){
    let response=await fetch("https://dummyjson.com/quotes");
    let data=await response.json();
    
    setPostData(data.quotes[0].quote);  
    
  }//needed to do this b/c i cant make the fn passed as arg to useEff async
  useEffect(()=>{
    getData();//this is always used inside of the useEffect hook to avoid unnessary fetch calls on re-rendering, and only
    // do it on mounting/unmounting
  },[])
  
  return postData//there is a bug, this post data is empty until the data is fetched

}

function Post(){
  let postData =usePost();
  // let postData =useReFetching("https://dummyjson.com/quotes",10);
  
  return <div>
    <h2>Random Quote</h2>
    {JSON.stringify(postData)}
  </div>
}

function RecepieDisplay(){
  let [currentRecepie,setCurrentRecepie]=useState(1);
  
  let {data,loading}=useFetch("https://dummyjson.com/recipes/"+currentRecepie)//created this in seperate file
  let recepieData=data;
  
  
  // let recepieData=useFetch("https://dummyjson.com/recipes/1").data//created this in seperate file
  
  if (loading){
    return <div>
      <h2>Loading Content...</h2>
    </div>
  }
  
  return (
    <div>
    <h1>Recepie of the Day.</h1>
    <button style={currentRecepie===1?{color: "red"}:{color: "white"}} onClick={()=>setCurrentRecepie(1)}>Recepie#1</button>
    <button style={currentRecepie===2?{color: "red"}:{color: "white"}} onClick={()=>setCurrentRecepie(2)}>Recepie#2</button>
    <button style={currentRecepie===3?{color: "red"}:{color: "white"}} onClick={()=>setCurrentRecepie(3)}>Recepie#3</button>
    {/* {JSON.stringify(quoteData)} */}
    <div style={{color: "black",display: "flex",justifyContent:"center",alignItems:"center"}}>
      {<Card title={recepieData.name} subTitle={recepieData.ingredients} imgUrl={recepieData.image} time={recepieData.cookTimeMinutes} postImg={recepieData.image} content={recepieData.instructions}/>}
    </div>
  </div>)
}

async function fetchdata(){
    let response=await fetch("https://dummyjson.com/quotes");
    let data=await response.json();
    console.log(data);
    
    return data//there is a bug, this post data is empty until the data is fetched
}

function Input() {
  const changeHandeler=useDebounce(fetchdata);//passing the fn which needs to be called if everything is good

  return <div>
    <h2>Search Fast</h2>
    <input onChange={changeHandeler}></input>
  </div>
}


//implementation2
function InputDebounce() {
  const [value,setValue]=useState("")
  const debouncedValue=useDebounce2(value,400)//debouncedValue will be changed after delay time if user stops typing
  
  const changeHandeler=(e)=>{
    setValue(e.target.value)
  }

  useEffect(()=>{
    console.log("called expensive fn");
    
  },[debouncedValue])//dependency array should always be a state var. if  no debounce is to be used we can simply write value to the 
  // dependencies array meaning whenever value changes call the expensive operation

  return <div>
    <h2>Search Fast</h2>
    <input onChange={changeHandeler}></input>
  </div>
}


export default App
