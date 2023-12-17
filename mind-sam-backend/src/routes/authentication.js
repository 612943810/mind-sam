"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const express_1 = require("express");
let authController = require('../controller/InventoryController');
exports.authRoute = (0, express_1.Router)();
exports.authRoute.post("/inventory/", authController.postInventory);
exports.authRoute.get("/inventory/", authController.getInventory);
