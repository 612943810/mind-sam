import mongoose, { Schema, model } from "mongoose";

export type Login={
username:string
password:string
}
let loginSchema=new Schema<Login>({
    username:{type:String,required:true},
  password:{type:String,required:true}
})

export let inventory=model<Login>('Login',loginSchema);
