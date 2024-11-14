import { useEffect, useState } from "react";

export default function useFetch(url){
    let [data,setData]=useState({});
    // let [currentUrl,setCurrentUrl]=useState();

    let getData= async ()=>{
        let response=await fetch(url);
        let responseData=await response.json();
        setData(responseData)
    }

    useEffect(()=>{
        getData();
    },[])

    return {data};
}