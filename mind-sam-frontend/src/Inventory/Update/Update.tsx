import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import './Update.css';
import Navigation from '../../navigation/Navigation';
import Button from '../../Button/Button';
import { useNavigate, useParams } from 'react-router';
import axios, { Axios, AxiosResponse } from 'axios';
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
      let {id}=useParams() 
      const changeAction=(event:ChangeEvent<HTMLInputElement>)=>{
      setInventory({...inventory,[event.target.name]:event.target.value});
        }
useEffect(()=>{

axios.get(`https://localhost:3002/inventory/?id=${id}`)
   .then((res:AxiosResponse)=>{
   try {
    var dateFormat= new Date(res.data[0].inventoryDate).toISOString().split('T')[0];
  setInventory({
    inventoryId:res.data[0].inventoryId,
  inventoryName:res.data[0].inventoryName,
  inventoryDate:dateFormat, 
})  
  } catch (inError) {
     console.log(inError)
    }; 
});
},
[id]);
   const submitData=(event:FormEvent)=>{
   event.preventDefault()
   const fullData={
    inventoryId:inventory.inventoryId,
      inventoryName:inventory.inventoryName,
     inventoryDate:inventory.inventoryDate
  }

axios.put(`http://localhost:3000/inventory/${id}`,fullData).
then(()=>{
navLink('/inventory');   
 }

)
  
      }
    return (
  <>
  <Navigation/>
<form className='formDesign' onSubmit={submitData}>
  <h1 className='title'>Create Inventory</h1>
  <b/>
  <label>ID</label>
  <br/>
    <input type='text' name='inventoryId' value={inventory.inventoryId} onChange={changeAction}/>
    <br/>
  <label> Name</label>
  <br/>
    <input type='text' name='inventoryName' value={inventory.inventoryName} onChange={changeAction}/>
    <br/>
    <br/>
    <label> Date</label>
    <br/>
    <input type='date'  name='inventoryDate' value={inventory.inventoryDate} onChange={changeAction}/>
    <div>
          <Button  buttonType='submit' text="Update Inventory" backgroundColor='#084b83ff' color='#fbc3bcff' />
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
