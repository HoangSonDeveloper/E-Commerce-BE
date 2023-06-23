import mongoose from "mongoose";
import { config } from "dotenv";

config();

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "");
    console.log("Connected to database");
  } catch (error) {
    console.error(error);
  }
};

export default connectToDatabase;
