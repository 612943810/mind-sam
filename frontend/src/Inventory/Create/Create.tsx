import React, { ChangeEvent, FormEvent, useState } from 'react';

import Button from '../../Button/Button';
import { useNavigate } from 'react-router-dom';
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
  const API_URL = import.meta.env.VITE_API_URL;
 axios.post(`${API_URL}/inventory`,fullData)
   .then( (res)=>{
    setInventory({
      inventoryName:'',
      inventoryDate:'', 
    })
    navLink('/inventory');
   })
   .catch(err => console.log(err));
  }
  return (
    <div className="container mx-auto p-6 space-y-6">

      <form onSubmit={submitData} className="bg-white p-6 rounded-lg shadow max-w-xl mx-auto space-y-4">
        <h1 className="text-2xl font-semibold text-center text-indigo-900">Create Inventory</h1>
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input type="text" name="inventoryName" value={inventory.inventoryName} onChange={changeAction} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input type="date" name="inventoryDate" value={inventory.inventoryDate} onChange={changeAction} className="mt-1 block w-full border rounded px-3 py-2" />
        </div>
        <div className="text-center">
          <Button buttonType='submit' text="Create Inventory" backgroundColor='#084b83ff' color='#fbc3bcff' />
        </div>
      </form>
    </div>
  );
}
