import { Outlet } from "react-router-dom";
import Logo from "../components/logo";
import { DataProvider } from "../context/dataContext";
import StepIndicatorBars from "../components/progressBars";
import { useContext } from "react";
import { StepCountContext } from "../context/stepCountContext";

export default function Layout(){
    let {step}=useContext(StepCountContext)
    let routeIndexMap={
        "1":"/verification",
        "2":"/email",
        "3":"/otp-verification",
    }
    
    return <div className='bg-gradient-to-b from-black to-[#001831] w-full min-h-screen text-mariner-50 flex flex-col p-8 md:p-16 font-inter'>
        <Logo/>
        <DataProvider>
            <div className='pt-2 flex flex-col md:items-center md:text-center'>
                <StepIndicatorBars totalBars={3} currentStep={step} pageRouteandIndex={routeIndexMap}/>
                <Outlet/>
            </div>
        </DataProvider>
    </div>
}