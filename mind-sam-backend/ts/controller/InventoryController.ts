import mongoose, { Mongoose,Schema } from "mongoose";
import { Express,Request,Response } from "express";
import  {inventory} from "../models/InventoryModel"

let getInventory=(res:Response,req:Request)=>{
inventory.find({});
}
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
res.send()
}
let findInventory=(res:Response,req:Request)=>{
    
    inventory.find({});
    }

    module.exports={
        getInventory,
        postInventory
    }