import { Fragment, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Chat from './chat/Chat'
import Navigation from './navigation/Navigation'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div  className='grid'>
<div className='navigationBar'>
<Navigation/>
</div>
      <div className='chatBar'>
           <Chat/>
      </div>
      </div>
  
   
  )
}
export default App;
