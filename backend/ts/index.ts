import express from 'express';
import http from 'http';
import cors from 'cors';
import { inRoute } from './routes/inventory';
import { authRoute } from './routes/authentication';
import { seedData } from './utils/seedData';
import { connectDb } from './db/connection';
import { PORT } from './config';

const cookieParser = require('cookie-parser');

const appInit = express();
const allowedOrigins = ['https://mind-sam.netlify.app', 'http://localhost:5173', 'http://localhost:3001', 'https://mind-sam.onrender.com'];
appInit.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Credentials'],
}));
appInit.use(cookieParser());
appInit.use(express.json());
appInit.use(inRoute);
appInit.use(authRoute);

const chatInit = http.createServer(appInit);
const io = require('socket.io')(chatInit, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});

io.on('connection', (mindConnection: any) => {
  mindConnection.emit('welcomeMessage', `Welcome, ${mindConnection.id} to the bot! `);
  mindConnection.emit('Chat started');
  mindConnection.emit('messageDisplay', 'Please select an option for your respective links. 1 is for Customer, and 2 is for Business Owner.');

  mindConnection.on('showMenu', (menuOptions: any) => {
    io.emit('showMenu', menuOptions);
  });

  mindConnection.on('disconnect', () => {
    console.log('Socket disconnected', mindConnection.id);
  });
});

const startServer = async () => {
  try {
    await connectDb();
    seedData();
    chatInit.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error: any) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
};

startServer();
