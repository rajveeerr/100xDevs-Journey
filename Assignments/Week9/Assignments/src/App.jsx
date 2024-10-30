import { useState } from 'react'
import './App.css'
import { Card } from './components/card'
import { Timer } from './components/Timer'

function App() {
  

  return (<>
  {/* <Card>
    <h1>Hi is this working?</h1>
    <p>It does!!</p>
  </Card> */}
  <Card>
    <Timer/>
  </Card>
  </>)
}

export default App
