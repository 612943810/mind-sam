import express, { Request,Response } from 'express';
import http, { IncomingMessage, Server, ServerResponse } from 'http';
import mongose, { Schema } from 'mongoose';
import cors from 'cors';
let appInit = express();

let serverInit =http.createServer(appInit);
var io = require('socket.io')(serverInit, {
    cors: {
        origin: " *",
       // methods: ["GET", "POST","UPDATE","DELETE"],
        
        credentials: true
    }
});
appInit.use(cors({ origin: '*'}));
let mongoose=require('mongoose');
import { Chat } from './models/ChatModel';
var port = 3000;
io.on('connection', (mindConection:any) => {
    mindConection.emit("welcomeMessage",`Welcome, ${mindConection.id} to the bot! `)
});


io.on("connection",(socketLis:any)=>{
   socketLis.emit("Chat started");
 
   socketLis.emit("messageDisplay","Please select an option for your respective links. 1 is for Customer, and 2 is for Business Owner.");
socketLis.on("showMenu",(menuOptions:any)=>{
      io.emit("showMenu",menuOptions);
   })

}) 


io.on("disconnect",(socketLis:any)=>{
   socketLis.emit("Chat off")
})

mongoose.connect("mongodb+srv://personal:mongodb2@personal.yhrxz.mongodb.net/?retryWrites=true&w=majority",
{useNewUrlParser:true,
useUnifiedTopology:true
})

mongoose.connection.on('connected',()=>{
    console.log("Connection successful");
});

mongoose.connection.on('error',(error:any)=>{
console.log(`Error:${error}`);
});
serverInit.listen(port, () => {
    console.log(`Port  ${port}`);
});
