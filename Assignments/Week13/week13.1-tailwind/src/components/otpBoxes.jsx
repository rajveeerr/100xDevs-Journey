import { useEffect, useRef, useState } from "react"

export default function OTPBoxes(){
    let input1=useRef()
    let input2=useRef()
    let input3=useRef()
    let input4=useRef()
    let input5=useRef()
    let input6=useRef()

    let inputBoxes=[input1,input2,input3,input4,input5,input6]
    
    let inputHandeler=(e,index)=>{
        if (e.target.value.length>1){
            e.target.value=""
            if(e.keyCode >= 48 && e.keyCode <= 57){
                e.target.value=e.keyCode-48
            }
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
   
    
    
    return <div className="flex items-center justify-center gap-2">
        <OtpInput refVal={input1} type="number" max={9} min={0} onKeyDown={(e)=>inputHandeler(e,0)}/>
        <OtpInput refVal={input2} type="number" max={9} min={0} onKeyDown={(e)=>inputHandeler(e,1)}/>
        <OtpInput refVal={input3} type="number" max={9} min={0} onKeyDown={(e)=>inputHandeler(e,2)}/>
        <OtpInput refVal={input4} type="number" max={9} min={0} onKeyDown={(e)=>inputHandeler(e,3)}/>
        <OtpInput refVal={input5} type="number" max={9} min={0} onKeyDown={(e)=>inputHandeler(e,4)}/>
        <OtpInput refVal={input6} type="number" max={9} min={0} onKeyDown={(e)=>inputHandeler(e,5)}/>
    </div>
}

function OtpInput({refVal,max,min,type,onKeyDown}){
    return <input ref={refVal} max={max} type={type} min={min} onKeyUp={onKeyDown}
    className="flex items-center justify-center px-4 w-12 h-12 text-2xl rounded-xl bg-mariner-600/[0.3] [appearance:textfield] 
    [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"></input>
}

// what can i do more?? add steps wala indicator more styling 
// localstorage for filled inputs-done