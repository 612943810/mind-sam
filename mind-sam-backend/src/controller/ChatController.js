"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
let mongoose = require('mongoose');
const express_1 = __importDefault(require("express"));
let appInit = (0, express_1.default)();
let serverInit = http_1.default.createServer(appInit);
var io = require('socket.io')(serverInit, {
    cors: {
        origin: " *",
        // methods: ["GET", "POST","UPDATE","DELETE"],
        credentials: true
    }
});
const cors_1 = __importDefault(require("cors"));
appInit.use((0, cors_1.default)({ origin: '*' }));
var port = 3000;
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
mongoose.connect(`mongodb+srv://${process.env.database_name}:${process.env.database_password}@${process.env.database_name}.yhrxz.mongodb.net/?retryWrites=true&w=majority`);
mongoose.connection.on('connected', () => {
    console.log("Connection successful");
});
mongoose.connection.on('error', (error) => {
    console.log(`Error:${error}`);
});
serverInit.listen(port, () => {
    console.log(`Port  ${port}`);
});
