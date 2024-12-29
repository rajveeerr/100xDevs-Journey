import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";


// regarding import and export, if i am setting a module to be exported as default, while importing we will have to exclude
// the default function from curly braces which is usuLLY applied on named exports or siply export all the function as 
// named exports

// this approach will trigger-rerender whole application when screensize changes
export default function useMobile(){
    const [isMobile,setMobile]=useState(window.innerWidth<=768)
    
    useEffect(()=>{
        //should avoid use of anonymus fn in eventlisteners
        function onResize(){
            setMobile(window.innerWidth<=768)
        }
        window.addEventListener("resize",onResize)
        
        return ()=>{
            window.removeEventListener("resize",onResize)
        }
    },[])

    return isMobile
}

///implementation2- will not update and triggger re-render when user changes screen size, this will simply return 'true'
// on reload if device is mobile
export function useMobileOptimized(){
    const screenSize=useRef(window.innerWidth<768)

    useEffect(()=>{
        window.addEventListener("resize",()=>{
            screenSize.current=window.innerWidth<768
        })
        return ()=>{
            window.removeEventListener("resize",()=>{
                screenSize.current=window.innerWidth<768
            })
        }
    },[])
    return screenSize.current
}

export function useMediaQuery(query){//query="min-width: 768px"
    let [matches,setMatches]=useState(window.matchMedia(query).matches)

    useEffect(()=>{
        let media=window.matchMedia(query)
        let changeMatches=()=>{
            setMatches(media.matches)
        }
        window.addEventListener("resize",changeMatches)
        
        return ()=>{
            window.removeEventListener("resize",changeMatches)
        }
    },[])

    return matches
}