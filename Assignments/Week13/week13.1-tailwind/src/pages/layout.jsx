import { Outlet } from "react-router-dom";
import Logo from "../components/logo";
import { DataProvider } from "../context/dataContext";

export default function Layout(){

    return <div className='bg-gradient-to-b from-black to-[#001831] w-full h-screen text-mariner-50 flex flex-col p-8 md:p-16 font-inter'>
      <div className='text-2xl font-bold flex items-center md:justify-center'>
        <Logo/>
      </div>
      <DataProvider>
        <Outlet/>
      </DataProvider>
    </div>
}