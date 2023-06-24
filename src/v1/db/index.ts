import mongoose from "mongoose";
import { config } from "dotenv";
import { initializeApp } from "firebase/app";
import firebaseConfig from "../config/firebase";
config();

export const connectToMongoDBDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
};

export const connectToFirebaseDatabase = async () => {
  try {
    initializeApp(firebaseConfig);
    console.log("Connected to firebase");
  } catch (error) {
    console.error(error);
  }
};
