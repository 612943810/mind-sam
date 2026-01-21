import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI!;

if (!uri) {
  throw new Error("MONGO_URI is not defined");
}

async function keepAlive(): Promise<void> {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("admin");
    await db.command({ ping: 1 });
    console.log("MongoDB ping successful");
  } catch (error) {
    console.error("MongoDB ping failed", error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

keepAlive();
