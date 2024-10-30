import { useState , useEffect, useRef } from "react";
import { formatTime, calculateTime } from "../utils/auxiliaryFunctions";

export function Timer(props){

    const [time,setTime]=useState(60);
    const [isRunning, setRunning]=useState(false);//ideally this should be a useRef to reduce renders
    const [editState,setEditState]=useState(false);
    const newTime=useRef(false)

    const hours=useRef(null)
    const minutes=useRef(null)
    const seconds=useRef(null)

    useEffect(()=>{
        // let intervalId=setInterval(()=>{
        //     setTime(time=>time-1)
            
        //     console.log(time);
        // },1000);
        // setRunning(intervalId);
        // return ()=>{
        //     clearInterval(isRunning);
        //     setRunning(false);
        // }
        
        if(time<=0){
            clearInterval(isRunning);
            console.log("cleared interval");
            
            setRunning(false);
        }
    },[time])



    useEffect(()=>{
            setProgress((newTime.current?time/newTime.current:time/60)*100);
    },[time])

    useEffect(()=>{
            newTime.current=time;
    },[editState])
    


    function setProgress(percent){
        const svg = document.querySelector('.progress-ring');
        const circle = document.querySelector('.progress-ring__circle');

        const svgWidth = svg.getBoundingClientRect().width;
        const radius = svgWidth * 0.47;

        const circumference = 2 * Math.PI * radius;

        // Set the stroke-dasharray and initial stroke-dashoffset
        circle.setAttribute('r', radius);
        circle.style.strokeDasharray = circumference;
        circle.style.strokeDashoffset = circumference;

        const offset = circumference * (1 - percent / 100);
        circle.style.strokeDashoffset = offset;
  }

  function startTimer(){
    if(isRunning){
        console.log("timer is running already");
        return;
    }
    else if(time<=0){
        setTime(60)
        let intervalId=setInterval(()=>{
            setTime(time=>time-1)
        },1000);
        setRunning(intervalId);
        
    }
    else{
        let intervalId=setInterval(()=>{
            setTime(time=>time-1)
        },1000);
        setRunning(intervalId);
    }
  }
  function pauseTimer(){
    if(isRunning){
        clearInterval(isRunning);
        setRunning(false)
        return;
    }
    console.log("timer is paused already");
}
    function resetTimer(){
        if(!isRunning&&time<=0){
            console.log("timer is resetted already");
            
        }
        clearInterval(isRunning);
        setRunning(false);
        setTime(0)
        return;
  }
  
  function edit(element){
    element.current.setAttribute("editable","true");
    console.log("editing "+element.current);
    
  }
  


    return(
    <div class="timer-container">
        <div class="timer-progress">

            <div class="timer-icon">
                <i class="fa-solid fa-mug-hot"></i>
            </div>
            <div class="time">
                <h1 ref={hours} onClick={()=>edit(hours)}>{formatTime(time).hours>=0?formatTime(time).hours:"00"}</h1>
                <span class="time-seperator">:</span>
                <h1 ref={minutes} onClick={()=>edit(minutes)}>{formatTime(time).minutes>=0?formatTime(time).minutes:"00"}</h1>
                <span class="time-seperator">:</span>
                <h1 ref={seconds} onClick={()=>edit(seconds)}>{formatTime(time).seconds>=0?formatTime(time).seconds:"00"}</h1>
            </div>
            <div class="timer-type">
                <p>Short Break</p>{/*props.timerTitle */}
                <br/>
            </div>
                {time===0&&<p>Time Up!!</p>}
        <svg class="progress-ring" width="100%" height="100%">
            <circle class="progress-ring__circle" stroke="var(--accent-color)" stroke-width="10" fill="transparent" r="47%" cx="50%" cy="50%" />
            
        </svg>
        </div>
        

        <div class="buttons-section">
            {isRunning?<button onClick={pauseTimer}>Pause</button>:<button onClick={startTimer}>Start</button>}
            <button onClick={resetTimer}>Reset</button>
            
            
        </div>

    
    </div>)
}