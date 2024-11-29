import { createContext, useEffect, useState } from "react";

export let StepCountContext=createContext()

export function StepCountProvider({children}){
    let [step,setStepsCount]=useState(1)

    useEffect(()=>{
        const savedStepCount = JSON.parse(localStorage.getItem('stepCount'))||1;
        setStepsCount(savedStepCount);
    },[])

    useEffect(()=>{
        localStorage.setItem('stepCount',JSON.stringify(step))
        console.log("steps saved");
      },[step])

    return <StepCountContext.Provider value={{step,setStepsCount}}>
        {children}
    </StepCountContext.Provider>
}

