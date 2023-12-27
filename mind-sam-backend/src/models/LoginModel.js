"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventory = void 0;
const mongoose_1 = require("mongoose");
let loginSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
});
exports.inventory = (0, mongoose_1.model)('Login', loginSchema);
