import { useContext, useEffect, useRef, useState } from "react"
import { Data } from "../context/dataContext"
import { useNavigate } from "react-router-dom"
import Input from "../components/input"
import Button from "../components/button"
import { saveData } from "../utilities/saveData"
import { StepCountContext } from "../context/stepCountContext"

export default function AgeVerification(){
    let {data,setData}=useContext(Data)
    let {setStepsCount}=useContext(StepCountContext)
    let nav=useNavigate()
    let [valid,setValid]=useState(false)
    let input=useRef()
  
    let submitHandeler= ()=>{
      if(valid){
        saveData(setData,{age: input.current.value})
        nav("/email")
      }
    }
  
    let checkValidity=(e)=>{
      setValid(e.target.checkValidity())
      e.target.reportValidity()
    }

    useEffect(()=>{
        setStepsCount(1)
    },[])
  
    return <div className='pt-8 flex flex-col md:items-center md:text-center'>
        <h1 className='text-4xl font-bold leading-tight'>Verify Your Age</h1>
        <p className='text-base leading-normal mt-2 max-w-80 text-mariner-300'>Please confirm your date of birth. This data will not be stored.</p>
        <div className='mt-6 w-full max-w-80'>
            <Input refVar={input} placeholder="Enter your year of birth" type="number" defaultValue={data.age} max={2024} min={1950} onBlur={checkValidity} onChange={checkValidity} required={true}/>
        </div>
        <div className='mt-4 w-full max-w-80'>
            <Button onClick={submitHandeler} disabled={!valid}>Submit</Button>
        </div>
    </div>
}
