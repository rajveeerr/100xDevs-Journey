import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'
import useFetch from '../hooks/useFetch'
import Card from '../../../Week9/recordedClassNotes9.3+9.4/src/Card'

function App() {
  const [count, setCount] = useState(0)

  // Custom hooks are basically functions that starts with use and uses atleast one hook inside of them, only custom hooks
  // and components can have different hoooks(useEff and useRef etc etc)

  // Custom hooks basically allows us to encapsulate and reuse stateful logic

  return (
    <div>
       <Counter/>{/*all these counters have their own state variables, changing one wont affect others*/}
       <Counter/>
       <Counter/>
       <Counter/>
       <Post/>
       <QuoteGenerator/>
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
  
  return <div>
    {JSON.stringify(postData)}
  </div>
}

function QuoteGenerator(){
  let quoteData=useFetch("https://dummyjson.com/recipes").data
  console.log(quoteData);
  let recepie;
  if (Object.keys(quoteData).length!=0){
    recepie=quoteData.recipes[0]
  }
  
  

  return <div>
    <h1>Quote of the Day.</h1>
    {/* {JSON.stringify(quoteData)} */}
    {Object.keys(quoteData).length!=0?<Card title={recepie.name} subTitle={recepie.ingredients[0]} imgUrl={recepie.image} time={recepie.cookTimeMinutes} postImg={recepie.image} content={recepie.instructions}/>:console.log("empty obj")};
    
  </div>
}


function Counter(){
  // const [count,setCount]=useState(0)
  // function incCount(){
  //   setCount(count=>count+1)
  // }

  const {count,incCount}=useCounter()//this is same as creating useState hook inside of the the component

  return <div>
    <button onClick={incCount}>Count {count}</button>
  </div>
}

export default App
