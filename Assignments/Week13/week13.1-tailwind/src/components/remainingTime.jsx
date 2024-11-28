import { useEffect, useRef, useState } from "react"
import formatTime from "../utilities/timeFormat"
import { Link } from "react-router-dom"

export default function RemainingTime(){
    let [time,setTime]=useState(300)
    let clock=useRef()

    useEffect(()=>{
        clock.current=setInterval(()=>{
            setTime(time=>time-1)
        },1000)

        return ()=>{
            clearInterval(clock.current)
        }
    },[])
    
    if(time<1){
        clearInterval(clock.current)
        console.log(time);
        
    }
    

    return <>
    {time>0?<div className="text-sm mb-2 text-mariner-300 opacity-80 flex gap-2 items-center justify-center">
        <i class="fa-regular fa-clock"></i> 
        {formatTime(time).minutes}:{formatTime(time).seconds}
    </div>:<p className="text-sm mb-2 text-mariner-300 opacity-80 flex gap-2 items-center justify-center"><i class="fa-solid fa-arrow-rotate-right "></i><Link className="text-mariner-50 underline opacity-100" to="/otp-verification"> Resend Otp</Link></p>}
    </>
}