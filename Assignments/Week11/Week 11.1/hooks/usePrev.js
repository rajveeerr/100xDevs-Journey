import { useEffect, useRef, useState } from "react"

/*
export default function usePrev(currentValue){
    //this is used to get the previous value of the state var
    let previousValue=useRef()//initially this is set to null, using ref was crutial here as changing it doesnt trigger rerenders

    useEffect(()=>{
        previousValue.current=currentValue
    },[currentValue])//this works because currentValue is a state var

    return previousValue.current//react returns first and effects gets called later(maybe this is bc useEff has a callback which returns after component re-renders) 
    // so this will first return the previous value of state var and then the ueEff will be called to update the current val in useRef

    // Order of execution
    // 1.usePre() is called and value of useRef is set to null
    // 2.the value of useRef is returned
    // 3.useEffect then gives a callback which sets the value of useRef to the received param after the component is done rendering

    // Problem with this approach?? When the component is rendered twice this usePrev hook is called with the same state and this hook
    // returns the same value as the parameter passed not the precvious one
    
}
*/

//correct implementation=>

export default function usePrev(value,initial){
    let ref=useRef({target: value,previous: initial})
    if(value!=ref.current.target){//this checks if the passed state is same as the last state
        ref.current.previous=ref.current.target;
        ref.current.target=value
    }
    return ref.current.previous
}