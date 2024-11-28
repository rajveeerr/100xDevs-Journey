import { useContext, useEffect, useState } from "react"
import { Data } from "../context/dataContext"
import Input from "../components/input";
import Button from "../components/button";
import { Link, useNavigate } from "react-router-dom";
import OTPBoxes from "../components/otpBoxes";
import formatTime from "../utilities/timeFormat";
import RemainingTime from "../components/remainingTime";

export default function OTP(){
    let data=useContext(Data);
    let nav=useNavigate();
    
    let submitHandeler=()=>{
        nav("/home")
    }

    let redirect=()=>{
        if(!data.current.age){
            nav("/verification")
        }
        else if(!data.current.email){
            nav("/email")
        }
    }

    useEffect(()=>{
        redirect()
    },[])

    return <div className='pt-12 flex flex-col md:items-center md:text-center'>
    <h1 className='text-4xl font-bold leading-tight w-4/5 max-w-96'>Check Your Email For A Code</h1>
    <p className='text-base leading-normal mt-2 max-w-80 text-mariner-300'>Please enter the verification code sent to your email id <Link className="text-mariner-50 opacity-100" to="/email">{data.current.email} <i class="fa-solid fa-pen"></i></Link></p>
    <div className='mt-6 w-full max-w-80'>
        <OTPBoxes/>
    </div>
    <div className='mt-4 w-full max-w-80'>
        <RemainingTime/>
        <Button onClick={submitHandeler} disabled={true}>Verify</Button>
    </div>
    <p className="text-sm mt-2 text-mariner-300 opacity-80">Can't find the email? Click <Link className="text-mariner-50 underline opacity-100" to="/otp-verification">here</Link> to resend.</p>
  </div>
}


  