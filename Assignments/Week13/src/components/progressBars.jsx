import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function StepIndicatorBars({totalBars,currentStep,pageRouteandIndex}){
    const indexRouteMap=useRef(pageRouteandIndex)
    const navigate=useNavigate()
    console.log(currentStep);
    
    let changeRoute=(to)=>{
        navigate(indexRouteMap.current[to])
    }
    
    return <div className="w-full flex flex-col justify-center md:items-center">
        <div className="flex items-center justify-start gap-1 my-2 ">
            Step <span className="flex w-5 h-5 items-center justify-center rounded-full p-1 bg-mariner-500/40 font-bold text-sm">{currentStep}</span>
            </div>
        <div className="flex items-center w-full max-w-80 gap-2">
            {Array(totalBars).fill(1).map((element,index)=>
            <IndicatorBar key={index} onClick={changeRoute} index={index+1} active={index+1<=currentStep}/>)}
        </div>
    </div>
}

function IndicatorBar({onClick,index,active}){
    return <span onClick={()=>onClick(index)} className={`h-2 cursor-pointer rounded-xl flex-1 
        ${active ? 'bg-blue-500 text-white' : 'bg-mariner-950'} `}></span>
}