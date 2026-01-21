import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';

import Button from '../../Button/Button';
import { useNavigate, useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
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
const API_URL = import.meta.env.VITE_API_URL;
axios.get(`${API_URL}/inventory/?id=${id}`)
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
const API_URL = import.meta.env.VITE_API_URL;
axios.put(`${API_URL}/inventory/${id}`,fullData).
then(()=>{
navLink('/inventory');   
 }

)
  
      }
  return (
    <div className="container mx-auto p-6">

      <form onSubmit={submitData} className="bg-white p-6 rounded-lg shadow max-w-xl mx-auto space-y-4">
        <h1 className="text-2xl font-semibold text-center text-indigo-900">Update Inventory</h1>
        <div>
          <label className="block text-sm font-medium text-gray-700">ID</label>
          <input type="text" name="inventoryId" value={inventory.inventoryId} onChange={changeAction} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" name="inventoryName" value={inventory.inventoryName} onChange={changeAction} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input type="date" name="inventoryDate" value={inventory.inventoryDate} onChange={changeAction} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>
        <div className="text-center">
          <Button buttonType='submit' text="Update Inventory" backgroundColor='#084b83ff' color='#fbc3bcff' />
        </div>
      </form>
 
    </div>
  );
}
