"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let chatSchema = new mongoose_1.Schema({
    messageid: { type: Number, required: true },
    message: { type: String, required: true },
    date: { type: Date, required: true }
});
let chat = (0, mongoose_1.model)('Chat', chatSchema);
module.exports = chat;
