import { Router } from "express";
let authController=require('../controller/InventoryController')
export let authRoute=Router();
authRoute.post("/inventory/",authController.postInventory);
authRoute.get("/inventory/",authController.getInventory);