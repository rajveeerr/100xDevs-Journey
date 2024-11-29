import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Email from './pages/Email'
import AgeVerification from './pages/AgeVerification'
import Layout from './pages/layout'
import OTP from './pages/OtpVerification'
import Home from './pages/Home'
import { Suspense } from 'react'
import { StepCountProvider } from './context/stepCountContext'

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

    // controlled components are those components which are forced to have some values, for eg: in the timer component i did
    // created input boxes, those were controlled component, i was setting the value of input from state var, if user was changing
    // the input value, we did updated the state var as a result new input with the updated value was rendered, only for a brief period
    // the typed value was in the input

  let allRoutes=[{
    path: '/verification',
    element: <AgeVerification/>
  },{
    path: '/email',
    element: <Email/>
  },{
    path: '/otp-verification',
    element: <OTP/>
  },{
    path: '/home',
    element: <Home/>
  }]

  return (<div>
    <Suspense fallback={"Loading..."}>
      <StepCountProvider>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout/>}>
            {allRoutes.map((route,index)=> <Route key={index} path={route.path} element={route.element}/>)}
          </Route>
        </Routes>
        </BrowserRouter>
      </StepCountProvider>
    </Suspense>
  </div>)
} 

export default App 