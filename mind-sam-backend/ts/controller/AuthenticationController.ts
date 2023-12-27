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
module.exports = {
registerUser
}