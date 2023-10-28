import mongoose, { Mongoose,Schema } from "mongoose";
import { Express,Request,Response } from "express";
import  {inventory} from "../models/InventoryModel"
let getInventory=(res:Response,req:Request)=>{
inventory.find({});
}
let postInventory=(res:Response,req:Request)=>{
inventory.create();
}
let findInventory=(res:Response,req:Request)=>{
    
    inventory.find({});
    }