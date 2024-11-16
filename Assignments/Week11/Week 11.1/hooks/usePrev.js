import { useEffect, useRef, useState } from "react"


export default function usePrev(currentValue){
    //this is used to get the previous value of the state var
    let previousValue=useRef()//initially this is set to null, using ref was crutial here as changing it doesnt trigger rerenders

    useEffect(()=>{
        previousValue.current=currentValue
    },[currentValue])

    return previousValue.current//react returns first and effects gets called later(maybe this is bc useEff has a callback) 
    // so this will first return the previous value of state var and then the ueEff will be called to update the current val in useRef
}