import { Fragment, useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import { Routes,Route } from 'react-router';
import Chat from './chat/Chat';
import Home from './Inventory/Home/Home';
import CreateInventory from './Inventory/Create/Create';
import UpdateInventory from './Inventory/Update/Update';
import Login from './Login/Login';
import Register from './Register/Register';
import axios from 'axios';
import Profile from './Profile/Profile';
axios.defaults.withCredentials=true
function App() {
  const [count, setCount] = useState(0)

  return (
<> 

  <BrowserRouter>
  <Routes>

<Route path='/' element={<Home/>}/>
<Route path='/:username' element={<Home/>}/>
<Route path='/inventory/:username' element={<Profile/>}/>
<Route path='/inventory/create'element={<CreateInventory/>}/>
<Route path='/inventory/update/:id'element={<UpdateInventory/>}/>
<Route path='/chat' element={<Chat/>}/>
<Route path='/register' element={<Register/>}/>
<Route path='/login' element={<Login/>}/>
  </Routes>
  </BrowserRouter>

</>
   

  
   
  )
}
export default App;
