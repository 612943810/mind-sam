"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inRoute = void 0;
const express_1 = require("express");
let inController = require('../controller/InventoryController');
exports.inRoute = (0, express_1.Router)();
exports.inRoute.get("/getInventory", inController.getInventory);
exports.inRoute.post("/postinventory", inController.postInventory);
