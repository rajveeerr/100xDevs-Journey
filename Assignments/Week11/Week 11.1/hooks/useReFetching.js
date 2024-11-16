import { useEffect, useState } from "react";

export default function useReFetching(url,polingTime){
    let [data,setData]=useState({});
    let [loading,setLoading]=useState(true);

    let getData= async ()=>{
        setLoading(true)
        try{
            let response=await fetch(url);
            let responseData=await response.json();
            setData(responseData)
            setLoading(false)
        }
        catch(err){
            console.log("An error Occured while re-fetching");
        }
    }

    // useEffect(()=>{
    //     getData();
    // },[url])

    useEffect(()=>{
        let clock=setInterval(()=>{
            getData();
        },polingTime*1000)   
    },[])

    return {data,loading};
}