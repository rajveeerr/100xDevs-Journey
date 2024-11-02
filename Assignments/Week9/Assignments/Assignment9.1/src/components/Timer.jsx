import { useState , useEffect, useRef } from "react";
import { formatTime, calculateTime } from "../utils/auxiliaryFunctions";

export function Timer(props){

    const [time,setTime]=useState(60);
    const [isRunning, setRunning]=useState(false);//ideally this should be a useRef to reduce renders
    const [editState,setEditState]=useState(false);
    const newTime=useRef(false)

    const hours=useRef()
    const minutes=useRef()
    const seconds=useRef()

    useEffect(()=>{
        if(time<=0){
            clearInterval(isRunning);
            console.log("cleared interval");
            setRunning(false);
        }
        setProgress((newTime.current?time/newTime.current:time/60)*100);
    },[time])

    useEffect(()=>{
        
        if(editState){
            pauseTimer();
            //check  if the element passed is hour minute or second
            //check if the passed value is valid
            console.log(editState);
            
            // setTime(calculateTime(hours,minutes,seconds));
        }
        else{
            newTime.current=time;
        }
    },[editState])//this will run on mounting setting newTime to time(i.e 60) at time of mounting, now everytime user is done editing the time, only then newTime will be set to the edited time


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
            return;
        }
        clearInterval(isRunning);
        setRunning(false);
        setTime(0);
        newTime.current=false;
        return;
    }

    function toggleEdit(element){
        editState?setEditState(false):setEditState(element.current);
    }

    function edit(e){
        // if(editState){
        //     pauseTimer();
        //     // if(element.current)//check  if the element passed is hour minute or second
        //     setTime(time+element.current.value*3600);
        // }
        // e.target.value===hours.current?setTime(e.target.value*3600):(e.target.value===minutes.current)?setTime(e.target.value*60):setTime(e.target.value*1);
        
        //setTime(calculateTime(hours,minutes,seconds));
    }
  

    return(
    <div class="timer-container">
        <div class="timer-progress">

            <TimerIcon/>

            <div class="time">

                {/* {editState?
                <form><input type="number" ref={hours} max="23" min="0" defaultValue={formatTime(time).hours} onBlur={()=>edit(hours)}></input>
                </form>: */}
                <form onSubmit={(e)=>{e.target.reportValidity(); e.preventDefault(); toggleEdit(hours);editState.blur()}}>
                    <input type="number" ref={hours} max="23" min="0" defaultValue={formatTime(time).hours} onChange={edit} onFocus={()=>toggleEdit(hours)} onBlur={(e)=>{toggleEdit(hours);e.target.reportValidity()}}></input>
                    <span class="time-seperator">:</span>
                    <input type="number" ref={minutes} max="60" min="0" defaultValue={formatTime(time).minutes} onChange={edit} onFocus={()=>toggleEdit(minutes)} onBlur={(e)=>{toggleEdit(minutes);e.target.reportValidity()}}></input>
                    <span class="time-seperator">:</span>
                    <input type="number" ref={seconds} max="60" min="0" defaultValue={formatTime(time).seconds} onChange={edit} onFocus={()=>toggleEdit(seconds)} onBlur={(e)=>{toggleEdit(seconds);e.target.reportValidity()}}></input>
                    
                </form>
            </div>

            <TimerTitle type="Short Break"/>
            <br/>
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

function TimerIcon(){
    return (
    <div class="timer-icon">
        <i class="fa-solid fa-mug-hot"></i>
    </div>)
}

function TimerTitle(props){
    return(
    <div class="timer-type">
        <p>{props.type}</p>
    </div>)
}
