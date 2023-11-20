import mongoose, { Mongoose,Schema } from "mongoose";
import { Express,Request,Response } from "express";
import  {inventory} from "../models/InventoryModel"

let postInventory=async (req:Request,res:Response,)=>{
let inventoryData=new inventory(req.body)
    try {
        await inventoryData.save();
        res.send("Success")
    } catch (error) {
        res.json(error);
    }

}
let getInventory= async (req:Request,res:Response)=>{

    try {
      await inventory.find({})
      .then(inventoryStatus=>res.json(inventoryStatus)); 
      res.json() 
} catch (error) {
        res.json(error)
    }

}
let updateInventory=async(req:Request,res:Response)=>{
    let inventoryData=new inventory(req.body)  
       try {
        await inventory.findByIdAndUpdate(req.params.id,req.body,{runValidators:true,returnOriginal:false,useFinfAndModify:false})
       .then(inventoryStatus=>{
            res.json("Inventory updated") ;
           })
         await  inventoryData.save();
    } catch (error) {
        res.json(error)
    }
}

let deleteInventory=async(req:Request,res:Response)=>{
    try {
        await inventory.findByIdAndDelete(req.params.id)
       .then(inventoryStatus=>{
            res.json("Inventory deleted") ;
           })
    } catch (error) {
        res.json(error)
    }
}
let findInventory= async(req:Request,res:Response)=>{
    
   await  inventory.find({});
    }

    module.exports={
        getInventory,
        postInventory,
        updateInventory,
        deleteInventory
    }