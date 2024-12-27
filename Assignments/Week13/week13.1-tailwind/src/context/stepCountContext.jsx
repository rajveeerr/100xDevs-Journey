import { createContext , useState } from "react";

export let StepCountContext=createContext()

export function StepCountProvider({children}){
    let [step,setStepsCount]=useState(1)

    return <StepCountContext.Provider value={{step,setStepsCount}}>
        {children}
    </StepCountContext.Provider>
}

