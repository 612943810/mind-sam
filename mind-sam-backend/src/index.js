"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = require("mongoose");
let appInit = (0, express_1.default)();
let httpServerInit = require('http').Server(appInit);
let serverInit = http_1.default.createServer();
var io = require('socket.io')(httpServerInit, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
});
let mongoose = require('mongoose');
var port = 3000;
io.on('connection', (mindConection) => {
    mindConection.on("welcomeMessage", (userData) => console.log(userData));
});
appInit.get("/getMessage", (res, req) => {
    let chat = new mongoose_1.Schema({
        messageid: 1,
        message: "Test"
    });
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
httpServerInit.listen(port, () => {
    console.log(`Port  ${port}`);
});
