import mongoose, { Schema, model } from "mongoose";

export type RegisteredUser={
username:string
password:string
dateofbirth:Date
}

let registerSchema=new Schema<RegisteredUser>({
    username:{type:String,required:true},
  password:{type:String,required:true},
  dateofbirth:{type:Date,required:true}
})

export let inventory=model<RegisteredUser>('Users',registerSchema);