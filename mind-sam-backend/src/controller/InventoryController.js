"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InventoryModel_1 = require("../models/InventoryModel");
let getInventory = async (res, req) => {
    try {
        await InventoryModel_1.inventory.find({})
            .then(inventoryData => res.json(inventoryData));
        res.json();
    }
    catch (error) {
        res.json(error);
    }
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
};
let findInventory = async (res, req) => {
    await InventoryModel_1.inventory.find({});
};
module.exports = {
    getInventory,
    postInventory
};
