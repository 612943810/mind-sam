import express=require('express')
import { Express } from 'express';
import mongoose=require('mongoose')
import { Socket } from 'socket.io';
import { createServer } from 'http';
let appInit:Express=express();
let httpServerInit=require('http').Server(appInit);
import {Server} from'socket.io';
import cors=require('cors');
let serverInit=createServer();
var io:Socket=require('socket.io')(httpServerInit,{
    cors:{

        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    
    }
});
var port=3000

io.on('connection',(mindConection:Socket)=>{
mindConection.on("welcomeMessage",(userData)=>console.log(userData));
})

httpServerInit.listen(port,()=>{
    console.log(`Port  ${port}`);
})