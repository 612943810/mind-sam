"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const inventory_1 = require("./routes/inventory");
const authentication_1 = require("./routes/authentication");
const seedData_1 = require("./utils/seedData");
const connection_1 = require("./db/connection");
const config_1 = require("./config");
const cookieParser = require('cookie-parser');
const appInit = (0, express_1.default)();
const allowedOrigins = ['https://mind-sam.netlify.app', 'http://localhost:5173', 'http://localhost:3001', 'https://mind-sam.onrender.com'];
appInit.use((0, cors_1.default)({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Credentials'],
}));
appInit.use(cookieParser());
appInit.use(express_1.default.json());
appInit.use(inventory_1.inRoute);
appInit.use(authentication_1.authRoute);
const chatInit = http_1.default.createServer(appInit);
const io = require('socket.io')(chatInit, {
    cors: {
        origin: allowedOrigins,
        credentials: true,
    },
});
io.on('connection', (mindConnection) => {
    mindConnection.emit('welcomeMessage', `Welcome, ${mindConnection.id} to the bot! `);
    mindConnection.emit('Chat started');
    mindConnection.emit('messageDisplay', 'Please select an option for your respective links. 1 is for Customer, and 2 is for Business Owner.');
    mindConnection.on('showMenu', (menuOptions) => {
        io.emit('showMenu', menuOptions);
    });
    mindConnection.on('disconnect', () => {
        console.log('Socket disconnected', mindConnection.id);
    });
});
const startServer = async () => {
    try {
        await (0, connection_1.connectDb)();
        (0, seedData_1.seedData)();
        chatInit.listen(config_1.PORT, () => {
            console.log(`Server running on port ${config_1.PORT}`);
        });
    }
    catch (error) {
        console.error('Failed to start server', error);
        process.exit(1);
    }
};
startServer();
