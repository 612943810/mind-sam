import mongoose,{Schema,model,Document} from "mongoose";
export interface Idea{
id:number,
description:string,
time:string
}
let inventorySchema=new Schema<Idea>({
    id:{type:Number},
    description:{type:String,required:true},
    time:{type:String ,required:true}
})
inventorySchema.pre('save', async function (next) {
    const randomInteger=(minimum:number,maximum:number)  => {
      return Math.floor(Math.random()*(maximum-minimum+1)) +minimum;
    };
    this.id=randomInteger(1,100000);
    next()
})
 export let inventory=model<Idea>('Idea',inventorySchema);
