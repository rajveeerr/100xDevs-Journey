import { createContext, useEffect, useRef } from "react";


export let Data=createContext();


export let DataProvider=({children})=>{
  let data=useRef(JSON.parse(localStorage.getItem('data'))||{email:null,age:null,otp:null})
  useEffect(()=>{
    localStorage.setItem('data',JSON.stringify(data.current))
    console.log("data saved");
  },[data.current])


  return <Data.Provider value={data}>
    {children}
  </Data.Provider>
}