import express=require('express')
import { Express } from 'express';
import mongoose=require('mongoose')
import { Socket } from 'socket.io';
import { createServer, Server } from 'http';
let appInit:Express=express();
let httpServerInit:Server=require('http').createServer(appInit);

appInit.get('/',(res,req)=>{

})
httpServerInit.listen(3000,()=>{
    console.log("Port 3000");
})