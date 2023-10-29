import http, { IncomingMessage, Server, ServerResponse } from 'http';
let mongoose=require('mongoose');
import express from 'express';
let appInit = express();
let serverInit =http.createServer(appInit);
var io = require('socket.io')(serverInit, {
    cors: {
        origin: " *",
       // methods: ["GET", "POST","UPDATE","DELETE"],
        
        credentials: true
    }
});
import cors from 'cors';
import { Chat } from '../models/ChatModel';
appInit.use(cors({ origin: '*'}));


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

mongoose.connect(`mongodb+srv://${process.env.database_name}:${process.env.database_password}@${process.env.database_name}.yhrxz.mongodb.net/?retryWrites=true&w=majority`);

mongoose.connection.on('connected',()=>{
    console.log("Connection successful");
});

mongoose.connection.on('error',(error:any)=>{
console.log(`Error:${error}`);
});
serverInit.listen(port, () => {
    console.log(`Port  ${port}`);
});
