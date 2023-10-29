"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InventoryModel_1 = require("../models/InventoryModel");
let getInventory = (res, req) => {
    InventoryModel_1.inventory.find({});
};
let postInventory = async (req, res) => {
    const { inventoryId, inventoryName, inventoryDate } = req.body;
    let inventoryData = new InventoryModel_1.inventory({
        inventoryId,
        inventoryName,
        inventoryDate
    });
    try {
        await inventoryData.save();
        res.send("Success");
    }
    catch (error) {
        res.json(error);
    }
    res.send();
};
let findInventory = (res, req) => {
    InventoryModel_1.inventory.find({});
};
module.exports = {
    getInventory,
    postInventory
};
