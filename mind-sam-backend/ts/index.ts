import express, { Request,Response } from 'express';
import http, { IncomingMessage, Server, ServerResponse } from 'http';
import mongose, { Schema } from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Router } from 'express';
import mongoose from 'mongoose';
import {inRoute} from './routes/inventory';

dotenv.config();
let appInit = express();
appInit.use(express.json());
appInit.use(inRoute);
mongoose.connect(`mongodb+srv://${process.env.database_name}:${process.env.database_password}@${process.env.database_name}.yhrxz.mongodb.net/inventory?retryWrites=true&w=majority`);

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
