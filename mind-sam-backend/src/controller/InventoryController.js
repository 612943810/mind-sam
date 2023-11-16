"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InventoryModel_1 = require("../models/InventoryModel");
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
let getInventory = async (req, res) => {
    try {
        await InventoryModel_1.inventory.find({})
            .then(inventoryData => res.json(inventoryData));
        res.json();
    }
    catch (error) {
        res.json(error);
    }
};
let updateInventory = async (req, res) => {
    const { inventoryId, inventoryName, inventoryDate } = req.body;
    let inventoryData = new InventoryModel_1.inventory({
        inventoryId,
        inventoryName,
        inventoryDate
    });
    try {
        await InventoryModel_1.inventory.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, returnOriginal: false, useFinfAndModify: false })
            .then(inventory => {
            res.json("Inventory update");
        });
        await inventoryData.save();
    }
    catch (error) {
        res.json(error);
    }
};
let deleteInventory = async (req, res) => {
    try {
        await InventoryModel_1.inventory.deleteOne({ id: req.params.inventoryId });
    }
    catch (error) {
        res.json(error);
    }
};
let findInventory = async (req, res) => {
    await InventoryModel_1.inventory.find({});
};
module.exports = {
    getInventory,
    postInventory,
    updateInventory,
    deleteInventory
};
