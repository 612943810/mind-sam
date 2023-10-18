import mongoose, { Schema, model } from "mongoose";

export type Chat={
    messageid:Number,
    message:String
    date:Date
};

let chatSchema=new Schema<Chat>({
    messageid:{type:Number,required:true},
    message:{type:String,required:true},
    date:{type:Date,required:true}
})

let chat=model<Chat>('Chat',chatSchema);
module.exports=chat