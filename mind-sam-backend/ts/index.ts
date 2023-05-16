import express from 'express';
import http from 'http';
import mongose, { Schema } from 'mongoose';
let appInit = express();
let httpServerInit = require('http').Server(appInit);
let serverInit =http.createServer();
var io = require('socket.io')(httpServerInit, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
});
let mongoose=require('mongoose');
import { Chat } from './models/ChatModel';
var port = 3000;
io.on('connection', (mindConection:any) => {
    mindConection.on("welcomeMessage", (userData:any) => console.log(userData));
});
appInit.get("/getMessage",(res,req)=>{
let chat=new Schema<Chat>({
    messageid:1,
    message:"Test"
})

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
httpServerInit.listen(port, () => {
    console.log(`Port  ${port}`);
});
