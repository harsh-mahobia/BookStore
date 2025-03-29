import mongoose from "mongoose";
import { configDotenv } from "dotenv";
configDotenv();

const MONGO = process.env.MONGO!
const connectDB = async () => {
  try {
    if (!MONGO) {
      throw new Error("MONGO_URI is not defined in environment variables");
    }

    await mongoose.connect(MONGO);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error; 
  }
};

export default connectDB;
