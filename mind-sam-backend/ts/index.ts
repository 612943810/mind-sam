import express, { Request,Response } from 'express';
import http, { IncomingMessage, Server, ServerResponse } from 'http';
import mongose, { Schema } from 'mongoose';
import cors from 'cors';
let appInit = express();

let serverInit =http.createServer(appInit);
var io = require('socket.io')(serverInit, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
});
appInit.use(cors({ origin: 'http://127.0.0.1:3000'}))
let mongoose=require('mongoose');
import { Chat } from './models/ChatModel';
var port = 3000;
io.on('connection', (mindConection:any) => {
    mindConection.on("welcomeMessage", (userData:any) => console.log(userData));
});
appInit.get("/message",(req:Request,res:Response):void=>{
res.json("Path found.")

})
io.on("connection",()=>{
   console.log("Chat started");
})
io.on("disconnect",()=>{
   console.log("Chat off")
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
