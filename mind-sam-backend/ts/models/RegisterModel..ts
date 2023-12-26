import mongoose, { Schema, model } from "mongoose";

export type Register={
username:string
password:string
dateofbirth:Date
}

let registerSchema=new Schema<Register>({
    username:{type:String,required:true},
  password:{type:String,required:true},
  dateofbirth:{type:Date,required:true}
})

export let inventory=model<Register>('Users',registerSchema);