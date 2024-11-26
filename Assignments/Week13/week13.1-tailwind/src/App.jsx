import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  // why do we use tailwing if its ugly and gets long? well bcz it allows us to do our own styling
  // devdependencies basically lets us install those dependencies that are only need in the developement and arent required in
  // production enviornment, like vite/tailwind. How can we install devDependencies? Just by adding -D before the name of 
  // dependency during installation

  //tailwind works by generating a css file that contains only the css code for the classes used

  /*  @tailwind base;
      @tailwind components;
      @tailwind utilities;

      these are generated incrementaly
      these three lines in index.css will eventually get converted to the css classes and styles used in the project, this basically 
      scans all the files given in contents aarray in the config file and after that it finds the right set of classes and then puts
      them in the index.css file, only those files gets converted to bundle and deployed on internet
  */

      // in tailwind the responsiveness is quite tricky, md is equal to min-width: 768px,(so if md is applied the style will only trigger)
      // for width above or equal to 768px
      // tailwind in mobile first, unprefixed utilities will be applied to any screen size and presized utilities will only apply to 
      // certain screen sizes

      // default colors and the scren-breakpoints can be changed by overwriting them in the themes array 

  return (<div>
    <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    <div className='grid grid-cols-4 sm:grid-cols-12'>
      <div className='col-span-4 sm:col-span-12 sm:bg-orange-300 text-xl p-2 rounded-lg'>Example Grid</div>{/*this basically says ki if we go above small breakpoint the bg will change to orange, else no bg color by default */}
      <div className='col-span-4 sm:col-span-5 bg-red-300'>Child#1</div>
      <div className='col-span-4 sm:col-span-5 bg-yellow-300'>Child#2</div>
      <div className='col-span-4 sm:col-span-2 bg-blue-300'>Child#3</div>
    </div>
      <p className='text-xl m-2'>Responsive Design</p>
      <div className='flex justify-center flex-col sm:flex-row'>
        <div className='bg-red-300 flex-1'>Child#1</div>
        <div className='bg-yellow-300 flex-1'>Child#2</div>
        <div className='bg-blue-300 flex-1'>Child#3</div>
      </div>      
  </div>)
  } 
export default App
