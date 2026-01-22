"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const uri = process.env.MONGO_URI;
if (!uri) {
    throw new Error("MONGO_URI is not defined");
}
async function keepAlive() {
    const client = new mongodb_1.MongoClient(uri);
    try {
        await client.connect();
        const db = client.db("admin");
        await db.command({ ping: 1 });
        console.log("MongoDB ping successful");
    }
    catch (error) {
        console.error("MongoDB ping failed", error);
        process.exit(1);
    }
    finally {
        await client.close();
    }
}
keepAlive();
