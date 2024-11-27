import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Button from './components/button'
import Input from './components/input'

function App() {

  // why do we use tailwing if its ugly and gets long? well bcz it allows us to do our own styling
  // devdependencies basically lets us install those dependencies that are only need in the developement and arent required in
  // production enviornment, like vite/tailwind. How can we install devDependencies? Just by adding -D before the name of 
  // dependency during installation

  // tailwind works by generating a css file that contains only the css code for the classes used

  /*  @tailwind base;
      @tailwind components;
      @tailwind utilities;

      these are generated incrementaly
      these three lines in index.css will eventually get converted to the css classes and styles used in the project, this basically 
      scans all the files given in contents aarray in the config file and after it finds the right set of classes, it then puts
      them in the index.css file, only those files gets converted to bundle and deployed on internet
  */

    // in tailwind the responsiveness is quite tricky, md is equal to min-width: 768px,(so if md is applied the style will only trigger)
    // for width above or equal to 768px)
    // tailwind in mobile first, unprefixed utilities will be applied to any screen size and presized utilities will only apply to 
    // certain screen sizes

    // default colors and the scren-breakpoints can be changed by overwriting them in the themes array 


    //hex representation of colours basically represents the amount of red green and blue in a coulor using hex codes ranging from 0-255
    // coded in hexadecimal form where FF=255, for red hex representation is #FF0000
  return (<div>
    <AgeVerification/>
  </div>)
} 

function AgeVerification(){
  let [entry,setEntry]=useState(true);
  const changeHandeler=(e)=>{
    setEntry(e.target.value.length===0)
    console.log(e.target.value.length!=0);
    
  }

  return <div className='bg-gradient-to-b from-black to-[#001831] w-full h-screen text-mariner-50 flex flex-col p-8 md:p-16 font-inter'>
    <div className='text-2xl font-bold flex items-center md:justify-center'>
      <span className='bg-gradient-to-br from-mariner-300 to-mariner-700 text-transparent bg-clip-text p-2 text-5xl'>
        <i class="fa-brands fa-css"></i>
      </span>
      <span className='flex flex-col p-0 g-0 leading-6'>
        <span className='text-3xl'>tail</span>
        <span className='bg-gradient-to-br from-mariner-400 to-mariner-600 text-transparent bg-clip-text'>wind</span>
      </span>
    </div>
    <div className='pt-12 flex flex-col md:items-center md:text-center'>
      <h1 className='text-4xl font-bold leading-tight'>Verify Your Age</h1>
      <p className='text-base leading-normal mt-2 max-w-80 text-mariner-300'>Please confirm your date of birth. This data will not be stored.</p>
      <div className='mt-6 w-full max-w-80'><Input placeholder="Enter your year of birth" type="number" onChange={changeHandeler} max="2027" min="1950"/></div>
      <div className='mt-4 w-full max-w-80'><Button onClick={()=>{}} disabled={entry}>Submit</Button></div>
    </div>
  </div>
}

export default App
 