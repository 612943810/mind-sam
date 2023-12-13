import mongoose, { Mongoose, Schema } from "mongoose";
import { Express, Request, Response, json } from "express";
import { inventory } from "../models/InventoryModel"

let postInventory = async (req: Request, res: Response,) => {
    let inventoryData = new inventory(req.body)
    try {
        await inventoryData.save();
        res.send("Success")
    } catch (error) {
        res.json(error);
    }

}
let getInventory = async (req: Request, res: Response) => {
    let currentData = null;
    try {
        let { id, name, date } = req.query;
        if (id) {
            currentData = await inventory.find({ inventoryId: req.query.id });
        } else if (name) {
            currentData = await inventory.find({ inventoryName: req.query.name });
        }
        else if (date) {
            currentData = await inventory.find({ inventoryDate: req.query.date });
        }
        else {
            currentData = await inventory.find({})
        }

        res.send(currentData);

    } catch (error) {
        res.json(error)
    }


}
let updateInventory = async (req: Request, res: Response) => {
    let inventoryData = new inventory(req.body)
    try {
        await inventory.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, returnOriginal: false, useFinfAndModify: false })
            .then(inventoryStatus => {
                res.json("Inventory updated");
            })
        await inventoryData.save();
    } catch (error) {
        res.json(error)
    }
}

let deleteInventory = async (req: Request, res: Response) => {
    try {
        await inventory.findByIdAndDelete(req.params.id)
            .then(inventoryStatus => {
                res.json("Inventory deleted");
            })
    } catch (error) {
        res.json(error)
    }
}


module.exports = {
    getInventory,
    postInventory,
    updateInventory,
    deleteInventory,
   // findInventory
}