import mongoose,{Schema,model,Document} from "mongoose";
export interface Inventory{
inventoryId:Number
inventoryName:String
inventoryDate:String
}
let inventorySchema=new Schema<Inventory>({
    inventoryId:{type:Number},
    inventoryName:{type:String,required:true},
    inventoryDate:{type:Date,required:true}
})
inventorySchema.pre('save', async function (next) {
    const randomInteger=(minimum:number,maximum:number)  => {
      return Math.floor(Math.random()*(maximum-minimum+1)) +minimum;
    };
    this.inventoryId=randomInteger(1,100000);
    next()
})
 export let inventory=model<Inventory>('Inventory',inventorySchema);
