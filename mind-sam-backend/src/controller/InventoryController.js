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
    let currentData = null;
    try {
        let { id, name, date } = req.query;
        if (id) {
            currentData = await InventoryModel_1.inventory.find({ inventoryId: req.query.id });
        }
        else if (name) {
            currentData = await InventoryModel_1.inventory.find({ inventoryName: req.query.name });
        }
        else if (date) {
            currentData = await InventoryModel_1.inventory.find({ inventoryDate: req.query.date });
        }
        else {
            currentData = await InventoryModel_1.inventory.find({});
        }
        res.send(currentData);
    }
    catch (error) {
        res.json(error);
    }
};
let updateInventory = async (req, res) => {
    try {
        await InventoryModel_1.inventory.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, returnOriginal: false, useFinfAndModify: false })
            .then(inventoryStatus => {
            res.json("Inventory updated");
        });
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
module.exports = {
    getInventory,
    postInventory,
    updateInventory,
    deleteInventory,
};
