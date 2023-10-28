"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InventoryModel_1 = require("../models/InventoryModel");
let getInventory = (res, req) => {
    InventoryModel_1.inventory.find({});
};
let postInventory = (res, req) => {
    InventoryModel_1.inventory.create();
};
