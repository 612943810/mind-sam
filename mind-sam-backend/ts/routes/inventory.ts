import { Router } from "express";
let inController=require('../controller/InventoryController')
export let inRoute=Router();
inRoute.post("/inventory",inController.postInventory);
inRoute.put('/inventory/:id',inController.updateInventory);
inRoute.get("/inventory/:query",inController.getInventory);
inRoute.delete("/inventory/:id",inController.deleteInventory);