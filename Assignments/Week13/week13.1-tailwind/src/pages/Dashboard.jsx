import { useState } from "react";
import Button from "../components/button";
import Logo from "../components/logo";
import useMobile, { useMobileOptimized } from "../hooks/useMobileHooks";
import { useEffect } from "react";
import { BookOpenText, Component, House, Radar, Users } from "lucide-react";

// in tailwind dark: automatically applies theme based on the operating system, to manually toggle dark mode, we can simply
// add dark attribute to the html tag using js to trigger the dark/light mode, also we need to add selector to the tailwind
// config file, which is a css selector checks for dark class in html element if the dark class is present, then render
// the app in dark mode, here we have to go out of the boundary of react to add the class to html tag, can be done using dom

// we just cant apply transition on an element that goes from visible to invisible, css dont know what to apply the transition on,
// tho we can apply transition on opacity,bg-color etc

// ugly way of creating dark mode would be to create a darkMode state var, and based upon its value give the colour

// things i ve learned from class and the changes i have made, from week13.2:-
// - importing/exporting default vs named exports
// - creating custon hook to check if the device is mobile or desktop
// - better and cleaner implementation of sidebar, by rendering all the items from a top level variable, rendering name
//   depending upon the state of sidebar(open/close), animating sidebar, making sidebar convert to bottom bar for mobile devices
//   gave block property to sidevar while keeping it fixed to its position
// - created layout of the design asked by kirat-tw, and made it responsive
//  i can write normal js inside of map, being used in jsx, by enclosing it in curley braces
// - react-lucide for icons

// -till the end of class kirat taught about how to build sidebar similar to what i did, the diff was ki for small devices 
//  his sidebar became absolute, it had open close state var and also is Mobile hook, he then created the layout shown 
//  using grid

let toggleTheme=()=>{
    document.querySelector("html").classList.toggle("dark")
}

export default function Dashboard(){
    let isMobile=useMobile()//should have been in context api

    return <div className='bg-gradient-to-b from-black to-[#001831] w-full min-h-screen text-mariner-50 
    flex flex-col font-inter'>
        <NavBar/>
        <div className="flex h-full w-full">
            <SideBar isMobile={isMobile}/>
            <Wrapper>
                <Content/>
            </Wrapper>
        </div>
    </div>
}
function NavBar(){
    return <div className="px-6 py-2 h-[4.1rem] w-full bg-[#0a0b10] border-b border-[#f9fafb1a] flex 
    justify-between items-center fixed z-20">
        <Logo size="small"/>
        <div className="w-max flex gap-2 items-center">
            <Button type="nav" variant="">Login</Button>
            <Button onClick={toggleTheme} type="nav" >Toggle</Button>
        </div>
    </div>
}

function Wrapper({children}){
    return <div className="ease-in-out duration-200 flex-1 flex flex-col bg-white 
    dark:bg-[#0a0b1063] pt-16 pb-28 md:pt-16 md:pl-0 md:pr-0 w-full min-h-screen overflow-scroll">
        {children}
    </div>
}

function Content(){
    return <>
        <div className="flex flex-col w-full gap-10">
            <div className="w-full h-36  bg-no-repeat bg-cover bg-center bg-red-300"></div>
            <div className="flex flex-col md:flex-row justify-start mx-auto gap-8 px-8 xl:px-24 flex-wrap">
                
                <div className="bg-yellow-300 w-56 h-72 rounded-lg -translate-y-1/2 hidden md:flex"></div>
                <div className="flex flex-col">
                    <h3 className="text-black dark:text-white font-medium text-xl">It's midnight, get some sleep</h3>
                    <h1 className="text-black dark:text-white font-extrabold text-4xl tracking-tight">Why visiting here, on Construction Site?</h1>
                    <div className="bg-indigo-300 max-w-[42rem] md:min-w-[34rem] h-96 rounded-lg flex-grow mt-8"></div>
                </div>
                <div className="bg-lime-300 md:max-w-96 min-w-[16rem] h-56 rounded-lg flex-grow"></div>
            </div>
        </div>
    </>
}

function SideBar({isMobile}){
    let [open,setOpen]=useState(!isMobile)//ideally this should be in a context api

    useEffect(()=>{
        setOpen(!isMobile)
    },[isMobile])

    let MenuItems = [
        { href: "#", Component: House, name: "Home" },
        { href: "#", Component: Users, name: "Profile" },
        { href: "#", Component: BookOpenText, name: "Documentation" },
        { href: "#", Component: Component, name: "Components" },
        { href: "#", Component: Radar, name: "Community" },
      ]  
      
    // i can take one var containing all sidebar data and map that inside from here sidebar component or use map indide the 
    // sidebar component

    return <>
        {!isMobile?
            <div className={` ${!isMobile?'translate-x-0':'translate-x-full'} transition-all ease-in-out duration-200
                min-w-14 max-w-72 flex flex-col items-center bg-mariner-50 dark:bg-[#0a0b10] border-r border-[#f9fafb1a] 
                pt-20 p-2 z-10 h-screen sticky top-0`}>
            {/* <div className="w-max"> */}
                <Button onClick={()=>setOpen(!open)} type="nav" >{open?"Collapse":"➤"}</Button>
            {/* </div> */}
            <div className="flex flex-col gap-3 mt-8 text-lg">
                <SidebarItem items={MenuItems} open={open} isMobile={isMobile}/>
            </div>
    </div>:
    <div className={`${isMobile?'translate-y-0':'translate-y-full'} transition-all ease-in-out duration-200 min-w-full
        min-h-20 flex items-center justify-center bg-mariner-50 dark:bg-[#0a0b10] border-t border-[#f9fafb1a] p-2 
        bottom-0 z-10 fixed`}>
            <div className="flex items-center gap-3 text-lg w-full justify-around">
                <SidebarItem items={MenuItems} open={open} isMobile={isMobile}/>
            </div>
    </div>}
   </>
}

//if a sidebar is active or not, this can be checked by matching itemnname and current pathname
function SidebarItem({open,items}) {

    return <>
        {items.map((item,index) => {
            let isActive=item.name==="Home"//here i can check for pathname
        
            return <div key={index} className={`flex items-center px-4 py-2 rounded-[0.4rem] gap-3 hover:bg-[#2051d926]
             hover:text-nav-to dark:hover:text-nav-from ${open?'w-56':'w-14'} cursor-pointer text-lg 
             font-medium tracking-tight transition-all duration-300 
             ${isActive?"text-nav-to dark:text-nav-from bg-[#2051d926] dark":" text-black dark:text-white"}`}>
                <div key={"icon"+index}>{<item.Component/>}</div>
                {open&&<div key={"name"+index}>{item.name}</div>}
            </div>}
        )}
    </>
}