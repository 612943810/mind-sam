import React, { ChangeEvent, FormEvent, useState } from 'react';
import './Login.css';
import Navigation from '../navigation/Navigation';
import Button from '../Button/Button';
import { useNavigate } from 'react-router';
import axios from 'axios';
  export default interface Login {
    inventoryName:string,
    inventoryDate:string
      }
export default function Login() {

  const[inventory,setInventory]=useState<Login>({
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
  <h1 className='title'>Login to your account</h1>
  <b/>
  <label> User Name </label>
  <br/>
    <input type='text' name='inventoryName' value={inventory.inventoryName} onChange={changeAction}/>
    <br/>
    <br/>
    <label> Password</label>
    <br/>
    <input type='text'  name='inventoryDate' value={inventory.inventoryDate}  onChange={changeAction}/>
    <br/>
    <div>
          <Button  buttonType='submit' text="Login" backgroundColor='#084b83ff' color='#fbc3bcff' />
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
