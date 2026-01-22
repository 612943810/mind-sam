"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInventory = exports.updateInventory = exports.getInventory = exports.postInventory = void 0;
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
exports.postInventory = postInventory;
let getInventory = async (req, res) => {
    let currentData = null;
    try {
        let { id, inid, name, date } = req.query;
        if (id) {
            currentData = await InventoryModel_1.inventory.find({ _id: req.query.id });
        }
        else if (inid) {
            currentData = await InventoryModel_1.inventory.find({ inventoryId: req.query.inid });
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
exports.getInventory = getInventory;
let updateInventory = async (req, res) => {
    try {
        await InventoryModel_1.inventory.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, returnOriginal: false, useFindAndModify: false }).
            then((inventoryStatus) => {
            res.json("Inventory Updated");
        });
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.updateInventory = updateInventory;
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
exports.deleteInventory = deleteInventory;
module.exports = {
    getInventory: exports.getInventory,
    postInventory: exports.postInventory,
    updateInventory: exports.updateInventory,
    deleteInventory: exports.deleteInventory,
};
