import './Home.css';
import Button from "../../Button/Button";
import Navigation from "../../navigation/Navigation";
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

   export default interface Home {
    inventoryId:number,
    inventoryName:string,
    inventoryDate:string
      }
export default function Home(){
 
  const[inventory,setInventory]=useState<Home[]>([]); 
   let getInventory=()=>{
 return axios.get('http://localhost:3000/inventory')
 .then((inData)=>{
    setInventory(inData.data);
 })   
}

useEffect(()=>{
    getInventory();
},[])
    return(
  <>
<div className='grid'>
    <div className='navigation'>
     <Navigation  />       
    </div>
<h1 className='title'>Inventory Details</h1>
<div className='createButton'>
    <Link to="/inventory/create">
    <Button text="Create"  backgroundColor='#084b83ff' color='#fbc3bcff' />
    </Link>
</div>
<br/>
<table className='tableDesign'>
    <thead>
        <tr>
         <th>Id</th>
        <th>Name</th>
        <th>Date</th>
        <th>Actions</th>      
        </tr>
     
    </thead>
    <tbody>
         { 
   inventory.map((tableData)=>(
  <tr >
  <td>{tableData.inventoryId}</td>  
  <td>{tableData.inventoryName}</td>  
  <td>{tableData.inventoryDate}</td>  
  <td>
    <Link to={`/inventory/update/${tableData.inventoryId}`}>
      <Button  buttonType='button' text="Update" backgroundColor='#f3b61fff' color='#fbc3bcff' />
      </Link>

  <Button  buttonType='button' text="Delete" backgroundColor='#15b097ff' color='#fbc3bcff' />
  </td>
  </tr>     
   ))

    }
    </tbody> 
</table>   
</div>

   

 
    </>      
    )


}
