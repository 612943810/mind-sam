import express=require('express')
import { Express } from 'express';
import mongoose=require('mongoose')
import { Socket } from 'socket.io';
import { createServer } from 'http';
let appInit:Express=express();
let httpServerInit=require('http').createServer(appInit);
import {Server} from'socket.io';
import cors=require('cors');
appInit.use(cors({
    origin:'*',
    
}));
let serverInit=createServer();
var ioInit=new Server(serverInit);

ioInit.on('connection',(mindConection)=>{
    console.log("Welcome to mind-sam. What can I assist you with?")
})
httpServerInit.listen(3000,()=>{
    console.log("Port 3000");
})