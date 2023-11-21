import { Router } from "express";
let inController=require('../controller/InventoryController')
export let inRoute=Router();
inRoute.post("/postinventory",inController.postInventory);
inRoute.get("/getinventory",inController.getInventory);
inRoute.put('/updateinventory/:id',inController.updateInventory);
inRoute.delete("/deleteinventory/:id",inController.deleteInventory);
inRoute.get("/findinventory/:id",inController.findInventory);