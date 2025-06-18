"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const mongoose_1 = require("mongoose");
let registerSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    dateofbirth: { type: Date, required: true }
});
exports.register = (0, mongoose_1.model)('Users', registerSchema);
