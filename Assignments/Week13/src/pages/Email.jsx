import { useContext, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Data } from "../context/dataContext"
import Button from "../components/button"
import Input from "../components/input"
import { saveData } from "../utilities/saveData"
import { StepCountContext } from "../context/stepCountContext"

export default function Email(){
    let {data,setData}=useContext(Data)
    let {setStepsCount}=useContext(StepCountContext)
    let nav=useNavigate()
    let [valid,setValid]=useState(false)
    let input=useRef()
  
    let submitHandeler= ()=>{
      if(valid){
        saveData(setData,{email:input.current.value})
        nav("/register/otp-verification")
      }
    }
    
    let checkValidity=(e)=>{
      setValid(e.target.checkValidity())
      e.target.reportValidity()
    }
    
    let redirect=()=>{
        console.log(data)
        if(!data.age){
            nav("/register/age")
        }
    }
    useEffect(()=>{
        redirect()
        setStepsCount(2)
    },[])

    return <div className='pt-8 flex flex-col md:items-center md:text-center'>
      <h1 className='text-4xl font-bold leading-tight'>Enter Your Email</h1>
      <p className='text-base leading-normal mt-2 max-w-80 text-mariner-300'>Please enter your email for OTP Verification.</p>
      <div className='mt-6 w-full max-w-80'>
        <Input refVar={input} placeholder="Enter your email" type="email" defaultValue={data.email} onBlur={checkValidity} onChange={checkValidity} required={true}/>
      </div>
      <div className='mt-4 w-full max-w-80'>
        <Button onClick={submitHandeler} disabled={!valid}>Submit</Button>
      </div>
    </div>
  }
  