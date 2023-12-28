import { Express, Request, Response, json } from "express";
import jwt, { Secret } from 'jsonwebtoken';
import argon from 'argon2';
import dotenv from 'dotenv';
dotenv.config();
import {register} from '../models/RegisterModel';
let registerUser = async (req: Request, res: Response) => {
    const {username,password,dateofbirth}=req.body;
   let hashedPassword= await argon.hash(password);
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
    const appUsers= await register.findOne({username:req.body.username}).then(async(userData:any)=>{
   if(userData && (await argon.verify(userData.password,password))){
    
        const jwtToken = jwt.sign(
        {username: username,password:password},
        process.env.JWT_SECRET as Secret,
        {
          expiresIn: "15m",
        }
      );   
     
    }else{
      res.json(`The password is incorrect.`);
    }  
    console.log(userData)
  
    });

   
 
  } catch (error) {
console.log(error)
  }
}
module.exports = {
registerUser,
loginUser
}