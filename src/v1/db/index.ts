import mongoose from "mongoose";
import { initializeApp } from "firebase/app";

export const connectToMongoDBDatabase = async (uri: string) => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
};

export const connectToFirebaseDatabase = async (config: any) => {
  try {
    initializeApp(config);
    console.log("Connected to firebase");
  } catch (error) {
    console.error(error);
  }
};
