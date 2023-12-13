import { Fragment, useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import { Routes,Route } from 'react-router';
import Chat from './chat/Chat';
import Home from './Inventory/Home/Home';
import CreateInventory from './Inventory/Create/Create';
import UpdateInventory from './Inventory/Update/Update';
function App() {
  const [count, setCount] = useState(0)

  return (
<> 

  <BrowserRouter>
  <Routes>
<Route path='/' element={<Chat/>}/>
<Route path='/inventory' element={<Home/>}/>
<Route path='/inventory/create'element={<CreateInventory/>}/>
<Route path='/inventory/update/:query'element={<UpdateInventory/>}/>
  </Routes>
  </BrowserRouter>

</>
   

  
   
  )
}
export default App;
