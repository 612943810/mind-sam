"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http_1 = require("http");
let appInit = express();
let httpServerInit = require('http').Server(appInit);
let serverInit = (0, http_1.createServer)();
var io = require('socket.io')(httpServerInit, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
});
let mongoose=require('mongoose');

var port = 3000;
io.on('connection', (mindConection) => {
    mindConection.on("welcomeMessage", (userData) => console.log(userData));
});
appInit.post((res,req)=>{
    
})
mongoose.connect("mongodb+srv://personal:mongodb2@personal.yhrxz.mongodb.net/?retryWrites=true&w=majority",
{useNewUrlParser:true,
useUnifiedTopology:true
})

mongoose.connection.on('connected',()=>{
    console.log("Connection successful");
});

mongoose.connection.on('error',(error)=>{
console.log(`Error:${error}`);
});
httpServerInit.listen(port, () => {
    console.log(`Port  ${port}`);
});
