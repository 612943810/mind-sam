import './Inventory.css';
import Button from "../../Button/Button";
import Navigation from "../../navigation/Navigation";
import axios from 'axios';
import { useEffect, useState } from 'react';

   export default interface Inventory {
    inventoryId:number,
    inventoryName:string,
    inventoryDate:string
      }
export default function Inventory(){
 
  const[inventory,setInventory]=useState<Inventory[]>([]); 
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
    <Button text="Create"  backgroundColor='#084b83ff' color='#fbc3bcff'/>
</div>
<br/>
<table className='tableDesign'>
    <thead>
        <tr>
         <th>Id</th>
        <th>Name</th>
        <th>Date</th>      
        </tr>
     
    </thead>
    <tbody>
         { 
   inventory.map((tableData)=>(
  <tr >
  <td>{tableData.inventoryId}</td>  
  <td>{tableData.inventoryName}</td>  
  <td>{tableData.inventoryDate}</td>  
  </tr>     
   ))

    }
    </tbody> 
</table>   
</div>

   

 
    </>      
    )


}
