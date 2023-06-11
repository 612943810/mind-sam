"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
let appInit = (0, express_1.default)();
let serverInit = http_1.default.createServer(appInit);
var io = require('socket.io')(serverInit, {
    cors: {
        origin: " *",
        // methods: ["GET", "POST","UPDATE","DELETE"],
        credentials: true
    }
});
appInit.use((0, cors_1.default)({ origin: '*' }));
let mongoose = require('mongoose');
var port = 3000;
io.on('connection', (mindConection) => {
    mindConection.emit("welcomeMessage", `Welcome, ${mindConection.id} to the bot!. `);
});
appInit.get("/", (req, res) => {
});
io.on("connection", (socketLis) => {
    socketLis.emit("Chat started");
    socketLis.emit("messageDisplay", "Please select an option. 1 is for Customer, and 2 is for Business Owner.");
});
io.on("disconnect", (socketLis) => {
    socketLis.emit("Chat off");
});
mongoose.connect("mongodb+srv://personal:mongodb2@personal.yhrxz.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log("Connection successful");
});
mongoose.connection.on('error', (error) => {
    console.log(`Error:${error}`);
});
serverInit.listen(port, () => {
    console.log(`Port  ${port}`);
});
