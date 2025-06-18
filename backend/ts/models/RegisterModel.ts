import mongoose, { Schema, model } from "mongoose";

export interface RegisteredUser{
username:string
password:string
dateofbirth:Date
}

let registerSchema=new Schema<RegisteredUser>({
    username:{type:String,required:true},
  password:{type:String,required:true},
  dateofbirth:{type:Date,required:true}
})

export let register=model<RegisteredUser>('Users',registerSchema);