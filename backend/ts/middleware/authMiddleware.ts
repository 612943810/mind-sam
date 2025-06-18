import { NextFunction, Response,Request} from "express";
let jwtToken:any=process.env.JWT_SECRET;
import jwt, { JwtHeader } from 'jsonwebtoken';
let verifyAuth=(req:Request,res:Response,next:NextFunction)=>{
let storeHeader:any=req.headers.authorization;
if(storeHeader){
    const modToken=storeHeader.split('')[1];
jwt.verify(modToken,jwtToken,(error:any,accountUser:any)=>{
if(error){
    return res.status(403).send("TThis is not  a valid token.")
}

})
}
}