import { Link } from 'react-router-dom';
import './Navigation.css';
export default function Navigation() {
  return (
    <>

         <nav  className='navigationBar'>
  
       <Link  to='/inventory'className='navLink'> Inventory</Link>
   
          <li className=' navLink loginPosition'><a href=''  >Login</a></li>
       
      </nav>

   
    </>

  )

}
