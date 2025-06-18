import { Router } from "express";
let inController=require('../controller/InventoryController')
export let inRoute=Router();
inRoute.post("/inventory/",inController.postInventory);
inRoute.get("/inventory/",inController.getInventory);
inRoute.put("/inventory/:id",inController.updateInventory);
inRoute.delete("/inventory/:id",inController.deleteInventory);