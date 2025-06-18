"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventory = void 0;
const mongoose_1 = require("mongoose");
let inventorySchema = new mongoose_1.Schema({
    inventoryId: { type: Number },
    inventoryName: { type: String, required: true },
    inventoryDate: { type: Date, required: true }
});
inventorySchema.pre('save', async function (next) {
    const randomInteger = (minimum, maximum) => {
        return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    };
    this.inventoryId = randomInteger(1, 100000);
    next();
});
exports.inventory = (0, mongoose_1.model)('Inventory', inventorySchema);
