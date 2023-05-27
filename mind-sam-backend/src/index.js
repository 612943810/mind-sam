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
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
});
appInit.use((0, cors_1.default)({ origin: 'http://127.0.0.1:3000' }));
let mongoose = require('mongoose');
var port = 3000;
io.on('connection', (mindConection) => {
    mindConection.on("welcomeMessage", (userData) => console.log(userData));
});
appInit.get("/message", (req, res) => {
    res.json("Path found.");
});
io.on("connection", () => {
    console.log("Chat started");
});
io.on("disconnect", () => {
    console.log("Chat off");
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
