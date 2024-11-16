import { useEffect, useRef, useState } from "react";
import useFetch from "./useFetch";



export default function useDebounce(debouncedfn){
    
    let debounceTime=useRef()
    // let debounce=useRef(true);
    
    // useEffect(()=>{
        // let timeout=setTimeout(()=>{
        //     debounce.current=false;
        //     //maybe i need to empty the reference to this(aka debounceTime) after completion of timeout
        // },50)

        return ()=>{
            clearTimeout(debounceTime.current)
            
            debounceTime.current=setTimeout(()=>{
                console.log("call expensive function");
                debouncedfn();
            },500)
        }

        
        // return ()=>{
        //     clearTimeout(debounceTime.current)
        // }
    // },[debouncedfn])
    
    // if(debounce){
    //     console.log("Pull your horses, youre way too fast!!");
    // }
    // else{
        // console.log("call expensive function");
        // // console.log(useFetch("https://dummyjson.com/recipes/2"));
        // debounceTime.current=setTimeout(()=>{
    // }
// }
}