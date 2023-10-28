"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventory = void 0;
const mongoose_1 = require("mongoose");
let inventorySchema = new mongoose_1.Schema({
    inventoryId: { type: Number, required: true },
    inventoryName: { type: String, required: true },
    inventoryDate: { type: Date, required: true }
});
exports.inventory = (0, mongoose_1.model)('Inventory', inventorySchema);
