import { Express, Request, Response, json } from "express";
import jwt, { Secret } from 'jsonwebtoken';
import argon from 'argon2';
import dotenv from 'dotenv';
dotenv.config();
import {register} from '../models/RegisterModel';
let secretKey:any=process.env.JWT_SECRET;
let registerUser = async (req: Request, res: Response) => {
    const {username,password,dateofbirth}=req.body;
    let users = new register({username:username,password:password,dateofbirth:dateofbirth})
    try {
        await users.save();

        const jwtToken:string = jwt.sign(
            {username: username,password:password,dateofbirth },
        secretKey,
            {
              expiresIn: "15m",
            }
          );
        res.send("User Registered")
    } catch (error) {
        res.json(error);
    }
  }
let loginUser=async (req: Request, res: Response) => {
 
  try {
    const {username,password} =req.body;
    let appUsers:any=0;
    appUsers=await register.findOne({ username:username,password:password}).exec();
    console.log(appUsers)
    if(appUsers){
        
        const jwtToken = jwt.sign(
        {username: username,password:password}, secretKey,{ expiresIn: "15m"}
      );
    }else if(appUsers==null){
      res.json({"result":"User not found"})
    }
}catch (error) {
console.log(error)
  }
    }
let logoutUser=async (req: Request, res: Response) => {
  res.cookie("jwtToken"," ",{maxAge:1})
  res.json("Cookie Deleted")
}
module.exports = {
registerUser,
loginUser,
logoutUser
}