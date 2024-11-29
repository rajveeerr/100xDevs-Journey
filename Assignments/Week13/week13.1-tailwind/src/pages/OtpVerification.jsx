import { useContext, useEffect, useRef, useState } from "react"
import { Data } from "../context/dataContext"
import { Link, useNavigate } from "react-router-dom";
import OTPBoxes from "../components/otpBoxes";
import { StepCountContext } from "../context/stepCountContext";

export default function OTP(){
    let {data,setData}=useContext(Data);
    let {setStepsCount}=useContext(StepCountContext)
    let nav=useNavigate();
    
    let submitHandeler=(otpValue)=>{
        if(otpValue=="221002"){
            console.log("otp matched");
            nav("/home")
        }
        else{
            console.log("Invalid Otp");
        }
    }

    let redirect=()=>{
        if(!data.age){
            nav("/verification")
        }
        else if(!data.email){
            nav("/email")
        }
    }

    useEffect(()=>{
        redirect()
        setStepsCount(3)
    },[])

    return <div className='pt-8 flex flex-col md:items-center md:text-center'>
    <h1 className='text-4xl font-bold leading-tight w-full max-w-96'>Check Your Email For A Code</h1>
    <p className='text-base leading-normal mt-2 max-w-80 text-mariner-300'>Please enter the verification code sent to your email id <Link className="text-mariner-50 opacity-100" to="/email">{data.email} <i class="fa-solid fa-pen"></i></Link></p>
    <div className='mt-6 w-full max-w-80'>
        <OTPBoxes length={6} onSubmit={submitHandeler} />
    </div>
    <p className="text-sm mt-2 text-mariner-300 opacity-80 flex items center gap-1">Can't find the email? Click 
        <Link className="text-mariner-50 underline opacity-100" to="/otp-verification">here</Link> to resend.
    </p>
  </div>
}