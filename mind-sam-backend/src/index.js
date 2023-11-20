"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const inventory_1 = require("./routes/inventory");
dotenv_1.default.config();
mongoose_1.default.connect(`mongodb+srv://${process.env.database_name}:${process.env.database_password}@${process.env.database_name}.yhrxz.mongodb.net/inventory?retryWrites=true&w=majority`);
let appInit = (0, express_1.default)();
let chatInit = http_1.default.createServer(appInit);
var io = require('socket.io')(chatInit, {
    cors: {
        origin: " *",
        credentials: true
    }
});
appInit.use((0, cors_1.default)({ origin: '*' }));
var port = 3001;
io.on('connection', (mindConection) => {
    mindConection.emit("welcomeMessage", `Welcome, ${mindConection.id} to the bot! `);
});
io.on("connection", (socketLis) => {
    socketLis.emit("Chat started");
    socketLis.emit("messageDisplay", "Please select an option for your respective links. 1 is for Customer, and 2 is for Business Owner.");
    socketLis.on("showMenu", (menuOptions) => {
        io.emit("showMenu", menuOptions);
    });
});
io.on("disconnect", (socketLis) => {
    socketLis.emit("Chat off");
});
mongoose_1.default.connection.on('connected', () => {
    console.log("Connection successful");
});
mongoose_1.default.connection.on('error', (error) => {
    console.log(`Error:${error}`);
});
chatInit.listen(port, () => {
    console.log(`Port  ${port}`);
});
appInit.use(express_1.default.json());
appInit.use(inventory_1.inRoute);
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
