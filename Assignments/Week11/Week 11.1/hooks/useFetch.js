import { useEffect, useState } from "react";

export default function useFetch(url){
    let [data,setData]=useState({});
    let [loading,setLoading]=useState(true);
    // let [currentUrl,setCurrentUrl]=useState();

    let getData= async ()=>{
        setLoading(true)
        try{
            let response=await fetch(url);
            let responseData=await response.json();
            setData(responseData)
            setLoading(false)
        }
        catch(err){
            console.log("An error Occured while fetching");
        }
        // finally{//regardless of the case if error was thrown or not, this field will always run
        //     setLoading(false)
        // }
    }

    useEffect(()=>{
        getData();

        return ()=>{//cleanup
            // setData({})//noo need to do this
        }
    },[url])//now if the url is changes the data will be fetched again, if the dependencies array will be empty the getData will only
    // be called upon mounting of component
    // if the getData is called outside useEffect(), it will fetch and update data(stateVar) everytime the component rerenders and this
    // change in state will trigger rerender in parent component this will cause an infinite loop

    return {data,loading};
}