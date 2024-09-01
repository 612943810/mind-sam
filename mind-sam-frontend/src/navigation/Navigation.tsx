import { Link, useParams } from 'react-router-dom';
import './Navigation.css';
import { useEffect, useState } from 'react';
export default function Navigation() {
  let currentParams = useParams()
  let currentUser = currentParams.username
  useEffect(() => {
    //if()
  })
  return (
    <>

      <nav className='navigationBar'>
        {
          currentUser ?
            <>
              <Link to={`/inventory/${currentUser}`} className='navLink'> Inventory</Link>
              <Link to='' className='navLink'>Logout</Link>
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
