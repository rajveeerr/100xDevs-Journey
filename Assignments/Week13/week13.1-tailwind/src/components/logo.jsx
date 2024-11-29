import { Link } from "react-router-dom";

export default function Logo(){
    return <Link to="/home">
        <div className='text-2xl font-bold flex items-center md:justify-center'>
            <span className='bg-gradient-to-br from-mariner-300 to-mariner-700 text-transparent bg-clip-text p-2 text-5xl'>
            <i class="fa-solid fa-fire-flame-curved"></i>
            </span>
            <span className='flex flex-col p-0 g-0 leading-6'>
                <span className='text-3xl'>idk</span>
                <span className='bg-gradient-to-br from-mariner-400 to-mariner-600 text-transparent bg-clip-text'>what</span>
            </span>
        </div>
    </Link>
  }