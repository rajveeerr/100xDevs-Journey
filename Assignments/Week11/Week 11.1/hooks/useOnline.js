export default function useOnline(){
    let [online,setOnline]=useState(navigator.onLine)
    useEffect(()=>{
      function updateStatus(){
        setOnline(navigator.onLine)
      }
      window.addEventListener("online",updateStatus)
      window.addEventListener("offline",updateStatus)
  
      return()=>{
        window.removeEventListener("online",updateStatus)
        window.removeEventListener("offline",updateStatus)
      }
    },[])
    
    return online
}