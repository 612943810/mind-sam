import React, { ChangeEvent, FormEvent, useState } from 'react';
import './Register.css';
import Navigation from '../navigation/Navigation';
import Button from '../Button/Button';
import { useNavigate } from 'react-router';
import axios from 'axios';
  export default interface Register{
    username:string,
   password:string,
    dateofbirth:string
      }
export default function Login() {

  const[user,setUser]=useState<Login>({
    username:'',
   password:'',
    dateofbirth:''
  })
     let navLink=useNavigate();
     const changeAction=(event:ChangeEvent<HTMLInputElement>)=>{
      setUser({...user,[event.target.name]:event.target.value});
        }
  const submitData=(event:FormEvent)=>{
  
   event.preventDefault()
   const fullData={
      username:user.username,
   password:user.password,
    dateofbirth:user.dateofbirth
  } 

 axios.post('https://localhost:3002/register',fullData,{
 withCredentials:true
 })
   .then( (res)=>{
console.log(res.data)
    try {
  setUser({
username:'',
password:'',
dateofbirth:''
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
  <h1 className='title'>Please register for an account.</h1>
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
    <label> Date of Birth</label>
    <br/>
    <input type='date'  name='dateofbirth' value={user.dateofbirth}  onChange={changeAction}/>
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
