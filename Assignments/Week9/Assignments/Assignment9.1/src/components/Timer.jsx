import { useState , useEffect, useRef } from "react";
import { formatTime, calculateTime } from "../utils/auxiliaryFunctions";
// document.documentElement.setAttribute("data-theme","light")
export function Timer(props){
    


    

  
    
    const [time,setTime]=useState(localStorage.getItem("time")||60);
    const [isRunning, setRunning]=useState(false);//ideally this should be a useRef to reduce renders
    const [editState,setEditState]=useState(false);
    const newTime=useRef(false)
    
    const hours=useRef()
    const minutes=useRef()
    const seconds=useRef()
    const form=useRef()
    const timeUpAudio=useRef(new Audio("../../public/timeup.mp3"));//lesson learned here, to use useRef()
    
    useEffect(()=>{
        if(time<=0){
            clearInterval(isRunning);
            setRunning(false);
            localStorage.setItem("isRunning",isRunning)
        }
        localStorage.setItem("time",time)
        setProgress((newTime.current?time/newTime.current:time/60)*100);
        timeUpAudioTrigger();
    },[time])
    
    useEffect(()=>{
        if(editState){
            pauseTimer();
            //check  if the element passed is hour minute or second -done
            //check if the passed value is valid -done 
        }
        // else{
            newTime.current=time;
            // }
            localStorage.setItem("editState",editState)//dont need to really store this eventually
        },[editState])
        
        function timeUpAudioTrigger(){
            timeUpAudio.current.pause()
            if(isRunning&&time<1){
                timeUpAudio.current.play()
            }
        }
        
        
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
            if(form.current.checkValidity()){
                
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
                    localStorage.setItem("isRunning",isRunning)
            }
            else{
                let intervalId=setInterval(()=>{
                    setTime(time=>time-1)
                },1000);
                setRunning(intervalId);
                localStorage.setItem("isRunning",isRunning)
            }
        }
    }
    
    function pauseTimer(){
        if(isRunning){
            clearInterval(isRunning);
            setRunning(false)
            localStorage.setItem("isRunning",isRunning)
            return;
        }
        console.log("timer is paused already");
    }
    
    function resetTimer(){
        if(!isRunning&&time<=0){
            console.log("timer is resetted already");
            newTime.current=false
            return;
        }
        clearInterval(isRunning);
        setRunning(false);
        localStorage.setItem("isRunning",isRunning)
        setTime(0);
        newTime.current=false
        return;
    }

   
    
    function toggleEdit(element){
        // console.log("toggle edit is"+element.current);
        // toggle edit is being called even if the value of field is wrong
        
        editState?setEditState(false):setEditState(element.current);
        // console.log(editState);
        
    }
    
    const editFieldHandeler=(e)=>{
        // console.log(editState);
        
        
        if(editState===hours.current){
            newTime.current=calculateTime(e.target.value,minutes.current.value,seconds.current.value)
            setTime(newTime.current)
        }
        if(editState===minutes.current){
            newTime.current=calculateTime(hours.current.value,e.target.value,seconds.current.value)
            setTime(newTime.current)
        }
        if(editState===seconds.current){
            newTime.current=calculateTime(hours.current.value,minutes.current.value,e.target.value)
            setTime(newTime.current)
        }
                
    }
    

  

    return(
    <div class="timer-container">
        <div class="timer-progress">

            <TimerIcon/>

            <div class="time">

                {/* {editState?
                <form><input type="number" ref={hours} max="23" min="0" defaultValue={formatTime(time).hours} onBlur={()=>edit(hours)}></input>
                </form>: */}
                <form ref={form} onSubmit={(e)=>{e.target.reportValidity(); e.preventDefault();console.log("form submitted");
                }}>
                    <input type="number" ref={hours} max="23" min="0" value={formatTime(time).hours} onChange={(e)=>editFieldHandeler(e)} onFocus={()=>!editState?toggleEdit(hours):null} onBlur={(e)=>{e.target.checkValidity()?toggleEdit(hours):e.target.reportValidity();editFieldHandeler(e)}}></input>
                    <span class="time-seperator">:</span>
                    <input type="number" ref={minutes} max="60" min="0" value={formatTime(time).minutes} onChange={(e)=>editFieldHandeler(e)} onBlur={(e)=>{e.target.checkValidity()?toggleEdit(minutes):e.target.reportValidity();editFieldHandeler(e)}} onFocus={()=>!editState?toggleEdit(minutes):null}></input>
                    <span class="time-seperator">:</span>
                    <input type="number" ref={seconds} max="60" min="0" value={formatTime(time).seconds} onChange={(e)=>editFieldHandeler(e)} onFocus={()=>!editState?toggleEdit(seconds):null} onBlur={(e)=>{e.target.checkValidity()?toggleEdit(seconds):e.target.reportValidity();editFieldHandeler(e)}}></input>
                    
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