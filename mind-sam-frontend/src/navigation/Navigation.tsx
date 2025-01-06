import { Link, useNavigate, useParams } from 'react-router-dom';
import './Navigation.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
export default function Navigation() {
  let redirectUser=useNavigate();
  let currentParams = useParams()
  let currentUser = currentParams.username
 
  let logoutUser=()=>{
      axios.get("http://localhost:3000/logout")
    .then(res=>{
redirectUser('/')
    })
    .catch(res=>{
      alert("Page not availible.")
    })
  }
  return (
    <>

      <nav className='navigationBar'>
        {
          currentUser ?
            <>
              <Link to={`/`} className='navLink'> Inventory</Link>
              <li onClick={logoutUser}className='navLink' > <a>Logout</a></li>
            </>

            :
            <>
              <Link to={`/inventory`} className='navLink'> Inventory</Link>

            </>
        }

        {
          currentUser ?
            ''
            : <>
              <li className=' navLink loginPosition'>
                <a className='registerPad' href='/register'>Register</a>
              </li>
              <li className=' navLink '>
                <a href='/login'>Login</a>
              </li>

            </>}

      </nav>


    </>

  )

}
