import { useState , useEffect, useRef } from "react";
import { formatTime, calculateTime } from "../utils/auxiliaryFunctions";
// document.documentElement.setAttribute("data-theme","light")

export function Timer(props){
    
    const [time,setTime]=useState(localStorage.getItem("time")||60);
    const [isRunning, setRunning]=useState(false);//ideally this should be a useRef to reduce renders
    const [editState,setEditState]=useState(false);
    const newTime=useRef(localStorage.getItem("newTime")||false)
    
    const hours=useRef()
    const minutes=useRef()
    const seconds=useRef()
    const form=useRef()
    const timeUpAudio=useRef(new Audio("../../public/timeup.mp3"));//lesson learned here, to use useRef()
    
    useEffect(()=>{
        if(time<=0){
            clearInterval(isRunning);
            setRunning(false);
        }
        localStorage.setItem("time",time)
        setProgress((newTime.current?time/newTime.current:time/60)*100);
        timeUpAudioTrigger(); 
    },[time])
    
    useEffect(()=>{
        if(editState){
            pauseTimer();
            newTime.current=time;
            //check  if the element passed is hour minute or second -done
            //check if the passed value is valid -done 
        }
        localStorage.setItem("newTime",newTime.current)
    },[editState])
    


        
    function timeUpAudioTrigger(){
        timeUpAudio.current.pause()
        if(isRunning&&time<1){
            timeUpAudio.current.play()
        }
    }
        
   
    function setProgress(percent) {
        const svg = document.querySelector('.progress-ring');
        const circle = document.querySelector('.progress-ring__circle');
        const circleBackground = document.querySelector('.progress-ring__circle_background');
        
      
        const svgBounds = svg.getBoundingClientRect();
        const radius = svgBounds.width * 0.47;
        const circumference = 2 * Math.PI * radius;
      
        circle.setAttribute('r', radius);
        circle.style.strokeDasharray = circumference;
      
        const offset = circumference * (1 - percent / 100);
        circle.style.strokeDashoffset = offset;
      
        circleBackground.style.strokeDasharray = circumference;
        circleBackground.style.strokeDashoffset = circumference * (percent / 100);
      }
    const startTimer= ()=>{
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
            }
            else{
                let intervalId=setInterval(()=>{
                    setTime(time=>time-1)
                },1000);
                setRunning(intervalId);
                
            }
        }
        else{
            form.current.reportValidity()
            return
        }
    }
    
    const pauseTimer= ()=>{
        if(isRunning){
            clearInterval(isRunning);
            setRunning(false)
            return;
        }
        console.log("timer is paused already");
    }
    
    const resetTimer= ()=>{
        newTime.current=false
        if(!isRunning&&time==0){
            console.log("timer is resetted already");
            localStorage.setItem("newTime",newTime.current)
            return;
        }
        clearInterval(isRunning);
        setRunning(false);
        setTime(0);
        localStorage.setItem("newTime",newTime.current)
        return;
    }
    
    const toggleEdit=(element)=>{
        editState?setEditState(false):setEditState(element.current);
    }
    
    const editFieldHandeler=(e)=>{
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
        localStorage.setItem("newTime",newTime.current)
    }
    

    return(
    <div class="timer-container">
        <div class="timer-progress">

            <TimerIcon/>

            <div class="time">

                <form ref={form} onSubmit={(e)=>{e.target.reportValidity(); e.preventDefault();console.log("form submitted");}}>
                    <input type="number" ref={hours} max="23" min="0" value={formatTime(time).hours} onChange={(e)=>editFieldHandeler(e)} onFocus={()=>!editState?toggleEdit(hours):null} onBlur={(e)=>{e.target.checkValidity()?toggleEdit(props.type):e.target.reportValidity();editFieldHandeler(e.target)}}></input>
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
            <svg class="progress-ring progress-ring-background" width="100%" height="100%">
                <circle class="progress-ring__circle progress-ring__circle_background" stroke="var(--accent-color)" stroke-width="10" fill="transparent" r="47%" cx="50%" cy="50%" />
            </svg>

        </div>
        

        <div class="buttons-section">
            {isRunning?<button onClick={pauseTimer}>Pause</button>:<button onClick={startTimer}>Start</button>}
            <button onClick={resetTimer}>Reset</button>    
        </div>
        <div>
            Tip: You cant input hour/minute value more than 59, else the time youre updating will reset to 0 You can edit time, by clicking on the field you want to edit, refressing page will not cause timer to loose isn
            value just the timer will be paused/stopped you have to restart it manually, Upon reset you can restart timer of 60s by clicking
            start button or you can create a custom time just by editing it. Please either reset or edit time before restarting or else timer will behave wierdly
        </div>

    </div>)
}

function TimerIcon(props){
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

