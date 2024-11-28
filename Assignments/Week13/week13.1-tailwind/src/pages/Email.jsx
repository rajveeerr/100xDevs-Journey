import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Data } from "../context/dataContext"
import Button from "../components/button"
import Input from "../components/input"

export default function Email(){
    let data=useContext(Data)
    let nav=useNavigate()
    let [valid,setValid]=useState(false)
  
    let submitHandeler= ()=>{
      if(valid){
        nav("/otp-verification")
      }
    }
    
    let checkValidity=(e)=>{
      setValid(e.target.checkValidity())
      e.target.reportValidity()
      if(e.target.value&&valid){ data.current.email=e.target.value;console.log(data.current);
      }
    }

    let redirect=()=>{
        if(!data.current.age){
            nav("/verification")
        }
    }
    useEffect(()=>{
        redirect()
    },[])

    return <div className='pt-12 flex flex-col md:items-center md:text-center'>
      <h1 className='text-4xl font-bold leading-tight'>Enter Your Email</h1>
      <p className='text-base leading-normal mt-2 max-w-80 text-mariner-300'>Please enter your email for OTP Verification.</p>
      <div className='mt-6 w-full max-w-80'>
        <Input placeholder="Enter your email" type="email" defaultValue={data.current.email} onBlur={checkValidity} onChange={checkValidity} required={true}/>
      </div>
      <div className='mt-4 w-full max-w-80'>
        <Button onClick={submitHandeler} disabled={!valid}>Submit</Button>
      </div>
    </div>
  }
  