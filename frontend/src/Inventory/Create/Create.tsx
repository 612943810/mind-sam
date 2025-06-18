import React, { ChangeEvent, FormEvent, useState } from 'react';
import './Create.css';
import Navigation from '../../navigation/Navigation';
import Button from '../../Button/Button';
import { useNavigate } from 'react-router';
import axios from 'axios';
  export default interface CreateInventory {
    inventoryName:string,
    inventoryDate:string
      }
export default function CreateInventory() {

  const[inventory,setInventory]=useState<CreateInventory>({
    inventoryName:'',
    inventoryDate:'',
  })
     let navLink=useNavigate();
     const changeAction=(event:ChangeEvent<HTMLInputElement>)=>{
      setInventory({...inventory,[event.target.name]:event.target.value});
        }
  const submitData=(event:FormEvent)=>{
   event.preventDefault()
   const fullData={
      inventoryName:inventory.inventoryName,
     inventoryDate:inventory.inventoryDate
  }
 axios.post('http://localhost:3000/inventory',fullData)
   .then( (res)=>()=>{

    try {
  setInventory({
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
  <label> Name</label>
  <br/>
    <input type='text' name='inventoryName' value={inventory.inventoryName} onChange={changeAction}/>
    <br/>
    <br/>
    <label> Date</label>
    <br/>
    <input type='date'  name='inventoryDate' value={inventory.inventoryDate}  onChange={changeAction}/>
    <br/>
    <div>
          <Button  buttonType='submit' text="Create Inventory" backgroundColor='#084b83ff' color='#fbc3bcff' />
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
