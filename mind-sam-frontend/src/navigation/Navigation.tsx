import { Link } from 'react-router-dom';
import './Navigation.css';
import { useEffect, useState } from 'react';
export default function Navigation() {
  const[loggedin, isLoggedin]=useState(false);
  useEffect(()=>{
    //if()
  })
  return (
    <>

         <nav  className='navigationBar'>
  
       <Link  to='/inventory'className='navLink'> Inventory</Link>
   
          <li className=' navLink loginPosition'>
            <a  className='registerPad'href='/register'>Register</a>
       </li>
          <li className=' navLink '>
            <a href='/login'>Login</a>
          </li>
      </nav>

   
    </>

  )

}
