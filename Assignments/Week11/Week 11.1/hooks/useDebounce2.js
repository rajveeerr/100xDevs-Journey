import { useEffect, useRef, useState, useTransition } from "react";


export default function useDebounce2(value,delay){
    let [debounceValue,setDebounceValue]=useState("")
    let clock=useRef();
  
    useEffect(()=>{
      clock.current=setTimeout(()=>{
        setDebounceValue(value)
      },delay)
  
      return ()=>{
        clearInterval(clock.current)
      }
    },[value])
  
    return debounceValue
  }

  //useTransition() hook allows us to defer non critical parts of the ui, and allow critical parts to be rendered/loaded with priority
// while non critical parts can be loaded in background, evertyhing wrapped inside 
let [isPending,startTransition]=useTransition();//isPending tells if the transition is pending, every non critical fn can be wrapped inside startTransition
// startTransition(()=>{
    // is non critical and will be loaded in the bg, tasks like filtering ,sorting etc etc and fallback text can be displayed while
    // they are being loaded i.e isPending===true
    // })
