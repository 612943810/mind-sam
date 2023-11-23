import { Fragment, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Chat from './chat/Chat'
import Navigation from './navigation/Navigation'

function App() {
  const [count, setCount] = useState(0)

  return (

<>   
<Navigation/>
<div className='chatBar'>
           <Chat/>
      </div>
       
</>
   

  
   
  )
}
export default App;
