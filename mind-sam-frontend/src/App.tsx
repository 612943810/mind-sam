import { Fragment, useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import { Routes,Route } from 'react-router';
import Inventory from './Inventory/Inventory';
import Chat from './chat/Chat';
function App() {
  const [count, setCount] = useState(0)

  return (

<>   
  <BrowserRouter>
  <Routes>
<Route path='/' element={<Chat/>}/>
<Route path='/inventory' element={<Inventory/>}/>
  </Routes>
  </BrowserRouter>
</>
   

  
   
  )
}
export default App;
