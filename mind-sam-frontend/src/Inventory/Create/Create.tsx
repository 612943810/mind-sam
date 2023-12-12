import React, { ChangeEvent, FormEvent, useState } from 'react';
import './Create.css';
import Navigation from '../../navigation/Navigation';
import Button from '../../Button/Button';
import { useNavigate } from 'react-router';
import axios from 'axios';
  export default interface CreateInventory {
    inventoryId:number,
    inventoryName:string,
    inventoryDate:string
      }
export default function CreateInventory() {

  const[inventory,setInventory]=useState<CreateInventory>({
    inventoryId:0,
    inventoryName:'',
    inventoryDate:'',
  })
     let navLink=useNavigate();

  const submitData=(event:FormEvent)=>{
   event.preventDefault()
   const fullData={
     inventoryId:inventory.inventoryId,
      inventoryName:inventory.inventoryName,
     inventoryDate:inventory.inventoryDate
  }
 axios.post('http://localhost:3000/inventory',fullData)
   .then( (res)=>()=>{

    try {
  setInventory({
  inventoryId:0,
  inventoryName:'',
  inventoryDate:'', 
})
    } catch (inError) {
     console.log(inError)
    }

   })
     navLink('/inventory');   
      }
    return (
  <>
  <Navigation/>
<form className='formDesign' onSubmit={submitData}>
  <h1 className='title'>Create Inventory</h1>
  <b/>
  <label>ID</label>
  <br/>
    <input type='number'  name='inventoryId' value={inventory.inventoryId} onChange={(setInId)=>setInventory({...inventory,inventoryId:parseInt(setInId.target.value)})} />
    <br/>
  <label> Name</label>
  <br/>
    <input type='text' name='inventoryName' value={inventory.inventoryName} onChange={(setInName)=>setInventory({...inventory,inventoryName:setInName.target.value}) }/>
    <br/>
    <br/>
    <label> Date</label>
    <br/>
    <input type='date'  name='inventoryDate' value={inventory.inventoryDate}  onChange={(setInDate)=>setInventory({...inventory,inventoryDate:setInDate.target.value}) }/>
    <br/>
      <Button text="Create"/>

    
</form> <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
  </>
  )
}
