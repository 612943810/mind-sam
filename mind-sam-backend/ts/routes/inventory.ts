import { Router } from "express";
let inController=require('../controller/InventoryController')
export let inRoute=Router();
inRoute.get("/getInventory",inController.getInventory)
inRoute.post("/postinventory",inController.postInventory)

