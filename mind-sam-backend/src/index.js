"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const inventory_1 = require("./routes/inventory");
dotenv_1.default.config();
let appInit = (0, express_1.default)();
appInit.use(express_1.default.json());
appInit.use(inventory_1.inRoute);
mongoose_1.default.connect(`mongodb+srv://${process.env.database_name}:${process.env.database_password}@${process.env.database_name}.yhrxz.mongodb.net/inventory?retryWrites=true&w=majority`);
mongoose_1.default.connection.on('connected', () => {
    console.log("Connection successful");
});
mongoose_1.default.connection.on('error', (error) => {
    console.log(`Error:${error}`);
});
appInit.listen(3000, () => {
    console.log("Running");
});
let serverInit = http_1.default.createServer(appInit);
