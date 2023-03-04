"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http_1 = require("http");
let appInit = express();
let httpServerInit = require('http').createServer(appInit);
const socket_io_1 = require("socket.io");
let serverInit = (0, http_1.createServer)();
var ioInit = new socket_io_1.Server();
ioInit.on('connection', (mindConection) => {
    console.log("Welcome to mind-sam. What can I assist you with?");
});
httpServerInit.listen(3000, () => {
    console.log("Port 3000");
});
