import { createContext, useEffect, useState } from "react";

export let Data=createContext();

export let DataProvider=({children})=>{
  let [data,setData]=useState(JSON.parse(localStorage.getItem('data'))||{email:null,age:null,otp:null})

  useEffect(()=>{
    localStorage.setItem('data',JSON.stringify(data))
    console.log("data saved");
  },[data])

  return <Data.Provider value={{data,setData}}>
    {children}
  </Data.Provider>
}