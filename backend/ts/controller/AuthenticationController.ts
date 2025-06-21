import { Express, Request, Response, json } from "express";
import jwt, { Secret } from 'jsonwebtoken';
import argon from 'argon2';
import dotenv from 'dotenv';
dotenv.config();
import {register} from '../models/RegisterModel';
let secretKey:any=process.env.JWT_SECRET;
let registerUser = async (req: Request, res: Response) => {
    const {username, password, dateofbirth} = req.body;
    try {

        const hashedPassword = await argon.hash(password);
        let users = new register({username: username, password: hashedPassword, dateofbirth: dateofbirth});
        await users.save();

        const jwtToken: string = jwt.sign(
            { username: username, dateofbirth },
            secretKey,
            {
              expiresIn: "15m",
            }
        );  
        res.json({ result: "User Registered", token: jwtToken });
    } catch (error: any) {
        res.status(500).json({ result: "Error", error: error.message });
    }
}
let loginUser=async (req: Request, res: Response) => {
  try {
    const {username,password} = req.body;
    const user = await register.findOne({ username: username }).exec();
    if (!user) {
      return res.json({ result: "User not found" });
    }
    const validPassword = await argon.verify(user.password, password);
    if (!validPassword) {
      return res.json({ result: "Invalid password" });
    }
    const jwtToken = jwt.sign(
      { username: username },
      secretKey,
      { expiresIn: "15m" }
    );
   
    res.json({ result: "Success", token: jwtToken });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ result: "Error", error: error.message });
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