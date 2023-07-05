import { Document, ObjectId } from "mongoose";

export interface IUser extends Document {
  _id: ObjectId;
  email: string;
  password: string;
  verified: boolean;
  accountType: string;
  firstName: string;
  lastName: string;
  avatar: string;
  address: IAddress;
  phone: string;
  createdAt: Date;
  generateAuthToken(): string;
  hashPassword(): Promise<string>;
  comparePassword(password): Promise<boolean>;
}

export interface IAddress {
  address: string;
  city: string;
  state: string;
  country: string;
  zip: string;
}
