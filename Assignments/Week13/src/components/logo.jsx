import { Link } from "react-router-dom";

export default function Logo({size="large"}){
    return <Link to="/">
        <div className={`${size==="large"?"text-2xl":"text-xl"} font-bold flex items-center gap-1`}>
            <span className={`bg-gradient-to-b from-mariner-300 to-mariner-700 text-transparent bg-clip-text p-2" ${size==="large"?"text-5xl":"text-3xl"}`}>
                <i class="fa-solid fa-fire-flame-curved"></i>
            </span>
            <span className={`flex flex-col p-0 g-0 ${size==="large"?"leading-6":"leading-4"}`}>
                <span className={`${size==="large"?"text-3xl":"text-2xl"}`}>idk</span>
                <span className='bg-gradient-to-br from-mariner-400 to-mariner-600 text-transparent bg-clip-text'>what</span>
            </span>
        </div>
    </Link>
  }