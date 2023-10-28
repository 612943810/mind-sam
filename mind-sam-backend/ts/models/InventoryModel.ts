import mongoose,{Schema,model} from "mongoose";
export type Inventory={
inventoryId:Number
inventoryName:String
inventoryDate:String
}
let inventorySchema=new Schema<Inventory>({
    inventoryId:{type:Number,required:true},
    inventoryName:{type:String,required:true},
    inventoryDate:{type:Date,required:true}
})
 export let inventory=model<Inventory>('Inventory',inventorySchema);
