import { useContext, useEffect, useRef, useState } from "react"
import Button from "./button"
import RemainingTime from "./remainingTime"
import { Data } from "../context/dataContext"

export default function OTPBoxes({length,onSubmit}){
    
    let [filled,setFilled]=useState(false)
    let inputBoxes=Array.from({length},()=>useRef())
    let {data,setData}=useContext(Data)
    
    // Array.from produces an array having different elements at each index, unlike Array(2).fill(useRef()) which references a 
    // single element, (Array(2) will create array of 2 elements)

    // another cool way of creating a refence to all the input boxes would be just creating an ref array which stores(e/event/elemnt)
    // at different indexes, this is how we can do it
    /*
    let ref=useRef([])
    {inputBoxes.map((inputRef,index)=>
        <OtpInput key={index} refVal={(e)=>ref.current[index]=e} type={"number"} max={9} min={0} onKeyUp={(e)=>inputHandeler(e,index)}/>)} 
    */

    let submitHandeler=()=>{
        if(filled){
            let otpValue=inputBoxes.map((input)=>input.current.value).toString().split(",").join("")
            console.log(otpValue);
            onSubmit(otpValue);
        }
    }
 
    let validityCheck=(e)=>{
        let valid=true;
        let i=0;
        while(valid&&i<inputBoxes.length){
            valid=inputBoxes[i].current.value.length===1
            i++;
        }
        isFinite(e.key)||e.key === "Backspace" || e.key === "Delete"?setFilled(valid):null
    }
    
    useEffect(()=>{
        document.addEventListener("keyup",validityCheck)
        return ()=>{
            document.removeEventListener("keyup",validityCheck)
        }
    },[])
    
    let inputHandeler=(e,index)=>{
        try{
            if((isFinite(e.key) && e.key !== ' ')||e.key === "Backspace" || e.key === "Delete"){
                if (e.target.value.length>1){
                    e.target.value=""
                    e.target.value=e.key
                    e.target.blur()
                    inputBoxes[index+1].current.focus()
                    }
                    else if(e.target.value.length===1){
                        e.target.blur()
                        inputBoxes[index+1].current.focus()
                    }
                    else{
                        inputBoxes[index-1].current.focus()
                    }
            }
            else{
                e.target.value=""
            }
        }
        catch(err){
            console.log(err);
        }
    } 
    
    return <>
        <div className="flex items-center justify-center gap-2 ">
            {inputBoxes.map((inputRef,index)=>
            <OtpInput key={index} refVal={inputRef} type={"number"} max={9} min={0} onKeyUp={(e)=>inputHandeler(e,index)}/>)}
        </div>
        <div className='mt-4'>
            <RemainingTime/>
            <Button onClick={submitHandeler} disabled={!filled}>Verify</Button>
        </div>
    </>
}

function OtpInput({refVal,max,min,type,onKeyUp}){

    return <input ref={refVal} max={max} type={type} min={min} onKeyUp={onKeyUp}
    className="flex items-center justify-center px-4 w-12 h-12 text-2xl rounded-xl bg-mariner-600/[0.3] [appearance:textfield] 
    [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"></input>
}

// what can i do more?? 
// add steps wala indicator -> done, 
// localstorage for filled inputs -> done,
// more styling 
// fix font problem -> done