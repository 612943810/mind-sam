"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const InventoryModel_1 = require("../models/InventoryModel");
let postInventory = async (req, res) => {
    let inventoryData = new InventoryModel_1.inventory(req.body);
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
            .then(inventoryStatus => res.json(inventoryStatus));
        res.json();
    }
    catch (error) {
        res.json(error);
    }
};
let updateInventory = async (req, res) => {
    let inventoryData = new InventoryModel_1.inventory(req.body);
    try {
        await InventoryModel_1.inventory.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, returnOriginal: false, useFinfAndModify: false })
            .then(inventoryStatus => {
            res.json("Inventory updated");
        });
        await inventoryData.save();
    }
    catch (error) {
        res.json(error);
    }
};
let deleteInventory = async (req, res) => {
    try {
        await InventoryModel_1.inventory.findByIdAndDelete(req.params.id)
            .then(inventoryStatus => {
            res.json("Inventory deleted");
        });
    }
    catch (error) {
        res.json(error);
    }
};
let findInventory = async (req, res) => {
    let { inventoryId, inventoryName, inventoryDate } = req.query;
    try {
        if (req.query == inventoryId) {
            await InventoryModel_1.inventory.find({ inventoryId: req.query.inventoryId })
                .then(inventoryStatus => {
                res.json(inventoryStatus);
            });
        }
        else if (req.query == inventoryName) {
            await InventoryModel_1.inventory.find({ inventoryName: req.query.inventoryName })
                .then(inventoryStatus => {
                res.json(inventoryStatus);
            });
        }
        else if (req.query == inventoryDate) {
            await InventoryModel_1.inventory.find({ inventoryDate: req.query.inventoryData })
                .then(inventoryStatus => {
                res.json(inventoryStatus);
            });
        }
    }
    catch (error) {
        res.json(error);
    }
};
module.exports = {
    getInventory,
    postInventory,
    updateInventory,
    deleteInventory,
    findInventory
};
