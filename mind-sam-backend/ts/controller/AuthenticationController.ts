import { Express, Request, Response, json } from "express";
import jwt, { Secret } from 'jsonwebtoken';
import argon from 'argon2';
import dotenv from 'dotenv';
dotenv.config();
import {register} from '../models/RegisterModel';
let registerUser = async (req: Request, res: Response) => {
    const {username,password,dateofbirth}=req.body;
   let hashedPassword= await argon.hash(password,{type:argon.argon2id});
    let users = new register({username:username,password:hashedPassword,dateofbirth:dateofbirth})
    try {
        await users.save();
        let secretKey=process.env.JWT_SECRET;
        const jwtToken = jwt.sign(
            {username: username,password:password,dateofbirth },
            process.env.JWT_SECRET as Secret,
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
    appUsers= await register.findOne({username:req.body.username})
     if(appUsers){
     let  checkPassword=await argon.verify( appUsers.password,password);
     if(checkPassword==true){      
    
       const jwtToken = jwt.sign(
        {username: username,password:password},
        process.env.JWT_SECRET as Secret,
        {
          expiresIn: "15m",
        }
      );
 res.cookie("jwtToken",jwtToken,{
        httpOnly:false,
        secure:true,
        sameSite: "none",
      })
     res.json("Access granted!")

      }else{
      res.json("Access denied!");
    }  
   
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