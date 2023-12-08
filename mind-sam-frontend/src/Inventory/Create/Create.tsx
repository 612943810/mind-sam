import React, { useState } from 'react';
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
    let navLink=useNavigate();
  const[inventory,setInventory]=useState<CreateInventory>({
    inventoryId:0,
    inventoryName:'',
    inventoryDate:'',
  })
 
  const changeAction=(event:any)=>{
setInventory(event.target.value);
  }
  const submitData=(event:Event)=>{
    event.preventDefault();
 axios.post('http://localhost:3000/postinventory',inventory)
   .then( (res)=>setInventory({
    inventoryId:0,
    inventoryName:'',
    inventoryDate:''
}))
navLink('/');
      }
    return (
  <>
  <Navigation/>
<form className='formDesign' onSubmit={()=>submitData}>
  <h1 className='title'>Create Inventory</h1>
  <b/>
  <label>ID</label>
  <br/>
    <input type='number' value={inventory.inventoryId} onChange={changeAction} />
    <br/>
  <label> Name</label>
  <br/>
    <input type='text'value={inventory.inventoryName} onChange={changeAction} />
    <br/>
    <br/>
    <label> Date</label>
    <br/>
    <input type='date' value={inventory.inventoryDate}  onChange={changeAction} /> 
    <div className='button'>
      <Button text="Create" backgroundColor='#084b83ff' color='#fbc3bcff' />
    </div>
    
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
