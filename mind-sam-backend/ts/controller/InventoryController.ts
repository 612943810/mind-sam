import mongoose, { Mongoose,Schema } from "mongoose";
import { Express,Request,Response } from "express";
import  {inventory} from "../models/InventoryModel"


let postInventory=async (req:Request,res:Response,)=>{
    const {inventoryId,inventoryName,inventoryDate}=req.body;
    let inventoryData=new inventory({
     inventoryId,
     inventoryName,
     inventoryDate
    })
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
      .then(inventoryData=>res.json(inventoryData)); 
      res.json() 
} catch (error) {
        res.json(error)
    }

}
let updateInventory=async(req:Request,res:Response)=>{
    try {
        await inventory.findByIdAndUpdate(req.params.inventorytId,req.body, {new:true})
        .then(inventory=>{
            res.json("Inventory update")
        })
    } catch (error) {
        res.json(error)
    }
}

let deleteInventory=async(req:Request,res:Response)=>{
    try {
        await inventory.deleteOne({id:req.params.inventoryId})
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