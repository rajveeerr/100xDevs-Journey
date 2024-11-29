import { createContext, useEffect, useState } from "react";

export let Data=createContext();

export let DataProvider=({children})=>{
  let [data,setData]=useState({email:null,age:null,otp:null})

  useEffect(()=>{
    const savedData = JSON.parse(localStorage.getItem('data'))||{email:null,age:null,otp:null};
    setData(savedData);
  },[])

  useEffect(()=>{
    localStorage.setItem('data',JSON.stringify(data))
    console.log("data saved");
  },[data])

  return <Data.Provider value={{data,setData}}>
    {children}
  </Data.Provider>
}