import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import './Update.css';
import Navigation from '../../navigation/Navigation';
import Button from '../../Button/Button';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
  export default interface UpdateInventory {
    inventoryId:number,
    inventoryName:string,
    inventoryDate:string
      }
export default function UpdateInventory() {

  const[inventory,setInventory]=useState<UpdateInventory>({
    inventoryId:0,
    inventoryName:'',
    inventoryDate:'',
  })
     let navLink=useNavigate();
      let {query}=useParams() 
      const changeAction=(event:ChangeEvent<HTMLInputElement>)=>{
      setInventory({...inventory,[event.target.name]:event.target.value});
        }
useEffect(()=>{ 
  axios.get(`http://localhost:3000/inventory/${query}`)
   .then( (res)=>()=>{
    console.log(res.data)
   try {
  setInventory({
    inventoryId:res.data.inventoryId,
  inventoryName:res.data.inventoryName,
  inventoryDate:res.data.inventoryDate, 
})
    } catch (inError) {
     console.log(inError)
    }

   }),[query]   
})
   const submitData=(event:FormEvent)=>{
   event.preventDefault()
   const fullData={
    inventoryId:inventory.inventoryId,
      inventoryName:inventory.inventoryName,
     inventoryDate:inventory.inventoryDate
  }


  
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
