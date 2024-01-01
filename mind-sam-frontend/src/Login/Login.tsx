import React, { ChangeEvent, FormEvent, useState } from 'react';
import './Login.css';
import Navigation from '../navigation/Navigation';
import Button from '../Button/Button';
import { useNavigate } from 'react-router';
import axios from 'axios';
  export default interface Login {
    username:string,
   password:string,
      }
export default function Login() {

  const[user,setUser]=useState<Login>({
   username:'',
    password:'',
  })
     let navLink=useNavigate();
     const changeAction=(event:ChangeEvent<HTMLInputElement>)=>{
      setUser({...user,[event.target.name]:event.target.value});
        }
  const submitData=async(event:FormEvent)=>{
   event.preventDefault()
   const fullData={
      username:user.username,
     password:user.password
  }
 await axios.post('http://localhost:3000/login', fullData)
   .then( (res)=>{
console.log(res)
    try {
  setUser({
  username:'',
  password:'', 
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
    <input type='text' name='username' value={user.username} onChange={changeAction}/>
    <br/>
    <br/>
    <label> Password</label>
    <br/>
    <input type='text'  name='password' value={user.password}  onChange={changeAction}/>
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
