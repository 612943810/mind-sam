import { Router } from "express";
let inController=require('../controller/InventoryController')
export let inRoute=Router();
inRoute.post("/postinventory",inController.postInventory)
inRoute.get("/getInventory",inController.getInventory)
inRoute.put('/updateInventory',inController.updateInventory)
inRoute.delete("/deleteInventory",inController.deleteInventory)
