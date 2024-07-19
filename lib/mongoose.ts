import mongoose from "mongoose";

let isConnected: boolean = false;

export async function connectToDatabase() {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) return console.log("MISSING MONGODB_URL");

  if (isConnected) return console.log("MONGO DB IS ALREADY CONNECTED");


  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "devflow",
    })
    isConnected = true;
    
  } catch(error) {
    console.log('MongoDB connection failed', error);
  }
}