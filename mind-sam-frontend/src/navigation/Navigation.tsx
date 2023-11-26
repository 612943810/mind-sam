import './Navigation.css';
export default function Navigation() {
  return (
    <>

         <nav  className='navigation'>
        <ul className="navigationBar">
          <li ><a href='/inventory'> Inventory</a></li>
          <li><a href=''>Customer Details</a></li>
         <li><a href='' >Credit Card Info</a></li> 
          <li className='loginPosition'><a href=''  >Login</a></li>
        </ul>
   
      </nav>

   
    </>

  )

}
