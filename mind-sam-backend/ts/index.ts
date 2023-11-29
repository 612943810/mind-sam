import express, { Request,Response } from 'express';
import http, { IncomingMessage, Server, ServerResponse } from 'http';
import mongose, { Schema } from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Router } from 'express';
import mongoose from 'mongoose';
import {inRoute} from './routes/inventory';
dotenv.config();

mongoose.connect(`mongodb+srv://${process.env.database_name}:${process.env.database_password}@${process.env.database_name}.yhrxz.mongodb.net/inventory?retryWrites=true&w=majority`);
let appInit = express();
appInit.use(cors());
let chatInit =http.createServer(appInit);
var io = require('socket.io')(chatInit, {
    cors: {
        origin: " *",
    
        credentials: true
    }
});

import { Chat } from './models/ChatModel';
appInit.use(cors({ origin: '*'}));


var port = 3001;
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



mongoose.connection.on('connected',()=>{
    console.log("Connection successful");
});

mongoose.connection.on('error',(error:any)=>{
console.log(`Error:${error}`);
});
chatInit.listen(port, () => {
    console.log(`Port  ${port}`);
});

appInit.use(express.json());
appInit.use(inRoute);


mongoose.connection.on('connected',()=>{
    console.log("Connection successful");
});

mongoose.connection.on('error',(error:any)=>{
console.log(`Error:${error}`);
});
appInit.listen(3000,()=>{
    console.log("Running")
})
let serverInit =http.createServer(appInit);
